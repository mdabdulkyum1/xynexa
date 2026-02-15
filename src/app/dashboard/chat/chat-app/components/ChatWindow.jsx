"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSession } from "next-auth/react"; 
import { FaVideo, FaPhone, FaPaperPlane, FaEllipsisV, FaCheck, FaCheckDouble } from "react-icons/fa";
import { format, parseISO } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { socket } from "../../../../../lib/socket";
import useChatStore from "@/store/useChatStore";
import { toast } from "sonner";

const ChatWindow = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const isLoaded = status !== "loading"; 

  const { 
    messages, 
    fetchUserMessages, 
    sendMessage: sendMessageToStore, 
    addMessage,
    currentChatPartner: receiver,
    setCurrentChatPartner
  } = useChatStore();

  const receiverId = receiver?._id || receiver?.id;

  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sendingMessages, setSendingMessages] = useState(new Map()); // Track message sending status
  const messagesEndRef = useRef(null);

  // Join socket & listeners
  useEffect(() => {
    if (!userId) return;

    socket.emit("join", { email: session?.user?.email });

    const handleReceiveMessage = (message) => {
      console.log('Socket: Received message event:', message); // Debug log
      console.log('Socket: Checking IDs - Sender:', message.senderId, 'Receiver:', message.receiverId, 'MyID:', userId, 'CurrentChatPartner:', receiverId);

      if (
        (message.senderId === receiverId && message.receiverId === userId) ||
        (message.senderId === userId && message.receiverId === receiverId)
      ) {
        console.log('Socket: Message matched! Adding to chat.');
        addMessage(message);
        
        // Remove from sending status if it was our message
        if (message.senderId === userId && message._id) {
          setSendingMessages(prev => {
            const newMap = new Map(prev);
            newMap.delete(message._id);
            return newMap;
          });
        }
      } else {
        console.log('Socket: Message did NOT match current chat.');
      }
    };

    const handleTyping = ({ senderId }) => {
      if (senderId === receiverId) {
        setIsTyping(true);
        // Auto-scroll when typing starts
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      }
    };

    const handleStopTyping = () => setIsTyping(false);

    // Message delivery confirmation
    const handleMessageDelivered = ({ messageId }) => {
      setSendingMessages(prev => {
        const newMap = new Map(prev);
        if (newMap.has(messageId)) {
          newMap.set(messageId, 'delivered');
        }
        return newMap;
      });
    };

    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);
    socket.on("message-delivered", handleMessageDelivered);

    return () => {
      socket.off("receiveMessage");
      socket.off("typing");
      socket.off("stopTyping");
      socket.off("message-delivered");
    };
  }, [userId, receiverId, addMessage, session]);

  // Fetch messages
  useEffect(() => {
    if (receiverId && userId) {
      fetchUserMessages(receiverId, userId);
    }
  }, [receiverId, userId, fetchUserMessages]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]); // Scroll on new messages OR typing status change

  // Send message
  const sendMessage = useCallback(async () => {
    if (!newMessage.trim() || !userId || !receiverId) return;

    const tempId = `temp-${Date.now()}`;
    const messageData = {
      senderId: userId,
      receiverId: receiverId,
      content: newMessage.trim(),
    };

    // Mark as sending
    setSendingMessages(prev => new Map(prev).set(tempId, 'sending'));
    setNewMessage("");

    try {
      const data = await sendMessageToStore(messageData);
      
      // Update to sent status
      setSendingMessages(prev => {
        const newMap = new Map(prev);
        newMap.delete(tempId);
        if (data._id) {
          newMap.set(data._id, 'sent');
        }
        return newMap;
      });

      // Emit to socket
      socket.emit("sendMessage", data);

      // Auto-mark as delivered after 2 seconds if receiver is online
      if (receiver?.status === "Online") {
        setTimeout(() => {
          setSendingMessages(prev => {
            const newMap = new Map(prev);
            if (data._id && newMap.get(data._id) === 'sent') {
              newMap.set(data._id, 'delivered');
            }
            return newMap;
          });
        }, 2000);
      }
    } catch (error) {
      console.error("Send failed:", error);
      
      // Mark as failed
      setSendingMessages(prev => {
        const newMap = new Map(prev);
        newMap.set(tempId, 'failed');
        return newMap;
      });

      toast.error(`Send failed: ${error.response?.data?.message || error.message}. Payload: ${JSON.stringify(messageData)}`, {
        duration: 10000, // Long duration to read
        action: {
          label: "Retry",
          onClick: () => {
            setNewMessage(messageData.content);
            setSendingMessages(prev => {
              const newMap = new Map(prev);
              newMap.delete(tempId);
              return newMap;
            });
          }
        }
      });
    }
  }, [newMessage, userId, receiverId, sendMessageToStore, receiver]);

  // Typing indicator
  const handleTypingIndicator = () => {
    if (!userId || !receiverId) return;
    socket.emit("typing", { senderId: userId, receiverId });

    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
      socket.emit("stopTyping", { receiverId });
    }, 1500);
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    try {
      const date = parseISO(timestamp);
      return format(date, "h:mm a");
    } catch {
      return "Just now";
    }
  };

  // Get message status icon
  const getMessageStatusIcon = (msg) => {
    const isMe = msg.senderId === userId;
    if (!isMe) return null;

    const status = sendingMessages.get(msg._id);
    
    if (status === 'sending') {
      return <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />;
    }
    
    if (status === 'failed') {
      return <span className="text-red-300 text-xs">✗ Failed</span>;
    }
    
    if (status === 'delivered') {
      return <FaCheckDouble className="w-3 h-3 text-blue-300" />;
    }
    
    // Default: sent
    return <FaCheck className="w-3 h-3 text-white/70" />;
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">

      {/* Header */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center gap-4">
        <img
          src={receiver?.imageUrl || "/default-avatar.png"}
          alt={receiver?.firstName}
          className="w-12 h-12 rounded-full ring-4 ring-gray-200 dark:ring-gray-800 object-cover"
        />
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">
            {receiver?.firstName || "User"} {receiver?.lastName || ""}
          </h3>
          <p className="text-sm font-medium text-green-600">
            {isTyping ? "typing..." : receiver?.status === "Online" ? "Active now" : "Offline"}
          </p>
        </div>
        <div className="flex gap-4 text-gray-500">
          <FaPhone className="w-6 h-6 hover:text-blue-600 cursor-pointer transition" />
          <FaVideo className="w-6 h-6 hover:text-blue-600 cursor-pointer transition" />
          <FaEllipsisV className="w-6 h-6 hover:text-blue-600 cursor-pointer transition" />
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-6 py-4">
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <p className="text-center text-gray-500 py-10">No messages yet. Say hi!</p>
          ) : (
            messages.map((msg) => {
              const isMe = msg.senderId === userId;
              return (
                <div
                  key={msg._id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-5 py-3 rounded-3xl shadow-sm ${
                      isMe
                        ? "bg-blue-600 text-white"
                        : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700"
                    } ${isMe ? "rounded-tr-none" : "rounded-tl-none"}`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <div className="flex items-center justify-between gap-2 mt-1">
                      <p className={`text-[10px] opacity-70 ${isMe ? "text-right" : "text-left"}`}>
                        {msg.createdAt ? format(parseISO(msg.createdAt), "HH:mm") : ""}
                      </p>
                      {getMessageStatusIcon(msg)}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          
          {/* Visual Typing Indicator Bubble */}
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-3xl rounded-tl-none shadow-sm flex items-center gap-1">
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <Input
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTypingIndicator(); // Trigger typing event
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Write a message..."
            className="flex-1 h-12 rounded-full bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />
          <Button
            onClick={sendMessage}
            size="icon"
            className="h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
          >
            <FaPaperPlane className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
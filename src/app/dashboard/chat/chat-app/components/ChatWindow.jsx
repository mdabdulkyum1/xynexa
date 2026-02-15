"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSession } from "next-auth/react"; 
import { FaVideo, FaPhone, FaPaperPlane, FaEllipsisV, FaCheck, FaCheckDouble, FaArrowLeft, FaSmile, FaPaperclip } from "react-icons/fa";
import { format, parseISO } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { socket } from "../../../../../lib/socket";
import useChatStore from "@/store/useChatStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ChatWindow = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();

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
  const scrollAreaRef = useRef(null);

  // Helper to extract string ID from potential object
  const getStrId = (id) => {
    if (!id) return null;
    return typeof id === 'object' ? (id._id || id.id) : id;
  };

  // Join socket & listeners
  useEffect(() => {
    if (!userId) {
        return;
    }

    // console.log("ChatWindow: Setting up socket listeners for user:", userId);

    // Initial join
    socket.emit("join", { email: session?.user?.email });
    // FORCE JOIN USER ROOM - potentially redundant but safer
    socket.emit("joinUserRoom", { userId });

    const handleReceiveMessage = (message) => {
      // Robust ID comparison
      const msgSenderId = getStrId(message.senderId);
      const msgReceiverId = getStrId(message.receiverId);
      const currentReceiverId = getStrId(receiverId);
      const myId = getStrId(userId);

      // console.log('Socket: Message Received EVENT', { ... });

      const isForCurrentChat = 
        (msgSenderId === currentReceiverId && msgReceiverId === myId) ||
        (msgSenderId === myId && msgReceiverId === currentReceiverId);

      if (isForCurrentChat) {
        addMessage(message);
        
        // Remove from sending status if it was our message (confirmation of receipt by server)
        const msgId = message._id || message.id;
        if (msgSenderId === myId && msgId) {
          setSendingMessages(prev => {
            const newMap = new Map(prev);
            newMap.delete(msgId);
            return newMap;
          });
        }
      }
    };

    const handleTyping = ({ senderId }) => {
      if (getStrId(senderId) === getStrId(receiverId)) {
        setIsTyping(true);
        // Auto-scroll when typing starts if near bottom
        scrollToBottomIfNear();
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
    
    // Message read confirmation
    const handleMessageRead = ({ id }) => {
        // Logic to update read status in UI (could update store message)
    };
    
    // Connection status logging
    // socket.on("connect", () => console.log("ChatWindow Socket: Connected", socket.id));
    // socket.on("disconnect", () => console.log("ChatWindow Socket: Disconnected"));
    // socket.on("user-room-joined", (data) => console.log("ChatWindow Socket: Joined user room", data));

    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);
    socket.on("message-delivered", handleMessageDelivered);
    socket.on("messageRead", handleMessageRead);

    return () => {
      // console.log("ChatWindow: Cleaning up socket listeners");
      socket.off("connect"); 
      socket.off("disconnect");
      socket.off("user-room-joined");
      socket.off("receiveMessage");
      socket.off("typing");
      socket.off("stopTyping");
      socket.off("message-delivered");
      socket.off("messageRead");
    };
  }, [userId, receiverId, addMessage, session]);

  // Fetch messages
  useEffect(() => {
    if (receiverId && userId) {
      fetchUserMessages(receiverId, userId);
    }
  }, [receiverId, userId, fetchUserMessages]);

  // Scroll to bottom logic
  const scrollToBottom = (behavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };
  
  const scrollToBottomIfNear = () => {
     // Check if user is near bottom before forcing scroll 
     // (Simple implementation: just scroll for now to ensure visibility)
     scrollToBottom();
  };

  // Auto scroll on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Send message
  const sendMessage = useCallback(async () => {
    if (!newMessage.trim() || !userId || !receiverId) return;

    const tempId = `temp-${Date.now()}`;
    const messageContent = newMessage.trim();
    const messageData = {
      senderId: userId,
      receiverId: receiverId,
      content: messageContent,
    };

    // Mark as sending
    setSendingMessages(prev => new Map(prev).set(tempId, 'sending'));
    setNewMessage("");
    
    // Immediate scroll
    setTimeout(() => scrollToBottom(), 10);

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

      // Auto-mark as delivered after delay if online (simulation/fallback)
      if (receiver?.status === "Online") {
        setTimeout(() => {
          setSendingMessages(prev => {
            const newMap = new Map(prev);
            if (data._id && newMap.get(data._id) === 'sent') {
              newMap.set(data._id, 'delivered');
            }
            return newMap;
          });
        }, 1500);
      }
    } catch (error) {
      console.error("Send failed:", error);
      
      // Mark as failed
      setSendingMessages(prev => {
        const newMap = new Map(prev);
        newMap.set(tempId, 'failed');
        return newMap;
      });

      toast.error("Message failed to send", {
        action: {
          label: "Retry",
          onClick: () => {
            setNewMessage(messageContent);
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

  // Typing indicator trigger
  const handleTypingIndicator = () => {
    if (!userId || !receiverId) return;
    socket.emit("typing", { senderId: userId, receiverId });

    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
      socket.emit("stopTyping", { receiverId });
    }, 1500);
  };

  // Get message status icon
  const getMessageStatusIcon = (msg) => {
    const isMe = getStrId(msg.senderId) === getStrId(userId);
    if (!isMe) return null;

    const msgId = msg.id || msg._id;
    const status = sendingMessages.get(msgId);
    const isRead = msg.read; 
    
    if (status === 'sending') return <div className="w-3 h-3 rounded-full border-2 border-slate-400 border-t-white animate-spin" />;
    if (status === 'failed') return <span className="text-red-500 text-xs">Failed</span>;
    if (isRead) return <FaCheckDouble className="w-3 h-3 text-blue-400" />; // Read
    if (status === 'delivered' || msg.delivered) return <FaCheckDouble className="w-3 h-3 text-gray-400" />; // Delivered
    
    return <FaCheck className="w-3 h-3 text-gray-400" />; // Sent
  };

  if (!receiver) {
     return (
         <div className="flex flex-col h-screen items-center justify-center bg-gray-50 dark:bg-black text-gray-500">
             <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm text-center">
                 <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Start a Conversation</h3>
                 <p className="mb-4">Select a contact to start chatting</p>
             </div>
         </div>
     );
  }

  return (
    <div className="flex flex-col h-screen bg-[#F0F2F5] dark:bg-[#0b141a]"> {/* WhatsApp-like background */}
      
      {/* Header */}
      <div className="bg-white dark:bg-[#202c33] px-4 py-3 flex items-center justify-between shadow-sm z-10 sticky top-0">
        <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setCurrentChatPartner(null)}>
                <FaArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300"/>
            </Button>
            <div className="relative">
                <img
                    src={receiver?.imageUrl || "/default-avatar.png"}
                    alt={receiver?.firstName}
                    className="w-10 h-10 rounded-full object-cover"
                />
                {receiver?.status === "Online" && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-[#202c33]"></div>
                )}
            </div>
            <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base leading-tight">
                    {receiver?.firstName} {receiver?.lastName}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {isTyping ? <span className="text-green-500 font-medium">typing...</span> : receiver?.status === "Online" ? "Online" : "Last seen recently"}
                </p>
            </div>
        </div>
        
        <div className="flex gap-4 text-gray-600 dark:text-gray-400">
             <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <FaVideo className="w-5 h-5" />
             </Button>
             <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <FaPhone className="w-4 h-4" />
             </Button>
             <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <FaEllipsisV className="w-4 h-4" />
             </Button>
        </div>
      </div>

      {/* Messages Area - with custom background pattern ideally */}
      <div className="flex-1 overflow-hidden relative bg-[url('/chat-bg-pattern.png')] bg-repeat opacity-95"> 
        <ScrollArea className="h-full px-4 py-2" ref={scrollAreaRef}>
          <div className="flex flex-col justify-end min-h-full pb-4 space-y-2"> {/* Space y-2 for tighter grouping */}
             {messages.length === 0 && (
                <div className="flex items-center justify-center min-h-[50vh]">
                     <div className="bg-[#fff5c4] dark:bg-[#1f2c34] text-center p-3 rounded-lg shadow-sm max-w-xs text-sm text-gray-800 dark:text-gray-200">
                         Messages are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.
                     </div>
                </div>
             )}

             {messages.map((msg, index) => {
               const isMe = getStrId(msg.senderId) === getStrId(userId);
               const isContinuous = index > 0 && getStrId(messages[index-1].senderId) === getStrId(msg.senderId);
               
               return (
                 <div key={msg.id || msg._id || index} className={`flex ${isMe ? "justify-end" : "justify-start"} group mb-1`}>
                    <div className={`
                        relative max-w-[85%] md:max-w-[65%] px-3 py-1.5 shadow-sm text-sm
                        ${isMe 
                            ? "bg-[#d9fdd3] dark:bg-[#005c4b] text-black dark:text-[#e9edef] rounded-l-lg rounded-tr-none rounded-br-lg" 
                            : "bg-white dark:bg-[#202c33] text-black dark:text-[#e9edef] rounded-r-lg rounded-tl-none rounded-bl-lg"
                        }
                        ${!isContinuous ? "mt-1" : ""}
                        items-end gap-2 flex flex-wrap
                    `}>
                        {/* Tail Logic (CSS triangle could go here, but rounded corners work well for now) */}
                        {/* {!isMe && !isContinuous && (
                           <span className="absolute top-0 -left-2 w-3 h-3 bg-white dark:bg-[#202c33] [clip-path:polygon(100%_0,0_0,100%_100%)]"></span>
                        )} */}
                        
                        <span className="leading-relaxed break-words whitespace-pre-wrap">{msg.content}</span>
                        
                        <div className="flex items-center gap-1 self-end ml-2 h-4 select-none shrink-0">
                            <span className={`text-[11px] ${isMe ? "text-gray-500 dark:text-[#8696a0]" : "text-gray-500 dark:text-[#8696a0]"}`}>
                                {msg.createdAt ? format(parseISO(msg.createdAt), "HH:mm") : format(new Date(), "HH:mm")}
                            </span>
                            {isMe && getMessageStatusIcon(msg)}
                        </div>
                    </div>
                 </div>
               );
             })}
             
             {isTyping && (
                <div className="flex justify-start animate-pulse mb-2 pl-4">
                  <div className="bg-white dark:bg-[#202c33] rounded-xl rounded-tl-none p-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    </div>
                  </div>
                </div>
             )}
             <div ref={messagesEndRef} className="h-0" />
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="bg-[#f0f2f5] dark:bg-[#202c33] px-4 py-2 flex items-center gap-2 sticky bottom-0 z-20">
         <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400 hover:bg-transparent">
             <FaSmile className="w-6 h-6" />
         </Button>
         <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400 hover:bg-transparent">
             <FaPaperclip className="w-5 h-5" />
         </Button>
         
         <div className="flex-1 bg-white dark:bg-[#2a3942] rounded-lg flex items-center px-4 py-1.5">
            <Input
                value={newMessage}
                onChange={(e) => {
                    setNewMessage(e.target.value);
                    handleTypingIndicator();
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                    }
                }}
                placeholder="Type a message"
                className="border-0 bg-transparent shadow-none focus-visible:ring-0 px-0 h-9 text-base w-full placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
            />
         </div>
         
         {newMessage.trim() ? (
            <Button
                onClick={sendMessage}
                size="icon"
                className="h-10 w-10 rounded-full bg-[#00a884] hover:bg-[#008f6f] text-white shadow-sm flex-shrink-0"
            >
                <FaPaperPlane className="w-5 h-5 ml-0.5" />
            </Button>
         ) : (
            <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400">
                <FaPhone className="w-5 h-5 rotate-90" /> {/* Microphone icon placeholder really */}
            </Button>
         )}
      </div>
    </div>
  );
};

export default ChatWindow;
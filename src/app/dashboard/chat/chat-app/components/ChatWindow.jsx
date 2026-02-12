"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSession } from "next-auth/react"; 
import { FaVideo, FaPhone, FaPaperPlane, FaEllipsisV } from "react-icons/fa";
// ... imports
import { socket } from "../../../../../lib/socket";

const ChatWindow = () => {
  const axiosPublic = useAxiosPublic();
  const { data: session, status } = useSession();
  const isLoaded = status !== "loading"; 

  const userId = session?.user?.id;
  const receiverId = useSelector((state) => state.chat.selectedUserId);

  const [receiver, setReceiver] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-500">Loading chat...</p>
      </div>
    );
  }

  if (!receiverId) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-500 text-lg">Select a conversation to start messaging</p>
      </div>
    );
  }

  // Fetch receiver info
  useEffect(() => {
    if (!receiverId) return;

    const fetchReceiver = async () => {
      try {
        const { data } = await axiosPublic.get(`/api/users/${receiverId}`);
        setReceiver(data.user);
      } catch (error) {
        console.error("Error fetching receiver:", error);
      }
    };

    fetchReceiver();
  }, [receiverId, axiosPublic]);

  // Join socket & listeners
  useEffect(() => {
    if (!userId) return;

    socket.emit("join", { email: session?.user?.email });

    const handleReceiveMessage = (message) => {
      if (
        (message.senderId === receiverId && message.receiverId === userId) ||
        (message.senderId === userId && message.receiverId === receiverId)
      ) {
        setMessages((prev) => {
          const exists = prev.some((m) => m._id === message._id);
          return exists ? prev : [...prev, message];
        });
      }
    };

    const handleTyping = ({ senderId }) => {
      if (senderId === receiverId) setIsTyping(true);
    };

    const handleStopTyping = () => setIsTyping(false);

    const handleMessageRead = ({ id }) => {
      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, read: true } : msg))
      );
    };

    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);
    socket.on("messageRead", handleMessageRead);

    return () => {
      socket.off("receiveMessage");
      socket.off("typing");
      socket.off("stopTyping");
      socket.off("messageRead");
    };
  }, [userId, receiverId]);

  // Fetch messages
  useEffect(() => {
    if (!userId || !receiverId) return;

    const fetchMessages = async () => {
      try {
        const { data } = await axiosPublic.get(
          `/api/messages?senderId=${userId}&receiverId=${receiverId}`
        );
        setMessages(data || []);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [userId, receiverId, axiosPublic]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const sendMessage = useCallback(async () => {
    if (!newMessage.trim() || !userId || !receiverId) return;

    const messageData = {
      senderId: userId,
      receiverId,
      text: newMessage.trim(),
    };

    try {
      const { data } = await axiosPublic.post("/api/messages/send", messageData);
      socket.emit("sendMessage", data);
      setMessages((prev) => [...prev, data]);
      setNewMessage("");
    } catch (error) {
      console.error("Send failed:", error);
    }
  }, [newMessage, userId, receiverId, axiosPublic]);

  // Typing indicator
  const handleTyping = () => {
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
                    <p className="text-sm lg:text-base whitespace-pre-wrap break-words">
                      {msg.text}
                    </p>
                    <div className="flex items-center gap-2 mt-1 justify-end text-xs opacity-70">
                      <span>{formatTime(msg.timestamp)}</span>
                      {isMe && <span>{msg.read ? "Seen" : "Sent"}</span>}
                    </div>
                  </div>
                </div>
              );
            })
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
              handleTyping();
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
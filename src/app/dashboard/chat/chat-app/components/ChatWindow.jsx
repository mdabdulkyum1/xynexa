"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  FaVideo,
  FaPhone,
  FaPaperPlane,
  FaEllipsisV,
  FaTrashAlt,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAxiosPublic from "@/hooks/AxiosPublic/useAxiosPublic";
import { useSelector } from "react-redux";
import { format, isToday, parseISO } from "date-fns";
import { MoreVertical } from "lucide-react";
import { socket } from "../../../../../lib/socket";


const ChatWindow = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useUser();
  const userId = user?.id;
  const email = user?.primaryEmailAddress?.emailAddress;

  const receiverId = useSelector((state) => state.chat.selectedUserId);
  
  const [receiver, setReceiver] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const messagesEndRef = useRef(null);

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

  // Join socket & setup listeners
  useEffect(() => {
    if (!userId) return;

    socket.emit("join", { email });

    const handleReceiveMessage = (message) => {
      // Only add the message if it belongs to the current chat
      if (
        (message.senderId === receiverId && message.receiverId === userId) ||
        (message.senderId === userId && message.receiverId === receiverId)
      ) {
        setMessages((prev) => {
          const exists = prev.some((msg) => msg._id === message._id);
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

    const handleMessageDeleted = ({ messageId }) => {
      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
    };

    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);
    socket.on("messageRead", handleMessageRead);
    socket.on("messageDeleted", handleMessageDeleted);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
      socket.off("messageRead", handleMessageRead);
      socket.off("messageDeleted", handleMessageDeleted);
    };
  }, [userId, receiverId]);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axiosPublic.get(
          `/api/messages?senderId=${userId}&receiverId=${receiverId}`
        );
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (userId && receiverId) fetchMessages();
  }, [userId, receiverId, axiosPublic]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mark unread messages as read
  useEffect(() => {
    if (!receiverId) return;

    messages.forEach((message) => {
      if (!message.read && message.receiverId === userId) {
        handleMessageRead(message._id);
      }
    });
  }, [messages, receiverId]);

  // Send message
  const sendMessage = useCallback(async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      senderId: userId,
      receiverId,
      text: newMessage,
    };

    try {
      const { data } = await axiosPublic.post(
        "/api/messages/send",
        messageData
      );

      // Emit to receiver
      socket.emit("sendMessage", data);

      // Add to local messages immediately
      setMessages((prev) => [...prev, data]);

      // Clear input
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message.");
    }
  }, [newMessage, userId, receiverId, axiosPublic]);

  // Typing indicator
  const handleTyping = () => {
    socket.emit("typing", { senderId: userId, receiverId });

    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
      socket.emit("stopTyping", { receiverId });
    }, 2000);
  };

  // Handle read
  const handleMessageRead = (messageId) => {
    if (!messageId || !receiverId) return;

    socket.emit("messageRead", { _id: messageId, receiverId });

    setMessages((prev) =>
      prev.map((msg) => (msg._id === messageId ? { ...msg, read: true } : msg))
    );
  };

  // Delete message function
  const handleDeleteMessage = async (messageId) => {
    if (!messageId) return;

    try {
      await axiosPublic.delete(`/api/messages/${messageId}`);
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== messageId)
      );
      socket.emit("deleteMessage", { messageId, receiverId });
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const formatLastActive = (timestamp) => {
    const date = parseISO(timestamp);

    if (isToday(date)) {
      return format(date, "h:mm a"); // 9:34 AM
    }
  };

  if (!receiverId) {
    return (
      <div>
        <h1>No user selected!!</h1>
      </div>
    );
  }

  const toggleMenu = (messageId) => {
    setIsMenuOpen((prev) => (prev === messageId ? null : messageId));
  };

return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">

  {/* Header */}
  <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center gap-4">
    <img src={receiver?.imageUrl} className="w-12 h-12 rounded-full ring-4 ring-gray-200 dark:ring-gray-800" />
    <div className="flex-1">
      <h3 className="font-bold text-lg text-gray-900 dark:text-white">
        {receiver?.firstName} {receiver?.lastName}
      </h3>
      <p className="text-sm text-green-600 font-medium">
        {isTyping ? "typing..." : receiver?.status === "Online" ? "Active now" : "Offline"}
      </p>
    </div>
    <div className="flex gap-4 text-gray-500">
      <FaPhone className="w-6 h-6 hover:text-blue-600 cursor-pointer transition" />
      <FaVideo className="w-6 h-6 hover:text-blue-600 cursor-pointer transition" />
      <FaEllipsisV className="w-6 h-6 hover:text-blue-600 cursor-pointer transition" />
    </div>
  </div>

  {/* Messages Area - Full Height */}
  <ScrollArea className="flex-1 px-6 py-4">
    <div className="space-y-4 max-w-4xl mx-auto">
      {messages.map((msg) => {
        const isMe = msg.senderId === userId;
        return (
          <div key={msg._id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xs lg:max-w-md px-5 py-3 rounded-3xl shadow-sm ${
              isMe 
                ? "bg-blue-600 text-white rounded-tr-none" 
                : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-tl-none border border-gray-200 dark:border-gray-700"
            }`}>
              <p className="text-sm lg:text-base whitespace-pre-wrap break-words">{msg.text}</p>
              <div className="flex items-center gap-2 mt-1 justify-end">
                <span className="text-xs opacity-70">
                  {format(parseISO(msg.timestamp), "h:mm a")}
                </span>
                {isMe && <span>{msg.read ? "Seen" : "Sent"}</span>}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  </ScrollArea>

  {/* Input */}
  <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4">
    <div className="flex items-center gap-3 max-w-4xl mx-auto">
      <Input
        value={newMessage}
        onChange={(e) => { setNewMessage(e.target.value); handleTyping(); }}
        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
        placeholder="Write a message..."
        className="flex-1 h-12 rounded-full bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-blue-500"
      />
      <Button size="icon" className="h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg">
        <FaPaperPlane className="w-5 h-5" />
      </Button>
    </div>
  </div>
</div>
);
};

export default ChatWindow;




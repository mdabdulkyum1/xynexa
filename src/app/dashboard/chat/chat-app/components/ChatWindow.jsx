"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useUser } from "@clerk/clerk-react";
import { io } from "socket.io-client";
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

const socket = io(process.env.NEXT_PUBLIC_SERVER_URL);

const ChatWindow = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useUser();
  const userId = user?.id;

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

    socket.emit("join", { userId });

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
  <div className="flex flex-col justify-between w-full mx-2  bg-white shadow-md rounded-lg dark:bg-black">
    {/* Header */}
    <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
      <img
        src={receiver?.imageUrl}
        alt={`${receiver?.firstName} ${receiver?.lastName}`}
        className="w-12 h-12 rounded-full mr-3"
      />
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-400">
          {receiver?.firstName} {receiver?.lastName}
        </p>
        <p className="text-xs text-green-500">
          {isTyping ? "Typing..." : "Online"}
        </p>
      </div>
      <div className="flex items-center space-x-2 text-gray-500">
        <FaPhone className="text-xl cursor-pointer" aria-label="Call" />
        <FaVideo className="text-xl cursor-pointer" aria-label="Video call" />
        <FaEllipsisV className="text-xl cursor-pointer" aria-label="More options" />
      </div>
    </div>

    {/* Chat Body */}
    <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: "350px" }}>
      {messages.map((msg, index) => {
        const isUser = msg.senderId === userId;

        return (
          <div
            key={index}
            className={`relative flex ${isUser ? "justify-end" : ""}`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs ${
                isUser
                  ? "bg-blue-500 text-white dark:bg-blue-700"
                  : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
              }`}
            >
              <div className="flex justify-between gap-4 items-center">
                <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                <div className="flex items-center gap-2">
                  {msg?.timestamp && (
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {formatLastActive(msg.timestamp)}
                    </p>
                  )}
                  <span className="text-xs">{msg.read ? "✔️" : "⏳"}</span>
                  {isUser && (
                    <button
                      onClick={() => toggleMenu(msg._id)}
                      aria-label="Message options"
                      className="cursor-pointer"
                    >
                      <MoreVertical />
                    </button>
                  )}
                </div>
              </div>

              {isMenuOpen === msg._id && isUser && (
                <div className="absolute right-0 mt-2 z-10">
                  <button
                    className="absolute top-0 right-0 p-1 text-red-500 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteMessage(msg._id);
                    }}
                    aria-label="Delete message"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>

    {/* Chat Input */}
    <div className="flex items-center gap-4 p-3 border-t border-gray-200 dark:border-gray-700">
      <Input
        value={newMessage}
        onChange={(e) => {
          setNewMessage(e.target.value);
          handleTyping();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
        placeholder="Type your message..."
        className="flex-1"
        aria-label="Message input"
      />
      <Button className="dark:bg-gray-900" onClick={sendMessage} aria-label="Send message">
        <FaPaperPlane className="dark:text-white" />
      </Button>
    </div>
  </div>
);









};

export default ChatWindow;




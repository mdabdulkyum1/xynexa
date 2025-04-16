"use client"

import { useState, useEffect, useRef, useCallback } from "react";
import { useUser } from "@clerk/clerk-react";
import { io } from "socket.io-client";
import { FaVideo, FaPhone, FaPaperPlane, FaEllipsisV, FaTrashAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAxiosPublic from "@/hooks/AxiosPublic/useAxiosPublic";
import { useSelector } from "react-redux";

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
  }, [receiverId]);

  // Join socket & setup listeners
  useEffect(() => {
    if (!userId) return;

    socket.emit("join", { userId });

    const handleReceiveMessage = (message) => {
      setMessages((prev) => {
        const exists = prev.some((msg) => msg._id === message._id);
        return exists ? prev : [...prev, message];
      });
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
  }, [userId, receiverId]);

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
      const { data } = await axiosPublic.post("/api/messages/send", messageData);
  
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
      // Send delete request to the server
      await axiosPublic.delete(`/api/messages/${messageId}`);

      // Remove the message from state
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== messageId)
      );

      // Optionally, you can also emit a socket event to inform other users
      socket.emit("deleteMessage", { messageId, receiverId });

   
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  if (!receiverId) {
    return <div><h1>No user selected!!</h1></div>;
  }

  return (
    <div className="flex flex-col justify-between w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <div className="flex items-center p-4 border-b border-gray-200">
        <img src={receiver?.imageUrl} alt="User" className="w-12 h-12 rounded-full mr-3" />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-800">
            {receiver?.firstName + " " + receiver?.lastName}
          </p>
          <p className="text-xs text-gray-500">{isTyping ? "Typing..." : "Online"}</p>
        </div>
        <FaPhone className="text-gray-500 text-xl mx-2 cursor-pointer" />
        <FaVideo className="text-gray-500 text-xl mx-2 cursor-pointer" />
        <FaEllipsisV className="text-gray-500 text-xl mx-2 cursor-pointer" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: "350px" }}>
        {messages.map((msg, index) => (
          <div
            onClick={() => handleMessageRead(msg._id)}
            key={index}
            className={`relative flex ${msg.senderId === userId ? "justify-end" : ""}`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs ${
                msg.senderId === userId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
              <div className="text-xs text-right">
                {msg.read ? "✔️" : "⏳"}
              </div>

              {/* Delete Button */}
              {msg.senderId === userId && (
                <button
                  className="absolute top-0 right-0 p-1 text-red-500"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click from triggering message read
                    handleDeleteMessage(msg._id);
                  }}
                >
                  <FaTrashAlt />
                </button>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center p-3 border-t border-gray-200">
        <Input
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            handleTyping();
          }}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button onClick={sendMessage}>
          <FaPaperPlane />
        </Button>
      </div>
    </div>
  );
};

export default ChatWindow;

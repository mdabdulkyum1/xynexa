"use client";
import { useState, useRef, useEffect } from "react";
import { FaVideo, FaPhone, FaPaperclip, FaSmile, FaPaperPlane, FaEllipsisV } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Page() {
  const [messages, setMessages] = useState([
    { sender: "other", text: "Hey, how are you?", time: "10:02 AM" },
    { sender: "me", text: "I'm good! What about you?", time: "10:05 AM" },
    { sender: "other", text: "Just working on a project. Need help?", time: "10:07 AM" },
    { sender: "me", text: "Sure! What's up?", time: "10:10 AM" },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { sender: "me", text: newMessage, time: "Just now" }]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Welcome to the Chat</h1>

      {/* Chat Box */}
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg flex flex-col h-[500px]">
        {/* Header */}
        <div className="flex items-center p-4 border-b bg-blue-600 text-white rounded-t-lg">
          <img src="https://placehold.co/50x50" alt="User" className="w-10 h-10 rounded-full mr-3" />
          <div className="flex-1">
            <p className="text-sm font-medium">Anil</p>
            <p className="text-xs opacity-75">Online</p>
          </div>
          <FaPhone className="text-lg mx-2 cursor-pointer" />
          <FaVideo className="text-lg mx-2 cursor-pointer" />
          <FaEllipsisV className="text-lg mx-2 cursor-pointer" />
        </div>

        {/* Messages (Scrollable) */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3" style={{ maxHeight: "350px" }}>
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-center ${msg.sender === "me" ? "justify-end" : ""}`}>
              {msg.sender !== "me" && (
                <div className="bg-gray-200 text-gray-800 text-sm p-3 rounded-lg max-w-xs">{msg.text}</div>
              )}
              <div className="text-xs text-gray-500 mx-2">{msg.time}</div>
              {msg.sender === "me" && (
                <div className="bg-blue-600 text-white text-sm p-3 rounded-lg max-w-xs">{msg.text}</div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex items-center p-3 border-t">
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <FaPaperclip className="text-gray-500 text-xl mx-3 cursor-pointer" />
          <FaSmile className="text-gray-500 text-xl mx-3 cursor-pointer" />
          <Button onClick={sendMessage} variant="ghost">
            <FaPaperPlane className="text-blue-600 text-xl" />
          </Button>
        </div>
      </div>
    </div>
  );
}

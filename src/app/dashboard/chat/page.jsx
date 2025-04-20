"use client";
import { useState, useRef, useEffect } from "react";
import { FaVideo, FaPhone, FaPaperclip, FaSmile, FaPaperPlane, FaEllipsisV } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";


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
    <div className="flex flex-col min-h-screen   bg-gray-100 dark:bg-black p-4">
      <Image src="/assets/images/Conversation-pana.png" alt="chat-image" width={400} height={400}></Image>
      <div className="text-center">
        <h2 className="text-4xl font-bold text-teal-700 mb-4">Stay connected with friends and colleagues.</h2>
        <p className="text-xl text-gray-500">Discuss ideas, share updates, and work together effortlessly!</p>
      </div>
      
    </div>
  );
}

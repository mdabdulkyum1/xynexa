"use client";

import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import { io } from "socket.io-client";
import { FaVideo, FaPhone, FaPaperPlane, FaEllipsisV } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAxiosPublic from "@/hooks/AxiosPublic/useAxiosPublic";
import { useSelector } from "react-redux";

const socket = io(process.env.NEXT_PUBLIC_SERVER_URL);
 
const ChatWindow = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useUser();
  const userId = user?.id;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [receiver, setReceiver] = useState(null);
  const messagesEndRef = useRef(null);

  const receiverId = useSelector((state) => state.chat.selectedUserId);
  

  const fetchReceiver = async () => {
    try{
           
      const {data} = await axiosPublic.get(`/api/users/${receiverId}`);
      setReceiver(data.user);

    }catch(error){
        console.error("Error fetching messages:", error);
    }
  }

  useEffect(() => {
      fetchReceiver();
  } , [receiverId]);


  // useEffect(() => {
  //   if (!userId) return;

  //   socket.emit("join", { userId });

  //   socket.on("receiveMessage", (message) => {
  //     setMessages((prev) => [...prev, message]);
  //   });

  //   socket.on("typing", ({ senderId }) => {
  //     if (senderId === receiverId) {
  //       setIsTyping(true);
  //     }
  //   });

  //   socket.on("stopTyping", () => setIsTyping(false));
  //       socket.on("messageRead", ({ messageId }) => {
  //       setMessages((prev) => prev.map((msg) => (msg._id === messageId ? { ...msg, read: true } : msg)));
  //   });

  //   return () => {
  //     socket.off("receiveMessage");
  //     socket.off("typing");
  //     socket.off("stopTyping");
  //     socket.off("messageRead");
  //   };
  // }, [userId, receiverId]);

  useEffect(() => {
    if (!userId) return;
  
    // Join room when user connects
    socket.emit("join", { userId });
  
    // Listen for new messages
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });
  
    // Listen for typing events
    socket.on("typing", ({ senderId }) => {
      if (senderId === receiverId) {
        setIsTyping(true);
      }
    });
  
    socket.on("stopTyping", () => setIsTyping(false));
  
    // Listen for message read event
    socket.on("messageRead", ({ id }) => {
      // console.log("Message read:", id, "<<<<test>>>>");
      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, read: true } : msg)) // Fixed issue
      );
    });
  
    return () => {
      socket.off("receiveMessage");
      socket.off("typing");
      socket.off("stopTyping");
      socket.off("messageRead");
    };
  }, [userId, receiverId]); // Dependencies are correctly set
  

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axiosPublic.get(`/api/messages?senderId=${userId}&receiverId=${receiverId}`);
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (userId && receiverId) fetchMessages();
  }, [userId, receiverId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (receiverId) {
      messages.forEach((message) => {
        if (!message.read) {
          handleMessageRead(message._id);
        }
      });
    }
  }, [receiverId, messages]);
  

  const sendMessage = async () => {
  if (!newMessage.trim()) return;

  const messageData = {
    senderId: userId,
    receiverId,
    text: newMessage,
  };

  try {
    const { data } = await axiosPublic.post("/api/messages/send", messageData);
    
    // Emit socket event
    socket.emit("sendMessage", data);

    // Update state safely
    setMessages((prev) => [...prev, { ...data, read: false }]);
    
    // Clear input field
    setNewMessage("");
  } catch (error) {
    console.error("Error sending message:", error);
    alert("Failed to send message. Please try again.");
  }
};

const handleTyping = () => {
      socket.emit("typing", { senderId: userId, receiverId });
      setTimeout(() => socket.emit("stopTyping", { receiverId }), 2000);
    };

    const handleMessageRead = (messageId) => {
      if (!messageId || !receiverId) return;
    
      socket.emit("messageRead", { _id: messageId, receiverId });
    
      // Update local state to mark message as read instantly
      setMessages((prev) =>
        prev.map((msg) => (msg._id === messageId ? { ...msg, read: true } : msg))
      );
    };
    

  if(receiverId){
    return (
      <div className="flex flex-col justify-between w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg">
            <div className="flex items-center p-4 border-b border-gray-200">
              <img src={receiver?.imageUrl} alt="User" className="w-12 h-12 rounded-full mr-3" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{receiver?.firstName + receiver?.lastName}</p>
                <p className="text-xs text-gray-500">{isTyping ? "Typing..." : "Online"}</p>
              </div>
              <FaPhone className="text-gray-500 text-xl mx-2 cursor-pointer" />
              <FaVideo className="text-gray-500 text-xl mx-2 cursor-pointer" />
              <FaEllipsisV className="text-gray-500 text-xl mx-2 cursor-pointer" />
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: "350px" }}>
              {messages.map((msg, index) => (
                <div onClick={()=> handleMessageRead(msg._id)} key={index} className={`flex ${msg.senderId === userId ? "justify-end" : ""}`}>
                  <div className={`p-3 rounded-lg max-w-xs ${msg.senderId === userId ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
                    {msg.text}
                    <div className="text-xs text-right">{msg.read ? "✔️" : "⏳"}</div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex items-center p-3 border-t border-gray-200">
              <Input value={newMessage} onChange={(e) => { setNewMessage(e.target.value); handleTyping(); }} placeholder="Type your message..." className="flex-1" />
              <Button onClick={sendMessage}><FaPaperPlane /></Button>
            </div>
      </div>
    );
  }else{
    return (
      <div className="">
        <h1>No user selected!!</h1>
      </div>
    )
  }

  
};

export default ChatWindow;


// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useUser } from "@clerk/clerk-react";
// import { io } from "socket.io-client";
// import axios from "axios";
// import { FaVideo, FaPhone, FaPaperPlane, FaEllipsisV } from "react-icons/fa";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import useAxiosPublic from "@/hooks/AxiosPublic/useAxiosPublic";

// const socket = io(process.env.NEXT_PUBLIC_SERVER_URL);

// const ChatWindow = ({ receiverId }) => {

//   const axiosPublic = useAxiosPublic();

//   const { user } = useUser();
//   const userId = user?.id;
//   console.log(userId);

//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     if (!userId) return;

//     socket.emit("join", { userId });

//     socket.on("receiveMessage", (message) => {
//       setMessages((prev) => [...prev, message]);
//     });

//     socket.on("typing", ({ senderId }) => {
//       if (senderId === receiverId) {
//         setIsTyping(true);
//       }
//     });

//     socket.on("stopTyping", () => setIsTyping(false));

//     socket.on("messageRead", ({ messageId }) => {
//       setMessages((prev) =>
//         prev.map((msg) => (msg._id === messageId ? { ...msg, read: true } : msg))
//       );
//     });

//     return () => {
//       socket.off("receiveMessage");
//       socket.off("typing");
//       socket.off("stopTyping");
//       socket.off("messageRead");
//     };
//   }, [userId, receiverId]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const { data } = await axiosPublic.get(`/api/messages?senderId=${userId}&receiverId=${receiverId}`);
//         setMessages(data);
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       }
//     };

//     if (userId && receiverId) fetchMessages();
//   }, [userId, receiverId]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendMessage = async () => {
//     if (newMessage.trim() === "") return;

//     const messageData = {
//       senderId: userId,
//       receiverId,
//       text: newMessage,
//     };

//     try {
//       const { data } = await axios.post("/messages", messageData);
//       socket.emit("sendMessage", data);
//       setMessages([...messages, { ...data, read: false }]);
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   const handleTyping = () => {
//     socket.emit("typing", { senderId: userId, receiverId });
//     setTimeout(() => socket.emit("stopTyping", { receiverId }), 2000);
//   };

//   return (
//     <div className="flex flex-col justify-between w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg">
//       <div className="flex items-center p-4 border-b border-gray-200">
//         <img src="https://placehold.co/50x50" alt="User" className="w-12 h-12 rounded-full mr-3" />
//         <div className="flex-1">
//           <p className="text-sm font-medium text-gray-800">Anil</p>
//           <p className="text-xs text-gray-500">{isTyping ? "Typing..." : "Online"}</p>
//         </div>
//         <FaPhone className="text-gray-500 text-xl mx-2 cursor-pointer" />
//         <FaVideo className="text-gray-500 text-xl mx-2 cursor-pointer" />
//         <FaEllipsisV className="text-gray-500 text-xl mx-2 cursor-pointer" />
//       </div>

//       <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: "350px" }}>
//         {messages.map((msg, index) => (
//           <div key={index} className={`flex ${msg.senderId === userId ? "justify-end" : ""}`}>
//             <div className={`p-3 rounded-lg max-w-xs ${msg.senderId === userId ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
//               {msg.text}
//               <div className="text-xs text-right">{msg.read ? "✔️" : "⏳"}</div>
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="flex items-center p-3 border-t border-gray-200">
//         <Input value={newMessage} onChange={(e) => { setNewMessage(e.target.value); handleTyping(); }} placeholder="Type your message..." className="flex-1" />
//         <Button onClick={sendMessage}><FaPaperPlane /></Button>
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;

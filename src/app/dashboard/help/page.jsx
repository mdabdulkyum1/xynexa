// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { useChat } from "@ai-sdk/react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { ArrowDownCircleIcon, MessageCircle, Send, X } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area"; // Assuming this is from your UI library
// import { Input } from "@/components/ui/input";

// const Help = () => {
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [showChatIcon, setShowChatIcon] = useState(false);
//   const chatIconRef = useRef(null);
//   const scrollRef = useRef<HTMLDivElement>(null); // Ref for the ScrollArea's content

//   const {
//     messages,
//     input,
//     handleInputChange,
//     handleSubmit,
//     isLoading,
//     stop,
//     error,
//   } = useChat({ api: "/api/gemini" });

//   console.log(messages, "messages", error, "error");

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 200) {
//         setShowChatIcon(true);
//       } else {
//         setShowChatIcon(false);
//         setIsChatOpen(false);
//       }
//     };

//     handleScroll();
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const toggleChat = () => {
//     setIsChatOpen(!isChatOpen);
//   };

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [messages]);

//   return (
//     <div className="flex flex-col min-h-screen p-4">
//       <p className="border h-[2000px]">Hay</p>

//       <AnimatePresence>
//         {showChatIcon && (
//           <motion.div
//             ref={chatIconRef}
//             className="fixed bottom-4 right-4 z-50"
//             initial={{ opacity: 0, y: 100 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 100 }}
//             transition={{ duration: 0.2 }}
//           >
//             <Button
//               onClick={toggleChat}
//               size="icon"
//               className="bg-teal-500 size-16 text-white rounded-full shadow-lg hover:bg-teal-600 transition duration-300"
//             >
//               {!isChatOpen ? (
//                 <MessageCircle className="size-12" />
//               ) : (
//                 <ArrowDownCircleIcon className="size-12" />
//               )}
//             </Button>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {isChatOpen && (
//           <motion.div
//             className="fixed bottom-20 right-4 bg-white shadow-lg rounded-lg p-4 w-[500px] z-50"
//             initial={{ opacity: 0, y: 100 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 100 }}
//             transition={{ duration: 0.2 }}
//           >
//             <Card className="border-2">
//               <CardHeader className="flex items-center justify-between">
//                 <CardTitle className="text-lg font-bold">
//                   Chat with AI
//                 </CardTitle>
//                 <Button variant="ghost" size="sm" onClick={toggleChat}>
//                   <X className="size-6" />
//                 </Button>
//               </CardHeader>
//               <CardContent>
//                 <ScrollArea className="h-[350px] pr-4" innerRef={scrollRef}> {/* Changed here */}
//                   <div>
//                     {messages.length === 0 && (
//                       <div className="flex items-center justify-center h-full">
//                         <p className="text-gray-500">No messages yet</p>
//                       </div>
//                     )}
//                     {messages.map((message, index) => (
//                       <div
//                         key={index}
//                         className={`flex ${
//                           message.role === "user"
//                             ? "justify-end"
//                             : "justify-start"
//                         } mb-2`}
//                       >
//                         <div
//                           className={`p-2 rounded-md max-w-xs ${
//                             message.role === "user"
//                               ? "bg-teal-500 text-white"
//                               : "bg-gray-100 text-black"
//                           }`}
//                         >
//                           <ReactMarkdown
//                             children={message.content}
//                             remarkPlugins={[remarkGfm]}
//                             components={{
//                               code({
//                                 node,
//                                 inline,
//                                 className,
//                                 children,
//                                 ...props
//                               }) {
//                                 return inline ? (
//                                   <code
//                                     className="bg-gray-200 rounded-md px-1 py-0.5"
//                                     {...props}
//                                   >
//                                     {children}
//                                   </code>
//                                 ) : (
//                                   <pre className="bg-gray-200 rounded-md p-4 overflow-auto">
//                                     <code className={className} {...props}>
//                                       {children}
//                                     </code>
//                                   </pre>
//                                 );
//                               },
//                               ul: ({ children }) => (
//                                 <ul className="list-disc pl-5">{children}</ul>
//                               ),
//                               ol: ({ children }) => (
//                                 <ol className="list-decimal pl-5">{children}</ol>
//                               ),
//                             }}
//                           />
//                         </div>
//                       </div>
//                     ))}
//                     {isLoading && (
//                       <div className="flex items-center justify-center h-full">
//                         <p className="text-gray-500" onClick={stop}>
//                           Loading...
//                         </p>
//                       </div>
//                     )}
//                     {error && (
//                       <div className="flex items-center justify-center h-full">
//                         <p className="text-red-500">
//                           {typeof error === "string"
//                             ? error
//                             : JSON.stringify(error)}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </ScrollArea>
//               </CardContent>
//               <CardFooter>
//                 <form
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                     handleSubmit(e);
//                   }}
//                   className="flex w-full items-center space-x-2"
//                 >
//                   <Input
//                     value={input}
//                     onChange={handleInputChange}
//                     placeholder="Type your message..."
//                     className="flex-1"
//                   />
//                   <Button
//                     type="submit"
//                     disabled={isLoading}
//                     size="icon"
//                     className="bg-teal-500 text-white rounded-md size-9 hover:bg-teal-600 transition duration-300"
//                   >
//                     <Send className="size-5" />
//                   </Button>
//                 </form>
//               </CardFooter>
//             </Card>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Help;
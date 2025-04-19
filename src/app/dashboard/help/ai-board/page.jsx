"use client";
import React, { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDownCircleIcon, Bot, MessageCircle, Send, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AiBoard = () => {
  const scrollRef = useRef < HTMLDivElement > null;
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    error,
  } = useChat({ api: "/api/gemini" });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full  max-w-3xl shadow-lg rounded-lg overflow-hidden border-2 border-gray-200">
        <CardHeader className="bg-primary flex-col text-white p-4 flex items-center space-x-2">
          <Bot className="size-8" />
          <CardTitle className="text-xl font-bold">
            XYnexa AI Support
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 lg:h-[450px] xl:h-[550px] overflow-y-auto flex gap-3 flex-col-reverse">
          <div className="flex flex-col space-y-2">
            
              <div className=" max-w-[80%] flex gap-3 items-center px-2 py-1 text-sm">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="bg-gray-200 rounded-md px-2 py-1 text-sm">
                  Hi! How can I help you today? 😊
                </p>
              </div>
           
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`p-3 rounded-md max-w-[80%] text-sm ${
                    message.role === "user"
                      ? "bg-teal-100 text-teal-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <ReactMarkdown
                    children={message.content}
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        return inline ? (
                          <code
                            className="bg-gray-200 rounded-md px-1 py-0.5 text-sm"
                            {...props}
                          >
                            {children}
                          </code>
                        ) : (
                          <pre className="bg-gray-200 rounded-md p-3 overflow-auto text-sm">
                            <code className={className} {...props}>
                              {children}
                            </code>
                          </pre>
                        );
                      },
                      ul: ({ children }) => (
                        <ul className="list-disc pl-5">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal pl-5">{children}</ol>
                      ),
                    }}
                  />
                </div>
                {message.role === "user" && (
                  <Avatar>
                    <AvatarImage
                      src="https://images.icon-icons.com/3054/PNG/512/account_profile_user_icon_190494.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center justify-center text-gray-500 animate-pulse">
                Loading...
              </div>
            )}
            {error && (
              <div className="text-center text-red-500 text-sm">
                Error:{" "}
                {typeof error === "string" ? error : JSON.stringify(error)}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className='p-3'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            className="flex w-full items-center space-x-2"
          >
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={isLoading}
              
              className="bg-primary text-white rounded-md  hover:bg-teal-600 transition duration-300"
            >
              <Send className="size-5" /> Send
            </Button>
          </form>
        </CardFooter>
      </div>
    </div>
  );
};

export default AiBoard;

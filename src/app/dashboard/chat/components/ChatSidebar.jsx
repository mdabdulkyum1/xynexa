"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaUsers } from "react-icons/fa";
import useAxiosPublic from "@/hooks/AxiosPublic/useAxiosPublic";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import ChatWindow from "../chat-app/components/ChatWindow";


const ChatSidebar = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useUser();
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchUsers = async () => {
    if (user) {
      try {
        const res = await axiosPublic.get("/api/online/users");
        setUsers(res.data.onlineUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

  const groups = [
    { id: 1, name: "React Developers", img: "https://placehold.co/40x40" },
    { id: 2, name: "Gaming Squad", img: "https://placehold.co/40x40" },
    { id: 3, name: "UI Designers", img: "https://placehold.co/40x40" },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="relative w-80">
        <Card className="p-4 h-[600px] flex flex-col">
          {/* Search Bar */}
          <div className="mb-4">
            <Input type="text" placeholder="Search..." className="w-full" />
          </div>

          {/* Scrollable List */}
          <ScrollArea className="flex-1 overflow-y-auto">
            {/* People Section */}
            <h3 className="text-lg font-medium text-gray-800 mb-3">People</h3>
            <div className="mb-4 space-y-3">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer transition"
                  onClick={() => setSelectedUserId(user._id)} // Set selected user
                >
                  <img
                    src={user.imageUrl}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      {user.firstName} {user.lastName}
                    </p>
                    <p
                      className={`text-xs ${
                        user.status === "Online"
                          ? "text-green-500"
                          : "text-gray-500"
                      }`}
                    >
                      {user.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Groups Section */}
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
              <FaUsers className="mr-2" /> Groups
            </h3>
            <div className="space-y-3">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer transition"
                >
                  <img
                    src={group.img}
                    alt={group.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <p className="text-sm font-medium text-gray-800">
                    {group.name}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Chat Window */}
      <div className="flex-1">
        {selectedUserId ? (
          <ChatWindow receiverId={selectedUserId} />
        ) : (
          <div className="flex items-center justify-center w-full h-[600px] text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;

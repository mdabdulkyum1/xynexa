"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetTeamsByEmailForGroupChatQuery } from "@/redux/features/Api/teamApi";
import { setSelectedUserId } from "@/redux/features/Slice/chatSlice";
import { setGroupChatId } from "@/redux/features/Slice/groupChatSlice";
import { useUser } from "@clerk/nextjs";
import { format, isToday, isYesterday, parseISO } from "date-fns";
import { Search, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { socket } from "../../../../lib/socket";

const ChatSidebar = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const userEmail = user?.emailAddresses[0]?.emailAddress;

  const { data: groups = [] } = useGetTeamsByEmailForGroupChatQuery(userEmail);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [active, setActive] = useState(null);

  // Fetch initial online users from API
  useEffect(() => {
    const fetchAllUsers = async () => {
      if (!userEmail) return;
      try {
        const res = await fetch(`/api/online/users/${userEmail}`);
        const data = await res.json();
        const sorted = data.uniqueMembers.sort((a, b) => {
          if (a.status === b.status) {
            return new Date(b.lastActive) - new Date(a.lastActive);
          }
          return a.status === "Online" ? -1 : 1;
        });
        setOnlineUsers(sorted);
      } catch (err) {
        console.error("Error loading users:", err);
      }
    };
    fetchAllUsers();
  }, [userEmail]);

  // Socket listeners
  useEffect(() => {
    const handleUserStatus = ({ email, status }) => {
      setOnlineUsers((prev) => {
        const exists = prev.find((u) => u.email === email);
        if (exists) {
          // Update existing user
          return prev.map((u) =>
            u.email === email ? { ...u, status, lastActive: new Date() } : u
          );
        } else {
          // Add new user
          return [
            ...prev,
            {
              _id: email,
              clerkId: email,
              email,
              firstName: email.split("@")[0],
              lastName: "",
              imageUrl: "/default-avatar.png",
              status,
              lastActive: new Date(),
            },
          ];
        }
      });
    };

    const handleOnlineUsers = (emails) => {
      setOnlineUsers((prev) => {
        const updatedUsers = [...prev];

        // Add new users who are online
        emails.forEach((email) => {
          if (!updatedUsers.find((u) => u.email === email)) {
            updatedUsers.push({
              _id: email,
              clerkId: email,
              email,
              firstName: email.split("@")[0],
              lastName: "",
              imageUrl: "/default-avatar.png",
              status: "Online",
              lastActive: new Date(),
            });
          }
        });

        // Update status for existing users
        return updatedUsers.map((u) => ({
          ...u,
          status: emails.includes(u.email) ? "Online" : "Offline",
        }));
      });
    };

    socket.on("user-online-status", handleUserStatus);
    socket.on("user-offline", handleUserStatus);
    socket.on("online-users", handleOnlineUsers);

    return () => {
      socket.off("user-online-status", handleUserStatus);
      socket.off("user-offline", handleUserStatus);
      socket.off("online-users", handleOnlineUsers);
    };
  }, []);

  const formatLastActive = (timestamp) => {
    if (!timestamp) return "Never";
    const date = parseISO(timestamp);
    if (isToday(date)) return format(date, "h:mm a");
    if (isYesterday(date)) return "Yesterday";
    return format(date, "MMM d");
  };

  const handleUserSelect = (clerkId) => {
    setActive(clerkId);
    dispatch(setSelectedUserId(clerkId));
    dispatch(setGroupChatId(null));
  };

  const handleGroupSelect = (id) => {
    setActive(id);
    dispatch(setGroupChatId(id));
    dispatch(setSelectedUserId(null));
  };

  return (
    <div className="flex border-r-2 border-l-2 dark:border-gray-700">
      <div className="relative w-40 md:w-80">
        <Card className="p-4 h-[90vh] flex flex-col bg-blue-50/50 dark:bg-gray-900">
          {/* Search */}
          <div className="flex items-center bg-white dark:bg-gray-800 rounded-2xl shadow-sm px-4 py-2 mb-4 border border-gray-200 dark:border-gray-700">
            <Search className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="outline-none w-full bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-400"
            />
          </div>

          <ScrollArea className="flex-1">
            {/* Groups */}
            <div className="space-y-3 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3 flex items-center">
                <Users className="mr-2" /> Groups
              </h3>
              {groups.map((group) => (
                <Link href="/dashboard/chat/chat-app" key={group._id}>
                  <div
                    onClick={() => handleGroupSelect(group._id)}
                    className={`flex items-center p-3 rounded-md cursor-pointer transition ${
                      active === group._id
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                      <Users />
                    </div>
                    <p className="font-medium">{group.name}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* People */}
            <div className="space-y-3 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm mt-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
                People
              </h3>
              {onlineUsers.map((u) => (
                <Link href="/dashboard/chat/chat-app" key={u._id}>
                  <div
                    onClick={() => handleUserSelect(u.clerkId)}
                    className={`flex items-center p-3 rounded-md cursor-pointer transition ${
                      active === u.clerkId
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={u.imageUrl || "/default-avatar.png"}
                        alt={u.firstName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {u.status === "Online" && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-sm">
                          {u.firstName} {u.lastName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatLastActive(u.lastActive)}
                        </p>
                      </div>
                      <p
                        className={`text-xs font-medium ${
                          u.status === "Online" ? "text-green-500" : "text-gray-500"
                        }`}
                      >
                        {u.status}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};

export default ChatSidebar;

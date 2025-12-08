"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import useAxiosPublic from "@/hooks/AxiosPublic/useAxiosPublic";
import { useGetTeamsByEmailForGroupChatQuery } from "@/redux/features/Api/teamApi";
import { setSelectedUserId } from "@/redux/features/Slice/chatSlice";
import { setGroupChatId } from "@/redux/features/Slice/groupChatSlice";
import { useUser } from "@clerk/nextjs";
import {
  differenceInDays,
  differenceInWeeks,
  format,
  isToday,
  isYesterday,
  parseISO,
} from "date-fns";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { socket } from "../../../../lib/socket"; // <<=== IMPORT socket

const ChatSidebar = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useUser();
  const [users, setUsers] = useState([]);

  const userEmail = user?.emailAddresses[0]?.emailAddress;
  const { data: groups = [] } = useGetTeamsByEmailForGroupChatQuery(userEmail);

  const dispatch = useDispatch();

  // ---- fetch initial users using axios ----
  const fetchUsers = async () => {
    if (!userEmail) return;
    try {
      const res = await axiosPublic.get(`/api/online/users/${userEmail}`);
      const fetchedUsers = res.data.uniqueMembers;

      const sortedUsers = fetchedUsers.sort((a, b) => {
        if (a.status === b.status) {
          return new Date(b.lastActive) - new Date(a.lastActive);
        }
        return a.status === "Online" ? -1 : 1;
      });

      setUsers(sortedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [userEmail]);


  // Socket listeners here
  useEffect(() => {
    const handleUserStatus = ({ email, status }) => {
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.email === email ? { ...u, status, lastActive: new Date() } : u
        )
      );
    };

    const handleOnlineUsers = (emails) => {
      setUsers((prevUsers) => {
        return prevUsers.map((u) => ({
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
    const date = parseISO(timestamp);

    if (isToday(date)) return format(date, "h:mm a");
    if (isYesterday(date)) return "Yesterday";
    if (differenceInWeeks(new Date(), date) < 1) {
      return `${differenceInDays(new Date(), date)}d`;
    }
    return format(date, "MMM d, yyyy");
  };


  const [active, setActive] = useState(false);

  const handleUserSelect = (id) => {
    setActive(id);
    dispatch(setSelectedUserId(id));
    dispatch(setGroupChatId(null));
  };

  const handleGroupSelect = (id) => {
    setActive(id);
    dispatch(setGroupChatId(id));
    dispatch(setSelectedUserId(null));
  };


  return (
    <div className="flex border-r-2 border-l-2 border-pink-600 dark:border-gray-700">
      <div className="relative w-40 md:w-80">
        <Card className="p-4 h-[90vh] flex flex-col bg-blue-50/50">

          <div className="flex items-center bg-white rounded-2xl shadow-sm px-4 py-2 border border-gray-200">
            <Search className="text-gray-400 w-5 h-5 mr-2" />
            <input type="text" placeholder="Search"
              className="outline-none w-full bg-transparent text-gray-700 placeholder-gray-400" />
          </div>

          <ScrollArea className="flex-1">

            {/* Groups */}
            <div className="space-y-3 bg-white rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                <FaUsers className="mr-2" /> Groups
              </h3>

              {groups.map((group) => (
                <Link href="/dashboard/chat/chat-app" key={group._id}>
                  <div
                    className={`flex items-center p-2 rounded-md cursor-pointer border-b-2 ${
                      active === group._id ? "bg-blue-500" : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleGroupSelect(group._id)}
                  >
                    <p className="capitalize">{group.name}</p>
                  </div>
                </Link>
              ))}
            </div>


            {/* People */}
            <div className="space-y-3 bg-white rounded-lg p-4 shadow-sm mt-4">
              <h3 className="text-lg font-medium text-gray-800 mb-3">People</h3>

              {users.map((user) => (
                <Link href="/dashboard/chat/chat-app" key={user._id}>
                  <div
                    onClick={() => handleUserSelect(user.clerkId)}
                    className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer border-b-2"
                  >
                    <img
                      src={user.imageUrl}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p>{user.firstName} {user.lastName}</p>
                        <p className="text-xs">{formatLastActive(user.lastActive)}</p>
                      </div>

                      <p
                        className={`text-xs ${
                          user.status === "Online" ? "text-green-500" : "text-gray-500"
                        }`}
                      >
                        {user.status}
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

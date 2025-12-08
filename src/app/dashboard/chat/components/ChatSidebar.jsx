"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import useAxiosPublic from "@/hooks/AxiosPublic/useAxiosPublic";
import { socket } from "@/lib/socket";
import { useGetTeamsByEmailForGroupChatQuery } from "@/redux/features/Api/teamApi";
import { setSelectedUserId } from "@/redux/features/Slice/chatSlice";
import { setGroupChatId } from "@/redux/features/Slice/groupChatSlice";
import { useUser } from "@clerk/nextjs";
import { differenceInDays, format, isToday, isYesterday, parseISO } from "date-fns";
import { Search, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



const ChatSidebar = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useUser();
  const dispatch = useDispatch();

  const userEmail = user?.emailAddresses[0]?.emailAddress;
  const { data: groups = [] } = useGetTeamsByEmailForGroupChatQuery(userEmail || "");

  const selectedUserId = useSelector((state) => state.chat.selectedUserId);
  const groupChatId = useSelector((state) => state.groupChat.groupChatId);

  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch users
  const fetchUsers = async () => {
    if (!userEmail) return;
    try {
      const res = await axiosPublic.get(`/api/online/users/${userEmail}`);
      setUsers(res.data.uniqueMembers || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [userEmail]);

  // Socket listeners
  useEffect(() => {
    const handleUserStatus = ({ email, status }) => {
      setUsers((prev) =>
        prev.map((u) => (u.email === email ? { ...u, status, lastActive: new Date() } : u))
      );
    };

    const handleOnlineUsers = (emails) => {
      setUsers((prev) =>
        prev.map((u) => ({ ...u, status: emails.includes(u.email) ? "Online" : "Offline" }))
      );
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
    if (differenceInDays(new Date(), date) < 7) return format(date, "EEE");
    return format(date, "MMM d");
  };

  const filteredUsers = users.filter((u) =>
    `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGroups = groups.filter((g) =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold text-gray-800">Chats</h1>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search people or groups"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none flex-1 text-gray-700"
          />
        </div>
      </div>

      {/* Scrollable List */}
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-4 pb-4">

          {/* Groups */}
          {filteredGroups.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-600 px-4 mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" /> Groups
              </h3>
              {filteredGroups.map((group) => (
                <div
                  key={group._id}
                  onClick={() => {
                    dispatch(setGroupChatId(group._id));
                    dispatch(setSelectedUserId(null));
                  }}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
                    ${groupChatId === group._id ? "bg-blue-100" : "hover:bg-gray-100"}`}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    {group.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{group.name}</p>
                    <p className="text-xs text-gray-500">{group.members?.length} members</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* People */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 px-4 mb-2">People</h3>
            {filteredUsers.map((user) => (
              <div
                key={user.clerkId}
                onClick={() => {
                  dispatch(setSelectedUserId(user.clerkId));
                  dispatch(setGroupChatId(null));
                }}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
                  ${selectedUserId === user.clerkId ? "bg-blue-100" : "hover:bg-gray-100"}`}
              >
                <div className="relative">
                  <img
                    src={user.imageUrl || "/default-avatar.png"}
                    alt={user.firstName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {user.status === "Online" && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-gray-500">
                    {user.status === "Online" ? "Online" : formatLastActive(user.lastActive)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;
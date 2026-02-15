"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import useAxiosSecure from "@/hooks/AxiosSecure/useAxiosSecure";
import { socket } from "@/lib/socket";
import useChatStore from "@/store/useChatStore";
import useTeamStore from "@/store/useTeamStore";
import { useSession } from "next-auth/react";
import { format, isToday, isYesterday, parseISO } from "date-fns";
import { Search, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const ChatSidebar = () => {
  const { data: session, status } = useSession();
  const { groupChats: groups, fetchTeamsForGroupChat } = useTeamStore();
  const { 
    currentChatPartner, 
    setCurrentChatPartner, 
    currentGroup, 
    setCurrentGroup 
  } = useChatStore();
  const axiosSecure = useAxiosSecure();

  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const user = session?.user;
  const isLoaded = status !== "loading";
  const userEmail = user?.email;

  useEffect(() => {
    if (isLoaded && userEmail) {
      fetchTeamsForGroupChat(userEmail);
    }
  }, [isLoaded, userEmail, fetchTeamsForGroupChat]);

  // Fetch online users
  useEffect(() => {
    if (!isLoaded || !userEmail) return;
    axiosSecure
      .get(`/online/users/${userEmail}`)
      .then((res) => {
        console.log(res?.data?.uniqueMembers, ">>>>>>>>>>>>>>>>>>>>>>>>>>>")
        setUsers(res?.data?.uniqueMembers || []);
      })
      .catch(console.error);
  }, [isLoaded, userEmail, axiosSecure]);

  // Real-time online/offline status
  useEffect(() => {
    // Handle individual status updates
    const handleStatus = ({ email, status }) => {
      console.log("Socket: Status update received:", email, status);
      setUsers((prev) =>
        prev.map((u) => {
          if (u.email === email) {
            console.log("Socket: Updating user:", u.email, "to", status);
            return {
              ...u,
              status,
              lastActive: status === "Online" ? new Date().toISOString() : new Date().toISOString(),
            };
          }
          return u;
        })
      );
    };

    // Handle full list of online users
    const handleOnlineUsers = (onlineEmails) => {
      console.log("Socket: Online users list:", onlineEmails);
      if (!Array.isArray(onlineEmails)) return;
      
      setUsers((prev) => 
        prev.map((u) => ({
          ...u,
          status: onlineEmails.includes(u.email) ? "Online" : "Offline",
          lastActive: onlineEmails.includes(u.email) ? new Date().toISOString() : u.lastActive
        }))
      );
    };

    socket.on("user-online-status", handleStatus);
    socket.on("online-users", handleOnlineUsers); // Sync full list

    return () => {
      socket.off("user-online-status", handleStatus);
      socket.off("online-users", handleOnlineUsers);
    };
  }, []);

  // Format time safely
  const formatTime = (timestamp) => {
    if (!timestamp) return "Never";
    const date = parseISO(timestamp);
    if (isToday(date)) return format(date, "h:mm a");
    if (isYesterday(date)) return "Yesterday";
    return format(date, "MMM d");
  };

  // Filter + Sort Users (Online first → then by lastActive)
  const sortedAndFilteredUsers = useMemo(() => {
    return users
      .filter((u) => {
        const fullName = `${u.firstName || ""} ${u.lastName || ""}`.trim().toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
      })
      .sort((a, b) => {
        if (a.status === "Online" && b.status !== "Online") return -1;
        if (a.status !== "Online" && b.status === "Online") return 1;
        return new Date(b.lastActive || 0).getTime() - new Date(a.lastActive || 0).getTime();
      });
  }, [users, searchQuery]);

  const selectedUserId = currentChatPartner?._id || currentChatPartner?.id;
  const groupChatId = currentGroup?._id;

  // Early returns must come AFTER hooks
  if (!isLoaded) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-500 animate-pulse">Loading chats...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-red-500">Please sign in to view chats</p>
      </div>
    );
  }

  // Filter Groups
  const filteredGroups = groups.filter((g) =>
    g.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="p-5 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Messages</h1>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="flex items-center bg-white dark:bg-gray-800 rounded-xl shadow-sm px-4 py-3 border border-gray-200 dark:border-gray-700">
          <Search className="w-5 h-5 text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none flex-1 text-gray-700 dark:text-gray-300 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Scrollable List */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-6">

          {/* Groups Section */}
          {filteredGroups.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" /> Group Chats
              </h3>
              {filteredGroups.map((group) => (
                <div
                  key={group._id}
                  onClick={() => {
                    setCurrentGroup(group);
                  }}
                  className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-200
                    ${groupChatId === group._id
                      ? "bg-blue-100 dark:bg-blue-900/50 shadow-md"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                >
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
                      {group.name?.[0]?.toUpperCase() || "G"}
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-900 rounded-full p-1">
                      <Users className="w-4 h-4 text-purple-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                      {group.name || "Unnamed Group"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {group.members?.length || 0} members
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Direct Messages */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 mb-3">
              Direct Messages
            </h3>

            {sortedAndFilteredUsers.filter(u => u._id || u.id).length === 0 ? (
              <p className="text-center text-gray-500 py-8">No conversations found</p>
            ) : (
              sortedAndFilteredUsers
                .filter(user => user._id || user.id) // Ensure valid ID
                .map((user) => (
                <div
                  key={user._id || user.id}
                  onClick={() => {
                    setCurrentChatPartner(user);
                  }}
                  className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-200 group
                    ${selectedUserId === (user._id || user.id)
                      ? "bg-blue-100 dark:bg-blue-900/50 shadow-md"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                >
                  <div className="relative">
                    <img
                      src={user.imageUrl || "/default-avatar.png"}
                      alt={user.firstName || "User"}
                      className="w-14 h-14 rounded-2xl object-cover ring-4 ring-white dark:ring-gray-900 shadow-lg"
                    />
                    {user.status === "Online" && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-4 border-white dark:border-gray-900 animate-pulse"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                      {user.firstName || "Unknown"} {user.lastName || ""}
                    </p>
                    <p className={`text-sm truncate transition-all duration-300 ${user.status === "Online" ? "text-green-600 font-medium" : "text-gray-500"}`}>
                      {user.status === "Online"
                        ? "Active now"
                        : `Active ${formatTime(user.lastActive)}`}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;
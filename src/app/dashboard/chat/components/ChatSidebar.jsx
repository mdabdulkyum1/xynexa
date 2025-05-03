"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { useDispatch, useSelector } from "react-redux";

const ChatSidebar = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useUser();
  const [users, setUsers] = useState([]);

  const userEmail = user?.emailAddresses[0]?.emailAddress;
  const { data: groups = [] } = useGetTeamsByEmailForGroupChatQuery(userEmail);


  const dispatch = useDispatch();

  const fetchUsers = async () => {
    if (user && userEmail) {
      try {
        const res = await axiosPublic.get(`/api/online/users/${userEmail}`);
        const fetchedUsers = res.data.uniqueMembers;

        // Sort: Online users first, then offline; both sorted by lastActive DESC
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
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

  // const groups = [
  //   { id: 1, name: "React Developers", img: "https://placehold.co/40x40" },
  //   { id: 2, name: "Gaming Squad", img: "https://placehold.co/40x40" },
  //   { id: 3, name: "UI Designers", img: "https://placehold.co/40x40" },
  // ];

  const formatLastActive = (timestamp) => {
    const date = parseISO(timestamp);

    if (isToday(date)) {
      return format(date, "h:mm a"); // 9:34 AM
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else if (differenceInWeeks(new Date(), date) < 1) {
      const daysAgo = differenceInDays(new Date(), date);
      return `${daysAgo}d`; // e.g., 3d
    } else {
      return format(date, "MMM d, yyyy"); // Apr 5, 2025
    }
  };


const [active, setActive] = useState(false);

  const handleUserSelect = (id) => {
    setActive(id)
    dispatch(setSelectedUserId(id))
    dispatch(setGroupChatId(null))
  };


  const handleGroupSelect = (id) => {
    dispatch(setGroupChatId(id))
    dispatch(setSelectedUserId(null))
  };


  return (
    <div className="flex border-r-2 border-l-2  dark:border-gray-700 ">
      {/* Sidebar */}
      <div className="relative w-40 md:w-80">
        <Card className="p-4 h-[90vh] flex flex-col bg-blue-50/50">
          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-2xl shadow-sm px-4 py-2 w-full max-w-sm border border-gray-200">
            <Search className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="outline-none w-full bg-transparent text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Scrollable List */}
          <ScrollArea className="flex-1 overflow-y-auto">
            {/* Groups Section */}

            <div className="space-y-3 bg-white rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                <FaUsers className="mr-2" /> Groups
              </h3>
              {groups.map((group) => (
                <Link href="/dashboard/chat/chat-app" key={group._id} 
                className={`${active === group._id ? "bg-blue-500" : ""}`}>
                  <div

                    key={group._id}
                    className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer transition capitalize border-b-2 border-gray-200"
                    onClick={() => handleGroupSelect(group._id)}
                  >
                    <p className="text-sm font-medium text-gray-800">
                      {group.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>


            {/* People Section */}

            <div className="space-y-3 bg-white rounded-lg p-4 shadow-sm mt-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">People</h3>
              {users.map((user) => (
                <Link href="/dashboard/chat/chat-app" key={user._id}>
                  <div
                    className="flex items-center p-2 rounded-md  hover:bg-gray-100 cursor-pointer transition border-b-2 border-gray-200"
                    onClick={() => handleUserSelect(user?.clerkId)} // Set selected user
                  >
                    <img
                      src={user.imageUrl}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-800 dark:text-white">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {user?.lastActive &&
                            formatLastActive(user.lastActive)}
                        </p>
                      </div>
                      <p
                        className={`text-xs ${user.status === "Online"
                          ? "text-green-500"
                          : "text-gray-500"
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

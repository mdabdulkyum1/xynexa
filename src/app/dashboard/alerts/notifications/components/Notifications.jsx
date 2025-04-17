"use client";

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RiCheckDoubleFill, RiNotification3Line, RiSearchLine } from "react-icons/ri";
import PropTypes from "prop-types";

// Define Notification PropType
const NotificationPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  read: PropTypes.bool,
});

const notificationsData = [
  {
    id: 1,
    name: "Abir Hossain",
    message: "Hey, is the design completed?",
    time: "2 hr ago",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    read: false,
  },
  {
    id: 2,
    name: "Monika Roy",
    message: "What's the project report update?",
    time: "2 hr ago",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    read: false,
  },
  {
    id: 3,
    name: "Alif Mahmud",
    message: "Team meeting at 3 PM.",
    time: "1 hr ago",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    read: true,
  },
  {
    id: 4,
    name: "Sarah Ali",
    message: "Can you review my PR?",
    time: "30 min ago",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    read: false,
  },
  {
    id: 5,
    name: "Mehedi Hasan",
    message: "Let's finalize the document.",
    time: "10 min ago",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    read: true,
  },
];

const Notifications = () => {
  const [selected, setSelected] = useState("");
  const [notifications, setNotifications] = useState(notificationsData);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleReadStatus = (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: !n.read } : n
    );
    setNotifications(updated);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter(
    (n) =>
      n.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full px-4 py-6 bg-white dark:bg-[#1f2937] rounded-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex items-center gap-2">
          <div className="relative w-6 h-6">
            <RiNotification3Line className="text-2xl text-blue-500" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white">
            Notifications
          </h2>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 border-b border-gray-300 dark:border-gray-600 pb-2 w-full md:w-1/3">
          <RiSearchLine className="text-lg text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search notifications..."
            className="w-full bg-transparent text-sm text-gray-700 dark:text-gray-300 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs & Filter */}
      <div className="flex flex-wrap justify-between items-center border-b border-gray-300 dark:border-gray-600 pb-3 mb-3 gap-y-2 gap-x-4">
        <div className="flex space-x-4">
          <h2 className="text-sm md:text-base font-semibold text-gray-800 dark:text-white cursor-pointer hover:text-blue-500">
            Today
          </h2>
          <h2 className="text-sm md:text-base font-semibold text-gray-800 dark:text-white cursor-pointer hover:text-blue-500">
            Previous
          </h2>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4 gap-2 md:gap-0 items-start md:items-center">
          <Select onValueChange={setSelected}>
            <SelectTrigger className="w-32 md:w-40 border border-gray-300 dark:border-gray-600 dark:text-white rounded-md px-3 py-2 text-sm bg-white dark:bg-[#111827]">
              <SelectValue placeholder="Select All" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-[#1f2937] text-black dark:text-white">
              <SelectItem value="all">Select All</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="read">Read</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-1 cursor-pointer">
            <RiCheckDoubleFill className="text-blue-500 text-lg dark:text-blue-400" />
            <h2 className="text-sm font-semibold text-red-500 dark:text-red-400">Clear All</h2>
          </div>
        </div>
      </div>

      {/* Notification List */}
      <ul className="space-y-2">
        {filteredNotifications.slice(0, 5).map((notification) => (
          <li key={notification.id}>
            <div
              className={`flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 p-3 rounded-md ${
                notification.read
                  ? "bg-gray-100 dark:bg-gray-700"
                  : "bg-gray-50 dark:bg-gray-800"
              } hover:bg-gray-100 dark:hover:bg-gray-700 transition-all`}
            >
              <div className="flex items-center space-x-3 w-full">
                <div className="w-2 h-2 bg-green-500 rounded-full shrink-0"></div>
                <img
                  src={notification.avatar}
                  alt={notification.name}
                  className="w-10 h-10 rounded-full shrink-0"
                />
                <div className="h-10 w-[2px] bg-gray-300 dark:bg-gray-600 hidden md:block"></div>
                <div className="flex-grow">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {notification.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {notification.message}
                  </p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 md:ml-auto">
                  {notification.time}
                </span>
              </div>
              <button
                onClick={() => toggleReadStatus(notification.id)}
                className="text-xs text-blue-500 dark:text-blue-400 mt-2 md:mt-0"
              >
                Mark as {notification.read ? "Unread" : "Read"}
              </button>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-600 ml-16 md:ml-20"></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(NotificationPropType).isRequired,
};

export default Notifications;

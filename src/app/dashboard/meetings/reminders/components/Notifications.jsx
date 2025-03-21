"use client";

import { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { RiCheckDoubleFill } from "react-icons/ri";

const notifications = [
  {
    id: 1,
    name: "Alex Standill",
    message: "Hey, is the design completed?",
    time: "2 hr ago",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 2,
    name: "Mona Griffin",
    message: "What's the project report update?",
    time: "2 hr ago",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: 3,
    name: "John Carter",
    message: "Team meeting at 3 PM.",
    time: "1 hr ago",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: 4,
    name: "Sarah Johnson",
    message: "Can you review my PR?",
    time: "30 min ago",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    id: 5,
    name: "Michael Brown",
    message: "Let's finalize the document.",
    time: "10 min ago",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg"
  }
];

const Notifications = () => {
  const [selected, setSelected] = useState("");

  return (
    <div className="max-w-md p-4 bg-white rounded-xl shadow-md">
      {/* Header Section */}
      <h2 className="text-lg font-semibold">Notifications</h2>
      <div className="flex justify-between items-center border-b pb-2 mb-2 mt-2">
        <div className="flex space-x-4">
          <h2 className="text-sm font-semibold">Today</h2>
          <h2 className="text-sm font-semibold">Previous</h2>
        </div>

        <div className="flex space-x-4">
            <Select onValueChange={setSelected}>
            <SelectTrigger className="w-28 border border-gray-300 rounded-md px-3 py-3 text-sm">
                <SelectValue placeholder="Select All" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">Select All</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="read">Read</SelectItem>
            </SelectContent>
            </Select>
            <div className="flex gap-0.5 text-center">
            <RiCheckDoubleFill className="mt-3 text-blue-400"/>
          <h2 className="text-sm font-semibold mt-2.5 text-red-500">Clear All</h2>
            </div>
        </div>
      </div>


    
      <ul>
        {notifications.map(notification => (
          <li key={notification.id}>
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg">
          
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
    
              <img src={notification.avatar} alt={notification.name} className="w-10 h-10 rounded-full" />
           
              <div className="h-10 w-[2px] bg-gray-300"></div>
        
              <div>
                <p className="font-medium">{notification.name}</p>
                <p className="text-sm text-gray-500">{notification.message}</p>
              </div>
           
              <span className="ml-auto text-xs text-gray-400">{notification.time}</span>
            </div>
            <div className="border-b border-gray-300  ml-20"></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;

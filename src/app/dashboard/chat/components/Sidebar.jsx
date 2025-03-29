"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaComments, FaCog, FaVideo } from "react-icons/fa";

const Sidebar = () => {
  const pathname = usePathname(); // Get the current route

  const links = [
    { href: "/dashboard/chat", icon: <FaHome />, name: "Home" },
    { href: "/dashboard/chat/chat-app", icon: <FaComments />, name: "Chat" },
    { href: "/dashboard/settings", icon: <FaCog />, name: "Settings" },
    { href: "/dashboard/video", icon: <FaVideo />, name: "Video" },
  ];

  return (
    <aside className="w-20 bg-purple-700 flex flex-col items-center py-5 rounded">
      <img src="https://placehold.co/40x40" alt="User" className="w-10 h-10 rounded-full mb-5" />

      {links.map((link) => (
        <Link key={link.href} href={link.href} className="w-full">
          <div
            className={`text-white text-2xl my-5 p-3 w-full flex justify-center ${
              pathname === link.href ? "border-r-4 border-white bg-purple-800" : ""
            }`}
          >
            {link.icon}
          </div>
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;

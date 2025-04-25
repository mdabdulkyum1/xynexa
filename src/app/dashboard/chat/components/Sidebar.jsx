"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaComments, FaCog } from "react-icons/fa";


const Sidebar = () => {
  const pathname = usePathname(); // Get the current route
  const user = useUser();

  const links = [
    { href: "/dashboard/chat", icon: <FaHome />, name: "Home" },
    { href: "/dashboard/chat/chat-app", icon: <FaComments />, name: "Chat" },
  ];

  return (
    <aside className="w-12 bg-gray-100 dark:bg-black flex flex-col items-center py-5 rounded">
      <img src={user?.user?.imageUrl} alt="User" className="w-10 h-10 rounded-full mb-5" />

      {links.map((link) => (
        <Link key={link.href} href={link.href} className="w-full">
          <div
            className={`text-white text-2xl my-5 p-3 w-full flex justify-center ${
              pathname === link.href ? "border-r-4 border-white bg-teal-400" : ""
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

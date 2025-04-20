"use client";
import React, { useState } from "react";
import { Search, Grid, List, Lock, ChevronDown, Twitter, Filter, Circle, LayoutGrid } from "lucide-react";

const TaskControl = () => {
    const [view, setView] = useState("board");

    return (
        <div className="flex items-center justify-between my-1 p-3 shadow-sm rounded-lg  dark:bg-[#171717] bg-white dark:border-0 border-gray-700">
            {/* Left Section (Board View & List View Toggle) */}
            <div className="flex items-center gap-2">
                <button
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-md ${view === "board" ? "bg-gray-200  dark:bg-[#0A0A0A] dark:text-white text-black" : "text-gray-400 hover:bg-gray-100 dark:hover:bg-black/30"}`}
                    onClick={() => setView("board")}
                >
                    <Grid size={18} className="text-gray-400" /> Board View
                </button>
                <button
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-md ${view === "list" ? "bg-gray-200 text-black dark:bg-[#0A0A0A] dark:text-white" : "text-gray-400 hover:bg-gray-100 dark:hover:bg-black/30"}`}
                    onClick={() => setView("list")}
                >
                    <List size={18} className="text-gray-400" /> List View
                </button>

                {/* Access Control */}
                {/* <button className="flex items-center gap-1 text-gray-400  px-3 py-1.5">
                    <Lock size={18} className="text-gray-400" /> Limited Access <ChevronDown size={16} className="text-gray-400" />
                </button> */}
                <div className="flex items-center gap-2">
                <Twitter size={18} className="text-blue-500" />
                <span className="text-gray-900 font-medium">Twitter Team</span>
            </div>
            </div>

            {/* Middle Section (Team Info) */}
            

            {/* Right Section (Search & Icons) */}
            <div className="flex items-center gap-3">
                {/* Search Box */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search Tasks"
                        className="pl-10 pr-3 py-1.5 border border-purple-300 rounded-md text-sm text-gray-900 dark:text-white dark:bg-[#0A0A0A] bg-gray-100 focus:ring-1 focus:ring-purple-400 focus:outline-none"
                    />
                </div>

               
                
            </div>
        </div>
    );
};

export default TaskControl;

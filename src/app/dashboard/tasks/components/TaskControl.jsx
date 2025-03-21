"use client";
import React, { useState } from "react";
import { Search, Grid, List, Lock, ChevronDown, Twitter, Filter, Circle, LayoutGrid } from "lucide-react";

const TaskControl = () => {
    const [view, setView] = useState("board");

    return (
        <div className="flex items-center justify-between dark:bg-[#171717] my-1 p-3 shadow-sm rounded-lg border dark:border-0 border-gray-700">
            {/* Left Section (Board View & List View Toggle) */}
            <div className="flex items-center gap-2">
                <button
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-md ${view === "board" ? "bg-[#0A0A0A] text-white" : "text-gray-400 hover:bg-gray-700"}`}
                    onClick={() => setView("board")}
                >
                    <Grid size={18} className="text-gray-400" /> Board View
                </button>
                <button
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-md ${view === "list" ? "bg-[#0A0A0A] text-white" : "text-gray-400 hover:bg-gray-700"}`}
                    onClick={() => setView("list")}
                >
                    <List size={18} className="text-gray-400" /> List View
                </button>

                {/* Access Control */}
                <button className="flex items-center gap-1 text-gray-400 hover:bg-gray-700 px-3 py-1.5">
                    <Lock size={18} className="text-gray-400" /> Limited Access <ChevronDown size={16} className="text-gray-400" />
                </button>
            </div>

            {/* Middle Section (Team Info) */}
            <div className="flex items-center gap-2">
                <Twitter size={18} className="text-blue-500" />
                <span className="text-gray-300 font-medium">Twitter Team</span>
            </div>

            {/* Right Section (Search & Icons) */}
            <div className="flex items-center gap-3">
                {/* Search Box */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search Tasks"
                        className="pl-10 pr-3 py-1.5 border border-gray-600 rounded-md text-sm text-gray-300 bg-[#171717] focus:ring-1 focus:ring-purple-400 dark:border-gray-500 dark:bg-[#171717] dark:text-gray-200 focus:outline-none"
                    />
                </div>

                {/* Icons */}
                <button className="p-2 rounded-md hover:bg-gray-600">
                    <Filter size={18} className="text-gray-400" />
                </button>
                <button className="p-2 rounded-md hover:bg-gray-600">
                    <Circle size={18} className="text-gray-400" />
                </button>
                <button className="p-2 rounded-md hover:bg-gray-600">
                    <LayoutGrid size={18} className="text-gray-400" />
                </button>
            </div>
        </div>
    );
};

export default TaskControl;

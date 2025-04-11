"use client";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { CirclePlus, Pencil } from "lucide-react";
import TaskCreateModal from "./TaskCreateModal";

const TaskHeading = () => {
    const [boardName, setBoardName] = useState("Task Board");
    const [isEditing, setIsEditing] = useState(false);


    // Handle input change
    const handleChange = (e) => {
        setBoardName(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    return (
        <div className="flex justify-between items-center p-4 bg-white dark:bg-[#171717]   rounded-md shadow-md">
            <div className="flex items-center gap-4">
                {isEditing ? (
                    <input
                        type="text"
                        value={boardName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoFocus
                        className="text-xl md:text-2xl lg:text-3xl font-bold rounded-full px-4 py-1 outline-none dark:bg-black bg-gray-50 dark:text-white"
                    />
                ) : (
                    <h3 className="md:text-3xl text-xl font-bold text-gray-900 dark:text-white">
                        {boardName}
                    </h3>
                )}

                {/* Pencil Icon for Editing */}
                <Pencil
                    className="text-gray-500 dark:text-gray-300 cursor-pointer hover:text-black dark:hover:text-white"
                    onClick={() => setIsEditing(true)}
                />
            </div>

            {/* Right Side (Avatar Group) */}
            <div className="flex items-center md:gap-4 gap-2">
                <AvatarGroup max={4}>
                    <Avatar alt="Remy Sharp" src="https://i.ibb.co/B6sBj8C/stokes.jpg" />
                    <Avatar alt="Travis Howard" src="https://i.ibb.co/103M16B/man-outside-091318-800x450.jpg" />
                    <Avatar alt="Cindy Baker" src="https://i.ibb.co/DMRpJqg/IMG-20220410-223356.jpg" />
                    <Avatar alt="Agnes Walker" src="https://i.ibb.co/tBfFbwS/image-Three.webp" />
                    <Avatar alt="Trevor Henderson" src="https://i.ibb.co/rfkdKCKg/team-05.webp" />
                </AvatarGroup>

            
                <CirclePlus size={40} className="text-gray-400 dark:text-gray-300 cursor-pointer hover:text-purple-600 dark:hover:text-purple-400" /> 


            </div>
        </div>
    );
};

export default TaskHeading;

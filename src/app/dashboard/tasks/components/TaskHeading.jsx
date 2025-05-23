"use client";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { CameraIcon, CirclePlus, Pencil, Video } from "lucide-react";
import TaskCreateModal from "./TaskCreateModal";
import AddMember from "../../team/view/components/AddMember";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const TaskHeading = ({ team }) => {
  const [boardName, setBoardName] = useState("Task Board");
  const [isEditing, setIsEditing] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const teamId = team?._id;

  // Handle input change
  const handleChange = (e) => {
    setBoardName(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between relative  items-center p-4 bg-white dark:bg-[#171717]  rounded-md shadow-md">
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
            {team?.name}
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
        <span className="relative flex size-10 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex size-10 rounded-full bg-sky-500 items-center justify-center">
            <Video className="h-6 w-6 text-white" />
          </span>
        </span>
        {/* <AvatarGroup max={team?.members?.length}>
                    {team?.members?.map((item) => (
                        <Avatar key={item.id} alt={item.name} src={item?.imageUrl} />
                    ))}
                </AvatarGroup> */}

        <AnimatedTooltip items={team?.members} />

        <CirclePlus
          size={40}
          onClick={() => setIsOpenAdd(true)}
          className="text-gray-400 dark:text-gray-300 cursor-pointer hover:text-purple-600 dark:hover:text-purple-400"
        />
        <AddMember
          teamId={teamId}
          isOpenAdd={isOpenAdd}
          setIsOpenAdd={setIsOpenAdd}
        />
      </div>
    </div>
  );
};

export default TaskHeading;

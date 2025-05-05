'use client'
import { Badge } from "@mui/material";
import { CirclePlus } from "lucide-react";
import TaskCard from "./TaskCard";
import React, { useState } from "react";
import TaskCreateModal from "./TaskCreateModal";
import { useDroppable } from "@dnd-kit/core";

const TaskColumn = ({ title, taskCategory, team ,teamId}) => {

  const { setNodeRef } = useDroppable({ id: title });
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const colorMap = {
    "todo": "bg-blue-100",
    "in-progress": "bg-orange-100",
    "done": "bg-purple-200"
  };
  
  const dynamicColorClass = colorMap[title] || "bg-gray-200";

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 dark:bg-[#171717] p-4 rounded-lg 
        task-column-shadow-white
        dark:border border-gray-800 min-h-[400px] w-full"
    >
      <div className={`flex justify-between items-center mb-4 ${dynamicColorClass} dark:bg-[#171717] border-none  rounded-lg p-2`}>
        <div className="flex justify-center items-center w-full">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          {title}
        </h2>
        </div>
        <Badge
          color="gray"
          className="dark:bg-[#171717] py-1 px-2 rounded-l-full dark:text-gray-300"
        >
          {taskCategory?.length}
        </Badge>
      </div>
      <div className="space-y-4">
        {taskCategory?.map((task, idx) => (
          
          <TaskCard key={idx} task={task} teamId={teamId}/>
        ))}
      </div>
      <button onClick={() => setIsModalOpen(true)} className="mt-4 w-full bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-200 py-1 rounded-md flex items-center justify-center">
        <CirclePlus size={28} className="text-gray-500 dark:text-gray-300" />
      </button>

      <TaskCreateModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        team={team}
      ></TaskCreateModal>
    </div>
  );
};

export default TaskColumn;

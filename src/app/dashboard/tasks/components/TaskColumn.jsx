import { Badge } from "@mui/material";
import { CirclePlus } from "lucide-react";
import TaskCard from "./TaskCard";
import React from "react";

const TaskColumn = ({ title, tasks }) => {
    return (
        <div className="bg-gray-100 dark:bg-[#171717] p-4 rounded-lg 
        task-column-shadow-white
        dark:border border-gray-800 min-h-[400px] w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{title}</h2>
                <Badge color="gray" className="dark:bg-[#0A0A0A] py-1 px-2 rounded-l-full dark:text-gray-300">{tasks.length}</Badge>
            </div>
            <div className="space-y-4">
                {tasks.map((task) => (
                    <TaskCard key={task.id} {...task} />
                ))}
            </div>
            <button className="mt-4 w-full bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-200 py-1 rounded-md flex items-center justify-center">
                <CirclePlus size={28} className="text-gray-500 dark:text-gray-300" />
            </button>
        </div>
    );
};

export default TaskColumn;

"use client";
import React, { useState } from "react";
import TaskColumn from "./TaskColumn";

const tasksData = [
    { id: "1", title: "Model Answer", taskType: "Backlog", tags: ["Design", "Backlog"], avatars: ["https://randomuser.me/api/portraits/men/32.jpg"] },
    { id: "2", title: "Create calendar, chat and email app pages", taskType: "Backlog", tags: ["Development", "Backlog"], avatars: ["https://randomuser.me/api/portraits/women/32.jpg"] },
    { id: "3", title: "Add authentication pages", taskType: "To Do", tags: ["To Do"], avatars: ["https://randomuser.me/api/portraits/men/31.jpg"] },
    { id: "3", title: "Add authentication pages", taskType: "To Do", tags: ["To Do"], avatars: ["https://randomuser.me/api/portraits/men/31.jpg"] },
    { id: "3", title: "Add authentication pages", taskType: "To Do", tags: ["To Do"], avatars: ["https://randomuser.me/api/portraits/men/31.jpg"] },
    { id: "4", title: "Model Answer", taskType: "In Progress", tags: ["In Progress"], avatars: ["https://randomuser.me/api/portraits/women/33.jpg"] },
    { id: "5", title: "Product Design, Figma, Sketch", taskType: "Done", tags: ["Done"], avatars: ["https://randomuser.me/api/portraits/men/34.jpg"] },
    { id: "6", title: "Product Design, Figma, Sketch", taskType: "Done", tags: ["Done"], avatars: ["https://randomuser.me/api/portraits/men/34.jpg"] },
    { id: "7", title: "Product Design, Figma, Sketch", taskType: "Done", tags: ["Done"], avatars: ["https://randomuser.me/api/portraits/men/34.jpg"] },
    { id: "8", title: "Product Design, Figma, Sketch", taskType: "Done", tags: ["Done"], avatars: ["https://randomuser.me/api/portraits/men/34.jpg"] },
    { id: "9", title: "Product Design, Figma, Sketch", taskType: "Done", tags: ["Done"], avatars: ["https://randomuser.me/api/portraits/men/34.jpg"] },
    { id: "10", title: "Product Design, Figma, Sketch", taskType: "Done", tags: ["Done"], avatars: ["https://randomuser.me/api/portraits/men/34.jpg"] },
];

const TaskBoard = () => {
    const [tasksType] = useState(["To Do", "In Progress", "Done","Backlog"]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-4 p-4 bg-gray-100 dark:bg-[#171717]">
            {tasksType.map((category) => (
                <TaskColumn 
                    key={category} 
                    title={category} 
                    tasks={tasksData.filter(task => task.taskType === category)} 
                />
            ))}
        </div>
    );
};

export default TaskBoard;

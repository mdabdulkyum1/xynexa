"use client";
import React, { useState } from "react";
import TaskColumn from "./TaskColumn";



const TaskBoard = ({ team, allTasks ,teamId}) => {

    const [tasksTypes] = useState(['todo', 'in-progress', 'done', ]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-3 gap-4 p-4 bg-gray-100 dark:bg-[#171717]">
            {tasksTypes.map((category) => (
                <TaskColumn
                    key={category}
                    title={category}
                    taskCategory={allTasks?.filter(task => task.status === category)}
                    team={team}
                    teamId={teamId}
                />
            ))}
        </div>
    );
};

export default TaskBoard;

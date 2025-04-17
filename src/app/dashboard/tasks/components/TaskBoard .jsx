"use client";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import TaskColumn from "./TaskColumn";
import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

// Initialize socket connection
const socket = io(`${process.env.NEXT_PUBLIC_SERVER_URL}`);

const TaskBoard = ({ team, allTasks, teamId }) => {
  console.log("team ", team);
  console.log("teamId ", teamId);
  console.log("all tsk ", allTasks)
  const [tasks, setTasks] = useState(allTasks);
  console.log(tasks);
  const [tasksTypes] = useState(["todo", "in-progress", "done"]);
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    // Listen for board status updates
    socket.on("boardStatusUpdated", (updatedBoard) => {
      console.log("📦 Board status updated:", updatedBoard);
      if (updatedBoard?.tasks) {
        setTasks(updatedBoard.tasks); // Assumes server sends updated board with tasks
      }
    });

    return () => {
      // Clean up listener on unmount
      socket.off("boardStatusUpdated");
    };
  }, []);

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    if (!taskId || !newStatus || taskId === newStatus) return;

    const updatedTask = tasks.find((task) => task._id === taskId);

    if (!updatedTask || updatedTask.status === newStatus) return;

    const newTaskData = {
      ...updatedTask,
      status: newStatus,
    };

    // Emit update to backend
    socket.emit("update-task-status", {
      boardId: teamId, // Assuming teamId === boardId
      newStatus,
    });

    console.log("📤 Task updated and emitted:", newTaskData);
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-4 bg-gray-100 dark:bg-[#171717]">
        {tasksTypes.map((category) => (
          <TaskColumn
            key={category}
            title={category}
            taskCategory={tasks?.filter((task) => task.status === category)}
            team={team}
            teamId={teamId}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default TaskBoard;

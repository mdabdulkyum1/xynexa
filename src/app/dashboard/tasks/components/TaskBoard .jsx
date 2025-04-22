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

// ✅ Initialize socket connection once globally
const socket = io(`${process.env.NEXT_PUBLIC_SERVER_URL}`);

const TaskBoard = ({ team, allTasks, teamId }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const taskStatuses = ["todo", "in-progress", "done"];
  const sensors = useSensors(useSensor(PointerSensor));

  // ✅ Sync local tasks with prop on mount or change
  useEffect(() => {
    if (allTasks?.length) {
      setTasks(allTasks);
      setIsLoading(false);
    }
  }, [allTasks]);

  // ✅ Socket listener: update tasks on board change
  useEffect(() => {
    socket.on("boardStatusUpdated", (updatedBoard) => {
      console.log("📦 Board status updated:", updatedBoard);
      if (updatedBoard?.tasks) {
        setTasks(updatedBoard.tasks);
      }
    });

    return () => {
      socket.off("boardStatusUpdated");
    };
  }, []);

  // ✅ Optimistic UI + emit update to backend
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;
    if (!taskId || !newStatus || taskId === newStatus) return;

    const updatedTask = tasks.find((task) => task._id === taskId);
    if (!updatedTask || updatedTask.status === newStatus) return;

    // ✅ Optimistically update UI
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );

    // ✅ Emit real-time update to backend
    socket.emit("update-task-status", {
      boardId: taskId,   
      taskId,
      newStatus,
    });

  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-100 dark:bg-[#171717]">
        {taskStatuses.map((status) => (
          <TaskColumn
            key={status}
            title={status}
            taskCategory={tasks.filter((task) => task.status === status)}
            team={team}
            teamId={teamId}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default TaskBoard;

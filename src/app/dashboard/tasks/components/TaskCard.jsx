"use client";

import { Avatar, AvatarGroup } from "@mui/material";
import {
  CirclePlus,
  FileCheck,
  MessageSquareText,
  Paperclip,
  UserPlus,
  Pencil,
  MoreVertical,
  ArrowLeft,
  ArrowRight,
  Loader2,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import "./taskcard.css";
import SingleTaskDeleteModal from "./SingleTaskDeleteModal";
import {
  useDeleteSingleTaskMutation,
  useUpdateBoardStatusMutation,
} from "@/redux/features/Api/TaskApi";
import moment from "moment";
import Comment from "./Comment";
import Attachment from "./Atachment";

const TaskCard = ({ task }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [formattedTargetDate, setFormattedTargetDate] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isUpdatingStatusPre, setIsUpdatingStatusPre] = useState(false);

  console.log(task);

  useEffect(() => {
    if (task?.targetDate) {
      const target = moment(task.targetDate);
      setFormattedTargetDate(target.format("D MMM YYYY"));

      const interval = setInterval(() => {
        const now = moment();
        const duration = moment.duration(target.diff(now));
        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();

        setTimeRemaining(
          `${days} ${days !== 1 ? "d" : ""}/ ${hours} ${
            hours !== 1 ? "h" : ""
          }/ ${minutes} ${minutes !== 1 ? "m" : ""}`
        );

        if (target.isBefore(now)) {
          setTimeRemaining("Overdue");
        }
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setTimeRemaining("");
      setFormattedTargetDate("");
    }
  }, [task?.targetDate]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const [deleteSingleTask] = useDeleteSingleTaskMutation();
  const [updateBoardStatus] = useUpdateBoardStatusMutation();

  const taskDelete = () => {
    try {
      deleteSingleTask(task?._id).unwrap();
      closeModal();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleAddTaskMember = () => {
    closeMenu();
    // Implement add member functionality here
  };

  const handleEditTask = () => {
    closeMenu();
    // Implement edit task functionality here
  };

  const handleStatusChange = async (taskId, direction) => {
    setIsUpdatingStatus(true);
    let newStatus;

    if (direction === "todo") {
      newStatus = "in-progress";
    } else if (direction === "in-progress") {
      newStatus = "done";
    }

    try {
      await updateBoardStatus({ boardId: taskId, status: newStatus }).unwrap();
    } catch (error) {
      console.error("Status update failed:", error);
    } finally {
      setIsUpdatingStatus(false);
    }
  };
  const handleStatusChangePre = async (taskId, direction) => {
    setIsUpdatingStatusPre(true);
    let newStatus;

    if (direction === "done") {
      newStatus = "in-progress";
    } else if (direction === "in-progress") {
      newStatus = "todo";
    }

    try {
      await updateBoardStatus({ boardId: taskId, status: newStatus }).unwrap();
    } catch (error) {
      console.error("Status update failed:", error);
    } finally {
      setIsUpdatingStatusPre(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#0A0A0A] p-4 rounded-lg shadow-md purple-shadow relative">
      <div className="flex justify-between items-center">
        <h3 className="font-medium dark:font-normal text-sm md:text-base text-gray-900 dark:text-gray-100">
          {task?.title}
        </h3>
        <div className="relative">
          <div onClick={toggleMenu} className="cursor-pointer">
            <MoreVertical
              className="text-gray-500 dark:text-gray-300"
              size={20}
            />
          </div>
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-md z-10"
            >
              <button
                onClick={handleAddTaskMember}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <UserPlus className="inline-block mr-2" size={16} />
                Add Member
              </button>
              <button
                onClick={handleEditTask}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <Pencil className="inline-block mr-2" size={16} />
                Edit
              </button>
              <button
                onClick={openModal}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500 dark:text-red-400"
              >
                <FileCheck
                  className="inline-block mr-2 fill-red-500 dark:fill-red-400 text-white"
                  strokeWidth={2}
                  size={16}
                />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <p className="text-[12px] text-gray-600 line-clamp-2">
          {task?.description}
        </p>
      </div>
      <div className="flex gap-2 font-semibold text-xs py-2 flex-wrap items-center">
        {task?.targetDate && (
          <>
            <div className="flex justify-between  w-full">
              <p className="bg-purple-100 dark:bg-purple-600 text-purple-700 dark:text-white rounded-full font-bold text-[14px] py-1 px-2">
                Reaming : {timeRemaining}
              </p>
              <p className="bg-purple-100 dark:bg-purple-600 text-purple-700 dark:text-white rounded-full font-bold text-[14px] py-1 px-2">
                {formattedTargetDate}
              </p>
            </div>
          </>
        )}
      </div>
      <div>
        <div className="flex items-center justify-between md:gap-4 gap-2">
          <AvatarGroup max={4}>
            {task?.members?.map((member) => (
              <Avatar
                key={member?._id}
                sx={{ width: 24, height: 24 }}
                alt={`${member?.firstName} ${member?.lastName}`}
                src={member?.imageUrl || "https://i.ibb.co/B6sBj8C/stokes.jpg"}
              />
            ))}
          </AvatarGroup>

          <div className="flex items-center gap-5">
            <div className="flex md:flex-wrap xl:flex-nowrap gap-2">
              <Comment task={task} />{" "}
              <span className="text-amber-500 dark:text-amber-400 font-bold">
                {task?.comments?.length || 0}
              </span>
              <Attachment task={task} />{" "}
              <p className="flex items-center gap-1 justify-center">
                {" "}
                <span className="text-blue-700 dark:text-blue-400 font-bold">
                  {task?.attachments?.length || 0}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleStatusChangePre(task._id, task.status)}
                className={`p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ${
                  isUpdatingStatusPre ? "cursor-not-allowed" : ""
                }`}
                disabled={task?.status === "todo" || isUpdatingStatusPre}
              >
                {isUpdatingStatusPre ? (
                  <Loader2
                    className="text-gray-500 dark:text-gray-300 animate-spin"
                    size={16}
                  />
                ) : (
                  <ArrowLeft
                    size={16}
                    className="text-gray-500 dark:text-gray-300"
                  />
                )}
              </button>
              <button
                onClick={() => handleStatusChange(task._id, task.status)}
                className={`p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ${
                  isUpdatingStatus ? "cursor-not-allowed" : ""
                }`}
                disabled={task?.status === "done" || isUpdatingStatus}
              >
                {isUpdatingStatus ? (
                  <Loader2
                    className="text-gray-500 dark:text-gray-300 animate-spin"
                    size={16}
                  />
                ) : (
                  <ArrowRight
                    size={16}
                    className="text-gray-500 dark:text-gray-300"
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <SingleTaskDeleteModal
        isOpen={isOpen}
        closeModal={closeModal}
        taskDelete={taskDelete}
        task={task}
      />
    </div>
  );
};

export default TaskCard;

"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCreateBoardMutation } from "@/redux/features/Api/TaskApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const TaskCreateModal = ({ isOpen, closeModal, team = {} }) => {
    const { members } = team || { members: [] };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            status: "todo",
        },
    });

    const { user } = useUser();
    const [startDate, setStartDate] = useState(null);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [createBoard, { isLoading }] = useCreateBoardMutation();

    if (!team) {
        return <p>Loading....</p>;
    }

    const onSubmit = async (data) => {
        try {
            const boardData = {
                ...data,
                teamId: team?._id,
                targetDate: startDate ? startDate.toISOString() : null,
                members: selectedMembers,
            };

            const result = await createBoard(boardData);

            if (result.data) {
                toast.success("Task Board created!");
                closeModal();
            } else if (result.error) {
                console.error("Error creating task:", result.error);
                toast.error("Error creating task. Please try again.", {
                    position: "bottom-right",
                });
            }
        } catch (error) {
            console.error("Error creating task:", error);
            toast.error("Error creating task. Please try again.", {
                position: "bottom-right",
            });
        }
    };

    const today = new Date();

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md sm:max-w-lg md:max-w-xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
                                    Create Single Board
                                </Dialog.Title>

                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="space-y-4 text-sm sm:text-base"
                                >
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            {...register("title", { required: "Title is required" })}
                                            placeholder="Enter board title"
                                            className="w-full"
                                        />
                                        {errors.title && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.title.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description (Optional)</Label>
                                        <textarea
                                            id="description"
                                            {...register("description")}
                                            placeholder="Enter board description"
                                            className="w-full border rounded p-2"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="members">Members</Label>
                                        <Select
                                            onValueChange={(value) => setSelectedMembers(value)}
                                            multiple
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select members" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {team?.members?.map((member) => (
                                                    <SelectItem
                                                        key={member._id}
                                                        value={member._id}
                                                        className="flex items-center space-x-2"
                                                    >
                                                        <img
                                                            src={member?.imageUrl || "/placeholder-image.jpg"}
                                                            alt={member?.firstName}
                                                            className="w-8 h-8 rounded-full"
                                                        />
                                                        <div>
                                                            <p className="font-medium">
                                                                {member?.firstName} {member?.lastName}
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                {member?.email}
                                                            </p>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2 w-full">
                                        <Label htmlFor="targetDate">Target Date</Label>
                                        <DatePicker
                                            id="targetDate"
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            minDate={today}
                                            placeholderText="Select a target date"
                                            className="w-full border max-w-md rounded p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                        />
                                        {startDate === null && (
                                            <p className="text-red-500 text-sm mt-1">
                                                Target Date is required
                                            </p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full mt-4"
                                        disabled={isLoading || startDate === null}
                                    >
                                        {isLoading ? "Creating..." : "Create Board"}
                                    </Button>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default TaskCreateModal;
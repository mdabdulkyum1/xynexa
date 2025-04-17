import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Paperclip } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useGetUserByEmailQuery } from "@/redux/features/Api/userApi";
import { useAddAttachmentToBoardMutation } from "@/redux/features/Api/TaskApi";
import { useForm } from "react-hook-form";

const Attachment = ({ task }) => {
    const { user } = useUser();

    const userEmail = user?.emailAddresses[0]?.emailAddress;
    const {
        data: userData,
        isLoading,
        isError,
        error,
    } = useGetUserByEmailQuery(userEmail, { skip: !userEmail });

    const userId = userData?.user?._id;
    const boardId = task?._id;

    const [addAttachmentToBoard, { isLoading: isAddingAttachment }] = useAddAttachmentToBoardMutation();

    const [localAttachments, setLocalAttachments] = useState([]);

    useEffect(() => {
        if (task?.attachments) {
            setLocalAttachments(task.attachments);
        }
    }, [task?.attachments]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        if (boardId && userId && data.attachmentUrl.trim()) {
            try {
                await addAttachmentToBoard({
                    boardId,
                    userId,
                    url: data.attachmentUrl,
                    filename: data.attachmentName.trim() || data.attachmentUrl.substring(data.attachmentUrl.lastIndexOf('/') + 1),
                }).unwrap();
                reset();
                console.log("Attachment added successfully!");
                // Optionally, refetch task data
            } catch (err) {
                console.error("Failed to add attachment:", err);
            }
        } else {
            console.log("Board ID, User ID, or attachment URL is missing or empty.");
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <p className="flex items-center gap-1 justify-center cursor-pointer">
                    <Paperclip
                        className="bg-gray-100 dark:bg-gray-700 rounded-full p-1 fill-blue-700 dark:fill-blue-400 text-white"
                        size={28}
                    />
                </p>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-4">
                {localAttachments.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            Attachments ({localAttachments.length})
                        </h3>
                        <ul className="space-y-2">
                            {localAttachments.map((attachment) => (
                                <li
                                    key={attachment._id}
                                    className="flex items-center justify-between p-2 rounded-md bg-gray-100 dark:bg-gray-800"
                                >
                                    <a
                                        href={attachment.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline truncate dark:text-blue-400"
                                    >
                                        {attachment.filename || attachment.url}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {localAttachments.length === 0 && (
                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                        No attachments yet.
                    </p>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-2">
                    <div>
                        <Label
                            htmlFor="attachmentUrl"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Attachment URL <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="attachmentUrl"
                            type="url"
                            placeholder="Enter the URL of the attachment"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                            {...register("attachmentUrl", { required: "Attachment URL is required" })}
                        />
                        {errors.attachmentUrl && (
                            <p className="text-red-500 text-xs italic">{errors.attachmentUrl.message}</p>
                        )}
                    </div>
                    <div>
                        <Label
                            htmlFor="attachmentName"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Attachment Name (Optional)
                        </Label>
                        <Input
                            id="attachmentName"
                            type="text"
                            placeholder="Enter a name for the attachment (optional)"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                            {...register("attachmentName")}
                        />
                    </div>
                    <Button type="submit" disabled={isAddingAttachment} className="mt-2">
                        {isAddingAttachment ? "Adding..." : "Add Attachment"}
                    </Button>
                </form>
            </PopoverContent>
        </Popover>
    );
};

export default Attachment;
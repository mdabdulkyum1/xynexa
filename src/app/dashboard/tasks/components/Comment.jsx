import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MessageSquareText } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAddCommentToBoardMutation } from "@/redux/features/Api/TaskApi";
import { useUser } from "@clerk/nextjs";
import { useGetUserByEmailQuery } from "@/redux/features/Api/userApi";
import moment from "moment";
import Image from "next/image";

const Comment = ({ task }) => {
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

  const [
    addCommentToBoard,
    {
      isLoading: isCommentAdding,
      isSuccess: isCommentSuccess,
      isError: isCommentError,
      error: commentError,
    },
  ] = useAddCommentToBoardMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const text = data.comment;
    if (boardId && userId && text.trim()) {
      const commentData = {
        boardId,
        userId,
        text,
      };
      try {
        await addCommentToBoard(commentData).unwrap();
        reset();
        
      } catch (err) {
        console.error("Failed to add comment:", err);
      }
    } else {

    }
  };

  const [formattedComments, setFormattedComments] = useState([]);

  useEffect(() => {
    if (task?.comments) {
      const formatted = task.comments.map((comment) => ({
        id: comment._id,
        author: comment.user.firstName + " " + comment.user.lastName,
        text: comment.text,
        createdAt: moment(comment.createdAt).fromNow(),
        authorInitial: comment.user.firstName.charAt(0).toUpperCase(),
        image: comment.user.imageUrl,
      }));
      setFormattedComments(formatted);
    }
  }, [task?.comments]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <p className="flex items-center gap-1 justify-center cursor-pointer">
          <MessageSquareText
            className="bg-gray-100 dark:bg-gray-700 rounded-full p-1 fill-amber-500 text-white"
            size={28}
          />
        </p>
      </PopoverTrigger>
      <PopoverContent className="w-[400px]  p-4">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Comments ({formattedComments.length})
          </h3>
          {formattedComments.length > 0 ? (
            <ul className="space-y-4">
              {formattedComments.map((comment) => (
                <li
                  key={comment.id}
                  className="p-3 rounded-md bg-gray-100 dark:bg-gray-800"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-white dark:text-gray-300 font-semibold">
                        <Image
                          height={32}
                          width={32}
                          alt="user"
                          src={comment.image}
                          className="rounded-full"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {comment.author}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {comment.text}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {comment.createdAt}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No comments yet.</p>
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
          <div className="space-y-2">
            <Label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Add Comment
            </Label>
            <Textarea
              id="comment"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              rows={3}
              placeholder="Write your comment here..."
              {...register("comment", { required: "Comment is required" })}
            />
            {errors.comment && (
              <p className="text-red-500 text-xs italic">
                {errors.comment.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="mt-2"
            disabled={!boardId || !userId || isCommentAdding}
          >
            {isCommentAdding ? "Adding Comment..." : "Post Comment"}
          </Button>
          {isCommentError && (
            <p className="text-red-500 text-xs mt-1">
              Failed to add comment:{" "}
              {commentError?.message || "Something went wrong"}
            </p>
          )}
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default Comment;

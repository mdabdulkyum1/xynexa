"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const TaskCreateModal = ({ isOpen, closeModal, createTaskHandler }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { user } = useUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;

  const onSubmit = async (data) => {
    try {
      const taskData = {
        ...data,
        teamCreatorEmail: userEmail,
        timeStrap: {
          assignDate: new Date().toISOString(),
        },
      };

      await createTaskHandler(taskData);
      toast.success("Task Board created!");
      closeModal();
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Error creating task. Please try again.");
    }
  };

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
                    <Label htmlFor="status">Status</Label>
                    <Select
                      onValueChange={(value) => setValue("status", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todo">Todo</SelectItem>
                        <SelectItem value="inprogress">In Progress</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                        <SelectItem value="done"></SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.status && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.status.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="membersEmail">Selected Member Email</Label>
                    <Select
                      onValueChange={(value) => setValue("membersEmail", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a member email" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="member1@example.com">
                          member1@example.com
                        </SelectItem>
                        <SelectItem value="member2@example.com">
                          member2@example.com
                        </SelectItem>
                        <SelectItem value="member3@example.com">
                          member3@example.com
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.membersEmail && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.membersEmail.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" className="w-full mt-4">
                    Create Board
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

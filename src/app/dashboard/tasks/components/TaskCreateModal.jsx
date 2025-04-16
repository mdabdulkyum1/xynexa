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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useCreateBoardMutation } from "@/redux/features/Api/boardApi";



const TaskCreateModal = ({ isOpen, closeModal, team = {} }) => {
  // console.log(team);

  const { members } = team || { members: [] };
  // console.log(team?.team?._id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "todo",
    },
  });

  const { user } = useUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;
  const [date, setDate] = useState(undefined);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [createBoard,{isLoading}] = useCreateBoardMutation();

  if (!team) {
    return <p>Loading....</p>;
  }

  const onSubmit = async (data) => {
    try {
      const boardData = {
        ...data,
        teamId: team?._id,
        targetDate: date ? date.toISOString() : null,
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

               

                  <div className="space-y-2">
                    <Label htmlFor="targetDate">Target Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          {date ? (
                            new Date(date).toLocaleDateString()
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-4"
                    disabled={isLoading}
                  >
                    {" "}
                    
                    {isLoading ? "Creating..." : "Create Board"}{" "}
                    
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

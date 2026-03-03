"use client";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import rocketData from '../../../../../../public/assets/lottie/rocket.json';
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSession } from "next-auth/react";
import useTeamStore from "@/store/useTeamStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateBoard = ({ open, setOpen }) => {
  const { data: session } = useSession();
  const { createTeam, isLoading } = useTeamStore();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    if (!session?.user?.id) {
      toast.error("You must be logged in to create a team");
      return;
    }

    try {
      const teamData = {
        teamName: data.boardName,
        teamDescription: data.description,
        teamType: data.category || "teams",
        creator: session.user.id,
      };

      const result = await createTeam(teamData);
      if (result) {
        toast.success("Team created successfully!");
        setOpen(false);
        router.push(`/dashboard/team/view`);
      }
    } catch (error) {
      console.error("Error creating team:", error);
      toast.error(error.message || "Failed to create team");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full lg:max-w-5xl sm:w-[95%] md:w-[85%] lg:w-[75%] overflow-y-auto p-6 md:p-8 lg:p-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="w-full flex justify-center lg:w-1/2 order-1 lg:order-2">
              <Lottie animationData={rocketData} className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[350px]" />
            </div>
            <div className="w-full lg:w-1/2 space-y-4 order-2 lg:order-1">
              <DialogHeader>
                <DialogTitle className="text-center ">Add Board</DialogTitle>
              </DialogHeader>
              <Label>Board Name<span className="text-red-500">*</span></Label>
              <Input className="w-full" {...register("boardName", { required: 'Board Name is required' })} />
              {errors.boardName && <p className="text-red-500">{errors.boardName.message}</p>}
              <Label>Category<span className="text-red-500">*</span></Label>
              <Select onValueChange={(value) => setValue("category", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teams">Internal Team</SelectItem>
                  <SelectItem value="startups">Startup</SelectItem>
                  <SelectItem value="businesses">Business</SelectItem>
                  <SelectItem value="remote_workers">Remote Workers</SelectItem>
                </SelectContent>
              </Select>
              <Label>Project Name<span className="text-red-500">*</span></Label>
              <Input className="w-full" {...register('projectName', { required: 'Project Name is required' })} />
              {errors.projectName && <p className="text-red-500">{errors.projectName.message}</p>}
              
              <Label>Description Your Board</Label>
              <Textarea className="w-full" {...register("description")} />
              
              <div className="flex justify-end space-x-2 mt-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create"}
                </Button>
                <Button variant="outline" type="button" onClick={() => setOpen(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBoard;

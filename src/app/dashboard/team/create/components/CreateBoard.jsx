"use client";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import rocketData from '../../../../../../public/assets/lottie/rocket.json';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const CreateBoard = () => {

    const [open, setOpen] = useState(false);

    return (
        <div>
         <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <div className="text-right">
            <DialogTrigger
              className="border p-3  rounded-md bg-secondary dark:bg-violet-400 font-bold"
              onClick={() => setOpen(true)}
            >
              Create Board
            </DialogTrigger>
          </div>

          <DialogContent className="max-h-[90vh] w-full lg:max-w-[220vh] sm:w-[95%] md:w-[85%] lg:w-[75%] overflow-y-auto p-6 md:p-8 lg:p-10">
            
            {/* Dialouge content Start */}
            <div className="flex flex-col lg:flex-row items-center gap-6">
              {/*  Lottie file */}
              <div className="w-full flex justify-center lg:w-1/2 order-1 lg:order-2">
                <Lottie animationData={rocketData} className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[350px]" />
              </div>

              {/*  Form Section */}
              <div className="w-full lg:w-1/2 space-y-4 order-2 lg:order-1">
                <DialogHeader>
                  <DialogTitle className="text-center ">Add Board</DialogTitle>
                </DialogHeader>

                {/* Board Name */}
                <Label>Board Name<span className="text-red-500">*</span></Label>
                <Input className="w-full" />
                

                {/* Category start  */}
                <Label>Category<span className="text-red-500">*</span></Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="It & Support">IT & Support</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Product & Dev">Product & Dev</SelectItem>
                    <SelectItem value="Creative Design">Creative Design</SelectItem>
                    <SelectItem value="Hr">HR</SelectItem>
                  </SelectContent>
                </Select>


                {/* project Name */}
                <Label>Project Name<span className="text-red-500">*</span></Label>
                <Input className="w-full" />

                    {/* Admin Name */}
                <Label>Creator Admin</Label>
                <Input className="w-full" />

                {/*  Team Members added email */}    
                <Label>Add Team Members<span className="text-red-500">*</span></Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Team Members" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5-10">5-10</SelectItem>
                    <SelectItem value="20-25">20-25</SelectItem>
                    <SelectItem value="70-100">70-100</SelectItem>
                  </SelectContent>
                </Select>

                {/* Description */}
                <Label>Description Your Board</Label>
                <Textarea className="w-full" />

                {/* upload Cover Photo */}
                <Label>Cover Photo<span className="text-red-500">*</span></Label>
                <Input type="file" className="w-full" />

                {/* Buttons */}
                <div className="flex justify-end space-x-2 mt-4">
                 <Button>Create</Button>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>

          </DialogContent>
        </Dialog>
         </div>

        Hello

        </div>
    );
};

export default CreateBoard;
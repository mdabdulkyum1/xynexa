"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <div className="text-right">
            <DialogTrigger
              className="border p-3 rounded-3xl bg-primary text-white"
              onClick={() => setOpen(true)}
            >
              Create Board
            </DialogTrigger>
          </div>
          <DialogContent className="max-h-[80vh] lg:max-w-[180vh] overflow-y-auto w-full sm:w-[90%] md:w-[70%] lg:w-[50%]">
            <DialogHeader>
              <DialogTitle className="text-center">Add Board</DialogTitle>
              
            </DialogHeader>
            <div className="space-y-4">
              <Label>
                Board Name<span className="text-red-500">*</span>
              </Label>
              <Input className="w-full" />
              <Label>Category<span className="text-red-500">*</span></Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="It & Support">It & Support</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Product & Dev">Product & Dev</SelectItem>
                  <SelectItem value="creative Design"> Creative Design</SelectItem>
                  <SelectItem value="Hr">HR</SelectItem>
                </SelectContent>
              </Select>
              <Label>Project Name<span className="text-red-500">*</span></Label>
              <Input className="w-full" />
              <Label>Cretor Admin</Label>
              <Input className="w-full" />
              <Label>Add Team Members<span className="text-red-500">*</span></Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Team Members (email theke ashbe for developers)"  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="It & Support">5-10</SelectItem>
                  <SelectItem value="Marketing">20-25</SelectItem>
                  <SelectItem value="Operations">70-100</SelectItem>
                </SelectContent>
              </Select>
              <Label>Description Your Board</Label>
              <Textarea className="w-full" />
              <Label>Cover Photo<span className="text-red-500">*</span></Label>
              <Input type="file" className="w-full" />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button>Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

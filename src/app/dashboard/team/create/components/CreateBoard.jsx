// "use client";
// import dynamic from "next/dynamic";
// const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
// import rocketData from '../../../../../../public/assets/lottie/rocket.json';
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   Button,
// //   Label,
// //   Input,
// //   Textarea,
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui";
// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import Image from 'next/image';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Select, SelectValue } from "@/components/ui/select";

// const CreateBoard = ({ open, setOpen }) => {
//   const { register, handleSubmit, setValue, formState: { errors } } = useForm();

//   const onSubmit = (data) => {
//     console.log(data);
//     setOpen(false); // Close the dialog after submission
//   };
//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent className="w-full lg:max-w-5xl sm:w-[95%] md:w-[85%] lg:w-[75%] overflow-y-auto p-6 md:p-8 lg:p-10">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="flex flex-col lg:flex-row items-center gap-6">
//             <div className="w-full flex justify-center lg:w-1/2 order-1 lg:order-2">
//               <Lottie animationData={rocketData} className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[350px]" />
//             </div>
//             <div className="w-full lg:w-1/2 space-y-4 order-2 lg:order-1">
//               <DialogHeader>
//                 <DialogTitle className="text-center ">Add Board</DialogTitle>
//               </DialogHeader>
//               <Label>Board Name<span className="text-red-500">*</span></Label>
//               <Input className="w-full" {...register("boardName", { required: 'Board Name is required' })} />
//               {errors.boardName && <p className="text-red-500">{errors.boardName.message}</p>}
//               <Label>Category<span className="text-red-500">*</span></Label>
//               <Select onValueChange={(value) => setValue("category", value)}>
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Select Category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="It & Support">IT & Support</SelectItem>
//                   <SelectItem value="Marketing">Marketing</SelectItem>
//                   <SelectItem value="Operations">Operations</SelectItem>
//                   <SelectItem value="Product & Dev">Product & Dev</SelectItem>
//                   <SelectItem value="Creative Design">Creative Design</SelectItem>
//                   <SelectItem value="Hr">HR</SelectItem>
//                 </SelectContent>
//               </Select>
//               <Label>Project Name<span className="text-red-500">*</span></Label>
//               <Input className="w-full" {...register('projectName', { required: 'Project Name is required' })} />
//               {errors.projectName && <p className="text-red-500">{errors.projectName.message}</p>}
//               <Label>Creator Admin</Label>
//               <Input className="w-full" {...register('adminName')} placeholder='je create korbe admin hisebe boshbe ' />
//               <Label>Add Team Members<span className="text-red-500">*</span></Label>
//               <Select onValueChange={(value) => setValue('teamMembers', value)}>
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Select Team Members" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="5-10">5-10</SelectItem>
//                   <SelectItem value="20-25">20-25</SelectItem>
//                   <SelectItem value="70-100">70-100</SelectItem>
//                 </SelectContent>
//               </Select>
//               <Label>Description Your Board</Label>
//               <Textarea className="w-full" {...register("description")} />
//               <Label>Cover Photo<span className="text-red-500">*</span></Label>
//               <Input type="file" className="w-full" {...register("coverPhoto", { required: "Cover Photo is required" })} />
//               {errors.coverPhoto && <p className="text-red-500">{errors.coverPhoto.message}</p>}
//               <div className="flex justify-end space-x-2 mt-4">
//                 <Button type="submit">Create</Button>
//                 <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };


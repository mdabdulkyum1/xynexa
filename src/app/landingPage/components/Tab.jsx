import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RiColorFilterAiFill } from "react-icons/ri";
import { IoIosAnalytics } from "react-icons/io";
import { MdPeople } from "react-icons/md";
import { TbAutomation } from "react-icons/tb";
import { MdArrowForwardIos } from "react-icons/md";

const Tab = () => {
    return (
        <div className='w-full lg:w-2/3 mx-auto my-6 lg:my-10 p-2'>
            <Tabs defaultValue="ai" className="w-full">
                <TabsList className="w-full">
                    <TabsTrigger value="ai"><RiColorFilterAiFill /> AI Assistant</TabsTrigger>
                    <TabsTrigger value="password"><IoIosAnalytics /> Simple Analytics</TabsTrigger>
                    <TabsTrigger value="profile"><MdPeople /> Easy Collaboration</TabsTrigger>
                    <TabsTrigger value="settings"><TbAutomation /> Smart Automation</TabsTrigger>
                </TabsList>

                <TabsContent value="ai" className="mt-4 lg:mt-8">
                   <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 p-4'>
                   <div>
                    <div className='flex gap-2 justify-items-start items-center'>
                        <button className='p-2 lg:p-4 text-[#20B7AB] border-2 border-[#20B7AB] rounded-lg'><RiColorFilterAiFill /></button>
                    <p className='text-[#20B7AB] font-bold'>Ai Assistant</p>
                    </div>
                    <h2 className='text-3xl font-bold my-2 dm-font'>Your new ultimate productivity companion</h2>
                    <p className='dark:text-gray-500'>Designed to seamlessly integrate into your personal and professional life, our AI Assistant is here to revolutionize the way you accomplish tasks.</p>
                   <div className='flex justify-center items-center'>   
                   <button className='btn mt-4 lg:mt-8  items-center rounded-2xl dark:text-white border-2 dark:border-white dark:bg-transparent'>Learn More <MdArrowForwardIos /></button>
                   </div>
                   </div>
                   <div className='border-2'></div>
                   </div>
                  
                </TabsContent>

                <TabsContent value="password" className="mt-4 lg:mt-8">
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 p-4'>
                   <div>
                    <div className='flex gap-2 justify-items-start items-center'>
                        <button className='p-2 lg:p-4 text-[#20B7AB] border-2 border-[#20B7AB] rounded-lg'><IoIosAnalytics /></button>
                    <p className='text-[#20B7AB] font-bold'>Simple Analytics</p>
                    </div>
                    <h2 className='text-3xl font-bold my-2 dm-font'>Help you track what really matters to you</h2>
                    <p className='dark:text-gray-500'>Built-in analytics and reporting capabilities help businesses gather insights, track KPI, and make data-driven decisions. </p>
                   <div className='flex justify-center items-center'>   
                   <button className='btn mt-4 lg:mt-8 items-center rounded-2xl dark:text-white border-2 dark:border-white dark:bg-transparent'>Learn More <MdArrowForwardIos /></button>
                   </div>
                   </div>
                   <div className='border-2'></div>
                   </div>
                </TabsContent>

                <TabsContent value="profile" className="mt-4 lg:mt-8">
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 p-4'>
                   <div>
                    <div className='flex gap-2 justify-items-start items-center'>
                        <button className='p-2 lg:p-4 text-[#E29D37] border-2 border-[#E29D37] rounded-lg'><MdPeople /></button>
                    <p className='text-[#E29D37] font-bold'>Easy Collaboration</p>
                    </div>
                    <h2 className='text-3xl font-bold my-2 dm-font'>Solution for seamless productive teamwork</h2>
                    <p className='dark:text-gray-500'>Working together on documents has never been easier, allowing you and your team to collaborate and provide constructive feedback.</p>
                   <div className='flex justify-center items-center'>   
                   <button className='btn mt-4 lg:mt-8 items-center rounded-2xl dark:text-white border-2 dark:border-white dark:bg-transparent'>Learn More <MdArrowForwardIos /></button>
                   </div>
                   </div>
                   <div className='border-2'></div>
                   </div>
                </TabsContent>

                <TabsContent value="settings" className="mt-4 lg:mt-8">
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 p-4'>
                   <div>
                    <div className='flex gap-2 justify-items-start items-center'>
                        <button className='p-2 lg:p-4 text-[#20B7AB] border-2 border-[#20B7AB] rounded-lg'><TbAutomation /></button>
                    <p className='text-[#20B7AB] font-bold'>Smart Automation</p>
                    </div>
                    <h2 className='text-3xl font-bold my-2 dm-font'>Streamline your entire workflow fast</h2>
                    <p className='dark:text-gray-500'>You can focus on the creative aspects of content creation while leaving time-consuming tasks to our intelligent system.</p>
                   <div className='flex justify-center items-center'>   
                   <button className='btn mt-4 lg:mt-8 items-center rounded-2xl dark:text-white border-2 dark:border-white dark:bg-transparent'>Learn More <MdArrowForwardIos /></button>
                   </div>
                   </div>
                   <div className='border-2'></div>
                   </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Tab;

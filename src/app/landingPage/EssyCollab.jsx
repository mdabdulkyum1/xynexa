import Image from 'next/image';
import React from 'react';
import { MdPeople } from 'react-icons/md';
import { FaUser } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { BiMessageRoundedDots } from "react-icons/bi";

const EssyCollab = () => {
    return (
        <div className='my-10 lg:my-28 w-11/12 lg:w-3/4 mx-auto'>
            <div className='flex flex-col justify-items-center items-center'>
                <div className='flex gap-2 justify-items-center items-center'>
                    <button className='p-2 lg:p-4 text-[#E29D37] border-2 border-[#E29D37] rounded-lg'><MdPeople /></button>
                    <p className='text-[#E29D37] font-bold'>Easy Collaboration</p>
                </div>
                <h2 className='text-3xl font-bold my-2 dm-font'>Solution for seamless productive teamwork</h2>
                <p className='dark:text-gray-500'>Working together on documents has never been easier, allowing you and your team to collaborate and provide constructive feedback.</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 lg:mt-12'>
                {/* Card 1 */}
                <div className='p-4'>
                    <div className=' h-[300px] bg-amber-100 dark:bg-[#E29D37] dark:text-white text-black max-w-md p-4 rounded-xl space-y-4 shadow-lg'>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">

                                <div>
                                    <h4 className="font-semibold">Lisa Jackson</h4>
                                    <p className="text-sm text-gray-500 dark:text-black">Sales Manager</p>
                                </div>
                            </div>
                            <select className="bg-transparent text-sm border border-gray-600 px-2 py-1 rounded focus:outline-none">
                                <option defaultValue>Full access</option>
                                <option className='bg-transparent'>Can edit</option>
                                <option>Can view</option>
                            </select>
                        </div>


                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">

                                <div>
                                    <h4 className="font-semibold">Katie Adams</h4>
                                    <p className="text-sm text-gray-500 dark:text-black">Product Manager</p>
                                </div>
                            </div>
                            <select className="bg-transparent text-sm border border-gray-600 px-2 py-1 rounded focus:outline-none">
                                <option>Full access</option>
                                <option>Can edit</option>
                                <option defaultValue>Can view</option>
                            </select>
                        </div>


                        <div className="flex items-center justify-between border-t  border-gray-700 pt-4">
                            <div>
                                <h4 className="font-semibold">Share to web</h4>
                                <p className="text-sm text-gray-500 dark:text-black">Anyone with the link can edit</p>
                            </div>
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:bg-green-300 relative transition-all">
                                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></span>
                                </div>
                            </label>
                        </div>
                    </div>


                    <div className='h-[200px] pt-5 space-y-2'>
                        <p className='text-2xl text-[#E29D37]'><FaUser /></p>
                        <p className='text-2xl'>User permissions</p>
                        <p className='dark:text-gray-500'>The ability to set varying levels of permissions for different users, ensuring data security and full access control.</p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className='p-4'>
                    <div className=' h-[300px] bg-gray-100 dark:bg-[#E29D37] rounded-xl'>
                        <div className=" text-black dark:text-white rounded-2xl p-4 w-full  space-y-4">

                            <div className="flex items-start gap-3">
                                <div className="text-[#2b2b2b] dark:text-white p-2 rounded-lg">

                                    <svg className="w-6 h-6 " fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-base font-medium">Create design system for team project</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="text-[#2b2b2b] dark:text-white p-2 rounded-lg">

                                    <svg className="w-6 h-6 " fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-base font-medium">Write a document ofr team project.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="text-[#2b2b2b] dark:text-white p-2 rounded-lg">

                                    <svg className="w-6 h-6 " fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-base font-medium">Assigned task on team members.</p>
                                </div>
                            </div>



                            <span className="inline-block bg-yellow-500 text-black dark:bg-white text-xs font-semibold px-3 py-1 rounded-full">
                                Medium
                            </span>


                            <div className="flex justify-between items-center text-sm text-gray-600 dark:text-black">
                                <div className="flex items-center gap-1">

                                    <span>Aug 12</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>Assigned</span>


                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='h-[200px] pt-5 space-y-2'>
                        <p className='text-2xl text-[#E29D37] font-bold'><IoIosCheckmarkCircleOutline /></p>
                        <p className='text-2xl'>Task assignment</p>
                        <p className='dark:text-gray-500'>The ability to assign tasks to specific team members and track their progress, ensuring accountability and transparency.</p>
                    </div>
                </div>

                {/* Card 3 */}
                <div className='p-4'>
                    <div className=' h-[300px] bg-amber-100 dark:bg-[#E29D37] rounded-xl'>
                        <div className=" text-black dark:text-white  p-4 w-80 ">
                            <div className="flex items-center gap-3">
                              
                               
                               
                                <div className="flex-1">
                                    <p className="text-sm font-semibold">Alex Schiller commented</p>
                                    <p className="text-sm mt-1 border-2 border-gray-700 p-2 rounded-lg">
                                        Your work on this task has really set a new benchmark...
                                    </p>
                                </div>
                            </div>
                           
                            <div className="flex justify-between items-center mt-3 text-gray-500 dark:text-black text-xs">
                                <div className="flex items-center gap-1">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>
                                    <span>5 min ago</span>
                                </div>
                                <button className="hover:text-blue-400">Reply</button>
                            </div>
                        </div>
                        <div className="text-black dark:text-white  p-4 w-80 ">
                            <div className="flex items-center gap-3">
                              
                               
                               
                                <div className="flex-1">
                                    <p className="text-sm font-semibold">Jessika luis commented</p>
                                    <p className="text-sm mt-1 border-2 border-gray-700 p-2 rounded-lg">
                                        well done...
                                    </p>
                                </div>
                            </div>
                           
                            <div className="flex justify-between items-center mt-3 text-gray-500 dark:text-black text-xs">
                                <div className="flex items-center gap-1">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>
                                    <span>5 min ago</span>
                                </div>
                                <button className="hover:text-blue-400">Reply</button>
                            </div>
                        </div>
                    </div>
                    <div className='h-[200px] pt-5 space-y-2'>
                        <p className='text-2xl text-[#E29D37]'><BiMessageRoundedDots /></p>
                        <p className='text-2xl'>Feedback activity</p>
                        <p className='dark:text-gray-500'>Leave comments, suggestions, and questions directly within the document, ensuring clear communication and context.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EssyCollab;

import Image from 'next/image';
import React from 'react';
import { MdArrowForwardIos, MdPeople } from 'react-icons/md';
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
                <div className='p-4'>
                    <div className='border-2 h-[300px]'></div>
                    <div className='h-[200px] pt-5 space-y-2'>
                        <p className='text-2xl text-[#E29D37]'><FaUser /></p>
                        <p className='text-2xl'>User permissions</p>
                        <p className='dark:text-gray-500'>The ability to set varying levels of permissions for different users, ensuring data security and full access control.</p>
                    </div>
                </div>
                <div className=' p-4'>
                    <div className='border-2 h-[300px]'></div>
                    <div className=' h-[200px] pt-5 space-y-2'>
                        <p className='text-2xl text-[#E29D37]'><IoIosCheckmarkCircleOutline /></p>
                        <p className='text-2xl'>Task assignment </p>
                        <p className='dark:text-gray-500'>The ability to assign tasks to specific team members and track their progress, ensuring accountability and transparency.</p>
                    </div>
                </div>
                <div className=' p-4'>
                    <div className='border-2 h-[300px]'></div>
                    <div className=' h-[200px] pt-5 space-y-2'>
                        <p className='text-2xl text-[#E29D37]'><BiMessageRoundedDots /></p>
                        <p className='text-2xl'>Feedback activity</p>
                        <p className='dark:text-gray-500'>Leave comments, suggestions, and questions directly within the document, ensuring clear communication and context. </p>
                    </div>
                </div>


            </div>

        </div>
    );
};

export default EssyCollab;
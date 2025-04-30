import React from 'react';
import { RiUserSettingsFill } from "react-icons/ri";
import { MdTroubleshoot } from "react-icons/md";
import { GrInbox } from "react-icons/gr";

const SupportCards = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 px-4 lg:px-8 my-10 lg:my-20'>
            <div className='flex flex-col justify-center items-center text-center gap-4  border-2 shadow-xl shadow-gray-400 rounded-lg p-4'>
                <div>
                    <p className='text-2xl lg:text-3xl font-bold'><RiUserSettingsFill /></p>
                </div> 
                <div>
                <h1 className='text-2xl  font-bold mb-4'>Getting Started</h1>
                <p>Get started fast with our app and explore new technologies</p>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center text-center gap-4  border-2 shadow-xl shadow-gray-400 rounded-lg p-4'>
                <div>
                    <p className='text-2xl lg:text-3xl font-bold'><GrInbox /></p>
                </div> 
                <div>
                <h1 className='text-2xl  font-bold mb-4'>Account and Billing</h1>
                <p>Managing your account, creating new users and exporting data</p>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center text-center gap-4  border-2 shadow-xl shadow-gray-400 rounded-lg p-4'>
                <div>
                    <p className='text-2xl lg:text-3xl font-bold'><MdTroubleshoot /></p>
                </div> 
                <div>
                <h1 className='text-2xl  font-bold mb-4'>Troublesshooting</h1>
                <p>Anewers to most common configuration issues</p>
                </div>
            </div>
        </div>
    );
};

export default SupportCards;
import { Avatar, AvatarGroup } from '@mui/material';
import { CirclePlus, FileCheck, MessageSquareText, Paperclip } from 'lucide-react';
import React from 'react';
import './taskcard.css'

const TaskCard = () => {
    return (
        <div className="bg-white dark:bg-[#0A0A0A] p-4 rounded-lg shadow-md purple-shadow">
            <div className="flex justify-between items-center">
                <h3 className="font-medium dark:font-normal text-gray-900 dark:text-gray-100">
                    Create Calender Design
                </h3>
                <h6 className="text-blue-400 dark:text-blue-300 font-bold flex items-center gap-1">
                    <FileCheck className="fill-blue-400 dark:fill-blue-300 text-white" strokeWidth={2} />
                    <span className="text-blue-400 dark:text-blue-300">4</span>
                </h6>
            </div>
            <div className="flex gap-2 font-semibold text-xs py-2 flex-wrap">
                <span className="border rounded-full py-1 px-2 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600">Date</span>
                <span className="bg-purple-100 dark:bg-purple-600 text-purple-700 dark:text-white rounded-full py-1 px-2">MomentJS</span>
                <span className="bg-yellow-100 dark:bg-yellow-600 text-orange-500 dark:text-white rounded-full py-1 px-2">Color</span>
            </div>
            <div>
                {/* Left Side (Avatar Group) */}
                <div className="flex items-center justify-between md:gap-4 gap-2">
                    <AvatarGroup max={4}>
                        <Avatar sx={{ width: 24, height: 24 }} alt="Remy Sharp" src="https://i.ibb.co/B6sBj8C/stokes.jpg" />
                        <Avatar sx={{ width: 24, height: 24 }} alt="Travis Howard" src="https://i.ibb.co/103M16B/man-outside-091318-800x450.jpg" />
                        <Avatar sx={{ width: 24, height: 24 }} alt="Cindy Baker" src="https://i.ibb.co/DMRpJqg/IMG-20220410-223356.jpg" />
                        <Avatar sx={{ width: 24, height: 24 }} alt="Cindy Baker" src="https://i.ibb.co/DMRpJqg/IMG-20220410-223356.jpg" />
                    </AvatarGroup>
                    <div className="p-1 border-2 border-gray-400 dark:border-gray-600 border-dashed rounded-full">
                        <CirclePlus size={16} className="text-gray-400 dark:text-gray-300" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <p className="flex items-center gap-1 justify-center">
                            <MessageSquareText className="bg-gray-100 dark:bg-gray-700 rounded-full p-1 fill-amber-500 text-white" size={28} />
                            <span className="text-amber-500 dark:text-amber-400 font-bold">2</span>
                        </p>
                        <p className="flex items-center gap-1 justify-center">
                            <Paperclip className="bg-gray-100 dark:bg-gray-700 rounded-full p-1 fill-blue-700 dark:fill-blue-400 text-white" size={28} />
                            <span className="text-blue-700 dark:text-blue-400 font-bold">2</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;

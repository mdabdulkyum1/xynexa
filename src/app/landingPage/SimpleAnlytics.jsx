import Image from 'next/image';
import React from 'react';
import { IoIosAnalytics } from 'react-icons/io';
import { MdArrowForwardIos } from 'react-icons/md';
import { LuChartScatter } from "react-icons/lu";
import { PiTelevisionFill } from "react-icons/pi";

const SimpleAnlytics = () => {
    return (
        <div className='my-10 lg:my-28 w-11/12 lg:w-3/4 mx-auto'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 mt-6 lg:mt-12'>
                <div className="relative w-full h-[500px] md:h-[600px] lg:h-[500px]">
                    <Image
                        src="/assets/images/analytics.png"
                        alt="ai"
                        fill
                        className="object-cover"
                    />
                </div>
                <div>
                    <div className='flex gap-2 justify-items-start items-center'>
                        <button className='p-2 lg:p-4 text-blue-600 border-2 border-blue-600 rounded-lg text-xl'><IoIosAnalytics /></button>
                        <p className='text-blue-600 font-bold'>Simple Analytics</p>
                    </div>
                    <h2 className='text-3xl font-bold my-2 dm-font'>Help you track what really matters to you</h2>
                    <p className='dark:text-gray-500'>It helps businesses make informed predictions and anticipate trends, enabling proactive decision-making and planning.</p>

                    <button className='btn mt-4 lg:mt-8  items-center rounded-2xl dark:text-white border-2 dark:border-white dark:bg-transparent'>Learn More <MdArrowForwardIos /></button>
                    <div className='flex gap-2 mt-4 lg:mt-8'>
                        <div>
                            <p className='text-blue-600 text-xl lg:text-2xl'><LuChartScatter /></p>
                            <h2 className='font-bold my-4'>Charts tracking</h2>
                            <p className='dark:text-gray-500'>Built-in analytics and reporting capabilities help gather insights.</p>
                        </div>
                        <div>
                            <p className='text-blue-600 text-xl lg:text-2xl'><PiTelevisionFill /></p>
                            <h2 className='font-bold my-4'>Data visualization</h2>
                            <p className='dark:text-gray-500'>Interactive data visualizations help in presenting complex insights.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SimpleAnlytics;

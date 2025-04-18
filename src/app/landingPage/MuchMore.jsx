import React from 'react';
import FeatureButton from './FeatureButton';
import { RiColorFilterAiFill } from 'react-icons/ri';
import { MdArrowForwardIos } from 'react-icons/md';
import { FaRegPlayCircle } from "react-icons/fa";
import { RiBox3Line } from "react-icons/ri";
// import aiImage from '../../assets/ai.png';
import Image from 'next/image';

const MuchMore = () => {
    return (
        <div className='my-10 lg:my-28 w-11/12 lg:w-3/4 mx-auto'>
            <FeatureButton></FeatureButton>
            <div className='dark:text-white text-center my-4'>
                <h2 className='text-3xl lg:text-5xl font-bold mb-4 dm-font'>And so much more</h2>
                <p className='w-full lg:w-1/2 mx-auto dark:text-gray-400'> All the features you need to build a better experience, explore the possibilities, and unlock the full potential of what we have to offer.</p>
            </div>
            <div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 mt-6 lg:mt-12'>
                    <div>
                        <div className='flex gap-2 justify-items-start items-center'>
                            <button className='p-2 lg:p-4 text-[#20B7AB] border-2 border-[#20B7AB] rounded-lg text-xl'><RiColorFilterAiFill /></button>
                            <p className='text-[#20B7AB] font-bold'>Ai Assistant</p>
                        </div>
                        <h2 className='text-3xl font-bold my-2 dm-font'>Your new ultimate productivity companion</h2>
                        <p className='dark:text-gray-500'>Designed to seamlessly integrate into your personal and professional life, our AI Assistant is here to revolutionize the way you accomplish tasks.</p>

                        <button className='btn mt-4 lg:mt-8  items-center rounded-2xl dark:text-white border-2 dark:border-white dark:bg-transparent'>Learn More <MdArrowForwardIos /></button>
                        <div className='flex gap-2 mt-4 lg:mt-8'>
                            <div>
                                <p className='text-[#20B7AB] text-xl lg:text-2xl'><FaRegPlayCircle /></p>
                                <h2 className='font-bold my-4'>Video editing</h2>
                                <p className='dark:text-gray-500'>Seamlessly transform raw footage into polished masterpieces.</p>
                            </div>
                            <div>
                                <p className='text-[#20B7AB] text-xl lg:text-2xl'><RiBox3Line /></p>
                                <h2 className='font-bold my-4'>Video editing</h2>
                                <p className='dark:text-gray-500'>Seamlessly transform raw footage into polished masterpieces.</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[500px]">
                        <Image
                            src="/assets/images/ai.png"
                            alt="ai"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MuchMore;
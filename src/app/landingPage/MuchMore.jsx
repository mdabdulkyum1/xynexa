import React from 'react';
import FeatureButton from './FeatureButton';
import { RiColorFilterAiFill } from 'react-icons/ri';
import { MdArrowForwardIos } from 'react-icons/md';
import { FaRegPlayCircle } from "react-icons/fa";
import { RiBox3Line } from "react-icons/ri";
import Image from 'next/image';

const MuchMore = () => {
  return (
    <div className='py-16 max-w-7xl  lg:py-12  mx-auto'>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-16  items-center'>
        <div className="relative w-full h-[400px] lg:h-[450px]">
          <Image
            src="/ai.jpeg"
            alt="ai assistant interface"
            fill
            className="rounded-xl object-cover shadow-lg"
          />

<div className="absolute bottom-6 right-6 bg-white bg-opacity-80 rounded-md shadow-md p-4">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center space-x-2">
            <RiColorFilterAiFill className="h-4 w-4 text-teal-500" aria-hidden="true" />
            <span>AI-Powered  Suggestions</span>
          </h3>
          <p className="text-xs text-gray-500 ml-6">
            Smart recommendations to boost your productivity.
          </p>
        </div>

        <div className="absolute bottom-24 right-6 bg-white bg-opacity-80 rounded-md shadow-md p-3">
          <div className="flex items-center space-x-2">
            <RiColorFilterAiFill className="h-4 w-4 text-teal-500" aria-hidden="true" />
            <div className=" pb-2   rounded">Automated Prioritization</div>
          </div>
        </div>
          
        </div>
        <div className='flex flex-col justify-center'>
          <div className='flex gap-4 items-center mb-6'>
            <button className='p-4 text-teal-500 border-2 border-teal-500 rounded-lg text-2xl'>
              <RiColorFilterAiFill />
            </button>
            <p className='text-teal-500 font-bold text-3xl'>AI Assistant</p>
          </div>
          <h2 className='text-2xl lg:text-3xl font-bold mb-6 dm-font dark:text-white'>
            Your new ultimate productivity companion
          </h2>
          <p className='dark:text-gray-500 leading-relaxed mb-8 text-lg'>
            Our AI Assistant is meticulously crafted to seamlessly integrate into both your personal and professional spheres, poised to revolutionize the way you manage tasks and boost your efficiency.
          </p>
          
          <div className='mt-12 grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div>
              <p className='text-teal-500 text-3xl mb-3'>
                <FaRegPlayCircle />
              </p>
              <h3 className='font-bold text-lg mb-3 dark:text-white'>Video Editing</h3>
              <p className='dark:text-gray-500 leading-relaxed text-sm'>
                Transform your raw video content into captivating, polished narratives with our intuitive editing tools.
              </p>
            </div>
            <div>
              <p className='text-teal-500 text-3xl mb-3'>
                <RiBox3Line />
              </p>
              <h3 className='font-bold text-lg mb-3 dark:text-white'>3D Modeling</h3>
              <p className='dark:text-gray-500 leading-relaxed text-sm'>
                Unleash your creative vision and build immersive digital worlds with our powerful 3D modeling capabilities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MuchMore;
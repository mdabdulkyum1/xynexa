import React from 'react';
import { AiTwotoneThunderbolt } from "react-icons/ai";

const FeatureButton = () => {
    return (
        <div className='flex justify-center items-center'>
            <button className='btn text-[#20B7AB] border-2 border-[#20B7AB] rounded-full bg-transparent'><span className='text-xl'><AiTwotoneThunderbolt /></span> Features</button>
        </div>
    );
};

export default FeatureButton;
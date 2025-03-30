"use client"

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { SlDiamond } from "react-icons/sl";
import { BsTrophy } from "react-icons/bs";
import { BsGlobe2 } from "react-icons/bs";
import { TfiCrown } from "react-icons/tfi";
import { motion } from "framer-motion";
const AboutValue = () => {

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className='my-10 lg:my-20 p-6 lg:p-16'>
        <h2 className='font-bold text-2xl lg:text-5xl mb-4 lg:mb-12 text-center'>Our Values it’s Simple !</h2>
        <div className='lg:w-1/2 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* card-1 */}
            <div className="rounded-lg bg-[#EAEEF1] dark:bg-white text-black p-6 h-[230px] lg:h-[300px]" data-aos="fade-right">
                <motion.div
                    className="text-4xl mb-2 bg-[#014E4E] p-2 rounded-full text-white w-10 h-10 lg:w-14 lg:h-14 flex justify-center items-center"
                    animate={{ y: [0, -10, 0] }} 
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                    <SlDiamond />
                </motion.div>
                <h3 className="font-bold mb-4 text-2xl">Make an impact .</h3>
                <p className='text-xs lg:text-[16px]'>
                    We’re building something big. Something that has the power to change sized business.
                </p>
            </div>
            {/* card-2 */}
            <div className='rounded-lg bg-[#EAEEF1] dark:bg-white text-black  p-6 h-[230px] lg:h-[300px]' data-aos="fade-left">
                <motion.div
                    className="text-4xl mb-2 bg-[#014E4E] p-2 rounded-full text-white w-10 h-10 lg:w-14 lg:h-14 flex justify-center items-center"
                    animate={{ y: [0, -10, 0] }} 
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                    <BsTrophy />
                </motion.div>

                <h3 className='font-bold mb-4 text-2xl'>Learn</h3>
                <p className='text-xs lg:text-[16px]'>XYnexa team are masters of their craft. Even though we’re all experts in our respective fields.</p>
            </div>
            {/* card-3 */}
            <div className='rounded-lg bg-[#EAEEF1] dark:bg-white text-black p-6 h-[230px] lg:h-[300px]' data-aos="fade-right">
                <motion.div
                    className="text-4xl mb-2 bg-[#014E4E] p-2 rounded-full text-white w-10 h-10 lg:w-14 lg:h-14 flex justify-center items-center"
                    animate={{ y: [0, -10, 0] }} 
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                    <BsGlobe2 />
                </motion.div>

                <h3 className='font-bold mb-4 text-2xl'>Have fun</h3>
                <p className='text-xs lg:text-[16px]'>We work hard and play harder . We believe in the importance of celebrating wins big or small, for the business.</p>
            </div>
            {/* card-4 */}
            <div className='rounded-lg bg-[#EAEEF1] dark:bg-white text-black p-6 h-[230px] lg:h-[300px]' data-aos="fade-left">
                <motion.div
                    className="text-4xl mb-2 bg-[#014E4E] p-2 rounded-full text-white w-10 h-10 lg:w-14 lg:h-14 flex justify-center items-center"
                    animate={{ y: [0, -10, 0] }} 
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                    <TfiCrown />
                </motion.div>

                <h3 className='font-bold mb-4 text-2xl'>Empathy</h3>
                <p className='text-xs lg:text-[16px]'>We strive to be empathetic to every customer and colleague and by doing so we can provide a better experience.</p>
            </div>
        </div>
    </div>
    );
};

export default AboutValue;
import React from 'react';

const AboutHelp = () => {
    return (
        <div className='bg-purple-200 my-10 lg:my-20 p-6 lg:p-16 text-center'>
            <h2 className='font-bold text-2xl lg:text-5xl mb-4'>How XYnexa helps</h2>
            <p className='text-gray-500 lg:w-1/2 mx-auto text-xs lg:text-[20px]'>Xynexa is an advanced team collaboration and task management platform built to enhance productivity and streamline workflows. Whether you’re managing a small team or handling large projects, Xynexa offers real-time updates, intuitive task tracking, and seamless communication to keep everyone aligned.
                Our goal is to provide an efficient and organized workspace where teams can collaborate effortlessly, stay on top of deadlines, and achieve their goals with ease. With user-friendly features and a modern interface, Xynexa ensures that productivity never slows down.
                Join us in transforming the way teams work together—efficient, smart, and hassle-free! </p>
                {/* dynamic card */}
                <div className='flex flex-wrap gap-6 my-8 justify-center items-end'>
                    <div className='p-4'>
                        <h2 className='font-bold text-2xl lg:text-4xl'>2025</h2>
                        <p className='text-gray-500'>Lexend founded.</p>
                    </div>
                    <div className='p-4'>
                        <h2 className='font-bold text-2xl lg:text-4xl'>50</h2>
                        <p className='text-gray-500'>Hardworking group.</p>
                    </div>
                    <div className='p-4'>
                        <h2 className='font-bold text-2xl lg:text-4xl'>100K</h2>
                        <p className='text-gray-500'>Document workflows.</p>
                    </div>
                   
                </div>
        </div>
    );
};

export default AboutHelp;
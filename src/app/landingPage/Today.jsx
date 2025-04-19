import React from 'react';

const Today = () => {
    return (
        <div className='my-10 lg:my-28 w-11/12 lg:w-3/4 mx-auto'>
           <div>
            <h3 className='text-4xl font-bold mb-5'>Start building today.</h3>
            <p className='text-gray-500'>Our app eliminates the need for complex spreadsheets, endless email threads, empowering businesses to achieve greater efficiency.</p>
            <div className='flex gap-4 mt-6'>
                <input className='dark:bg-gray-800 p-2 rounded-full' type="email" placeholder='abc@gmail.com' />
                <button className='btn rounded-full'>Join Us</button>
            </div>
            </div> 
           <div></div>
        </div>
    );
};

export default Today;
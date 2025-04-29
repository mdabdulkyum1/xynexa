import Link from 'next/link';
import React from 'react';

const SupportLast = () => {
    return (
        <div className='my-10 lg:my-20 flex flex-col justify-center items-center' >
            <h1 className='text-2xl md:text-3xl mb-4 font-bold'>Didn't find an answer to your question?</h1>
            <p>Get in touch with us for details on additional services and custom work pricing</p>
           
           <div>
           <button className='bg-[#014E4E] text-white px-4 py-2 rounded-lg mt-2'><Link href='/contact-us'>Contact Us</Link></button>
           </div>
        </div>
    );
};

export default SupportLast;
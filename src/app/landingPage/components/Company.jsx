'use client';

import Image from 'next/image';
import React from 'react';
import Marquee from 'react-fast-marquee';

const Company = () => {
  const logos = [
    '/logo1.svg',
    '/logo2.svg',
    '/logo3.svg',
    '/logo4.svg',
    '/logo5.svg',
    '/logo6.svg',
  ];

  return (
    <div className="md:pb-20">
     
      <div className="w-10/12  mx-auto overflow-hidden">
      <p className='text-gray-500 text-center pb-5'>Trusted by 50,000+ teams to communicate easily</p>
        <Marquee speed={50} gradient={true} >
          {logos.map((logo, index) => (
            <div key={index} className="mx-4 md:mx-5 lg:mx-5 flex items-center justify-center"> {/* Updated class */}
              <Image
                width={200} 
                height={40} 
                src={logo}
                alt={`Logo ${index + 1}`}
                className="h-8 md:h-12 grayscale opacity-75" 
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Company;
'use client';

import React from 'react';
import CountUp from 'react-countup';
import Marquee from 'react-fast-marquee';

const LeastStressed = () => {
  return (
    <div className="px-4 my-16 lg:my-24 md:px-8 lg:px-20 py-5 lg:py-10 bg-[#EAEEF1] dark:bg-transparent dark:text-white relative">
  <div className="absolute inset-0 bg-white/10 backdrop-blur-md"></div>
  <div className="relative z-10">
    <h6 className="text-center text-xl lg:text-2xl text-gray-700 dark:text-white font-semibold">
      Happy customers. Happier clients. And the least-stressed teams
    </h6>

    <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
      {/* Businesses */}
      <div className="space-y-2  p-6 rounded-lg ">
        <CountUp start={0} end={16} duration={3} suffix="K+" className="text-2xl lg:text-5xl font-bold text-[#014E4E] dark:text-teal-600" />
        <h3 className="md:text-2xl font-bold mb-2 text-gray-700 dark:text-white">Businesses</h3>
        <p className="text-gray-700 text-base dark:text-white">Keeping projects on-track, more profitable.</p>
      </div>

      {/* Client relationships */}
      <div className="space-y-2  p-6 rounded-lg ">
        <CountUp start={0} end={14} duration={3} suffix="M+" className="text-2xl lg:text-5xl font-bold text-[#014E4E] dark:text-teal-600" />
        <h3 className="md:text-2xl font-bold mb-2 text-gray-700 dark:text-white">Client relationships</h3>
        <p className="text-gray-700 text-base dark:text-white">Managed each year.</p>
      </div>

      {/* New projects */}
      <div className="space-y-2 p-6 rounded-lg ">
        <CountUp start={0} end={17} duration={3} suffix="K+" className="text-2xl lg:text-5xl font-bold text-[#014E4E] dark:text-teal-600" />
        <h3 className="md:text-2xl font-bold mb-2 text-gray-700 dark:text-white">New projects</h3>
        <p className="text-gray-700 text-base dark:text-white">Created each week.</p>
      </div>

      {/* Billable hours */}
      <div className="space-y-2  p-6 rounded-lg">
        <CountUp start={0} end={40} duration={3} suffix="M+" className="text-2xl lg:text-5xl font-bold text-[#014E4E] dark:text-teal-600" />
        <h3 className="md:text-2xl font-bold mb-2 text-gray-700 dark:text-white">Billable hours</h3>
        <p className="text-gray-700 text-base dark:text-white">Logged in 2024.</p>
      </div>
    </div>

    <div className="py-3 marquee-container">
      <Marquee speed={30} gradient={false} pauseOnHover={true}>
        <img src="https://i.ibb.co.com/LhrbkmZm/Devnexus.png" alt="Devnexus" className="h-28 w-28 mx-5 md:mx-8" />
        <img src="https://i.ibb.co.com/WvypBHnK/pngimg-com-google-PNG19644.png" alt="google" className="h-8 mx-5 md:mx-8" />
        <img src="https://i.ibb.co.com/wZvkqc9Q/ibm-logo-sql-database-encryption-solutions-gemalto-enterprise-17.png" alt="ibm" className="h-8 mx-5 md:mx-8" />
        <img src="https://i.ibb.co.com/LXdMgbcS/Netflix-logo.png" alt="Netflix" className="h-14 mx-5 md:mx-8" />
        <img src="https://i.ibb.co.com/Fb3dvK8P/Spotify-Logo-wine.png" alt="Spotify" className="h-16 mx-5 md:mx-8" />
        <img src="https://i.ibb.co.com/9906k1sG/microsoft-transparent-microsoft-free-free-png.webp" alt="microsoft" className="h-12 mx-5 md:mx-8" />
        <img src="https://i.ibb.co.com/hFmdGRyP/tesla-logo-png-red-31.png" alt="tesla" className="h-14 mx-5 md:mx-8" />
        <img src="https://i.ibb.co.com/HThVMdj2/Facebook-Logo-2019.png" alt="meta" className="h-12 mx-5 md:mx-8" />
      </Marquee>
    </div>
  </div>
     </div>


  );
};

export default LeastStressed;


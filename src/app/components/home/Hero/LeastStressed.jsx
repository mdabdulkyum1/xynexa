'use client';

import React from 'react';
import CountUp from 'react-countup';
import Marquee from 'react-fast-marquee';

const LeastStressed = () => {
  return (
    <div className="px-4 md:px-8 lg:px-20 py-5 bg-gradient-to-r from-[#0b0e1f] via-[#39325e] to-[#0b0e1f]">
      <h6 className="text-center text-2xl text-white">
        Happy customers. Happier clients. And the least-stressed teams around
      </h6>

      <div className=" py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        {/* Businesses */}
        <div className="space-y-2">
          <CountUp
            start={0}
            end={16}
            duration={3} // 2 সেকেন্ডে সম্পন্ন হবে
            suffix="K+"
            className="text-5xl font-bold text-[#ff97da]"
          />
          <h3 className=" md:text-2xl font-bold mb-2 text-[#ff97da]">
            Businesses
          </h3>
          <p className="text-gray-500 text-base">
            Keeping projects on-track, more profitable and less-nightmarish.
          </p>
        </div>

        {/* Client relationships */}
        <div className="space-y-2">
          <CountUp
            start={0}
            end={14}
            duration={3} // 2 সেকেন্ডে সম্পন্ন হবে
            suffix="M+"
            className="text-5xl font-bold text-[#ff9c73]"
          />
          <h3 className=" md:text-2xl font-bold mb-2 text-[#ff9c73]">
            Client relationships
          </h3>
          <p className="text-gray-500 text-base">
            Managed each year. We just help keep the sparks flying.
          </p>
        </div>

        {/* New projects */}
        <div className="space-y-2">
          <CountUp
            start={0}
            end={17}
            duration={3} // 2 সেকেন্ডে সম্পন্ন হবে
            suffix="K+"
            className="text-5xl font-bold text-[#aa8df8]"
          />
          <h3 className=" md:text-2xl font-bold mb-2 text-[#aa8df8]">
            New projects
          </h3>
          <p className="text-gray-500 text-base">
            Created each week (then smashed out of ballparks, probably).
          </p>
        </div>

        {/* Billable hours */}
        <div className="space-y-2">
          <CountUp
            start={0}
            end={40}
            duration={3} // 2 সেকেন্ডে সম্পন্ন হবে
            suffix="M+"
            className="text-5xl font-bold text-[#f8cae8]"
          />
          <h3 className=" md:text-2xl font-bold mb-2 text-[#f8cae8]">
            Billable hours
          </h3>
          <p className="text-gray-500 text-base">
            Logged in 2024. That’s 4,566 years of ka-chings.
          </p>
        </div>
      </div>

      <div className=" py-3 marquee-container ">
        <Marquee speed={30} gradient={false} pauseOnHover={true}>
          <img
            src="file:///C:/Users/V%20I%20V%20O%20B%20O%20O%20K/Downloads/shutterstock-light.svg"
            alt="ibm"
            className="h-11 mx-3 md:mx-8"
          />
          <img
            src="file:///C:/Users/V%20I%20V%20O%20B%20O%20O%20K/Downloads/unity-light.svg"
            alt="ibm"
            className="h-11 mx-3 md:mx-8"
          />
          <img
            src="/assets/images/intel.png"
            alt="intel"
            className="h-12 mx-3 md:mx-8"
          />

          <img
            src="/assets/images/tesla-motors.png"
            alt="tesla-motors"
            className="h-20 mx-3 md:mx-8"
          />

          <img
            src="/assets/images/meta.png"
            alt="meta"
            className="h-14 mx-3 md:mx-8"
          />
          <img
            src="/assets/images/udemy.png"
            alt="udemy"
            className="h-10 mx-3 md:mx-8"
          />

          <img
            src="/assets/images/netflix.png"
            alt="netflix"
            className="h-7 mx-3 md:mx-8"
          />
          <img
            src="/assets/images/Nvidia-Logo.png"
            alt="udemy"
            className="h-20 mx-3 md:mx-8"
          />
        </Marquee>
      </div>
    </div>
  );
};

export default LeastStressed;

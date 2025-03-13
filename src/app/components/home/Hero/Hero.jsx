'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const slides = [
  'https://i.ibb.co.com/Rrg3Tfs/grap-1.jpg',
  'https://i.ibb.co.com/TBBzpMyg/Bar-graph-showing-points-on-the-Daily-Report-Card-for-Weeks-4-5-and-6-of.png',

  'https://i.ibb.co.com/M5MjS185/grap-2.webp',
  'https://i.ibb.co.com/V0ZCtQsc/grap-3.webp',
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % slides.length);
    }, 3000); // 2 seconds per slide

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, #131831 30%, transparent), url('https://i.ibb.co/RpsnRp3R/Banner-BG.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'multiply',
      }}
      className="h-full lg:min-h-screen lg:flex items-center justify-center relative"
    >
      <div className="container mx-auto px-6 lg:px-32 flex flex-col lg:flex-row items-center justify-between gap-10 h-full">
        {/* Text Container */}
        <div className="w-full lg:w-2/5 text-white space-y-5">
          <h2 className="text-4xl lg:text-6xl font-bold">
            Master <span className="text-[#ff61c7]">projects, resources,</span>
            and <span className="text-[#ff61c7]">profits</span> like a pro
          </h2>

          <p className="text-lg">
            Teamwork.com is the smarter project management platform that keeps
            your client projects on track, your resourcing in check, and your
            profits on point. Finally, a management tool that actually manages.
          </p>

          <div className="flex items-center gap-3">
            <button className="btn bg-[#895ef7] text-white border-none text-lg rounded-full px-4 lg:px-8 py-3">
              Get Started for free
            </button>

            <button className="btn btn-outline text-white text-lg rounded-full px-4 lg:px-8 py-3">
              Book a demo
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            30 DAY TRIAL || NO CREDIT CARD REQUIRED
          </p>
        </div>

        {/* Image Container */}
        <div className="relative w-full lg:w-3/5 flex justify-center lg:justify-end lg:absolute bottom-0 right-0">
          <div className="overflow-hidden h-full w-full z-10">
            <img
              className="w-full h-full object-cover"
              src="https://i.ibb.co/HLRbwCc2/filters-format-webp.png"
              alt="Project Management"
            />
          </div>

          {/* Motion Auto Image Slide */}
          <div className="absolute top-0 md:right-20 lg:right-36 w-1/2">
            <motion.img
              key={index}
              src={slides[index]}
              alt={`Slide ${index + 1}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="w-full h-auto rounded-lg "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

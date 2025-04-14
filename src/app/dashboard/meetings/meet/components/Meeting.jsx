'use client';

import  { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Lottie from 'lottie-react';
import { MdOutlineVideoCall } from "react-icons/md";
import { BsCassette } from "react-icons/bs";

const Meeting = () => {

    const [animations, setAnimations] = useState([]);
    
      const animationPaths = [
        '/assets/lottie/animation.json',
        '/assets/lottie/animation2.json',
        '/assets/lottie/animation3.json',
        '/assets/lottie/animation4.json',
      ];
    
      useEffect(() => {
        const loadAnimations = async () => {
          const loaded = await Promise.all(
            animationPaths.map((path) =>
              fetch(path).then((res) => res.json())
            )
          );
          setAnimations(loaded);
        };
    
        loadAnimations();
      }, []);
    
      const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      };

    return (
       <div className='grid grid-cols-1 lg:grid-cols-2 p-4 lg:p-8'>
             <div className=" lg:mt-12">
       
               {animations.length > 0 ? (
                 <Slider {...settings}>
                   {animations.map((animation, index) => (
                     <div key={index} className="w-full h-64 lg:h-[400px] px-4">
                       <Lottie animationData={animation} loop={true} className="w-full h-full" />
       
                     </div>
                   ))}
                 </Slider>
               ) : (
                 <p className="text-center">Loading animations...</p>
               )}
             </div>
             <div className=' flex  items-center justify-center p-6'>
               <div>
                 <h2 className="text-2xl font-bold mb-4 text-center lg:text-left text-gray-700 dark:text-white">Meet Our Team in Motion</h2>
                 <p className="text-gray-600 dark:text-white text-center lg:text-left">
                   Discover the people behind the projects. Our team comes together with energy,
                   creativity, and purpose — and here's a glimpse of our dynamic spirit.
                 </p>
                 <div className='flex flex-col flex-wrap lg:flex-row items-center justify-center lg:justify-start gap-4 my-4 lg:my-8'>
                   <button className='btn px-2 py-1 lg:px-4 lg:py-2 rounded-lg border-none bg-[#4fb8b8] text-white dark:bg-gray-200 dark:text-black'><span className='text-xl'><MdOutlineVideoCall /></span> New Meeting</button>
                   <button className='btn px-2 py-1 lg:pl-4 lg:pr-16 lg:py-2 rounded-lg text-[#014E4E] border-2 border-[#014E4E] bg-transparent dark:border-white dark:text-white'><span className='text-xl'><BsCassette /></span> Enter A Code</button>
                   <p>Join</p>
                 </div>
                 <hr />
                 <p className='text-xs mt-2'><span className='underline text-blue-500'>LearnMore</span>about Goggle Meet</p>
               </div>
             </div>
       
       
           </div>
    );
};

export default Meeting;
'use client';
import React from 'react';
import Slider from "react-slick";
import { FaRegCommentDots } from "react-icons/fa";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

// Sample testimonials
const testimonials = [
  {
    text: "As a marketing professional, I rely heavily on data to drive my campaigns. They’ve been instrumental in helping me analyze and visualize data effectively.",
    name: "Jennifer Lee",
    role: "Entrepreneur",
    company: "Monaco",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    text: "With its powerful help desk features and automation capabilities, we’ve been able to provide faster and more personalized support to our clients.",
    name: "Emily Johnson",
    role: "Business Manager",
    company: "Proline",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    text: "The robust project tools and integrated communication have made customizable dashboards and collaboration a breeze.",
    name: "John Smith",
    role: "Product Manager",
    company: "Luminous",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    text: "This tool has streamlined our entire analytics pipeline. Everything from data ingestion to visualization just works flawlessly.",
    name: "Liam Carter",
    role: "Data Analyst",
    company: "Optix",
    avatar: "https://randomuser.me/api/portraits/men/74.jpg"
  },
  {
    text: "We’ve improved our decision-making by 40% since switching. The dashboards are intuitive and insightful.",
    name: "Sara Blake",
    role: "COO",
    company: "Dashify",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg"
  },
  {
    text: "Seamless integration and stellar support. Easily the best investment for our operations team.",
    name: "Nina Patel",
    role: "Operations Lead",
    company: "Coreflow",
    avatar: "https://randomuser.me/api/portraits/women/48.jpg"
  }
];

// Custom Arrows
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 right-2 lg:right-5 transform -translate-y-1/2 bg-gradient-to-br from-teal-500 to-white text-white p-2 rounded-full z-10 transition"
  >
    <IoIosArrowForward />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 left-2 lg:left-5 transform -translate-y-1/2 bg-gradient-to-br from-teal-500 to-white text-white p-2 rounded-full z-10 transition"
  >
    <IoIosArrowBack />
  </button>
);

// Main Component
const Testimonials = () => {
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="w-full lg:max-w-7xl mx-auto my-10 lg:my-20 rounded-lg px-4 py-16 bg-gradient-to-b from-white to-teal-100 dark:bg-[#1F1F1F] dark:bg-none text-gray-900 dark:text-white">

      <div className="text-center mb-10">
        <div className='p-2 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-br from-teal-500 to-white text-white'>
          <p className='text-5xl font-bold'><BiSolidQuoteAltLeft /></p>
        </div>
        <p className='uppercase font-bold text-teal-500'>user testimonial</p>
        <h2 className="text-3xl lg:text-5xl font-bold mb-6">What are people saying</h2>
      </div>

      <div className="relative">
        <Slider {...settings}>
          {testimonials.map((item, index) => (
            <div key={index} className="px-4 h-auto lg:px-16">
              <div className="rounded-2xl border border-[#20B7AB] p-4 shadow-md flex flex-col lg:flex-row lg:gap-8 bg-white dark:bg-[#1A1A1A] transition-colors h-full">
                
                {/* Avatar */}
                <div className="flex justify-center items-center mb-4 lg:mb-0 lg:w-1/4">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-24 h-24 lg:w-full lg:h-full rounded-full lg:rounded-lg object-cover"
                  />
                </div>

                {/* Text content */}
                <div className="text-center lg:text-left w-full lg:w-3/4 text-xs lg:text-base">
                <p className='hidden lg:flex text-5xl text-gray-400'><BiSolidQuoteAltLeft /></p>
                  <p className="text-gray-700 dark:text-gray-200 mb-4 lg:mt-4 lg:text-2xl">"{item.text}"</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.role} @ {item.company}</p>
                </div>

              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;

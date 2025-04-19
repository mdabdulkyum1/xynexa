'use client';
import React from 'react';
import Slider from "react-slick";
import { FaRegCommentDots } from "react-icons/fa";

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

const Testimonials = () => {
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="dark:bg-[#0F0F0F] text-gray-900 dark:text-white py-16 px-4">
      <div className="text-center mb-10">
        <button className="flex items-center gap-2 mx-auto bg-[#20B7AB1A] text-[#20B7AB] px-4 py-1 rounded-full text-sm font-medium mb-2">
          <FaRegCommentDots /> Testimonials
        </button>
        <h2 className="text-3xl font-bold">What are people saying</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto mt-2">
          Our customers continue to be the core of our business and their feedback vividly illustrates the success of our efforts.
        </p>
      </div>

      <Slider {...settings}>
        {testimonials.map((item, index) => (
          <div key={index} className="px-4">
            <div className="rounded-2xl border border-[#20B7AB] p-4 shadow-md h-[180px] flex flex-col justify-between bg-white dark:bg-[#1A1A1A] transition-colors">
              <p className="text-gray-700 dark:text-gray-200 mb-4">"{item.text}"</p>
              <div className="flex items-center gap-3 mt-4">
                <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.role} @ {item.company}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;

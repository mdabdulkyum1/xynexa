'use client';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const blogs = [
  {
    title: "Prestige raised $6M in Series A funding from Y Combinator",
    tag: "News",
    image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?fit=crop&w=800&q=80",
    author: "Jennifer Lee",
    date: "Jul 28, 2023",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    title: "The complete guide to staying productive using our AI",
    tag: "Insights",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?fit=crop&w=800&q=80",
    author: "David Brown",
    date: "Jul 27, 2023",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg"
  },
  {
    title: "How startups can improve their chances of getting financing",
    tag: "Stories",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?fit=crop&w=800&q=80",
    author: "Emily Johnson",
    date: "Jul 26, 2023",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];

const BlogSection = () => {
  return (
    <div className="py-20 px-4 md:px-8 lg:px-16 dark:bg-[#0F0F0F] bg-white text-gray-900 dark:text-white">
      <div className="text-center mb-12">
        <button className="flex items-center gap-2 mx-auto bg-[#20B7AB1A] text-[#20B7AB] px-4 py-1 rounded-full text-sm font-medium mb-4">
          📰 Blog
        </button>
        <h2 className="text-4xl font-bold mb-2">Latest from our blog</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          We are passionate about sharing valuable insights, industry trends, and expert perspectives to keep you informed and inspired.
        </p>
        <button className="mt-6 px-5 py-2 mb-4 rounded-full bg-[#1A1A1A] dark:bg-white text-white dark:text-black font-medium text-sm hover:scale-105 transition">
          Explore blog <FaArrowRight className="inline ml-2" />
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((post, index) => (
          <div key={index} className="bg-[#1A1A1A] dark:bg-[#1A1A1A] text-white rounded-2xl p-4 shadow-md hover:shadow-lg transition duration-300">
            <img src={post.image} alt={post.title} className="rounded-xl mb-4 w-full h-48 object-cover" />
            <span className="bg-[#20B7AB1A] text-[#20B7AB] px-3 py-1 text-xs rounded-full mb-3 inline-block font-medium">{post.tag}</span>
            <h3 className="text-lg font-semibold mb-4">{post.title}</h3>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <img src={post.avatar} className="w-7 h-7 rounded-full object-cover" alt={post.author} />
                <span>{post.author}</span>
              </div>
              <span>{post.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;

"use client";
import { motion } from "framer-motion";
import { useRef } from "react";

const timelineData = [
  {
    year: "2020",
    title: "Launched Collaboration Platform",
    description: "Introduced a revolutionary platform for seamless team collaboration.",
    image: "https://i.ibb.co.com/v6T6kNHs/timeline-03.webp",
  },
  {
    year: "2021",
    title: "Integrated Real-Time Editing",
    description: "Added real-time document editing to enhance team productivity.",
    image: "https://i.ibb.co.com/RpqGggVK/timeline-02.webp",
  },
  {
    year: "2022",
    title: "Expanded to Global Teams",
    description: "Supported over 10,000 teams worldwide with our collaboration tools.",
    image: "https://i.ibb.co.com/mfYZCk5/timeline-01.webp",
  },
  {
    year: "2023",
    title: "Introduced AI-Powered Features",
    description: "Integrated AI to automate tasks and improve team efficiency.",
    image: "https://i.ibb.co.com/T32kp44/timeline-06.webp",
  },
  {
    year: "2024",
    title: "Enhanced Security Features",
    description: "Rolled out advanced security protocols to protect team data.",
    image: "https://i.ibb.co.com/rGzKshjL/timeline-05.webp",
  },
  {
    year: "Today",
    title: "Leading Collaboration Platform",
    description: "Continuing to innovate and empower teams worldwide.",
    image: "https://i.ibb.co.com/cK2qX0rv/timeline-04.webp",
  },
];

const Timeline = () => {
  const containerRef = useRef(null);

  return (
    <div className="bg-[#f5f2e9] py-12 px-4">
      <h2 className="text-center text-3xl font-bold mb-8">How we got here</h2>
      <motion.div
        ref={containerRef}
        className="relative max-w-6xl mx-auto overflow-hidden cursor-grab active:cursor-grabbing"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }}
          className="flex space-x-4 md:space-x-12 px-4 md:px-8"
        >
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col items-center w-48 md:w-56 flex-shrink-0"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="rounded-lg w-24 h-24 md:w-32 md:h-32"
              />
              <div className="absolute top-24 md:top-32 left-1/2 w-2 h-2 bg-black rounded-full transform -translate-x-1/2"></div>
              <div className="text-center mt-8 md:mt-12">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold">{item.year}</h3>
                <p className="text-gray-600 text-sm md:text-base">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="absolute top-[100px] md:top-[132px] left-0 right-0 h-[1px] bg-gray-600 w-full"></div>
      </motion.div>
    </div>
  );
};

export default Timeline;
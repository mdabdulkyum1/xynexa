"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const services = [
    {
      name: "Dashboard",
      description: "Monitor key metrics and access tools all in one place.",
      image: "/assets/images/dashboard.png",
    },
    {
      name: "Task Board",
      description: "Organize tasks efficiently with visual boards and progress tracking.",
      image: "/assets/images/task-board.png",
    },
    {
      name: "Chat",
      description: "Communicate instantly through messaging and group chats.",
      image: "/assets/images/chat.png",
    },
    {
      name: "Meet",
      description: "Host and join meetings with features like group calls, voicemail, and transfers.",
      image: "/assets/images/meett.png",
    },
    {
      name: "AI Support",
      description: "Get real-time assistance and collaboration powered by AI.",
      image: "/assets/images/ai-s.png",
    },
  ];
  
const WorkFlowComponent = () => {
    const [selectedService, setSelectedService] = useState(services[0]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [imageTransition, setImageTransition] = useState(false);

    const toggleAccordion = (index) => {
        if (activeIndex === index) return;

        setImageTransition(true);
        setTimeout(() => {
            setSelectedService(services[index]);
            setActiveIndex(index);
            setImageTransition(false);
        }, 500);
    };

    // Auto cycle accordion
    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (activeIndex + 1) % services.length;
            toggleAccordion(nextIndex);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, [activeIndex]); // Re-run when activeIndex changes

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 p-6 shadow rounded-lg">
                {/* Accordion Section */}
                <div className="w-full lg:w-1/3">
                    <div className="space-y-3">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="relative border border-gray-300 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer"
                                onClick={() => toggleAccordion(index)}
                            >
                                <div className={`p-4 font-semibold flex justify-between items-center transition-all duration-300 dark:text-white dark:bg-teal-600 
                                    ${activeIndex === index ? "bg-primary text-white" : "bg-background "}`}
                                >
                                    <span className="absolute left-0 top-0 bottom-0 transition-all duration-300"
                                        style={{ width: activeIndex === index ? "4px" : "0px", backgroundColor: "#4bc8b7" }}
                                    />
                                    <span className="ml-4">{service.name}</span>
                                    <span className={`text-primary transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""}`}>
                                        {activeIndex === index ? "▲" : "▼"}
                                    </span>
                                </div>
                                <div className={`transition-all duration-500 ease-in-out overflow-hidden 
                                    ${activeIndex === index ? "max-h-40 p-3 dark:bg-[#252526] dark:text-white border-l-4 border-primary" : "max-h-0 p-0 border-l-2 border-transparent"}`}
                                >
                                    <p className="text-sm">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dynamic Content Section */}
                <div className="w-full lg:w-2/3 flex flex-col items-center text-center relative border border-primary rounded-lg">
                    <div className="relative w-full h-[300px] flex justify-center items-center overflow-hidden">
                        {/* Fading Out Image */}
                        {imageTransition && (
                            <Image
                                src={selectedService.image}
                                alt={selectedService.name}
                                width={700}
                                height={400}
                                className="absolute transition-all duration-500 transform translate-x-0 opacity-100"
                            />
                        )}
                        {/* Sliding In New Image */}
                        <Image
                            src={selectedService.image}
                            alt={selectedService.name}
                            width={700}
                            height={400}
                            className={`absolute transition-all duration-500 transform 
                                ${imageTransition ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"}`}
                        />
                    </div>
                    <p className="my-4 dark:text-white">{selectedService.description}</p>
                </div>
            </div>
        </div>
    );
};

export default WorkFlowComponent;

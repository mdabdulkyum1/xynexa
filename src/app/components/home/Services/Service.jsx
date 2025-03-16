"use client";

import { useState } from "react";
import Image from "next/image";

const services = [
    { name: "Call", description: "Make and receive calls directly in Teams with features like group calling, voicemail, and call transfers.", image: "/assets/images/services.jpg" },
    { name: "Collaborate", description: "Work together in real-time with integrated tools.", image: "/assets/images/services1.png" },
    { name: "Chat", description: "Stay connected with instant messaging and group chats.", image: "/assets/images/services2.png" },
    { name: "Services", description: "Stay connected with instant messaging and group chats.", image: "/assets/images/services3.png" },
    { name: "Dashboard", description: "Stay connected with instant messaging and group chats.", image: "/assets/images/services4.png" },
];

const Service = () => {
    const [selectedService, setSelectedService] = useState(services[0]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [imageTransition, setImageTransition] = useState(false);

    const toggleAccordion = (index) => {
        if (activeIndex === index) return; // Prevent animation if clicking the same item

        setImageTransition(true);
        setTimeout(() => {
            setSelectedService(services[index]);
            setActiveIndex(index);
            setImageTransition(false);
        }, 500); // Matches the transition duration
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 p-6 shadow rounded-lg">
                {/* Accordion Section */}
                <div className="w-full lg:w-1/3">
                    <h2 className="text-2xl font-semibold mb-4 text-center lg:text-left">Our Services</h2>
                    <div className="space-y-3">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="relative border border-gray-300 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer"
                                onClick={() => toggleAccordion(index)} // Click anywhere on the accordion
                            >
                                <div className={`p-4 font-semibold flex justify-between items-center transition-all duration-300 
                                    ${activeIndex === index ? "bg-primary text-white" : "bg-gray-100 text-black"}`}
                                >
                                    <span className="absolute left-0 top-0 bottom-0 transition-all duration-300"
                                        style={{ width: activeIndex === index ? "4px" : "0px", backgroundColor: "#895ef7" }}
                                    />
                                    <span className="ml-4">{service.name}</span>
                                    {/* Text-based Arrow Icon */}
                                    <span className={`text-purple-600 transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""}`}>
                                        {activeIndex === index ? "▲" : "▼"}
                                    </span>
                                </div>
                                <div
                                    className={`transition-all duration-500 ease-in-out overflow-hidden 
                                    ${activeIndex === index ? "max-h-40 p-3 bg-base-200 border-l-4 border-blue-500" : "max-h-0 p-0 border-l-2 border-transparent"}`}
                                >
                                    <p className="text-sm text-black">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dynamic Content Section */}
                <div className="w-full lg:w-2/3 flex flex-col items-center text-center relative">
                    <div className="relative w-full h-[300px] flex justify-center items-center overflow-hidden">
                        {/* Fading Out Image */}
                        {imageTransition && (
                            <Image
                                src={selectedService.image}
                                alt={selectedService.name}
                                width={400}
                                height={300}
                                className="absolute transition-all duration-500 transform translate-x-0 opacity-100"
                            />
                        )}
                        {/* Sliding In New Image */}
                        <Image
                            src={selectedService.image}
                            alt={selectedService.name}
                            width={400}
                            height={300}
                            className={`absolute transition-all duration-500 transform 
                                ${imageTransition ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"}`}
                        />
                    </div>
                    <p className="mt-4 text-gray-600">{selectedService.description}</p>
                </div>
            </div>
        </div>
    );
};

export default Service;

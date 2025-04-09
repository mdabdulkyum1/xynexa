"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";

import "react-multi-carousel/lib/styles.css"; // Import styles

// Import Carousel dynamically to avoid SSR issues in Next.js
const Carousel = dynamic(() => import("react-multi-carousel"), { ssr: false });



// Responsive settings
const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4, partialVisibilityGutter: 40 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2, partialVisibilityGutter: 30 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1, partialVisibilityGutter: 30 },
};



const Features = () => {

    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="my-10 lg:my-28">
            <div className="my-4 lg:my-8 text-center">
                <h2 className="text-2xl lg:text-4xl font-bold dark:text-white">Our Exclusive Features</h2>
            </div>
            <Carousel
                responsive={responsive}
                infinite
                autoPlay
                autoPlaySpeed={3000}
                keyBoardControl
                pauseOnHover
                showDots={false}
                swipeable
                draggable
            >
               
                {/* carosol-1 */}
                <div
                    className="relative group p-4 shadow-lg rounded-lg bg-blue-200 mx-4 h-48 lg:h-[350px] overflow-hidden cursor-pointer"
                    onClick={() => setIsVisible(!isVisible)}  
                >
                    {/* Default Content */}
                    <div className={`transition-opacity duration-300 ${isVisible ? "opacity-0" : "opacity-100"} group-hover:opacity-0`}>
                        <h3 className="mt-4 text-lg font-semibold">Task Management</h3>
                        <div className="relative w-full h-[200px]"></div>
                        <p className="font-bold">XYnexa</p>
                    </div>

                    {/* Hover/Click Content */}
                    <div className={`absolute inset-0 flex flex-col items-center justify-center bg-blue-300 text-white transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"} group-hover:opacity-100`}>
                        <h3 className="text-xl font-semibold">More Details</h3>
                        <p className="mt-2">Explore Task Management features.</p>
                        <button
                            className="mt-4 px-4 py-2 bg-white text-pink-600 rounded-lg font-semibold shadow-md"
                            onClick={(e) => { e.stopPropagation(); setIsVisible(false); }} 
                        >
                            Close
                        </button>
                    </div>
                </div>
                {/* carosol-2 */}
                <div
                    className="relative group p-4 shadow-lg rounded-lg bg-pink-200 mx-4 h-48 lg:h-[350px] overflow-hidden cursor-pointer"
                    onClick={() => setIsVisible(!isVisible)}  
                >
                    {/* Default Content */}
                    <div className={`transition-opacity duration-300 ${isVisible ? "opacity-0" : "opacity-100"} group-hover:opacity-0`}>
                        <h3 className="mt-4 text-lg font-semibold">Real-Time Messaging</h3>
                        <div className="relative w-full h-[200px]"></div>
                        <p className="font-bold">XYnexa</p>
                    </div>

                    {/* Hover/Click Content */}
                    <div className={`absolute inset-0 flex flex-col items-center justify-center bg-pink-300 text-white transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"} group-hover:opacity-100`}>
                        <h3 className="text-xl font-semibold">More Details</h3>
                        <p className="mt-2">Explore real-time messaging features.</p>
                        <button
                            className="mt-4 px-4 py-2 bg-white text-pink-600 rounded-lg font-semibold shadow-md"
                            onClick={(e) => { e.stopPropagation(); setIsVisible(false); }} 
                        >
                            Close
                        </button>
                    </div>
                </div>
                {/* carosol-3 */}
                <div
                    className="relative group p-4 shadow-lg rounded-lg bg-green-200 mx-4 h-48 lg:h-[350px] overflow-hidden cursor-pointer"
                    onClick={() => setIsVisible(!isVisible)} 
                >
                    {/* Default Content */}
                    <div className={`transition-opacity duration-300 ${isVisible ? "opacity-0" : "opacity-100"} group-hover:opacity-0`}>
                        <h3 className="mt-4 text-lg font-semibold">File Sharing & Storage </h3>
                        <div className="relative w-full h-[200px]"></div>
                        <p className="font-bold">XYnexa</p>
                    </div>

                    {/* Hover/Click Content */}
                    <div className={`absolute inset-0 flex flex-col items-center justify-center bg-green-300 text-white transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"} group-hover:opacity-100`}>
                        <h3 className="text-xl font-semibold">More Details</h3>
                        <p className="mt-2">Explore File Sharing & Storage features.</p>
                        <button
                            className="mt-4 px-4 py-2 bg-white text-pink-600 rounded-lg font-semibold shadow-md"
                            onClick={(e) => { e.stopPropagation(); setIsVisible(false); }} 
                        >
                            Close
                        </button>
                    </div>
                </div>
                {/* carosol-4 */}
                <div
                    className="relative group p-4 shadow-lg rounded-lg bg-red-200 mx-4 h-48 lg:h-[350px] overflow-hidden cursor-pointer"
                    onClick={() => setIsVisible(!isVisible)}  
                >
                    {/* Default Content */}
                    <div className={`transition-opacity duration-300 ${isVisible ? "opacity-0" : "opacity-100"} group-hover:opacity-0`}>
                        <h3 className="mt-4 text-lg font-semibold">Project Dashboard</h3>
                        <div className="relative w-full h-[200px]"></div>
                        <p className="font-bold">XYnexa</p>
                    </div>

                    {/* Hover/Click Content */}
                    <div className={`absolute inset-0 flex flex-col items-center justify-center bg-red-300 text-white transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"} group-hover:opacity-100`}>
                        <h3 className="text-xl font-semibold">More Details</h3>
                        <p className="mt-2">Explore Project Dashboard features.</p>
                        <button
                            className="mt-4 px-4 py-2 bg-white text-pink-600 rounded-lg font-semibold shadow-md"
                            onClick={(e) => { e.stopPropagation(); setIsVisible(false); }} 
                        >
                            Close
                        </button>
                    </div>
                </div>
                {/* carosol-5 */}
                <div
                    className="relative group p-4 shadow-lg rounded-lg bg-amber-200 mx-4 h-48 lg:h-[350px] overflow-hidden cursor-pointer"
                    onClick={() => setIsVisible(!isVisible)} 
                >
                    {/* Default Content */}
                    <div className={`transition-opacity duration-300 ${isVisible ? "opacity-0" : "opacity-100"} group-hover:opacity-0`}>
                        <h3 className="mt-4 text-lg font-semibold">Time Tracking</h3>
                        <div className="relative w-full h-[200px]"></div>
                        <p className="font-bold">XYnexa</p>
                    </div>

                    {/* Hover/Click Content */}
                    <div className={`absolute inset-0 flex flex-col items-center justify-center bg-amber-300 text-white transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"} group-hover:opacity-100`}>
                        <h3 className="text-xl font-semibold">More Details</h3>
                        <p className="mt-2">Explore Time Tracking features.</p>
                        <button
                            className="mt-4 px-4 py-2 bg-white text-pink-600 rounded-lg font-semibold shadow-md"
                            onClick={(e) => { e.stopPropagation(); setIsVisible(false); }} 
                        >
                            Close
                        </button>
                    </div>
                </div>
                {/* carosol-6 */}
                <div
                    className="relative group p-4 shadow-lg rounded-lg bg-pink-200 mx-4 h-48 lg:h-[350px] overflow-hidden cursor-pointer"
                    onClick={() => setIsVisible(!isVisible)}  
                >
                    {/* Default Content */}
                    <div className={`transition-opacity duration-300 ${isVisible ? "opacity-0" : "opacity-100"} group-hover:opacity-0`}>
                        <h3 className="mt-4 text-lg font-semibold">Discussion Boards</h3>
                        <div className="relative w-full h-[200px]"></div>
                        <p className="font-bold">XYnexa</p>
                    </div>

                    {/* Hover/Click Content */}
                    <div className={`absolute inset-0 flex flex-col items-center justify-center bg-pink-400 text-white transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"} group-hover:opacity-100`}>
                        <h3 className="text-xl font-semibold">More Details</h3>
                        <p className="mt-2">Explore Discussion Boards features.</p>
                        <button
                            className="mt-4 px-4 py-2 bg-white text-pink-600 rounded-lg font-semibold shadow-md"
                            onClick={(e) => { e.stopPropagation(); setIsVisible(false); }} 
                        >
                            Close
                        </button>
                    </div>
                </div>
                {/* carosol-7 */}
                <div
                    className="relative group p-4 shadow-lg rounded-lg bg-indigo-200 mx-4 h-48 lg:h-[350px] overflow-hidden cursor-pointer"
                    onClick={() => setIsVisible(!isVisible)}  
                >
                    {/* Default Content */}
                    <div className={`transition-opacity duration-300 ${isVisible ? "opacity-0" : "opacity-100"} group-hover:opacity-0`}>
                        <h3 className="mt-4 text-lg font-semibold">Discussion Boards</h3>
                        <div className="relative w-full h-[200px]"></div>
                        <p className="font-bold">XYnexa</p>
                    </div>

                    {/* Hover/Click Content */}
                    <div className={`absolute inset-0 flex flex-col items-center justify-center bg-indigo-300 text-white transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"} group-hover:opacity-100`}>
                        <h3 className="text-xl font-semibold">More Details</h3>
                        <p className="mt-2">Explore Discussion Boards features.</p>
                        <button
                            className="mt-4 px-4 py-2 bg-white text-pink-600 rounded-lg font-semibold shadow-md"
                            onClick={(e) => { e.stopPropagation(); setIsVisible(false); }} 
                        >
                            Close
                        </button>
                    </div>
                </div>
                {/* carosol-8 */}
                <div
                    className="relative group p-4 shadow-lg rounded-lg bg-orange-200 mx-4 h-48 lg:h-[350px] overflow-hidden cursor-pointer"
                    onClick={() => setIsVisible(!isVisible)}  
                >
                    {/* Default Content */}
                    <div className={`transition-opacity duration-300 ${isVisible ? "opacity-0" : "opacity-100"} group-hover:opacity-0`}>
                        <h3 className="mt-4 text-lg font-semibold">Task Notifications & Reminders</h3>
                        <div className="relative w-full h-[200px]"></div>
                        <p className="font-bold">XYnexa</p>
                    </div>

                    {/* Hover/Click Content */}
                    <div className={`absolute inset-0 flex flex-col items-center justify-center bg-orange-300 text-white transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"} group-hover:opacity-100`}>
                        <h3 className="text-xl font-semibold">More Details</h3>
                        <p className="mt-2">Explore Task Notifications & Reminders features.</p>
                        <button
                            className="mt-4 px-4 py-2 bg-white text-pink-600 rounded-lg font-semibold shadow-md"
                            onClick={(e) => { e.stopPropagation(); setIsVisible(false); }} 
                        >
                            Close
                        </button>
                    </div>
                </div>


                
                
            </Carousel>
        </div>
    );
};

export default Features;

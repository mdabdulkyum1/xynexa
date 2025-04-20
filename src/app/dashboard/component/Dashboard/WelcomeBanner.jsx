"use client";
import React from "react";
import Lottie from "lottie-react";
import animationData from "../../../../../public/assets/lottie/animation-team.json";

const WelcomeBanner = () => {
  return (
    <div className="bg-white dark:bg-black rounded-lg p-8 shadow-md flex flex-col lg:flex-row items-center justify-between">
      <div className="flex-1 text-center lg:text-left">
        <p className="text-xs text-gray-500 dark:text-gray-300 hidden lg:flex">Welcome to</p>
        <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
          XYnexa Collaboration Hub...!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-xs lg:text-sm mb-6">
          Streamline your team's workflow and boost productivity with powerful
          task management tools built for seamless collaboration.
        </p>
        
      </div>
      <div className="flex-1 w-full h-[200px] my-[12px] flex justify-end dark:bg-black ">
      <Lottie animationData={animationData} loop={true} className="w-11/12 mx-auto lg:w-full"/>
      </div>
    </div>
  );
};

export default WelcomeBanner;

import React from "react";

const WelcomeBanner = () => {
  return (
    <div className="bg-white dark:bg-black rounded-lg p-8 shadow-md flex items-center justify-between">
      <div className="flex-1">
        <p className="text-sm text-gray-500">Welcome to</p>
        <h2 className="text-3xl font-semibold mb-4">
          XYnexa Collaboration Hub
        </h2>
        <p className="text-gray-600 mb-6">
          Streamline your team's workflow and boost productivity with powerful
          task management tools built for seamless collaboration.
        </p>
        <button className="bg-primary  text-white font-semibold py-2 px-6 rounded-lg">
          Learn More
        </button>
      </div>
      <div className="flex-1  h-[200px] my-[12px] flex justify-end">
        <img
          src="/assets/feature.jpg"
          alt="Welcome"
          className="max-w-md rounded-2xl"
        />
      </div>
    </div>
  );
};

export default WelcomeBanner;

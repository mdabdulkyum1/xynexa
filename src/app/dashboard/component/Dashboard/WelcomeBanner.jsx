import React from 'react';

const WelcomeBanner = () => {
  return (
    <div className="bg-white dark:bg-black rounded-lg p-8 shadow-md flex items-center justify-between">
      <div className="flex-1">
        <p className="text-sm text-gray-500">Welcome To</p>
        <h2 className="text-3xl font-semibold mb-4">Your Task Management Area</h2>
        <p className="text-gray-600 mb-6">
          Lorem ipsum dolor sit amet consectetur. Bibendum risus urna tortor praesent.
        </p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full">
          Learn More
        </button>
      </div>
      <div className="flex-1 h-[200px] my-6 flex justify-end">
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
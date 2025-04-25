"use client";

import React from 'react';

const Loading = () => {
    return (
        <>
           <div className="flex items-center justify-center ">
  <div className="relative w-16 h-16">
    <div className="w-full h-full border-4 border-indigo-500 border-b-transparent animate-spin rounded-sm shadow-lg shadow-indigo-500/50"></div>
    <div className="absolute top-4 left-4 w-3 h-3 bg-indigo-500 animate-ping rounded-full shadow-md shadow-indigo-400"></div>
  </div>
</div>


        </>
    );
};

export default Loading;
'use client';

import { Button } from "@/components/ui/button";
import "./Hero.css";
import Image from "next/image";

const Hero = () => {
  return (
    <div className='relative'>
      <div className="relative rounded-xl  z-0 flex flex-col items-center  text-center px-6 bg-white dark:bg-background py-[100px]  transition-colors overflow-hidden">
        {/* Animated Grid Background with Color Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-700 opacity-50" />
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none">
          
        </div>

        {/* Badge */}
        <div className="z-10 mt-24 mb-6 inline-flex items-center bg-purple-200 text-purple-700 px-4 py-1 rounded-full text-sm font-medium dark:bg-green-900 dark:text-green-300">
          Introducing Xynexa
        </div>

        {/* Heading */}
        <h1 className="z-10 text-4xl md:text-6xl font-bold max-w-3xl text-gray-900 dark:text-white">
          Collaborate smarter with your team.
        </h1>

        {/* Subheading */}
        <p className="z-10 mt-6 max-w-2xl text-lg md:text-xl text-gray-600 dark:text-muted-foreground">
          Xynexa is your all-in-one collaboration tool — chat, plan, and manage projects with unmatched clarity and speed.
        </p>

        {/* CTA Buttons */}
        <div className="z-10 mt-8 flex gap-4 flex-wrap justify-center">
          <Button size="lg" className="text-base">
            Try Xynexa Free →
          </Button>
          <Button variant="outline" size="lg" className="text-base">
            See Features →
          </Button>
        </div>

        {/* Reviews */}
        <div className="z-10 mt-10 mb-4 text-sm text-muted-foreground">
          Trusted by 1,200+ teams • Rated 4.9/5
        </div>
      </div>
      {/* <div className="mx-auto flex justify-center absolute bottom-0 left-0 right-0 top-[80%]">
        <div className=" ">
          <Image src='/reDash.png' width={1200} height={600} className=" bg-white/20 rounded-xl backdrop-blur-md p-2  shadow-lg" alt="Dashboard Preview" />
        </div>
      </div> */}
    </div>
  );
};

export default Hero;
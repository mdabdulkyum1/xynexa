'use client';

import Image from 'next/image';
import { AiFillCompass } from "react-icons/ai";

const icons = [
  "/assets/images/chatgpt.png",
  "/assets/images/discord.png",
  "/assets/images/figma.png",
  "/assets/images/framer.png",
  "/assets/images/githubb.png",
  "/assets/images/gitlab.png",
  "/assets/images/meet.png",
  "/assets/images/notion.png",
];

export default function Apps() {
  const radius = 150; // consistent for all devices to keep design same

  return (
    <div className="relative w-full max-w-[400px] mt-8 aspect-square mx-auto flex items-center justify-center">
      {/* === Circle Stroke Rings === */}
      <div className="absolute w-[180px] h-[180px] lg:w-[200px] lg:h-[200px] rounded-full border border-[#2a2a2a]"></div>
      <div className="absolute w-[280px] h-[280px] lg:w-[320px] lg:h-[320px] rounded-full border border-[#3d3d3d]"></div>

      {/* === Center Icon === */}
      <div className="absolute z-10 h-14 w-14 bg-white dark:bg-gray-200 text-black rounded-full flex items-center justify-center text-2xl">
        <AiFillCompass />
      </div>

      {/* === Rotating Icons === */}
      <div className="absolute w-full h-full animate-spin-slow">
        {icons.map((icon, index) => {
          const angle = (360 / icons.length) * index;
          const x = radius * Math.cos((angle * Math.PI) / 180);
          const y = radius * Math.sin((angle * Math.PI) / 180);

          return (
            <div
              key={index}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
              }}
            >
              <div className="h-12 w-12 lg:w-16 lg:h-16 rounded-full bg-white dark:bg-gray-200 flex items-center justify-center shadow-xl">
                <Image
                  src={icon}
                  alt={`Icon-${index}`}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

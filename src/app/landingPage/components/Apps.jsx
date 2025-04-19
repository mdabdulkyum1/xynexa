'use client';

import { motion } from 'framer-motion';
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
    const radius = 160;
    return (
        <div className="relative w-11/12  h-full lg:w-[400px] lg:h-[400px] mx-auto flex items-center justify-center">
        {/* === Circle Stroke Rings === */}
        <div className="absolute w-[200px] h-[200px] rounded-full border border-[#2a2a2a]"></div>
        <div className="absolute w-[320px] h-[320px] rounded-full border border-[#3d3d3d]"></div>
      
        {/* === Center Icon === */}
        <div className="absolute z-10 h-14 w-14 bg-black rounded-full flex items-center justify-center">
         <AiFillCompass></AiFillCompass>
        </div>
      
        {/* === Rotating Icons === */}
        <div className="absolute w-full h-full animate-spin-slow">
          {icons.map((icon, index) => {
            const angle = (360 / icons.length) * index;
            const x = 160 * Math.cos((angle * Math.PI) / 180);
            const y = 160 * Math.sin((angle * Math.PI) / 180);
      
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
                <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center shadow-xl">
                  <Image src={icon} alt={`Icon-${index}`} width={28} height={28} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      );
    }


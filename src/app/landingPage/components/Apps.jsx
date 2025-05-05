'use client';
import Image from 'next/image';
import { AiFillCompass } from "react-icons/ai";

const icons = [
  "/assets/images/chatgpt.png",
  "/assets/images/githubb.png",
  "/assets/images/meet.png",
];

export default function Apps() {
  const radius = 110; // radius for smaller devices
  const radiusLg = 150; // for large devices

  return (
    <div className="bg-primary relative w-full max-w-[350px] lg:max-w-[400px] aspect-square mx-auto flex items-center justify-center">
      {/* === Rings === */}
      <div className="absolute w-[160px] h-[160px] lg:w-[200px] lg:h-[200px] rounded-full border border-gray-600 dark:border-gray-700"></div>
      <div className="absolute w-[260px] h-[260px] lg:w-[320px] lg:h-[320px] rounded-full border border-gray-700 dark:border-gray-800"></div>

      {/* === Center Icon === */}
      <div className="absolute z-10 h-12 w-12 lg:h-14 lg:w-14 bg-white dark:bg-gray-200 text-black rounded-full flex items-center justify-center text-2xl">
        <AiFillCompass />
      </div>

      {/* === Rotating Icons === */}
      <div className="absolute w-full h-full animate-spin-slow">
        {icons.map((icon, index) => {
          const angle = (360 / icons.length) * index;
          const x = (typeof window !== 'undefined' && window.innerWidth < 1024 ? radius : radiusLg) * Math.cos((angle * Math.PI) / 180);
          const y = (typeof window !== 'undefined' && window.innerWidth < 1024 ? radius : radiusLg) * Math.sin((angle * Math.PI) / 180);

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
              <div className="h-10 w-10 lg:h-14 lg:w-14 rounded-full bg-white dark:bg-gray-200 flex items-center justify-center shadow-xl">
                <Image
                  src={icon}
                  alt={`Icon-${index}`}
                  width={28}
                  height={28}
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

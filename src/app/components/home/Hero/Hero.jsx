"use client";
import { MessagesSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./Hero.css";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation'; // Import the useRouter hook

const Hero = () => {
  const router = useRouter(); // Initialize the router

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.8, delayChildren: 0.2, staggerChildren: 0.1 } },
  };

  const badgeVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const headingVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const subheadingVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const profileVariants = {
    initial: { opacity: 0, scale: 0.8, x: -20 },
    animate: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.4 } },
  };

  const profileMessageVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3, delay: 0.2 } },
  };

  const buttonsVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delay: 0.4, staggerChildren: 0.2 } },
  };

  const buttonVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  const reviewsVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const handleTryFreeClick = () => {
    router.push('/dashboard'); 
  };

  const handleSeeFeaturesClick = () => {
    router.push('/dashboard'); 
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="relative rounded-xl z-0 flex flex-col items-center text-center px-6 bg-white dark:bg-background py-[100px] transition-colors">
       
        <div className="absolute inset-0 bg-gradient-to-b from-white to-teal-400 opacity-50 motion-reduce:opacity-100" />
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none motion-reduce:bg-none" />

        
        <motion.div
          className='absolute top-[20%] left-[10%]'
          variants={profileVariants}
        >
          <div className="relative w-20 h-20 rounded-full border-2 border-teal-400 flex items-center justify-center">
            <Image
              src="/m8.jpg"
              alt=""
              className="rounded-full w-full h-full object-cover"
              width={80}
              height={80}
            />
            <motion.div
              className="absolute bottom-0 right-0 bg-white text-teal-400 backdrop-blur-md rounded-full p-1"
              variants={profileMessageVariants}
            >
              <MessagesSquare className="w-5 h-5" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className='absolute top-[30%] right-[10%]'
          variants={profileVariants}
          style={{ delay: 0.3 }} // Add a slight delay for the second profile
        >
          <div className="relative w-20 h-20 rounded-full border-2 border-teal-400 flex items-center justify-center">
            <Image
              src="/m5.jpg"
              alt=""
              className="rounded-full w-full h-full object-cover"
              width={80}
              height={80}
            />
            <motion.div
              className="absolute bottom-0 right-0 bg-white text-teal-400 backdrop-blur-md rounded-full p-1"
              variants={profileMessageVariants}
            >
              <MessagesSquare className="w-5 h-5" />
            </motion.div>
          </div>
        </motion.div>

        {/* Animated Badge */}
        <motion.div
          variants={badgeVariants}
          className="z-10 mt-24 mb-6 inline-flex items-center bg-teal-200 text-teal-700 px-4 py-1 rounded-full text-sm font-medium dark:bg-green-900 dark:text-green-300"
        >
          Introducing Xynexa
        </motion.div>

        {/* Animated Heading */}
        <motion.h1
          variants={headingVariants}
          className="z-10 text-4xl md:text-6xl font-bold max-w-3xl text-gray-900 dark:text-white"
        >
          Collaborate smarter with your team.
        </motion.h1>

        {/* Animated Subheading */}
        <motion.p
          variants={subheadingVariants}
          className="z-10 mt-6 max-w-2xl text-lg md:text-xl text-gray-600 dark:text-muted-foreground"
        >
          Xynexa is your all-in-one collaboration tool — chat, plan, and manage
          projects with unmatched clarity and speed.
        </motion.p>

        {/* Animated CTA Buttons */}
        <motion.div
          variants={buttonsVariants}
          className="z-10 mt-8 flex gap-4 flex-wrap mb-5 justify-center"
        >
          <Button variants={buttonVariants} className="text-base cursor-pointer" onClick={handleTryFreeClick}>
            Try Xynexa Free →
          </Button>
          <Button
            variant="outline"
            variants={buttonVariants}
            className="text-base cursor-pointer"
            onClick={handleSeeFeaturesClick}
          >
            See Features →
          </Button>
        </motion.div>

        {/* Animated Reviews */}
      </div>
      {/* <div className="mx-auto flex justify-center absolute bottom-0 left-0 right-0 top-[80%]">
        <div className=" ">
          <Image src='/reDash.png' width={1200} height={600} className=" bg-white/20 rounded-xl backdrop-blur-md p-2   shadow-lg" alt="Dashboard Preview" />
        </div>
      </div> */}
    </motion.div>
  );
};

export default Hero;
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useUserDataFromClerk } from '@/hooks/useUserDataFromClerk';
import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs'
import Hero from './components/home/Hero/Hero';
import FavriteApps from './landingPage/FavriteApps';
import MuchMore from './landingPage/MuchMore';
import OthersFeatures from './landingPage/OthersFeatures';
import Testimonials from './landingPage/Testimonials';
import WorkFlow from './landingPage/WorkFlow';

import Image from 'next/image';
import FAQSection from './contact-us/components/FAQSection';
import InsightsSection from './contact-us/components/InsightsSection';
import Company from './landingPage/components/Company';
import TaskFeatures from './landingPage/components/Task';
import PricingCards from './pricing/components/PricingCards';
import Pricing from './landingPage/Pricing';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown} from 'lucide-react'; 
// import Load from '@/components/Loader/Load';





export default function Home() {
  const router = useRouter();
  const { user: mainUser, isLoaded } = useUser();
  const userEmail = mainUser?.emailAddresses[0]?.emailAddress;

  const { userData, isLoading } = useUserDataFromClerk(userEmail);
  const userRole = userData?.user?.role;

  const [showScrollDown, setShowScrollDown] = useState(true);
  const [showScrollUp, setShowScrollUp] = useState(false);

  const imageVariants = {
    initial: { y: 100, opacity: 0 },
    animate: { y: -100, opacity: 1, transition: { duration: 0.8, ease: 'easeInOut' } },
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show scroll-down if not at the very bottom and scrolled a bit from the top
      setShowScrollDown(scrollY < documentHeight - windowHeight - 50 && scrollY > 50);

      
      setShowScrollUp(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <ClerkLoading>
        {/* <Load/> */}
      </ClerkLoading>
      <div className="relative max-w-[1400px] mx-auto">
        <Hero />
      </div>

      
      <motion.div
        className="flex justify-center z-0"
        initial="initial"
        animate="animate"
        variants={imageVariants}
      >
        <div className="bg-white/20 rounded-xl backdrop-blur-md p-2 shadow-lg">
          <Image
            src="/d33.png"
            width={1200}
            height={600}
            alt="Dashboard Preview"
            className="rounded-xl"
          />
        </div>
      </motion.div>
      <Company />
      <OthersFeatures />
      <TaskFeatures />
      <MuchMore />
      <WorkFlow />
      <FavriteApps />
      <Pricing />
      <PricingCards />
      <Testimonials />
      <InsightsSection />
      <FAQSection />

      
      <AnimatePresence>
        {showScrollUp && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-16 right-8 bg-teal-500 text-white rounded-full shadow-md p-3 z-50 cursor-pointer hover:bg-teal-600 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

     
      <AnimatePresence>
        {showScrollDown && (
          <motion.button
            onClick={scrollToBottom}
            className="fixed bottom-32 right-8 bg-teal-500 text-white rounded-full shadow-md p-3 z-50 cursor-pointer hover:bg-teal-600 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <ArrowDown className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
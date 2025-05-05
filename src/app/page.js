'use client';

import { useUserDataFromClerk } from '@/hooks/useUserDataFromClerk';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

import Hero from './components/home/Hero/Hero';
import FavriteApps from './landingPage/FavriteApps';
import MuchMore from './landingPage/MuchMore';
import OthersFeatures from './landingPage/OthersFeatures';
import Testimonials from './landingPage/Testimonials';
import WorkFlow from './landingPage/WorkFlow';

import { motion } from 'framer-motion';
import Image from 'next/image';
import FAQSection from './contact-us/components/FAQSection';
import InsightsSection from './contact-us/components/InsightsSection';
import Company from './landingPage/components/Company';
import TaskFeatures from './landingPage/components/Task';
import PricingCards from './pricing/components/PricingCards';
import Pricing from './landingPage/Pricing';
export default function Home() {
  const router = useRouter();
  const { user: mainUser, isLoaded } = useUser();
  const userEmail = mainUser?.emailAddresses[0]?.emailAddress;

  const { userData, isLoading } = useUserDataFromClerk(userEmail);
  const userRole = userData?.user?.role;

  // useEffect(() => {
  //   // Wait for Clerk and user data to load
  //   if (!isLoaded || isLoading || !mainUser) return;

  //   // Redirect based on role
  //   if (userRole === 'admin') {
  //     router.push('/admin-dashbaord');
  //   } else if (userRole === 'member') {
  //     router.push('/dashboard');
  //   }
  // }, [isLoaded, isLoading, mainUser, userRole, router]);
  const imageVariants = {
    initial: { y: 100, opacity: 0 },
    animate: { y: -100, opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } },
  };
  return (
    <div className=''>
       <div className='relative max-w-[1400px] mx-auto'><Hero /></div>

{/* Place image right after Hero */}
<motion.div
        className="flex justify-center z-0"
        initial="initial"
        animate="animate"
        variants={imageVariants}
      >
        <div className="bg-white/20 rounded-xl backdrop-blur-md p-2 shadow-lg">
          <Image
            src="/reDash.png"
            width={1200}
            height={600}
            alt="Dashboard Preview"
            className="rounded-xl"
          />
        </div>
      </motion.div>
      <Company/>
      <OthersFeatures />
      <TaskFeatures/>
      <MuchMore />
      <WorkFlow />
      <FavriteApps />
      <Pricing />
      <PricingCards />
      <Testimonials />
      <InsightsSection/>
      <FAQSection />
    </div>
  );
}

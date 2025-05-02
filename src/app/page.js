'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useUserDataFromClerk } from '@/hooks/useUserDataFromClerk';

import Hero from './components/home/Hero/Hero';
import WorkFlow from './landingPage/WorkFlow';
import EssyCollab from './landingPage/EssyCollab';
import MuchMore from './landingPage/MuchMore';
import OthersFeatures from './landingPage/OthersFeatures';
import SimpleAnlytics from './landingPage/SimpleAnlytics';
import FavriteApps from './landingPage/FavriteApps';
import Pricing from './landingPage/Pricing';
import Testimonials from './landingPage/Testimonials';
import BlogSection from './landingPage/BlogSection';
import FAQSection from './landingPage/FAQSection';

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

  return (
    <>
      <Hero />
      <OthersFeatures />
      <MuchMore />
      <SimpleAnlytics />
      <EssyCollab />
      <WorkFlow />
      <FavriteApps />
      <Pricing />
      <Testimonials />
      <BlogSection />
      <FAQSection />
    </>
  );
}

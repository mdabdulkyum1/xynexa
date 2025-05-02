'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useUserDataFromClerk } from '@/hooks/useUserDataFromClerk';

const AdminCheck = () => {
  const router = useRouter();
  const { user: mainUser, isLoaded } = useUser();
  const userEmail = mainUser?.emailAddresses[0]?.emailAddress;

  const { userData, isLoading } = useUserDataFromClerk(userEmail);
  const userRole = userData?.user?.role;

  useEffect(() => {
    if (!isLoaded || isLoading || !mainUser) return;

    if (userRole === 'admin') {
      router.push('/admin-dashbaord');
    } else if (userRole === 'member') {
      router.push('/dashboard');
    }
  }, [isLoaded, isLoading, mainUser, userRole, router]);

  if (!isLoaded || isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return null; 
};

export default AdminCheck;

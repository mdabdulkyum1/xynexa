'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { useUserDataFromClerk } from '@/hooks/useUserDataFromClerk';

const AdminCheck = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  const { userData, isLoading } = useUserDataFromClerk(userEmail);
  const userRole = userData?.user?.role;

  useEffect(() => {
    if (status === "loading" || !session) return;

    if (userRole === 'admin') {
      router.push('/admin-dashbaord');
    } else if (userRole === 'member') {
      router.push('/dashboard');
    }
  }, [status, session, userRole, router]);

  if (status === "loading" || isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return null; 
};

export default AdminCheck;

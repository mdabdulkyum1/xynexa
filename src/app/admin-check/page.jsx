"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AdminCheck = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userRole = session?.user?.role;

  useEffect(() => {
    if (status === "loading" || !session) return;

    if (userRole === 'admin') {
      router.push('/admin-dashbaord');
    } else if (userRole === 'member') {
      router.push('/dashboard');
    }
  }, [status, session, userRole, router]);

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return null; 
};

export default AdminCheck;

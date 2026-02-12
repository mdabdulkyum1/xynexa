'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useGetUserByEmailQuery } from "@/redux/features/Api/userApi";
import { XynexaNavbar } from "@/components/global/XynexaNavbar";
import Footer from "@/components/global/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { logout, setUser } from "@/redux/features/Slice/userSlice";
import "./globals.css";
import SocketAuthManager from "@/components/SocketAuthManager/SocketAuthManager";

export default function ContentWithLogic({ children }) {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  const { data: userData, isLoading } = useGetUserByEmailQuery(userEmail, {
    skip: !userEmail,
  });

  const pathname = usePathname();
  const [shouldShowNavbarFooter, setShouldShowNavbarFooter] = useState(true);

  useEffect(() => {
    const hiddenPaths = ["/dashboard", "/admin-dashbaord", "/sign-in", "/sign-up"];
    setShouldShowNavbarFooter(!hiddenPaths.some((p) => pathname.startsWith(p)));
  }, [pathname]);

  useEffect(() => {
    if (userData?.user) {
      dispatch(setUser(userData.user));
    } else if (status === "unauthenticated") {
      dispatch(logout());
    }
  }, [userData?.user, status, dispatch]);

  return (
    <ThemeProvider attribute="class" defaultTheme="light"  enableSystem={true} >
      {shouldShowNavbarFooter && <XynexaNavbar />}
      <main className="min-h-screen">
        <SocketAuthManager />
        <Toaster position="top-right" />
        {children}
      </main>
      {shouldShowNavbarFooter && <Footer />}
    </ThemeProvider>
  );
}

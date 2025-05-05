'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { useUser } from "@clerk/nextjs";
import { useGetUserByEmailQuery } from "@/redux/features/Api/userApi";
import { LoginUserToDB } from "@/lib/loginUserToDB";
import { OfflineUserToDB } from "@/lib/offlineUserToDB";
import { SaveUserToDB } from "@/lib/saveUserToDB";
import { XynexaNavbar } from "@/components/global/XynexaNavbar";
import Footer from "@/components/global/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { logout, setUser } from "@/redux/features/Slice/userSlice";
import "./globals.css";

export default function ContentWithLogic({ children }) {
  const dispatch = useDispatch();
  const { user, isLoaded } = useUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;

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
    } else if (!user && isLoaded) {
      dispatch(logout());
    }
  }, [userData?.user, user, isLoaded, dispatch]);

  return (
    <ThemeProvider attribute="class" defaultTheme="light"  enableSystem={true} >
      {shouldShowNavbarFooter && <XynexaNavbar />}
      <main className="min-h-screen">
        <SaveUserToDB />
        <OfflineUserToDB />
        <LoginUserToDB />
        <Toaster position="top-right" />
        {children}
      </main>
      {shouldShowNavbarFooter && <Footer />}
    </ThemeProvider>
  );
}

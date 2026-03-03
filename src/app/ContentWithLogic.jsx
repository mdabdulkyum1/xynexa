'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import useUserStore from "@/store/useUserStore";
import { XynexaNavbar } from "@/components/global/XynexaNavbar";
import Footer from "@/components/global/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import "./globals.css";
import SocketAuthManager from "@/components/SocketAuthManager/SocketAuthManager";

export default function ContentWithLogic({ children }) {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const { fetchUserByEmail, user: storeUser, isLoading } = useUserStore();

  useEffect(() => {
    if (userEmail) {
      fetchUserByEmail(userEmail);
    }
  }, [userEmail, fetchUserByEmail]);

  const pathname = usePathname();
  const [shouldShowNavbarFooter, setShouldShowNavbarFooter] = useState(true);

  useEffect(() => {
    const hiddenPaths = ["/dashboard", "/admin-dashbaord", "/sign-in", "/sign-up"];
    setShouldShowNavbarFooter(!hiddenPaths.some((p) => pathname.startsWith(p)));
  }, [pathname]);

  useEffect(() => {
    // If we need to handle global logout or state sync, we can do it here with useUserStore
    if (status === "unauthenticated") {
        // useUserStore doesn't strictly have a logout yet, but we can set user to null
        useUserStore.setState({ user: null });
    }
  }, [status]);

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

'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/global/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/global/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { SaveUserToDB } from "@/lib/saveUserToDB";
import Providers from "@/providers/Providers"; 
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";
import { OfflineUserToDB } from "@/lib/offlineUserToDB";
import { LoginUserToDB } from "@/lib/loginUserToDB";

// export const metadata = {
//   title: "XyNexa",
//   description: "Generated by Debug Titans Team",
// };

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  const pathname=usePathname()
  const isDashboard = pathname.startsWith("/dashboard"); 
  const isSignIn = pathname.startsWith("/sign-in"); 
  const isSignUp = pathname.startsWith("/sign-up");
  const shouldShowNavbarFooter = !(isDashboard || isSignIn || isSignUp);
  return (
    <ClerkProvider
    appearance={{
      layout: {
        unsafe_disableDevelopmentModeWarnings: true,
      },
    }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {shouldShowNavbarFooter && <Navbar />}{" "}
            <main className="min-h-screen">
              <SaveUserToDB />
              <OfflineUserToDB />
              <LoginUserToDB />
              <Providers>
              <Toaster  position="top-right" />
                
                {children}</Providers> 
            </main>
            {shouldShowNavbarFooter && <Footer />}{" "}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

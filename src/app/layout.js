"use client";

import Providers from "@/providers/Providers";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import { ClerkProvider } from "@clerk/nextjs";
import ContentWithLogic from "./ContentWithLogic";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <HMSRoomProvider>
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
            <Providers>
              <ContentWithLogic>{children}</ContentWithLogic>
            </Providers>
          </body>
        </html>
      </ClerkProvider>
    </HMSRoomProvider>
  );
}

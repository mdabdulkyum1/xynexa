"use client";

import SessionProviderWrapper from "@/providers/SessionProviderWrapper";


import Providers from "@/providers/Providers";
import { HMSRoomProvider } from "@100mslive/react-sdk";

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
      <SessionProviderWrapper>
        <html lang="en" suppressHydrationWarning>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Providers>
              <ContentWithLogic>{children}</ContentWithLogic>
            </Providers>
          </body>
        </html>
      </SessionProviderWrapper>
    </HMSRoomProvider>
  );
}

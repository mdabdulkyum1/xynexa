import { SignIn } from "@clerk/nextjs";
import Link from "next/link";


import { useUser } from '@clerk/nextjs';
import { useUserDataFromClerk } from '@/hooks/useUserDataFromClerk';
export default function Page() {
  
  return (
    <div
      className="flex justify-center items-center h-screen w-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/login.jpg')",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backgroundBlendMode: "darken",
      }}
    >
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
        <SignIn
          redirectUrl="/"
          signUpUrl="/sign-up"
          appearance={{
            layout: "fullscreen",
            elements: {
              formButtonPrimary:
                "!bg-primary !text-white font-bold !py-2 px-6 rounded-lg !border-none !shadow-md !transition-all !duration-300",
              footer: "!hidden",
              termsPage: "!hidden",
              logoImage:'/login.jpg',

            },
          }}
        />
        <div className="flex gap-2 py-2 justify-center text-center">
          <p className="text-gray-200">Don’t have an account?</p>
          <Link
            href="/sign-up"
            className="font-semibold text-white hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
import { SignUp,ClerkLoading } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {

  return (
    <div
      className="flex   justify-center items-center h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/login-bg.jpg')", backgroundColor: "rgba(0, 0, 0, 0.75)", backgroundBlendMode: "darken" }}
    >
      <div className="bg-gray-200 rounded-xl">
        <SignUp 
          redirectUrl="/dashboard"
          signInUrl="/sign-in"
          appearance={{
            layout: "fullscreen",
            elements: {
              card: "!backdrop-blur-2xl  border border-white/20 shadow-lg rounded-xl p-6", // Standard Glass Effect
              headerTitle: "text-white text-3xl font-semibold", 
              socialButtonsBlockButton: "bg-white/20 hover:bg-white/30 text-white", 
              formFieldInput: "bg-white/10 text-white placeholder-gray-300 border border-white/30 rounded-md px-4 py-2", 
              formButtonPrimary: "!bg-blue-500 !hover:bg-blue-600 !text-white font-bold !py-2 px-6 rounded-lg !border-none !shadow-md 1transition-all !duration-300",
              footer: "!hidden", 
              termsPage: "!hidden", 
            },
          }}
        />
        <div className="flex gap-2 py-2  justify-center text-center">
          <p className="text-gray-700">Already have an account?
          </p><Link href='/sign-in' className="font-semibold text-black">Sign in</Link>
        </div>
      </div>
    </div>
  );
}

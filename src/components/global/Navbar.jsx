"use client";

import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import useScrollDirection from "@/hooks/ScrollDirection/useScrollDirection";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import clsx from "clsx";


import { useUserDataFromClerk } from '@/hooks/useUserDataFromClerk';
import { MdDashboard } from "react-icons/md";
const Navbar = () => {
  const isVisible = useScrollDirection(); 
  const { user } = useUser();

  const pathName = usePathname(); 


  const { user: mainUser, isLoaded } = useUser();
  const userEmail = mainUser?.emailAddresses[0]?.emailAddress;

  const { userData, isLoading } = useUserDataFromClerk(userEmail);
  const userRole = userData?.user?.role;

  

  const activeClass =
    "text-primary dark:text-primary font-semibold underline decoration-2 underline-offset-4";

  const links = (
    <>
      <li>
        <Link
          href="/"
          className={clsx(
            "hover:text-primary dark:hover:text-[#014E4E]",
            pathName === "/" && activeClass
          )}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/about"
          className={clsx(
            "hover:text-primary dark:hover:text-[#014E4E]",
            pathName === "/about" && activeClass
          )}
        >
          About Us
        </Link>
      </li>
      <li>
        <Link
          href="/pricing"
          className={clsx(
            "hover:text-primary dark:hover:text-[#014E4E]",
            pathName === "/pricing" && activeClass
          )}
        >
          Pricing
        </Link>
      </li>
      {/* {user && (
        <li>
          <Link
            href={userRole === "admin" ? "/admin-dashbaord" : "/dashboard"}
            className={clsx(
              "hover:text-primary dark:hover:text-[#014E4E]",
              pathName === "/dashboard" && activeClass
            )}
          >
            Dashboard
          </Link>
        </li>
      )} */}
      <li>
        <Link
          href="/contact-us"
          className={clsx(
            "hover:text-primary dark:hover:text-[#014E4E]",
            pathName === "/contact-us" && activeClass
          )}
        >
          Contact Us
        </Link>
      </li>
      <li>
        <ModeToggle />
      </li>
    </>
  );

  if (!pathName.includes("dashboard")) {
    return (
      <nav
        className={`border-b  dark:border-b-slate-500 fixed top-0 left-0 z-50 w-full transition-transform duration-300 backdrop-blur-md bg-white/30 dark:bg-slate-800/30 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-6 lg:px-12">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold lg:text-2xl">
            XYnexa
          </Link>

          {/* Center-aligned links */}
          <ul className="hidden lg:flex space-x-6 text-lg font-medium">
            {links}
          </ul>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="">
              <div className="flex flex-col justify-between h-full">
                <ul className="flex flex-col p-6 space-y-4 text-lg font-medium">
                  {links}
                </ul>

                <div className="p-6">
                  <SignedOut className="flex gap-4">
                    <Link
                      href="/sign-in"
                      className="dark:text-white inline-block px-4 py-2 rounded-md font-medium text-[#014E4E] bg-transparent transition-all duration-300 hover:bg-[#014E4E] hover:text-white"
                      style={{
                        border: "1px solid transparent",
                        borderImage: "linear-gradient(90deg, #014E4E, #2dd4bf)",
                        borderImageSlice: 1,
                      }}
                    >
                      Sign In
                    </Link>
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Right-aligned buttons */}
          <div className="hidden lg:flex space-x-4">
            <div className="">
              <SignedOut className="flex gap-4">
                <Link
                  href="/sign-in"
                  className="dark:text-white inline-block px-4 py-2 rounded-md font-medium text-[#014E4E] bg-transparent transition-all duration-300 hover:bg-[#014E4E] hover:text-white"
                  style={{
                    border: "1px solid transparent",
                    borderImage: "linear-gradient(90deg, #014E4E, #2dd4bf)",
                    borderImageSlice: 1,
                  }}
                >
                  Sign In
                </Link>
              </SignedOut>
              <SignedIn>
              <UserButton>
                    <UserButton.MenuItems>
                      <UserButton.Link label="Dashboard" href={userRole === "admin" ? "/admin-dashbaord" : "/dashboard"} labelIcon={<MdDashboard size={15} />} />
                      <UserButton.Action label="manageAccount" />
                      <UserButton.Action label="signOut" />
                    </UserButton.MenuItems>
                  </UserButton>
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>
    );
  }
};

export default Navbar;

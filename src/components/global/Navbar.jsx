'use client';

import Link from 'next/link';
import React from 'react';
import { ModeToggle } from './ModeToggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import useScrollDirection from '@/hooks/ScrollDirection/useScrollDirection';
import { usePathname } from 'next/navigation';

const Navbar = () => {

  const isVisible = useScrollDirection(); // Get the visibility status


  const pathName = usePathname(); // Get the current path
  if(!pathName.includes("dashboard")) {
    return (
      <nav className={`border-b  dark:border-b-slate-500 fixed top-0 left-0 z-50 w-full transition-transform duration-300 backdrop-blur-md bg-white/30 dark:bg-slate-800/30 ${
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
            <li><Link href="/" className="hover:text-primary">Tasks</Link></li>
            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
            <li><Link href="/pricing" className="hover:text-primary">Pricing</Link></li>
            <li><Link href="/dashboard" className="hover:text-primary">Dashboard</Link></li>
            <li><Link href="/contact-us" className="hover:text-primary">Contact Us</Link></li>
            <li><ModeToggle /></li>
          </ul>
  
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col space-y-4 pt-6">
              <Link href="/" className="text-lg font-medium hover:text-primary">Tasks</Link>
              <Link href="/about" className="text-lg font-medium hover:text-primary">About Us</Link>
              <Link href="/pricing" className="text-lg font-medium hover:text-primary">Pricing</Link>
              <ModeToggle />
            </SheetContent>
          </Sheet>
  
          {/* Right-aligned buttons */}
          <div className="hidden lg:flex space-x-4">
            <Button variant="outline">Login</Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </nav>
    );
  }
};

export default Navbar;
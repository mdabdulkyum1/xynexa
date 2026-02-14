"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

import Link from "next/link";
import { useState } from "react";
import useScrollDirection from "@/hooks/ScrollDirection/useScrollDirection";
import useUserStore from "@/store/useUserStore";
import { useSession } from "next-auth/react";
import UserMenu from "./UserMenu";

export function XynexaNavbar() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const { user } = useUserStore();
  const userRole = user?.role;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollDirection = useScrollDirection(); 

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Product", link: "/#features" },
    { name: "Pricing", link: "/pricing" },
    { name: "Contact", link: "/contact-us" },
  ];

  if (isAuthenticated) {
     navItems.push({ name: "Dashboard", link: "/dashboard" });
  }

  return (
    <nav className={`w-full fixed top-0 z-50 transition-transform duration-300 ${scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"}`}>
        <div className="w-full mx-auto bg-zinc-50/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
           <Navbar>
             <NavBody>
               <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
                  <div className="flex items-center gap-10">
                     <NavbarLogo />
                     <div className="hidden lg:block">
                        <div className="flex space-x-6">
                           {navItems.map((item, idx) => (
                             <Link key={idx} href={item.link} className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                               {item.name}
                             </Link>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className="hidden lg:flex items-center gap-4">
                      {!isAuthenticated ? (
                       <Link
                         href="/sign-in"
                         className="cursor-pointer dark:text-white inline-block px-4 py-1 font-medium text-[#014E4E] bg-transparent transition-all duration-300 hover:bg-[#014E4E] hover:text-white border border-transparent"
                         style={{
                           borderImage: "linear-gradient(90deg, #014E4E, #2dd4bf)",
                           borderImageSlice: 1,
                         }}
                       >
                         Sign In
                       </Link>
                      ) : (
                         <UserMenu />
                      )}
                  </div>

                   {/* Mobile Toggle */}
                  <div className="lg:hidden">
                    <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                  </div>
               </div>
             </NavBody>
             
             <MobileNav>
               <MobileNavHeader>
                  <NavbarLogo />
                  <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
               </MobileNavHeader>
               <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
                  {navItems.map((item, idx) => (
                      <Link key={`mobile-link-${idx}`} href={item.link} onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-lg font-medium text-gray-800 dark:text-gray-100">
                        {item.name}
                      </Link>
                  ))}
                  <div className="mt-4">
                     {!isAuthenticated ? (
                        <Link href="/sign-in" onClick={() => setIsMobileMenuOpen(false)}
                            className="dark:text-white inline-block px-4 py-2 rounded-md font-medium text-[#014E4E] bg-transparent transition-all duration-300 hover:bg-[#014E4E] hover:text-white"
                            style={{
                              border: "1px solid transparent",
                              borderImage: "linear-gradient(90deg, #014E4E, #2dd4bf)",
                              borderImageSlice: 1,
                            }}
                        >
                            Sign In
                        </Link>
                     ) : (
                        <UserMenu /> 
                     )}
                  </div>
               </MobileNavMenu>
             </MobileNav>
           </Navbar>
        </div>
    </nav>
  );
}

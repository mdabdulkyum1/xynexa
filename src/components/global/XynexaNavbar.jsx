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
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { MdDashboard } from "react-icons/md";
import { useSelector } from "react-redux";

export function XynexaNavbar() {
  

  const pathName = usePathname();

  const user = useSelector((state) => state.user.user);
  const userRole = user?.role;

  const navItems = [
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Pricing",
      link: "/pricing",
    },
    {
      name: "Contact Us",
      link: "/contact-us",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isVisible = useScrollDirection();

  if (!pathName.includes("dashboard")) {
    return (
      <nav
        className={`sticky z-50 top-0 w-full transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-20"
        }`}
      >
        <div className="relative w-full">
          <Navbar>
            {/* Desktop Navigation */}
            <NavBody>
              <NavbarLogo />
              <NavItems items={navItems} />
              <div className="flex items-center gap-4">
                {/* Right-aligned buttons */}
                <div className="hidden lg:flex space-x-4 relative z-10">
                  <div className="">
                    <SignedOut>
                      <Link
                        href="/sign-in"
                        className="cursor-pointer dark:text-white inline-block px-4 py-1 font-medium text-[#014E4E] bg-transparent transition-all duration-300 hover:bg-[#014E4E] hover:text-white border border-transparent"
                        style={{
                          borderImage:
                            "linear-gradient(90deg, #014E4E, #2dd4bf)",
                          borderImageSlice: 1,
                        }}
                      >
                        Sign In
                      </Link>
                    </SignedOut>

                    <SignedIn>
                      <UserButton>
                        <UserButton.MenuItems>
                          <UserButton.Link
                            label="Dashboard"
                            href={
                              userRole === "admin"
                                ? "/admin-dashbaord"
                                : "/dashboard"
                            }
                            labelIcon={<MdDashboard size={15} />}
                          />
                          <UserButton.Action label="manageAccount" />
                          <UserButton.Action label="signOut" />
                        </UserButton.MenuItems>
                      </UserButton>
                    </SignedIn>
                  </div>
                </div>
              </div>
            </NavBody>

            {/* Mobile Navigation */}
            <MobileNav>
              <MobileNavHeader>
                <NavbarLogo />
                <MobileNavToggle
                  isOpen={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
              </MobileNavHeader>

              <MobileNavMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
              >
                {navItems.map((item, idx) => (
                  <a
                    key={`mobile-link-${idx}`}
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="relative text-neutral-600 dark:text-neutral-300"
                  >
                    <span className="block">{item.name}</span>
                  </a>
                ))}
                <div className="flex w-full flex-col gap-4">
                  <SignedOut className="flex gap-4">
                    <Link
                      href="/sign-in"
                      className="dark:text-white inline-block px-4 py-2 rounded-md font-medium text-[#014E4E] bg-transparent transition-all duration-300 hover:bg-[#014E4E] hover:text-white"
                      style={{
                        border: "1px solid transparent",
                        borderImage:
                          "linear-gradient(90deg, #014E4E, #2dd4bf)",
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
              </MobileNavMenu>
            </MobileNav>
          </Navbar>
        </div>
      </nav>
    );
  }
}

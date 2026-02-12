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
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import UserMenu from "./UserMenu";

export function XynexaNavbar() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const user = useSelector((state) => state.user.user);
  const userRole = user?.role;
  // ... imports and code

  // ... inside render
                  {/* Right-aligned buttons */}
                <div className="hidden lg:flex space-x-4 relative z-10">
                  <div className="">
                    {!isAuthenticated ? (
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
                    ) : (
                      <UserMenu />
                    )}
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
                  {!isAuthenticated ? (
                    <div className="flex gap-4">
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
                    </div>
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
}

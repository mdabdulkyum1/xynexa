"use client";

import React from "react";
import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles, Home } from "lucide-react";


import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useEffect } from "react";
import useUserStore from '@/store/useUserStore';
import { useSession, signOut } from "next-auth/react";

export function NavUser({ user }) {
  const { isMobile } = useSidebar();
  
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
      
  const { user: storeUser, fetchUserByEmail } = useUserStore();
  
  useEffect(() => {
    if (userEmail && !storeUser) {
      console.log("NavUser: Fetching user data for", userEmail);
      fetchUserByEmail(userEmail);
    }
  }, [userEmail, storeUser, fetchUserByEmail]);

  const creator = storeUser || user; // Fallback to prop if store is null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={creator?.imageUrl || creator?.image} alt={creator?.firstName || creator?.name} />
                <AvatarFallback className="rounded-lg">
                  {creator?.firstName?.[0] || creator?.name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{creator?.firstName || creator?.name || "User"}</span>
                <span className="truncate text-xs">{creator?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{creator?.firstName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Home />
                <Link href="/">Home</Link>
              </DropdownMenuItem>
              
              
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              <button onClick={() => signOut()}  className="px-4 py-2  rounded cursor-pointer">
               Logout
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

"use client";

import React from "react";
import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles, Home } from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";

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
import { useGetUserByEmailQuery } from '@/redux/features/Api/userApi';
export function NavUser({ user }) {
  const { isMobile } = useSidebar();
  const { signOut } = useClerk();

  const { user:mainUser } = useUser();
  
      const userEmail = mainUser?.emailAddresses[0]?.emailAddress;
      
      const {data:userData}=useGetUserByEmailQuery(userEmail)
      const creator=userData?.user
      

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={creator?.imageUrl} alt={creator?.firstName} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{creator?.firstName}</span>
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

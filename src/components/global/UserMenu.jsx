"use client";

import { useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { LogOut, User, CheckCircle2, ChevronDown } from "lucide-react";
import useUserStore from '@/store/useUserStore';

export default function UserMenu() {
  const { data: session } = useSession();
  const { user: storeUser, fetchUserByEmail } = useUserStore();
  const userEmail = session?.user?.email;

  useEffect(() => {
    if (userEmail) {
      fetchUserByEmail(userEmail);
    }
  }, [userEmail, fetchUserByEmail]);


  const user = { ...session?.user, ...storeUser };

  if (!user?.email) return null;

  const isVerified = user.isEmailVerified || user.emailVerifiedAt;
  const userRole = user.role;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 outline-none group border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
          <Avatar className="h-8 w-8 transition-transform group-hover:scale-105">
            <AvatarImage src={user.imageUrl || user.image} alt={user.firstName || user.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
              {(user.firstName || user.name || "U")?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-200" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-medium leading-none">{user.firstName || user.name}</p>
              {isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500/10" />}
            </div>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={userRole === "admin" ? "/admin-dashboard" : "/dashboard"} className="flex items-center cursor-pointer">
            <MdDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
           <Link href="/profile" className="flex items-center cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-red-600 focus:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

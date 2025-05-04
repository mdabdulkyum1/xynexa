"use client"

import React, { useState } from "react";
import { ChevronsUpDown, Plus } from "lucide-react";
import Image from 'next/image'; 

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";




export function TeamSwitcher({ teams }) {
    const { isMobile } = useSidebar();
    const [activeTeam, setActiveTeam] = useState(teams[0]);

    if (!activeTeam) {
        return null;
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <Link href="/">
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent cursor-pointer data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Image
                                src='/logo-dark.png'
                                alt="Logo"
                                width={30} 
                                height={30} 
                            />
                            <div className="grid flex-1 text-left text-xl leading-tight">
                                <span className="truncate font-semibold">
                                    {activeTeam.name}
                                </span>
                                <span className="truncate text-xs">{activeTeam.plan}</span>
                            </div>
                            {isMobile && <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />}
                        </SidebarMenuButton>
                    </Link>
                    {!isMobile && (
                        <DropdownMenuContent className="w-60" align="start">
                            <DropdownMenuLabel>Switch Team</DropdownMenuLabel>
                            {teams.map((team) => (
                                <DropdownMenuItem
                                    key={team.id}
                                    onClick={() => setActiveTeam(team)}
                                    className={team.id === activeTeam.id ? "font-semibold" : undefined}
                                >
                                    <Link href="/">
                                        {team.name}
                                        {team.id === activeTeam.id && (
                                            <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
                                        )}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Plus className="mr-2 h-4 w-4" /> Create Team
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    )}
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
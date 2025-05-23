"use client"

import * as React from "react"
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
  MessageSquareIcon,
  BotIcon,
  DollarSignIcon
} from "lucide-react"





import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,

} from "@/components/ui/sidebar"
import { NavDocuments } from "./nav-document"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "@/app/dashboard/component/Dashboard/nav-user"

const data = {
  user: {
    name: "Harun",
    email: "harun@gmail.com",
    avatar: "/logo-xynexa.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin-dashbaord",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Users",
      url: "/admin-dashbaord/users",
      icon: UsersIcon,
    },
    {
      title: "Teams",
      url: "/admin-dashbaord/teams",
      icon: FolderIcon,
    },
    {
      title: "Tasks",
      url: "/admin-dashbaord/tasks",
      icon: ClipboardListIcon,
    },
    
    {
      title: "Billing",
      url: "/admin-dashbaord/billings",
      icon: DollarSignIcon,
    },
    
    {
      title: "Feedback",
      url: "/admin-dashbaord/feedback",
      icon: MessageSquareIcon,
    },
    {
      title: "Support",
      url: "/admin-dashbaord/support",
      icon: HelpCircleIcon,
      items: [
        {title: "support", url: "/admin-dashbaord/support"}
      ]
    },
    {
      title: "Settings",
      url: "/admin-dashbaord",
      icon: SettingsIcon,
    },
  ],
 
  navSecondary: [
    
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "Search",
      url: "#",
      icon: SearchIcon,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: DatabaseIcon,
    },
    {
      name: "Reports",
      url: "#",
      icon: ClipboardListIcon,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: FileIcon,
    },
  ],
}

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      
      <SidebarContent>
        <NavMain items={data.navMain} />
        
        
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

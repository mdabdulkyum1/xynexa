"use client"

import React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  GalleryVerticalEndIcon,
  HelpCircle,
  Home,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";




import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-project";
import { TeamSwitcher } from "./team-switcheer";
import { NavUser } from "./nav-user";

// This is sample data.
const data = {
  user: {
    name: "harun",
    email: "harun@.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "XyNexa",
      logo: GalleryVerticalEndIcon,
      plan: "Team collaboration",
    },
   
  ],
 navMain :[
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: SquareTerminal,
    isActive: true,
    items: [
      { title: "OverView", url: "/dashboard" },
      { title: "Activity", url: "/dashboard/activity" },
      { title: "Deadlines", url: "/dashboard/deadlines" },
      { title: "Progress", url: "/dashboard/progress" },
    ],
  },
  {
    title: "Team",
    url: "/dashboard/team",
    icon: Command,
    items: [
      { title: "View All team", url: "/dashboard/team/view" },
      { title: "Create", url: "/dashboard/team/create" },
      { title: "Invite", url: "/dashboard/team/invite" },
      { title: "Roles", url: "/dashboard/team/roles" },
      
    ],
  },
  {
    title: "Chat",
    url: "/dashboard/chat",
    icon: AudioWaveform,
    items: [
      { title: "Messages", url: "/dashboard/chat" },
      
    ],
  },
  {
    title: "Tasks",
    url: "/dashboard/tasks",
    icon: Frame,
    items: [
      { title: "All Task", url: "/dashboard/tasks" },
      { title: "Kanban", url: "/dashboard/tasks/kanban" },
      { title: "Assign", url: "/dashboard/tasks/assign" },
      { title: "Tracking", url: "/dashboard/tasks/tracking" },
    ],
  },
  {
    title: "Files",
    url: "/dashboard/files",
    icon: GalleryVerticalEnd,
    items: [
      { title: "Share File", url: "/dashboard/files" },
      { title: "Upload", url: "/dashboard/files/upload" },
      { title: "Cloud Sync", url: "/dashboard/files/sync" },
    ],
  },
  {
    title: "Meetings",
    url: "/dashboard/meetings",
    icon: Map,
    items: [
      { title: "Calendar", url: "/dashboard/meetings/calendar" },
      { title: "Schedule", url: "/dashboard/meetings/schedule" },
      { title: "Reminders", url: "/dashboard/meetings/reminders" },
    ],
  },
  {
    title: "Alerts",
    url: "/dashboard/alerts",
    icon: Settings2,
    items: [
      { title: "Notifications", url: "/dashboard/alerts/notifications" },
      { title: "Emails", url: "/dashboard/alerts/emails" },
    ],
  },
  {
    title: "Member",
    url: "/dashboard/users",
    icon: Bot,
    items: [
      { title: "Team Member", url: "/dashboard/users" },
      { title: "Roles", url: "/dashboard/users/roles" },
      { title: "Profile", url: "/dashboard/users/profile" },
      { title: "Invites", url: "/dashboard/users/invites" },
    ],
  },
  {
    title: "Tools",
    url: "/dashboard/documents",
    icon: Bot,
    items: [
      { title: "documents", url: "/dashboard/documents" },
      { title: "drawing", url: "/dashboard/users/drawing" },
    ],
  },
],
projects: [
  {
    name: "Help & Support ",
    url: "#",
    icon:HelpCircle,
  },
  
],
};

export function AppSidebar(props) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

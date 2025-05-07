"use client";

import React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Calendar,
  Command,
  File,
  Frame,
  GalleryVerticalEnd,
  GalleryVerticalEndIcon,
  HelpCircle,
  Home,
  Map,
  MessageSquare,
  PieChart,
  Settings2,
  SquareTerminal,
  Users,
  Wrench,
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
import { useUserDataFromClerk } from "@/hooks/useUserDataFromClerk";
import { useGetTeamsByCurrentUserEmailQuery } from "@/redux/features/Api/teamApi";
import { useUser } from "@clerk/nextjs";

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
      { title: "Teams", url: "/dashboard/team/view" },
      { title: "All Tasks", url: "/dashboard/tasks" },
      
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
  const { user } = useUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;

  const { data: items } = useGetTeamsByCurrentUserEmailQuery(userEmail);

  const data = {
    user: {
      name: user?.fullName || "Guest",
      email: user?.emailAddresses[0]?.emailAddress || "No email",
      avatar: user?.imageUrl || "/default-avatar.png",
    },
    teams: [
      {
        name: "XyNexa",
        logo: GalleryVerticalEndIcon,
        plan: "Team collaboration",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: SquareTerminal, 
        isActive: true,
        items: [
          { title: "OverView", url: "/dashboard" },
          { title: "Teams", url: "/dashboard/team/view" },
          { title: "All Tasks", url: "/dashboard/tasks" },
        ],
      },
      {
        title: "Your Board",
        url: "/dashboard/team",
        isActive: true,
        icon: Command, 
        items,
      },
      {
        title: "Chat",
        url: "/dashboard/chat",
        icon: MessageSquare, // Standard Chat/Message Icon
        items: [{ title: "Messages", url: "/dashboard/chat" }],
      },
      // {
      //   title: "Tasks",
      //   url: "/dashboard/tasks",
      //   icon: Frame,
      //   items: [
      //     { title: "All Task", url: "/dashboard/tasks" },
      //     { title: "Kanban", url: "/dashboard/tasks/kanban" },
      //     { title: "Assign", url: "/dashboard/tasks/assign" },
      //     { title: "Tracking", url: "/dashboard/tasks/tracking" },
      //   ],
      // },
      // {
      //   title: "Files",
      //   url: "/dashboard/files",
      //   icon: File, // Standard File Icon
      //   items: [
      //     // { title: "Share File", url: "/dashboard/files" },
      //     { title: "Upload", url: "/dashboard/files/upload" },
      //     { title: "Share File", url: "/dashboard/files" },
      //     // { title: "Upload", url: "/dashboard/files/upload" },
      //     // { title: "Cloud Sync", url: "/dashboard/files/sync" },
      //   ],
      // },
      {
        title: "Meetings",
        url: "/dashboard/meetings",
        icon: Calendar, // Standard Calendar/Meeting Icon
        items: [
          { title: "Calendar", url: "/dashboard/meetings/calendar" },
          // { title: "Schedule", url: "/dashboard/meetings/schedule" },
          // { title: "Reminders", url: "/dashboard/meetings/reminders" },
          { title: "Team Meet", url: "/dashboard/meetings/meet" },
        ],
      },
      // {
      //   title: "Alerts",
      //   url: "/dashboard/alerts",
      //   icon: Settings2, // Standard Settings/Alerts Icon
      //   items: [
      //     { title: "Notifications", url: "/dashboard/alerts/notifications" },
      //   ],
      // },
      // {
      //   title: "Member",
      //   url: "/dashboard/users",
      //   icon: Users, // Standard Users/Members Icon
      //   items: [
      //     { title: "Team Member", url: "/dashboard/users" },
      //     { title: "Roles", url: "/dashboard/users/roles" },
      //     { title: "Profile", url: "/dashboard/users/profile" },
      //     { title: "Invites", url: "/dashboard/users/invites" },
      //   ],
      // },
      {
        title: "Tools",
        url: "/dashboard/tools",
        icon: Wrench, // Standard Tools Icon
        items: [
          { title: "documents", url: "/dashboard/documents" },
          { title: "drawing", url: "/dashboard/tools/drawing" },
          { title: "diagram", url: "/dashboard/tools/diagram" },
        ],
      },
    ],
    projects: [
      {
        name: "AI Support ",
        url: "/dashboard/help/ai-board",
        icon: HelpCircle, // Standard Help Icon
      },
    ],
  };

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
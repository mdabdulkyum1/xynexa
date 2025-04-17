"use client";

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
import { useUserDataFromClerk } from "@/hooks/useUserDataFromClerk";
import { useGetTeamsByCurrentUserEmailQuery } from "@/redux/features/Api/teamApi";
import { useUser } from "@clerk/nextjs";

// This is sample data.

export function AppSidebar(props) {
  const { user } = useUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;

  const { data:items } = useGetTeamsByCurrentUserEmailQuery(userEmail);

  
  
  
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
        icon: Command,
        items
      },
      {
        title: "Chat",
        url: "/dashboard/chat",
        icon: AudioWaveform,
        items: [{ title: "Messages", url: "/dashboard/chat" }],
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
          // { title: "Share File", url: "/dashboard/files" },
          { title: "Upload", url: "/dashboard/files/upload" },
          // { title: "Cloud Sync", url: "/dashboard/files/sync" },
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
          { title: "Team Meet", url: "/dashboard/meetings/meet" },
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
        url: "/dashboard/tools",
        icon: Bot,
        items: [
          { title: "documents", url: "/dashboard/tools/documents" },
          { title: "drawing", url: "/dashboard/tools/drawing" },
        ],
      },
    ],
    projects: [
      {
        name: "Help & Support ",
        url: "#",
        icon: HelpCircle,
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

"use client";

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  FrameIcon,
  LayoutGridIcon,
  Settings2,
  SquareTerminal,
  StoreIcon,
  HandCoins,
  TreeDeciduous,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavPrimary } from "./nav-primary";

// This is sample data.
const data = {
  user: {
    name: "arghya",
    email: "m@example.com",
    avatar: "https://github.com/uiuxarghya.png",
  },
  teams: [
    {
      name: "EcoMint Inc",
      logo: TreeDeciduous,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navPrimary: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutGridIcon,
    },

    {
      name: "Marketplace",
      url: "/marketplace",
      icon: StoreIcon,
    },
    {
      name: "Transactions",
      url: "/transactions",
      icon: FrameIcon,
    },
    {
      name: "Donate",
      url: "/explore",
      icon: HandCoins,
    },
  ],
  navMain: [
    {
      title: "NFT",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Owned",
          url: "/owned-nft",
        },
        {
          title: "Mint",
          url: "/create-nft",
        },
      ],
    },

    {
      title: "Chatbot",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "EcoMintX",
          url: "/ai-bot",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "/guide",
        },
        {
          title: "Get Started",
          url: "/guide",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavPrimary projects={data.navPrimary} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}

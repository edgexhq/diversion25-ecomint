"use client";

import { AppSidebar } from "@/components/app-sidebar";
import ThemeToggleBtn from "@/components/ThemeToggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { darkTheme } from "thirdweb/react";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { client } from "@/lib/client";
import { ConnectButton } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { defineChain } from "thirdweb";
import { chainId } from "@/lib/constants";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "facebook"],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("app.phantom"),
  createWallet("com.binance"),
];

const pathNames = [
  { name: "", url: "/dashboard" },
  { name: "Marketplace", url: "/marketplace" },
  { name: "Transactions", url: "/transactions" },
  { name: "Donate", url: "/explore" },
  { name: "Leaderboard", url: "/leaderboard" },
  { name: "EcoMintX", url: "/ai-bot" },
  { name: "NFT", url: "/owned-nft" },
  { name: "Mint", url: "/create-nft" },
  { name: "Introduction", url: "/guide" },
  { name: "Get Started", url: "/guide" },
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useTheme();
  const pathname = usePathname();
  return (
    <SidebarProvider suppressHydrationWarning>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sticky top-0 z-50 bg-background/50 shadow backdrop-blur-md">
          <div className="flex w-full items-center justify-between gap-2 px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {pathNames.find((path) => path.url === pathname)?.name}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-2">
              <ConnectButton
                client={client}
                wallets={wallets}
                theme={
                  theme === "dark"
                    ? darkTheme({
                        colors: {
                          accentText: "hsl(158.1 ,64.4% ,50%)",
                          accentButtonBg: "hsl(118, 100%, 63%)",
                          primaryButtonBg: "hsl(158.1 ,64.4%, 50%)",
                          accentButtonText: "hsl(0, 0%, 0%)",
                        },
                      })
                    : "light"
                }
                connectModal={{
                  size: "wide",
                  title: "Register to EcoMint",
                  showThirdwebBranding: false,
                }}
                chain={defineChain(chainId)}
              />
              <ThemeToggleBtn />
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex-1">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

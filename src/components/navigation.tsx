"use client";
import ThemeToggleBtn from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/client";
import Link from "next/link";
import { ConnectButton, darkTheme } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import Logo from "./logo";
import { defineChain } from "thirdweb";
import { chainId } from "@/lib/constants";
import { useTheme } from "next-themes";

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

export function Navigation() {
  const { theme } = useTheme();
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between backdrop-blur-xl border-b border-background/10 fixed top-0 left-0 z-50 bg-background/30">
      <div className="flex items-center gap-2">
        <Link href="#">
          <Logo className="h-8" />
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <Link href="/guide" className="hover:underline">
          Guide
        </Link>
        <Link href="#features" className="hover:underline">
          Features
        </Link>
        <Link href="/gallery" className="hover:underline">
          Gallery
        </Link>
        <Link href="#" className="hover:underline">
          Impact
        </Link>
        <Link href="/market" className="hover:underline">
          Marketplace
        </Link>
      </div>

      <div className="flex items-center gap-4">
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
        <Button
          onClick={() => {
            window.location.href = "/create-nft";
          }}
        >
          Start Creating
        </Button>
        <ThemeToggleBtn />
      </div>
    </nav>
  );
}

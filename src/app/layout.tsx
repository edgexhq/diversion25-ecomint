import { ThemeProvider } from "@/components/theme-provider";
import ToasterwithTheme from "@/components/ui/ToasterwithTheme";
import { inter, sora } from "@/lib/font";
import type { Metadata } from "next";
import { ThirdwebProvider } from "thirdweb/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "EcoMint",
  description:
    "EcoMint is a decentralized platform for minting and trading NFTs and contributing towards the environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.className} ${inter.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <ThirdwebProvider>{children}</ThirdwebProvider>
          <ToasterwithTheme />
        </ThemeProvider>
      </body>
    </html>
  );
}

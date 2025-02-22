"use client";

import Banner from "@/components/banner";
import { client } from "@/lib/client";
import { chainId } from "@/lib/constants";
import { Loader } from "lucide-react";
import { defineChain } from "thirdweb";
import { useActiveAccount, useWalletBalance } from "thirdweb/react";

export default function DashboardPage() {
  const account = useActiveAccount();

  const { data } = useWalletBalance({
    chain: defineChain(chainId),
    address: account?.address || "",
    client,
  });

  if (!account || !data) {
    return (
      <div>
        <Loader className="animate-spin h-12 w-12 text-primary" />
      </div>
    );
  }

  return (
    <div>
      <Banner
        address={account.address}
        balance={data.displayValue}
        name={data.name}
        symbol={data.symbol}
      />
    </div>
  );
}

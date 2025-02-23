"use client";
import { Loader, Sparkles, TreePalm, TreePine, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { useEffect, useState } from "react";
import { getAccountFromAddress } from "@/actions/form";
import { defineChain } from "thirdweb";
import { client } from "@/lib/client";
import { chainId } from "@/lib/constants";

const TreeBanner = () => {
  const [name, setName] = useState<string | undefined>("");
  const accnt = useActiveAccount();
  const address = accnt?.address;

  const { data } = useWalletBalance({
    chain: defineChain(chainId),
    address: accnt?.address || "",
    client: client,
  });

  useEffect(() => {
    if (!address) return;
    const fetchData = async () => {
      const accntData = await getAccountFromAddress(address);
      console.log({ accntData });
      if (accntData && accntData.success) {
        setName(accntData?.data?.name);
      }
    };
    fetchData();
  }, [address]);

  if (!accnt || !data) {
    return (
      <div>
        <Loader className="animate-spin h-12 w-12 text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full grid md:grid-cols-5 gap-4 mt-4 mb-8">
      <div className="relative h-full col-span-3 overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 to-muted/10 border border-primary/10">
        <div className="absolute right-0 top-2 w-52 opacity-10">
          <TreePine className="h-full w-full text-primary" />
        </div>
        <div className="relative p-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-sm text-primary mb-6">
            <TreePalm className="h-4 w-4" />
            <span>Tree Plantation Dashboard</span>
          </div>
          <div className="ml-4 inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-sm text-primary mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Conserve Nature</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Welcome,
            <span className="bg-gradient-to-r from-primary to-emerald-600/70 bg-clip-text text-transparent ml-2">
              {name}
            </span>
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button className="rounded-full px-6">More Stats</Button>
          </div>
        </div>
      </div>
      <Card className="col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Your Balance</CardTitle>
            <div className="rounded-full bg-primary/10 p-2">
              <Wallet className="h-4 w-4 text-primary" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="text-4xl font-bold mb-2">
                {data.displayValue.slice(0, 6)} {data.symbol}
              </div>
            </div>
            <Badge className="rounded-full">Polygon Network</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TreeBanner;

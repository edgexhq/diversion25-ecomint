import { Sparkles, TreePalm, TreePine, Wallet } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

export default function Banner({
  address,
  balance,
  name,
  symbol,
}: {
  address: string;
  balance: string;
  name: string;
  symbol: string;
}) {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-4 mt-4">
      <div className="relative h-full flex-[2] overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-300/20 dark:from-emerald-900/20 to-primary/10 dark:to-emerald-800/10 border border-primary/10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
        <div className="absolute right-0 top-0 w-[200px] h-fit opacity-10">
          <TreePine className="h-full w-full text-primary" />
        </div>
        <div className="relative p-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-emerald-400 mb-6">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered NFT Platform</span>
          </div>
          <div className="ml-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-emerald-400 mb-6">
            <TreePalm className="h-4 w-4" />
            <span>Conserve Nature</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Welcome,
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent ml-1">
              {address.slice(0, 8)}...
            </span>
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button className="rounded-full px-6">Create NFT</Button>
            <Button variant="outline" className="rounded-full px-6">
              Explore Market
            </Button>
          </div>
        </div>
      </div>
      <Card className="h-full">
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
                {balance.slice(0, 6)} {symbol}
              </div>
            </div>
            <Badge className="rounded-full">{name}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { fetchLeaderboard } from "@/actions/leaderboard";
import Link from "next/link";

const shortenAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getLeaderboard() {
      const data = await fetchLeaderboard();
      setLeaderboard(data ?? []);
      setLoading(false);
    }
    getLeaderboard();
  }, []);

  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold text-center mb-4">
        🌿 Tree Plantation Donor Leaderboard
      </h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="border rounded-lg shadow-md max-w-5xl mx-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableCell className="text-center">Rank</TableCell>
                <TableCell>Wallet</TableCell>
                <TableCell className="text-right">Amount Donated</TableCell>
                <TableCell className="text-center">Tier</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell className="text-center font-semibold">
                    {user.rank}
                  </TableCell>
                  <TableCell className="flex items-center gap-1">
                    <Link
                      href={`https://amoy.polygonscan.com/address/${user.wallet}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      {shortenAddress(user.wallet)}
                    </Link>
                    <Copy
                      className="w-4 h-4 cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(user.wallet);
                        toast.success("Copied to clipboard");
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${user.amountDonated}
                  </TableCell>
                  <TableCell className="text-center">{user.tier}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

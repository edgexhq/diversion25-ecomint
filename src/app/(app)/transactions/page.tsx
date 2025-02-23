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
import { useActiveAccount } from "thirdweb/react";

const getTransactionType = (method: string) => {
  if (method.includes("buyFromListing")) return "Buy From Listing";
  if (method.includes("createListing")) return "Create Listing";
  return "Transfer";
};

const shortenAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

// Calculate the age of the transaction in hours and minutes ago from the current time in local timezone if not the same day as the transaction then it will display the days ago
const calculateAge = (timestamp: string) => {
  const date = new Date(Number(timestamp) * 1000);
  const currentDate = new Date();
  const diff = currentDate.getTime() - date.getTime();
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} days ago`;
  } else if (hours > 0) {
    if (hours === 1) {
      return `${hours} hour ago`;
    }
    return `${hours} hours ago`;
  } else {
    return `${minutes} minutes ago`;
  }
};

const TransactionsTable = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-2">Latest Transactions</h2>
      <Table className="text-xs w-full">
        <TableHeader>
          <TableRow>
            <TableCell>Transaction Hash</TableCell>
            <TableCell>Method</TableCell>
            <TableCell>Block</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Txn Fee</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.hash}>
              <TableCell className="flex items-center gap-1">
                <a
                  href={`https://amoy.polygonscan.com/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {shortenAddress(tx.hash)}
                </a>
                <Copy
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(tx.hash);
                    toast.success("Copied to clipboard");
                  }}
                />
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    getTransactionType(tx.functionName) === "Buy From Listing"
                      ? "default"
                      : getTransactionType(tx.functionName) === "Create Listing"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {getTransactionType(tx.functionName)}
                </Badge>
              </TableCell>
              <TableCell>{tx.blockNumber}</TableCell>
              <TableCell>
                {calculateAge(tx.timeStamp)} <br />
              </TableCell>
              <TableCell>{shortenAddress(tx.from)}</TableCell>
              <TableCell>
                {tx.to ? shortenAddress(tx.to) : "Contract Creation"}
              </TableCell>
              <TableCell className="flex items-center gap-0.5">
                <img
                  className="me-0.5 w-4 h-4 inline-block"
                  src="https://amoy.polygonscan.com/assets/poly/images/svg/logos/token-light.svg"
                  alt="Polygon PoS Chain Amoy Logo"
                />
                {(Number(tx.value) / 1e18).toFixed(6)} POL
              </TableCell>
              <TableCell>
                {((Number(tx.gasUsed) * Number(tx.gasPrice)) / 1e18).toFixed(6)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default function TransactionsPage() {
  const [transactionHistory, setTransactionHistory] = useState<
    Transaction[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const account = useActiveAccount();
  const walletAddress = account?.address;

  useEffect(() => {
    async function fetchTransactionHistory() {
      if (!walletAddress) return;
      const url = `https://api-amoy.polygonscan.com/api?module=account&action=txlist&address=${walletAddress}&page=1&offset=100&sort=desc&apikey=${process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "1") {
          const formattedTransactions = data.result.map((tx: any) => ({
            hash: tx.hash,
            functionName: tx.functionName || "Transfer",
            blockNumber: tx.blockNumber,
            timeStamp: tx.timeStamp,
            from: tx.from,
            to: tx.to,
            value: tx.value,
            gasUsed: tx.gasUsed,
            gasPrice: tx.gasPrice,
          }));

          setTransactionHistory(formattedTransactions);
        } else {
          setError("Failed to fetch transactions.");
        }
      } catch (error) {
        setError((error as any).message);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactionHistory();
  }, [walletAddress]);

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {transactionHistory && (
        <TransactionsTable transactions={transactionHistory} />
      )}
    </div>
  );
}

interface Transaction {
  hash: string;
  functionName: string;
  blockNumber: string;
  timeStamp: string;
  from: string;
  to: string;
  value: string;
  gasUsed: string;
  gasPrice: string;
}

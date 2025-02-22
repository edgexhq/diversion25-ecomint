/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Transaction {
  hash: string;
  block_number: number;
  from: string;
  to: string;
  value: string;
  gas: string;
  gas_price: string;
  block_timestamp: number;
  transaction_type: string;
  nonce: string;
  block_hash: string;
  transaction_index: string;
  is_error: string;
  txreceipt_status: string;
  input: string;
  contract_address: string;
  cumulative_gas_used: string;
  gas_used: string;
  confirmations: string;
  method_id: string;
  function_name: string;
}

const TransactionsTable = ({ transactions }: { transactions: { data: Transaction[] } }) => {
  return (
    <div className="overflow-x-auto w-full max-w-6xl mx-auto p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Hash</TableHead>
            <TableHead>Block No</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Gas</TableHead>
            <TableHead>Gas Price</TableHead>
            <TableHead>Nonce</TableHead>
            <TableHead>Block Hash</TableHead>
            <TableHead>Tx Index</TableHead>
            <TableHead>Error</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Confirmations</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Function</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions?.data?.map((tx, index) => (
            <TableRow key={index}>
              <TableCell className="truncate max-w-xs">{tx.hash}</TableCell>
              <TableCell>{tx.block_number}</TableCell>
              <TableCell className="truncate max-w-xs">{tx.from}</TableCell>
              <TableCell className="truncate max-w-xs">{tx.to}</TableCell>
              <TableCell>{tx.value}</TableCell>
              <TableCell>{tx.gas}</TableCell>
              <TableCell>{tx.gas_price}</TableCell>
              <TableCell>{tx.nonce}</TableCell>
              <TableCell className="truncate max-w-xs">{tx.block_hash}</TableCell>
              <TableCell>{tx.transaction_index}</TableCell>
              <TableCell>{tx.is_error}</TableCell>
              <TableCell>{tx.txreceipt_status}</TableCell>
              <TableCell>{tx.confirmations}</TableCell>
              <TableCell>{tx.method_id}</TableCell>
              <TableCell>{tx.function_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default function TransactionsPage() {
  const [transactionHistory, setTransactionHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
            block_number: tx.blockNumber,
            from: tx.from,
            to: tx.to,
            value: (Number(tx.value) / 10 ** 18).toFixed(6) + " ETH",
            gas: tx.gas,
            gas_price: tx.gasPrice,
            block_timestamp: Number(tx.timeStamp),
            transaction_type: tx.functionName || "Transfer",
            nonce: tx.nonce,
            block_hash: tx.blockHash,
            transaction_index: tx.transactionIndex,
            is_error: tx.isError,
            txreceipt_status: tx.txreceipt_status,
            input: tx.input,
            contract_address: tx.contractAddress,
            cumulative_gas_used: tx.cumulativeGasUsed,
            gas_used: tx.gasUsed,
            confirmations: tx.confirmations,
            method_id: tx.methodId,
            function_name: tx.functionName
          }));

          setTransactionHistory({ data: formattedTransactions });
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
      {transactionHistory && <TransactionsTable transactions={transactionHistory} />}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { useActiveAccount } from "thirdweb/react";
import { getTransactionsOfOrg } from "@/actions/transactions";
import { Transactions } from "@prisma/client";

export interface FormDataType {
  transaction: {
    amount: string;
    transactionAddress: string;
    userWalletAddress: string;
    orgId: string;
    name: string;
    email: string;
    id: string; // Add ID field
  };
  tree: {
    name: string;
    species: string;
    latitude: string;
    longitude: string;
    plantedAt: Date;
    carbonOffset: number;
    imgUrl: string;
    userWalletAddress: string;
  };
}

export function TransactionsStep({
  formData,
  setFormData,
}: {
  formData: FormDataType;
  setFormData: (data: FormDataType) => void;
}) {
  const accnt = useActiveAccount();
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<string>("");

  useEffect(() => {
    if (!accnt) {
      return;
    }
    async function fetchTransactions() {
      console.log("Fetching transactions for wallet:", accnt!.address);
      const transaction = await getTransactionsOfOrg(accnt!.address);
      console.log("Fetched transactions:", transaction);
      setTransactions(transaction);
    }
    fetchTransactions();
  }, [accnt]);

  const handleTransactionSelect = (transactionId: string) => {
    setSelectedTransaction(transactionId);
    const selected = transactions.find((t) => t.id === transactionId);
    if (selected) {
      setFormData({
        ...formData,
        transaction: {
          amount: selected.amount.toString(),
          transactionAddress: selected.transactionAddress,
          userWalletAddress: selected.userWalletAddress,
          orgId: selected.orgId,
          name: selected.name,
          email: selected.email,
          id: selected.id,
        },
        tree: {
          ...formData.tree,
          name: selected.name || "",
          userWalletAddress: selected.userWalletAddress || "",
        },
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Select a Transaction</h2>
      <RadioGroup
        value={selectedTransaction}
        onValueChange={handleTransactionSelect}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {transactions.map((transaction: Transactions) => (
            <Card
              key={transaction.id}
              className={`relative cursor-pointer transition-all ${
                selectedTransaction === transaction.id
                  ? "border-primary bg-gradient-to-br from-primary/15 to-primary/5"
                  : "hover:border-primary/50"
              }`}
              onClick={() => handleTransactionSelect(transaction.id)}
            >
              <CardContent className="p-4">
                <RadioGroupItem
                  value={transaction.id}
                  id={transaction.id}
                  className="sr-only"
                />
                <Label
                  htmlFor={transaction.id}
                  className="flex flex-col space-y-1"
                >
                  <span className="text-lg font-semibold">
                    ${transaction.amount}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {transaction.date.toLocaleDateString()}
                  </span>
                  <span className="text-sm truncate break-all">
                    {transaction.transactionAddress}
                  </span>
                  <span className="text-sm truncate break-all">
                    {transaction.userWalletAddress}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      transaction.status === "PLANTED"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </Label>
                {selectedTransaction === transaction.id && (
                  <div className="absolute top-2 right-2 text-primary">
                    <Check size={30} />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}

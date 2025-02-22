"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { useActiveAccount } from "thirdweb/react";
import { toast } from "sonner";
import {
  defineChain,
  prepareTransaction,
  sendTransaction,
  toEther,
} from "thirdweb";
import { chainId } from "@/lib/constants";
import { client } from "@/lib/client";
import { createTransaction } from "@/actions/transactions";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Loader } from "lucide-react";

interface OrgProps {
  id: string;
  name: string;
  image?: string | null;
  govId: string;
  address: string;
  wallet: string;
  plantingArea: string;
}

export default function OrgCard({ org }: { org: OrgProps }) {
  const [open, setOpen] = useState(false);
  const account = useActiveAccount();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [price, setPrice] = useState<string>("0");
  const [loading, setLoading] = useState(false);

  if (!account) {
    toast.error("Please connect your wallet to donate");
    return;
  }

  const transaction = prepareTransaction({
    chain: defineChain(chainId),
    client: client,
    to: org.wallet,
    value: BigInt(Math.floor(parseFloat(price) * 1e18)),
  });

  const handleDonate = async () => {
    setLoading(true);
    await sendTransaction({
      account,
      transaction,
    }).then(async (result) => {
      const newTransaction = await createTransaction({
        name,
        email,
        amount: toEther(BigInt(Math.floor(parseFloat(price) * 1e18))),
        orgId: org.id,
        hash: result.transactionHash as string,
        from: account.address,
      });
      console.log(newTransaction);
      setLoading(false);
      setOpen(false);
    });
  };

  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl shadow-2xl transition-all hover:shadow-3xl bg-[radial-gradient(ellipse_50%_50%_at_0%_0%,hsla(var(--primary)_/_50%),#ffffff00)] border-t-2 border-t-primary border-b border-r border-l border-primary/10">
      <div className="flex flex-row items-center justify-start gap-4 p-6">
        <img
          src={org.image || "/tree.jpg"}
          className="rounded-full cover w-16 h-16"
          alt="Tree"
          width={300}
          height={300}
        />
        <div>
          <h1 className="text-2xl font-bold">{org.name}</h1>
          <p className="text-gray-500 text-sm">
            At
            {org.address}
          </p>
        </div>
      </div>
      <div className="p-6 pt-4 items-end">
        <div className="flex flex-row items-center justify-between">
          <p className="text-sm text-gray-500">Planting Area</p>
          <p className="text-sm font-bold">{org.plantingArea}</p>
        </div>
        <div className="flex flex-row items-center justify-between mt-2 mb-4">
          <p className="text-sm text-gray-500">Gov ID</p>
          <p className="text-sm font-bold">{org.govId}</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button onClick={() => setOpen(true)}>Donate </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <h1 className="text-2xl font-bold">{org.name}</h1>
              <p className="text-gray-500 text-sm">
                At
                {org.address}
              </p>
            </DialogHeader>
            <DialogDescription>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    placeholder="Enter Amount"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
            <DialogFooter className="flex flex-row items-center justify-between">
              <Button onClick={handleDonate}>Donate
                {loading && (<Loader className="w-6 h-6 animate-spin" />)}
              </Button>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

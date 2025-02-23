/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import confetti from "canvas-confetti";
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
import { ArrowUpRight, Link2, Loader, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
} from "../ui/alert-dialog";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { addUserDonation } from "@/actions/donate";
import { DialogTitle } from "@radix-ui/react-dialog";

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
  const [price, setPrice] = useState<string>();
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  if (!account) {
    toast.error("Please connect your wallet to donate");
    return;
  }

  const transaction = prepareTransaction({
    chain: defineChain(chainId),
    client: client,
    to: org.wallet,
    value: price ? BigInt(Math.floor(parseFloat(price) * 1e18)) : BigInt(0),
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
        amount: toEther(
          price ? BigInt(Math.floor(parseFloat(price) * 1e18)) : BigInt(0)
        ),
        orgId: org.id,
        hash: result.transactionHash as string,
        from: account.address,
      });
      console.log(newTransaction);
      setLoading(false);
      setOpen(false);

      const leaderboard = await addUserDonation({
        amountDonated: parseFloat(price || "0"),
        wallet: account.address,
      });

      console.log(leaderboard);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setIsOpen(true);
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
          <p className="text-gray-500 text-sm">At {org.address}</p>
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
          <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)}>Donate</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Donate to {org.name}
              </DialogTitle>
              <p className="text-gray-500 text-sm">at {org.address}</p>
            </DialogHeader>
            <div>
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
            </div>
            <DialogFooter className="flex flex-row items-center justify-between">
              <Button type="submit" onClick={handleDonate}>
                Donate
                {loading && <Loader className="w-6 h-6 animate-spin" />}
              </Button>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent className="max-w-2xl bg-gradient-to-b from-[#1A1A1A] to-[#121212] border-gray-800 shadow-2xl rounded-xl overflow-hidden">
            <AlertDialogHeader className="relative">
              <Button
                variant="ghost"
                className="absolute right-0 top-0 text-gray-400 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </AlertDialogHeader>

            {/* Embed Link Section */}
            <div className="space-y-2 mb-4">
              <Image
                src="/success.gif"
                alt="Success"
                width={300}
                height={300}
                className="rounded-lg mx-auto"
              />
            </div>

            <div className="space-y-4 mb-4">
              <h1 className="text-4xl font-bold text-center">Thank you!</h1>
              <p className="text-center text-gray-400 max-w-md mx-auto">
                Your donation has been successfully processed and your XP has
                been updated
              </p>

              {/* Current Level */}
              <div className="flex flex-row items-center justify-center gap-4">
                <h1 className="text-2xl font-bold">Currently at: </h1>
                <Badge
                  variant="default"
                  className="text-white h-6 px-6 py-2 text-md"
                >
                  Level 1
                </Badge>
              </div>
            </div>

            {/* Download Files Section */}
            <div className="space-y-2 mb-4 mx-auto">
              <Link href="/leaderboard">
                <Button variant="secondary">
                  Go to leaderboard <ArrowUpRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>

            {/* Guide Button */}
            <div className="flex justify-between items-center">
              <Link
                href="/"
                className="text-gray-400 inline-flex items-center gap-2 hover:text-white transition-colors text-sm py-2 h-auto"
              >
                Home <Link2 />
              </Link>

              <Button
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors text-sm py-2 h-auto"
              >
                Close
              </Button>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

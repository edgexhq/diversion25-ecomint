"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { client } from "@/lib/client";
import { chainId, collectionAddress, contractAddress } from "@/lib/constants";
import { X } from "lucide-react";
import { useState } from "react";
import { defineChain } from "thirdweb";
import { CreateDirectListingButton } from "thirdweb/react";

interface BidModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenId: bigint;
}

export default function BidModal({ isOpen, onClose, tokenId }: BidModalProps) {
  const [price, setPrice] = useState("");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Place a Bid</DialogTitle>
        </DialogHeader>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-gray-900 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-800"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="tokenId" className="text-gray-300">
              Token ID
            </Label>
            <Input
              id="tokenId"
              value={
                tokenId.toString().length > 5
                  ? tokenId.toString().slice(0, 5) + "..."
                  : tokenId.toString()
              }
              readOnly
              className="bg-gray-800 border-gray-700 text-white focus:ring-emerald-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currentPrice" className="text-gray-300">
              Current Price
            </Label>
            <Input
              id="currentPrice"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white focus:ring-emerald-500"
            />
          </div>
          <CreateDirectListingButton
            client={client}
            tokenId={tokenId}
            chain={defineChain(chainId)}
            pricePerToken={price}
            contractAddress={contractAddress}
            assetContractAddress={collectionAddress}
          >
            List NFT
          </CreateDirectListingButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}

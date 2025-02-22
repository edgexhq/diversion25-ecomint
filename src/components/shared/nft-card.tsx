"use client";

import BidModal from "@/components/shared/sell-modal";
import { client } from "@/lib/client";
import Link from "next/link";
import { useState } from "react";
import { NFT, toEther } from "thirdweb";
import { MediaRenderer } from "thirdweb/react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

interface NFTCardProps {
  nft: NFT;
  type: string;
  pricePerToken?: bigint;
  listingId?: bigint;
}

export default function NFTCard({
  type,
  nft,
  pricePerToken,
  listingId,
}: NFTCardProps) {
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);

  const priceInETH = toEther(pricePerToken || BigInt(0));

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-muted/40 p-3 backdrop-blur-sm transition-transform hover:scale-[1.02]">
      <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="relative">
        <div className="group relative mb-3 overflow-hidden rounded-xl transition-transform duration-300 hover:scale-[1.02]">
          <MediaRenderer
            src={nft.metadata.image}
            className="object-cover w-full h-full"
            client={client}
          />
        </div>

        <div className="mb-3 flex items-center justify-between">
          <div className="text-left text-sm font-medium text-emerald-400">
            <div className="font-mono text-lg text-white">
              {nft.metadata.name}
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between">
          {type === "listed" && (
            <div>
              <div className="text-xs text-gray-400">Current price</div>
              <div className="flex items-baseline gap-2">
                <div className="text-lg font-bold text-emerald-400">
                  {priceInETH} ETH
                </div>
                {/* <div className="text-xs text-gray-400">${usdPrice}</div> */}
              </div>
            </div>
          )}
          {type === "owner" ? (
            <div className="gap-4 flex w-full">
              <Button
                onClick={() => setIsBidModalOpen(true)}
                className="w-full"
              >
                Sell <ArrowRight size={16} />
              </Button>
              <Link href={`/nft/${nft.id}`} className="w-full">
                <Button variant="secondary">
                  View NFT <ArrowRight size={16} />
                </Button>
              </Link>
              <BidModal
                isOpen={isBidModalOpen}
                onClose={() => setIsBidModalOpen(false)}
                tokenId={nft.id}
              />
            </div>
          ) : (
            <Link href={`/marketplace/${listingId}`}>
              <button className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:from-emerald-600 hover:to-cyan-600">
                View
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

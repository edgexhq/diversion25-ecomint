"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, GamepadIcon, ArrowRight } from "lucide-react";
import { DirectListing } from "thirdweb/extensions/marketplace";
import {
  BuyDirectListingButton,
  CreateDirectListingButton,
  darkTheme,
  MediaRenderer,
  useActiveAccount,
} from "thirdweb/react";
import { client } from "@/lib/client";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { chainId, collectionAddress, contractAddress } from "@/lib/constants";
import { defineChain, NFT, toEther } from "thirdweb";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DateTimePicker } from "../ui/date-time";

function formatNumber(num: bigint) {
  return toEther(num);
}

export default function NFTDetails({
  listing,
  nft,
  type,
}: {
  listing?: DirectListing;
  nft?: NFT;
  type: string;
}) {
  const account = useActiveAccount();
  const [price, setPrice] = useState("");
  const [date, setDate] = useState<Date>();

  const [timeLeft, setTimeLeft] = useState<{
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  } | null>(null);

  useEffect(() => {
    if (listing === undefined) return;
    const endTime = new Date(Number(listing.endTimeInSeconds) * 1000);
    let interval: NodeJS.Timeout;

    const countDownTimer = () => {
      const now = new Date();
      const diff = endTime.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
        });
      } else {
        setTimeLeft(null);
      }

      interval = setTimeout(countDownTimer, 1000);
    };

    countDownTimer();

    return () => clearTimeout(interval);
  }, [listing, listing?.endTimeInSeconds]);

  const start = new Date(Number(listing?.startTimeInSeconds) * 1000).toLocaleString()

  if (type === "nft" && nft?.owner !== account?.address) {
    return (
      <div className="min-h-screen p-6 max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-bold">You do not own this NFT</h1>
          <Link href="/owned-nft">
            <Button className="mt-4">Back to Your NFTs</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Image */}
        <div className="space-y-6">
          <div>
            <Card className="border-0 overflow-hidden">
              <MediaRenderer
                src={
                  type === "nft"
                    ? nft!.metadata.image
                    : listing!.asset.metadata.image
                }
                className="object-cover w-full h-full"
                client={client}
              />
            </Card>
          </div>
          <Card className="border-0 p-6">
            <p className="text-gray-400">Description</p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-lg">
                {type === "nft"
                  ? nft!.metadata.description
                  : listing!.asset.metadata.description}
              </span>
            </div>
            {type === "listed" && listing && (
              <div className="flex items-center gap-2 mt-4 text-gray-400">
                <span>Listing started at</span>
                <span className="text-sm">{start}</span>
              </div>
            )}
          </Card>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6 col-span-2">
          <div>
            <h1 className="text-2xl font-bold">
              {type === "nft"
                ? nft!.metadata.name
                : listing!.asset.metadata.name}
            </h1>
            <p className="text-gray-400">
              Owned by{" "}
              <span className="text-blue-500">
                {type === "nft" ? nft!.owner : listing!.creatorAddress}
                ...
              </span>
            </p>

            <div className="flex items-center gap-4 mt-4">
              <Badge className="flex items-center gap-2 rounded-full">
                <Eye className="w-4 h-4" />
                <span>101 views</span>
              </Badge>
              <Badge
                className="flex items-center gap-2 rounded-full"
                variant="secondary"
              >
                <GamepadIcon className="w-4 h-4" />
                <span>NFT</span>
              </Badge>
            </div>
          </div>

          {/* Timer */}
          {type === "listed" && listing && (
            <Card className="border-0 p-6">
              <p className="text-gray-400 mb-4">
                Sale ends{" "}
                {listing.endTimeInSeconds !== null
                  ? new Date(Number(listing.endTimeInSeconds) * 1000)
                      .toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        timeZoneName: "short",
                      })
                      .replace(",", "")
                  : " soon"}
              </p>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-bold">
                    {timeLeft?.days ?? "00"}
                  </div>
                  <div className="text-sm text-gray-400">
                    {timeLeft?.days === 1 ? "Day" : "Days"}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {timeLeft?.hours ?? "00"}
                  </div>
                  <div className="text-sm text-gray-400">
                    {timeLeft?.hours === 1 ? "Hour" : "Hours"}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {timeLeft?.minutes ?? "00"}
                  </div>
                  <div className="text-sm text-gray-400">
                    {timeLeft?.minutes === 1 ? "Minute" : "Minutes"}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {timeLeft?.seconds ?? "00"}
                  </div>
                  <div className="text-sm text-gray-400">
                    {timeLeft?.seconds === 1 ? "Second" : "Seconds"}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Price */}
          <Card className="border-0 p-6">
            <p className="text-gray-400">Current price</p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-bold">
                {type === "listed" ? formatNumber(listing!.pricePerToken) : 0}{" "}
                MATIC
              </span>
              <span className="text-gray-400">
                $
                {type === "listed"
                  ? (Number(formatNumber(listing!.pricePerToken)) * 2633.09)
                      .toString()
                      .slice(0, 8)
                  : 0}
              </span>
            </div>
            {type === "nft" && (
              <div className="flex gap-4 mt-4">
                <div className="space-y-2 mt-3 w-full">
                  <Label htmlFor="currentPrice" className="text-gray-300">
                    Selling Price
                  </Label>
                  <Input
                    id="currentPrice"
                    placeholder="Enter a price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    max={60}
                  />
                </div>
                <div className="space-y-2 mt-3 w-full">
                  <Label htmlFor="currentPrice" className="text-gray-300">
                    Listing end data
                  </Label>
                  <DateTimePicker date={date} setDate={setDate} />
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {type === "listed" && listing && (
                <BuyDirectListingButton
                  contractAddress={contractAddress} // the marketplace contract
                  chain={defineChain(chainId)}
                  client={client}
                  listingId={BigInt(listing.id)}
                  quantity={1n}
                >
                  Buy NFT
                </BuyDirectListingButton>
              )}
              {type === "nft" && nft && (
                <CreateDirectListingButton
                  client={client}
                  tokenId={nft.id}
                  chain={defineChain(chainId)}
                  pricePerToken={price}
                  contractAddress={contractAddress}
                  assetContractAddress={collectionAddress}
                  disabled={!price || !date}
                  endTimestamp={date}
                  theme={darkTheme({
                    colors: {
                      accentText: "hsl(158.1 ,64.4% ,50%)",
                      accentButtonBg: "hsl(118, 100%, 63%)",
                      primaryButtonBg: "hsl(142, 76%, 36%)",
                      accentButtonText: "hsl(0, 0%, 0%)",
                    },
                  })}
                >
                  List NFT
                </CreateDirectListingButton>
              )}
              <Link href={type === "nft" ? "/owner-nft" : "/marketplace"}>
                <Button variant="outline" className="w-full h-11 rounded-lg">
                  Back to {type === "nft" ? "Your NFTs" : "Marketplace"}{" "}
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
            <div className="flex flex-col justify-start gap-2 mt-6 text-gray-200">
              <div>
                <span className="text-red-500 mr-2">♦</span>
                <span>Supports creator</span>
              </div>
              <span className="text-sm text-gray-400">
                This listing is paying the collection creator their suggested
                creator earnings.
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

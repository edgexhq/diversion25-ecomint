"use client"

import { DirectListing } from "thirdweb/extensions/marketplace";
import NFTCard from "./shared/nft-card";
import { useActiveAccount } from "thirdweb/react";
import { Loader } from "lucide-react";

export default function MarketPlace({listings}: {listings: DirectListing[]}) {

  const account = useActiveAccount();
  
  if (!account) {
    return (
      <div>
        <Loader className="mx-auto animate-spin h-10 w-10" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-5">
      {
        listings
        .filter((listing) => listing.creatorAddress !== account.address).map((listing) => (
          <NFTCard type="listed" listingId={listing.id} nft={listing.asset} key={listing.id} pricePerToken={listing.pricePerToken} />
        ))
      }
    </div>
  )
}
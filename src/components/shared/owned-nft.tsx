"use client";

import { client } from "@/lib/client";
import { defineChain, getContract, NFT } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { getOwnedNFTs } from "thirdweb/extensions/erc721";
import { useEffect, useState } from "react";
import NFTCard from "./nft-card";
import { chainId, collectionAddress } from "@/lib/constants";

export default function OwnedNFT() {
  const activeAccount = useActiveAccount();

  const [ownedNFTs, setOwnedNFTs] = useState<NFT[]>([]);

  const contract = getContract({
    client: client,
    address: collectionAddress,
    chain: defineChain(chainId),
  });

  useEffect(() => {
    async function fetchOwnedNFTs() {
      const ownedNFTs = await getOwnedNFTs({
        contract,
        owner: activeAccount!.address,
      });

      setOwnedNFTs(ownedNFTs);
    }

    if (activeAccount) {
      fetchOwnedNFTs();
    }
  }, [activeAccount, contract]);

  return (
    <div className="grid mt-6 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {ownedNFTs.map((nft, i) => (
        <NFTCard
          key={i}
          nft={nft}
          type="owner"
        />
      ))}
    </div>
  );
}

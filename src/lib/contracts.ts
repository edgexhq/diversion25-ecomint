import { defineChain, getContract } from "thirdweb";
import { client } from "./client";

export const contractAddress =
  process.env.NEXT_PUBLIC_NFT_MARKETPLACE_CONTRACT_ADDRESS!;

export const collectionAddress =
  process.env.NEXT_PUBLIC_NFT_COLLECTION_CONTRACT_ADDRESS!;

export const marketcontract = getContract({
  client: client,
  address: contractAddress,
  chain: defineChain(11155111),
});

export const collectioncontract = getContract({
  client: client,
  address: collectionAddress,
  chain: defineChain(11155111),
});

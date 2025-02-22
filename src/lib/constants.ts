export const contractAddress =
  process.env.NEXT_PUBLIC_NFT_MARKETPLACE_CONTRACT_ADDRESS!;

export const collectionAddress =
  process.env.NEXT_PUBLIC_NFT_COLLECTION_CONTRACT_ADDRESS!;

export const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID!);

export const ETH_TO_USD_RATE = 3000; // This is a mock rate. In a real app, you'd fetch this dynamically.

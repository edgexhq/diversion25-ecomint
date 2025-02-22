import { NextResponse } from "next/server";

const { NEXT_PUBLIC_ENGINE_URL, NEXT_PUBLIC_ACCESS_TOKEN, NEXT_PUBLIC_BACKEND_WALLET, NEXT_PUBLIC_CHAIN_ID, NEXT_PUBLIC_NFT_COLLECTION_CONTRACT_ADDRESS } =
  process.env;

export async function POST(req: Request) {

  const { nftImage, address, name, description } = await req.json();
  if (
    !NEXT_PUBLIC_ENGINE_URL ||
    !NEXT_PUBLIC_ACCESS_TOKEN ||
    !NEXT_PUBLIC_BACKEND_WALLET ||
    !NEXT_PUBLIC_CHAIN_ID
  ) {
    return new NextResponse(
      JSON.stringify({ error: "Missing required environment variables" }),
      { status: 500 }
    );
  }

  try {
    const mintResponse = await fetch(
      `${NEXT_PUBLIC_ENGINE_URL}/contract/${NEXT_PUBLIC_CHAIN_ID}/${NEXT_PUBLIC_NFT_COLLECTION_CONTRACT_ADDRESS}/erc721/mint-to`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${NEXT_PUBLIC_ACCESS_TOKEN}`,
          "x-backend-wallet-address": NEXT_PUBLIC_BACKEND_WALLET,
        },
        body: JSON.stringify({
          receiver: address,
          metadata: {
            name: name,
            description: description,
            image: nftImage,
          },
        }),
      }
    );

    if (!mintResponse.ok) {
      const error = await mintResponse.text();
      throw new Error(`Failed to mint NFT: ${error}`);
    }

    return new NextResponse(
      JSON.stringify({ message: "NFT minted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Minting error:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to mint NFT" }), {
      status: 500,
    });
  }
}
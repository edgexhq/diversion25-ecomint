import CreateNFT from "@/components/root/CreateNFT";
import { client } from "@/lib/client";
import { ConnectButton } from "thirdweb/react";

export default function CreateNFTPage() {
  return (
    <div className="max-w-7xl mx-auto mt-8 flex justify-center flex-col w-full">
      <ConnectButton client={client} />
      <h1 className="text-3xl text-center">Create and Mint your NFT</h1>
      <CreateNFT />
    </div>
  );
}

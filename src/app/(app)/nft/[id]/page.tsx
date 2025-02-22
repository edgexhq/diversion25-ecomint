
import NFTDetails from "@/components/root/NFTDetails";
import { collectioncontract } from "@/lib/contracts";
import { getNFT, ownerOf } from "thirdweb/extensions/erc721";

export default async function NFTIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const nftid = (await params).id;
  const nft = await getNFT({
    contract: collectioncontract,
    tokenId: BigInt(nftid),
  });

  console.log(nft);

  const result = await ownerOf({
    contract: collectioncontract,
    tokenId: BigInt(nftid),
  });

  nft.owner = result;

  return <NFTDetails nft={nft} type="nft" />;
}
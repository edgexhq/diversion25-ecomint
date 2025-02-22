import NFTDetails from "@/components/root/NFTDetails";
import { marketcontract } from "@/lib/contracts";
import { getListing } from "thirdweb/extensions/marketplace";

export default async function MarketIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const listId = (await params).id;
  const listing = await getListing({
    contract: marketcontract,
    listingId: BigInt(listId),
  });

  return (
    <NFTDetails listing={listing} type="listed" />
  );
}


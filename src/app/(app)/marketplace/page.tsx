import MarketPlace from "@/components/marketplace";
import { marketcontract } from "@/lib/contracts";
import { getAllValidListings } from "thirdweb/extensions/marketplace";

export const dynamic = "force-dynamic";

export default async function MarketPlacePage() {
  const validListings = await getAllValidListings({
    contract: marketcontract,
    start: 0,
  });

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold mb-6">Marketplace</h1>

      <MarketPlace listings={validListings} />
    </div>
  );
}

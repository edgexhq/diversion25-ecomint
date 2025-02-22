import MarketPlace from "@/components/marketplace";
import { marketcontract } from "@/lib/contracts";
import { getAllValidListings } from "thirdweb/extensions/marketplace";

export default async function MarketPlaceHomePage() {
  const validListings = await getAllValidListings({
    contract: marketcontract,
    start: 0,
  })

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold mb-6">Marketplace</h1>

      <MarketPlace listings={validListings} />
    </div>
  );
}

import { getAllOrgs } from "@/actions/form";
import ExploreOrgs from "@/components/explore-orgs";

export interface OrganisationsProps {
  treePlantingOrgs: Array<{
    id: string;
    name: string;
    govId: string;
    address: string;
    wallet: string;
    plantingArea: string;
    image?: string | null;
  }>;
}
export default async function Explore() {
  const organisations: OrganisationsProps = await getAllOrgs();

  return (
    <>
      <ExploreOrgs organisations={organisations} />
    </>
  );
}

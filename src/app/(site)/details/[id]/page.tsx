import { getTreeById } from "@/actions/tree";
import TreeDetails from "@/components/shared/treeDetails";

export default async function TreeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tree = await getTreeById(id);
  if (!tree) {
    return <div>Tree not found</div>;
  }
  return (
    <TreeDetails
      userName={tree.name}
      name={tree.name}
      species={tree.species}
      image={tree.imgUrl}
      carbonOffset={tree.carbonOffset}
      plantedAt={tree.plantedAt}
      latitude={tree.latitude}
      longitude={tree.longitude}
      treePlantingOrgId={tree.treePlantingOrgId}
    />
  );
}

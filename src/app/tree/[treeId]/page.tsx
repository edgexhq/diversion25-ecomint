import { getTree } from "@/actions/form";
import Treecertificate from "@/components/Treecertificate";

export default async function TreeCertificate({
  params,
}: {
  params: Promise<{ treeId: string }>;
}) {
  const { treeId } = await params;

  const treedetails = await getTree(treeId);
  if (!treedetails?.data) {
    return (
      <div className="min-h-screen w-full text-center flex items-center justify-center">
        <p className="text-5xl font-bold tracking-tight">Tree not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <Treecertificate details={treedetails.data} />
    </div>
  );
}

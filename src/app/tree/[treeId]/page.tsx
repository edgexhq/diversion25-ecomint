import { getTree } from "@/actions/form";
import Certificate from "@/components/new-certificate";
import { Suspense } from "react";

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
    <div className="min-h-screen">
      <Suspense>
        <Certificate details={treedetails.data} />
      </Suspense>
    </div>
  );
}

"use server";

import prisma from "@/lib/prisma";

export async function getOrg({ id }: { id: string }) {
  try {
    if (!id) {
      throw new Error("Missing required fields");
    }

    const org = await prisma.treePlantingOrg.findUnique({
      where: {
        id: id,
      },
    });
    return { success: true, data: org };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error getting org:", { error: errorMessage });
    return { success: false, error: errorMessage };
  }
}

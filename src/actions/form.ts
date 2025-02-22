"use server";

import prisma from "@/lib/prisma";

export async function addTreePlantingOrg(data: {
  name: string;
  govId: string;
  address: string;
  wallet: string;
  plantingArea: string;
  image: string;
}) {
  try {
    if (
      !data ||
      !data.name ||
      !data.govId ||
      !data.address ||
      !data.wallet ||
      !data.plantingArea ||
      !data.image
    ) {
      throw new Error("Missing required fields");
    }

    const org = await prisma.treePlantingOrg.create({
      data: {
        name: data.name,
        govId: data.govId,
        address: data.address,
        wallet: data.wallet,
        plantingArea: data.plantingArea,
        image: data.image,
      },
    });
    return { success: true, data: org };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error creating tree planting org:", { error: errorMessage });
    return { success: false, error: errorMessage };
  }
}

export async function addWildlifeOrg(data: {
  name: string;
  govId: string;
  address: string;
  area: string;
  wallet: string;
  noOfAnimals: number;
  image: string;
}) {
  try {
    if (
      !data ||
      !data.name ||
      !data.govId ||
      !data.address ||
      !data.area ||
      !data.wallet ||
      typeof data.noOfAnimals !== "number" ||
      !data.image
    ) {
      throw new Error("Missing required fields");
    }

    const org = await prisma.wildLifeOrg.create({
      data: {
        name: data.name,
        govId: data.govId,
        address: data.address,
        area: data.area,
        wallet: data.wallet,
        noOfAnimals: data.noOfAnimals,
        image: data.image,
      },
    });
    return { success: true, data: org };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error creating wildlife org:", { error: errorMessage });
    return { success: false, error: errorMessage };
  }
}

export async function getAccountFromAddress(walletAdd: string) {
  try {
    if (!walletAdd) {
      throw new Error("Missing required fields");
    }

    const account = await prisma.treePlantingOrg.findUnique({
      where: {
        wallet: walletAdd,
      },
    });
    return { success: true, data: account };
  } catch (error) {
    console.error("Error fetching account: " + error);
  }
}

export async function getAllOrgs() {
  const treeorgs = await prisma.treePlantingOrg.findMany();
  const wildlifeorgs = await prisma.wildLifeOrg.findMany();
  const orgs = {
    treePlantingOrgs: treeorgs,
    wildlifeOrgs: wildlifeorgs,
  };
  return orgs;
}
export async function addTree(data: {
  tree: {
    name: string;
    species: string;
    latitude: string;
    longitude: string;
    plantedAt: Date;
    carbonOffset: number;
    imgUrl: string;
    userWalletAddress: string;
  };
  transaction: {
    amount: string;
    transactionAddress: string;
    userWalletAddress: string;
    name: string; // Add name field
    email: string; // Add email field
  };
  treePlantingOrgId: string;
}) {
  try {
    const accntData = await getAccountFromOrgId(data.treePlantingOrgId);

    if (!accntData?.data?.id) {
      throw new Error("Invalid tree planting org ID");
    }

    const result = await prisma.$transaction(async (tx) => {
      const tree = await tx.tree.create({
        data: {
          ...data.tree,
          treePlantingOrgId: accntData.data?.id || "",
          treePlantingOrgWallet: data.treePlantingOrgId,
        },
      });

      const transaction = await tx.transactions.create({
        data: {
          amount: data.transaction.amount,
          transactionAddress: data.transaction.transactionAddress,
          userWalletAddress: data.transaction.userWalletAddress,
          orgId: accntData.data?.id || "",
          treeId: tree.id,
          status: "PLANTED",
          name: data.transaction.name, // Add name
          email: data.transaction.email, // Add email
        },
      });

      return { tree, transaction };
    });

    return { success: true, data: result };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error creating tree:", { error: errorMessage });
    return { success: false, error: errorMessage };
  }
}

export async function getAccountFromOrgId(orgId: string) {
  try {
    if (!orgId) {
      throw new Error("Missing required fields");
    }

    const account = await prisma.treePlantingOrg.findUnique({
      where: {
        id: orgId,
      },
    });
    return { success: true, data: account };
  } catch (error) {
    console.error("Error fetching account: " + error);
  }
}

export async function getTree(id: string) {
  try {
    if (!id) {
      throw new Error("Missing required fields");
    }

    const tree = await prisma.tree.findUnique({
      where: {
        id,
      },
    });
    if (!tree) {
      throw new Error("Tree not found");
    }
    return { success: true, data: tree };
  } catch (error) {
    console.error("Error fetching tree: " + error);
  }
}

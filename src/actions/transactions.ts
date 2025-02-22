"use server";

import prisma from "@/lib/prisma";

export async function createTransaction({
  orgId,
  amount,
  from,
  hash,
  name,
  email,
}: {
  orgId: string;
  amount: string;
  from: string;
  hash: string;
  name: string;
  email: string;
}) {
  const transactions = await prisma.transactions.create({
    data: {
      orgId,
      amount,
      userWalletAddress: from,
      transactionAddress: hash,
      name,
      email,
    },
  });

  if (!transactions) {
    throw new Error("Org not found");
  }
}

export async function getTransactionsOfOrg(walletAddress: string) {
  try {
    const org = await prisma.treePlantingOrg.findUnique({
      where: {
        wallet: walletAddress,
      },
    });

    if (!org) {
      throw new Error("Organization not found");
    }

    const transactions = await prisma.transactions.findMany({
      where: {
        status: "PENDING",
      },
    });
    console.log("Fetched transactions:", transactions);
    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}

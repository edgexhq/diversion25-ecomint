"use server";

import prisma from "@/lib/prisma";

export async function createTransaction({
  orgId,
  amount,
  from,
  hash,
  name,
  email
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
      email
    },
  });

  if (!transactions) {
    throw new Error("Org not found");
  }
}

export async function getTransactionsOfOrg(wallet: string) {
  const org = await prisma.treePlantingOrg.findUnique({
    where: {
      wallet: wallet,
    },
  });

  if (!org) {
    return [];
  }

  const transactions = await prisma.transactions.findMany({
    where: {
      orgId: org.id,
    },
  });

  return transactions;
}
"use server";

import prisma from "@/lib/prisma";

export async function addUserDonation({
  wallet,
  amountDonated,
}: {
  wallet: string;
  amountDonated: number;
}) {
  const user = await prisma.user.findFirst({
    where: {
      wallet,
    },
  });

  if (!user) {
    const newUser = await prisma.user.create({
      data: {
        wallet,
        amountDonated,
      },
    });

    return newUser;
  } else {
    const donation = await prisma.user.update({
      where: {
        wallet,
      },
      data: {
        amountDonated: user.amountDonated + amountDonated,
      },
    });

    return donation;
  }
}

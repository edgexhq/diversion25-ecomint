"use server";

import prisma from "@/lib/prisma";

export async function fetchLeaderboard() {
  try {
    const leaderboard = await prisma.user.findMany({
      orderBy: {
        amountDonated: "desc",
      },
      select: {
        id: true,
        wallet: true,
        amountDonated: true,
      },
    });

    // Convert amountDonated from string to number
    const sortedLeaderboard = leaderboard
      .map((user) => ({
        ...user,
        amountDonated: user.amountDonated,
      }))
      .sort((a, b) => b.amountDonated - a.amountDonated);

    // Assign Ranks
    const rankedLeaderboard = sortedLeaderboard.map((user, index) => ({
      ...user,
      rank: index + 1,
      tier:
        index === 0
          ? "🥇 First Place"
          : index === 1
          ? "🥈 Second Place"
          : index === 2
          ? "🥉 Third Place"
          : "🎖 Supporter",
    }));

    const data = rankedLeaderboard.slice(0, 10);
    return data;
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
}

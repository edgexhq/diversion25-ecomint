/* eslint-disable @next/next/no-img-element */
"use client";

import { client } from "@/lib/client";
import { shortenAddress } from "@/lib/utils";
import { motion } from "framer-motion";
import { Crown, Medal } from "lucide-react";
import { AccountAvatar, AccountProvider } from "thirdweb/react";

interface Player {
  wallet: string;
  amountDonated: number;
  level: number;
  avatar: string;
  rank: number;
}

interface LeaderboardProps {
  players: Player[];
}

export default function LeaderboardTopSection({ players }: LeaderboardProps) {
  console.log(players);

  const podiumOrder = [2, 1, 3]; // Left, Center, Right ranks

  const getTierStyles = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          podium: "from-yellow-500 via-yellow-400 to-yellow-300/50",
          glow: "from-yellow-400 to-orange-300",
          medal: "text-yellow-500",
          level: "bg-yellow-100 border-yellow-500 text-yellow-700",
          amountDonated: "text-yellow-600",
        };
      case 2:
        return {
          podium: "from-gray-500 via-gray-400 to-gray-300/50",
          glow: "from-gray-400 to-purple-300",
          medal: "text-gray-400",
          level: "bg-gray-100 border-gray-500 text-gray-700",
          amountDonated: "text-gray-600",
        };
      case 3:
        return {
          podium: "from-orange-500 via-orange-400 to-orange-300/50",
          glow: "from-orange-400 to-red-300",
          medal: "text-orange-500",
          level: "bg-orange-100 border-orange-500 text-orange-700",
          amountDonated: "text-orange-600",
        };
      default:
        return {
          podium: "from-gray-100 to-gray-100 border-gray-300",
          glow: "from-gray-400 to-gray-300",
          medal: "text-gray-400",
          level: "bg-gray-100 border-gray-400 text-gray-700",
          amountDonated: "text-gray-600",
        };
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8">
      <div className="relative flex items-end justify-center gap-10 overflow-y-hidden pt-10">
        {podiumOrder.map((rank) => {
          const player = players.find((p) => p.rank === rank);
          if (!player) return null;

          const isWinner = rank === 1;
          const podiumHeight =
            rank === 1 ? "h-[180px]" : rank === 2 ? "h-[140px]" : "h-[100px]";
          const delay = rank === 1 ? 0 : rank === 2 ? 0.5 : 1;
          const tierStyles = getTierStyles(rank);

          return (
            <motion.div
              key={rank}
              className="relative flex flex-col items-center"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay }}
            >
              {/* Medal or Crown */}
              <motion.div
                className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
                initial={{ scale: 0, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: delay + 0.7 }}
              >
                {isWinner ? (
                  <Crown
                    className={`size-10 fill-current stroke-none ${tierStyles.medal}`}
                  />
                ) : (
                  <Medal className={`w-6 h-6 ${tierStyles.medal}`} />
                )}
              </motion.div>

              {/* Player Avatar */}
              <motion.div
                className="relative z-10 mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: delay + 0.3 }}
              >
                <div
                  className={`relative rounded-full ${
                    isWinner ? "w-20 h-20" : "w-16 h-16"
                  }`}
                >
                  <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${tierStyles.glow} blur-md opacity-75`}
                  />
                  <div className="relative rounded-full overflow-hidden">
                    {/* <Image
                      src={player.avatar || "/placeholder.svg"}
                      alt={player.wallet}
                      width={isWinner ? 80 : 64}
                      height={isWinner ? 80 : 64}
                      className="rounded-full"
                    /> */}
                    <AccountProvider client={client} address={player.wallet}>
                      <AccountAvatar
                        fallbackComponent={
                          <img
                            src={`https://avatar.vercel.sh/${player.wallet}?rounded=60`}
                            alt={player.wallet}
                          />
                        }
                      />
                    </AccountProvider>
                  </div>
                </div>
                <motion.div
                  className={`absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 w-12 text-center text-xs font-medium border ${tierStyles.level}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: delay + 0.5 }}
                >
                  Lv {player.rank}
                </motion.div>
              </motion.div>

              {/* Player Name & Score */}
              <motion.div
                className="text-center mb-2 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.6 }}
              >
                <p className="font-semibold text-sm">
                  {shortenAddress(player.wallet)}
                </p>
                <p className={`text-xs font-bold ${tierStyles.amountDonated}`}>
                  {player.amountDonated.toFixed(6)} MATIC
                </p>
              </motion.div>

              {/* Podium */}
              <motion.div
                className={`w-24 ${podiumHeight} rounded-t-lg relative overflow-hidden border ${tierStyles.podium}`}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${tierStyles.podium}`}
                />
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-2xl font-bold text-gray-900/50">
                  {rank}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

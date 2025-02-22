"use client";

import { motion } from "framer-motion";
import { Bitcoin, Palette, Wallet } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EducationPage() {
  return (
    <div className="min-h-screen mb-4">
      {/* Cryptocurrency Basics */}
      <section className="mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-full max-w-6xl mx-auto">
            <div className="text-lg flex items-center gap-2">
              <Bitcoin className="h-7 w-7 text-yellow-500" />
              <h1 className="text-xl font-bold text-left">
                What is Cryptocurrency?
              </h1>
            </div>
            <div className="flex items-center gap-16 p-4 rounded-lg shadow-md w-full">
              <p className="w-3/5 text-left text-base font-medium text-muted-foreground/90 tracking-wide">
                Cryptocurrency is like digital money, but instead of being
                controlled by a bank, it runs on a special technology called
                blockchain, which is like a big online notebook that everyone
                can see but no one can change unfairly. Imagine you and your
                friends are playing a game where you keep track of points in a
                shared notebook—everyone can check it, but no one can cheat.
                That&apos;s how cryptocurrency works! Bitcoin is the most
                popular one, like a rare digital coin, while Ethereum is like a
                smart digital ticket that can do more than just store value.
                People use crypto to buy things online, send money to others
                (like PayPal but faster), or invest, hoping its value will go
                up—kind of like buying gold or rare sneakers. However, its price
                can change a lot, so it&apos;s exciting but risky!
              </p>
              <div className="mb-4 w-2/5 text-left text-base font-medium text-muted-foreground/90 tracking-wide flex flex-col items-center gap-2">
                <img
                  src="/cryptocurrencies-rising.webp"
                  alt="cryptocurrencies-rising"
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* NFT Education */}
      <section className="mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="grid gap-12 md:grid-cols-2">
            <div className="w-full max-w-3xl mx-auto">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Palette className="h-7 w-7 text-purple-500" />
                    <h1 className="text-xl text-left">What is an NFT?</h1>
                  </CardTitle>
                </CardHeader>
                <CardContent className="mb-4 text-left text-base font-medium text-muted-foreground/90 tracking-wide flex flex-col items-center w-full gap-2">
                  <div className="w-2/5">
                    <img src="/nft.png" alt="" className="rounded-lg" />
                  </div>
                  <p className="mt-4">
                    NFT stands for Non-Fungible Token, which is like a special
                    digital collectible. Imagine you have a rare Pokémon
                    card—there may be similar ones, but yours is unique and has
                    its own value. NFTs work the same way but in the digital
                    world. They can be digital art, music, videos, game items,
                    or even tweets. Each NFT is stored on a blockchain, proving
                    that you own the original version, just like a certificate
                    of authenticity for a rare item. While you can screenshot an
                    NFT image, only one person can officially own it on the
                    blockchain. Some people buy NFTs as investments, like
                    collecting rare sneakers, but their value can change a lot.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="w-full max-w-3xl mx-auto">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Wallet className="h-7 w-7 text-blue-500" />
                    <h1 className="text-xl text-left">
                      What is a Crypto Wallet?
                    </h1>
                  </CardTitle>
                </CardHeader>
                <CardContent className="mb-4 text-left text-base flex items-center flex-col justify-center font-medium text-muted-foreground/90 tracking-wide">
                  <div className="w-2/5">
                    <img src="/wallet.png" alt="" className="rounded-lg" />
                  </div>
                  <p className="mt-8">
                    A crypto wallet is like a digital version of a real wallet,
                    but instead of holding cash, it stores your
                    cryptocurrencies. It doesn&apos;t actually store the coins
                    themselves but keeps the secret keys (like passwords) that
                    let you access and use your crypto. There are two main
                    types: hot wallets (online and easy to use, like a mobile
                    app) and cold wallets (offline and safer, like a USB
                    device). Imagine a hot wallet like a digital payment app
                    (such as Google Pay), while a cold wallet is like keeping
                    money in a safe at home. Some of the wallets include
                    Metamask, Phantom, Trust. If you lose your wallet&apos;s
                    secret key, you lose access to your crypto forever, so
                    keeping it safe is very important!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

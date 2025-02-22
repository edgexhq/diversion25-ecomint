"use client";

import {
  ArrowRight,
  CircleDollarSign,
  Palette,
  TreePine,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";

const NGOS = [
  {
    id: 1,
    name: "WCS India",
    focus:
      "Wildlife Conservation Society India protects biodiversity through research, habitat conservation, and anti-poaching efforts.",
    image: "/wcs.jpg",
  },
  {
    id: 2,
    name: "WWF - India",
    focus:
      "World Wide Fund for Nature-India focuses on wildlife protection, ecosystem restoration, and climate action.",
    image: "/wwf.png",
  },
  {
    id: 3,
    name: "SankalpTaru Foundation",
    focus:
      "SankalpTaru Foundation promotes afforestation and rural empowerment through large-scale tree plantation projects.",
    image: "/sankalptaru.jpeg",
  },
];

export default function Tab() {
  const [activeStep, setActiveStep] = useState(1);
  return (
    <Tabs defaultValue="mint" className="mb-12">
      <TabsList className="w-full grid gap-4 md:grid-cols-3 rounded-lg mb-4">
        <TabsTrigger value="mint">Minting Guide</TabsTrigger>
        <TabsTrigger value="marketplace">Marketplace Guide</TabsTrigger>
        <TabsTrigger value="impact">Impact Tracking</TabsTrigger>
      </TabsList>
      <TabsContent value="mint">
        <Card>
          <CardHeader>
            <CardTitle>How to Mint Your NFT</CardTitle>
            <CardDescription>
              Follow these steps to create your NFT.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8">
              <div
                className={`relative flex items-center gap-4 rounded-lg p-4 transition-colors ${
                  activeStep === 1 ? "bg-muted" : ""
                }`}
                onClick={() => setActiveStep(1)}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </div>
                <div>
                  <h3 className="font-semibold">Connect Your Wallet</h3>
                  <p className="text-sm text-muted-foreground">
                    Click the &ldquo;Connect Wallet&rdquo; button and select
                    your preferred wallet provider.
                  </p>
                </div>
                <Wallet className="ml-auto h-6 w-6 text-muted-foreground" />
              </div>
              <div
                className={`relative flex items-center gap-4 rounded-lg p-4 transition-colors ${
                  activeStep === 2 ? "bg-muted" : ""
                }`}
                onClick={() => setActiveStep(2)}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </div>
                <div>
                  <h3 className="font-semibold">Make Your Artwork</h3>
                  <p className="text-sm text-muted-foreground">
                    Create or upload your digital artwork and fill in the NFT
                    details.
                  </p>
                </div>
                <Palette className="ml-auto h-6 w-6 text-muted-foreground" />
              </div>
              <div
                className={`relative flex items-center gap-4 rounded-lg p-4 transition-colors ${
                  activeStep === 3 ? "bg-muted" : ""
                }`}
                onClick={() => setActiveStep(3)}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </div>
                <div>
                  <h3 className="font-semibold">Confirm & Mint</h3>
                  <p className="text-sm text-muted-foreground">
                    Review your NFT details and confirm the minting process.
                  </p>
                </div>
                <CircleDollarSign className="ml-auto h-6 w-6 text-muted-foreground" />
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <Button
                onClick={() =>
                  setActiveStep((prev) => (prev < 3 ? prev + 1 : 1))
                }
              >
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="marketplace">
        <Card>
          <CardHeader>
            <CardTitle>Trading in the Marketplace</CardTitle>
            <CardDescription>
              Learn how to buy and sell NFTs while making an impact.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Buying NFTs</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal space-y-2 pl-4">
                    <li>
                      Explore the marketplace for unique eco-friendly NFTs.
                    </li>
                    <li>Review price & impact metrics before purchasing.</li>
                    <li>Buy instantly with a single click.</li>
                    <li>Confirm the transaction in your wallet</li>
                    <li>Receive the digital asset.</li>
                    <li>
                      Claim your rewards and track your contributions to
                      reforestation and conservation efforts.
                    </li>
                  </ol>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Selling NFTs</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal space-y-2 pl-4">
                    <li>
                      Create your artwork by providing NFT details or upload
                      your own unique artwork.
                    </li>
                    <li>List your NFT at your preferred price.</li>
                    <li>Confirm the listing in one click.</li>
                    <li>
                      Earn & Give Back – Contribute at least 50% of the fund to
                      environmental causes while keeping the rest for yourself.
                    </li>
                    <li>Confirm the transaction in your wallet.</li>
                  </ol>
                </CardContent>
              </Card>
              <div className="text-sm text-muted-foreground">
                Note: A gas fee has to be paid for each transaction made.
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="impact">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              Track Your Environmental Impact
            </CardTitle>
            <CardDescription>
              See how your NFT trading contributes to environmental causes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-8 grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <TreePine className="h-10 w-10 text-green-500" />
                <div>
                  <h4 className="font-semibold">Trees Planted</h4>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <CircleDollarSign className="h-8 w-8 text-green-500" />
                <div>
                  <h4 className="font-semibold">Total Impact</h4>
                  <p className="text-2xl font-bold">$5,678</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg p-4">
              <h4 className="mb-4 text-xl font-semibold">
                Supported Organizations
              </h4>
              <div className="grid gap-6 md:grid-cols-3">
                {NGOS.map((org) => (
                  <Card key={org.id} className="p-4">
                    <CardHeader className="flex flex-row items-center gap-4 text-xl">
                      <Image
                        src={org.image}
                        alt={org.name}
                        width={60}
                        height={60}
                        className="rounded-full aspect-square"
                      />
                      <CardTitle>{org.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-md text-muted-foreground">
                        {org.focus}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

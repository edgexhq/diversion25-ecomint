/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TransactionsStep } from "@/components/transaction-step";
import { TreePlantingStep } from "@/components/tree-planting-step";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { addTree } from "@/actions/form";
import { nanoid } from "nanoid";
import { QRCodeSVG } from "qrcode.react";
import { upload } from "thirdweb/storage";
import html2canvas from "html2canvas";
import { client } from "@/lib/client";
import { useActiveAccount } from "thirdweb/react";
import { Loader } from "lucide-react";

const xd =
  "The Modern Earth God is a non-profit organization that plants trees and helps to reduce carbon emissions. Support them by planting a tree with them.";

const getRating = (amount: number): number => {
  if (amount > 0.00005) return 5;
  if (amount > 0.000001) return 4;
  if (amount > 0.0000005) return 3;
  if (amount > 0.0000001) return 2;
  if (amount > 0.00000005) return 1;
  return 0;
};

const steps = ["Transactions", "Tree Planting Details", "GWT"];

export default function StepWiseForm() {
  const account = useActiveAccount();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [customQR, setCustomQR] = useState("");
  const [formData, setFormData] = useState({
    transaction: {
      amount: "",
      transactionAddress: "",
      userWalletAddress: "",
      orgId: "",
      name: "",
      email: "",
      id: "",
    },
    tree: {
      name: "",
      species: "",
      latitude: "",
      longitude: "",
      plantedAt: new Date(),
      carbonOffset: 0,
      imgUrl: "",
      userWalletAddress: "",
    },
  });

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const [isMinting, setIsMinting] = useState(false);

  const handleMint = async () => {
    if (!account) {
      toast.error("Please connect your wallet to mint NFT");
      setIsMinting(false);
      return;
    }

    setCustomQR(nanoid());

    const element = document.getElementById("ai-image");
    if (!element) {
      throw new Error("Image container not found");
    }

    // Capture the entire div as an image
    const canvas = await html2canvas(element, { useCORS: true });
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((blob) => resolve(blob), "image/png")
    );

    if (!blob) {
      throw new Error("Error generating image blob");
    }

    const file = new File([blob], "nft-image.png", { type: "image/png" });

    const imageUri = await upload({
      client: client,
      files: [file],
    });

    if (!imageUri) {
      throw new Error("Error uploading image to IPFS");
    }

    const mintRes = await fetch("/api/mint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nftImage: imageUri,
        address: formData.transaction.userWalletAddress,
        name: `The Modern Earth God Lvl ${getRating(
          parseFloat(formData.transaction.amount)
        )}`,
        description: xd,
      }),
    });

    if (!mintRes.ok) {
      setIsMinting(false);
      throw new Error("Failed to mint NFT");
    }

    toast.success("NFT minted successfully");
    setCustomQR("");
    setIsMinting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      if (!formData.transaction || !formData.tree) {
        throw new Error("Please fill in all required fields");
      }

      const requiredTreeFields = [
        "name",
        "species",
        "latitude",
        "longitude",
        "carbonOffset",
        "imgUrl",
        "userWalletAddress",
      ] as const;

      for (const field of requiredTreeFields) {
        if (!formData.tree[field as keyof typeof formData.tree]) {
          throw new Error(`${field} is required`);
        }
      }

      const result = await addTree({
        tree: {
          ...formData.tree,
          plantedAt: new Date(),
          carbonOffset: Number(formData.tree.carbonOffset),
        },
        transaction: {
          id: formData.transaction.id,
          amount: formData.transaction.amount,
          transactionAddress: formData.transaction.transactionAddress,
          userWalletAddress: formData.transaction.userWalletAddress,
          name: formData.transaction.name,
          email: formData.transaction.email,
        },
        treePlantingOrgId: formData.transaction.orgId,
      });

      if (!result.success) {
        throw new Error(result.error);
      }
      if (result.data?.tree?.id) {
        toast.success("Tree planted successfully!");
        fetch("/api/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            certificateId: result.data.tree.id,
            email: formData.transaction.email,
            name: formData.tree.name,
            certificateUrl:
              "https://ecomintx.vercel.app/tree/" + result.data.tree.id,
            species: formData.tree.species,
            plantedDate: formData.tree.plantedAt.toISOString(),
            carbonOffset: formData.tree.carbonOffset,
          }),
        });
        router.push("/tree/" + result.data.tree.id);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to plant tree");
    } finally {
      setIsLoading(false);
    }
  };

  const rate = getRating(parseFloat(formData.transaction.amount));

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle className="mb-8">Tree Planting Form</CardTitle>
          <div className="flex gap-4 items-center my-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`flex items-center ${
                  index === currentStep
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <div
                  className={`size-8 rounded-full flex items-center justify-center border-2 ${
                    index === currentStep ? "border-primary" : "border-muted"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="ml-2">{step}</span>
                {index < steps.length - 1 && (
                  <div className="w-16 h-0.5 mx-2 bg-muted" />
                )}
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && (
                <TransactionsStep
                  formData={formData}
                  setFormData={setFormData}
                />
              )}
              {currentStep === 1 && (
                <TreePlantingStep
                  formData={formData}
                  setFormData={setFormData}
                />
              )}
              {currentStep === 2 && (
                <div className="flex my-8 flex-col items-center justify-center space-y-4">
                  <div className="flex gap-x-4 items-center justify-start space-y-4">
                    <div className="relative flex-1" id="ai-image">
                      {rate === 5 ? (
                        <img
                          src="/5.png"
                          alt="GWT"
                          className="max-w-80 w-full h-auto rounded-lg"
                        />
                      ) : rate === 4 ? (
                        <img
                          src="/4.png"
                          alt="GWT"
                          className="max-w-80 w-full h-auto rounded-lg"
                        />
                      ) : rate === 3 ? (
                        <img
                          src="/3.png"
                          alt="GWT"
                          className="max-w-80 w-full h-auto rounded-lg"
                        />
                      ) : rate === 2 ? (
                        <img
                          src="/2.png"
                          alt="GWT"
                          className="max-w-80 w-full h-auto rounded-lg"
                        />
                      ) : (
                        <img
                          src="/1.png"
                          alt="GWT"
                          className="max-w-80 w-full h-auto rounded-lg"
                        />
                      )}
                      <div className="absolute w-fit bottom-2 right-2">
                        <QRCodeSVG
                          value={customQR}
                          className="w-10 h-10 rounded-base"
                          fgColor="#ffffff"
                          bgColor="transparent"
                        />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col items-start justify-center space-y-4">
                      <h3 className="text-lg font-semibold">
                        The Modern Earth God Lvl{" "}
                        {getRating(parseFloat(formData.transaction.amount))}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        The Modern Earth God is a non-profit organization that
                        plants trees and helps to reduce carbon emissions.
                        Support them by planting a tree with them.
                      </p>
                      <Button
                        type="button"
                        onClick={handleMint}
                        disabled={isMinting}
                      >
                        Mint NFT{" "}
                        {isMinting && <Loader className="ml-2 animate-spin" />}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading}>
                Submit
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

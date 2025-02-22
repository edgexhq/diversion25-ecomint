"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Loader, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { client } from "@/lib/client";
import { upload } from "thirdweb/storage";
import { nanoid } from 'nanoid';
import { useActiveAccount } from "thirdweb/react";
import html2canvas from "html2canvas";

const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL!;

export default function CreateNFT() {
  const account = useActiveAccount();
  const [aiPrompt, setAiPrompt] = useState("");
  const [name, setName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isImageGenerated, setIsImageGenerated] = useState(false);
  const [image, setImage] = useState("");
  const [isMinting, setIsMinting] = useState(false);
  const [customQR, setCustomQR] = useState("");

  const handleGenerate = async () => {
    if (!prompt) {
      toast.error("Please enter a prompt to generate the image");
      return;
    }
    setIsGenerating(true);
    setIsImageGenerated(false);
    try {
      const res = await fetch(
        `${apiUrl}?prompt=${encodeURIComponent(
          aiPrompt
        )}&model=flux-schnell`,
        {
          method: "GET",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to generate image");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setImage(url);
      const uuid = nanoid();
      console.log(uuid);
      setCustomQR(uuid);
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      setIsGenerating(false);
      setIsImageGenerated(true);
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsMinting(true);

    if (!account) {
      toast.error("Please connect your wallet to mint NFT");
      setIsMinting(false);
      return;
    }

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
    setIsGenerating(false);
    const mintRes = await fetch("/api/mint-nft", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nftImage: imageUri,
        address: account!.address!,
        name: name,
        description: aiPrompt,
      }),
    });

    if (!mintRes.ok) {
      setIsMinting(false);
      throw new Error("Failed to mint NFT");
    }
    toast.success("NFT minted successfully");
    setAiPrompt("");
    setName("");
    setImage("");
    setCustomQR("");
    setIsMinting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 mt-6 max-w-5xl mx-auto w-full"
    >
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div className="w-full p-6 lg:p-8 space-y-6 flex flex-col justify-start mt-2">
            <div className="space-y-2">
              <Label htmlFor="name">NFT Name</Label>
              <Input
                placeholder="NFT Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-4"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                placeholder="Describe the NFT you want to create..."
                value={aiPrompt}
                name="description"
                onChange={(e) => setAiPrompt(e.target.value)}
                className="h-36 resize-none mt-4"
              />
            </div>
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !aiPrompt}
              className="w-full"
              variant="secondary"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Generate NFT
            </Button>
            {isImageGenerated && (
              <Button
                type="submit"
                className="w-full"
                variant="default"
                disabled={isGenerating || !name || !aiPrompt}
              >
                Create and List NFT{" "}
                {isMinting && <Loader className="ml-2 h-4 w-4 animate-spin" />}
              </Button>
            )}
          </div>
        </div>
        <div className="w-full p-6 lg:p-8 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={isGenerating ? "generating" : "result"}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="w-full relative max-w-xl aspect-square rounded-lg overflow-hidden bg-muted shadow-2xl"
              id="ai-image"
            >
              {isGenerating ? (
                <div className="w-full h-full flex items-center justify-center">
                  <Sparkles className="w-16 h-16 animate-pulse" />
                </div>
              ) : image ? (
                <>
                  <Image
                    width={400}
                    height={400}
                    src={image}
                    alt="Generated Image"
                    className="w-full h-full object-cover"
                    id="ai-image"
                  />
                  <div className="absolute w-fit bottom-2 right-2">
                    <QRCodeSVG
                      value={customQR}
                      className="w-10 h-10 rounded-base"
                      fgColor="#ffffff"
                      bgColor="transparent"
                    />
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-50 text-xl mont font-semibold">
                    No image generated
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
}
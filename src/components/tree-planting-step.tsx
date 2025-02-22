/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPlaceholder } from "@/components/mapform";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

export function TreePlantingStep({
  formData,
  setFormData,
}: {
  formData: any;
  setFormData: any;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      tree: {
        ...prev.tree,
        [name]: value,
      },
    }));
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsLoading(true);
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = async (event) => {
        const imgUrl = event.target?.result as string;

        try {
          const response = await fetch("/api/ai/vision", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ imgUrl }),
          });

          const data = await response.json();

          if (response.ok) {
            setFormData((prev: any) => ({
              ...prev,
              tree: {
                ...prev.tree,
                imgUrl: imgUrl,
                species: data.response.scientific_name,
                carbonOffset: data.response.co2_offset_per_year,
              },
            }));
          } else {
            console.error("Error from API:", data.error);
            toast.error("Failed to analyze image.");
          }
        } catch (error) {
          console.error("Error sending image to API:", error);
          toast.error("Failed to analyze image.");
        } finally {
          setIsLoading(false);
        }
      };

      reader.readAsDataURL(file);
    },
    [setFormData]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Tree Planting Details</h2>

      <div className="space-y-2">
        <Label>Tree Image</Label>
        <div
          {...getRootProps()}
          className={cn(
            "border-2 min-h-52 border-dashed rounded-2xl overflow-hidden text-center cursor-pointer",
            isDragActive ? "border-primary" : "border-muted",
            isLoading && " animate-pulse"
          )}
        >
          <input {...getInputProps()} />
          {formData.tree.imgUrl ? (
            <img
              src={formData.tree.imgUrl || "/placeholder.svg"}
              alt="Uploaded tree"
              className="w-full h-auto mx-auto"
            />
          ) : (
            <p className="text-muted-foreground pt-20 pb-10 px-10">
              {isDragActive
                ? "Drop the image here"
                : "Drag 'n' drop an image here, or click to select one"}
            </p>
          )}
          {isLoading && <p>Analyzing image...</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Tree Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.tree.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2 relative">
          <Label htmlFor="species">Species</Label>
          <Input
            id="species"
            name="species"
            value={formData.tree.species}
            onChange={handleInputChange}
            required
          />
          <Sparkles className="absolute right-2 bottom-2 text-primary fill-primary" />
        </div>
        <div className="space-y-2 relative">
          <Label htmlFor="carbonOffset">Carbon Offset (kg)</Label>
          <Input
            id="carbonOffset"
            name="carbonOffset"
            type="number"
            value={formData.tree.carbonOffset}
            onChange={handleInputChange}
            required
          />
          <Sparkles className="absolute right-2 bottom-2 text-primary fill-primary" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="userWalletAddress">User Wallet Address</Label>
          <Input
            id="userWalletAddress"
            name="userWalletAddress"
            value={formData.tree.userWalletAddress}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Planting Location</Label>
        <MapPlaceholder
          latitude={formData.tree.latitude}
          longitude={formData.tree.longitude}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
}

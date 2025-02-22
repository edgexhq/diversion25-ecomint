import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type React from "react";

interface TreePlantingFormProps {
  formData: {
    name: string;
    govId: string;
    address: string;
    wallet: string;
    plantingArea: string;
    image: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TreePlantingForm({
  formData,
  handleInputChange,
}: TreePlantingFormProps) {
  return (
    <div className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="name">Organization Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="govId">Government ID</Label>
        <Input
          id="govId"
          name="govId"
          value={formData.govId}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Organisation Logo</Label>
        <Input
          id="image"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="wallet">Wallet Address</Label>
        <Input
          id="wallet"
          name="wallet"
          placeholder="Join the network to get a wallet address using the Connect button"
          readOnly
          value={formData.wallet}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="plantingArea">Planting Area (in hectares)</Label>
        <Input
          id="plantingArea"
          name="plantingArea"
          value={formData.plantingArea}
          onChange={handleInputChange}
          required
        />
      </div>
    </div>
  );
}

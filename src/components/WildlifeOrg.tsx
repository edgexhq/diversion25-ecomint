import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type React from "react";

interface WildLifeOrgFormProps {
  formData: {
    name: string;
    govId: string;
    address: string;
    area: string;
    wallet: string;
    noOfAnimals: number;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function WildLifeOrgForm({
  formData,
  handleInputChange,
}: WildLifeOrgFormProps) {
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
        <Label htmlFor="area">Area</Label>
        <Input
          id="area"
          name="area"
          value={formData.area}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="wallet">Wallet Address</Label>
        <Input
          id="wallet"
          readOnly
          placeholder="Join the network to get a wallet address using the Connect button"
          name="wallet"
          value={formData.wallet}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="noOfAnimals">Number of Animals</Label>
        <Input
          id="noOfAnimals"
          name="noOfAnimals"
          type="number"
          value={formData.noOfAnimals}
          onChange={handleInputChange}
          required
        />
      </div>
    </div>
  );
}

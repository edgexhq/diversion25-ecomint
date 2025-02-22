"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TreePlantingForm from "@/components/treeOrgForm";
import { addTreePlantingOrg, getAccountFromAddress } from "@/actions/form";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { client } from "@/lib/client";
import { darkTheme, useActiveAccount } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { useRouter } from "next/navigation";

const ConnectButton = dynamic(
  () => import("thirdweb/react").then((mod) => mod.ConnectButton),
  { ssr: false }
);

const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "facebook"],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("app.phantom"),
  createWallet("com.binance"),
];

export default function NGORegistrationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    govId: "",
    address: "",
    wallet: "",
    plantingArea: "",
    treesPlanted: "",
    missionStatement: "",
    area: "",
    noOfAnimals: 0,
    image: "",
  });
  const accnt = useActiveAccount();

  useEffect(() => {
    if (!accnt?.address) return;
    if (accnt?.address) {
      const fetchData = async () => {
        const accntData = await getAccountFromAddress(accnt?.address);
        if (accntData?.success && accntData?.data) {
          router.push("/org");
        }
      };
      fetchData();
      setFormData((prevData) => ({ ...prevData, wallet: accnt.address }));
    }
  }, [accnt]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await addTreePlantingOrg({
        name: formData.name,
        govId: formData.govId,
        address: formData.address,
        wallet: formData.wallet,
        plantingArea: formData.plantingArea,
        image: formData.image,
      });
      if (result.success) {
        toast.success("Tree planting organization registered successfully!");
        router.push("/org");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto my-12 relative"
    >
      <Card>
        <CardHeader>
          <CardTitle>Registration Form</CardTitle>
          <CardDescription>
            Enter the details of your organization
          </CardDescription>
          <div className="md:absolute top-4 right-4">
            <ConnectButton
              client={client}
              wallets={wallets}
              theme={darkTheme({
                colors: {
                  accentText: "hsl(158.1 ,64.4% ,50%)",
                  accentButtonBg: "hsl(118, 100%, 63%)",
                  primaryButtonBg: "hsl(158.1 ,64.4%, 50%)",
                  accentButtonText: "hsl(0, 0%, 0%)",
                },
              })}
              connectModal={{
                size: "compact",
                title: "Register to EcoMint",
                showThirdwebBranding: false,
              }}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <TreePlantingForm
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </div>
          <Button
            type="submit"
            className="w-full mt-6"
            disabled={!accnt?.address}
          >
            Submit Registration
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}

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

const steps = ["Transactions", "Tree Planting Details"];

export default function StepWiseForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle className="mb-8">Tree Planting Form</CardTitle>
          <div className="flex gap-4 items-center my-4 justify-center">
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
            {currentStep === 0 ? (
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

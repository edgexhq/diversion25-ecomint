/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Download,
  Facebook,
  Linkedin,
  Loader,
  PhoneCall,
  TreePine,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import { cn } from "@/lib/utils";
import { instrumentSerif } from "@/lib/font";
import dynamic from "next/dynamic";
import { reverseGeocode } from "@/actions/location";
import { toast } from "sonner";
// @ts-expect-error aaaa
import html2pdf from "html2pdf.js";
import Link from "next/link";

const Treecertificate = ({
  details,
}: {
  details: {
    id: string;
    name: string;
    species: string;
    latitude: string;
    longitude: string;
    plantedAt: Date;
    treePlantingOrgId: string;
    treePlantingOrgWallet: string;
    carbonOffset: number;
    userWalletAddress: string;
    transactionId: string | null;
    imgUrl: string;
  };
}) => {
  const ReactMap = useMemo(
    () =>
      dynamic(() => import("@/components/ReactMap"), {
        loading: () => (
          <div className="size-full animate-pulse bg-slate-200 grid place-items-center">
            <Loader className="size-8 text-primary animate-spin" />
          </div>
        ),
        ssr: false,
      }),
    []
  );
  const certificateRef = useRef<HTMLDivElement>(null);

  const [treeLocation, setTreeLocation] = useState<string | undefined>();
  const shareText =
    `I just planted a ${details.species} tree. Check out my certificate! ` +
    `https://ecomintx.vercel.app/tree/${details.id}`;
  useEffect(() => {
    reverseGeocode(parseFloat(details.latitude), parseFloat(details.longitude))
      .then((location) => {
        console.log("Location:", location);
        setTreeLocation(location);
        toast.success("Location details fetched successfully");
      })
      .catch((err) => {
        console.error("Error reverse geocoding:", err);
        toast.error("Error fetching location details");
      });
  }, [details.latitude, details.longitude]);

  const geoapifyKey = process.env.NEXT_PUBLIC_GEOAPIFY_KEY;
  const staticMapUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&center=lonlat:${details.longitude},${details.latitude}&zoom=14&marker=lonlat:${details.longitude},${details.latitude};color:%23ff0000;size:small&apiKey=${geoapifyKey}`;

  const downloadAsPDF = async () => {
    if (!certificateRef.current) return;

    const opt = {
      margin: 1,
      filename: `Tree-Certificate-${details.id}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        onclone: (clonedDoc: Document) => {
          const interactiveMap = clonedDoc.getElementById("interactive-map");
          const staticMap = clonedDoc.getElementById("static-map");
          if (interactiveMap && staticMap) {
            interactiveMap.style.display = "none";
            staticMap.style.display = "block";
          }
        },
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    try {
      await html2pdf().set(opt).from(certificateRef.current).save();
      toast.success("Certificate downloaded successfully");
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast.error("Failed to generate PDF");
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Card
        ref={certificateRef}
        className="overflow-hidden bg-slate-50 text-gray-900 border-none"
      >
        <Fireworks
          decorateOptions={(options) => ({
            ...options,
            colors: [
              "#10B981",
              "#059669",
              "#047857",
              "#065F46",
              "#84CC16",
              "#65A30D",
              "#4D7C0F",
              "#14B8A6",
              "#0D9488",
              "#0F766E",
            ],
          })}
          autorun={{
            duration: 2222,
            speed: 2,
          }}
        />
        <CardHeader className="border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">
                Tree Planting Certificate
              </h1>
              <p className="text-sm text-slate-500">created by EcoMint</p>
            </div>
            <TreePine className="text-green-600" size={30} />
          </div>
        </CardHeader>

        <CardContent className="space-y-8 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg bg-green-100 p-4">
              <div className="rounded-full bg-green-100 p-2">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium">1 tree planted</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-4">
              <div className="rounded-full bg-blue-100 p-2">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium">
                  {details.carbonOffset} Kg of CO2 offset
                </p>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 my-4 grid-cols-1 sm:gap-0 gap-4">
            <div className="col-span-2 pt-6 flex flex-col gap-6">
              <div className="space-y-1">
                <h3>Tree planted by:</h3>
                <p className="text-green-600">{details.name}</p>
              </div>

              <div className="space-y-1">
                <h3>Species:</h3>
                <p
                  className={cn(
                    "text-green-600 italic tracking-wide text-2xl",
                    instrumentSerif.className
                  )}
                >
                  {details.species}
                </p>
              </div>
            </div>

            <img
              src={details.imgUrl}
              alt={`${details.species} tree`}
              width={500}
              height={500}
              className="mx-auto h-48 w-full rounded-lg object-cover col-span-1"
            />
          </div>
          <div className="grid sm:grid-cols-2 border-t border-slate-300 pt-10">
            <div className="space-y-2 pt-4">
              <h3 className="font-medium">Location:</h3>
              <p className="text-gray-600 tracking-tight pr-4">
                {treeLocation ? treeLocation : "Fetching location details..."}
              </p>
            </div>
            <div className="h-60 mt-4 sm:mt-0 w-full relative">
              <div id="interactive-map" className="h-full w-full">
                <ReactMap
                  center={[
                    parseFloat(details.latitude),
                    parseFloat(details.longitude),
                  ]}
                  isDraggable={false}
                  showCenter
                />
              </div>
              <img
                id="static-map"
                src={staticMapUrl}
                className="absolute inset-0 h-full w-full hidden object-cover"
                alt="Tree location"
              />
            </div>
          </div>

          <div className="rounded-lg border border-slate-300 p-4 mt-6 relative">
            <h3 className="mb-2 font-medium">Certificate Information:</h3>
            <div className="space-y-1 text-xs text-gray-600">
              <p>Tree Planting Organization ID: {details.treePlantingOrgId}</p>
              <p>
                Planted At:{" "}
                {details.plantedAt.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>
                Coordinates: {details.latitude.slice(0, 7)},{" "}
                {details.longitude.slice(0, 7)}
              </p>
            </div>
            <div className="absolute -top-3 right-6 size-36 flex rounded-full border-4 items-center justify-center border-green-700 p-2 cursor-pointer active:scale-110 transition-all duration-300 bg-slate-50">
              <div className="border-green-700 size-full border-2 rounded-full p-2 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 font-bold text-4xl bg-slate-50 px-2 py-1 border-2 border-dashed border-green-700 text-green-700">
                  Verified
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t border-green-200 bg-green-50 p-4 text-center text-xs text-gray-600">
          Copyright © 2025 EcoMint · Futuristic initiatives to save the Planet
          {" :) "}
        </CardFooter>
      </Card>

      <div className="my-10 flex justify-center gap-2">
        <Button onClick={downloadAsPDF} className="gap-2">
          <Download className="size-4" />
          Download PDF Certificate
        </Button>

        <Link
          href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
          passHref
          target="_blank"
        >
          <Button className="bg-green-600 hover:bg-green-700">
            <PhoneCall className="size-4 mr-2" />
            WhatsApp
          </Button>
        </Link>

        <Link
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
          )}`}
          passHref
          target="_blank"
        >
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Twitter className="size-4 mr-2" />
            Twitter
          </Button>
        </Link>

        <Link
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            `https://ecomintx.vercel.app/tree/${details.id}`
          )}`}
          passHref
          target="_blank"
        >
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Facebook className="size-4 mr-2" />
            Facebook
          </Button>
        </Link>

        <Link
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            `https://ecomintx.vercel.app/tree/${details.id}`
          )}&summary=${encodeURIComponent(shareText)}`}
          passHref
          target="_blank"
        >
          <Button className="bg-blue-700 hover:bg-blue-800">
            <Linkedin className="size-4 mr-2" />
            LinkedIn
          </Button>
        </Link>
      </div>

      <Link href={`/ai-bot?t=${details.id}`}>
        <Button className="bg-green-600 hover:bg-green-700">
          Chat with EcoBot 🍀🤖
        </Button>
      </Link>
    </div>
  );
};

export default Treecertificate;

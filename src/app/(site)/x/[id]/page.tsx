"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
import {
  MapPin,
  Calendar,
  Sprout,
  Clover,
  Loader,
  MapPinned,
  Leaf,
} from "lucide-react";
import { reverseGeocode } from "@/actions/location";
import { toast } from "sonner";
import dynamic from "next/dynamic";

const TreeDetailsPage = ({}) => {
  const {
    userName,
    name,
    species,
    image,
    carbonOffset,
    plantedAt,
    latitude,
    longitude,
    treePlantingOrgId,
  } = {
    name: "Tree Name",
    userName: "User Name",
    species: "Tree Species",
    image: "/tree.jpg",
    carbonOffset: 1000,
    plantedAt: new Date("2021-09-01"),
    latitude: "17.385",
    longitude: "78.4867",
    treePlantingOrgId: "org_123",
  };

  const [treeLocation, setTreeLocation] = useState<string | undefined>();

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

  const geoapifyKey = process.env.NEXT_PUBLIC_GEOAPIFY_KEY;
  const staticMapUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&center=lonlat:${longitude},${latitude}&zoom=14&marker=lonlat:${longitude},${latitude};color:%23ff0000;size:small&apiKey=${geoapifyKey}`;

  useEffect(() => {
    reverseGeocode(parseFloat(latitude), parseFloat(longitude))
      .then((location) => {
        console.log("Location:", location);
        setTreeLocation(location);
        toast.success("Location details fetched successfully");
      })
      .catch((err) => {
        console.error("Error reverse geocoding:", err);
        toast.error("Error fetching location details");
      });
  }, [latitude, longitude]);

  return (
    <>
      <h1 className="text-5xl mt-16 text-center bg-gradient-to-b from-green-200 via-green-500 to-green-800 bg-clip-text text-transparent font-semibold">
        Tree Details
      </h1>
      <div className="min-h-screen py-16 px-10 md:px-48 grid grid-cols-1 md:grid-cols-2 gap-5 overflow-x-hidden">
        {/* Hero Section */}
        <div className="h-96 w-104 rounded-lg overflow-hidden border border-primary-foreground p-4 shadow-[inset_0_3px_8px_rgba(0,255,128,0.2),inset_0_-3px_8px_rgba(0,255,128,0.15)] hover:shadow-[inset_0_4px_12px_rgba(0,255,128,0.25),inset_0_-4px_12px_rgba(0,255,128,0.2)]">
          <Image
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-lg"
            width={300}
            height={400}
          />
        </div>

        {/* Details Section */}
        <Card className="group bg-secondary/20 shadow-[inset_0_3px_8px_rgba(0,255,128,0.2),inset_0_-3px_8px_rgba(0,255,128,0.15)] hover:shadow-[inset_0_4px_12px_rgba(0,255,128,0.25),inset_0_-4px_12px_rgba(0,255,128,0.2)] relative">
          <CardContent className="p-6">
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <Badge className=" px-3 py-1 rounded-full">{species}</Badge>
                <div>
                  <span className="text-md flex justify-end">
                    <Leaf className="w-5 h-5 mr-2 text-primary" />
                    <span className="text-muted-foreground/75">
                      CO<sub>2</sub> Offset:{" "}
                      <span className="">{carbonOffset} kg</span>
                    </span>
                  </span>
                </div>
              </div>
              <div className="flex items-center mt-5">
                <Sprout className="w-20 h-20 fill-primary stroke-primary text-center mx-auto sprout-glow" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mt-8">{name}</h2>
            <div className="my-5 flex flex-col text-center">
              <span className="mt-2 text-muted-foreground/75 text-md">
                Tree Planted By: <span className="">{userName}</span>
              </span>
            </div>

            <div className="flex items-center text-muted-foreground/75">
              <Calendar className="w-5 h-5 mr-2 text-primary" />
              <span>
                Planted on:{" "}
                <span>
                  {plantedAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </span>
            </div>

            <div className="flex items-center text-muted-foreground/75 mt-5">
              <Clover className="w-5 h-5 mr-2 text-primary" />
              <span>
                Tree Planting Organization ID: <span>{treePlantingOrgId}</span>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Impact Section */}
        <Card className="group bg-secondary/20 shadow-[inset_0_3px_8px_rgba(0,255,128,0.2),inset_0_-3px_8px_rgba(0,255,128,0.15)] hover:shadow-[inset_0_4px_12px_rgba(0,255,128,0.25),inset_0_-4px_12px_rgba(0,255,128,0.2)] h-88 ">
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <MapPin className="w-7 h-7 mr-2 text-primary" />
              <h1 className="font-bold text-2xl">Planted At</h1>
            </div>
            <span className="text-muted-foreground/75 text-center mt-6">
              {treeLocation ? treeLocation : "Fetching location details..."}
            </span>
            <Image
              src="/tree-badge.png"
              alt="tree-badge"
              width={160}
              height={160}
              className="mt-2"
            />
          </CardContent>
        </Card>

        {/* Map Section */}
        <div className="rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-center mb-7">
            <MapPinned className="w-7 h-7 mr-2 text-primary" />
            <h2 className="text-2xl font-bold">Tree Location</h2>
          </div>
          <div className="h-60 mt-4 sm:mt-0 w-full relative">
            <div id="interactive-map" className="h-full w-full">
              <ReactMap
                center={[parseFloat(latitude), parseFloat(longitude)]}
                isDraggable={false}
                showCenter
              />
            </div>
            <Image
              id="static-map"
              src={staticMapUrl}
              className="absolute inset-0 h-full w-full hidden object-cover"
              alt="Tree location"
              width={600}
              height={400}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TreeDetailsPage;

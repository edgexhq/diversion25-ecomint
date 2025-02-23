"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import { Badge } from "../ui/badge";
import { Tree } from "@prisma/client";
import { reverseGeocode } from "@/actions/location";
import { toast } from "sonner";
import Link from "next/link";

const Card: React.FC<Tree> = ({
  id,
  name,
  imgUrl,
  latitude,
  longitude,
  species,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      cardRef.current.style.setProperty("--xPos", `${x}px`);
      cardRef.current.style.setProperty("--yPos", `${y}px`);
    }
  };

  const [treeLocation, setTreeLocation] = useState<string | undefined>();

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
    <div
      ref={cardRef}
      className={`flex flex-col relative w-[298px] h-[360px] rounded-[14px] transition-all duration-700 ease-in-out cursor-pointer ${
        isHovered
          ? "bg-[radial-gradient(100rem_circle_at_var(--xPos)_var(--yPos),rgba(254,254,254,1),transparent_10%)]"
          : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute inset-0 rounded-[14px] bg-[radial-gradient(1000px_circle_at_var(--xPos)_var(--yPos),rgba(52,211,153,0.3),transparent_30%)] opacity-0 transition-opacity duration-150 ease-in-out"
        style={{ opacity: isHovered ? 1 : 0 }}
      />
      <div className="flex flex-col h-full p-6 rounded-[14px] border border-[#ffffff20] transition-all duration-300 bg-card dark:bg-gradient-to-br dark:from-[#010101] dark:to-[#0a0a0a] shadow-[inset_0_3px_8px_rgba(0,255,128,0.2),inset_0_-3px_8px_rgba(0,255,128,0.15)] hover:shadow-[inset_0_4px_12px_rgba(0,255,128,0.25),inset_0_-4px_12px_rgba(0,255,128,0.2)]">
        <div className="flex flex-col">
          <Image
            src={imgUrl || "/tree.jpg"}
            alt={name}
            className="w-full h-[180px] object-cover rounded-md"
            width={140}
            height={140}
          />
        </div>
        <div className="flex flex-col">
          <div className="text-muted-foreground text-[11px] mt-2">
            <Badge className="rounded-full text-[11px] border border-green-700 bg-transparent text-muted-foreground">
              {species}
            </Badge>
          </div>
          <h2 className="text-lg text-center mt-5">{name}</h2>
          <p className="text-sm text-muted-foreground mt-2 text-center flex justify-center items-center">
            Location:{" "}
            <span className="line-clamp-1">
              {treeLocation ? treeLocation : "Fetching location details..."}
            </span>
          </p>

          <Button
            variant={"outline"}
            className="rounded-full bg-[#d3f7d9] hover:bg-[#c0f9c9] dark:hover:bg-[#121f14] dark:bg-[#1b2d1e] z-50 mt-6 w-fit px-6 mx-auto"
          >
            <Link href={`/details/${id}`}>
              Know more
              {/* <FireAnimation /> */}
            </Link>
            <Leaf className="fill-lime-400 stroke-lime-400 ml-4 leaf-glow" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const MissionCards = ({ cards }: { cards: Tree[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-16 justify-center my-[100px] justify-items-center max-w-7xl mx-auto">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`transition-opacity duration-300 ${
            hoveredIndex !== null && hoveredIndex !== index ? "opacity-20" : ""
          }`}
          onMouseEnter={() => setHoveredIndex(null)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Card {...card} />
        </div>
      ))}
    </div>
  );
};

export default MissionCards;

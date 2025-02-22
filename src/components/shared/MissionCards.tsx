"use client";

import type React from "react";
import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
// import FireAnimation from "@/components/shared/FireAnimation";
import { Leaf, MapPin } from "lucide-react";
import { Badge } from "../ui/badge";

interface CardProps {
  species: string;
  title: string;
  imageSrc: string;
  location: string;
}

const Card: React.FC<CardProps> = ({ title, imageSrc }) => {
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
      <div className="flex flex-col h-full p-6 rounded-[14px] border border-[#ffffff20] transition-all duration-300 bg-gradient-to-br from-[#010101] to-[#0a0a0a] shadow-[inset_0_3px_8px_rgba(0,255,128,0.2),inset_0_-3px_8px_rgba(0,255,128,0.15)] hover:shadow-[inset_0_4px_12px_rgba(0,255,128,0.25),inset_0_-4px_12px_rgba(0,255,128,0.2)]">
        <div className="flex flex-col">
          <Image
            src={imageSrc || "/tree.jpg"}
            alt={title}
            className="w-full h-[180px] object-cover rounded-md"
            width={140}
            height={140}
          />
        </div>
        <div className="flex flex-col">
          <div className="text-muted-foreground text-[11px] mt-2">
            <Badge className="rounded-full text-[11px] border border-green-700 bg-transparent text-muted-foreground">
              Species
            </Badge>
          </div>
          <h2 className="text-lg text-white text-center mt-5">{title}</h2>
          <p className="text-sm text-muted-foreground mt-2 text-center flex justify-center items-center">
            <MapPin className="w-4 h-4 inline-block mr-1" />
            Location: Hyderabad
          </p>
          <Button
            className={`flex w-48 z-50 mx-auto mt-6 border border-green-900 items-center rounded-full gap-1 text-sm font-medium text-white cursor-pointer transition-all duration-300 ease-in-out bg-[#1b2d1e] hover:bg-[#083302]${
              isHovered ? " text-[#3cff1e]" : " hover:bg-[#3cff1e20]"
            }`}
          >
            Know more
            {/* <FireAnimation /> */}
            <Leaf className="fill-lime-400 stroke-lime-400 ml-4 leaf-glow" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const MissionCards: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const cards: CardProps[] = [
    {
      species: "Mission 1/3",
      title: "Physical Missions",
      location: "Hyderabad",
      imageSrc: "/tree.jpg",
    },
    {
      species: "Mission 2/3",
      title: "Virtual Missions",
      location: "Hyderabad",
      imageSrc: "/tree.jpg",
    },
    {
      species: "Mission 3/3",
      title: "On Demand Missions",
      location: "Hyderabad",
      imageSrc: "/tree.jpg",
    },
    {
      species: "Mission 3/3",
      title: "On Demand Missions",
      location: "Hyderabad",
      imageSrc: "/tree.jpg",
    },
    {
      species: "Mission 3/3",
      title: "On Demand Missions",
      location: "Hyderabad",
      imageSrc: "/tree.jpg",
    },
  ];

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

"use client";

import Image from "next/image";
import bg from "@/assets/Leonardo_Phoenix_10_a_breathtakingly_vivid_3D_render_of_a_drea_1.jpg";
import bg1 from "@/assets/Leonardo_Phoenix_10_a_stunningly_detailed_3d_render_of_a_seren_1(2).jpg";
import bg2 from "@/assets/Leonardo_Phoenix_10_a_breathtakingly_vivid_3D_render_of_a_drea_1(1).jpg";
import bg3 from "@/assets/Leonardo_Phoenix_10_a_breathtakingly_vivid_3D_render_of_a_drea_2.jpg";
import bg4 from "@/assets/Leonardo_Phoenix_10_a_breathtakingly_vivid_3D_render_of_a_drea_2(1).jpg";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { instrumentSerif } from "@/lib/font";
import { Button } from "./ui/button";
import Link from "next/link";
import TextRotate from "@/fancy/components/text/text-rotate";

const RegisterForTree = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [bg, bg1, bg2, bg3, bg4];
  const texts = [
    "Tree Planting Organization",
    "Non Profit Organization",
    "Wildlife Conservation Organization",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex w-full mx-auto overflow-hidden rounded-[50px] items-center justify-center min-h-dvh">
      <div className="absolute inset-0 size-full bg-gradient-to-b dark:from-black/10 dark:via-black/30 dark:to-black/5 from-white/20 via-white/40 to-white/10 z-10"></div>

      <div className="relative z-20 text-black dark:text-white text-5xl md:text-7xl text-center max-w-7xl mx-auto">
        <h1 className={cn(instrumentSerif.className, "tracking-tight mb-10")}>
          Are you a{" "}
          <TextRotate
            texts={texts}
            mainClassName="inline-block italic tracking-tighter pl-2 pr-"
            staggerFrom={"first"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 400,
              delay: 0.5,
            }}
            rotationInterval={3000}
          />
          ?
        </h1>

        <Link href="/register">
          <Button size={"lg"}>Register now!</Button>
        </Link>
      </div>
      {images.map((img, index) => (
        <Image
          key={index}
          src={img}
          alt={`Background ${index + 1}`}
          placeholder="blur"
          width={1400}
          height={900}
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-1000",
            currentImageIndex === index ? "opacity-100" : "opacity-0"
          )}
        />
      ))}
    </section>
  );
};

export default RegisterForTree;

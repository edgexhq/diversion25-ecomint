"use client";
import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { getTrees } from "@/actions/tree";
import { Tree } from "@prisma/client";

const Cobe = () => {
  const [trees, setTrees] = useState<Tree[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const focusRef = useRef<[number, number]>([0, 0]);

  const locationToAngles = (lat: number, long: number) => [
    Math.PI - ((long * Math.PI) / 180 - Math.PI / 2),
    (lat * Math.PI) / 180,
  ];

  useEffect(() => {
    const fetchTrees = async () => {
      const fetchedTrees = await getTrees();
      setTrees(fetchedTrees);
    };
    fetchTrees();
  }, []);

  useEffect(() => {
    let width = 0;
    let currentPhi = 0;
    let currentTheta = 0;
    const doublePi = Math.PI * 2;

    const onResize = () => {
      if (canvasRef.current) width = canvasRef.current.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: [0.3137, 0.5686, 0.0784],
      glowColor: [0.5, 0.7, 0.1],
      markerColor: [251 / 255, 200 / 255, 21 / 255],

      markers: [
        { location: [22.5726, 88.3639], size: 0.1 }, // Kolkata
        { location: [-33.9249, 18.4241], size: 0.1 }, // Cape Town
        { location: [-1.2921, 36.8219], size: 0.1 }, // Nairobi
        { location: [-23.5505, -46.6333], size: 0.1 }, // São Paulo
        ...trees.map((tree) => ({
          location: [parseFloat(tree.latitude), parseFloat(tree.longitude)] as [
            number,
            number
          ],
          size: 0.07,
        })),
      ],

      onRender: (state) => {
        state.phi = currentPhi;
        state.theta = currentTheta;

        const [focusPhi, focusTheta] = focusRef.current;
        const distPositive = (focusPhi - currentPhi + doublePi) % doublePi;
        const distNegative = (currentPhi - focusPhi + doublePi) % doublePi;

        currentPhi +=
          (distPositive < distNegative ? distPositive : -distNegative) * 0.08;
        currentTheta = currentTheta * 0.92 + focusTheta * 0.08;

        state.width = width * 2;
        state.height = width * 2;
      },
    });

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    }, 300);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [trees]);

  return (
    <div className="w-full max-w-[600px] aspect-square mx-auto relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-0 transition-opacity duration-1000"
        style={{ contain: "layout paint size" }}
      />
      <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-4 mt-4">
        <span className="text-foreground/80">Go to:</span>
        {[
          { name: "Kolkata", coords: [22.5726, 88.3639] },
          { name: "Cape Town", coords: [-33.9249, 18.4241] },
          { name: "Nairobi", coords: [-1.2921, 36.8219] },
          { name: "São Paulo", coords: [-23.5505, -46.6333] },
        ].map((city) => (
          <Button
            key={city.name}
            variant="ghost"
            size="sm"
            onClick={() =>
              (focusRef.current = locationToAngles(
                city.coords[0],
                city.coords[1]
              ) as [number, number])
            }
          >
            📍 {city.name}
          </Button>
        ))}

        {trees.map((tree) => (
          <Button
            key={tree.id}
            variant="ghost"
            size="sm"
            onClick={() =>
              (focusRef.current = locationToAngles(
                parseFloat(tree.latitude),
                parseFloat(tree.longitude)
              ) as [number, number])
            }
          >
            🌳 {tree.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Cobe;

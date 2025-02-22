"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Cloud, Download, Moon, Star, Sun } from "lucide-react";
import Image from "next/image";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import { cn } from "@/lib/utils";
import html2canvas from "html2canvas";

export default function Certificate({
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
}) {
  const [isNight, setIsNight] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hours = new Date().getHours();
    setIsNight(hours < 6 || hours >= 18);
  }, []);

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    try {
      setIsDownloading(true);

      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,

        useCORS: true,
      });

      const dataUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.download = `tree-certificate-${details.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error generating certificate:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
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
        className="absolute inset-0 size-full z-0"
        autorun={{ delay: 1000, duration: 2222, speed: 2 }}
      />
      <div className="relative w-full flex items-center justify-center">
        <motion.div
          ref={certificateRef}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`relative w-full max-w-6xl overflow-hidden rounded-2xl p-8 border pb-20 pt-32 shadow-xl`}
        >
          <Image
            src={
              !isNight ? "/tree-certificate.jpg" : "/tree-certificate-night.jpg"
            }
            alt="Certificate"
            className="object-cover size-full absolute inset-0 "
            width={1000}
            height={600}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${
              isNight
                ? "from-slate-950/40 to-slate-950"
                : "from-yellow-50/40 to-yellow-50/40"
            } via-transparent opacity-50`}
          ></div>
          {isNight && (
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-white"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: Math.random() * 0.5 }}
                />
              ))}
            </div>
          )}

          {/* Sun/Moon */}
          <div className="absolute right-64 top-12">
            {isNight ? (
              <Moon
                size={64}
                className="text-blue-100 stroke-none moon-glow fill-blue-100"
              />
            ) : (
              <Sun
                size={64}
                className="fill-yellow-400 text-yellow-400 sun-glow"
              />
            )}
          </div>

          {/* Clouds */}
          <div
            className={`absolute left-12 top-12 ${
              isNight ? "text-gray-400/30" : "text-white"
            }`}
          >
            <Cloud size={48} className="fill-current" />
          </div>

          <div
            className={`absolute right-24 top-20 ${
              isNight ? "text-gray-400/30" : "text-white"
            }`}
          >
            <Cloud size={32} className="fill-current" />
          </div>

          {/* Certificate Content */}
          <div className="relative z-10 text-center">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`mb-2 text-6xl font-bold ${
                isNight ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Certificate
            </motion.h1>
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`mb-12 text-xl uppercase tracking-widest ${
                isNight ? "text-gray-200" : "text-gray-700"
              }`}
            >
              FOR PLANTING A TREE
            </motion.h2>
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={isNight ? "text-gray-300" : "text-gray-700"}
            >
              THIS CERTIFICATE IS PROUDLY PRESENTED TO
            </motion.p>
            <motion.h3
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={`mb-4 my-2 text-4xl tracking-tight font-bold ${
                isNight ? "text-gray-100" : "text-gray-800"
              }`}
            >
              {details.name}
            </motion.h3>
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className={`mx-auto mb-12 max-w-2xl ${
                isNight ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat.
            </motion.p>

            <div className="flex justify-around w-full mt-28">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center"
              >
                <p
                  className={cn(
                    isNight ? "text-gray-100" : "text-gray-900",
                    "font-semibold"
                  )}
                >
                  {details.id}
                </p>
                <div
                  className={`mb-2 w-48 border-b ${
                    isNight ? "border-gray-300" : "border-gray-700"
                  }`}
                />
                <p className={isNight ? "text-gray-300" : "text-gray-700"}>
                  CERTIFICATE NO.
                </p>
              </motion.div>

              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.7 + i * 0.1,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                  >
                    <Star
                      className={`h-8 w-8 ${
                        isNight
                          ? "fill-blue-200 text-blue-200 moon-glow"
                          : "fill-yellow-400 text-yellow-400 sun-glow"
                      }`}
                    />
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center"
              >
                <p
                  className={cn(
                    isNight ? "text-gray-100" : "text-gray-900",
                    "font-semibold"
                  )}
                >
                  {details.treePlantingOrgId}
                </p>
                <div
                  className={`mb-2 w-48 border-b ${
                    isNight ? "border-gray-300" : "border-gray-700"
                  }`}
                />
                <p className={isNight ? "text-gray-300" : "text-gray-700"}>
                  ISSUER ID
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={downloadCertificate}
          disabled={isDownloading}
          className={cn(
            "absolute bottom-8 right-8 flex items-center gap-2 rounded-lg px-4 py-2 text-white transition-colors",
            isNight
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-green-600 hover:bg-green-700",
            isDownloading && "opacity-50 cursor-not-allowed"
          )}
        >
          <Download size={20} />
          {isDownloading ? "Downloading..." : "Download"}
        </motion.button>
      </div>
    </div>
  );
}

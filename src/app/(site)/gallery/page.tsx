import React from "react";
import MissionCards from "@/components/shared/MissionCards";

function Gallery() {
  return (
    <div className="w-full pt-10 md:pt-16 px-4 md:px-8 overflow-x-hidden">
      <h1 className="text-3xl sm:text-4xl md:text-5xl mt-3 sm:mt-5 text-center bg-gradient-to-b from-green-100 via-green-300 to-green-600 bg-clip-text text-transparent font-semibold">
        Welcome to Our Gallery
      </h1>
      <p className="text-center text-muted-foreground mt-3 sm:mt-5 text-sm sm:text-base md:text-lg">
        Each tree here stands as a living tribute to a cherished name.
      </p>
      <main className="min-h-screen mt-5">
        <MissionCards />
      </main>
    </div>
  );
}

export default Gallery;

import React from "react";

import dynamic from "next/dynamic";

const Cobe = dynamic(() => import("@/components/magicui/cobe-globe"));

const MemoCobe = React.memo(Cobe);

const World = () => {
  return (
    <div className="min-h-screen pt-10">
      <div className="bg-gradient-to-b from-background to-primary/10 max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 rounded-[50px]">
        <h1 className="mx-auto text-3xl tracking-tighter md:text-5xl font-semibold text-center bg-gradient-to-t from-foreground to-foreground/50 via-foreground/90 bg-clip-text text-transparent">
          Make the world a better place <br /> one{" "}
          <span className="text-primary">Tree</span> at a time!
        </h1>
        <MemoCobe />
      </div>
    </div>
  );
};

export default World;

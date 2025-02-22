import { Button } from "@/components/ui/button";
import { Leaf, TreePine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import tree1 from "@/assets/Majestic Tree With Intricate Branches And Lush Foliage.png";
import tree2 from "@/assets/generated-image(9).png";

export function Hero() {
  return (
    <section className="relative px-6 py-32 min-h-svh flex flex-col items-center justify-center text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary mb-8 animate-fade-in">
        <TreePine className="size-4" />
        <span className="text-sm font-medium">MINT NFTs, PLANT TREES</span>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl leading-tight">
        Transform Your Art into{" "}
        <span className="bg-gradient-to-r from-emerald-400 to-primary text-transparent bg-clip-text">
          Environmental Impact
        </span>
      </h1>

      <p className="text-muted-foreground max-w-2xl mb-12 text-lg">
        Join the revolution where creativity meets conservation. Create
        AI-powered NFTs and automatically contribute 50% to global reforestation
        efforts and environmental NGOs.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Link href="/create-nft">
          <Button size={"lg"}>
            Start Creating
            <Leaf className="size-5 ml-2 group-hover:rotate-12 transition-transform" />
          </Button>
        </Link>
        <Button
          size={"lg"}
          variant="outline"
          className="text-primary border-primary/50 hover:bg-primary/10"
        >
          View Impact Dashboard
        </Button>
      </div>

      <div className="mt-16 flex items-center gap-8 text-muted-foreground">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-primary">50K+</span>
          <span className="text-sm">Trees Planted</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-primary">$2M+</span>
          <span className="text-sm">Environmental Impact</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-primary">10K+</span>
          <span className="text-sm">NFTs Created</span>
        </div>
      </div>

      <Image
        src={tree1}
        alt="Tree"
        placeholder="blur"
        width={400}
        height={900}
        className="absolute bottom-0 right-0 z-20"
      />
      <div className="absolute bottom-10 right-5 z-0 bg-green-500/80 blur-3xl rounded-full size-40"></div>
      <Image
        src={tree2}
        alt="Tree"
        placeholder="blur"
        width={400}
        height={900}
        className="absolute bottom-0 left-0 z-20"
      />
      <div className="absolute bottom-20 left-10 z-0 bg-green-500/80 blur-3xl rounded-full size-40"></div>
    </section>
  );
}

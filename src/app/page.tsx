import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { Navigation } from "@/components/navigation";
import AnimatedLogoCloud from "@/components/partners";
import RegisterForTree from "@/components/RegisterForTree";
import World from "@/components/world";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br via-primary/15">
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse delay-700" />
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <RegisterForTree />
        <World />
        <Features />
        <AnimatedLogoCloud />
      </div>
    </main>
  );
}

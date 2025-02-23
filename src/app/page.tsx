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
      <footer className="relative z-10 py-8 mt-20 border-t border-gray-200 dark:border-gray-800">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} EcoMint. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-all"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-all"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-all"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

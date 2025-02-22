import { Palette, Leaf, LineChart, Store, Heart, TreePine } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: <Palette className="size-6" />,
    title: "AI-Powered NFT Creation",
    description:
      "Create unique, environmentally-themed NFT artwork using our advanced AI models trained on nature-inspired art",
  },
  {
    icon: <Leaf className="size-6" />,
    title: "Eco-Friendly Blockchain",
    description:
      "Mint NFTs on our energy-efficient blockchain, consuming 99.9% less energy than traditional networks",
  },
  {
    icon: <LineChart className="size-6" />,
    title: "Impact Dashboard",
    description:
      "Track your environmental impact in real-time with detailed metrics on carbon offset and trees planted",
  },
  {
    icon: <Store className="size-6" />,
    title: "Dynamic NFT Marketplace",
    description:
      "Buy, sell, and auction your eco-conscious NFTs in our dedicated marketplace with live bidding",
  },
  {
    icon: <Heart className="size-6" />,
    title: "Customizable Donations",
    description:
      "Choose which environmental initiatives receive your contribution with transparent fund allocation",
  },
  {
    icon: <TreePine className="size-6" />,
    title: "Tree Plantation Tracking",
    description:
      "Monitor the growth and location of trees planted through your NFT sales with satellite imagery",
  },
];

export function Features() {
  return (
    <section id="features" className="px-6 py-36 min-h-screen">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Empowering Features
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our platform combines cutting-edge AI technology with environmental
          consciousness, providing you with powerful tools to create meaningful
          impact through digital art.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-lg text-primary bg-primary/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

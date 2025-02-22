import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Palette, ShoppingCart } from "lucide-react";

export default function Cards() {
  return (
    <div className="grid gap-4 md:grid-cols-3 text-left">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-7 w-7" />
            <div className="text-xl">Create</div>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          Mint unique NFTs and showcase your digital art while supporting
          environmental causes.
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-7 w-7" />
            <div className="text-xl">Trade</div>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          Buy and sell NFTs in our marketplace with transparent impact tracking.
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-7 w-7" />
            <div className="text-xl">Impact</div>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          Track your impact as 50% of proceeds support green initiatives and
          wildlife conservation.
        </CardContent>
      </Card>
    </div>
  );
}

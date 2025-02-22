"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TreesPlantedChart } from "@/components/trees-planted-chart";
import { FundsReceivedChart } from "@/components/funds-received-chart";
import { SummaryStats } from "@/components/summary-stats";
import { PlantingMap } from "@/components/planting-map";
import { RecentActivities } from "@/components/recent-activities";
import dynamic from "next/dynamic";

const TreeBanner = dynamic(() => import("@/components/TreeBanner"), {
  loading: () => <div>Loading...</div>,
});

export default function Dashboard() {
  return (
    <div className="p-8 min-h-screen">
      <TreeBanner />
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <SummaryStats />
      </div>
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Trees Planted Over Time</CardTitle>
            <CardDescription>Monthly tree planting progress</CardDescription>
          </CardHeader>
          <CardContent>
            <TreesPlantedChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Funds Received</CardTitle>
            <CardDescription>Monthly donations and grants</CardDescription>
          </CardHeader>
          <CardContent>
            <FundsReceivedChart />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Planting Locations</CardTitle>
            <CardDescription>Global view of our impact</CardDescription>
          </CardHeader>
          <CardContent>
            <PlantingMap />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates from the field</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivities />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TreesIcon as Tree, DollarSign, Users, Plus } from "lucide-react";
import Link from "next/link";

const stats = [
  {
    title: "Total Trees Planted",
    value: "1,234,567",
    icon: Tree,
    color: "text-green-600",
  },
  {
    title: "Funds Raised",
    value: "$5,678,901",
    icon: DollarSign,
    color: "text-blue-600",
  },
  {
    title: "Volunteers",
    value: "10,234",
    icon: Users,
    color: "text-yellow-600",
  },
];

export function SummaryStats() {
  return (
    <>
      <Link href="/org/add-tree">
        <Card className="bg-primary shadow-lg text-green-800 shadow-primary/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold">Add Tree</CardTitle>
            <Plus className="size-6" />
          </CardHeader>
          <CardContent>
            <div className="text-xs">Add tree and generate certificate</div>
          </CardContent>
        </Card>
      </Link>
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

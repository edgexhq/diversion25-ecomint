"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", funds: 40000 },
  { month: "Feb", funds: 30000 },
  { month: "Mar", funds: 50000 },
  { month: "Apr", funds: 27800 },
  { month: "May", funds: 18900 },
  { month: "Jun", funds: 23900 },
  { month: "Jul", funds: 34900 },
];

export function FundsReceivedChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "0.5rem",
          }}
        />
        <Bar dataKey="funds" fill="hsl(var(--chart-1))" />
      </BarChart>
    </ResponsiveContainer>
  );
}

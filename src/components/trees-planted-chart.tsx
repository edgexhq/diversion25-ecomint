"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", trees: 4000 },
  { month: "Feb", trees: 3000 },
  { month: "Mar", trees: 5000 },
  { month: "Apr", trees: 2780 },
  { month: "May", trees: 1890 },
  { month: "Jun", trees: 2390 },
  { month: "Jul", trees: 3490 },
];

export function TreesPlantedChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "0.5rem",
          }}
        />

        <Line type="natural" dataKey="trees" stroke="#059669" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type TrendChartProps = {
  title: string;
  data: { week: string; value: number }[];
};

export default function TrendChart({ title, data }: TrendChartProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Title */}
      <div
        style={{
          marginBottom: "0.75rem",
          fontWeight: 600,
          fontSize: "0.9rem",
          color: "var(--mc-text-primary)",
          letterSpacing: "0.02em",
        }}
      >
        {title}
      </div>

      {/* Chart */}
      <div style={{ flex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
          >
            {/* Subtle grid */}
            <CartesianGrid
              stroke="rgba(11,30,58,0.08)"
              vertical={false}
            />

            <XAxis
              dataKey="week"
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              width={36}
            />

            <Tooltip
              contentStyle={{
                background: "#ffffff",
                borderRadius: "10px",
                border: "1px solid rgba(11,30,58,0.08)",
                boxShadow: "0 6px 16px rgba(11,30,58,0.12)",
                fontSize: "0.75rem",
              }}
              labelStyle={{
                fontWeight: 600,
                marginBottom: "0.25rem",
              }}
            />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#0b1e3a"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 5,
                strokeWidth: 2,
                fill: "#0b1e3a",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

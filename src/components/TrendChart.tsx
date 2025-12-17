import React from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

type TrendPoint = {
  month: string;
  cy: number | null;
  ly: number;
  target: number;
};

type TrendChartProps = {
  title: string;
  data: TrendPoint[];
};

export default function TrendChart({ title, data }: TrendChartProps) {
  const chartData = data.map(d => ({
    ...d,
    delta: d.cy != null ? d.cy - d.target : 0,
  }));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Title */}
      <div
        style={{
          marginBottom: "0.75rem",
          fontWeight: 600,
          fontSize: "0.9rem",
          color: "#0A1633",
        }}
      >
        {title}
      </div>

      <div style={{ flex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 8, right: 16, left: 4, bottom: 0 }}
          >
            <CartesianGrid stroke="rgba(10,22,51,0.08)" vertical={false} />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 20, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />

            {/* Main axis — tighter domain */}
            <YAxis
              yAxisId="main"
              domain={["dataMin - 6", "dataMax + 6"]}
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              width={36}
            />

            {/* Delta axis */}
            <YAxis
              yAxisId="delta"
              hide
              domain={[-8, 8]}
            />

            <ReferenceLine
              yAxisId="delta"
              y={0}
              stroke="rgba(10,22,51,0.18)"
            />

            <Tooltip
              contentStyle={{
                background: "#ffffff",
                borderRadius: "10px",
                border: "1px solid rgba(10,22,51,0.08)",
                boxShadow: "0 6px 16px rgba(10,22,51,0.12)",
                fontSize: "0.75rem",
              }}
              formatter={(value: number, name: string) => {
                const map: Record<string, string> = {
                  cy: "CY",
                  ly: "LY",
                  target: "Target",
                  delta: "vs Target",
                };
                return [value.toFixed(1), map[name] ?? name];
              }}
            />

<Bar
  yAxisId="delta"
  dataKey="delta"
  barSize={38}              // ⬅️ doubled width
  fill="#000000"            // ⬅️ black columns
  radius={[10, 10, 10, 10]}
/>

            {/* Target */}
            <Line
              yAxisId="main"
              type="monotone"
              dataKey="target"
              stroke="#94A3B8"
              strokeDasharray="4 4"
              strokeWidth={2}
              dot={false}
            />

            {/* LY */}
            <Line
              yAxisId="main"
              type="monotone"
              dataKey="ly"
              stroke="#64748B"
              strokeWidth={2}
              dot={false}
            />

            {/* CY */}
            <Line
              yAxisId="main"
              type="monotone"
              dataKey="cy"
              stroke="#0A1633"
              strokeWidth={3}
              dot={false}
              connectNulls={false}
              activeDot={{ r: 5, strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

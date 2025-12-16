import React from "react";
import AppLayout from "../components/AppLayout";

import USHeatmap from "../components/USHeatmap";
import RegionMatrix from "../components/RegionMatrix";
import BrandMatrix from "../components/BrandMatrix";
import KPI from "../components/kpi";
import TrendChart from "../components/TrendChart";
import { volumeTrend } from "../lib/mockTrendData";

const METRIC_COLORS: Record<string, string> = {
  volume: "#eef2ff",
  revenue: "#ecfeff",
  share: "#f0fdf4",
  pods: "#fff7ed",
  taps: "#fef2f2",
  displays: "#faf5ff",
  avd: "#f8fafc",
  adshare: "#fdf4ff",
};

export default function Exec() {
  const [selectedState, setSelectedState] = React.useState<string | null>(null);
  const [activeMetric, setActiveMetric] = React.useState<string | null>(null);

  return (
    <AppLayout>
      <div
        style={{
          flex: 1,
          overflowY: activeMetric ? "auto" : "hidden",
        }}
      >
        <div
          style={{
            maxWidth: "1600px",
            margin: "0 auto",
            padding: "1.5rem 2.5rem 3.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {/* KPI ROW */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(8, 1fr)",
              gap: "1.25rem",
            }}
          >
            {[
              ["Volume", "volume"],
              ["Net Revenue", "revenue"],
              ["BIR Share", "share"],
              ["PODs", "pods"],
              ["TAPs", "taps"],
              ["Displays", "displays"],
              ["AVD", "avd"],
              ["Ad Share", "adshare"],
            ].map(([label, key]) => (
              <KPI
                key={key}
                label={label}
                icon={key}
                active={activeMetric === key}
                onIconClick={() =>
                  setActiveMetric((p) => (p === key ? null : key))
                }
              />
            ))}
          </div>

          {/* TREND */}
          {activeMetric && (
            <div
              style={{
                background: METRIC_COLORS[activeMetric],
                padding: "2rem",
                borderRadius: "18px",
              }}
            >
              <TrendChart title="Latest Weeks" data={volumeTrend} />
            </div>
          )}

          {/* MAIN GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
            }}
          >
            <div className="card">
              <USHeatmap
                height={260}
                legendSize="compact"
                onSelectState={setSelectedState}
              />
              <RegionMatrix selectedState={selectedState} />
            </div>

            <div className="card">
              <BrandMatrix />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

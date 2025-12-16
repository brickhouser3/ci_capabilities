import React from "react";
import {
  BarChart3,
  DollarSign,
  Percent,
  MapPin,
  Droplet,
  LayoutGrid,
  Gauge,
  Megaphone,
} from "lucide-react";

/**
 * Regions (rows)
 */
const regions = [
  { key: "NE", name: "Northeast" },
  { key: "MW", name: "Midwest" },
  { key: "S", name: "South" },
  { key: "W", name: "West" },
  { key: "C", name: "Central" },
  { key: "O", name: "Other" },
];

/**
 * KPIs (columns)
 */
const kpis = [
  { key: "volume", label: "Volume", icon: BarChart3 },
  { key: "revenue", label: "Net Rev", icon: DollarSign },
  { key: "share", label: "Share", icon: Percent },
  { key: "pods", label: "PODs", icon: MapPin },
  { key: "taps", label: "TAPs", icon: Droplet },
  { key: "displays", label: "Displays", icon: LayoutGrid },
  { key: "avd", label: "AVD", icon: Gauge },
  { key: "adshare", label: "Ad Share", icon: Megaphone },
];

/**
 * Dummy region KPI data
 */
const data: Record<
  string,
  Record<string, { value: string; delta: number }>
> = {
  NE: {
    volume: { value: "101.2", delta: 1.6 },
    revenue: { value: "$1.1B", delta: 0.4 },
    share: { value: "24.3%", delta: 0.6 },
    pods: { value: "412K", delta: 1.4 },
    taps: { value: "92.1K", delta: 0.8 },
    displays: { value: "127K", delta: 2.2 },
    avd: { value: "7.9", delta: 0.3 },
    adshare: { value: "18.9%", delta: 0.5 },
  },
  MW: {
    volume: { value: "98.4", delta: -0.8 },
    revenue: { value: "$0.9B", delta: -0.6 },
    share: { value: "22.9%", delta: -0.2 },
    pods: { value: "385K", delta: -0.6 },
    taps: { value: "88.6K", delta: -0.3 },
    displays: { value: "119K", delta: -0.7 },
    avd: { value: "7.5", delta: -0.1 },
    adshare: { value: "17.6%", delta: -0.4 },
  },
  S: {
    volume: { value: "103.9", delta: 2.4 },
    revenue: { value: "$1.3B", delta: 1.9 },
    share: { value: "26.7%", delta: 1.1 },
    pods: { value: "468K", delta: 2.1 },
    taps: { value: "97.4K", delta: 1.9 },
    displays: { value: "138K", delta: 3.1 },
    avd: { value: "8.2", delta: 0.6 },
    adshare: { value: "20.3%", delta: 1.1 },
  },
  W: {
    volume: { value: "97.1", delta: -1.3 },
    revenue: { value: "$0.8B", delta: -1.1 },
    share: { value: "21.4%", delta: -0.5 },
    pods: { value: "351K", delta: -1.2 },
    taps: { value: "84.2K", delta: -1.1 },
    displays: { value: "112K", delta: -1.5 },
    avd: { value: "7.3", delta: -0.2 },
    adshare: { value: "16.8%", delta: -0.6 },
  },
  C: {
    volume: { value: "100.6", delta: 0.5 },
    revenue: { value: "$1.0B", delta: 0.3 },
    share: { value: "23.6%", delta: 0.3 },
    pods: { value: "402K", delta: 0.4 },
    taps: { value: "90.3K", delta: 0.5 },
    displays: { value: "125K", delta: 1.0 },
    avd: { value: "7.8", delta: 0.2 },
    adshare: { value: "18.1%", delta: 0.2 },
  },
  O: {
    volume: { value: "95.8", delta: -2.1 },
    revenue: { value: "$0.6B", delta: -1.8 },
    share: { value: "20.8%", delta: -0.9 },
    pods: { value: "298K", delta: -2.3 },
    taps: { value: "76.9K", delta: -2.0 },
    displays: { value: "98K", delta: -2.8 },
    avd: { value: "6.9", delta: -0.5 },
    adshare: { value: "15.9%", delta: -0.9 },
  },
};

function deltaColor(delta: number) {
  if (delta > 0) return "#166534";
  if (delta < 0) return "#b91c1c";
  return "#6b7280";
}

export default function RegionMatrix() {
  return (
    <div style={{ background: "var(--mc-bg-surface)", padding: "0.25rem" }}>
      {/* Column headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `160px repeat(${kpis.length}, minmax(0, 1fr))`,
          gap: "0.6rem",
          marginBottom: "0.35rem",
        }}
      >
        <div />

        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.key}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1px",
              }}
            >
              <Icon size={16} color="#000" />
              <span
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 500,
                  color: "#9ca3af", // light gray
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                }}
              >
                {kpi.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Region rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        {regions.map((region) => (
          <div
            key={region.key}
            style={{
              display: "grid",
              gridTemplateColumns: `160px repeat(${kpis.length}, minmax(0, 1fr))`,
              gap: "0.6rem",
              padding: "0.40rem 0.25rem",
              borderRadius: "8px",
              transition: "background 0.15s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                "rgba(11,30,58,0.04)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <div style={{ fontWeight: 600, color: "#000" }}>
              {region.name}
            </div>

            {kpis.map((kpi) => {
              const cell = data[region.key]?.[kpi.key];
              if (!cell) return <div key={kpi.key} />;

              return (
                <div
                  key={kpi.key}
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    color: "#000",
                  }}
                >
                  <div>{cell.value}</div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      color: deltaColor(cell.delta),
                    }}
                  >
                    {cell.delta > 0 ? "+" : ""}
                    {cell.delta}%
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

import React from "react";
import AppLayout from "../components/AppLayout";

import USHeatmap from "../components/USHeatmap";
import RegionMatrix from "../components/RegionMatrix";
import BrandMatrix from "../components/BrandMatrix";

import KPI from "../components/kpi";
import TrendChart from "../components/TrendChart";
import { volumeTrend } from "../lib/mockTrendData";

/**
 * Metric → background color for trend drawer
 */
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
      {/* PAGE SCROLL CONTAINER */}
      <div
        style={{
          height: "100%",
          overflowX: "hidden",          // ✅ kill global horizontal scroll
          overflowY: activeMetric ? "auto" : "hidden",
          paddingTop: "2.25rem",
          paddingBottom: "2rem",
        }}
      >
        {/* HORIZONTAL PADDING LAYER */}
        <div
          style={{
            padding: "0 2.5rem",        // ✅ padding lives OUTSIDE maxWidth
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* PAGE CONTENT (WIDTH-CONSTRAINED) */}
          <div
            style={{
              width: "100%",
              maxWidth: "1600px",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            {/* ================= KPI ROW ================= */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(8, minmax(0, 1fr))",
                gap: "1.25rem",
                paddingBottom: activeMetric ? "0.75rem" : 0,
                borderBottom: activeMetric
                  ? "1px solid rgba(11,30,58,0.08)"
                  : "none",
              }}
            >
              <KPI
                label="VOLUME"
                value="195.9"
                delta={-6.1}
                vsYTD={2.4}
                icon="volume"
                active={activeMetric === "volume"}
                onIconClick={() =>
                  setActiveMetric(p => (p === "volume" ? null : "volume"))
                }
              />

              <KPI
                label="NET REVENUE"
                value="$1.2B"
                delta={2.1}
                vsYTD={4.8}
                icon="revenue"
                active={activeMetric === "revenue"}
                onIconClick={() =>
                  setActiveMetric(p => (p === "revenue" ? null : "revenue"))
                }
              />

              <KPI
                label="BIR SHARE"
                value="23.4%"
                delta={0.4}
                vsYTD={1.2}
                icon="share"
                active={activeMetric === "share"}
                onIconClick={() =>
                  setActiveMetric(p => (p === "share" ? null : "share"))
                }
              />

              <KPI
                label="PODS"
                value="415K"
                delta={1.1}
                vsYTD={3.5}
                icon="pods"
                active={activeMetric === "pods"}
                onIconClick={() =>
                  setActiveMetric(p => (p === "pods" ? null : "pods"))
                }
              />

              <KPI
                label="TAPS"
                value="92.7K"
                delta={-0.6}
                vsYTD={1.9}
                icon="taps"
                active={activeMetric === "taps"}
                onIconClick={() =>
                  setActiveMetric(p => (p === "taps" ? null : "taps"))
                }
              />

              <KPI
                label="DISPLAYS"
                value="128K"
                delta={3.2}
                vsYTD={5.1}
                icon="displays"
                active={activeMetric === "displays"}
                onIconClick={() =>
                  setActiveMetric(p =>
                    p === "displays" ? null : "displays"
                  )
                }
              />

              <KPI
                label="AVD"
                value="7.8"
                delta={0.3}
                vsYTD={0.9}
                icon="avd"
                active={activeMetric === "avd"}
                onIconClick={() =>
                  setActiveMetric(p => (p === "avd" ? null : "avd"))
                }
              />

              <KPI
                label="AD SHARE"
                value="18.6%"
                delta={-0.4}
                vsYTD={-0.8}
                icon="adshare"
                active={activeMetric === "adshare"}
                onIconClick={() =>
                  setActiveMetric(p =>
                    p === "adshare" ? null : "adshare"
                  )
                }
              />
            </div>

            {/* ================= TREND DRAWER ================= */}
            {activeMetric && (
              <div
                style={{
                  background: METRIC_COLORS[activeMetric] ?? "#f8fafc",
                  borderRadius: "0 0 18px 18px",
                  padding: "1.75rem 2rem 2.25rem",
                  marginTop: "-0.5rem",
                  boxShadow: "inset 0 1px 0 rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    marginBottom: "0.75rem",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: "var(--mc-text-primary)",
                  }}
                >
                  {activeMetric} — Trend
                </div>

                <div className="trend-animate" style={{ height: "260px" }}>
                  <TrendChart title="Latest Weeks" data={volumeTrend} />
                </div>
              </div>
            )}

            {/* ================= GEO + BRAND ZONE ================= */}
            <div
              style={{
                height: "520px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
                alignItems: "stretch",
              }}
            >
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  boxShadow: "0 10px 24px rgba(11,30,58,0.08)",
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
	   	  height: "100%",
                }}
              >
                <USHeatmap
                  height={300}
                  legendSize="compact"
                  onSelectState={(state) =>
                    setSelectedState(p => (p === state ? null : state))
                  }
                />

                <RegionMatrix
                  selectedState={selectedState}
                  selectedMetric={activeMetric}
                />
              </div>

              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  boxShadow: "0 10px 24px rgba(11,30,58,0.08)",
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
	   	  height: "100%",
                }}
              >
                <BrandMatrix />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

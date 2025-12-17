import React from "react";
import AppLayout from "../components/AppLayout";

import USHeatmap from "../components/USHeatmap";
import RegionMatrix from "../components/RegionMatrix";
import BrandMatrix from "../components/BrandMatrix";

import KPI from "../components/kpi";
import TrendChart from "../components/TrendChart";
import { volumeTrend } from "../lib/mockTrendData";

/**
 * Metric → icon + trend drawer color
 * (More visible, still soft)
 */
const METRIC_COLORS: Record<string, string> = {
  volume: "#DCE7FF",
  revenue: "#D6F4F1",
  share: "#DDF5E6",
  pods: "#FFE8CC",
  taps: "#FFE1E1",
  displays: "#EFE3FF",
  avd: "#E9EEF5",
  adshare: "#F6E1FA",
};

/** KPI label color — deep navy */
const KPI_LABEL_COLOR = "#0A1633";

export default function Exec() {
  const [selectedState, setSelectedState] = React.useState<string | null>(null);
  const [activeMetric, setActiveMetric] = React.useState<string | null>(null);

  return (
    <AppLayout>
      {/* ================= SCROLL CONTAINER ================= */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflowX: "auto",
          overflowY: "auto",
          paddingTop: "2.25rem",
          backgroundColor: "#ffffff",
        }}
      >
        {/* ================= PAGE WIDTH WRAPPER ================= */}
        <div
          style={{
            padding: "0 2.5rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* ================= CONTENT STACK ================= */}
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
                  ? "1px solid rgba(10,22,51,0.12)"
                  : "none",
              }}
            >
              <KPI
                label="VOLUME"
                labelColor={KPI_LABEL_COLOR}
                value="195.9"
                delta={-6.1}
                vsYTD={2.4}
                icon="volume"
                iconBg={METRIC_COLORS.volume}
                active={activeMetric === "volume"}
                onIconClick={() =>
                  setActiveMetric(p => (p === "volume" ? null : "volume"))
                }
              />

              <KPI
                label="NET REVENUE"
                labelColor={KPI_LABEL_COLOR}
                value="$1.2B"
                delta={2.1}
                vsYTD={4.8}
                icon="revenue"
                iconBg={METRIC_COLORS.revenue}
                active={activeMetric === "revenue"}
                onIconClick={() =>
                  setActiveMetric(p => (p === "revenue" ? null : "revenue"))
                }
              />

              <KPI
                label="BIR SHARE"
                labelColor={KPI_LABEL_COLOR}
                value="23.4%"
                delta={0.4}
                vsYTD={1.2}
                icon="share"
                iconBg={METRIC_COLORS.share}
                active={activeMetric === "share"}
                onIconClick={() =>
                  setActiveMetric(p => (p === "share" ? null : "share"))
                }
              />

              <KPI
                label="PODS"
                labelColor={KPI_LABEL_COLOR}
                value="415K"
                delta={1.1}
                vsYTD={3.5}
                icon="pods"
                iconBg={METRIC_COLORS.pods}
                active={activeMetric === "pods"}
                onIconClick={() =>
                  setActiveMetric(p => (p === "pods" ? null : "pods"))
                }
              />

              <KPI
                label="TAPS"
                labelColor={KPI_LABEL_COLOR}
                value="92.7K"
                delta={-0.6}
                vsYTD={1.9}
                icon="taps"
                iconBg={METRIC_COLORS.taps}
                active={activeMetric === "taps"}
                onIconClick={() =>
                  setActiveMetric(p => (p === "taps" ? null : "taps"))
                }
              />

              <KPI
                label="DISPLAYS"
                labelColor={KPI_LABEL_COLOR}
                value="128K"
                delta={3.2}
                vsYTD={5.1}
                icon="displays"
                iconBg={METRIC_COLORS.displays}
                active={activeMetric === "displays"}
                onIconClick={() =>
                  setActiveMetric(p =>
                    p === "displays" ? null : "displays"
                  )
                }
              />

              <KPI
                label="AVD"
                labelColor={KPI_LABEL_COLOR}
                value="7.8"
                delta={0.3}
                vsYTD={0.9}
                icon="avd"
                iconBg={METRIC_COLORS.avd}
                active={activeMetric === "avd"}
                onIconClick={() =>
                  setActiveMetric(p => (p === "avd" ? null : "avd"))
                }
              />

              <KPI
                label="AD SHARE"
                labelColor={KPI_LABEL_COLOR}
                value="18.6%"
                delta={-0.4}
                vsYTD={-0.8}
                icon="adshare"
                iconBg={METRIC_COLORS.adshare}
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
                  backgroundColor: METRIC_COLORS[activeMetric],
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
                    color: KPI_LABEL_COLOR,
                  }}
                >
                  {activeMetric} — Trend
                </div>

                <div className="trend-animate" style={{ height: "260px" }}>
                  <TrendChart title="Latest Weeks" data={volumeTrend} />
                </div>
              </div>
            )}

            {/* ================= GEO + BRAND ================= */}
            <div
              style={{
                height: "520px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
              }}
            >
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  boxShadow: "0 10px 24px rgba(10,22,51,0.08)",
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
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
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  boxShadow: "0 10px 24px rgba(10,22,51,0.08)",
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
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

import React from "react";

/**
 * Dummy brand definitions
 */
const brands = [
  { key: "BDL", name: "Bud Light", logo: "/img/brand_logos/BDL.jpg" },
  { key: "MUL", name: "Michelob Ultra", logo: "/img/brand_logos/MUL.jpg" },
  { key: "BUD", name: "Budweiser", logo: "/img/brand_logos/BHL.jpg" },
  { key: "CWFM", name: "Cutwater", logo: "/img/brand_logos/CWFM.jpg" },
  { key: "KGA", name: "Big Wave", logo: "/img/brand_logos/KGA.png" },
  { key: "NUTRL", name: "NUTRL", logo: "/img/brand_logos/NUTRL.png" },
  { key: "STA", name: "Stella Artois", logo: "/img/brand_logos/STA.jpg" },
];

const kpis = [
  { key: "volume", label: "Volume" },
  { key: "revenue", label: "Net Revenue" },
  { key: "share", label: "Share" },
  { key: "pods", label: "PODs" },
  { key: "taps", label: "TAPs" },
  { key: "displays", label: "Displays" },
  { key: "avd", label: "AVD" },
  { key: "adshare", label: "Ad Share" },
];

/**
 * KPI → Brand dummy data
 */
const data: Record<
  string,
  Record<string, { value: string; delta: number }>
> = {
  volume: {
    BDL: { value: "82.4", delta: -2.1 },
    MUL: { value: "64.9", delta: 1.8 },
    BUD: { value: "31.2", delta: -0.6 },
    CWFM: { value: "18.7", delta: 2.9 },
    KGA: { value: "22.4", delta: -1.3 },
    NUTRL: { value: "27.1", delta: 1.1 },
    STA: { value: "19.8", delta: 0.4 },
  },
  revenue: {
    BDL: { value: "$1.9B", delta: 0.6 },
    MUL: { value: "$1.5B", delta: 2.1 },
    BUD: { value: "$0.9B", delta: -0.4 },
    CWFM: { value: "$0.6B", delta: 3.4 },
    KGA: { value: "$0.7B", delta: -0.8 },
    NUTRL: { value: "$0.8B", delta: 1.6 },
    STA: { value: "$0.6B", delta: 0.9 },
  },
  share: {
    BDL: { value: "24.1%", delta: 0.4 },
    MUL: { value: "21.8%", delta: 0.9 },
    BUD: { value: "13.2%", delta: -0.3 },
    CWFM: { value: "6.8%", delta: 1.1 },
    KGA: { value: "8.2%", delta: -0.4 },
    NUTRL: { value: "9.7%", delta: 0.5 },
    STA: { value: "6.3%", delta: 0.2 },
  },
  pods: {
    BDL: { value: "312K", delta: 1.2 },
    MUL: { value: "284K", delta: 1.6 },
    BUD: { value: "156K", delta: -0.8 },
    CWFM: { value: "98K", delta: 2.6 },
    KGA: { value: "121K", delta: -1.0 },
    NUTRL: { value: "134K", delta: 1.3 },
    STA: { value: "101K", delta: 0.5 },
  },
  taps: {
    BDL: { value: "71.4K", delta: -0.3 },
    MUL: { value: "66.9K", delta: 1.1 },
    BUD: { value: "42.1K", delta: -0.6 },
    CWFM: { value: "28.4K", delta: 2.2 },
    KGA: { value: "35.7K", delta: -0.9 },
    NUTRL: { value: "38.2K", delta: 1.0 },
    STA: { value: "29.9K", delta: 0.6 },
  },
  displays: {
    BDL: { value: "98K", delta: 2.3 },
    MUL: { value: "87K", delta: 2.9 },
    BUD: { value: "55K", delta: -1.1 },
    CWFM: { value: "42K", delta: 3.7 },
    KGA: { value: "49K", delta: -1.5 },
    NUTRL: { value: "53K", delta: 1.8 },
    STA: { value: "44K", delta: 0.8 },
  },
  avd: {
    BDL: { value: "7.6", delta: 0.2 },
    MUL: { value: "7.9", delta: 0.4 },
    BUD: { value: "6.8", delta: -0.2 },
    CWFM: { value: "8.3", delta: 0.7 },
    KGA: { value: "7.1", delta: -0.3 },
    NUTRL: { value: "7.5", delta: 0.3 },
    STA: { value: "7.2", delta: 0.1 },
  },
  adshare: {
    BDL: { value: "18.4%", delta: -0.5 },
    MUL: { value: "17.1%", delta: 0.6 },
    BUD: { value: "11.9%", delta: -0.7 },
    CWFM: { value: "9.6%", delta: 1.3 },
    KGA: { value: "10.4%", delta: -0.6 },
    NUTRL: { value: "11.2%", delta: 0.7 },
    STA: { value: "9.1%", delta: 0.3 },
  },
};

function deltaColor(delta: number) {
  if (delta > 0) return "#166534";
  if (delta < 0) return "#b91c1c";
  return "#6b7280";
}

export default function BrandMatrix({
  onDrill,
}: {
  onDrill?: (kpi: string) => void;
}) {
  return (
    <div style={{ background: "var(--mc-bg-surface)", padding: "0.5rem" }}>
      {/* Title */}
      <div
        style={{
          fontWeight: 600,
          marginBottom: "1rem",
          color: "#000000",
        }}
      >
        Brand Performance Matrix
      </div>

      {/* Header Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `160px repeat(${brands.length}, minmax(0, 1fr))`,
          gap: "0.75rem",
          marginBottom: "0.75rem",
        }}
      >
        <div />

        {brands.map((b) => (
          <div
            key={b.key}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <img
              src={b.logo}
              alt={b.name}
              style={{ height: "26px", objectFit: "contain" }}
            />
          </div>
        ))}
      </div>

      {/* KPI Rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        {kpis.map((kpi) => (
          <div
            key={kpi.key}
            onClick={() => onDrill?.(kpi.key)}
            style={{
              display: "grid",
              gridTemplateColumns: `160px repeat(${brands.length}, minmax(0, 1fr))`,
              gap: "0.75rem",
              padding: "0.5rem 0.25rem",
              borderRadius: "8px",
              cursor: "pointer",
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
            {/* KPI label */}
            <div style={{ fontWeight: 600, color: "#000000" }}>
              {kpi.label}
            </div>

            {brands.map((b) => {
              const cell = data[kpi.key]?.[b.key];
              if (!cell) return <div key={b.key} />;

              return (
                <div
                  key={b.key}
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    color: "#000000",
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

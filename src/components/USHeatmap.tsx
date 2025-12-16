import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { statePerformance } from "../lib/mockStatePerformance";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const FIPS_TO_STATE: Record<string, string> = {
  "01": "AL","02": "AK","04": "AZ","05": "AR","06": "CA","08": "CO",
  "09": "CT","10": "DE","11": "DC","12": "FL","13": "GA","15": "HI",
  "16": "ID","17": "IL","18": "IN","19": "IA","20": "KS","21": "KY",
  "22": "LA","23": "ME","24": "MD","25": "MA","26": "MI","27": "MN",
  "28": "MS","29": "MO","30": "MT","31": "NE","32": "NV","33": "NH",
  "34": "NJ","35": "NM","36": "NY","37": "NC","38": "ND","39": "OH",
  "40": "OK","41": "OR","42": "PA","44": "RI","45": "SC","46": "SD",
  "47": "TN","48": "TX","49": "UT","50": "VT","51": "VA","53": "WA",
  "54": "WV","55": "WI","56": "WY",
};

function performanceColor(value?: number) {
  if (typeof value !== "number") return "#e5e7eb";
  if (value >= 1.05) return "#166534";
  if (value >= 1.0) return "#22c55e";
  if (value >= 0.95) return "#ef4444";
  return "#b91c1c";
}

export default function USHeatmap({
  onSelectState,
}: {
  onSelectState?: (state: string) => void;
}) {
  return (
    <div
      style={{
        height: "170px",           // 🔑 HARD LIMIT
        width: "100%",
        display: "flex",
        gap: "0.5rem",
      }}
    >
      {/* LEGEND */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "3px",
          fontSize: "0.6rem",
          color: "var(--mc-text-muted)",
          width: "60px",
          flexShrink: 0,
        }}
      >
        <LegendItem color="#166534" label="≥105%" />
        <LegendItem color="#22c55e" label="100–105%" />
        <LegendItem color="#ef4444" label="95–100%" />
        <LegendItem color="#b91c1c" label="<95%" />
      </div>

      {/* MAP */}
      <div style={{ flex: 1 }}>
        <ComposableMap
          projection="geoAlbersUsa"
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateCode = FIPS_TO_STATE[geo.id as string];
                const value = statePerformance[stateCode];

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() =>
                      stateCode && onSelectState?.(stateCode)
                    }
                    style={{
                      default: {
                        fill: performanceColor(value),
                        outline: "none",
                      },
                      hover: {
                        fill: "#1e40af",
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: "#1e3a8a",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
    </div>
  );
}

function LegendItem({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "4px",
        alignItems: "center",
        lineHeight: 1,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          background: color,
          borderRadius: 2,
        }}
      />
      <span>{label}</span>
    </div>
  );
}

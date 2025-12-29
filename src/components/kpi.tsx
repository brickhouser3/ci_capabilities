import React from "react";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  DollarSign,
  Share2,
  MapPin,
  Activity,
  Megaphone,
  Target,
} from "lucide-react";

/* =========================
   ICON MAP
========================= */
const ICONS: Record<string, React.ReactNode> = {
  volume: <BarChart3 size={18} />,
  revenue: <DollarSign size={18} />,
  share: <Share2 size={18} />,
  pods: <MapPin size={18} />,
  taps: <Activity size={18} />,
  displays: <Megaphone size={18} />,
  avd: <Activity size={18} />,
  adshare: <Share2 size={18} />,
};

const FALLBACK_ICON = <BarChart3 size={18} />;

/* =========================
   KPI CARD
========================= */
export default function KPI({
  label,
  labelColor,
  value,
  vsYTD = 0,
  vsLastMonth = 0,
  vsTarget,
  icon,
  iconBg,
  active = false,
  onIconClick,
}: {
  label: string;
  labelColor?: string;
  value: string;
  vsYTD?: number;
  vsLastMonth?: number;
  vsTarget?: number;
  icon: string;
  iconBg?: string;
  active?: boolean;
  onIconClick?: () => void;
}) {
  const resolvedIcon = ICONS[icon] ?? FALLBACK_ICON;

  return (
    <div
      onClick={onIconClick}
      style={{
        minWidth: 0, // ✅ allow grid/flex parents to shrink this card
        background: "#ffffff",
        borderRadius: "16px",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem",
        cursor: onIconClick ? "pointer" : "default",

        boxShadow: active
          ? `0 0 0 2px ${iconBg ?? "#CBD5E1"}, 0 12px 26px rgba(10,22,51,0.14)`
          : "0 8px 20px rgba(10,22,51,0.08)",

        transform: active ? "translateY(-1px)" : "translateY(0)",
        transition: "transform 140ms ease, box-shadow 140ms ease",
      }}
    >
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", minWidth: 0 }}>
        <div
          style={{
            minWidth: 0,
            fontSize: "0.85rem",
            fontWeight: 800,
            letterSpacing: "0.08em",
            color: labelColor ?? "#0A1633",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            paddingRight: 8,
          }}
        >
          {label}
        </div>

        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: iconBg ?? "#E5E7EB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#0A1633",
            flex: "0 0 34px",
          }}
        >
          {resolvedIcon}
        </div>
      </div>

      {/* MAIN VALUE */}
      <div
        style={{
          minWidth: 0,
          fontSize: "1.65rem",
          fontWeight: 700,
          color: "#0A1633",
          lineHeight: 1.1,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis", // ✅ prevents long values from widening
        }}
        title={value}
      >
        {value}
      </div>

      {/* VS TARGET */}
      {typeof vsTarget === "number" && (
        <div
          style={{
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.7rem",
            fontWeight: 600,
            color: vsTarget >= 0 ? "#166534" : "#b91c1c",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Target size={13} />
          <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" }}>
            vs Target: {vsTarget >= 0 ? "+" : ""}
            {vsTarget}%
          </span>
        </div>
      )}

      {/* COMPARISONS */}
      <div
        style={{
          minWidth: 0,
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
          fontSize: "0.75rem",
        }}
      >
        <Comparison label="YTD" value={vsYTD} />
        <Comparison label="MoM" value={vsLastMonth} />
      </div>
    </div>
  );
}

/* =========================
   COMPARISON CHIP
========================= */
function Comparison({ label, value }: { label: string; value: number }) {
  const positive = value >= 0;

  return (
    <div
      style={{
        minWidth: 0,
        display: "flex",
        gap: "4px",
        alignItems: "center",
        color: positive ? "#166534" : "#b91c1c",
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
      {label}: {positive ? "+" : ""}
      {value}%
    </div>
  );
}

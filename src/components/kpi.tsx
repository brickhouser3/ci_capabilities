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
} from "lucide-react";

const ICONS: Record<string, React.ReactNode> = {
  volume: <BarChart3 size={16} />,
  revenue: <DollarSign size={16} />,
  share: <Share2 size={16} />,
  pods: <MapPin size={16} />,
  taps: <Activity size={16} />,
  displays: <Megaphone size={16} />,
  avd: <Activity size={16} />,
  adshare: <Share2 size={16} />,
};

const COLORS: Record<string, string> = {
  volume: "#eef2ff",
  revenue: "#ecfeff",
  share: "#f0fdf4",
  pods: "#fff7ed",
  taps: "#fef2f2",
  displays: "#faf5ff",
  avd: "#f8fafc",
  adshare: "#fdf4ff",
};

export default function KPI({
  label,
  value,
  delta,
  vsYTD,
  vsLastMonth,
  icon,
  active,
  onIconClick,
}: {
  label: string;
  value: string;
  delta: number;
  vsYTD: number;
  vsLastMonth: number;
  icon: string;
  active?: boolean;
  onIconClick?: () => void;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 8px 20px rgba(11,30,58,0.08)",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        cursor: "pointer",
        outline: active ? "2px solid #0b1e3a" : "none",
      }}
      onClick={onIconClick}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: "var(--mc-text-muted)",
          }}
        >
          {label}
        </div>

        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: COLORS[icon],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {ICONS[icon]}
        </div>
      </div>

      {/* Value */}
      <div
        style={{
          fontSize: "1.6rem",
          fontWeight: 700,
          color: "#000000",
        }}
      >
        {value}
      </div>

      {/* Comparisons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.75rem",
        }}
      >
        <Comparison label="WoW" value={delta} />
        <Comparison label="YTD" value={vsYTD} />
        <Comparison label="MoM" value={vsLastMonth} />
      </div>
    </div>
  );
}

function Comparison({ label, value }: { label: string; value: number }) {
  const positive = value > 0;
  return (
    <div
      style={{
        display: "flex",
        gap: "4px",
        alignItems: "center",
        color: positive ? "#166534" : "#b91c1c",
        fontWeight: 600,
      }}
    >
      {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
      {label}: {positive ? "+" : ""}
      {value}%
    </div>
  );
}

import React from "react";
import {
  Calendar,
  Map,
  Package,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

export default function FilterBar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const width = collapsed ? "64px" : "220px";

  return (
    <aside
      style={{
        width,
        flexShrink: 0,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        padding: collapsed ? "1rem 0.5rem" : "1.25rem 1rem",
        gap: "1.25rem",

        /* Nebula background */
        backgroundImage: "url('/img/mbmc_filterbar_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        borderRight: "1px solid rgba(255,255,255,0.25)",
        overflow: "hidden",
        transition: "width 0.2s ease",
      }}
    >
      {/* Soft blur + darkening overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(6px)",
          background: "rgba(5, 15, 35, 0.45)",
          zIndex: 0,
        }}
      />

      {/* Animated stars */}
      <div className="nebula-stars" />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          height: "100%",
          alignItems: collapsed ? "center" : "stretch",
        }}
      >
        {/* ================= APP / PAGE SELECTOR ================= */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {!collapsed && (
            <div
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.75)",
              }}
            >
              Mission Control
            </div>
          )}

          {!collapsed ? (
            <button
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.14)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: "10px",
                padding: "0.55rem 0.65rem",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                fontSize: "0.8rem",
                fontWeight: 600,
              }}
            >
              <span>Exec</span>
              <ChevronDown size={14} />
            </button>
          ) : (
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "0.75rem",
              }}
            >
              MC
            </div>
          )}
        </div>

        {/* ================= COLLAPSE TOGGLE ================= */}
        <button
          onClick={onToggle}
          style={{
            alignSelf: collapsed ? "center" : "flex-end",
            background: "none",
            border: "none",
            color: "#ffffff",
            cursor: "pointer",
            marginTop: "-0.25rem",
          }}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {/* ================= FILTERS ================= */}
        <FilterItem
          icon={<Calendar size={18} />}
          label="Timeframe"
          collapsed={collapsed}
          options={["Latest Week", "L4W", "L12W", "YTD"]}
        />

        <FilterItem
          icon={<Map size={18} />}
          label="Geography"
          collapsed={collapsed}
          options={["United States", "Region", "State"]}
        />

        <FilterItem
          icon={<Package size={18} />}
          label="Product"
          collapsed={collapsed}
          options={["All Brands", "Core", "Beyond Beer", "Imports"]}
        />

        <div style={{ flex: 1 }} />
      </div>
    </aside>
  );
}

/* ---------- Subcomponents ---------- */

function FilterItem({
  icon,
  label,
  collapsed,
  options,
}: {
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  options: string[];
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.4rem",
        alignItems: collapsed ? "center" : "stretch",
      }}
    >
      {/* Label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: collapsed ? 0 : "0.5rem",
          color: "#ffffff",
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          justifyContent: collapsed ? "center" : "flex-start",
        }}
      >
        {icon}
        {!collapsed && label}
      </div>

      {/* Dropdown */}
      {!collapsed && (
        <select
          style={{
            width: "100%",
            padding: "0.45rem 0.55rem",
            borderRadius: "8px",
            border: "none",
            background: "#ffffff",
            color: "#0b1e3a",
            fontSize: "0.8rem",
            cursor: "pointer",
          }}
        >
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      )}
    </div>
  );
}

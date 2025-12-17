import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import {
  Calendar,
  Map,
  Package,
  ChevronDown,
} from "lucide-react";

/* ----------------------------------------
 * Vegapunk Font
 * -------------------------------------- */
const vegapunkFont = `
@font-face {
  font-family: "Vegapunk";
  src: url("/fonts/Vegapunk.otf") format("opentype");
  font-weight: normal;
  font-style: normal;
}
`;

const astronautCss = `
@keyframes astronautShine {
  0% {
    transform: translateX(-120%);
  }
  60% {
    transform: translateX(-120%);
  }
  100% {
    transform: translateX(120%);
  }
}

@keyframes glowPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
  }
}

.astronaut-wrapper {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

/* ---- GLOW ---- */
.astronaut-glow {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(242,214,117,0.25) 0%,
    rgba(242,214,117,0.15) 40%,
    rgba(242,214,117,0.0) 70%
  );
  filter: blur(10px);
  transition:
    opacity 200ms ease,
    filter 200ms ease,
    transform 200ms ease;
  opacity: 0.6;
  z-index: 0;
}

.astronaut-wrapper:hover .astronaut-glow {
  opacity: 1;
  filter: blur(14px);
  animation: glowPulse 600ms ease-out;
}

/* ---- ICON ---- */
.astronaut-icon {
  position: relative;
  z-index: 1;
  --astronaut-mask: url("/img/astronaut_white_smoothed_highres.png");
}

/* ---- SHINE (masked to silhouette) ---- */
.astronaut-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    rgba(255,255,255,0.0) 40%,
    rgba(255,255,255,0.55) 50%,
    rgba(255,255,255,0.0) 60%
  );
  transform: translateX(-120%);
  animation: astronautShine 6.5s ease-in-out infinite;
  pointer-events: none;

  -webkit-mask-image: var(--astronaut-mask);
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;

  mask-image: var(--astronaut-mask);
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
}

/* ---- FILTER LABEL ---- */
.filter-label {
  margin-top: 0.3rem;
  font-family: Inter, system-ui, sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.22em;
  font-weight: 600;
  color: #F3E7A3;
  opacity: 0;
  transform: translateY(-6px);
  transition:
    opacity 180ms ease,
    transform 180ms ease;
  pointer-events: none;
}

.astronaut-wrapper:hover .filter-label {
  opacity: 0.95;
  transform: translateY(0);
}
`;

/* ----------------------------------------
 * Dropdown FilterItem
 * -------------------------------------- */
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
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(options[0]);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(o => !o)}
        title={collapsed ? `${label}: ${value}` : undefined}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          width: "100%",
          minHeight: 30,
          padding: collapsed ? "0.35rem" : "0.35rem 0.55rem",
          borderRadius: "7px",
          background: "#ffffff",
          border: "1px solid rgba(0,0,0,0.12)",
          color: "#0b1e3a",
          cursor: "pointer",
          fontSize: "0.7rem",
          fontWeight: 600,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          {icon}
          {!collapsed && <span>{label}</span>}
        </div>

        {!collapsed && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <span style={{ fontSize: "0.65rem", color: "#374151" }}>
              {value}
            </span>
            <ChevronDown size={12} />
          </div>
        )}
      </button>

      {open && !collapsed && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            left: 0,
            right: 0,
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.12)",
            borderRadius: "7px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
            zIndex: 50,
          }}
        >
          {options.map(opt => (
            <div
              key={opt}
              onClick={() => {
                setValue(opt);
                setOpen(false);
              }}
              style={{
                padding: "0.35rem 0.55rem",
                fontSize: "0.7rem",
                cursor: "pointer",
                background: opt === value ? "#f3f4f6" : "#ffffff",
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------
 * FilterBar
 * -------------------------------------- */
export default function FilterBar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const width = collapsed ? 64 : 220;
  const bgUrl = useBaseUrl("/img/mbmc_filterbar_bg.png");
  const astronautImg = useBaseUrl("/img/astronaut_white_smoothed_highres.png");

  return (
    <>
      <style>{vegapunkFont}</style>
      <style>{astronautCss}</style>

      <aside
        style={{
          width,
          minWidth: width,
          height: "100%",
          position: "relative",
          overflow: "hidden",
          transition: "width 220ms ease, min-width 220ms ease",
        }}
      >
        {/* BACKGROUND */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${bgUrl})`,
            backgroundSize: "auto 100%",
            backgroundPosition: "top left",
            filter: "blur(4px) brightness(1.05)",
            transform: "scale(1.05)",
          }}
        />

        {/* STARS */}
        <div className="shooting-stars">
          <div className="stars-slow" />
          <div className="stars-medium" />
          <div className="stars-fast" />
        </div>

        {/* CONTENT */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: collapsed ? "0.7rem 0.45rem" : "0.9rem 0.6rem",
            gap: "0.9rem",
          }}
        >
          {/* FILTER TOGGLE */}
          <div className="astronaut-wrapper" style={{ alignSelf: "center" }}>
            <button
              onClick={onToggle}
              title="Toggle filters"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              <div className="astronaut-glow" />
              <div className="astronaut-icon">
                <img
                  src={astronautImg}
                  alt="Filters"
                  style={{
                    width: collapsed ? 50 : 75,
                    height: collapsed ? 50 : 75,
                    display: "block",
                  }}
                />
                <div className="astronaut-shine" />
              </div>
            </button>

            <div className="filter-label">FILTERS</div>
          </div>

          {/* FILTERS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <FilterItem
              icon={<Calendar size={14} />}
              label="Timeframe"
              collapsed={collapsed}
              options={["Latest Week", "L4W", "L12W", "YTD"]}
            />
            <FilterItem
              icon={<Map size={14} />}
              label="Geography"
              collapsed={collapsed}
              options={["United States", "Region", "State"]}
            />
            <FilterItem
              icon={<Package size={14} />}
              label="Product"
              collapsed={collapsed}
              options={["All Brands", "Core", "Beyond Beer"]}
            />
          </div>

          <div style={{ flex: 1 }} />

          {/* BRAND SIGNATURE */}
          <div
            style={{
              textAlign: "center",
              lineHeight: 1.05,
              opacity: collapsed ? 0 : 1,
              transition: "opacity 200ms ease",
              pointerEvents: collapsed ? "none" : "auto",
            }}
          >
            <div
              style={{
                fontFamily: "Vegapunk, sans-serif",
                fontSize: "1.3rem",
                letterSpacing: "0.14em",
                color: "#E6C85C",
                opacity: 0.9,
                textShadow: "0 1px 2px rgba(0,0,0,0.35)",
              }}
            >
              MEGABRAND
            </div>

            <div
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "0.9rem",
                letterSpacing: "0.18em",
                color: "#F7E9A6",
                opacity: 0.85,
                textShadow: "0 1px 2px rgba(0,0,0,0.35)",
              }}
            >
              MISSION CONTROL
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

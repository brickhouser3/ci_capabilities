import React from "react";

type TopBarProps = {
  leftOffset: number; // contentLeft
  height?: number;
};

const PAGES = ["SUMMARY", "DIAGNOSTIC", "BUILDER", "TARGETS", "SUPPORT"] as const;

export default function TopBar({ leftOffset, height = 50 }: TopBarProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: leftOffset,
        right: 0,
        height,
        zIndex: 5,
        pointerEvents: "none",
      }}
    >
      <nav
        aria-label="App pages"
        style={{
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // ✅ center within content pane
          gap: 22,
          pointerEvents: "auto",
          userSelect: "none",
          fontFamily:
            "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {PAGES.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => {
              console.log("Navigate:", label);
            }}
            style={{
              background: "transparent",
              border: "none",
              padding: "8px 12px",
              cursor: "pointer",

              /* typography */
              fontSize: 8,
              fontWeight: 400,
              letterSpacing: "0.08em",

              /* color */
              color: "rgba(75, 85, 99, 0.95)",

              borderRadius: 10,
              transition: "background 140ms ease, color 140ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.55)";
              e.currentTarget.style.color = "rgba(55, 65, 81, 1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "rgba(75, 85, 99, 0.95)";
            }}
          >
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}

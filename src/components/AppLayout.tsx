import React, { useEffect, useState } from "react";
import FilterBar from "./FilterBar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filtersCollapsed, setFiltersCollapsed] = useState(false);

  useEffect(() => {
    if (!window.APP_USER) {
      window.APP_USER = { firstName: "Cody" };
    }
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",

        display: "flex",
        flexDirection: "row",

        backgroundColor: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* ================= FILTER BAR ================= */}
      <div
        style={{
          flexShrink: 0,
          zIndex: 10,

          height: "100%",          // 🔑 allow sidebar to inherit full height
          display: "flex",         // 🔑 required for child stretch
        }}
      >
        <FilterBar
          collapsed={filtersCollapsed}
          onToggle={() => setFiltersCollapsed(c => !c)}
        />
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          height: "100%",

          backgroundColor: "#ffffff",
          position: "relative",

          display: "flex",         // 🔑 enables child pages to grow
          flexDirection: "column",
          overflow: "hidden",      // 🔑 scrolling handled by pages
        }}
      >
        {children}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import FilterBar from "./FilterBar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filtersCollapsed, setFiltersCollapsed] = useState(false);

useEffect(() => {
  console.log("AppLayout mounted");

  if (!window.APP_USER) {
    window.APP_USER = { firstName: "Cody" };
    console.log("APP_USER set", window.APP_USER);
  }
}, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        overflow: "hidden",
        background: "var(--mc-bg-page)",
      }}
    >
      {/* Filter Bar */}
      <FilterBar
        collapsed={filtersCollapsed}
        onToggle={() => setFiltersCollapsed((c) => !c)}
      />

      {/* App content */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
    </div>
  );
}



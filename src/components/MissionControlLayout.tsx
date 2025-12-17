import React, { useState } from "react";
import FilterBar from "./FilterBar";

export default function MissionControlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filtersCollapsed, setFiltersCollapsed] = useState(false);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        overflow: "hidden",
      }}
    >
      {/* Filter Bar (ONLY here) */}
      <FilterBar
        collapsed={filtersCollapsed}
        onToggle={() => setFiltersCollapsed((c) => !c)}
      />

      {/* Mission Control Content */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import AppLayout from "../components/AppLayout";
import { UploadModal } from "../components/modals/UploadModal";
import { Upload } from "lucide-react";

import USHeatmap from "../components/USHeatmap";
import RegionMatrix from "../components/RegionMatrix";
import BrandMatrix from "../components/BrandMatrix";
import KPI from "../components/kpi";
import TrendChart from "../components/TrendChart";
import { volumeTrend } from "../lib/mockTrendData";

const METRIC_COLORS: Record<string, string> = {
  volume: "#eef2ff",
  revenue: "#ecfeff",
  share: "#f0fdf4",
  pods: "#fff7ed",
  taps: "#fef2f2",
  displays: "#faf5ff",
  avd: "#f8fafc",
  adshare: "#fdf4ff",
};

export default function Exec() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [activeMetric, setActiveMetric] = useState<string | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <AppLayout>
      {/* ✅ FULL WIDTH CANVAS (no mx-auto max-w clamp) */}
      <div className="w-full min-w-0 flex flex-col gap-6">
        {/* === HEADER SECTION === */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 min-w-0">
          <div className="min-w-0">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Executive Overview
            </h1>
            <p className="text-slate-500 mt-1">
              Real-time performance metrics across all regions
            </p>
          </div>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 shadow-sm text-slate-700 font-medium rounded-lg hover:bg-slate-50 hover:text-blue-900 transition-all active:scale-95"
          >
            <Upload size={18} />
            <span>Upload Data</span>
          </button>
        </div>

        {/* === KPI ROW === */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "1.25rem",
            minWidth: 0,
          }}
        >
          {[
            ["Volume", "volume"],
            ["Net Revenue", "revenue"],
            ["BIR Share", "share"],
            ["PODs", "pods"],
            ["TAPs", "taps"],
            ["Displays", "displays"],
            ["AVD", "avd"],
            ["Ad Share", "adshare"],
          ].map(([label, key]) => (
            <KPI
              key={key}
              label={label}
              icon={key}
              active={activeMetric === key}
              onIconClick={() =>
                setActiveMetric((p) => (p === key ? null : key))
              }
            />
          ))}
        </div>

        {/* === TREND DRAWER === */}
        {activeMetric && (
          <div
            className="animate-in slide-in-from-top-4 duration-300 min-w-0"
            style={{
              background: METRIC_COLORS[activeMetric],
              padding: "2rem",
              borderRadius: "18px",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)",
            }}
          >
            <TrendChart title="Latest Weeks" data={volumeTrend} />
          </div>
        )}

        {/* === MAIN GRID === */}
        <div
          style={{
            display: "grid",
            // ✅ was minmax(500px, 1fr) which can overflow
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
            minWidth: 0,
          }}
        >
          <div className="card bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden min-w-0">
            <USHeatmap
              height={260}
              legendSize="compact"
              onSelectState={setSelectedState}
            />
            <RegionMatrix selectedState={selectedState} />
          </div>

          <div className="card bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden min-w-0">
            <BrandMatrix />
          </div>
        </div>
      </div>

      {/* === MODAL === */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </AppLayout>
  );
}

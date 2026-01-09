import React from "react";
import { useExecVolumeKpi } from "../../hooks/useExecVolumeKpi";

export default function ApiTestPage() {
  const { data, loading, error } = useExecVolumeKpi();

  return (
    <div style={{ padding: 24 }}>
      <h1>API Test – Exec Volume KPI</h1>

      {loading && <p>Loading…</p>}
      {error && <pre style={{ color: "red" }}>{error}</pre>}
      {data && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}

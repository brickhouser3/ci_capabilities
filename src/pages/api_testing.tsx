import React, { useState } from "react";
import Layout from "@theme/Layout";

export default function DbxLiveTest() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runTest = async () => {
    setLoading(true);
    setError(null);
    setValue(null);

    try {
      const res = await fetch(
        "https://ci-capabilities-api.vercel.app/api/query",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: "{}"
        }
      );

      const data = await res.json();

      // extract the single value we expect
      const result =
        data?.result?.data_array?.[0]?.[0]?.toString() ?? "No value returned";

      setValue(result);
    } catch (err: any) {
      setError(err.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Databricks Live Test">
      <main style={{ padding: "2rem" }}>
        <h1>Databricks Live API Test</h1>

        <button onClick={runTest} disabled={loading}>
          {loading ? "Running…" : "Run Live Query"}
        </button>

        {value && (
          <p style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
            <strong>Max cal_dt:</strong> {value}
          </p>
        )}

        {error && (
          <pre style={{ marginTop: "1rem", color: "red" }}>
            {error}
          </pre>
        )}
      </main>
    </Layout>
  );
}

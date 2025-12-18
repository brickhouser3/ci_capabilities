import { useEffect, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { KpiResponseV1 } from "../contracts/kpi";

/**
 * Fetches the Exec Volume KPI from the Vercel API
 * Normalizes Databricks SQL response → KpiResponseV1
 * Uses SIMPLE POST (text/plain) to avoid CORS preflight
 */
export function useExecVolumeKpi() {
  const { siteConfig } = useDocusaurusContext();
  const apiBaseUrl = (siteConfig.customFields as any)?.apiBaseUrl as
    | string
    | undefined;

  const [data, setData] = useState<KpiResponseV1 | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!apiBaseUrl) {
      setError("API base URL is not configured");
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchKpi() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${apiBaseUrl}/api/query`, {
          method: "POST",
          headers: {
            // SIMPLE REQUEST → no CORS preflight
            "Content-Type": "text/plain",
          },
          body: JSON.stringify({
            contract_version: "kpi_request.v1",
            kpi: "volume",
          }),
        });

        if (!res.ok) {
          throw new Error(`Volume KPI request failed (${res.status})`);
        }

        const raw = await res.json();

        /**
         * Normalize Databricks SQL API response
         * Expected shape:
         * result.data_array[0][0] = KPI value
         */
        const normalized: KpiResponseV1 = {
          value: raw?.result?.data_array?.[0]?.[0] ?? null,
        };

        if (!cancelled) {
          setData(normalized);
        }
      } catch (err: any) {
        if (!cancelled) {
          console.error("❌ useExecVolumeKpi error:", err);
          setError(err?.message ?? "Unknown error");
          setData(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchKpi();

    return () => {
      cancelled = true;
    };
  }, [apiBaseUrl]);

  return { data, loading, error };
}

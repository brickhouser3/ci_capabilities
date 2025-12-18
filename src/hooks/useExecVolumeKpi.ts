import { useEffect, useState } from "react";
import { KpiResponseV1 } from "../contracts/kpi";

/**
 * Fetches the Exec Volume KPI from the Vercel API
 * Uses Docusaurus customFields.apiBaseUrl
 */
export function useExecVolumeKpi() {
  const [data, setData] = useState<KpiResponseV1 | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchKpi() {
      try {
        setLoading(true);

        // ✅ Resolve API base URL from Docusaurus config
        const apiBaseUrl =
          (window as any)?.__docusaurus?.siteConfig?.customFields
            ?.apiBaseUrl ?? "";

        if (!apiBaseUrl) {
          throw new Error("API base URL is not configured");
        }

        const res = await fetch(`${apiBaseUrl}/api/query`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contract_version: "kpi_request.v1",
            kpi: "volume",
          }),
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch volume KPI (${res.status})`);
        }

        const json: KpiResponseV1 = await res.json();

        if (!cancelled) {
          setData(json);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message ?? "Unknown error");
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
  }, []);

  return { data, loading, error };
}

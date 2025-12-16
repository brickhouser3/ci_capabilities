export type KpiKey =
  | "volume"
  | "revenue"
  | "share"
  | "pods"
  | "taps"
  | "displays"
  | "avd"
  | "adshare";

export type KpiData = {
  label: string;
  value: string;
  delta: number;
  vsYTD: number;
  vsLastMonth: number;
};

export const MOCK_KPIS: Record<KpiKey, KpiData> = {
  volume: {
    label: "Volume",
    value: "195.9",
    delta: -6.1,
    vsYTD: 2.4,
    vsLastMonth: -1.1,
  },
  revenue: {
    label: "Net Revenue",
    value: "$1.2B",
    delta: 2.1,
    vsYTD: 4.8,
    vsLastMonth: 1.6,
  },
  share: {
    label: "BIR Share",
    value: "23.4%",
    delta: 0.4,
    vsYTD: 1.2,
    vsLastMonth: 0.2,
  },
  pods: {
    label: "PODs",
    value: "415K",
    delta: 1.1,
    vsYTD: 3.5,
    vsLastMonth: 0.8,
  },
  taps: {
    label: "TAPs",
    value: "92.7K",
    delta: -0.6,
    vsYTD: 1.9,
    vsLastMonth: -0.3,
  },
  displays: {
    label: "Displays",
    value: "128K",
    delta: 3.2,
    vsYTD: 5.1,
    vsLastMonth: 2.4,
  },
  avd: {
    label: "AVD",
    value: "7.8",
    delta: 0.3,
    vsYTD: 0.9,
    vsLastMonth: 0.2,
  },
  adshare: {
    label: "Ad Share",
    value: "18.6%",
    delta: -0.4,
    vsYTD: -0.8,
    vsLastMonth: -0.3,
  },
};

"use client";

import { useQuery } from "@tanstack/react-query";

interface GlobalMarketData {
  active_cryptocurrencies: number;
  markets: number;
  total_market_cap: Record<string, number>;
  total_volume: Record<string, number>;
  market_cap_percentage: Record<string, number>;
  market_cap_change_percentage_24h_usd: number;
}

interface GlobalResponse {
  data: GlobalMarketData;
}

async function fetchGlobal(): Promise<GlobalMarketData> {
  const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY ?? process.env.COINGECKO_API_KEY;
  const headers = apiKey ? { "x-cg-demo-api-key": apiKey } : undefined;

  const res = await fetch("https://api.coingecko.com/api/v3/global", { headers });
  if (!res.ok) throw new Error("Failed to fetch global market data");

  const json: GlobalResponse = await res.json();
  return json.data;
}

function formatCompactCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPercentage(value: number) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

interface StatCardProps {
  label: string;
  value: string;
  change?: number;
}

function StatCard({ label, value, change }: StatCardProps) {
  const isPositive = (change ?? 0) >= 0;

  return (
    <div className="flex flex-1 flex-col gap-1 border-neutral-800 px-4 py-3 sm:border-l sm:first:border-l-0">
      <span className="text-[11px] uppercase tracking-wider text-neutral-500">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-semibold text-neutral-100">{value}</span>
        {typeof change === "number" && (
          <span
            className={
              isPositive ? "text-sm font-medium text-emerald-400" : "text-sm font-medium text-red-400"
            }
          >
            {formatPercentage(change)}
          </span>
        )}
      </div>
    </div>
  );
}

export default function GlobalStatsBar() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["global-market"],
    queryFn: fetchGlobal,
    refetchInterval: 60_000,
  });

  if (isLoading || isError || !data) {
    return (
      <div className="mx-auto w-3/4 overflow-hidden rounded-lg border border-neutral-800 bg-[#283042] p-4 text-sm text-neutral-500">
        {isError ? "Couldn't load global market data." : "Loading global market data…"}
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-3/4 flex-col overflow-hidden rounded-lg border border-neutral-800 bg-[#283042] sm:flex-row">
      <StatCard
        label="Market Cap"
        value={formatCompactCurrency(data.total_market_cap.usd)}
        change={data.market_cap_change_percentage_24h_usd}
      />
      <StatCard label="24h Volume" value={formatCompactCurrency(data.total_volume.usd)} />
      <StatCard label="BTC Dominance" value={`${data.market_cap_percentage.btc.toFixed(1)}%`} />
      <StatCard label="ETH Dominance" value={`${data.market_cap_percentage.eth.toFixed(1)}%`} />
      <StatCard label="Cryptocurrencies" value={data.active_cryptocurrencies.toLocaleString()} />
    </div>
  );
}
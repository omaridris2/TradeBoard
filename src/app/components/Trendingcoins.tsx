"use client";

import { useQuery } from "@tanstack/react-query";

interface TrendingCoinItem {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  market_cap_rank: number | null;
  small: string;
  slug: string;
  data: {
    price: number | string;
    price_change_percentage_24h?: { usd?: number };
  };
}

interface TrendingResponse {
  coins: { item: TrendingCoinItem }[];
}

async function fetchTrending(): Promise<TrendingCoinItem[]> {
  const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY ?? process.env.COINGECKO_API_KEY;
  const headers = apiKey ? { "x-cg-demo-api-key": apiKey } : undefined;

  const res = await fetch("https://api.coingecko.com/api/v3/search/trending", { headers });
  if (!res.ok) throw new Error("Failed to fetch trending coins");

  const json: TrendingResponse = await res.json();
  return json.coins.map((c) => c.item);
}

function formatPrice(value: number | string) {
  const numeric = typeof value === "string" ? Number(value) : value;
  if (!Number.isFinite(numeric)) return "—";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: numeric < 1 ? 4 : 2,
    maximumFractionDigits: numeric < 1 ? 6 : 2,
  }).format(numeric);
}

function formatPercentage(value: number) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

interface TrendingCoinCardProps {
  coin: TrendingCoinItem;
  rank: number;
}

function TrendingCoinCard({ coin, rank }: TrendingCoinCardProps) {
  const change = coin.data.price_change_percentage_24h?.usd;
  const isPositive = (change ?? 0) >= 0;

  return (
    <a
      href={`https://www.coingecko.com/en/coins/${coin.slug}`}
      target="_blank"
      rel="noreferrer"
      className="flex min-w-[220px] flex-shrink-0 items-center gap-3 rounded-lg border border-neutral-800 bg-[#1f2532] p-3 transition hover:border-[#48c2be]"
    >
      <span className="text-xs font-medium text-neutral-500">#{rank}</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={coin.small} alt={coin.name} width={28} height={28} className="rounded-full" />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-medium text-neutral-100">{coin.name}</span>
        <span className="text-xs uppercase text-neutral-500">{coin.symbol}</span>
      </div>
      <div className="flex flex-col items-end gap-0.5">
        <span className="text-sm text-neutral-100">{formatPrice(coin.data.price)}</span>
        {typeof change === "number" && (
          <span
            className={
              isPositive ? "text-xs font-medium text-emerald-400" : "text-xs font-medium text-red-400"
            }
          >
            {formatPercentage(change)}
          </span>
        )}
      </div>
    </a>
  );
}

export default function TrendingCoins() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["trending-coins"],
    queryFn: fetchTrending,
    refetchInterval: 60_000,
  });

  if (isLoading || isError || !data) {
    return (
      <div className="mx-auto w-3/4 overflow-hidden rounded-lg border border-neutral-800 bg-[#283042] p-4 text-sm text-neutral-500">
        {isError ? "Couldn't load trending coins." : "Loading trending coins…"}
      </div>
    );
  }

  return (
    <div className="mx-auto w-3/4 overflow-hidden rounded-lg border border-neutral-800 bg-[#283042] p-4">
      <h2 className="mb-3 text-[11px] uppercase tracking-wider text-neutral-500">Trending Searches</h2>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {data.map((coin, index) => (
          <TrendingCoinCard key={coin.id} coin={coin} rank={index + 1} />
        ))}
      </div>
    </div>
  );
}
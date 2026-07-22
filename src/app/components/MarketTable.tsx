"use client";

import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MarketRow, { type CoinMarket } from "./MarketRow";
import SearchBar from "./SearchBar";

async function fetchMarkets(): Promise<CoinMarket[]> {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&price_change_percentage=24h"
  );

  if (!res.ok) throw new Error("Failed to fetch market data");

  return res.json();
}

export default function MarketWatchTable() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["markets"],
    queryFn: fetchMarkets,
    refetchInterval: 30_000,
  });

  const filteredMarkets = useMemo(() => {
    if (!data || !query.trim()) return data;

    const normalizedQuery = query.trim().toLowerCase();
    return data.filter(
      (coin) =>
        coin.name.toLowerCase().includes(normalizedQuery) ||
        coin.symbol.toLowerCase().includes(normalizedQuery)
    );
  }, [data, query]);

  if (isLoading) {
    return (
      <div className="rounded-lg border border-neutral-800 bg-[#283042] p-6 text-sm text-neutral-500">
        Loading market data…
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-lg border border-red-900/40 bg-[#283042] p-6 text-sm text-red-400">
        Couldn&apos;t load market data. Try again shortly.
      </div>
    );
  }

  return (
    <div className="mx-auto w-3/4 overflow-hidden rounded-lg border border-neutral-800 bg-[#283042]">
      <div className="flex flex-col gap-3 border-b border-black p-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar value={query} onChange={setQuery} />
        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex h-11 items-center justify-center rounded-lg border border-neutral-700 bg-[#48c2be] px-4 py-2 text-sm font-medium text-black transition hover:border-amber-400 hover:text-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isFetching ? "Refreshing…" : "Refresh"}
        </button>
      </div>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-black text-left text-[11px] uppercase tracking-wider text-neutral-500">
            {/* Added w-full here to absorb extra space */}
            <th className="w-full px-4 py-3 font-medium">Asset</th>
            <th className="px-4 py-3 text-right font-medium whitespace-nowrap">Price</th>
            <th className="px-4 py-3 text-right font-medium whitespace-nowrap">24h %</th>
            <th className="px-4 py-3 text-right font-medium whitespace-nowrap">24h Vol</th>
          </tr>
        </thead>
        <tbody>
          {filteredMarkets?.length ? (
            filteredMarkets.map((coin) => (
              <MarketRow
                key={coin.id}
                coin={coin}
                isSelected={selectedId === coin.id}
                onSelect={handleSelect}
              />
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center text-sm text-neutral-500">
                No assets match your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
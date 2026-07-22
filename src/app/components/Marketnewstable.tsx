"use client";

import { Fragment, useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "./SearchBar";

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string; // ISO string
  currencies: string[]; // e.g. ["BTC", "ETH"]
  sentiment: "positive" | "negative" | "neutral";
}

// ---- Placeholder data -------------------------------------------------
// Swap fetchNews() back to a real API call whenever you're ready to go live.

const PLACEHOLDER_NEWS: NewsItem[] = [
  {
    id: "1",
    title: "Bitcoin holds above key support as traders eye next resistance level",
    summary:
      "Analysts point to steady on-chain accumulation as BTC consolidates, with several key resistance levels in play for the next leg up.",
    url: "https://example.com/news/bitcoin-support",
    source: "CoinDesk",
    publishedAt: new Date(Date.now() - 5 * 60_000).toISOString(),
    currencies: ["BTC"],
    sentiment: "positive",
  },
  {
    id: "2",
    title: "Ethereum layer-2 activity hits new high amid rollup competition",
    summary:
      "Daily transactions across major rollups surged this week, as fee competition heats up between rival L2 networks.",
    url: "https://example.com/news/eth-l2-activity",
    source: "The Block",
    publishedAt: new Date(Date.now() - 42 * 60_000).toISOString(),
    currencies: ["ETH"],
    sentiment: "positive",
  },
  {
    id: "3",
    title: "Regulator signals closer scrutiny of stablecoin reserve disclosures",
    summary:
      "A new proposal would require issuers to publish more granular reserve breakdowns on a monthly basis.",
    url: "https://example.com/news/stablecoin-scrutiny",
    source: "Reuters",
    publishedAt: new Date(Date.now() - 3 * 60 * 60_000).toISOString(),
    currencies: ["USDT", "USDC"],
    sentiment: "negative",
  },
  {
    id: "4",
    title: "Solana network processes record daily transaction volume",
    summary:
      "Validators reported no major outages as throughput climbed, reviving comparisons to earlier congestion episodes.",
    url: "https://example.com/news/solana-volume",
    source: "Decrypt",
    publishedAt: new Date(Date.now() - 6 * 60 * 60_000).toISOString(),
    currencies: ["SOL"],
    sentiment: "neutral",
  },
  {
    id: "5",
    title: "Major exchange pauses withdrawals for scheduled wallet migration",
    summary:
      "The exchange says the maintenance window is expected to last a few hours and that user funds are unaffected.",
    url: "https://example.com/news/exchange-maintenance",
    source: "CoinTelegraph",
    publishedAt: new Date(Date.now() - 10 * 60 * 60_000).toISOString(),
    currencies: ["BTC", "ETH"],
    sentiment: "negative",
  },
  {
    id: "6",
    title: "DeFi lending protocol TVL climbs back to yearly high",
    summary:
      "Renewed yield-seeking activity has pushed total value locked past the previous peak set earlier this year.",
    url: "https://example.com/news/defi-tvl",
    source: "DefiLlama News",
    publishedAt: new Date(Date.now() - 20 * 60 * 60_000).toISOString(),
    currencies: ["ETH", "AAVE"],
    sentiment: "positive",
  },
  {
    id: "7",
    title: "Analysts split on near-term direction after choppy weekly close",
    summary:
      "Some traders see the pullback as healthy consolidation, while others warn of further downside if support fails.",
    url: "https://example.com/news/market-outlook",
    source: "CoinDesk",
    publishedAt: new Date(Date.now() - 30 * 60 * 60_000).toISOString(),
    currencies: ["BTC", "ETH", "SOL"],
    sentiment: "neutral",
  },
];

async function fetchNews(): Promise<NewsItem[]> {
  // Simulate network latency so loading states can still be previewed.
  await new Promise((resolve) => setTimeout(resolve, 400));
  return PLACEHOLDER_NEWS;
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

// ...rest unchanged (SentimentBadge, MarketNewsTable) — see file below

function SentimentBadge({ sentiment }: { sentiment: NewsItem["sentiment"] }) {
  const styles = {
    positive: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    negative: "bg-red-500/10 text-red-400 border-red-500/30",
    neutral: "bg-neutral-500/10 text-neutral-400 border-neutral-500/30",
  } as const;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${styles[sentiment]}`}
    >
      {sentiment}
    </span>
  );
}

export default function MarketNewsTable() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const handleSelect = useCallback((id: string) => {
    setSelectedId((currentId) => (currentId === id ? null : id));
  }, []);

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["market-news"],
    queryFn: fetchNews,
    refetchInterval: 60_000,
  });

  const filteredNews = useMemo(() => {
    if (!data || !query.trim()) return data;

    const normalizedQuery = query.trim().toLowerCase();
    return data.filter(
      (item) =>
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.source.toLowerCase().includes(normalizedQuery) ||
        item.currencies.some((c) => c.toLowerCase().includes(normalizedQuery))
    );
  }, [data, query]);

  if (isLoading) {
    return (
      <div className="rounded-lg border border-neutral-800 bg-[#283042] p-6 text-sm text-neutral-500">
        Loading market news…
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-lg border border-red-900/40 bg-[#283042] p-6 text-sm text-red-400">
        Couldn&apos;t load market news. Try again shortly.
      </div>
    );
  }

  return (
    <div className="mx-auto w-3/4 max-w-7xl overflow-hidden rounded-lg border border-neutral-800 bg-[#283042]">
      <div className="flex flex-col gap-3 border-b border-black p-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar value={query} onChange={setQuery} />

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex h-11 items-center justify-center rounded-lg border border-neutral-700 bg-[#48c2be] px-4 py-2 text-sm font-medium text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isFetching ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      <div className="w-full" onClick={() => setSelectedId(null)}>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-black text-left text-[11px] uppercase tracking-wider text-neutral-500">
              <th className="w-full px-4 py-3 font-medium">Headline</th>
              <th className="px-4 py-3 text-right font-medium whitespace-nowrap">Source</th>
              <th className="px-4 py-3 text-right font-medium whitespace-nowrap">Sentiment</th>
              <th className="px-4 py-3 text-right font-medium whitespace-nowrap">Published</th>
            </tr>
          </thead>
          <tbody>
            {filteredNews?.length ? (
              filteredNews.map((item) => (
                <Fragment key={item.id}>
                  <tr
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(item.id);
                    }}
                    className={`cursor-pointer border-b border-black/60 transition hover:bg-white/5 ${
                      selectedId === item.id ? "bg-white/5" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-neutral-100">{item.title}</span>
                        {item.currencies.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {item.currencies.map((c) => (
                              <span
                                key={c}
                                className="rounded bg-[#1f2430] px-1.5 py-0.5 text-[10px] font-medium text-[#48c2be]"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap text-neutral-400">
                      {item.source}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <SentimentBadge sentiment={item.sentiment} />
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap text-neutral-500">
                      {timeAgo(item.publishedAt)}
                    </td>
                  </tr>
                  {selectedId === item.id && (
                    <tr>
                      <td colSpan={4} className="border-t border-neutral-800 bg-[#1f2430] p-0">
                        <div className="flex flex-col gap-3 p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-neutral-500">
                              {item.source} · {timeAgo(item.publishedAt)}
                            </span>
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs font-medium text-[#48c2be] hover:underline"
                            >
                              Read full story →
                            </a>
                          </div>
                          <p className="text-sm text-neutral-300">
                            {item.summary || "No summary available for this article."}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-sm text-neutral-500">
                  No news matches your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
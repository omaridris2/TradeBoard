"use client";

import GlobalStatsBar from "./Globalstatsbar";
import TrendingCoins from "./Trendingcoins";
export default function MarketOverview() {
  return (
    <div className="flex flex-col gap-4">
      <GlobalStatsBar />
      <TrendingCoins />
    </div>
  );
}
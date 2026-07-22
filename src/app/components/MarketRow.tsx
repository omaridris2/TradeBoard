import { memo } from "react";

export interface CoinMarket {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  last_updated: string;
}

interface MarketRowProps {
  coin: CoinMarket;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

function TrendArrow({ direction }: { direction: "up" | "down" }) {
  // Base path points northeast (up-right). Mirroring vertically
  // (scale-y: -1) flips it to southeast (down-right) for negative moves.
  return (
    <svg
      viewBox="0 0 12 12"
      className={`h-3 w-3 ${direction === "down" ? "-scale-y-100" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 10L10 2M10 2H4M10 2V8" />
    </svg>
  );
}

function formatPrice(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value < 1 ? 4 : 2,
    maximumFractionDigits: value < 1 ? 6 : 2,
  });
}

function formatVolume(value: number) {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(2)}K`;
  return `$${value.toFixed(0)}`;
}

function MarketRow({ coin, isSelected, onSelect }: MarketRowProps) {
  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <tr
      onClick={(event) => {
        event.stopPropagation();
        onSelect(coin.id);
      }}
      className={`cursor-pointer border-b border-neutral-900 transition-colors last:border-b-0 ${
        isSelected ? "bg-amber-500/[0.07]" : "hover:bg-neutral-900/60"
      }`}
    >
      <td className="relative px-4 py-3">
        {/* Selection Indicator Line */}
        {isSelected && (
          <span className="absolute inset-y-0 left-0 w-2.5 bg-amber-500" />
        )}
        <div className="flex items-center gap-2">
          <img src={coin.image} alt="" className="h-5 w-5 rounded-full" />
          <span className="font-medium text-neutral-100">{coin.name}</span>
          <span className="text-xs uppercase text-neutral-500">
            {coin.symbol}
          </span>
        </div>
      </td>

      <td className="px-4 py-3 text-right font-mono tabular-nums text-neutral-100">
        {formatPrice(coin.current_price)}
      </td>

      <td
        className={`px-4 py-3 text-right font-mono tabular-nums ${
          isPositive ? "text-emerald-400" : "text-red-400"
        }`}
      >
        <span className="inline-flex items-center gap-1">
          <TrendArrow direction={isPositive ? "up" : "down"} />
          {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
        </span>
      </td>

      <td className="px-4 py-3 text-right font-mono tabular-nums text-neutral-400">
        {formatVolume(coin.total_volume)}
      </td>
    </tr>
  );
}

// Only re-render a row when its own coin data or selection state changes —
// not when a sibling row is selected or the poll returns a new array
// reference with otherwise-identical values.
export default memo(MarketRow, (prev, next) => {
  return (
    prev.isSelected === next.isSelected &&
    prev.coin.current_price === next.coin.current_price &&
    prev.coin.price_change_percentage_24h ===
      next.coin.price_change_percentage_24h &&
    prev.coin.total_volume === next.coin.total_volume
  );
});
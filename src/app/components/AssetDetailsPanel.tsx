import type { CoinMarket } from "./MarketRow";

interface AssetDetailsPanelProps {
  coin: CoinMarket | null;
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

function formatLastUpdated(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(date);
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-neutral-700/70 bg-[#2b3444] p-3 shadow-sm">
      <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">{label}</p>
      <p className="mt-1 text-sm font-medium text-neutral-100">{value}</p>
    </div>
  );
}

export default function AssetDetailsPanel({ coin }: AssetDetailsPanelProps) {
  if (!coin) {
    return (
      <div className="flex h-full min-h-55 items-center justify-center px-4 py-8 text-center">
        <div>
          <p className="text-sm font-medium text-neutral-100">Select an asset</p>
          <p className="mt-1 text-sm text-neutral-400">
            Click a row to see price, volume, and recent metrics in this panel.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="px-4 py-4"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <img src={coin.image} alt="" className="h-8 w-8 rounded-full" />
          <div>
            <p className="text-lg font-semibold text-neutral-100">{coin.name}</p>
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
              {coin.symbol}
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-right shadow-sm">
          <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">
            Current price
          </p>
          <p className="text-lg font-semibold text-neutral-100">
            {formatPrice(coin.current_price)}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-1">
        <DetailItem label="24h High" value={formatPrice(coin.high_24h)} />
        <DetailItem label="24h Low" value={formatPrice(coin.low_24h)} />
        <DetailItem label="Volume" value={formatVolume(coin.total_volume)} />
        <DetailItem label="Last updated" value={formatLastUpdated(coin.last_updated)} />
      </div>
    </div>
  );
}

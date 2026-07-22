import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder,
}: SearchBarProps) {
  return (
    <div className="w-full relative">
      <Search
        size={18}
        color="#48c2be"
        className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
      />

      <input
        id="market-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
        placeholder={placeholder ?? "Search by name or symbol..."}
        className="w-full rounded-lg border border-neutral-700 bg-[#1d2330] pl-11 pr-4 py-3 text-sm text-neutral-100 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
      />
    </div>
  );
}
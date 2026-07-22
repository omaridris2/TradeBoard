import Link from "next/link";
import React from "react";
import { Bell, Bitcoin, ChevronDown } from "lucide-react";

const NavBar = () => {
  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Markets", href: "/markets" },
    { name: "Watchlist", href: "#" },
    { name: "News", href: "#" },
  ];

  return (
    <header className="mb-5 border-b border-slate-800/70 bg-[#283042] text-slate-100 shadow-lg shadow-slate-950/20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full text-cyan-400">
            <Bitcoin size={50} />
          </div>

          <div>
            <p className="text-lg font-semibold tracking-tight">
              TradeBoard
            </p>
            <p className="text-xs text-slate-400">
              Live crypto insights
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button className="rounded-full border border-slate-700 p-2 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400">
            <Bell size={16} />
          </button>

          <button className="flex items-center gap-2 rounded-full bg-[#48c2be] px-3 py-2 text-sm font-semibold text-black transition hover:bg-cyan-400">
            Sign in
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <div className="border-b border-slate-700" />

      {/* Bottom Bar */}
      <div className="mx-auto flex max-w-7xl items-center gap-60 px-4 lg:px-6">
        {links.map((link, index) => (
          <Link
            key={link.name}
            href={link.href}
            className={`relative mr-6 py-4 pr-6 text-lg font-bold transition ${
              index === 0
                ? "text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {link.name}

            {index === 0 && (
              <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#48c2be]" />
            )}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default NavBar;
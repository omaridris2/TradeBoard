"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bell, Bitcoin, ChevronDown } from "lucide-react";

const STORAGE_KEY = "tradeboard-demo-auth";

const NavBar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    try {
      const storedValue = window.localStorage.getItem(STORAGE_KEY);
      if (!storedValue) return;

      const parsedUser = JSON.parse(storedValue) as { name?: string };
      if (parsedUser.name) {
        setUserName(parsedUser.name);
        setIsSignedIn(true);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const handleAuthToggle = () => {
    if (isSignedIn) {
      window.localStorage.removeItem(STORAGE_KEY);
      setIsSignedIn(false);
      setUserName("Guest");
      return;
    }

    const demoUser = { name: "Demo Trader", email: "demo@tradeboard.app" };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));
    setUserName(demoUser.name);
    setIsSignedIn(true);
  };

  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Markets", href: "#" },
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
            <p className="text-lg font-semibold tracking-tight">TradeBoard</p>
            <p className="text-xs text-slate-400">Live crypto insights</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          

          <div className="flex flex-col items-end">
            <button
              onClick={handleAuthToggle}
              className="flex items-center gap-2 rounded-full bg-[#48c2be] px-3 py-2 text-sm font-semibold text-black transition hover:bg-cyan-400"
            >
              {isSignedIn ? `Hi, ${userName}` : "Sign in"}
              <ChevronDown size={16} />
            </button>
            <span className="mt-1 text-[11px] text-slate-400">
              
            </span>
          </div>
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
              index === 0 ? "text-white" : "text-slate-400 hover:text-white"
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
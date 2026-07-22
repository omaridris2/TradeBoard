import React from 'react'
import { Bell, ChevronDown, Search, TrendingUp } from 'lucide-react'

const NavBar = () => {
  const links = ['Overview', 'Markets', 'Watchlist', 'News']

  return (
    <header className="border-b border-slate-800/70 bg-[#283042] text-slate-100 shadow-lg shadow-slate-950/20 mb-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[cyan-500/15] text-cyan-400">
            <TrendingUp size={18} />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight">TradeBoard</p>
            <p className="text-xs text-slate-400">Live crypto insights</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
         

          <button className="rounded-full border border-slate-700 p-2 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400">
            <Bell size={16} />
          </button>

          <button className="flex items-center gap-2 rounded-full bg-cyan-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
            Sign in
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      
    </header>
  )
}

export default NavBar
import Link from "next/link";
import { ArrowRight, BarChart3, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";

const insights = [
  { label: "Momentum", value: "+12.8%" },
  { label: "Volume", value: "2.1x" },
  { label: "Risk", value: "Low" },
];

const features = [
  {
    title: "Live market pulse",
    description: "Follow top movers and sector shifts without losing context.",
    icon: TrendingUp,
  },
  {
    title: "Instant clarity",
    description: "A streamlined layout highlights the signals that matter most.",
    icon: Sparkles,
  },
  {
    title: "Trusted overview",
    description: "Stay confident with dependable summaries and clean visual hierarchy.",
    icon: ShieldCheck,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_28%),linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_100%)] text-slate-900">
      <main className="mx-auto flex max-w-7xl flex-col px-6 py-6 lg:px-8 lg:py-8">
        <header className="mb-6 flex items-center justify-between rounded-full border border-slate-200/80 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-950">TradeBoard</p>
              <p className="text-xs text-slate-500">Markets at a glance</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#features" className="transition hover:text-slate-950">
              Features
            </a>
            <a href="#insights" className="transition hover:text-slate-950">
              Insights
            </a>
          </nav>
        </header>

        <section className="grid gap-8 rounded-[2rem] border border-slate-200/80 bg-white/80 p-8 shadow-[0_20px_80px_-30px_rgba(15,23,42,0.45)] backdrop-blur-xl lg:grid-cols-[1.15fr_0.85fr] lg:p-12">
          <div className="flex flex-col justify-center">
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
              <Sparkles className="h-4 w-4" />
              New: AI-guided market snapshots
            </div>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Trade smarter with a polished view of the markets.
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
              Monitor momentum, compare top movers, and stay ahead with a beautifully simple dashboard built for fast decisions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/markets"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Explore markets
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Open dashboard
              </Link>
            </div>
            <div id="insights" className="mt-8 grid gap-3 sm:grid-cols-3">
              {insights.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3">
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="mt-1 text-lg font-semibold text-slate-950">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Watchlist health</p>
                <h2 className="text-2xl font-semibold">+12.8% momentum</h2>
              </div>
              <div className="rounded-full bg-emerald-500/15 p-2 text-emerald-400">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>

            <div className="space-y-3">
              {[
                ["BTC", "+4.2%", "Strong breakout"],
                ["ETH", "+2.1%", "Steady trend"],
                ["SOL", "+6.7%", "High conviction"],
              ].map(([asset, change, note]) => (
                <div key={asset} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div>
                    <p className="font-medium">{asset}</p>
                    <p className="text-sm text-slate-400">{note}</p>
                  </div>
                  <span className="text-sm font-semibold text-emerald-400">{change}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="mt-8 grid gap-4 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="rounded-[1.25rem] border border-slate-200/80 bg-white/75 p-6 shadow-sm backdrop-blur">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-950">{feature.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{feature.description}</p>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}

import React from "react";

const LINK_GROUPS = [
  {
    title: "Product",
    links: [
      { label: "Markets", href: "/markets" },
      { label: "News", href: "/news" },
      { label: "Watchlist", href: "/watchlist" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black bg-[#283042] text-neutral-400 mt-5">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <span className="text-lg font-semibold text-neutral-100">
             TradeBoard
            </span>
            <p className="mt-2 max-w-xs text-sm text-neutral-500">
              Real-time crypto market news and sentiment, all in one place.
            </p>
          </div>

          {LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                {group.title}
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-neutral-400 transition hover:text-[#48c2be]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-black pt-6 sm:flex-row">
          <p className="text-xs text-neutral-500">
            © {year} TradeBoard. All rights reserved.
          </p>
          <p className="text-xs text-neutral-500">
            Not financial advice. Market data may be delayed.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
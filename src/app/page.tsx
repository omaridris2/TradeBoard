import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover market momentum, asset trends, and a polished trading dashboard with TradeBoard.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TradeBoard | Market intelligence",
    description:
      "Discover market momentum, asset trends, and a polished trading dashboard with TradeBoard.",
    url: "/",
    type: "website",
  },
};

export default function Home() {
  redirect("/dashboard");
}

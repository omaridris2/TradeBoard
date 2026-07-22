import type { Metadata } from "next";
import React from 'react'
import { useQuery } from "@tanstack/react-query";
import MarketWatchTable from "@/app/components/MarketTable";
import NavBar from '../components/NavBar';

import TrendingCoins from '../components/Trendingcoins';
import GlobalStatsBar from '../components/Globalstatsbar';
import Footer from '../components/Footer';
import ImageCarousel from '../components/Imagecarousel';
import SeoJsonLd from "@/app/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Explore the TradeBoard dashboard for market watchlists, trending assets, and portfolio-friendly summaries.",
  alternates: {
    canonical: "/dashboard",
  },
};

const Dashboard = () => {
  return (
    <div>
      <SeoJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "TradeBoard Dashboard",
          url: "https://tradeboard.example.com/dashboard",
          description:
            "Explore the TradeBoard dashboard for market watchlists, trending assets, and portfolio-friendly summaries.",
        }}
      />
      <NavBar></NavBar>
      <ImageCarousel autoPlayMs={5000} />
      <GlobalStatsBar />
      
      <MarketWatchTable />
     <Footer></Footer>
    </div>
  )
}

export default Dashboard
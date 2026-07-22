import type { Metadata } from "next";
import React from 'react'
import NavBar from '../components/NavBar'
import MarketNewsTable from '../components/Marketnewstable'
import SeoJsonLd from "@/app/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "Markets",
  description:
    "Browse market news, trends, and sector highlights in the TradeBoard markets view.",
  alternates: {
    canonical: "/markets",
  },
};

const Markets = () => {
  return (
    <div>
      <SeoJsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "TradeBoard Markets",
          url: "https://tradeboard.example.com/markets",
          description:
            "Browse market news, trends, and sector highlights in the TradeBoard markets view.",
        }}
      />
     <NavBar></NavBar>
     <MarketNewsTable />
       
    </div>
  )
}

export default Markets
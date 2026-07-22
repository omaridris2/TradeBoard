import React from 'react'
import { useQuery } from "@tanstack/react-query";
import MarketWatchTable from "@/app/components/MarketTable";
import NavBar from '../components/NavBar';

import TrendingCoins from '../components/Trendingcoins';
import GlobalStatsBar from '../components/Globalstatsbar';
const Dashboard = () => {
  return (
    <div>
      <NavBar></NavBar>
      <GlobalStatsBar />
      
      <MarketWatchTable />
    </div>
  )
}

export default Dashboard
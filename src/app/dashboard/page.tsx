import React from 'react'
import { useQuery } from "@tanstack/react-query";
import MarketWatchTable from "@/app/components/MarketTable";
import NavBar from '../components/NavBar';
const Dashboard = () => {
  return (
    <div>
      <NavBar></NavBar>
      
      <MarketWatchTable />
    </div>
  )
}

export default Dashboard
"use client"

import { getRevenueChart, getRevenueSumary } from "@/app/actions/dataDashboard";
import React, { useState, useEffect } from "react";
import BarChartMultipleDashboard from "../chart/BarChartMultipleDashboard";
import BarChartRevenueDashboard from "../chart/BarChartRevenueDashboard";

const BarChartMultiple = () => {
  const [data, setData] = useState<RevenueSumary[] | null>(null);
  const [dataRevenue, setDataRevenue] = useState<RevenueSumary[] | null>(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Năm hiện tại
  const [selectedYearRevenue, setSelectedYearRevenue] = useState(new Date().getFullYear()); // Năm hiện tại
  // console.log("saaaaaaaaa", selectedYear);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRevenueSumary(selectedYear);
      const dataRevenue = await getRevenueChart(selectedYearRevenue);
      setData(data);
      setDataRevenue(dataRevenue);
    };
    fetchData();
  }, [selectedYear, selectedYearRevenue]);


  // console.log("Data in BarChartMultiple", data);
  const handleYearChange = (year: number) => {
    setSelectedYear(year); // Cập nhật năm
  };


  const onYearChangeRevenue = (year: number) => {
    setSelectedYearRevenue(year); // Cập nhật năm
  };

  return (
    <>
      <BarChartMultipleDashboard data={data || []} selectedYear={selectedYear} onYearChange={handleYearChange} />
      <BarChartRevenueDashboard data={dataRevenue || []} selectedYearRevenue={selectedYearRevenue} onYearChangeRevenue={onYearChangeRevenue} />
    </>
  )
}

export default BarChartMultiple
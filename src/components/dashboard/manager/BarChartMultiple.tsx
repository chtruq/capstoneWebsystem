"use client"

import { getRevenueSumary } from "@/app/actions/dataDashboard";
import React, { useState, useEffect } from "react";
import BarChartMultipleDashboard from "../chart/BarChartMultipleDashboard";

const BarChartMultiple = () => {
  const [data, setData] = useState<RevenueSumary[] | null>(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Năm hiện tại
  console.log("saaaaaaaaa", selectedYear);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRevenueSumary(selectedYear);
      setData(data);
    };
    fetchData();
  }, [selectedYear]);


  console.log("Data in BarChartMultiple", data);
  const handleYearChange = (year: number) => {
    setSelectedYear(year); // Cập nhật năm
  };
  return (
    <>
      <BarChartMultipleDashboard data={data || []} selectedYear={selectedYear} onYearChange={handleYearChange} />
    </>
  )
}

export default BarChartMultiple
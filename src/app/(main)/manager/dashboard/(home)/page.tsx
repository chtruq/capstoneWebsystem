import BreadCrumb from "@/components/breadcrum/breadcrum";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import React from "react";
import { getUserInforFromCookie } from "@/app/actions/auth";
import { getAppointmentCountByTpye, getRevenueSumary, getStatistics } from "@/app/actions/dataDashboard";
import StatisticsManager from "@/components/dashboard/manager/StatisticsManager";
import BarChartMultipleDashboard from "@/components/dashboard/chart/BarChartMultipleDashboard";
import BarChartMultiple from "@/components/dashboard/manager/BarChartMultiple";

async function HomePage() {
  const userToken = await getUserInforFromCookie();
  console.log("User Tolken", userToken);
  const dataStatistics = await getStatistics();
  // console.log("Data in home page", dataStatistics);
  const dataAppointmentCountByTpye = await getAppointmentCountByTpye();
  // console.log("Data Appointment", dataAppointmentCountByTpye.details);
  // const dataRevenueSumary = await getRevenueSumary();
  // console.log("data revenue", dataRevenueSumary);



  return (
    <div className="space-y-4">
      <StatisticsManager
        dataAppointmentCountByTpye={dataAppointmentCountByTpye.details}
        dataStatistics={dataStatistics}
      />
      {/* <BarChartMultipleDashboard data={dataRevenueSumary} /> */}
      <BarChartMultiple />


      {/* <AdminDashboard /> */}
    </div>
  );
}

export default HomePage;

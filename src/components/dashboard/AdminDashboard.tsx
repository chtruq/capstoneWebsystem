"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import TotalMoneyIcon from "@public/icon/dashboard/totalmoney";
import CalendarIcon from "@public/icon/dashboard/calendar";
import DepositIcon from "@public/icon/dashboard/deposit";
import AvailableApartmentIcon from "@public/icon/dashboard/availableApartment";
import BarChartMultipleDashboard from "./chart/BarChartMultipleDashboard";
import PieChartComponent from "./chart/PieChart";
import DashboardTable from "./table/DashboardTable";
import { AreaChartDashboard } from "./chart/AreaChartDashboard";

import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

const AdminDashboard = () => {
  const cardData = [
    {
      id: 1,
      title: "Doanh thu",
      amount: "1.000.000",
      icon: <TotalMoneyIcon />,
    },
    {
      id: 2,
      title: "Lịch hẹn đã hoàn thành",
      amount: "123",
      icon: <CalendarIcon />,
    },
    {
      id: 3,
      title: "Đặt cọc thành công",
      amount: "100",
      icon: <DepositIcon />,
    },
    {
      id: 4,
      title: "Căn hộ hiện hữu",
      amount: "100",
      icon: <AvailableApartmentIcon />,
    },
  ];

  const chartData = [
    { type: "Đang tiến hành", data: 111, fill: "var(--color-chrome)" },
    { type: "Đã hoàn thành", data: 200, fill: "var(--color-safari)" },
    { type: "Đã huỷ", data: 187, fill: "var(--color-firefox)" },
  ];

  // const chartData = [
  //   { month: "January", desktop: 186, mobile: 80 },
  //   { month: "February", desktop: 305, mobile: 200 },
  //   { month: "March", desktop: 237, mobile: 120 },
  //   { month: "April", desktop: 73, mobile: 190 },
  //   { month: "May", desktop: 209, mobile: 130 },
  //   { month: "June", desktop: 214, mobile: 140 },
  // ];

  const tableData = [
    {
      id: 1,
      apartment: "Căn hộ view sống Sài gòn",
      view: 100,
      status: "Đã hoàn thành",
      price: "1.000.000",
    },
    {
      id: 2,
      apartment: "Căn hộ view sống Sài gòn",
      view: 100,
      status: "Đã hoàn thành",
      price: "1.000.000",
    },
    {
      id: 3,
      apartment: "Căn hộ view sống Sài gòn",
      view: 100,
      status: "Đã hoàn thành",
      price: "1.000.000",
    },
    {
      id: 4,
      apartment: "Căn hộ view sống Sài gòn",
      view: 100,
      status: "Đã hoàn thành",
      price: "1.000.000",
    },
  ];

  return (
    <div className="relative w-full">
      <h1 className="text-2xl font-bold">Tổng quan</h1>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-[40%]" asChild>
            <Button variant="outline">Khung thời gian</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <Button variant="outline">Chọn khung thời gian</Button>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="w-full flex justify-center items-center gap-4">
        {cardData?.map((item) => (
          <div
            key={item.id}
            className=" w-[25%] h-32 border p-4 my-4 rounded-md relative"
          >
            <div className="absolute bg-primary p-1 rounded-md top-2 right-2">
              {item.icon}
            </div>
            <h2 className="text-lg font-bold">{item.title}</h2>
            <p className="text-2xl">{item.amount}</p>
          </div>
        ))}
      </div>
      <div className="w-full">
        <BarChartMultipleDashboard data={chartData} />
      </div>
      <div className="flex w-full">
        <div className="w-[30%]">
          {/* <PieChartComponent chartData={chartData} /> */}
          <PieChartComponent data={tableData} />
        </div>
        <div className="w-[70%] bg-white rounded-md border m-1 p-1">
          <DashboardTable tableData={tableData} />
        </div>
      </div>
      <div className="my-2">
        <AreaChartDashboard />
      </div>
    </div>
  );
};

export default AdminDashboard;

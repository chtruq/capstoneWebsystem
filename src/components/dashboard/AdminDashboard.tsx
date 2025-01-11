"use client";

import React, { FC, useEffect, useState } from "react";
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
import { useUserAccount } from '@/lib/context/UserAccountContext';
import { FolderKanban ,X, Banknote, Building, HandCoins, ListTodo, CreditCard, Users, PiggyBank, Building2 } from "lucide-react";

import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import { getProviderStatisticsByAccount } from "@/app/actions/provider";
import { formatMoney } from "@/lib/utils/dataFormat";

interface CartStatisticsProps {
  title: string;
  value: string;
  icon: React.ElementType; // Để nhận component React từ Lucide
}

const CartStatistics: FC<CartStatisticsProps> = ({ title, value, icon: Icon }) => {
  return (
    <div className="flex flex-row justify-between p-4 border-2 rounded-xl h-[106.5px]">
      <div className="space-y-2">
        <p className="text-blur">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
      <div className="w-fit h-fit p-2 bg-[#DCBA87] rounded-lg">
        <Icon color="#ffffff" size={20} />
      </div>
    </div>
  );
};


const AdminDashboard = () => {



  const defaultStatistics = {
    providerName: "",
    accountId: "",
    timePeriod: "",
    startDate: "",
    endDate: "",
    totalProjects: 0,
    totalApartments: 0,
    availableApartments: 0,
    totalDeposits: 0,
  };

  const [dataStatistics, setDataStatistics] = useState<StatisticsForProvider>(defaultStatistics);
  const { user } = useUserAccount();
  // console.log("User in Admin Dashboard", user);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        const fetchedData = await getProviderStatisticsByAccount({
          accountId: user.id,
          timePeriod: "all",
        });
        setDataStatistics(fetchedData);
      }
    };
    fetchData();
  }, [user?.id]); // Chỉ theo dõi user.id

  console.log("Data in Provider Dashboard", dataStatistics);


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



  return (
    <div className="relative w-full">
      <h1 className="text-2xl font-bold">Tổng quan</h1>
      {/* <div>
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
      </div> */}

      <div className="w-full grid grid-cols-6 gap-4">
        <div className="col-span-6">
          <div className="grid grid-cols-4 gap-4">
            <CartStatistics title="Tổng tiền ký quỹ" value={formatMoney(dataStatistics?.totalDeposits || 0)} icon={Banknote} />
            <CartStatistics title="Số dự án" value={dataStatistics?.totalProjects.toString() || "0"} icon={FolderKanban} />
            <CartStatistics title="Tổng số căn hộ" value={dataStatistics?.totalApartments.toString() || "0"} icon={Building2} />
            <CartStatistics title="Căn hộ hiện hữu" value={dataStatistics?.availableApartments.toString() || "0"} icon={Building} />
          </div>
        </div>
      </div>


    </div>
  );
};

export default AdminDashboard;

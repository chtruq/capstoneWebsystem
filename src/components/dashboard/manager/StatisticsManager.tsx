"use client"

import React, { FC, useEffect, useState } from "react";
import { X, Banknote, Building, HandCoins, ListTodo, CreditCard, Users, PiggyBank } from "lucide-react";
import PieChartComponent from "../chart/PieChart";
import { formatMoneyShortcut } from "@/lib/utils/dataFormat";
import { getAppointmentCountByTpye, getStatistics } from "@/app/actions/dataDashboard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface Props {
  dataAppointmentCountByTpye: AppointmentCountByType[]
  dataStatistics: Statistics
}

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


const StatisticsManager = () => {
  const defaultStatistics = {
    totalRevenue: 0,
    totalServiceFee: 0,
    totalAppointments: 0,
    totalSecurityDeposit: 0,
    totalBrokerageFee: 0,
    totalTransactions: 0,
    totalUsers: 0,
    timePeriod: "",
    startDate: "",
    endDate: "",
    totalAvailableApartments: 0,
  };
  // console.log("Data in statistics manager", dataStatistics);
  // console.log("Data in Appointment manager", dataAppointmentCountByTpye);
  const [dataStatistics, setDataStatistics] = useState<Statistics>(defaultStatistics);
  const [dataAppointmentCountByTpye, setDataAppointmentCountByTpye] = useState<AppointmentCountByType[] | null>(null);
  const [duration, setDuration] = useState<string>("all")
  useEffect(() => {
    const fetchData = async () => {
      const dataStatistics = await getStatistics(duration);
      const dataAppointmentCountByTpye = await getAppointmentCountByTpye();
      setDataStatistics(dataStatistics);
      setDataAppointmentCountByTpye(dataAppointmentCountByTpye.details);
    };
    fetchData();
  }, [duration]);

  const handleDurationChange = (value: string) => {
    setDuration(value); // Cập nhật giá trị đã chọn
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <p className="font-medium">Khung thời gian:</p>
        <Select onValueChange={handleDurationChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* <SelectLabel>Loại thống kê</SelectLabel> */}
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="week">Tuần này</SelectItem>
              <SelectItem value="month">Tháng này</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* {dataStatistics && dataAppointmentCountByTpye && ( */}
        <div className="w-full grid grid-cols-6 gap-4">
          <div className="col-span-4">
            <div className="grid grid-cols-3 gap-4">
              <CartStatistics title="Doanh thu" value={formatMoneyShortcut(dataStatistics.totalRevenue)} icon={Banknote} />
              <CartStatistics title="Căn hộ hiện hữu" value={dataStatistics.totalAvailableApartments.toString()} icon={Building} />
              <CartStatistics title="Tiền ký quỹ" value={formatMoneyShortcut(dataStatistics.totalSecurityDeposit)} icon={HandCoins} />
              <CartStatistics title="Tiền môi giới" value={formatMoneyShortcut(dataStatistics.totalBrokerageFee)} icon={PiggyBank} />
              <CartStatistics title="Giao dịch" value={dataStatistics.totalTransactions.toString()} icon={CreditCard} />
              <CartStatistics title="Người dùng" value={dataStatistics.totalUsers.toString()} icon={Users} />
            </div>
          </div>
          <div className=" col-span-2">
            {dataAppointmentCountByTpye && <PieChartComponent data={dataAppointmentCountByTpye} />}
          </div>
        </div>
      {/* )} */}
    </div>
  );
}

export default StatisticsManager;
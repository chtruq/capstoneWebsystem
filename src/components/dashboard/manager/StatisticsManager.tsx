
import React, { FC } from "react";
import { X, Banknote, Building, HandCoins, ListTodo, CreditCard, Users, PiggyBank } from "lucide-react";
import PieChartComponent from "../chart/PieChart";
import { formatMoneyShortcut } from "@/lib/utils/dataFormat";

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


const StatisticsManager: FC<Props> = ({ dataAppointmentCountByTpye, dataStatistics }) => {
  console.log("Data in statistics manager", dataStatistics);
  console.log("Data in Appointment manager", dataAppointmentCountByTpye);



  return (
    <div>
      <h1 className="text-2xl font-semibold">Thống kê</h1>
      <div className="w-full grid grid-cols-6 gap-4">
        <div className="col-span-4">
          <div className="grid grid-cols-3 gap-4">
            <CartStatistics title="Doanh thu" value={formatMoneyShortcut(dataStatistics.totalRevenue)} icon={Banknote} />
            <CartStatistics title="Căn hộ hiện hữu" value={dataStatistics.totalAppointments.toString()} icon={Building} />
            <CartStatistics title="Tiền ký quỹ" value={formatMoneyShortcut(dataStatistics.totalSecurityDeposit)} icon={HandCoins} />
            <CartStatistics title="Tiền môi giới" value={formatMoneyShortcut(dataStatistics.totalBrokerageFee)} icon={PiggyBank} />
            <CartStatistics title="Giao dịch" value={dataStatistics.totalTransactions.toString()} icon={CreditCard} />
            <CartStatistics title="Người dùng" value={dataStatistics.totalUsers.toString()} icon={Users} />
          </div>
        </div>
        <div className=" col-span-2">
          <PieChartComponent data={dataAppointmentCountByTpye} />
        </div>
      </div>
    </div>
  );
}

export default StatisticsManager;
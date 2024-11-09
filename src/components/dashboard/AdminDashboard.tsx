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
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

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
  const chartConfig = {
    data: {
      label: "Visitors",
    },
    chrome: {
      label: "Đang tiến hành",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Đã hoàn thành",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Đã huỷ",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

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
      <div>
        <Card className="flex flex-col w-[30%] p-2 my-2">
          <CardHeader className="items-center pb-0">
            <CardTitle>Giao dịch</CardTitle>
            <CardDescription>Trong 7 ngày qua</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[150px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie data={chartData} dataKey="data" label nameKey="type" />
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Tăng 5.2% so với tháng trước <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Trong 7 ngày qua
            </div>
          </CardFooter>
        </Card>
        <Card className="flex flex-col w-[30%] p-2 my-2">
          <CardHeader className="items-center pb-0">
            <CardTitle>Giao dịch</CardTitle>
            <CardDescription>Trong 7 ngày qua</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[150px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie data={chartData} dataKey="data" label nameKey="type" />
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Tăng 5.2% so với tháng trước <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Trong 7 ngày qua
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

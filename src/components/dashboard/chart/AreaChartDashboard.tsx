"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", Doanhthu: 186, hoahong: 80 },
  { month: "February", Doanhthu: 305, hoahong: 200 },
  { month: "March", Doanhthu: 237, hoahong: 120 },
  { month: "April", Doanhthu: 354, hoahong: 190 },
  { month: "May", Doanhthu: 209, hoahong: 130 },
  { month: "June", Doanhthu: 214, hoahong: 140 },
];

const chartConfig = {
  Doanhthu: {
    label: "Doanh thu",
    color: "#FFC107",
  },
  hoahong: {
    label: "Hoa hồng",
    color: "#FF5722",
  },
} satisfies ChartConfig;

export function AreaChartDashboard() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Thống kê</CardTitle>
        <CardDescription>
          Thống kê doanh thu lợi nhuận trong 6 tháng
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            className="mx-auto aspect-square w-[100%] max-h-[100px] pb-0"
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="Doanhthu"
              type="natural"
              fill="#fff"
              fillOpacity={0.4}
              stroke="#000"
              stackId="a"
            />
            <Area
              dataKey="hoahong"
              type="natural"
              fill="#fff"
              fillOpacity={0.4}
              stroke="#34B3F1"
              stackId="a"
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Tăng 5.2% so với tháng trước <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

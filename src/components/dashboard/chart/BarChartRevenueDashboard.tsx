"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { FC } from "react"
import { formatMoneyShortcut, formatMoney } from "@/lib/utils/dataFormat"

interface Props {
  data: RevenueSumary[]
  onYearChangeRevenue: (year: number) => void; // Callback để thay đổi năm
  selectedYearRevenue: number; // Năm hiện tại
}

const BarChartRevenueDashboard: FC<Props> = ({ data, onYearChangeRevenue, selectedYearRevenue }) => {
  // console.log("data revereeeee", data);

  const currentYear = new Date().getFullYear(); // Lấy năm hiện tại
  const startYear = 2020; // Năm bắt đầu
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);

  const handleYearSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value, 10); // Lấy giá trị năm từ dropdown
    onYearChangeRevenue(year); // Gọi callback để cập nhật năm
  };


  // const chartData = [
  //   { month: "January", desktop: 2 },
  //   { month: "February", desktop: 305 },
  //   { month: "March", desktop: 237 },
  //   { month: "April", desktop: 1000000000000 },
  //   { month: "May", desktop: 209 },
  //   { month: "June", desktop: -100 },
  // ]

  const chartData = data.map((item) => ({
    month: item.month, // Sử dụng tháng từ API
    desktop: item.totalRevenue, // Tùy chỉnh dựa trên field từ API
  }));

  // console.log("chartData", chartData);

  const chartConfig = {
    desktop: {
      label: "Doanh thu",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  const totalSummary = data.reduce(
    (acc, curr) => {
      return {
        totalRevenue: acc.totalRevenue + curr.totalRevenue,
        totalBrokerageFee: acc.totalBrokerageFee + curr.totalBrokerageFee,
        totalServiceFee: acc.totalServiceFee + curr.totalServiceFee,
        totalSecurityDeposit:
          acc.totalSecurityDeposit + curr.totalSecurityDeposit,
      };
    },
    {
      totalRevenue: 0,
      totalBrokerageFee: 0,
      totalServiceFee: 0,
      totalSecurityDeposit: 0,
    }
  );

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex-col space-y-1">
          <CardTitle>Biểu đồ cột doanh thu  </CardTitle>
          <CardDescription className="flex space-x-2">
            <p>
              Doanh thu theo năm:
            </p>
            <select className="rounded-sm border-2 border-[000] p-[1px]" name="year" id="year" value={selectedYearRevenue} onChange={handleYearSelect}>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </CardDescription>
        </div>
        <div className="flex space-x-10">

          <div className="flex space-x-2 items-center">
            <div className="w-6 h-10 bg-[hsl(var(--chart-1))] rounded-sm" />
            <div>
              <p className="text-sm">Tổng tiền doanh thu:</p>
              <p className="font-semibold text-xl">{formatMoney(totalSummary.totalRevenue || 0)}</p>
            </div>
          </div>

        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[300px]">
          <LineChart
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
              tickLine={true}
              axisLine={true}
              tickMargin={10}
              tickFormatter={(value) => value.slice(5, 8)}
            />
            <YAxis allowDecimals={true} domain={[0, "dataMax"]} tickFormatter={(value) => formatMoneyShortcut(value)} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  )
}


export default BarChartRevenueDashboard
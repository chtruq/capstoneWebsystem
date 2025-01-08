"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
import { formatMoney } from "@/lib/utils/dataFormat"

interface Props {
  data: RevenueSumary[]
  onYearChange: (year: number) => void; // Callback để thay đổi năm
  selectedYear: number; // Năm hiện tại
}

const BarChartMultipleDashboard: FC<Props> = ({ data, onYearChange, selectedYear }) => {
  // console.log("data rever", data);

  const currentYear = new Date().getFullYear(); // Lấy năm hiện tại
  const startYear = 2020; // Năm bắt đầu
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);

  const handleYearSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value, 10); // Lấy giá trị năm từ dropdown
    onYearChange(year); // Gọi callback để cập nhật năm
  };
  // const chartData = [
  //   { month: "January", desktop: 186, mobile: 80, cash: 100, file: 150 },
  //   { month: "February", desktop: 305, mobile: 200, cash: 100, file: 150 },
  //   { month: "March", desktop: 237, mobile: 120, cash: 100, file: 150 },
  //   { month: "April", desktop: 73, mobile: 190, cash: 100, file: 150 },
  //   { month: "May", desktop: 209, mobile: 130, cash: 100, file: 150 },
  //   { month: "June", desktop: 214, mobile: 140, cash: 100, file: 150 },
  //   { month: "June", desktop: 214, mobile: 140, cash: 100, file: 150 },
  //   { month: "June", desktop: 214, mobile: 140, cash: 100, file: 150 },
  //   { month: "June", desktop: 214, mobile: 140, cash: 100, file: 150 },
  //   { month: "June", desktop: 214, mobile: 140, cash: 100, file: 150 },
  //   { month: "June", desktop: 214, mobile: 140, cash: 100, file: 150 },
  //   { month: "June", desktop: 214, mobile: 140, cash: 100, file: 150 },
  //   { month: "June", desktop: 214, mobile: 140, cash: 100, file: 150 },
  //   { month: "June", desktop: 214, mobile: 140, cash: 100, file: 150 },
  // ]

  const chartData = data.map((item) => ({
    month: item.month, // Sử dụng tháng từ API
    desktop: item.totalSecurityDeposit, // Tùy chỉnh dựa trên field từ API
    mobile: item.totalBrokerageFee, // Tùy chỉnh dựa trên field từ API
    cash: item.totalServiceFee, // Tùy chỉnh dựa trên field từ API
  }));

  const chartConfig = {
    desktop: {
      label: "Tiền ký quỹ",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Tiền môi giới",
      color: "hsl(var(--chart-2))",
    },
    cash: {
      label: "Phí trao đổi",
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig

  // Tính tổng cho 4 giá trị từ API
  const totalSummary = data.reduce(
    (acc, curr) => {
      return {
        totalRevenue: acc.totalRevenue + curr.totalRevenue,
        totalBrokerageFee: acc.totalBrokerageFee + curr.totalBrokerageFee,
        totalTradeFee: acc.totalTradeFee + curr.totalServiceFee,
        totalSecurityDeposit:
          acc.totalSecurityDeposit + curr.totalSecurityDeposit,
      };
    },
    {
      totalRevenue: 0,
      totalBrokerageFee: 0,
      totalTradeFee: 0,
      totalSecurityDeposit: 0,
    }
  );

  // console.log("Total Summary:", totalSummary);s


  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex-col space-y-1">
          <CardTitle>Biểu đồ cột các loại phí</CardTitle>
          <CardDescription className="flex space-x-2">
            <p>
              Các loại phí trong năm
            </p>
            <select className="rounded-sm border-2 border-[000] p-[1px]" name="year" id="year" value={selectedYear} onChange={handleYearSelect}>
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
              <p className="text-sm">Tiền ký quỹ:</p>
              <p className="font-semibold text-xl">{formatMoney(totalSummary.totalSecurityDeposit)}</p>
            </div>
          </div>

          <div className="flex space-x-2 items-center">
            <div className="w-6 h-10 bg-[hsl(var(--chart-2))] rounded-sm" />
            <div>
              <p className="text-sm">Tiền môi giới:</p>
              <p className="font-semibold text-xl">{formatMoney(totalSummary.totalBrokerageFee)}</p>
            </div>
          </div>

          <div className="flex space-x-2 items-center">
            <div className="w-6 h-10 bg-[hsl(var(--chart-4))] rounded-sm" />
            <div>
              <p className="text-sm">Tiền dịch vụ:</p>
              <p className="font-semibold text-xl">{formatMoney(totalSummary.totalTradeFee)}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[300px]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            <Bar dataKey="cash" fill="var(--color-cash)" radius={4} />
          </BarChart>
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

export default BarChartMultipleDashboard
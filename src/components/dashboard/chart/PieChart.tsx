"use client"
import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
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

interface Props {
  data: AppointmentCountByType[]
}

const PieChartComponent: FC<Props> = ({ data }) => {
  console.log("Data in PieChartComponenttttttttttt", data[0].count);

  const chartData = [
    { browser: "chrome", visitors: data[0].count, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: data[1].count, fill: "var(--color-safari)" },
    // { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: data[2].count, fill: "var(--color-edge)" },
    { browser: "other", visitors: data[3].count, fill: "var(--color-other)" },
  ]
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Tư vấn",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Đặt cọc",
      color: "hsl(var(--chart-2))",
    },
    // firefox: {
    //   label: "Firefox",
    //   color: "hsl(var(--chart-3))",
    // },
    edge: {
      label: "Ký gửi",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Tái ký",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  console.log("Data in PieChartComponent", data);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center p-3 pb-0">
        <CardTitle>Biểu đồ tròn - Lịch hẹn</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 pb-0 items-center">
        <ChartContainer
          config={chartConfig}
          className="w-[200px] h-[200px] mx-auto"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Cuộc hẹn
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="w-[30%]">
          <div className="flex items-center gap-2">
            <div className="bg-[hsl(var(--chart-1))] w-6 h-4 rounded-sm" />
            <p>Tư vấn</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[hsl(var(--chart-2))] w-6 h-4 rounded-sm" />
            <p>Đặt cọc</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[hsl(var(--chart-4))] w-6 h-4 rounded-sm" />
            <p>Ký gửi</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[hsl(var(--chart-5))] w-6 h-4 rounded-sm" />
            <p>Tái ký</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PieChartComponent
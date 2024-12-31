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
const chartData = [
  { month: "January", desktop: 186, mobile: 80, cash: 100, file: 150 },
  { month: "February", desktop: 305, mobile: 200, cash: 100, file: 150 },
  { month: "March", desktop: 237, mobile: 120, cash: 100, file: 150 },
  { month: "April", desktop: 73, mobile: 190, cash: 100, file: 150 },
  { month: "May", desktop: 209, mobile: 130, cash: 100, file: 150 },
  { month: "June", desktop: 214, mobile: 140, cash: 100, file: 150 },
  { month: "June", desktop: 214, mobile: 140, cash: 100, file: 150 },
  { month: "June", desktop: 214, mobile: 140, cash: 100, file: 150 },
  { month: "June", desktop: 214, mobile: 140, cash: 100, file: 150 },
  { month: "June", desktop: 214, mobile: 140, cash: 100, file: 150 },
  { month: "June", desktop: 214, mobile: 140, cash: 100, file: 150 },
  { month: "June", desktop: 214, mobile: 140, cash: 100, file: 150 },
  { month: "June", desktop: 214, mobile: 140, cash: 100, file: 150 },
  { month: "June", desktop: 214, mobile: 140, cash: 100, file: 150 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  cash: {
    label: "Cash",
    color: "hsl(var(--chart-3))",
  },
  file: {
    label: "File",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

interface Props {
  data: any
}

const BarChartMultipleDashboard: FC<Props> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            <Bar dataKey="cash" fill="var(--color-mobile)" radius={4} />
            <Bar dataKey="file" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}

export default BarChartMultipleDashboard
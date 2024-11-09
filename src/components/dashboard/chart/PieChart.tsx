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
import { FC } from "react";

interface ChartData {
  type: string;
  data: number;
}

interface PieChartComponentProps {
  chartData: ChartData[];
}

const PieChartComponent: FC<PieChartComponentProps> = ({ chartData }) => {
  const chartConfig = {
    data: { label: "Visitors" },
    chrome: { label: "Đang tiến hành", color: "hsl(var(--chart-1))" },
    safari: { label: "Đã hoàn thành", color: "hsl(var(--chart-2))" },
    firefox: { label: "Đã huỷ", color: "hsl(var(--chart-3))" },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col w-[90%] p-1 m-1">
      <CardHeader className="items-center pb-0">
        <CardTitle>Giao dịch</CardTitle>
        <CardDescription>Trong 7 ngày qua</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-[100%] max-h-[150px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
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
  );
};

export default PieChartComponent;

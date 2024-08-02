

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { pageLevelLocalization } from "@/constants/localization";

const chartData = [
  { month: "January", سفارش: 186 },
  { month: "February", سفارش: 305 },
  { month: "March", سفارش: 237 },
  { month: "April", سفارش: 73 },
  { month: "May", سفارش: 209 },
  { month: "June", سفارش: 212 },
  { month: "July", سفارش: 214 },
  { month: "August", سفارش: 345 },
  { month: "September", سفارش: 123 },
  { month: "October", سفارش: 222 },
  { month: "November", سفارش: 321 },
  { month: "December", سفارش: 111 },
];

const chartConfig = {
  سفارش: {
    label: "سفارش",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function BarChartSingle() {
  return (
    <Card className="w-1/2 text-primary-foreground p-8" id="BarChart">
      <CardHeader>
        <CardTitle>{pageLevelLocalization.dashboard.salesAmount} 
      
        </CardTitle>
        <CardDescription >{pageLevelLocalization.dashboard.tir} - {pageLevelLocalization.dashboard.mordad} 1403</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-12 w-full">
          <BarChart barSize={16} accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />

            <Bar dataKey="سفارش" fill="var(--color-سفارش)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

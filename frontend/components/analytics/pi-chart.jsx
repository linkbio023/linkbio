"use client";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function PiChartGraph({
  title,
  description,
  data,
  chartConfig,
  dataKey,
  nameKey,
}) {
  if (!data || !chartConfig || !dataKey || !nameKey) {
    return null;
  }

  const dataWithColors = data.map((item) => ({
    ...item,
    fill: chartConfig[item[nameKey]]?.color,
  }));

  return (
    <Card className="h-full">
      <CardHeader className="pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={dataWithColors}
              dataKey={dataKey}
              nameKey={nameKey}
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

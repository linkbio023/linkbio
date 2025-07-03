"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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

function dateFormatter(value) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BarChartGraph({
  title,
  description,
  data,
  chartConfig,
  xAxisDataKey,
  barDataKey,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xAxisDataKey}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => dateFormatter(value)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  nameKey={barDataKey}
                  // labelFormatter={(value) => {
                  //   return dateFormatter(value);
                  // }}
                />
              }
            />
            <Bar dataKey={barDataKey} fill="hsl(var(--chart-1))" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

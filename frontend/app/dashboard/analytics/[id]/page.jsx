"use client";;
import { use } from "react";
import BarChartGraph from "@/components/analytics/bar-chart";
import PiChartGraph from "@/components/analytics/pi-chart";
import TableChart from "@/components/analytics/table-chart";
import Content from "@/components/dashboard/content";
import BackButton from "@/components/shared/buttons/back-button";
import {
  browserChartConfig,
  osChartConfig,
  visitsChartConfig,
} from "@/constants/analytics-chart-configs";
import { dateFormatter } from "@/lib/date/date-formatter";
import { useGetAnalyticsData } from "@/services/analytics-services";
import { useViewBiolink } from "@/services/biolink-services";
import Image from "next/image";

export default function BiolinkAnalyticsPage(props) {
  const params = use(props.params);

  const {
    id
  } = params;

  const { biolink: biolinkViewData, isLoading: biolinkViewLoading } =
    useViewBiolink(id);

  const {
    analytics: biolinkAnalyticsData,
    isLoading: biolinkAnalyticsLoading,
    isValidating: biolinkAnalyticsValidating,
  } = useGetAnalyticsData(id);

  // Country columns
  const countryColumns = [
    { title: <div className="text-left">Country</div>, dataIndex: "country" },
    { title: <div className="text-right">Visits</div>, dataIndex: "visits" },
  ];

  // Country data
  const countries = biolinkAnalyticsData?.countries?.map((country) => ({
    country: (
      <div className="flex items-center gap-2 text-left">
        <Image
          src={country?.flag}
          alt={country?.country || "Unknown"}
          width={30}
          height={30}
          onError={(e) =>
            (e.currentTarget.src = `https://flag.vercel.app/m/AQ.svg`)
          }
          unoptimized
          className="rounded-sm"
        />
        <span>{country?.country}</span>
      </div>
    ),
    visits: <div className="text-right">{country?.count}</div>,
  }));

  // Referer columns
  const refererColumns = [
    { title: <div className="text-left">Referer</div>, dataIndex: "referer" },
    { title: <div className="text-right">Visits</div>, dataIndex: "visits" },
  ];

  // Referer data
  const referers = biolinkAnalyticsData?.referer?.map((referer) => ({
    referer: <div className="text-left">{referer?.referer || "Unknown"}</div>,
    visits: <div className="text-right">{referer?.count}</div>,
  }));

  const startDate = dateFormatter(biolinkAnalyticsData?.startDate);
  const endDate = dateFormatter(biolinkAnalyticsData?.endDate);

  return (
    <Content
      title={biolinkViewData?.username}
      extra={<BackButton />}
      isValidating={biolinkAnalyticsValidating}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {/* 30 days visits bar chart */}
        <div className="md:col-span-2">
          <BarChartGraph
            title={`Visits on last 30 days`}
            description={`Showing total visitors from ${startDate} to ${endDate}`}
            data={biolinkAnalyticsData?.date}
            chartConfig={visitsChartConfig}
            xAxisDataKey="date"
            barDataKey="count"
          />
        </div>

        {/* Browser pi chart */}
        <div className="md:col-span-1">
          <PiChartGraph
            title={`Browser`}
            description={`Showing browsers used between ${startDate} to ${endDate}`}
            data={biolinkAnalyticsData?.browsers}
            chartConfig={browserChartConfig}
            dataKey="count"
            nameKey="browser"
          />
        </div>

        {/* Country bar chart */}
        <div className="md:col-span-1">
          <TableChart
            title={`Country`}
            description={`Showing visitors country from ${startDate} to ${endDate}`}
            columns={countryColumns}
            dataSource={countries}
            isLoading={biolinkAnalyticsLoading}
          />
        </div>

        {/* Refferer bar chart */}
        <div className="md:col-span-1">
          {/* <BarChartHorizontalGraph title={`Refferer`} /> */}
          <TableChart
            title={`Referer`}
            description={`Showing visitors source from ${startDate} to ${endDate}`}
            columns={refererColumns}
            dataSource={referers}
          />
        </div>

        {/* Operating system pi chart */}
        <div className="md:col-span-1">
          <PiChartGraph
            title={`Operating system`}
            description={`Showing visitors operating system from ${startDate} to ${endDate}`}
            data={biolinkAnalyticsData?.os}
            chartConfig={osChartConfig}
            dataKey="count"
            nameKey="os"
          />
        </div>
      </div>
    </Content>
  );
}

"use client";
import { Activity, ArrowUpRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Content from "@/components/dashboard/content";
import BackButton from "@/components/shared/buttons/back-button";
import NavigateButton from "@/components/shared/buttons/navigate-button";
import { applicationUrls } from "@/constants/application-urls";
import { useSearchParams } from "next/navigation";
import {
  useCountBiolinksByUser,
  useListBiolinks,
} from "@/services/biolink-services";
import TableComponent from "@/components/shared/table";
import PaginationComponent from "@/components/shared/pagination-link";

function ActionButtons({ id }) {
  return (
    <div className="flex justify-end">
      <NavigateButton
        text={`Stats`}
        icon={<Activity className="h-4 w-4" />}
        path={`${applicationUrls.dashboard.analytics.view}${id}`}
      />
    </div>
  );
}

const columns = [
  { title: <div className="text-left">Username</div>, dataIndex: "username" },
  { title: <div className="text-right">Action</div>, dataIndex: "action" },
];

export default function AnalyticsListPage() {
  const searchParams = useSearchParams();
  const search = new URLSearchParams(searchParams);
  const page = search.get("page") || 1;
  const params = `?page=${page}`;
  const { biolinks, isLoading } = useListBiolinks(params);
  const { biolinkCount } = useCountBiolinksByUser();

  const dataSource = biolinks?.map((biolink) => ({
    username: biolink?.username,
    action: <ActionButtons id={biolink?.id} />,
  }));

  return (
    <Content title="Analytics" extra={<BackButton />}>
      <Card>
        <CardHeader>
          <div className="grid gap-2">
            <CardTitle>User Engagement</CardTitle>
            <CardDescription>
              Track performance of your bio links
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <TableComponent
            columns={columns}
            dataSource={dataSource}
            isLoading={isLoading}
          />
        </CardContent>
        <CardFooter>
          <PaginationComponent totalContent={biolinkCount?.count} />
        </CardFooter>
      </Card>
    </Content>
  );
}

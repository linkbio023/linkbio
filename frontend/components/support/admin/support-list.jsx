"use client";
import { useCountSupport, useListSupport } from "@/services/support-services";
import TableComponent from "@/components/shared/table";
import NavigateButton from "@/components/shared/buttons/navigate-button";
import { applicationUrls } from "@/constants/application-urls";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import PaginationComponent from "@/components/shared/pagination-link";
import Content from "@/components/dashboard/content";
import BackButton from "@/components/shared/buttons/back-button";
import { ZoomIn } from "lucide-react";
import { useSearchParams } from "next/navigation";

function ActionButtons({ id }) {
  return (
    <div className="flex justify-end">
      <NavigateButton
        text={`View`}
        path={`${applicationUrls.dashboard.manage.support.view}${id}`}
        icon={<ZoomIn className="h-4 w-4" />}
      />
    </div>
  );
}

function StatusBadge({ status }) {
  if (status === "open") {
    return (
      <div className="flex justify-center">
        <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-red-400 border border-red-400">
          Open
        </span>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center">
        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-green-400 border border-green-400">
          Closed
        </span>
      </div>
    );
  }
}

export default function AdminSupportList() {
  const searchParams = useSearchParams();
  const search = new URLSearchParams(searchParams);
  const page = search.get("page") || 1;
  const params = `?page=${page}`;

  const { supportCount } = useCountSupport();
  const {
    supportList,
    isLoading: supportListLoading,
    isValidating: supportListValidating,
  } = useListSupport(params);

  const columns = [
    { title: <div className="text-left">Title</div>, dataIndex: "title" },
    { title: <div className="text-center">Status</div>, dataIndex: "status" },
    { title: <div className="text-right">Action</div>, dataIndex: "action" },
  ];

  const dataSource = supportList?.supportList?.map((support) => ({
    title: support.title,
    status: <StatusBadge status={support?.status} />,
    action: <ActionButtons id={support?.id} />,
  }));

  return (
    <Content
      title={"Support Requests"}
      isValidating={supportListValidating}
      extra={<BackButton />}
    >
      <Card>
        <CardHeader className="flex flex-row gap-2 justify-between items-start">
          <div className="grid gap-2">
            <CardTitle>Support Request List</CardTitle>
            <CardDescription>Manage your support tickets here</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <TableComponent
            columns={columns}
            dataSource={dataSource}
            isLoading={supportListLoading}
          />
        </CardContent>
        <CardFooter>
          <PaginationComponent totalContent={supportCount.count} />
        </CardFooter>
      </Card>
    </Content>
  );
}

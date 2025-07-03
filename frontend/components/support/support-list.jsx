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
import CreateSupport from "@/components/support/create-support";
import { ZoomIn } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Can } from "@/authorization/AbilityContext";
import ExclusiveFeatureBanner from "@/components/shared/exclusive-feature-banner";

function ActionButtons({ id }) {
  return (
    <div className="flex justify-end">
      <NavigateButton
        text={`Details`}
        path={`${applicationUrls.dashboard.support.view}${id}`}
        icon={<ZoomIn className="h-4 w-4" />}
      />
    </div>
  );
}

function StatusBadge({ status }) {
  if (status === "open") {
    return (
      <div className="flex items-center gap-1 justify-center">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
        <span>Open</span>
      </div>
    );
  } else {
    return <span className="flex justify-center">Closed</span>;
  }
}

function ShowSupportList() {
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
      title={"Support"}
      isValidating={supportListValidating}
      extra={<BackButton />}
    >
      <Card>
        <CardHeader className="flex flex-row gap-2 justify-between items-start">
          <div className="grid gap-2">
            <CardTitle>Your Support List</CardTitle>
            <CardDescription>
              Manage your support tickets and track their status
            </CardDescription>
          </div>
          {/* Add new support request */}
          <CreateSupport />
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

function PaidFeatureFallback() {
  return (
    <Content title={"Support"} extra={<BackButton />}>
      <ExclusiveFeatureBanner />
    </Content>
  );
}

export default function SupportList() {
  return (
    <Can I="create" a="SupportRequest" passThrough>
      {(allowed) => (allowed ? <ShowSupportList /> : <PaidFeatureFallback />)}
    </Can>
  );
}

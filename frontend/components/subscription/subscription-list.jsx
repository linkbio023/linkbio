"use client";
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
import {
  useCountSubscriptions,
  useListSubscriptions,
} from "@/services/subscription-services";

function ActionButtons({ id }) {
  return (
    <div className="flex justify-end">
      <NavigateButton
        text={`Details`}
        path={`${applicationUrls.dashboard.manage.subscription.view}${id}`}
        icon={<ZoomIn className="h-4 w-4" />}
      />
    </div>
  );
}

function PlanBadge({ plan }) {
  switch (plan) {
    case "pro":
      return <div className="text-center">Pro</div>;
    case "premium":
      return <div className="text-center">Premium</div>;
    default:
      return <div className="text-center">Unknown</div>;
  }
}

export default function SubscriptionList() {
  const searchParams = useSearchParams();
  const search = new URLSearchParams(searchParams);
  const page = search.get("page") || 1;
  const params = `?page=${page}`;

  const { subscriptionCount } = useCountSubscriptions();

  const {
    subscriptionList,
    isLoading: subscriptionListLoading,
    isValidating: subscriptionValidating,
  } = useListSubscriptions(params);

  const columns = [
    { title: <div className="text-left">User</div>, dataIndex: "user" },
    { title: <div className="text-center">Plan</div>, dataIndex: "plan" },
    { title: <div className="text-right">Action</div>, dataIndex: "action" },
  ];

  const dataSource = subscriptionList?.subscriptionList?.map(
    (subscription) => ({
      user: subscription?.user?.name,
      plan: <PlanBadge plan={subscription?.plan} />,
      action: <ActionButtons id={subscription?.id} />,
    })
  );

  return (
    <Content
      title={"Subscriptions"}
      isValidating={subscriptionValidating}
      extra={<BackButton />}
    >
      <Card>
        <CardHeader className="flex flex-row gap-2 justify-between items-start">
          <div className="grid gap-2">
            <CardTitle>Subscription List</CardTitle>
            <CardDescription>Manage your subscriptions here</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <TableComponent
            columns={columns}
            dataSource={dataSource}
            isLoading={subscriptionListLoading}
          />
        </CardContent>
        <CardFooter>
          <PaginationComponent totalContent={subscriptionCount.count} />
        </CardFooter>
      </Card>
    </Content>
  );
}

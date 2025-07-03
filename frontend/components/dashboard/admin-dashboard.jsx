"use client";
import Content from "@/components/dashboard/content";
import { useCountBiolinks } from "@/services/biolink-services";
import { useCountUsers } from "@/services/user-services";
import { Activity, DollarSign, Sparkle, Users } from "lucide-react";
import { applicationUrls } from "@/constants/application-urls";
import DashboardDataCard from "@/components/dashboard/data-card";
import { useCountSupport } from "@/services/support-services";
import { useCountSubscriptions } from "@/services/subscription-services";
import BiolinkListForDashboard from "@/components/biolink/administrator/biolink-list-for-dashboard";
import BackButton from "@/components/shared/buttons/back-button";
import { blinkConfig } from "@/config/blink-config";

export default function AdminDashboard() {
  const { userCount, isLoading: userCountLoading } = useCountUsers();
  const { biolinkCount, isLoading: biolinkCountLoading } = useCountBiolinks();
  const { supportCount, isLoading: supportCountLoading } = useCountSupport();
  const { subscriptionCount, isLoading: subscriptionCountLoading } =
    useCountSubscriptions();

  return (
    <Content title={`Welcome to ${blinkConfig?.title}`} extra={<BackButton />}>
      <div className="grid gap-4">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {/* Total Users */}
          <DashboardDataCard
            title={`Total Users`}
            icon={<Users className="h-4 w-4 text-primary" />}
            count={userCount?.count}
            isLoading={userCountLoading}
            link={applicationUrls.dashboard.manage.users.list}
          />
          {/* Subscribers */}
          <DashboardDataCard
            title={`Subscriptions`}
            icon={<DollarSign className="h-4 w-4 text-primary" />}
            count={subscriptionCount?.count}
            isLoading={subscriptionCountLoading}
            link={applicationUrls.dashboard.manage.subscription.list}
          />
          {/* Total Biolinks */}
          <DashboardDataCard
            title={`Total Biolinks`}
            icon={<Sparkle className="h-4 w-4 text-primary" />}
            count={biolinkCount?.count}
            isLoading={biolinkCountLoading}
            link={applicationUrls.dashboard.manage.biolinks.list}
          />
          {/* Support Request */}
          <DashboardDataCard
            title={`Support Request`}
            icon={<Activity className="h-4 w-4 text-primary" />}
            count={supportCount?.count}
            isLoading={supportCountLoading}
            link={applicationUrls.dashboard.manage.support.list}
          />
        </div>
        {/* Biolink List */}
        <BiolinkListForDashboard />
      </div>
    </Content>
  );
}

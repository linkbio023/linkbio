"use client";
import { Zap } from "lucide-react";
import Content from "@/components/dashboard/content";
import DashboardDataCard from "@/components/dashboard/data-card";
import { applicationUrls } from "@/constants/application-urls";
import BiolinkListForUserDashboard from "../biolink/user/biolink-list-for-user-dashboard";
import BackButton from "@/components/shared/buttons/back-button";
import { useCountBiolinksByUser } from "@/services/biolink-services";
import UserProfileCardForDashboard from "../profile/user-profile-card-for-dashboard";
import { blinkConfig } from "@/config/blink-config";

export default function UserDashboard() {
  const { biolinkCount, isLoading: biolinkCountLoading } =
    useCountBiolinksByUser();

  return (
    <Content title={`Welcome to ${blinkConfig?.title}`} extra={<BackButton />}>
      <div className="grid gap-4">
        {/* Data Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          <UserProfileCardForDashboard />
          <DashboardDataCard
            title={`Biolinks`}
            icon={<Zap className="h-4 w-4 text-primary" />}
            count={biolinkCount?.count}
            isLoading={biolinkCountLoading}
            link={applicationUrls.dashboard.biolink.list}
          />
        </div>
        {/* Table */}
        <BiolinkListForUserDashboard />{" "}
      </div>
    </Content>
  );
}

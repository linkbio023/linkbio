import Content from "@/components/dashboard/content";
import BackButton from "@/components/shared/buttons/back-button";
import PriceCards from "@/components/upgrade/price-cards";

export default function UpgradePlan() {
  return (
    <Content title="Upgrade Plan" extra={<BackButton />}>
      {/* Pricing Cards */}
      <PriceCards disableFree={true} dontShowHeader={true} />
    </Content>
  );
}

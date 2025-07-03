import Content from "@/components/dashboard/content";
import SubscriptionFailed from "@/components/upgrade/subscription-failed";
import SubscriptionSuccess from "@/components/upgrade/subscription-success";

export default async function UpgradeSuccessStatusPage(props) {
  const params = await props.params;

  const {
    status
  } = params;

  return (
    <Content title="Subscription Status">
      {status == "success" && <SubscriptionSuccess />}
      {status == "canceled" && <SubscriptionFailed />}
    </Content>
  );
}

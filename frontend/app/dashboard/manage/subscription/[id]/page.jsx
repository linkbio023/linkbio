import ViewSubscription from "@/components/subscription/view-subscription";

export default async function SubscriptionDetailsPage(props) {
  const params = await props.params;

  const {
    id
  } = params;

  return <ViewSubscription id={id} />;
}

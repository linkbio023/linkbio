"use client";
import Content from "@/components/dashboard/content";
import BackButton from "@/components/shared/buttons/back-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dateFormatter } from "@/lib/date/date-formatter";
import { useViewSubscription } from "@/services/subscription-services";
import DescriptionItem from "@/components/shared/description-item";
import NavigateButton from "@/components/shared/buttons/navigate-button";
import { UserSearch } from "lucide-react";
import { applicationUrls } from "@/constants/application-urls";

function PlanBadge({ plan }) {
  switch (plan) {
    case "pro":
      return "Pro";
    case "premium":
      return "Premium";
    default:
      return "Unknown";
  }
}

function CurrencyBadge({ currency }) {
  switch (currency) {
    case "usd":
      return "USD";
    case "eur":
      return "EUR";
    default:
      return { currency };
  }
}

function StatusBadge({ status }) {
  switch (status) {
    case "active":
      return "Active";
    case "inactive":
      return "Inactive";
    default:
      return status;
  }
}

function PaymentPlatformBadge({ platform }) {
  switch (platform) {
    case "stripe":
      return "Stripe";
    case "paypal":
      return "PayPal";
    case "razorpay":
      return "Razorpay";
    default:
      return platform;
  }
}

export default function ViewSubscription({ id }) {
  const { subscriptionData, isLoading, isValidating } = useViewSubscription(id);

  return (
    <Content
      title={`Subscription Details`}
      isValidating={isValidating}
      isLoading={isLoading}
      extra={<BackButton />}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {/* Subscription Details */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row gap-2 justify-between items-start">
              <div className="grid gap-2">
                <CardTitle>Subscription Details</CardTitle>
                <CardDescription>
                  Information about the subscription
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <DescriptionItem
                  label="Subscription Id"
                  data={subscriptionData?.id}
                />
                <DescriptionItem
                  label="Plan"
                  data={<PlanBadge plan={subscriptionData.plan} />}
                />
                <DescriptionItem
                  label="Amount"
                  data={subscriptionData?.amount / 100}
                />
                <DescriptionItem
                  label="Currency"
                  data={<CurrencyBadge currency={subscriptionData?.currency} />}
                />
                <DescriptionItem
                  label="Subscription Start Date"
                  data={dateFormatter(subscriptionData?.currentPeriodStartDate)}
                />
                <DescriptionItem
                  label="Subscription End Date"
                  data={dateFormatter(subscriptionData?.currentPeriodEndDate)}
                />
                <DescriptionItem
                  label="Payment Platform"
                  data={
                    <PaymentPlatformBadge
                      platform={subscriptionData?.paymentPlatform}
                    />
                  }
                />
                <DescriptionItem
                  label="Status"
                  data={<StatusBadge status={subscriptionData?.status} />}
                />
                <DescriptionItem
                  label="Created At"
                  data={dateFormatter(subscriptionData?.createdAt)}
                />
                <DescriptionItem
                  label="Updated At"
                  data={dateFormatter(subscriptionData?.updatedAt)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        {/* User Details */}
        <div className="md:col-span-1 w-full">
          <Card>
            <CardHeader className="flex flex-row gap-2 justify-between items-start">
              <div className="grid gap-2">
                <CardTitle>User Information</CardTitle>
                <CardDescription>
                  Information about the user who made the subscription
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <DescriptionItem
                  label="User"
                  data={subscriptionData?.user?.name}
                />
                <DescriptionItem
                  label="Email"
                  data={subscriptionData?.user?.email}
                />
              </div>
            </CardContent>
            <CardFooter>
              <NavigateButton
                path={`${applicationUrls.dashboard.manage.users.view}${subscriptionData?.user?.id}`}
                icon={<UserSearch className="h-4 w-4" />}
                text={`Learn More`}
                variant="outline"
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </Content>
  );
}

"use client";
import Content from "@/components/dashboard/content";
import BackButton from "@/components/shared/buttons/back-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useViewUserProfile } from "@/services/user-services";
import DescriptionItem from "@/components/shared/description-item";
import { dateFormatter } from "@/lib/date/date-formatter";
import UpdateName from "./update-name";
import UpdateEmail from "./update-email";
import UpdatePassword from "./update-password";

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

function SubscriptionDetails({ subscriptionData }) {
  // If subscription createation data is not available, return null
  if (!subscriptionData?.createdAt) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row gap-2 justify-between items-start">
        <div className="grid gap-2">
          <CardTitle>Subscription Information</CardTitle>
          <CardDescription>Information about the subscription</CardDescription>
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
  );
}

export default function ViewProfile() {
  const { userData, subscriptionData, isLoading, isValidating } =
    useViewUserProfile();

  return (
    <Content
      title="My Profile"
      isValidating={isValidating}
      isLoading={isLoading}
      extra={<BackButton />}
    >
      <div className="grid gap-4">
        {/* User Details */}
        <Card>
          <CardHeader>
            <div className="flex flex-row align-top gap-2 justify-between items-start">
              <CardTitle>{userData?.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <DescriptionItem label="Email" data={userData?.email} />
              <DescriptionItem
                label="Joining Date"
                data={dateFormatter(userData?.createdAt)}
              />
            </div>
          </CardContent>
        </Card>
        {/* Subscription Details */}
        <SubscriptionDetails subscriptionData={subscriptionData} />
        {/* Update Info */}
        <Card>
          <CardHeader>
            <CardTitle>Update Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <UpdateName />
              <UpdateEmail />
              <UpdatePassword />
            </div>
          </CardContent>
        </Card>
      </div>
    </Content>
  );
}

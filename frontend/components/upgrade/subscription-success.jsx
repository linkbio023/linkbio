"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeCheck, MoveLeft } from "lucide-react";
import NavigateButton from "@/components/shared/buttons/navigate-button";
import { applicationUrls } from "@/constants/application-urls";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useStripeFulfillmentWebhook } from "@/services/stripe-services";
import { blinkConfig } from "@/config/blink-config";

function SubscriptionSuccessFallback() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>
          <Skeleton className="w-32 h-4" />
        </CardDescription>
        <div className="flex flex-row items-center gap-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <CardTitle>
            <Skeleton className="w-32 h-8" />
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
        </div>
      </CardContent>

      <CardFooter>
        <Skeleton className="w-32 h-10" />
      </CardFooter>
    </Card>
  );
}

export default function SubscriptionSuccess() {
  const searchParams = useSearchParams();
  const stripeSessionId = searchParams.get("session_id");
  const { isLoading } = useStripeFulfillmentWebhook(stripeSessionId);

  if (isLoading) {
    return <SubscriptionSuccessFallback />;
  }

  return (
    <Card>
      <CardHeader>
        <CardDescription>Thank you for subscribing.</CardDescription>
        <div className="flex flex-row items-center gap-2">
          <BadgeCheck className="w-8 h-8" />
          <CardTitle>Subscription Successful!</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Your subscription has been successfully processed. You can now enjoy
          all the premium features of {blinkConfig?.title}.
        </p>
      </CardContent>

      <CardFooter>
        <NavigateButton
          text={`Go to Dashboard`}
          path={applicationUrls.dashboard.root}
          icon={<MoveLeft className="h-4 w-4" />}
        />
      </CardFooter>
    </Card>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeX, MoveLeft } from "lucide-react";
import NavigateButton from "@/components/shared/buttons/navigate-button";
import { applicationUrls } from "@/constants/application-urls";

export default function SubscriptionFailed() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>
          There was an issue with your subscription
        </CardDescription>
        <div className="flex flex-row items-center gap-2">
          <BadgeX className="w-8 h-8" />
          <CardTitle>Subscription Failed!</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          We couldn&apos;t process your subscription. Please try again.
        </p>
      </CardContent>

      <CardFooter>
        <NavigateButton
          text={`Try Again`}
          path={applicationUrls.dashboard.upgrade}
          icon={<MoveLeft className="h-4 w-4" />}
        />
      </CardFooter>
    </Card>
  );
}

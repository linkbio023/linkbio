import { ArrowLeft, BadgeCheck } from "lucide-react";
import NavigateButton from "@/components/shared/buttons/navigate-button";
import { applicationUrls } from "@/constants/application-urls";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { blinkConfig } from "@/config/blink-config";

export default function ExclusiveFeatureBanner() {
  return (
    <div className="w-full h-full">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-center">
            <BadgeCheck className="h-10 w-10 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <CardTitle>
              This feature is exclusive to our premium users
            </CardTitle>
            <CardDescription>
              Subscribe to unlock this feature and enjoy the full potential of
              {blinkConfig?.title}
            </CardDescription>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center justify-center w-full">
            <NavigateButton
              icon={<ArrowLeft className="h-4 w-4" />}
              path={applicationUrls.dashboard.upgrade}
              text={"Upgrade Now"}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

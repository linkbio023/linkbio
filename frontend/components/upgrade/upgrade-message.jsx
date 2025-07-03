import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { applicationUrls } from "@/constants/application-urls";

export default function UpgradeMessage() {
  return (
    <Card>
      <CardHeader className="md:pt-0 md:p-4">
        <CardTitle>Upgrade to Pro</CardTitle>
        <CardDescription>
          Unlock all features and get unlimited access to our support team.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 md:p-4 md:pt-0">
        <Link href={applicationUrls.dashboard.upgrade} prefetch={false}>
          <Button size="sm" className="w-full">
            Upgrade
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

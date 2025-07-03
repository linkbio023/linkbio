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
import DescriptionItem from "@/components/shared/description-item";
import { dateFormatter } from "@/lib/date/date-formatter";
import {
  useAdministratorsViewBiolink,
  useViewBiolink,
} from "@/services/biolink-services";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, UserSearch } from "lucide-react";
import Link from "next/link";
import { applicationUrls } from "@/constants/application-urls";
import NavigateButton from "@/components/shared/buttons/navigate-button";

export default function BiolinkDetails({ id }) {
  const { biolink, isLoading, isValidating } = useAdministratorsViewBiolink(id);
  const user = biolink?.user;

  return (
    <Content
      title="Link in Bio Details"
      extra={<BackButton />}
      isLoading={isLoading}
      isValidating={isValidating}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {/* Biolink Informations */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{biolink?.name}</CardTitle>
              <CardDescription>Link in Bio Details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <DescriptionItem label="User Name" data={biolink.username} />
                <DescriptionItem
                  label="Created At"
                  data={dateFormatter(biolink.createdAt)}
                />
                <DescriptionItem
                  label="Updated At"
                  data={dateFormatter(biolink.updatedAt)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Link
                href={`/${biolink?.username}`}
                target="_blank"
                prefetch={false}
              >
                <Button>
                  <ArrowUpRight className="h-4 w-4" />
                  <span>Live View</span>
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        {/* User Information */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>{user?.name}</CardTitle>
              <CardDescription>User Details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <DescriptionItem label="Name" data={user?.name} />
                <DescriptionItem
                  label="Joined At"
                  data={dateFormatter(user?.createdAt)}
                />
                <DescriptionItem
                  label="Updated At"
                  data={dateFormatter(user?.updatedAt)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <NavigateButton
                path={`${applicationUrls.dashboard.manage.users.view}${user?.id}`}
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

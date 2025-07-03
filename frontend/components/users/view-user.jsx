"use client";
import Content from "@/components/dashboard/content";
import BackButton from "@/components/shared/buttons/back-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useViewUser } from "@/services/user-services";
import Link from "next/link";
import DescriptionItem from "@/components/shared/description-item";
import { dateFormatter } from "@/lib/date/date-formatter";
import { administatorRoleName } from "@/lib/administator-role-name";

export default function ViewUser({ id }) {
  const { userData, isLoading, isValidating } = useViewUser(id);

  return (
    <Content
      title="User Details"
      extra={<BackButton />}
      isLoading={isLoading}
      isValidating={isValidating}
    >
      <Card>
        <CardHeader>
          <CardTitle>{userData?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <DescriptionItem label="Email" data={userData?.email} />
            <DescriptionItem
              label="Role"
              data={administatorRoleName(userData?.role)}
            />
            <DescriptionItem
              label="Joining Date"
              data={dateFormatter(userData?.createdAt)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Link href={`mailto:${userData?.email}`}>
            <Button variant="outline">Email User</Button>
          </Link>
        </CardFooter>
      </Card>
    </Content>
  );
}

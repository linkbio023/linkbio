"use client";
import { UserSearch } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Content from "@/components/dashboard/content";
import BackButton from "@/components/shared/buttons/back-button";
import NavigateButton from "@/components/shared/buttons/navigate-button";
import { applicationUrls } from "@/constants/application-urls";
import { useCountUsers, useListUsers } from "@/services/user-services";
import PaginationComponent from "@/components/shared/pagination-link";
import { useSearchParams } from "next/navigation";
import TableComponent from "@/components/shared/table";

function ActionButtons({ id }) {
  return (
    <div className="flex justify-end">
      <NavigateButton
        text={`Details`}
        icon={<UserSearch className="h-4 w-4" />}
        path={`${applicationUrls.dashboard.manage.users.view}${id}`}
      />
    </div>
  );
}

const columns = [
  { title: <div className="text-left">Name</div>, dataIndex: "name" },
  { title: <div className="text-right">Action</div>, dataIndex: "action" },
];

export default function UserList() {
  const searchParams = useSearchParams();
  const search = new URLSearchParams(searchParams);
  const page = search.get("page") || 1;
  const params = `?page=${page}`;
  const { userCount } = useCountUsers();
  const { users, isLoading, error } = useListUsers(params);

  const dataSource = users?.map((user) => ({
    name: user?.name,
    action: <ActionButtons id={user?.id} />,
  }));

  return (
    <Content title="Manage Users" extra={<BackButton />}>
      <Card>
        <CardHeader>
          <CardTitle>List of Users</CardTitle>
          <CardDescription>Manage all users here.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Bio Link List Table */}
          <TableComponent
            columns={columns}
            dataSource={dataSource}
            isLoading={isLoading}
          />
        </CardContent>
        <CardFooter>
          {/* Pagination */}
          <PaginationComponent totalContent={userCount.count} />
        </CardFooter>
      </Card>
    </Content>
  );
}

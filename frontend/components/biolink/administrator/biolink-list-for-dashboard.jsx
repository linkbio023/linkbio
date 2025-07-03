"use client";
import { ArrowRight, TextSearch } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import NavigateButton from "@/components/shared/buttons/navigate-button";
import { applicationUrls } from "@/constants/application-urls";
import { useListBiolinks } from "@/services/biolink-services";
import TableComponent from "@/components/shared/table";

function ActionButtons({ id }) {
  return (
    <div className="flex justify-end">
      <NavigateButton
        text={`Details`}
        icon={<TextSearch className="h-4 w-4" />}
        path={`${applicationUrls.dashboard.manage.biolinks.view}${id}`}
      />
    </div>
  );
}

const columns = [
  { title: <div className="text-left">Username</div>, dataIndex: "username" },
  { title: <div className="text-right">Action</div>, dataIndex: "action" },
];

export default function BiolinkListForDashboard() {
  const params = `?page=${1}`;
  const { biolinks, isLoading } = useListBiolinks(params, "administrator");

  const dataSource = biolinks?.map((biolink) => ({
    username: biolink?.username,
    action: <ActionButtons id={biolink?.id} username={biolink?.username} />,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Link in Bio List</CardTitle>
        <CardDescription>View all bio links here</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Bio Link List Table */}
        <TableComponent
          columns={columns}
          dataSource={dataSource}
          isLoading={isLoading}
        />
        {/* Pagination */}
      </CardContent>
      <CardFooter>
        <NavigateButton
          text="View More"
          icon={<ArrowRight className="h-4 w-4" />}
          path={applicationUrls.dashboard.manage.biolinks.list}
        />
      </CardFooter>
    </Card>
  );
}

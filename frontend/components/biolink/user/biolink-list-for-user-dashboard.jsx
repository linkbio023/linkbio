"use client";
import NavigateButton from "@/components/shared/buttons/navigate-button";
import TableComponent from "@/components/shared/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { applicationUrls } from "@/constants/application-urls";
import { useListBiolinks } from "@/services/biolink-services";
import { Settings2 } from "lucide-react";

function ActionButtons({ id }) {
  return (
    <div className="flex justify-end">
      <NavigateButton
        text={`Tweak`}
        icon={<Settings2 className="h-4 w-4" />}
        path={`${applicationUrls.dashboard.biolink.view}${id}`}
      />
    </div>
  );
}

const columns = [
  { title: <div className="text-left">Username</div>, dataIndex: "username" },
  { title: <div className="text-right">Action</div>, dataIndex: "action" },
];

export default function BiolinkListForUserDashboard() {
  const params = `?page=1`;
  const { biolinks, isLoading } = useListBiolinks(params);

  const dataSource = biolinks?.map((biolink) => ({
    username: biolink.username,
    action: <ActionButtons id={biolink?.id} />,
  }));

  return (
    <Card>
      <CardHeader className="flex flex-row gap-2 justify-between items-start">
        <div className="grid gap-2">
          <CardTitle>Your Bio Links</CardTitle>
          <CardDescription>
            Manage your bio links and track their performance
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <TableComponent
          columns={columns}
          dataSource={dataSource}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
}

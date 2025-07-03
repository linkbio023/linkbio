"use client";
import { ArrowUpRight, TextSearch } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Content from "@/components/dashboard/content";
import BackButton from "@/components/shared/buttons/back-button";
import NavigateButton from "@/components/shared/buttons/navigate-button";
import { applicationUrls } from "@/constants/application-urls";
import PaginationComponent from "@/components/shared/pagination-link";
import { useSearchParams } from "next/navigation";
import { useCountBiolinks, useListBiolinks } from "@/services/biolink-services";
import TableComponent from "@/components/shared/table";
import Link from "next/link";

function ActionButtons({ id, username }) {
  return (
    <div className="flex flex-row gap-2 justify-end">
      <Link href={`/${username}`} target="_blank" prefetch={false}>
        <Button variant="outline" size="icon" title="View">
          <ArrowUpRight className="h-4 w-4" />
          <span className="sr-only">View</span>
        </Button>
      </Link>

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

export default function AllBiolinkList() {
  const searchParams = useSearchParams();
  const search = new URLSearchParams(searchParams);
  const page = search.get("page") || 1;
  const params = `?page=${page}`;
  const { biolinks, isLoading, isValidating } = useListBiolinks(
    params,
    "administrator"
  );
  const { biolinkCount } = useCountBiolinks();

  const dataSource = biolinks?.map((biolink) => ({
    username: biolink?.username,
    action: <ActionButtons id={biolink?.id} username={biolink?.username} />,
  }));

  return (
    <Content
      title="Manage Bio Links"
      extra={<BackButton />}
      isValidating={isValidating}
    >
      <Card>
        <CardHeader>
          <CardTitle>List of Bio Links</CardTitle>
          <CardDescription>Manage all bio links here.</CardDescription>
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
          <PaginationComponent totalContent={biolinkCount.count} />
        </CardFooter>
      </Card>
    </Content>
  );
}

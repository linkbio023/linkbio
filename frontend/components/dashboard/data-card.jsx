import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

export default function DashboardDataCard({
  icon,
  title,
  count,
  isLoading,
  link,
}) {
  if (!link) return null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {/* Icon */}
        {icon}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-full" />
        ) : (
          <div className="text-2xl font-bold">{count}</div>
        )}
      </CardContent>
      {/* <Separator /> */}
      <CardFooter>
        <div className="w-full cursor-pointer mt-4">
          <Link href={link} prefetch={false}>
            {/* <div className="flex flex-row justify-between items-center">
              <span className="text-sm">Details</span>
              <ChevronRight className="h-4 w-4" />
            </div> */}{" "}
            <Button variant="outline" size="sm" className="w-full">
              <span>Details</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

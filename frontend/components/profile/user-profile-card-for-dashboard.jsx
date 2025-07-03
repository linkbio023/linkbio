"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, CircleUser } from "lucide-react";
import Image from "next/image";
import { applicationUrls } from "@/constants/application-urls";
import { useAuth } from "@/context/AuthUserContext";
import { useCustomClaims } from "@/services/user-services";
import { Button } from "../ui/button";

function planBadge(plan) {
  switch (plan) {
    case "pro":
      return "Pro";
    case "premium":
      return "Premium";
    case "free":
      return "Free Plan";
    default:
      return "Unknown";
  }
}

export default function UserProfileCardForDashboard() {
  const { authUser, loading } = useAuth();
  const { userSubscription } = useCustomClaims();
  const userPhotoURL = authUser?.photoURL;
  const userName = authUser?.displayName;
  const userSubscriptionPlan = userSubscription?.plan;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{/*title*/}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {/* Image, Name, subscription */}
        <div className="flex flex-row items-center space-x-2">
          {userPhotoURL ? (
            <Image
              height={50}
              width={50}
              src={userPhotoURL}
              alt="User profile"
              className="h-12 w-12 rounded-full"
            />
          ) : (
            <CircleUser className="h-12 w-12" />
          )}
          <div className="flex flex-col">
            {loading ? (
              <>
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </>
            ) : (
              <>
                <div className="text-sm font-medium">{userName}</div>
                <div className="text-xs">{planBadge(userSubscriptionPlan)}</div>
              </>
            )}
          </div>
        </div>
      </CardContent>
      {/* <Separator /> */}
      <CardFooter>
        <div className="w-full mt-1">
          <Link href={applicationUrls.dashboard.profile}>
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

"use client";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  CirclePlus,
  Loader2,
  MoveRight,
  Settings2,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Content from "@/components/dashboard/content";
import BackButton from "@/components/shared/buttons/back-button";
import NavigateButton from "@/components/shared/buttons/navigate-button";
import { applicationUrls } from "@/constants/application-urls";
import TableComponent from "@/components/shared/table";
import {
  useCheckUsername,
  useCountBiolinksByUser,
  useCreateBiolink,
  useListBiolinks,
} from "@/services/biolink-services";
import { useState } from "react";
import { BiolinkDTO } from "@/DTO/biolink";
import PaginationComponent from "@/components/shared/pagination-link";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import BiolinkDeleteButton from "../biolink-delete-button";
import { useCustomClaims } from "@/services/user-services";
import ErrorAlert from "@/components/shared/alert/error-alert";

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
        text={`Tweak`}
        icon={<Settings2 className="h-4 w-4" />}
        path={`${applicationUrls.dashboard.biolink.view}${id}`}
      />
      <BiolinkDeleteButton id={id} />
    </div>
  );
}

function UsernameAvailable({ username }) {
  const { trigger, isMutating } = useCreateBiolink();

  async function handleCreateBiolink() {
    const biolink = new BiolinkDTO().setUsername(username).build();
    await trigger({ biolink });
  }

  return (
    <div className="flex flex-row gap-2 justify-between items-center p-2 rounded-md bg-green-100">
      <div className="flex flex-row gap-2 items-center">
        <div className="col-span-1">
          <Check className="h-4 w-4" />
        </div>
        <div className="col-span-3 text-sm font-medium text-gray-600">
          <span className="font-semibold text-sm">{username}</span> Available
        </div>
      </div>
      <div className="col-span-1">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleCreateBiolink}
          disabled={isMutating}
        >
          <span>Create</span>
          {isMutating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MoveRight className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

function UsernameNotAvailable({ username }) {
  return (
    <div className="flex flex-row gap-2 justify-between items-center p-3 rounded-md bg-red-100">
      <div className="col-span-1">
        <X className="h-4 w-4" />
      </div>
      <div>
        <span className="font-semibold text-sm">{username}</span>
      </div>
      <div className="col-span-3 text-sm font-medium text-gray-600">
        Not Available
      </div>
    </div>
  );
}

function AddNewBioLinkDialog() {
  const [username, setUsername] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showAvailability, setShowAvailability] = useState(false);
  const { usernameAvailability, isLoading } = useCheckUsername(username);
  const { biolinkCount } = useCountBiolinksByUser();
  const { userSubscription } = useCustomClaims();

  function handleSubscriptionBasedAccess() {
    const usersBiolinkCount = biolinkCount?.count;
    const usersSubscriptionPlan = userSubscription?.plan;
    // Restrict free user up to 30 biolinks
    if (usersSubscriptionPlan == "free" && usersBiolinkCount >= 30) {
      return {
        success: false,
        message: "Free user's can create up to 30 biolinks",
      };
    }
    
    // Restrict Premium users up to 60 biolinks
    if (usersSubscriptionPlan == "premium" && usersBiolinkCount >= 60) {
      return {
        success: false,
        message: "Premium subscriber's can create up to 60 biolinks",
      };
    }

    // Resrict Pro user up to 100 biolinks
    if (usersSubscriptionPlan == "pro" && usersBiolinkCount >= 100) {
      return {
        success: false,
        message: "Pro subscriber's can create up to 100 biolinks",
      };
    }

    return {
      success: true,
    };
  }

  function handleValidation(event) {
    if (showAvailability) {
      setShowAvailability(false);
    }

    const username = event.target.value;

    // username must be between 2 and 20 characters long.
    const length = username?.length;
    if (length < 2 || length > 20) {
      setErrorMessage("Username must be between 2 and 20 characters long.");
    }

    // username must be alphanumeric, lowercase and can contain underscore. space or special characters are not allowed.
    const regex = /^[a-z0-9_]+$/;
    if (!regex.test(username)) {
      setErrorMessage(
        "Username can contain only lowercase letters, numbers and underscorees."
      );
    } else {
      setErrorMessage(null);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const username = event.target.username.value;
    setUsername(username);
    setShowAvailability(true);
  }

  const subscriptionAccess = handleSubscriptionBasedAccess();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus className="h-4 w-4" />
          <span>Create</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>BioLink List</DialogTitle>
          <DialogDescription>
            Here is a list of your BioLinks.
          </DialogDescription>
        </DialogHeader>
        {subscriptionAccess?.success == true ? (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="username" className="sr-only">
                    Username
                  </Label>
                  <Input
                    type="text"
                    id="username"
                    placeholder="Write username"
                    onChange={handleValidation}
                    maxLength={20}
                    minLength={2}
                    required
                  />
                </div>
                <Button type="submit" disabled={isLoading || errorMessage}>
                  <span>Check</span>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errorMessage && (
                <p className="text-red-500 text-xs">{errorMessage}</p>
              )}
            </div>
          </form>
        ) : (
          <ErrorAlert
            title="Limit Reached"
            message={subscriptionAccess?.message}
          />
        )}
        {/* If the username is available show available text on the bottom and add a take and continue button.*/}
        {/* If the username is not available show not available text on the bottom.*/}
        {/* if loading show loading */}
        {showAvailability &&
          !isLoading &&
          usernameAvailability?.isAvailable && (
            <UsernameAvailable username={username} />
          )}
        {showAvailability &&
          !isLoading &&
          !usernameAvailability?.isAvailable && (
            <UsernameNotAvailable username={username} />
          )}

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const columns = [
  { title: <div className="text-left">Username</div>, dataIndex: "username" },
  { title: <div className="text-right">Action</div>, dataIndex: "action" },
];

export default function BioLinkList() {
  const searchParams = useSearchParams();
  const search = new URLSearchParams(searchParams);
  const page = search.get("page") || 1;
  const params = `?page=${page}`;
  const { biolinks, isLoading, isValidating } = useListBiolinks(params);
  const { biolinkCount } = useCountBiolinksByUser();

  const dataSource = biolinks?.map((biolink) => ({
    username: biolink.username,
    action: <ActionButtons id={biolink?.id} username={biolink?.username} />,
  }));

  return (
    <Content
      title="Bio Links"
      extra={<BackButton />}
      isValidating={isValidating}
    >
      <Card>
        <CardHeader className="flex flex-row gap-2 justify-between items-start">
          <div className="grid gap-2">
            <CardTitle>Your Bio Links</CardTitle>
            <CardDescription>
              Manage your bio links and track their performance
            </CardDescription>
          </div>
          <AddNewBioLinkDialog />
        </CardHeader>
        <CardContent>
          <TableComponent
            columns={columns}
            dataSource={dataSource}
            isLoading={isLoading}
          />
        </CardContent>
        <CardFooter>
          <PaginationComponent totalContent={biolinkCount.count} />
        </CardFooter>
      </Card>
    </Content>
  );
}

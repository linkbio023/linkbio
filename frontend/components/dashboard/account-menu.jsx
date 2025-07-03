"use client";
import {
  CircleUser,
  HeartHandshake,
  Loader2,
  LogOut,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthUserContext";
import Image from "next/image";
import { applicationUrls } from "@/constants/application-urls";
import { memo } from "react";
import Link from "next/link";

const AccountMenu = memo(function AccountMenuComponent() {
  const { signOutHandler, authUser, loading } = useAuth();

  function AuthUserImage() {
    const photoURL = authUser?.photoURL;
    if (photoURL) {
      return (
        <Image
          height={30}
          width={30}
          src={photoURL}
          alt="User profile"
          className="h-7 w-7 rounded-full"
        />
      );
    } else {
      return <CircleUser className="h-7 w-7" />;
    }
  }

  async function handleLogout() {
    try {
      await signOutHandler();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <AuthUserImage />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={applicationUrls.dashboard.profile} prefetch={false}>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        <Link href={applicationUrls.dashboard.support.list} prefetch={false}>
          <DropdownMenuItem>
            <HeartHandshake className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="mr-2 h-4 w-4" />
          )}
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export default AccountMenu;

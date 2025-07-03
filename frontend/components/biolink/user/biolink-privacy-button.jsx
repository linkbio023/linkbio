"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { applicationUrls } from "@/constants/application-urls";
import { Unplug } from "lucide-react";
import Link from "next/link";

export function BiolinkPrivacyButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Unplug className="h-4 w-4" />
          <span className="sr-only">Privacy</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 mx-2">
        <ul className="mt-2 grid space-y-4">
          <li>
            <Link href={applicationUrls.pages.privacyPolicy} prefetch={false}>
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href={applicationUrls.pages.termsOfService} prefetch={false}>
              Terms of Service
            </Link>
          </li>
          <li>
            <Link href={applicationUrls.pages.security} prefetch={false}>
              Security
            </Link>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}

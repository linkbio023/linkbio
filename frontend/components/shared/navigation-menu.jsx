"use client";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { applicationUrls } from "@/constants/application-urls";
import LogoDark from "@/components/shared/logo-dark";
import { blinkConfig } from "@/config/blink-config";
import { useAuth } from "@/context/AuthUserContext";

// Logo
function Logo() {
  return (
    <div className="flex flex-row gap-2 items-center">
      {/* Logo */}
      <div className="w-full h-auto min-w-6 max-w-8">
        <LogoDark />
      </div>
      <span className="text-xl font-bold">{blinkConfig?.title}</span>
    </div>
  );
}

// Login or Go to Dashboard Button (if logged in)
function MobileLoginButton() {
  const { authUser } = useAuth();
  return (
    <Link
      href={
        authUser ? applicationUrls.dashboard.root : applicationUrls.login.root
      }
      prefetch={false}
      className="md:hidden"
    >
      <Button size="sm" className="w-full mt-8">
        {authUser ? "Dashboard" : "Login"}
      </Button>
    </Link>
  );
}

function DesktopLoginButton() {
  const { authUser } = useAuth();

  return (
    <Link
      href={
        authUser ? applicationUrls.dashboard.root : applicationUrls.login.root
      }
      prefetch={false}
    >
      <Button>{authUser ? "Dashboard" : "Login"}</Button>
    </Link>
  );
}

// Mobile Menu
function MobileMenu() {
  return (
    <div className="flex flex-row justify-between items-center gap-4 md:hidden">
      {/* Logo */}
      <Link href="/">
        <Logo />
      </Link>
      {/* Sider */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <SheetDescription />
          <nav className="grid gap-2 text-sm font-medium">
            <div className="flex items-center gap-2">
              <div className="w-full h-full max-w-6 my-4">
                <Logo />
              </div>
              <SheetTitle className="sr-only">{blinkConfig?.title}</SheetTitle>
            </div>
            <ul className="grid gap-4">
              <li>
                <Link href="/" prefetch={false}>
                  Home
                </Link>
              </li>
              <li>
                <Link href={applicationUrls.pages.aboutUs} prefetch={false}>
                  About
                </Link>
              </li>
              <li>
                <Link href={applicationUrls.pages.contactUs} prefetch={false}>
                  Contact
                </Link>
              </li>
            </ul>
            {/* Login Button */}
            <MobileLoginButton />
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function DesktopMenu() {
  return (
    <div className="hidden md:block">
      <nav className="flex flex-row justify-between items-center gap-4">
        {/* Logo */}
        <Link href="/">
          <Logo />
        </Link>
        {/* Navigation links */}
        <ul className="flex flex-row gap-4">
          <li>
            <Link href="/" prefetch={false}>
              Home
            </Link>
          </li>
          <li>
            <Link href={applicationUrls.pages.aboutUs} prefetch={false}>
              About
            </Link>
          </li>
          <li>
            <Link href="/#pricing" prefetch={false}>
              Pricing
            </Link>
          </li>
          <li>
            <Link href={applicationUrls.pages.contactUs} prefetch={false}>
              Contact
            </Link>
          </li>
        </ul>
        {/* Login Button */}
        <DesktopLoginButton />
      </nav>
    </div>
  );
}

export default function NavigationMenu() {
  return (
    <div className="fixed inset-x-0 z-40 w-full">
      <div className="w-full backdrop-blur-sm">
        <div className="container mx-auto p-4">
          {/* Desktop Menu */}
          <DesktopMenu />
          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
      <div className="w-full backdrop-blur-xs backdrop-brightness-110 h-0.5" />
    </div>
  );
}

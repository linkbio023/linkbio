"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useCreateStripeSubscriptionSession } from "@/services/stripe-services";
import { StripeDTO } from "@/DTO/stripe";
import SectionBadge from "@/components/home-page/section-badge";

function Item({ text }) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-neutral-200">
      <Check size={18} className="text-primary" />
      {text}
    </div>
  );
}

function Header() {
  return (
    <div className="text-center">
      <SectionBadge>Pricing</SectionBadge>
      <h2 className="mt-6 text-3xl font-bold">
        Simple, <br /> Transparent Pricing
      </h2>
      <p className="mt-4 text-gray-600 dark:text-neutral-400">
        Choose a plan that works for you. All plans include a 14-day free trial.
      </p>
    </div>
  );
}

export default function PriceCards({
  disableFree = false,
  dontShowHeader = false,
}) {
  const { trigger, isMutating } = useCreateStripeSubscriptionSession();
  const [isYearly, setIsYearly] = useState(false);
  const proMonthlyPrice = 3.99;
  const proYearlyPrice = 39;
  const premiumMonthlyPrice = 7.99;
  const premiumYearlyPrice = 79;

  function handleOnCheckedChange() {
    setIsYearly((prev) => !prev);
  }

  const monthlyPrices = {
    pro: proMonthlyPrice,
    premium: premiumMonthlyPrice,
    tag: "/month",
  };

  const yearlyPrices = {
    pro: proYearlyPrice,
    premium: premiumYearlyPrice,
    tag: "/year",
  };

  const prices = isYearly ? yearlyPrices : monthlyPrices;

  async function handleOnSubscribe(plan) {
    const stripe = new StripeDTO()
      .setBillingPeriod(isYearly ? "yearly" : "monthly")
      .setPlan(plan)
      .setPlatform("stripe")
      .build();

    await trigger(stripe);
  }

  return (
    <div className="mt-10" id="pricing">
      {/* Header  */}
      {!dontShowHeader && <Header />}
      <div className="flex flex-col items-center justify-center mt-10">
        {/* Switch */}
        <div className="flex items-center gap-4 mb-6">
          <Label>Monthly</Label>
          <Switch
            onCheckedChange={handleOnCheckedChange}
            aria-label="Switch plan button"
          />
          <Label className="relative">
            Yearly
            <span className="absolute -top-10 start-auto -end-20">
              <span className="flex items-center">
                <svg
                  className="w-14 h-8 -me-6"
                  width="45"
                  height="25"
                  viewBox="0 0 45 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M43.2951 3.47877C43.8357 3.59191 44.3656 3.24541 44.4788 2.70484C44.5919 2.16427 44.2454 1.63433 43.7049 1.52119L43.2951 3.47877ZM4.63031 24.4936C4.90293 24.9739 5.51329 25.1423 5.99361 24.8697L13.8208 20.4272C14.3011 20.1546 14.4695 19.5443 14.1969 19.0639C13.9242 18.5836 13.3139 18.4152 12.8336 18.6879L5.87608 22.6367L1.92723 15.6792C1.65462 15.1989 1.04426 15.0305 0.563943 15.3031C0.0836291 15.5757 -0.0847477 16.1861 0.187863 16.6664L4.63031 24.4936ZM43.7049 1.52119C32.7389 -0.77401 23.9595 0.99522 17.3905 5.28788C10.8356 9.57127 6.58742 16.2977 4.53601 23.7341L6.46399 24.2659C8.41258 17.2023 12.4144 10.9287 18.4845 6.96211C24.5405 3.00476 32.7611 1.27399 43.2951 3.47877L43.7049 1.52119Z"
                    fill="currentColor"
                    className="fill-gray-300 dark:fill-neutral-700"
                  />
                </svg>
                <Badge>Save 20%</Badge>
              </span>
            </span>
          </Label>
        </div>
        {/* Cards */}
        <div className="flex flex-wrap flex-row gap-6 items-center justify-center">
          {/* Basic */}
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle className="mb-4 text-sm font-medium text-center">
                Basic
              </CardTitle>
              <p className="font-bold text-5xl text-center text-gray-800 dark:text-neutral-200">
                Free
              </p>
              <CardDescription className="text-center">
                Forever Free
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Item text="1 Bio Link" />
                <Item text="Unlimited Visits" />
                <Item text="QR Code Generation" />
                <Item text="Performence Analytics" />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                disabled={isMutating || disableFree}
              >
                Get Started
              </Button>
            </CardFooter>
          </Card>
          {/* Featured */}
          <Card className="w-[350px] border-2 border-primary shadow-xl">
            <CardHeader>
              <div className="mb-4 flex justify-center items-center">
                <Badge>Most Popular</Badge>
              </div>
              <CardTitle className="mb-4 text-sm font-medium text-center">
                Pro
              </CardTitle>
              <p className="text-center text-gray-800 dark:text-neutral-200">
                <span className="font-bold text-2xl">$</span>
                <span className="font-bold text-5xl">{prices.pro}</span>
                <span className="text-sm">{prices.tag}</span>
              </p>
              <CardDescription className="text-center">
                All the basics for individuals and professionals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Item text="5 Bio Link" />
                <Item text="Unlimited Visits" />
                <Item text="Advanced QR Code Features" />
                <Item text="Performence Analytics" />
                <Item text="24/7 Premium Support" />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={async () => await handleOnSubscribe("pro")}
                disabled={isMutating}
              >
                Get Started
              </Button>
            </CardFooter>
          </Card>
          {/* Premium */}
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle className="mb-4 text-sm font-medium text-center">
                Premium
              </CardTitle>
              <p className="text-center text-gray-800 dark:text-neutral-200">
                <span className="font-bold text-2xl">$</span>
                <span className="font-bold text-5xl">{prices.premium}</span>
                <span className="text-sm">{prices.tag}</span>
              </p>
              <CardDescription className="text-center">
                All the basics for individuals and professionals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Item text="10 Bio Link" />
                <Item text="Unlimited Visits" />
                <Item text="QR Code Generation" />
                <Item text="Performence Analytics" />
                <Item text="24/7 Premium Support" />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={async () => await handleOnSubscribe("premium")}
                disabled={isMutating}
              >
                Get Started
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

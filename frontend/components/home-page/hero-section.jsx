import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { applicationUrls } from "@/constants/application-urls";
import { blinkConfig } from "@/config/blink-config";

export default function HeroSection() {
  return (
    <div className="w-full bg-white bg-[url('/images/blurry-balls.svg')] bg-cover bg-center bg-scroll">
      <div className="py-32 container flex flex-col gap-8 justify-center align-middle items-center w-full h-full">
        <h1>
          <span className="bg-linear-to-r from-primary via-red-500 to-primary bg-clip-text text-transparent text-8xl xl:text-9xl font-bold drop-shadow-2xl">
            {blinkConfig.title}
          </span>
        </h1>
        <div className="text-3xl font-medium text-black text-center">
          A Glimpse into Your World
          <br />
        </div>
        <p className="font-medium text-center text-gray-600">
          Blink, a fleeting moment, holds a universe - waiting to be explored.{" "}
          <br />
          Blink, our bio link service, captures that essence. <br /> It&apos;s
          the quick and easy way to share your digital world.
        </p>
        <Link href={applicationUrls.login.root}>
          <Button size="lg" className="shadow-xl">
            <span>Get Started</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

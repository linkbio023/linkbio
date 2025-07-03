"use client";
import Image from "next/image";
import BackButton from "@/components/shared/buttons/back-button";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center h-svh">
      <div className="flex flex-col items-center gap-4 text-center">
        <Image
          src="/images/questions-bro.svg"
          alt="Empty"
          width={400}
          height={400}
          className="w-96 h-auto p-4"
        />
        <h1 className="font-bold text-2xl">
          Sorry, the page you are looking for is not found!
        </h1>
        <BackButton />
      </div>
    </div>
  );
}

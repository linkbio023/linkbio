import Image from "next/image";
import { Button } from "@/components/ui/button";
import Content from "@/components/dashboard/content";

export default function ErrorContent({ reset }) {
  function handleReset() {
    reset();
  }

  return (
    <Content title="Error">
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-center">
          <Image
            src="/images/questions-bro.svg"
            alt="Empty"
            width={400}
            height={400}
            className="w-96 h-auto p-4"
          />
          <h2 className="font-bold tracking-tight">
            Sorry, something went wrong!
          </h2>
          <Button onClick={handleReset} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    </Content>
  );
}

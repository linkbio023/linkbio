import { applicationUrls } from "@/constants/application-urls";
import Link from "next/link";

export default function CTA() {
  return (
    <div className=" bg-gray-900 p-8 xl:p-16 rounded-3xl mt-12">
      <div className="grid gap-4 h-full">
        <h2 className="text-3xl xl:text-6xl font-bold text-white">
          One Place
          <br />
          <span className="bg-linear-to-r from-yellow-300 via-red-500 to-violet-500 bg-clip-text text-transparent">
            Everything
          </span>{" "}
          on Blink
        </h2>
        <Link href={applicationUrls.login.root}>
          <button className="mt-6 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg w-full max-w-80">
            Join Now
          </button>
        </Link>
      </div>
    </div>
  );
}

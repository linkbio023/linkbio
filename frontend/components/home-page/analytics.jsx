import Image from "next/image";
import SectionBadge from "./section-badge";

export default function Analytics() {
  return (
    <div className="mt-16">
      <div className="text-center">
        <SectionBadge>Insights</SectionBadge>
        <h2 className="mt-6 text-3xl font-bold">Understand your Audience</h2>
        <p className="mt-4 text-gray-600 dark:text-neutral-400">
          Get detailed insights into who your audience is and what they are
          looking for.
        </p>
      </div>

      <div className="bg-slate-100 p-8 xl:p-16 rounded-3xl mt-6">
        <div className="grid gap-4 md:grid-cols-2 items-center">
          <Image
            src="/images/analytics-curve.svg"
            alt="Analytics Curve"
            height={200}
            width={200}
            className="md:col-span-1 w-full h-auto"
          />
          <div className="md:col-span-1">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 bg-white p-6 rounded-3xl">
                <h3 className="text-md md:text-xl font-bold text-gray-800">
                  Audience Size
                </h3>
                <p className="mt-2 text-gray-600 dark:text-neutral-400">
                  Get detailed insights into the size of your audience.
                </p>
              </div>
              <div className="md:col-span-1 bg-primary/30 p-6 rounded-3xl">
                <h3 className="text md:text-xl font-bold text-gray-800">
                  Location
                </h3>
                <p className="mt-2 text-gray-600 dark:text-neutral-400">
                  Get detailed insights into the location of your audience.
                </p>
              </div>

              <div className="md:col-span-1 bg-primary/20 p-6 rounded-3xl">
                <h3 className="text-md md:text-xl font-bold text-gray-800">
                  OS
                </h3>
                <p className="mt-2 text-gray-600 dark:text-neutral-400">
                  Understand what operating system your audience is using to
                  access your content.
                </p>
              </div>

              <div className="md:col-span-2 bg-white p-6 rounded-3xl">
                <h3 className="text-md md:text-xl font-bold text-gray-800">
                  Traffic Sources
                </h3>
                <p className="mt-2 text-gray-600 dark:text-neutral-400">
                  Get detailed insights into where your audience is coming from.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

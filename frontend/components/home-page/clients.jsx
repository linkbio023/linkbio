import Image from "next/image";

export default function Clients() {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* Title */}
      <div className="sm:w-1/2 xl:w-1/3 mx-auto text-center mb-6">
        <h2 className="text-xl font-semibold md:text-2xl md:leading-tight text-gray-800 dark:text-neutral-200">
          Trusted by the World&apos;s Best Companies and Influencers
        </h2>
      </div>
      {/* End Title */}

      {/* Grid */}
      <div className="my-8 md:my-16 grid grid-cols-3 sm:flex sm:justify-center gap-6 sm:gap-x-12 lg:gap-x-20">
        <Image
          src="/images/clients/brand-1.png"
          width={100}
          height={100}
          alt="Brand 1"
          className="w-24 h-auto"
        />

        <Image
          src="/images/clients/brand-2.png"
          width={100}
          height={100}
          alt="Brand 2"
          className="w-24 h-auto"
        />

        <Image
          src="/images/clients/brand-3.png"
          width={100}
          height={100}
          alt="Brand 3"
          className="w-24 h-auto"
        />

        <Image
          src="/images/clients/brand-4.png"
          width={100}
          height={100}
          alt="Brand 4"
          className="w-24 h-auto"
        />

        <Image
          src="/images/clients/brand-5.png"
          width={100}
          height={100}
          alt="Brand 5"
          className="w-24 h-auto"
        />

        <Image
          src="/images/clients/brand-6.png"
          width={100}
          height={100}
          alt="Brand 6"
          className="w-24 h-auto"
        />
      </div>
      {/* End Grid */}

      {/* Grid */}
      <div className="grid grid-cols-12 sm:flex sm:justify-center gap-6 sm:gap-x-12 lg:gap-x-20">
        <div className="col-span-6 text-center">
          <span className="text-xl md:text-3xl font-semibold text-gray-800 dark:text-neutral-200">
            25000+
          </span>
          <br />
          <span className="text-sm text-gray-600 dark:text-neutral-400">
            Happy Customers
          </span>
        </div>
        {/* End Col */}

        <div className="col-span-6 text-center">
          <span className="text-xl md:text-3xl font-semibold text-gray-800 dark:text-neutral-200">
            50+
          </span>
          <br />
          <span className="text-sm text-gray-600 dark:text-neutral-400">
            Team Members
          </span>
        </div>
        {/* End Col */}

        <div className="col-start-4 col-span-6 text-center">
          <span className="text-xl md:text-3xl font-semibold text-gray-800 dark:text-neutral-200">
            100+
          </span>
          <br />
          <span className="text-sm text-gray-600 dark:text-neutral-400">
            Countries
          </span>
        </div>
        {/* End Col */}
      </div>
      {/* End Grid */}
    </div>
  );
}

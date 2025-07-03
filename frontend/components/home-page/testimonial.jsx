import Image from "next/image";
import SectionBadge from "@/components/home-page/section-badge";

export default function Testimonial() {
  return (
    <div className="mt-12" id="testimonials">
      <div className="text-center">
        <SectionBadge>Testimonials</SectionBadge>
        <h2 className="mt-6 text-3xl font-bold">Humans who Already Love Us</h2>
        <p className="mt-4 text-gray-600 dark:text-neutral-400">
          Here&apos;s what some of our users have to say about their experience
          with Blink.
        </p>
      </div>
      <div className="grid md:grid-cols-2 md:divide-x mt-4">
        {/* Testimonial 1 */}

        <div className="grid gap-8 text-center p-6">
          <div className="flex flex-col items-center justify-center">
            <div className="p-2 bg-gray-100 rounded-full shadow-lg">
              <div className="p-2 bg-gray-200 rounded-full">
                <Image
                  src={`/images/testimonial-face.png`}
                  alt="Testimonial Face"
                  height={100}
                  width={100}
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
          <p className="text-xl font-medium">
            Blink is the perfect tool for influencers. It&apos;s easy to use and
            helps me connect with my audience.
          </p>
          <div>
            <strong>
              <span>John Philip</span>
            </strong>
            <p className="text-sm text-gray-600 mt-2">Influencer | Instagram</p>
          </div>
        </div>

        {/* Testimonial 2 */}

        <div className="grid gap-8 text-center p-6">
          <div className="flex flex-col items-center justify-center">
            <div className="p-2 bg-gray-100 rounded-full shadow-lg">
              <div className="p-2 bg-gray-200 rounded-full">
                <Image
                  src={`/images/profile-picture.jpg`}
                  alt="Testimonial Face"
                  height={100}
                  width={100}
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
          <p className="text-xl font-medium">
            Blink has revolutionized the way I manage my social media. The
            analytics and insights are top-notch.
          </p>
          <div>
            <strong>
              <span>William Smith</span>
            </strong>
            <p className="text-sm text-gray-600 mt-2">
              Affiliate Marketer | Amazon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

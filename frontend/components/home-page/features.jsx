import {
  Activity,
  CloudLightning,
  HeartHandshake,
  QrCode,
  Sparkles,
  SwatchBook,
} from "lucide-react";
import SectionBadge from "@/components/home-page/section-badge";

export default function Features() {
  return (
    <div
      className="mt-16 bg-linear-to-tr from-slate-50 via-primary/20 to-slate-50 w-full"
      id="features"
    >
      <div className="py-12">
        <div className="text-center">
          <SectionBadge>Features</SectionBadge>
        </div>
        <div className="mt-6 container mx-auto">
          <h2 className="text-3xl font-bold text-center">Feature Frenzy</h2>
          <p className="mt-4 text-gray-600 text-center">
            Blink, your bio link powerhouse offers a plethora of features
            designed to make your online presence shine.
          </p>
        </div>
        {/* Features Section */}
        <div className="container mx-auto">
          <div className="grid gap-8 grid-cols-1 auto-rows-fr md:grid-cols-2 lg:grid-cols-3 my-16">
            {/* Feature 1 */}
            <div className="bg-slate-50 rounded-3xl p-8 shadow-[5px_13px_100px_-18px_rgba(0,_0,_0,_0.1)]">
              <div className="flex flex-row items-center align-middle gap-4">
                <Sparkles size={24} className="text-primary" />
                <span className="text-lg font-semibold text-gray-700">
                  Bio Builder
                </span>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Craft a captivating bio with beautiful text blocks, stunning
                backgrounds and more.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-slate-50 rounded-3xl p-8 shadow-[5px_13px_100px_-18px_rgba(0,_0,_0,_0.1)]">
              <div className="flex flex-row items-center align-middle gap-4">
                <SwatchBook size={24} className="text-primary" />
                <span className="text-lg font-semibold text-gray-700">
                  Theme Playground
                </span>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Choose from a vast library of pre-designed themes or create your
                own with custom colors, and backgrounds.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-slate-50 rounded-3xl p-8 shadow-[5px_13px_100px_-18px_rgba(0,_0,_0,_0.1)]">
              <div className="flex flex-row items-center align-middle gap-4">
                <Activity size={24} className="text-primary" />
                <span className="text-lg font-semibold text-gray-700">
                  Analytics Advantage
                </span>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Track clicks, views, and user behaviour to gain valuable
                insights.
              </p>
            </div>
            {/* Feature 4 */}
            <div className="bg-slate-50 rounded-3xl p-8 shadow-[5px_13px_100px_-18px_rgba(0,_0,_0,_0.1)]">
              <div className="flex flex-row items-center align-middle gap-4">
                <QrCode size={24} className="text-primary" />
                <span className="text-lg font-semibold text-gray-700">
                  QR Code Generator
                </span>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Generate QR codes for offline promotion and easy access.
              </p>
            </div>
            {/* Feature 5 */}
            <div className="bg-slate-50 rounded-3xl p-8 shadow-[5px_13px_100px_-18px_rgba(0,_0,_0,_0.1)]">
              <div className="flex flex-row items-center align-middle gap-4">
                <HeartHandshake size={24} className="text-primary" />
                <span className="text-lg font-semibold text-gray-700">
                  Premium Support
                </span>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Our team of experts is available around the clock to assist you
                with any queries.
              </p>
            </div>
            {/* Feature 6 */}
            <div className="bg-slate-50 rounded-3xl p-8 shadow-[5px_13px_100px_-18px_rgba(0,_0,_0,_0.1)]">
              <div className="flex flex-row items-center align-middle gap-4">
                <CloudLightning size={24} className="text-primary" />
                <span className="text-lg font-semibold text-gray-700">
                  Super Fast
                </span>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Enjoy blazing fast load times and instant updates with our
                cutting-edge technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

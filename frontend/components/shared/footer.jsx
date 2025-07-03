import { Separator } from "@/components/ui/separator";
import LogoLight from "@/components/shared/logo-light";
import { blinkConfig } from "@/config/blink-config";
import Link from "next/link";
import { applicationUrls } from "@/constants/application-urls";

export default function FooterSection() {
  return (
    <footer className="py-4 bg-gray-950 text-white">
      {/* Footer Body */}
      <div className="container mx-auto">
        <div className="grid gap-8 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 my-16">
          {/* Footer Section 1 */}
          <div>
            {/* Logo */}
            <div className="flex flex-row items-center align-middle gap-2">
              <div className="w-full h-full max-w-8">
                <LogoLight />
              </div>
              <span className="text-xl font-bold">{blinkConfig?.title}</span>
            </div>
            <p className="mt-4 text-sm text-gray-200">
              Elevate your online presence, one click at a time. Curated,
              connected, and compelling.
            </p>
          </div>
          {/* Footer Section 2 */}
          <div>
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="mt-2 grid space-y-4 text-sm text-gray-200">
              <li>
                <Link href={applicationUrls.pages.aboutUs} prefetch={false}>
                  About
                </Link>
              </li>
              <li>
                <Link href={applicationUrls.pages.career} prefetch={false}>
                  Careers
                </Link>
              </li>
              <li>
                <Link href={applicationUrls.pages.contactUs} prefetch={false}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          {/* Footer Section 3 */}
          <div>
            <h4 className="text-sm font-semibold">Product</h4>
            <ul className="mt-2 grid space-y-4 text-sm text-gray-200">
              <li>
                <Link href="/#features" prefetch={false}>
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" prefetch={false}>
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/#faq" prefetch={false}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/#pricing" prefetch={false}>
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          {/* Footer Section 4 */}
          <div>
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="mt-2 grid space-y-4 text-sm text-gray-200">
              <li>
                <Link
                  href={applicationUrls.pages.privacyPolicy}
                  prefetch={false}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href={applicationUrls.pages.termsOfService}
                  prefetch={false}
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href={applicationUrls.pages.security} prefetch={false}>
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Footer Section 5 */}
          <div>
            <h4 className="text-sm font-semibold">Connect</h4>
            <ul className="mt-2 grid space-y-4 text-sm text-gray-200">
              <li>
                <Link
                  href={blinkConfig.socialMedia.twitter}
                  prefetch={false}
                  target="_blank"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href={blinkConfig.socialMedia.facebook}
                  prefetch={false}
                  target="_blank"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  href={blinkConfig.socialMedia.instagram}
                  prefetch={false}
                  target="_blank"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href={blinkConfig.socialMedia.linkedIn}
                  prefetch={false}
                  target="_blank"
                >
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Footer End Section */}
        <div className="flex flex-row justify-start gap-4 items-center align-middle">
          {/* Logo */}
          <div className="flex flex-row items-center align-middle gap-2">
            <div className="w-full h-full max-w-6">
              <LogoLight />
            </div>
            <span className="text-sm font-bold">{blinkConfig?.title}</span>
          </div>
          {/* Seperator Vertical */}
          <Separator orientation="vertical" />
          {/* Copyright */}
          <div className="text-sm text-gray-400">
            © 2025 {blinkConfig?.title}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

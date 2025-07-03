import { blinkConfig } from "@/config/blink-config";
import Image from "next/image";

export default function ContactUsPage() {
  return (
    <div>
      {/* Description */}
      <div className="mt-8 grid gap-8 max-w-3xl mx-auto">
        {/* Title */}
        <h1 className="mt-8 text-3xl font-bold">
          Contact with {blinkConfig.title}
        </h1>
        {/* Featured Image */}
        <Image
          src="/images/photo-background.jpg"
          alt="About Us"
          width={800}
          height={400}
          className="mt-4 rounded-3xl shadow-md w-full h-auto"
        />
        <p>
          We&apos;d love to hear from you! Whether you have questions about our
          platform, need assistance with your account, or just want to share
          your feedback, we&apos;re here to help. Here are a few ways to get in
          touch with the Blink team:
        </p>
        <h2 className="font-bold text-2xl">General Inquiries:</h2>
        <p>
          For general questions about Blink, our features, or anything else,
          please feel free to email us at [Your General Email Address].
          We&apos;ll do our best to respond to your inquiry as quickly as
          possible.
        </p>
        <h2 className="font-bold text-2xl">Support</h2>

        <div>
          If you&apos;re experiencing any issues with your Blink account or need
          technical assistance, our support team is ready to assist you. Please
          email us at [Your Support Email Address] with a detailed description
          of the problem, and we&apos;ll get back to you as soon as we can.
          Providing screenshots or specific examples will help us resolve your
          issue more efficiently.
        </div>
        <h2 className="font-bold text-2xl">Sales</h2>

        <div>
          Interested in using Blink for your business or organization? Our sales
          team can help you find the perfect plan to meet your needs. Contact us
          at [Your Sales Email Address] to discuss your requirements and learn
          more about our enterprise solutions.
        </div>
        <h2 className="font-bold text-2xl">Feedback</h2>

        <p>
          We value your feedback and are constantly striving to improve Blink.
          Let us know what you think about our platform - the good, the bad, and
          everything in between! You can share your feedback by emailing us at
          [Your Feedback Email Address].
        </p>
        <p>We look forward to hearing from you!</p>
      </div>
    </div>
  );
}

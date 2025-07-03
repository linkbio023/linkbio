import Image from "next/image";

export default function PrivacyPolicyPage() {
  return (
    <div>
      {/* Description */}
      <div className="mt-8 grid gap-8 max-w-3xl mx-auto">
        {/* Title */}
        <h1 className="mt-8 text-3xl font-bold">Privacy Policy</h1>
        {/* Featured Image */}
        <Image
          src="/images/photo-background.jpg"
          alt="About Us"
          width={800}
          height={400}
          className="mt-4 rounded-3xl shadow-md w-full h-auto"
        />
        <p>
          At Blink, we are committed to protecting your privacy. This Privacy
          Policy explains how we collect, use, and share your personal
          information when you use our website and services.
        </p>
        <h2 className="font-bold text-2xl">1. Information We Collect</h2>
        <div>
          We collect several types of information from and about users of our
          Services, including:
          <ul className="list-disc ml-8">
            <li>
              Information you provide directly: When you create an account, fill
              out forms, or otherwise communicate with us, you may provide us
              with information such as your name, email address, username,
              password, and any other information you choose to share.
            </li>
            <li>
              Information we collect automatically: When you use our Services,
              we automatically collect certain information about your device,
              including your IP address, browser type, operating system,
              referring website, pages viewed, and the dates and times of your
              visits. We may also collect information about your activity within
              the Services, such as the links you click and the content you
              view.
            </li>
            <li>
              Information from third parties: We may receive information about
              you from third parties, such as social media platforms, if you
              choose to connect your accounts to our Services.
            </li>
          </ul>
        </div>
        <h2 className="font-bold text-2xl">2. How We Use Your Information</h2>
        <div>
          We use your information for a variety of purposes, including:
          <ul className="list-disc ml-8">
            <li>
              Providing and improving the Services: We use your information to
              operate, maintain, and improve the Services, personalize your
              experience, and provide customer support.
            </li>
            <li>
              Communicating with you: We may use your information to send you
              emails or notifications about your account, updates to the
              Services, or promotional offers. You can opt out of receiving
              promotional emails at any time.
            </li>
            <li>
              Analyzing usage: We use your information to understand how users
              interact with our Services, identify trends, and improve the user
              experience.
            </li>
            <li>
              Legal compliance: We may use your information to comply with
              applicable laws and regulations.
            </li>
          </ul>
        </div>
        <h2 className="font-bold text-2xl">3. How We Share Your Information</h2>
        <div>
          We may share your information with the following categories of third
          parties:
          <ul className="list-disc ml-8">
            <li>
              Service providers: We may share your information with service
              providers who assist us with things like hosting, data storage,
              analytics, and customer support. These service providers are
              contractually obligated to protect your information.
            </li>
            <li>
              Business partners: We may share your information with business
              partners who offer products or services that may be of interest to
              you. We will only do this with your consent.
            </li>
            <li>
              Legal authorities: We may disclose your information to legal
              authorities if required by law or legal process, or if we believe
              in good faith that such disclosure is necessary to protect our
              rights or the safety of others.
            </li>
            <li>
              Business transfers: If we are involved in a merger, acquisition,
              or sale of all or a portion of our assets, your information may be
              transferred as part of that transaction.
            </li>
          </ul>
        </div>
        <h2 className="font-bold text-2xl">4. Data Security</h2>
        <p>
          We take reasonable measures to protect your information from
          unauthorized access, use, or disclosure. However, no data transmission
          over the internet is completely secure.
        </p>
        <h2 className="font-bold text-2xl">
          5. Changes to this Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with a revised Effective Date. Your continued
          use of the Services following the posting of such changes constitutes
          your acceptance of the revised Privacy Policy.
        </p>
      </div>
    </div>
  );
}

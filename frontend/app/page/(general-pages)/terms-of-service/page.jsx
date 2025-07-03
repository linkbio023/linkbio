import Image from "next/image";

export default function TermsOfServicePage() {
  return (
    <div>
      {/* Description */}
      <div className="mt-8 grid gap-8 max-w-3xl mx-auto">
        {/* Title */}
        <h1 className="mt-8 text-3xl font-bold">Terms of Service</h1>
        {/* Featured Image */}
        <Image
          src="/images/photo-background.jpg"
          alt="About Us"
          width={800}
          height={400}
          className="mt-4 rounded-3xl shadow-md w-full h-auto"
        />
        <h2 className="font-bold text-2xl">1. Acceptance of Terms</h2>
        <p>
          Welcome to Blink! By using our services, you agree to be bound by the
          following terms and conditions. Please read these terms carefully. If
          you do not agree to these terms, please do not use our services. Blink
          reserves the right to update and change the terms of service from time
          to time without notice. Any new features that augment or enhance the
          current service, including the release of new tools and resources,
          shall be subject to the terms of service. Continued use of the service
          after any such changes shall constitute your consent to such changes.
        </p>
        <h2 className="font-bold text-2xl">2. Description of Service</h2>
        <p>
          Blink provides a platform for users to create, share, and discover
          short videos. Users can create videos up to 60 seconds in length and
          share them with their followers. Users can also discover new videos
          from other users and interact with them by liking, commenting, and
          sharing. Blink is a social media platform that allows users to connect
          with each other through short videos. Users can follow other users,
          like their videos, and leave comments. Users can also share videos on
          other social media platforms such as Facebook, Twitter, and Instagram.
        </p>
        <h2 className="font-bold text-2xl">3. User Conduct</h2>
        <p>
          You agree to use the service in accordance with all applicable laws
          and regulations. You agree not to use the service for any unlawful
          purpose or in any way that violates the rights of others. You agree
          not to use the service to upload, post, or transmit any content that
          is harmful, offensive, obscene, or otherwise objectionable. You agree
          not to use the service to
        </p>
        <ul className="list-disc ml-8">
          <li>
            upload, post, or transmit any content that is harmful, offensive,
            obscene, or otherwise objectionable
          </li>
          <li>
            upload, post, or transmit any content that is harmful, offensive,
          </li>
          <li>
            upload, post, or transmit any content that is harmful, offensive,
            obscene, or otherwise objectionable
          </li>
        </ul>
        <h2 className="font-bold text-2xl">4. Privacy Policy</h2>
        <p>
          Blink takes your privacy seriously. Please read our privacy policy to
          learn more about how we collect, use, and protect your personal
          information. By using the service, you agree to the collection and use
          of your personal information as described in the privacy policy.
        </p>

        <h2 className="font-bold text-2xl">5. Use of the Services</h2>
        <ul className="list-disc ml-8">
          <li>
            Eligibility: You must be at least 18 years old to use the Services.
          </li>
          <li>
            Permitted Use: You may use the Services for personal, non-commercial
            purposes only. You may not use the Services for any unlawful or
            prohibited purpose.
          </li>
          <li>
            Prohibited Activities: You may not:
            <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
              <li>
                Use the Services in a way that infringes on the rights of
                others, including intellectual property rights.
              </li>
              <li>
                Use the Services to transmit or store harmful or illegal
                content.
              </li>
              <li>
                Attempt to gain unauthorized access to the Services or to any
                part of Blink&apos;s systems.
              </li>
              <li>
                Use the Services to engage in any activity that is harmful,
                harassing, or threatening.
              </li>
            </ul>
          </li>
        </ul>

        <h2 className="font-bold text-2xl">6. Termination</h2>
        <p>
          Blink reserves the right to terminate your account at any time for any
          reason. Blink also reserves the right to modify or discontinue the
          service at any time without notice. Blink shall not be liable to you
          or any third party for any modification, suspension, or
          discontinuation of the service.
        </p>
      </div>
    </div>
  );
}

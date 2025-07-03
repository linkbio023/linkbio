import { blinkConfig } from "@/config/blink-config";
import Image from "next/image";

export default function CareerPage() {
  return (
    <div>
      {/* Description */}
      <div className="mt-8 grid gap-8 max-w-3xl mx-auto">
        {/* Title */}
        <h1 className="mt-8 text-3xl font-bold">
          {blinkConfig.title} Careers - Building the Future of Connection
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
          At {blinkConfig.title}, we&apos;re passionate about simplifying online
          presence and empowering individuals and businesses to connect with
          their audience seamlessly. We believe in fostering a collaborative,
          innovative, and supportive environment where everyone can thrive.
          While we don&apos;t have any open positions at the moment, we&apos;re
          always looking for talented individuals who share our vision.
        </p>
        <h2 className="font-bold text-2xl">Our Values:</h2>
        <div>
          We&apos;re driven by a set of core values that guide our work and
          shape our culture:
          <ul className="list-disc ml-8">
            <li>
              Innovation: We embrace creativity and constantly seek new ways to
              improve our platform and user experience.
            </li>
            <li>
              Collaboration: We believe in the power of teamwork and work
              together to achieve our goals.
            </li>
            <li>
              Customer Focus: We&apos;re dedicated to providing exceptional
              service and exceeding our customers&apos; expectations.
            </li>
            <li>
              Growth Mindset: We encourage continuous learning and development
              for all our team members.
            </li>
            <li>
              Transparency: We believe in open communication and honest
              feedback.
            </li>
          </ul>
        </div>
        <h2 className="font-bold text-2xl">What We Offer:</h2>
        <div>
          While specific benefits may vary depending on the role and location,
          we strive to provide a comprehensive and competitive package that
          includes:
          <ul className="list-disc ml-8">
            <li>
              Meaningful Work: Contribute to a product that makes a real
              difference in how people connect online.
            </li>
            <li>
              Growth Opportunities: Develop your skills and advance your career
              in a fast-paced, dynamic environment.
            </li>
            <li>
              Collaborative Culture: Work alongside a team of passionate and
              talented individuals.
            </li>
            <li>
              Collaborative Culture: Work alongside a team of passionate and
              talented individuals.
            </li>
            <li>
              Flexible Work Environment: We value work-life balance and offer
              flexibility where possible. (This may depend on the role)
            </li>
          </ul>
        </div>
        <div>
          We&apos;re building something special at {blinkConfig.title}, and
          we&apos;d love for you to be a part of it - someday! Stay tuned for
          future opportunities!
        </div>
      </div>
    </div>
  );
}

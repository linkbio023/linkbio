import { blinkConfig } from "@/config/blink-config";
import Image from "next/image";

export default function SecurityPage() {
  return (
    <div>
      {/* Description */}
      <div className="mt-8 grid gap-8 max-w-3xl mx-auto">
        {/* Title */}
        <h1 className="mt-8 text-3xl font-bold">
          {blinkConfig.title} Security - Protecting Your Data
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
          At {blinkConfig.title}, we understand that security is paramount. You
          entrust us with your data, and we take that responsibility seriously.
          This page outlines the measures we employ to protect your information
          and maintain the integrity of our platform.
        </p>
        <h2 className="font-bold text-2xl">Our Commitment to Security</h2>
        <div>
          We believe that security is not a feature, but a foundation. It&apos;s
          woven into every aspect of our platform, from design and development
          to ongoing maintenance and monitoring. We&apos;re constantly working
          to improve our security posture and stay ahead of evolving threats.
          <ul className="list-disc ml-8">
            <li>
              Data Encryption: All data transmitted between your browser and our
              servers is encrypted using industry-standard SSL/TLS encryption.
              This protects your information from eavesdropping and unauthorized
              access during transit. We also encrypt sensitive data at rest.
            </li>
            <li>
              Secure Infrastructure: Our servers are hosted in secure data
              centers with robust physical security measures, including access
              controls, surveillance, and environmental protection. We utilize
              redundant systems and backups to ensure data availability and
              prevent data loss.
            </li>
            <li>
              Access Control: We employ strict access control measures to limit
              access to your data. Only authorized personnel have access to
              sensitive information, and they are required to use strong
              passwords and multi-factor authentication.
            </li>
            <li>
              Regular Security Assessments: We conduct regular security
              assessments, including penetration testing and vulnerability
              scanning, to identify and address potential 1 weaknesses in our
              systems. These assessments are performed by both internal teams
              and independent security experts.
            </li>
            <li>
              Proactive Monitoring: We continuously monitor our systems for
              suspicious activity and security breaches. Our security team is
              alerted to any potential threats and responds promptly to mitigate
              any risks.
            </li>
            <li>
              Data Backups: We regularly back up your data to ensure that it can
              be recovered in the event of a system failure or data loss. These
              backups are stored securely and separately from our primary
              systems.
            </li>
            <li>
              Secure Development Practices: We follow secure coding practices to
              minimize the risk of vulnerabilities in our software. Our
              development team receives regular security training and conducts
              code reviews to ensure that security is considered at every stage
              of the development process.
            </li>
            <li>
              Third-Party Security: We carefully vet all third-party vendors and
              service providers to ensure that they meet our security standards.
              We have contracts in place with these vendors that require them to
              protect your data.
            </li>
            <li>
              Incident Response Plan: We have a comprehensive incident response
              plan in place to address any security incidents promptly and
              effectively. This plan includes procedures for identifying,
              containing, and eradicating threats, as well as communicating with
              affected users.
            </li>
          </ul>
        </div>
        <h2 className="font-bold text-2xl">What You Can Do:</h2>
        <div>
          While we take extensive measures to protect your data, you also play a
          crucial role in maintaining security. Here are some steps you can
          take:
          <ul className="list-disc ml-8">
            <li>
              Strong Passwords: Use strong, unique passwords for your Blink
              account and all your online accounts. Avoid using easily guessable
              passwords like your name, birthday, or common words.
            </li>
            <li>
              Phishing Awareness: Be wary of phishing emails or messages that
              attempt to trick you into revealing your login credentials. Never
              click on links in suspicious emails or provide your password to
              anyone.
            </li>
            <li>
              Software Updates: Keep your software up to date, including your
              operating system, web browser, and any antivirus software.
              Software updates often include security patches that address known
              vulnerabilities.
            </li>
            <li>
              Secure Networks: Avoid using public Wi-Fi networks for sensitive
              activities, as these networks may not be secure.
            </li>
          </ul>
        </div>
        <h2 className="font-bold text-2xl">
          Reporting Security Vulnerabilities:
        </h2>
        <p>
          If you believe you have found a security vulnerability in our
          platform, please report it to us immediately. We appreciate your help
          in keeping Blink secure.
        </p>
        <h2 className="font-bold text-2xl">Continuous Improvement:</h2>
        <p>
          Security is an ongoing process. We are constantly evaluating and
          improving our security measures to stay ahead of the latest threats
          and protect your data. Your trust is important to us, and we are
          committed to maintaining the highest standards of security.
        </p>
      </div>
    </div>
  );
}

import Image from "next/image";

export default function AboutUsPage() {
  return (
    <div>
      {/* Description */}
      <div className="mt-8 grid gap-8 max-w-3xl mx-auto">
        {/* Title */}
        <h1 className="mt-8 text-3xl font-bold">About Us</h1>
        {/* Featured Image */}
        <Image
          src="/images/photo-background.jpg"
          alt="About Us"
          width={800}
          height={400}
          className="mt-4 rounded-3xl shadow-md w-full h-auto"
        />
        <h2 className="font-bold text-2xl">Who We Are</h2>
        <p>
          We are a team of passionate individuals who believe in the power of
          technology to make the world a better place. Our mission is to provide
          digital identity solutions that are secure, private, and easy to use.
          We are committed to helping businesses and individuals protect their
          online identities and keep their data safe and secure. Our team is
          made up of experts in the fields of cybersecurity, privacy, and
          technology. We are dedicated to providing the best possible digital
          identity solutions to our customers. We are always looking for ways to
          improve our products and services, and we welcome feedback from our
          customers. We are committed to providing the best possible digital
          identity solutions to our customers. Our team of experts is dedicated
          to ensuring that our products are secure, private, and easy to use. We
          are always looking for ways to improve our products and services, and
          we welcome feedback from our customers.
        </p>
        <h2 className="font-bold text-2xl">What We Do</h2>
        <p>
          We help businesses and individuals protect their online identities
          with our secure and private digital identity solutions. Our products
          are designed to be easy to use and integrate seamlessly with existing
          systems. Our team of experts is dedicated to ensuring that our
          products are secure, private, and easy to use. We are always looking
          for ways to improve our products and services, and we welcome feedback
          from our customers. We are committed to providing the best possible
          digital identity solutions to our customers. Our team of experts is
          dedicated to ensuring that our products are secure, private, and easy
          to use. We are always looking for ways to improve our products and
          services, and we welcome feedback from our customers.
        </p>
        <h2 className="font-bold text-2xl">Why Choose Us</h2>
        <p>
          We are committed to providing the best possible digital identity
          solutions to our customers. Our team of experts is dedicated to
          ensuring that our products are secure, private, and easy to use. We
          are always looking for ways to improve our products and services, and
          we welcome feedback from our customers. Our products are designed to
          be easy to use and integrate seamlessly with existing systems. We are
          always looking for ways to improve our products and services, and we
          welcome feedback from our customers. We are committed to providing the
          best possible digital identity solutions to our customers. Our team of
          experts is dedicated to ensuring that our products are secure,
          private, and easy to use. We are always looking for ways to improve
          our products and services, and we welcome feedback from our customers.
        </p>
        <h2 className="font-bold text-2xl">Share Your Thoughts</h2>
        <p>
          We&apos;d love to hear from you! Feel free to reach out to us through
          our contact page or follow us on social media. We are always looking
          for ways to improve our products and services, and we welcome feedback
          from our customers. Our team is dedicated to providing the best
          possible digital identity solutions to our customers. We are committed
          to ensuring that our products are secure, private, and easy to use. We
          are always looking for ways to improve our products and services, and
          we welcome feedback from our customers. We are committed to providing
          the best possible digital identity solutions to our customers. Our
          team of experts is dedicated to ensuring that our products are secure,
          private, and easy to use. We are always looking for ways to improve
          our products and services, and we welcome feedback from our customers.
        </p>
      </div>
    </div>
  );
}

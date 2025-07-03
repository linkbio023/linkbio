/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flag.vercel.app",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "faisalman.github.io",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "flowbite.s3.amazonaws.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;

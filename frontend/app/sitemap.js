export default function sitemap() {
  const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
  return [
    {
      url: frontendUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${frontendUrl}/page/about-us`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${frontendUrl}/page/contact-us`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}

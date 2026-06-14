import type { MetadataRoute } from "next";

const SITE_URL = "https://proje01.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api/revalidate"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

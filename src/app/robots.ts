import type { MetadataRoute } from "next";
import { site } from "@/lib/site.config";
import { canonical } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // Яндекс читает Clean-param и Host из отдельной секции.
        userAgent: "Yandex",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: canonical("/sitemap.xml"),
    host: site.url,
  };
}

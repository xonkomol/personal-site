import type { MetadataRoute } from "next";
import { site } from "@/lib/site.config";
import { canonical } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date(site.seo.updatedAt);

  return [
    {
      url: canonical("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...site.districts.map((district) => ({
      url: canonical(`/rayon/${district.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

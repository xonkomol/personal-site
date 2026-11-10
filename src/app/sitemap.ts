import type { MetadataRoute } from "next";
import { cacheLife } from "next/cache";
import { site } from "@/lib/site.config";
import { canonical } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  cacheLife("days");

  const now = new Date();

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

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
    ...site.cities.map((city) => ({
      url: canonical(`/uslugi/${city.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      // Столица — основной спрос, поэтому приоритет выше.
      priority: city.slug === "tashkent" ? 0.9 : 0.7,
    })),
  ];
}

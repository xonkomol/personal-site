import type { MetadataRoute } from "next";
import { site } from "@/lib/site.config";
import { canonical } from "@/lib/seo";
import { locales, localeTag, defaultLocale } from "@/lib/i18n";

/** Для каждой страницы — ссылки на все языковые версии (hreflang в sitemap). */
const alternates = (path: string) => ({
  languages: Object.fromEntries(locales.map((l) => [localeTag[l], canonical(l, path)])),
});

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date(site.seo.updatedAt);
  const paths = ["", ...site.districts.map((d) => `/rayon/${d.slug}`)];

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: canonical(locale, path),
      lastModified: now,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? (locale === defaultLocale ? 1 : 0.9) : 0.8,
      alternates: alternates(path),
    }))
  );
}

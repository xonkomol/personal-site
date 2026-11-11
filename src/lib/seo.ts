import type { Metadata } from "next";
import { site } from "./site.config";
import { locales, localePath, localeTag, defaultLocale, type Locale } from "./i18n";

const base = site.url.replace(/\/$/, "");

/** Один вид адреса во всех мета-тегах и в sitemap — иначе поиск видит дубли. */
export const canonical = (locale: Locale, path = "") => `${base}${localePath(locale, path)}`;

type PageMetaInput = {
  locale: Locale;
  title: string;
  description: string;
  /** Путь без префикса языка: "" для главной, "/rayon/mirabad" для района. */
  path?: string;
  keywords?: readonly string[];
  noIndex?: boolean;
};

export function pageMetadata({
  locale,
  title,
  description,
  path = "",
  keywords,
  noIndex,
}: PageMetaInput): Metadata {
  const url = canonical(locale, path);

  // hreflang: обе версии ссылаются друг на друга, x-default ведёт на русскую.
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [localeTag[l], canonical(l, path)])
  );
  languages["x-default"] = canonical(defaultLocale, path);

  return {
    // absolute: заголовок уже содержит название компании, шаблон не нужен.
    title: { absolute: title },
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: { canonical: url, languages },
    openGraph: {
      type: "website",
      locale: localeTag[locale].replace("-", "_"),
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeTag[l].replace("-", "_")),
      url,
      siteName: site.brand.name,
      title,
      description,
      images: [
        {
          url: `${base}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: site.brand.name,
        },
      ],
    },
    twitter: { card: "summary_large_image", title, description },
    robots: noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

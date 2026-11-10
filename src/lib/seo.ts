import type { Metadata } from "next";
import { site } from "./site.config";

const base = site.url.replace(/\/$/, "");

/** Один вид адреса во всех мета-тегах и в sitemap — иначе поиск видит дубли. */
export const canonical = (path = "/") => (path === "/" ? `${base}/` : `${base}${path}`);

type PageMetaInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: readonly string[];
  /** Гео-страницы не должны конкурировать с главной за один и тот же запрос. */
  noIndex?: boolean;
};

export function pageMetadata({
  title,
  description,
  path = "/",
  keywords,
  noIndex,
}: PageMetaInput): Metadata {
  const url = canonical(path);

  return {
    // absolute: заголовок уже содержит название компании, шаблон не нужен.
    title: { absolute: title },
    description,
    keywords: keywords ? [...keywords] : [...site.seo.keywords],
    alternates: {
      canonical: url,
      languages: {
        [site.locale.tag]: url,
        "x-default": url,
      },
    },
    openGraph: {
      type: "website",
      locale: site.locale.tag.replace("-", "_"),
      url,
      siteName: site.brand.name,
      title,
      description,
      images: [
        {
          url: `${site.url}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${site.brand.name} — ${site.brand.offer}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
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

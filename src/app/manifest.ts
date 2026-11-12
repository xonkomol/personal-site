import type { MetadataRoute } from "next";
import { site } from "@/lib/site.config";
import { getContent } from "@/lib/content";
import { defaultLocale } from "@/lib/i18n";

export default function manifest(): MetadataRoute.Manifest {
  const t = getContent(defaultLocale);

  return {
    name: `${site.brand.name} — ${t.offer}`,
    short_name: site.brand.name,
    description: t.seo.description,
    start_url: `/${defaultLocale}`,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#081c47",
    lang: defaultLocale,
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}

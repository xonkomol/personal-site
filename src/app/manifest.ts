import type { MetadataRoute } from "next";
import { site } from "@/lib/site.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.brand.name} — ${site.brand.offer}`,
    short_name: site.brand.name,
    description: site.seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a2550",
    lang: site.locale.lang,
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}

import type { MetadataRoute } from "next";
import { site } from "@/lib/site.config";
import { canonical } from "@/lib/seo";

/**
 * robots.txt. Ничего содержательного не закрываем: поисковику нужен доступ
 * и к /_next/static, иначе он не отрисует страницу и занизит оценку.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // Отдельная секция для Яндекса: он читает директиву Host из неё.
        userAgent: "Yandex",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // Боты, которые качают сайт целиком и не приводят трафик.
        userAgent: ["AhrefsBot", "SemrushBot", "MJ12bot", "DotBot", "PetalBot"],
        disallow: "/",
      },
    ],
    sitemap: canonical("/sitemap.xml"),
    host: site.url,
  };
}

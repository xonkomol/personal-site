import type { MetadataRoute } from "next";
import { site } from "@/lib/site.config";

/**
 * robots.txt. Ничего содержательного не закрываем: поисковику нужен доступ
 * и к /_next/static, иначе он не отрисует страницу и занизит оценку.
 */
export default function robots(): MetadataRoute.Robots {
  const base = site.url.replace(/\/$/, "");

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Отдельная секция для Яндекса: он читает директиву Host из неё.
      { userAgent: "Yandex", allow: "/" },
      {
        // Боты, которые качают сайт целиком и не приводят трафик.
        userAgent: ["AhrefsBot", "SemrushBot", "MJ12bot", "DotBot", "PetalBot"],
        disallow: "/",
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}

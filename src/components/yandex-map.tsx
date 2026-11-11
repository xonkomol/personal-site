import { MapPin, ExternalLink } from "lucide-react";
import { site } from "@/lib/site.config";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

/**
 * Карта грузится отложенно (loading="lazy"), поэтому не тормозит первую отрисовку.
 * Ссылку на виджет меняйте в site.config.ts → address.map.embedUrl.
 */
export function YandexMap({
  locale,
  className,
  variant = "light",
}: {
  locale: Locale;
  className?: string;
  variant?: "light" | "dark";
}) {
  const t = getContent(locale);
  const dark = variant === "dark";
  const street = locale === "ru" ? site.address.street : site.address.streetUz;
  const street2 = locale === "ru" ? site.address.street2 : site.address.street2Uz;
  const city = locale === "ru" ? site.address.city : site.address.cityUz;

  return (
    <div className={className}>
      <div
        className={
          dark
            ? "overflow-hidden rounded-xl border border-white/15 bg-white/5"
            : "overflow-hidden rounded-xl border border-border bg-secondary"
        }
      >
        <iframe
          src={site.address.map.embedUrl}
          title={t.map.title}
          className="block h-72 w-full border-0 lg:h-80"
          loading="lazy"
          allowFullScreen
        />
      </div>

      <address className="mt-4 flex items-start gap-2.5 not-italic">
        <MapPin className={dark ? "mt-0.5 size-4 shrink-0 text-accent" : "mt-0.5 size-4 shrink-0 text-tile"} />
        <span className="text-[15px] leading-relaxed">
          {city}, {street}
          <span className={dark ? "block text-white/60" : "block text-muted-foreground"}>
            {t.map.secondOffice(street2)}
          </span>
          <a
            href={site.address.map.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-2 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline ${dark ? "text-accent" : "text-primary"}`}
          >
            {t.map.open}
            <ExternalLink className="size-3.5" />
          </a>
        </span>
      </address>
    </div>
  );
}

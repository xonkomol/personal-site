import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { site } from "@/lib/site.config";

export async function SiteFooter() {
  // Cache Components: текущий год — изменяемое значение, кешируем результат.
  "use cache";
  cacheLife("days");

  return (
    <footer id="contacts" className="brand-gradient-soft mt-auto scroll-mt-20 text-white/80">
      <div className="shell grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          {/* Логотип тёмный, поэтому на тёмном фоне выводим его белым. */}
          <Image
            src={site.brand.logo}
            alt={site.brand.logoAlt}
            width={1000}
            height={260}
            loading="eager"
            className="h-9 w-auto brightness-0 invert"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{site.footerNote}</p>
        </div>

        <address className="not-italic">
          <h2 className="font-display text-sm font-semibold text-white">Контакты</h2>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0" />
              <span className="flex flex-col gap-1">
                <a href={`tel:${site.contacts.phone}`} className="tnum hover:text-white">
                  {site.contacts.phoneLabel}
                </a>
                <a href={`tel:${site.contacts.phone2}`} className="tnum hover:text-white">
                  {site.contacts.phone2Label}
                </a>
              </span>
            </li>
            <li className="flex gap-2.5">
              <Send className="mt-0.5 size-4 shrink-0" />
              <a href={site.contacts.telegram} className="hover:text-white">
                {site.contacts.telegramLabel}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0" />
              <a href={`mailto:${site.contacts.email}`} className="hover:text-white">
                {site.contacts.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0" />
              <span>{site.contacts.hoursLabel}</span>
            </li>
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>
                {site.address.city}, {site.address.street}
                <br />
                <span className="text-white/60">{site.address.street2}</span>
              </span>
            </li>
          </ul>
        </address>

        <nav aria-label="Районы Ташкента">
          <h2 className="font-display text-sm font-semibold text-white">Выезжаем в районы</h2>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {site.districts.map((d) => (
              <li key={d.slug}>
                <Link href={`/rayon/${d.slug}`} className="transition-colors hover:text-white">
                  {d.short}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="shell flex flex-col gap-2 border-t border-white/15 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.brand.legalName}
        </p>
        <p>{site.brand.tagline}</p>
      </div>
    </footer>
  );
}

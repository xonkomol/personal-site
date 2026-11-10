import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { site } from "@/lib/site.config";

export async function SiteFooter() {
  // Cache Components: текущий год — изменяемое значение, кешируем результат.
  "use cache";
  cacheLife("days");

  return (
    <footer className="mt-auto bg-tile-deep text-white/75">
      <div className="shell grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          {/* Логотип тёмный, поэтому на тёмном фоне выводим его белым. */}
          <Image
            src={site.brand.logo}
            alt={site.brand.logoAlt}
            width={1000}
            height={260}
            loading="eager"
            className="h-8 w-auto brightness-0 invert"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">{site.footerNote}</p>
        </div>

        <address className="not-italic">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-accent">
            Контакты
          </h2>
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
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>
                {site.address.city}, {site.address.street}
                <br />
                <span className="text-white/55">{site.address.street2}</span>
              </span>
            </li>
          </ul>
        </address>

        <nav aria-label="Услуги">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-accent">
            Услуги
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {site.footerServices.map((s) => (
              <li key={s}>
                <Link href="/#price" className="transition-colors hover:text-white">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-accent">
            Режим работы
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            <li>{site.contacts.hoursLabel}</li>
            <li>Выезд в течение {site.contacts.arrival}</li>
            <li className="text-white/55">Без праздничных наценок</li>
          </ul>

          <h2 className="mt-7 font-display text-sm font-bold uppercase tracking-wide text-accent">
            Районы
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-sm">
            {site.districts.map((d) => (
              <li key={d.slug}>
                <Link href={`/rayon/${d.slug}`} className="transition-colors hover:text-white">
                  {d.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shell flex flex-col gap-2 border-t border-white/12 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.brand.legalName}. Все права защищены.
        </p>
        <p>{site.brand.tagline}</p>
      </div>
    </footer>
  );
}

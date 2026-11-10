import Link from "next/link";
import { cacheLife } from "next/cache";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { StarMark, Tilework } from "@/components/tilework";
import { site } from "@/lib/site.config";

export async function SiteFooter() {
  // Cache Components: текущий год — изменяемое значение, кешируем результат.
  "use cache";
  cacheLife("days");

  return (
    <footer className="relative mt-auto overflow-hidden bg-tile-deep text-white/85">
      <Tilework id="footer" className="pointer-events-none absolute -right-10 -top-10 size-72 text-white/10" />

      <div className="shell relative grid gap-12 py-16 lg:grid-cols-[1.2fr_1fr_1fr_1.1fr]">
        <div>
          <div className="flex items-center gap-2.5 text-white">
            <StarMark className="size-6" />
            <span className="font-display text-base font-bold">{site.brand.name}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            {site.brand.kind} из {site.address.city}. Работаем с бизнесом по всему Узбекистану с{" "}
            {site.brand.foundedYear} года.
          </p>
          <p className="mt-4 text-sm">{site.brand.legalName}</p>
        </div>

        <nav aria-label="Услуги">
          <h2 className="text-xs font-semibold tracking-wide text-white">Услуги</h2>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {site.services.map((s) => (
              <li key={s.slug}>
                <Link href="/#services" className="transition-colors hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Города">
          <h2 className="text-xs font-semibold tracking-wide text-white">Города</h2>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {site.cities.map((c) => (
              <li key={c.slug}>
                <Link href={`/uslugi/${c.slug}`} className="transition-colors hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Адрес и телефон в одном месте: поиск сверяет эти данные с картами. */}
        <address className="not-italic">
          <h2 className="text-xs font-semibold tracking-wide text-white">Контакты</h2>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0" />
              <a href={`tel:${site.contacts.phone}`} className="tnum hover:text-white">
                {site.contacts.phoneLabel}
              </a>
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
                <span className="text-white/60">{site.address.landmark}</span>
              </span>
            </li>
            <li className="flex gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0" />
              <span>{site.contacts.hoursLabel}</span>
            </li>
          </ul>
        </address>
      </div>

      <div className="shell relative flex flex-col gap-2 border-t border-white/15 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.brand.legalName}
        </p>
        <p>Цены на сайте не являются публичной офертой.</p>
      </div>
    </footer>
  );
}

import { Check, Plus, Phone, Send, MapPin } from "lucide-react";
import { site } from "@/lib/site.config";
import { getContent } from "@/lib/content";
import { formatSum, type Locale } from "@/lib/i18n";

export function Price({ locale }: { locale: Locale }) {
  const t = getContent(locale);

  const contacts = [
    {
      icon: Phone,
      title: t.price.contactCards.call,
      text: site.contacts.phoneLabel,
      href: `tel:${site.contacts.phone}`,
      tone: "bg-accent/15 text-accent",
    },
    {
      icon: Send,
      title: t.price.contactCards.telegram,
      text: t.price.contactCards.telegramNote,
      href: site.contacts.telegram,
      tone: "bg-tile/15 text-tile",
    },
    {
      icon: MapPin,
      title: t.price.contactCards.office,
      text: locale === "ru" ? site.address.street : site.address.streetUz,
      href: site.address.map.linkUrl,
      tone: "bg-emerald-500/15 text-emerald-600",
    },
  ];

  return (
    <section id="price" className="scroll-mt-20 bg-plaster pb-14 sm:pb-20">
      <div className="shell">
        <div
          data-reveal-item
          className="brand-gradient panel rounded-2xl px-5 py-10 text-white sm:px-8 sm:py-12 lg:px-12"
        >
          <h2 className="display-caps text-center text-[clamp(1.4rem,3.2vw,2rem)]">
            {t.price.title}
          </h2>

          <p className="mt-5 text-center font-display text-base font-bold uppercase leading-snug tracking-tight sm:text-lg">
            {t.price.slogan1}
            <br />
            <span className="text-accent">{t.price.slogan2}</span>
          </p>

          {/* Две услуги с отдельными ценами. */}
          <div className="mt-9 grid gap-4 sm:gap-5 md:grid-cols-2">
            {t.price.services.map((service, i) => (
              <div
                key={service.key}
                data-reveal-item
                style={{ "--reveal-shift": `${i * 7}%` } as React.CSSProperties}
                className="glass flex flex-col rounded-xl p-6 sm:p-7"
              >
                <h3 className="display-sm">{service.name}</h3>
                <p className="mt-4 font-display text-[clamp(1.6rem,4.4vw,2.4rem)] font-bold tracking-tight tnum">
                  {formatSum(site.pricing[service.key], locale)}
                </p>
                <p className="mt-1 text-xs text-white/60">{service.unit}</p>

                <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-accent">
                  {t.price.includesTitle}
                </p>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-white/85">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2.5} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-10">
            <div>
              <h3 className="display-sm">{t.price.extrasTitle}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {t.price.extras.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/70">
                    <Plus className="mt-0.5 size-4 shrink-0" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="self-start rounded-lg bg-white/8 p-4 text-sm leading-relaxed text-white/70">
              {t.price.note}
            </p>
          </div>

          <ul className="mt-9 grid gap-3 sm:grid-cols-3">
            {contacts.map((c) => (
              <li key={c.title}>
                <a
                  href={c.href}
                  className="lift flex h-full flex-col gap-2 rounded-xl bg-card p-5 text-card-foreground"
                >
                  <span className={`flex size-9 items-center justify-center rounded-lg ${c.tone}`}>
                    <c.icon className="size-4" strokeWidth={2.5} />
                  </span>
                  <span className="font-display text-sm font-bold">{c.title}</span>
                  <span className="text-xs leading-relaxed text-muted-foreground">{c.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

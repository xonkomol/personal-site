import { Check, Plus, Phone, Send, MapPin } from "lucide-react";
import { site, formatSum } from "@/lib/site.config";

export function Price() {
  const { pricing } = site;

  const contacts = [
    {
      icon: Phone,
      title: "Позвонить",
      text: site.contacts.phoneLabel,
      href: `tel:${site.contacts.phone}`,
      tone: "bg-accent/15 text-accent",
    },
    {
      icon: Send,
      title: "Telegram",
      text: "Ответим в переписке",
      href: site.contacts.telegram,
      tone: "bg-tile/15 text-tile",
    },
    {
      icon: MapPin,
      title: "Офис",
      text: site.address.street,
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
            Услуги европротокола
          </h2>

          <p className="mt-6 text-center text-xs text-white/60">{pricing.unit}</p>
          <p className="text-center font-display text-[clamp(2rem,6vw,3.25rem)] font-bold tracking-tight tnum">
            {formatSum(pricing.price)}
          </p>

          <p className="mt-5 text-center font-display text-base font-bold uppercase leading-snug tracking-tight sm:text-lg">
            Мы работаем круглосуточно
            <br />
            <span className="text-accent">с нами — просто и быстро</span>
          </p>

          <div className="mt-9 grid gap-8 md:grid-cols-2 md:gap-10">
            <div>
              <h3 className="display-sm">Что входит в цену</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {pricing.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/85">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="display-sm">Оплачивается отдельно</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {pricing.extras.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/70">
                    <Plus className="mt-0.5 size-4 shrink-0" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-lg bg-white/8 p-4 text-sm leading-relaxed text-white/70">
                {pricing.note}
              </p>
            </div>
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

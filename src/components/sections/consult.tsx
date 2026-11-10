import { Send, Phone, MapPin, Headset, FileText } from "lucide-react";
import { YandexMap } from "@/components/yandex-map";
import { site } from "@/lib/site.config";

const actions = [
  {
    icon: Send,
    label: "Связаться через Telegram",
    note: "Напишите — ответим в переписке",
    href: site.contacts.telegram,
  },
  {
    icon: Phone,
    label: "Вызвать аварийного комиссара",
    note: site.contacts.phoneLabel,
    href: `tel:${site.contacts.phone}`,
  },
  {
    icon: MapPin,
    label: "Местоположение офиса",
    note: site.address.street,
    href: "#map",
  },
];

export function Consult() {
  return (
    <section id="contacts" className="brand-gradient-soft scroll-mt-20 py-14 text-white sm:py-20">
      <div className="shell flex flex-col items-center">
        <span className="flex size-11 items-center justify-center rounded-full bg-white/10">
          <Headset className="size-5 text-accent" strokeWidth={2.25} />
        </span>

        <h2 data-reveal-item className="display-caps mt-5 max-w-3xl text-center text-[clamp(1.3rem,3vw,1.9rem)]">
          Закажите бесплатную консультацию прямо сейчас
        </h2>

        <ul className="panel mt-8 flex max-w-2xl flex-col gap-3">
          {actions.map((a, i) => (
            <li
              key={a.label}
              data-reveal-item
              style={{ "--reveal-shift": `${i * 6}%` } as React.CSSProperties}
            >
              <a
                href={a.href}
                className="lift flex items-center gap-4 rounded-lg bg-accent px-5 py-3.5 text-accent-foreground hover:bg-accent/90"
              >
                <a.icon className="size-5 shrink-0" strokeWidth={2.5} />
                <span className="flex flex-col text-left">
                  <span className="font-display text-sm font-bold uppercase tracking-wide">
                    {a.label}
                  </span>
                  <span className="text-xs opacity-75">{a.note}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <span className="mt-14 flex size-11 items-center justify-center rounded-full bg-white/10">
          <FileText className="size-5 text-accent" strokeWidth={2.25} />
        </span>

        <h2 data-reveal-item className="display-caps mt-5 text-center text-[clamp(1.3rem,3vw,1.9rem)]">
          {site.additional.title}
        </h2>

        <div className="panel mt-7 grid max-w-3xl gap-3">
          {site.additional.paragraphs.map((text, i) => (
            <p
              key={text}
              data-reveal-item
              style={{ "--reveal-shift": `${i * 6}%` } as React.CSSProperties}
              className="glass rounded-xl px-5 py-4 text-sm leading-relaxed text-white/80"
            >
              {text}
            </p>
          ))}
        </div>

        <div id="map" data-reveal-item className="panel mt-10 max-w-3xl scroll-mt-24">
          <YandexMap variant="dark" />
        </div>
      </div>
    </section>
  );
}

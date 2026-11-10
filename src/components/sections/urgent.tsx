import { Phone } from "lucide-react";
import { site } from "@/lib/site.config";

/** Яркая плашка между светлыми блоками: перехватывает тех, кому нужно прямо сейчас. */
export function Urgent() {
  return (
    <section className="bg-plaster pb-14 sm:pb-20">
      <div className="shell">
        <div
          data-reveal-item
          className="royal-gradient panel rounded-2xl px-6 py-10 text-center text-white sm:px-10 sm:py-12"
        >
          <h2 className="display-caps text-[clamp(1.4rem,3.2vw,2rem)]">Нужна срочная помощь?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
            Звоните прямо с места ДТП. Дежурный комиссар выедет к вам в течение нескольких минут и
            возьмёт оформление на себя.
          </p>
          <a
            href={`tel:${site.contacts.phone}`}
            className="pulse-call lift mt-7 inline-flex items-center gap-3 rounded-lg bg-accent px-6 py-3.5 font-display text-base font-bold tracking-tight tnum text-accent-foreground hover:bg-accent/90 sm:text-lg"
          >
            <Phone className="size-5" strokeWidth={2.5} />
            {site.contacts.phoneLabel}
          </a>
          <p className="mt-4 text-xs text-white/65">
            Выезд аварийного комиссара · {site.contacts.hoursLabel}
          </p>
        </div>
      </div>
    </section>
  );
}

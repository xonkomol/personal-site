import { Phone } from "lucide-react";
import { site } from "@/lib/site.config";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

/** Яркая плашка между светлыми блоками: перехватывает тех, кому нужно прямо сейчас. */
export function Urgent({ locale }: { locale: Locale }) {
  const t = getContent(locale);

  return (
    <section className="bg-plaster pb-14 sm:pb-20">
      <div className="shell">
        <div
          data-reveal-item
          className="royal-gradient panel rounded-2xl px-6 py-10 text-center text-white sm:px-10 sm:py-12"
        >
          <h2 className="display-caps text-[clamp(1.4rem,3.2vw,2rem)]">{t.urgent.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
            {t.urgent.text}
          </p>
          <a
            href={`tel:${site.contacts.phone}`}
            className="pulse-call lift mt-7 inline-flex items-center gap-3 rounded-lg bg-accent px-6 py-3.5 font-display text-base font-bold tracking-tight tnum text-accent-foreground hover:bg-accent/90 sm:text-lg"
          >
            <Phone className="size-5" strokeWidth={2.5} />
            {site.contacts.phoneLabel}
          </a>
          <p className="mt-4 text-xs text-white/65">
            {t.urgent.note} · {t.hoursLabel}
          </p>
        </div>
      </div>
    </section>
  );
}

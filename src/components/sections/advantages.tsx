import { Clock, ShieldCheck, Handshake } from "lucide-react";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

const icons = { clock: Clock, shield: ShieldCheck, handshake: Handshake } as const;

export function Advantages({ locale }: { locale: Locale }) {
  const t = getContent(locale);

  return (
    <section id="advantages" className="scroll-mt-20 bg-plaster py-14 sm:py-20">
      <div className="shell">
        <ul className="panel grid gap-4 sm:gap-5 md:grid-cols-3">
          {t.advantages.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <li
                key={item.title}
                data-reveal-item
                style={{ "--reveal-shift": `${i * 7}%` } as React.CSSProperties}
                className="lift group flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center hover:border-tile/45 hover:shadow-lg hover:shadow-tile/10 sm:p-7"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-tile/10 text-tile transition-colors group-hover:bg-tile group-hover:text-white">
                  <Icon className="size-5" strokeWidth={2.25} />
                </span>
                <h3 className="display-sm mt-4">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

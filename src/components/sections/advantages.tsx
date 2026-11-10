import { Clock, ShieldCheck, Handshake } from "lucide-react";
import { site } from "@/lib/site.config";

const icons = {
  clock: Clock,
  shield: ShieldCheck,
  handshake: Handshake,
} as const;

export function Advantages() {
  return (
    <section id="advantages" className="scroll-mt-20 py-14 sm:py-20 lg:py-24">
      <div className="shell">
        <h2 data-reveal-item className="display-lg max-w-2xl text-balance">Почему выбирают {site.brand.name}</h2>

        <ul className="mt-8 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-3">
          {site.advantages.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <li
                key={item.title}
                data-reveal-item
                style={{ "--reveal-shift": `${i * 7}%` } as React.CSSProperties}
                className="lift group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 hover:border-tile/45 hover:shadow-lg hover:shadow-tile/10 sm:p-7"
              >
                <span className="flex size-11 items-center justify-center rounded-lg bg-tile/10 text-tile transition-colors group-hover:bg-tile group-hover:text-white">
                  <Icon className="size-5" strokeWidth={2.25} />
                </span>
                <h3 className="display-sm md:min-h-[3.1rem]">{item.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

import { Clock, ShieldCheck, Handshake } from "lucide-react";
import { site } from "@/lib/site.config";

const icons = {
  clock: Clock,
  shield: ShieldCheck,
  handshake: Handshake,
} as const;

export function Advantages() {
  return (
    <section id="advantages" className="scroll-mt-20 py-20 lg:py-24">
      <div className="shell">
        <h2 className="display-lg max-w-2xl text-balance">Почему выбирают {site.brand.name}</h2>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {site.advantages.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li
                key={item.title}
                className="flex flex-col gap-4 rounded-xl border border-border bg-card p-7"
              >
                <span className="flex size-11 items-center justify-center rounded-lg bg-tile/10 text-tile">
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

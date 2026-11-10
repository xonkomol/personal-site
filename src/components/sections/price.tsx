import { Check, Phone, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { YandexMap } from "@/components/yandex-map";
import { site, formatSum } from "@/lib/site.config";

export function Price() {
  const { pricing } = site;

  return (
    <section id="price" className="scroll-mt-20 py-14 sm:py-20 lg:py-24">
      <div className="shell">
        <h2 data-reveal-item className="display-lg max-w-2xl text-balance">Стоимость услуги</h2>
        <p data-reveal-item className="prose-measure mt-4 text-base text-muted-foreground sm:mt-5 sm:text-lg">
          Одна сумма за полное оформление европротокола на месте ДТП: выезд, осмотр, фотофиксация
          и документы для страховой.
        </p>

        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <div data-reveal-item className="rounded-xl border border-border bg-card p-6 sm:p-7 lg:p-9">
            <p className="font-display text-4xl font-bold tracking-tight tnum lg:text-5xl">
              {formatSum(pricing.price)}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{pricing.unit}</p>

            <h3 className="display-sm mt-8 border-t border-border pt-7">Что входит в цену</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {pricing.includes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px]">
                  <Check className="mt-0.5 size-4 shrink-0 text-tile" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="display-sm mt-8 border-t border-border pt-7">
              Оплачивается отдельно
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {pricing.extras.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] text-muted-foreground">
                  <Plus className="mt-0.5 size-4 shrink-0" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-8 rounded-lg bg-secondary p-4 text-sm text-muted-foreground">
              {pricing.note}
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <div
              data-reveal-item
              style={{ "--reveal-shift": "7%" } as React.CSSProperties}
              className="brand-gradient brand-edge rounded-xl p-6 text-white sm:p-7"
            >
              <p className="display-sm">Нужен комиссар сейчас</p>
              <p className="mt-2 text-sm text-white/75">
                Позвоните — экипаж выедет сразу, в среднем доезжаем за {site.contacts.arrival}.
              </p>
              <Button
                asChild
                size="lg"
                className="pulse-call lift mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <a href={`tel:${site.contacts.phone}`}>
                  <Phone className="size-4" />
                  {site.contacts.phoneLabel}
                </a>
              </Button>
            </div>

            <div
              data-reveal-item
              style={{ "--reveal-shift": "14%" } as React.CSSProperties}
              className="rounded-xl border border-border bg-card p-6 sm:p-7"
            >
              <p className="display-sm">Где мы находимся</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Диспетчерская работает круглосуточно. Приезжать к нам не нужно — комиссар сам
                выезжает на место ДТП.
              </p>
              <YandexMap className="mt-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

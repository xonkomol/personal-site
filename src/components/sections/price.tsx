import { Check, Phone, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/lead-form";
import { site, formatSum } from "@/lib/site.config";

export function Price() {
  const { pricing } = site;

  return (
    <section id="price" className="scroll-mt-20 py-20 lg:py-24">
      <div className="shell">
        <h2 className="display-lg max-w-2xl text-balance">Стоимость услуги</h2>
        <p className="prose-measure mt-5 text-lg text-muted-foreground">
          Одна сумма за полное оформление европротокола на месте ДТП: выезд, осмотр, фотофиксация
          и документы для страховой.
        </p>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-xl border border-border bg-card p-7 lg:p-9">
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
            <div className="rounded-xl bg-tile-deep p-7 text-white">
              <p className="display-sm">Нужен комиссар сейчас</p>
              <p className="mt-2 text-sm text-white/75">
                Позвоните — экипаж выедет сразу, в среднем доезжаем за {site.contacts.arrival}.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <a href={`tel:${site.contacts.phone}`}>
                  <Phone className="size-4" />
                  {site.contacts.phoneLabel}
                </a>
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-card p-7">
              <p className="display-sm">Заказать обратный звонок</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Оставьте номер — перезвоним и ответим на вопросы по оформлению.
              </p>
              <LeadForm source="price" className="mt-6" submitLabel="Жду звонка" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

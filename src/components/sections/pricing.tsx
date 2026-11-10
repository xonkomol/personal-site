import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site, formatSum } from "@/lib/site.config";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 bg-plaster py-20 lg:py-24">
      <div className="shell">
        <h2 className="display-lg max-w-2xl text-balance">Три формата работы</h2>
        <p className="prose-measure mt-5 text-lg text-muted-foreground">
          Начать можно с одного лендинга и перейти к полному ведению, когда поток заявок станет
          стабильным.
        </p>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {site.pricing.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "flex flex-col rounded-xl border bg-card p-7",
                plan.highlighted
                  ? "border-tile bg-tile-deep text-white shadow-xl shadow-tile/15 lg:-my-3 lg:py-10"
                  : "border-border"
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="display-sm">{plan.name}</h3>
                {plan.highlighted && (
                  <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
                    Чаще всего берут
                  </span>
                )}
              </div>

              <p
                className={cn(
                  "mt-3 text-sm",
                  plan.highlighted ? "text-white/70" : "text-muted-foreground"
                )}
              >
                {plan.summary}
              </p>

              <p className="mt-6 font-display text-3xl font-bold tracking-tight tnum">
                от {formatSum(plan.price)}
              </p>
              <p
                className={cn(
                  "mt-1 text-xs",
                  plan.highlighted ? "text-white/60" : "text-muted-foreground"
                )}
              >
                {plan.period}
              </p>

              <ul className="mt-6 flex flex-1 flex-col gap-3 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <Check
                      className={cn(
                        "mt-0.5 size-4 shrink-0",
                        plan.highlighted ? "text-accent" : "text-tile"
                      )}
                      strokeWidth={2.5}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                asChild
                size="lg"
                className={cn(
                  "mt-8 self-stretch",
                  plan.highlighted && "bg-accent text-accent-foreground hover:bg-accent/90"
                )}
                variant={plan.highlighted ? "default" : "outline"}
              >
                <a href="#lead">{plan.cta}</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

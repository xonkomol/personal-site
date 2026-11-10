import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { site, formatSum, type City } from "@/lib/site.config";

export function Services({ city }: { city?: City }) {
  return (
    <section id="services" className="scroll-mt-20 py-20 lg:py-24">
      <div className="shell">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <h2 className="display-lg max-w-2xl text-balance">
            Услуги и цены {city ? `в ${city.inCity}` : "в Узбекистане"}
          </h2>
          <p className="max-w-sm text-[15px] text-muted-foreground">
            Цены — нижняя граница по рынку {city?.ofCity ?? site.locale.countryName + "а"}. Точная
            сумма в смете после разбора задачи.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {site.services.map((service) => (
            <li key={service.slug}>
              <Card className="h-full border-border transition-colors hover:border-tile/40">
                <CardContent className="flex h-full flex-col gap-5">
                  <div>
                    <h3 className="display-sm">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {service.short}
                    </p>
                  </div>

                  <ul className="flex flex-col gap-2 text-sm">
                    {service.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5">
                        <span className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-accent" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto border-t border-border pt-4">
                    <p className="font-display text-xl font-bold tracking-tight tnum">
                      от {formatSum(service.priceFrom)}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {service.unit} · {service.term}
                    </p>
                    <a
                      href="#lead"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
                    >
                      Запросить смету
                      <ArrowUpRight className="size-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

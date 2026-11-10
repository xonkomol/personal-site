import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/lead-form";
import { Tilework } from "@/components/tilework";
import { site, plural, type City } from "@/lib/site.config";

const proof = [
  "Фиксированная смета в договоре",
  "Первые заявки на 3–7 день после запуска",
  "Отчёт по стоимости заявки, а не по кликам",
];

export function Hero({ city }: { city?: City }) {
  const place = city?.inCity ?? site.address.inCity;
  const nearby = city?.districts.slice(0, 4).join(", ") ?? site.cities.slice(1, 5).map((c) => c.name).join(", ");

  return (
    <section className="relative isolate overflow-hidden bg-tile-deep text-white">
      {/* Единственный декоративный мотив на странице — майолика Самарканда. */}
      <Tilework id="hero" className="pointer-events-none absolute -right-24 -top-24 size-[34rem] text-white/[0.09]" />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 18% 0%, rgba(14,143,139,0.35) 0%, transparent 55%)",
        }}
      />

      <div className="shell grid gap-12 py-14 lg:grid-cols-[1.3fr_0.85fr] lg:gap-14 lg:py-24">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-sm text-white/70">
            <Star className="size-4 fill-gold text-gold" />
            <span className="tnum">{site.rating.value}</span> из 5 — {site.rating.count}{" "}
            {plural(site.rating.count, ["отзыв", "отзыва", "отзывов"])} клиентов в{" "}
            {site.locale.countryName}е
          </p>

          <h1 className="display-xl mt-5 text-balance">Сайты и реклама в {place}</h1>

          <p className="prose-measure mt-6 text-lg leading-relaxed text-white/80">
            Приносим заявки, а не трафик. Собираем сайт, запускаем рекламу и считаем стоимость
            каждого обращения. Смета фиксируется в договоре, запуск — от 10 дней.
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {proof.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px]">
                <Check className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <a href="#lead">Рассчитать стоимость</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <a href="#cases">Посмотреть результаты</a>
            </Button>
          </div>

          <p className="mt-6 text-sm text-white/55">Работаем также: {nearby}</p>
        </div>

        {/* Форма в герое: главное действие страницы видно без прокрутки. */}
        <div id="lead" className="scroll-mt-24 self-start rounded-xl bg-card p-6 text-card-foreground shadow-2xl shadow-black/30 lg:p-7">
          <p className="display-sm">Расчёт за 1 рабочий день</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Пришлём структуру, сроки и стоимость под вашу задачу. Без созвона, если вам так удобнее.
          </p>
          <LeadForm source="hero" className="mt-6" submitLabel="Получить расчёт" />
        </div>
      </div>

      <div className="shell relative border-t border-white/15">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 lg:grid-cols-4">
          {site.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-display text-3xl font-bold tracking-tight tnum">{stat.value}</dt>
              <dd className="mt-1.5 text-sm text-white/65">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

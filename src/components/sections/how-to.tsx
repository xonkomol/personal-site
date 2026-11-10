import { Check, AlertTriangle } from "lucide-react";
import { YoutubeEmbed } from "@/components/youtube-embed";
import { site, formatSum } from "@/lib/site.config";

export function HowTo() {
  const { howTo } = site;

  return (
    <section id="how-to" className="scroll-mt-20 bg-plaster pb-14 sm:pb-20">
      <div className="shell">
        <div
          data-reveal-item
          className="panel rounded-2xl border border-border bg-card px-5 py-10 sm:px-8 sm:py-12 lg:px-12"
        >
          <h2 className="display-caps text-center text-[clamp(1.4rem,3.2vw,2rem)]">
            Как оформить европротокол?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
            Посмотрите короткую инструкцию, а ниже — тот же порядок действий по пунктам. Если
            что-то пойдёт не так, звоните: подскажем по телефону, пока комиссар едет.
          </p>

          <div className="mt-8">
            <YoutubeEmbed videoId={howTo.videoId} title={howTo.videoTitle} />
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-10">
            {/* Нумерация настоящая: каждый шаг идёт после предыдущего. */}
            <div>
              <h3 className="display-sm flex items-center gap-2">
                <Check className="size-4 text-tile" strokeWidth={3} />
                Порядок действий
              </h3>
              <ol className="mt-4 flex flex-col gap-4">
                {howTo.steps.map((step, i) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="font-display text-xs font-bold text-tile tnum">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{step.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                        {step.text}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="display-sm flex items-center gap-2">
                <AlertTriangle className="size-4 text-accent" strokeWidth={2.5} />
                Важные моменты
              </h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Все условия должны выполняться одновременно. Если хотя бы одно не соблюдено, нужно
                вызывать ГАИ — мы поможем и с этим.
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {howTo.conditions.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-tile" strokeWidth={2.5} />
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-lg bg-secondary p-4 text-sm leading-relaxed text-muted-foreground">
                Максимальная выплата по европротоколу в Узбекистане — {formatSum(site.payoutLimit)},
                это 35% от страховой суммы по ОСАГО.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

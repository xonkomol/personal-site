import { Check } from "lucide-react";
import { YoutubeEmbed } from "@/components/youtube-embed";
import { site, formatSum } from "@/lib/site.config";

export function HowTo() {
  const { howTo } = site;

  return (
    <section id="how-to" className="scroll-mt-20 bg-plaster py-14 sm:py-20 lg:py-24">
      <div className="shell">
        <h2 data-reveal-item className="display-lg max-w-2xl text-balance">Как оформить европротокол</h2>
        <p data-reveal-item className="prose-measure mt-4 text-base text-muted-foreground sm:mt-5 sm:text-lg">
          Посмотрите короткую инструкцию, а ниже — тот же порядок действий по пунктам. Если что-то
          пойдёт не так, звоните: подскажем по телефону, пока комиссар едет.
        </p>

        <div data-reveal-item className="mt-8 sm:mt-10 lg:max-w-4xl">
          <YoutubeEmbed videoId={howTo.videoId} title={howTo.videoTitle} />
        </div>

        {/* Нумерация здесь настоящая: каждый шаг идёт после предыдущего. */}
        <ol className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:mt-12 md:grid-cols-2">
          {howTo.steps.map((step, i) => (
            <li
              key={step.title}
              data-reveal-item
              style={{ "--reveal-shift": `${(i % 2) * 6}%` } as React.CSSProperties}
              className="group flex gap-4 bg-background p-5 transition-colors hover:bg-secondary sm:gap-5 sm:p-6"
            >
              <span className="font-display text-sm font-bold text-tile tnum transition-transform group-hover:scale-110">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="display-sm">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div data-reveal-item className="mt-8 rounded-xl border border-border bg-card p-6 sm:p-7">
          <h3 className="display-sm">Когда европротокол подходит</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Все условия должны выполняться одновременно. Если хотя бы одно не соблюдено, нужно
            вызывать ГАИ — мы поможем и с этим.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {howTo.conditions.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-[15px]">
                <Check className="mt-0.5 size-4 shrink-0 text-tile" strokeWidth={2.5} />
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-border pt-4 text-sm text-muted-foreground">
            Максимальная выплата по европротоколу в Узбекистане — {formatSum(site.payoutLimit)}, это
            35% от страховой суммы по ОСАГО.
          </p>
        </div>
      </div>
    </section>
  );
}

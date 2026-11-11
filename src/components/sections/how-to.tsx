import { Check, AlertTriangle } from "lucide-react";
import { site } from "@/lib/site.config";
import { getContent } from "@/lib/content";
import { formatSum, type Locale } from "@/lib/i18n";

export function HowTo({ locale }: { locale: Locale }) {
  const t = getContent(locale);

  return (
    <section id="how-to" className="scroll-mt-20 bg-plaster pb-14 sm:pb-20">
      <div className="shell">
        <div
          data-reveal-item
          className="panel rounded-2xl border border-border bg-card px-5 py-10 sm:px-8 sm:py-12 lg:px-12"
        >
          <h2 className="display-caps text-center text-[clamp(1.4rem,3.2vw,2rem)]">
            {t.howTo.title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t.howTo.lead}
          </p>

          <div className="mt-9 grid gap-8 md:grid-cols-2 md:gap-10">
            {/* Нумерация настоящая: каждый шаг идёт после предыдущего. */}
            <div>
              <h3 className="display-sm flex items-center gap-2">
                <Check className="size-4 text-tile" strokeWidth={3} />
                {t.howTo.stepsTitle}
              </h3>
              <ol className="mt-4 flex flex-col gap-4">
                {t.howTo.steps.map((step, i) => (
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
                {t.howTo.importantTitle}
              </h3>
              <p className="mt-4 text-sm text-muted-foreground">{t.howTo.importantLead}</p>
              <ul className="mt-4 flex flex-col gap-3">
                {t.howTo.conditions.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-tile" strokeWidth={2.5} />
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-lg bg-secondary p-4 text-sm leading-relaxed text-muted-foreground">
                {t.howTo.limitNote(formatSum(site.payoutLimit, locale))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

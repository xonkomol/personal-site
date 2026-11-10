import { site } from "@/lib/site.config";

export function Cases() {
  return (
    <section id="cases" className="scroll-mt-20 py-20 lg:py-24">
      <div className="shell">
        <h2 className="display-lg max-w-2xl text-balance">Результаты клиентов за последний год</h2>
        <p className="prose-measure mt-5 text-lg text-muted-foreground">
          Цифры до и после работы. По каждому проекту готовы показать отчёты из Метрики и CRM на
          созвоне.
        </p>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {site.cases.map((item) => (
            <article
              key={item.title}
              className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6"
            >
              <p className="text-xs font-medium text-muted-foreground">{item.industry}</p>
              <p className="font-display text-5xl font-bold tracking-tighter text-tile tnum">
                {item.metric}
              </p>
              <p className="text-sm font-medium">{item.metricLabel}</p>
              <h3 className="display-sm border-t border-border pt-4">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

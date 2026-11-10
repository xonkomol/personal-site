import { site } from "@/lib/site.config";

export function Process() {
  return (
    <section id="process" className="scroll-mt-20 bg-plaster py-20 lg:py-24">
      <div className="shell">
        <h2 className="display-lg max-w-2xl text-balance">Что происходит после вашей заявки</h2>
        <p className="prose-measure mt-5 text-lg text-muted-foreground">
          Пять этапов. Нумерация здесь настоящая: каждый шаг начинается после предыдущего.
        </p>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-5">
          {site.process.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-3 bg-background p-6">
              <span className="font-display text-sm font-bold text-tile tnum">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display-sm">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              <p className="mt-auto pt-2 text-xs font-medium text-accent">{step.duration}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

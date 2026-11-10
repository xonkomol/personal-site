import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site.config";

export function Pains() {
  return (
    <section className="bg-plaster py-20 lg:py-24">
      <div className="shell">
        <h2 className="display-lg max-w-3xl text-balance">
          Четыре причины, по которым бизнес в Узбекистане теряет заявки
        </h2>
        <p className="prose-measure mt-5 text-lg text-muted-foreground">
          С этими задачами к нам приходят чаще всего. Слева — то, что происходит сейчас. Справа — что
          меняем.
        </p>

        {/* Сравнение «сейчас → после»: разделители несут смысл, а не украшают. */}
        <dl className="mt-12 divide-y divide-border border-y border-border">
          {site.pains.map((item) => (
            <div
              key={item.pain}
              className="grid gap-3 py-6 md:grid-cols-[1fr_auto_1.4fr] md:items-center md:gap-8"
            >
              <dt className="font-display text-lg font-semibold tracking-tight text-muted-foreground">
                {item.pain}
              </dt>
              <ArrowRight className="hidden size-5 text-accent md:block" />
              <dd className="text-[15px] leading-relaxed">{item.fix}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

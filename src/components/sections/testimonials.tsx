import { Star } from "lucide-react";
import { site } from "@/lib/site.config";

export function Testimonials() {
  return (
    <section className="py-20 lg:py-24">
      <div className="shell">
        <h2 className="display-lg max-w-2xl text-balance">Что говорят клиенты</h2>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {site.testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col gap-5 rounded-lg border border-border bg-card p-6"
            >
              <div className="flex gap-0.5" aria-label={`Оценка ${t.rating} из 5`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="text-[15px] leading-relaxed">«{t.text}»</blockquote>
              <figcaption className="mt-auto border-t border-border pt-4 text-sm">
                <span className="font-medium">{t.name}</span>
                <span className="block text-muted-foreground">
                  {t.role}, {t.company}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

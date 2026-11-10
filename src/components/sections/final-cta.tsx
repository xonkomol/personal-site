import { Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/lead-form";
import { Tilework } from "@/components/tilework";
import { site, type City } from "@/lib/site.config";

export function FinalCta({ city }: { city?: City }) {
  return (
    <section
      id="contact"
      className="relative isolate scroll-mt-20 overflow-hidden bg-tile-deep py-20 text-white lg:py-24"
    >
      <Tilework id="cta" className="pointer-events-none absolute -bottom-28 -left-24 size-[30rem] text-white/[0.08]" />

      <div className="shell relative grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <div>
          <h2 className="display-lg text-balance">
            Посчитаем, сколько будет стоить заявка для вашего бизнеса
          </h2>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-white/80">
            Опишите задачу — пришлём структуру работ, сроки и стоимость{" "}
            {city ? `с учётом спроса в ${city.inCity}` : "под ваш рынок"}. Расчёт бесплатный и ни к
            чему не обязывает.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <a href={`tel:${city?.phone ?? site.contacts.phone}`}>
                <Phone className="size-4" />
                {site.contacts.phoneLabel}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <a href={site.contacts.telegram}>
                <Send className="size-4" />
                Telegram
              </a>
            </Button>
          </div>

          <p className="mt-8 text-sm text-white/55">
            {site.contacts.hoursLabel}. Вне графика отвечаем в Telegram.
          </p>
        </div>

        <div className="rounded-xl bg-card p-6 text-card-foreground lg:p-7">
          <p className="display-sm">Заявка на расчёт</p>
          <LeadForm
            source={city ? `cta-${city.slug}` : "cta"}
            withComment
            className="mt-5"
            submitLabel="Отправить заявку"
          />
        </div>
      </div>
    </section>
  );
}

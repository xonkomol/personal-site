import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { site } from "@/lib/site.config";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 py-20 lg:py-24">
      <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <h2 className="display-lg text-balance">Частые вопросы</h2>
          <p className="mt-5 text-[15px] text-muted-foreground">
            Не нашли свой — спросите в Telegram, ответим без менеджера по продажам.
          </p>
          <a
            href={site.contacts.telegram}
            className="mt-4 inline-block text-sm font-medium text-primary underline underline-offset-4"
          >
            {site.contacts.telegramLabel}
          </a>
        </div>

        {/* Эти же вопросы уходят в разметку FAQPage — попадают прямо в выдачу. */}
        <Accordion type="single" collapsible className="w-full">
          {site.faq.map((item, i) => (
            <AccordionItem key={item.q} value={`q-${i}`}>
              <AccordionTrigger className="text-left font-display text-base font-semibold tracking-tight">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

import { Phone, Send, Clock } from "lucide-react";
import { site, formatSum, type District } from "@/lib/site.config";

export function Hero({ district }: { district?: District }) {
  const place = district?.inCity ?? site.address.inCity;

  return (
    <section className="brand-gradient relative isolate overflow-hidden text-white">
      <div className="shell flex flex-col items-center py-16 text-center sm:py-20 lg:py-28">
        <p className="enter enter-1 flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs backdrop-blur-sm sm:text-sm">
          <Clock className="size-4 text-accent" />
          {site.contacts.hoursLabel}
        </p>

        <h1 className="display-xl enter enter-2 mt-5 max-w-3xl text-balance sm:mt-6">
          Европротокол в {place} за {site.contacts.arrival}
        </h1>

        <p className="enter enter-3 mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:mt-6 sm:text-lg">
          Вызовите аварийного комиссара — приедем на место ДТП, сделаем фотофиксацию и заполним
          извещение так, чтобы страховая выплатила до {formatSum(site.payoutLimit)}. Без вызова ГАИ и
          без потери дня.
        </p>

        {/* Телефон — главное действие на сайте, поэтому он набран крупнее всего. */}
        <div className="enter enter-4 mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:items-stretch sm:gap-4">
          <a
            href={`tel:${site.contacts.phone}`}
            className="pulse-call lift flex items-center justify-center gap-3.5 rounded-xl bg-accent px-5 py-4 text-left text-accent-foreground hover:bg-accent/90 sm:gap-4 sm:px-6 sm:py-5"
          >
            <Phone className="size-6 shrink-0 sm:size-7" strokeWidth={2.25} />
            <span className="flex flex-col">
              <span className="text-xs font-medium opacity-80">Звоните круглосуточно</span>
              <span className="font-display text-lg font-bold tracking-tight tnum sm:text-2xl">
                {site.contacts.phoneLabel}
              </span>
            </span>
          </a>

          <a
            href={site.contacts.telegram}
            className="lift flex items-center justify-center gap-3 rounded-xl border border-white/25 bg-white/5 px-5 py-4 font-display text-base font-semibold hover:bg-white/10 sm:px-7 sm:py-5 sm:text-lg"
          >
            <Send className="size-5 shrink-0 sm:size-6" strokeWidth={2.25} />
            Написать в Telegram
          </a>
        </div>

        <p className="enter enter-5 mt-6 max-w-2xl text-sm text-white/60">
          Выезжаем во все районы {district ? `Ташкента, включая ${district.name}` : "Ташкента"}:{" "}
          {site.districts.map((d) => d.short).join(", ")}.
        </p>
      </div>
    </section>
  );
}

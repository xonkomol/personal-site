import { Phone, Send, Clock } from "lucide-react";
import { site, formatSum, type District } from "@/lib/site.config";

export function Hero({ district }: { district?: District }) {
  const place = district?.inCity ?? site.address.inCity;

  return (
    <section className="relative isolate overflow-hidden bg-tile-deep text-white">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(90% 70% at 20% 0%, rgba(11,124,176,0.45) 0%, transparent 60%)",
        }}
      />

      <div className="shell flex flex-col items-center py-16 text-center lg:py-24">
        <p className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm">
          <Clock className="size-4 text-accent" />
          {site.contacts.hoursLabel}
        </p>

        <h1 className="display-xl mt-6 max-w-3xl text-balance">
          Европротокол {district ? `в ${place}` : `в ${place}`} за {site.contacts.arrival}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
          Вызовите аварийного комиссара — приедем на место ДТП, сделаем фотофиксацию и заполним
          извещение так, чтобы страховая выплатила до {formatSum(site.payoutLimit)}. Без вызова ГАИ и
          без потери дня.
        </p>

        {/* Телефон — главное действие на сайте, поэтому он набран крупнее всего. */}
        <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-stretch">
          <a
            href={`tel:${site.contacts.phone}`}
            className="group flex items-center gap-4 rounded-xl bg-accent px-6 py-5 text-left text-accent-foreground transition-colors hover:bg-accent/90"
          >
            <Phone className="size-7 shrink-0" strokeWidth={2.25} />
            <span className="flex flex-col">
              <span className="text-xs font-medium opacity-80">Звоните круглосуточно</span>
              <span className="font-display text-xl font-bold tracking-tight tnum sm:text-2xl">
                {site.contacts.phoneLabel}
              </span>
            </span>
          </a>

          <a
            href={site.contacts.telegram}
            className="flex items-center gap-4 rounded-xl border border-white/25 px-6 py-5 text-left transition-colors hover:bg-white/10"
          >
            <Send className="size-7 shrink-0" strokeWidth={2.25} />
            <span className="flex flex-col">
              <span className="text-xs font-medium text-white/70">Напишите в Telegram</span>
              <span className="font-display text-xl font-bold tracking-tight">
                {site.contacts.telegramLabel}
              </span>
            </span>
          </a>
        </div>

        <p className="mt-6 max-w-2xl text-sm text-white/60">
          Выезжаем во все районы {district ? `Ташкента, включая ${district.name}` : "Ташкента"}:{" "}
          {site.districts.map((d) => d.short).join(", ")}.
        </p>
      </div>
    </section>
  );
}

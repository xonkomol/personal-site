import { Phone, Send, PlayCircle, Clock, Timer, Wallet } from "lucide-react";
import { site, formatSum, type District } from "@/lib/site.config";

const facts = [
  { icon: Clock, value: "24/7", label: "выезд круглосуточно" },
  { icon: Timer, value: "30 минут", label: "среднее время приезда" },
  { icon: Wallet, value: "до 14 млн", label: "выплата по европротоколу" },
];

export function Hero({ district }: { district?: District }) {
  const place = district?.inCity ?? site.address.inCity;

  return (
    <section className="brand-gradient relative isolate overflow-hidden text-white">
      <div className="shell flex flex-col items-center py-14 text-center sm:py-20 lg:py-24">
        <h1 className="display-caps enter enter-1 max-w-4xl text-balance text-[clamp(1.7rem,5.2vw,3.4rem)]">
          Услуги <span className="text-accent">европротокола</span>
          <br />в {place} 24/7
        </h1>

        <p className="eyebrow-gold enter enter-2 mt-4 text-sm sm:text-base">Круглосуточно</p>

        <p className="glass enter enter-2 mt-7 max-w-2xl rounded-xl px-5 py-4 text-sm leading-relaxed text-white/85 sm:text-base">
          Вызовите аварийного комиссара на место ДТП — сделаем фотофиксацию и заполним извещение так,
          чтобы страховая выплатила до {formatSum(site.payoutLimit)}. Без вызова ГАИ и без потери дня.
        </p>

        <p className="enter enter-3 mt-5 font-display text-base font-bold text-accent sm:text-lg">
          Приезжаем первыми — платите после оформления
        </p>

        {/* Телефон — главное действие на сайте, поэтому он набран крупнее всего. */}
        <a
          href={`tel:${site.contacts.phone}`}
          className="glass lift enter enter-3 mt-6 flex w-full max-w-md flex-col items-center rounded-xl px-6 py-4"
        >
          <span className="text-xs text-white/65">Вызов аварийного комиссара</span>
          <span className="mt-1 font-display text-2xl font-bold tracking-tight tnum sm:text-3xl">
            {site.contacts.phoneLabel}
          </span>
        </a>

        <div className="enter enter-4 mt-7 flex w-full max-w-3xl flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={`tel:${site.contacts.phone}`}
            className="pulse-call lift flex items-center justify-center gap-2.5 rounded-lg bg-accent px-5 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90"
          >
            <Phone className="size-4" strokeWidth={2.5} />
            Заказать звонок
          </a>
          <a
            href={site.contacts.telegram}
            className="lift flex items-center justify-center gap-2.5 rounded-lg bg-accent px-5 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90"
          >
            <Send className="size-4" strokeWidth={2.5} />
            Написать в Telegram
          </a>
          <a
            href="#how-to"
            className="lift flex items-center justify-center gap-2.5 rounded-lg border border-white/25 bg-white/5 px-5 py-3.5 font-display text-sm font-bold uppercase tracking-wide hover:bg-white/10"
          >
            <PlayCircle className="size-4" strokeWidth={2.5} />
            Как оформить
          </a>
        </div>

        <ul className="enter enter-5 mt-10 grid w-full max-w-4xl gap-3 sm:grid-cols-3">
          {facts.map((fact) => (
            <li key={fact.label} className="glass flex flex-col items-center rounded-xl px-4 py-5">
              <fact.icon className="size-5 text-accent" strokeWidth={2.25} />
              <span className="mt-2 font-display text-xl font-bold tracking-tight">{fact.value}</span>
              <span className="mt-1 text-xs text-white/65">{fact.label}</span>
            </li>
          ))}
        </ul>

        <p className="enter enter-5 mt-8 max-w-2xl text-sm text-white/55">
          Выезжаем во все районы Ташкента: {site.districts.map((d) => d.short).join(", ")}.
        </p>
      </div>
    </section>
  );
}

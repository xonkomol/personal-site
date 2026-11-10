import Link from "next/link";
import { MapPin } from "lucide-react";
import { site } from "@/lib/site.config";

export function Geo({ currentCity }: { currentCity?: string }) {
  return (
    <section id="geo" className="scroll-mt-20 bg-plaster py-20 lg:py-24">
      <div className="shell">
        <h2 className="display-lg max-w-2xl text-balance">
          Работаем по всему Узбекистану
        </h2>
        <p className="prose-measure mt-5 text-lg text-muted-foreground">
          Офис в {site.address.inCity}, {site.address.landmark}. В остальных городах ведём проекты
          удалённо, а на запуск приезжаем.
        </p>

        {/* Внутренние ссылки на гео-страницы: поиск связывает город с услугой. */}
        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {site.cities.map((city) => {
            const isCurrent = city.slug === currentCity;
            return (
              <li key={city.slug} className="bg-background">
                <Link
                  href={`/uslugi/${city.slug}`}
                  aria-current={isCurrent ? "page" : undefined}
                  className="flex h-full flex-col gap-2 p-5 transition-colors hover:bg-secondary aria-[current]:bg-secondary"
                >
                  <span className="flex items-center gap-2 font-display text-base font-semibold tracking-tight">
                    <MapPin className="size-4 text-tile" />
                    {city.name}
                  </span>
                  <span className="text-xs text-muted-foreground">{city.region}</span>
                  <span className="mt-auto pt-2 text-xs text-muted-foreground">
                    {city.districts.slice(0, 3).join(" · ")}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

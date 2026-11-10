import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, MapPin, Phone, Clock } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { Advantages } from "@/components/sections/advantages";
import { HowTo } from "@/components/sections/how-to";
import { Price } from "@/components/sections/price";
import { JsonLd } from "@/components/json-ld";
import {
  graph,
  districtBusinessSchema,
  serviceSchema,
  howToSchema,
  breadcrumbSchema,
} from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site, getDistrict, formatSum } from "@/lib/site.config";

/**
 * Страница целиком зависит от района, поэтому отдаём её одним статическим
 * документом, а не оболочкой с дозагрузкой. Так HTML приходит сразу и целиком.
 */
export const instant = false;

/** Все страницы районов собираются статически на этапе сборки. */
export function generateStaticParams() {
  return site.districts.map((d) => ({ district: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/rayon/[district]">) {
  const { district: slug } = await params;
  const district = getDistrict(slug);
  if (!district) return {};

  return pageMetadata({
    // Уникальный title под запрос «услуга + район».
    title: `Европротокол в ${district.inCity} — ${site.brand.name}`,
    description: `Аварийный комиссар в ${district.inCity} Ташкента круглосуточно. Оформление европротокола на месте ДТП за ${site.contacts.arrival}, выплата до ${formatSum(site.payoutLimit)}. Звоните ${site.contacts.phoneLabel}.`,
    path: `/rayon/${district.slug}`,
    // Ключи района плюс общий кластер сайта: запросы «услуга + район» и «услуга + город».
    keywords: [
      `европротокол ${district.short}`,
      `европротокол ${district.name}`,
      `европротокол в ${district.inCity}`,
      `аварийный комиссар ${district.short}`,
      `аварийный комиссар ${district.name}`,
      `вызвать аварийного комиссара ${district.short}`,
      `оформление ДТП ${district.short}`,
      `оформление ДТП без ГАИ ${district.short}`,
      `помощь при ДТП ${district.short}`,
      `аджастер ${district.short}`,
      `yevroprotokol ${district.short}`,
      ...district.landmarks.map((l) => `аварийный комиссар ${l}`),
      ...site.seo.keywords,
    ],
  });
}

export default async function DistrictPage({ params }: PageProps<"/rayon/[district]">) {
  const { district: slug } = await params;
  const district = getDistrict(slug);
  if (!district) notFound();

  return (
    <>
      <JsonLd
        data={graph([
          districtBusinessSchema(district),
          serviceSchema(district),
          howToSchema(),
          breadcrumbSchema([
            { name: "Главная", path: "/" },
            { name: `Европротокол в ${district.inCity}`, path: `/rayon/${district.slug}` },
          ]),
        ])}
      />

      <nav aria-label="Хлебные крошки" className="border-b border-border bg-plaster">
        <ol className="shell flex items-center gap-1.5 py-3 text-xs text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground">
              Главная
            </Link>
          </li>
          <ChevronRight className="size-3.5" />
          <li aria-current="page" className="text-foreground">
            Европротокол в {district.inCity}
          </li>
        </ol>
      </nav>

      <Hero district={district} />

      {/* Уникальный текст под район: без него страницы считаются дублями. */}
      <section className="py-14 sm:py-20 lg:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <h2 className="display-lg text-balance">
              Аварийный комиссар в {district.inCity}
            </h2>
            <p className="prose-measure mt-6 text-lg leading-relaxed text-muted-foreground">
              {district.intro}
            </p>
            <p className="prose-measure mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Если случай не проходит по европротоколу — например, пострадал человек или участников
              больше двух — скажем об этом сразу и поможем вызвать ГАИ, а не оформим документы,
              которые страховая не примет.
            </p>
          </div>

          <dl className="grid content-start gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
            <div className="bg-card p-5">
              <dt className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="size-3.5" />
                Время приезда
              </dt>
              <dd className="mt-1.5 font-display text-base font-semibold">
                в среднем {site.contacts.arrival}
              </dd>
            </div>
            <div className="bg-card p-5">
              <dt className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="size-3.5" />
                Диспетчер
              </dt>
              <dd className="mt-1.5">
                <a
                  href={`tel:${site.contacts.phone}`}
                  className="font-display text-base font-semibold tnum"
                >
                  {site.contacts.phoneLabel}
                </a>
              </dd>
            </div>
            <div className="bg-card p-5 sm:col-span-2">
              <dt className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="size-3.5" />
                Выезжаем по ориентирам
              </dt>
              <dd className="mt-1.5 text-[15px]">{district.landmarks.join(", ")}</dd>
            </div>
            <div className="bg-card p-5 sm:col-span-2">
              <dt className="text-xs text-muted-foreground">Другие районы</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {site.districts
                  .filter((d) => d.slug !== district.slug)
                  .map((d) => (
                    <Link
                      key={d.slug}
                      href={`/rayon/${d.slug}`}
                      className="rounded-md bg-secondary px-2.5 py-1 text-sm transition-colors hover:bg-tile/10"
                    >
                      {d.short}
                    </Link>
                  ))}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <Advantages />
      <HowTo />
      <Price />
    </>
  );
}

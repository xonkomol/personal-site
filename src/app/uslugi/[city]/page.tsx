import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Cases } from "@/components/sections/cases";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { Geo } from "@/components/sections/geo";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/json-ld";
import {
  graph,
  localBusinessSchema,
  serviceSchemas,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site, getCity } from "@/lib/site.config";

/** Все гео-страницы собираются статически на этапе сборки. */
export function generateStaticParams() {
  return site.cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: PageProps<"/uslugi/[city]">) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};

  return pageMetadata({
    // Уникальный title под запрос «услуга + город».
    title: `Создание сайтов и реклама в ${city.inCity} — ${site.brand.name}`,
    description: `Разработка сайтов, SEO и реклама в ${city.inCity}: от ${site.services[0].priceFrom.toLocaleString("ru-RU")} сум, запуск от 10 дней. Фиксированная смета, отчёт по стоимости заявки. ${city.region}.`,
    path: `/uslugi/${city.slug}`,
    keywords: [
      `создание сайтов ${city.name}`,
      `разработка сайта ${city.name}`,
      `заказать лендинг ${city.name}`,
      `seo продвижение ${city.name}`,
      `настройка рекламы ${city.name}`,
      `digital агентство ${city.name}`,
    ],
  });
}

export default async function CityPage({ params }: PageProps<"/uslugi/[city]">) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  return (
    <>
      <JsonLd
        data={graph([
          localBusinessSchema(city),
          ...serviceSchemas(city),
          faqSchema(),
          breadcrumbSchema([
            { name: "Главная", path: "/" },
            { name: `Услуги в ${city.inCity}`, path: `/uslugi/${city.slug}` },
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
            Услуги в {city.inCity}
          </li>
        </ol>
      </nav>

      <Hero city={city} />

      {/* Уникальный текст под город: без него гео-страницы считаются дублями. */}
      <section className="py-20 lg:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <h2 className="display-lg text-balance">
              Как мы работаем с бизнесом {city.ofCity}
            </h2>
            <p className="prose-measure mt-6 text-lg leading-relaxed text-muted-foreground">
              {city.intro}
            </p>
            <p className="prose-measure mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Проекты ведём удалённо: созвоны, доступ к задачам и отчёты онлайн. На запуск и съёмку
              приезжаем в {city.inCity} — дорога за наш счёт.
            </p>
          </div>

          <dl className="grid content-start gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
            <div className="bg-card p-5">
              <dt className="text-xs text-muted-foreground">Регион</dt>
              <dd className="mt-1 font-display text-base font-semibold">{city.region}</dd>
            </div>
            <div className="bg-card p-5">
              <dt className="text-xs text-muted-foreground">Телефон</dt>
              <dd className="mt-1">
                <a
                  href={`tel:${city.phone ?? site.contacts.phone}`}
                  className="font-display text-base font-semibold tnum"
                >
                  {site.contacts.phoneLabel}
                </a>
              </dd>
            </div>
            <div className="bg-card p-5 sm:col-span-2">
              <dt className="text-xs text-muted-foreground">Районы, где есть наши клиенты</dt>
              <dd className="mt-1.5 text-[15px]">{city.districts.join(", ")}</dd>
            </div>
            <div className="bg-card p-5 sm:col-span-2">
              <dt className="text-xs text-muted-foreground">Время ответа на заявку</dt>
              <dd className="mt-1 font-display text-base font-semibold">
                {site.contacts.responseTime}, {site.contacts.hoursLabel}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <Services city={city} />
      <Process />
      <Cases />
      <Pricing />
      <Testimonials />
      <Geo currentCity={city.slug} />
      <Faq />
      <FinalCta city={city} />
    </>
  );
}

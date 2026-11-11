import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, MapPin, Phone, Clock } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { Advantages } from "@/components/sections/advantages";
import { Urgent } from "@/components/sections/urgent";
import { HowTo } from "@/components/sections/how-to";
import { Price } from "@/components/sections/price";
import { Consult } from "@/components/sections/consult";
import { JsonLd } from "@/components/json-ld";
import {
  graph,
  districtBusinessSchema,
  serviceSchemas,
  howToSchema,
  breadcrumbSchema,
} from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site.config";
import { getContent, getDistrict } from "@/lib/content";
import { formatSum, localePath, locales, isLocale } from "@/lib/i18n";

/**
 * Страница целиком зависит от района, поэтому отдаём её одним статическим
 * документом, а не оболочкой с дозагрузкой. Так HTML приходит сразу и целиком.
 */
export const instant = false;

/** Все страницы районов собираются статически на этапе сборки. */
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    site.districts.map((d) => ({ locale, district: d.slug }))
  );
}

export async function generateMetadata({ params }: PageProps<"/[locale]/rayon/[district]">) {
  const { locale, district: slug } = await params;
  if (!isLocale(locale)) return {};
  const t = getContent(locale);
  const district = getDistrict(locale, slug);
  if (!district) return {};

  return pageMetadata({
    locale,
    // Уникальный title под запрос «услуга + район».
    title: t.seo.districtTitle(district.inCity),
    description: t.seo.districtDescription(
      district.inCity,
      formatSum(site.payoutLimit, locale)
    ),
    path: `/rayon/${slug}`,
    keywords: [
      ...t.seo.districtKeywords(district.short, district.name),
      ...district.landmarks.map((l) => `${t.footer.services[1]} ${l}`),
      ...t.seo.keywords,
    ],
  });
}

export default async function DistrictPage({ params }: PageProps<"/[locale]/rayon/[district]">) {
  const { locale, district: slug } = await params;
  if (!isLocale(locale)) notFound();
  const t = getContent(locale);
  const district = getDistrict(locale, slug);
  if (!district) notFound();

  return (
    <>
      <JsonLd
        data={graph([
          districtBusinessSchema(locale, slug, district),
          ...serviceSchemas(locale, district),
          howToSchema(locale),
          breadcrumbSchema(locale, [
            { name: t.district.home, path: "" },
            { name: t.district.crumb(district.inCity), path: `/rayon/${slug}` },
          ]),
        ])}
      />

      <nav aria-label={t.district.breadcrumbs} className="border-b border-border bg-plaster">
        <ol className="shell flex items-center gap-1.5 py-3 text-xs text-muted-foreground">
          <li>
            <Link href={localePath(locale)} className="hover:text-foreground">
              {t.district.home}
            </Link>
          </li>
          <ChevronRight className="size-3.5" />
          <li aria-current="page" className="text-foreground">
            {t.district.crumb(district.inCity)}
          </li>
        </ol>
      </nav>

      <Hero locale={locale} district={district} />

      {/* Уникальный текст под район: без него страницы считаются дублями. */}
      <section className="py-14 sm:py-20 lg:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <h2 className="display-lg text-balance">{t.district.heading(district.inCity)}</h2>
            <p className="prose-measure mt-6 text-lg leading-relaxed text-muted-foreground">
              {district.intro}
            </p>
            <p className="prose-measure mt-4 text-[15px] leading-relaxed text-muted-foreground">
              {t.district.extra}
            </p>
          </div>

          <dl className="grid content-start gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
            <div className="bg-card p-5">
              <dt className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="size-3.5" />
                {t.district.arrivalLabel}
              </dt>
              <dd className="mt-1.5 font-display text-base font-semibold">
                {t.district.arrivalValue}
              </dd>
            </div>
            <div className="bg-card p-5">
              <dt className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="size-3.5" />
                {t.district.dispatcherLabel}
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
                {t.district.landmarksLabel}
              </dt>
              <dd className="mt-1.5 text-[15px]">{district.landmarks.join(", ")}</dd>
            </div>
            <div className="bg-card p-5 sm:col-span-2">
              <dt className="text-xs text-muted-foreground">{t.district.otherDistricts}</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {site.districts
                  .filter((d) => d.slug !== slug)
                  .map((d) => (
                    <Link
                      key={d.slug}
                      href={localePath(locale, `/rayon/${d.slug}`)}
                      className="rounded-md bg-secondary px-2.5 py-1 text-sm transition-colors hover:bg-tile/10"
                    >
                      {t.districts[d.slug as keyof typeof t.districts].short}
                    </Link>
                  ))}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <Advantages locale={locale} />
      <Urgent locale={locale} />
      <HowTo locale={locale} />
      <Price locale={locale} />
      <Consult locale={locale} />
    </>
  );
}

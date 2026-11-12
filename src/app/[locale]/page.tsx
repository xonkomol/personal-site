import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/hero";
import { Advantages } from "@/components/sections/advantages";
import { Urgent } from "@/components/sections/urgent";
import { HowTo } from "@/components/sections/how-to";
import { Price } from "@/components/sections/price";
import { Consult } from "@/components/sections/consult";
import { JsonLd } from "@/components/json-ld";
import { graph, serviceSchemas, howToSchema, breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site.config";
import { getContent } from "@/lib/content";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) return { metadataBase: new URL(site.url) };
  const t = getContent(locale);

  return pageMetadata({
    locale,
    title: t.seo.title,
    description: t.seo.description,
    keywords: t.seo.keywords,
  });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getContent(locale);

  return (
    <>
      <JsonLd
        data={graph([
          ...serviceSchemas(locale),
          howToSchema(locale),
          breadcrumbSchema(locale, [{ name: t.district.home, path: "" }]),
        ])}
      />
      <Hero locale={locale} />
      <Advantages locale={locale} />
      <Urgent locale={locale} />
      <HowTo locale={locale} />
      <Price locale={locale} />
      <Consult locale={locale} />
    </>
  );
}

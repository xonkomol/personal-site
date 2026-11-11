import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Golos_Text, Unbounded } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileCallBar } from "@/components/mobile-call-bar";
import { JsonLd } from "@/components/json-ld";
import { graph, organizationSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/lib/site.config";
import { canonical } from "@/lib/seo";
import { getContent } from "@/lib/content";
import { locales, localeTag, isLocale } from "@/lib/i18n";
import "../globals.css";

const golos = Golos_Text({
  variable: "--font-golos",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getContent(locale);

  return {
    metadataBase: new URL(site.url),
    title: { default: t.seo.title, template: `%s — ${site.brand.name}` },
    description: t.seo.description,
    applicationName: site.brand.name,
    creator: site.brand.legalName,
    publisher: site.brand.legalName,
    category: "business",
    alternates: { canonical: canonical(locale) },
    verification: {
      google: site.seo.verification.google || undefined,
      yandex: site.seo.verification.yandex || undefined,
    },
    formatDetection: { telephone: true, address: true },
    other: {
      /** Географические мета-теги: сигнал для локального поиска и карт. */
      "geo.region": "UZ-TK",
      "geo.placename": t.cityName,
      "geo.position": `${site.address.coords.lat};${site.address.coords.lng}`,
      ICBM: `${site.address.coords.lat}, ${site.address.coords.lng}`,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#081c47",
  colorScheme: "light",
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const ym = site.seo.analytics.yandexMetrika;

  return (
    <html
      lang={localeTag[locale]}
      className={`${golos.variable} ${unbounded.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col pb-14 md:pb-0">
        <JsonLd data={graph([organizationSchema(locale), websiteSchema(locale)])} />
        <SiteHeader locale={locale} />
        <main className="flex-1">{children}</main>
        <SiteFooter locale={locale} />
        <MobileCallBar locale={locale} />

        <SpeedInsights />

        {ym && (
          <Script id="yandex-metrika" strategy="afterInteractive">
            {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
            ym(${JSON.stringify(ym)}, "init", {clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`}
          </Script>
        )}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Golos_Text, Unbounded } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileCallBar } from "@/components/mobile-call-bar";
import { JsonLd } from "@/components/json-ld";
import { graph, organizationSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/lib/site.config";
import { canonical } from "@/lib/seo";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.seo.title,
    template: `%s — ${site.brand.name}`,
  },
  description: site.seo.description,
  applicationName: site.brand.name,
  authors: [{ name: site.brand.legalName, url: site.url }],
  creator: site.brand.legalName,
  publisher: site.brand.legalName,
  keywords: [...site.seo.keywords],
  category: "business",
  alternates: { canonical: canonical("/") },
  verification: {
    google: site.seo.verification.google || undefined,
    yandex: site.seo.verification.yandex || undefined,
  },
  formatDetection: { telephone: true, address: true },
  openGraph: {
    type: "website",
    locale: site.locale.tag.replace("-", "_"),
    url: canonical("/"),
    siteName: site.brand.name,
    title: site.seo.title,
    description: site.seo.description,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  other: {
    /** Географические мета-теги: сигнал для локального поиска и карт. */
    "geo.region": `${site.locale.country}-TK`,
    "geo.placename": site.address.city,
    "geo.position": `${site.address.coords.lat};${site.address.coords.lng}`,
    ICBM: `${site.address.coords.lat}, ${site.address.coords.lng}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a3457",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const ym = site.seo.analytics.yandexMetrika;

  return (
    <html
      lang={site.locale.lang}
      className={`${golos.variable} ${unbounded.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col pb-14 md:pb-0">
        <JsonLd data={graph([organizationSchema(), websiteSchema()])} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <MobileCallBar />

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

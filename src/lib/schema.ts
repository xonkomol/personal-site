import { site } from "./site.config";
import { canonical } from "./seo";
import { localeTag, type Locale } from "./i18n";
import { getContent, type Dict } from "./content";

/**
 * Микроразметка schema.org. Яндекс и Google берут отсюда адрес, телефон,
 * часы работы, цены и шаги инструкции — это даёт расширенный сниппет в выдаче.
 */

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;

type District = Dict["districts"]["yunusabad"];

const postalAddress = (locale: Locale) => ({
  "@type": "PostalAddress",
  streetAddress: locale === "ru" ? site.address.street : site.address.streetUz,
  addressLocality: locale === "ru" ? site.address.city : site.address.cityUz,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: "UZ",
});

const openingHours = () =>
  site.contacts.hours.map((h) => {
    const [days, time] = h.split(" ");
    const [opens, closes] = time.split("-");
    return { "@type": "OpeningHoursSpecification", dayOfWeek: days, opens, closes };
  });

export const organizationSchema = (locale: Locale) => {
  const t = getContent(locale);
  return {
    "@type": ["Organization", "LocalBusiness", "AutomotiveBusiness"],
    "@id": ORG_ID,
    name: site.brand.name,
    legalName: site.brand.legalName,
    slogan: site.brand.tagline,
    description: t.seo.description,
    url: site.url,
    logo: `${site.url}${site.brand.logo}`,
    image: `${site.url}/opengraph-image`,
    telephone: site.contacts.phone,
    email: site.contacts.email,
    address: postalAddress(locale),
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.coords.lat,
      longitude: site.address.coords.lng,
    },
    openingHoursSpecification: openingHours(),
    sameAs: [site.contacts.telegram],
    areaServed: site.districts.map((d) => ({
      "@type": "AdministrativeArea",
      name: t.districts[d.slug as keyof typeof t.districts].name,
      containedInPlace: { "@type": "City", name: t.cityName },
    })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.contacts.phone,
        contactType: "emergency",
        areaServed: "UZ",
        availableLanguage: ["ru", "uz"],
        hoursAvailable: openingHours(),
      },
    ],
  };
};

export const websiteSchema = (locale: Locale) => ({
  "@type": "WebSite",
  "@id": SITE_ID,
  url: site.url,
  name: site.brand.name,
  inLanguage: localeTag[locale],
  publisher: { "@id": ORG_ID },
});

/** По одной записи Service на каждую услугу с ценой. */
export const serviceSchemas = (locale: Locale, district?: District) => {
  const t = getContent(locale);
  return t.price.services.map((service) => ({
    "@type": "Service",
    name: district ? `${service.name} — ${district.name}` : service.name,
    serviceType: service.name,
    description: service.includes.join(". "),
    provider: { "@id": ORG_ID },
    areaServed: district
      ? { "@type": "AdministrativeArea", name: district.name }
      : { "@type": "City", name: t.cityName },
    hoursAvailable: openingHours(),
    offers: {
      "@type": "Offer",
      price: site.pricing[service.key],
      priceCurrency: "UZS",
      availability: "https://schema.org/InStock",
      url: canonical(locale, district ? `/rayon/${districtSlug(locale, district)}` : "#price"),
    },
  }));
};

const districtSlug = (locale: Locale, district: District) => {
  const all = getContent(locale).districts;
  return Object.keys(all).find((slug) => all[slug as keyof typeof all] === district) ?? "";
};

/** Пошаговая инструкция: Яндекс показывает такие шаги прямо в выдаче. */
export const howToSchema = (locale: Locale) => {
  const t = getContent(locale);
  return {
    "@type": "HowTo",
    name: t.howTo.title,
    description: t.howTo.lead,
    totalTime: "PT30M",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "UZS",
      value: site.pricing.europrotocol,
    },
    step: t.howTo.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.text,
    })),
  };
};

export const breadcrumbSchema = (locale: Locale, items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: canonical(locale, item.path),
  })),
});

export const districtBusinessSchema = (locale: Locale, slug: string, district: District) => ({
  "@type": ["LocalBusiness", "AutomotiveBusiness"],
  "@id": `${canonical(locale, `/rayon/${slug}`)}#business`,
  name: `${site.brand.name} — ${district.name}`,
  description: district.intro,
  parentOrganization: { "@id": ORG_ID },
  url: canonical(locale, `/rayon/${slug}`),
  telephone: site.contacts.phone,
  image: `${site.url}/opengraph-image`,
  address: postalAddress(locale),
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.districts.find((d) => d.slug === slug)?.coords.lat,
    longitude: site.districts.find((d) => d.slug === slug)?.coords.lng,
  },
  openingHoursSpecification: openingHours(),
  areaServed: [
    { "@type": "AdministrativeArea", name: district.name },
    ...district.landmarks.map((l) => ({ "@type": "Place", name: l })),
  ],
});

/** Собирает один @graph — так поисковики связывают сущности между собой. */
export const graph = (nodes: (object | null)[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes.filter(Boolean),
});

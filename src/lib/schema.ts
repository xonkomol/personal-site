import { site, type District } from "./site.config";
import { canonical } from "./seo";

/**
 * Микроразметка schema.org. Яндекс и Google берут отсюда адрес, телефон,
 * часы работы, цену и шаги инструкции — это даёт расширенный сниппет в выдаче.
 */

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;

const postalAddress = () => ({
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: site.address.city,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.locale.country,
});

const openingHours = () =>
  site.contacts.hours.map((h) => {
    const [days, time] = h.split(" ");
    const [opens, closes] = time.split("-");
    return { "@type": "OpeningHoursSpecification", dayOfWeek: days, opens, closes };
  });

export const organizationSchema = () => ({
  "@type": ["Organization", "LocalBusiness", "AutomotiveBusiness"],
  "@id": ORG_ID,
  name: site.brand.name,
  legalName: site.brand.legalName,
  slogan: site.brand.tagline,
  description: site.seo.description,
  url: site.url,
  logo: `${site.url}${site.brand.logo}`,
  image: `${site.url}/opengraph-image`,
  telephone: site.contacts.phone,
  email: site.contacts.email,
  address: postalAddress(),
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.address.coords.lat,
    longitude: site.address.coords.lng,
  },
  openingHoursSpecification: openingHours(),
  sameAs: [site.contacts.telegram],
  areaServed: site.districts.map((d) => ({
    "@type": "AdministrativeArea",
    name: d.name,
    containedInPlace: { "@type": "City", name: site.address.city },
  })),
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: site.contacts.phone,
      contactType: "emergency",
      areaServed: site.locale.country,
      availableLanguage: ["ru", "uz"],
      hoursAvailable: openingHours(),
    },
  ],
});

export const websiteSchema = () => ({
  "@type": "WebSite",
  "@id": SITE_ID,
  url: site.url,
  name: site.brand.name,
  inLanguage: site.locale.tag,
  publisher: { "@id": ORG_ID },
});

export const serviceSchema = (district?: District) => ({
  "@type": "Service",
  name: district
    ? `Оформление европротокола в ${district.inCity}`
    : `Оформление европротокола в ${site.address.inCity}`,
  serviceType: "Услуги аварийного комиссара",
  description: site.seo.description,
  provider: { "@id": ORG_ID },
  areaServed: district
    ? { "@type": "AdministrativeArea", name: district.name }
    : { "@type": "City", name: site.address.city },
  hoursAvailable: openingHours(),
  offers: {
    "@type": "Offer",
    price: site.pricing.price,
    priceCurrency: site.locale.currency,
    availability: "https://schema.org/InStock",
    url: canonical(district ? `/rayon/${district.slug}` : "/#price"),
    itemOffered: site.pricing.includes.map((name) => ({ "@type": "Service", name })),
  },
});

/** Пошаговая инструкция: Яндекс показывает такие шаги прямо в выдаче. */
export const howToSchema = () => ({
  "@type": "HowTo",
  name: "Как оформить европротокол при ДТП в Узбекистане",
  description:
    "Порядок действий на месте ДТП: от аварийной сигнализации до выплаты страховой компании.",
  totalTime: "PT30M",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: site.locale.currency,
    value: site.pricing.price,
  },
  step: site.howTo.steps.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    text: s.text,
  })),
});

export const videoSchema = () =>
  site.howTo.videoId
    ? {
        "@type": "VideoObject",
        name: site.howTo.videoTitle,
        description: site.howTo.videoTitle,
        thumbnailUrl: `https://i.ytimg.com/vi/${site.howTo.videoId}/maxresdefault.jpg`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${site.howTo.videoId}`,
        uploadDate: "2026-01-01",
      }
    : null;

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: canonical(item.path),
  })),
});

export const districtBusinessSchema = (district: District) => ({
  "@type": ["LocalBusiness", "AutomotiveBusiness"],
  "@id": `${canonical(`/rayon/${district.slug}`)}#business`,
  name: `${site.brand.name} — ${district.name}`,
  description: district.intro,
  parentOrganization: { "@id": ORG_ID },
  url: canonical(`/rayon/${district.slug}`),
  telephone: site.contacts.phone,
  image: `${site.url}/opengraph-image`,
  address: postalAddress(),
  geo: {
    "@type": "GeoCoordinates",
    latitude: district.coords.lat,
    longitude: district.coords.lng,
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

import { site, type City } from "./site.config";
import { canonical } from "./seo";

/**
 * Микроразметка schema.org. Яндекс и Google берут отсюда адрес, телефон,
 * рейтинг, цены и вопросы — это то, что даёт расширенный сниппет в выдаче.
 */

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;

const postalAddress = (city: string = site.address.city) => ({
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: city,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.locale.country,
});

export const organizationSchema = () => ({
  "@type": ["Organization", "ProfessionalService"],
  "@id": ORG_ID,
  name: site.brand.name,
  legalName: site.brand.legalName,
  description: site.seo.description,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  image: `${site.url}/opengraph-image`,
  foundingDate: String(site.brand.foundedYear),
  numberOfEmployees: { "@type": "QuantitativeValue", value: site.brand.employees },
  priceRange: site.locale.priceRange,
  currenciesAccepted: site.locale.currency,
  paymentAccepted: "Безналичный расчёт, Payme, Click",
  telephone: site.contacts.phone,
  email: site.contacts.email,
  address: postalAddress(),
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.address.coords.lat,
    longitude: site.address.coords.lng,
  },
  openingHoursSpecification: site.contacts.hours.map((h) => {
    const [days, time] = h.split(" ");
    const [opens, closes] = time.split("-");
    return {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: days,
      opens,
      closes,
    };
  }),
  sameAs: [site.contacts.telegram, site.contacts.instagram],
  areaServed: site.cities.map((c) => ({
    "@type": "City",
    name: c.name,
    containedInPlace: { "@type": "Country", name: site.locale.countryName },
  })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.rating.value,
    reviewCount: site.rating.count,
    bestRating: 5,
    worstRating: 1,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: site.contacts.phone,
      contactType: "sales",
      areaServed: site.locale.country,
      availableLanguage: ["ru", "uz", "en"],
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

export const serviceSchemas = (city?: City) =>
  site.services.map((s) => ({
    "@type": "Service",
    name: city ? `${s.title} — ${city.name}` : s.title,
    description: s.short,
    serviceType: s.title,
    provider: { "@id": ORG_ID },
    areaServed: {
      "@type": "City",
      name: city?.name ?? site.address.city,
    },
    offers: {
      "@type": "Offer",
      price: s.priceFrom,
      priceCurrency: site.locale.currency,
      availability: "https://schema.org/InStock",
      url: canonical(city ? `/uslugi/${city.slug}` : "/#services"),
    },
  }));

export const faqSchema = () => ({
  "@type": "FAQPage",
  mainEntity: site.faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const reviewsSchema = () =>
  site.testimonials.map((t) => ({
    "@type": "Review",
    itemReviewed: { "@id": ORG_ID },
    author: { "@type": "Person", name: t.name },
    reviewRating: { "@type": "Rating", ratingValue: t.rating, bestRating: 5 },
    reviewBody: t.text,
  }));

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: canonical(item.path),
  })),
});

export const localBusinessSchema = (city: City) => ({
  "@type": "ProfessionalService",
  "@id": `${canonical(`/uslugi/${city.slug}`)}#business`,
  name: `${site.brand.name} — ${city.name}`,
  description: city.intro,
  parentOrganization: { "@id": ORG_ID },
  url: canonical(`/uslugi/${city.slug}`),
  telephone: city.phone ?? site.contacts.phone,
  priceRange: site.locale.priceRange,
  image: `${site.url}/opengraph-image`,
  address: postalAddress(city.name),
  geo: {
    "@type": "GeoCoordinates",
    latitude: city.coords.lat,
    longitude: city.coords.lng,
  },
  areaServed: [
    { "@type": "City", name: city.name },
    { "@type": "AdministrativeArea", name: city.region },
    ...city.districts.map((d) => ({ "@type": "Place", name: d })),
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.rating.value,
    reviewCount: site.rating.count,
    bestRating: 5,
  },
});

/** Собирает один @graph — так поисковики связывают сущности между собой. */
export const graph = (nodes: object[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});

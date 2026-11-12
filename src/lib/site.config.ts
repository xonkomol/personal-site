/**
 * Данные, не зависящие от языка: контакты, адрес, цены, координаты.
 * Все тексты — в src/lib/content.ts, по одному словарю на язык.
 */

export const site = {
  /** Домен без слеша на конце. Обязательно поменяйте перед деплоем. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://adjaster.uz",

  brand: {
    name: "Adjaster.uz",
    legalName: "Adjaster.uz",
    tagline: "Tezkor · Ishonchli · Qulay",
    logo: "/logo.png",
    logoAlt: "Adjaster.uz",
  },

  contacts: {
    phoneLabel: "+998 95 078 46 65",
    phone: "+998950784665",
    phone2Label: "+998 78 120 00 07",
    phone2: "+998781200007",
    telegram: "https://t.me/Kamolxon1997",
    telegramLabel: "@Kamolxon1997",
    email: "info@adjaster.uz",
    /** Формат schema.org/openingHours. Работа круглосуточно. */
    hours: ["Mo-Su 00:00-23:59"],
  },

  address: {
    street: "Малая кольцевая дорога, 4/1, блок 4",
    streetUz: "Kichik halqa yo'li, 4/1, 4-blok",
    street2: "ул. Лабзак, 95",
    street2Uz: "Labzak ko'chasi, 95",
    city: "Ташкент",
    cityUz: "Toshkent",
    region: "город Ташкент",
    postalCode: "100000",
    /**
     * ПРИБЛИЗИТЕЛЬНЫЕ координаты: используются в микроразметке LocalBusiness.
     * Точные возьмите в Яндекс Картах — правый клик по метке → «Что здесь?».
     */
    coords: { lat: 41.3111, lng: 69.2797 },
    /**
     * Карта в блоке «Консультация».
     * embedUrl — ссылка из конструктора Яндекс Карт (yandex.uz/map-constructor)
     * либо виджет карточки организации, как сейчас.
     */
    map: {
      embedUrl: "https://yandex.uz/map-widget/v1/org/adjaster_uz/121345169480/?z=16&lang=ru_RU",
      linkUrl: "https://yandex.uz/maps/org/adjaster_uz/121345169480/",
    },
  },

  /** Цены. Тексты к ним — в content.ts. */
  pricing: {
    /** Оформление европротокола на месте ДТП. */
    europrotocol: 880_000,
    /** Независимая оценка ущерба после ДТП. */
    assessment: 660_000,
  },

  /** Предельная выплата по европротоколу в Узбекистане. */
  payoutLimit: 28_000_000,

  /** Среднее время приезда комиссара, в минутах. */
  arrivalMinutes: 30,

  /** Районы: адреса и координаты. Названия и тексты — в content.ts. */
  districts: [
    { slug: "yunusabad", coords: { lat: 41.3663, lng: 69.2866 } },
    { slug: "chilanzar", coords: { lat: 41.2755, lng: 69.2039 } },
    { slug: "mirzo-ulugbek", coords: { lat: 41.3381, lng: 69.3389 } },
    { slug: "yashnabad", coords: { lat: 41.2832, lng: 69.3252 } },
    { slug: "shaykhantakhur", coords: { lat: 41.3261, lng: 69.2278 } },
    { slug: "mirabad", coords: { lat: 41.2865, lng: 69.2787 } },
  ],

  seo: {
    /**
     * Дата последнего существенного изменения контента, формат ГГГГ-ММ-ДД.
     * Уходит в lastmod каждой записи sitemap. Меняйте её, когда правите тексты:
     * если lastmod меняется каждый день без изменений, поисковики перестают ему верить.
     */
    updatedAt: "2026-11-11",

    /** Коды подтверждения в вебмастерах. */
    verification: {
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION ?? "",
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ?? "",
    },

    /** Счётчики. Пусто — не подключаются. */
    analytics: {
      yandexMetrika: process.env.NEXT_PUBLIC_YM_ID ?? "",
      googleTag: process.env.NEXT_PUBLIC_GTAG_ID ?? "",
    },
  },
} as const;

export type Site = typeof site;

export const districtSlugs = site.districts.map((d) => d.slug);

export const getDistrictCoords = (slug: string) =>
  site.districts.find((d) => d.slug === slug)?.coords;

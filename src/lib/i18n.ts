export const locales = ["ru", "uz"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Тег языка для атрибута lang и hreflang. */
export const localeTag: Record<Locale, string> = {
  ru: "ru-UZ",
  uz: "uz-UZ",
};

export const localeName: Record<Locale, string> = {
  ru: "Русский",
  uz: "O'zbekcha",
};

export const localeShort: Record<Locale, string> = {
  ru: "RU",
  uz: "UZ",
};

/** Собирает путь с префиксом языка: localePath("uz", "/rayon/mirabad"). */
export const localePath = (locale: Locale, path = "") =>
  `/${locale}${path === "/" ? "" : path}`;

/** Меняет язык в текущем адресе, сохраняя остальную часть пути. */
export const swapLocale = (pathname: string, next: Locale) => {
  const rest = pathname.replace(/^\/(ru|uz)(?=\/|$)/, "");
  return localePath(next, rest);
};

const currency: Record<Locale, string> = {
  ru: "сум",
  uz: "so'm",
};

export const formatSum = (value: number, locale: Locale) =>
  `${value.toLocaleString("ru-RU").replace(/ /g, " ")} ${currency[locale]}`;

/** «28 млн» / «28 mln» — короткая форма для заголовков. */
export const formatMillions = (value: number, locale: Locale) =>
  `${value / 1_000_000} ${locale === "ru" ? "млн" : "mln"}`;

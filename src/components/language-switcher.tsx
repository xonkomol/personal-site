"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeShort, localeName, swapLocale, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Переключатель языка: сохраняет текущую страницу, меняет только префикс. */
export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className="flex items-center rounded-md border border-border p-0.5">
      {locales.map((l) => (
        <Link
          key={l}
          href={swapLocale(pathname, l)}
          hrefLang={l}
          aria-current={l === locale ? "true" : undefined}
          title={localeName[l]}
          className={cn(
            "rounded px-2 py-1 text-xs font-semibold transition-colors",
            l === locale
              ? "bg-tile text-white"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {localeShort[l]}
        </Link>
      ))}
    </nav>
  );
}

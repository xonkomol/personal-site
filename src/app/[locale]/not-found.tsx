import Link from "next/link";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site.config";
import { getContent } from "@/lib/content";
import { defaultLocale, localePath } from "@/lib/i18n";

/**
 * Язык здесь определить нельзя: notFound() срабатывает вне сегмента [locale].
 * Показываем страницу на языке по умолчанию.
 */
const locale = defaultLocale;

export const metadata = {
  title: getContent(locale).seo.notFoundTitle,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const t = getContent(locale);

  return (
    <section className="py-20 lg:py-28">
      <div className="shell max-w-xl">
        <p className="font-display text-sm font-bold text-tile tnum">404</p>
        <h1 className="display-lg mt-3 text-balance">{t.notFound.title}</h1>
        <p className="mt-5 text-lg text-muted-foreground">{t.notFound.text}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href={localePath(locale)}>{t.notFound.home}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={`${localePath(locale)}#how-to`}>{t.notFound.how}</Link>
          </Button>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          {t.notFound.help}{" "}
          <a
            href={`tel:${site.contacts.phone}`}
            className="text-primary underline underline-offset-4 tnum"
          >
            {site.contacts.phoneLabel}
          </a>
        </p>
      </div>
    </section>
  );
}

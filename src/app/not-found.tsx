import Link from "next/link";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site.config";

export const metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="py-24 lg:py-32">
      <div className="shell max-w-xl">
        <p className="font-display text-sm font-bold text-tile tnum">404</p>
        <h1 className="display-lg mt-3 text-balance">Такой страницы на сайте нет</h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Возможно, адрес изменился. Начните с главной или выберите свой город.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/">На главную</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/#geo">Выбрать город</Link>
          </Button>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Нужна помощь — звоните{" "}
          <a href={`tel:${site.contacts.phone}`} className="text-primary underline underline-offset-4 tnum">
            {site.contacts.phoneLabel}
          </a>
        </p>
      </div>
    </section>
  );
}

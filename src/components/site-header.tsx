"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/language-switcher";
import { site } from "@/lib/site.config";
import { getContent } from "@/lib/content";
import { localePath, type Locale } from "@/lib/i18n";

export function SiteHeader({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const t = getContent(locale);
  const home = localePath(locale);

  const nav = [
    { label: t.nav.advantages, href: `${home}#advantages` },
    { label: t.nav.howTo, href: `${home}#how-to` },
    { label: t.nav.price, href: `${home}#price` },
    { label: t.nav.contacts, href: `${home}#contacts` },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-4 lg:h-20 lg:gap-6">
        <Link href={home} aria-label={t.header.home}>
          <Image
            src={site.brand.logo}
            alt={site.brand.logoAlt}
            width={1000}
            height={260}
            priority
            loading="eager"
            className="h-8 w-auto lg:h-10"
          />
        </Link>

        <nav aria-label={t.header.sections} className="hidden lg:block">
          <ul className="flex items-center gap-6 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} label={t.header.language} />

          <a
            href={`tel:${site.contacts.phone}`}
            className="hidden font-display text-base font-bold tracking-tight tnum xl:block"
          >
            {site.contacts.phoneLabel}
          </a>
          <Button
            asChild
            size="sm"
            className="hidden bg-accent text-accent-foreground hover:bg-accent/90 md:inline-flex"
          >
            <a href={site.contacts.telegram}>
              <Send className="size-4" />
              Telegram
            </a>
          </Button>

          <Button asChild size="icon" variant="outline" className="md:hidden" aria-label={t.header.call}>
            <a href={`tel:${site.contacts.phone}`}>
              <Phone className="size-4" />
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="lg:hidden" aria-label={t.header.openMenu}>
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(20rem,85vw)]">
              <SheetHeader>
                <SheetTitle className="font-display">{site.brand.name}</SheetTitle>
              </SheetHeader>
              <nav aria-label={t.header.siteSections} className="px-4">
                <ul className="flex flex-col gap-1">
                  {nav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-md px-2 py-2.5 text-base hover:bg-secondary"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto flex flex-col gap-3 p-4">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <a href={`tel:${site.contacts.phone}`}>
                    <Phone className="size-4" />
                    {site.contacts.phoneLabel}
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={site.contacts.telegram}>
                    <Send className="size-4" />
                    {t.header.writeTelegram}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

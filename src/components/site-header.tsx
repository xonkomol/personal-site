"use client";

import { useState } from "react";
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
import { StarMark } from "@/components/tilework";
import { site } from "@/lib/site.config";

const nav = [
  { label: "Услуги", href: "/#services" },
  { label: "Как работаем", href: "/#process" },
  { label: "Результаты", href: "/#cases" },
  { label: "Цены", href: "/#pricing" },
  { label: "Города", href: "/#geo" },
  { label: "Вопросы", href: "/#faq" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.brand.name} — на главную`}>
          <StarMark className="size-6 text-tile" />
          <span className="font-display text-base font-bold tracking-tight">{site.brand.name}</span>
        </Link>

        <nav aria-label="Основные разделы" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm">
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
          <a
            href={`tel:${site.contacts.phone}`}
            className="hidden text-sm font-medium tnum md:block"
          >
            {site.contacts.phoneLabel}
          </a>
          <Button asChild size="sm" className="hidden md:inline-flex">
            <a href="#lead">Обсудить задачу</a>
          </Button>

          <Button asChild size="icon" variant="outline" className="md:hidden" aria-label="Позвонить">
            <a href={`tel:${site.contacts.phone}`}>
              <Phone className="size-4" />
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="lg:hidden" aria-label="Открыть меню">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(20rem,85vw)]">
              <SheetHeader>
                <SheetTitle className="font-display">{site.brand.name}</SheetTitle>
              </SheetHeader>
              <nav aria-label="Разделы сайта" className="px-4">
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
                <Button asChild size="lg">
                  <a href={`tel:${site.contacts.phone}`}>
                    <Phone className="size-4" />
                    {site.contacts.phoneLabel}
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={site.contacts.telegram}>
                    <Send className="size-4" />
                    Написать в Telegram
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

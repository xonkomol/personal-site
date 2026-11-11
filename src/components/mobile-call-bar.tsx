import { Phone, Send } from "lucide-react";
import { site } from "@/lib/site.config";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

/** Нижняя панель на телефоне: звонок и Telegram всегда под большим пальцем. */
export function MobileCallBar({ locale }: { locale: Locale }) {
  const t = getContent(locale);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md md:hidden">
      <div className="grid grid-cols-2">
        <a
          href={`tel:${site.contacts.phone}`}
          className="flex items-center justify-center gap-2 py-3.5 text-sm font-medium"
        >
          <Phone className="size-4" />
          {t.header.call}
        </a>
        <a
          href={site.contacts.telegram}
          className="flex items-center justify-center gap-2 border-l border-border bg-primary py-3.5 text-sm font-medium text-primary-foreground"
        >
          <Send className="size-4" />
          Telegram
        </a>
      </div>
    </div>
  );
}

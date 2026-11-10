"use client";

import { useActionState, useId, useState } from "react";
import { Loader2, Lock, Check } from "lucide-react";
import { submitLead, type LeadState } from "@/app/actions/lead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/site.config";
import { cn } from "@/lib/utils";

const initial: LeadState = { status: "idle", message: "" };

/** Приводит ввод к виду +998 90 123 45 67 по мере набора. */
function formatUzPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").replace(/^998/, "").slice(0, 9);
  const parts = [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5, 7), digits.slice(7, 9)];
  return `+998 ${parts.filter(Boolean).join(" ")}`.trimEnd();
}

export function LeadForm({
  source,
  withComment = false,
  className,
  submitLabel = "Получить расчёт",
}: {
  source: string;
  withComment?: boolean;
  className?: string;
  submitLabel?: string;
}) {
  const [state, action, pending] = useActionState(submitLead, initial);
  const [phone, setPhone] = useState("+998 ");
  const uid = useId();

  if (state.status === "ok") {
    return (
      <div
        className={cn(
          "flex flex-col items-start gap-3 rounded-lg border border-accent/40 bg-accent/8 p-6",
          className
        )}
        role="status"
      >
        <span className="flex size-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Check className="size-5" strokeWidth={2.5} />
        </span>
        <p className="display-sm">Заявка у нас</p>
        <p className="text-sm text-muted-foreground">{state.message}</p>
        <p className="text-sm text-muted-foreground">
          Не хотите ждать —{" "}
          <a className="text-primary underline underline-offset-4" href={site.contacts.telegram}>
            напишите в Telegram
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form action={action} className={cn("flex flex-col gap-4", className)} noValidate>
      <input type="hidden" name="source" value={source} />
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${uid}-hp`}>Сайт компании</label>
        <input id={`${uid}-hp`} name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${uid}-name`}>Как вас зовут</Label>
          <Input
            id={`${uid}-name`}
            name="name"
            autoComplete="name"
            placeholder="Дилшод"
            aria-invalid={Boolean(state.fieldErrors?.name)}
            aria-describedby={state.fieldErrors?.name ? `${uid}-name-err` : undefined}
            required
          />
          {state.fieldErrors?.name && (
            <p id={`${uid}-name-err`} className="text-xs text-destructive">
              {state.fieldErrors.name}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor={`${uid}-phone`}>Телефон</Label>
          <Input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(formatUzPhone(e.target.value))}
            aria-invalid={Boolean(state.fieldErrors?.phone)}
            aria-describedby={state.fieldErrors?.phone ? `${uid}-phone-err` : undefined}
            className="tnum"
            required
          />
          {state.fieldErrors?.phone && (
            <p id={`${uid}-phone-err`} className="text-xs text-destructive">
              {state.fieldErrors.phone}
            </p>
          )}
        </div>
      </div>

      {withComment && (
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${uid}-comment`}>Задача в двух словах</Label>
          <Textarea
            id={`${uid}-comment`}
            name="comment"
            rows={3}
            placeholder="Столкновение на Амира Темура, две машины, пострадавших нет."
          />
        </div>
      )}

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Отправляем
          </>
        ) : (
          submitLabel
        )}
      </Button>

      {state.status === "error" && !state.fieldErrors && (
        <p className="text-sm text-destructive" role="alert">
          {state.message}
        </p>
      )}

      <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
        <Lock className="mt-0.5 size-3.5 shrink-0" />
        Перезваниваем круглосуточно. Номер не передаём третьим лицам и не добавляем в рассылки.
      </p>
    </form>
  );
}

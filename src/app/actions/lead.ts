"use server";

import { site } from "@/lib/site.config";

export type LeadState = {
  status: "idle" | "ok" | "error";
  message: string;
  /** Ошибки по полям, чтобы подсветить конкретный ввод. */
  fieldErrors?: Partial<Record<"name" | "phone", string>>;
};

const PHONE = /^\+?998\d{9}$/;

/**
 * Приём заявки. По умолчанию пишет в лог сервера.
 * Задайте TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID — заявки пойдут в Telegram.
 * Для CRM добавьте свой запрос в блок ниже.
 */
export async function submitLead(
  _prev: LeadState,
  formData: FormData
): Promise<LeadState> {
  // Скрытое поле: боты его заполняют, люди — нет.
  if (formData.get("company_website")) {
    return { status: "ok", message: "Заявка отправлена." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const rawPhone = String(formData.get("phone") ?? "").replace(/[\s()-]/g, "");
  const service = String(formData.get("service") ?? "").trim();
  const comment = String(formData.get("comment") ?? "").trim();
  const source = String(formData.get("source") ?? "landing").trim();

  const fieldErrors: LeadState["fieldErrors"] = {};
  if (name.length < 2) fieldErrors.name = "Напишите, как к вам обращаться.";
  if (!PHONE.test(rawPhone)) fieldErrors.phone = "Номер в формате +998 90 123 45 67.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Проверьте два поля ниже.", fieldErrors };
  }

  const lead = { name, phone: rawPhone, service, comment, source, at: new Date().toISOString() };

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  try {
    if (token && chatId) {
      const text = [
        `Заявка с сайта ${site.brand.name}`,
        `Имя: ${name}`,
        `Телефон: ${rawPhone}`,
        service && `Услуга: ${service}`,
        comment && `Комментарий: ${comment}`,
        `Блок: ${source}`,
      ]
        .filter(Boolean)
        .join("\n");

      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
        cache: "no-store",
      });

      if (!res.ok) throw new Error(`Telegram ответил ${res.status}`);
    } else {
      console.info("[lead] Telegram не настроен, заявка только в логе:", lead);
    }

    return {
      status: "ok",
      message: `Заявка принята. Перезвоним в ближайшие минуты.`,
    };
  } catch (error) {
    console.error("[lead] не удалось доставить заявку:", error);
    return {
      status: "error",
      message: `Не получилось отправить. Позвоните нам: ${site.contacts.phoneLabel}`,
    };
  }
}

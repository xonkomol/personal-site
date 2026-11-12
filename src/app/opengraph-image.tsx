import { ImageResponse } from "next/og";
import { site } from "@/lib/site.config";
import { getContent } from "@/lib/content";
import { defaultLocale, formatSum } from "@/lib/i18n";

const t = getContent(defaultLocale);

export const alt = `${site.brand.name} — ${t.offer}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Картинка для соцсетей и мессенджеров: собирается на сервере, без внешних шрифтов. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#081c47",
          padding: "72px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 32 }}>
          <div
            style={{ display: "flex", width: 48, height: 48, borderRadius: 12, background: "#0b7cb0" }}
          />
          <span style={{ fontWeight: 700 }}>{site.brand.name}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            {t.offer}
          </div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.75)" }}>
            {`${t.hoursLabel} · ${formatSum(site.payoutLimit, defaultLocale)}`}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              display: "flex",
              background: "#e8a21c",
              color: "#231501",
              padding: "16px 28px",
              borderRadius: 14,
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            {site.contacts.phoneLabel}
          </div>
          <span style={{ fontSize: 28, color: "rgba(255,255,255,0.7)" }}>
            {site.contacts.telegramLabel}
          </span>
        </div>
      </div>
    ),
    size
  );
}

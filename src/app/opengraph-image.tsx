import { ImageResponse } from "next/og";
import { site, formatSum } from "@/lib/site.config";

export const alt = `${site.brand.name} — ${site.brand.offer}`;
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
          background: "#0b1f33",
          padding: "72px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 32 }}>
          <div
            style={{
              display: "flex",
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#0b7cb0",
            }}
          />
          <span style={{ fontWeight: 700 }}>{site.brand.name}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            {site.brand.offer}
          </div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.75)" }}>
            {`Аварийный комиссар · ${site.contacts.hoursLabel} · выплата до ${formatSum(site.payoutLimit)}`}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              display: "flex",
              background: "#e59216",
              color: "#231201",
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

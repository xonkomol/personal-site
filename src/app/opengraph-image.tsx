import { ImageResponse } from "next/og";
import { site } from "@/lib/site.config";

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
          background: "#0a3457",
          padding: "72px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30 }}>
          <svg width="40" height="40" viewBox="0 0 32 32" fill="#0e8f8b">
            <path d="M16 0 20 9.3 29.6 5.9 26.2 15.5 35.5 19.5 26.2 23.5 29.6 33.1 20 29.7 16 39 12 29.7 2.4 33.1 5.8 23.5 -3.5 19.5 5.8 15.5 2.4 5.9 12 9.3Z" />
          </svg>
          <span style={{ fontWeight: 700 }}>{site.brand.name}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            {site.brand.offer}
          </div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.72)" }}>
            {`${site.address.city} · ${site.locale.countryName} · с ${site.brand.foundedYear} года`}
          </div>
        </div>

        <div style={{ display: "flex", gap: 40, fontSize: 26, color: "rgba(255,255,255,0.8)" }}>
          {site.stats.slice(0, 3).map((s) => (
            <span key={s.label}>{`${s.value} — ${s.label}`}</span>
          ))}
        </div>
      </div>
    ),
    size
  );
}

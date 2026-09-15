import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getDict, type Locale } from "@/content/site";

/**
 * The link preview card (Open Graph / Twitter), one per language.
 *
 * Generated at build time from the site's own copy: the wordmark, the hero
 * headline and its lead. Nothing is written for the card, so it can never
 * drift from the page it points to. Light ground, because the wordmark is a
 * green-on-transparent PNG and stays as shipped.
 */
export const OG_SIZE = { width: 1200, height: 630 } as const;

export async function renderOg(locale: Locale) {
  const t = getDict(locale);
  const [regular, medium, wordmark] = await Promise.all([
    readFile(join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf")),
    readFile(join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-Medium.ttf")),
    readFile(join(process.cwd(), "public/brand/noregna-wordmark.png")),
  ]);
  const mark = `data:image/png;base64,${wordmark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#f7f9f8",
          color: "#0b1f14",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mark} alt="" width={294} height={50} style={{ width: 294, height: 50 }} />
          <div
            style={{
              display: "flex",
              padding: "10px 18px",
              borderRadius: 999,
              border: "2px solid #cfe3d6",
              fontSize: 24,
              color: "#3d5a48",
            }}
          >
            noregna.no
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", fontSize: 64, lineHeight: 1.08, letterSpacing: -1.5, fontWeight: 500 }}>
            {`${t.home.heroTitle} ${t.home.heroTitleAccent}`}
          </div>
          <div style={{ display: "flex", fontSize: 28, lineHeight: 1.4, color: "#3d5a48", maxWidth: 980 }}>
            {t.home.heroLead}
          </div>
        </div>

        <div style={{ display: "flex", height: 10, width: "100%", borderRadius: 999, background: "#0e7a46" }} />
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Geist", data: regular, style: "normal", weight: 400 },
        { name: "Geist", data: medium, style: "normal", weight: 500 },
      ],
    },
  );
}

import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "../globals.css";
import { SiteShell } from "@/components/site/SiteShell";
import { THEME_INIT } from "@/components/site/ThemeToggle";
import { getDict } from "@/content/site";

const t = getDict("no");

export const metadata: Metadata = {
  metadataBase: new URL("https://noregna.no"),
  title: { default: t.meta.titleHome, template: "%s" },
  description: t.meta.descHome,
  applicationName: t.meta.siteName,
  openGraph: {
    type: "website",
    siteName: t.meta.siteName,
    locale: "nb_NO",
    alternateLocale: ["en_GB"],
    title: t.meta.titleHome,
    description: t.meta.descHome,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // Light is the default the site ships in, so the browser chrome matches it.
  themeColor: "#f7f9f8",
};

export default function NorwegianRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body className="bg-bg text-ink antialiased">
        <SiteShell locale="no">{children}</SiteShell>
      </body>
    </html>
  );
}

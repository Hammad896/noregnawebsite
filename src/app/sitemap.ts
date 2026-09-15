import type { MetadataRoute } from "next";

const BASE = "https://noregna.no";

/** Norwegian at the root, English mirrored under /en, cross-linked with hreflang. */
const PAGES = [
  { path: "", priority: 1 },
  { path: "/ourservices", priority: 0.8 },
  { path: "/app", priority: 0.8 },
  { path: "/contact-us", priority: 0.8 },
  { path: "/privacy", priority: 0.3 },
  { path: "/cookies", priority: 0.3 },
  { path: "/kjopsbetingelser", priority: 0.3 },
] as const;

/** Bump when content changes; the legal texts carry their own dates in-page. */
const LAST_MODIFIED = new Date("2026-09-15");

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap(({ path, priority }) => {
    const no = `${BASE}${path || "/"}`;
    const en = `${BASE}/en${path}`;
    const languages = { no, en, "x-default": no };

    return [
      { url: no, lastModified: LAST_MODIFIED, changeFrequency: "monthly" as const, priority, alternates: { languages } },
      { url: en, lastModified: LAST_MODIFIED, changeFrequency: "monthly" as const, priority: Math.max(0.1, priority - 0.1), alternates: { languages } },
    ];
  });
}

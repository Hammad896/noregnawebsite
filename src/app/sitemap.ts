import type { MetadataRoute } from "next";

const BASE = "https://noregna.no";

/** Norwegian at the root, English mirrored under /en, cross-linked with hreflang. */
const PATHS = ["", "/ourservices", "/app", "/contact-us"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-25");

  return PATHS.flatMap((path) => {
    const languages = { no: `${BASE}${path || "/"}`, en: `${BASE}/en${path}` };

    return [
      {
        url: `${BASE}${path || "/"}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: path === "" ? 1 : 0.8,
        alternates: { languages },
      },
      {
        url: `${BASE}/en${path}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: path === "" ? 0.9 : 0.7,
        alternates: { languages },
      },
    ];
  });
}

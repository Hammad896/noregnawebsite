import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict } from "@/content/site";

/**
 * Catch-all for unknown Norwegian URLs. The site has two root layouts (one per
 * language), and an address that matches neither tree would otherwise fall
 * through to Next's unstyled default 404. Matching it here hands it to this
 * tree's not-found.tsx, in Norwegian, with the site's own chrome.
 */
export const metadata: Metadata = {
  title: `${getDict("no").notFound.title} - Noregna`,
  robots: { index: false, follow: false },
};

export default function CatchAll() {
  notFound();
}

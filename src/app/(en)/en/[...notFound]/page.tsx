import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict } from "@/content/site";

/** Catch-all for unknown English URLs; see the Norwegian twin for why. */
export const metadata: Metadata = {
  title: `${getDict("en").notFound.title} - Noregna`,
  robots: { index: false, follow: false },
};

export default function CatchAll() {
  notFound();
}

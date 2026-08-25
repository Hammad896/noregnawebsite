import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { getDict } from "@/content/site";

const t = getDict("en");

export const metadata: Metadata = {
  title: t.meta.titleHome,
  description: t.meta.descHome,
  alternates: { canonical: "/en", languages: { no: "/", en: "/en" } },
};

export default function Page() {
  return <HomePage locale="en" />;
}

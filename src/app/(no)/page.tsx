import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { getDict } from "@/content/site";

const t = getDict("no");

export const metadata: Metadata = {
  title: t.meta.titleHome,
  description: t.meta.descHome,
  alternates: { canonical: "/", languages: { no: "/", en: "/en" } },
};

export default function Page() {
  return <HomePage locale="no" />;
}

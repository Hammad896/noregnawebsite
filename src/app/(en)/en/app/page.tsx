import type { Metadata } from "next";
import { AppPage } from "@/components/pages/AppPage";
import { getDict } from "@/content/site";

const t = getDict("en");

export const metadata: Metadata = {
  title: t.meta.titleApp,
  description: t.meta.descApp,
  alternates: {
    canonical: "/en/app",
    languages: { no: "/app", en: "/en/app" },
  },
};

export default function Page() {
  return <AppPage locale="en" />;
}

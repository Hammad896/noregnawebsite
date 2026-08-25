import type { Metadata } from "next";
import { ServicesPage } from "@/components/pages/ServicesPage";
import { getDict } from "@/content/site";

const t = getDict("en");

export const metadata: Metadata = {
  title: t.meta.titleServices,
  description: t.meta.descServices,
  alternates: {
    canonical: "/en/ourservices",
    languages: { no: "/ourservices", en: "/en/ourservices" },
  },
};

export default function Page() {
  return <ServicesPage locale="en" />;
}

import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";
import { getDict } from "@/content/site";

const t = getDict("en");

export const metadata: Metadata = {
  title: t.meta.titleContact,
  description: t.meta.descContact,
  alternates: {
    canonical: "/en/contact-us",
    languages: { no: "/contact-us", en: "/en/contact-us" },
  },
};

export default function Page() {
  return <ContactPage locale="en" />;
}

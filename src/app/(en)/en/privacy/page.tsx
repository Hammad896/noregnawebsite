import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { LegalPage } from "@/components/pages/LegalPage";
import { getDict } from "@/content/site";

const t = getDict("en");
const html = readFileSync(join(process.cwd(), "src/content/legal/privacy-en.html"), "utf8");

export const metadata: Metadata = {
  title: `${t.footer.privacy} - Noregna`,
  description: "Privacy policy for noregna.no: how Noregna AS processes personal data, and the rights you have.",
  alternates: { canonical: "/en/privacy", languages: { no: "/privacy", en: "/en/privacy" } },
};

export default function Page() {
  return <LegalPage locale="en" doc="privacy" html={html} />;
}

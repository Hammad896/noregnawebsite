import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { LegalPage } from "@/components/pages/LegalPage";
import { getDict } from "@/content/site";

const t = getDict("en");
const html = readFileSync(join(process.cwd(), "src/content/legal/terms-no.html"), "utf8");

export const metadata: Metadata = {
  title: `${t.footer.terms} - Noregna`,
  description: "Terms of purchase and delivery for the services of Noregna AS.",
  alternates: { canonical: "/en/kjopsbetingelser", languages: { no: "/kjopsbetingelser", en: "/en/kjopsbetingelser" } },
};

export default function Page() {
  return <LegalPage locale="en" doc="terms" html={html} notice="These terms of purchase are available in Norwegian only. The Norwegian text is the binding version. Contact support@noregna.no if you need them explained in English." />;
}

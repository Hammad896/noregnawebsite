import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { LegalPage } from "@/components/pages/LegalPage";
import { getDict } from "@/content/site";

const t = getDict("no");
const html = readFileSync(join(process.cwd(), "src/content/legal/privacy-no.html"), "utf8");

export const metadata: Metadata = {
  title: `${t.footer.privacy} - Noregna`,
  description: "Personvernerklæring for noregna.no: hvordan Noregna AS behandler personopplysninger, og hvilke rettigheter du har.",
  alternates: { canonical: "/privacy", languages: { no: "/privacy", en: "/en/privacy" } },
};

export default function Page() {
  return <LegalPage locale="no" doc="privacy" html={html} />;
}

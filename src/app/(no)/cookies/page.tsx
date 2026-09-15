import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { LegalPage } from "@/components/pages/LegalPage";
import { getDict } from "@/content/site";

const t = getDict("no");
const html = readFileSync(join(process.cwd(), "src/content/legal/cookies-no.html"), "utf8");

export const metadata: Metadata = {
  title: `${t.footer.cookies} - Noregna`,
  description: "Informasjonskapsler på noregna.no: hvilke som settes, hva de gjør, og hvor lenge de varer.",
  alternates: { canonical: "/cookies", languages: { no: "/cookies", en: "/en/cookies" } },
};

export default function Page() {
  return <LegalPage locale="no" doc="cookies" html={html} />;
}

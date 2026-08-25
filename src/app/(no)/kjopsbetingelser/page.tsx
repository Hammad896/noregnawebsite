import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { LegalPage } from "@/components/pages/LegalPage";
import { getDict } from "@/content/site";

const t = getDict("no");
const html = readFileSync(join(process.cwd(), "src/content/legal/terms-no.html"), "utf8");

export const metadata: Metadata = {
  title: `${t.footer.terms} - Noregna`,
  alternates: { canonical: "/kjopsbetingelser" },
};

export default function Page() {
  return <LegalPage locale="no" doc="terms" html={html} />;
}

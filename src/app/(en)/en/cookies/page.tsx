import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { LegalPage } from "@/components/pages/LegalPage";
import { getDict } from "@/content/site";

const t = getDict("en");
const html = readFileSync(join(process.cwd(), "src/content/legal/cookies-en.html"), "utf8");

export const metadata: Metadata = {
  title: `${t.footer.cookies} - Noregna`,
  alternates: { canonical: "/en/cookies" },
};

export default function Page() {
  return <LegalPage locale="en" doc="cookies" html={html} />;
}

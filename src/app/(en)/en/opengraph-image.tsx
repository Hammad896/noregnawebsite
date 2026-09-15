import { getDict } from "@/content/site";
import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = getDict("en").meta.titleHome;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg("en");
}

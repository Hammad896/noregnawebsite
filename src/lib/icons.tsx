import type { ComponentType } from "react";
import {
  ArrowRight,
  ArrowsClockwise,
  ArrowUpRight,
  Buildings,
  CalendarCheck,
  CaretDown,
  ChartLineUp,
  ChatsCircle,
  Check,
  ClipboardText,
  DeviceMobile,
  EnvelopeSimple,
  Files,
  Fingerprint,
  FlowArrow,
  List,
  ListChecks,
  LockKey,
  MapPin,
  Receipt,
  SealCheck,
  ShareNetwork,
  Signature,
  SquaresFour,
  Tag,
  UploadSimple,
  X,
} from "@phosphor-icons/react/dist/ssr";

/**
 * One icon family for the whole site (Phosphor), one weight, one size scale.
 * Content files reference icons by key so they stay plain serialisable data.
 */
export type IconKey =
  | "overview"
  | "quality"
  | "kyc"
  | "report"
  | "chat"
  | "sign"
  | "price"
  | "progress"
  | "portal"
  | "share"
  | "tasks"
  | "invoice"
  | "sync"
  | "files"
  | "settle"
  | "upload"
  | "flag"
  | "deadline"
  | "check"
  | "arrowRight"
  | "arrowUpRight"
  | "mail"
  | "mapPin"
  | "building"
  | "caretDown"
  | "menu"
  | "close";

type PhosphorLike = ComponentType<{
  size?: number | string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  className?: string;
  "aria-hidden"?: boolean;
}>;

const MAP: Record<IconKey, PhosphorLike> = {
  overview: SquaresFour,
  quality: SealCheck,
  kyc: Fingerprint,
  report: ChartLineUp,
  chat: ChatsCircle,
  sign: Signature,
  price: Tag,
  progress: FlowArrow,
  portal: DeviceMobile,
  share: ShareNetwork,
  tasks: ListChecks,
  invoice: Receipt,
  sync: ArrowsClockwise,
  files: Files,
  settle: ClipboardText,
  upload: UploadSimple,
  flag: LockKey,
  deadline: CalendarCheck,
  check: Check,
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  mail: EnvelopeSimple,
  mapPin: MapPin,
  building: Buildings,
  caretDown: CaretDown,
  menu: List,
  close: X,
};

export function Icon({
  name,
  size = 20,
  weight = "regular",
  className,
}: {
  name: IconKey | string;
  size?: number;
  weight?: "regular" | "bold" | "fill" | "duotone";
  className?: string;
}) {
  const Cmp = MAP[name as IconKey] ?? SquaresFour;
  return <Cmp size={size} weight={weight} className={className} aria-hidden />;
}

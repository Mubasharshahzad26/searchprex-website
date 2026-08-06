// components/layout/CtaButton.tsx
// One button component for the whole site. Replaces ~40 hand-rolled Link/anchor
// styles that disagreed on radius, padding, weight and hover behaviour.

import Link from "next/link";
import { color, focusRing, radius } from "@/lib/design-tokens";

export type CtaVariant = "primary" | "secondary" | "onDark";

export interface CtaButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: CtaVariant;
  /** Trailing icon — an arrow, phone glyph, etc. */
  icon?: React.ReactNode;
  /** Slightly reduced padding for in-card CTAs. */
  compact?: boolean;
  className?: string;
}

const base = (compact: boolean) =>
  `inline-flex w-fit items-center gap-2 ${radius.control} ${
    compact ? "px-5 py-3" : "px-7 py-3.5"
  } text-sm font-semibold transition-all ${focusRing}`;

export default function CtaButton({
  href,
  children,
  variant = "primary",
  icon,
  compact = false,
  className = "",
}: CtaButtonProps) {
  const styles: Record<CtaVariant, { className: string; style?: React.CSSProperties }> = {
    // Kept as Tailwind classes rather than a style prop so the hover state can
    // actually change the background — inline styles have no hover variant.
    primary: {
      className: "bg-[#534AB7] text-white hover:-translate-y-0.5 hover:bg-[#3C3489]",
    },
    secondary: {
      className: "border hover:bg-[#f8f9fc]",
      style: { borderColor: color.borderStrong, color: color.ink },
    },
    onDark: {
      className: "border border-white/20 text-white hover:bg-white/10",
    },
  };

  const { className: variantClass, style } = styles[variant];
  const content = (
    <>
      {children}
      {icon}
    </>
  );

  // tel: and mailto: links must stay plain anchors — next/link would try to
  // treat them as internal routes.
  const isExternal = href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http");

  if (isExternal) {
    return (
      <a href={href} className={`${base(compact)} ${variantClass} ${className}`} style={style}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base(compact)} ${variantClass} ${className}`} style={style}>
      {content}
    </Link>
  );
}

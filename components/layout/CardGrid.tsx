// components/layout/CardGrid.tsx
// The two card layouts the site is allowed to use, and the rule for choosing:
//
//   hairline — dense informational tiles that are NOT clickable (deliverables,
//              process steps, "what's included"). Flush grid, 1px dividers.
//   cards    — separate, elevated, clickable cards (tools, blog posts, plans).
//
// Mixing these arbitrarily is what made /services, /tools and /pricing read as
// three different sites.

import { color, heading, radius, text } from "@/lib/design-tokens";

export type CardGridVariant = "hairline" | "cards";

export interface CardGridProps {
  children: React.ReactNode;
  variant?: CardGridVariant;
  /** Columns at the lg breakpoint. Always 1 on mobile, 2 on sm. */
  columns?: 2 | 3 | 4;
  className?: string;
}

const columnClass: Record<2 | 3 | 4, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export default function CardGrid({
  children,
  variant = "hairline",
  columns = 3,
  className = "",
}: CardGridProps) {
  if (variant === "hairline") {
    // The 1px gap plus a border-coloured background is what draws the dividers,
    // and the overflow-hidden + radius keeps the outer corners consistent with
    // every other panel on the site.
    return (
      <div
        className={`grid gap-px overflow-hidden ${radius.card} border ${columnClass[columns]} ${className}`}
        style={{ background: color.border, borderColor: color.border }}
      >
        {children}
      </div>
    );
  }

  return <div className={`grid gap-6 ${columnClass[columns]} ${className}`}>{children}</div>;
}

export interface FeatureCardProps {
  title: string;
  body: React.ReactNode;
  /** Small uppercase label above the title. */
  label?: string;
  /** Large numeral for process steps. */
  step?: string;
  /** Icon rendered above the title. */
  icon?: React.ReactNode;
  variant?: CardGridVariant;
  /** Heading level — must stay below the section's own heading. */
  as?: "h3" | "h4";
}

export function FeatureCard({
  title,
  body,
  label,
  step,
  icon,
  variant = "hairline",
  as: Tag = "h3",
}: FeatureCardProps) {
  const shell =
    variant === "hairline"
      ? "bg-white p-7"
      : `${radius.card} border bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-xl`;

  return (
    <div className={shell} style={variant === "cards" ? { borderColor: color.border } : undefined}>
      {step ? (
        <div className="mb-4 text-4xl font-bold tracking-tight" style={{ color: color.primary }}>
          {step}
        </div>
      ) : null}
      {icon ? <div className="mb-4">{icon}</div> : null}
      {label ? (
        <div
          className={`${heading.eyebrow} mb-2`}
          style={{ color: step ? color.muted : color.primary }}
        >
          {label}
        </div>
      ) : null}
      <Tag className={`${heading.h4} mb-2`} style={{ color: color.ink }}>
        {title}
      </Tag>
      <p className={text.small} style={{ color: color.muted }}>
        {body}
      </p>
    </div>
  );
}

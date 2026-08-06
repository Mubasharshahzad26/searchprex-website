// components/layout/Breadcrumb.tsx
// Visible breadcrumb trail. Pair it with BreadcrumbList JSON-LD on the page —
// Google wants both the markup and a real on-page trail, and the visible one is
// what actually helps a visitor who landed deep from search.
//
// The current page is marked aria-current and is not a link, so assistive tech
// announces position without offering a pointless self-link.

import Link from "next/link";
import { color, layout, text } from "@/lib/design-tokens";

export interface Crumb {
  label: string;
  /** Omit on the final crumb — the page you're already on. */
  href?: string;
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className={`${layout.container} pt-24`}>
      <ol className={`flex flex-wrap items-center gap-2 ${text.caption}`} style={{ color: color.muted }}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="transition-colors hover:text-[#534AB7]">
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold" style={{ color: color.ink }} aria-current="page">
                  {item.label}
                </span>
              )}
              {!isLast ? <span aria-hidden>›</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

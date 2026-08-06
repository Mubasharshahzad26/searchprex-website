// components/layout/FaqList.tsx
// The site's only FAQ component. A Server Component built on <details>/<summary>.
//
// This replaced a client-side accordion for three reasons:
//
//   1. Crawlability. The old version unmounted collapsed answers, so crawlers
//      that don't execute JS — GPTBot, PerplexityBot, ClaudeBot — saw the
//      questions and none of the answers. <details> keeps every answer in the
//      served HTML. That matters here: FAQ blocks are the AEO surface.
//   2. Zero JS. /services is deliberately a Server Component; importing a
//      client accordion would have shipped a bundle to a page that needs none.
//   3. Native semantics. <summary> is focusable, keyboard-operable and
//      announces expanded/collapsed state without any aria wiring to get wrong.
//
// The `name` attribute makes the group behave as an exclusive accordion (opening
// one closes the others) with no JavaScript. Browsers without support simply
// allow several open at once, which is a fine degradation.

import { ChevronDown } from "lucide-react";
import { color, radius, text } from "@/lib/design-tokens";

export interface Faq {
  q: string;
  a: string;
}

export interface FaqListProps {
  faqs: Faq[];
  /**
   * Groups the items into one exclusive accordion. Must be unique per page if a
   * page ever renders two separate FAQ blocks.
   */
  name?: string;
  /** Index open on first paint — usually 0, or null to start fully collapsed. */
  defaultOpen?: number | null;
}

export default function FaqList({ faqs, name = "faq", defaultOpen = 0 }: FaqListProps) {
  return (
    <div className="border-t" style={{ borderColor: color.border }}>
      {faqs.map((f, i) => (
        <details
          key={f.q}
          name={name}
          open={i === defaultOpen}
          className="group border-b"
          style={{ borderColor: color.border }}
        >
          <summary
            // list-none covers Firefox/Chrome; the webkit pseudo-element is what
            // actually hides the disclosure triangle in Safari.
            className={`flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-base font-semibold [&::-webkit-details-marker]:hidden ${radius.chip} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#534AB7] focus-visible:ring-offset-2`}
            style={{ color: color.ink }}
          >
            {f.q}
            <ChevronDown
              className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
              style={{ color: color.muted }}
              aria-hidden
            />
          </summary>
          <p className={`${text.small} pb-5 pr-10`} style={{ color: color.muted }}>
            {f.a}
          </p>
        </details>
      ))}
    </div>
  );
}

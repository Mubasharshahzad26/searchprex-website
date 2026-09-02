// components/FreeResources.tsx
// The authority band, placed AFTER the primary CTA on the home page.
//
// Why it sits where it sits: everything above LeadWizard exists to move a
// visitor to the one offer in lib/offer.ts. A resource block above that point
// would compete with it — which is exactly the five-competing-CTAs problem the
// offer module was written to end. Placed below it, this catches the visitor
// who scrolled past the offer and was not ready, instead of diverting the one
// who was.
//
// Three rules this section must keep:
//   1. Nothing here is gated. No form, no email wall. A gated PDF cannot be read
//      by Google or by the AI engines, which is the entire reason to publish it.
//   2. Never borrows the offer's verbs. No "Get my", no "Free audit" — those
//      belong to OFFER_CTA and nothing else on the page may wear them.
//   3. Every card is live. A grid with two real cards and a "coming soon" tile
//      is worse than a grid with two real cards.

import Link from "next/link";
import { ListChecks, Gauge, Newspaper, ArrowRight, type LucideIcon } from "lucide-react";
import { color, heading, radius, text, focusRing } from "@/lib/design-tokens";
import { TOTAL_CHECKS } from "@/lib/law-firm-checklist";

type Resource = {
  href: string;
  icon: LucideIcon;
  kind: string;
  title: string;
  desc: string;
  action: string;
};

const RESOURCES: Resource[] = [
  {
    href: "/resources/law-firm-seo-audit-checklist",
    icon: ListChecks,
    kind: "Checklist",
    title: `The ${TOTAL_CHECKS}-point law firm SEO audit`,
    desc:
      "The checks I run on a law firm's site — Map Pack, organic, AI visibility, legal E-E-A-T and practice-area content. Tick them off in the browser or print it.",
    action: "Open the checklist",
  },
  {
    href: "/law-firm-scorecard",
    icon: Gauge,
    kind: "Free tool",
    title: "Score your firm on the same five pillars",
    desc:
      "The automated version of the checklist. Enter your site, city and practice area and get the five pillar scores with the fixes ranked by impact.",
    action: "Run the scorecard",
  },
  {
    href: "/resources/news",
    icon: Newspaper,
    kind: "Updated weekly",
    title: "What actually changed in search this week",
    desc:
      "Core updates, algorithm shifts and AI-search changes in plain English — with the source for every claim, so you can check it yourself.",
    action: "Read the latest",
  },
];

export default function FreeResources() {
  return (
    <section className="bg-white py-20" id="free-resources" aria-labelledby="free-resources-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span
            className={`${heading.eyebrow} mb-4 inline-block`}
            style={{ color: color.primary }}
          >
            Free · No email required
          </span>
          <h2
            id="free-resources-heading"
            className={heading.h2}
            style={{ color: color.ink }}
          >
            Take the work with you
          </h2>
          <p
            className={`${text.lead} mx-auto mt-4 max-w-2xl`}
            style={{ color: color.muted }}
          >
            Everything below is open — no form, no download wall, no drip sequence. If you would
            rather run this yourself than hire anyone, these are the tools to do it with.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {RESOURCES.map((r) => {
            const Icon = r.icon;
            return (
              <Link
                key={r.href}
                href={r.href}
                className={`group flex h-full flex-col ${radius.card} border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl ${focusRing}`}
                style={{ borderColor: color.border }}
              >
                <div className="mb-5 flex items-center justify-between">
                  <span
                    className={`flex h-11 w-11 items-center justify-center ${radius.chip}`}
                    style={{ background: color.primarySoft }}
                  >
                    <Icon className="h-5 w-5" style={{ color: color.primary }} aria-hidden />
                  </span>
                  <span
                    className={`${heading.eyebrow} rounded-full px-2.5 py-1`}
                    style={{ background: color.surface, color: color.subtle }}
                  >
                    {r.kind}
                  </span>
                </div>

                <h3 className={`${heading.h4} mb-2`} style={{ color: color.ink }}>
                  {r.title}
                </h3>
                <p className={`${text.small} mb-6`} style={{ color: color.muted }}>
                  {r.desc}
                </p>

                <span
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
                  style={{ color: color.primary }}
                >
                  {r.action}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>

        <p className={`${text.small} mt-10 text-center`} style={{ color: color.subtle }}>
          More guides and white papers land in{" "}
          <Link
            href="/resources"
            className="font-semibold underline underline-offset-2"
            style={{ color: color.primary }}
          >
            the resource library
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

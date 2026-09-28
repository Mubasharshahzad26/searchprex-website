// components/WhySearchPrex.tsx
//
// The standard "Why SearchPrex" block for service, industry and city pages.
// Six reasons, each one already stated and backed elsewhere on the site —
// nothing here is new: the founder does the work (home page), figures have a
// screenshot behind them (case studies), one client per city (home and law
// pages), published prices (lib/pricing.ts), the 24-hour tear-down, the
// Monday report (the service pages' process sections) and the 90-day progress
// guarantee (/why-us and the terms; confirmed by the founder, Sept 2026).
//
// The guarantee is worded as "keep working at no extra cost" — the part the
// founder confirmed. It is never a ranking guarantee.

import Link from "next/link";
import { CalendarCheck, FileSearch, MapPinned, ReceiptText, ScanEye, UserRound, Wrench } from "lucide-react";
import { CardGrid, FeatureCard, Section, SectionHeading } from "@/components/layout";
import { RETAINER_PLANS, formatRange } from "@/lib/pricing";

export type WhyVariant = "local" | "law" | "ecommerce" | "technical";

const PLAN_NICHE: Record<WhyVariant, string | undefined> = {
  local: "Local SEO",
  law: "Law Firm SEO",
  ecommerce: "Ecommerce SEO",
  technical: undefined,
};

const icon = (I: typeof UserRound) => <I className="h-5 w-5" style={{ color: "#534AB7" }} aria-hidden />;

export default function WhySearchPrex({
  variant,
  service,
  tone = "surface",
}: {
  variant: WhyVariant;
  /** Names the service in the heading, e.g. "HVAC SEO" or "law firm SEO in Detroit". */
  service: string;
  tone?: "surface" | "white";
}) {
  const plan = RETAINER_PLANS.find((p) => p.niche === PLAN_NICHE[variant]);
  const local = variant === "local" || variant === "law";

  const reasons = [
    {
      i: UserRound,
      title: "The founder does the work",
      body: "Mubashar Sharif runs every audit, writes every plan and sends every report. No sales team, no account managers, no juniors learning on your site.",
    },
    {
      i: ScanEye,
      title: "Results you can check",
      body: (
        <>
          Every figure on this site has a screenshot from the client&apos;s own Search Console, Business Profile or store
          dashboard behind it.{" "}
          <Link href="/case-studies" className="font-semibold text-[#534AB7] underline underline-offset-2">
            See the case studies
          </Link>
          .
        </>
      ),
    },
    local
      ? {
          i: MapPinned,
          title: "One client per city",
          body:
            variant === "law"
              ? "One firm per practice area in a city, so I am never working for the firm you are trying to outrank."
              : "One business per trade in a city, so I am never working for the competitor you are trying to outrank.",
        }
      : {
          i: Wrench,
          title: "Fixes, not just a report",
          body: "The work is the changes themselves — templates, redirects, schema, product and collection copy — not a PDF of problems for someone else to fix.",
        },
    {
      i: ReceiptText,
      title: plan ? "Published prices, month to month" : "Quoted after the audit, month to month",
      body: plan ? (
        <>
          {plan.niche} runs {formatRange(plan)} a month, depending on scope. No long-term contract.{" "}
          <Link href="/pricing" className="font-semibold text-[#534AB7] underline underline-offset-2">
            Full pricing
          </Link>
          .
        </>
      ) : (
        "Technical work depends on what your Search Console shows, so the price comes after the free audit. No long-term contract."
      ),
    },
    {
      i: FileSearch,
      title: "A free tear-down first",
      body: "Send your URL and get a written look at what is holding you back within 24 hours, before you pay anything or sign anything.",
    },
    {
      i: CalendarCheck,
      title: "A 90-day progress guarantee",
      body: "Nobody can honestly guarantee a Google position. What I guarantee is progress: if you don't see measurable progress within 90 days, I keep working at no extra cost until you do. You see where things stand in a report every Monday.",
    },
  ];

  return (
    <Section tone={tone === "surface" ? "surface" : undefined}>
      <SectionHeading
        eyebrow="Why SearchPrex"
        title={`Why choose SearchPrex for ${service}`}
        intro="A small, founder-led agency. Here is what that means in practice."
      />
      <CardGrid columns={3}>
        {reasons.map((r) => (
          <FeatureCard key={r.title} icon={icon(r.i)} title={r.title} body={r.body} />
        ))}
      </CardGrid>
    </Section>
  );
}

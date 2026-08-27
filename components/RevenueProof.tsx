// components/RevenueProof.tsx
// The money, first. Sits directly under the client logos.
//
// WHY THIS IS THE TOP SLOT. The page previously opened its proof with
// "+285% pages indexed". That is a mechanism, not an outcome — a sentence
// written for an SEO, not for the business owner signing the invoice. Indexed
// pages are how the revenue moved; they are not the reason anyone buys. The
// technical figures now sit immediately below this, where they answer a
// question the reader is already asking.
//
// WHY SMK AND NOT MICHIGAN OUTDOOR SPORTS. MSO's revenue recovery is real and
// it is documented, but it runs $0.00 -> $311.05. As a headline number, in
// front of someone weighing a $1,500-4,000/month retainer, it argues against
// us. MSO's zero-to-restart story keeps its place in RecoveryStory where the
// context makes it land. This slot goes to the strongest honest number.
//
// SCOPE OF THE CLAIM. $5,832.02 -> $19,100.71 is TOTAL monthly store revenue.
// The WooCommerce dashboard does not segment by country, so this must never be
// described as a US revenue figure — an earlier version of this site claimed
// "+75% US revenue" and no export supported it.

import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import ProofImage from "@/components/ProofImage";
import { color, radius } from "@/lib/design-tokens";
import { OFFER_HREF, OFFER_CTA, OFFER_MICROCOPY } from "@/lib/offer";

const metrics = [
  { v: "+227%", l: "Monthly store revenue", d: "$5,832.02 → $19,100.71" },
  { v: "+50%", l: "Top-seller units", d: "200 → 300 units in the month" },
  { v: "+89%", l: "Orders in the queue", d: "9 → 17 awaiting processing" },
];

export default function RevenueProof() {
  return (
    <section
      id="revenue-proof"
      className="border-b py-16 sm:py-20"
      style={{ background: color.white, borderColor: color.border }}
      aria-labelledby="revenue-proof-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p
            className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
            style={{ color: color.successDark }}
          >
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            SMK Store · April to June 2026
          </p>
          <h2
            id="revenue-proof-heading"
            className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl"
            style={{ color: color.ink }}
          >
            $5,832 to $19,100 a month, in two months.
          </h2>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: color.muted }}>
            One 35,000-product store, one reporting period, one source — the client&apos;s own
            WooCommerce dashboard. Not a highlight reel, and not a projection.
          </p>
        </div>

        {/* Figures as a rule-separated table, not cards. Static, tabular. */}
        <dl
          className="mt-10 grid grid-cols-1 gap-px border sm:grid-cols-3"
          style={{ background: color.border, borderColor: color.border }}
        >
          {metrics.map((m) => (
            <div key={m.l} className="px-6 py-6" style={{ background: color.white }}>
              <dd
                className="text-4xl font-black leading-none tracking-tight tabular-nums sm:text-5xl"
                style={{ color: color.successDark }}
              >
                {m.v}
              </dd>
              <dt className="mt-3 text-sm font-bold" style={{ color: color.ink }}>
                {m.l}
              </dt>
              <p className="mt-0.5 text-xs tabular-nums" style={{ color: color.muted }}>
                {m.d}
              </p>
            </div>
          ))}
        </dl>

        {/* The two dashboards the figures come from */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <ProofImage
            src="/images/proof/smk-revenue-before.png"
            alt="SMK Store WooCommerce dashboard for April 2026, showing $5,832.02 net sales for the month, top seller at 200 units and 9 orders awaiting processing."
            width={1366}
            height={607}
            stage="Before · April 2026"
            stageTone="#8a5b08"
            caption="$5,832.02 net sales"
            note="Top seller at 200 units · 9 orders awaiting processing"
            sizes="(max-width: 1024px) 100vw, 560px"
            eager
          />
          <ProofImage
            src="/images/proof/smk-revenue-after.png"
            alt="SMK Store WooCommerce dashboard for June 2026, showing $19,100.71 net sales for the month, top seller at 300 units and 17 orders awaiting processing."
            width={863}
            height={350}
            stage="After · June 2026"
            stageTone="#196b4d"
            caption="$19,100.71 net sales"
            note="Top seller at 300 units · 17 orders awaiting processing"
            sizes="(max-width: 1024px) 100vw, 560px"
            eager
          />
        </div>

        <div
          className="mt-10 flex flex-col items-start gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: color.border }}
        >
          <div className="max-w-xl">
            <p className="text-sm leading-relaxed" style={{ color: color.muted }}>
              Both captures are from the client&apos;s own dashboard, published with their
              permission and cropped only to remove unrelated inventory rows. Click either to
              read it full size. This is total store revenue — the dashboard does not split by
              country, so it is not quoted as a US figure.
            </p>
            <Link
              href="/case-studies/ecommerce/smk-store"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold"
              style={{ color: color.primary }}
            >
              How it was done <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex flex-col items-start gap-2 sm:items-end">
            <Link
              href={OFFER_HREF}
              className={`inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 ${radius.control}`}
              style={{ background: color.primary }}
            >
              {OFFER_CTA} <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="text-xs" style={{ color: color.muted }}>
              {OFFER_MICROCOPY}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

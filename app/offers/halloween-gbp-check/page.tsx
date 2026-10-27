// /offers/halloween-gbp-check — the Halloween 2026 landing page. Linked from
// the corner card, the local SEO offer cards and off-site posts. Rendered per
// request so it can redirect to /free-audit the moment the offer ends.

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Check } from "lucide-react";
import HalloweenGbpCheckForm from "@/components/offers/HalloweenGbpCheckForm";
import { FRIGHT_CHECK_ITEMS, isHalloweenOfferLive } from "@/lib/halloween-offer";
import { RETAINER_PLANS, formatRange } from "@/lib/pricing";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Free Google Business Profile Fright Check (Halloween)",
  description:
    "Halloween offer, until October 31: the founder checks seven things that hold a Google Business Profile back and emails you what to fix within 24 hours.",
  alternates: { canonical: "https://www.searchprex.com/offers/halloween-gbp-check" },
  // A seasonal page that redirects after 31 October: useful for visitors,
  // not worth indexing.
  robots: { index: false, follow: true },
};

export default function HalloweenGbpCheckPage() {
  if (!isHalloweenOfferLive()) redirect("/free-audit");
  const local = RETAINER_PLANS.find((p) => p.niche === "Local SEO");

  return (
    <main className="bg-white pt-28 pb-20 sm:pt-32">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-orange-700">
            <span aria-hidden="true">🎃 </span>Halloween offer · until October 31
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-neutral-950 sm:text-4xl">
            Free Google Business Profile Fright Check
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            For US local businesses: tell me which business to look at, and I&apos;ll go through your Google Business
            Profile myself and email you a short report within 24 hours, covering what is costing you calls and what to
            fix first. It is free, and there is nothing to sign.
          </p>

          <h2 className="mt-9 text-lg font-black text-neutral-950">What I check</h2>
          <ul className="mt-4 space-y-4">
            {FRIGHT_CHECK_ITEMS.map((item) => (
              <li key={item.title} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-neutral-900" aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold text-neutral-950">{item.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-slate-600">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>

          <h2 className="mt-9 text-lg font-black text-neutral-950">What happens next</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            You get the report and can fix everything yourself. If you would rather have it done for you, local SEO
            plans run {local ? formatRange(local) : "from $800"} a month, month to month, with a 7-day free trial. Either
            way, the check is yours to keep.
          </p>
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-neutral-900 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-base font-black text-neutral-950">Request your Fright Check</p>
            <p className="mt-1 mb-4 text-xs text-slate-600">Reviewed by Mubashar Sharif, founder of SearchPrex.</p>
            <HalloweenGbpCheckForm />
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

// Inline Halloween offer for local SEO pages: the Local SEO News hub and its
// articles, and /services/local-seo. Renders on the server while the offer is
// live, then hides itself in the browser once OFFER_END has passed, so a
// cached page can't keep advertising an ended offer.

import { useEffect, useState } from "react";
import HalloweenGbpCheckForm from "./HalloweenGbpCheckForm";
import { isHalloweenOfferLive, HALLOWEEN_OFFER_PATH } from "@/lib/halloween-offer";

export default function HalloweenOfferCard({ className = "", inline = false }: { className?: string; inline?: boolean }) {
  // Starts true so server and browser render the same markup; the server
  // only mounts this while the offer is live, and the effect hides it on a
  // cached page viewed after the end date.
  const [live, setLive] = useState(true);
  useEffect(() => setLive(isHalloweenOfferLive()), []);
  if (!live) return null;

  return (
    <section
      aria-labelledby="halloween-offer-title"
      className={inline ? `mb-8 ${className}` : `mx-auto w-full max-w-5xl px-4 sm:px-6 ${className}`}
    >
      <div className={`grid gap-6 rounded-2xl border border-neutral-900 bg-white p-5 shadow-sm sm:p-7 ${inline ? "xl:grid-cols-[1.1fr_1fr]" : "md:grid-cols-[1.1fr_1fr]"} md:items-start`}>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-orange-700">
            Halloween · until October 31
          </p>
          <h2 id="halloween-offer-title" className="mt-1.5 text-xl font-black tracking-tight text-neutral-950 sm:text-2xl">
            Free Google Business Profile Fright Check
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Is something scaring customers away from your profile? Send me your business and I&apos;ll check the seven
            things that most often hold a local profile back — the category, mismatched details, reviews, edits you
            didn&apos;t make — and email you what to fix within 24 hours.
          </p>
          <a href={HALLOWEEN_OFFER_PATH} className="mt-3 inline-block text-sm font-bold text-neutral-950 underline underline-offset-4">
            What the Fright Check covers →
          </a>
        </div>
        <HalloweenGbpCheckForm />
      </div>
    </section>
  );
}

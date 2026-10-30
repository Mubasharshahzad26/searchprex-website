"use client";

// components/HeroV2.tsx
//
// The homepage hero, rebuilt around one question: does a visitor who wants the
// offer get it without leaving this screen?
//
// WHAT THE PREVIOUS HERO DID (components/Hero.tsx)
//
//   - A persona tab-switcher where two of the three tabs REPLACED the lead form
//     with a YouTube embed. The highest-intent block on the site sent people
//     off-site, and two thirds of the hero's copy never reached the server HTML
//     because the inactive personas were not mounted.
//   - Two separate forms, both posting to the same place.
//   - An eight-badge "Verified & Listed On" strip in which six pills said
//     "Registered" and six were not clickable, occupying the fold above the
//     actual screenshots.
//   - Neither form submitted anything. Both pushed to /free-audit, where the
//     visitor filled in four fields again.
//
// WHAT THIS DOES
//
// One form, two fields, submitted here. No page hop, no re-typing. A visitor
// who lands on the homepage and wants the tear-down is done in one screen.
// /free-audit still exists for traffic that arrives there directly and for
// anyone who wants the long version of the offer first.
//
// The submit is honest about failure: /api/send-audit returns 500 when no store
// accepts the lead, and this shows that rather than a success message. The bug
// this site is recovering from is a form that said "Audit Request Received!"
// while storing nothing.

import { trackLead } from "@/lib/track";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, Globe, Mail, Phone, Star } from "lucide-react";

import { CALL_HREF, OFFER_HREF } from "@/lib/offer";
import {
  HERO_STATS,
  TRUSTPILOT_REVIEW_COUNT,
  TRUSTPILOT_URL,
} from "@/lib/hero-content";

const INK = "#0a0a0a";
const BODY = "#525252";
const GREEN = "#171717";
const GREEN_DARK = "#0a0a0a";
const PURPLE = "#171717";
const LINE = "#e2e8f0";

const HERO_PILLARS = [
  "Dedicated client care",
  "Weekly SEO report",
  "Revenue-focused",
  "90-day money-back guarantee",
  "7-day free trial",
];

type Status = "idle" | "loading" | "done" | "error";

export default function HeroV2() {
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [attribution, setAttribution] = useState({
    source: "",
    utmSource: "",
    utmCampaign: "",
    referrer: "",
  });

  // Captured at mount, not at submit: by the time someone submits they may have
  // navigated within the site, and document.referrer is then this site and the
  // UTM parameters are gone from the URL.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setAttribution({
      source: "homepage-hero",
      utmSource: params.get("utm_source") ?? "",
      utmCampaign: params.get("utm_campaign") ?? "",
      referrer: document.referrer || "",
    });
    const prefill = params.get("website");
    if (prefill) setWebsite(prefill);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/send-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website: website.trim(), email: email.trim(), ...attribution }),
      });
      if (!res.ok) throw new Error(String(res.status));
      trackLead("tear_down", "homepage-hero");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="hero" className="relative overflow-hidden border-b border-slate-200 bg-white pt-20">
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        {/* Explicit grid placement rather than source order, because the two
            orders differ. Desktop: claim top-left, detail bottom-left, form
            spanning both rows on the right. Mobile: claim -> FORM -> detail, so
            the submit button clears a 375x812 screen without scrolling. */}
        <div className="grid items-start gap-x-12 gap-y-8 lg:grid-cols-[1.15fr_1fr]">
          {/* ── Claim ── */}
          <div className="order-1 lg:order-none lg:col-start-1 lg:row-start-1">
            <p
              className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-600"
            >
              Hi, I&apos;m Mubashar · Founder-led · One client per city · 9 US states
            </p>

            {/* One primary keyword — "SEO agency", qualified by US and by the
                three audiences. Deliberately not carrying "family law SEO":
                that belongs to /services/law-firm-seo/family-law, and a
                homepage competing with its own spoke beats the page that could
                actually win. "Revenue-Focused" is the differentiator, not a
                keyword. Not "First ... Agency" either: unprovable superlatives
                sit badly on a page arguing that every figure has a screenshot. */}
            {/* V2: the buyer's feeling first, the keyword phrase second, both
                inside the one H1 so the emotional hook doesn't cost the page
                its topic. */}
            <h1 className="mb-4 font-black tracking-tight text-neutral-950">
              <span className="block text-[1.9rem] leading-[1.1] text-balance sm:text-5xl lg:text-[3.2rem]">
                Tired of paying for leads that never come?
              </span>{" "}
              <span
                className="mt-3 block text-[1.15rem] font-extrabold leading-[1.3] text-balance text-neutral-700 sm:text-[1.5rem]"
              >
                SEO for US businesses, done by the founder
              </span>
            </h1>

            <p className="mb-4 text-base leading-relaxed sm:text-lg" style={{ color: BODY }}>
              We know you&apos;re in pain. We come with the solution, and a source of relief.{" "}
              <span className="text-[15px]">SearchPrex is a founder-led SEO agency for US law firms, local businesses and online stores.</span>
            </p>

            {/* The five promises, every one confirmed and published on /pricing. */}
            <ul className="mb-4 flex flex-wrap gap-2">
              {HERO_PILLARS.map((p) => (
                <li
                  key={p}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-semibold"
                  style={{ borderColor: LINE, color: INK }}
                >
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>

            <p className="text-sm" style={{ color: BODY }}>
              Led by{" "}
              <Link href="/about" className="font-bold underline decoration-2 underline-offset-2" style={{ color: INK }}>
                Mubashar Sharif
              </Link>
              , Semrush-certified. Written by me, not a tool.
            </p>
          </div>

          {/* ── The one offer ── */}
          <div className="order-2 w-full lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <div
              className="rounded-2xl border-2 bg-white p-5 shadow-xl sm:p-6"
              style={{ borderColor: GREEN }}
            >
              <div className="mb-5 flex items-center gap-3">
                <Image
                  src="/images/mubashar-sharif.jpg"
                  alt="Mubashar Sharif, founder of SearchPrex"
                  width={56}
                  height={56}
                  className="h-14 w-14 flex-shrink-0 rounded-full object-cover"
                  style={{ border: `2px solid ${LINE}` }}
                  priority
                />
                <div>
                  <p className="text-sm font-bold" style={{ color: INK }}>
                    Free competitor tear-down
                  </p>
                  <p className="text-xs" style={{ color: BODY }}>
                    I analyse it myself. Reply within 24 hours.
                  </p>
                </div>
              </div>

              {status === "done" ? (
                <div
                  className="rounded-xl border p-5 text-center"
                  style={{ borderColor: GREEN, background: "rgba(26,125,89,0.06)" }}
                >
                  <CheckCircle className="mx-auto h-8 w-8" style={{ color: GREEN }} aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold" style={{ color: INK }}>
                    Got it. Your tear-down is on its way.
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed" style={{ color: BODY }}>
                    I&apos;ll read {website.trim() || "your site"} myself and reply to{" "}
                    <strong style={{ color: INK }}>{email.trim()}</strong> within 24 hours. If it
                    hasn&apos;t arrived by then, email{" "}
                    <a href="mailto:contact@searchprex.com" className="font-bold underline">
                      contact@searchprex.com
                    </a>{" "}
                    and chase me.
                  </p>
                  <a
                    href={CALL_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-xs font-bold text-white transition-opacity hover:opacity-90"
                    style={{ background: GREEN }}
                  >
                    Want to talk sooner? Book a 30-min call →
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                  <div className="relative">
                    <Globe
                      className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2"
                      style={{ color: "#7a8494" }}
                      aria-hidden="true"
                    />
                    <input
                      type="text"
                      required
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="yoursite.com"
                      aria-label="Your website URL"
                      className="w-full rounded-lg border bg-[#f8f9fc] py-3.5 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-[#8b95a5] focus:border-[#1a7d59] focus:ring-2 focus:ring-[#1a7d59]/20"
                      style={{ borderColor: LINE, color: INK }}
                    />
                  </div>
                  <div className="relative">
                    <Mail
                      className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2"
                      style={{ color: "#7a8494" }}
                      aria-hidden="true"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@yourfirm.com"
                      aria-label="Your email address"
                      className="w-full rounded-lg border bg-[#f8f9fc] py-3.5 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-[#8b95a5] focus:border-[#1a7d59] focus:ring-2 focus:ring-[#1a7d59]/20"
                      style={{ borderColor: LINE, color: INK }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-lg px-6 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
                    style={{ background: GREEN }}
                  >
                    {status === "loading" ? "Sending…" : "Send my tear-down →"}
                  </button>

                  {status === "error" ? (
                    <p
                      className="flex items-start gap-2 rounded-lg border p-3 text-xs leading-relaxed"
                      style={{ borderColor: "#f3c2cd", background: "#fff5f7", color: "#7a1026" }}
                      role="alert"
                    >
                      <AlertCircle className="mt-px h-4 w-4 flex-shrink-0" aria-hidden="true" />
                      <span>
                        That didn&apos;t send — the fault is mine, not yours. Email{" "}
                        <a href="mailto:contact@searchprex.com" className="font-bold underline">
                          contact@searchprex.com
                        </a>{" "}
                        and I&apos;ll pick it up straight away.
                      </span>
                    </p>
                  ) : null}
                </form>
              )}

              {status !== "done" ? (
                <ul className="mt-4 space-y-2">
                  {[
                    "Two fields. No credit card, no call required.",
                    "One client per city — your market stays yours.",
                    "Written by me, not generated by a tool.",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2 text-xs" style={{ color: BODY }}>
                      <CheckCircle
                        className="mt-px h-3.5 w-3.5 flex-shrink-0"
                        style={{ color: GREEN }}
                        aria-hidden="true"
                      />
                      {line}
                    </li>
                  ))}
                </ul>
              ) : null}

              <div
                className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-4 text-xs font-bold"
                style={{ borderColor: "#eef0f4" }}
              >
                <a
                  href={CALL_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-70"
                  style={{ color: GREEN_DARK }}
                >
                  Prefer to talk? Book 30 min →
                </a>
                <a
                  href="https://wa.me/923059158010"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-70"
                  style={{ color: INK }}
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  WhatsApp the founder
                </a>
                <Link
                  href={OFFER_HREF}
                  className="transition-opacity hover:opacity-70"
                  style={{ color: BODY }}
                >
                  What&apos;s in the tear-down?
                </Link>
              </div>
            </div>
          </div>

          {/* ── Detail + proof — under the claim on desktop, under the form on
                 mobile, so the offer clears the fold on a phone. ── */}
          <div className="order-3 lg:order-none lg:col-start-1 lg:row-start-2">
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {HERO_STATS.map((s) => (
                <Link
                  key={s.value}
                  href={s.href}
                  className="rounded-xl border bg-white px-2.5 py-3 text-center transition-all hover:-translate-y-0.5 hover:shadow-md sm:px-3"
                  style={{ borderColor: LINE }}
                >
                  <span
                    className="block text-lg font-black leading-none sm:text-2xl"
                    style={{ color: GREEN_DARK }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="mt-1.5 block text-[10px] font-bold uppercase tracking-wide sm:text-[11px]"
                    style={{ color: INK }}
                  >
                    {s.label}
                  </span>
                  <span className="mt-0.5 block text-[10px] leading-tight sm:text-[11px]" style={{ color: BODY }}>
                    {s.detail}
                  </span>
                </Link>
              ))}
            </div>

            {/* The only outbound link in the hero, because it is the only
                third-party signal here a visitor can verify. Not the eight-badge
                strip: six of those said "Registered" and were not clickable, and
                a badge that cannot be checked invites the question why. The
                count is stated rather than implied — five stars beside "verified
                reviews" reads as an average across many. */}
            <a
              href={TRUSTPILOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-xs transition-all hover:shadow-sm"
              style={{ borderColor: LINE, color: BODY }}
            >
              <span className="flex" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5" fill="#00b67a" stroke="none" />
                ))}
              </span>
              <span className="font-semibold" style={{ color: INK }}>
                {TRUSTPILOT_REVIEW_COUNT === 1
                  ? "1 verified review on Trustpilot"
                  : `${TRUSTPILOT_REVIEW_COUNT} verified reviews on Trustpilot`}
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

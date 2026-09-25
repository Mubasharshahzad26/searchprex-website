"use client";

// components/ArticleLeadMagnet.tsx
//
// The lead magnet for /blog and /resources/news articles.
//
// WHY THIS EXISTS
//
// Every article on this site ended in link-outs: "Book Free Call" to Calendly,
// "Get Free SEO Audit" to /free-audit. Both send a reader who is already
// engaged — they read the whole article — to a SECOND page where they retype
// their URL and email. That extra page is where interested readers are lost;
// news and blog traffic was converting nowhere close to what it should.
//
// This submits in place, using the same two-field form and the same
// /api/send-audit pipeline the homepage hero now uses (fixed 25 September
// 2026 — every lead route on the site was silently failing before that). No
// new backend surface, no new failure mode: reusing a path that is proven end
// to end in production is worth more here than a bespoke "download our guide"
// mechanic would be.
//
// AIDA, deliberately kept to one honest version rather than three invented
// ones per article:
//   Attention  — the headline names the reader's situation, not the product
//   Interest   — one line ties the article's topic to what it costs them
//   Desire     — the concrete deliverable: a personal tear-down within 24h
//   Action     — two fields, one button, no page change
//
// THREE PLACEMENTS, ONE COMPONENT
//   sidebar  — replaces the old static "Talk to Mubashar" card
//   banner   — spliced into the article body at its natural midpoint
//              (see injectMidContentSlot in PostClient.tsx); only inserted
//              into articles with enough structure to have a real midpoint —
//              a short piece does not get a banner forced into it
//   bottom   — replaces the old link-only closing section
//
// Never reports success unless /api/send-audit actually reports it. The bug
// this whole lead-capture effort exists to fix was a form that said "sent"
// while storing nothing; this does not repeat it.

import Link from "next/link";
import { useEffect, useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle, Globe, Mail } from "lucide-react";

import { CALL_HREF } from "@/lib/offer";

type Status = "idle" | "loading" | "done" | "error";
type Variant = "sidebar" | "banner" | "bottom";
export type Copy = { eyebrow?: string; headline?: string; sub?: string };

const INK = "#0a0f2e";
const BODY = "#5b6472";
const GREEN = "#1a7d59";
const GREEN_DARK = "#196b4d";
const PURPLE = "#534AB7";
const LINE = "#dfe3ec";

function useLeadForm(source: string) {
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [attribution, setAttribution] = useState({ utmSource: "", utmCampaign: "", referrer: "" });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setAttribution({
      utmSource: params.get("utm_source") ?? "",
      utmCampaign: params.get("utm_campaign") ?? "",
      referrer: document.referrer || "",
    });
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/send-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website: website.trim(), email: email.trim(), source, ...attribution }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return { website, setWebsite, email, setEmail, status, submit };
}

function SuccessState({ website, email }: { website: string; email: string }) {
  return (
    <div className="rounded-xl border p-4 text-center" style={{ borderColor: GREEN, background: "rgba(26,125,89,0.06)" }}>
      <CheckCircle className="mx-auto h-6 w-6" style={{ color: GREEN }} aria-hidden="true" />
      <p className="mt-2 text-sm font-bold" style={{ color: INK }}>
        Got it — on its way.
      </p>
      <p className="mt-1 text-xs leading-relaxed" style={{ color: BODY }}>
        I&apos;ll read {website.trim() || "your site"} myself and reply to{" "}
        <strong style={{ color: INK }}>{email.trim()}</strong> within 24 hours.
      </p>
    </div>
  );
}

function ErrorState() {
  return (
    <p
      className="flex items-start gap-2 rounded-lg border p-3 text-xs leading-relaxed"
      style={{ borderColor: "#f3c2cd", background: "#fff5f7", color: "#7a1026" }}
      role="alert"
    >
      <AlertCircle className="mt-px h-4 w-4 flex-shrink-0" aria-hidden="true" />
      <span>
        That didn&apos;t send — email{" "}
        <a href="mailto:contact@searchprex.com" className="font-bold underline">
          contact@searchprex.com
        </a>{" "}
        instead.
      </span>
    </p>
  );
}

/** Compact vertical card. Replaces the sidebar's old link-only CTA. */
function SidebarVariant({ source }: { source: string }) {
  const { website, setWebsite, email, setEmail, status, submit } = useLeadForm(source);

  return (
    <div className="rounded-2xl border-2 p-5" style={{ borderColor: GREEN, background: "#fff" }}>
      <p className="text-sm font-black" style={{ color: INK }}>
        Free competitor tear-down
      </p>
      <p className="mt-1 text-xs leading-relaxed" style={{ color: BODY }}>
        I&apos;ll read your site myself and send back what to fix — within 24 hours.
      </p>

      {status === "done" ? (
        <div className="mt-3">
          <SuccessState website={website} email={email} />
        </div>
      ) : (
        <form onSubmit={submit} className="mt-3 flex flex-col gap-2">
          <div className="relative">
            <Globe className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: "#94a3b8" }} aria-hidden="true" />
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="yoursite.com"
              aria-label="Your website URL"
              className="w-full rounded-lg border bg-[#f8f9fc] py-2.5 pl-9 pr-3 text-xs outline-none focus:border-[#1a7d59] focus:ring-2 focus:ring-[#1a7d59]/20"
              style={{ borderColor: LINE, color: INK }}
            />
          </div>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: "#94a3b8" }} aria-hidden="true" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yourfirm.com"
              aria-label="Your email address"
              className="w-full rounded-lg border bg-[#f8f9fc] py-2.5 pl-9 pr-3 text-xs outline-none focus:border-[#1a7d59] focus:ring-2 focus:ring-[#1a7d59]/20"
              style={{ borderColor: LINE, color: INK }}
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-lg py-2.5 text-xs font-bold uppercase tracking-wide text-white disabled:opacity-70"
            style={{ background: GREEN }}
          >
            {status === "loading" ? "Sending…" : "Send my tear-down →"}
          </button>
          {status === "error" ? <ErrorState /> : null}
        </form>
      )}

      <a
        href={CALL_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 block text-center text-xs font-bold"
        style={{ color: GREEN_DARK }}
      >
        Prefer to talk? Book 30 min →
      </a>
    </div>
  );
}

/** Full-width banner, spliced into the article body at its midpoint. */
function BannerVariant({ source, copy }: { source: string; copy?: Copy }) {
  const { website, setWebsite, email, setEmail, status, submit } = useLeadForm(source);

  return (
    <div
      className="not-prose my-10 rounded-2xl border-2 p-6 sm:p-7"
      style={{ borderColor: GREEN, background: "linear-gradient(135deg, #f1faf5 0%, #ffffff 100%)" }}
    >
      <div className="grid gap-5 sm:grid-cols-[1.3fr_1fr] sm:items-center">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: PURPLE }}>
            {copy?.eyebrow ?? "While you’re thinking about this"}
          </p>
          <p className="mt-1.5 text-lg font-black leading-snug sm:text-xl" style={{ color: INK }}>
            {copy?.headline ?? "Is your own site making this mistake?"}
          </p>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: BODY }}>
            {copy?.sub ??
              "Send me your URL and I’ll check it myself against what you just read — competitor gaps, content gaps, and whether Google’s AI names you or them. Free, written by me, reply within 24 hours."}
          </p>
        </div>

        <div>
          {status === "done" ? (
            <SuccessState website={website} email={email} />
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-2.5">
              <div className="relative">
                <Globe className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "#94a3b8" }} aria-hidden="true" />
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="yoursite.com"
                  aria-label="Your website URL"
                  className="w-full rounded-lg border bg-white py-3 pl-10 pr-3 text-sm outline-none focus:border-[#1a7d59] focus:ring-2 focus:ring-[#1a7d59]/20"
                  style={{ borderColor: LINE, color: INK }}
                />
              </div>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "#94a3b8" }} aria-hidden="true" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@yourfirm.com"
                  aria-label="Your email address"
                  className="w-full rounded-lg border bg-white py-3 pl-10 pr-3 text-sm outline-none focus:border-[#1a7d59] focus:ring-2 focus:ring-[#1a7d59]/20"
                  style={{ borderColor: LINE, color: INK }}
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-lg py-3 text-sm font-bold uppercase tracking-wide text-white disabled:opacity-70"
                style={{ background: GREEN }}
              >
                {status === "loading" ? "Sending…" : "Send my tear-down →"}
              </button>
              {status === "error" ? <ErrorState /> : null}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/** Full-width closing section. Replaces the old link-only bottom CTA. */
function BottomVariant({ source, copy }: { source: string; copy?: Copy }) {
  const { website, setWebsite, email, setEmail, status, submit } = useLeadForm(source);

  return (
    <section className="py-20" style={{ background: INK }}>
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
          {copy?.headline ?? "Send me your URL. I’ll tell you what’s wrong with it."}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
          {copy?.sub ?? "Two fields, a reply within 24 hours, written by me — the person you just read."}
        </p>

        <div className="mx-auto mt-7 max-w-md">
          {status === "done" ? (
            <div className="rounded-xl border border-white/15 bg-white/5 p-5 text-left">
              <SuccessState website={website} email={email} />
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-3">
              <div className="relative">
                <Globe className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" aria-hidden="true" />
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="yoursite.com"
                  aria-label="Your website URL"
                  className="w-full rounded-xl border border-white/15 bg-white/5 py-3.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#1a7d59] focus:ring-2 focus:ring-[#1a7d59]/30"
                />
              </div>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" aria-hidden="true" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@yourfirm.com"
                  aria-label="Your email address"
                  className="w-full rounded-xl border border-white/15 bg-white/5 py-3.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#1a7d59] focus:ring-2 focus:ring-[#1a7d59]/30"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-xl px-7 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
                style={{ background: GREEN }}
              >
                {status === "loading" ? "Sending…" : "Get my free tear-down →"}
              </button>
              {status === "error" ? (
                <div className="rounded-lg bg-white/10 p-3 text-left">
                  <ErrorState />
                </div>
              ) : null}
            </form>
          )}
        </div>

        <a
          href={CALL_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-white/70 hover:text-white"
        >
          Or book a 30-min call <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export default function ArticleLeadMagnet({
  variant,
  source,
  copy,
}: {
  variant: Variant;
  source: string;
  /** Context-specific wording. The offer and the form never change — only the
   *  Attention line does, so a hub page can speak to "a Google update hit my
   *  site" while an article speaks to what the reader just read. */
  copy?: Copy;
}) {
  if (variant === "sidebar") return <SidebarVariant source={source} />;
  if (variant === "banner") return <BannerVariant source={source} copy={copy} />;
  return <BottomVariant source={source} copy={copy} />;
}

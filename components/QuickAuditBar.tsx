"use client";

// components/QuickAuditBar.tsx
// A one-field capture, high on the page.
//
// Why this is safe to add when the whole point of Phase 1 was "one form":
// this is not a second OFFER. It is the same free audit, under the same name,
// posting to the same endpoint as the full form at the bottom of the page. The
// only difference is that it asks for one thing instead of three.
//
// It replaces the AI-visibility strip that used to sit in this slot, which
// pitched a DIFFERENT product (/ai-visibility) three sections before the AI
// section pitched the same product again.
//
// The full wizard still exists lower down for people who scroll. This exists
// because the form used to be at ~85% scroll depth and most visitors never
// reached it.

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, Check } from "lucide-react";
import { color, radius } from "@/lib/design-tokens";
import { OFFER_MICROCOPY, OFFER_HREF } from "@/lib/offer";

export default function QuickAuditBar() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const valid = /\S+@\S+\.\S+/.test(email);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "", email, website, source: "homepage-quick-bar" }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      className="border-b py-12"
      style={{ background: color.surface, borderColor: color.border }}
      aria-labelledby="quick-audit-heading"
    >
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {status === "done" ? (
          <div className="flex flex-col items-center gap-2">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full"
              style={{ background: `${color.success}22` }}
            >
              <Check className="h-6 w-6" style={{ color: color.successDark }} />
            </span>
            <p className="text-lg font-black" style={{ color: color.ink }}>
              Got it — your audit is queued.
            </p>
            <p className="text-sm" style={{ color: color.muted }}>
              The founder reviews it personally and replies within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <h2
              id="quick-audit-heading"
              className="text-2xl font-black tracking-tight sm:text-3xl"
              style={{ color: color.ink }}
            >
              Want the same read on your site?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm" style={{ color: color.muted }}>
              One field. The founder audits it himself and sends a prioritized fix list.
            </p>

            <form
              onSubmit={submit}
              className="mx-auto mt-6 flex max-w-xl flex-col gap-2 sm:flex-row"
            >
              <label htmlFor="quick-site" className="sr-only">
                Your website URL
              </label>
              <input
                id="quick-site"
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="yoursite.com"
                className={`w-full border px-4 py-3 text-sm outline-none sm:w-2/5 ${radius.control}`}
                style={{ borderColor: color.border, color: color.ink }}
              />
              <label htmlFor="quick-email" className="sr-only">
                Your email address
              </label>
              <input
                id="quick-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className={`w-full border px-4 py-3 text-sm outline-none ${radius.control}`}
                style={{ borderColor: color.border, color: color.ink }}
              />
              <button
                type="submit"
                disabled={!valid || status === "loading"}
                className={`inline-flex shrink-0 items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 ${radius.control}`}
                style={{ background: color.primary }}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Get my free audit <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {status === "error" && (
              <p className="mt-3 text-sm font-semibold" style={{ color: "#a32218" }}>
                Something went wrong.{" "}
                <Link href={OFFER_HREF} className="underline">
                  Use the full form instead
                </Link>
                , or email contact@searchprex.com.
              </p>
            )}

            <p className="mt-3 text-xs" style={{ color: color.muted }}>
              {OFFER_MICROCOPY}
            </p>
          </>
        )}
      </div>
    </section>
  );
}

"use client";

// The free Business Profile check request form, used by the Halloween offer
// and by the evergreen check on local SEO pages. Posts through submitLead to
// the leads Google Sheet with the caller's source tag, and fires generate_lead
// only after the server accepts it.

import { useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle } from "lucide-react";
import { submitLead, LEAD_FAILED_MESSAGE } from "@/lib/submit-lead";
import { trackLead } from "@/lib/track";
import { HALLOWEEN_LEAD_SOURCE } from "@/lib/halloween-offer";

type Status = "idle" | "loading" | "done" | "error";

const field =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-neutral-950 outline-none focus:border-neutral-900";

export default function HalloweenGbpCheckForm({
  compact = false,
  source = HALLOWEEN_LEAD_SOURCE,
  label = "Halloween GBP Fright Check request",
  buttonText = "Get my free Fright Check",
  doneTitle = "Your Fright Check request is in.",
}: {
  compact?: boolean;
  /** Sheet source tag, e.g. "local-news:gbp-check". */
  source?: string;
  /** Written into the lead's message so the request is clear in the sheet. */
  label?: string;
  buttonText?: string;
  doneTitle?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [link, setLink] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    const ok = await submitLead({
      source,
      name: name.trim(),
      email: email.trim(),
      business: business.trim(),
      website: link.trim(),
      message: label,
    });
    if (ok) {
      trackLead("gbp_check", source);
      setStatus("done");
    } else {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-xl border border-slate-300 bg-slate-50 p-5 text-center" role="status">
        <CheckCircle className="mx-auto h-6 w-6 text-neutral-900" aria-hidden="true" />
        <p className="mt-2 text-sm font-bold text-neutral-950">{doneTitle}</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-600">
          I&apos;ll go through {business.trim() || "your profile"} myself and email the report to{" "}
          <strong className="text-neutral-950">{email.trim()}</strong> within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2.5">
      <div className={compact ? "grid gap-2.5 sm:grid-cols-2" : "grid gap-2.5"}>
        <input className={field} required value={business} onChange={(e) => setBusiness(e.target.value)}
          placeholder="Business name and city" aria-label="Business name and city" autoComplete="organization" />
        <input className={field} value={link} onChange={(e) => setLink(e.target.value)}
          placeholder="Website or Google Maps link (optional)" aria-label="Website or Google Maps link" inputMode="url" />
        <input className={field} value={name} onChange={(e) => setName(e.target.value)}
          placeholder="Your name" aria-label="Your name" autoComplete="name" />
        <input className={field} type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="you@yourbusiness.com" aria-label="Your email" autoComplete="email" />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-neutral-800 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : buttonText}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
      {status === "error" && (
        <p className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-900" role="alert">
          <AlertCircle className="mt-px h-4 w-4 flex-shrink-0" aria-hidden="true" />
          {LEAD_FAILED_MESSAGE}
        </p>
      )}
      <p className="text-[11px] leading-relaxed text-slate-500">
        Free, no card. Reviewed by the founder, report within 24 hours.
      </p>
    </form>
  );
}

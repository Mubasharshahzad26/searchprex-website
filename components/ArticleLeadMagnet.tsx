"use client";

import { trackLead } from "@/lib/track";
import { useEffect, useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle, Globe, Mail } from "lucide-react";

import { CALL_HREF } from "@/lib/offer";

type Status = "idle" | "loading" | "done" | "error";
type Variant = "sidebar" | "banner" | "bottom";
export type Copy = { eyebrow?: string; headline?: string; sub?: string };

export const INK = "#0a0a0a";
export const BODY = "#475569";
export const GREEN = "#171717";
const GREEN_DARK = "#0a0a0a";
const PURPLE = "#171717";
export const LINE = "#cbd5e1";

/** Set once a reader has actually submitted, so no later surface asks the same person again. */
export const LEAD_DONE_KEY = "spx_lead_done";

export function useLeadForm(source: string) {
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
      trackLead("tear_down", source);
      setStatus("done");
      try { window.localStorage.setItem(LEAD_DONE_KEY, String(Date.now())); } catch { /* not essential */ }
    } catch {
      setStatus("error");
    }
  }

  return { website, setWebsite, email, setEmail, status, submit };
}

export function SuccessState({ website, email }: { website: string; email: string }) {
  return (
    <div className="rounded-xl border border-slate-300 bg-slate-50 p-4 text-center">
      <CheckCircle className="mx-auto h-6 w-6 text-neutral-900" aria-hidden="true" />
      <p className="mt-2 text-sm font-bold text-neutral-950">
        Got it — on its way.
      </p>
      <p className="mt-1 text-xs leading-relaxed text-slate-600">
        I&apos;ll read {website.trim() || "your site"} myself and reply to{" "}
        <strong className="text-neutral-950">{email.trim()}</strong> within 24 hours.
      </p>
      <a
        href={CALL_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center justify-center rounded-lg bg-neutral-900 px-3.5 py-2 text-xs font-bold text-white transition-opacity hover:bg-neutral-800"
      >
        Want to talk sooner? Book 30 min →
      </a>
    </div>
  );
}

export function ErrorState() {
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
function SidebarVariant({ source, copy, buttonText }: { source: string; copy?: Copy; buttonText?: string }) {
  const { website, setWebsite, email, setEmail, status, submit } = useLeadForm(source);

  return (
    <div className="rounded-2xl border border-slate-300 bg-white p-5 shadow-2xs font-sans">
      <p className="text-sm font-black text-neutral-950">
        {copy?.headline ?? "Free competitor tear-down"}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-slate-600">
        {copy?.sub ?? "I’ll read your site myself and send back what to fix — within 24 hours."}
      </p>

      {status === "done" ? (
        <div className="mt-3">
          <SuccessState website={website} email={email} />
        </div>
      ) : (
        <form onSubmit={submit} className="mt-3 flex flex-col gap-2">
          <div className="relative">
            <Globe className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="text"
              required
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="yoursite.com"
              aria-label="Your website URL"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2.5 pl-9 pr-3 text-xs text-neutral-950 outline-none focus:border-neutral-900 focus:bg-white"
            />
          </div>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yourfirm.com"
              aria-label="Your email address"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2.5 pl-9 pr-3 text-xs text-neutral-950 outline-none focus:border-neutral-900 focus:bg-white"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-lg bg-neutral-900 py-2.5 text-xs font-bold uppercase tracking-wide text-white hover:bg-neutral-800 disabled:opacity-70"
          >
            {status === "loading" ? "Sending…" : (buttonText ?? "Send my tear-down →")}
          </button>
          {status === "error" ? <ErrorState /> : null}
        </form>
      )}

      <a
        href={CALL_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 block text-center text-xs font-bold text-neutral-950 hover:underline"
      >
        Prefer to talk? Book 30 min →
      </a>
    </div>
  );
}

/** Full-width banner, spliced into the article body at its midpoint. */
function BannerVariant({ source, copy, buttonText }: { source: string; copy?: Copy; buttonText?: string }) {
  const { website, setWebsite, email, setEmail, status, submit } = useLeadForm(source);

  return (
    <div
      className="not-prose my-10 rounded-2xl border border-slate-300 bg-slate-50 p-6 sm:p-7 font-sans"
    >
      <div className="grid gap-5 sm:grid-cols-[1.3fr_1fr] sm:items-center">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-900">
            {copy?.eyebrow ?? "While you’re thinking about this"}
          </p>
          <p className="mt-1.5 text-lg font-black leading-snug text-neutral-950 sm:text-xl">
            {copy?.headline ?? "Is your own site making this mistake?"}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
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
                <Globe className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  type="text"
                  required
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="yoursite.com"
                  aria-label="Your website URL"
                  className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-3 text-sm text-neutral-950 outline-none focus:border-neutral-900"
                />
              </div>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@yourfirm.com"
                  aria-label="Your email address"
                  className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-3 text-sm text-neutral-950 outline-none focus:border-neutral-900"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-lg bg-neutral-900 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-neutral-800 disabled:opacity-70"
              >
                {status === "loading" ? "Sending…" : (buttonText ?? "Send my tear-down →")}
              </button>
              {status === "error" ? <ErrorState /> : null}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/** Full-width closing section. Light grey background, solid black heading, dark grey CTA button. */
function BottomVariant({ source, copy, buttonText }: { source: string; copy?: Copy; buttonText?: string }) {
  const { website, setWebsite, email, setEmail, status, submit } = useLeadForm(source);

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200 font-sans">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="text-2xl font-black tracking-tight text-neutral-950 sm:text-3xl">
          {copy?.headline ?? "Send me your URL. I’ll tell you what’s wrong with it."}
        </p>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
          {copy?.sub ?? "Two fields, a reply within 24 hours, written by me — the person you just read."}
        </p>

        <div className="mx-auto mt-7 max-w-md">
          {status === "done" ? (
            <div className="rounded-xl border border-slate-300 bg-white p-5 text-left">
              <SuccessState website={website} email={email} />
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-3">
              <div className="relative">
                <Globe className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  type="text"
                  required
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="yoursite.com"
                  aria-label="Your website URL"
                  className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-10 pr-4 text-sm text-neutral-950 outline-none placeholder:text-slate-400 focus:border-neutral-900"
                />
              </div>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@yourfirm.com"
                  aria-label="Your email address"
                  className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-10 pr-4 text-sm text-neutral-950 outline-none placeholder:text-slate-400 focus:border-neutral-900"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-xl bg-neutral-900 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-neutral-800 disabled:opacity-70"
              >
                {status === "loading" ? "Sending…" : (buttonText ?? "Get my free tear-down →")}
              </button>
              {status === "error" ? (
                <div className="rounded-lg bg-white p-3 text-left">
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
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-neutral-900 hover:underline"
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
  buttonText,
}: {
  variant: Variant;
  source: string;
  copy?: Copy;
  buttonText?: string;
}) {
  if (variant === "sidebar") return <SidebarVariant source={source} copy={copy} buttonText={buttonText} />;
  if (variant === "banner") return <BannerVariant source={source} copy={copy} buttonText={buttonText} />;
  return <BottomVariant source={source} copy={copy} buttonText={buttonText} />;
}

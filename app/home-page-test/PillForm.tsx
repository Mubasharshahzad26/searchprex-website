"use client";

// app/home-page-test/PillForm.tsx
//
// The one action on the redesigned home page, used three times (hero, after
// the results, and the close). Semrush / NicheSEO Pro pattern: a single pill
// that asks for the website first. The email comes on the second step, once
// the visitor has already committed to the easy part — the same two fields as
// every other form on the site, split so the first ask costs almost nothing.
//
// Posts to /api/send-audit like ArticleLeadMagnet, with the business type in
// the `business` field (lib/leads-store.ts already stores it), so the Sheet
// shows the segment without asking a third question. Never reports success
// unless the API does.

import { useEffect, useState } from "react";
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle, ChevronDown } from "lucide-react";

type Step = "url" | "email" | "sending" | "done" | "error";
type Tone = "light" | "dark";

const BUSINESS = [
  { value: "Law firm", label: "Law firm" },
  { value: "Local business", label: "Local business" },
  { value: "Ecommerce store", label: "Ecommerce store" },
] as const;

export default function PillForm({ source, tone = "light", cta = "Get my free tear-down" }: { source: string; tone?: Tone; cta?: string }) {
  const [step, setStep] = useState<Step>("url");
  const [website, setWebsite] = useState("");
  const [business, setBusiness] = useState<string>(BUSINESS[0].value);
  const [email, setEmail] = useState("");
  const [hint, setHint] = useState("");
  const [attribution, setAttribution] = useState({ utmSource: "", utmCampaign: "", referrer: "" });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setAttribution({
      utmSource: params.get("utm_source") ?? "",
      utmCampaign: params.get("utm_campaign") ?? "",
      referrer: document.referrer || "",
    });
  }, []);

  const dark = tone === "dark";
  const shell = dark
    ? "border-white/15 bg-white/[0.06] focus-within:border-white/40"
    : "border-[#dcdfea] bg-white shadow-[0_8px_30px_rgba(83,74,183,0.12)] focus-within:border-[#534AB7]";
  const inputText = dark ? "text-white placeholder:text-white/45" : "text-[#0a0f2e] placeholder:text-[#8a93a3]";
  const muted = dark ? "text-white/60" : "text-[#5b6472]";

  function next(e: React.FormEvent) {
    e.preventDefault();
    const w = website.trim();
    if (!w || !/\./.test(w)) {
      setHint("Enter your website, like yourfirm.com");
      return;
    }
    setHint("");
    setStep("email");
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setHint("Enter the email the tear-down should go to");
      return;
    }
    setHint("");
    setStep("sending");
    try {
      const res = await fetch("/api/send-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website: website.trim(), email: email.trim(), business, source, ...attribution }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStep("done");
    } catch {
      setStep("error");
    }
  }

  if (step === "done") {
    return (
      <div className={`mx-auto flex max-w-xl items-start gap-3 rounded-3xl border p-5 text-left ${dark ? "border-white/15 bg-white/[0.06]" : "border-[#bfe5d3] bg-[#effaf5]"}`}>
        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#1a7d59]" aria-hidden />
        <p className={`text-sm leading-relaxed ${dark ? "text-white/85" : "text-[#0a0f2e]"}`}>
          <strong>Got it.</strong> I&apos;ll read {website.trim()} myself and reply to <strong>{email.trim()}</strong> within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      {step === "url" ? (
        <form onSubmit={next} className={`flex flex-col gap-2 rounded-3xl border p-2 transition-colors sm:flex-row sm:items-center sm:rounded-full ${shell}`}>
          <label className="sr-only" htmlFor={`${source}-url`}>Your website</label>
          <input
            id={`${source}-url`}
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="yourwebsite.com"
            autoComplete="url"
            className={`min-w-0 flex-1 bg-transparent px-4 py-3 text-base outline-none ${inputText}`}
          />
          <div className="relative flex items-center">
            <label className="sr-only" htmlFor={`${source}-biz`}>Type of business</label>
            <select
              id={`${source}-biz`}
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              className={`w-full appearance-none rounded-full py-2.5 pl-4 pr-9 text-sm font-semibold outline-none sm:w-auto ${dark ? "bg-white/10 text-white" : "bg-[#f3f2fd] text-[#3C3489]"}`}
            >
              {BUSINESS.map((b) => (
                <option key={b.value} value={b.value} className="text-[#0a0f2e]">
                  {b.label}
                </option>
              ))}
            </select>
            <ChevronDown className={`pointer-events-none absolute right-3 h-4 w-4 ${dark ? "text-white/70" : "text-[#534AB7]"}`} aria-hidden />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#534AB7] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#3C3489]"
          >
            {cta} <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </form>
      ) : (
        <form onSubmit={send} className={`flex flex-col gap-2 rounded-3xl border p-2 transition-colors sm:flex-row sm:items-center sm:rounded-full ${shell}`}>
          <button
            type="button"
            onClick={() => setStep("url")}
            className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold ${muted}`}
            aria-label="Change website"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> <span className="max-w-[9rem] truncate">{website.trim()}</span>
          </button>
          <label className="sr-only" htmlFor={`${source}-email`}>Your email</label>
          <input
            id={`${source}-email`}
            type="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Where should I send it?"
            autoComplete="email"
            className={`min-w-0 flex-1 bg-transparent px-3 py-3 text-base outline-none ${inputText}`}
          />
          <button
            type="submit"
            disabled={step === "sending"}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#534AB7] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#3C3489] disabled:opacity-70"
          >
            {step === "sending" ? "Sending…" : "Send my tear-down"} {step === "sending" ? null : <ArrowRight className="h-4 w-4" aria-hidden />}
          </button>
        </form>
      )}

      {hint ? (
        <p className="mt-2 text-center text-xs font-semibold text-[#b8123a]" role="alert">
          {hint}
        </p>
      ) : step === "error" ? (
        <p className="mt-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#b8123a]" role="alert">
          <AlertCircle className="h-3.5 w-3.5" aria-hidden /> That didn&apos;t send — email contact@searchprex.com instead.
        </p>
      ) : (
        <p className={`mt-3 text-center text-xs ${muted}`}>
          {step === "url" ? "Free · Reply within 24 hours · Written by me, not a tool" : "Step 2 of 2 · No newsletter, no calls unless you ask"}
        </p>
      )}
    </div>
  );
}

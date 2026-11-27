"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Lock, ShieldCheck } from "lucide-react";

interface ClevelandSubpageAuditFormProps {
  practiceSlug: string;
  practiceName: string;
  ctaLabel?: string;
}

export default function ClevelandSubpageAuditForm({
  practiceSlug,
  practiceName,
  ctaLabel,
}: ClevelandSubpageAuditFormProps) {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [firmSize, setFirmSize] = useState<"Solo" | "2-10 attorneys" | "11+ attorneys">("2-10 attorneys");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!website.trim() || !email.trim()) {
      setErrorMessage("Please enter both your firm website URL and work email.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || `Cleveland ${practiceName} Managing Partner`,
          url: website.trim(),
          email: email.trim(),
          firmSize,
          practiceArea: practiceName,
          source: `cleveland:${practiceSlug}:subpage-audit`,
          notes: `Requested 24h Cleveland ${practiceName} SEO & Map Pack Audit. Firm Size: ${firmSize}.`,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Unable to submit request. Please try again.");
      }
      setStatus("success");
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Submission failed. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-300 text-neutral-900 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-800" />
            <span>Free 24-Hour Cuyahoga Territory Audit</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
            Request Your Cleveland {practiceName} SEO &amp; Map Pack Teardown
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Founder Mubashar Sharif personally reviews your firm&apos;s Google Business Profile, organic rankings, and intake response speed against the top-ranking {practiceName.toLowerCase()} firms in Cuyahoga County.
          </p>
          <ul className="space-y-2.5 pt-1 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
              <span>Cuyahoga County 3-Pack heat map and Google Business Profile category gap check</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
              <span>Side-by-side comparison of your current ad spend vs. target organic keyword equity</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
              <span>Confirmation of 1-firm {practiceName.toLowerCase()} exclusivity availability in Cuyahoga County</span>
            </li>
          </ul>
          <div className="pt-2">
            <div className="relative aspect-16/10 rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-2xs">
              <Image
                src="/images/services/law-firm/mubashar-sharif-cleveland-seo-audit.webp"
                alt={`Founder Mubashar Sharif reviewing a Cleveland ${practiceName} law firm SEO and Google Maps 3-Pack teardown`}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/85 block">
                  7-Day Free SEO Trial + 14-Day Intake Trial Included
                </span>
                <p className="text-xs font-semibold text-white leading-snug">
                  Personal Cuyahoga Map Pack teardown &amp; Rule 7.3 speed-to-lead diagnostic within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          {status === "success" ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 text-center space-y-3">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-neutral-900 text-white">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-neutral-950">
                Audit Request Confirmed
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Thank you. Mubashar Sharif will review your Cleveland {practiceName.toLowerCase()} visibility and send your teardown within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-7 space-y-4">
              {status === "error" && errorMessage && (
                <p role="alert" className="rounded-lg border border-red-300 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-700">
                  {errorMessage}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label htmlFor="audit-name" className="text-xs font-semibold text-neutral-900 block">
                    Your Name
                  </label>
                  <input
                    id="audit-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Managing Partner"
                    className="w-full h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-neutral-950 placeholder:text-slate-400 focus:border-neutral-900 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="audit-size" className="text-xs font-semibold text-neutral-900 block">
                    Firm Size
                  </label>
                  <select
                    id="audit-size"
                    value={firmSize}
                    onChange={(e) => setFirmSize(e.target.value as "Solo" | "2-10 attorneys" | "11+ attorneys")}
                    className="w-full h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-neutral-950 focus:border-neutral-900 focus:outline-none"
                  >
                    <option value="Solo">Solo Practitioner</option>
                    <option value="2-10 attorneys">2–10 Attorneys</option>
                    <option value="11+ attorneys">11+ Attorneys</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="audit-website" className="text-xs font-semibold text-neutral-900 block">
                  Firm Website URL <span className="text-red-600">*</span>
                </label>
                <input
                  id="audit-website"
                  type="text"
                  required
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://www.yourclevelandfirm.com"
                  className="w-full h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-neutral-950 placeholder:text-slate-400 focus:border-neutral-900 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="audit-email" className="text-xs font-semibold text-neutral-900 block">
                  Work Email <span className="text-red-600">*</span>
                </label>
                <input
                  id="audit-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="partner@yourfirm.com"
                  className="w-full h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-neutral-950 placeholder:text-slate-400 focus:border-neutral-900 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 disabled:opacity-60 text-white font-bold px-6 py-3.5 text-sm shadow-sm transition-all cursor-pointer"
              >
                <span>{status === "submitting" ? "Submitting Request..." : (ctaLabel || `Request Free 24h ${practiceName} Audit`)}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
                <Lock className="w-3 h-3" />
                <span>100% confidential · No obligation · 1-firm exclusivity per practice</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

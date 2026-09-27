"use client";

// components/GuideMagnet.tsx
//
// The softer offer: a free downloadable guide, for visitors who are not ready
// for the tear-down yet. It sits mid-page; the tear-down keeps the hero,
// sidebar and closing positions.
//
// One field (email; the website is optional), and the download appears in
// place the moment the email is stored — no waiting for an inbox. The lead is
// tagged `guide:<id>:<page>` and marked in `message` as a guide download, so it
// is never mistaken for a tear-down request in the Sheet. Nobody is added to a
// newsletter by this form.
//
// If storing the lead fails, the visitor still gets the file, with a note
// saying so — withholding a free PDF over our own error would be the wrong
// trade, and the note keeps it honest.

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle, Download, FileText } from "lucide-react";

import type { Guide } from "@/lib/guides";

type Status = "idle" | "sending" | "done" | "fallback";

export default function GuideMagnet({
  guide,
  source,
  eyebrow = "Free download",
  headline,
}: {
  guide: Guide;
  /** Page identifier, e.g. "law-firm-seo/personal-injury". */
  source: string;
  eyebrow?: string;
  headline?: string;
}) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
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

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setHint("Enter the email address to send it to");
      return;
    }
    setHint("");
    setStatus("sending");
    try {
      const res = await fetch("/api/send-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          website: website.trim(),
          source: `guide:${guide.id}:${source}`,
          message: `Guide download: ${guide.title} (PDF). Not a tear-down request.`,
          ...attribution,
        }),
      });
      setStatus(res.ok ? "done" : "fallback");
    } catch {
      setStatus("fallback");
    }
  }

  return (
    <div className="not-prose rounded-3xl border border-[#dcdaf6] bg-[#f6f5ff] p-6 sm:p-8">
      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div className="flex gap-4">
          {/* A small "document" so the offer reads as a file, not a form. */}
          <div className="hidden h-24 w-[4.5rem] flex-shrink-0 flex-col justify-between rounded-lg border border-[#dcdaf6] bg-white p-2 shadow-sm sm:flex" aria-hidden>
            <FileText className="h-4 w-4 text-[#534AB7]" />
            <span className="block h-1 w-full rounded bg-[#e7e8f0]" />
            <span className="block h-1 w-4/5 rounded bg-[#e7e8f0]" />
            <span className="block h-1 w-3/5 rounded bg-[#e7e8f0]" />
            <span className="text-[8px] font-black text-[#534AB7]">PDF</span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#534AB7]">{eyebrow}</p>
            <p className="mt-1.5 text-xl font-black leading-snug tracking-tight text-[#0a0f2e]">{headline ?? `${guide.title} (PDF)`}</p>
            <ul className="mt-3 space-y-1.5">
              {guide.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm leading-relaxed text-[#374151]">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1a7d59]" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          {status === "done" || status === "fallback" ? (
            <div className="rounded-2xl border border-[#bfe5d3] bg-white p-5 text-center">
              <a
                href={guide.href}
                download={guide.fileName}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1a7d59] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#196b4d]"
              >
                <Download className="h-4 w-4" aria-hidden /> Download the PDF
              </a>
              <p className="mt-3 text-xs leading-relaxed text-[#5b6472]">
                {status === "fallback"
                  ? "Your email didn't save on our side, but the file is yours anyway."
                  : "It's yours. Want it run against your site instead?"}{" "}
                <a href="/free-audit" className="font-bold text-[#534AB7]">
                  Free tear-down <ArrowRight className="inline h-3 w-3" aria-hidden />
                </a>
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-2.5">
              <label className="sr-only" htmlFor={`guide-${guide.id}-${source}-email`}>Your email</label>
              <input
                id={`guide-${guide.id}-${source}-email`}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourfirm.com"
                autoComplete="email"
                className="w-full rounded-full border border-[#dcdfea] bg-white px-5 py-3 text-sm text-[#0a0f2e] outline-none focus:border-[#1a7d59] focus:ring-2 focus:ring-[#1a7d59]/20"
              />
              <label className="sr-only" htmlFor={`guide-${guide.id}-${source}-site`}>Your website (optional)</label>
              <input
                id={`guide-${guide.id}-${source}-site`}
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Your website (optional)"
                autoComplete="url"
                className="w-full rounded-full border border-[#dcdfea] bg-white px-5 py-3 text-sm text-[#0a0f2e] outline-none focus:border-[#1a7d59] focus:ring-2 focus:ring-[#1a7d59]/20"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1a7d59] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#196b4d] disabled:opacity-70"
              >
                {status === "sending" ? "Preparing…" : "Get the PDF"} {status === "sending" ? null : <Download className="h-4 w-4" aria-hidden />}
              </button>
              {hint ? (
                <p className="text-center text-xs font-semibold text-[#b8123a]" role="alert">{hint}</p>
              ) : (
                <p className="text-center text-xs text-[#5b6472]">
                  Instant download. No newsletter.
                  {guide.webHref ? (
                    <>
                      {" "}Or{" "}
                      <a href={guide.webHref} className="font-semibold underline">
                        read it on the site
                      </a>
                      .
                    </>
                  ) : null}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

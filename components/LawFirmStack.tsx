"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TrendingUp, Code2, CheckCircle2, Sparkles } from "lucide-react";

const CODELOCI_URL = "https://codeloci.com";

export default function LawFirmStack() {
  return (
    <section className="relative border-y border-slate-200 bg-slate-50 font-sans">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        {/* ─── SECTION HEADER ─── */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-900">
            <Sparkles className="h-3 w-3" />
            Official Partnership
          </div>
          <h2 className="mb-5 text-3xl font-bold leading-[1.1] tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
            The complete stack for<br />
            <span className="text-neutral-700">modern law firms.</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            SEO brings the clients. Software helps you serve them at scale.
            SearchPrex and Codeloci together deliver end-to-end growth — from ranking on Google to running your entire practice.
          </p>
        </div>

        {/* ─── PARTNERSHIP GRID (2 columns) ─── */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* ─── SEARCHPREX CARD ─── */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:border-neutral-900 hover:shadow-md lg:p-10">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                <TrendingUp className="h-6 w-6 text-neutral-900" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Growth Engine</div>
                <div className="text-xl font-bold text-neutral-950">SearchPrex</div>
              </div>
            </div>

            <h3 className="mb-3 text-lg font-semibold text-neutral-950">
              Rank on Google. Get cited by AI.
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-slate-600">
              Founder-led SEO built for law firms — Map Pack rankings, AI Overview citations,
              practice-area content, and E-E-A-T compliance for YMYL legal search.
            </p>

            <ul className="space-y-2.5">
              {[
                "Google Maps top 3 rankings",
                "AI Overview & ChatGPT citations",
                "Practice-area SEO content",
                "Legal E-E-A-T & schema markup",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-900">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-900" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-slate-200 pt-6">
              <Link
                href="/services/law-firm-seo"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-950 hover:underline"
              >
                Explore Law Firm SEO
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* ─── CODELOCI CARD ─── */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-300 bg-slate-100 p-8 text-neutral-950 transition-all hover:border-neutral-900 hover:shadow-md lg:p-10">
            <div className="relative">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-slate-200">
                  <Code2 className="h-6 w-6 text-neutral-900" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Software Partner</div>
                  <div className="flex items-center gap-3">
                    <div className="text-xl font-bold text-neutral-950">Codeloci</div>
                    <div className="relative h-6 w-24 opacity-80">
                      <Image
                        src="/codeloci-logo.png"
                        alt="Codeloci"
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="mb-3 text-lg font-semibold text-neutral-950">
                Run your entire law practice.
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-slate-600">
                Purpose-built software solutions for law firms — case management,
                client portals, intake automation, document workflows, and billing
                systems that actually work for legal practices.
              </p>

              <ul className="space-y-2.5">
                {[
                  "Case & matter management",
                  "Client portal & intake automation",
                  "Document workflows & e-signing",
                  "Billing, trust accounting & reporting",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-900">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-900" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-slate-200 pt-6">
                <a
                  href={CODELOCI_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-950 hover:underline"
                >
                  Visit Codeloci
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ─── UNIFIED CTA STRIP ─── */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:flex sm:items-center sm:justify-between sm:p-8">
          <div className="mb-4 sm:mb-0 sm:mr-6">
            <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-500">
              Better together
            </div>
            <div className="text-lg font-semibold text-neutral-950">
              Book a joint consultation — SEO + Software strategy for your firm.
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/free-audit"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition-transform hover:bg-neutral-800"
            >
              Book joint consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
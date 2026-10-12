"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck, Award } from "lucide-react";

export default function ClevelandFounderBio() {
  return (
    <section className="border-b border-slate-200 bg-slate-50/70 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="group overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-xl shadow-slate-100 transition-all duration-500 hover:shadow-2xl hover:shadow-sm hover:border-neutral-900/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Image Column */}
            <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[380px] bg-slate-900 overflow-hidden">
              <Image
                src="/images/mubashar-sharif.jpg"
                alt="Mubashar Sharif, CEO and Founder of SearchPrex, reviewing technical legal SEO audits"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
                <span className="font-mono text-xs uppercase text-slate-200 font-bold">
                  CEO & Principal Strategist
                </span>
                <h4 className="text-lg font-bold">Mubashar Sharif</h4>
              </div>
            </div>

            {/* Right Bio Column */}
            <div className="lg:col-span-7 p-7 sm:p-10 lg:p-12 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-neutral-900 transition-transform group-hover:scale-105">
                <Award className="h-3.5 w-3.5" />
                <span>The Brain Behind It · Direct CEO Engagement</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
                Founder-Led Execution: Mubashar Sharif
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Every Cleveland account is planned, audited, and reviewed personally. No junior interns, no offshore hand-offs: the person who inspects your Google Search Console profile and Cuyahoga County competitors is the exact specialist who designs and oversees your technical execution.
              </p>

              {/* Verified Trust Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  "Semrush Certified Agency Partner",
                  "5+ Years Law Firm & Local SEO",
                  "AI Search & LLM Citations Specialist",
                  "Ohio MRPC Rule 7 Ethics Aligned",
                ].map((badge, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:border-neutral-900/30 hover:scale-105 cursor-default"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-neutral-800" />
                    <span>{badge}</span>
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4">
                <a
                  href="#reality-check"
                  className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white px-6 py-3.5 text-sm font-bold shadow-md shadow-sm transition-all hover:scale-105 active:scale-95"
                >
                  <span>Request 24h Review from Mubashar</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                <Link
                  href="/about"
                  className="text-xs font-bold text-neutral-900 hover:underline"
                >
                  Learn more about our methodology →
                </Link>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  TrendingUp,
  UserCheck,
  FileBarChart,
  Award,
  ArrowRight,
  Clock,
} from "lucide-react";

interface ServiceExhaustedByAgenciesProps {
  serviceLabel: string;
  answerCapsule: string;
  showLocationLink?: boolean;
}

const AGENCY_DIFFERENCES = [
  {
    title: "No Partial or Hidden Reporting — Full Weekly Stat Discussions",
    pastAgency:
      "Sent automated monthly PDFs hiding declining keywords, unindexed pages, and wasted budget behind cherry-picked impression graphs.",
    searchPrex:
      "Every Monday you receive a plain-English report and direct discussion on live Google Search Console clicks, Map Pack positions, indexed URLs, phone calls, and qualified leads.",
    icon: FileBarChart,
  },
  {
    title: "Revenue & Lead Focused — Never Vanity SEO Numbers (DA, PA, Spam Backlinks)",
    pastAgency:
      "Sold you on third-party vanity metrics like Domain Authority (DA), Page Authority (PA), and bulk low-quality backlinks that never brought a single US customer or consultation.",
    searchPrex:
      "We do not play the game of meaningless DA, PA, or toxic link packages. Every page, schema graph, and GBP update is engineered strictly to generate inbound phone calls, signed cases, and net revenue.",
    icon: TrendingUp,
  },
  {
    title: "Direct Access to Founder (5+ Years Mastery) — No Junior Hand-Off",
    pastAgency:
      "Closed the deal with a senior salesperson, then handed your account to a junior coordinator juggling 35 clients with generic templates.",
    searchPrex:
      "You work directly with Mubashar Sharif (Founder, 5+ years hands-on experience across Law Firm E-E-A-T, Technical SEO, Local Map Pack, and Ecommerce SEO). The strategist you speak with does the actual engineering.",
    icon: UserCheck,
  },
  {
    title: "7-Day Free Trial (Limited-Time Offer) & Month-to-Month Flexibility",
    pastAgency:
      "Locked you into a rigid 12-month contract and demanded six months of patience before showing any tangible technical or ranking progress.",
    searchPrex:
      "Come forward and test our work with a 7-Day Free Trial (limited-time offer), followed by month-to-month retainers backed by our 90-day money-back performance guarantee.",
    icon: Clock,
  },
];

export default function ServiceExhaustedByAgencies({
  serviceLabel,
  answerCapsule,
  showLocationLink = false,
}: ServiceExhaustedByAgenciesProps) {
  return (
    <section
      id="why-searchprex-different"
      className="border-b border-slate-200 bg-white py-16 sm:py-24 font-sans"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Semantic H2 + 45-60 Word AI Overview Answer Capsule */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-300 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
            <ShieldCheck className="h-4 w-4 text-neutral-900" aria-hidden />
            <span>Accountability · Revenue &amp; Lead Attribution</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 leading-tight">
            Exhausted by Previous SEO Agencies? See How Our {serviceLabel} Is Different
          </h2>

          <p className="mt-4 rounded-2xl border-l-4 border-l-neutral-900 bg-slate-50 p-4 text-sm sm:text-base font-semibold text-neutral-900 leading-relaxed">
            {answerCapsule}
          </p>
        </div>

        {/* 4 Agency Traps vs SearchPrex Accountable Execution Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {AGENCY_DIFFERENCES.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border-2 border-slate-200 bg-white p-6 sm:p-7 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-white shrink-0">
                    <item.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="text-lg font-black text-neutral-950 leading-snug">
                    {item.title}
                  </h3>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 mb-3">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-1">
                    <XCircle className="h-3.5 w-3.5 text-slate-400 shrink-0" aria-hidden />
                    <span>Why Previous Agencies Failed You:</span>
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.pastAgency}
                  </p>
                </div>

                <div className="rounded-xl border border-neutral-900/20 bg-slate-50/60 p-4">
                  <span className="text-[11px] font-black uppercase tracking-wider text-neutral-950 flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-neutral-900 shrink-0" aria-hidden />
                    <span>The SearchPrex Solution:</span>
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-900 font-medium leading-relaxed">
                    {item.searchPrex}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* "Why We Are Uniquely Suitable" — #1 Cleveland Ohio USA Mastery + 5+ Years Experience Strip */}
        <div className="mt-10 rounded-3xl border-2 border-neutral-900 bg-slate-50 p-6 sm:p-9">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                <Award className="h-3.5 w-3.5 text-slate-200" aria-hidden />
                <span>Why SearchPrex Is Uniquely Suitable for Your USA Growth</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-neutral-950 leading-tight">
                #1 Ranked in Cleveland, Ohio USA Local SEO Mastery &amp; 5+ Years of Deep Technical Execution
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                We do not guess what works in competitive US markets. SearchPrex holds{" "}
                <strong className="text-neutral-950">
                  #1 ranked local search authority in{" "}
                  {showLocationLink ? (
                    <Link href="/locations/ohio/cleveland" className="underline hover:text-neutral-700">
                      Cleveland, Ohio (USA)
                    </Link>
                  ) : (
                    <span>Cleveland, Ohio (USA)</span>
                  )}
                </strong>{" "}
                and brings over <strong className="text-neutral-950">5+ years of hands-on mastery</strong> across{" "}
                <Link href="/services/law-firm-seo" className="font-bold text-neutral-950 underline">
                  Law Firm SEO (YMYL &amp; Attorney E-E-A-T)
                </Link>
                ,{" "}
                <Link href="/services/local-seo" className="font-bold text-neutral-950 underline">
                  US Local Map Pack SEO
                </Link>
                ,{" "}
                <Link href="/services/ecommerce-seo" className="font-bold text-neutral-950 underline">
                  High-SKU Ecommerce SEO
                </Link>
                , and{" "}
                <Link href="/services/technical-seo" className="font-bold text-neutral-950 underline">
                  Template-Level Technical SEO
                </Link>
                . Every campaign is backed by verified{" "}
                <Link href="/case-studies" className="font-bold text-neutral-950 underline">
                  Google Search Console case studies
                </Link>{" "}
                and our interactive{" "}
                <Link href="/tools/schema-generator" className="font-bold text-neutral-950 underline">
                  Schema
                </Link>{" "}
                and{" "}
                <Link href="/tools/llms-txt-generator" className="font-bold text-neutral-950 underline">
                  llms.txt AI tools
                </Link>
                .
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="rounded-xl border border-slate-200 bg-white p-3.5">
                  <div className="text-lg font-black text-neutral-950">#1 Cleveland, OH</div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Proven USA local &amp; regional search dominance
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3.5">
                  <div className="text-lg font-black text-neutral-950">5+ Years Mastery</div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Law Firm E-E-A-T, Technical, Local &amp; Ecommerce SEO
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3.5">
                  <div className="text-lg font-black text-neutral-950">7-Day Free Trial</div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Limited-time offer · Test our work risk-free
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <p className="text-xs font-black uppercase tracking-wider text-neutral-900">
                Limited-Time Trial Offer
              </p>
              <p className="text-base font-bold text-neutral-950">
                Ready to replace vanity metrics with real leads and revenue?
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Start with our 7-Day Free Trial and 24-hour written tear-down. Zero contracts, direct access to Mubashar Sharif, and weekly Monday stat reviews.
              </p>
              <a
                href="#7-day-trial"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-5 py-3.5 text-xs sm:text-sm font-bold text-white transition hover:bg-neutral-800"
              >
                <span>Start 7-Day Free Trial</span>
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <Link
                href="/free-audit"
                className="inline-flex items-center justify-center gap-1 text-xs font-bold text-neutral-900 hover:underline pt-1"
              >
                <span>Or request a free 24-hour audit tear-down</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

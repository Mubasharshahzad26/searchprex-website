"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceExhaustedByAgenciesProps {
  serviceLabel: string;
  answerCapsule: string;
  showLocationLink?: boolean;
}

const AGENCY_DIFFERENCES = [
  {
    num: "01",
    title: "No Partial or Hidden Reporting — Full Weekly Stat Discussions",
    pastAgency:
      "Sent automated monthly PDFs hiding declining keywords, unindexed pages, and wasted budget behind cherry-picked impression graphs.",
    searchPrex:
      "Every Monday you receive a plain-English report and direct discussion on live Google Search Console clicks, Map Pack positions, indexed URLs, phone calls, and qualified leads.",
  },
  {
    num: "02",
    title: "Revenue & Lead Focused — Never Vanity SEO Numbers (DA, PA, Spam Backlinks)",
    pastAgency:
      "Sold you on third-party vanity metrics like Domain Authority (DA), Page Authority (PA), and bulk low-quality backlinks that never brought a single US customer or consultation.",
    searchPrex:
      "We do not play the game of meaningless DA, PA, or toxic link packages. Every page, schema graph, and GBP update is engineered strictly to generate inbound phone calls, signed cases, and net revenue.",
  },
  {
    num: "03",
    title: "Direct Access to Founder (5+ Years Mastery) — No Junior Hand-Off",
    pastAgency:
      "Closed the deal with a senior salesperson, then handed your account to a junior coordinator juggling 35 clients with generic templates.",
    searchPrex:
      "You work directly with Mubashar Sharif (Founder, 5+ years hands-on experience across Law Firm E-E-A-T, Technical SEO, Local Map Pack, and Ecommerce SEO). The strategist you speak with does the actual engineering.",
  },
  {
    num: "04",
    title: "7-Day Free Trial (Limited-Time Offer) & Month-to-Month Flexibility",
    pastAgency:
      "Locked you into a rigid 12-month contract and demanded six months of patience before showing any tangible technical or ranking progress.",
    searchPrex:
      "Come forward and test our work with a 7-Day Free Trial (limited-time offer), followed by month-to-month retainers backed by our 90-day money-back performance guarantee.",
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
        {/* Clean Black Bold H2 + 45-60 Word AI Overview Answer Capsule */}
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 leading-tight">
            Exhausted by Previous SEO Agencies? See How Our {serviceLabel} Is Different
          </h2>

          <p className="mt-4 rounded-xl border-l-4 border-l-neutral-950 border border-slate-200 bg-slate-50 p-4 text-sm sm:text-base font-semibold text-neutral-900 leading-relaxed">
            {answerCapsule}
          </p>
        </div>

        {/* 4 Agency Traps vs SearchPrex Accountable Execution Grid — Clean Black Numbering */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {AGENCY_DIFFERENCES.map((item) => (
            <div
              key={item.num}
              className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-950 text-xs font-black text-white shrink-0 mt-0.5">
                    {item.num}
                  </span>
                  <h3 className="text-lg font-black text-neutral-950 leading-snug">
                    {item.title}
                  </h3>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 mb-3">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-600 flex items-center gap-2 mb-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-500 shrink-0" />
                    <span>Why Previous Agencies Failed You:</span>
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.pastAgency}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-300 bg-white p-4">
                  <span className="text-[11px] font-black uppercase tracking-wider text-neutral-950 flex items-center gap-2 mb-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-950 shrink-0" />
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

        {/* Clean, Properly Titled Comparison Matrix (AEO/GEO Structured Table) */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
          <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base sm:text-lg font-black text-neutral-950">
              Comparison: SearchPrex vs. Typical SEO Agency vs. Paid Ads &amp; Directories
            </h3>
            <span className="text-xs font-semibold text-slate-500">
              ABA Model Rule 7.1 Compliant Acquisition Overview
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-white text-[11px] font-black uppercase tracking-wider text-neutral-950">
                  <th className="py-3.5 px-5 w-1/4">Evaluation Criteria</th>
                  <th className="py-3.5 px-5 w-1/4 bg-slate-50/80">SearchPrex (Founder-Led)</th>
                  <th className="py-3.5 px-5 w-1/4 text-slate-600">Typical Legal SEO Agency</th>
                  <th className="py-3.5 px-5 w-1/4 text-slate-600">Google Ads / Directories</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr>
                  <td className="py-3.5 px-5 font-bold text-neutral-950">Reporting &amp; KPIs</td>
                  <td className="py-3.5 px-5 bg-slate-50/50 font-semibold text-neutral-950">
                    Weekly Monday live GSC clicks, Map Pack calls &amp; signed consults
                  </td>
                  <td className="py-3.5 px-5">
                    Partial monthly PDFs &amp; vanity DA/PA backlink numbers
                  </td>
                  <td className="py-3.5 px-5">
                    High cost-per-click ($150–$300+) or shared directory leads
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-bold text-neutral-950">Who Does the Work</td>
                  <td className="py-3.5 px-5 bg-slate-50/50 font-semibold text-neutral-950">
                    Direct execution by Founder Mubashar Sharif (5+ years mastery)
                  </td>
                  <td className="py-3.5 px-5">
                    Sales rep closes deal; handed off to junior account coordinator
                  </td>
                  <td className="py-3.5 px-5">
                    Automated ad bidding or third-party directory listing
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-bold text-neutral-950">AI Overview &amp; ChatGPT</td>
                  <td className="py-3.5 px-5 bg-slate-50/50 font-semibold text-neutral-950">
                    45–60 word Answer Capsules, LegalService schema &amp; /llms.txt
                  </td>
                  <td className="py-3.5 px-5">
                    Generic 500-word blog posts with zero entity or AEO structure
                  </td>
                  <td className="py-3.5 px-5">
                    Zero organic AI citation equity once ad spend stops
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-bold text-neutral-950">Risk &amp; Exclusivity</td>
                  <td className="py-3.5 px-5 bg-slate-50/50 font-semibold text-neutral-950">
                    7-Day Free Trial &middot; Month-to-month &middot; 1 firm per US city
                  </td>
                  <td className="py-3.5 px-5">
                    6–12 month lock-in contracts &middot; Serves local competitors
                  </td>
                  <td className="py-3.5 px-5">
                    Leads sold to 3–5 competing attorneys in the same county
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* "Why We Are Uniquely Suitable" — Corrected Ohio #1 Ranking Claim + 5+ Years Experience Strip */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-9">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-md bg-neutral-950 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                <span>Why SearchPrex Is Uniquely Suitable for Your USA Growth</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-neutral-950 leading-tight">
                Ranked #1 on Google for &ldquo;law firm SEO Cleveland Ohio&rdquo; &amp; 5+ Years of Deep Technical Execution
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                We do not guess what works in competitive US markets. SearchPrex is{" "}
                <strong className="text-neutral-950">
                  ranked #1 on Google for{" "}
                  {showLocationLink ? (
                    <Link href="/locations/ohio/cleveland" className="underline hover:text-neutral-700">
                      &ldquo;Law Firm SEO Cleveland Ohio&rdquo;
                    </Link>
                  ) : (
                    <span>&ldquo;Law Firm SEO Cleveland Ohio&rdquo;</span>
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
                  <div className="text-lg font-black text-neutral-950">#1 on Google</div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Ranked #1 for &ldquo;Law Firm SEO Cleveland Ohio&rdquo;
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
                    Limited-time offer &middot; Test our work risk-free
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
              <p className="text-xs font-black uppercase tracking-wider text-neutral-950">
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
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 py-3.5 text-xs sm:text-sm font-bold text-white transition hover:bg-neutral-800"
              >
                <span>Start 7-Day Free Trial</span>
                <ArrowRight className="h-4 w-4 text-white" aria-hidden />
              </a>
              <Link
                href="/free-audit"
                className="inline-flex items-center justify-center gap-1 text-xs font-bold text-neutral-950 hover:underline pt-1"
              >
                <span>Or request a free 24-hour audit tear-down</span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-950" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

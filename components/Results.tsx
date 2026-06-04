"use client";
 
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, BarChart2, MapPin } from "lucide-react";
 
/* ─── Aligned with /case-studies (source of truth) + site design system ───
   Colors: green #2f9670 · purple #534AB7 · navy #0a0f2e  (NO blue)
*/
const caseStudies = [
  {
    category: "eCommerce SEO",
    location: "United States",
    icon: TrendingUp,
    iconColor: "#2f9670",
    iconBg: "#dcf2ea",
    metric: "+75%",
    metricLabel: "US Revenue Growth",
    client: "SMK Store",
    industry: "Tactical Gear · eCommerce",
    detail: "Fixed mass non-indexing across a 35,000-product catalog — thin boilerplate and failing Core Web Vitals — lifting US organic revenue, with no ad spend.",
    timeline: "2 months",
    href: "/case-studies",
    accent: "#2f9670",
  },
  {
    category: "Technical SEO",
    location: "Michigan, USA",
    icon: BarChart2,
    iconColor: "#534AB7",
    iconBg: "#EEEDFE",
    metric: "+476%",
    metricLabel: "Organic Clicks",
    client: "Michigan Outdoor Sports",
    industry: "Sports & Outdoors · eCommerce",
    detail: "Recovered from near-zero GSC visibility — sitemaps submitted, indexation blocks and crawl waste fixed, brand pages rewritten. 12,000+ pages indexed within 90 days.",
    timeline: "90 days",
    href: "/case-studies",
    accent: "#534AB7",
  },
  {
    category: "Local SEO",
    location: "United States",
    icon: MapPin,
    iconColor: "#0a0f2e",
    iconBg: "#e3e7f0",
    metric: "+5.7x",
    metricLabel: "Organic Calls",
    client: "Local HVAC Services",
    industry: "HVAC · Local Business",
    detail: "From no map pack presence and zero AI Overview visibility to a Top 3 Maps pack position and a Featured AI Overview for high-intent emergency searches.",
    timeline: "60 days",
    href: "/case-studies",
    accent: "#0a0f2e",
  },
];
 
export default function Results() {
  return (
    <section id="results" className="bg-[#eaecf3] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
 
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
        >
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#94a3b8]">
              Proven Results
            </p>
            <h2 className="text-4xl font-black text-[#0a0f2e] sm:text-5xl">
              Real Numbers. Real Clients.
            </h2>
            <p className="mt-3 text-lg text-[#5b6472]">
              We let our Google Search Console data do the talking. No fluff, just results.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="group flex flex-shrink-0 items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#2f9670] transition-colors hover:text-[#27500A]"
          >
            All Case Studies
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
 
        {/* ── Cards Grid ── */}
        <div className="grid gap-6 md:grid-cols-3">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.client}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              {/* ── Top accent line ── */}
              <div className="h-1 w-full" style={{ backgroundColor: study.accent }} />
 
              {/* ── Card body ── */}
              <div className="flex flex-1 flex-col p-7">
 
                {/* Category + location */}
                <div className="mb-6 flex items-center justify-between">
                  <span
                    className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                    style={{ backgroundColor: study.iconBg, color: study.iconColor }}
                  >
                    {study.category}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-[#94a3b8]">
                    <MapPin className="h-3 w-3" />
                    {study.location}
                  </span>
                </div>
 
                {/* ── Big metric — Toptal number style ── */}
                <div className="mb-1">
                  <p
                    className="text-6xl font-black leading-none tracking-tight"
                    style={{ color: study.accent }}
                  >
                    {study.metric}
                  </p>
                </div>
                <p className="mb-6 text-sm font-semibold text-[#5b6472]">
                  {study.metricLabel}
                </p>
 
                {/* Divider */}
                <div className="mb-5 border-t border-[#f1f5f9]" />
 
                {/* Client info */}
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-xs font-black"
                    style={{ backgroundColor: study.iconBg, color: study.iconColor }}
                  >
                    {study.client.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-black text-[#0a0f2e]">{study.client}</p>
                    <p className="text-[11px] text-[#94a3b8]">{study.industry}</p>
                  </div>
                </div>
 
                {/* Detail */}
                <p className="mb-5 flex-1 text-sm leading-relaxed text-[#5b6472]">
                  {study.detail}
                </p>
 
                {/* Timeline + CTA */}
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-[#e5e7eb] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">
                    {study.timeline}
                  </span>
                  <Link
                    href={study.href}
                    className="group/link flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-colors"
                    style={{ color: study.accent }}
                  >
                    Read Case Study
                    <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
 
              </div>
            </motion.div>
          ))}
        </div>
 
        {/* ── Bottom CTA bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#e5e7eb] bg-white px-8 py-6 sm:flex-row"
        >
          <div>
            <p className="font-black text-[#0a0f2e]">Want results like these?</p>
            <p className="text-sm text-[#5b6472]">Book a free 30-min strategy call — no commitment required.</p>
          </div>
          <Link
            href="/free-audit"
            className="flex-shrink-0 rounded-xl px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-all hover:-translate-y-0.5"
            style={{ backgroundColor: "#3eb489" }}
          >
            Get Free SEO Audit
          </Link>
        </motion.div>
 
      </div>
    </section>
  );
}
 
































































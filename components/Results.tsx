"use client";
 
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, BarChart2, MapPin } from "lucide-react";
 
const caseStudies = [
  {
    category: "eCommerce SEO",
    location: "United States",
    icon: TrendingUp,
    iconColor: "#1a3c8f",
    iconBg: "#e6eeff",
    metric: "+75%",
    metricLabel: "Revenue Increase",
    client: "SMK Store",
    industry: "Tactical Gear · eCommerce",
    detail: "Monthly sales grew from $300 to $525 in just 2 months through product page optimization and technical SEO fixes.",
    timeline: "2 months",
    href: "/case-studies",
    accent: "#1a3c8f",
  },
  {
    category: "Technical SEO",
    location: "Michigan, USA",
    icon: BarChart2,
    iconColor: "#2563eb",
    iconBg: "#dbeafe",
    metric: "+285%",
    metricLabel: "Indexed Pages Growth",
    client: "Michigan Sports Outdoor",
    industry: "Sports & Outdoors · eCommerce",
    detail: "Grew indexed pages from 7,000 to 27,000 in 1.5 months by resolving crawl budget and indexation issues.",
    timeline: "1.5 months",
    href: "/case-studies",
    accent: "#2563eb",
  },
  {
    category: "Local SEO",
    location: "Simi Valley, CA",
    icon: MapPin,
    iconColor: "#534AB7",
    iconBg: "#EEEDFE",
    metric: "53",
    metricLabel: "Daily Organic Users",
    client: "HVAC Services Team",
    industry: "HVAC · Local Business",
    detail: "Scaled from zero to 1,500+ monthly impressions and secured an AI Overview appearance within 60 days.",
    timeline: "60 days",
    href: "/case-studies",
    accent: "#534AB7",
  },
];
 
export default function Results() {
  return (
    <section id="results" className="bg-[#eeeef5] py-24">
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
            <p className="mt-3 text-lg text-[#64748b]">
              We let our tracking data do the talking. No fluff, just results.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="group flex flex-shrink-0 items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#2563eb] transition-colors hover:text-[#1a3c8f]"
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
                <p className="mb-6 text-sm font-semibold text-[#64748b]">
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
                <p className="mb-5 flex-1 text-sm leading-relaxed text-[#64748b]">
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
            <p className="text-sm text-[#64748b]">Book a free 30-min strategy call — no commitment required.</p>
          </div>
          <Link
            href="#cta"
            className="flex-shrink-0 rounded-xl bg-[#0a0f2e] px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[#1a3c8f]"
          >
            Get Free SEO Audit
          </Link>
        </motion.div>
 
      </div>
    </section>
  );
}
 









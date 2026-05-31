"use client";
 
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Scale, ShoppingCart, MapPin, ClipboardCheck,
  TrendingUp, CheckCircle, ArrowRight, Calendar, ArrowUpRight
} from "lucide-react";
 
/* Toptal green accent */
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
 
const services = [
  {
    num: "01",
    icon: Scale,
    iconBg: "#EEEDFE",
    iconColor: "#534AB7",
    accentColor: "#534AB7",
    kpiBg: "#EEEDFE",
    kpiBorder: "#AFA9EC",
    kpiColor: "#3C3489",
    kpi: "+320% leads",
    title: "Law Firm SEO",
    niche: "Dallas, TX · Family law · Personal injury · Criminal defense",
    desc: "We rank Dallas and Texas law firms for high-intent searches like \"personal injury lawyer Dallas\" that bring qualified consultations — not just traffic. Attorney-specific E-E-A-T content built to Google's legal YMYL standards.",
    features: [
      "Practice-area & city landing page optimization",
      "Google Business Profile & local map pack ranking",
      "Attorney credential E-E-A-T & legal schema",
    ],
    tags: ["Local SEO", "E-E-A-T", "Maps pack"],
    href: "/services/law-firm-seo",
  },
  {
    num: "02",
    icon: ShoppingCart,
    iconBg: "#E1F5EE",
    iconColor: "#0F6E56",
    accentColor: GREEN,
    kpiBg: "#E1F5EE",
    kpiBorder: "#5DCAA5",
    kpiColor: "#085041",
    kpi: "+285% indexed",
    title: "Ecommerce & Shopify SEO",
    niche: "DTC brands · Online retailers · Shopify & WooCommerce stores",
    desc: "We fix mass non-indexing, duplicate boilerplate content, and Core Web Vitals holding thousands of product pages back. Proven on 35,000+ SKU catalogs — real results, not theory.",
    features: [
      "Crawl budget optimization at scale (10K+ pages)",
      "Unique product page content rewriting",
      "Collection page keyword mapping & product schema",
    ],
    tags: ["Shopify", "Core Web Vitals", "Schema"],
    href: "/services/ecommerce-seo",
  },
  {
    num: "03",
    icon: MapPin,
    iconBg: "#E6F1FB",
    iconColor: "#185FA5",
    accentColor: "#185FA5",
    kpiBg: "#E6F1FB",
    kpiBorder: "#85B7EB",
    kpiColor: "#0C447C",
    kpi: "Top 3 maps",
    title: "Local SEO",
    niche: "HVAC · Plumbers · Restaurants · Clinics · Contractors",
    desc: "We dominate Google Maps and the local pack in your city — capturing \"near me\" and AI Overview placements. Built for US service businesses targeting specific geographic areas.",
    features: [
      "Google Business Profile optimization & weekly posts",
      "50+ local citation building & NAP consistency",
      "Review generation & local landing pages",
    ],
    tags: ["Maps pack", "Citations", "Near me"],
    href: "/services/local-seo",
  },
  {
    num: "04",
    icon: ClipboardCheck,
    iconBg: "#FAEEDA",
    iconColor: "#854F0B",
    accentColor: "#BA7517",
    kpiBg: "#FAEEDA",
    kpiBorder: "#EF9F27",
    kpiColor: "#633806",
    kpi: "5-day delivery",
    title: "Technical SEO Audit",
    niche: "Any website · One-time engagement",
    desc: "A deep technical audit with a prioritized fix list — crawl budget, Core Web Vitals, indexation issues, and site architecture. Includes a recorded video walkthrough so you know exactly what to fix first.",
    features: [
      "Screaming Frog + GSC + log-file deep analysis",
      "Prioritized issue list (P1 / P2 / P3)",
      "Recorded video walkthrough included",
    ],
    tags: ["Crawl audit", "GSC", "CWV"],
    href: "/services/technical-seo",
  },
];
 
export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);
 
  return (
    <section className="py-24 bg-[#eaecf3]" id="services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
 
        {/* ── Header ── */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-[#e2e8f0] rounded-full px-4 py-2 mb-5 shadow-sm">
            <TrendingUp className="h-3.5 w-3.5" style={{ color: GREEN }} />
            <span className="text-xs font-bold text-[#0a0f2e] uppercase tracking-widest">SEO Services</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-[#0a0f2e] leading-[1.05] mb-5 tracking-tight">
            Specialized SEO that<br className="hidden sm:block" />
            <span style={{ color: GREEN }}>moves the needle</span>
          </h2>
          <p className="text-[#475569] text-lg max-w-2xl mx-auto leading-relaxed">
            Founder-led, senior-executed SEO for US law firms, ecommerce stores, and local businesses.
            No account managers. No templates. No outsourcing — just measurable growth.
          </p>
        </div>
 
        {/* ── 4 Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group relative rounded-3xl border border-[#e2e8f0] bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-12px_rgba(10,15,46,0.18)] flex flex-col"
            >
              {/* Card head */}
              <div className="p-7 pb-5">
                {/* Number + arrow */}
                <div className="flex items-center justify-between mb-5">
                  <p className="text-[11px] font-bold text-[#94a3b8] tracking-[0.2em] uppercase">
                    {s.num} <span className="text-[#cbd5e1]">/ 04</span>
                  </p>
                  <Link
                    href={s.href}
                    className="h-9 w-9 rounded-full flex items-center justify-center border border-[#e2e8f0] transition-all duration-200 flex-shrink-0"
                    style={hovered === i ? { background: s.accentColor, borderColor: s.accentColor } : {}}
                    aria-label={`Learn more about ${s.title}`}
                  >
                    <ArrowUpRight
                      className="h-4 w-4 transition-colors duration-200"
                      style={{ color: hovered === i ? "#fff" : "#94a3b8" }}
                    />
                  </Link>
                </div>
 
                {/* Icon + KPI row */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="h-14 w-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: s.iconBg }}
                  >
                    <s.icon className="h-6 w-6" style={{ color: s.iconColor }} />
                  </div>
                  <div
                    className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold border"
                    style={{ background: s.kpiBg, borderColor: s.kpiBorder, color: s.kpiColor }}
                  >
                    <TrendingUp className="h-3 w-3" />
                    {s.kpi}
                  </div>
                </div>
 
                {/* Title + niche */}
                <h3 className="text-xl font-black text-[#0a0f2e] mb-1.5 tracking-tight">{s.title}</h3>
                <p className="text-xs text-[#94a3b8] mb-3.5 font-semibold uppercase tracking-wide">{s.niche}</p>
 
                {/* Description */}
                <p className="text-sm text-[#475569] leading-relaxed">{s.desc}</p>
              </div>
 
              {/* Features */}
              <ul className="px-7 py-5 space-y-2.5 flex-1 border-t border-[#f1f5f9]">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[#475569]">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: GREEN }} />
                    {f}
                  </li>
                ))}
              </ul>
 
              {/* Footer */}
              <div className="border-t border-[#f1f5f9] px-7 py-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold bg-[#f8f9fc] border border-[#e5e7eb] text-[#64748b] px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={s.href}
                  className="text-xs font-bold flex items-center gap-1 transition-all hover:gap-1.5 flex-shrink-0 ml-2"
                  style={{ color: s.accentColor }}
                >
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
 
        {/* ── Bottom CTA Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-3xl bg-[#0a0f2e] px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-5"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
              <span className="text-white font-black text-lg">M</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm sm:text-base">
                Not sure which service fits your business?
              </p>
              <p className="text-blue-300 text-xs sm:text-sm mt-0.5">
                Book a free 30-min call — Mubashar will tell you exactly what you need.
              </p>
            </div>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <a
              href="https://calendly.com/contact-searchprex/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 font-bold px-6 py-3 rounded-xl transition-colors text-sm text-white"
              style={{ background: GREEN }}
              onMouseEnter={(e) => (e.currentTarget.style.background = GREEN_DARK)}
              onMouseLeave={(e) => (e.currentTarget.style.background = GREEN)}
            >
              <Calendar className="h-4 w-4" />
              Book free call
            </a>
            <Link
              href="/case-studies"
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 border border-white/20 hover:border-white text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              View results
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
 
      </div>
    </section>
  );
}
 






























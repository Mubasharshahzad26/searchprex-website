"use client";
 
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Scale, ShoppingCart, MapPin, ClipboardCheck,
  TrendingUp, CheckCircle, ArrowRight, Calendar
} from "lucide-react";
 
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
    niche: "Family law · Personal injury · Criminal defense",
    desc: "Rank for high-intent searches that bring qualified consultations — not just traffic. Attorney-specific E-E-A-T content strategy included.",
    features: [
      "Practice area page optimization",
      "Google Business Profile management",
      "Attorney credential E-E-A-T content",
    ],
    tags: ["Local SEO", "E-E-A-T", "Maps pack"],
    href: "/services/law-firm-seo",
  },
  {
    num: "02",
    icon: ShoppingCart,
    iconBg: "#E1F5EE",
    iconColor: "#0F6E56",
    accentColor: "#1D9E75",
    kpiBg: "#E1F5EE",
    kpiBorder: "#5DCAA5",
    kpiColor: "#085041",
    kpi: "+285% indexed",
    title: "Shopify & E-commerce SEO",
    niche: "DTC brands · Online retailers · Shopify stores",
    desc: "Fix mass non-indexing, duplicate content, and Core Web Vitals holding your product pages back from ranking at scale.",
    features: [
      "Crawl budget optimization at scale",
      "Product page content rewriting",
      "Collection page keyword mapping",
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
    niche: "HVAC · Plumbers · Restaurants · Clinics",
    desc: "Dominate Google Maps and local packs in your city. Built for service businesses targeting specific geographic areas.",
    features: [
      "GBP optimization & weekly posts",
      "50+ local citation building",
      "Review generation strategy",
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
    desc: "Deep technical audit with a prioritized fix list — crawl budget, Core Web Vitals, indexation issues, and site architecture.",
    features: [
      "Screaming Frog + GSC deep analysis",
      "Prioritized issue list (P1/P2/P3)",
      "Video walkthrough included",
    ],
    tags: ["Crawl audit", "GSC", "CWV"],
    href: "/services/technical-seo",
  },
];
 
export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);
 
  return (
    <section className="py-20 bg-white" id="services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
 
        {/* ── Header ── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#EEEDFE] border border-[#AFA9EC] rounded-full px-4 py-2 mb-4">
            <TrendingUp className="h-3.5 w-3.5 text-[#534AB7]" />
            <span className="text-xs font-bold text-[#534AB7] uppercase tracking-widest">Our Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0a0f2e] leading-tight mb-4">
            SEO that actually <span className="text-[#534AB7]">moves the needle</span>
          </h2>
          <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
            Founder-led, senior-executed. No account managers. No templates. Just results.
          </p>
        </div>
 
        {/* ── 4 Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative rounded-2xl border border-[#e5e7eb] bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#534AB7]/40 flex flex-col"
            >
              {/* Top accent bar */}
              <div
                className="h-1 w-full flex-shrink-0"
                style={{ background: s.accentColor }}
              />
 
              {/* Card head */}
              <div className="p-6 pb-4">
                {/* Number */}
                <p className="text-[10px] font-semibold text-[#94a3b8] tracking-widest mb-4 uppercase">
                  {s.num} / 04
                </p>
 
                {/* Icon + KPI row */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: s.iconBg }}
                  >
                    <s.icon className="h-5 w-5" style={{ color: s.iconColor }} />
                  </div>
                  <div
                    className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold border"
                    style={{
                      background: s.kpiBg,
                      borderColor: s.kpiBorder,
                      color: s.kpiColor,
                    }}
                  >
                    <TrendingUp className="h-3 w-3" />
                    {s.kpi}
                  </div>
                </div>
 
                {/* Title + niche */}
                <h3 className="text-lg font-black text-[#0a0f2e] mb-1">{s.title}</h3>
                <p className="text-xs text-[#94a3b8] mb-3 font-medium">{s.niche}</p>
 
                {/* Description */}
                <p className="text-sm text-[#64748b] leading-relaxed">{s.desc}</p>
              </div>
 
              {/* Features */}
              <div className="border-t border-[#f1f5f9] mx-6" />
              <ul className="px-6 py-4 space-y-2 flex-1">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-xs text-[#64748b]">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
 
              {/* Footer */}
              <div className="border-t border-[#f1f5f9] px-6 py-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium bg-[#f8f9fc] border border-[#e5e7eb] text-[#64748b] px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={s.href}
                  className="h-9 w-9 rounded-full flex items-center justify-center border border-[#e5e7eb] transition-all duration-200 flex-shrink-0 ml-2"
                  style={
                    hovered === i
                      ? { background: s.accentColor, borderColor: s.accentColor }
                      : {}
                  }
                >
                  <ArrowRight
                    className="h-4 w-4 transition-colors duration-200"
                    style={{ color: hovered === i ? "#fff" : "#64748b" }}
                  />
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
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-2xl bg-[#0a0f2e] px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-5"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-[#EEEDFE] flex items-center justify-center flex-shrink-0">
              <span className="text-[#534AB7] font-black text-lg">M</span>
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
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#534AB7] hover:bg-[#3d35a0] text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              <Calendar className="h-4 w-4" />
              Book free call
            </a>
            <Link
              href="#results"
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
 














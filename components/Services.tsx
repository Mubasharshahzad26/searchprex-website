"use client";
 
import { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Scale, ShoppingCart, MapPin, ClipboardCheck,
  TrendingUp, CheckCircle, ArrowRight, Calendar
} from "lucide-react";
 
/* Brand accents */
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
const NAVY = "#0a0f2e";
 
/* Uniform, professional — one consistent scheme across every card */
const services = [
  {
    num: "01",
    icon: Scale,
    kpi: "+320% leads",
    title: "Law Firm SEO",
    niche: "Family law · Personal injury · Criminal defense",
    desc: "We rank US law firms for high-intent searches like \"personal injury lawyer near me\" that bring qualified consultations — not just traffic. Attorney-specific E-E-A-T content built to Google's legal YMYL standards.",
    features: [
      "Practice-area & city landing page optimization",
      "Google Business Profile & local map pack ranking",
      "Attorney credential E-E-A-T & legal schema",
    ],
    tags: ["Local SEO", "E-E-A-T", "Maps pack"],
    href: "/services/law-firm-seo",
    popup: {
      title: "Done with $300 PPC clicks?",
      sub: "Rank for high-intent legal searches organically — and own the map pack.",
      cta: "Rank my firm",
    },
  },
  {
    num: "02",
    icon: ShoppingCart,
    kpi: "+285% indexed",
    title: "Ecommerce & Shopify SEO",
    niche: "DTC brands · Online retailers · Shopify & WooCommerce",
    desc: "We fix mass non-indexing, duplicate boilerplate content, and Core Web Vitals holding thousands of product pages back. Proven on 35,000+ SKU catalogs — real results, not theory.",
    features: [
      "Crawl budget optimization at scale (10K+ pages)",
      "Unique product page content rewriting",
      "Collection page keyword mapping & product schema",
    ],
    tags: ["Shopify", "Core Web Vitals", "Schema"],
    href: "/services/ecommerce-seo",
    popup: {
      title: "Burning cash on Shopping ads?",
      sub: "Get thousands of products indexed and ranking — traffic that compounds.",
      cta: "Index & rank",
    },
  },
  {
    num: "03",
    icon: MapPin,
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
    popup: {
      title: "Paying for every \"near me\" lead?",
      sub: "Own the Google Maps pack and win calls organically — 24/7.",
      cta: "Own local",
    },
  },
  {
    num: "04",
    icon: ClipboardCheck,
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
    popup: {
      title: "Pages not indexing or ranking?",
      sub: "Get a prioritized 5-day fix list — know exactly what's broken.",
      cta: "Get my audit",
    },
  },
];
 
export default function Services() {
  const [prompt, setPrompt] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
 
  const handleEnter = (i: number) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setPrompt(i), 3000); // popup after 3s of hover
  };
  const handleLeave = () => {
    if (timer.current) clearTimeout(timer.current);
    setPrompt(null);
  };
 
  return (
    <section className="bg-[#eaecf3] py-24" id="services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
 
        {/* ── Header ── */}
        <div className="mb-16 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-4 py-2 shadow-sm">
            <TrendingUp className="h-3.5 w-3.5" style={{ color: GREEN }} />
            <span className="text-xs font-bold uppercase tracking-widest text-[#0a0f2e]">SEO Services</span>
          </div>
          <h2 className="mb-5 text-4xl font-black leading-[1.05] tracking-tight text-[#0a0f2e] sm:text-5xl">
            Specialized SEO that<br className="hidden sm:block" />
            <span style={{ color: GREEN }}>moves the needle</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#475569]">
            Founder-led, senior-executed SEO for US law firms, ecommerce stores, and local businesses.
            No account managers. No templates. No outsourcing — just measurable growth.
          </p>
        </div>
 
        {/* ── 4 Cards Grid ── */}
        <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={handleLeave}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#e6e8ef] bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-transparent hover:bg-[#0a0f2e] hover:shadow-[0_30px_70px_-20px_rgba(10,15,46,0.45)]"
            >
              {/* Hover accent bar (slides in) */}
              <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[#3eb489] transition-transform duration-300 group-hover:scale-x-100" />
 
              {/* Faint number watermark */}
              <span
                className="pointer-events-none absolute right-6 top-4 select-none text-7xl font-black leading-none text-[#0a0f2e] opacity-[0.05] transition-all duration-300 group-hover:text-white group-hover:opacity-10"
                aria-hidden="true"
              >
                {s.num}
              </span>
 
              {/* Icon + KPI */}
              <div className="relative flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef1f7] transition-all duration-300 group-hover:scale-110 group-hover:bg-white/10">
                  <s.icon className="h-6 w-6 text-[#0a0f2e] transition-colors duration-300 group-hover:text-white" />
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-[#dde2ec] bg-[#eef1f7] px-3 py-1.5 text-xs font-bold text-[#0a0f2e] transition-colors duration-300 group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white">
                  <TrendingUp className="h-3 w-3" />
                  {s.kpi}
                </div>
              </div>
 
              {/* Title + niche */}
              <h3 className="relative mt-6 text-2xl font-black tracking-tight text-[#0a0f2e] transition-colors duration-300 group-hover:text-white">{s.title}</h3>
              <p className="relative mt-2 text-[11px] font-bold uppercase tracking-widest text-[#94a3b8] transition-colors duration-300 group-hover:text-white/50">{s.niche}</p>
 
              {/* Description */}
              <p className="relative mt-4 text-sm leading-relaxed text-[#475569] transition-colors duration-300 group-hover:text-white/70">{s.desc}</p>
 
              {/* Features */}
              <ul className="relative mt-6 space-y-2.5 border-t border-[#f1f5f9] pt-6 transition-colors duration-300 group-hover:border-white/10">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[#475569] transition-colors duration-300 group-hover:text-white/80">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: GREEN }} />
                    {f}
                  </li>
                ))}
              </ul>
 
              {/* Footer: tags + per-service link */}
              <div className="relative mt-6 flex items-center justify-between gap-2 border-t border-[#f1f5f9] pt-5 transition-colors duration-300 group-hover:border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-[#e5e7eb] bg-[#f8f9fc] px-2.5 py-1 text-[10px] font-semibold text-[#64748b] transition-colors duration-300 group-hover:border-white/15 group-hover:bg-white/5 group-hover:text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={s.href}
                  className="flex flex-shrink-0 items-center gap-1 text-xs font-bold text-[#0a0f2e] transition-all duration-300 hover:gap-1.5 group-hover:text-[#3eb489]"
                >
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
 
              {/* Delayed popup (appears after 3s of hover) — unique per service */}
              <div
                className={`absolute inset-x-4 bottom-4 z-20 flex items-center gap-3 rounded-2xl bg-[#3eb489] p-4 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.5)] transition-all duration-500 ${
                  prompt === i ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
                }`}
              >
                <div className="min-w-0">
                  <p className="text-sm font-black leading-snug text-white">{s.popup.title}</p>
                  <p className="mt-0.5 text-xs text-white/90">{s.popup.sub}</p>
                </div>
                <Link
                  href={s.href}
                  className="flex-shrink-0 rounded-lg bg-white px-3 py-2 text-xs font-black text-[#0a0f2e] transition-transform hover:scale-105"
                >
                  {s.popup.cta}
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
          className="flex flex-col items-center justify-between gap-5 rounded-3xl bg-[#0a0f2e] px-8 py-7 lg:flex-row"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/10">
              <span className="text-lg font-black text-white">M</span>
            </div>
            <div>
              <p className="text-sm font-bold text-white sm:text-base">
                Not sure which service fits your business?
              </p>
              <p className="mt-0.5 text-xs text-white/60 sm:text-sm">
                Book a free 30-min call — Mubashar will tell you exactly what you need.
              </p>
            </div>
          </div>
          <div className="flex w-full flex-wrap gap-3 sm:w-auto sm:flex-nowrap">
            <a
              href="https://calendly.com/contact-searchprex/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition-colors sm:flex-none"
              style={{ background: GREEN }}
              onMouseEnter={(e) => (e.currentTarget.style.background = GREEN_DARK)}
              onMouseLeave={(e) => (e.currentTarget.style.background = GREEN)}
            >
              <Calendar className="h-4 w-4" />
              Book free call
            </a>
            <Link
              href="/services"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition-colors hover:border-white sm:flex-none"
            >
              All services
            </Link>
            <Link
              href="/case-studies"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition-colors hover:border-white sm:flex-none"
            >
              View case studies
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
 
      </div>
    </section>
  );
}
 
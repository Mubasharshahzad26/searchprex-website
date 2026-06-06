"use client";
 
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
 
const PURPLE = "#534AB7";
const GREEN = "#3eb489";
 
/* Ranges LOCKED to /pricing page (source of truth) */
const plans = [
  {
    niche: "Local SEO",
    range: "$800 – $1,500",
    best: "Local service businesses",
    includes: ["GBP & map pack", "Citations & NAP", "Local content"],
    accent: "#0e7490",
    bg: "#ecfeff",
  },
  {
    niche: "Law Firm SEO",
    range: "$1,200 – $2,500",
    best: "Solo to multi-partner firms",
    includes: ["Practice-area pages", "E-E-A-T content", "Local pack targeting"],
    accent: PURPLE,
    bg: "#f5f3ff",
    featured: true,
  },
  {
    niche: "Ecommerce SEO",
    range: "$1,500 – $4,000",
    best: "Shopify & WooCommerce stores",
    includes: ["Technical SEO at scale", "Product page content", "Schema & indexing"],
    accent: "#2f9670",
    bg: "#dcf2ea",
  },
];
 
export default function Pricing() {
  return (
    <section id="pricing" className="bg-[#eaecf3] py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
 
        {/* Header — meaningful, specific */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-[#f5f3ff] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#534AB7]">
            Pricing
          </span>
          <h2 className="mb-4 text-4xl font-black tracking-tight text-[#0a0f2e] sm:text-5xl">
            Custom pricing, <span style={{ color: PURPLE }}>built around your goals</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#475569]">
            No fixed tiers. We set your exact plan after a free audit — here&apos;s a realistic monthly ballpark by service.
          </p>
        </motion.div>
 
        {/* 3 concise range cards */}
        <div className="grid gap-6 sm:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={p.niche}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl border-2 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                p.featured ? "border-[#534AB7] shadow-lg shadow-[#534AB7]/10" : "border-[#e2e8f0]"
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-[#534AB7] px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                    Most popular
                  </span>
                </div>
              )}
              <span className="rounded-lg px-3 py-1 text-xs font-bold" style={{ backgroundColor: p.bg, color: p.accent }}>
                {p.niche}
              </span>
              <div className="mt-4 text-2xl font-black text-[#0a0f2e]">
                {p.range}<span className="text-sm font-bold text-[#94a3b8]"> / mo</span>
              </div>
              <p className="mb-5 mt-1 text-xs text-[#64748b]">Best for: {p.best}</p>
              <ul className="mb-6 space-y-2">
                {p.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#374151]">
                    <Check className="h-4 w-4 shrink-0" style={{ color: p.accent }} />{item}
                  </li>
                ))}
              </ul>
              <Link
                href="/free-audit"
                className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5"
                style={p.featured ? { backgroundColor: PURPLE, color: "#fff" } : { backgroundColor: p.bg, color: p.accent }}
              >
                Get custom quote <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
 
        {/* Link to full pricing page — keeps homepage concise */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 text-sm font-bold transition-all hover:gap-2.5"
            style={{ color: PURPLE }}
          >
            See what&apos;s included, our process &amp; FAQs <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-2 text-xs text-[#94a3b8]">Final pricing is set after your free audit · no contracts</p>
        </motion.div>
 
      </div>
    </section>
  );
}
 
































































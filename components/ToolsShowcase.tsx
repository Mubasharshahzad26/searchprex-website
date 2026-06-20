"use client";
 
import Link from "next/link";
import { motion } from "framer-motion";
import { Radar, Scale, Sparkles, Calculator, FileText, Search, ArrowRight } from "lucide-react";
 
/* ─── Brand palette (matches Hero / homepage) ─── */
const PURPLE = "#534AB7";
const GREEN = "#3eb489";
const CHARCOAL = "#1c1c24";
const BODY = "#5b6472";
 
type Tool = {
  name: string;
  href: string;
  desc: string;
  icon: typeof Search;
  tag?: string;
  feature?: boolean;
  accent: string;
};
 
/* Order matters for the bento: feature cards (span-2) sit first in each row */
const TOOLS: Tool[] = [
  {
    name: "AI Visibility Checker",
    href: "/ai-visibility",
    desc: "See if ChatGPT, Perplexity & Google AI Overviews recommend your firm — and exactly how to get cited.",
    icon: Radar,
    tag: "AEO",
    feature: true,
    accent: PURPLE,
  },
  { name: "AI Search", href: "/ai-search", desc: "Instant, grounded answers to any SEO question.", icon: Sparkles, accent: PURPLE },
  { name: "Lost Case Calculator", href: "/case-calculator", desc: "See the revenue your firm leaks from SEO & intake gaps.", icon: Calculator, accent: GREEN },
  {
    name: "AI Intake Assistant",
    href: "/intake-assistant",
    desc: "A 24/7 assistant that captures & qualifies every lead in seconds — so you never miss a case.",
    icon: Scale,
    tag: "New",
    feature: true,
    accent: GREEN,
  },
  { name: "AI Content Suite", href: "/content-generator", desc: "Generate people-first, E-E-A-T content at scale.", icon: FileText, accent: PURPLE },
  { name: "Keyword Magic Tool", href: "/nicheseopro", desc: "Real keyword volume & difficulty from live data.", icon: Search, accent: GREEN },
];
 
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
 
export default function ToolsShowcase() {
  return (
    <section className="bg-[#f7f8fc] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12 text-center">
          <motion.span
            variants={fadeUp}
            className="mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
            style={{ background: "rgba(83,74,183,0.1)", color: PURPLE }}
          >
            <Sparkles className="h-3.5 w-3.5" /> Free tools · No signup
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl" style={{ color: CHARCOAL }}>
            An AI Toolkit Most Agencies<br />Can&apos;t Even Offer
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-2xl text-base leading-relaxed" style={{ color: BODY }}>
            Built in-house by SearchPrex — the same AI tools we use to win SEO and AI-search visibility for our clients. Free, no login required.
          </motion.p>
        </motion.div>
 
        {/* Bento grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TOOLS.map((t) => {
            const Icon = t.icon;
            return (
              <motion.div key={t.name} variants={fadeUp} className={t.feature ? "lg:col-span-2" : "lg:col-span-1"}>
                <Link
                  href={t.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#e8eaf0] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* soft accent glow on hover */}
                  <span
                    className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20"
                    style={{ background: t.accent }}
                  />
 
                  <div className="relative flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: `${t.accent}1a` }}>
                      <Icon className="h-5 w-5" style={{ color: t.accent }} />
                    </div>
                    {t.tag && (
                      <span
                        className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                        style={{ background: `${t.accent}1a`, color: t.accent }}
                      >
                        {t.tag}
                      </span>
                    )}
                  </div>
 
                  <h3 className="relative mt-4 text-lg font-black" style={{ color: CHARCOAL }}>
                    {t.name}
                  </h3>
                  <p className="relative mt-1.5 flex-1 text-sm leading-relaxed" style={{ color: BODY }}>
                    {t.desc}
                  </p>
 
                  <span
                    className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-bold transition-all group-hover:gap-2.5"
                    style={{ color: t.accent }}
                  >
                    Try it free <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
 
        {/* Footer link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 text-center"
        >
          <Link href="/tools" className="inline-flex items-center gap-2 text-sm font-bold transition-all hover:gap-3" style={{ color: PURPLE }}>
            View all tools <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
 
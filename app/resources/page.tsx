
"use client";
 
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText, BookOpen, GraduationCap, Newspaper,
  ArrowRight, Clock, ExternalLink, Sparkles,
} from "lucide-react";
 
/* ─── THEME ─── */
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
const PURPLE = "#534AB7";
 
/* ─── RESOURCE CATEGORIES ─── */
const categories = [
  {
    icon: FileText,
    title: "White Papers",
    desc: "In-depth, data-backed reports on SEO strategy, technical audits, and ranking systems — built from real client work.",
    status: "coming",
    href: null,
  },
  {
    icon: BookOpen,
    title: "Research & Guides",
    desc: "Original research, step-by-step guides, and frameworks covering technical SEO, E-E-A-T, AI Overviews, and GEO.",
    status: "coming",
    href: null,
  },
  {
    icon: GraduationCap,
    title: "What I'm Learning",
    desc: "First-hand experiments, test results, and lessons from optimizing real sites — what actually moves rankings in 2026.",
    status: "coming",
    href: null,
  },
  {
    icon: Newspaper,
    title: "Latest SEO News",
    desc: "Curated, plain-English breakdowns of Google core updates, algorithm shifts, and AI-search changes that affect your site.",
    status: "live",
    href: "/resources/news",
  },
];
 
/* ─── FEATURED (real, published) ─── */
const featured = {
  title: "Best Time to Install a New AC Near Me — California 2026",
  type: "Published Article",
  desc: "A full, first-hand SEO content piece written and published for a real client — ranking for high-intent local search.",
  href: "https://www.hvacservicesteam.com/blog/best-time-to-install-a-new-ac-near-me-california-2026",
};
 
/* ─── MOTION ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
 
export default function ResourcesPage() {
  return (
    <main className="bg-[#eaecf3]">
 
      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-[#d4d8e3] bg-[#eaecf3] pt-28 pb-14">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#64748b] transition-colors hover:text-[#534AB7]">
            ← Back to Home
          </Link>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(62,180,137,0.12)", color: GREEN_DARK }}>
            <Sparkles className="h-3.5 w-3.5" /> Resources
          </span>
          <h1 className="mb-4 text-4xl font-black tracking-tight text-[#0a0f2e] sm:text-5xl">
            SEO Resources &amp; Insights
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-[#475569] leading-relaxed">
            White papers, original research, real-world learnings, and curated industry news — everything to help you win in search and AI-powered results.
          </p>
        </div>
      </section>
 
      {/* ── FEATURED (real published work) ── */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.a
            href={featured.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group block overflow-hidden rounded-2xl border border-[#e2e8f0] bg-gradient-to-br from-[#0a0f2e] to-[#1a2150] p-8 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white/80">
              <FileText className="h-3 w-3" /> {featured.type}
            </span>
            <h2 className="mb-2 text-2xl font-black text-white">{featured.title}</h2>
            <p className="mb-4 max-w-2xl text-sm leading-relaxed text-white/60">{featured.desc}</p>
            <span className="inline-flex items-center gap-1.5 text-sm font-bold transition-all group-hover:gap-2.5" style={{ color: GREEN }}>
              Read the published article <ExternalLink className="h-3.5 w-3.5" />
            </span>
          </motion.a>
        </div>
      </section>
 
      {/* ── CATEGORIES GRID ── */}
      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-5 sm:grid-cols-2"
          >
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isLive = cat.status === "live";
              const inner = (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: "rgba(62,180,137,0.12)" }}>
                      <Icon className="h-5 w-5" style={{ color: GREEN_DARK }} />
                    </div>
                    {isLive ? (
                      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: "rgba(62,180,137,0.12)", color: GREEN_DARK }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} /> Live
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#f1f5f9] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#94a3b8]">
                        <Clock className="h-3 w-3" /> Coming Soon
                      </span>
                    )}
                  </div>
                  <h3 className="mb-2 text-lg font-black text-[#0a0f2e]">{cat.title}</h3>
                  <p className="text-sm leading-relaxed text-[#64748b]">{cat.desc}</p>
                  {isLive && (
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold transition-all group-hover:gap-2.5" style={{ color: GREEN_DARK }}>
                      Browse news <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </>
              );
              return cat.href ? (
                <motion.div key={cat.title} variants={fadeUp}>
                  <Link href={cat.href} className="group block h-full rounded-2xl border border-[#e2e8f0] bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#3eb489] hover:shadow-lg">
                    {inner}
                  </Link>
                </motion.div>
              ) : (
                <motion.div key={cat.title} variants={fadeUp} className="h-full rounded-2xl border border-[#e2e8f0] bg-white p-6 opacity-90">
                  {inner}
                </motion.div>
              );
            })}
          </motion.div>
 
          {/* Note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center text-sm text-[#94a3b8]"
          >
            New white papers, research, and guides are in the works — published from real client results, not generic theory.
          </motion.p>
        </div>
      </section>
 
      {/* ── CTA ── */}
      <section className="bg-[#0a0f2e] py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Want SEO advice tailored to your site?
            </motion.h2>
            <motion.p variants={fadeUp} className="mb-8 text-base text-white/70">
              Skip the generic guides — get a free, founder-led audit of your exact situation.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href="/free-audit"
                className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: GREEN }}
              >
                Get Free SEO Audit <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
 
    </main>
  );
}
 
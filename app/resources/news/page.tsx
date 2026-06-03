"use client";
 
import Link from "next/link";
import { motion } from "framer-motion";
import { Newspaper, ExternalLink, ArrowRight, Calendar } from "lucide-react";
 
/* ─── THEME ─── */
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
const PURPLE = "#534AB7";
 
/*
  ─── CURATED SEO NEWS (manual update) ───
  Add new items at the TOP. Keep summaries in your own words.
  Always link to the original authoritative source.
*/
const news = [
  {
    date: "May 21, 2026",
    tag: "Core Update",
    tagColor: PURPLE,
    title: "Google May 2026 Core Update Rolling Out",
    summary:
      "Google began its second broad core update of the year on May 21, with the rollout expected to complete in early June. As with March, expect ranking volatility for up to two weeks — don't make drastic changes until it finishes. The same quality signals apply: original, people-first content from verifiable experts wins.",
    sourceLabel: "Google Search Status Dashboard",
    sourceHref: "https://status.search.google.com/",
  },
  {
    date: "May 19, 2026",
    tag: "AI Search",
    tagColor: GREEN_DARK,
    title: "AI Overviews Cross 2.5 Billion Monthly Users",
    summary:
      "At Google I/O 2026, Google announced AI Overviews now reaches 2.5 billion monthly users and AI Mode has hit 1 billion. For businesses, being cited inside AI answers is becoming as important as ranking in classic search — making structured data, clear entities, and verifiable authorship essential.",
    sourceLabel: "Google I/O 2026",
    sourceHref: "https://io.google/",
  },
  {
    date: "Apr 8, 2026",
    tag: "Core Update",
    tagColor: PURPLE,
    title: "March 2026 Core Update Finishes — Originality Rewarded",
    summary:
      "The March 2026 core update (March 27–April 8) consistently rewarded sites where the content creator is also the primary source — first-hand experience, proprietary data, and real case studies. Aggregators and sites that merely summarize others lost ground. E-E-A-T with verifiable author credentials was a clear winner.",
    sourceLabel: "Search Engine Roundtable",
    sourceHref: "https://www.seroundtable.com/",
  },
  {
    date: "Mar 27, 2026",
    tag: "E-E-A-T",
    tagColor: GREEN_DARK,
    title: "Why Verifiable Authorship Now Decides Rankings",
    summary:
      "A key takeaway from 2026's updates: Google is less confident ranking content it can't attribute to a credible, named source. Anonymous or generic-profile content is losing regardless of quality. Attributing content to a real, credentialed author with a consistent track record is now a ranking essential, not a nice-to-have.",
    sourceLabel: "Google Search Central",
    sourceHref: "https://developers.google.com/search/blog",
  },
];
 
/* ─── MOTION ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
 
export default function NewsPage() {
  return (
    <main className="bg-[#eaecf3]">
 
      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-[#d4d8e3] bg-[#eaecf3] pt-28 pb-14">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Link href="/resources" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#64748b] transition-colors hover:text-[#534AB7]">
            ← Back to Resources
          </Link>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(62,180,137,0.12)", color: GREEN_DARK }}>
            <Newspaper className="h-3.5 w-3.5" /> Latest SEO News
          </span>
          <h1 className="mb-4 text-4xl font-black tracking-tight text-[#0a0f2e] sm:text-5xl">
            SEO &amp; Google Update News
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-[#475569] leading-relaxed">
            Plain-English breakdowns of the algorithm changes, core updates, and AI-search shifts that actually affect your rankings — curated and explained.
          </p>
        </div>
      </section>
 
      {/* ── NEWS FEED ── */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-5">
            {news.map((item) => (
              <motion.article
                key={item.title}
                variants={fadeUp}
                className="rounded-2xl border border-[#e2e8f0] bg-white p-6 transition-all hover:shadow-md"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: `${item.tagColor}1a`, color: item.tagColor }}>
                    {item.tag}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-[#94a3b8]">
                    <Calendar className="h-3 w-3" /> {item.date}
                  </span>
                </div>
                <h2 className="mb-2 text-xl font-black text-[#0a0f2e]">{item.title}</h2>
                <p className="mb-4 text-sm leading-relaxed text-[#64748b]">{item.summary}</p>
                <a
                  href={item.sourceHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold transition-opacity hover:opacity-70"
                  style={{ color: GREEN_DARK }}
                >
                  Source: {item.sourceLabel} <ExternalLink className="h-3 w-3" />
                </a>
              </motion.article>
            ))}
          </motion.div>
 
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center text-sm text-[#94a3b8]"
          >
            Updated as major SEO news breaks. Summaries are our own; always check the linked source for full details.
          </motion.p>
        </div>
      </section>
 
      {/* ── CTA ── */}
      <section className="bg-[#0a0f2e] py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} className="mb-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Worried a core update hit your site?
            </motion.h2>
            <motion.p variants={fadeUp} className="mb-8 text-base text-white/70">
              Get a free audit — we'll pinpoint what changed and build a recovery plan around the latest 2026 signals.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/free-audit" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5" style={{ background: GREEN }}>
                Get Free SEO Audit <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
 
    </main>
  );
}
 
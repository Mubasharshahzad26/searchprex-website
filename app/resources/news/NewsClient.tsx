"use client";
 
import Link from "next/link";
import { motion } from "framer-motion";
import { Newspaper, ExternalLink, ArrowRight, Calendar } from "lucide-react";
 
/* ─── THEME ─── */
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
const PURPLE = "#534AB7";
 
/*
  ─── NEWS ITEM STYLING ───
  The items themselves live in the MarketingNews table and are edited at
  /content-admin/news. Nothing is hardcoded here on purpose: a hardcoded card
  cannot be corrected once the story moves on, and this page previously served a
  "core update rolling out" item for three months after that rollout finished.
*/
const TAG_COLORS: Record<string, string> = {
  "Core Update": PURPLE,
  "Spam Update": "#b91c1c",
  "AI Search": GREEN_DARK,
  "Search Console": "#0369a1",
  "Structured Data": "#b45309",
  "Discover": "#7c3aed",
  "Ecommerce": "#be185d",
  "Technical": "#0f766e",
};
const tagColor = (tag: string) => TAG_COLORS[tag] || PURPLE;

/*
  Spoke categories are stored as "SEO News — AI SEO" so that the hub query
  (contains "SEO News") and each subnav query (contains "AI SEO") both match the
  same row. Only the subcategory half belongs on the card badge.
*/
const shortCategory = (category?: string) => {
  if (!category) return "SEO News";
  const parts = category.split("—");
  return (parts.length > 1 ? parts[parts.length - 1] : parts[0]).trim();
};

/*
 * Locale and time zone are both pinned. Bare toLocaleDateString() resolves
 * against the host's locale, so the server rendered "27/08/2026" while the
 * browser rendered "8/27/2026" -- a hydration mismatch that threw on every
 * visit. Pinning the time zone additionally stops a UTC server and a
 * west-of-UTC visitor disagreeing about which calendar day a timestamp is.
 */
const formatDate = (value: string | Date) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

/* 🔮 MOTION 🔮 */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
 
export default function NewsClient({ initialNews = [], initialSpokes = [] }: { initialNews?: any[], initialSpokes?: any[] }) {
  const dbNewsFormatted = initialNews.map((n: any) => ({
    id: n.id,
    date: formatDate(n.newsDate),
    tag: n.tag || "SEO News",
    tagColor: tagColor(n.tag || ""),
    title: n.title,
    summary: n.summary,
    sourceLabel: n.sourceLabel || "Source",
    sourceHref: n.sourceHref || "#",
  }));
  const news = dbNewsFormatted;
 
  return (
    <main className="bg-[#f8f9fc]">
 
      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-[#e5e7eb] bg-[#f8f9fc] pt-28 pb-14">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Link href="/resources" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#64748b] transition-colors hover:text-[#534AB7]">
            ← Back to Resources
          </Link>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(62,180,137,0.12)", color: GREEN_DARK }}>
            <Newspaper className="h-3.5 w-3.5" /> Latest SEO News
          </span>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-[#0a0f2e] sm:text-5xl">
            SEO &amp; Google Update News
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-[#64748b] leading-relaxed">
            Plain-English breakdowns of the algorithm changes, core updates, and AI-search shifts that actually affect your rankings — curated and explained.
          </p>
        </div>
      </section>
 
      {/* ── DEEP DIVES (SPOKES) ── */}
      {initialSpokes.length > 0 && (
        <section className="py-16 border-b border-[#e5e7eb] bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-bold text-[#0a0f2e] text-center">Comprehensive SEO News Deep-Dives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {initialSpokes.map((spoke) => (
                <Link key={spoke.slug} href={`/resources/news/${spoke.slug}`} className="group block rounded-2xl border border-[#e5e7eb] bg-[#f8f9fc] p-6 transition-all hover:shadow-lg hover:border-[#534AB7]">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#534AB7] text-white">
                      {shortCategory(spoke.category)}
                    </span>
                    <span className="text-xs font-semibold text-[#64748b]">{formatDate(spoke.publishedAt || spoke.createdAt)}</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-[#0a0f2e] group-hover:text-[#534AB7] transition-colors">{spoke.title}</h3>
                  <p className="text-sm leading-relaxed text-[#64748b] mb-4">{spoke.excerpt || spoke.metaDescription || "Read the full analysis and what it means for your rankings."}</p>
                  <span className="inline-flex items-center gap-1 font-bold text-sm text-[#534AB7] group-hover:gap-2 transition-all">Read Full Article <ArrowRight className="w-4 h-4" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── NEWS FEED ── */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-[#0a0f2e] text-center">Live Algorithm Tracker & Quick Updates</h2>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-5">
            {news.map((item) => (
              <motion.article
                key={item.title}
                variants={fadeUp}
                className="rounded-2xl border border-[#e5e7eb] bg-white p-6 transition-all hover:shadow-md"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: `${item.tagColor}1a`, color: item.tagColor }}>
                    {item.tag}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-[#94a3b8]">
                    <Calendar className="h-3 w-3" /> {item.date}
                  </span>
                </div>
                <h2 className="mb-2 text-xl font-bold text-[#0a0f2e]">{item.title}</h2>
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
            <motion.h2 variants={fadeUp} className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
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
 
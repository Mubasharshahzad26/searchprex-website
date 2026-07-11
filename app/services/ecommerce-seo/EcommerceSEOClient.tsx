"use client";
 
import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowRight, CheckCircle, X, Phone, ShieldCheck,
  Linkedin, BadgeCheck, MapPin, ChevronDown, BarChart3,
  Search, TrendingUp, Package, Layers, Zap, Database,
  ShoppingCart, AlertTriangle, Wrench, Sparkles, Target,
  FileCode, GitBranch, LineChart, Star,
} from "lucide-react";
import { caseStudies, detailUrl, type CaseStudy } from "../../all-case-studies/data";
 
/* ── Brand system (matches CaseStudiesClient) ── */
const ACCENT = "#3eb489";
const ACCENT_DARK = "#2f9670";
const INK = "#191a1f";
const SLATE = "#65676e";
const LINE = "#e6e7eb";
const PAPER = "#f7f7f8";
 
const PHONE = "+923106526316";
const PHONE_DISPLAY = "+92 310 652 6316";
 
/* Fallback stock images */
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
];
const fallbackFor = (seed: string | number) => {
  const s = String(seed);
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return FALLBACK_IMAGES[h % FALLBACK_IMAGES.length];
};
const cardImage = (cs: CaseStudy) =>
  cs.video
    ? `https://img.youtube.com/vi/${cs.video}/maxresdefault.jpg`
    : cs.image ?? fallbackFor(cs.id);
 
/* ── Motion presets ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};
 
/* ── Page-specific data ── */
const HERO_STATS = [
  { v: "+476%", l: "Organic clicks" },
  { v: "+285%", l: "Indexing rate" },
  { v: "12K+", l: "Product pages indexed" },
  { v: "40+", l: "Ecommerce sites scaled" },
];
 
const PAIN_POINTS = [
  {
    icon: AlertTriangle,
    title: "Thousands of products, hundreds indexed",
    body: "Google crawls but refuses to index thin product pages. Your catalog exists in the sitemap and nowhere else — no impressions, no clicks, no revenue.",
  },
  {
    icon: GitBranch,
    title: "Faceted navigation eating crawl budget",
    body: "Filter combinations spawn millions of low-value URLs. Google wastes its budget crawling color × size × price permutations instead of your money pages.",
  },
  {
    icon: FileCode,
    title: "No structured data, no rich results",
    body: "Missing Product, Offer, Review, and FAQ schema means competitors get star ratings, price snippets, and AI Overview citations while you get plain blue links.",
  },
  {
    icon: Layers,
    title: "Category pages that don't rank",
    body: "Empty category templates with a product grid and nothing else. Google sees a list of thumbnails and a thin H1 — nothing to rank for competitive commercial keywords.",
  },
];
 
const PILLARS = [
  {
    icon: Wrench,
    title: "Technical foundation",
    body: "Crawl budget audit, log-file analysis, faceted navigation rules, canonical hygiene, XML sitemap architecture at scale, and Core Web Vitals fixes on WooCommerce, Shopify, and custom stacks.",
    points: ["Sitemap consolidation & indexation control", "Faceted nav with rel=canonical + noindex logic", "LCP, CLS, INP optimization on product templates"],
  },
  {
    icon: Package,
    title: "Product page optimization at scale",
    body: "Programmatic content generation, unique descriptions, FAQ schema, and internal linking across thousands of SKUs — designed to pass Google's helpful content and E-E-A-T bar.",
    points: ["Unique HTML per product (no templated blocks)", "FAQ schema + JSON-LD Product markup", "Semantic internal links from category + brand pages"],
  },
  {
    icon: Target,
    title: "Category page authority",
    body: "Turn thin PLPs into topical hubs. Long-form buyer's guides above the fold, comparison tables, FAQ blocks, and merchandising signals that Google actually understands as expertise.",
    points: ["Buyer-intent H1 + intro copy per collection", "Comparison + specification tables", "Curated cross-linking between related PLPs"],
  },
  {
    icon: Database,
    title: "Structured data & rich results",
    body: "Product, Offer, AggregateRating, Review, Breadcrumb, FAQPage, and Organization schema — validated, monitored, and mapped to actual on-page data. No fabricated ratings, no schema markup Google will penalize.",
    points: ["Full Product + Offer + Breadcrumb schema", "FAQPage schema on 100% of product pages", "Weekly Rich Results monitoring in GSC"],
  },
  {
    icon: Zap,
    title: "Indexing recovery",
    body: "Sitemap-to-GSC diffing, Google Indexing API automation, and priority-based submission queues that push high-impact URLs to the front — with quota management across service accounts.",
    points: ["Automated Sitemap ↔ GSC diff", "Indexing API queue with priority scoring", "Multi-account quota rotation (200/day per SA)"],
  },
  {
    icon: TrendingUp,
    title: "AEO + AI Overview optimization",
    body: "Answer engine optimization for ChatGPT, Perplexity, Gemini, and Google's AI Overviews. Entity optimization, knowledge graph signals, and citation-worthy content that gets picked up as source material.",
    points: ["FAQ-first content architecture", "Entity + author schema for E-E-A-T", "Semantic clustering for AI retrievability"],
  },
];
 
const PROCESS = [
  {
    step: "01",
    title: "Reality check audit",
    body: "Full technical + content + indexing audit. Crawl your site, pull GSC + GA4 data, benchmark against 2 competitors, and deliver a 90-day roadmap with priorities scored by impact and effort.",
  },
  {
    step: "02",
    title: "Strategy & scoping",
    body: "Confirm target categories, product batches, and technical fix priorities. Align on tooling (WordPress, Shopify, custom), reporting cadence, and content production capacity.",
  },
  {
    step: "03",
    title: "Execution",
    body: "Weekly sprints — technical fixes shipped by our dev partner, content batches published at 200/day, schema deployed, and indexing API queued. Every change logged in a shared roadmap.",
  },
  {
    step: "04",
    title: "Monitor & iterate",
    body: "Weekly reporting on indexation rate, impressions, clicks, and revenue attribution. Monthly review call. Automated alerts for indexing drops, ranking losses, and Core Web Vitals regressions.",
  },
];
 
const TOOLING = [
  "Google Search Console",
  "GA4",
  "Screaming Frog",
  "Ahrefs",
  "Semrush",
  "Surfer SEO",
  "Looker Studio",
  "Google Indexing API",
  "Log File Analyzer",
  "PageSpeed Insights",
];
 
const FAQS = [
  {
    q: "How long before we see results?",
    a: "Technical wins (indexing, Core Web Vitals) show impact in 2-4 weeks. Content and category-page work typically shows meaningful ranking movement in 60-90 days. Full revenue impact from ecommerce SEO usually lands in month 4-6.",
  },
  {
    q: "Do you work on Shopify, WooCommerce, or custom platforms?",
    a: "All three. Our current portfolio includes WooCommerce (SMK Store, Michigan Sports Outdoor), Shopify stores, and custom Next.js/headless commerce builds. Platform-specific implementation quirks are handled by our dev partner.",
  },
  {
    q: "What if my products have thin content and I can't write for all of them?",
    a: "That's most of what we do. We build programmatic content pipelines — unique HTML per product, FAQ schema, meta descriptions, internal links — deployed at 200 products/day, aligned with Google Indexing API quotas.",
  },
  {
    q: "How do you handle indexing at scale?",
    a: "Sitemap ↔ GSC diffing runs daily, feeding a priority queue that rotates across multiple Google Indexing API service accounts. High-revenue and high-search-volume URLs are submitted first. Backlog is worked through automatically.",
  },
  {
    q: "Do you touch conversion rate, or just SEO?",
    a: "Primary focus is organic acquisition, but we handle CRO adjacent to SEO — product page structure, category page templates, breadcrumbs, related products, and cart-abandonment schema. Full CRO programs are a separate scope.",
  },
  {
    q: "What's the pricing?",
    a: "Depends on catalog size, technical scope, and content volume. Retainers typically start at $2,500/month for stores under 500 SKUs, scaling with catalog size and priority. Every engagement starts with a free reality check audit — no commitment.",
  },
];
 
type FormState = "idle" | "sending" | "sent" | "error";
 
export default function EcommerceSEOClient({ linkedinUrl }: { linkedinUrl: string }) {
  /* ── Filter case studies to ecommerce ── */
  const ecommerceStudies = useMemo(() => {
    return caseStudies.filter((cs) => {
      const s = `${cs.seoType} ${cs.industry}`.toLowerCase();
      return s.includes("ecommerce") || s.includes("e-commerce") || s.includes("commerce") || s.includes("retail");
    });
  }, []);
 
  const featuredEcom = ecommerceStudies.slice(0, 3);
 
  /* ── Modal state ── */
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", website: "", phone: "" });
  const [formState, setFormState] = useState<FormState>("idle");
 
  const openModal = () => { setFormState("idle"); setShowModal(true); };
 
  const submit = async () => {
    setFormState("sending");
    try {
      const res = await fetch("/api/reality-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "ecommerce-seo" }),
      });
      if (!res.ok) throw new Error("Request failed");
      setFormState("sent");
      setTimeout(() => {
        setShowModal(false);
        setForm({ name: "", email: "", website: "", phone: "" });
        setFormState("idle");
      }, 2200);
    } catch {
      setFormState("error");
    }
  };
 
  const inputCls =
    "w-full px-4 py-3 rounded-md border border-[#e6e7eb] outline-none focus:ring-2 focus:ring-[#3eb489] transition-shadow text-sm";
 
  const CTA = ({ className = "", label = "Get a reality check" }: { className?: string; label?: string }) => (
    <button
      onClick={openModal}
      className={`group inline-flex items-center justify-center gap-2 rounded-full font-semibold text-white transition-all hover:opacity-90 ${className}`}
      style={{ background: INK }}
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </button>
  );
 
  return (
    <main className="bg-white">
 
      {/* ━━━ 1 · HERO ━━━ */}
      <section className="border-b border-[#e6e7eb] pt-24 pb-16 sm:pt-28">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
        >
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e6e7eb] px-4 py-1.5"
          >
            <ShoppingCart className="h-3.5 w-3.5" style={{ color: ACCENT }} />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#65676e]">
              Ecommerce SEO
            </span>
          </motion.div>
 
          <motion.h1
            variants={fadeUp}
            className="mb-5 text-4xl font-bold leading-[1.1] tracking-tight text-[#191a1f] sm:text-5xl md:text-[56px]"
          >
            Ecommerce SEO that turns product pages into revenue
          </motion.h1>
 
          <motion.p
            variants={fadeUp}
            className="mx-auto mb-9 max-w-2xl text-lg leading-relaxed text-[#65676e]"
          >
            We scale technical SEO, product-page content, and indexing recovery across thousands of SKUs —
            for WooCommerce, Shopify, and custom stores. Real audits, real fixes, real revenue lift.
          </motion.p>
 
          <motion.div variants={fadeUp} className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CTA className="px-7 py-3.5 text-[15px]" />
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#e6e7eb] bg-white px-6 py-3.5 text-[15px] font-semibold text-[#191a1f] transition-all hover:border-[#191a1f]"
            >
              See ecommerce case studies
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
 
          <motion.div
            variants={fadeUp}
            className="mt-8 inline-flex items-center gap-2 text-xs text-[#65676e]"
          >
            <ShieldCheck className="h-3.5 w-3.5" style={{ color: ACCENT }} />
            Every result verified with Google Search Console data
          </motion.div>
        </motion.div>
 
        {/* Stat strip */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-8 px-4 text-center sm:px-6 md:grid-cols-4 lg:px-8"
        >
          {HERO_STATS.map((s, i) => (
            <div key={i} className={i > 0 ? "sm:border-l sm:border-[#e6e7eb]" : ""}>
              <p className="text-3xl font-bold text-[#191a1f] sm:text-4xl">{s.v}</p>
              <p className="mt-1.5 text-xs font-medium uppercase tracking-wide text-[#65676e]">{s.l}</p>
            </div>
          ))}
        </motion.div>
      </section>
 
      {/* ━━━ 2 · PAIN POINTS ━━━ */}
      <section className="py-20" style={{ background: PAPER }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <motion.p
              variants={fadeUp}
              className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#65676e]"
            >
              The problem
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mb-4 text-3xl font-bold leading-tight text-[#191a1f] sm:text-4xl"
            >
              Why most ecommerce sites bleed organic traffic
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[17px] leading-relaxed text-[#65676e]">
              Four patterns show up in almost every audit we run. If any of these sound familiar, your
              site is likely leaving 6-7 figures on the table.
            </motion.p>
          </motion.div>
 
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-4 md:grid-cols-2"
          >
            {PAIN_POINTS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="rounded-2xl border border-[#e6e7eb] bg-white p-6 transition-all hover:border-[#191a1f]"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg" style={{ background: "rgba(62,180,137,0.12)" }}>
                    <Icon className="h-5 w-5" style={{ color: ACCENT_DARK }} />
                  </div>
                  <h3 className="mb-2 text-[17px] font-bold text-[#191a1f]">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-[#65676e]">{p.body}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
 
      {/* ━━━ 3 · APPROACH / PILLARS ━━━ */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <motion.p
              variants={fadeUp}
              className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#65676e]"
            >
              Our approach
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mb-4 text-3xl font-bold leading-tight text-[#191a1f] sm:text-4xl"
            >
              Six pillars we build every ecommerce program on
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[17px] leading-relaxed text-[#65676e]">
              Not a checklist — an operating system. Each pillar has playbooks, tooling, and reporting
              that we've refined across 40+ ecommerce sites.
            </motion.p>
          </motion.div>
 
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex flex-col rounded-2xl border border-[#e6e7eb] bg-white p-6"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: INK }}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-[#191a1f]">{p.title}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-[#65676e]">{p.body}</p>
                  <ul className="mt-auto space-y-2 border-t border-[#f1f1f2] pt-4">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-xs text-[#191a1f]">
                        <CheckCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" style={{ color: ACCENT }} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
 
      {/* ━━━ 4 · CASE STUDIES PREVIEW ━━━ */}
      {featuredEcom.length > 0 && (
        <section className="border-t border-[#e6e7eb] py-20" style={{ background: PAPER }}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-xl">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#65676e]">
                  Proof
                </p>
                <h2 className="text-3xl font-bold leading-tight text-[#191a1f] sm:text-4xl">
                  Ecommerce stores we've moved the needle for
                </h2>
              </div>
              <Link
                href="/case-studies?type=ecommerce-seo"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#191a1f] hover:opacity-70"
              >
                View all ecommerce case studies
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
 
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredEcom.map((cs) => (
                <CaseCard key={cs.id} cs={cs} />
              ))}
            </div>
          </div>
        </section>
      )}
 
      {/* ━━━ 5 · PROCESS ━━━ */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#65676e]">
              How we work
            </p>
            <h2 className="mb-4 text-3xl font-bold leading-tight text-[#191a1f] sm:text-4xl">
              A four-phase engagement, built for scale
            </h2>
            <p className="text-[17px] leading-relaxed text-[#65676e]">
              Predictable process, transparent reporting, no black-box tactics.
            </p>
          </div>
 
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative rounded-2xl border border-[#e6e7eb] bg-white p-6"
              >
                <span
                  className="mb-4 inline-block text-xs font-bold tracking-wider"
                  style={{ color: ACCENT_DARK }}
                >
                  {p.step}
                </span>
                <h3 className="mb-2 text-lg font-bold text-[#191a1f]">{p.title}</h3>
                <p className="text-sm leading-relaxed text-[#65676e]">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ━━━ 6 · TOOLING ━━━ */}
      <section className="border-t border-[#e6e7eb] py-16" style={{ background: PAPER }}>
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#65676e]">
            Tooling
          </p>
          <h2 className="mb-8 text-2xl font-bold text-[#191a1f] sm:text-3xl">
            The stack we run every program on
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {TOOLING.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[#e6e7eb] bg-white px-4 py-2 text-sm font-semibold text-[#191a1f]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>
 
      {/* ━━━ 7 · FOUNDER ━━━ */}
      <section className="border-t border-[#e6e7eb] py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#e6e7eb] bg-white p-8 md:p-10">
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-left">
              <div
                className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full text-2xl font-bold text-white"
                style={{ background: INK }}
              >
                MS
              </div>
              <div className="flex-1">
                <div className="flex flex-col items-center gap-3 md:flex-row md:items-center">
                  <h3 className="text-xl font-bold text-[#191a1f]">Mubashar Shahzad</h3>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#e6e7eb] px-3 py-1 text-xs font-semibold text-[#0a66c2] transition-all hover:bg-[#f0f6fc]"
                  >
                    <Linkedin className="h-3.5 w-3.5" /> Verified on LinkedIn
                  </a>
                </div>
                <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ background: "rgba(62,180,137,0.12)", color: ACCENT_DARK }}
                  >
                    <BadgeCheck className="h-3.5 w-3.5" /> Verified Ecommerce SEO Expert
                  </span>
                  <span className="rounded-full border border-[#e6e7eb] px-3 py-1 text-xs font-semibold text-[#65676e]">
                    5+ years
                  </span>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-[#65676e]">
                  Founder of SearchPrex. Full-stack ecommerce SEO expertise — technical SEO, on-page
                  optimization, content strategy, structured data, and indexing recovery at scale. Currently
                  running programs on WooCommerce, Shopify, and custom Next.js stores across the US.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
                  <span className="rounded-full border border-[#e6e7eb] px-3 py-1.5 text-xs font-semibold text-[#65676e]">
                    Semrush certified
                  </span>
                  <span className="rounded-full border border-[#e6e7eb] px-3 py-1.5 text-xs font-semibold text-[#65676e]">
                    HubSpot certified
                  </span>
                  <a
                    href={`tel:${PHONE}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#e6e7eb] px-3 py-1.5 text-xs font-semibold text-[#65676e] transition-colors hover:border-[#3eb489]"
                  >
                    <Phone className="h-3.5 w-3.5" /> {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* ━━━ 8 · FAQ ━━━ */}
      <section className="py-20" style={{ background: PAPER }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#65676e]">
              FAQ
            </p>
            <h2 className="text-3xl font-bold text-[#191a1f] sm:text-4xl">
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <FAQItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>
 
      {/* ━━━ 9 · FINAL CTA ━━━ */}
      <section className="py-24" style={{ background: INK }}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mx-auto max-w-2xl px-4 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Ready to see what's holding your store back?
          </h2>
          <p className="mb-9 text-[17px] leading-relaxed text-white/70">
            Get a free reality check — full technical + content + indexing audit, benchmarked against
            2 competitors, with a 90-day priority roadmap. Founder-reviewed, delivered in 24 hours.
          </p>
          <button
            onClick={openModal}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[#191a1f] transition-all hover:opacity-90"
          >
            Get a reality check <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </section>
 
      {/* ━━━ FLOATING STICKY CTA ━━━ */}
      <button
        onClick={openModal}
        className="fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white shadow-xl transition-all hover:opacity-90 sm:bottom-5 sm:right-5 sm:px-5 sm:py-3.5"
        style={{ background: INK }}
      >
        <BarChart3 className="h-4 w-4" /> Reality Check
      </button>
 
      {/* ━━━ REALITY CHECK MODAL ━━━ */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-white p-8"
            >
              {formState !== "sent" ? (
                <>
                  <div className="mb-2 flex justify-end">
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-[#65676e] hover:text-[#191a1f]"
                      aria-label="Close"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="mb-6">
                    <h2 className="mb-2 text-2xl font-bold text-[#191a1f]">Reality Check</h2>
                    <p className="text-[#65676e]">
                      Get a free, founder-reviewed ecommerce SEO audit within 24 hours.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your name"
                      className={inputCls}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                      type="email"
                      placeholder="Email address"
                      className={inputCls}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <input
                      type="url"
                      placeholder="Store URL"
                      className={inputCls}
                      value={form.website}
                      onChange={(e) => setForm({ ...form, website: e.target.value })}
                    />
                    <input
                      type="tel"
                      placeholder="Phone number"
                      className={inputCls}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                    {formState === "error" && (
                      <p className="text-sm font-semibold text-red-600">
                        Something went wrong sending that. Please try again, or email contact@searchprex.com.
                      </p>
                    )}
                    <button
                      onClick={submit}
                      disabled={formState === "sending"}
                      className="w-full rounded-full py-3 font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
                      style={{ background: INK }}
                    >
                      {formState === "sending" ? "Sending…" : "Get my reality check →"}
                    </button>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-8 text-center"
                >
                  <CheckCircle className="mx-auto mb-4 h-12 w-12" style={{ color: ACCENT }} />
                  <h3 className="mb-2 text-2xl font-bold text-[#191a1f]">Request received</h3>
                  <p className="text-[#65676e]">
                    Check your email within 24 hours for your reality check report.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
 
/* ─────────────────────────────────────────────────────────
 * Sub-components
 * ─────────────────────────────────────────────────────── */
 
function CaseCard({ cs }: { cs: CaseStudy }) {
  const img = cardImage(cs);
  return (
    <Link
      href={detailUrl(cs)}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#e6e7eb] bg-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#191a1f]">
        <img
          src={img}
          alt={cs.client}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallbackFor(cs.id);
          }}
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#191a1f]">
          {cs.seoType}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-1 flex items-center gap-1 text-xs text-[#65676e]">
          <MapPin className="h-3 w-3" />
          {cs.location}
        </p>
        <h3 className="mb-4 text-[15px] font-bold leading-snug text-[#191a1f]">{cs.headline}</h3>
        <div className="mt-auto flex items-baseline gap-2 border-t border-[#f1f1f2] pt-4">
          <span className="text-2xl font-bold leading-none" style={{ color: ACCENT_DARK }}>
            {cs.metrics[0].v}
          </span>
          <span className="text-xs font-medium uppercase tracking-wide text-[#65676e]">
            {cs.metrics[0].l}
          </span>
        </div>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#191a1f] transition-opacity group-hover:opacity-70">
          View case study <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
 
function FAQItem({ q, a }: { q: string; a?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-[#e6e7eb] bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-semibold text-[#191a1f]">{q}</span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-[#65676e] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-[#65676e]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
 
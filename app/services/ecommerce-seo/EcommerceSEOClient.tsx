"use client";

// app/services/ecommerce-seo/EcommerceSEOClient.tsx
// Assembled from components/layout primitives. The old local theme block
// (ACCENT #3eb489 as the button colour, INK #191a1f, SLATE #65676e,
// LINE #e6e7eb, PAPER #f7f7f8) is gone — green is now reserved for verified
// metrics, and actions use the brand primary like every other page.
//
// Copy is unchanged from the previous version.

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowRight, X, ShieldCheck, BarChart3,
  TrendingUp, Package, Layers, Zap, Database,
  Wrench, Target, FileCode, GitBranch, AlertTriangle,
} from "lucide-react";
import { caseStudies, detailUrl, type CaseStudy } from "../../all-case-studies/data";
import {
  AuthorCard,
  CardGrid,
  FaqList,
  FeatureCard,
  PageHero,
  Section,
  SectionHeading,
  StatStrip,
  type Faq,
} from "@/components/layout";
import { color, focusRing, heading, radius, text } from "@/lib/design-tokens";

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
  cs.video ? `https://img.youtube.com/vi/${cs.video}/maxresdefault.jpg` : cs.image ?? fallbackFor(cs.id);

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ── Page data ── */

const HERO_STATS = [
  { value: "+476%", label: "Organic clicks" },
  { value: "+285%", label: "Indexing rate" },
  { value: "12K+", label: "Product pages indexed" },
  { value: "40+", label: "Ecommerce sites scaled" },
];

const PAIN_POINTS = [
  { icon: AlertTriangle, title: "Thousands of products, hundreds indexed", body: "Google crawls but refuses to index thin product pages. Your catalog exists in the sitemap and nowhere else — no impressions, no clicks, no revenue." },
  { icon: GitBranch, title: "Faceted navigation eating crawl budget", body: "Filter combinations spawn millions of low-value URLs. Google wastes its budget crawling color × size × price permutations instead of your money pages." },
  { icon: FileCode, title: "No structured data, no rich results", body: "Missing Product, Offer, Review, and FAQ schema means competitors get star ratings, price snippets, and AI Overview citations while you get plain blue links." },
  { icon: Layers, title: "Category pages that don't rank", body: "Empty category templates with a product grid and nothing else. Google sees a list of thumbnails and a thin H1 — nothing to rank for competitive commercial keywords." },
];

const PILLARS = [
  { icon: Wrench, title: "Technical foundation", body: "Crawl budget audit, log-file analysis, faceted navigation rules, canonical hygiene, XML sitemap architecture at scale, and Core Web Vitals fixes on WooCommerce, Shopify, and custom stacks.", points: ["Sitemap consolidation & indexation control", "Faceted nav with rel=canonical + noindex logic", "LCP, CLS, INP optimization on product templates"] },
  { icon: Package, title: "Product page optimization at scale", body: "Programmatic content generation, unique descriptions, FAQ schema, and internal linking across thousands of SKUs — designed to pass Google's helpful content and E-E-A-T bar.", points: ["Unique HTML per product (no templated blocks)", "FAQ schema + JSON-LD Product markup", "Semantic internal links from category + brand pages"] },
  { icon: Target, title: "Category page authority", body: "Turn thin PLPs into topical hubs. Long-form buyer's guides above the fold, comparison tables, FAQ blocks, and merchandising signals that Google actually understands as expertise.", points: ["Buyer-intent H1 + intro copy per collection", "Comparison + specification tables", "Curated cross-linking between related PLPs"] },
  { icon: Database, title: "Structured data & rich results", body: "Product, Offer, AggregateRating, Review, Breadcrumb, FAQPage, and Organization schema — validated, monitored, and mapped to actual on-page data. No fabricated ratings, no schema markup Google will penalize.", points: ["Full Product + Offer + Breadcrumb schema", "FAQPage schema on 100% of product pages", "Weekly Rich Results monitoring in GSC"] },
  { icon: Zap, title: "Indexing recovery", body: "Sitemap-to-GSC diffing, Google Indexing API automation, and priority-based submission queues that push high-impact URLs to the front — with quota management across service accounts.", points: ["Automated Sitemap ↔ GSC diff", "Indexing API queue with priority scoring", "Multi-account quota rotation (200/day per SA)"] },
  { icon: TrendingUp, title: "AEO + AI Overview optimization", body: "Answer engine optimization for ChatGPT, Perplexity, Gemini, and Google's AI Overviews. Entity optimization, knowledge graph signals, and citation-worthy content that gets picked up as source material.", points: ["FAQ-first content architecture", "Entity + author schema for E-E-A-T", "Semantic clustering for AI retrievability"] },
];

const PROCESS = [
  { step: "01", title: "Reality check audit", body: "Full technical + content + indexing audit. Crawl your site, pull GSC + GA4 data, benchmark against 2 competitors, and deliver a 90-day roadmap with priorities scored by impact and effort." },
  { step: "02", title: "Strategy & scoping", body: "Confirm target categories, product batches, and technical fix priorities. Align on tooling (WordPress, Shopify, custom), reporting cadence, and content production capacity." },
  { step: "03", title: "Execution", body: "Weekly sprints — technical fixes shipped by our dev partner, content batches published at 200/day, schema deployed, and indexing API queued. Every change logged in a shared roadmap." },
  { step: "04", title: "Monitor & iterate", body: "Weekly reporting on indexation rate, impressions, clicks, and revenue attribution. Monthly review call. Automated alerts for indexing drops, ranking losses, and Core Web Vitals regressions." },
];

const TOOLING = [
  "Google Search Console", "GA4", "Screaming Frog", "Ahrefs", "Semrush",
  "Surfer SEO", "Looker Studio", "Google Indexing API", "Log File Analyzer", "PageSpeed Insights",
];

const FAQS: Faq[] = [
  { q: "How long before we see results?", a: "Technical wins (indexing, Core Web Vitals) show impact in 2-4 weeks. Content and category-page work typically shows meaningful ranking movement in 60-90 days. Full revenue impact from ecommerce SEO usually lands in month 4-6." },
  { q: "Do you work on Shopify, WooCommerce, or custom platforms?", a: "All three. Our current portfolio includes WooCommerce (SMK Store, Michigan Sports Outdoor), Shopify stores, and custom Next.js/headless commerce builds. Platform-specific implementation quirks are handled by our dev partner." },
  { q: "What if my products have thin content and I can't write for all of them?", a: "That's most of what we do. We build programmatic content pipelines — unique HTML per product, FAQ schema, meta descriptions, internal links — deployed at 200 products/day, aligned with Google Indexing API quotas." },
  { q: "How do you handle indexing at scale?", a: "Sitemap ↔ GSC diffing runs daily, feeding a priority queue that rotates across multiple Google Indexing API service accounts. High-revenue and high-search-volume URLs are submitted first. Backlog is worked through automatically." },
  { q: "Do you touch conversion rate, or just SEO?", a: "Primary focus is organic acquisition, but we handle CRO adjacent to SEO — product page structure, category page templates, breadcrumbs, related products, and cart-abandonment schema. Full CRO programs are a separate scope." },
  { q: "What's the pricing?", a: "Depends on catalog size, technical scope, and content volume. Retainers typically start at $2,500/month for stores under 500 SKUs, scaling with catalog size and priority. Every engagement starts with a free reality check audit — no commitment." },
];

type FormState = "idle" | "sending" | "sent" | "error";

/* ── Page ── */

export default function EcommerceSEOClient({ linkedinUrl }: { linkedinUrl: string }) {
  const ecommerceStudies = useMemo(
    () =>
      caseStudies.filter((cs) => {
        const s = `${cs.seoType} ${cs.industry}`.toLowerCase();
        return s.includes("ecommerce") || s.includes("e-commerce") || s.includes("commerce") || s.includes("retail");
      }),
    []
  );
  const featuredEcom = ecommerceStudies.slice(0, 3);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", website: "", phone: "" });
  const [formState, setFormState] = useState<FormState>("idle");

  const openModal = () => {
    setFormState("idle");
    setShowModal(true);
  };

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

  const inputCls = `w-full ${radius.control} border px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-[#534AB7]`;

  const RealityCheckButton = ({ label = "Get a reality check", onDark = false }) => (
    <button
      type="button"
      onClick={openModal}
      className={`group inline-flex items-center justify-center gap-2 ${radius.control} px-7 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 ${focusRing} ${
        onDark ? "bg-white text-[#0a0f2e]" : "bg-[#534AB7] text-white hover:bg-[#3C3489]"
      }`}
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
    </button>
  );

  return (
    <main>
      <PageHero
        centered
        eyebrow="Ecommerce SEO"
        title="Ecommerce SEO that turns product pages into revenue"
        subtitle="We scale technical SEO, product-page content, and indexing recovery across thousands of SKUs — for WooCommerce, Shopify, and custom stores. Real audits, real fixes, real revenue lift."
        actions={
          <>
            <RealityCheckButton />
            <Link
              href="/case-studies"
              className={`inline-flex items-center gap-2 ${radius.control} border px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-[#f8f9fc] ${focusRing}`}
              style={{ borderColor: color.borderStrong, color: color.ink }}
            >
              See ecommerce case studies
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </>
        }
        trustPoints={["Every result verified with Google Search Console data"]}
      />

      <StatStrip stats={HERO_STATS} />

      {/* ── 2 · PAIN POINTS ── */}
      <Section tone="surface">
        <SectionHeading
          variant="center"
          eyebrow="The problem"
          title="Why big catalogs stall"
          intro="Four failure modes account for almost every stuck ecommerce store we audit."
        />
        <CardGrid columns={2}>
          {PAIN_POINTS.map((p) => (
            <FeatureCard
              key={p.title}
              icon={<p.icon className="h-5 w-5" style={{ color: color.danger }} aria-hidden />}
              title={p.title}
              body={p.body}
            />
          ))}
        </CardGrid>
      </Section>

      {/* ── 3 · PILLARS ── */}
      <Section>
        <SectionHeading
          variant="center"
          eyebrow="Our approach"
          title="Six pillars of an ecommerce SEO program"
          intro="Each one maps to a specific reason Google is under-serving your catalog."
        />
        <CardGrid variant="cards" columns={3}>
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className={`${radius.card} border bg-white p-7`}
              style={{ borderColor: color.border }}
            >
              <p.icon className="mb-4 h-6 w-6" style={{ color: color.primary }} aria-hidden />
              <h3 className={`${heading.h4} mb-2`} style={{ color: color.ink }}>{p.title}</h3>
              <p className={`${text.small} mb-4`} style={{ color: color.muted }}>{p.body}</p>
              <ul className="space-y-2">
                {p.points.map((pt) => (
                  <li key={pt} className={`flex items-start gap-2 ${text.caption}`} style={{ color: color.muted }}>
                    <span
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                      style={{ background: color.success }}
                      aria-hidden
                    />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardGrid>
      </Section>

      {/* ── 4 · CASE STUDIES ── */}
      {featuredEcom.length > 0 ? (
        <Section tone="surface">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              className="mb-0"
              eyebrow="Proof"
              title="Ecommerce stores we&rsquo;ve moved the needle for"
            />
            <Link
              href="/case-studies?type=ecommerce-seo"
              className={`inline-flex items-center gap-1.5 ${text.small} font-semibold hover:opacity-70`}
              style={{ color: color.primary }}
            >
              View all ecommerce case studies
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredEcom.map((cs) => (
              <CaseCard key={cs.id} cs={cs} />
            ))}
          </div>
        </Section>
      ) : null}

      {/* ── 5 · PROCESS ── */}
      <Section>
        <SectionHeading
          variant="center"
          eyebrow="How we work"
          title="A four-phase engagement, built for scale"
          intro="Predictable process, transparent reporting, no black-box tactics."
        />
        <CardGrid columns={4}>
          {PROCESS.map((p) => (
            <FeatureCard key={p.step} step={p.step} title={p.title} body={p.body} />
          ))}
        </CardGrid>
      </Section>

      {/* ── 6 · TOOLING ── */}
      <Section tone="surface" width="narrow" tight>
        <SectionHeading variant="center" eyebrow="Tooling" title="The stack we run every program on" />
        <ul className="flex flex-wrap justify-center gap-2">
          {TOOLING.map((t) => (
            <li
              key={t}
              className={`${radius.control} border bg-white px-4 py-2 text-sm font-semibold`}
              style={{ borderColor: color.border, color: color.ink }}
            >
              {t}
            </li>
          ))}
        </ul>
      </Section>

      {/* ── 7 · FOUNDER — E-E-A-T ── */}
      <Section width="narrow" tight>
        <AuthorCard
          name="Mubashar Shahzad"
          role="Founder & Lead Ecommerce SEO Strategist · 5+ years"
          quote="Full-stack ecommerce SEO — technical SEO, on-page optimization, content strategy, structured data, and indexing recovery at scale. I currently run programs on WooCommerce, Shopify, and custom Next.js stores across the US."
          imageSrc="/images/mubashar-shahzad.jpg"
          imageAlt="Mubashar Shahzad — Founder & Lead Ecommerce SEO Strategist"
          linkedinUrl={linkedinUrl}
          credential="Verified Ecommerce SEO Expert"
          badges={["Semrush certified", "HubSpot certified", "+92 310 652 6316"]}
        />
      </Section>

      {/* ── 8 · FAQ ── */}
      <Section tone="surface" width="reading">
        <SectionHeading variant="center" eyebrow="FAQ" title="Frequently asked questions" />
        <FaqList faqs={FAQS} name="ecommerce-seo-faq" />
      </Section>

      {/* ── 9 · FINAL CTA ── */}
      <Section tone="ink" width="narrow" bordered={false}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className={`${heading.h2} mb-4 text-white`}>
            Ready to see what&rsquo;s holding your store back?
          </h2>
          <p className={`${text.lead} mb-9 text-white/60`}>
            Get a free reality check — full technical + content + indexing audit, benchmarked against
            2 competitors, with a 90-day priority roadmap. Founder-reviewed, delivered in 24 hours.
          </p>
          <RealityCheckButton onDark />
        </motion.div>
      </Section>

      {/* ── FLOATING CTA ── */}
      <button
        type="button"
        onClick={openModal}
        className={`fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full px-4 py-3 ${text.small} font-semibold text-white shadow-xl transition-all hover:scale-105 sm:bottom-5 sm:right-5 sm:px-5 sm:py-3.5 ${focusRing}`}
        style={{ background: color.primary }}
      >
        <BarChart3 className="h-4 w-4" aria-hidden /> Reality Check
      </button>

      {/* ── REALITY CHECK MODAL ── */}
      <AnimatePresence>
        {showModal ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Request a reality check"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-md ${radius.card} bg-white p-8`}
            >
              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label="Close"
                className={`absolute right-4 top-4 ${radius.chip} p-1 transition-colors hover:bg-[#f8f9fc] ${focusRing}`}
                style={{ color: color.muted }}
              >
                <X className="h-5 w-5" aria-hidden />
              </button>

              {formState === "sent" ? (
                <div className="py-6 text-center">
                  <ShieldCheck className="mx-auto mb-4 h-10 w-10" style={{ color: color.success }} aria-hidden />
                  <h2 className={`${heading.h3} mb-2`} style={{ color: color.ink }}>Request received</h2>
                  <p className={text.small} style={{ color: color.muted }}>
                    We&rsquo;ll be in touch within 24 hours with your reality check.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className={`${heading.h3} mb-2`} style={{ color: color.ink }}>Reality Check</h2>
                  <p className={`${text.small} mb-6`} style={{ color: color.muted }}>
                    Free technical + content + indexing audit, benchmarked against 2 competitors.
                    Founder-reviewed, delivered in 24 hours.
                  </p>

                  <div className="space-y-3">
                    {(
                      [
                        { key: "name", label: "Your name", type: "text", autoComplete: "name" },
                        { key: "email", label: "Work email", type: "email", autoComplete: "email" },
                        { key: "website", label: "Store URL", type: "url", autoComplete: "url" },
                        { key: "phone", label: "Phone (optional)", type: "tel", autoComplete: "tel" },
                      ] as const
                    ).map((f) => (
                      <label key={f.key} className="block">
                        <span className="sr-only">{f.label}</span>
                        <input
                          type={f.type}
                          autoComplete={f.autoComplete}
                          placeholder={f.label}
                          value={form[f.key]}
                          onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                          className={inputCls}
                          style={{ borderColor: color.border }}
                        />
                      </label>
                    ))}
                  </div>

                  {formState === "error" ? (
                    <p className={`${text.small} mt-3`} style={{ color: color.danger }}>
                      Something went wrong. Please try again, or call {`+92 310 652 6316`}.
                    </p>
                  ) : null}

                  <button
                    type="button"
                    onClick={submit}
                    disabled={formState === "sending" || !form.name || !form.email || !form.website}
                    className={`mt-5 flex w-full items-center justify-center gap-2 ${radius.control} bg-[#534AB7] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#3C3489] disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`}
                  >
                    {formState === "sending" ? "Sending…" : "Request reality check"}
                    {formState === "sending" ? null : <ArrowRight className="h-4 w-4" aria-hidden />}
                  </button>

                  <p className={`${text.caption} mt-3 text-center`} style={{ color: color.subtle }}>
                    No obligation. We don&rsquo;t share your data.
                  </p>
                </>
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}

/* ─── Case study card ─── */

function CaseCard({ cs }: { cs: CaseStudy }) {
  const img = cardImage(cs);

  return (
    <Link
      href={detailUrl(cs)}
      className={`group flex flex-col overflow-hidden ${radius.card} border bg-white transition-all hover:-translate-y-1 hover:shadow-xl ${focusRing}`}
      style={{ borderColor: color.border }}
    >
      <div className="relative aspect-[16/10] overflow-hidden" style={{ background: color.surfaceAlt }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className={`${heading.eyebrow} mb-2`} style={{ color: color.primary }}>
          {cs.industry} · {cs.location}
        </p>
        <h3 className={`${heading.h4} mb-4 flex-1`} style={{ color: color.ink }}>
          {cs.headline}
        </h3>
        <dl className="flex flex-wrap gap-4 border-t pt-4" style={{ borderColor: color.border }}>
          {cs.metrics.slice(0, 3).map((m) => (
            <div key={m.l}>
              <dd className="text-lg font-bold" style={{ color: color.success }}>{m.v}</dd>
              <dt className={text.caption} style={{ color: color.muted }}>{m.l}</dt>
            </div>
          ))}
        </dl>
      </div>
    </Link>
  );
}

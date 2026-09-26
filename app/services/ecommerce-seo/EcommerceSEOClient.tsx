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
import { caseStudies, detailUrl, type CaseStudy } from "@/app/case-studies/data";
import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import ProofImage from "@/components/ProofImage";
import { RETAINER_PLANS, formatRange } from "@/lib/pricing";
import { ECOMMERCE_INDUSTRIES } from "@/lib/ecommerce-industries";
import { CAPSULES, FAQS } from "./data";
import {
  AuthorCard,
  CardGrid,
  FaqList,
  AnswerCapsules,
  ComparisonTable,
  FeatureCard,
  PageHero,
  Section,
  SectionHeading,
  StatStrip,
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

// One fact per stat, each with the store and window it comes from. The strip
// used to read "+285% pages indexed", "+285% indexing rate" (the same fact
// twice), "12K+ product pages indexed" (the screenshot says 11,549) and "40+
// ecommerce sites scaled", which nothing on the site backs.
const HERO_STATS = [
  { value: "3,000 → 11,549", label: "Pages indexed · Michigan Sports & Outdoor, May–Jul 2026" },
  { value: "$5.8k → $19.1k", label: "Monthly revenue · SMK Store, Apr–Jun 2026" },
  { value: "+83%", label: "US organic clicks · Michigan Sports & Outdoor" },
  { value: "24h", label: "Tear-down reply" },
];
const SOURCE = "service:ecommerce-seo";
const ECOM_PLAN = RETAINER_PLANS.find((p) => p.niche === "Ecommerce SEO");

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
  // Rewritten to match /blog/google-indexing-api-python, which retracted the
  // Indexing API approach on 27 Aug 2026: Google restricts that API to job
  // postings and livestreams and names multi-account rotation as
  // circumvention. This card was still selling both.
  { icon: Zap, title: "Indexing recovery", body: "Sitemap-to-GSC diffing that shows which URLs Google declined and why, then the fix for each reason: crawl waste reclaimed, clean sitemaps split by template, internal links to orphaned products, and batched resubmission through Search Console.", points: ["Automated Sitemap ↔ GSC diff", "Crawled vs. discovered — triaged by reason", "Batched resubmission, re-measured in cohorts"] },
  { icon: TrendingUp, title: "AEO + AI Overview optimization", body: "Answer engine optimization for ChatGPT, Perplexity, Gemini, and Google's AI Overviews. Entity optimization, knowledge graph signals, and citation-worthy content that gets picked up as source material.", points: ["FAQ-first content architecture", "Entity + author schema for E-E-A-T", "Semantic clustering for AI retrievability"] },
];

const PROCESS = [
  { step: "01", title: "Reality check audit", body: "Full technical + content + indexing audit. Crawl your site, pull GSC + GA4 data, benchmark against 2 competitors, and deliver a 90-day roadmap with priorities scored by impact and effort." },
  { step: "02", title: "Strategy & scoping", body: "Confirm target categories, product batches, and technical fix priorities. Align on tooling (WordPress, Shopify, custom), reporting cadence, and content production capacity." },
  { step: "03", title: "Execution", body: "Weekly sprints — technical fixes shipped by our dev partner, content published in measured batches, schema deployed, and resubmitted through Search Console. Every change logged in a shared roadmap." },
  { step: "04", title: "Monitor & iterate", body: "Weekly reporting on indexation rate, impressions, clicks, and revenue attribution. Monthly review call. Automated alerts for indexing drops, ranking losses, and Core Web Vitals regressions." },
];

const TOOLING = [
  "Google Search Console", "GA4", "Screaming Frog", "Ahrefs", "Semrush",
  "Surfer SEO", "Looker Studio", "Log File Analyzer", "PageSpeed Insights",
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

  return (
    <main>
      <PageHero
        eyebrow="Ecommerce SEO"
        title="Ecommerce SEO Services that turn product pages into revenue"
        subtitle="We scale technical SEO, product-page content, and indexing recovery across thousands of SKUs — for WooCommerce, Shopify, and custom stores. Real audits, real fixes, real revenue lift."
        aside={
          <ArticleLeadMagnet
            variant="sidebar"
            source={SOURCE}
            copy={{
              headline: "Free store tear-down",
              sub: "Send your store URL. I’ll check which products Google is refusing to index and why — and send back what to fix first, within 24 hours.",
            }}
          />
        }
        actions={
          <>
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

      {/* ── QUICK ANSWERS ──
          Answer capsules for AI Overviews and answer engines. The results answer
          uses only figures with a named source: MSO from Search Console, SMK from
          the client's WooCommerce dashboard (total revenue — never a US figure). */}
      <Section width="reading">
        <SectionHeading eyebrow="Quick answers" title="Ecommerce SEO, answered plainly" />
        <AnswerCapsules items={CAPSULES} />
        <div className="mt-8">
          <ComparisonTable
            caption="Where Shopify and WooCommerce stores typically run into SEO problems"
            columns={["Shopify", "WooCommerce"]}
            rows={[
              { label: "URL structure", values: ["Fixed prefixes (/products/, /collections/)", "Fully configurable permalinks"] },
              { label: "Typical duplicate URLs", values: ["Products reachable under /collections/…/products/…", "Filter, sort and attribute parameters"] },
              { label: "robots.txt control", values: ["Editable through the robots.txt.liquid template", "Fully editable"] },
              { label: "Common speed drag", values: ["Third-party app scripts", "Hosting and plugin load"] },
            ]}
          />
        </div>
      </Section>

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

      {/* ── MID-PAGE FORM ── */}
      <Section tight>
        <ArticleLeadMagnet
          variant="banner"
          source={SOURCE}
          copy={{
            eyebrow: "Recognise one of those?",
            headline: "Find out how much of your catalogue Google is ignoring.",
            sub: "Send me your store URL. I’ll compare your sitemap with what Google has actually indexed and tell you what to fix first — free, within 24 hours.",
          }}
        />
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
          {/* The screenshots behind the two headline figures, before the cards. */}
          <div className="mb-10 grid gap-6 lg:grid-cols-3">
            <ProofImage
              src="/images/proof/smk-revenue-before.png"
              alt="SMK Store WooCommerce dashboard for April 2026, showing $5,832.02 net sales for the month."
              width={1366}
              height={607}
              frameAspect="16 / 9"
              stage="SMK Store · April 2026"
              caption="Net sales: $5,832"
            />
            <ProofImage
              src="/images/proof/smk-revenue-after.png"
              alt="SMK Store WooCommerce dashboard for June 2026, showing $19,100.71 net sales for the month."
              width={863}
              height={350
}
              frameAspect="16 / 9"
              stage="SMK Store · June 2026"
              caption="Net sales: $19,100"
            />
            <ProofImage
              src="/images/proof/mso-gsc-indexing-full.png"
              alt="Google Search Console Pages report for Michigan Outdoor Sports: about 3,000 indexed pages in mid-May 2026 rising to 11,549 on 25 July 2026."
              width={778}
              height={520}
              frameAspect="16 / 9"
              stage="Michigan Sports & Outdoor · May–Jul 2026"
              caption="About 3,000 → 11,549 pages indexed"
            />
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
          name="Mubashar Sharif"
          role="Founder & Lead Ecommerce SEO Strategist · 5+ years"
          quote="Full-stack ecommerce SEO — technical SEO, on-page optimization, content strategy, structured data, and indexing recovery at scale. Both published case studies are WooCommerce stores, one with more than 35,000 products."
          imageSrc="/images/mubashar-sharif.jpg"
          imageAlt="Mubashar Sharif — Founder & Lead Ecommerce SEO Strategist"
          linkedinUrl={linkedinUrl}
          credential="Semrush-certified"
          badges={["Semrush certified", "+92 305 9158010"]}
        />
      </Section>

      {/* ── BY PLATFORM & NICHE ── hub and spoke to each sub-page */}
      <Section>
        <SectionHeading
          eyebrow="By platform and niche"
          title="Ecommerce SEO for your kind of store"
          intro="WooCommerce and knife & outdoor stores are where the case studies are. The Shopify page says plainly that there isn't one yet."
        />
        <CardGrid columns={3}>
          {ECOMMERCE_INDUSTRIES.map((i) => {
            const cs = caseStudies.find((c) => c.slug.client === i.caseClients[0]);
            const metric = cs?.metrics[0];
            return (
              <Link
                key={i.slug}
                href={`/services/ecommerce-seo/${i.slug}`}
                className="group rounded-2xl border border-[#e5e7eb] bg-white p-5 transition-all hover:border-[#534AB7] hover:shadow-md"
              >
                <p className="text-base font-black text-[#0a0f2e] group-hover:text-[#534AB7]">{i.h1}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-[#5b6472]">
                  {cs && metric ? (
                    <>
                      <strong className="text-[#0a0f2e]">{metric.v}</strong> {metric.l} · {cs.client}
                    </>
                  ) : (
                    "No case study yet — what I would fix, and how."
                  )}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#534AB7]">
                  See {i.name} SEO <ArrowRight className="h-3 w-3" aria-hidden />
                </span>
              </Link>
            );
          })}
        </CardGrid>
      </Section>

      {/* ── PRICE ── */}
      {ECOM_PLAN ? (
        <Section>
          <SectionHeading variant="center" eyebrow="What it costs" title="Ecommerce SEO pricing" />
          <div className="mx-auto max-w-2xl rounded-2xl border-2 p-6 text-center" style={{ borderColor: ECOM_PLAN.accent, background: ECOM_PLAN.bg }}>
            <p className="text-3xl font-black" style={{ color: ECOM_PLAN.accent }}>
              {formatRange(ECOM_PLAN)} <span className="text-base font-bold" style={{ color: color.muted }}>/ month</span>
            </p>
            <p className="mt-2 text-sm text-[#374151]">{ECOM_PLAN.best}: {ECOM_PLAN.includes.join(" · ")}</p>
            <p className="mt-3 text-xs leading-relaxed" style={{ color: color.muted }}>
              Where a store lands in the range depends on catalogue size, technical scope and content volume. Month to month.
            </p>
            <Link href="/pricing" className="mt-3 inline-flex items-center gap-1 text-sm font-bold" style={{ color: color.primary }}>
              Full pricing <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Section>
      ) : null}

      {/* ── 8 · FAQ ── */}
      <Section tone="surface" width="reading">
        <SectionHeading variant="center" eyebrow="FAQ" title="Frequently asked questions" />
        <FaqList faqs={FAQS} name="ecommerce-seo-faq" />
      </Section>

      {/* ── 9 · FINAL CTA — was a button opening a four-field modal; now the
          two-field form in place. The floating "Reality Check" button and its
          modal stay for anyone who would rather leave a phone number. ── */}
      <ArticleLeadMagnet
        variant="bottom"
        source={SOURCE}
        copy={{
          headline: "Send me your store URL. I’ll tell you what Google is ignoring.",
          sub: "Two fields. Which products are indexed, which aren’t and why — from me, within 24 hours.",
        }}
      />

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
                      Something went wrong. Please try again, or call {`+92 305 9158010`}.
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

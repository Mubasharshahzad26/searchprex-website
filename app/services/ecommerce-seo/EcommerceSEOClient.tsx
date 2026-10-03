"use client";

// app/services/ecommerce-seo/EcommerceSEOClient.tsx
//
// Topical layout (Oct 2026), built from components/ServiceBands like the other
// service pages: bands that alternate dark navy and white, each with one
// heading, a short paragraph and a "what I check" list.
//
// Figures, each readable in a screenshot on this page or its case study:
//   - Michigan Sports & Outdoor: about 3,000 → 11,549 indexed pages, May–Jul
//     2026 (Search Console Pages report); US clicks 224 → 322, 1 Apr–12 Jun vs
//     13 Jun–29 Aug 2026 (Search Console Performance).
//   - SMK Store: net sales $5,832 (April 2026) → $19,100 (June 2026), from the
//     client's WooCommerce dashboard — total revenue, never a US figure.
//   - Michigan Sports & Outdoor: +83% US organic clicks by July 2026, as the
//     case study reports it.
//
// Dropped in this layout: the stat strip, the case-study cards (they fell back
// to Unsplash stock photos), the mid-page guide magnet and WhySearchPrex. Kept:
// the AI image banner, the Shopify vs WooCommerce table, the floating "Reality
// Check" button and its modal.

import { trackLead } from "@/lib/track";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, ShieldCheck, BarChart3, AlertTriangle, GitBranch, FileCode, Layers } from "lucide-react";

import { caseStudies } from "@/app/case-studies/data";
import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import type { Guide } from "@/lib/guides";
import ProofImage from "@/components/ProofImage";
import ServiceProofStrip from "@/components/ServiceProofStrip";
import { RETAINER_PLANS } from "@/lib/pricing";
import { ECOMMERCE_INDUSTRIES } from "@/lib/ecommerce-industries";
import { AuthorCard, ComparisonTable, FaqList } from "@/components/layout";
import { color, focusRing, heading, radius, text } from "@/lib/design-tokens";
import {
  BODY,
  INK,
  PURPLE,
  Band,
  BandIntro,
  CheckList,
  CheckPanel,
  Eyebrow,
  FaqBand,
  GuaranteeCard,
  H2,
  Lead,
  PriceCard,
  ProofPanel,
  RealityBanner,
  RuleGrid,
  RuleItem,
  ServiceHero,
  Steps,
  TextLink,
} from "@/components/ServiceBands";

import { CAPSULES, FAQS } from "./data";

const SOURCE = "service:ecommerce-seo";
const ECOM_PLAN = RETAINER_PLANS.find((p) => p.niche === "Ecommerce SEO");

const PAIN_POINTS = [
  { icon: AlertTriangle, title: "Thousands of products, hundreds indexed", body: "Google crawls but refuses to index thin product pages. Your catalog exists in the sitemap and nowhere else — no impressions, no clicks, no revenue." },
  { icon: GitBranch, title: "Faceted navigation eating crawl budget", body: "Filter combinations spawn huge numbers of low-value URLs. Google spends its crawl on color × size × price permutations instead of your money pages." },
  { icon: FileCode, title: "No structured data, no rich results", body: "Missing Product, Offer and Review schema means competitors get price and rating snippets while you get plain blue links." },
  { icon: Layers, title: "Category pages that don't rank", body: "A product grid and a thin H1. Google sees a list of thumbnails — nothing to rank for competitive commercial searches." },
];

const PILLARS = [
  { title: "Technical foundation", body: "Crawl budget, faceted navigation rules, canonicals, sitemap architecture and Core Web Vitals on WooCommerce, Shopify and custom stacks.", href: "#indexing" },
  { title: "Product pages at scale", body: "Unique descriptions, Product markup and internal links across thousands of SKUs — published in batches and measured.", href: "/services/ecommerce-seo/product-page-seo" },
  { title: "Category page authority", body: "Thin collection pages turned into buying guides: intro copy, comparison tables and FAQs a shopper actually uses.", href: "#platforms" },
  { title: "Structured data", body: "Product, Offer, Review, Breadcrumb and FAQ schema mapped to real on-page data. No fabricated ratings.", href: "#indexing" },
  { title: "Indexing recovery", body: "Sitemap-to-Search-Console diffing that shows which URLs Google declined and why — then the fix for each reason.", href: "#indexing" },
  { title: "AI Overview readiness", body: "Clear product and category answers that Google’s AI Overviews, ChatGPT and Perplexity can lift as a source.", href: "#process" },
];

const indexingChecks = [
  "Sitemap URLs compared with what Search Console says is indexed",
  "“Crawled – currently not indexed” sorted by template and cause",
  "Filter, sort and parameter URLs eating crawl budget",
  "Near-duplicate manufacturer descriptions across products",
  "Products with no price, image or stock that Google skips",
  "Orphaned products no category or brand page links to",
  "Core Web Vitals on product and category templates",
];

const PROCESS = [
  { when: "Day 1", title: "Free tear-down", body: "Your store URL in, a written look back within 24 hours: which products Google is refusing to index, and why." },
  { when: "Weeks 1–2", title: "Audit & roadmap", body: "Crawl, Search Console and GA4 data, two competitors benchmarked, and a 90-day plan ranked by impact." },
  { when: "Weekly sprints", title: "Execution", body: "Technical fixes shipped, content published in measured batches, schema deployed and resubmitted — every change logged." },
  { when: "Every Monday", title: "Report", body: "Indexed pages, impressions, clicks and revenue — what moved, what did not, and what happens next." },
];

const TOOLING = ["Google Search Console", "GA4", "Screaming Frog", "Ahrefs", "Semrush", "Looker Studio", "PageSpeed Insights"];

const RELATED = [
  { href: "/case-studies/ecommerce/smk-store", title: "SMK Store case study", body: "35,000 products: thin copy, indexing and site quality rebuilt — $5,832 to $19,100 a month." },
  { href: "/case-studies/ecommerce/michigan-outdoor-sports", title: "Michigan Sports & Outdoor case study", body: "A de-indexing setback, then about 3,000 to 11,549 indexed pages." },
  { href: "/resources/woocommerce-seo-checklist", title: "WooCommerce SEO checklist", body: "25 checks in the order the case-study work was done. Free, no email." },
  { href: "/services/technical-seo", title: "Technical SEO services", body: "Crawling, indexing and Core Web Vitals fixed at the template." },
  { href: "/blog/crawl-budget-optimization-guide", title: "Crawl budget guide", body: "Why Google skips pages on big sites, and how to stop it." },
  { href: "/blog/ecommerce-product-page-seo", title: "Product page SEO at scale", body: "Product pages for 10,000+ SKUs without thin or duplicate copy." },
];

type FormState = "idle" | "sending" | "sent" | "error";

// `guide` is still passed by page.tsx; the checklist is linked from the related band.
export default function EcommerceSEOClient({ linkedinUrl, guide: _guide }: { linkedinUrl: string; guide: Guide }) {
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
      trackLead("reality_check", "ecommerce-seo");
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
      <ServiceHero
        crumb="Ecommerce SEO"
        eyebrow="Ecommerce SEO services"
        title="Ecommerce SEO Services"
        accent="that turn product pages into revenue"
        subtitle="Technical SEO, product-page content and indexing recovery across thousands of SKUs — for WooCommerce, Shopify and custom stores."
        primary={{ href: "#proof", label: "See store results" }}
        secondary={{ href: "#process", label: "How it works" }}
        trustPoints={["The founder does the work", "90-day money-back guarantee", "Month to month"]}
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
      />

      <ServiceProofStrip
        id="proof"
        title="An outdoor store's US clicks, before and after the rebuild"
        moreHref="/case-studies/ecommerce/michigan-outdoor-sports"
        moreLabel="Read the Michigan Sports & Outdoor case study"
        shots={[
          {
            src: "/images/clicks-comaprsion-after-run-mso-autopilot.PNG",
            alt: "Google Search Console comparison for michigansportsoutdoor.com, United States only: 322 clicks from 13 June to 29 August 2026 against 224 clicks from 1 April to 12 June 2026.",
            width: 1366,
            height: 520,
            figure: "224 → 322",
            figureLabel: "US organic clicks",
            delta: "+44%",
            caption: "Michigan Sports & Outdoor — Search Console, United States only: 1 Apr–12 Jun vs 13 Jun–29 Aug 2026.",
          },
        ]}
      />

      {/* THE PROBLEM */}
      <Band>
        <BandIntro
          center={false}
          eyebrow="The problem"
          title="Why big catalogs stall"
          lead="Four failure modes account for almost every stuck store I audit."
        />
        <RealityBanner
          src="/images/audiences/ecommerce-inventory-stress.webp"
          alt="Ecommerce store owner in warehouse worried about unindexed product catalog and rising ad CAC"
          tag="The Reality · Inventory Stagnation"
          quote="“Thousands of product SKUs in the warehouse, rising ad CAC, and Google indexing less than half.”"
          body="Large catalogues stall in the same places: thin manufacturer descriptions, crawl budget waste, and products trapped in duplicate parameter URLs. I unblock indexing so your catalogue earns organic sales."
        />
        <RuleGrid columns={2}>
          {PAIN_POINTS.map((p) => (
            <RuleItem
              key={p.title}
              icon={<p.icon className="h-5 w-5 flex-shrink-0 text-[#b8123a]" aria-hidden />}
              title={p.title}
              body={p.body}
            />
          ))}
        </RuleGrid>
      </Band>

      {/* WHAT'S INCLUDED */}
      <Band dark>
        <BandIntro
          dark
          eyebrow="What’s included"
          title="Six parts of an ecommerce SEO program"
          lead="Each one maps to a specific reason Google is under-serving your catalog. I start with the ones your store is missing."
        />
        <RuleGrid>
          {PILLARS.map((p) => (
            <RuleItem key={p.title} dark {...p} />
          ))}
        </RuleGrid>
      </Band>

      {/* INDEXING */}
      <Band id="indexing">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Indexing recovery</Eyebrow>
            <H2>A product Google won’t index can’t sell</H2>
            <Lead>
              Most stuck stores don’t have a ranking problem, they have an indexing one. Google found the pages and decided they were not worth keeping. Resubmitting rarely helps; fixing the reason does.
            </Lead>
            <Lead>I sort every unindexed URL by the reason Search Console gives, fix the highest-revenue products first and re-measure before the next batch.</Lead>
            <TextLink href="/services/technical-seo/indexing-recovery">Indexing recovery service</TextLink>
            <div><TextLink href="/services/ecommerce-seo/product-page-seo">Product page SEO at catalog scale</TextLink></div>
          </div>
          <CheckPanel items={indexingChecks} />
        </div>
      </Band>

      {/* CASE STUDIES */}
      <Band dark>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center [&>*]:min-w-0">
          <div>
            <Eyebrow dark>Ecommerce SEO in action</Eyebrow>
            <H2 dark>Two WooCommerce stores, unedited screenshots</H2>
            <Lead dark>
              SMK Store has more than 35,000 products; Michigan Sports & Outdoor came back from a de-indexing. The work was the same in both: thin copy rewritten, crawl waste removed, indexing fixed and resubmitted in batches.
            </Lead>
            <div className="mt-8">
              <CheckList
                dark
                items={[
                  "SMK Store net sales $5,832 (April 2026) → $19,100 (June 2026), WooCommerce dashboard",
                  "Michigan Sports & Outdoor: about 3,000 → 11,549 indexed pages, May–July 2026, and +83% US organic clicks by July",
                  "Michigan Sports & Outdoor US clicks 224 → 322 (1 Apr–12 Jun vs 13 Jun–29 Aug 2026)",
                ]}
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6">
              <TextLink dark href="/case-studies/ecommerce/smk-store">SMK Store case study</TextLink>
              <TextLink dark href="/case-studies/ecommerce/michigan-outdoor-sports">Michigan Sports & Outdoor case study</TextLink>
            </div>
          </div>
          <ProofPanel>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 [&>*]:min-w-0">
              <ProofImage
                src="/images/proof/smk-revenue-before-v2.png"
                alt="SMK Store WooCommerce dashboard for April 2026, showing $5,832.02 net sales for the month."
                width={1366}
                height={607}
                frameAspect="16 / 9"
                stage="SMK Store · April 2026"
                caption="Net sales: $5,832"
              />
              <ProofImage
                src="/images/proof/smk-revenue-after-v2.png"
                alt="SMK Store WooCommerce dashboard for June 2026, showing $19,100.71 net sales for the month."
                width={863}
                height={350}
                frameAspect="16 / 9"
                stage="SMK Store · June 2026"
                caption="Net sales: $19,100"
              />
            </div>
            <ProofImage
              src="/images/proof/mso-gsc-indexing-full.png"
              alt="Google Search Console Pages report for Michigan Outdoor Sports: about 3,000 indexed pages in mid-May 2026 rising to 11,549 on 25 July 2026."
              width={778}
              height={520}
              frameAspect="16 / 9"
              stage="Michigan Sports & Outdoor · May–Jul 2026"
              caption="About 3,000 → 11,549 pages indexed"
            />
          </ProofPanel>
        </div>
      </Band>

      {/* PLATFORMS & NICHES */}
      <Band muted id="platforms">
        <BandIntro
          eyebrow="Platforms & niches"
          title="Ecommerce SEO for your kind of store"
          lead="WooCommerce and knife & outdoor stores are where the case studies are. The Shopify page says plainly that there isn’t one yet."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ECOMMERCE_INDUSTRIES.map((i) => {
            const cs = caseStudies.find((c) => c.slug.client === i.caseClients[0]);
            const metric = cs?.metrics[0];
            return (
              <Link
                key={i.slug}
                href={`/services/ecommerce-seo/${i.slug}`}
                className="group rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <p className="text-lg font-black group-hover:text-[#534AB7]" style={{ color: INK }}>{i.h1}</p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: BODY }}>
                  {cs && metric ? (
                    <>
                      <strong style={{ color: INK }}>{metric.v}</strong> {metric.l} · {cs.client}
                    </>
                  ) : (
                    "No case study yet — what I would fix, and how."
                  )}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold" style={{ color: PURPLE }}>
                  See {i.name} SEO <ArrowRight className="h-3 w-3" aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>
        <div className="mx-auto mt-12 max-w-4xl">
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
      </Band>

      {/* PROCESS */}
      <Band dark id="process">
        <BandIntro dark eyebrow="How it works" title="From free tear-down to indexed, selling products" />
        <Steps steps={PROCESS} cta={{ href: "#get-started", label: "Get my free store tear-down" }} />
      </Band>

      {/* PRICE, GUARANTEE & WHO DOES THE WORK */}
      <Band>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Why SearchPrex</Eyebrow>
            <H2>One person, one roadmap, a clear price</H2>
            <Lead>
              You work with the person who audits your store and ships the fixes. Priorities are ranked by what brings revenue, and every change is logged.
            </Lead>
            <div className="mt-8">
              <CheckList
                items={[
                  "The founder does the work — no account managers in between",
                  "A written roadmap before you pay anything",
                  "Fixes shipped, not just a PDF of problems",
                  "A plain-English report every Monday",
                  "Month to month, no long contract",
                ]}
              />
            </div>
            <p className="mt-8 text-xs font-bold uppercase tracking-wider" style={{ color: BODY }}>Tools I work with</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {TOOLING.map((t) => (
                <li key={t} className="rounded-full bg-[#f4f5f8] px-3 py-1.5 text-xs font-bold" style={{ color: INK }}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            {ECOM_PLAN ? (
              <PriceCard
                plan={ECOM_PLAN}
                label="Ecommerce SEO"
                note="Where a store lands in the range depends on catalogue size, technical scope and content volume. Month to month."
              />
            ) : null}
            <GuaranteeCard />
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-4xl">
          <AuthorCard
            name="Mubashar Sharif"
            role="Founder · 5+ years · Semrush & HubSpot certified"
            quote="Full-stack ecommerce SEO — technical SEO, on-page optimization, content strategy, structured data, and indexing recovery at scale. Both published case studies are WooCommerce stores, one with more than 35,000 products."
            imageSrc="/images/mubashar-sharif.jpg"
            imageAlt="Mubashar Sharif — Founder of SearchPrex"
            linkedinUrl={linkedinUrl}
            badges={["Semrush certified", "HubSpot certified", "+92 305 9158010"]}
          />
        </div>
      </Band>

      {/* KEEP READING */}
      <Band dark>
        <BandIntro dark eyebrow="Keep reading" title="The case studies and guides behind this page" />
        <RuleGrid>
          {RELATED.map((r) => (
            <RuleItem key={r.href} dark {...r} />
          ))}
        </RuleGrid>
      </Band>

      {/* FAQ — page.tsx builds the FAQPage schema from the same arrays */}
      <FaqBand title="Ecommerce SEO questions, answered">
        <FaqList faqs={[...CAPSULES, ...FAQS]} name="ecommerce-seo-faq" />
      </FaqBand>

      <div id="get-started">
        <ArticleLeadMagnet
          variant="bottom"
          source={SOURCE}
          copy={{
            headline: "Send me your store URL. I’ll tell you what Google is ignoring.",
            sub: "Two fields. Which products are indexed, which aren’t and why — from me, within 24 hours.",
          }}
        />
      </div>

      {/* FLOATING CTA — for anyone who would rather leave a phone number */}
      <button
        type="button"
        onClick={openModal}
        className={`fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full px-4 py-3 ${text.small} font-semibold text-white shadow-xl transition-all hover:scale-105 sm:bottom-5 sm:right-5 sm:px-5 sm:py-3.5 ${focusRing}`}
        style={{ background: color.primary }}
      >
        <BarChart3 className="h-4 w-4" aria-hidden /> Reality Check
      </button>

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

"use client";

// app/services/ecommerce-seo/EcommerceSEOClient.tsx
//
// USA Market Focus + AEO / GEO / ChatGPT Shopping Architecture (Oct 2026).
// Zero emojis — clean Lucide vector icons only.
//
// Figures, each readable in a screenshot on this page or its case study:
//   - Michigan Sports & Outdoor: about 3,000 → 11,549 indexed pages, May–Jul
//     2026 (Search Console Pages report); US clicks 224 → 322, 1 Apr–12 Jun vs
//     13 Jun–29 Aug 2026 (Search Console Performance).
//   - SMK Store: net sales $5,832 (April 2026) → $19,100 (June 2026), from the
//     client's WooCommerce dashboard — total revenue, never a US figure.
//   - Michigan Sports & Outdoor: +83% US organic clicks by July 2026, as the
//     case study reports it.

import { trackLead } from "@/lib/track";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  X,
  ShieldCheck,
  BarChart3,
  AlertTriangle,
  GitBranch,
  FileCode,
  Layers,
  Zap,
  FileText,
  Wrench,
} from "lucide-react";

import { caseStudies } from "@/app/case-studies/data";
import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import ServiceBlogTeaser from "@/components/ServiceBlogTeaser";
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

import ServiceTaglineReliefBar from "@/components/service-wireframe/ServiceTaglineReliefBar";
import ServiceQuickAnswerBox from "@/components/service-wireframe/ServiceQuickAnswerBox";
import ServiceAiDiagnosisAndTrial from "@/components/service-wireframe/ServiceAiDiagnosisAndTrial";
import ServiceExhaustedByAgencies from "@/components/service-wireframe/ServiceExhaustedByAgencies";
import ServiceSemanticClusterAndLinks from "@/components/service-wireframe/ServiceSemanticClusterAndLinks";

import { CAPSULES, FAQS } from "./data";

const SOURCE = "service:ecommerce-seo";
const ECOM_PLAN = RETAINER_PLANS.find((p) => p.niche === "Ecommerce SEO");

const PAIN_POINTS = [
  { icon: AlertTriangle, title: "Thousands of products, hundreds indexed", body: "Google crawls but refuses to index thin product pages. Your catalog exists in the sitemap and nowhere else — no impressions, no clicks, no revenue." },
  { icon: GitBranch, title: "Faceted navigation eating crawl budget", body: "Filter combinations spawn huge numbers of low-value URLs. Google spends its crawl on color × size × price permutations instead of your money pages." },
  { icon: FileCode, title: "No structured data, no rich results or AI Shopping citations", body: "Missing Product, Offer, Review and MerchantReturnPolicy schema means competitors get price snippets and ChatGPT citations while you get plain links." },
  { icon: Layers, title: "Category pages that don't rank for commercial intent", body: "A product grid and a thin H1. Google and AI Overviews see a list of thumbnails — nothing to rank for competitive US commercial searches." },
];

const PILLARS = [
  { title: "Technical foundation", body: "Crawl budget, faceted navigation rules, canonicals, sitemap architecture and Core Web Vitals (INP/LCP) on WooCommerce, Shopify and custom stacks.", href: "#indexing" },
  { title: "Product pages at scale", body: "Unique descriptions, Product markup and internal links across thousands of SKUs — published in batches and measured.", href: "/services/ecommerce-seo/product-page-seo" },
  { title: "Category page authority", body: "Thin collection pages turned into buying guides: 45–60 word Answer Capsules, comparison tables and FAQs a US shopper actually uses.", href: "#platforms" },
  { title: "Merchant Center & AI Schema", body: "Product, Offer, Review, MerchantReturnPolicy and OfferShippingDetails JSON-LD mapped to real on-page data. No fabricated ratings.", href: "#indexing" },
  { title: "Indexing recovery", body: "Sitemap-to-Search-Console diffing that shows which URLs Google declined and why — then the template fix for each reason.", href: "/services/technical-seo/indexing-recovery" },
  { title: "AI Overview & ChatGPT Shopping", body: "Clear product and category answers plus llms.txt catalog files that Google AI Overviews, ChatGPT and Perplexity lift as a source.", href: "#process" },
];

const indexingChecks = [
  "Sitemap URLs compared with what Search Console says is indexed",
  "“Crawled – currently not indexed” sorted by template and cause",
  "Filter, sort and parameter URLs eating crawl budget",
  "Near-duplicate manufacturer descriptions across products",
  "Products with no price, image or stock that Google skips",
  "Orphaned products no category or brand page links to",
  "Core Web Vitals (INP, LCP, CLS) on product and category templates",
];

const PROCESS = [
  { when: "Days 1–7", title: "7-Day Free Trial & Tear-Down", body: "Your store URL in, a written Sitemap-to-GSC indexing diagnosis within 24 hours, plus 7 days of initial quick-win fixes at zero cost." },
  { when: "Weeks 1–2", title: "Audit & revenue roadmap", body: "Crawl, Search Console and GA4 data, two US competitors benchmarked, and a 90-day plan ranked by revenue impact." },
  { when: "Weekly sprints", title: "Batch execution", body: "Technical fixes shipped, product/category content published in measured batches, schema deployed and resubmitted — every change logged." },
  { when: "Every Monday", title: "Full Stat & Revenue Report", body: "No partial reporting: indexed pages, Search Console clicks, and WooCommerce/Shopify revenue reviewed every Monday." },
];

const TOOLING = ["Google Search Console", "GA4", "Screaming Frog", "Ahrefs", "Semrush", "Looker Studio", "PageSpeed Insights"];

const RELATED = [
  { href: "/case-studies/ecommerce/smk-store", title: "SMK Store case study", body: "35,000 products: thin copy, indexing and site quality rebuilt — $5,832 to $19,100 a month." },
  { href: "/case-studies/ecommerce/michigan-outdoor-sports", title: "Michigan Sports & Outdoor case study", body: "A de-indexing setback, then about 3,000 to 11,549 indexed pages and +83% US clicks." },
  { href: "/resources/woocommerce-seo-checklist", title: "WooCommerce SEO checklist", body: "25 checks in the order the case-study work was done. Free, no email." },
  { href: "/services/technical-seo", title: "Technical SEO services", body: "Crawling, indexing and Core Web Vitals fixed at the template." },
  { href: "/blog/shopify-woocommerce-indexing-blueprint", title: "Shopify & WooCommerce indexing blueprint", body: "8 platform-specific fixes for Liquid canonicals, sitemaps and catalog scale." },
  { href: "/blog/ecommerce-product-page-seo", title: "Product page SEO at scale", body: "Product pages for 10,000+ SKUs without thin or duplicate copy." },
];

const ECOM_SEMANTIC_CLUSTERS = [
  {
    tabName: "Shopify & Liquid Catalog SEO",
    coreEntities:
      "Collection-Path Canonicalization · /collections/*/products/* Deduplication · Shopify robots.txt.liquid · App Script INP Optimization · Product & MerchantReturnPolicy JSON-LD",
    lowHangingKeywords: [
      "shopify collection page seo buying guide template usa",
      "fix duplicate product urls in shopify collections",
      "shopify merchant center return policy schema markup",
      "shopify plus faceted navigation crawl budget optimization",
    ],
    psychologyAndIntent:
      "US Shopify merchants lose organic margin when every product exists at multiple collection URLs and third-party apps drag mobile INP above 300ms. Fixing canonicals and collection buying guides unlocks high-intent commercial buyers.",
    siloHref: "/services/ecommerce-seo/shopify",
    siloLabel: "Explore Shopify SEO Architecture",
  },
  {
    tabName: "WooCommerce High-SKU Scaling",
    coreEntities:
      "35,000+ SKU Sitemap Sharding · ?filter_ & ?orderby= Parameter Blocking · Action Scheduler & wp_options Database Tuning · Speculative Rules API · Batch Indexing Recovery",
    lowHangingKeywords: [
      "woocommerce crawled currently not indexed 10000 products",
      "woocommerce faceted navigation crawl budget fix",
      "scale woocommerce product pages without duplicate manufacturer copy",
      "woocommerce core web vitals inp optimization for large catalogs",
    ],
    psychologyAndIntent:
      "Backed by our verified SMK Store ($5,832 to $19,100/mo) and Michigan Sports & Outdoor (~3,000 to 11,549 indexed pages) case studies, we turn stuck WooCommerce catalogs into compounding organic revenue assets.",
    siloHref: "/services/ecommerce-seo/woocommerce",
    siloLabel: "Explore WooCommerce SEO Architecture",
  },
  {
    tabName: "Product & Category Page AEO/GEO",
    coreEntities:
      "45–60 Word Category Buying Capsules · Comparison Matrices · Unique SKU Attribute HTML · OfferShippingDetails & AggregateRating Schema · llms.txt Catalog Feeds",
    lowHangingKeywords: [
      "ecommerce product page seo for 10000 skus",
      "how to get ecommerce products cited in google ai overviews",
      "chatgpt shopping product schema & llms.txt setup",
      "commercial category page seo vs product grid pages",
    ],
    psychologyAndIntent:
      "Shoppers comparing specs in Google AI Overviews and ChatGPT buy from the store whose category and product pages state dimensions, compatibility, shipping, and returns clearly without generic filler.",
    siloHref: "/services/ecommerce-seo/product-page-seo",
    siloLabel: "Explore Product Page SEO at Scale",
  },
  {
    tabName: "Outdoor, Knife, Fashion & Specialty Stores",
    coreEntities:
      "Brand & Manufacturer Silos · Steel / Material Spec Tables · Seasonal Inventory Redirects · Out-of-Stock Schema Handling · US Regional Warehouse Shipping Signals",
    lowHangingKeywords: [
      "outdoor & sporting goods ecommerce seo usa",
      "knife store woocommerce seo case study",
      "fashion & apparel faceted filter canonical seo",
      "automotive parts fitment & sku indexing seo",
    ],
    psychologyAndIntent:
      "Specialty catalogs win when brand pages, material specifications, and part numbers are indexed cleanly and connected via contextual internal links.",
    siloHref: "/case-studies/ecommerce/michigan-outdoor-sports",
    siloLabel: "Read Michigan Sports & Outdoor Case Study",
  },
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

  const inputCls = `w-full ${radius.control} border px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-[#171717]`;

  return (
    <main>
      {/* EMPATHETIC RELIEF TAGLINE BAR */}
      <ServiceTaglineReliefBar
        message="We are here to provide you a source of relief — we know your pain, and we have the solution."
        subText="SMK Store $5,832 → $19,100/mo · MSO 3,000 → 11,549 Indexed Pages · 7-Day Free Trial"
      />

      <ServiceHero
        crumb="Ecommerce SEO"
        eyebrow="USA Ecommerce SEO · AEO & ChatGPT Shopping"
        title="Ecommerce SEO Services in the USA"
        accent="that turn product pages into revenue"
        subtitle="We are here to provide you a source of relief — we know your pain, and we have the solution. Technical SEO, product-page content, MerchantReturnPolicy schema, and indexing recovery across thousands of SKUs for US Shopify, WooCommerce, and custom stores."
        primary={{ href: "#7-day-trial", label: "Start 7-Day Free Trial" }}
        secondary={{ href: "#diagnose", label: "Diagnose My Store SEO" }}
        trustPoints={["5+ years founder mastery", "7-Day Free Trial + 90-day guarantee", "Month to month"]}
        aside={
          <ArticleLeadMagnet
            variant="sidebar"
            source={SOURCE}
            copy={{
              headline: "Free store tear-down + 7-Day Trial",
              sub: "Send your store URL. I’ll check which products Google is refusing to index and why — and send back what to fix first, within 24 hours.",
            }}
          />
        }
      />

      {/* 2026 CONFIRMED ECOMMERCE TELEMETRY & PLAYBOOK BADGE — ZERO EMOJIS */}
      <section className="border-b bg-emerald-50/70 px-4 py-4 sm:px-6 lg:px-8" style={{ borderColor: "#a7f3d0" }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white">
              <Zap className="h-4 w-4" aria-hidden />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-emerald-950">
                Confirmed 2026 USA Ecommerce Telemetry
              </p>
              <p className="text-sm font-semibold text-emerald-900">
                Google Merchant Center Return Policy Schema Mandate &amp; Multi-SKU Crawl Trap Elimination
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/resources/news/google-merchant-center-automated-return-policy-schema-mandate"
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-white px-3.5 py-1.5 text-xs font-bold text-emerald-950 shadow-sm transition-all hover:border-emerald-500"
            >
              <FileText className="h-3.5 w-3.5" aria-hidden />
              <span>Read News Breakdown &rarr;</span>
            </Link>
            <Link
              href="/resources/solutions"
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-900 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-neutral-900"
            >
              <Wrench className="h-3.5 w-3.5" aria-hidden />
              <span>View Faceted Nav Playbook &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* AI OVERVIEW / GEO / CHATGPT QUICK ANSWER BOX */}
      <ServiceQuickAnswerBox
        eyebrow="Answer Engine (AEO) & Generative Engine Optimization (GEO) Summary"
        h2="How Does Ecommerce SEO Recover Unindexed SKUs and Grow US Store Revenue?"
        answerCapsule="Ecommerce SEO for US Shopify and WooCommerce stores eliminates faceted crawl waste, rewrites thin manufacturer copy at template scale, and deploys Product, Offer, and MerchantReturnPolicy JSON-LD schema—turning 'Crawled – currently not indexed' product catalogs into ranked commercial pages cited across Google Search, AI Overviews, and ChatGPT Shopping."
        contextParagraph={
          <>
            Verified in our published case studies: on{" "}
            <Link href="/case-studies/ecommerce/michigan-outdoor-sports" className="font-bold text-neutral-950 underline">
              Michigan Sports &amp; Outdoor
            </Link>
            , indexed pages rose from about <strong className="text-neutral-950">3,000 to 11,549 (+285%)</strong> between May and July 2026 with <strong className="text-neutral-950">+83% US organic clicks</strong>; on{" "}
            <Link href="/case-studies/ecommerce/smk-store" className="font-bold text-neutral-950 underline">
              SMK Store
            </Link>{" "}
            (35,000+ SKUs), total monthly net sales grew from <strong className="text-neutral-950">$5,832 to $19,100</strong> between April and June 2026. We deliver this same founder-led engineering to Shopify, WooCommerce, and custom stores across the United States.
          </>
        }
        bullets={[
          {
            label: "Verified Indexing Recovery",
            detail: (
              <>
                About 3,000 &rarr; 11,549 indexed pages &amp; +83% US clicks on{" "}
                <Link href="/case-studies/ecommerce/michigan-outdoor-sports" className="underline font-semibold">
                  Michigan Sports &amp; Outdoor
                </Link>
                .
              </>
            ),
          },
          {
            label: "Verified Store Revenue",
            detail: (
              <>
                $5,832 &rarr; $19,100/mo WooCommerce net sales on{" "}
                <Link href="/case-studies/ecommerce/smk-store" className="underline font-semibold">
                  SMK Store (35,000+ SKUs)
                </Link>
                .
              </>
            ),
          },
          {
            label: "2026 Merchant & AI Schema",
            detail: "Product, Offer, Review, MerchantReturnPolicy & llms.txt catalog feeds.",
          },
          {
            label: "Risk-Free Onboarding",
            detail: "Limited-Time 7-Day Free Trial + 24-hour Sitemap-to-GSC indexing tear-down.",
          },
        ]}
        complianceBadge="Shopify · WooCommerce · Custom Catalogs"
      />

      {/* INTERACTIVE GEMINI AI DIAGNOSTIC BAR + "TELL US WHAT YOU ARE LOOKING FOR" + 7-DAY FREE TRIAL FORM */}
      <ServiceAiDiagnosisAndTrial
        serviceType="ecommerce-seo"
        heading="We Know You Are Frustrated by Unindexed Products & Rising Ad CAC — Diagnose Your Store Here"
        answerCapsule="Enter your Shopify or WooCommerce challenge below to see why Google Search Console flags your products as 'Crawled – currently not indexed' and how our template-level engineering unlocks organic US revenue—backed by our 7-Day Free Trial."
        placeholder="e.g. 8,000 WooCommerce or Shopify products stuck in 'Crawled - currently not indexed'..."
        painChips={[
          "Thousands of SKUs stuck in 'Crawled - currently not indexed'",
          "Faceted filters (?color=, ?size=, ?sort=) wasting crawl budget",
          "Duplicate Shopify /collections/*/products/* URLs splitting rank",
          "Missing MerchantReturnPolicy & Product price/review snippets",
          "Thin manufacturer product copy across 5,000+ SKUs",
          "Burned by a previous agency selling useless DA/PA backlinks",
        ]}
        lookingForOptions={[
          "WooCommerce High-SKU Indexing Recovery",
          "Shopify Collection & Canonical SEO",
          "Programmatic Product Page Content at Scale",
          "Category Buying Guides & Commercial Rankings",
          "MerchantReturnPolicy & Rich Product Schema",
          "Core Web Vitals (INP / LCP) Speed Optimization",
          "AI Overviews & ChatGPT Shopping Citations",
          "7-Day Free Trial & Full Store Tear-Down",
        ]}
        initialItems={[
          {
            n: "1. Mass 'Crawled – Currently Not Indexed' Catalog Bloat",
            why: "Googlebot crawls thousands of manufacturer-copy product pages and faceted filter combinations (?color=, ?size=, ?sort=), deems your templates low-value, and drops your high-margin SKUs from the index.",
            fix: "We run daily Sitemap-to-GSC diffing, block low-value parameter permutations, and enrich product/category templates in measured batches (the exact method that took Michigan Sports & Outdoor from ~3,000 to 11,549 indexed pages).",
            tool: "Sitemap-to-GSC Diffing + Canonical Rules",
          },
          {
            n: "2. Missing MerchantReturnPolicy & AI Shopping Schema",
            why: "Without nested Product, Offer, AggregateRating, and 2026 MerchantReturnPolicy JSON-LD, your products lose rich price/stock snippets in Google Search and get ignored by ChatGPT Shopping.",
            fix: "We deploy automated, template-level JSON-LD mapped directly to live inventory, pricing, shipping, and return data.",
            tool: "Schema Generator + Merchant Center Sync",
          },
          {
            n: "3. Thin Collection Grids Failing Commercial Buyers",
            why: "A collection page with only a product grid and an H1 gives Google and AI Overviews zero topical context to rank for high-volume commercial queries.",
            fix: "We transform top-revenue category templates into structured buying guides with 45–60 word Answer Capsules, comparison tables, and buyer FAQs.",
            tool: "Category Buying Guides + Internal Link Graph",
          },
        ]}
        initialRecommendation="Do not keep paying for Google Shopping clicks on products your organic catalog should already rank for. Test our Sitemap-to-GSC indexing recovery with a 7-Day Free Trial."
        trialDeliverablesLeft={[
          "Complete Sitemap-to-Search-Console indexing diff across your product & category URLs",
          "Root-cause breakdown of 'Crawled – currently not indexed' & faceted crawl waste",
          "Shopify Liquid or WooCommerce template canonical & internal-link audit",
          "Live Product, Offer & MerchantReturnPolicy JSON-LD prepared for your top template",
        ]}
        trialDeliverablesRight={[
          "45–60 word AI Overview buying-guide capsule drafted for your #1 revenue collection",
          "Core Web Vitals (INP & LCP) bottleneck diagnosis on mobile product templates",
          "Direct 1-on-1 roadmap review with Founder Mubashar Sharif (5+ years mastery)",
          "Full Monday Search Console & revenue baseline report — yours to keep",
        ]}
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

      {/* EXHAUSTED BY PREVIOUS SEO AGENCIES? SEE HOW WE ARE DIFFERENT */}
      <ServiceExhaustedByAgencies
        serviceLabel="USA Ecommerce SEO"
        answerCapsule="Store owners leave traditional ecommerce SEO agencies because of partial monthly PDFs, junior account managers who never touch Shopify Liquid or WooCommerce templates, and meaningless Domain Authority (DA/PA) link packages. SearchPrex delivers direct founder execution (5+ years mastery), weekly Monday GSC & net-sales reviews, and a 7-Day Free Trial."
      />

      {/* THE PROBLEM */}
      <Band>
        <BandIntro
          center={false}
          eyebrow="The problem"
          title="Why big US ecommerce catalogs stall in Google Search"
          lead="Four failure modes account for almost every stuck Shopify and WooCommerce store I audit."
        />
        <RealityBanner
          src="/images/audiences/ecommerce-inventory-stress.webp"
          alt="Ecommerce store owner in warehouse worried about unindexed product catalog and rising ad CAC"
          tag="The Reality · Inventory Stagnation"
          quote="“Thousands of product SKUs in the warehouse, rising ad CAC, and Google indexing less than half.”"
          body="Large catalogues stall in the same places: thin manufacturer descriptions, crawl budget waste, and products trapped in duplicate parameter URLs. I unblock indexing so your catalogue earns organic sales across the United States."
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
          title="Six parts of an ecommerce SEO, AEO & GEO program"
          lead="Each one maps to a specific reason Google and AI shopping engines are under-serving your catalog. I start with the ones your store is missing."
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
            <p className="mt-4 rounded-2xl border-l-4 border-l-neutral-900 bg-slate-50 p-4 text-sm font-semibold text-neutral-900 leading-relaxed">
              Most stuck ecommerce stores do not have a backlink problem—they have an indexing and template quality problem. When Google Search Console flags thousands of SKUs as “Crawled – currently not indexed”, resubmitting sitemaps fails; fixing duplicate parameters, canonicals, and thin product attributes solves the root cause.
            </p>
            <Lead>
              I sort every unindexed URL by the exact reason Search Console gives, fix the highest-revenue products first and re-measure before shipping the next batch.
            </Lead>
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
              SMK Store has more than 35,000 products; Michigan Sports &amp; Outdoor came back from a de-indexing. The work was the same in both: thin copy rewritten, crawl waste removed, indexing fixed and resubmitted in batches.
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
              <TextLink dark href="/case-studies/ecommerce/michigan-outdoor-sports">Michigan Sports &amp; Outdoor case study</TextLink>
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
          lead="WooCommerce and knife & outdoor stores are where the published case studies are. The Shopify page says plainly that there isn’t one yet, and shows the exact Liquid fixes we deploy."
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
                <p className="text-lg font-black group-hover:text-[#171717]" style={{ color: INK }}>{i.h1}</p>
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

      {/* SEMANTIC LONG-TAIL KEYWORD CLUSTERS + CONTEXTUAL INTERNAL LINKING MATRIX */}
      <ServiceSemanticClusterAndLinks
        eyebrow="USA Commercial Search Psychology · Low-Hanging Long-Tail Keywords"
        h2="High-Converting Ecommerce Keyword Clusters & Contextual Internal Linking"
        answerCapsule="We target commercial and transactional long-tail queries—pairing specific product attributes, SKUs, brand names, and buying-guide comparisons with clean Product and MerchantReturnPolicy schema so your store captures ready-to-buy US shoppers."
        clusters={ECOM_SEMANTIC_CLUSTERS}
      />

      {/* PROCESS */}
      <Band dark id="process">
        <BandIntro dark eyebrow="How it works" title="From 7-Day Free Trial to indexed, selling products" />
        <Steps steps={PROCESS} cta={{ href: "#7-day-trial", label: "Start my 7-Day Free Trial & Store Tear-Down" }} />
      </Band>

      {/* PRICE, GUARANTEE & WHO DOES THE WORK */}
      <Band>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Why SearchPrex</Eyebrow>
            <H2>One founder, one revenue roadmap, a clear price</H2>
            <Lead>
              You work directly with the person who audits your store and ships the fixes. Priorities are ranked by what brings net sales and indexed SKU growth, and every change is logged.
            </Lead>
            <div className="mt-8">
              <CheckList
                items={[
                  "The founder does the work — no junior account managers in between",
                  "Limited-time 7-Day Free Trial + written roadmap before you pay anything",
                  "Template-level fixes shipped, not just a PDF of problems",
                  "A plain-English report on indexed SKUs, clicks & revenue every Monday",
                  "Month to month, backed by our 90-day money-back guarantee",
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
            role="Founder · 5+ years · #1 Ranked Cleveland OH Local SEO Mastery · Semrush & HubSpot certified"
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

      {/* ECOMMERCE BLOG TEASER */}
      <ServiceBlogTeaser topic="ecommerce" />

      {/* FAQ — page.tsx builds the FAQPage schema from the same arrays */}
      <FaqBand title="USA Ecommerce SEO, AEO & GEO questions, answered">
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
                className={`absolute right-4 top-4 ${radius.chip} p-1 transition-colors hover:bg-[#f8fafc] ${focusRing}`}
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
                    className={`mt-5 flex w-full items-center justify-center gap-2 ${radius.control} bg-[#171717] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#171717] disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`}
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

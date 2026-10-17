"use client";

// app/services/technical-seo/TechnicalSEOClient.tsx
//
// USA Market Focus + AEO / GEO / AI Crawler Architecture (Oct 2026).
// Zero emojis — clean Lucide vector icons only.
//
// Figures, each readable in a screenshot on this page or its case study:
//   - Remit Choice: 113K clicks and 5.76M impressions in 2024 (Search Console),
//     and an AI Overview citation.
//   - Michigan Sports & Outdoor: about 3,000 → 11,549 indexed pages, May–Jul
//     2026; WooCommerce net sales $0.00 (20 Jul) and $523.49 month to date
//     (25 Sep 2026).
//   - Michigan Sports & Outdoor: +476% organic clicks at the March 2026 peak and
//     +83% US organic clicks by July, as the case study reports them.

import Link from "next/link";
import { Search, Settings, FileText, Wrench } from "lucide-react";

import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import ServiceBlogTeaser from "@/components/ServiceBlogTeaser";
import ProofImage from "@/components/ProofImage";
import ServiceProofStrip from "@/components/ServiceProofStrip";
import { AuthorCard, ComparisonTable, FaqList, VideoGallery, type GalleryVideo } from "@/components/layout";
import {
  INK,
  Band,
  BandIntro,
  CheckList,
  CheckPanel,
  Eyebrow,
  FaqBand,
  H2,
  Lead,
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

import { CAPSULES, FAQS, SYMPTOMS } from "./data";

const LINKEDIN = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";
const SOURCE = "service:technical-seo";
const CASE_STUDY = "/case-studies/ecommerce/michigan-outdoor-sports";

const VIDEOS: GalleryVideo[] = [
  { id: "Y5PxSECNGP0", title: "Performance walkthrough", sub: "Live Search Console recording" },
  { id: "cI3BwxqaJbw", title: "The indexing recovery, start to finish", sub: "Crawl and indexation fix" },
];

const services = [
  { title: "Technical SEO audit", body: "Full crawl — indexation, redirects, canonicals, orphan pages, crawl budget — plus server-log review where logs are available.", href: "/services/technical-seo/technical-seo-audit" },
  { title: "Indexation & crawl budget", body: "Every reason Google skips your pages: robots rules, noindex, faceted URLs, duplicate templates at scale.", href: "/services/technical-seo/indexing-recovery" },
  { title: "Core Web Vitals (INP / LCP / CLS)", body: "LCP, INP and CLS diagnosed from real-user CrUX data, then fixed in the templates rather than page by page.", href: "#crawl" },
  { title: "Schema & llms.txt architecture", body: "Nested JSON-LD for every page type — products, legal services, articles, FAQs, breadcrumbs — plus /llms.txt for AI crawlers.", href: "#ai-search" },
  { title: "Architecture & internal links", body: "Crawl depth and contextual internal linking, so the pages that earn revenue are the ones Google and ChatGPT reach first.", href: "#crawl" },
  { title: "Redirects & site migrations", body: "Chain cleanup, canonical rules, hreflang where needed, and migrations planned so US traffic survives the move.", href: "#process" },
];

const crawlChecks = [
  "Pages report: indexed vs not indexed, grouped by exact Search Console reason",
  "URLs in the XML sitemap that Google has never indexed",
  "Filter, sort and parameter URLs eating crawl budget",
  "Canonicals pointing to the wrong page, looping, or missing",
  "Redirect chains (301 → 302 → 200) and internal links to 404s",
  "Templates failing Core Web Vitals (INP > 200ms) for real US Chrome users",
  "Orphan pages that no contextual internal link reaches",
];

const process = [
  { when: "Days 1–7", title: "7-Day Free Trial & Tear-Down", body: "Your URL in, a written diagnosis within 24 hours — the three technical bottlenecks costing you the most traffic, plus 7 days of initial fixes." },
  { when: "Week 1", title: "Full crawl & GSC diff", body: "Every URL crawled, sitemaps diffed against Search Console, every issue mapped and ranked by revenue impact." },
  { when: "Weeks 2–4", title: "Template fixes live", body: "Indexation blocks, canonicals, redirect chains and template-level INP/LCP speed fixes first; then schema and internal links." },
  { when: "Every Monday", title: "Full Stat & Crawl Report", body: "No partial reporting: indexed pages, crawl stats, Core Web Vitals and clicks — what moved, what did not, and what is next." },
];

const aiSearch = [
  { title: "Crawl efficiency for AI crawlers", body: "AI crawlers (OAI-SearchBot, GPTBot, PerplexityBot) are less patient than Googlebot. Clean, fast, server-rendered pages are the ones that get read and cited." },
  { title: "Structured data answer engines read", body: "Validated @graph JSON-LD and /llms.txt tell Google AI Overviews and ChatGPT what a page is about — the difference between being a source and being skipped." },
  { title: "Indexation that holds through updates", body: "Recoveries that fix template root causes survive Google core updates; ones that only resubmit URLs slide back." },
  { title: "Core Web Vitals in the INP era", body: "INP replaced FID in 2024. Responsiveness is now measured on every user interaction across mobile and desktop." },
];

const related = [
  { href: CASE_STUDY, title: "Michigan Sports & Outdoor case study", body: "The de-indexing, the rebuild from ~3,000 to 11,549 indexed pages, and every screenshot." },
  { href: "/resources/technical-seo-checklist", title: "Technical SEO audit checklist", body: "26 checks you can run with free Google tools. No email." },
  { href: "/blog/crawl-budget-optimization-guide", title: "Crawl budget guide", body: "How to find and stop the URLs eating your crawl." },
  { href: "/tools/schema-generator", title: "Free schema generator", body: "JSON-LD for your page type, ready to paste." },
  { href: "/services/ecommerce-seo", title: "Ecommerce SEO services", body: "Technical SEO applied to catalogues of thousands of products." },
  { href: "/services/ecommerce-seo/woocommerce", title: "WooCommerce SEO", body: "Filter URLs, plugin weight and indexing on WooCommerce stores." },
  { href: "/blog/google-indexing-api-python", title: "The Indexing API is not a shortcut", body: "What Google's Indexing API is really for, and what to do instead." },
  { href: "/resources/news/wordpress-core-speculative-rules-api-inp-optimization-woocommerce", title: "WordPress Core INP & Indexing News", body: "Speculative Rules API and Core Web Vitals telemetry for high-SKU stores." },
];

const TECHNICAL_SEMANTIC_CLUSTERS = [
  {
    tabName: "Indexing Recovery & Crawl Budget",
    coreEntities:
      "Crawled – Currently Not Indexed · Discovered – Currently Not Indexed · Sitemap-to-GSC Diffing · Parameter & Facet Disallow Rules · Orphan Page Internal Linking",
    lowHangingKeywords: [
      "fix crawled currently not indexed google search console",
      "discovered currently not indexed ecommerce & wordpress fix",
      "crawl budget optimization service for 10000+ pages",
      "google search console indexing recovery audit usa",
    ],
    psychologyAndIntent:
      "Engineering and marketing leaders come to us when thousands of revenue-generating URLs sit unindexed in Google Search Console. Fixing the template cause unlocks immediate organic impressions and clicks.",
    siloHref: "/services/technical-seo/indexing-recovery",
    siloLabel: "Explore Indexing Recovery Service",
  },
  {
    tabName: "Core Web Vitals (INP, LCP & CLS)",
    coreEntities:
      "Interaction to Next Paint (INP < 200ms) · Main-Thread Script Yielding · Speculative Rules API · Largest Contentful Paint (LCP) Priority · CrUX Field Data",
    lowHangingKeywords: [
      "core web vitals inp optimization service usa",
      "fix poor urls in google search console core web vitals",
      "wordpress & woocommerce inp speculaterules optimization",
      "shopify & nextjs lcp and inp speed engineering",
    ],
    psychologyAndIntent:
      "Laggy mobile pages (>200ms INP) kill both conversion rates and crawl efficiency. We fix script execution and layout shifts at the template level so every page passes real-user CrUX thresholds.",
    siloHref: "/resources/news/wordpress-core-speculative-rules-api-inp-optimization-woocommerce",
    siloLabel: "Read Our 2026 INP & Speculative Rules Study",
  },
  {
    tabName: "Schema Graph & AI Crawler (llms.txt) SEO",
    coreEntities:
      "Connected @graph JSON-LD · OAI-SearchBot & PerplexityBot Crawlability · /llms.txt Entity Manifest · Speakable & FAQPage Schema · SSR vs. Client-Side Rendering",
    lowHangingKeywords: [
      "technical seo for chatgpt & google ai overviews",
      "llms.txt generator & ai crawler optimization",
      "json-ld schema graph implementation service",
      "fix javascript rendering for googlebot & ai bots",
    ],
    psychologyAndIntent:
      "AI search crawlers abandon slow client-rendered pages and unlinked entities. Our schema graphs and /llms.txt architecture make your site machine-readable for Google AI Overviews and ChatGPT.",
    siloHref: "/tools/llms-txt-generator",
    siloLabel: "Try Our Free llms.txt Generator Tool",
  },
  {
    tabName: "Site Migrations, Redirects & Canonicals",
    coreEntities:
      "301 Redirect Map Validation · Redirect Chain Elimination · Self-Referencing Canonicals · Domain & Platform Migration QA · Post-Launch GSC Monitoring",
    lowHangingKeywords: [
      "technical seo audit service for site migration",
      "fix duplicate without user selected canonical gsc",
      "recover organic traffic drop after website redesign",
      "redirect chain & 404 cleanup technical seo",
    ],
    psychologyAndIntent:
      "A botched redesign or platform migration can wipe out 60% of organic traffic in two weeks. We map every legacy URL, canonical tag, and sitemap before and after launch.",
    siloHref: "/services/technical-seo/technical-seo-audit",
    siloLabel: "Explore Technical SEO Audit Service",
  },
];

export default function TechnicalSEOClient() {
  return (
    <main>
      {/* EMPATHETIC RELIEF TAGLINE BAR */}
      <ServiceTaglineReliefBar
        message="We are here to provide you a source of relief — we know your pain, and we have the solution."
        subText="MSO 3,000 → 11,549 Indexed Pages (+285%) · Remit Choice 113K Clicks / 5.76M Impr · 7-Day Free Trial"
      />

      <ServiceHero
        crumb="Technical SEO"
        eyebrow="USA Technical SEO · Indexing Recovery & AI Crawlers"
        title="Technical SEO Services in the USA"
        accent="that get your pages indexed"
        subtitle="We are here to provide you a source of relief — we know your pain, and we have the solution. Pages sitting in “Crawled – currently not indexed”, crawl budget wasted on junk parameter URLs, slow INP templates, and post-migration drops. I find the exact architectural reasons Google and AI crawlers drop your pages and fix them."
        primary={{ href: "#7-day-trial", label: "Start 7-Day Free Trial" }}
        secondary={{ href: "#diagnose", label: "Diagnose My Technical SEO" }}
        trustPoints={["5+ years founder mastery", "7-Day Free Trial + 24hr tear-down", "No long-term contract"]}
        aside={
          <ArticleLeadMagnet
            variant="sidebar"
            source={SOURCE}
            copy={{
              headline: "Free technical tear-down + 7-Day Trial",
              sub: "Send your URL. I’ll check indexing, crawl waste and Core Web Vitals myself and send back what to fix first — within 24 hours.",
            }}
          />
        }
      />

      {/* 2026 CONFIRMED TECHNICAL SEO & INDEXING TELEMETRY BADGE — ZERO EMOJIS */}
      <section className="border-b bg-cyan-50/70 px-4 py-4 sm:px-6 lg:px-8" style={{ borderColor: "#a5f3fc" }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-600 text-white">
              <Settings className="h-4 w-4" aria-hidden />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-cyan-950">
                Confirmed 2026 USA Technical SEO &amp; Indexing Telemetry
              </p>
              <p className="text-sm font-semibold text-cyan-900">
                Googlebot Rendering Budget Optimization, Speculative Rules API &amp; INP Deferral Architecture
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/resources/news/wordpress-core-speculative-rules-api-inp-optimization-woocommerce"
              className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300 bg-white px-3.5 py-1.5 text-xs font-bold text-cyan-950 shadow-sm transition-all hover:border-cyan-500"
            >
              <FileText className="h-3.5 w-3.5" aria-hidden />
              <span>Read INP &amp; Speculation Study &rarr;</span>
            </Link>
            <Link
              href="/resources/solutions"
              className="inline-flex items-center gap-1.5 rounded-full bg-cyan-950 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-neutral-900"
            >
              <Wrench className="h-3.5 w-3.5" aria-hidden />
              <span>View GSC Indexing Fixes &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* AI OVERVIEW / GEO / CHATGPT QUICK ANSWER BOX */}
      <ServiceQuickAnswerBox
        eyebrow="Answer Engine (AEO) & Generative Engine Optimization (GEO) Summary"
        h2="How Does Technical SEO Resolve Indexing Exclusions and Power AI Search Citations?"
        answerCapsule="Technical SEO resolves the architectural bottlenecks that prevent Googlebot and AI crawlers (OAI-SearchBot, GPTBot, PerplexityBot) from indexing and citing your site—fixing 'Crawled – currently not indexed' templates, parameter crawl waste, redirect chains, Core Web Vitals (INP, LCP, CLS), and connected JSON-LD / llms.txt graphs."
        contextParagraph={
          <>
            Verified in our published Google Search Console case studies: we rebuilt{" "}
            <Link href={CASE_STUDY} className="font-bold text-neutral-950 underline">
              Michigan Sports &amp; Outdoor
            </Link>{" "}
            from about <strong className="text-neutral-950">3,000 to 11,549 indexed pages (+285%)</strong> with <strong className="text-neutral-950">+83% US organic clicks</strong> after a de-indexing setback, and scaled{" "}
            <Link href="/case-studies/fintech/remit-choice" className="font-bold text-neutral-950 underline">
              Remit Choice
            </Link>{" "}
            to <strong className="text-neutral-950">113K organic clicks, 5.76M impressions, and a Google AI Overview citation</strong>. We deliver template-level technical SEO for SaaS platforms, ecommerce catalogs, and multi-page domains across the United States.
          </>
        }
        bullets={[
          {
            label: "Verified Indexing Recovery",
            detail: (
              <>
                About 3,000 &rarr; 11,549 indexed pages (+285%) on{" "}
                <Link href={CASE_STUDY} className="underline font-semibold">
                  Michigan Sports &amp; Outdoor
                </Link>
                .
              </>
            ),
          },
          {
            label: "High-Scale GSC Proof",
            detail: (
              <>
                113K clicks &amp; 5.76M impressions + AI Overview citation on{" "}
                <Link href="/case-studies/fintech/remit-choice" className="underline font-semibold">
                  Remit Choice
                </Link>
                .
              </>
            ),
          },
          {
            label: "AI Crawler & Schema Stack",
            detail: "Server-side HTML, @graph JSON-LD, /llms.txt & sub-200ms INP responsiveness.",
          },
          {
            label: "Risk-Free Onboarding",
            detail: "Limited-Time 7-Day Free Trial + 24-hour founder technical tear-down.",
          },
        ]}
        complianceBadge="GSC Indexing · Core Web Vitals · AI Crawlers"
      />

      {/* INTERACTIVE GEMINI AI DIAGNOSTIC BAR + "TELL US WHAT YOU ARE LOOKING FOR" + 7-DAY FREE TRIAL FORM */}
      <ServiceAiDiagnosisAndTrial
        serviceType="technical-seo"
        heading="We Know You Are Stressed by Traffic Drops & Unindexed URLs — Diagnose Your Technical SEO Here"
        answerCapsule="Enter your Google Search Console exclusion status, Core Web Vitals failure, or post-migration drop below, and our diagnostic engine will pinpoint the template bottleneck and how we fix it—starting with our 7-Day Free Trial."
        placeholder="e.g. 12,000 URLs stuck in 'Crawled - currently not indexed' or poor mobile INP after redesign..."
        painChips={[
          "Thousands of URLs in 'Crawled - currently not indexed'",
          "Pages stuck in 'Discovered - currently not indexed' (crawl budget)",
          "Duplicate without user-selected canonical & parameter bloat",
          "Failing Core Web Vitals (INP > 200ms, slow LCP, layout shift)",
          "Traffic dropped after website redesign or platform migration",
          "Previous agency sent a 100-page PDF audit and fixed nothing",
        ]}
        lookingForOptions={[
          "Indexing Recovery ('Crawled / Discovered Not Indexed')",
          "Crawl Budget & Faceted Parameter Cleanup",
          "Core Web Vitals (INP, LCP, CLS) Template Speed Fix",
          "JSON-LD Schema Graph & /llms.txt AI Crawler Setup",
          "Website Redesign / Migration Traffic Recovery",
          "Canonical, Redirect Chain & 404 Architecture Fix",
          "Full Technical SEO Audit & Developer Ticket Roadmap",
          "7-Day Free Trial & 24-Hour Technical Tear-Down",
        ]}
        initialItems={[
          {
            n: "1. 'Crawled / Discovered – Currently Not Indexed' Exclusions",
            why: "Googlebot wastes its crawl budget on faceted URLs, duplicate sort parameters, and redirect chains, then drops your revenue-generating pages as low-value.",
            fix: "We diff your XML sitemaps against Google Search Console API data, block parameter crawl traps, consolidate canonicals, and re-architect internal link depth.",
            tool: "GSC Indexing Recovery + Crawl Budget Rules",
          },
          {
            n: "2. Core Web Vitals (INP > 200ms & LCP Bottlenecks)",
            why: "Heavy third-party scripts, unoptimized hydration, and layout shifts fail Chrome User Experience Report (CrUX) thresholds on mobile and desktop.",
            fix: "We defer non-critical main-thread JS, deploy Speculative Rules API prerendering, and fix template-level LCP/CLS.",
            tool: "Template-Level INP & CrUX Engineering",
          },
          {
            n: "3. Broken Schema Graphs & AI Crawler Invisibility",
            why: "Disconnected JSON-LD snippets and JavaScript-gated content prevent Google AI Overviews, ChatGPT (OAI-SearchBot), and Perplexity from citing your pages.",
            fix: "We deploy unified @graph JSON-LD markup, server-side rendered HTML, and a clean /llms.txt entity architecture.",
            tool: "Schema Generator + llms.txt Builder",
          },
        ]}
        initialRecommendation="Stop paying agencies for 100-page automated PDF reports that sit in your inbox. Let us diagnose your Search Console exclusions and ship real template fixes during your 7-Day Free Trial."
        trialDeliverablesLeft={[
          "Full Sitemap-to-Search-Console indexing exclusion diff ('Crawled' vs 'Discovered')",
          "Crawl budget waste, redirect chain & canonical loop diagnostic across your templates",
          "Core Web Vitals (INP, LCP, CLS) real-user CrUX bottleneck analysis",
          "Live connected @graph JSON-LD schema + /llms.txt file prepared for your domain",
        ]}
        trialDeliverablesRight={[
          "Prioritized developer ticket list (or direct implementation on your staging/live site)",
          "AI crawler accessibility check (Googlebot, OAI-SearchBot, GPTBot, PerplexityBot)",
          "Direct 1-on-1 engineering review with Founder Mubashar Sharif (5+ years mastery)",
          "Full Monday Search Console & crawl baseline report — yours to keep",
        ]}
      />

      <ServiceProofStrip
        id="proof"
        title="Technical SEO on a money-transfer site: a year of clicks, and an AI Overview citation"
        moreHref="/case-studies/fintech/remit-choice"
        moreLabel="Read the Remit Choice case study"
        shots={[
          {
            src: "/images/proof/remit-gsc-2024.png",
            alt: "Google Search Console performance for remitchoice.com in 2024: 113K total clicks and 5.76M total impressions.",
            width: 536,
            height: 267,
            figure: "113K",
            figureLabel: "organic clicks in 2024",
            caption: "Remit Choice — Search Console, full year 2024, with 5.76M impressions.",
          },
          {
            src: "/images/proof/remit-ai-overview-ghana.png",
            alt: "Google AI Overview for 'send money to ghana zero fees' listing Remit Choice among the services offering zero-fee transfers to Ghana.",
            width: 1355,
            height: 609,
            caption: "Remit Choice named in Google's AI Overview for \"send money to ghana zero fees\".",
          },
        ]}
      />

      {/* EXHAUSTED BY PREVIOUS SEO AGENCIES? SEE HOW WE ARE DIFFERENT */}
      <ServiceExhaustedByAgencies
        serviceLabel="USA Technical SEO"
        answerCapsule="Engineering and marketing leaders leave traditional SEO agencies because they send automated Screaming Frog PDFs, push meaningless Domain Authority (DA/PA) backlink metrics, and never touch actual code or templates. SearchPrex delivers direct founder execution (5+ years mastery), weekly Monday Search Console indexing reports, and a 7-Day Free Trial."
      />

      {/* THE PROBLEM */}
      <Band>
        <BandIntro
          center={false}
          eyebrow="The problem"
          title="The Search Console statuses that mean Google is dropping your pages"
          lead="If you have seen one of these in your own Pages report, this is where your US organic traffic is going."
        />
        <RealityBanner
          src="/images/audiences/technical-seo-indexing-crisis.webp"
          alt="Engineering lead and technical SEO specialist analyzing sudden organic traffic drop and crawl budget alerts in Google Search Console"
          tag="The Reality · The Indexing Cliff"
          quote="“Traffic dropped 60% after our redesign, and Google flagged 14,000 product pages as ‘Crawled - Currently Not Indexed’.”"
          body="You spent months investing into content and backlinks, but if your canonical tags loop, faceted URLs create millions of duplicate parameters, or render-blocking scripts exhaust crawl budget, Google abandons your site before ever evaluating your pages."
        />
        <RuleGrid columns={2}>
          {SYMPTOMS.map((s) => (
            <RuleItem
              key={s.status}
              icon={<Search className="h-5 w-5 flex-shrink-0 text-[#b8123a]" aria-hidden />}
              title={s.status}
              body={
                <>
                  <p className="text-[#374151]">{s.means}</p>
                  <p className="mt-1">{s.costs}</p>
                </>
              }
            />
          ))}
        </RuleGrid>
      </Band>

      {/* WHAT'S INCLUDED */}
      <Band dark>
        <BandIntro
          dark
          eyebrow="What’s included"
          title="What a complete technical SEO, AEO & GEO engagement covers"
          lead="Every part targets a specific reason Googlebot or AI search crawlers are ignoring, throttling or misreading your site — diagnosed from crawl and log data, then fixed."
        />
        <RuleGrid>
          {services.map((s) => (
            <RuleItem key={s.title} dark {...s} />
          ))}
        </RuleGrid>
      </Band>

      {/* CRAWL & INDEXING + COMPARISON TABLE */}
      <Band id="crawl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Crawling &amp; indexing</Eyebrow>
            <H2>Content can’t rank from a page Google has dropped</H2>
            <p className="mt-4 rounded-2xl border-l-4 border-l-neutral-900 bg-slate-50 p-4 text-sm font-semibold text-neutral-900 leading-relaxed">
              Most traffic drops on 1,000+ to 50,000+ URL sites begin before Google ever evaluates your copy: Googlebot cannot reach the pages, wastes crawl budget on parameter permutations, or drops thin templates into “Crawled – currently not indexed”. We fix the root cause at the template level so one deployment repairs thousands of URLs.
            </p>
            <Lead>
              I sort every exclusion in your Search Console Pages report by template, ship the structural fix, and track re-indexation week by week.
            </Lead>
            <TextLink href="/services/technical-seo/technical-seo-audit">Technical SEO audit service</TextLink>
            <div><TextLink href="/services/technical-seo/indexing-recovery">Pages not indexed? Indexing recovery</TextLink></div>
            <div><TextLink href="/resources/technical-seo-checklist">Free technical SEO checklist (26 checks)</TextLink></div>
          </div>
          <CheckPanel title="What I check in a crawl" items={crawlChecks} />
        </div>

        <div className="mx-auto mt-14 max-w-5xl">
          <ComparisonTable
            caption="Google Search Console Indexing Exclusions & Our Template-Level Engineering Fix"
            columns={[
              "Search Console Status",
              "Root Technical Cause",
              "SearchPrex Template Fix",
            ]}
            rows={[
              {
                label: "Crawled – currently not indexed",
                values: [
                  "Google fetched the URL but judged the template too thin or near-duplicate to keep",
                  "Enrich template attributes, add unique data/FAQs, and prune zero-value doorway URLs",
                ],
              },
              {
                label: "Discovered – currently not indexed",
                values: [
                  "Faceted filter URLs, sort parameters, and deep click depth exhaust crawl budget",
                  "Block junk parameters, flatten internal link depth, and shard clean XML sitemaps",
                ],
              },
              {
                label: "Duplicate without user-selected canonical",
                values: [
                  "Multiple collection, parameter, or trailing-slash URLs render identical content",
                  "Enforce strict self-referencing or parent canonicals in Liquid, WordPress, or Next.js",
                ],
              },
              {
                label: "Core Web Vitals: Poor URLs (INP / LCP)",
                values: [
                  "Main-thread JS blocking (>200ms INP) and unprioritized hero assets on mobile",
                  "Defer third-party scripts, yield main thread, and deploy Speculative Rules API",
                ],
              },
            ]}
          />
        </div>
      </Band>

      {/* SEMANTIC LONG-TAIL KEYWORD CLUSTERS + CONTEXTUAL INTERNAL LINKING MATRIX */}
      <ServiceSemanticClusterAndLinks
        eyebrow="USA Technical SEO Psychology · Low-Hanging Long-Tail Keywords"
        h2="High-Intent Technical SEO Keyword Clusters & Contextual Internal Linking"
        answerCapsule="We target the exact diagnostic queries CTOs, VPs of Marketing, and store owners search when traffic drops or pages fail to index—connecting every technical guide, free schema/llms.txt tool, and case study into a high-velocity internal linking loop."
        clusters={TECHNICAL_SEMANTIC_CLUSTERS}
      />

      {/* CASE STUDY */}
      <Band dark>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center [&>*]:min-w-0">
          <div>
            <Eyebrow dark>Technical SEO in action</Eyebrow>
            <H2 dark>Michigan Sports &amp; Outdoor: back from a de-indexing</H2>
            <Lead dark>
              Brand pages were never submitted to Search Console, thin templates caused mass non-indexing, and crawl budget went on URLs that should not exist. Sitemaps were submitted directly, crawl waste removed, brand pages rewritten and resubmitted in batches.
            </Lead>
            <div className="mt-8">
              <CheckList
                dark
                items={[
                  "Peaked at +476% organic clicks in March 2026, then lost ground to a de-indexing",
                  "Rebuilt: about 3,000 → 11,549 indexed pages (+285%) and +83% US organic clicks by July 2026",
                  "Store net sales $0.00 on 20 July, $523.49 month to date on 25 September 2026",
                ]}
              />
            </div>
            <TextLink dark href={CASE_STUDY}>Read the full case study</TextLink>
          </div>
          <ProofPanel>
            <ProofImage
              src="/images/proof/mso-gsc-indexing-full.png"
              alt="Google Search Console Pages report for Michigan Outdoor Sports: about 3,000 indexed pages in mid-May 2026 rising to 11,549 on 25 July 2026."
              width={778}
              height={520}
              stage="Search Console"
              caption="Pages indexed · May–July 2026"
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 [&>*]:min-w-0">
              <ProofImage
                src="/images/proof/mso-revenue-1-jul20-v2.png"
                alt="Michigan Outdoor Sports WooCommerce net sales on 20 July 2026: $0.00 for the month."
                width={1040}
                height={605}
                frameAspect="16 / 9"
                stage="Before · 20 Jul 2026"
                caption="Net sales this month: $0.00"
              />
              <ProofImage
                src="/images/proof/mso-revenue-3-sep25-v2.png"
                alt="Michigan Outdoor Sports WooCommerce net sales on 25 September 2026: $523.49 month to date."
                width={1357}
                height={601}
                frameAspect="16 / 9"
                stage="After · 25 Sep 2026"
                caption="Net sales month to date: $523.49"
              />
            </div>
          </ProofPanel>
        </div>
      </Band>

      {/* VIDEOS */}
      <Band muted>
        <BandIntro eyebrow="Watch the work" title="The recovery, recorded in Search Console" />
        <div className="mx-auto max-w-5xl">
          <VideoGallery videos={VIDEOS} />
        </div>
      </Band>

      {/* PROCESS */}
      <Band dark id="process">
        <BandIntro dark eyebrow="How it works" title="7-Day Free Trial to template fixes live in four weeks" />
        <Steps steps={process} cta={{ href: "#7-day-trial", label: "Start my 7-Day Free Trial & Technical Tear-Down" }} />
      </Band>

      {/* WHY & WHO */}
      <Band>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Why SearchPrex</Eyebrow>
            <H2>Fixes shipped, not a PDF of problems</H2>
            <Lead>
              Technical SEO usually stalls between an agency that only writes automated reports and an in-house team whose tickets never get prioritised. I do the implementation, or hand your developers a ranked ticket list if you would rather keep changes in-house.
            </Lead>
            <div className="mt-8">
              <CheckList
                items={[
                  "The founder does the work — no junior account managers in between",
                  "Sites with 10,000+ pages are where most of this work has been done",
                  "Limited-time 7-Day Free Trial + every issue ranked by traffic impact",
                  "A plain-English report every Monday — zero vanity DA/PA metrics",
                ]}
              />
            </div>
          </div>
          <div className="rounded-2xl p-7" style={{ background: "#f4f5f8" }}>
            <p className="text-sm font-black uppercase tracking-wider" style={{ color: INK }}>How pricing &amp; the 7-Day Free Trial work</p>
            <p className="mt-3 text-sm leading-relaxed text-[#374151]">
              Your initial 24-hour tear-down and limited-time 7-Day Free Trial are free: a written diagnosis of your crawling, indexing and speed problems plus initial quick-win schema/sitemap fixes. Full implementation is then quoted as a project based on affected templates — you see the exact scope before paying anything.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#374151]">
              Ongoing monitoring after the fixes is optional and month to month.
            </p>
            <Link href="/pricing" className="mt-4 inline-flex text-sm font-bold hover:underline" style={{ color: "#171717" }}>
              See all pricing &rarr;
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-4xl">
          <AuthorCard
            name="Mubashar Sharif"
            role="Founder · 5+ years · #1 Ranked Cleveland OH Local SEO Mastery · Semrush & HubSpot certified"
            quote="&ldquo;Technical SEO is where I&rsquo;ve done my deepest work. I took Michigan Sports &amp; Outdoor to a +476% clicks peak in March 2026, watched it de-index, and rebuilt it to 11,549 indexed pages and +83% US clicks — every step verified in Search Console.&rdquo;"
            imageSrc="/images/mubashar-sharif.jpg"
            imageAlt="Mubashar Sharif — Founder of SearchPrex"
            linkedinUrl={LINKEDIN}
            badges={["Semrush certified", "HubSpot certified", "5+ Years Mastery"]}
          />
        </div>
      </Band>

      {/* AI SEARCH */}
      <Band dark id="ai-search">
        <BandIntro
          dark
          eyebrow="SEO · GEO · AI Overviews"
          title="Technical SEO for AI search & ChatGPT crawlers"
          lead="A site that is slow, bloated or badly linked does not get read — by Googlebot or by the AI models that now answer before the results do."
        />
        <RuleGrid columns={4}>
          {aiSearch.map((c) => (
            <RuleItem key={c.title} dark {...c} />
          ))}
        </RuleGrid>
      </Band>

      {/* KEEP READING */}
      <Band muted>
        <BandIntro center={false} eyebrow="Keep reading" title="Related technical SEO resources" />
        <RuleGrid columns={4}>
          {related.map((r) => (
            <RuleItem key={r.href} {...r} />
          ))}
        </RuleGrid>
      </Band>

      {/* TECHNICAL SEO BLOG TEASER */}
      <ServiceBlogTeaser topic="technical" />

      {/* FAQ — page.tsx builds the FAQPage schema from the same arrays */}
      <FaqBand title="USA Technical SEO, Indexing & AI Crawler questions, answered">
        <FaqList faqs={[...CAPSULES, ...FAQS]} name="technical-seo-faq" />
      </FaqBand>

      <div id="get-started">
        <ArticleLeadMagnet
          variant="bottom"
          source={SOURCE}
          copy={{
            headline: "Send me your URL. I’ll tell you what Google is dropping.",
            sub: "Two fields. A written diagnosis of your indexing, crawl waste and Core Web Vitals — from me, within 24 hours.",
          }}
        />
      </div>
    </main>
  );
}

"use client";

// app/services/technical-seo/TechnicalSEOClient.tsx
// Assembled from components/layout primitives. The old local theme block
// (ACCENT #ff642d, INK #0f0f0f, MUTED #6b7280, BG_SOFT #fafafa) is gone.
//
// Copy is unchanged from the previous version.

import { ArrowRight, Phone, Wrench } from "lucide-react";
import {
  AuthorCard,
  CardGrid,
  ComparisonTable,
  CtaBand,
  FaqList,
  FeatureCard,
  HeroPanel,
  HeroPanelStats,
  NarrativeCard,
  PageHero,
  Section,
  SectionHeading,
  StatStrip,
  VideoGallery,
  Accent,
  type ComparisonRow,
  type Faq,
  type GalleryVideo,
} from "@/components/layout";

const LINKEDIN = "https://www.linkedin.com/in/mubashar-shahzad-seo/";

/* ─── DATA ─── */

const VIDEOS: GalleryVideo[] = [
  { id: "Y5PxSECNGP0", title: "Performance walkthrough", sub: "Live GSC recording · +476% organic clicks" },
  { id: "cI3BwxqaJbw", title: "0 to 285% indexing rate", sub: "Full case study · crawl + indexation fix" },
];

const heroStats = [
  { value: "+476%", label: "Organic clicks" },
  { value: "+285%", label: "Indexing rate" },
  { value: "12K+", label: "Pages indexed" },
  { value: "48hr", label: "Audit turnaround" },
];

const proofStats = [
  { value: "+476%", label: "Organic clicks" },
  { value: "+285%", label: "Indexing rate" },
  { value: "12K+", label: "Pages indexed" },
  { value: "48hr", label: "Audit turnaround" },
];

const services = [
  { title: "Technical SEO Audit", body: "Full crawl analysis — indexation, redirects, canonicals, orphan pages, crawl budget, and log file review." },
  { title: "Core Web Vitals (LCP/INP/CLS)", body: "Diagnose and fix every performance issue impacting rankings and real user experience." },
  { title: "Schema & Structured Data", body: "JSON-LD markup for every page type — products, FAQs, local business, articles, breadcrumbs, reviews." },
  { title: "Site Architecture", body: "Information architecture audit, silo structure, internal linking strategy, and crawl depth optimization." },
  { title: "Indexation & Crawl Budget", body: "Fix every reason Google ignores your pages — robots.txt, noindex, duplicate content at scale." },
  { title: "Redirect & Canonical Audit", body: "Redirect chain cleanup, canonical implementation, and hreflang setup for multi-region sites." },
];

const comparisonColumns = ["SearchPrex", "Generic agency", "In-house"];

const comparisonRows: ComparisonRow[] = [
  { label: "Full technical audit + log files", values: [true, "Sometimes", false] },
  { label: "Implementation, not just report", values: [true, false, "Sometimes"] },
  { label: "Handles 10K+ page sites", values: [true, "Sometimes", false] },
  { label: "Indexation recovery at scale", values: [true, false, false] },
  { label: "Core Web Vitals (INP era)", values: [true, "Sometimes", "Sometimes"] },
  { label: "Schema across every page type", values: [true, false, false] },
  { label: "Turnaround from audit to fixes", values: ["4 weeks", "8–12 weeks", "Never"] },
];

const process = [
  { step: "01", week: "Week 1", title: "Full site crawl", body: "Every URL analyzed, log files parsed, every issue mapped and prioritized by revenue impact." },
  { step: "02", week: "Week 2", title: "Priority fixes", body: "Indexation blocks, canonical errors, redirect chains, and Core Web Vitals actively hurting rankings — fixed first." },
  { step: "03", week: "Week 3–4", title: "Schema & structure", body: "JSON-LD across all page types, internal linking improvements, and site architecture optimization." },
  { step: "04", week: "Week 5+", title: "Monitor & improve", body: "GSC monitoring, crawl re-analysis, and continuous fixes as your site evolves." },
];

const coreUpdate2026 = [
  { title: "Crawl efficiency for AI bots", body: "Google's 2026 systems and AI crawlers reward fast, clean, crawlable sites. We optimize crawl budget so every important page gets discovered." },
  { title: "Core Web Vitals (INP era)", body: "INP replaced FID as a ranking signal. We tune LCP, INP, and CLS to Good — directly improving rankings and conversion." },
  { title: "Structured data for rich & AI results", body: "Clean JSON-LD helps Google and AI Overviews understand your content — winning rich results and AI citations." },
  { title: "Indexation health at scale", body: "We recover mass non-indexing the right way — fixing root causes so gains hold through every core update." },
];

const faqs: Faq[] = [
  { q: "How is a technical SEO audit different from a general SEO audit?", a: "A technical audit focuses exclusively on how your site is built — crawlability, indexability, site speed, structured data, and architecture. Technical issues are often the root cause of ranking problems even when content is good." },
  { q: "My site has thousands of pages — can you handle that?", a: "Yes — large-scale technical SEO is our specialty. We took Michigan Outdoor Sports from near-zero to 12K+ indexed pages and a +285% indexing rate." },
  { q: "What are Core Web Vitals and why do they matter?", a: "Core Web Vitals (LCP, INP, CLS) are Google's UX metrics that directly impact rankings in 2026. We diagnose and fix all three." },
  { q: "How quickly will I see results from technical fixes?", a: "Critical indexation fixes show GSC improvements in 2–4 weeks after Googlebot recrawls. Core Web Vitals improvements show up in Google's data within 28 days of deployment." },
  { q: "Do you work with Shopify, WordPress, and custom sites?", a: "Yes — all platforms. We understand the technical quirks of Shopify (faceted nav, duplicate URLs), WordPress (plugin bloat), and custom sites." },
  { q: "Is there a contract?", a: "No long-term contracts. Technical SEO has a clear audit-and-fix phase; we work project or retainer depending on your needs." },
];

/* ─── PAGE ─── */

export default function TechnicalSEOClient() {
  return (
    <main>
      <PageHero
        seoH1="Technical SEO Audit & Services | Core Web Vitals & Indexing Recovery"
        eyebrow="Technical SEO"
        title={<>Fix the foundation.<br /><Accent>Make Google index</Accent> everything.</>}
        subtitle="Crawl budget waste, indexation blocks, slow Core Web Vitals, and broken architecture are silently killing your rankings. We find every issue and fix it — systematically, at scale, aligned with Google's 2026 algorithm."
        primaryCta={{
          href: "/free-audit",
          label: "Get free technical audit",
          icon: <ArrowRight className="h-4 w-4" aria-hidden />,
        }}
        secondaryCta={{ href: "#case-studies", label: "See case studies" }}
        trustPoints={["No contracts", "48hr audit delivery", "Founder works your account"]}
        aside={
          <HeroPanel
            live
            label="Michigan Outdoor Sports · Ecommerce"
            note="GSC verified"
            footer="90-day result · Verified in Google Search Console"
          >
            <HeroPanelStats stats={heroStats} />
          </HeroPanel>
        }
      />

      <StatStrip stats={proofStats} />

      {/* ── WHAT'S INCLUDED ── */}
      <Section>
        <SectionHeading
          variant="split"
          eyebrow="Everything included"
          title={<>What&apos;s in your<br />Technical SEO package</>}
          intro="Every deliverable targets a specific reason Google is ignoring, throttling, or misreading your site — diagnosed with real crawl and log data, then actually fixed."
        />
        <CardGrid columns={3}>
          {services.map((s) => (
            <FeatureCard key={s.title} label="Included" title={s.title} body={s.body} />
          ))}
        </CardGrid>
      </Section>

      {/* ── COMPARISON ── */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Why SearchPrex"
          title="Compare the approaches"
          intro="Technical SEO usually stalls between an agency that only writes reports and an in-house team that never gets the tickets prioritized. Here's the difference."
        />
        <ComparisonTable
          columns={comparisonColumns}
          rows={comparisonRows}
          caption="Technical SEO with SearchPrex compared with a generic agency and an in-house team"
        />
      </Section>

      {/* ── PROCESS ── */}
      <Section>
        <SectionHeading eyebrow="How we work" title="Audit to implementation in 4 weeks" />
        <CardGrid columns={4}>
          {process.map((p) => (
            <FeatureCard key={p.step} step={p.step} label={p.week} title={p.title} body={p.body} />
          ))}
        </CardGrid>
      </Section>

      {/* ── CASE STUDY ── */}
      <Section id="case-studies" tone="surface">
        <SectionHeading
          eyebrow="Case study · Michigan Outdoor Sports"
          title="+476% clicks. +285% indexing rate."
        />
        <NarrativeCard
          challenge="Brand pages never properly submitted to GSC, thin content caused mass non-indexing, and crawl budget was being wasted — thousands of pages invisible."
          strategy="Sitemaps submitted directly to GSC, indexation blocks and crawl waste fixed, brand pages rewritten with unique content, resubmitted in batches."
          outcome="+476% organic clicks and +285% indexing rate within 90 days — 12,000+ pages indexed from near-zero, with no ad spend."
        />
        <VideoGallery videos={VIDEOS} />
      </Section>

      {/* ── 2026 CORE UPDATE ── */}
      <Section>
        <SectionHeading
          eyebrow="SEO · GEO · AIO · LLMs · 2026 core update"
          title="Technical SEO tuned for AI search"
          intro="AI crawlers are less patient than Googlebot. A site that is slow, bloated or badly linked simply does not get read. Here's how we keep yours legible to both."
        />
        <CardGrid columns={2}>
          {coreUpdate2026.map((c) => (
            <FeatureCard
              key={c.title}
              icon={<Wrench className="h-5 w-5" style={{ color: "#534AB7" }} aria-hidden />}
              title={c.title}
              body={c.body}
            />
          ))}
        </CardGrid>
      </Section>

      {/* ── AUTHOR — E-E-A-T ── */}
      <Section tone="surface" width="narrow" tight>
        <AuthorCard
          name="Mubashar Shahzad"
          role="Founder & Lead Technical SEO Strategist · 5+ years"
          quote="&ldquo;Technical SEO is where I&apos;ve done my deepest work — crawl budget, indexation recovery, Core Web Vitals, schema. I personally took Michigan Outdoor Sports from near-zero indexing to 12K+ pages and +476% clicks, all verified in GSC.&rdquo;"
          imageSrc="/images/mubashar-shahzad.jpg"
          imageAlt="Mubashar Shahzad — Founder & Lead Technical SEO Strategist"
          linkedinUrl={LINKEDIN}
        />
      </Section>

      {/* ── FAQ ── */}
      <Section width="reading">
        <SectionHeading eyebrow="FAQ" title="Technical SEO questions, answered" />
        <FaqList faqs={faqs} name="technical-seo-faq" />
      </Section>

      <CtaBand
        eyebrow="Ready to fix the foundation?"
        title={<>Great content deserves<br />great technical health.</>}
        body="Free technical audit — the founder personally crawls your site, identifies your biggest indexation, speed, and architecture issues, and delivers a prioritized fix plan within 48 hours."
        actions={[
          { href: "/free-audit", label: "Get free technical audit", icon: <ArrowRight className="h-4 w-4" aria-hidden /> },
          { href: "tel:+923106526316", label: "+92 310 652 6316", variant: "onDark", icon: <Phone className="h-4 w-4" aria-hidden /> },
        ]}
        trustPoints={["48hr audit delivery", "No contracts", "Founder does the audit"]}
      />
    </main>
  );
}

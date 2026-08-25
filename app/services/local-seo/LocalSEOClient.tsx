"use client";

// app/services/local-seo/LocalSEOClient.tsx
// Assembled from components/layout primitives. The old local theme block
// (ACCENT #ff642d, INK #0f0f0f, MUTED #6b7280, BG_SOFT #fafafa) is gone — this
// page declares no colours of its own.
//
// Copy is unchanged from the previous version.

import { ArrowRight, MapPin, Phone } from "lucide-react";
import {
  AuthorCard,
  CardGrid,
  CaseStudyPanel,
  ComparisonTable,
  CtaBand,
  FaqList,
  FeatureCard,
  HeroPanel,
  HeroPanelStats,
  PageHero,
  Section,
  SectionHeading,
  StatStrip,
  Accent,
  type ComparisonRow,
  type Faq,
} from "@/components/layout";

const LINKEDIN = "https://www.linkedin.com/in/mubashar-shahzad-seo/";
const HVAC_VIDEO = "g_1TfDU4YeA";

/* ─── DATA ─── */

const heroStats = [
  { value: "Top 3", label: "Google Maps pack" },
  { value: "Featured", label: "AI Overview" },
  { value: "5.7x", label: "Organic calls" },
  { value: "60 days", label: "Time to rank" },
];

const proofStats = [
  { value: "50+", label: "Directories cleaned per client" },
  { value: "20+", label: "Local businesses served" },
  { value: "5.7x", label: "Avg. call growth in 90 days" },
  { value: "60d", label: "Median time to top 3" },
];

const services = [
  { title: "Google Business Profile", body: "Category optimization, weekly posts, Q&A, photo strategy, and services setup for top-3 local pack rankings." },
  { title: "Citation Building", body: "NAP consistency across 50+ directories — Google, Bing, Apple Maps, Yelp, and niche local sources." },
  { title: "Local Landing Pages", body: "City and service-area pages built around real 'near me' search intent — no thin doorway pages." },
  { title: "Review Velocity Program", body: "Systematic 5-star review generation — the strongest local ranking and trust signal there is." },
  { title: "AI Overview Optimization", body: "Structured content and schema so your business gets cited in Google AI Overviews for local queries." },
  { title: "Weekly Reporting", body: "Map pack rankings, calls, direction requests, and GBP insights — plain-English every Monday." },
];

const comparisonColumns = ["SearchPrex", "Google Ads", "Generic agency"];

const comparisonRows: ComparisonRow[] = [
  { label: "Google Maps top 3 rankings", values: [true, false, "Sometimes"] },
  { label: "AI Overview local citations", values: [true, false, false] },
  { label: "GBP + citations at scale (50+)", values: [true, false, "Sometimes"] },
  { label: "Systematic review generation", values: [true, false, false] },
  { label: "Ranks that stay when you pause", values: [true, false, "Sometimes"] },
  { label: "Founder-led (no juniors)", values: [true, false, false] },
  { label: "Cost per lead over time", values: ["Down", "Up", "Flat"] },
];

const process = [
  { step: "01", week: "Week 1–2", title: "Local audit", body: "GBP, citations, competitors, and local landscape — mapped into a city-specific ranking roadmap." },
  { step: "02", week: "Week 3–4", title: "GBP & citations", body: "Full Google Business Profile optimization and NAP citation cleanup across 50+ directories." },
  { step: "03", week: "Week 5–8", title: "Content & reviews", body: "Local landing pages, service-area content, and review generation running in parallel." },
  { step: "04", week: "Week 9+", title: "Rank & convert", body: "Climb the map pack and AI Overviews, calls increase, weekly reporting every Monday." },
];

const coreUpdate2026 = [
  { title: "AI Overview local citations", body: "Google's 2026 AI Overviews answer local questions directly. We structure content and schema so your business is the one cited." },
  { title: "Real experience signals", body: "Genuine photos, real reviews, accurate service data — the first-hand signals Google now weighs most heavily for local trust." },
  { title: "Local entity authority", body: "We build your business as a recognized local entity — consistent NAP, citations, and structured data across the knowledge graph." },
  { title: "People-first local content", body: "Service-area pages written to genuinely help local customers — never thin doorway pages the Helpful Content system demotes." },
];

const faqs: Faq[] = [
  { q: "How fast can I rank in the Google Maps local pack?", a: "Most local businesses see map pack movement in 30–60 days. Our HVAC client reached the top 3 and captured an AI Overview placement within 60 days of our GBP and citation work." },
  { q: "Do you optimize for 'near me' searches?", a: "Yes — 'near me' and service-area queries are the core of local SEO. We build city and neighborhood landing pages plus GBP signals that capture this high-intent traffic." },
  { q: "What is AI Overview optimization?", a: "Google's 2026 AI Overviews answer local queries directly above the map pack. We structure your content, reviews, and schema so Google cites your business in those answers." },
  { q: "Which local businesses do you work with?", a: "HVAC, plumbers, electricians, restaurants, clinics, contractors, salons, and other service businesses targeting a specific city or service area." },
  { q: "Is your work aligned with Google's 2026 core updates?", a: "Completely. Every local page is people-first, E-E-A-T compliant, and built around real experience signals — never thin doorway pages that get demoted." },
  { q: "Is there a contract?", a: "No long-term contracts. We earn your business every month with results — more calls, more map pack visibility, more local customers." },
];

/* ─── PAGE ─── */

export default function LocalSEOClient() {
  return (
    <main>
      <PageHero
        seoH1="Local SEO Services | Rank in Google Maps & AI Overviews"
        eyebrow="Local SEO"
        title={<>Own the map pack.<br />Get cited in <Accent>AI Overviews.</Accent></>}
        subtitle="Your customers search 'near me' and call whoever shows up in the top 3. We get local service businesses into the Google Maps pack — and cited in Google's 2026 AI Overviews."
        primaryCta={{
          href: "/free-audit",
          label: "Get free local audit",
          icon: <ArrowRight className="h-4 w-4" aria-hidden />,
        }}
        secondaryCta={{ href: "#case-study", label: "See the HVAC case study" }}
        trustPoints={["No contracts", "Results in 60 days", "Founder works your account"]}
        aside={
          <HeroPanel
            live
            label="Live client · HVAC · United States"
            note="GSC verified"
            footer="60-day result · Verified in Google Search Console"
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
          title={<>What&apos;s in your<br />Local SEO package</>}
          intro="Every deliverable maps to a real local ranking signal — accurate business data, genuine reviews, and content that helps the people searching in your city."
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
          intro="Most local businesses bounce between Google Ads and generic SEO agencies. Here's what actually delivers durable local visibility."
        />
        <ComparisonTable
          columns={comparisonColumns}
          rows={comparisonRows}
          caption="Local SEO with SearchPrex compared with Google Ads and a generic SEO agency"
        />
      </Section>

      {/* ── PROCESS ── */}
      <Section>
        <SectionHeading eyebrow="How we work" title="From audit to map pack in 60 days" />
        <CardGrid columns={4}>
          {process.map((p) => (
            <FeatureCard key={p.step} step={p.step} label={p.week} title={p.title} body={p.body} />
          ))}
        </CardGrid>
      </Section>

      {/* ── CASE STUDY ── */}
      <Section id="case-study" tone="surface">
        <SectionHeading
          eyebrow="Case study · HVAC · United States"
          title="Top 3 Google Maps + AI Overview in 60 days"
        />
        <CaseStudyPanel
          videoId={HVAC_VIDEO}
          videoTitle="Local HVAC SEO case study walkthrough"
          metrics={[
            { value: "Top 3", label: "Maps pack" },
            { value: "Featured", label: "AI Overview" },
            { value: "5.7x", label: "Organic calls" },
          ]}
          challenge="A local HVAC service business had no map pack presence, no 'near me' rankings, and zero visibility in Google's AI Overview results for high-intent emergency service searches."
          strategy="Full GBP optimization, NAP consistency across 50+ directories, service-area landing pages, a review generation program, and AI Overview-ready structured content."
          outcome="Top 3 map pack for primary service keywords, a featured AI Overview placement, and 5.7x organic call growth in 60 days — all verified in GSC."
        />
      </Section>

      {/* ── 2026 CORE UPDATE ── */}
      <Section>
        <SectionHeading
          eyebrow="SEO · GEO · AIO · LLMs · 2026 core update"
          title="Local SEO tuned for AI search"
          intro="AI Overviews now answer local questions above the map pack. Here's how we keep your business visible everywhere customers look."
        />
        <CardGrid columns={2}>
          {coreUpdate2026.map((c) => (
            <FeatureCard
              key={c.title}
              icon={<MapPin className="h-5 w-5" style={{ color: "#534AB7" }} aria-hidden />}
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
          role="Founder & Lead Local SEO Strategist · 5+ years"
          quote="&ldquo;Local SEO is won on real signals — accurate GBP data, genuine reviews, content that actually helps your neighbors. I personally took a local HVAC business to the top 3 map pack and an AI Overview placement in 60 days. When you work with SearchPrex, you work directly with me.&rdquo;"
          imageSrc="/images/mubashar-shahzad.jpg"
          imageAlt="Mubashar Shahzad — Founder & Lead Local SEO Strategist"
          linkedinUrl={LINKEDIN}
        />
      </Section>

      {/* ── FAQ ── */}
      <Section width="reading">
        <SectionHeading eyebrow="FAQ" title="Local SEO questions, answered" />
        <FaqList faqs={faqs} name="local-seo-faq" />
      </Section>

      <CtaBand
        eyebrow="Ready to own your city?"
        title={<>Stop renting clicks.<br />Start owning your map pack.</>}
        body="Free local SEO audit — the founder personally reviews your Google Business Profile, citations, and local rankings, and delivers a 60-day growth plan within 24 hours."
        actions={[
          { href: "/free-audit", label: "Get free local audit", icon: <ArrowRight className="h-4 w-4" aria-hidden /> },
          { href: "tel:+923106526316", label: "+92 310 652 6316", variant: "onDark", icon: <Phone className="h-4 w-4" aria-hidden /> },
        ]}
        trustPoints={["24hr turnaround", "No contracts", "Founder does the audit"]}
      />
    </main>
  );
}

"use client";

// app/services/local-seo/LocalSEOClient.tsx
//
// Rebuilt on the shared service-page template (previews/services-cro-wireframe.html),
// in AIDA order. Same approach as /services/technical-seo.
//
// What was wrong with the previous version, and is fixed here:
//
//   - A visually hidden H1 ("Local SEO Services | Rank in Google Maps & AI
//     Overviews") over a different visible headline. The visible H1 now leads
//     with the keyword.
//   - A stat strip claiming "5.7x avg. call growth in 90 days", "60d median
//     time to top 3" and "20+ local businesses served". 5.7x is one HVAC
//     client's 60-day result; "average" and "median" claim a dataset that does
//     not exist, and nothing backed "20+".
//   - No lead form, no screenshots, no link to a single city page, and no link
//     to any local case study — on the page that should feed all of them.

import Link from "next/link";
import { ArrowRight, CheckCircle, MapPin } from "lucide-react";

import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import CoverageSection from "@/components/CoverageSection";
import ProofImage from "@/components/ProofImage";
import { RETAINER_PLANS, formatRange } from "@/lib/pricing";
import {
  AnswerCapsules,
  AuthorCard,
  Breadcrumb,
  CardGrid,
  CaseStudyPanel,
  ComparisonTable,
  FaqList,
  FeatureCard,
  PageHero,
  Section,
  SectionHeading,
  StatStrip,
  Accent,
  type ComparisonRow,
} from "@/components/layout";

import { CAPSULES, FAQS, PROBLEMS, PROOF } from "./data";

const LINKEDIN = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";
const HVAC_VIDEO = "g_1TfDU4YeA";
const SOURCE = "service:local-seo";
const LOCAL_PLAN = RETAINER_PLANS.find((p) => p.niche === "Local SEO");

/** Each stat is one named client's result, labelled as such. */
const stats = [
  { value: "Top 3", label: "Maps pack · HVAC client, 60 days" },
  { value: "5.7x", label: "Organic calls · same client" },
  { value: "#1", label: "AI Overview · D.O.L.L.S. Cleaning" },
  { value: "24h", label: "Tear-down reply" },
];

const services = [
  { title: "Google Business Profile", body: "Categories, services, weekly posts, Q&A and photos — set up for the searches that bring calls, not just views." },
  { title: "Citations & NAP consistency", body: "Your name, address and phone made identical across Google, Bing, Apple Maps, Yelp and the directories that matter in your niche." },
  { title: "Service-area pages", body: "A page for each service and city people actually search — written for them, never a find-and-replace doorway page." },
  { title: "Review program", body: "A steady, policy-safe way to ask real customers for reviews, because recency moves the map pack." },
  { title: "AI Overview readiness", body: "Clear service answers and structured data so Google can name your business when it answers a local question." },
  { title: "Monday reporting", body: "Map pack positions, calls, direction requests and Profile insights — in plain English, every week." },
];

const comparisonColumns = ["SearchPrex", "Google Ads", "Generic agency"];
const comparisonRows: ComparisonRow[] = [
  { label: "Google Maps top 3 rankings", values: [true, false, "Sometimes"] },
  { label: "AI Overview local citations", values: [true, false, false] },
  { label: "Business Profile + citations cleaned up", values: [true, false, "Sometimes"] },
  { label: "Review program", values: [true, false, "Sometimes"] },
  { label: "Visibility that stays when spend stops", values: [true, false, "Sometimes"] },
  { label: "The person you hire does the work", values: [true, "—", false] },
];

const process = [
  { step: "01", week: "Day 1", title: "Tear-down", body: "Your URL in, a written diagnosis back within 24 hours: your Profile, your citations and the three competitors above you." },
  { step: "02", week: "Weeks 1–4", title: "Profile & citations", body: "Business Profile rebuilt, business details made consistent everywhere they appear." },
  { step: "03", week: "Weeks 5–8", title: "Pages & reviews", body: "Service-area pages live and the review program running in parallel." },
  { step: "04", week: "Every Monday", title: "Report", body: "Map pack positions, calls and what changed — and what is next." },
];

const related = [
  { href: "/resources/news/google-business-profile-four-days-suggested-edits", title: "Google now gives you four days to reject a suggested edit", body: "What changed, and why your website is now the tie-breaker." },
  { href: "/resources/news/local-seo-updates", title: "Local SEO news log", body: "A dated, sourced record of what actually changed in local search." },
  { href: "/resources/news?category=Local", title: "Business Profile & map pack news", body: "Every local update, in one place." },
  { href: "/case-studies", title: "All case studies", body: "HVAC, cleaning, roofing and door repair — with the screenshots." },
];

export default function LocalSEOClient() {
  return (
    <main>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Local SEO" },
        ]}
      />

      {/* 01 — HERO · Attention */}
      <PageHero
        compactTop
        eyebrow="Local SEO"
        title={
          <>
            Local SEO Services <Accent>that make your phone ring</Accent>
          </>
        }
        subtitle="Your customers search “near me” and call whoever is in the top three. I get local service businesses into the Google Maps pack and named in AI Overviews — led by Mubashar Sharif, Semrush-certified."
        actions={
          <Link href="#proof" className="inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: "#534AB7" }}>
            See the map pack results <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        }
        trustPoints={["Reply within 24 hours", "Month to month", "The founder does the work"]}
        aside={
          <ArticleLeadMagnet
            variant="sidebar"
            source={SOURCE}
            copy={{
              headline: "Free local tear-down",
              sub: "Send your URL. I’ll check your Business Profile, citations and the three competitors above you — and tell you what to fix first, within 24 hours.",
            }}
          />
        }
      />

      <StatStrip stats={stats} />

      {/* 02 — THE PROBLEM · Interest */}
      <Section>
        <SectionHeading
          eyebrow="The problem"
          title="Why local businesses lose the map pack"
          intro="Four things you can check yourself in the next ten minutes. If any of them fails, it is costing you calls."
        />
        <CardGrid columns={2}>
          {PROBLEMS.map((p) => (
            <div key={p.title} className="rounded-2xl border border-[#e5e7eb] bg-white p-6">
              <p className="flex items-center gap-2 text-sm font-black text-[#0a0f2e]">
                <MapPin className="h-4 w-4 flex-shrink-0 text-[#b8123a]" aria-hidden />
                {p.title}
              </p>
              <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-[#374151]">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1a7d59]" aria-hidden />
                <span>
                  <strong>Check:</strong> {p.check}
                </span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#5b6472]">{p.costs}</p>
            </div>
          ))}
        </CardGrid>
      </Section>

      {/* 03 — QUICK ANSWERS · Interest / AEO */}
      <Section tone="surface" width="reading">
        <SectionHeading eyebrow="Quick answers" title="Local SEO, answered plainly" />
        <AnswerCapsules items={CAPSULES} />
      </Section>

      {/* 04 — PROOF · Desire */}
      <Section id="proof">
        <SectionHeading
          eyebrow="Proof"
          title="Named in AI Overviews, ranked in the map pack"
          intro="Unedited screenshots of real searches. Click any of them to read it yourself."
        />
        <CardGrid columns={3}>
          {PROOF.map((p) => (
            <div key={p.src} className="flex flex-col">
              <ProofImage
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                frameAspect="16 / 9"
                stage={p.stage}
                caption={p.caption}
              />
              <Link
                href={p.href}
                className="mt-2 inline-flex items-center gap-1 text-xs font-bold"
                style={{ color: "#534AB7" }}
              >
                Read the case study <ArrowRight className="h-3 w-3" aria-hidden />
              </Link>
            </div>
          ))}
        </CardGrid>

        <div className="mt-10">
          <CaseStudyPanel
            videoId={HVAC_VIDEO}
            videoTitle="Local HVAC SEO case study walkthrough"
            metrics={[
              { value: "Top 3", label: "Maps pack" },
              { value: "Featured", label: "AI Overview" },
              { value: "5.7x", label: "Organic calls" },
            ]}
            challenge="A local HVAC business with no map pack presence, no “near me” rankings, and no visibility in AI Overviews for high-intent emergency searches."
            strategy="Full Business Profile optimisation, business details made consistent across 50+ directories, service-area landing pages, a review program, and AI Overview-ready content."
            outcome="Top 3 map pack for its primary service keywords, a featured AI Overview placement, and 5.7x organic calls in 60 days — verified in Search Console."
          />
        </div>
      </Section>

      {/* 05 — WHAT YOU GET · Desire */}
      <Section tone="surface">
        <SectionHeading
          variant="split"
          eyebrow="Everything included"
          title={<>What&apos;s in the<br />local SEO work</>}
          intro="Every deliverable maps to a real local ranking signal — accurate business details, genuine reviews, and pages that help the people searching in your city."
        />
        <CardGrid columns={3}>
          {services.map((s) => (
            <FeatureCard key={s.title} label="Included" title={s.title} body={s.body} />
          ))}
        </CardGrid>
      </Section>

      {/* 06 — MID-PAGE FORM · Action */}
      <Section tight>
        <ArticleLeadMagnet
          variant="banner"
          source={SOURCE}
          copy={{
            eyebrow: "Failed one of those checks?",
            headline: "Find out what is keeping you out of the top three.",
            sub: "Send me your URL. I’ll check your Profile, citations and reviews against the businesses above you — free, within 24 hours.",
          }}
        />
      </Section>

      {/* 07 — PROCESS · Desire */}
      <Section>
        <SectionHeading eyebrow="How it works" title="From tear-down to the map pack" />
        <CardGrid columns={4}>
          {process.map((p) => (
            <FeatureCard key={p.step} step={p.step} label={p.week} title={p.title} body={p.body} />
          ))}
        </CardGrid>
      </Section>

      {/* 08 — COMPARE · Desire */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Why SearchPrex"
          title="Compare the approaches"
          intro="Most local businesses bounce between Google Ads and generic agencies. Here is what lasts."
        />
        <ComparisonTable
          columns={comparisonColumns}
          rows={comparisonRows}
          caption="Local SEO with SearchPrex compared with Google Ads and a generic SEO agency"
        />
      </Section>

      {/* 09 — COVERAGE · SEO (hub and spoke to every city page) */}
      <CoverageSection />

      {/* 10 — PRICE · Desire */}
      {LOCAL_PLAN ? (
        <Section>
          <SectionHeading eyebrow="What it costs" title="Local SEO pricing" />
          <div className="mx-auto max-w-2xl rounded-2xl border-2 p-6 text-center" style={{ borderColor: LOCAL_PLAN.accent, background: LOCAL_PLAN.bg }}>
            <p className="text-3xl font-black" style={{ color: LOCAL_PLAN.accent }}>
              {formatRange(LOCAL_PLAN)} <span className="text-base font-bold text-[#5b6472]">/ month</span>
            </p>
            <p className="mt-2 text-sm text-[#374151]">{LOCAL_PLAN.best}: {LOCAL_PLAN.includes.join(" · ")}</p>
            <p className="mt-3 text-xs leading-relaxed text-[#5b6472]">
              The number within the range depends on how many locations and service areas the plan covers. Month to month.
            </p>
            <Link href="/pricing" className="mt-3 inline-flex items-center gap-1 text-sm font-bold" style={{ color: "#534AB7" }}>
              Full pricing <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Section>
      ) : null}

      {/* RELATED · internal links */}
      <Section tone="surface">
        <SectionHeading eyebrow="Keep reading" title="Related local SEO resources" />
        <CardGrid columns={4}>
          {related.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="group rounded-2xl border border-[#e5e7eb] bg-white p-5 transition-all hover:border-[#534AB7] hover:shadow-md"
            >
              <p className="text-sm font-black text-[#0a0f2e] group-hover:text-[#534AB7]">{r.title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#5b6472]">{r.body}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#534AB7]">
                Open <ArrowRight className="h-3 w-3" aria-hidden />
              </span>
            </Link>
          ))}
        </CardGrid>
      </Section>

      {/* AUTHOR · E-E-A-T */}
      <Section width="narrow" tight>
        <AuthorCard
          name="Mubashar Sharif"
          role="Founder & Lead Local SEO Strategist · 5+ years · Semrush-certified"
          quote="&ldquo;Local SEO is won on real signals — accurate business details, genuine reviews, pages that actually help your neighbours. I took a local HVAC business into the top three and an AI Overview in 60 days. When you work with SearchPrex, you work with me.&rdquo;"
          imageSrc="/images/mubashar-sharif.jpg"
          imageAlt="Mubashar Sharif — Founder & Lead Local SEO Strategist"
          linkedinUrl={LINKEDIN}
        />
      </Section>

      {/* 11 — FAQ · AEO */}
      <Section tone="surface" width="reading">
        <SectionHeading eyebrow="FAQ" title="Local SEO questions, answered" />
        <FaqList faqs={FAQS} name="local-seo-faq" />
      </Section>

      {/* 12 — CLOSE · Action */}
      <ArticleLeadMagnet
        variant="bottom"
        source={SOURCE}
        copy={{
          headline: "Send me your URL. I’ll tell you why you’re not in the top three.",
          sub: "Two fields. A written look at your Profile, citations and competitors — from me, within 24 hours.",
        }}
      />
    </main>
  );
}

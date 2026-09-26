"use client";

// app/services/law-firm-seo/LawFirmSEOClient.tsx
// PILOT PAGE for the unified design system.
//
// Every section here is assembled from components/layout primitives. The page
// no longer declares a single colour of its own — the old local theme block
// (ACCENT #ff642d, INK #0f0f0f, MUTED #6b7280, BG_SOFT #fafafa) is gone, and
// with it the reason this page looked like a different website from /pricing.
//
// Rebuilt on the shared service-page template (previews/services-cro-wireframe.html)
// on 26 September 2026, keeping what was already good here — the answer
// capsules, the "be our first law firm case study" section, the live intake
// demo, the practice-area navigation and the self-serve checklist.
//
// Fixed: a visually hidden H1 over a different visible headline; a hero
// checklist promising "Rank #1 for your city's practice-area keywords" (nobody
// can promise a position, and ABA Model Rule 7.1 bars misleading claims); an
// unsourced "$80 per click"; a stat strip with "20+ businesses served" and a
// "60d median time to top 3" drawn from no dataset; an FAQ saying "most clients
// significantly reduce ad spend" when there are no law firm clients yet; and a
// city grid that left out all eight Kansas cities.

import Link from "next/link";
import { ArrowRight, Check, CheckCircle, Scale, BadgeCheck, ListChecks } from "lucide-react";
import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import CoverageSection from "@/components/CoverageSection";
import ProofImage from "@/components/ProofImage";
import { RETAINER_PLANS, formatRange } from "@/lib/pricing";
import { CAPSULES, FAQS, PROBLEMS } from "./data";
import IntakeAssistant from "@/app/components/intake-assistant/intake-assistant";
import VideoTestimonials from "@/components/VideoTestimonials";
import {
  AuthorCard,
  CardGrid,
  ComparisonTable,
  CtaButton,
  FaqList,
  AnswerCapsules,
  FeatureCard,
  PageHero,
  Section,
  SectionHeading,
  StatStrip,
  Accent,
  type ComparisonRow,
} from "@/components/layout";
import { color, heading, radius, text } from "@/lib/design-tokens";
import LawFirmStack from "@/components/LawFirmStack";
import { INDUSTRY_PAGES } from "@/lib/industry-pages";

const LINKEDIN = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";

/* ─── DATA ─── */

const SOURCE = "service:law-firm-seo";
const LAW_PLAN = RETAINER_PLANS.find((p) => p.niche === "Law Firm SEO");

/**
 * Facts about the service, not results. There is no law firm result to put
 * here yet, and the strip says nothing that implies one.
 */
const stats = [
  { value: "1 firm", label: "Per city and practice area" },
  { value: "5", label: "Practice areas with their own page" },
  { value: "20", label: "City pages in 9 states" },
  { value: "24h", label: "Tear-down reply" },
];

const services = [
  { title: "Technical SEO", body: "Site speed, Core Web Vitals, attorney schema, indexation, and mobile optimization for legal sites." },
  { title: "Local SEO", body: "GBP optimization, citations, local pack rankings, and review generation for your city." },
  { title: "Practice Area Pages", body: "Keyword-optimized pages for each practice area and target city, written for real client search intent." },
  { title: "Legal Link Building", body: "Legal directory listings, digital PR, and authority backlinks built specifically for law firms." },
  { title: "Weekly Reporting", body: "Plain-English reports every Monday — rankings, traffic, leads, and next action items." },
  { title: "GEO / AIO / LLMs SEO", body: "Get cited in Google AI Overviews, ChatGPT, and Perplexity for local legal queries." },
];

const comparisonColumns = ["SearchPrex", "Google Ads", "Generic agency"];

const comparisonRows: ComparisonRow[] = [
  { label: "Attorney E-E-A-T (YMYL)", values: [true, false, "Sometimes"] },
  { label: "AI Overview + ChatGPT citations", values: [true, false, false] },
  { label: "Local map pack top 3", values: [true, false, "Sometimes"] },
  { label: "Practice area × city pages", values: [true, false, "Sometimes"] },
  { label: "Ranks that hold when you pause", values: [true, false, "Sometimes"] },
  { label: "Founder-led (no juniors)", values: [true, false, false] },
  { label: "Cost per qualified lead", values: ["Down", "Up", "Flat"] },
];

const process = [
  { step: "01", week: "Week 1–2", title: "Deep audit", body: "Site, competitors, and local legal landscape — mapped into a city-specific ranking strategy." },
  { step: "02", week: "Week 3–4", title: "Foundation fix", body: "Technical SEO, attorney + FAQ schema, GBP optimization, and citation cleanup." },
  { step: "03", week: "Week 5–8", title: "Content & authority", body: "Practice-area pages, city pages, E-E-A-T legal content, and authority link building in parallel." },
  { step: "04", week: "Week 9+", title: "Rankings & cases", body: "Keywords climb, qualified consultations increase, plain-English reports every Monday." },
];

const coreUpdate2026 = [
  { title: "Attorney E-E-A-T (YMYL)", body: "Legal content is Your-Money-Your-Life — we surface attorney credentials, bar admissions, real case experience, and author authority on every page." },
  { title: "AI Overview legal citations", body: "Google's 2026 AI Overviews answer 'best lawyer near me' directly. We structure content, reviews, and schema so your firm is the one cited." },
  { title: "GEO & LLM visibility", body: "Generative Engine Optimization gets your firm referenced in ChatGPT, Perplexity, and Gemini when clients research legal help." },
  { title: "People-first legal content", body: "Every page genuinely helps prospective clients — never thin, keyword-stuffed pages the Helpful Content system demotes." },
];

const partnershipPoints = [
  "Market Exclusivity: We only work with one firm per city and practice area",
  "Proven local pack + AI Overview methodology",
  "Founder-led — not handed to a junior",
  "Transparent GSC reporting from day one",
  "YMYL E-E-A-T aligned every step",
];

/* ─── PAGE ─── */

export default function LawFirmSEOClient() {
  return (
    <>
      <div className="border-b bg-slate-50 overflow-x-auto pt-24" style={{ borderColor: color.border }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex space-x-6 text-sm font-medium" aria-label="Practice Areas">
            <span className="text-blue-700 border-b-2 border-blue-700 pb-3 -mb-3 whitespace-nowrap">
              Overview
            </span>
            {INDUSTRY_PAGES.map((ind) => (
              <Link 
                key={ind.slug} 
                href={`/services/law-firm-seo/${ind.slug}`} 
                className="whitespace-nowrap transition-colors text-slate-500 hover:text-slate-900"
              >
                {ind.name}
              </Link>
            ))}

          </nav>
        </div>
      </div>
    <main>
      <PageHero
        eyebrow="Law Firm SEO"
        title={
          <>
            Law Firm SEO Services <Accent>that bring in signed cases</Accent>
          </>
        }
        subtitle="Every click on Google Ads is paid for, every month. Practice-area and city pages keep bringing in cases after you stop paying. I build them to legal YMYL standards — led by Mubashar Sharif, Semrush-certified."
        actions={
          <Link href="#approach" className="inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: color.primary }}>
            See how it works <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        }
        trustPoints={["One firm per city", "Reply within 24 hours", "The founder does the work"]}
        aside={
          <ArticleLeadMagnet
            variant="sidebar"
            source={SOURCE}
            copy={{
              headline: "Free law firm tear-down",
              sub: "Send your URL. I’ll check your practice-area pages, Business Profile and the firms outranking you in your city — within 24 hours.",
            }}
          />
        }
      />

      <StatStrip stats={stats} />

      {/* THE PROBLEM — four checks a managing partner can run today */}
      <Section>
        <SectionHeading
          eyebrow="The problem"
          title="Why good firms lose the search to worse ones"
          intro="Four things you can check yourself today. Each one is costing you consultations if it fails."
        />
        <CardGrid columns={2}>
          {PROBLEMS.map((p) => (
            <div key={p.title} className="rounded-2xl border bg-white p-6" style={{ borderColor: color.border }}>
              <p className="flex items-center gap-2 text-sm font-black" style={{ color: color.ink }}>
                <Scale className="h-4 w-4 flex-shrink-0 text-[#b8123a]" aria-hidden />
                {p.title}
              </p>
              <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-[#374151]">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1a7d59]" aria-hidden />
                <span><strong>Check:</strong> {p.check}</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: color.muted }}>{p.costs}</p>
            </div>
          ))}
        </CardGrid>
      </Section>


      {/* QUICK ANSWERS
          Answer capsules for AI Overviews and answer engines: a real question as
          the heading, the answer in plain view beneath it. There is no law firm
          client yet, so no legal result is claimed here — the third answer says
          so, and labels the proof it does cite as coming from other industries. */}
      <Section width="reading">
        <SectionHeading eyebrow="Quick answers" title="Law firm SEO, answered plainly" />
        <AnswerCapsules items={CAPSULES} />
      </Section>

      {/* WHAT'S INCLUDED */}
      <Section>
        <SectionHeading
          variant="split"
          eyebrow="Everything included"
          title={
            <>
              What&apos;s in your
              <br />
              Law Firm SEO package
            </>
          }
          intro="Every deliverable is built around legal YMYL standards — attorney credentials, real experience, and content that both Google and prospective clients trust."
        />
        <CardGrid columns={3}>
          {services.map((s) => (
            <FeatureCard key={s.title} label="Included" title={s.title} body={s.body} />
          ))}
        </CardGrid>
      </Section>

      {/* MID-PAGE FORM */}
      <Section tight>
        <ArticleLeadMagnet
          variant="banner"
          source={SOURCE}
          copy={{
            eyebrow: "Failed one of those checks?",
            headline: "See exactly which firms outrank you, and why.",
            sub: "Send me your URL. I’ll compare your pages, Business Profile and reviews with the firms above you in your city — free, within 24 hours.",
          }}
        />
      </Section>

      {/* COMPARISON */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Why SearchPrex"
          title="Compare the approaches"
          intro="Most law firms cycle between Google Ads and generic SEO agencies. Here's what actually delivers durable legal visibility."
        />
        <ComparisonTable
          columns={comparisonColumns}
          rows={comparisonRows}
          caption="Law firm SEO with SearchPrex compared with Google Ads and a generic SEO agency"
        />
      </Section>

      {/* PROCESS */}
      <Section id="approach">
        <SectionHeading eyebrow="How we work" title="From audit to more cases in 90 days" />
        <CardGrid columns={4}>
          {process.map((p) => (
            <FeatureCard key={p.step} step={p.step} label={p.week} title={p.title} body={p.body} />
          ))}
        </CardGrid>
      </Section>

      {/* LIVE INTAKE DEMO */}
      <Section id="intake-demo" tone="surface" width="narrow">
        <SectionHeading
          variant="center"
          eyebrow="Live demo · AI Intake Assistant"
          title={
            <>
              Getting found is half the battle.
              <br />
              Capturing every lead is the other half.
            </>
          }
          intro="Ranking #1 means nothing if a 2 a.m. call goes to voicemail. Play a potential client below and watch our 24/7 AI intake assistant qualify the lead in seconds."
        />
        <IntakeAssistant embedded />
      </Section>

      {/* PARTNERSHIP CTA */}
      <Section>
        <SectionHeading
          eyebrow="Selective law firm partnerships"
          title="Be our first law firm case study"
          intro="We've delivered GSC-verified results in ecommerce, local, and technical SEO — including a local service business reaching the top 3 map pack and a Google AI Overview placement in 60 days. Now we're bringing that same methodology to law firms."
        />
        {/* The transferable proof, labelled as coming from other industries —
            the same line the third answer capsule draws. */}
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <ProofImage
            src="/images/proof/local-dolls-ai-overview-rank1.png"
            alt="Google results for 'post construction cleaning in Chesterfield, MI' showing D.O.L.L.S. Cleaning cited first in the AI Overview and ranking first organically."
            width={628}
            height={322}
            frameAspect="16 / 9"
            stage="Local service business · not a law firm"
            caption="Named first in the AI Overview, #1 organic"
          />
          <ProofImage
            src="/images/proof/mso-gsc-indexing-full.png"
            alt="Google Search Console Pages report for Michigan Outdoor Sports: about 3,000 indexed pages in mid-May 2026 rising to 11,549 on 25 July 2026."
            width={778}
            height={520}
            frameAspect="16 / 9"
            stage="Ecommerce · not a law firm"
            caption="About 3,000 → 11,549 pages indexed, May–Jul 2026"
          />
        </div>
        <div
          className={`overflow-hidden ${radius.card} border bg-white lg:grid lg:grid-cols-2`}
          style={{ borderColor: color.border }}
        >
          <div className="p-8 lg:p-10">
            <Scale className="mb-4 h-8 w-8" style={{ color: color.primary }} aria-hidden />
            <h3 className={`${heading.h3} mb-4`} style={{ color: color.ink }}>
              Proven methodology, applied to your firm
            </h3>
            <ul className="space-y-3.5">
              {partnershipPoints.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: color.primary }}
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  <span className={text.small} style={{ color: color.ink }}>
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="flex flex-col justify-center border-t p-8 lg:border-l lg:border-t-0 lg:p-10"
            style={{ borderColor: color.border, background: color.surface }}
          >
            <h4 className={`${heading.h4} mb-3`} style={{ color: color.ink }}>
              Your firm could be the next #1 in your city.
            </h4>
            <p className={`${text.small} mb-6`} style={{ color: color.muted }}>
              We&apos;re selectively partnering with law firms ready to own their local market
              organically. Free audit shows exactly what it takes to rank — and get cited in AI
              answers — in your city and practice area.
            </p>
            <CtaButton
              href="/free-audit"
              compact
              icon={<ArrowRight className="h-4 w-4" aria-hidden />}
            >
              Claim free law firm audit
            </CtaButton>
            <p className={`${text.caption} mt-4`} style={{ color: color.muted }}>
              No obligation · 24-hour turnaround · Founder reviews it personally
            </p>
          </div>
        </div>
      </Section>

      {/* 2026 CORE UPDATE */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="SEO · GEO · AIO · LLMs · 2026 core update"
          title="Legal SEO built for the AI answer era"
          intro="Legal is YMYL — Google holds it to the highest trust bar, and AI Overviews now answer legal questions directly. Here's how we keep your firm visible everywhere clients look."
        />
        <CardGrid columns={2}>
          {coreUpdate2026.map((c) => (
            <FeatureCard
              key={c.title}
              icon={
                <span
                  className={`${heading.eyebrow} inline-flex items-center gap-2`}
                  style={{ color: color.primary }}
                >
                  <BadgeCheck className="h-4 w-4" aria-hidden /> Aligned
                </span>
              }
              title={c.title}
              body={c.body}
            />
          ))}
        </CardGrid>
      </Section>

      {/* CITY PAGES — the shared coverage block. The grid it replaces read
          lib/city-pages only and left out all eight Kansas cities; this reads
          lib/locations, which merges both. The city pages name this page as
          their breadcrumb parent, so the link runs both ways. */}
      <CoverageSection />

      {/* PRICE */}
      {LAW_PLAN ? (
        <Section>
          <SectionHeading eyebrow="What it costs" title="Law firm SEO pricing" />
          <div className="mx-auto max-w-2xl rounded-2xl border-2 p-6 text-center" style={{ borderColor: LAW_PLAN.accent, background: LAW_PLAN.bg }}>
            <p className="text-3xl font-black" style={{ color: LAW_PLAN.accent }}>
              {formatRange(LAW_PLAN)} <span className="text-base font-bold" style={{ color: color.muted }}>/ month</span>
            </p>
            <p className="mt-2 text-sm text-[#374151]">{LAW_PLAN.best}: {LAW_PLAN.includes.join(" · ")}</p>
            <p className="mt-3 text-xs leading-relaxed" style={{ color: color.muted }}>
              Where a firm lands in the range depends on the number of practice areas and cities. Month to month; one firm per city and practice area.
            </p>
            <Link href="/pricing" className="mt-3 inline-flex items-center gap-1 text-sm font-bold" style={{ color: color.primary }}>
              Full pricing <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Section>
      ) : null}

      {/* <VideoTestimonials /> */}

      {/* AUTHOR — E-E-A-T */}
      <Section width="narrow" tight>
        <AuthorCard
          name="Mubashar Sharif"
          role="Founder & Lead SEO Strategist · 5+ years · Semrush-certified"
          quote="&ldquo;Law firm SEO is won on trust — real attorney credentials, genuine reviews, and content built to Google's YMYL E-E-A-T standards. I've taken local service businesses to the top 3 map pack and Google AI Overview placements, and I bring that exact methodology to every firm I work with.&rdquo;"
          imageSrc="/images/mubashar-sharif.jpg"
          imageAlt="Mubashar Sharif — Founder & Lead SEO Strategist"
          linkedinUrl={LINKEDIN}
        />
      </Section>

      {/* ── THE CHECKLIST ──
          The audit above, written out and ungated. This is the page where a
          resource link earns its place: the visitor is already a law firm, and
          the offer still gets the last word in the closing form below. */}
      <Section width="narrow" tight>
        <Link
          href="/resources/law-firm-seo-audit-checklist"
          className={`group flex flex-col gap-5 ${radius.card} border p-6 transition-all hover:-translate-y-1 hover:shadow-xl sm:flex-row sm:items-center sm:p-7`}
          style={{ borderColor: color.border, background: color.white }}
        >
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center ${radius.chip}`}
            style={{ background: color.primarySoft }}
          >
            <ListChecks className="h-6 w-6" style={{ color: color.primary }} aria-hidden />
          </span>

          <div className="min-w-0 flex-1">
            <h2 className={`${heading.h4} mb-1.5`} style={{ color: color.ink }}>
              Rather run the audit yourself?
            </h2>
            <p className={text.small} style={{ color: color.muted }}>
              The same 40 checks, written out in full and free to use — no email, no download wall.
              Work through it with your own site open and keep whatever you find.
            </p>
          </div>

          <span
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
            style={{ color: color.primary }}
          >
            Open the checklist
            <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </Link>
      </Section>

      {/* FAQ */}
      <Section tone="surface" width="reading">
        <SectionHeading eyebrow="FAQ" title="Law firm SEO questions, answered" />
        <FaqList faqs={FAQS} name="law-firm-seo-faq" />
      </Section>

      {/* ── THE COMPLETE STACK (SearchPrex x Codeloci) ──
          Moved here from the homepage. The partnership is relevant to exactly
          one of the three homepage personas, and it linked visitors off-site
          to codeloci.com from the middle of the funnel. On this page the
          audience is already law firms and the outbound link is a genuine
          next step rather than a leak. */}
      <LawFirmStack />

      <ArticleLeadMagnet
        variant="bottom"
        source={SOURCE}
        copy={{
          headline: "Send me your URL. I’ll show you who’s taking your cases.",
          sub: "Two fields. A written look at your pages, Business Profile and the firms outranking you in your city — from me, within 24 hours.",
        }}
      />
    </main>
    </>
  );
}

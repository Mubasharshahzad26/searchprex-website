"use client";

// app/services/law-firm-seo/LawFirmSEOClient.tsx
//
// Clean, Unified Light-Theme USA Law Firm SEO Page (Oct 2026).
// Zero emojis, zero flashy multi-color icons — clean black bold headings,
// black bullet points, and numbered cards matching the Location Pages design.
//
// Honesty & ABA Model Rule 7.1 Governance: SearchPrex has not completed a
// published law firm engagement yet, so no fabricated legal result is claimed.
// Every proof screenshot is from another local/ecommerce industry and labelled
// clearly as such.

import Link from "next/link";

import ServiceBlogTeaser from "@/components/ServiceBlogTeaser";
import ServiceProofStrip from "@/components/ServiceProofStrip";
import LawFirmStack from "@/components/LawFirmStack";
import IntakeAssistant from "@/app/components/intake-assistant/intake-assistant";
import type { Guide } from "@/lib/guides";
import { RETAINER_PLANS } from "@/lib/pricing";
import { INDUSTRY_PAGES } from "@/lib/industry-pages";
import { AuthorCard, FaqList } from "@/components/layout";
import {
  Band,
  BandIntro,
  CheckList,
  Eyebrow,
  FaqBand,
  GuaranteeCard,
  H2,
  Lead,
  PriceCard,
} from "@/components/ServiceBands";

import ServiceTaglineReliefBar from "@/components/service-wireframe/ServiceTaglineReliefBar";
import LawFirmSemrushHero from "@/components/service-wireframe/LawFirmSemrushHero";
import ServiceQuickAnswerBox from "@/components/service-wireframe/ServiceQuickAnswerBox";
import LawFirmPracticeServicesSection from "@/components/service-wireframe/LawFirmPracticeServicesSection";
import LawFirmReliefVideoSection from "@/components/service-wireframe/LawFirmReliefVideoSection";
import ServiceAiDiagnosisAndTrial from "@/components/service-wireframe/ServiceAiDiagnosisAndTrial";
import ServiceExhaustedByAgencies from "@/components/service-wireframe/ServiceExhaustedByAgencies";
import ServiceUsaMapAndMarkets from "@/components/service-wireframe/ServiceUsaMapAndMarkets";

import { CAPSULES, FAQS } from "./data";

const LINKEDIN = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";
const LAW_PLAN = RETAINER_PLANS.find((p) => p.niche === "Law Firm SEO");

export default function LawFirmSEOClient({ guide: _guide }: { guide: Guide }) {
  return (
    <main>
      {/* 1. EMPATHETIC RELIEF TAGLINE BAR */}
      <ServiceTaglineReliefBar
        message="We are here to provide you a source of relief — we know your pain, and we have the solution."
        subText='Ranked #1 on Google in Ohio for "Law Firm SEO Cleveland Ohio" · 5+ Years Experience · 7-Day Free Trial'
      />

      {/* PRACTICE-AREA QUICK NAVIGATION BAR (CLEAN MONOCHROME LIGHT THEME) */}
      <div className="overflow-x-auto border-b border-slate-200 bg-white">
        <nav
          className="mx-auto flex max-w-6xl items-center space-x-6 px-4 py-2.5 text-xs font-semibold sm:px-6 lg:px-8"
          aria-label="Practice areas"
        >
          <span className="whitespace-nowrap font-black text-neutral-950 uppercase tracking-wider">
            Practice Silos:
          </span>
          {INDUSTRY_PAGES.map((ind) => (
            <Link
              key={ind.slug}
              href={`/services/law-firm-seo/${ind.slug}`}
              className="whitespace-nowrap text-slate-600 transition-colors hover:text-neutral-950"
            >
              {ind.name}
            </Link>
          ))}
          <Link
            href="/services/law-firm-seo/google-business-profile-for-lawyers"
            className="whitespace-nowrap text-neutral-950 font-bold underline underline-offset-4 transition-colors hover:text-slate-700"
          >
            GBP for Lawyers
          </Link>
        </nav>
      </div>

      {/* 2. CLEAN LOCATION-PAGE STYLE LIGHT HERO + FLOATING UI ELEMENTS + COMPRESSED WEBP DASHBOARD */}
      <LawFirmSemrushHero />

      {/* 3. AI OVERVIEW / GEO / CHATGPT QUICK ANSWER BOX (TOP HEADING REMOVED, NUMBERED CARDS) */}
      <ServiceQuickAnswerBox
        h2="How Do Law Firm SEO Services Work for US Attorneys in 2026?"
        answerCapsule="Law firm SEO services in the United States combine Google Business Profile Map Pack optimization, practice-area city silos (Family Law SEO, Criminal Defense SEO, Personal Injury SEO, and Probate), verifiable state bar E-E-A-T credentials, and LegalService JSON-LD schema so attorneys earn signed retainers from Google Search, AI Overviews, and ChatGPT."
        contextParagraph={
          <>
            Whether your practice serves{" "}
            <Link href="/locations/ohio/cleveland" className="font-bold text-neutral-950 underline">
              Cleveland, Ohio
            </Link>
            ,{" "}
            <Link href="/locations/texas/sugar-land" className="font-bold text-neutral-950 underline">
              Sugar Land, Texas
            </Link>
            ,{" "}
            <Link href="/locations/texas/the-woodlands" className="font-bold text-neutral-950 underline">
              The Woodlands, Texas
            </Link>
            ,{" "}
            <Link href="/locations/michigan/detroit" className="font-bold text-neutral-950 underline">
              Detroit, Michigan
            </Link>
            ,{" "}
            <Link href="/locations/pennsylvania/philadelphia" className="font-bold text-neutral-950 underline">
              Philadelphia, Pennsylvania
            </Link>
            ,{" "}
            <Link href="/locations/arizona/scottsdale" className="font-bold text-neutral-950 underline">
              Scottsdale &amp; Tempe, Arizona
            </Link>
            , or{" "}
            <Link href="/locations/california/san-jose" className="font-bold text-neutral-950 underline">
              San Jose, California
            </Link>
            , managing partners face the same reality: Google Ads clicks cost $150 to $350+, and generic SEO agencies waste your retainer on vanity metrics like Domain Authority (DA/PA). We build county-specific practice pages that rank in the Map Pack Top 3 and get cited by AI answer engines.
          </>
        }
        bullets={[
          {
            label: "Core USA Practice Areas",
            detail: (
              <>
                <Link href="/services/law-firm-seo/personal-injury" className="underline font-semibold text-neutral-950">
                  Personal Injury SEO
                </Link>
                ,{" "}
                <Link href="/services/law-firm-seo/family-law" className="underline font-semibold text-neutral-950">
                  Family Law &amp; Divorce SEO
                </Link>
                ,{" "}
                <Link href="/services/law-firm-seo/criminal-defense" className="underline font-semibold text-neutral-950">
                  Criminal Defense SEO
                </Link>
                ,{" "}
                <Link href="/services/law-firm-seo/estate-planning" className="underline font-semibold text-neutral-950">
                  Estate Planning &amp; Probate
                </Link>
                ,{" "}
                <Link href="/services/law-firm-seo/mass-torts" className="underline font-semibold text-neutral-950">
                  Mass Torts
                </Link>
                , and{" "}
                <Link href="/services/law-firm-seo/google-business-profile-for-lawyers" className="underline font-semibold text-neutral-950">
                  GBP for Lawyers
                </Link>
                .
              </>
            ),
          },
          {
            label: "AEO & ChatGPT Readiness",
            detail: "45–60 word statutory Answer Capsules + LegalService, Attorney & Speakable JSON-LD.",
          },
          {
            label: "Accountability & Exclusivity",
            detail: "One law firm per US city & practice area · Weekly Monday GSC & call reports.",
          },
          {
            label: "Risk-Free Onboarding",
            detail: "Limited-Time 7-Day Free Trial + 24-hour founder tear-down + month-to-month terms.",
          },
        ]}
        complianceBadge="ABA Model Rule 7.1 & Google YMYL Aligned"
        showLocationLink={true}
      />

      {/* 3B. SPECIALIZED LAW FIRM SEO SERVICES & PRACTICE AREAS WE OFFER (6 SUB-SERVICES WITH CONTEXTUAL LINKS) */}
      <LawFirmPracticeServicesSection />

      {/* 4. 9-SECOND INTERACTIVE RELIEF VIDEO + 2 CLEAN NUMBERED PAIN CARDS */}
      <LawFirmReliefVideoSection />

      {/* 5. UPLIFTED VERIFIED CASE STUDIES & PROOF STRIP */}
      <ServiceProofStrip
        id="proof"
        title="Verified Local & AI Overview Case Study Results Behind Our Law Firm Method"
        moreHref="/case-studies"
        moreLabel="See every verified case study"
        shots={[
          {
            src: "/images/proof/local-dolls-gsc-comparison.jpg",
            alt: "Google Search Console comparison for D.O.L.L.S. Cleaning: 264 clicks and 106K impressions in July 2025 against 192 clicks and 41K impressions in June 2025.",
            width: 626,
            height: 239,
            figure: "192 → 264",
            figureLabel: "monthly clicks, June → July 2025",
            caption: "D.O.L.L.S. Cleaning, Michigan — Search Console. Impressions grew from 41K to 106K.",
          },
          {
            src: "/images/proof/local-hvac-ai-overview.png",
            alt: "Google AI Overview for 'free cost estimation for ac installation in simi valley california' naming HVAC Services Team among businesses offering free estimates.",
            width: 717,
            height: 292,
            caption: "HVAC Services Team named in Google's AI Overview for a Simi Valley AC installation search.",
          },
        ]}
        footnote="Honesty & ABA Rule 7.1 Disclosure: These screenshots are from US local service businesses, not law firms — there is no published law firm case study on this site yet. The Map Pack, technical, and AI Overview engineering behind them is the exact system we execute for law firms."
      />

      {/* 5B. INDEPENDENT E-E-A-T ENTITY VERIFICATION BAR (MATCHING JSON-LD SAMEAS PROFILES) */}
      <section className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-neutral-950" />
            <span className="text-xs font-black uppercase tracking-wider text-neutral-950">
              Independent Entity &amp; Founder Verification:
            </span>
            <span className="text-xs text-slate-600 hidden sm:inline">
              Verified agency profiles matching our structured knowledge graph
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold">
            <a
              href="https://clutch.co/profile/searchprex"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-neutral-950 transition-colors hover:border-neutral-950 hover:bg-white"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />
              <span>Clutch Verified Profile &#8599;</span>
            </a>
            <a
              href="https://www.trustpilot.com/review/searchprex.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-neutral-950 transition-colors hover:border-neutral-950 hover:bg-white"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />
              <span>Trustpilot Reviews &#8599;</span>
            </a>
            <a
              href="https://www.linkedin.com/company/searchprex"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-neutral-950 transition-colors hover:border-neutral-950 hover:bg-white"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />
              <span>SearchPrex LinkedIn &#8599;</span>
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-neutral-950 transition-colors hover:border-neutral-950 hover:bg-white"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />
              <span>Mubashar Sharif (Founder) &#8599;</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE GEMINI AI DIAGNOSTIC BAR + CARE REPRESENTATIVE + LIGHT-BLUE/WHITE 7-DAY FREE TRIAL FORM */}
      <ServiceAiDiagnosisAndTrial
        serviceType="law-firm-seo"
        heading="We Know You Are Stressed by Rising Ad Costs & Quiet Phones — Diagnose Your Law Firm SEO Here"
        answerCapsule="Our interactive USA Law Firm SEO diagnostic engine evaluates why your practice is missing Google Map Pack calls and AI Overview citations across Family Law, Criminal Defense, and Personal Injury searches, then prescribes a verifiable fix you can test with our 7-Day Free Trial."
        placeholder="e.g. Our Family Law or Criminal Defense firm in Cleveland or Sugar Land isn't in the Map Pack Top 3..."
        painChips={[
          "Paying $150–$300+ per Google Ads click with low retainer ROI",
          "Buried below Map Pack Top 3 for Family Law / Criminal Defense / PI",
          "One generic Practice Areas page failing to rank in US suburbs",
          "Invisible in Google AI Overviews, ChatGPT & Perplexity",
          "Google Business Profile suspended or filtered out in our city",
          "Burned by a previous legal SEO agency selling vanity DA/backlinks",
        ]}
        lookingForOptions={[
          "Family Law & Divorce SEO",
          "Criminal Defense & DUI/OVI SEO",
          "Personal Injury & Truck Accident SEO",
          "Estate Planning & Probate SEO",
          "Workers' Comp & Mass Tort SEO",
          "Google Business Profile & Map Pack Top 3",
          "AI Overviews & ChatGPT Citations (AEO/GEO)",
          "7-Day Free Trial & Full Firm Audit",
        ]}
        initialItems={[
          {
            n: "1. Practice-Area & County Venue Silo Gap",
            why: "Your website forces Family Law, Criminal Defense, and Personal Injury into one umbrella page instead of dedicated city and county courthouse silos (e.g. Cuyahoga County OH, Fort Bend County TX, Montgomery County TX).",
            fix: "We engineer dedicated practice-by-city pages with statutory citations, local court procedures, and 45–60 word Answer Capsules above the fold.",
            tool: "Practice Silos + Statutory AEO Copy",
          },
          {
            n: "2. GBP Primary Category & Map Pack Proximity Dilution",
            why: "Setting your Google Business Profile to generic 'Law Firm' or using an unverified virtual office suppresses your firm below the Map Pack Top 3 where high-intent callers tap.",
            fix: "We align your primary GBP category to your highest-margin caseload, reconcile State Bar and Avvo/Justia NAP citations, and deploy a bar-compliant review workflow.",
            tool: "GBP Category + State Bar Citation Sync",
          },
          {
            n: "3. Missing Attorney E-E-A-T & AI Citation Graph",
            why: "Google AI Overviews and ChatGPT skip legal pages that lack verifiable attorney bar numbers, admission years, and structured LegalService/Attorney JSON-LD.",
            fix: "We wire verified attorney credentials, courtroom bio pages, FAQPage schema, and an llms.txt entity manifest into your site architecture.",
            tool: "Schema Generator + llms.txt Builder",
          },
        ]}
        initialRecommendation="Stop paying $200+ per click to rent traffic you never own. Let us build your practice-area city silos, align your Google Business Profile, and prove our execution during your 7-Day Free Trial."
        trialDeliverablesLeft={[
          "Complete 40-point Law Firm SEO, YMYL & ABA Model Rule 7.1 compliance audit",
          "Google Business Profile primary category, service-tree & local competitor gap analysis",
          "Practice-area keyword roadmap (Family Law, Criminal Defense, Personal Injury, Probate)",
          "Live LegalService, Attorney & FAQPage JSON-LD schema prepared for your top page",
        ]}
        trialDeliverablesRight={[
          "45–60 word AI Overview & ChatGPT Answer Capsule drafted for your primary practice page",
          "State Bar, Avvo, Justia & local courthouse citation consistency check",
          "Direct 1-on-1 strategy review with Founder Mubashar Sharif (5+ years mastery)",
          "Full Monday Search Console & local rank baseline report — yours to keep",
        ]}
      />

      {/* 7. INTERACTIVE USA MAP EMBED + VISUAL WEBP CITY CARDS (DUPLICATE LINKS REMOVED) */}
      <ServiceUsaMapAndMarkets
        serviceName="Law Firm SEO Services"
        answerCapsule='SearchPrex delivers one-firm-per-city Law Firm SEO across 9 core US states and 22+ pinpointed metropolitan and suburban venues—anchored by our #1 Google ranking in Ohio for "Law Firm SEO Cleveland Ohio", and expanding across Sugar Land and The Woodlands (TX), Detroit and Grand Rapids (MI), Philadelphia (PA), Tempe and Scottsdale (AZ), San Jose (CA), Baton Rouge (LA), Albuquerque (NM), and Kansas.'
      />

      {/* 8. EXHAUSTED BY PREVIOUS SEO AGENCIES? + COMPARISON MATRIX */}
      <ServiceExhaustedByAgencies
        serviceLabel="USA Law Firm SEO"
        answerCapsule='Managing partners leave traditional legal marketing agencies because of partial monthly PDFs, junior account hand-offs, and useless Domain Authority (DA/PA) backlink metrics. SearchPrex gives you direct access to Founder Mubashar Sharif (5+ years mastery), #1 ranked Google authority in Ohio for "Law Firm SEO Cleveland Ohio", weekly Monday consultation reports, and a 7-Day Free Trial.'
        showLocationLink={true}
      />

      {/* 9. LIVE 24/7 AI LEGAL INTAKE DEMO */}
      <Band muted id="intake-demo">
        <BandIntro
          eyebrow="Live demo · 24/7 AI legal intake assistant"
          title="Getting found is half the battle. Capturing every 2 a.m. legal caller is the other half."
          lead="An urgent Criminal Defense, Family Law, or Personal Injury inquiry that hits voicemail is a signed retainer lost to the next firm on Google Maps. Test our 24/7 legal intake assistant below."
        />
        <div className="mx-auto mt-8 max-w-4xl">
          <IntakeAssistant embedded />
        </div>
      </Band>

      {/* 10. TRANSPARENT PRICING & FOUNDER E-E-A-T */}
      <Band>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Transparent Pricing &amp; Exclusivity</Eyebrow>
            <H2>Law Firm SEO Pricing ($1,200–$2,500/Mo) &amp; One-Firm-Per-City Exclusivity</H2>
            <Lead>
              You work directly with Founder Mubashar Sharif—who builds your practice-area pages, writes your LegalService schema, and manages your Google Business Profile. Every recommendation is engineered for your county court venue and caseload goals.
            </Lead>
            <div className="mt-8">
              <CheckList
                items={[
                  "Strict market exclusivity: one firm per US city and practice area",
                  "Limited-time 7-Day Free Trial + written plan before you pay anything",
                  "Built to Google YMYL and ABA Model Rule 7.1 advertising rules",
                  "Full weekly Monday report on Search Console clicks, Map Pack calls & leads",
                  "Month to month flexibility, backed by our 90-day money-back guarantee",
                ]}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {LAW_PLAN ? (
              <PriceCard
                plan={LAW_PLAN}
                label="Law firm SEO"
                note="Where a firm lands in the range depends on the number of practice areas and US cities. Month to month; one firm per city and practice area."
              />
            ) : null}
            <GuaranteeCard />
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-4xl">
          <AuthorCard
            name="Mubashar Sharif"
            role='Founder · 5+ years · Ranked #1 on Google in Ohio for "Law Firm SEO Cleveland Ohio" · Semrush & HubSpot certified'
            quote="&ldquo;Law firm SEO is won on verifiable trust — state bar credentials, genuine client reviews, county-venue pages, and content built to Google&rsquo;s YMYL standards. I&rsquo;ve taken US local businesses to #1 in Google&rsquo;s local results and into its AI Overviews, and I bring that exact method to every firm I work with.&rdquo;"
            imageSrc="/images/mubashar-sharif.jpg"
            imageAlt="Mubashar Sharif — Founder of SearchPrex"
            linkedinUrl={LINKEDIN}
            badges={["Semrush certified", "HubSpot certified", "5+ Years Mastery"]}
          />
        </div>
      </Band>

      {/* 11. LAW FIRM BLOG TEASER + FAQS + TELEMETRY STRAP + FINAL CTA */}
      <ServiceBlogTeaser topic="law-firm" />

      <FaqBand title="USA Law Firm SEO, AEO & GEO questions, answered">
        <FaqList faqs={[...CAPSULES, ...FAQS]} name="law-firm-seo-faq" />
      </FaqBand>

      {/* 2026 CONFIRMED LEGAL TELEMETRY & PLAYBOOK STRAP — POSITIONED ABOVE FINAL CTA (CLEAN LIGHT THEME) */}
      <section className="border-y border-slate-200 bg-slate-50 px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-neutral-950 text-xs font-black text-white shrink-0">
              01
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-neutral-950">
                Confirmed 2026 USA Legal Search Telemetry
              </p>
              <p className="text-sm font-semibold text-slate-700">
                Google Business Profile Virtual Office Suspension Enforcement &amp; State Bar Entity Verification
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/resources/news/google-business-profile-law-firm-virtual-office-enforcement-2026"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-neutral-950 shadow-2xs transition-all hover:bg-slate-100"
            >
              <span>Read News Breakdown &rarr;</span>
            </Link>
            <Link
              href="/resources/solutions"
              className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-950 px-3.5 py-2 text-xs font-bold text-white shadow-2xs transition-all hover:bg-neutral-800"
            >
              <span>View Reinstatement Playbook &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      <LawFirmStack />
    </main>
  );
}

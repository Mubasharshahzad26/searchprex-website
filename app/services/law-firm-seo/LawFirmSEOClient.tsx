"use client";

// app/services/law-firm-seo/LawFirmSEOClient.tsx
//
// Streamlined, Semrush-Style USA Law Firm SEO Page (Oct 2026).
// Zero emojis — clean Lucide vector icons only.
//
// Honesty & ABA Model Rule 7.1 Governance: SearchPrex has not completed a
// published law firm engagement yet, so no fabricated legal result is claimed.
// Every proof screenshot is from another local/ecommerce industry and labelled
// clearly as such.

import Link from "next/link";
import { Zap, FileText, Wrench } from "lucide-react";

import ServiceBlogTeaser from "@/components/ServiceBlogTeaser";
import ServiceProofStrip from "@/components/ServiceProofStrip";
import LawFirmStack from "@/components/LawFirmStack";
import IntakeAssistant from "@/app/components/intake-assistant/intake-assistant";
import type { Guide } from "@/lib/guides";
import { RETAINER_PLANS } from "@/lib/pricing";
import { INDUSTRY_PAGES } from "@/lib/industry-pages";
import { AuthorCard, ComparisonTable, FaqList } from "@/components/layout";
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
import LawFirmReliefVideoSection from "@/components/service-wireframe/LawFirmReliefVideoSection";
import ServiceAiDiagnosisAndTrial from "@/components/service-wireframe/ServiceAiDiagnosisAndTrial";
import ServiceExhaustedByAgencies from "@/components/service-wireframe/ServiceExhaustedByAgencies";
import ServiceUsaMapAndMarkets from "@/components/service-wireframe/ServiceUsaMapAndMarkets";
import ServiceSemanticClusterAndLinks from "@/components/service-wireframe/ServiceSemanticClusterAndLinks";

import { CAPSULES, FAQS } from "./data";

const LINKEDIN = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";
const LAW_PLAN = RETAINER_PLANS.find((p) => p.niche === "Law Firm SEO");

const LAW_SEMANTIC_CLUSTERS = [
  {
    tabName: "Family Law & Divorce SEO",
    coreEntities:
      "Equitable Distribution vs. Community Property · High-Asset Business & RSU Division · Child Custody & Parenting Plans · Spousal Support · County Family Court Venue",
    lowHangingKeywords: [
      "high asset divorce lawyer sugar land tx fort bend county",
      "family law attorney cleveland ohio cuyahoga county custody",
      "executive rsu divorce attorney the woodlands tx",
      "uncontested divorce & child custody lawyer plano & katy tx",
    ],
    psychologyAndIntent:
      "Family law clients search in moments of acute personal and financial stress. Pages that explain county family court procedures, asset protection, and custody timelines in calm, authoritative language convert panicked searchers into retained consultations.",
    siloHref: "/services/law-firm-seo/family-law-seo",
    siloLabel: "Explore Family Law SEO Architecture",
  },
  {
    tabName: "Criminal Defense & DUI/OVI SEO",
    coreEntities:
      "Felony & Misdemeanor Defense · DUI / OVI / DWI License Suspension · Administrative ALS Hearings · Bail & Arraignment · Municipal & County Criminal Courts",
    lowHangingKeywords: [
      "ovi defense lawyer cleveland ohio municipal court",
      "dwi & criminal defense attorney denton & sugar land tx",
      "extreme dui defense lawyer scottsdale & tempe az",
      "24/7 felony criminal defense attorney detroit & philadelphia",
    ],
    psychologyAndIntent:
      "Criminal and DUI/OVI searches happen urgently—often late at night or immediately after an arrest. Fast mobile load speed (INP), Map Pack Top 3 visibility, and 24/7 AI intake capture callers before they dial the next firm.",
    siloHref: "/services/law-firm-seo/criminal-defense-seo",
    siloLabel: "Explore Criminal Defense SEO Architecture",
  },
  {
    tabName: "Personal Injury & Auto/Truck SEO",
    coreEntities:
      "Comparative Fault Rules · Commercial Truck FMCSA Liability · Catastrophic Injury & Wrongful Death · Insurance Bad Faith · Contingency Fee Structure",
    lowHangingKeywords: [
      "commercial truck accident lawyer i-90 cleveland ohio",
      "michigan no-fault auto accident lawyer detroit & grand rapids",
      "car accident injury attorney sugar land & katy i-10 corridor",
      "full tort vs limited tort injury lawyer philadelphia pa",
    ],
    psychologyAndIntent:
      "Instead of burning $250+ per click on broad PPC terms, we capture injured victims searching specific highway corridors, state fault statutes, and suburban county venues where case values are high and organic competition is thinner.",
    siloHref: "/services/law-firm-seo/personal-injury-seo",
    siloLabel: "Explore Personal Injury SEO Architecture",
  },
  {
    tabName: "Estate Planning, Probate & Workers' Comp",
    coreEntities:
      "Revocable Living Trusts · Probate Administration · Guardianship · State-Fund Workers' Compensation (Ohio BWC) · Mass Tort Venue Silos",
    lowHangingKeywords: [
      "estate planning & living trust attorney the woodlands tx",
      "probate administration lawyer fort bend county sugar land",
      "ohio bwc workers compensation attorney cleveland oh",
      "silicon valley trust & estate lawyer san jose ca",
    ],
    psychologyAndIntent:
      "Affluent suburban families in The Woodlands, Sugar Land, Scottsdale, and San Jose search for long-term wealth transfer and probate clarity, while injured workers in Ohio search specific BWC claim rules.",
    siloHref: "/services/law-firm-seo/estate-planning-seo",
    siloLabel: "Explore Estate Planning & Specialty Legal SEO",
  },
];

export default function LawFirmSEOClient({ guide: _guide }: { guide: Guide }) {
  return (
    <main>
      {/* 1. EMPATHETIC RELIEF TAGLINE BAR */}
      <ServiceTaglineReliefBar
        message="We are here to provide you a source of relief — we know your pain, and we have the solution."
        subText="#1 Ranked in Cleveland, OH USA Local SEO Mastery · 5+ Years Experience · 7-Day Free Trial"
      />

      {/* PRACTICE-AREA QUICK NAVIGATION BAR */}
      <div className="overflow-x-auto border-b border-slate-800 bg-[#070b15]">
        <nav
          className="mx-auto flex max-w-6xl items-center space-x-6 px-4 py-2.5 text-xs font-semibold sm:px-6 lg:px-8"
          aria-label="Practice areas"
        >
          <span className="whitespace-nowrap font-black text-emerald-400 uppercase tracking-wider">
            Practice Silos:
          </span>
          {INDUSTRY_PAGES.map((ind) => (
            <Link
              key={ind.slug}
              href={`/services/law-firm-seo/${ind.slug}`}
              className="whitespace-nowrap text-slate-300 transition-colors hover:text-white"
            >
              {ind.name}
            </Link>
          ))}
          <Link
            href="/services/law-firm-seo/google-business-profile-for-lawyers"
            className="whitespace-nowrap text-sky-300 transition-colors hover:text-white"
          >
            GBP for Lawyers
          </Link>
        </nav>
      </div>

      {/* 2. SEMRUSH-STYLE ANIMATED HERO + FLOATING UI ELEMENTS + COMPRESSED WEBP DASHBOARD */}
      <LawFirmSemrushHero />

      {/* 2026 CONFIRMED LEGAL TELEMETRY & PLAYBOOK BADGE — ZERO EMOJIS */}
      <section className="border-b bg-amber-50/70 px-4 py-3.5 sm:px-6 lg:px-8" style={{ borderColor: "#fde68a" }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 text-white">
              <Zap className="h-4 w-4" aria-hidden />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-amber-950">
                Confirmed 2026 USA Legal Search Telemetry
              </p>
              <p className="text-sm font-semibold text-amber-900">
                Google Business Profile Virtual Office Suspension Enforcement &amp; State Bar Entity Verification
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/resources/news/google-business-profile-law-firm-virtual-office-enforcement-2026"
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-white px-3.5 py-1.5 text-xs font-bold text-amber-950 shadow-sm transition-all hover:border-amber-500"
            >
              <FileText className="h-3.5 w-3.5" aria-hidden />
              <span>Read News Breakdown &rarr;</span>
            </Link>
            <Link
              href="/resources/solutions"
              className="inline-flex items-center gap-1.5 rounded-full bg-amber-900 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-neutral-900"
            >
              <Wrench className="h-3.5 w-3.5" aria-hidden />
              <span>View Reinstatement Playbook &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. AI OVERVIEW / GEO / CHATGPT QUICK ANSWER BOX */}
      <ServiceQuickAnswerBox
        eyebrow="Answer Engine (AEO) & Generative Engine Optimization (GEO) Summary"
        h2="How Does Law Firm SEO Work for US Attorneys in 2026?"
        answerCapsule="Law firm SEO in the United States combines Google Business Profile Map Pack optimization, practice-area city silos (Family Law SEO, Criminal Defense SEO, Personal Injury SEO, and Probate), verifiable state bar E-E-A-T credentials, and LegalService JSON-LD schema so attorneys earn signed retainers from Google Search, AI Overviews, and ChatGPT."
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
                <Link href="/services/law-firm-seo/family-law-seo" className="underline font-semibold">
                  Family Law &amp; Divorce SEO
                </Link>
                ,{" "}
                <Link href="/services/law-firm-seo/criminal-defense-seo" className="underline font-semibold">
                  Criminal Defense &amp; DUI/OVI SEO
                </Link>
                ,{" "}
                <Link href="/services/law-firm-seo/personal-injury-seo" className="underline font-semibold">
                  Personal Injury SEO
                </Link>
                , and{" "}
                <Link href="/services/law-firm-seo/estate-planning-seo" className="underline font-semibold">
                  Estate Planning &amp; Probate SEO
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

      {/* 4. 9-SECOND INTERACTIVE RELIEF VIDEO + ATTORNEY BURNOUT VISUAL & CORE PAIN CHECKS */}
      <LawFirmReliefVideoSection />

      {/* 5. INTERACTIVE GEMINI AI DIAGNOSTIC BAR + "TELL US WHAT YOU ARE LOOKING FOR" + 7-DAY FREE TRIAL FORM */}
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

      {/* 6. INTERACTIVE USA MAP EMBED + VISUAL WEBP CITY CARDS (CLEVELAND, SUGAR LAND, THE WOODLANDS) */}
      <ServiceUsaMapAndMarkets
        serviceName="Law Firm SEO Services"
        answerCapsule="SearchPrex delivers one-firm-per-city Law Firm SEO across 9 core US states and 22+ pinpointed metropolitan and suburban venues—anchored by our #1 ranked Local SEO mastery in Cleveland, Ohio, and expanding across Sugar Land and The Woodlands (TX), Detroit and Grand Rapids (MI), Philadelphia (PA), Tempe and Scottsdale (AZ), San Jose (CA), Baton Rouge (LA), Albuquerque (NM), and Kansas."
      />

      {/* 7. EXHAUSTED BY PREVIOUS SEO AGENCIES? + ABA CHANNEL COMPARISON TABLE */}
      <ServiceExhaustedByAgencies
        serviceLabel="USA Law Firm SEO"
        answerCapsule="Managing partners leave traditional legal marketing agencies because of partial monthly PDFs, junior account hand-offs, and useless Domain Authority (DA/PA) backlink metrics. SearchPrex gives you direct access to Founder Mubashar Sharif (5+ years mastery), #1 ranked Cleveland OH local SEO authority, weekly Monday consultation reports, and a 7-Day Free Trial."
        showLocationLink={true}
      />

      <Band>
        <div className="mx-auto max-w-5xl">
          <ComparisonTable
            caption="How USA Law Firm Acquisition Channels Compare (ABA Model Rule 7.1 Compliant Overview)"
            columns={[
              "Organic Law Firm SEO + AEO/GEO",
              "Google Ads PPC & Local Services Ads",
              "Legal Directories & Lead Aggregators",
            ]}
            rows={[
              {
                label: "Ownership of asset",
                values: [
                  "You own the practice-area pages, schema, and Map Pack authority long term",
                  "Rented visibility — calls stop the hour your monthly ad budget pauses",
                  "Profile sits on a third-party directory alongside competing attorneys",
                ],
              },
              {
                label: "Exclusivity of inquiry",
                values: [
                  "100% exclusive calls and intake forms directly to your firm",
                  "Direct click, but competitors bid on your brand and adjacent slots",
                  "Leads are frequently shared with 3–5 competing firms in the same county",
                ],
              },
              {
                label: "AI Overview & ChatGPT visibility",
                values: [
                  "Structured 45–60 word Answer Capsules & LegalService schema feed AI citations",
                  "Paid ads do not build organic entity citations inside ChatGPT or Perplexity",
                  "Aggregator directories are cited instead of your law firm's domain",
                ],
              },
              {
                label: "Compliance & control",
                values: [
                  "Every word reviewed for ABA Model Rule 7.1 and state bar rules",
                  "Restricted ad character limits and automated headline rewrites",
                  "Limited control over how third-party badges or ratings are framed",
                ],
              },
            ]}
          />
        </div>
      </Band>

      {/* 8. SEMANTIC LONG-TAIL KEYWORD CLUSTERS + LIVE 24/7 AI LEGAL INTAKE DEMO */}
      <ServiceSemanticClusterAndLinks
        eyebrow="USA Legal Search Psychology · Low-Hanging Long-Tail Keywords"
        h2="High-Intent Legal Keyword Clusters & Contextual Internal Linking Architecture"
        answerCapsule="Instead of chasing broad national vanity terms, we target high-converting, low-hanging USA legal keywords that pair your exact practice area (Family Law, Criminal Defense, Personal Injury, Estate Planning) with local county court venues, state statutes, and suburban corridors."
        clusters={LAW_SEMANTIC_CLUSTERS}
      />

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

      {/* 9. VERIFIED PROOF STRIP (WITH HONEST NON-LEGAL DISCLOSURE) + TRANSPARENT PRICING & FOUNDER E-E-A-T */}
      <ServiceProofStrip
        id="proof"
        title="Local & AI Overview results from the exact method I apply to law firms"
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

      <Band>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Transparent Pricing &amp; Exclusivity</Eyebrow>
            <H2>One law firm per US city, one founder doing the actual engineering</H2>
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
            role="Founder · 5+ years · #1 Ranked Cleveland OH Local SEO Mastery · Semrush & HubSpot certified"
            quote="&ldquo;Law firm SEO is won on verifiable trust — state bar credentials, genuine client reviews, county-venue pages, and content built to Google&rsquo;s YMYL standards. I&rsquo;ve taken US local businesses to #1 in Google&rsquo;s local results and into its AI Overviews, and I bring that exact method to every firm I work with.&rdquo;"
            imageSrc="/images/mubashar-sharif.jpg"
            imageAlt="Mubashar Sharif — Founder of SearchPrex"
            linkedinUrl={LINKEDIN}
            badges={["Semrush certified", "HubSpot certified", "5+ Years Mastery"]}
          />
        </div>
      </Band>

      {/* 10. LAW FIRM BLOG TEASER + FAQS + STACK */}
      <ServiceBlogTeaser topic="law-firm" />

      <FaqBand title="USA Law Firm SEO, AEO & GEO questions, answered">
        <FaqList faqs={[...CAPSULES, ...FAQS]} name="law-firm-seo-faq" />
      </FaqBand>

      <LawFirmStack />
    </main>
  );
}

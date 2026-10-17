"use client";

// app/services/law-firm-seo/LawFirmSEOClient.tsx
//
// USA Market Focus + AEO / GEO / ChatGPT-Friendly Architecture (Oct 2026).
// Zero emojis — clean Lucide vector icons only.
//
// The honesty rule that governs this page (see ./data.ts): SearchPrex has not
// completed a law firm engagement, so no legal result is claimed anywhere.
// Every screenshot here is from another industry and is labelled as such. Law
// firm pages also answer to ABA Model Rule 7.1 on misleading communications —
// no position, no timeline and no guaranteed outcome is promised.

import Link from "next/link";
import { Scale, Zap, FileText, Wrench } from "lucide-react";

import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import ServiceBlogTeaser from "@/components/ServiceBlogTeaser";
import ServiceProofStrip from "@/components/ServiceProofStrip";
import ProofImage from "@/components/ProofImage";
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
  CheckPanel,
  Eyebrow,
  FaqBand,
  GuaranteeCard,
  H2,
  Lead,
  MarketsBand,
  PriceCard,
  ProofPanel,
  RealityBanner,
  RuleGrid,
  RuleItem,
  ServiceHero,
  Steps,
  TextLink,
  WhiteButton,
} from "@/components/ServiceBands";

import ServiceTaglineReliefBar from "@/components/service-wireframe/ServiceTaglineReliefBar";
import ServiceQuickAnswerBox from "@/components/service-wireframe/ServiceQuickAnswerBox";
import ServiceAiDiagnosisAndTrial from "@/components/service-wireframe/ServiceAiDiagnosisAndTrial";
import ServiceExhaustedByAgencies from "@/components/service-wireframe/ServiceExhaustedByAgencies";
import ServiceUsaMapAndMarkets from "@/components/service-wireframe/ServiceUsaMapAndMarkets";
import ServiceSemanticClusterAndLinks from "@/components/service-wireframe/ServiceSemanticClusterAndLinks";

import { CAPSULES, FAQS, PROBLEMS } from "./data";

const LINKEDIN = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";
const SOURCE = "service:law-firm-seo";
const LAW_PLAN = RETAINER_PLANS.find((p) => p.niche === "Law Firm SEO");

const included = [
  { title: "Practice-area & US city pages", body: "A dedicated page for each practice area (Family Law SEO, Criminal Defense SEO, Personal Injury SEO, Probate) and each US city or county venue you serve.", href: "#practice-areas" },
  { title: "Attorney E-E-A-T & YMYL signals", body: "State bar admission numbers, court jurisdictions, real photos, and LegalService schema so Google and ChatGPT can verify who stands behind the advice.", href: "#ymyl" },
  { title: "Google Business Profile & Map Pack", body: "Practice-specific primary categories, service-item mapping, virtual office risk remediation, and a bar-compliant review workflow.", href: "/services/law-firm-seo/google-business-profile-for-lawyers" },
  { title: "Technical SEO & AI crawlers", body: "Core Web Vitals (INP), crawl budget, LegalService/Attorney/FAQPage JSON-LD, and llms.txt entity architecture.", href: "/services/technical-seo" },
  { title: "Verified legal authority", body: "State bar directories, Avvo, Justia, FindLaw, and local chamber/civic alignment — never toxic DA/PA link packages.", href: "#profile" },
  { title: "AEO, GEO & Monday reports", body: "45–60 word Answer Capsules that AI Overviews and ChatGPT cite, paired with a plain-English Monday report on clicks, calls, and forms.", href: "#ymyl" },
];

const practiceChecks = [
  "One dedicated page per practice area (Family Law, Criminal Defense, Personal Injury, Estate Planning) per US city",
  "45–60 word AI Overview Answer Capsule right below the H2 heading answering what happens next",
  "Verified attorney byline with state bar admission year, bar number, and local court jurisdictions",
  "Clear explanation of fees, free consultations, and state statutory deadlines without overpromising",
  "Tappable click-to-call phone number and 24/7 intake form above the fold on mobile",
  "Strict compliance with ABA Model Rule 7.1 and state bar rules — no 'best lawyer' or guaranteed outcomes",
];

const ymylItems = [
  { title: "Attorney E-E-A-T", body: "Legal content is a Your-Money-Your-Life (YMYL) topic. State bar credentials, court jurisdictions, and real attorney attribution go on every page." },
  { title: "AI Overview citations", body: "Google AI Overviews answer statutory and local legal questions above traditional links. Structured 45–60 word Answer Capsules make your firm the cited source." },
  { title: "ChatGPT & Perplexity GEO", body: "Prospective US clients ask ChatGPT and Perplexity which attorney to call. Entity-linked LegalService schema and llms.txt files feed those models." },
  { title: "People-first statutory copy", body: "Every page addresses real client anxiety, county courthouse procedures, and statutory timelines — never thin keyword-stuffed filler." },
];

const profileChecks = [
  "Primary category matches your core practice (e.g. Family Law Attorney, Criminal Justice Attorney, Personal Injury Attorney)",
  "Every sub-practice area mapped as a structured service inside Google Business Profile",
  "Staffed physical office address, suite number, hours, and phone identical to your website and state bar record",
  "Authentic client reviews requested through a bar-compliant post-matter workflow",
  "Legal directory citations (State Bar, Avvo, Justia, Super Lawyers) reconciled to the exact character",
  "Direct phone calls, direction requests, and consultation clicks tracked every Monday",
];

const process = [
  { when: "Days 1–7", title: "7-Day Free Trial & Tear-Down", body: "Your firm URL in, a written tear-down within 24 hours, plus 7 days of initial technical, schema, and GBP quick-win execution at zero cost." },
  { when: "Weeks 1–2", title: "US Venue & Competitor Audit", body: "Your website, Google Business Profile, and top 3 local Map Pack competitors mapped across your city and county courts." },
  { when: "Weeks 3–8", title: "Practice & City Silos Live", body: "Technical fixes, LegalService & Attorney JSON-LD schema, GBP category alignment, and practice-area city pages published." },
  { when: "Every Monday", title: "Full Stat & Lead Report", body: "No partial reporting: live Google Search Console clicks, Map Pack positions, phone calls, and consultation forms reviewed every Monday." },
];

const partnershipPoints = [
  "One firm per US city and practice area — we never rank a local competitor against you",
  "#1 Ranked in Cleveland, Ohio USA Local SEO Mastery applied directly to your legal market",
  "Direct access to Founder Mubashar Sharif (5+ years SEO mastery) — zero junior hand-offs",
  "Full weekly Monday Google Search Console and call-tracking discussions — no vanity DA/PA games",
  "Built to Google YMYL and ABA Model Rule 7.1 standards at every step",
];

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

// `guide` is still passed by page.tsx; the checklist is linked from the practice-area band.
export default function LawFirmSEOClient({ guide: _guide }: { guide: Guide }) {
  return (
    <main>
      {/* EMPATHETIC RELIEF TAGLINE BAR */}
      <ServiceTaglineReliefBar
        message="We are here to provide you a source of relief — we know your pain, and we have the solution."
        subText="#1 Ranked in Cleveland, OH USA Local SEO Mastery · 5+ Years Experience · 7-Day Free Trial"
      />

      <ServiceHero
        crumb="Law Firm SEO"
        above={
          <div className="mt-4 overflow-x-auto border-y bg-slate-50" style={{ borderColor: "#e5e7eb" }}>
            <nav className="mx-auto flex max-w-6xl space-x-6 px-4 py-3 text-sm font-medium sm:px-6 lg:px-8" aria-label="Practice areas">
              <span className="whitespace-nowrap font-bold text-[#171717]">Overview</span>
              {INDUSTRY_PAGES.map((ind) => (
                <Link
                  key={ind.slug}
                  href={`/services/law-firm-seo/${ind.slug}`}
                  className="whitespace-nowrap text-slate-500 transition-colors hover:text-slate-900"
                >
                  {ind.name}
                </Link>
              ))}
            </nav>
          </div>
        }
        eyebrow="USA Law Firm SEO · AEO & GEO Services"
        title="Law Firm SEO Services in the USA"
        accent="that bring in signed cases"
        subtitle="We are here to provide you a source of relief — we know your pain, and we have the solution. Stop burning $150–$300+ per click on Google Ads. We engineer Family Law SEO, Criminal Defense SEO, Personal Injury SEO, and Estate Planning pages built to YMYL and ABA Model Rule 7.1 standards across major US states and cities."
        primary={{ href: "#7-day-trial", label: "Start 7-Day Free Trial" }}
        secondary={{ href: "#diagnose", label: "Diagnose My Law Firm SEO" }}
        trustPoints={["One firm per US city", "5+ years founder mastery", "7-Day Free Trial + 90-day guarantee"]}
        aside={
          <ArticleLeadMagnet
            variant="sidebar"
            source={SOURCE}
            copy={{
              headline: "Free law firm tear-down + 7-Day Trial",
              sub: "Send your URL. I’ll check your practice-area pages, Business Profile and the firms outranking you in your US city — within 24 hours.",
            }}
          />
        }
      />

      {/* 2026 CONFIRMED LEGAL TELEMETRY & PLAYBOOK BADGE — ZERO EMOJIS */}
      <section className="border-b bg-amber-50/70 px-4 py-4 sm:px-6 lg:px-8" style={{ borderColor: "#fde68a" }}>
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

      {/* AI OVERVIEW / GEO / CHATGPT QUICK ANSWER BOX */}
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
      />

      {/* INTERACTIVE GEMINI AI DIAGNOSTIC BAR + "TELL US WHAT YOU ARE LOOKING FOR" + 7-DAY FREE TRIAL FORM */}
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

      {/* No law firm case study yet, so these are local service businesses and
          the footnote says so in plain words. */}
      <ServiceProofStrip
        id="proof"
        title="Local results from the same method I'd use for your firm"
        moreHref="/case-studies"
        moreLabel="See every case study"
        shots={[
          {
            src: "/images/proof/local-dolls-gsc-comparison.jpg",
            alt: "Google Search Console comparison for D.O.L.L.S. Cleaning: 264 clicks and 106K impressions in July 2025 against 192 clicks and 41K impressions in June 2025.",
            width: 626,
            height: 239,
            figure: "192 → 264",
            figureLabel: "monthly clicks, June → July 2025",
            caption: "D.O.L.L.S. Cleaning, Michigan — Search Console. Impressions went from 41K to 106K.",
          },
          {
            src: "/images/proof/local-hvac-ai-overview.png",
            alt: "Google AI Overview for 'free cost estimation for ac installation in simi valley california' naming HVAC Services Team among businesses offering free estimates.",
            width: 717,
            height: 292,
            caption: "HVAC Services Team named in Google's AI Overview for a Simi Valley AC installation search.",
          },
        ]}
        footnote="These are local service businesses, not law firms — there is no published law firm case study on this site yet. The map pack and AI Overview work behind them is the same work I do for firms."
      />

      {/* EXHAUSTED BY PREVIOUS SEO AGENCIES? SEE HOW WE ARE DIFFERENT */}
      <ServiceExhaustedByAgencies
        serviceLabel="USA Law Firm SEO"
        answerCapsule="Managing partners leave traditional legal marketing agencies because of partial monthly PDFs, junior account hand-offs, and useless Domain Authority (DA/PA) backlink metrics. SearchPrex gives you direct access to Founder Mubashar Sharif (5+ years mastery), #1 ranked Cleveland OH local SEO authority, weekly Monday consultation reports, and a 7-Day Free Trial."
      />

      {/* THE PROBLEM */}
      <Band>
        <BandIntro
          center={false}
          eyebrow="The problem"
          title="Why good US law firms lose signed cases to worse competitors"
          lead="In competitive US legal markets, four specific failure modes drain your consultation pipeline. Each one is costing your firm retainers today if it fails."
        />
        <RealityBanner
          src="/images/audiences/lawyer-ppc-fatigue.webp"
          alt="Attorney at law firm reviewing expensive Google Ads PPC campaign spend and zero retained cases late at night"
          tag="The Reality · PPC Budget Burnout"
          quote="“Another $150 click that turned into a price-shopper who hung up in 30 seconds.”"
          body="Every click on Google Ads is paid for, every single month. When you pause the campaign, the inquiries stop immediately. Practice-area and US city pages keep bringing qualified Family Law, Criminal Defense, and Personal Injury consultations long after the work is done."
        />
        <RuleGrid columns={2}>
          {PROBLEMS.map((p) => (
            <RuleItem
              key={p.title}
              icon={<Scale className="h-5 w-5 flex-shrink-0 text-[#b8123a]" aria-hidden />}
              title={p.title}
              body={
                <>
                  <p className="text-[#374151]"><strong>Check:</strong> {p.check}</p>
                  <p className="mt-1">{p.costs}</p>
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
          title="What a complete USA law firm SEO, AEO & GEO plan covers"
          lead="Legal search is judged under Google's strictest Your-Money-Your-Life (YMYL) standards. Every deliverable is built around verifiable attorney credentials, county venue accuracy, and ABA Model Rule 7.1 compliance."
        />
        <RuleGrid>
          {included.map((i) => (
            <RuleItem key={i.title} dark {...i} />
          ))}
        </RuleGrid>
      </Band>

      {/* PRACTICE AREAS + SEMANTIC H2 ANSWER CAPSULE + COMPARISON TABLE */}
      <Band id="practice-areas">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Practice-area &amp; US city pages</Eyebrow>
            <H2>One dedicated page for every caseload you want, in every US city you serve</H2>
            <p className="mt-4 rounded-2xl border-l-4 border-l-neutral-900 bg-slate-50 p-4 text-sm font-semibold text-neutral-900 leading-relaxed">
              A single umbrella “Practice Areas” page cannot rank for “Family Law Attorney Sugar Land TX”, “Criminal Defense Lawyer Cleveland OH”, and “Personal Injury Attorney Detroit MI” simultaneously. We build dedicated practice-by-city silos mapped to state statutes and local county courthouses.
            </p>
            <Lead>
              Each page opens with a plain-English 45–60 word Answer Capsule for prospective clients and AI Overviews, cites verified state bar credentials, and links directly into your local courthouse venue.
            </Lead>
            <div className="mt-8 flex flex-wrap gap-2">
              {INDUSTRY_PAGES.map((ind) => (
                <Link
                  key={ind.slug}
                  href={`/services/law-firm-seo/${ind.slug}`}
                  className="rounded-full border border-[#d9d6f3] px-4 py-2 text-sm font-bold text-[#0a0a0a] transition hover:border-[#171717] hover:text-[#171717]"
                >
                  {ind.name} SEO
                </Link>
              ))}
            </div>
            <TextLink href="/resources/law-firm-seo-audit-checklist">Run the 40-check law firm SEO audit yourself — free, no email</TextLink>
            <p className="mt-3 text-sm" style={{ color: "#5b6472" }}>
              Planning new practice pages?{" "}
              <Link href="/blog/keyword-research-for-law-firms" className="font-semibold underline" style={{ color: "#171717" }}>
                Keyword research for law firms
              </Link>{" "}
              ·{" "}
              <Link href="/law-firm-scorecard" className="font-semibold underline" style={{ color: "#171717" }}>
                Free Law Firm SEO Scorecard
              </Link>
            </p>
          </div>
          <CheckPanel title="What every US practice-area page needs" items={practiceChecks} />
        </div>

        <div className="mx-auto mt-14 max-w-5xl">
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

      {/* INTERACTIVE USA MAP EMBED + PINPOINTED STATES & CITIES */}
      <ServiceUsaMapAndMarkets
        serviceName="Law Firm SEO Services"
        answerCapsule="SearchPrex delivers one-firm-per-city Law Firm SEO across 9 core US states and 22+ pinpointed metropolitan and suburban venues—anchored by our #1 ranked Local SEO mastery in Cleveland, Ohio, and expanding across Sugar Land and The Woodlands (TX), Detroit and Grand Rapids (MI), Philadelphia (PA), Tempe and Scottsdale (AZ), San Jose (CA), Baton Rouge (LA), Albuquerque (NM), and Kansas."
      />

      {/* SEMANTIC LONG-TAIL KEYWORD CLUSTERS + CONTEXTUAL INTERNAL LINKING MATRIX */}
      <ServiceSemanticClusterAndLinks
        eyebrow="USA Legal Search Psychology · Low-Hanging Long-Tail Keywords"
        h2="High-Intent Legal Keyword Clusters & Contextual Internal Linking Architecture"
        answerCapsule="Instead of chasing broad national vanity terms, we target high-converting, low-hanging USA legal keywords that pair your exact practice area (Family Law, Criminal Defense, Personal Injury, Estate Planning) with local county court venues, state statutes, and suburban corridors."
        clusters={LAW_SEMANTIC_CLUSTERS}
      />

      {/* YMYL & AI ANSWERS */}
      <Band dark id="ymyl">
        <BandIntro
          dark
          eyebrow="Trust & AI answers (AEO / GEO)"
          title="Legal SEO built for Google AI Overviews, ChatGPT & YMYL scrutiny"
          lead="Google holds legal topics to its highest trust bar, and AI Overviews now answer legal questions directly above the search results. Here is how your firm stays visible wherever US clients look."
        />
        <RuleGrid columns={4}>
          {ymylItems.map((c) => (
            <RuleItem key={c.title} dark {...c} />
          ))}
        </RuleGrid>
      </Band>

      {/* GOOGLE BUSINESS PROFILE */}
      <Band id="profile">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Google Business Profile &amp; local pack</Eyebrow>
            <H2>Win the Google Map Pack for “lawyer near me” in your US city</H2>
            <p className="mt-4 rounded-2xl border-l-4 border-l-neutral-900 bg-slate-50 p-4 text-sm font-semibold text-neutral-900 leading-relaxed">
              For urgent local legal searches—such as “family law lawyer near me”, “criminal defense attorney Cleveland”, or “personal injury lawyer Sugar Land”—the Google Map Pack captures the call before organic links. We align your primary GBP category, state bar citations, and review velocity with the top 3 firms in your county.
            </p>
            <Lead>
              I compare your Business Profile directly against the three firms ranking above you in your city, so every category, service item, and citation change has a clear engineering reason behind it.
            </Lead>
            <TextLink href="/services/law-firm-seo/google-business-profile-for-lawyers">Google Business Profile for lawyers guide</TextLink>
          </div>
          <CheckPanel items={profileChecks} />
        </div>
      </Band>

      {/* PROCESS */}
      <Band dark id="approach">
        <BandIntro dark eyebrow="How it works" title="From 7-Day Free Trial to signed consultations" />
        <Steps steps={process} cta={{ href: "#7-day-trial", label: "Start my 7-Day Free Trial & Tear-Down" }} />
      </Band>

      {/* LIVE INTAKE DEMO */}
      <Band muted id="intake-demo">
        <BandIntro
          eyebrow="Live demo · AI intake assistant"
          title="Getting found is half the battle. Capturing every legal lead is the other half."
          lead="A 2 a.m. Criminal Defense, Family Law, or Personal Injury call that goes to voicemail is a signed retainer lost. Test our 24/7 intake assistant below and watch how it qualifies the case in seconds."
        />
        <div className="mx-auto mt-10 max-w-4xl">
          <IntakeAssistant embedded />
        </div>
      </Band>

      {/* FIRST LAW FIRM CASE STUDY */}
      <Band dark>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center [&>*]:min-w-0">
          <div>
            <Eyebrow dark>Selective USA law firm partnerships</Eyebrow>
            <H2 dark>Be my first published law firm case study</H2>
            <Lead dark>
              I have verified results in US local, ecommerce and technical SEO — including #1 ranked local SEO mastery in Cleveland, Ohio and local service businesses named first in Google’s AI Overviews. I am bringing that exact engineering method to law firms, one firm per US city.
            </Lead>
            <div className="mt-8">
              <CheckList dark items={partnershipPoints} />
            </div>
            <div className="mt-8">
              <WhiteButton href="#7-day-trial">Claim your 7-Day Free Trial &amp; Tear-Down</WhiteButton>
            </div>
            <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
              No obligation · reply within 24 hours · written personally by Founder Mubashar Sharif
            </p>
          </div>
          <ProofPanel>
            <ProofImage
              src="/images/proof/local-dolls-ai-overview-rank1.png"
              alt="Google results for 'post construction cleaning in Chesterfield, MI' showing D.O.L.L.S. Cleaning cited first in the AI Overview and ranking first organically."
              width={628}
              height={322}
              stage="Local service business · not a law firm"
              caption="Named first in the AI Overview, #1 organic"
            />
            <ProofImage
              src="/images/proof/mso-gsc-indexing-full.png"
              alt="Google Search Console Pages report for Michigan Outdoor Sports: about 3,000 indexed pages in mid-May 2026 rising to 11,549 on 25 July 2026."
              width={778}
              height={520}
              stage="Ecommerce · not a law firm"
              caption="About 3,000 → 11,549 pages indexed, May–Jul 2026"
            />
          </ProofPanel>
        </div>
      </Band>

      {/* PRICE, GUARANTEE & WHO DOES THE WORK */}
      <Band>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Why SearchPrex</Eyebrow>
            <H2>One law firm per US city, one founder doing the actual engineering</H2>
            <Lead>
              You work directly with the strategist who builds your practice-area pages, writes your LegalService schema, and manages your Google Business Profile. Every recommendation is built for your US county venue, your caseload goals, and the firms you compete against.
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

      {/* MARKETS — the /locations pages name this page as their parent */}
      <MarketsBand
        title="USA Law Firm SEO in the states and cities I already cover"
        lead="Each US city page covers that market’s county courts, state statutory search intent, and local Map Pack competition. Not on the list? The 7-Day Free Trial and tear-down work for any US city."
      />

      {/* LAW FIRM BLOG TEASER */}
      <ServiceBlogTeaser topic="law-firm" />

      {/* FAQ — page.tsx builds the FAQPage schema from the same arrays */}
      <FaqBand title="USA Law Firm SEO, AEO & GEO questions, answered">
        <FaqList faqs={[...CAPSULES, ...FAQS]} name="law-firm-seo-faq" />
      </FaqBand>

      {/* SearchPrex × Codeloci — relevant only to law firms */}
      <LawFirmStack />

      <div id="get-started">
        <ArticleLeadMagnet
          variant="bottom"
          source={SOURCE}
          copy={{
            headline: "Send me your URL. I’ll show you who’s taking your cases.",
            sub: "Two fields. A written look at your practice pages, Business Profile and the firms outranking you in your US city — from me, within 24 hours.",
          }}
        />
      </div>
    </main>
  );
}

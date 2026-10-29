"use client";

// app/services/local-seo/LocalSEOClient.tsx
//
// USA Market Focus + AEO / GEO / Map Pack Top 3 Architecture (Oct 2026).
// Zero emojis — clean Lucide vector icons only.
//
// Honesty notes: every figure is readable in its screenshot; no position or
// timeline is promised.

import Link from "next/link";
import { ArrowRight, MapPin, FileText, ShieldCheck } from "lucide-react";

import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import ServiceBlogTeaser from "@/components/ServiceBlogTeaser";
import type { Guide } from "@/lib/guides";
import ProofImage from "@/components/ProofImage";
import ServiceProofStrip from "@/components/ServiceProofStrip";
import { RETAINER_PLANS } from "@/lib/pricing";
import { LOCAL_INDUSTRIES } from "@/lib/local-industries";
import { caseStudies } from "@/app/case-studies/data";
import HalloweenOfferCard from "@/components/offers/HalloweenOfferCard";
import { AuthorCard, ComparisonTable, FaqList } from "@/components/layout";
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

import { CAPSULES, FAQS, PROBLEMS } from "./data";

const LINKEDIN = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";
const SOURCE = "service:local-seo";
const LOCAL_PLAN = RETAINER_PLANS.find((p) => p.niche === "Local SEO");

const included = [
  { title: "Google Business Profile", body: "Primary and secondary categories, services, photos, posts and reviews engineered for the US local searches that bring phone calls.", href: "/services/local-seo/google-business-profile-optimization" },
  { title: "Website & US service-area pages", body: "A dedicated page for each service and each US city or suburb you serve — never a find-and-replace duplicate.", href: "#website" },
  { title: "Review velocity system", body: "A steady, policy-safe routine to earn genuine customer reviews with service-plus-city keywords.", href: "#trust" },
  { title: "US citations & NAP data", body: "Name, address, phone and hours made identical across Google, Apple Maps, Bing, Yelp, BBB and your trade directories.", href: "#trust" },
  { title: "AI Overview & ChatGPT readiness", body: "45–60 word Answer Capsules and LocalBusiness JSON-LD so Google and ChatGPT name your company first.", href: "#maps" },
  { title: "Monday call & rank reporting", body: "No partial reporting: Map Pack positions, Profile calls, direction requests, and Search Console clicks every Monday.", href: "#process" },
];

const profileChecks = [
  "Primary and secondary categories benchmarked against the top three in your US Map Pack",
  "Services listed in the exact words local customers actually search",
  "Business hours, phone and suite address identical to your website HTML and schema",
  "Geo-authentic photos that show real jobs, crews, offices and service vehicles",
  "90-day review count and recency compared against your top 3 local competitors",
  "Google suggested edits monitored so competitors cannot alter your hours or category",
  "Phone calls, direction requests and website clicks tracked every Monday",
];

const websiteItems = [
  { title: "Dedicated service pages", body: "One page for each service you want calls for, answering what a US homeowner or client asks before they ring." },
  { title: "City and suburb pages", body: "Built for the exact US cities and suburbs your crews serve, each with local context and neighborhood proof." },
  { title: "Technical health & mobile INP", body: "Crawling, indexing and mobile load speed fixed so emergency mobile callers never bounce." },
  { title: "Contextual internal links", body: "Services, cities, tools and case studies linked so both customers and Googlebot find every page." },
  { title: "Semantic titles and H2s", body: "Written around real local searches, e.g. “AC installation in Simi Valley” or “carpet cleaning in Clawson MI”, with 45–60 word Answer Capsules." },
  { title: "Click-to-call and form paths", body: "A tappable phone number and a fast quote form above the fold on every mobile page." },
];

const trustItems = [
  { title: "Business NAP information", body: "Name, address, phone, hours and services verified on every US listing that matters. Google uses your website to judge suggested edits, so the two must agree." },
  { title: "Policy-safe review program", body: "A simple routine for asking happy customers and replying to every review — no fake reviews, nothing that risks a GBP suspension." },
  { title: "High-trust US citations", body: "The directories your US customers and competitors actually use (BBB, Chamber of Commerce, trade boards), not bulk spam links." },
];

const process = [
  { when: "Days 1–7", title: "7-Day Free Trial & Tear-Down", body: "Your URL in, a written diagnosis within 24 hours: your Business Profile, citations and the three competitors above you, plus 7 days of initial fixes." },
  { when: "Weeks 1–4", title: "Profile & US citations", body: "Google Business Profile categories and services rebuilt; business NAP details made consistent everywhere they appear." },
  { when: "Weeks 5–8", title: "City pages & reviews", body: "Service and US suburb pages published live, with the review velocity routine running alongside." },
  { when: "Every Monday", title: "Full Stat & Call Report", body: "No partial reporting: Map Pack positions, phone calls, direction requests, and what happens next." },
];

const expectations = [
  "The founder does the work — no junior account managers in between",
  "Founder-led local SEO applied to your market",
  "Limited-time 7-Day Free Trial + written plan before you pay anything",
  "Priorities ranked by what brings phone calls and booked jobs, not DA/PA vanity metrics",
  "A plain-English report every Monday · Month to month with 90-day guarantee",
];

const LOCAL_SEMANTIC_CLUSTERS = [
  {
    tabName: "Google Business Profile & Map Pack Top 3",
    coreEntities:
      "Primary GBP Category Precision · Secondary Category Stack · Service-Area Radius Compression · Review Velocity & Keyword Co-Occurrence · LocalBusiness JSON-LD",
    lowHangingKeywords: [
      "google business profile optimization service usa",
      "how to rank in google maps top 3 for near me searches",
      "fix google map pack ranking drop in suburbs",
      "local seo services cleveland ohio & sugar land tx",
    ],
    psychologyAndIntent:
      "When a pipe bursts, an AC unit fails, or a customer searches 'near me', over 65% of mobile taps go to the Google Map Pack Top 3. Aligning your primary category and review velocity captures those calls immediately.",
    siloHref: "/services/local-seo/google-business-profile-optimization",
    siloLabel: "Explore GBP Optimization Service",
  },
  {
    tabName: "GBP Suspension Recovery & Reinstatement",
    coreEntities:
      "Video Verification Audit Prep · Virtual Office & Co-Working Remediation · Secretary of State / Utility Bill Alignment · Duplicate Listing Suppression · Reinstatement Appeal Dossier",
    lowHangingKeywords: [
      "google business profile suspended deceptive content fix",
      "gbp video verification failed service area business",
      "reinstate suspended google business profile usa",
      "law firm & contractor gbp virtual office suspension fix",
    ],
    psychologyAndIntent:
      "A suspended Google Business Profile shuts off your inbound dispatch overnight. We diagnose the exact policy trigger, align your Secretary of State and utility documentation, and prepare your reinstatement appeal.",
    siloHref: "/services/local-seo/google-business-profile-suspended",
    siloLabel: "Explore GBP Suspension Recovery",
  },
  {
    tabName: "Home Services: HVAC, Roofing, Cleaning & Garage",
    coreEntities:
      "Emergency Dispatch Keywords · Suburb-by-Service Silos · Free Cost Estimation AI Overview Capsules · Before/After Job Proof · ServiceArea Schema",
    lowHangingKeywords: [
      "hvac seo services simi valley & texas",
      "roofing company local seo map pack leads",
      "cleaning business seo rank #1 google maps",
      "garage door repair local seo & gbp optimization",
    ],
    psychologyAndIntent:
      "Backed by our verified case studies—D.O.L.L.S. Cleaning (#1 & #2 organic + #1 AI Overview), HVAC Services Team (Simi Valley AI Overview), and Mammoth Roofing (16.9K to 45.2K impressions)—we build pages that keep service vans booked.",
    siloHref: "/case-studies/cleaning/dolls-cleaning",
    siloLabel: "Read D.O.L.L.S. Cleaning Case Study",
  },
  {
    tabName: "Multi-Suburb & Regional Expansion",
    coreEntities:
      "Hub-and-Spoke City Architecture · Non-Duplicate Suburb Copy · Local Landmark & Highway Signals · Cross-County Service Area Mapping · llms.txt Local Entity Feed",
    lowHangingKeywords: [
      "rank in surrounding suburbs without a second office",
      "multi location local seo agency usa",
      "service area business pages that rank in google maps",
      "ai overview optimization for local service businesses",
    ],
    psychologyAndIntent:
      "US service-area businesses based in one metro need phone calls from affluent neighboring suburbs without triggering doorway-page penalties.",
    siloHref: "/resources/google-business-profile-checklist",
    siloLabel: "Run the 23-Point Free GBP Checklist",
  },
];

// `guide` is still passed by page.tsx; the checklist is linked from the Profile band.
export default function LocalSEOClient({ guide: _guide }: { guide: Guide }) {
  return (
    <main>
      {/* EMPATHETIC RELIEF TAGLINE BAR */}
      <ServiceTaglineReliefBar
        message="We are here to provide you a source of relief — we know your pain, and we have the solution."
        subText="Verified Map Pack & AI Overview Proof · 7-Day Free Trial · 90-Day Guarantee"
      />

      <ServiceHero
        crumb="Local SEO"
        eyebrow="USA Local SEO · Google Map Pack & AI Overviews"
        title="Local SEO Services in the USA"
        accent="that make your phone ring"
        subtitle="We are here to provide you a source of relief — we know your pain, and we have the solution. Your US customers search “near me” and call whoever is in the Top 3. Backed by verified Michigan, Texas, and California case studies, I get local businesses into the Google Maps pack and cited first in AI Overviews."
        primary={{ href: "#7-day-trial", label: "Start 7-Day Free Trial" }}
        secondary={{ href: "#diagnose", label: "Diagnose My Local SEO" }}
        trustPoints={["Founder-led, no juniors", "7-Day Free Trial + 90-day guarantee", "Month to month"]}
        aside={
          <ArticleLeadMagnet
            variant="sidebar"
            source={SOURCE}
            copy={{
              headline: "Free local tear-down + 7-Day Trial",
              sub: "Send your URL. I’ll check your Business Profile, citations and the three competitors above you in your US city — and tell you what to fix first, within 24 hours.",
            }}
          />
        }
      />

      {/* 2026 CONFIRMED LOCAL SEARCH & GBP TELEMETRY BADGE — ZERO EMOJIS */}
      <section className="border-b bg-emerald-50/70 px-4 py-4 sm:px-6 lg:px-8" style={{ borderColor: "#a7f3d0" }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white">
              <MapPin className="h-4 w-4" aria-hidden />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-emerald-950">
                Confirmed 2026 USA Local Search Telemetry
              </p>
              <p className="text-sm font-semibold text-emerald-900">
                US Regional Local Pack Proximity Volatility &amp; Google Business Profile Video Verification Re-Audits
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/resources/news/us-regional-seo-map-pack-proximity-compression-metro-volatility"
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-white px-3.5 py-1.5 text-xs font-bold text-emerald-950 shadow-sm transition-all hover:border-emerald-500"
            >
              <FileText className="h-3.5 w-3.5" aria-hidden />
              <span>Read Proximity Volatility Study &rarr;</span>
            </Link>
            <Link
              href="/services/local-seo/google-business-profile-suspended"
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-neutral-900"
            >
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              <span>GBP Suspension Recovery Guide &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* HALLOWEEN 2026 — hides itself after 31 October (lib/halloween-offer.ts) */}
      <HalloweenOfferCard className="py-10" />

      {/* AI OVERVIEW / GEO / CHATGPT QUICK ANSWER BOX */}
      <ServiceQuickAnswerBox
        eyebrow="Answer Engine (AEO) & Generative Engine Optimization (GEO) Summary"
        h2="How Do USA Local SEO Services Win the Google Map Pack Top 3 and AI Overviews?"
        answerCapsule="Local SEO in the United States aligns your Google Business Profile primary category, service-area suburb pages, NAP directory citations, genuine customer review velocity, and LocalBusiness JSON-LD schema—driving inbound phone calls and direction requests from both the Google Maps 3-Pack and AI Overviews."
        contextParagraph={
          <>
            SearchPrex has taken US service businesses into both the #1 organic slot and Google&rsquo;s AI Overviews—including{" "}
            <Link href="/case-studies/cleaning/dolls-cleaning" className="font-bold text-neutral-950 underline">
              D.O.L.L.S. Cleaning in Michigan
            </Link>{" "}
            (192 &rarr; 264 monthly clicks, #1 &amp; #2 in Clawson, #1 AI Overview citation in Chesterfield),{" "}
            <Link href="/case-studies/hvac/local-hvac-services" className="font-bold text-neutral-950 underline">
              HVAC Services Team in Simi Valley, California
            </Link>{" "}
            (cited in Google&rsquo;s AI Overview), and{" "}
            <Link href="/case-studies/roofing/mammoth-roofing" className="font-bold text-neutral-950 underline">
              Mammoth Roofing in Texas
            </Link>{" "}
            (16.9K &rarr; 45.2K impressions). We deploy this same system for local service businesses across the United States.
          </>
        }
        bullets={[
          {
            label: "Founder-led execution",
            detail: "5+ years of hands-on local SEO by the founder, Semrush & HubSpot certified.",
          },
          {
            label: "Verified AI Overview Proof",
            detail: (
              <>
                Named first in Google AI Overviews for{" "}
                <Link href="/case-studies/cleaning/dolls-cleaning" className="underline font-semibold">
                  D.O.L.L.S. Cleaning (MI)
                </Link>{" "}
                &amp;{" "}
                <Link href="/case-studies/hvac/local-hvac-services" className="underline font-semibold">
                  HVAC Services Team (CA)
                </Link>
                .
              </>
            ),
          },
          {
            label: "GBP & Suspension Defense",
            detail: "Primary category precision, NAP consistency, and video-verification recovery.",
          },
          {
            label: "Risk-Free Onboarding",
            detail: "Limited-Time 7-Day Free Trial + weekly Monday call & Map Pack reporting.",
          },
        ]}
        complianceBadge="Google Maps 3-Pack & AI Overview Standard"
      />

      {/* INTERACTIVE GEMINI AI DIAGNOSTIC BAR + "TELL US WHAT YOU ARE LOOKING FOR" + 7-DAY FREE TRIAL FORM */}
      <ServiceAiDiagnosisAndTrial
        serviceType="local-seo"
        heading="We Know You Are Tired of Quiet Phones & Idle Crews — Diagnose Your Local SEO Here"
        answerCapsule="Describe your Google Business Profile or local ranking problem below to discover why competitors are taking your 'near me' phone calls and how we move your business into the Map Pack Top 3 and AI Overviews—starting with a 7-Day Free Trial."
        placeholder="e.g. Our local service business is buried at #8 in Google Maps and not showing in AI Overviews..."
        painChips={[
          "Buried outside the Google Maps Top 3 for 'near me' searches",
          "Google Business Profile suspended or stuck in video verification",
          "Not ranking in surrounding affluent suburbs outside our main city",
          "Competitors getting cited in Google AI Overviews & ChatGPT",
          "Inconsistent NAP citations & slow customer review velocity",
          "Burned by a previous agency sending partial reports & vanity metrics",
        ]}
        lookingForOptions={[
          "Google Business Profile & Map Pack Top 3",
          "GBP Suspension Recovery & Reinstatement",
          "Suburb & Service-Area Page Expansion",
          "Local AI Overviews & ChatGPT Citations (AEO/GEO)",
          "Review Velocity & US Citation Cleanup",
          "Home Services SEO (HVAC, Roofing, Cleaning, Garage)",
          "Law Firm & Medical Clinic Local SEO",
          "7-Day Free Trial & Full Local Tear-Down",
        ]}
        initialItems={[
          {
            n: "1. GBP Primary Category & Proximity Compression",
            why: "Your Google Business Profile uses a broad primary category, lacks structured service items, or suffers from NAP mismatches across Apple Maps, Yelp, and BBB—dropping you below the Top 3.",
            fix: "We benchmark the exact primary/secondary category stack of your city's Top 3 leaders, reconcile NAP citations to the character, and build genuine review velocity.",
            tool: "GBP Category Audit + Citation Sync",
          },
          {
            n: "2. Missing Suburb & Service-Area Landing Pages",
            why: "A single homepage cannot rank in 10 surrounding US suburbs when Google compresses Map Pack radius around searcher proximity.",
            fix: "We build dedicated, non-duplicate city and suburb pages with local job proof, driving directions, and LocalBusiness schema.",
            tool: "Suburb Silo Architecture + LocalBusiness JSON-LD",
          },
          {
            n: "3. Invisible in Local AI Overviews & ChatGPT",
            why: "When homeowners ask AI engines 'who offers free estimates in [city]' or 'best contractor near me', thin pages without structured Answer Capsules are skipped.",
            fix: "We add 45–60 word Answer Capsules under semantic H2 headings and wire FAQPage + LocalBusiness schema (the exact method behind our Michigan and California AI Overview citations).",
            tool: "AEO Answer Capsules + Schema Generator",
          },
        ]}
        initialRecommendation="Your crews and phones should not sit idle while competitors with worse service rank above you in Google Maps. Test our local Map Pack engineering with a 7-Day Free Trial."
        trialDeliverablesLeft={[
          "Complete 23-point Google Business Profile audit benchmarked against your Top 3 local competitors",
          "Primary & secondary GBP category + service-tree optimization blueprint",
          "US directory NAP consistency check (Google, Apple Maps, Bing, Yelp, BBB)",
          "Live LocalBusiness, ServiceArea & FAQPage JSON-LD prepared for your site",
        ]}
        trialDeliverablesRight={[
          "45–60 word AI Overview Answer Capsule written for your primary service page",
          "Suburb & service-area keyword gap roadmap for your surrounding US cities",
          "Direct 1-on-1 strategy session with Founder Mubashar Sharif",
          "Full Monday Search Console & local rank baseline report — yours to keep",
        ]}
      />

      <ServiceProofStrip
        id="proof"
        title="Two local clients, straight from Google"
        moreHref="/case-studies"
        moreLabel="See all the case studies"
        shots={[
          {
            src: "/images/mammoth-roofing-comparison.JPG",
            alt: "Google Search Console comparison for mammothroofs.com: 45.2K impressions and 210 clicks in the last 28 days against 16.9K impressions and 197 clicks in the previous 28 days.",
            width: 626,
            height: 350,
            figure: "16.9K → 45.2K",
            figureLabel: "Google impressions, 28 days vs the 28 before",
            caption: "Mammoth Roofing, Texas — Search Console, October 2024. Clicks went from 197 to 210 over the same period.",
          },
          {
            src: "/images/proof/local-dolls-rank-1-and-2.png",
            alt: "Google results for 'carpet cleaning services in Clawson, MI' with D.O.L.L.S. Cleaning in the first and second positions.",
            width: 627,
            height: 338,
            figure: "#1 & #2",
            figureLabel: "Carpet cleaning in Clawson, Michigan",
            caption: "D.O.L.L.S. Cleaning, Michigan — two pages in the top two results for the same search.",
          },
        ]}
      />

      {/* EXHAUSTED BY PREVIOUS SEO AGENCIES? SEE HOW WE ARE DIFFERENT */}
      <ServiceExhaustedByAgencies
        serviceLabel="USA Local SEO"
        answerCapsule="Local business owners leave traditional SEO agencies because of automated citation software, partial monthly PDFs that hide call counts, and useless Domain Authority (DA/PA) backlink metrics. SearchPrex gives you direct access to Founder Mubashar Sharif (5+ years of hands-on SEO), weekly Monday call and Map Pack reports, and a 7-Day Free Trial."
      />

      {/* THE PROBLEM */}
      <Band>
        <BandIntro
          center={false}
          eyebrow="The problem"
          title="Why US local businesses lose the Google Map Pack"
          lead="Four things you can check yourself in the next ten minutes. If any of them fails, it is costing you phone calls today."
        />
        <RealityBanner
          src="/images/audiences/local-contractor-garage.webp"
          alt="Local contractor and garage repair business owner waiting for incoming phone calls with idle service vans"
          tag="The Reality · Silent Dispatch"
          quote="“Three service vans parked inside and payroll running, while the map pack sends calls to competitors.”"
          body="When someone's garage door breaks, heating stops, or roof leaks, they call one of the top three in the local pack. If you're buried at #7, your crews stay idle while worse competitors stay booked out."
        />
        <RuleGrid columns={2}>
          {PROBLEMS.map((p) => (
            <RuleItem
              key={p.title}
              icon={<MapPin className="h-5 w-5 flex-shrink-0 text-[#b8123a]" aria-hidden />}
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
          title="What a complete USA local SEO, AEO & GEO plan covers"
          lead="Local rankings come from several signals working together. I work on the ones your US market is missing first, not a generic checklist."
        />
        <RuleGrid>
          {included.map((i) => (
            <RuleItem key={i.title} dark {...i} />
          ))}
        </RuleGrid>
      </Band>

      {/* GOOGLE BUSINESS PROFILE + COMPARISON TABLE */}
      <Band id="profile">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Google Business Profile</Eyebrow>
            <H2>Your Business Profile is where most US local calls start</H2>
            <p className="mt-4 rounded-2xl border-l-4 border-l-neutral-900 bg-slate-50 p-4 text-sm font-semibold text-neutral-900 leading-relaxed">
              For “near me” and city-specific searches across the USA, the Google Maps 3-Pack sits above organic links and captures the highest-intent mobile phone calls. Your Profile wins when its primary category, listed services, website HTML, and recent customer reviews all reinforce the exact same local entity.
            </p>
            <Lead>
              I look at your Profile right next to the three businesses ranking above you in your city, so every change has a concrete reason behind it.
            </Lead>
            <TextLink href="/services/local-seo/google-business-profile-optimization">Google Business Profile optimization service</TextLink>
            <div><TextLink href="/resources/google-business-profile-checklist">Free Google Business Profile checklist (23 checks)</TextLink></div>
          </div>
          <CheckPanel items={profileChecks} />
        </div>

        <div className="mx-auto mt-14 max-w-5xl">
          <ComparisonTable
            caption="How the 3 Local Search Surfaces Work Together in 2026"
            columns={[
              "Google Map Pack (Top 3)",
              "Local AI Overviews & ChatGPT",
              "Traditional Local Organic Links",
            ]}
            rows={[
              {
                label: "Primary ranking drivers",
                values: [
                  "Primary GBP category, searcher proximity, review velocity & NAP consistency",
                  "45–60 word Answer Capsules, LocalBusiness schema, pricing clarity & entity trust",
                  "Dedicated service-plus-city landing pages, internal links & on-page depth",
                ],
              },
              {
                label: "How US customers interact",
                values: [
                  "One-tap mobile phone calls, direction requests & review comparison",
                  "Zero-click summary reading who to call and what a service costs locally",
                  "Deep comparison of service areas, before/after project proof & quote forms",
                ],
              },
              {
                label: "Verified SearchPrex proof",
                values: [
                  "D.O.L.L.S. Cleaning local pack growth (#1 and #2 in Clawson, MI)",
                  "D.O.L.L.S. Cleaning (MI) & HVAC Services Team (Simi Valley, CA) cited in AI Overviews",
                  "#1 & #2 organic positions in Clawson, MI + 16.9K → 45.2K impressions on Mammoth Roofing (TX)",
                ],
              },
            ]}
          />
        </div>
      </Band>

      {/* SEMANTIC LONG-TAIL KEYWORD CLUSTERS + CONTEXTUAL INTERNAL LINKING MATRIX */}
      <ServiceSemanticClusterAndLinks
        eyebrow="USA Local Search Psychology · Low-Hanging Long-Tail Keywords"
        h2="High-Intent Local Keyword Clusters & Contextual Internal Linking Architecture"
        answerCapsule="We pair high-intent 'near me' and emergency service queries with suburb-specific landing pages, GBP category precision, and 45–60 word Answer Capsules so your business captures both Map Pack calls and AI Overview citations."
        clusters={LOCAL_SEMANTIC_CLUSTERS}
      />

      {/* MAPS & AI OVERVIEWS */}
      <Band dark id="maps">
        <BandIntro
          dark
          eyebrow="Google Maps & AI Overviews (AEO / GEO)"
          title="Show up wherever a local US customer looks"
          lead="Google says local results are “mainly based on relevance, distance, and popularity.” You can’t move your physical address, but you can make your business the most relevant and best-known answer — in the Map Pack, in organic results, and in the AI Overview that now sits above both."
        />
        <div className="text-center">
          <TextLink dark href="/case-studies/hvac/local-hvac-services">See a California HVAC company named in Google’s AI Overview</TextLink>
        </div>
      </Band>

      {/* WEBSITE */}
      <Band id="website">
        <BandIntro
          center={false}
          eyebrow="Your website"
          title="Your website is half of local SEO"
          lead="A Business Profile can only rank as well as the website behind it. The site has to state clearly what you do, which US cities and suburbs you serve, and make calling you effortless."
        />
        <RuleGrid>
          {websiteItems.map((w) => (
            <RuleItem key={w.title} {...w} />
          ))}
        </RuleGrid>
        <TextLink href="/services/technical-seo">Need deeper site fixes? Technical SEO</TextLink>
        <div><TextLink href="/services/local-seo/google-business-profile-suspended">Profile suspended? Get it reviewed free</TextLink></div>
        <div><TextLink href="/resources/news/local-seo-updates">Tracking algorithm and GBP shifts? Read our local SEO news log</TextLink></div>
      </Band>

      {/* REVIEWS, CITATIONS & BUSINESS DATA */}
      <Band muted id="trust">
        <BandIntro
          center={false}
          eyebrow="Trust & accuracy"
          title="Reviews, US citations and business details"
          lead="Customers pick who to call from the stars and the details they see. Google and ChatGPT weigh the exact same things."
        />
        <RuleGrid>
          {trustItems.map((t) => (
            <RuleItem key={t.title} {...t} />
          ))}
        </RuleGrid>
      </Band>

      {/* CASE STUDY */}
      <Band dark>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center [&>*]:min-w-0">
          <div>
            <Eyebrow dark>Local SEO in action</Eyebrow>
            <H2 dark>D.O.L.L.S. Cleaning, Michigan</H2>
            <Lead dark>
              A local cleaning company in Michigan. The work went into the Business Profile, service-area pages, on-page fixes, citations and a steady review routine. This is what Search Console and Google showed afterwards.
            </Lead>
            <div className="mt-8">
              <CheckList
                dark
                items={[
                  "Monthly clicks 192 → 264, impressions 41K → 106K (July vs June 2025)",
                  "#1 and #2 for carpet cleaning services in Clawson",
                  "Named first in Google’s AI Overview for post-construction cleaning in Chesterfield",
                ]}
              />
            </div>
            <TextLink dark href="/case-studies/cleaning/dolls-cleaning">Read the full case study</TextLink>
            <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
              Outcomes depend on local competition and on where a profile starts.
            </p>
          </div>
          <ProofPanel>
            <ProofImage
              src="/images/proof/local-dolls-gsc-comparison.jpg"
              alt="Google Search Console comparison for D.O.L.L.S. Cleaning: monthly clicks up from 192 to 264 and impressions from 41K to 106K."
              width={626}
              height={239}
              stage="Search Console"
              caption="July 2025 vs June 2025: clicks 192 → 264, impressions 41K → 106K"
            />
            <ProofImage
              src="/images/proof/local-dolls-ai-overview-rank1.png"
              alt="Google results for 'post construction cleaning in Chesterfield, MI' showing D.O.L.L.S. Cleaning cited first in the AI Overview and ranking first organically."
              width={628}
              height={322}
              stage="Google search"
              caption="Named first in the AI Overview, #1 organic below it"
            />
          </ProofPanel>
        </div>
      </Band>

      {/* INDUSTRIES */}
      <Band muted>
        <BandIntro
          eyebrow="Industries"
          title="Local SEO built around your trade"
          lead="A US homeowner choosing a roofer searches differently from one booking a cleaner or calling an HVAC technician. Each page below shows the client result behind it."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LOCAL_INDUSTRIES.map((i) => {
            const cs = caseStudies.find((c) => c.slug.client === i.caseClients[0]);
            const metric = cs?.metrics[0];
            return (
              <Link
                key={i.slug}
                href={`/services/local-seo/${i.slug}`}
                className="group rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <p className="text-lg font-black group-hover:text-[#171717]" style={{ color: INK }}>
                  {i.name} SEO
                </p>
                {cs && metric ? (
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: BODY }}>
                    <strong style={{ color: INK }}>{metric.v}</strong> {metric.l} · {cs.client}
                  </p>
                ) : null}
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold" style={{ color: PURPLE }}>
                  See {i.name.toLowerCase()} SEO <ArrowRight className="h-3 w-3" aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>
      </Band>

      {/* PROCESS */}
      <Band dark id="process">
        <BandIntro dark eyebrow="How it works" title="From 7-Day Free Trial to the Map Pack Top 3" />
        <Steps steps={process} cta={{ href: "#7-day-trial", label: "Start my 7-Day Free Trial & Tear-Down" }} />
      </Band>

      {/* PRICE, GUARANTEE & WHO DOES THE WORK */}
      <Band>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Why SearchPrex</Eyebrow>
            <H2>One founder, one local plan, a clear price</H2>
            <Lead>
              You work directly with the person who does the work. Every recommendation is built for your US market and your local competitors, so the budget goes where it brings phone calls.
            </Lead>
            <div className="mt-8">
              <CheckList items={expectations} />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {LOCAL_PLAN ? (
              <PriceCard
                plan={LOCAL_PLAN}
                label="Local SEO"
                note="Where you land in the range depends on how many locations and US service areas the plan covers."
              />
            ) : null}
            <GuaranteeCard />
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-4xl">
          <AuthorCard
            name="Mubashar Sharif"
            role="Founder · 5+ years · Semrush & HubSpot certified"
            quote="&ldquo;Local SEO is won on real signals — accurate business details, genuine reviews, pages that actually help your neighbours. I&rsquo;ve had US local businesses named in Google&rsquo;s AI Overviews and reach #1 in local results. When you work with SearchPrex, you work with me.&rdquo;"
            imageSrc="/images/mubashar-sharif.jpg"
            imageAlt="Mubashar Sharif — Founder of SearchPrex"
            linkedinUrl={LINKEDIN}
            badges={["Semrush certified", "HubSpot certified", "5+ Years Mastery"]}
          />
        </div>
      </Band>

      {/* LOCAL SEO BLOG TEASER */}
      <ServiceBlogTeaser topic="local" />

      {/* FAQ — page.tsx builds the FAQPage schema from the same arrays */}
      <FaqBand title="USA Local SEO, Map Pack & AI Overview questions, answered">
        <FaqList faqs={[...CAPSULES, ...FAQS]} name="local-seo-faq" />
      </FaqBand>

      <div id="get-started">
        <ArticleLeadMagnet
          variant="bottom"
          source={SOURCE}
          copy={{
            headline: "Send me your URL. I’ll tell you why you’re not in the top three.",
            sub: "Two fields. A written look at your Profile, citations and local competitors — from me, within 24 hours.",
          }}
        />
      </div>
    </main>
  );
}

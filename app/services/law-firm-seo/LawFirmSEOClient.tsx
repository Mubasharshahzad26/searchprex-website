"use client";

// app/services/law-firm-seo/LawFirmSEOClient.tsx
//
// Topical layout (Oct 2026), built from components/ServiceBands like the other
// service pages: bands that alternate dark navy and white, each with one
// heading, a short paragraph and a "what I check" list.
//
// The honesty rule that governs this page (see ./data.ts): SearchPrex has not
// completed a law firm engagement, so no legal result is claimed anywhere.
// Every screenshot here is from another industry and is labelled as such. Law
// firm pages also answer to ABA Model Rule 7.1 on misleading communications —
// no position, no timeline and no "cost per lead goes down" is promised.
//
// Dropped in this layout: the comparison table (it promised "Local map pack top
// 3" and "Cost per qualified lead: Down"), the mid-page guide magnet (the
// checklist is linked from the practice-area band) and WhySearchPrex (folded
// into the price band). Kept: the practice-area tabs, the AI image banner, the
// live intake demo, the "first law firm case study" offer and LawFirmStack.

import Link from "next/link";
import { Scale } from "lucide-react";

import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import ServiceProofStrip from "@/components/ServiceProofStrip";
import ProofImage from "@/components/ProofImage";
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

import { CAPSULES, FAQS, PROBLEMS } from "./data";

const LINKEDIN = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";
const SOURCE = "service:law-firm-seo";
const LAW_PLAN = RETAINER_PLANS.find((p) => p.niche === "Law Firm SEO");

const included = [
  { title: "Practice-area & city pages", body: "A page for each practice and each city you take cases in, written for the questions clients ask before they call.", href: "#practice-areas" },
  { title: "Attorney E-E-A-T", body: "Bar admissions, jurisdictions, real photos and bylines, so Google can verify who stands behind the advice.", href: "#ymyl" },
  { title: "Google Business Profile", body: "The right primary category, practice areas as services, and a review routine that stays inside bar rules.", href: "#profile" },
  { title: "Technical SEO", body: "Speed, indexing, attorney and FAQ schema, and mobile pages that load before a caller gives up.", href: "/services/technical-seo" },
  { title: "Legal authority", body: "Legal directories, bar associations and local mentions that make sense for a firm — no bought link volume.", href: "#profile" },
  { title: "AI answers & Monday reports", body: "Clear answers that AI Overviews and ChatGPT can cite, and a plain-English report on rankings, calls and forms every week.", href: "#ymyl" },
];

const practiceChecks = [
  "One page per practice area, per city you serve",
  "The first paragraph answers what happens next, in plain English",
  "Attorney byline with bar admission year and jurisdictions",
  "Fees, consultations and next steps stated without overpromising",
  "A tappable phone number and a short form above the fold",
  "Nothing that breaks ABA Model Rule 7.1 — no “best”, no guaranteed outcomes",
];

const ymylItems = [
  { title: "Attorney E-E-A-T", body: "Legal content is a Your-Money-Your-Life topic. Credentials, bar admissions and real experience go on every page, with a named author." },
  { title: "AI Overview citations", body: "AI Overviews now answer many legal questions above the results. Clear answers, reviews and schema make your firm the one quoted." },
  { title: "ChatGPT & Perplexity", body: "People ask AI tools who to call. The same clear, verifiable pages make it more likely your firm is named." },
  { title: "People-first content", body: "Every page has to help a prospective client. Thin, keyword-stuffed pages are what Google’s helpful-content systems push down." },
];

const profileChecks = [
  "Primary category matches your main practice, not just “Law firm”",
  "Each practice area listed as a service",
  "Office address, hours and phone identical to your website",
  "Reviews from real clients, asked for in a way bar rules allow",
  "Legal directory listings (Avvo, Justia, state bar) consistent with the Profile",
  "Calls and website clicks from the Profile, tracked every week",
];

const process = [
  { when: "Day 1", title: "Free tear-down", body: "Your URL in, a written look back within 24 hours: your pages, your Profile and the firms outranking you in your city." },
  { when: "Weeks 1–2", title: "Deep audit", body: "Site, competitors and the local legal market, mapped into a plan for your city and practice areas." },
  { when: "Weeks 3–8", title: "Foundation & pages", body: "Technical fixes, attorney and FAQ schema, Business Profile, then practice-area and city pages." },
  { when: "Every Monday", title: "Report", body: "Rankings, calls and form fills — what moved, what did not, and what happens next." },
];

const partnershipPoints = [
  "One firm per city and practice area — I never rank you against another client",
  "The same map pack and AI Overview work behind the results above",
  "The founder does the work, not a junior",
  "Search Console reporting from day one",
  "Built to YMYL and bar-advertising rules at every step",
];

// `guide` is still passed by page.tsx; the checklist is linked from the practice-area band.
export default function LawFirmSEOClient({ guide: _guide }: { guide: Guide }) {
  return (
    <main>
      <ServiceHero
        crumb="Law Firm SEO"
        above={
          <div className="mt-4 overflow-x-auto border-y bg-slate-50" style={{ borderColor: "#e5e7eb" }}>
            <nav className="mx-auto flex max-w-6xl space-x-6 px-4 py-3 text-sm font-medium sm:px-6 lg:px-8" aria-label="Practice areas">
              <span className="whitespace-nowrap font-bold text-[#534AB7]">Overview</span>
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
        eyebrow="Law firm SEO services"
        title="Law Firm SEO Services"
        accent="that bring in signed cases"
        subtitle="Every click on Google Ads is paid for, every month. Practice-area and city pages keep bringing in cases after you stop paying. I build them to legal YMYL standards."
        primary={{ href: "#approach", label: "See how it works" }}
        secondary={{ href: "#intake-demo", label: "Try the intake demo" }}
        trustPoints={["One firm per city", "The founder does the work", "90-day money-back guarantee"]}
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

      {/* THE PROBLEM */}
      <Band>
        <BandIntro
          center={false}
          eyebrow="The problem"
          title="Why good firms lose the search to worse ones"
          lead="Four things you can check yourself today. Each one is costing you consultations if it fails."
        />
        <RealityBanner
          src="/images/audiences/lawyer-ppc-fatigue.webp"
          alt="Attorney at law firm reviewing expensive Google Ads PPC campaign spend and zero retained cases late at night"
          tag="The Reality · PPC Budget Burnout"
          quote="“Another $150 click that turned into a price-shopper who hung up in 30 seconds.”"
          body="Every click on Google Ads is paid for, every single month. When you pause the campaign, the inquiries stop immediately. Practice-area and city pages keep bringing qualified consultations long after the work is done."
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
          title="What a complete law firm SEO plan covers"
          lead="Legal search is judged harder than most. Every part of the plan is built around trust a client — and Google — can verify."
        />
        <RuleGrid>
          {included.map((i) => (
            <RuleItem key={i.title} dark {...i} />
          ))}
        </RuleGrid>
      </Band>

      {/* PRACTICE AREAS */}
      <Band id="practice-areas">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Practice-area pages</Eyebrow>
            <H2>One page for every case you want, in every city you serve</H2>
            <Lead>
              A single “practice areas” page cannot win “car accident lawyer Detroit” and “divorce attorney Tempe” at the same time. Each search needs its own page, written for the person typing it.
            </Lead>
            <div className="mt-8 flex flex-wrap gap-2">
              {INDUSTRY_PAGES.map((ind) => (
                <Link
                  key={ind.slug}
                  href={`/services/law-firm-seo/${ind.slug}`}
                  className="rounded-full border border-[#d9d6f3] px-4 py-2 text-sm font-bold text-[#0a0f2e] transition hover:border-[#534AB7] hover:text-[#534AB7]"
                >
                  {ind.name} SEO
                </Link>
              ))}
            </div>
            <TextLink href="/resources/law-firm-seo-audit-checklist">Run the 40-check audit yourself — free, no email</TextLink>
            <p className="mt-3 text-sm" style={{ color: "#5b6472" }}>
              Planning new pages?{" "}
              <Link href="/blog/keyword-research-for-law-firms" className="font-semibold underline" style={{ color: "#534AB7" }}>
                Keyword research for law firms
              </Link>
            </p>
          </div>
          <CheckPanel title="What every page needs" items={practiceChecks} />
        </div>
      </Band>

      {/* YMYL & AI ANSWERS */}
      <Band dark id="ymyl">
        <BandIntro
          dark
          eyebrow="Trust & AI answers"
          title="Legal SEO built for the AI answer era"
          lead="Google holds legal topics to its highest trust bar, and AI Overviews now answer legal questions directly. This is how your firm stays visible wherever clients look."
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
            <Eyebrow>Google Business Profile & local pack</Eyebrow>
            <H2>Win the map pack for “lawyer near me”</H2>
            <Lead>
              For local legal searches, the map pack sits above the normal results. The firms in it usually have the right primary category, a steady stream of genuine reviews and details that match their website exactly.
            </Lead>
            <Lead>I compare your Profile with the three firms above you, so every change has a reason behind it.</Lead>
          </div>
          <CheckPanel items={profileChecks} />
        </div>
      </Band>

      {/* PROCESS */}
      <Band dark id="approach">
        <BandIntro dark eyebrow="How it works" title="From free tear-down to more consultations" />
        <Steps steps={process} cta={{ href: "#get-started", label: "Get my free law firm tear-down" }} />
      </Band>

      {/* LIVE INTAKE DEMO */}
      <Band muted id="intake-demo">
        <BandIntro
          eyebrow="Live demo · AI intake assistant"
          title="Getting found is half the battle. Capturing every lead is the other half."
          lead="A 2 a.m. call that goes to voicemail is a case lost. Play a potential client below and watch a 24/7 intake assistant qualify the lead in seconds."
        />
        <div className="mx-auto mt-10 max-w-4xl">
          <IntakeAssistant embedded />
        </div>
      </Band>

      {/* FIRST LAW FIRM CASE STUDY */}
      <Band dark>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center [&>*]:min-w-0">
          <div>
            <Eyebrow dark>Selective law firm partnerships</Eyebrow>
            <H2 dark>Be my first law firm case study</H2>
            <Lead dark>
              I have results in local, ecommerce and technical SEO — including local service businesses named in Google’s AI Overviews. I am now bringing the same method to law firms, one firm per city.
            </Lead>
            <div className="mt-8">
              <CheckList dark items={partnershipPoints} />
            </div>
            <div className="mt-8">
              <WhiteButton href="#get-started">Claim a free law firm tear-down</WhiteButton>
            </div>
            <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
              No obligation · reply within 24 hours · written by the founder
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
            <H2>One firm per city, one person doing the work</H2>
            <Lead>
              You work with the person who builds your pages. Every recommendation is made for your city, your practice areas and the firms you compete with.
            </Lead>
            <div className="mt-8">
              <CheckList
                items={[
                  "Market exclusivity: one firm per city and practice area",
                  "A written plan before you pay anything",
                  "Built to YMYL and bar-advertising rules",
                  "A plain-English report every Monday",
                  "Month to month, no long contract",
                ]}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {LAW_PLAN ? (
              <PriceCard
                plan={LAW_PLAN}
                label="Law firm SEO"
                note="Where a firm lands in the range depends on the number of practice areas and cities. Month to month; one firm per city and practice area."
              />
            ) : null}
            <GuaranteeCard />
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-4xl">
          <AuthorCard
            name="Mubashar Sharif"
            role="Founder · 5+ years · Semrush & HubSpot certified"
            quote="&ldquo;Law firm SEO is won on trust — real attorney credentials, genuine reviews, and content built to Google&rsquo;s YMYL standards. I&rsquo;ve taken local service businesses to #1 in Google&rsquo;s local results and into its AI Overviews, and I bring that same method to every firm I work with.&rdquo;"
            imageSrc="/images/mubashar-sharif.jpg"
            imageAlt="Mubashar Sharif — Founder of SearchPrex"
            linkedinUrl={LINKEDIN}
            badges={["Semrush certified", "HubSpot certified"]}
          />
        </div>
      </Band>

      {/* MARKETS — the /locations pages name this page as their parent */}
      <MarketsBand
        title="Law firm SEO in the cities I already cover"
        lead="Each city page covers that market’s legal searches and competition. Not on the list? The tear-down works for any US city."
      />

      {/* FAQ — page.tsx builds the FAQPage schema from the same arrays */}
      <FaqBand title="Law firm SEO questions, answered">
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
            sub: "Two fields. A written look at your pages, Business Profile and the firms outranking you in your city — from me, within 24 hours.",
          }}
        />
      </div>
    </main>
  );
}

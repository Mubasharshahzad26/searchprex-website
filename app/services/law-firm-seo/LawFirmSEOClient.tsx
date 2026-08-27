"use client";

// app/services/law-firm-seo/LawFirmSEOClient.tsx
// PILOT PAGE for the unified design system.
//
// Every section here is assembled from components/layout primitives. The page
// no longer declares a single colour of its own — the old local theme block
// (ACCENT #ff642d, INK #0f0f0f, MUTED #6b7280, BG_SOFT #fafafa) is gone, and
// with it the reason this page looked like a different website from /pricing.
//
// Copy is unchanged from the previous version. Content revisions are a separate,
// separately-approved pass.

import Link from "next/link";
import { ArrowRight, Check, MapPin, Phone, Scale, BadgeCheck } from "lucide-react";
import IntakeAssistant from "@/app/components/intake-assistant/intake-assistant";
import {
  AuthorCard,
  CardGrid,
  ComparisonTable,
  CtaBand,
  CtaButton,
  FaqList,
  FeatureCard,
  PageHero,
  Section,
  SectionHeading,
  StatStrip,
  Accent,
  type ComparisonRow,
  type Faq,
} from "@/components/layout";
import { color, heading, radius, text } from "@/lib/design-tokens";
import { CITY_PAGES } from "@/lib/city-pages";
import LawFirmStack from "@/components/LawFirmStack";
import { INDUSTRY_PAGES } from "@/lib/industry-pages";

const LINKEDIN = "https://www.linkedin.com/in/mubashar-shahzad-seo/";

/* ─── DATA ─── */

const heroIncludes = [
  "Rank #1 for your city's practice-area keywords",
  "Dominate the Google Maps local pack",
  "Get cited in Google AI Overviews & ChatGPT",
  "Attorney E-E-A-T content (YMYL compliant)",
  "Replace expensive Google Ads with organic leads",
];

const proofStats = [
  { value: "5+", label: "Years SEO experience" },
  { value: "20+", label: "Businesses served" },
  { value: "60d", label: "Median time to top 3" },
  { value: "24hr", label: "Audit turnaround" },
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

const faqs: Faq[] = [
  { q: "How long before I see results?", a: "Most law firms see ranking improvements in 30–60 days. First-page and local pack rankings typically follow in 60–90 days, depending on city and practice area competition." },
  { q: "Do you work with all practice areas?", a: "Yes — family law, personal injury, criminal defense, estate planning, immigration, employment law, and more. Every strategy is tailored to your specific practice and city." },
  { q: "What is GEO / AIO / LLMs optimization?", a: "It's optimizing so your firm gets cited in AI answers — Google AI Overviews, ChatGPT, Perplexity, and Gemini. As more clients research lawyers through AI, this is becoming as important as ranking #1." },
  { q: "Are you compliant with Google's 2026 core updates?", a: "Completely. Legal content is YMYL, so we build every page around E-E-A-T — attorney credentials, real experience, authoritative sourcing, and people-first content that survives every core update." },
  { q: "Can I keep running Google Ads?", a: "You can, but our goal is to replace that spend with free organic traffic. Most clients significantly reduce ad spend within months as organic leads grow." },
  { q: "Is there a contract?", a: "No long-term contracts. We earn your business every month with results — more qualified consultations, more local visibility, more cases." },
];

const partnershipPoints = [
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
        seoH1="Law Firm SEO Services | Rank in Local Pack & AI Overviews"
        eyebrow="Law Firm SEO"
        title={
          <>
            Get more cases from
            <br />
            <Accent>Google in 2026.</Accent>
          </>
        }
        subtitle="While you pay $80 per click on Google Ads, competitors get free organic traffic. We help law firms rank #1 in their city and get cited in Google's 2026 AI Overviews — so qualified clients call you first."
        primaryCta={{
          href: "/free-audit",
          label: "Claim free law firm audit",
          icon: <ArrowRight className="h-4 w-4" aria-hidden />,
        }}
        secondaryCta={{ href: "#approach", label: "See our approach" }}
        trustPoints={["No contracts", "Results in 60–90 days", "Founder works your account"]}
        aside={<HeroChecklist />}
      />

      <StatStrip stats={proofStats} />

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
      <Section tone="surface" width="narrow">
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

      {/* CITY PAGES ──
          The city pages name this page as their breadcrumb parent, so the link
          should run both ways. It is also the honest answer to the question this
          page raises: local search is decided city by city, and a national page
          cannot rank for "law firm seo detroit" no matter how well it is written. */}
      <Section>
        <SectionHeading
          eyebrow="By city"
          title="Where does your firm practise?"
          intro="Every local market has its own competition, its own courts, and its own state law shaping what your pages need to say. These are the cities we have built for."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CITY_PAGES.map((c) => (
            <Link
              key={`${c.stateSlug}-${c.citySlug}`}
              href={`/locations/${c.stateSlug}/${c.citySlug}`}
              className={`flex items-start gap-3 ${radius.card} border bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-md`}
              style={{ borderColor: color.border }}
            >
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0"
                style={{ color: color.primary }}
                aria-hidden
              />
              <span>
                <span className="block font-semibold" style={{ color: color.ink }}>
                  {c.city}, {c.stateAbbr}
                </span>
                <span className={text.caption} style={{ color: color.muted }}>
                  {c.county}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* AUTHOR — E-E-A-T */}
      <Section width="narrow" tight>
        <AuthorCard
          name="Mubashar Shahzad"
          role="Founder & Lead SEO Strategist · 5+ years"
          quote="&ldquo;Law firm SEO is won on trust — real attorney credentials, genuine reviews, and content built to Google's YMYL E-E-A-T standards. I've taken local service businesses to the top 3 map pack and Google AI Overview placements, and I bring that exact methodology to every firm I work with.&rdquo;"
          imageSrc="/images/mubashar-shahzad.jpg"
          imageAlt="Mubashar Shahzad — Founder & Lead SEO Strategist"
          linkedinUrl={LINKEDIN}
        />
      </Section>

      {/* FAQ */}
      <Section tone="surface" width="reading">
        <SectionHeading eyebrow="FAQ" title="Law firm SEO questions, answered" />
        <FaqList faqs={faqs} name="law-firm-seo-faq" />
      </Section>

      {/* ── THE COMPLETE STACK (SearchPrex x Codeloci) ──
          Moved here from the homepage. The partnership is relevant to exactly
          one of the three homepage personas, and it linked visitors off-site
          to codeloci.com from the middle of the funnel. On this page the
          audience is already law firms and the outbound link is a genuine
          next step rather than a leak. */}
      <LawFirmStack />

      <CtaBand
        eyebrow="Ready to get more cases?"
        title={
          <>
            Stop paying per click.
            <br />
            Start owning your market.
          </>
        }
        body="Free law firm SEO audit — the founder personally reviews your site, local rankings, and AI search visibility, and delivers a 90-day growth roadmap within 24 hours."
        actions={[
          {
            href: "/free-audit",
            label: "Claim free law firm audit",
            icon: <ArrowRight className="h-4 w-4" aria-hidden />,
          },
          {
            href: "tel:+923106526316",
            label: "+92 310 652 6316",
            variant: "onDark",
            icon: <Phone className="h-4 w-4" aria-hidden />,
          },
        ]}
        trustPoints={["24hr turnaround", "No contracts", "Founder does the audit"]}
      />
    </main>
    </>
  );
}

/* ─── Hero aside ─── */

function HeroChecklist() {
  return (
    <div className={`${radius.card} border bg-white`} style={{ borderColor: color.border }}>
      <div
        className="flex items-center justify-between border-b px-5 py-3"
        style={{ borderColor: color.border }}
      >
        <span className="flex items-center gap-2">
          <Scale className="h-3.5 w-3.5" style={{ color: color.primary }} aria-hidden />
          <span className={heading.eyebrow} style={{ color: color.ink }}>
            Built for law firms
          </span>
        </span>
        <span className={text.caption} style={{ color: color.muted }}>
          2026 aligned
        </span>
      </div>

      <ul className="space-y-3.5 p-6">
        {heroIncludes.map((t) => (
          <li key={t} className="flex items-start gap-3">
            <span
              className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
              style={{ background: color.primary }}
              aria-hidden
            >
              <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
            </span>
            <span className={text.small} style={{ color: color.ink }}>
              {t}
            </span>
          </li>
        ))}
      </ul>

      <div
        className={`${text.caption} border-t px-5 py-3`}
        style={{ borderColor: color.border, color: color.muted }}
      >
        YMYL E-E-A-T · GEO · AIO · LLMs
      </div>
    </div>
  );
}

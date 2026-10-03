"use client";

// app/services/local-seo/[industry]/IndustryClient.tsx
//
// One local SEO page per trade, on the same topical band layout as
// /services/local-seo (components/ServiceBands). Copy lives in
// lib/local-industries.ts; every figure on the page is read from the case
// studies (app/case-studies/data.ts) and every screenshot from their write-ups
// (app/case-studies/details.ts), so a number here can never drift from the
// case study it came from.
//
// Dropped in this layout: the stat strip, the mid-page guide magnet and
// WhySearchPrex. Quick answers are merged into the FAQ; page.tsx already builds
// the FAQPage schema from both arrays.

import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import type { Guide } from "@/lib/guides";
import ProofImage from "@/components/ProofImage";
import ServiceProofStrip from "@/components/ServiceProofStrip";
import { RETAINER_PLANS } from "@/lib/pricing";
import { LOCAL_INDUSTRIES, getLocalIndustry } from "@/lib/local-industries";
import { caseStudies, detailUrl } from "@/app/case-studies/data";
import { CASE_DETAILS, EXTRA_PROOF } from "@/app/case-studies/details";
import { AuthorCard, FaqList } from "@/components/layout";
import {
  BODY,
  INK,
  PURPLE,
  Band,
  BandIntro,
  CheckList,
  Eyebrow,
  FaqBand,
  GuaranteeCard,
  H2,
  Lead,
  PriceCard,
  RuleGrid,
  RuleItem,
  ServiceHero,
  Steps,
} from "@/components/ServiceBands";

const LINKEDIN = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";
const LOCAL_PLAN = RETAINER_PLANS.find((p) => p.niche === "Local SEO");
const MAX_PROOF = 4;

const process = [
  { when: "Day 1", title: "Free tear-down", body: "Your URL in, a written diagnosis back within 24 hours: your Profile, your pages and the three competitors above you." },
  { when: "Weeks 1–4", title: "Profile & citations", body: "Business Profile rebuilt, business details made consistent everywhere they appear." },
  { when: "Weeks 5–8", title: "Pages & reviews", body: "A page for each service and area, with the review routine running alongside." },
  { when: "Every Monday", title: "Report", body: "Map pack positions, calls, what changed last week and what happens this week." },
];

// `guide` is still passed by page.tsx; the checklist is linked from the related band.
export default function IndustryClient({ slug, guide: _guide }: { slug: string; guide: Guide }) {
  const industry = getLocalIndustry(slug);
  if (!industry) return null;

  // Mid-sentence trade name: "roofing", "home services" — but "HVAC" stays capitalised.
  const trade = /^[A-Z]{2,}$/.test(industry.name) ? industry.name : industry.name.toLowerCase();
  const source = `service:local-seo/${industry.slug}`;
  const cases = industry.caseClients
    .map((client) => caseStudies.find((c) => c.slug.client === client))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);

  const proof = cases
    .flatMap((cs) =>
      (CASE_DETAILS[cs.slug.client]?.proof ?? EXTRA_PROOF[cs.slug.client] ?? []).map((shot) => ({
        ...shot,
        href: detailUrl(cs),
      })),
    )
    .slice(0, MAX_PROOF);
  // The first two captures go under the hero; any others sit with the results.
  const stripShots = proof.slice(0, 2);
  const moreShots = proof.slice(2);

  const otherTrades = LOCAL_INDUSTRIES.filter((i) => i.slug !== industry.slug);

  return (
    <main>
      <ServiceHero
        crumb={industry.name}
        parent={{ label: "Local SEO", href: "/services/local-seo" }}
        above={
          <nav aria-label="Local SEO by industry" className="mt-4 overflow-x-auto border-y bg-slate-50" style={{ borderColor: "#e5e7eb" }}>
            <div className="mx-auto flex max-w-6xl gap-6 px-4 py-3 text-sm font-medium sm:px-6 lg:px-8">
              <Link href="/services/local-seo" className="whitespace-nowrap text-slate-500 hover:text-slate-900">
                All local SEO
              </Link>
              {LOCAL_INDUSTRIES.map((i) =>
                i.slug === industry.slug ? (
                  <span key={i.slug} aria-current="page" className="whitespace-nowrap font-bold text-[#534AB7]">
                    {i.name}
                  </span>
                ) : (
                  <Link key={i.slug} href={`/services/local-seo/${i.slug}`} className="whitespace-nowrap text-slate-500 hover:text-slate-900">
                    {i.name}
                  </Link>
                ),
              )}
            </div>
          </nav>
        }
        eyebrow={`Local SEO · ${industry.name}`}
        title={industry.h1}
        accent={industry.accent}
        subtitle={industry.heroSub}
        primary={{ href: "#proof", label: `See the ${trade} results` }}
        secondary={{ href: "#process", label: "How it works" }}
        trustPoints={["The founder does the work", "90-day money-back guarantee", "Month to month"]}
        aside={
          <ArticleLeadMagnet
            variant="sidebar"
            source={source}
            copy={{
              headline: `Free ${trade} tear-down`,
              sub: "Send your URL. I’ll check your Business Profile, your pages and the three competitors above you — and tell you what to fix first, within 24 hours.",
            }}
          />
        }
      />

      {stripShots.length ? (
        <ServiceProofStrip
          id="proof"
          title={`${industry.name} results, straight from Google`}
          moreHref={cases[0] ? detailUrl(cases[0]) : "/case-studies"}
          moreLabel="Read the case study"
          shots={stripShots.map(({ href: _href, ...shot }) => shot)}
        />
      ) : null}

      {/* THE PROBLEM */}
      <Band>
        <BandIntro
          center={false}
          eyebrow="The problem"
          title={`Why ${trade} businesses lose the call`}
          lead="Four things you can check yourself in the next ten minutes. If any of them fails, it is costing you jobs."
        />
        <RuleGrid columns={2}>
          {industry.problems.map((p) => (
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
          title={`What ${trade} SEO covers`}
          lead={`Built around how people actually search for ${trade} — not a generic local package with the trade name swapped in.`}
        />
        <RuleGrid>
          {industry.included.map((s) => (
            <RuleItem key={s.title} dark title={s.title} body={s.body} />
          ))}
        </RuleGrid>
      </Band>

      {/* RESULTS */}
      {cases.length ? (
        <Band muted id={stripShots.length ? undefined : "proof"}>
          <BandIntro
            eyebrow="Results"
            title={`${industry.name} SEO in action`}
            lead="Real clients, real searches. Every number below is on the case study it links to."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {cases.map((cs) => (
              <Link
                key={cs.slug.client}
                href={detailUrl(cs)}
                className="group rounded-2xl bg-white p-7 shadow-sm transition hover:shadow-md md:col-span-2"
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: PURPLE }}>
                  {cs.client} · {cs.location}
                </p>
                <p className="mt-2 text-xl font-black group-hover:text-[#534AB7]" style={{ color: INK }}>{cs.headline}</p>
                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {cs.metrics.slice(0, 3).map((m) => (
                    <div key={m.l} className="border-t-2 pt-3" style={{ borderColor: "#d9d6f3" }}>
                      <p className="text-2xl font-black" style={{ color: INK }}>{m.v}</p>
                      <p className="text-xs" style={{ color: BODY }}>{m.l}</p>
                    </div>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold" style={{ color: PURPLE }}>
                  Read the case study <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
          {moreShots.length ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 [&>*]:min-w-0">
              {moreShots.map(({ href: _href, ...shot }) => (
                <ProofImage key={shot.src} {...shot} frameAspect="16 / 9" />
              ))}
            </div>
          ) : null}
          <p className="mt-6 text-center text-xs" style={{ color: BODY }}>
            Outcomes depend on local competition and on where a profile starts.
          </p>
        </Band>
      ) : null}

      {/* PROCESS */}
      <Band dark id="process">
        <BandIntro dark eyebrow="How it works" title="From free tear-down to the map pack" />
        <Steps steps={process} cta={{ href: "#get-started", label: `Get my free ${trade} tear-down` }} />
      </Band>

      {/* PRICE, GUARANTEE & WHO DOES THE WORK */}
      <Band>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Why SearchPrex</Eyebrow>
            <H2>One person, one plan, a clear price</H2>
            <Lead>
              You work with the person who does the work. Every recommendation is built for your trade, your area and the businesses above you in the map pack.
            </Lead>
            <div className="mt-8">
              <CheckList
                items={[
                  "The founder does the work — no account managers in between",
                  "A written plan before you pay anything",
                  "Priorities ranked by what brings calls, not busywork",
                  "A plain-English report every Monday",
                  "Month to month, no long contract",
                ]}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {LOCAL_PLAN ? (
              <PriceCard
                plan={LOCAL_PLAN}
                label={`${industry.name} SEO`}
                note="Where you land in the range depends on how many locations and service areas the plan covers."
              />
            ) : null}
            <GuaranteeCard />
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-4xl">
          <AuthorCard
            name="Mubashar Sharif"
            role="Founder · 5+ years · Semrush & HubSpot certified"
            quote="&ldquo;Every trade is searched differently. A roof is researched for weeks; a broken AC is fixed by whoever answers first. I build the pages and the profile around that — and when you work with SearchPrex, you work with me.&rdquo;"
            imageSrc="/images/mubashar-sharif.jpg"
            imageAlt="Mubashar Sharif — Founder of SearchPrex"
            linkedinUrl={LINKEDIN}
            badges={["Semrush certified", "HubSpot certified"]}
          />
        </div>
      </Band>

      {/* RELATED */}
      <Band dark>
        <BandIntro dark eyebrow="Keep reading" title="More on local SEO" />
        <RuleGrid>
          <RuleItem dark href="/services/local-seo" title="Local SEO services" body="The full local approach: Business Profile, citations, service-area pages and reviews." />
          <RuleItem dark href="/resources/google-business-profile-checklist" title="Google Business Profile checklist" body="23 checks, written to Google's own rules. Free, no email." />
          <RuleItem dark href="/case-studies" title="All case studies" body="Every client result, with the screenshots." />
        </RuleGrid>
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {otherTrades.map((i) => (
            <Link
              key={i.slug}
              href={`/services/local-seo/${i.slug}`}
              className="rounded-full border px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10"
              style={{ borderColor: "rgba(185,179,245,0.45)" }}
            >
              {i.name} SEO
            </Link>
          ))}
        </div>
      </Band>

      {/* FAQ — page.tsx builds the FAQPage schema from the same arrays */}
      <FaqBand title={`${industry.name} SEO questions, answered`}>
        <FaqList faqs={[...industry.capsules, ...industry.faqs]} name={`local-seo-${industry.slug}-faq`} />
      </FaqBand>

      <div id="get-started">
        <ArticleLeadMagnet
          variant="bottom"
          source={source}
          copy={{
            headline: `Send me your URL. I’ll tell you why your ${trade} business isn’t in the top three.`,
            sub: "Two fields. A written look at your Profile, pages and competitors — from me, within 24 hours.",
          }}
        />
      </div>
    </main>
  );
}

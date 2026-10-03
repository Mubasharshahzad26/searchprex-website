"use client";

// app/services/local-seo/google-business-profile-optimization/GbpClient.tsx
//
// The first hub-and-spoke service page: Google Business Profile optimization,
// a spoke of /services/local-seo. Built on components/ServiceBands like the
// pillar pages. Copy and FAQ live in ./data.ts (page.tsx builds the schema
// from the same arrays).
//
// Competitor pages for "google business profile optimization service"
// (checked 3 Oct 2026) prove themselves with testimonials and review counts;
// none shows a client's own results or says who the work is set up for. This
// page leads with labelled screenshots, a map of where the work has run, the
// price and the guarantee.

import Link from "next/link";
import { MapPin } from "lucide-react";

import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import ProofImage from "@/components/ProofImage";
import ServiceProofStrip from "@/components/ServiceProofStrip";
import TrustStrap from "@/components/TrustStrap";
import UsTileMap, { type MapClient } from "@/components/UsTileMap";
import { RETAINER_PLANS } from "@/lib/pricing";
import { LOCAL_INDUSTRIES } from "@/lib/local-industries";
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
  PriceCard,
  ProofPanel,
  RuleGrid,
  RuleItem,
  ServiceHero,
  Steps,
  TextLink,
} from "@/components/ServiceBands";

import { BUSINESS_TYPES, CAPSULES, CHECKS, FAQS, INCLUDED, META, PROBLEMS } from "./data";

const LINKEDIN = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";
const SOURCE = "service:local-seo/google-business-profile-optimization";
const LOCAL_PLAN = RETAINER_PLANS.find((p) => p.niche === "Local SEO");

/** Only states with a published case study; every result is in its screenshot. */
const MAP_CLIENTS: MapClient[] = [
  {
    state: "MI",
    name: "D.O.L.L.S. Cleaning",
    place: "Clawson & Chesterfield, Michigan",
    result: "#1 and #2 for carpet cleaning in Clawson, and named first in Google’s AI Overview for post-construction cleaning.",
    href: "/case-studies/cleaning/dolls-cleaning",
  },
  {
    state: "CA",
    name: "HVAC Services Team",
    place: "Simi Valley, California",
    result: "Named in Google’s AI Overview for a free-estimate AC installation search.",
    href: "/case-studies/hvac/local-hvac-services",
  },
  {
    state: "TX",
    name: "Mammoth Roofing",
    place: "Texas",
    result: "Google impressions 16.9K → 45.2K over 28 days, and #6 for “Copper Roofing Company in Texas”.",
    href: "/case-studies/roofing/mammoth-roofing",
  },
];

const PROCESS = [
  { when: "Day 1", title: "Free profile tear-down", body: "Your profile and website in, a written diagnosis back within 24 hours: categories, services, reviews and the three businesses above you." },
  { when: "Week 1", title: "Profile fixed", body: "Categories, services, hours, service areas and attributes set to Google’s rules; photos added." },
  { when: "Weeks 2–4", title: "Website & citations aligned", body: "Your site and the main directories made to agree with the profile; the review routine running." },
  { when: "Every Monday", title: "Report", body: "Calls, direction requests and website clicks from the Performance report — what moved and what is next." },
];

const RELATED = [
  { href: "/blog/get-more-calls-from-google-business-profile", title: "Get more calls from your Business Profile", body: "Why views don’t turn into calls, and the fixes that change it." },
  { href: "/blog/google-business-profile-suspended", title: "Google Business Profile suspended?", body: "The usual causes, and how to get reinstated." },
  { href: "/blog/google-maps-ranking-drop", title: "Why your Google Maps ranking dropped", body: "Check the profile before blaming an algorithm." },
  { href: "/resources/google-business-profile-checklist", title: "Free GBP checklist", body: "23 checks written to Google’s own rules. No email." },
];

export default function GbpClient() {
  return (
    <main>
      <ServiceHero
        crumb="Google Business Profile"
        parent={{ label: "Local SEO", href: "/services/local-seo" }}
        eyebrow="Google Business Profile optimization"
        title={META.h1}
        accent={META.accent}
        subtitle="For “near me” searches, the map pack sits above the normal results, and many customers call straight from it. I set up and manage your Business Profile so it shows for the searches that bring jobs — and keep it safe from bad edits and suspensions."
        primary={{ href: "#proof", label: "See client results" }}
        secondary={{ href: "#checks", label: "What I check" }}
        trustPoints={["The founder does the work", "90-day money-back guarantee", "Month to month"]}
        aside={
          <ArticleLeadMagnet
            variant="sidebar"
            source={SOURCE}
            copy={{
              headline: "Free Business Profile tear-down",
              sub: "Send your website. I’ll check your profile’s categories, services and reviews against the three businesses above you — and tell you what to fix first, within 24 hours.",
            }}
          />
        }
      />

      <ServiceProofStrip
        id="proof"
        title="Local results from Business Profile and website work"
        moreHref="/case-studies/cleaning/dolls-cleaning"
        moreLabel="Read the D.O.L.L.S. Cleaning case study"
        shots={[
          {
            src: "/images/proof/local-dolls-rank-1-and-2.png",
            alt: "Google results for 'carpet cleaning services in Clawson, MI' with D.O.L.L.S. Cleaning in the first and second positions.",
            width: 627,
            height: 338,
            figure: "#1 & #2",
            figureLabel: "Carpet cleaning in Clawson, Michigan (organic)",
            caption: "D.O.L.L.S. Cleaning — two pages in the top two organic results for the same search.",
          },
          {
            src: "/images/proof/local-hvac-ai-overview.png",
            alt: "Google AI Overview for 'free cost estimation for ac installation in simi valley california' citing HVAC Services Team by name.",
            width: 717,
            height: 292,
            caption: "HVAC Services Team, Simi Valley, California — named inside Google’s AI Overview.",
          },
        ]}
        footnote="Google ranks the map pack and the organic results separately. These captures show organic and AI Overview results from work that included each client’s Business Profile, and are labelled as such."
      />

      <TrustStrap />

      {/* THE PROBLEM */}
      <Band>
        <BandIntro
          center={false}
          eyebrow="The problem"
          title="Why your Business Profile isn’t bringing calls"
          lead="Six things you can check on your own profile today. Each one that fails is costing you calls — and some put the profile at risk."
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
          title="What Google Business Profile optimization covers"
          lead="Every change follows Google’s own guidelines. Nothing that wins a week and risks a suspension."
        />
        <RuleGrid>
          {INCLUDED.map((i) => (
            <RuleItem key={i.title} dark title={i.title} body={i.body} />
          ))}
        </RuleGrid>
      </Band>

      {/* WHAT I CHECK */}
      <Band id="checks">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>The audit</Eyebrow>
            <H2>I compare your profile with the three businesses above you</H2>
            <Lead>
              Google says local results are “mainly based on relevance, distance, and popularity.” You can’t move your address, so the work goes into the two you can change: how well your profile matches the search, and how well known your business looks.
            </Lead>
            <Lead>Every recommendation comes from your own market, not a generic checklist.</Lead>
            <TextLink href="/resources/google-business-profile-checklist">Run the free 23-point checklist yourself</TextLink>
          </div>
          <CheckPanel items={CHECKS} />
        </div>
      </Band>

      {/* WHO IT'S FOR */}
      <Band muted>
        <BandIntro
          eyebrow="Who it’s for"
          title="Set up for how your customers find you"
          lead="A plumber who drives to the customer and a clinic the customer drives to need their profiles configured differently."
        />
        <RuleGrid>
          {BUSINESS_TYPES.map((b) => (
            <RuleItem key={b.title} title={b.title} body={b.body} href={b.href} />
          ))}
        </RuleGrid>
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {LOCAL_INDUSTRIES.map((i) => (
            <Link
              key={i.slug}
              href={`/services/local-seo/${i.slug}`}
              className="rounded-full border border-[#d9d6f3] bg-white px-4 py-2 text-sm font-bold text-[#0a0f2e] transition hover:border-[#534AB7] hover:text-[#534AB7]"
            >
              {i.name} SEO
            </Link>
          ))}
        </div>
      </Band>

      {/* CASE STUDY */}
      <Band dark>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center [&>*]:min-w-0">
          <div>
            <Eyebrow dark>Business Profile work in action</Eyebrow>
            <H2 dark>D.O.L.L.S. Cleaning, Michigan</H2>
            <Lead dark>
              A cleaning company serving Clawson and Chesterfield. The Business Profile was fully optimized, service-area pages built, citations cleaned up and a steady review routine set up. This is what Google and Search Console showed afterwards.
            </Lead>
            <div className="mt-8">
              <CheckList
                dark
                items={[
                  "#1 and #2 for carpet cleaning services in Clawson",
                  "Named first in Google’s AI Overview for post-construction cleaning in Chesterfield",
                  "Monthly clicks 192 → 264, impressions 41K → 106K (June → July 2025)",
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
              src="/images/proof/local-dolls-ai-overview-rank1.png"
              alt="Google results for 'post construction cleaning in Chesterfield, MI' showing D.O.L.L.S. Cleaning cited first in the AI Overview and ranking first organically."
              width={628}
              height={322}
              stage="Google search"
              caption="Named first in the AI Overview, #1 organic below it"
            />
            <ProofImage
              src="/images/proof/local-dolls-gsc-comparison.jpg"
              alt="Google Search Console comparison for D.O.L.L.S. Cleaning: monthly clicks up from 192 to 264 and impressions from 41K to 106K."
              width={626}
              height={239}
              stage="Search Console"
              caption="July 2025 vs June 2025: clicks 192 → 264, impressions 41K → 106K"
            />
          </ProofPanel>
        </div>
      </Band>

      {/* MAP */}
      <Band>
        <BandIntro
          eyebrow="Where this work has run"
          title="Local clients across the United States"
          lead="Highlighted states are where a published case study is set. The work is done remotely, so your state doesn’t need to be on the map."
        />
        <div className="mt-12">
          <UsTileMap clients={MAP_CLIENTS} />
        </div>
      </Band>

      {/* PROCESS */}
      <Band dark id="process">
        <BandIntro dark eyebrow="How it works" title="From free tear-down to a profile that brings calls" />
        <Steps steps={PROCESS} cta={{ href: "#get-started", label: "Get my free profile tear-down" }} />
      </Band>

      {/* WHY SEARCHPREX */}
      <Band>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Why choose SearchPrex</Eyebrow>
            <H2>One person, your profile, a clear price</H2>
            <Lead>
              You work with the person who edits your profile — not an account manager passing notes to a junior. Every change is explained, and you keep full ownership of the profile.
            </Lead>
            <div className="mt-8">
              <CheckList
                items={[
                  "The founder does the work, start to finish",
                  "Only changes Google’s guidelines allow — your profile is never put at risk",
                  "You stay the owner of your profile; I work as a manager",
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
                label="Business Profile + local SEO"
                note="Business Profile work is part of the local SEO plan. Where you land in the range depends on how many locations and service areas it covers."
              />
            ) : null}
            <GuaranteeCard />
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-4xl">
          <AuthorCard
            name="Mubashar Sharif"
            role="Founder · 5+ years · Semrush & HubSpot certified"
            quote="&ldquo;A Business Profile is often the first thing a local customer sees, and the place they call from. I set it up the way Google&rsquo;s guidelines say, match the website to it, and keep watching it — because one bad suggested edit can undo months of work.&rdquo;"
            imageSrc="/images/mubashar-sharif.jpg"
            imageAlt="Mubashar Sharif — Founder of SearchPrex"
            linkedinUrl={LINKEDIN}
            badges={["Semrush certified", "HubSpot certified"]}
          />
        </div>
      </Band>

      {/* RELATED */}
      <Band dark>
        <BandIntro dark eyebrow="Keep reading" title="Business Profile guides" />
        <RuleGrid columns={4}>
          {RELATED.map((r) => (
            <RuleItem key={r.href} dark {...r} />
          ))}
        </RuleGrid>
        <div className="mt-10 text-center">
          <TextLink dark href="/services/local-seo">See the full local SEO service</TextLink>
        </div>
      </Band>

      {/* FAQ — page.tsx builds the FAQPage schema from the same arrays */}
      <FaqBand title="Google Business Profile questions, answered">
        <FaqList faqs={[...CAPSULES, ...FAQS]} name="gbp-optimization-faq" />
      </FaqBand>

      <div id="get-started">
        <ArticleLeadMagnet
          variant="bottom"
          source={SOURCE}
          copy={{
            headline: "Send me your website. I’ll tell you why your profile isn’t bringing calls.",
            sub: "Two fields. A written look at your Business Profile and the three businesses above you — from me, within 24 hours.",
          }}
        />
      </div>
    </main>
  );
}

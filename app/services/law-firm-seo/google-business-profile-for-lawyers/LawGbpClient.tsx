"use client";

// app/services/law-firm-seo/google-business-profile-for-lawyers/LawGbpClient.tsx
//
// Google Business Profile for law firms — a spoke of /services/law-firm-seo,
// on the ServiceBands layout. Copy and FAQ live in ./data.ts.
//
// No law firm case study exists, so the proof is local service businesses,
// labelled "not a law firm", and the map shows where the site has law firm
// city pages — not clients.

import Link from "next/link";
import { Scale } from "lucide-react";

import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import ProofImage from "@/components/ProofImage";
import ServiceProofStrip from "@/components/ServiceProofStrip";
import TrustStrap from "@/components/TrustStrap";
import UsTileMap, { type MapClient } from "@/components/UsTileMap";
import { RETAINER_PLANS } from "@/lib/pricing";
import { INDUSTRY_PAGES } from "@/lib/industry-pages";
import { LOCATION_STATES } from "@/lib/locations";
import { isLocationIndexable } from "@/lib/location-indexing";
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
  WhiteButton,
} from "@/components/ServiceBands";

import { CAPSULES, CHECKS, FAQS, INCLUDED, META, PROBLEMS } from "./data";

const LINKEDIN = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";
const SOURCE = "service:law-firm-seo/google-business-profile-for-lawyers";
const LAW_PLAN = RETAINER_PLANS.find((p) => p.niche === "Law Firm SEO");

/** States with indexable law firm city pages — markets covered, not clients. */
const MARKETS: MapClient[] = LOCATION_STATES.map((s) => ({
  ...s,
  cities: s.cities.filter((c) => isLocationIndexable(c.href)),
}))
  .filter((s) => s.cities.length)
  .map((s) => ({
    state: s.abbr,
    name: s.name,
    place: "Law firm SEO city pages",
    result: s.cities.map((c) => c.name).join(", "),
    href: s.hubHref ?? s.cities[0].href,
    linkLabel: "See the city pages",
  }));

const PROCESS = [
  { when: "Day 1", title: "Free profile tear-down", body: "Your firm’s profile and website in, a written look back within 24 hours: categories, attorney listings, reviews and the firms above you." },
  { when: "Week 1", title: "Profile fixed", body: "Categories, practice areas, offices, hours and attorney listings set within Google’s guidelines." },
  { when: "Weeks 2–4", title: "Site & directories aligned", body: "Practice-area pages, legal directories and the profile made to agree; the review routine running." },
  { when: "Every Monday", title: "Report", body: "Calls, direction requests and website clicks from the profile — what moved and what is next." },
];

const RELATED = [
  { href: "/blog/google-business-profile-suspended", title: "Google Business Profile suspended?", body: "The usual causes, and how to get reinstated." },
  { href: "/blog/get-more-calls-from-google-business-profile", title: "Get more calls from your profile", body: "Why views don’t turn into calls." },
  { href: "/resources/law-firm-seo-audit-checklist", title: "Law firm SEO audit checklist", body: "40 checks, written out in full. Free, no email." },
  { href: "/services/local-seo/google-business-profile-optimization", title: "GBP optimization for local businesses", body: "The same work, for service-area and storefront businesses." },
];

export default function LawGbpClient() {
  return (
    <main>
      <ServiceHero
        crumb="Google Business Profile"
        parent={{ label: "Law Firm SEO", href: "/services/law-firm-seo" }}
        eyebrow="Google Business Profile for law firms"
        title={META.h1}
        accent={META.accent}
        subtitle="When someone searches “divorce lawyer near me” or “car accident attorney”, the map pack decides which three firms get the call. I set up and protect your firm’s Business Profile — categories, attorney listings, reviews — within Google’s guidelines and your bar’s advertising rules."
        primary={{ href: "#checks", label: "See what I check" }}
        secondary={{ href: "#reviews", label: "Reviews & bar rules" }}
        trustPoints={["One firm per city", "The founder does the work", "90-day money-back guarantee"]}
        aside={
          <ArticleLeadMagnet
            variant="sidebar"
            source={SOURCE}
            copy={{
              headline: "Free law firm profile tear-down",
              sub: "Send your website. I’ll check your firm’s categories, attorney listings and reviews against the three firms above you — within 24 hours.",
            }}
          />
        }
      />

      <ServiceProofStrip
        id="proof"
        title="The same Business Profile work, for local businesses"
        moreHref="/case-studies"
        moreLabel="See every case study"
        shots={[
          {
            src: "/images/proof/local-dolls-ai-overview-rank1.png",
            alt: "Google results for 'post construction cleaning in Chesterfield, MI' showing D.O.L.L.S. Cleaning cited first in the AI Overview and ranking first organically.",
            width: 628,
            height: 322,
            caption: "D.O.L.L.S. Cleaning, Michigan — named first in Google’s AI Overview. A cleaning company, not a law firm.",
          },
          {
            src: "/images/proof/local-hvac-ai-overview.png",
            alt: "Google AI Overview for 'free cost estimation for ac installation in simi valley california' citing HVAC Services Team by name.",
            width: 717,
            height: 292,
            caption: "HVAC Services Team, California — named in Google’s AI Overview. An HVAC company, not a law firm.",
          },
        ]}
        footnote="There is no published law firm case study on this site yet. These are local service businesses whose Business Profile and website work is the same work I do for firms."
      />

      <TrustStrap />

      {/* THE PROBLEM */}
      <Band>
        <BandIntro
          center={false}
          eyebrow="The problem"
          title="Why your firm isn’t in the map pack"
          lead="Six things a managing partner can check on the firm’s profile today. Some cost you calls; some put the profile at risk of suspension."
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
          title="What law firm Business Profile work covers"
          lead="Everything inside Google’s guidelines and your state’s advertising rules. Nothing that wins a month and risks a suspension or a bar complaint."
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
            <H2>I compare your firm with the three firms above you</H2>
            <Lead>
              Google says local results are “mainly based on relevance, distance, and popularity.” You can’t move your office, so the work goes into relevance — categories, practice areas, pages — and prominence: reviews, directories and mentions.
            </Lead>
            <Lead>Each practice area and each city gets checked separately, because each is a different search.</Lead>
            <TextLink href="/resources/law-firm-seo-audit-checklist">Run the free 40-check law firm audit</TextLink>
          </div>
          <CheckPanel items={CHECKS} />
        </div>
      </Band>

      {/* REVIEWS & BAR RULES */}
      <Band muted id="reviews">
        <BandIntro
          eyebrow="Reviews & ethics"
          title="Reviews that grow without risking a bar complaint"
          lead="Reviews move the map pack, but law firms answer to rules a plumber doesn’t. These are the lines the review routine stays inside."
        />
        <RuleGrid>
          <RuleItem
            title="Asking is usually allowed"
            body="New York’s ethics committee (Opinion 1286, September 2025) says a lawyer may ask a former client for a Google review, as long as the lawyer doesn’t write it. Rules differ by state, so yours is checked first."
          />
          <RuleItem
            title="No gifts for reviews"
            body="Some bars allow a nominal thank-you, but Google’s review policy bans offering anything in exchange for a review. The routine never uses incentives."
          />
          <RuleItem
            title="Replies that protect confidentiality"
            body="ABA Formal Opinion 496 (2021) warns against revealing anything about a representation in a reply. Every reply is short, polite and free of case details."
          />
        </RuleGrid>
      </Band>

      {/* PRACTICE AREAS */}
      <Band dark>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center [&>*]:min-w-0">
          <div>
            <Eyebrow dark>Profile + practice-area pages</Eyebrow>
            <H2 dark>The profile ranks as well as the pages behind it</H2>
            <Lead dark>
              Google reads your website to decide how relevant the profile is. Each practice area listed on the profile needs a page on your site that answers what a prospective client asks — written to YMYL and bar-advertising standards.
            </Lead>
            <div className="mt-8 flex flex-wrap gap-2">
              {INDUSTRY_PAGES.map((p) => (
                <Link
                  key={p.slug}
                  href={`/services/law-firm-seo/${p.slug}`}
                  className="rounded-full border px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10"
                  style={{ borderColor: "rgba(185,179,245,0.45)" }}
                >
                  {p.name} SEO
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <WhiteButton href="/services/law-firm-seo#intake-demo">Try the 24/7 intake demo</WhiteButton>
            </div>
          </div>
          <ProofPanel>
            <ProofImage
              src="/images/proof/local-dolls-rank-1-and-2.png"
              alt="Google results for 'carpet cleaning services in Clawson, MI' with D.O.L.L.S. Cleaning in the first and second positions."
              width={627}
              height={338}
              stage="Local service business · not a law firm"
              caption="Two service pages in the top two organic results — the page work that backs a profile"
            />
          </ProofPanel>
        </div>
      </Band>

      {/* MAP */}
      <Band>
        <BandIntro
          eyebrow="Markets"
          title="Law firm SEO in the cities I already cover"
          lead="Highlighted states have law firm city pages on this site — markets covered, not clients. Not on the map? The tear-down works for any US city."
        />
        <div className="mt-12">
          <UsTileMap clients={MARKETS} label="Map of the United States highlighting the states that have law firm SEO city pages" />
        </div>
      </Band>

      {/* PROCESS */}
      <Band dark id="process">
        <BandIntro dark eyebrow="How it works" title="From free tear-down to a profile that brings consultations" />
        <Steps steps={PROCESS} cta={{ href: "#get-started", label: "Get my free law firm profile tear-down" }} />
      </Band>

      {/* WHY SEARCHPREX */}
      <Band>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Why choose SearchPrex</Eyebrow>
            <H2>One firm per city, one person doing the work</H2>
            <Lead>
              You work with the person who edits your firm’s profile. Every change is explained, kept within Google’s guidelines and your state’s rules, and you stay the owner of the profile.
            </Lead>
            <div className="mt-8">
              <CheckList
                items={[
                  "Market exclusivity: one firm per city and practice area",
                  "Nothing that risks a suspension or a bar complaint",
                  "You stay the owner of your profile; I work as a manager",
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
                label="Business Profile + law firm SEO"
                note="Business Profile work is part of the law firm SEO plan. Where a firm lands in the range depends on how many practice areas and cities it covers."
              />
            ) : null}
            <GuaranteeCard />
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-4xl">
          <AuthorCard
            name="Mubashar Sharif"
            role="Founder · 5+ years · Semrush & HubSpot certified"
            quote="&ldquo;I won&rsquo;t show you a cleaning company&rsquo;s result and let the layout imply it was a law firm. What I can show you is the work, done within Google&rsquo;s rules and your bar&rsquo;s, and a free tear-down of your own firm before you pay anything.&rdquo;"
            imageSrc="/images/mubashar-sharif.jpg"
            imageAlt="Mubashar Sharif — Founder of SearchPrex"
            linkedinUrl={LINKEDIN}
            badges={["Semrush certified", "HubSpot certified"]}
          />
        </div>
      </Band>

      {/* RELATED */}
      <Band dark>
        <BandIntro dark eyebrow="Keep reading" title="Business Profile and law firm guides" />
        <RuleGrid columns={4}>
          {RELATED.map((r) => (
            <RuleItem key={r.href} dark {...r} />
          ))}
        </RuleGrid>
        <div className="mt-10 text-center">
          <TextLink dark href="/services/law-firm-seo">See the full law firm SEO service</TextLink>
        </div>
      </Band>

      {/* FAQ — page.tsx builds the FAQPage schema from the same arrays */}
      <FaqBand title="Law firm Google Business Profile questions, answered">
        <FaqList faqs={[...CAPSULES, ...FAQS]} name="law-firm-gbp-faq" />
      </FaqBand>

      <div id="get-started">
        <ArticleLeadMagnet
          variant="bottom"
          source={SOURCE}
          copy={{
            headline: "Send me your website. I’ll show you why other firms get the map pack calls.",
            sub: "Two fields. A written look at your firm’s profile and the three firms above you — from me, within 24 hours.",
          }}
        />
      </div>
    </main>
  );
}

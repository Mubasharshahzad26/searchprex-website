"use client";

// app/services/local-seo/LocalSEOClient.tsx
//
// Topical layout (Oct 2026), built from components/ServiceBands: calm bands
// that alternate dark navy and white, each with one heading, a short paragraph
// and a "what I check" list. Taken as a layout idea from a reference page the
// owner liked; none of its copy is used.
//
// Kept from the conversion work, because the reference page has none of it:
// a lead form in the hero and at the close (only those two), real client
// screenshots, the price, the 90-day guarantee and the founder.
//
// Honesty notes: every figure is readable in its screenshot; no position or
// timeline is promised; the AI image banner stays as the owner added it. City
// pages under /locations are law firm pages, so they are linked from
// /services/law-firm-seo, not from here.

import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import type { Guide } from "@/lib/guides";
import ProofImage from "@/components/ProofImage";
import ServiceProofStrip from "@/components/ServiceProofStrip";
import { RETAINER_PLANS } from "@/lib/pricing";
import { LOCAL_INDUSTRIES } from "@/lib/local-industries";
import { caseStudies } from "@/app/case-studies/data";
import { AuthorCard, FaqList } from "@/components/layout";
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

import { CAPSULES, FAQS, PROBLEMS } from "./data";

const LINKEDIN = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";
const SOURCE = "service:local-seo";
const LOCAL_PLAN = RETAINER_PLANS.find((p) => p.niche === "Local SEO");

const included = [
  { title: "Google Business Profile", body: "Categories, services, photos, posts and reviews set up for the searches that bring calls.", href: "/services/local-seo/google-business-profile-optimization" },
  { title: "Website & service-area pages", body: "A real page for each service and each city you serve — never a find-and-replace copy.", href: "#website" },
  { title: "Reviews", body: "A steady, policy-safe way to ask genuine customers, because recent reviews move the map pack.", href: "#trust" },
  { title: "Citations & business data", body: "Name, address, phone and hours made identical on Google, Bing, Apple Maps, Yelp and your niche directories.", href: "#trust" },
  { title: "AI Overview readiness", body: "Clear answers and structured data so Google can name your business when it answers a local question.", href: "#maps" },
  { title: "Monday reporting", body: "Map pack positions, Profile calls and direction requests, in plain English, every week.", href: "#process" },
];

const profileChecks = [
  "Primary and secondary categories against the top three in your map pack",
  "Services listed in the words customers actually search",
  "Business hours, phone and address identical to your website",
  "Photos that show real jobs, crews and vehicles",
  "Review count and recency against your competitors",
  "Suggested edits waiting for you to accept or reject",
  "Calls, direction requests and website clicks from the Profile",
];

const websiteItems = [
  { title: "Service pages", body: "One page for each service you want calls for, answering what a customer asks before they ring." },
  { title: "City and service-area pages", body: "Only for places you really serve, each with something specific to that area." },
  { title: "Technical health", body: "Crawling, indexing and page speed fixed so Google can read every page you build." },
  { title: "Internal links", body: "Services, cities and guides linked so both people and Google can find their way." },
  { title: "Titles and headings", body: "Written around the search, e.g. “water heater repair in Simi Valley”, not your company slogan." },
  { title: "Call and form paths", body: "A tappable phone number and a short form on every page, because most local searches are on a phone." },
];

const trustItems = [
  { title: "Business information", body: "Name, address, phone, hours and services checked on every listing that matters. Google now uses your website to judge suggested edits, so the two must agree." },
  { title: "Review program", body: "A simple routine for asking happy customers and replying to every review — no incentives, no fake reviews, nothing that risks a suspension." },
  { title: "Citation quality", body: "The directories your customers and competitors actually use, not hundreds of low-value listings bought in bulk." },
];

const process = [
  { when: "Day 1", title: "Free tear-down", body: "Your URL in, a written diagnosis back within 24 hours: your Profile, citations and the three competitors above you." },
  { when: "Weeks 1–4", title: "Profile & citations", body: "Business Profile rebuilt, business details made consistent everywhere they appear." },
  { when: "Weeks 5–8", title: "Pages & reviews", body: "Service and city pages live, the review routine running alongside." },
  { when: "Every Monday", title: "Report", body: "Map pack positions, calls, what changed last week and what happens this week." },
];

const expectations = [
  "The founder does the work — no account managers in between",
  "A written plan before you pay anything",
  "Priorities ranked by what brings calls, not busywork",
  "A plain-English report every Monday",
  "Month to month, no long contract",
];

// `guide` is still passed by page.tsx; the checklist is linked from the Profile band.
export default function LocalSEOClient({ guide: _guide }: { guide: Guide }) {
  return (
    <main>
      <ServiceHero
        crumb="Local SEO"
        eyebrow="Local SEO services"
        title="Local SEO Services"
        accent="that make your phone ring"
        subtitle="Your customers search “near me” and call whoever is in the top three. I get local service businesses into the Google Maps pack and named in AI Overviews."
        primary={{ href: "#proof", label: "See client results" }}
        secondary={{ href: "#process", label: "How it works" }}
        trustPoints={["The founder does the work", "90-day money-back guarantee", "Month to month"]}
        aside={
          <ArticleLeadMagnet
            variant="sidebar"
            source={SOURCE}
            copy={{
              headline: "Free local tear-down",
              sub: "Send your URL. I’ll check your Business Profile, citations and the three competitors above you — and tell you what to fix first, within 24 hours.",
            }}
          />
        }
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

      {/* THE PROBLEM */}
      <Band>
        <BandIntro
          center={false}
          eyebrow="The problem"
          title="Why local businesses lose the map pack"
          lead="Four things you can check yourself in the next ten minutes. If any of them fails, it is costing you calls."
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
          title="What a complete local SEO plan covers"
          lead="Local rankings come from several signals working together. I work on the ones your market is missing first, not the same checklist for every business."
        />
        <RuleGrid>
          {included.map((i) => (
            <RuleItem key={i.title} dark {...i} />
          ))}
        </RuleGrid>
      </Band>

      {/* GOOGLE BUSINESS PROFILE */}
      <Band id="profile">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Google Business Profile</Eyebrow>
            <H2>Your Business Profile is where most local calls start</H2>
            <Lead>
              For “near me” searches, the map pack sits above the normal results, and the Profile is what people tap. It works best when it agrees with your website, carries recent reviews and lists the services you actually want calls for.
            </Lead>
            <Lead>I look at the Profile next to the three businesses ranking above you, so every change has a reason behind it.</Lead>
            <TextLink href="/services/local-seo/google-business-profile-optimization">Google Business Profile optimization service</TextLink>
            <div><TextLink href="/resources/google-business-profile-checklist">Free Google Business Profile checklist (23 checks)</TextLink></div>
          </div>
          <CheckPanel items={profileChecks} />
        </div>
      </Band>

      {/* MAPS & AI OVERVIEWS */}
      <Band dark id="maps">
        <BandIntro
          dark
          eyebrow="Google Maps & AI Overviews"
          title="Show up wherever a local customer looks"
          lead="Google says local results are “mainly based on relevance, distance, and popularity.” You can’t move your address, but you can make your business the most relevant and best-known answer — in the map pack, in the normal results, and in the AI Overview that now sits above both."
        />
        <div className="text-center">
          <TextLink dark href="/case-studies/hvac/local-hvac-services">See an HVAC company named in Google’s AI Overview</TextLink>
        </div>
      </Band>

      {/* WEBSITE */}
      <Band id="website">
        <BandIntro
          center={false}
          eyebrow="Your website"
          title="Your website is half of local SEO"
          lead="A Profile can only rank as well as the website behind it. The site has to say clearly what you do, where you do it, and make calling you easy."
        />
        <RuleGrid>
          {websiteItems.map((w) => (
            <RuleItem key={w.title} {...w} />
          ))}
        </RuleGrid>
        <TextLink href="/services/technical-seo">Need deeper site fixes? Technical SEO</TextLink>
        <div><TextLink href="/services/local-seo/google-business-profile-suspended">Profile suspended? Get it reviewed free</TextLink></div>
      </Band>

      {/* REVIEWS, CITATIONS & BUSINESS DATA */}
      <Band muted id="trust">
        <BandIntro
          center={false}
          eyebrow="Trust & accuracy"
          title="Reviews, citations and business details"
          lead="Customers pick who to call from the stars and the details they see. Google weighs the same things."
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
          lead="A homeowner choosing a roofer searches differently from one booking a cleaner. Each page below shows the client result behind it."
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
                <p className="text-lg font-black group-hover:text-[#534AB7]" style={{ color: INK }}>
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
        <BandIntro dark eyebrow="How it works" title="From free tear-down to the map pack" />
        <Steps steps={process} cta={{ href: "#get-started", label: "Get my free tear-down" }} />
      </Band>

      {/* PRICE, GUARANTEE & WHO DOES THE WORK */}
      <Band>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Why SearchPrex</Eyebrow>
            <H2>One person, one plan, a clear price</H2>
            <Lead>
              You work with the person who does the work. Every recommendation is built for your market and your competitors, so the budget goes where it can bring calls.
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
            quote="&ldquo;Local SEO is won on real signals — accurate business details, genuine reviews, pages that actually help your neighbours. I&rsquo;ve had local businesses named in Google&rsquo;s AI Overviews and reach #1 in local results. When you work with SearchPrex, you work with me.&rdquo;"
            imageSrc="/images/mubashar-sharif.jpg"
            imageAlt="Mubashar Sharif — Founder of SearchPrex"
            linkedinUrl={LINKEDIN}
            badges={["Semrush certified", "HubSpot certified"]}
          />
        </div>
      </Band>

      {/* FAQ — page.tsx builds the FAQPage schema from the same arrays */}
      <FaqBand title="Local SEO questions, answered">
        <FaqList faqs={[...CAPSULES, ...FAQS]} name="local-seo-faq" />
      </FaqBand>

      <div id="get-started">
        <ArticleLeadMagnet
          variant="bottom"
          source={SOURCE}
          copy={{
            headline: "Send me your URL. I’ll tell you why you’re not in the top three.",
            sub: "Two fields. A written look at your Profile, citations and competitors — from me, within 24 hours.",
          }}
        />
      </div>
    </main>
  );
}

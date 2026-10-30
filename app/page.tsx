// app/page.tsx — the home page.
//
// Redesigned September 2026, built and reviewed on /home-page-test first.
//
//   - The previous page was 21,482px (about 28 laptop screens) with 17
//     sections and ONE lead form, in the hero. This one is roughly half the
//     length with three forms: the hero, after the results, and the close.
//   - The hero is unchanged (HeroV2): founder's face and name on the form card,
//     both fields visible, proof and a phone number on the first screen.
//   - Results as evidence cards: SMK before/after, the MSO setback-fix-recovery
//     story with its revenue, D.O.L.L.S. and Remit Choice. The long versions
//     live on the case study pages.
//   - Law firms / local businesses / ecommerce as one tabbed section. Every
//     panel is in the HTML, so all of its links stay crawlable.
//   - One visual system (Inter, 24px cards, pill controls, one action colour)
//     and no reveal-on-scroll animations, which shipped content at opacity 0.
//   - The chat widget and the sticky mobile CTA are kept, as on the old page.
//
// Every figure is read from app/case-studies (data.ts and details.ts), the
// proof components or lib/pricing — never typed here.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, Bot, Check, GraduationCap, Newspaper, Settings, Clock, ExternalLink, MapPin, PhoneOff, Scale, SearchX, ShieldAlert,
  ShoppingCart, Sparkles, Star, TrendingDown, Wrench,
} from "lucide-react";

import ClientLogos from "@/components/ClientLogos";
import HeroV2 from "@/components/HeroV2";
import ResultsShowcase, { type ResultCard } from "@/components/home/ResultsShowcase";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import FreeDomainAuthorityChecker from "@/components/FreeDomainAuthorityChecker";
import { posts as blogPosts } from "@/app/blog/[slug]/posts";
import TrustStrap from "@/components/TrustStrap";
import ChatWidgetLazy from "@/components/ChatWidgetLazy";
import { VideoGallery } from "@/components/layout";
import { RECORDED_VIDEOS } from "@/components/VideoProof";
import { caseStudies, detailUrl } from "@/app/case-studies/data";
import { CASE_DETAILS, EXTRA_PROOF, type ProofShot } from "@/app/case-studies/details";
import { credentials } from "@/lib/credentials";
import { ECOMMERCE_INDUSTRIES } from "@/lib/ecommerce-industries";
import { INDUSTRY_PAGES } from "@/lib/industry-pages";
import { LOCAL_INDUSTRIES } from "@/lib/local-industries";
import { LOCATION_CITY_COUNT, LOCATION_STATES } from "@/lib/locations";
import { RETAINER_PLANS, formatRange, formatUsd } from "@/lib/pricing";
import { SITE, founderRef, organizationRef, websiteRef } from "@/lib/site-schema";

import AudienceTabs, { type AudienceTab } from "@/components/home/AudienceTabs";
import FaqAccordion from "@/components/home/FaqAccordion";
import PillForm from "@/components/home/PillForm";

// Title, H1 (in HeroV2) and description name the same three verticals with
// "SEO agency", plus GEO and technical search hooks.
const HOME_TITLE = "US SEO Agency | Free Audit in 24h, 90-Day Money-Back";
const HOME_DESCRIPTION =
  "Technical, local and AI search SEO for US law firms, local businesses and online stores. Free audit in 24 hours, month to month, one client per city.";

const baseMetadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: SITE,
    languages: { "en-US": SITE, "x-default": SITE },
  },
  openGraph: { title: HOME_TITLE, description: HOME_DESCRIPTION, url: SITE, siteName: "SearchPrex", type: "website" },
  twitter: { card: "summary_large_image", title: HOME_TITLE, description: HOME_DESCRIPTION },
};

export async function generateMetadata(): Promise<Metadata> {
  return baseMetadata;
}

/** When a person last reviewed this page. Hardcoded on purpose. */
const LAST_REVIEWED = "2026-10-17";
// One typeface site-wide (Inter, from the root layout); headings only change weight.
const H = "font-black";
const LINKEDIN = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";

// ── Data, read from the case studies ──────────────────────────────────────

const byClient = (client: string) => caseStudies.find((c) => c.slug.client === client);
const shot = (client: string, i: number): ProofShot | undefined =>
  (CASE_DETAILS[client]?.proof ?? EXTRA_PROOF[client] ?? [])[i];

// Results cards. Every figure is on the screenshot it sits beside; HVAC
// carries only what its captures show (the AI Overview citation).
const hvac = byClient("local-hvac-services");
const smk = byClient("smk-store");
const pick = (client: string, i: number, extra: Omit<ResultCard, "client" | "shot" | "href">): ResultCard | null => {
  const cs = byClient(client);
  const p = i === -1 ? MSO_INDEXING_SHOT : shot(client, i);
  return cs && p ? { ...extra, client: cs.client, shot: p, href: detailUrl(cs) } : null;
};
const MSO_INDEXING_SHOT: ProofShot = {
  src: "/images/proof/mso-gsc-indexing-full.png",
  alt: "Google Search Console page-indexing chart for Michigan Outdoor Sports, showing indexed pages rising from roughly 3,000 in mid-May 2026 to 11,549 on 25 July 2026.",
  width: 778,
  height: 520,
  figure: "≈3,000 → 11,549",
  figureLabel: "indexed pages",
  caption: "25 Jul 2026 · 11,549 pages indexed",
};
const RESULT_CARDS: ResultCard[] = [
  pick("smk-store", 1, {
    tab: "store", tag: "Online store · WooCommerce · Apr – Jun 2026",
    figure: "+227%", figureLabel: "$5,832 → $19,100 net sales a month",
    problem: "35,000+ product pages barely indexed, thin duplicate descriptions.",
    did: "Rewrote product content brand by brand, product schema, Core Web Vitals.",
  }),
  pick("michigan-outdoor-sports", -1, {
    tab: "store", tag: "Online store · Michigan · Mar – Jul 2026",
    figure: "≈3,000 → 11,549", figureLabel: "indexed pages, 25 Jul 2026 (Search Console)",
    problem: "Thin brand pages and crawl waste left thousands of pages out of Google.",
    did: "Fixed indexation blocks, rewrote brand pages, resubmitted in batches.",
  }),
  pick("local-hvac-services", 0, {
    tab: "local", tag: "Local · HVAC · Simi Valley, CA",
    figure: "Named", figureLabel: "in Google's AI Overview for an AC installation search",
    problem: "No visibility for high-intent local AC searches.",
    did: "Business Profile, service-area pages and answer-ready content.",
  }),
  pick("dolls-cleaning", 0, {
    tab: "local", tag: "Local · Cleaning · Chesterfield, MI",
    figure: "#1", figureLabel: "named first in the AI Overview, #1 organic below it",
    problem: "Invisible for high-intent cleaning searches, no map presence.",
    did: "Business Profile, service-area pages, citations and reviews.",
  }),
  pick("remit-choice", 2, {
    tab: "international", tag: "International · Fintech · from 2023",
    figure: "#1", figureLabel: "above Wise and Xoom for a UK → Pakistan transfer search",
    problem: "Duplicate country pages, no keyword mapping across corridors.",
    did: "A page per country and corridor, one primary search per page.",
  }),
].filter((c): c is ResultCard => c !== null);

// The three newest articles, from the same file the blog renders.
const GUIDES = blogPosts.slice(0, 3);

const TABS: AudienceTab[] = [
  {
    id: "law",
    label: "Law firms",
    title: "Law firm SEO: found for the cases you want",
    problem:
      "People search by practice area and city, often at night, and call whoever answers first. Most firm sites have one practice page, a thin Business Profile and no answer to the questions clients actually type.",
    visual: {
      src: "/images/audiences/lawyer-ppc-fatigue.webp",
      alt: "Attorney at law firm reviewing expensive Google Ads PPC campaign spend and zero retained cases late at night",
      badge: "The Problem · PPC Ad Burnout",
      caption: "9:45 PM: Another $150 click that turned into a price-shopper who hung up in 30 seconds, while Google Ads eats your retainer.",
    },
    work: [
      "Practice-area and city pages, written to bar advertising rules",
      "Business Profile and local pack work",
      "Answers AI Overviews can quote, approved by your firm",
      "An AI intake assistant, so a 2am enquiry is not lost",
    ],
    proof: {
      text: "No law firm client has been published yet — which means the first firm I partner with in your city gets direct founder execution and market exclusivity while we build our flagship legal case study. Start with the free tear-down to test me on your firm first.",
      href: "/services/law-firm-seo",
      honest: true,
    },
    hub: { href: "/services/law-firm-seo", label: "Law firm SEO" },
    pages: INDUSTRY_PAGES.map((p) => ({ href: `/services/law-firm-seo/${p.slug}`, label: p.name })),
  },
  {
    id: "local",
    label: "Local businesses",
    title: "Local SEO: the Map Pack, and the phone ringing",
    problem:
      "When someone searches “near me”, they call one of the three businesses in the map pack. A profile set up as an afterthought and a single services page keep good businesses out of it.",
    visual: {
      src: "/images/audiences/local-contractor-garage.webp",
      alt: "Local contractor and garage repair business owner waiting for incoming phone calls with idle service vans",
      badge: "The Problem · Silent Dispatch",
      caption: "Three service vans parked inside and payroll running, while the local 3-pack sends all the emergency repair calls to competitors.",
    },
    work: [
      "Business Profile rebuilt for the searches that bring calls",
      "A page for every service and area you actually cover",
      "Genuine reviews, asked for the same way after every job",
      "Answers Google's AI Overviews can name you in",
    ],
    proof: {
      text: hvac
        ? `${hvac.client}: named in Google's AI Overview, with a page-one organic ranking.`
        : "Top 3 in the map pack within 60 days.",
      href: hvac ? detailUrl(hvac) : "/case-studies",
    },
    hub: { href: "/services/local-seo", label: "Local SEO" },
    pages: LOCAL_INDUSTRIES.map((i) => ({ href: `/services/local-seo/${i.slug}`, label: i.name })),
  },
  {
    id: "ecommerce",
    label: "Ecommerce",
    title: "Ecommerce SEO: every product page earning its keep",
    problem:
      "Large catalogues fail in the same places: thin manufacturer copy, thousands of pages Google never indexes, and templates that make every product slow at once.",
    visual: {
      src: "/images/audiences/ecommerce-inventory-stress.webp",
      alt: "Ecommerce store owner in warehouse worried about unindexed product catalog and rising ad CAC",
      badge: "The Problem · Inventory Stagnation",
      caption: "Thousands of product SKUs sitting in the warehouse, rising ad CAC, and Google Search Console still leaving half your catalogue unindexed.",
    },
    work: [
      "Thin product and brand pages rewritten at scale",
      "Crawling and indexing fixed, batch by batch, in Search Console",
      "Speed fixed at the template, so every product gets faster",
      "Product, brand and category pages linked on purpose",
    ],
    proof: {
      text: smk
        ? `${smk.client}: monthly net sales from $5,832 to $19,100 in two months, per its WooCommerce dashboard.`
        : "Monthly net sales from $5,832 to $19,100 in two months.",
      href: smk ? detailUrl(smk) : "/case-studies",
    },
    hub: { href: "/services/ecommerce-seo", label: "Ecommerce SEO" },
    pages: [
      ...ECOMMERCE_INDUSTRIES.map((i) => ({ href: `/services/ecommerce-seo/${i.slug}`, label: i.name })),
      // Technical SEO was the least-linked service page (Sept 2026 audit); large
      // catalogues are where its work matters most.
      { href: "/services/technical-seo", label: "Technical SEO" },
    ],
  },
];

const STEPS = [
  { n: "1", title: "Send your URL", body: "A written tear-down within 24 hours: what is holding the site back, and the competitors above you." },
  { n: "2", title: "I do the work", body: "Month to month. Technical fixes, pages, profile and content, in the order that moves revenue first." },
  { n: "3", title: "Monday report", body: "What changed, what moved and what is next, in plain English, every week." },
];

const plan = (niche: string) => RETAINER_PLANS.find((p) => p.niche === niche);
const local = plan("Local SEO");
const law = plan("Law Firm SEO");
const ecom = plan("Ecommerce SEO");

const FAQS = [
  {
    q: "How much does SEO cost with SearchPrex?",
    a: `${local ? `Local SEO runs ${formatRange(local)} a month` : ""}${law ? `, law firm SEO ${formatRange(law)}` : ""}${ecom ? ` and ecommerce SEO ${formatRange(ecom)}` : ""}, depending on how many pages, locations and practice areas the plan covers. It is month to month, and the free tear-down comes first.`,
  },
  {
    q: "How long does SEO take to show results?",
    a: "Local results can move within weeks once the profile and pages are fixed — the HVAC client in the case studies reached the map pack's top three in 60 days. Competitive and ecommerce work usually takes three to six months. The tear-down gives you a realistic read for your market.",
  },
  {
    q: "Who actually does the work?",
    a: "Mubashar Sharif, the founder — every audit, page and report. There are no account managers or juniors, which is also why SearchPrex takes one client per city.",
  },
  {
    q: "Can you get my business into Google's AI Overviews & ChatGPT Search?",
    a: "Yes. SearchPrex structures content into self-contained 45–60 word answer capsules directly beneath question-formatted H2s, builds verified JSON-LD schema graphs linked to authoritative Wikidata entities, and maintains clean /llms.txt manifests so retrieval-augmented generation (RAG) pipelines and LLMs cite your domain.",
  },
  {
    q: "What free SEO intelligence and diagnostic tools does SearchPrex provide?",
    a: "SearchPrex provides an open engineering ecosystem including a Free Domain Authority Checker, live Google SERP Simulator, Schema Markup Generator, an interactive 55-Point Technical SEO Audit Checklist, dated Industry News Desks, and a production Issues & Solutions Library at searchprex.com/resources.",
  },
  {
    q: "Do you guarantee rankings?",
    a: "No, and nobody honestly can — Google decides rankings. What is guaranteed is progress: if you don't see measurable progress within 90 days, I either keep working at no extra cost until you do, or refund what you paid for those 90 days. And the process: the tear-down within 24 hours, the work done by me, and a plain report every Monday.",
  },
  {
    q: "Where is SearchPrex based?",
    a: "Remote-first, run from Daska, Pakistan, and working US business hours across Eastern, Central and Pacific time. Most client work is for US businesses.",
  },
];

function Heading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-600">{eyebrow}</p>
      <h2 className={`${H} mt-3 text-3xl tracking-[-0.02em] text-neutral-950 sm:text-4xl lg:text-[2.6rem] lg:leading-[1.1]`}>{title}</h2>
      {sub ? <p className="mt-4 text-base leading-relaxed text-slate-600">{sub}</p> : null}
    </div>
  );
}


// ── Homepage hub sections ────────────────────────────────────────────────
// The homepage ranks for the brand, not for "SEO agency"; its SEO job is to
// send link equity, with descriptive anchors, to the service, problem and
// industry pages that can win long-tail searches. Every href below is a live
// page; prices come from lib/pricing.
const SERVICES = [
  { icon: Scale, title: "Law Firm & Attorney SEO", body: "Practice-area and city pages, Business Profile and reviews within bar rules, measured in calls and signed cases.", href: "/services/law-firm-seo", price: `${formatRange(RETAINER_PLANS[1])}/mo` },
  { icon: MapPin, title: "Local SEO for Small Businesses", body: "Google Business Profile, Map Pack visibility, service-area pages and reviews for contractors and local services.", href: "/services/local-seo", price: `${formatRange(RETAINER_PLANS[0])}/mo` },
  { icon: ShoppingCart, title: "Shopify & WooCommerce SEO", body: "Indexing recovery, product and collection pages, schema and site speed for stores with large catalogs.", href: "/services/ecommerce-seo", price: `${formatRange(RETAINER_PLANS[2])}/mo` },
  { icon: Wrench, title: "Technical SEO & Indexing", body: "Crawling, indexing, Core Web Vitals, canonicals and structured data, as a ranked fix list or done for you.", href: "/services/technical-seo", price: "Free 24-hour tear-down" },
  { icon: Sparkles, title: "AI Search (GEO & AEO)", body: "Answer-ready pages, entity signals and crawler access so Google AI Overviews and ChatGPT can cite you.", href: "/ai-search", price: "Included in every plan" },
];

const PROBLEMS = [
  { icon: SearchX, q: "Pages not indexed by Google?", a: "Crawled or discovered but not indexed: find the cause and fix it.", href: "/services/technical-seo/indexing-recovery" },
  { icon: ShieldAlert, q: "Business Profile suspended?", a: "Find the real violation, fix it and appeal with the right evidence.", href: "/services/local-seo/google-business-profile-suspended" },
  { icon: MapPin, q: "Google Maps ranking dropped?", a: "Check whether the drop is real, then work through the likely causes.", href: "/blog/google-maps-ranking-drop" },
  { icon: TrendingDown, q: "Store traffic from Google dropped?", a: "Rule out tracking and seasonality, then check indexing and updates.", href: "/blog/ecommerce-organic-traffic-drop" },
  { icon: Bot, q: "Not showing in AI Overviews?", a: "What gets a page cited in Google AI Overviews and AI Mode.", href: "/blog/google-ai-overviews-seo" },
  { icon: PhoneOff, q: "Leads not turning into cases?", a: "Work out what a slow intake costs, and the fixes that close the gap.", href: "/blog/slow-intake-cost" },
];

const SOLUTIONS = [
  { pain: "Paying for every click, and the leads stop when the budget does.", fix: "Leads from Google you don't pay per click for", detail: "Pages, Business Profile and reviews that keep bringing calls after the ad money runs out." },
  { pain: "Monthly reports full of rankings, while the phone stays quiet.", fix: "Measured in calls, cases and revenue", detail: "Every Monday you get a plain-English report on what moved and what it brought in." },
  { pain: "Sold by a senior, handed to a junior.", fix: "Dedicated client care from the founder", detail: "I do the audit, the work and the reports myself, and I take one client per city." },
  { pain: "Locked into a long contract before you see anything.", fix: "7-day free trial and a 90-day money-back guarantee", detail: "Month-to-month after that. If I can't show progress in 90 days, you get those 90 days back." },
];

// Same order as RETAINER_PLANS: local, law firm, ecommerce.
const PLAN_TIMING = ["60–90 days", "60–90 days", "3–6 months for large catalogs"];
const PLAN_WORK = [
  "Google Business Profile, Map Pack, reviews, city pages",
  "Practice-area and city pages, Business Profile for each office",
  "Indexing, category and product pages, Merchant Center, site speed",
];

const INDUSTRY_GROUPS = [
  { label: "Law firms", links: [
    { name: "Personal injury", href: "/services/law-firm-seo/personal-injury" },
    { name: "Family law", href: "/services/law-firm-seo/family-law" },
    { name: "Criminal defense", href: "/services/law-firm-seo/criminal-defense" },
    { name: "Estate planning", href: "/services/law-firm-seo/estate-planning" },
    { name: "Mass torts", href: "/services/law-firm-seo/mass-torts" },
  ] },
  { label: "Home services", links: [
    { name: "HVAC", href: "/services/local-seo/hvac" },
    { name: "Roofing", href: "/services/local-seo/roofing" },
    { name: "Cleaning", href: "/services/local-seo/cleaning" },
    { name: "Remodeling", href: "/services/local-seo/remodeling" },
    { name: "Garage door & home services", href: "/services/local-seo/home-services" },
  ] },
  { label: "Online stores", links: [
    { name: "Shopify", href: "/services/ecommerce-seo/shopify" },
    { name: "WooCommerce", href: "/services/ecommerce-seo/woocommerce" },
    { name: "Knife & outdoor stores", href: "/services/ecommerce-seo/outdoor-knife-stores" },
  ] },
];

export default function Home() {
  const certCount = credentials.filter((c) => !c.isArticle).length;
  const review = {
    body: "Highly recommend for any e-commerce business looking to scale. They are an expert at optimizing for competitive retail niches and have helped Michigan Sports Outdoor substantially increase our online visibility. Very professional, results-oriented, and easy to work with.",
    author: "Michigan Sports & Outdoor Inc",
    date: "17 July 2026",
  };

  // Organization, founder and WebSite come from lib/site-schema.ts via the root
  // layout. This graph adds what is specific to the home page and points at
  // those by @id: the WebPage (with the person accountable for it), an
  // ImageObject for every proof capture shown on the page, and one FAQPage
  // built from the questions the page displays.
  const proofImage = (id: string, src: string, caption: string, datePublished: string) => ({
    "@type": "ImageObject",
    "@id": `${SITE}/#${id}`,
    contentUrl: `${SITE}${src}`,
    caption,
    creator: founderRef,
    creditText: "SearchPrex — Mubashar Sharif",
    datePublished,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE}/#webpage`,
        url: SITE,
        name: HOME_TITLE,
        description: HOME_DESCRIPTION,
        isPartOf: websiteRef,
        about: organizationRef,
        author: founderRef,
        reviewedBy: founderRef,
        dateModified: LAST_REVIEWED,
        primaryImageOfPage: { "@type": "ImageObject", url: `${SITE}/opengraph-image` },
        mentions: [
          { "@type": "Thing", "name": "Search engine optimization", "sameAs": "https://en.wikipedia.org/wiki/Search_engine_optimization" },
          { "@type": "Thing", "name": "Generative engine optimization", "sameAs": "https://www.wikidata.org/wiki/Q124338164" },
          { "@type": "Thing", "name": "Core Web Vitals", "sameAs": "https://en.wikipedia.org/wiki/Google_PageSpeed_Tools" },
        ],
      },
      proofImage("proof-smk-revenue-before", "/images/proof/smk-revenue-before-v2.png", "SMK Store WooCommerce net sales for April 2026: $5,832.02 for the month, top seller at 200 units.", "2026-04-30"),
      proofImage("proof-smk-revenue-after", "/images/proof/smk-revenue-after-v2.png", "SMK Store WooCommerce net sales for June 2026: $19,100.71 for the month, top seller at 300 units — a 227% increase over April.", "2026-06-30"),
      proofImage("proof-indexing", "/images/proof/mso-gsc-indexing-full.png", "Google Search Console page indexing for Michigan Outdoor Sports: approximately 3,000 indexed pages in mid-May 2026 rising to 11,549 on 25 July 2026.", "2026-08-07"),
      proofImage("proof-revenue-before", "/images/proof/mso-revenue-1-jul20-v2.png", "Michigan Outdoor Sports WooCommerce net sales, 20 July 2026: $0.00 for the month.", "2026-07-20"),
      proofImage("proof-revenue-mid", "/images/proof/mso-revenue-2-aug06-v2.png", "Michigan Outdoor Sports WooCommerce net sales, 6 August 2026: $206.63 for the month.", "2026-08-06"),
      proofImage("proof-revenue-after", "/images/proof/mso-revenue-3-sep25-v2.png", "Michigan Outdoor Sports WooCommerce net sales, 25 September 2026: $523.49 month to date.", "2026-09-25"),
      {
        "@type": "FAQPage",
        "@id": `${SITE}/#faq`,
        mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <>
    <main id="main-content" className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1 · HERO — kept from the previous home page on purpose: the form card carries the founder's face and name (people hire a person, not a tool), both fields are visible so the 24-hour human reply is clear up front, and proof and a phone number sit on the first screen. */}
      <HeroV2 />

      {/* 2 · PROOF STRIP — client logos, then the directory profiles (E-E-A-T strap) */}
      <ClientLogos />
      <TrustStrap />
      {/* V2 order, written as the founder talking to the owner: reassurance
          and the problem list, which track they are on, proof, help and price,
          who does the work, doubts, the form — then the resources. */}
      {/* PROBLEMS WE SOLVE — the searches people make when something breaks. */}
      <section className="bg-neutral-950 px-4 py-20 text-white sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">Problems we solve</p>
          <h2 className={`${H} mx-auto mt-3 max-w-3xl text-center text-3xl tracking-tight text-white sm:text-4xl`}>
            Worried about not getting leads in the USA?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[15px] leading-relaxed text-white/70">
            Don't panic. This happens to good businesses, and it's fixable. Which one sounds like you?
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROBLEMS.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-emerald-300/60 hover:bg-white/10"
              >
                <p.icon className="h-6 w-6 text-emerald-300" aria-hidden />
                <h3 className={`${H} mt-4 text-lg text-white`}>{p.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{p.a}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-emerald-300">
                  Read the fix <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION — each pain from the section above, answered. */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Heading
            eyebrow="The solution"
            title="Here's the Relief SearchPrex Brings You"
            sub="The things that wore you out, and what changes when I take over."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {SOLUTIONS.map((x) => (
              <div key={x.pain} className="rounded-3xl border border-slate-200 bg-white p-6">
                <p className="text-sm text-slate-500 line-through decoration-slate-300">{x.pain}</p>
                <h3 className={`${H} mt-3 flex items-start gap-2 text-lg text-neutral-950`}>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                  {x.fix}
                </h3>
                <p className="mt-2 pl-6 text-sm leading-relaxed text-slate-600">{x.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 · WHO IT'S FOR — AEO Direct Answer */}
      <section className="border-t border-slate-200 px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Heading
            eyebrow="Specialized Verticals · AEO Direct Answer"
            title="SearchPrex's Solution-Oriented Approach"
            sub="Three kinds of US business: law firms and attorneys, local contractors and small businesses, and Shopify and WooCommerce stores. The founder does the work, and we take one client per city and practice area, so we never work for your competitor."
          />
          <AudienceTabs tabs={TABS} />
        </div>
      </section>

      {/* SERVICES — what we sell, with prices, linking each service page. */}
      <section className="border-t border-slate-200 bg-slate-50 px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Heading
            eyebrow="Services"
            title="SEO Services for US Businesses"
            sub="SEO for law firms, local businesses and online stores: five services, published prices, month-to-month terms, and a free audit within 24 hours before anything else."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-neutral-900 hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
                  <s.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className={`${H} mt-4 text-lg text-neutral-950`}>{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{s.body}</p>
                <span className="mt-4 flex items-center justify-between gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-neutral-900">{s.price}</span>
                  <ArrowRight className="h-4 w-4 text-neutral-900 transition group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            ))}
          </div>

          {/* INDUSTRIES — the trades and practices with their own pages. */}
          <div className="mt-12">
            <h3 className={`${H} text-center text-xl text-neutral-950`}>Industries we work in</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {INDUSTRY_GROUPS.map((g) => (
                <div key={g.label} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">{g.label}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {g.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="inline-block rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:border-neutral-900 hover:text-neutral-950">
                          {l.name} SEO
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-5 text-center">
              <Link href="/industries" className="inline-flex items-center gap-1 text-sm font-bold text-neutral-900 hover:underline">
                All industries <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* 3 · RESULTS BENTO */}
      <section className="border-y border-slate-200 bg-slate-50 px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Heading
            eyebrow="Results"
            title="SEO results from US clients' own dashboards"
            sub="Every figure is on a screenshot from the client's own account. Pick your kind of business, click any screenshot to see it full size."
          />
          <ResultsShowcase cards={RESULT_CARDS} />
        </div>
      </section>

      {/* 7 · RECORDED LIVE */}
      <section className="border-y border-slate-200 bg-slate-50 px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Heading
            eyebrow="Recorded live"
            title="Don't take the screenshots on trust — watch them"
            sub="Screen recordings made inside each client's own accounts. A screenshot can be edited; a live session in the real account is far harder to fake."
          />
          <VideoGallery videos={RECORDED_VIDEOS} badge="Recorded live" columns={3} />
        </div>
      </section>

      {/* 8 · HOW IT WORKS — AEO Methodology */}
      <section className="px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Heading
            eyebrow="Methodology & Process"
            title="How it works: a free SEO audit in 24 hours, then a report every Monday"
            sub="You send your URL, which takes 30 seconds. I look at it myself and write back within 24 hours. If we work together, you hear from me every Monday."
          />
          <ol className="grid gap-5 md:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.n} className="rounded-3xl border border-slate-200 bg-white p-7">
                <span className={`${H} flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-lg text-neutral-950`}>{s.n}</span>
                <h3 className={`${H} mt-5 text-xl text-neutral-950`}>{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Client-care philosophy: set clear expectations and connect it to proof. */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <Heading
            eyebrow="The SearchPrex philosophy"
            title="You should always know who is doing the work—and what it changed."
            sub="SEO is a long-term investment. We keep the relationship direct, the reporting understandable, and the work tied to the searches and enquiries your business needs."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "One person accountable",
                body: "You work directly with founder Mubashar Sharif on the audit, priorities, implementation and weekly review.",
              },
              {
                title: "A clear view of progress",
                body: "Monday reporting explains what changed in Search Console, local visibility and leads—and what is being worked on next.",
              },
              {
                title: "A plan shaped around your market",
                body: "The work starts with your site, competitors and service area. Law firms receive one-firm-per-city exclusivity to avoid local conflicts.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
                <h3 className={`${H} text-lg text-neutral-950`}>{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-bold">
            <Link href="/case-studies" className="inline-flex items-center gap-1 text-neutral-950 hover:underline">
              See the evidence in our case studies <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/services/law-firm-seo" className="inline-flex items-center gap-1 text-neutral-950 hover:underline">
              How we work with law firms <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/locations" className="inline-flex items-center gap-1 text-neutral-950 hover:underline">
              Explore our service locations <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* 8 · FOUNDER + REVIEW */}
      <section className="bg-neutral-900 px-4 py-20 text-white sm:px-6 lg:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <Image
              src="/images/mubashar-sharif.jpg"
              alt="Mubashar Sharif, founder of SearchPrex"
              width={320}
              height={320}
              className="h-32 w-32 flex-shrink-0 rounded-3xl object-cover sm:h-40 sm:w-40"
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Meet your SEO strategist · Mubashar Sharif</p>
              <h2 className={`${H} mt-2 text-3xl tracking-tight text-white`}>You&apos;ll talk to me, not a sales team</h2>
              <p className="mt-1 text-sm text-white/65">
                Founder · 5+ years in SEO · {certCount} Semrush certificates
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-white/80">
                Every audit, page and Monday report is mine. No sales team, no account managers, no juniors — which is why SearchPrex takes one client per city. What I won&apos;t do: promise a ranking, or put a number on this site without a screenshot behind it.
              </p>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-300">Why I work with US businesses</p>
                <p className="mt-2 text-[15px] leading-relaxed text-white/80">
                  I work from Pakistan, on US business hours. I chose US law firms, local businesses and online stores because I kept seeing the same thing: good businesses paying every month for SEO reports while the phone stayed quiet. I&apos;d rather do the work myself for fewer clients, be judged on calls and signed cases instead of rankings. If I can&apos;t show progress in 90 days, you don&apos;t pay for those 90 days.
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  { label: "LinkedIn", href: LINKEDIN },
                  { label: "Trustpilot", href: "https://www.trustpilot.com/review/searchprex.com" },
                  { label: "YouTube", href: "https://www.youtube.com/@SearchPrex" },
                ].map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3.5 py-1.5 text-xs font-bold text-white/85 transition-colors hover:border-white/50"
                  >
                    {l.label} <ExternalLink className="h-3 w-3" aria-hidden />
                  </a>
                ))}
                <Link href="/about" className="inline-flex items-center rounded-full border border-white/20 px-3.5 py-1.5 text-xs font-bold text-white/85 transition-colors hover:border-white/50">
                  About SearchPrex
                </Link>
              </div>
            </div>
          </div>

          <figure className="rounded-3xl bg-white p-7 text-neutral-950">
            <div className="flex gap-0.5" aria-label="5 out of 5 stars">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-[#00b67a] text-[#00b67a]" aria-hidden />
              ))}
            </div>
            <blockquote className="mt-4 text-base leading-relaxed">&ldquo;{review.body}&rdquo;</blockquote>
            <figcaption className="mt-5 flex items-center justify-between gap-3 text-sm">
              <span>
                <strong className="block">{review.author}</strong>
                <span className="text-slate-600">Ecommerce, USA · {review.date}</span>
              </span>
              <a
                href="https://www.trustpilot.com/review/searchprex.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#1a7d59]"
              >
                On Trustpilot →
              </a>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 10 · PRICING — AEO & Semantic Comparison Table */}
      <section className="px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Heading
            eyebrow="Pricing"
            title="SEO pricing: straight monthly plans, no surprises"
            sub={`SearchPrex SEO retainers range from ${formatRange(RETAINER_PLANS[0])}/mo for local businesses, ${formatRange(RETAINER_PLANS[1])}/mo for law firms, and ${formatRange(RETAINER_PLANS[2])}/mo for ecommerce stores. Retainers are month-to-month, scoped by locations, practice areas or catalog size, and backed by our 90-day progress guarantee.`}
          />

          {/* Plans first: the card is what a buyer compares. */}
          <div className="grid items-stretch gap-5 md:grid-cols-3">
            {RETAINER_PLANS.map((p, i) => {
              const dark = p.featured;
              return (
                <div
                  key={p.niche}
                  className={`relative flex flex-col rounded-3xl p-7 transition hover:-translate-y-0.5 ${
                    dark ? "bg-neutral-950 text-white shadow-xl md:-my-3 md:py-10" : "border border-slate-200 bg-white hover:shadow-md"
                  }`}
                >
                  {dark ? (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-400 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-neutral-950">
                      One firm per city
                    </span>
                  ) : null}
                  <p className={`text-sm font-bold ${dark ? "text-emerald-300" : "text-emerald-800"}`}>{p.niche}</p>
                  <p className={`mt-1 text-xs ${dark ? "text-white/60" : "text-slate-600"}`}>{p.best}</p>
                  <p className={`${H} mt-6 text-4xl tracking-tight`}>
                    {formatUsd(p.min)}
                    <span className={`text-base font-semibold ${dark ? "text-white/60" : "text-slate-500"}`}> – {formatUsd(p.max)} / mo</span>
                  </p>
                  <p className={`mt-2 text-xs font-semibold ${dark ? "text-white/60" : "text-slate-500"}`}>
                    First movement: {PLAN_TIMING[i]}
                  </p>
                  <ul className={`mt-6 flex-1 space-y-2.5 border-t pt-6 text-sm ${dark ? "border-white/10 text-white/85" : "border-slate-100 text-slate-700"}`}>
                    {p.includes.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <Check className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? "text-emerald-300" : "text-emerald-600"}`} aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#get-started"
                    className={`mt-7 inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-bold transition-colors ${
                      dark ? "bg-white text-neutral-950 hover:bg-emerald-100" : "bg-neutral-950 text-white hover:bg-neutral-800"
                    }`}
                  >
                    Start with the free audit <ArrowRight className="h-4 w-4" aria-hidden />
                  </a>
                </div>
              );
            })}
          </div>

          {/* What every plan comes with. */}
          <ul className="mt-10 grid gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["7-day free trial", "See the work before you pay."],
              ["90-day money-back guarantee", "No progress in 90 days, no charge for them."],
              ["Month-to-month", "No long contract. Leave any time."],
              ["One client per city", "I never work for your competitor."],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                  <Check className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span>
                  <span className="block font-bold text-neutral-950">{t}</span>
                  <span className="text-slate-600">{d}</span>
                </span>
              </li>
            ))}
          </ul>

          {/* The side-by-side table stays in the page for search engines and
              AI answers, folded away for people. */}
          <details className="group mt-6 rounded-2xl border border-slate-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-bold text-neutral-950">
              Compare plans side by side
              <ArrowRight className="h-4 w-4 transition group-open:rotate-90" aria-hidden />
            </summary>
            <div className="overflow-x-auto px-5 pb-5">
              <table className="w-full min-w-[640px] text-left text-sm text-slate-700">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <th className="pb-3 pr-4">Plan</th>
                    <th className="px-4 pb-3">Price</th>
                    <th className="px-4 pb-3">Main work</th>
                    <th className="pl-4 pb-3">First movement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {RETAINER_PLANS.map((p, i) => (
                    <tr key={p.niche}>
                      <td className="py-3 pr-4 font-bold text-neutral-950">{p.niche}</td>
                      <td className="px-4 py-3 font-bold text-neutral-950">{formatRange(p)} / mo</td>
                      <td className="px-4 py-3">{PLAN_WORK[i]}</td>
                      <td className="py-3 pl-4">{PLAN_TIMING[i]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </div>
      </section>

      {/* 11 · FAQ */}
      <section className="px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <Heading eyebrow="FAQ" title="SEO questions US business owners ask before hiring me" />
          <FaqAccordion faqs={FAQS} />
          <p className="mt-6 text-center">
            <Link href="/faq" className="inline-flex items-center gap-1 text-sm font-bold text-neutral-900 hover:underline">
              More questions <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </p>
        </div>
      </section>

      {/* 13 · CLOSE — the last thing on the page is the offer */}
      <section id="get-started" className="scroll-mt-24 bg-slate-50 px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-neutral-900 px-6 py-14 text-center sm:px-12">
          <h2 className={`${H} mx-auto max-w-2xl text-3xl tracking-tight text-white sm:text-4xl`}>
            Tell me your problem. I&apos;ll build the solution around you.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">
            A written tear-down of your site and the competitors above you, within 24 hours.
          </p>
          <div className="mt-8">
            <PillForm source="homepage-close" tone="dark" />
          </div>
          <p className="mt-5 text-sm text-white/70">
            I read every message myself. Prefer to talk?{" "}
            <a href="https://calendly.com/contact-searchprex/30min" target="_blank" rel="noopener noreferrer" className="font-bold text-white underline underline-offset-2">Book 30 min</a>
            {" · "}
            <a href="https://wa.me/923059158010" target="_blank" rel="noopener noreferrer" className="font-bold text-white underline underline-offset-2">WhatsApp me</a>
          </p>
        </div>
      </section>
      {/* 10 · COVERAGE — every state and city page, compact */}
      <section className="border-y border-slate-200 bg-slate-50 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Heading
            eyebrow="Where"
            title={`Law firm and local SEO in ${LOCATION_STATES.length} states, ${LOCATION_CITY_COUNT} cities`}
            sub={`City pages for law firms and local businesses in ${LOCATION_STATES.map((s) => s.name).join(", ").replace(/, ([^,]*)$/, " and $1")}, each covering local courts, practice-area demand and the Map Pack.`}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LOCATION_STATES.map((s) => (
              <div key={s.slug} className="rounded-2xl border border-slate-200 bg-white px-5 py-4">
                <h3 className="text-sm font-bold text-neutral-950">
                  {s.hubHref ? (
                    <Link href={s.hubHref} className="hover:underline">{s.name}</Link>
                  ) : (
                    s.name
                  )}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed">
                  {s.cities.map((c, i) => (
                    <span key={c.href}>
                      <Link href={c.href} className="text-slate-600 hover:text-neutral-950 hover:underline">
                        {c.name}
                      </Link>
                      {i < s.cities.length - 1 ? <span className="text-slate-300"> · </span> : null}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center">
            <Link href="/locations" className="inline-flex items-center gap-1 text-sm font-bold text-neutral-900 hover:underline">
              All locations <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </p>
        </div>
      </section>

      {/* 5 · SEARCHPREX ENGINEERING ECOSYSTEM & PLATFORM HUBS (Anti-Orphan Authority Flow) */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Heading
            eyebrow="Free to use"
            title="Free SEO tools, playbooks and diagnostics"
            sub="SearchPrex publishes verified search telemetry, production code fixes for Google Search Console crawl bottlenecks, interactive 20-module learning playbooks, and developer utilities designed for enterprise US SEO governance."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/resources/news"
              className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:border-neutral-900 hover:shadow-md"
            >
              <div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-neutral-900">
                  <Newspaper className="h-5 w-5" aria-hidden />
                </span>
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-neutral-600">News Desk</p>
                <h3 className={`${H} mt-1 text-lg text-neutral-950 group-hover:text-neutral-700`}>
                  SEO &amp; Industry News
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Dated, source-verified telemetry covering Law Firm GBP enforcement, Shopify Liquid canonical fixes, and AI Mode citation benchmarks.
                </p>
              </div>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-neutral-950 group-hover:underline">
                Explore Industry News <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Link>

            <Link
              href="/resources/solutions"
              className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:border-neutral-900 hover:shadow-md"
            >
              <div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-neutral-900">
                  <Wrench className="h-5 w-5" aria-hidden />
                </span>
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-neutral-600">Code Playbooks</p>
                <h3 className={`${H} mt-1 text-lg text-neutral-950 group-hover:text-neutral-700`}>
                  Issues &amp; Solutions Library
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Step-by-step root-cause diagnostics and production code fixes for GSC &ldquo;Crawled - Not Indexed&rdquo;, GBP suspensions, and Core Web Vitals.
                </p>
              </div>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-neutral-950 group-hover:underline">
                Browse Solutions <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Link>

            <Link
              href="/resources/learning-hub"
              className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:border-neutral-900 hover:shadow-md"
            >
              <div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-neutral-900">
                  <GraduationCap className="h-5 w-5" aria-hidden />
                </span>
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-neutral-600">Curriculum</p>
                <h3 className={`${H} mt-1 text-lg text-neutral-950 group-hover:text-neutral-700`}>
                  Interactive Learning Hub
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  20-module technical curriculum and interactive QA audit checklists across Core Technical SEO, Law Firms, Shopify, and WooCommerce.
                </p>
              </div>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-neutral-950 group-hover:underline">
                Open Curriculum <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Link>

            <Link
              href="/tools"
              className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:border-neutral-900 hover:shadow-md"
            >
              <div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-neutral-900">
                  <Settings className="h-5 w-5" aria-hidden />
                </span>
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-neutral-600">Utilities</p>
                <h3 className={`${H} mt-1 text-lg text-neutral-950 group-hover:text-neutral-700`}>
                  Free SEO Tools Suite
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Live SERP Simulator, Schema JSON-LD Generator, GSC Regex Library, and root /llms.txt manifest generator for AI search engines.
                </p>
              </div>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-neutral-950 group-hover:underline">
                Access Free Tools <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Link>
          </div>
          <p className="mt-6 text-center text-sm text-slate-600">
            Tracking Google Maps and Business Profile changes? Read the dated{" "}
            <Link href="/resources/news/local-seo-updates" className="font-bold text-neutral-950 underline underline-offset-2">local SEO news and updates</Link>.
          </p>
        </div>
      </section>

      {/* 4 · FREE DOMAIN AUTHORITY & TECHNICAL SEO HEALTH CHECKER (NicheSEO Pro Replicated) */}
      <section id="free-da-checker" className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <Heading
            eyebrow="Free tool"
            title="Free domain authority checker: how strong is your site, really?"
            sub="Check your domain authority and technical health in seconds. No sign-up."
          />
          <FreeDomainAuthorityChecker variant="home" />
        </div>
      </section>

      {/* 12 · SEO GUIDES — the three newest articles. Links from the home page
          help new posts get found, and show the site is still being written. */}
      <section className="border-t border-slate-200 bg-slate-50 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Heading eyebrow="Free to read" title="Explore trending SEO guides" />
          <div className="grid gap-5 md:grid-cols-3">
            {GUIDES.map((g) => (
              <Link
                key={g.slug}
                href={`/blog/${g.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all hover:border-neutral-900 hover:shadow-md"
              >
                <span className="relative block aspect-[16/9] overflow-hidden bg-slate-100">
                  <Image
                    src={g.heroImage}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </span>
                <span className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-600">{g.category}</span>
                  <span className={`${H} mt-2 text-lg leading-snug text-neutral-950 group-hover:text-neutral-700`}>{g.title}</span>
                  <span className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">{g.excerpt}</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="h-3.5 w-3.5" aria-hidden /> {g.readTime}
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-center">
            <Link href="/blog" className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-neutral-950 hover:border-neutral-900">
              Read more SEO guides <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </p>
        </div>
      </section>

      {/* CLOSING CTA — short, for readers who scrolled through the resources. */}
      <section className="bg-neutral-950 px-4 py-14 text-center text-white sm:px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className={`${H} text-2xl tracking-tight text-white sm:text-3xl`}>Ready for leads that don&apos;t stop when the ads do?</h2>
          <p className="mt-3 text-sm text-white/70">Free audit within 24 hours. 7-day free trial. 90-day money-back guarantee.</p>
          <div className="mx-auto mt-6 max-w-xl">
            <PillForm source="homepage-footer-cta" tone="dark" />
          </div>
        </div>
      </section>

    </main>

    <StickyMobileCTA />
    <ChatWidgetLazy />
    </>
  );
}

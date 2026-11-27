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
import IndustryMarquee from "@/components/home/IndustryMarquee";
import StateMarquee from "@/components/home/StateMarquee";
import StrategyPopup from "@/components/home/StrategyPopup";
import StrategyRequestForm from "@/components/home/StrategyRequestForm";
import GuideMagnet from "@/components/GuideMagnet";
import { ECOMMERCE_PLAYBOOK_GUIDE, GBP_CHECKLIST_GUIDE, LAW_CHECKLIST_GUIDE } from "@/lib/guides";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, Bot, Store, Check, GraduationCap, Newspaper, Settings, Clock, ExternalLink, MapPin, PhoneOff, Scale, SearchX, ShieldAlert,
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
import { withSeoFix } from "@/lib/nicheseo-fixes";
import SeoFixSchema from "@/components/SeoFixSchema";

// Title, H1 and description use the same broad small-business SEO agency
// positioning. Specialist phrases belong on the linked service pages.
const HOME_TITLE = "Affordable SEO Agency USA: Budget-Friendly, From $800/mo";
const HOME_DESCRIPTION =
  "Affordable, budget-friendly SEO agency in the USA. Month-to-month SEO from $800/mo, done by the founder. Free audit in 24h, 90-day money-back.";

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
  return withSeoFix("/", baseMetadata);
}

/** When a person last reviewed this page. Hardcoded on purpose. */
const LAST_REVIEWED = "2026-11-03";
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
    title: "Found for the cases you want",
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
      text: "No law firm case study is published yet. So the first firm I work with in your city gets me on every page, and no competitor in your city. Test me first with the free tear-down.",
      href: "/services/law-firm-seo",
      honest: true,
    },
    hub: { href: "/services/law-firm-seo", label: "Law firm SEO" },
    pages: INDUSTRY_PAGES.map((p) => ({ href: `/services/law-firm-seo/${p.slug}`, label: p.name })),
  },
  {
    id: "local",
    label: "Local businesses",
    title: "The Map Pack, and the phone ringing",
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
    title: "Every product page earning its keep",
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
    q: "What is included in small business SEO services?",
    a: "The scope depends on your business and market. SearchPrex may handle technical fixes, keyword and competitor research, service or product pages, Google Business Profile work, and clear reporting. Your written plan shows which work is included before a monthly engagement begins.",
  },
  {
    q: "How much do small business SEO services cost?",
    a: `${local ? `Local SEO runs ${formatRange(local)} a month` : ""}${law ? `, law firm SEO ${formatRange(law)}` : ""}${ecom ? ` and ecommerce SEO ${formatRange(ecom)}` : ""}. The price depends on how many pages, locations or practice areas you need. It is month to month, and the free tear-down comes first.`,
  },
  {
    q: "How long does SEO take to show results?",
    a: "Local results can start moving within weeks once the profile and pages are fixed. One HVAC client was named in Google's AI Overview for its core search. Competitive and ecommerce work usually takes three to six months. The tear-down gives you a realistic read for your market.",
  },
  {
    q: "Who actually does the work?",
    a: "Mubashar Sharif, the founder — every audit, page and report. There are no account managers or juniors, which is also why SearchPrex takes one client per city.",
  },
  {
    q: "Can you get my business into Google's AI Overviews & ChatGPT Search?",
    a: "Yes. I put a short, direct answer under each question on your pages, so ChatGPT, Gemini and Google AI Overviews can quote it. I add schema markup so they know who you are. And I keep an llms.txt file that points AI tools to your best pages.",
  },
  {
    q: "What free SEO intelligence and diagnostic tools does SearchPrex provide?",
    a: "Yes, all free. There is a domain authority checker, a SERP simulator and a schema generator. There are also SEO checklists, dated SEO news and a library of fixes for common problems.",
  },
  {
    q: "Do you guarantee rankings?",
    a: "No, and nobody honestly can — Google decides rankings. What I do guarantee is progress. If you see no measurable progress in 90 days, I keep working for free, or refund those 90 days. You also get the tear-down in 24 hours, the work done by me, and a plain report every Monday.",
  },
  {
    q: "Do I have to sign a contract?",
    a: "No. SearchPrex runs month to month — no annual contract, no lock-in. You start with a free 7-day trial, then pay monthly only while the work is producing results. If you don't see measurable progress in 90 days, those 90 days are refunded.",
  },
  {
    q: "Where is SearchPrex based?",
    a: "SearchPrex is a remote-first SEO agency serving the USA, run from Daska, Pakistan, and working US business hours across Eastern, Central and Pacific time. Most client work is for US businesses.",
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
// The homepage targets broad small-business SEO agency intent. Service and
// industry pages own the more specific law-firm, local, ecommerce and problem
// queries. Every href below is a live page; prices come from lib/pricing.
const SERVICES = [
  { icon: Scale, title: "Law Firm SEO: Found for the Cases You Want", body: "Practice-area and city pages, Business Profile and reviews within bar rules, measured in calls and signed cases.", href: "/services/law-firm-seo", price: `${formatRange(RETAINER_PLANS[1])}/mo` },
  { icon: MapPin, title: "Local SEO Services: The Map Pack and the Phone Ringing", body: "Google Business Profile, Map Pack visibility, service-area pages and reviews for contractors and local businesses.", href: "/services/local-seo", price: `${formatRange(RETAINER_PLANS[0])}/mo` },
  { icon: ShoppingCart, title: "Ecommerce SEO Services: Every Product Page Earning Its Keep", body: "Indexing recovery, product and collection pages, schema and site speed for stores with large catalogs.", href: "/services/ecommerce-seo", price: `${formatRange(RETAINER_PLANS[2])}/mo` },
  { icon: Wrench, title: "Technical SEO & Indexing", body: "Crawling, indexing, Core Web Vitals, canonicals and structured data, as a ranked fix list or done for you.", href: "/services/technical-seo", price: "Free 24-hour tear-down" },
  { icon: Store, title: "SEO Services for Small Business, Local or Online", body: "The SEO agency for small business owners who need calls, not reports: Business Profile, technical fixes and pages, month to month.", href: "/services/small-business-seo", price: `From ${formatUsd(RETAINER_PLANS[0].min)}/mo` },
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

const WHY_ROWS: [string, string, string, string][] = [
  ["Who does the work", "The founder, every time", "Often a junior after the sale", "You manage it yourself"],
  ["Contract", "Month to month", "Often 6 to 12 months", "None, but leads stop when spend stops"],
  ["Price", "Published on the site", "Usually after a sales call", "Pay for every click"],
  ["Reporting", "Every Monday, in plain English", "Often monthly, rankings only", "Clicks and cost"],
  ["Proof", "Clients' own dashboards", "Often logos and claims", "Ad platform reports"],
  ["Your competitors", "One client per city", "May work for your rival", "Bid against you"],
  ["Risk", "7-day free trial, 90-day money-back", "Rarely a guarantee", "Spend is gone either way"],
];

// AI Overview citations that have screenshots in the case studies.
const AI_PROOF = [
  { client: "Doll's Cleaning", tag: "Local · Chesterfield, MI", line: "Named first in Google's AI Overview, #1 organic below it.", href: "/case-studies/cleaning/dolls-cleaning" },
  { client: "HVAC Services Team", tag: "Local · Simi Valley, CA", line: "Named in the AI Overview for an AC installation search.", href: "/case-studies/hvac/local-hvac-services" },
  { client: "Remit Choice", tag: "International · Fintech", line: "Named in the AI Overview for a money transfer search.", href: "/case-studies/fintech/remit-choice" },
];

const STATE_IMAGES: Record<string, { src: string; alt: string }> = {
 "texas": {
  "src": "/images/locations/texas-legal-district.webp",
  "alt": "A legal district street in Texas"
 },
 "kansas": {
  "src": "https://images.unsplash.com/photo-1700408388474-09b19b6c72ba?auto=format&fit=crop&w=600&q=70",
  "alt": "Aerial view of the river and bridges in Wichita, Kansas"
 },
 "michigan": {
  "src": "/images/locations/detroit-legal-district.webp",
  "alt": "A legal district street in Detroit, Michigan"
 },
 "louisiana": {
  "src": "/images/locations/baton-rouge-legal-district.webp",
  "alt": "A legal district street in Baton Rouge, Louisiana"
 },
 "arizona": {
  "src": "/images/locations/scottsdale-legal-district.webp",
  "alt": "A legal district street in Scottsdale, Arizona"
 },
 "california": {
  "src": "/images/locations/san-jose-legal-district.webp",
  "alt": "A legal district street in San Jose, California"
 },
 "new-mexico": {
  "src": "/images/locations/albuquerque-legal-district.webp",
  "alt": "A legal district street in Albuquerque, New Mexico"
 },
 "ohio": {
  "src": "/images/locations/cleveland-legal-district.webp",
  "alt": "A legal district street in Cleveland, Ohio"
 },
 "pennsylvania": {
  "src": "/images/locations/philadelphia-legal-district.webp",
  "alt": "A legal district street in Philadelphia, Pennsylvania"
 }
};

const USA_PHOTOS = [
 {
  "src": "https://images.unsplash.com/photo-1508433957232-3107f5fd5995?auto=format&fit=crop&w=900&q=70",
  "alt": "An American flag flying between city skyscrapers",
  "place": "Main Street to downtown"
 },
 {
  "src": "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=70",
  "alt": "The Chicago skyline beside Lake Michigan at dusk",
  "place": "The Midwest"
 },
 {
  "src": "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=900&q=70",
  "alt": "The Golden Gate Bridge in San Francisco on a clear day",
  "place": "The West Coast"
 },
 {
  "src": "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=900&q=70",
  "alt": "The Statue of Liberty under a blue sky",
  "place": "The East Coast"
 }
];

const CARE_CARDS = [
 {
  "tag": "Client care",
  "t": "One person who knows your business",
  "d": "You deal with me, the founder, every time. No hand-offs, no new account manager each month.",
  "src": "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=70",
  "alt": "Two people shaking hands in an office"
 },
 {
  "tag": "Support",
  "t": "Chat and WhatsApp, open 24/7",
  "d": "Send a message whenever something worries you. I reply quickly during US business hours.",
  "src": "/images/news/customer-using-phone-at-cafe.webp",
  "alt": "A smiling woman reading a message on her phone at a cafe"
 },
 {
  "tag": "Budget-friendly",
  "t": "Prices you can plan around",
  "d": "From $800 a month, published on the site. Month to month, no long contract.",
  "src": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=70",
  "alt": "A person sorting bills and paperwork with a calculator"
 },
 {
  "tag": "Pain-free",
  "t": "No jargon, no stress",
  "d": "Plain-English answers and a short report every Monday. You always know what is happening.",
  "src": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=70",
  "alt": "A smiling professional woman standing in an office"
 },
 {
  "tag": "Relief",
  "t": "Calls and sales you can see",
  "d": "The work is measured in calls, cases and revenue, so the relief is real, not just a ranking.",
  "src": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=70",
  "alt": "Two colleagues giving each other a high five at an office desk"
 },
 {
  "tag": "Peace of mind",
  "t": "A 90-day money-back guarantee",
  "d": "Try it free for 7 days. If you see no progress in 90 days, you get those 90 days back.",
  "src": "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=800&q=70",
  "alt": "A group of friends laughing together outdoors"
 }
];

const PACKAGE_STEPS = [
  { when: "Within 24 hours", t: "Free SEO audit", d: "Your site and your top competitors, checked by me. You see what is holding you back." },
  { when: "Within 24 hours", t: "Free SEO strategy", d: "A plan built on your real goal: which pages, which searches, which fixes first." },
  { when: "7 days", t: "Free SEO trial", d: "I start on the work, free, so you can judge it before you pay anything." },
  { when: "Then", t: "Your custom package", d: "Priced for your goal and budget, month to month, with a report every Monday." },
];
const SEO_TOOLS = ["Google Search Console", "Google Analytics 4", "Semrush", "Screaming Frog", "Lighthouse", "Local Falcon", "BrightLocal", "NicheSEO Pro"];

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
      // The three recorded-live videos the page embeds.
      ...RECORDED_VIDEOS.map((v) => ({
        "@type": "VideoObject",
        "@id": `${SITE}/#video-${v.id}`,
        name: v.title,
        description: v.sub,
        thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
        uploadDate: v.uploadDate,
        embedUrl: `https://www.youtube.com/embed/${v.id}`,
        contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
        creator: founderRef,
      })),
      {
        "@type": "FAQPage",
        "@id": `${SITE}/#faq`,
        mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <>
      <SeoFixSchema path="/" />
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
      {/* USA — who we serve, coast to coast. Not a claim of a US office. */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-[#b22234]">Serving businesses across the USA</p>
          <h2 className={`${H} mx-auto mt-3 max-w-3xl text-center text-3xl tracking-tight text-neutral-950 sm:text-4xl`}>From Main Street to the big city, helping American businesses get found</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[15px] leading-relaxed text-slate-600">Law firms, local trades and online stores in 9 states and counting. Same care, same honest prices, wherever you are.</p>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {USA_PHOTOS.map((u) => (
              <figure key={u.src} className="group relative aspect-[4/5] overflow-hidden rounded-3xl">
                <Image src={u.src} alt={u.alt} fill sizes="(max-width: 1024px) 50vw, 280px" className="object-cover transition duration-700 group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-950/80 to-transparent p-4 text-sm font-bold text-white">{u.place}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

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
                <h3 className={`${H} text-lg text-white`}>{p.q}</h3>
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

      {/* CARE — the promise behind the work, said plainly. */}
      <section data-lead-hotspot className="bg-[#fdf8f3] px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <figure className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-3xl">
              <Image src="https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&w=900&q=70" alt="A mother hugging her young son on a beach at sunset" fill sizes="(max-width: 1024px) 100vw, 560px" className="object-cover" />
            </figure>
            <figure className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-3xl sm:col-span-1 sm:aspect-[4/3]">
              <Image src="https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=900&q=70" alt="A mother sitting on a sofa with her two young children" fill sizes="(max-width: 640px) 100vw, 280px" className="object-cover" />
            </figure>
            <div className="col-span-2 flex flex-col justify-center rounded-3xl bg-white p-5 sm:col-span-1">
              <p className="text-3xl font-black text-neutral-950">From $800</p>
              <p className="mt-1 text-sm text-slate-600">a month. Month to month, no long contract.</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-rose-700">Don&apos;t worry. We&apos;re here.</p>
            <h2 className={`${H} mt-3 text-3xl tracking-tight text-neutral-950 sm:text-4xl`}>We care for your business the way a mother cares for her child</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-700">
              Running a business is stressful enough. You should not have to worry about Google too. SearchPrex is an affordable SEO agency for businesses across the USA, and I look after every client personally: patiently, honestly, and every single week.
            </p>
            <ul className="mt-6 space-y-3 text-[15px] text-slate-800">
              {[
                "I check on your site every week, so nothing slips.",
                "I explain everything in plain words. No jargon, no surprises.",
                "Budget-friendly plans with published prices, month to month.",
                "If you see no progress in 90 days, you get those 90 days back.",
              ].map((t) => (
                <li key={t} className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" aria-hidden /> {t}</li>
              ))}
            </ul>
            <a href="#get-started" data-open-strategy className="mt-8 inline-flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-bold text-white hover:bg-neutral-800">
              Let me take the stress off you <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* CARE CARDS — what looking after a client means, in pictures. */}
      <section className="px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Heading
            eyebrow="Care at every step"
            title="Affordable SEO, with care you can feel"
            sub="No stress, no jargon, no surprises. Just someone looking after your business every week."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CARE_CARDS.map((c) => (
              <figure key={c.t} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={c.src} alt={c.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px" className="object-cover transition duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-black uppercase tracking-wide text-rose-700">{c.tag}</span>
                </div>
                <figcaption className="p-6">
                  <h3 className={`${H} text-lg text-neutral-950`}>{c.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.d}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOM PACKAGE — the offer path, step by step, and the tools behind it. */}
      <section className="px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Heading
            eyebrow="Your goal, your package"
            title="Tell me what you want. I'll build an SEO package around your real goal."
            sub="More calls, more cases, more online sales: every plan starts from your goal and your budget, not a fixed bundle. Affordable SEO services in the USA, with the first steps free."
          />
          <ol className="grid gap-4 md:grid-cols-4">
            {PACKAGE_STEPS.map((p, i) => (
              <li key={p.t} className="rounded-3xl border border-slate-200 bg-white p-6">
                <p className="text-sm font-black text-emerald-700">Step {i + 1} · {p.when}</p>
                <h3 className={`${H} mt-2 text-lg text-neutral-950`}>{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-center">
            <button type="button" data-open-strategy className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-bold text-white hover:bg-neutral-800">
              Tell me your goal <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </p>
        </div>
      </section>

      {/* 6 · WHO IT'S FOR — AEO Direct Answer */}
      <section className="border-t border-slate-200 px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Heading
            eyebrow="Who I help"
            title="Which businesses does SearchPrex help?"
            sub="Three kinds of US business: law firms, local trades and small businesses, and online stores. Pick yours to see the problem I solve and how. One client per city, so I never work for your competitor."
          />
          <AudienceTabs tabs={TABS} />
        </div>
      </section>

      {/* SERVICES — what we sell, with prices, linking each service page. */}
      <section className="border-t border-slate-200 bg-slate-50 px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Heading
            eyebrow="Services"
            title="Affordable SEO Services USA 2026"
            sub="Founder-led SEO services USA for law firms, local businesses and online stores — published monthly pricing, a free competitor audit within 24 hours and no long-term contract."
          />
          <style>{`
            @keyframes svc-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
            .svc-card { animation: svc-in 0.6s ease-out both; }
            @media (prefers-reduced-motion: reduce) { .svc-card { animation: none; } }
          `}</style>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Link
                key={s.href}
                href={s.href}
                data-service-hotspot={s.title.split(":")[0]}
                style={{ animationDelay: `${i * 90}ms` }}
                className="svc-card group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-2xl hover:shadow-emerald-900/10"
              >
                <span aria-hidden className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-emerald-500 via-sky-500 to-[#b22234] transition-transform duration-500 group-hover:scale-x-100" />
                <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-100/0 transition duration-500 group-hover:bg-emerald-100/70" />
                <h3 className={`${H} relative mt-4 text-lg text-neutral-950`}>{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{s.body}</p>
                <span className="mt-4 flex items-center justify-between gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-neutral-900 transition group-hover:bg-neutral-950 group-hover:text-white">{s.price}</span>
                  <ArrowRight className="h-4 w-4 text-neutral-900 transition group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            ))}
          </div>

          {/* INDUSTRIES — the trades and practices with their own pages. */}
          <div className="mt-12">
            <h3 className={`${H} text-center text-xl text-neutral-950`}>Industries we work in</h3>
            <div className="mt-6">
              <IndustryMarquee groups={INDUSTRY_GROUPS} />
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
      <section data-lead-hotspot className="border-y border-slate-200 bg-slate-50 px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Heading
            eyebrow="Results"
            title="SEO results from clients' own dashboards"
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
            title="SEO results on video: watch them live"
            sub="Screen recordings made inside each client's own accounts. A screenshot can be edited; a live session in the real account is far harder to fake."
          />
          <VideoGallery videos={RECORDED_VIDEOS} badge="Recorded live" columns={3} />
        </div>
      </section>

      {/* WHY CHOOSE — the comparison a buyer is making anyway. Fair to the
          alternatives: "typical" describes the common model, not a named firm. */}
      <section className="px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <Heading
            eyebrow="Why choose SearchPrex"
            title="Why choose SearchPrex over a typical agency or more ads?"
            sub="Short answer: you get the founder doing the work, published prices, no contract, and proof from clients' own dashboards."
          />
          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-4"> </th>
                  <th className="px-5 py-4 text-neutral-950">SearchPrex</th>
                  <th className="px-5 py-4">Typical SEO agency</th>
                  <th className="px-5 py-4">Paid ads only</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {WHY_ROWS.map((r) => (
                  <tr key={r[0]}>
                    <th scope="row" className="px-5 py-4 font-bold text-neutral-950">{r[0]}</th>
                    <td className="px-5 py-4 font-semibold text-emerald-800">{r[1]}</td>
                    <td className="px-5 py-4 text-slate-600">{r[2]}</td>
                    <td className="px-5 py-4 text-slate-600">{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* AI SEARCH — AEO/GEO, with the AI Overview citations already on file. */}
      <section className="bg-neutral-950 px-4 py-20 text-white sm:px-6 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">AI search · AEO &amp; GEO</p>
            <h2 className={`${H} mt-3 text-3xl tracking-tight text-white sm:text-4xl`}>Get named in ChatGPT, Gemini and Google AI Overviews</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/75">
              More buyers now ask an AI before they search. If it doesn&apos;t name you, you don&apos;t get the call. Every plan includes the work that gets you cited:
            </p>
            <ul className="mt-6 space-y-3 text-[15px] text-white/85">
              {[
                "A short, direct answer under each question on your pages",
                "Schema markup so AI tools know who you are and where you work",
                "Your business details kept the same everywhere online",
                "An llms.txt file that points AI tools to your best pages",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/ai-search" className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-3 text-sm font-bold text-neutral-950 hover:bg-emerald-100">
              How AI search optimization works <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="grid gap-4">
            {AI_PROOF.map((p) => (
              <Link key={p.client} href={p.href} className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-emerald-300/60">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">{p.tag}</p>
                <p className="mt-1 text-lg font-black">{p.client}</p>
                <p className="mt-1 text-sm text-white/70">{p.line}</p>
              </Link>
            ))}
          </div>
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
                Founder · 5+ years in SEO · {certCount} Semrush certificates · HubSpot certified
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-white/80">
                SearchPrex is a founder-led SEO agency for US businesses: every audit, page and Monday report is mine. No sales team, no account managers, no juniors — which is why SearchPrex takes one client per city. What I won&apos;t do: promise a ranking, or put a number on this site without a screenshot behind it.
              </p>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-300">Why I work with US businesses</p>
                <p className="mt-2 text-[15px] leading-relaxed text-white/80">
                  I work from Pakistan, on US business hours. I chose law firms, local businesses and online stores for one reason. I kept seeing good businesses pay for SEO reports every month while the phone stayed quiet. So I do the work myself, for fewer clients. Judge me on calls and signed cases, not rankings. If I can&apos;t show progress in 90 days, you don&apos;t pay for those 90 days.
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

      {/* ONE CLIENT PER CITY — true scarcity, stated without naming cities we have not checked. */}
      <section className="bg-[#b22234] px-4 py-8 text-white sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-xl font-black sm:text-2xl">One client per city. Is yours still open?</p>
            <p className="mt-1 text-sm text-white/85">I never work for two competitors in the same city and practice area. Once your city is taken, it&apos;s gone.</p>
          </div>
          <button type="button" data-open-strategy className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#b22234] hover:bg-red-50">
            Check my city
          </button>
        </div>
      </section>

      {/* 10 · PRICING — AEO & Semantic Comparison Table */}
      <section data-lead-hotspot className="px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Heading
            eyebrow="Pricing"
            title="How much do SEO services cost? Straight monthly plans"
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
                    href="#get-started" data-open-strategy
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

      {/* PRICING FORM — for readers deciding between plans. */}
      <section className="bg-neutral-950 px-4 py-14 text-center text-white sm:px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className={`${H} text-2xl tracking-tight text-white sm:text-3xl`}>Not sure which plan fits? Start with a free audit.</h2>
          <p className="mt-3 text-sm text-white/70">Send your URL. I&apos;ll tell you which plan your site actually needs, or if you need one at all.</p>
          <div className="mx-auto mt-6 max-w-xl">
            <PillForm source="homepage-pricing-cta" tone="dark" />
          </div>
        </div>
      </section>

      {/* 10 · COVERAGE — every state and city page, compact */}
      <section className="border-y border-slate-200 bg-slate-50 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Heading
            eyebrow="Where I work"
            title={`SEO for businesses in ${LOCATION_STATES.length} US states and ${LOCATION_CITY_COUNT} cities`}
            sub="Law firms, local trades and online stores from coast to coast. Each state and city has its own page, written for that market."
          />
          <div className="mb-10 overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <iframe
              title="Map of the United States, where SearchPrex works"
              src="https://maps.google.com/maps?q=United%20States&z=4&output=embed"
              className="h-64 w-full sm:h-80 lg:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <StateMarquee
            states={LOCATION_STATES.map((st) => ({ name: st.name, hubHref: st.hubHref, img: STATE_IMAGES[st.slug]?.src ?? "/images/locations/texas-legal-district.webp", alt: STATE_IMAGES[st.slug]?.alt ?? st.name, cities: st.cities.map((c) => ({ name: c.name, href: c.href })) }))}
          />
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
            eyebrow="Free resources"
            title="Free SEO tools and guides to help you grow"
            sub="Fix things yourself with the same tools, guides and dated SEO news I use. Free, no email needed."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/resources/news"
              className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:border-neutral-900 hover:shadow-md"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-600">News</p>
                <h3 className={`${H} mt-1 text-lg text-neutral-950 group-hover:text-neutral-700`}>
                  SEO &amp; Industry News
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Dated Google changes for law firms, local businesses and online stores, each with its source.
                </p>
              </div>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-neutral-950 group-hover:underline">
                Explore Industry News <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Link>

            <Link
              href="/resources/solution"
              className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:border-neutral-900 hover:shadow-md"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-600">Fixes</p>
                <h3 className={`${H} mt-1 text-lg text-neutral-950 group-hover:text-neutral-700`}>
                  Issues &amp; Solutions Library
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Step-by-step fixes for pages not indexed, suspended Business Profiles and slow pages.
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
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-600">Learn</p>
                <h3 className={`${H} mt-1 text-lg text-neutral-950 group-hover:text-neutral-700`}>
                  Interactive Learning Hub
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Step-by-step SEO lessons and checklists for technical SEO, law firms, Shopify and WooCommerce.
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
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-600">Tools</p>
                <h3 className={`${H} mt-1 text-lg text-neutral-950 group-hover:text-neutral-700`}>
                  Free SEO Tools Suite
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Preview your Google result, make schema markup, filter Search Console, and build an llms.txt file.
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
            title="Free Domain Authority Checker: How Strong Is Your Site?"
            sub="Check your website's domain authority and technical health in seconds. No sign-up, no email needed."
          />
          <FreeDomainAuthorityChecker variant="home" />
        </div>
      </section>

      {/* 11 · FAQ */}
      <section className="px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <Heading eyebrow="Questions" title="FAQs" />
          <FaqAccordion faqs={FAQS} />
          <p className="mt-6 text-center">
            <Link href="/faq" className="inline-flex items-center gap-1 text-sm font-bold text-neutral-900 hover:underline">
              More questions <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </p>
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


      <StrategyPopup />
    </main>

    <StickyMobileCTA />
    <ChatWidgetLazy />
    </>
  );
}

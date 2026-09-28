// lib/kansas-seo-cities.ts
//
// General (multi-service) SEO pages for Kansas cities, served at
// /locations/kansas/[city]/seo-services. The law pages at /locations/kansas/[city]
// kept earning impressions for non-legal searches — "seo lenexa ks",
// "seo manhattan kansas", "seo agency shawnee mission" — that a law firm page
// cannot answer. These pages answer them and send law firms to the law page.
//
// Only cities with that evidence are here. SearchPrex has no Kansas clients
// and no Kansas office, and the copy says so: local facts only where they are
// well established (county, neighbourhoods, universities, the state line), and
// every result on the page is a named client from another state, labelled.

import type { QA } from "@/lib/local-industries";
import { costFaq } from "@/lib/pricing";

export interface KansasSeoCity {
  /** Matches the law page slug in lib/kansas-cities.ts. */
  slug: string;
  name: string;
  county: string;
  metaTitle: string;
  metaDescription: string;
  heroSub: string;
  /** "Searching in X" — why search works differently here. */
  market: { heading: string; body: string }[];
  /** Kinds of businesses the page is for, each with the service that fits. */
  whoFor: { title: string; body: string }[];
  /** The first three things the work covers, in this city. */
  firstMoves: { title: string; body: string }[];
  neighborhoods: string[];
  nearby: string[];
  faqs: QA[];
}

const NO_OFFICE = (city: string): QA => ({
  q: `Do you have an office in ${city}?`,
  a: `No. SearchPrex is a founder-led agency that works remotely with businesses across the United States, and I will not pretend otherwise with a borrowed ${city} address. You get me on a call booked at a time that suits you, a written plan, and monthly reports you can check against your own Google Search Console and Business Profile data.`,
});

const NO_KANSAS_RESULTS: QA = {
  q: "Do you have results from Kansas clients?",
  a: "Not yet. The results on this page come from clients in California, Texas, Michigan and elsewhere, and each one says where it is from. The work is the same in Kansas: a Business Profile Google trusts, pages that match how people search, and a site Google can crawl.",
};

const TIMELINE = (area: string): QA => ({
  q: `How long does SEO take for a ${area} business?`,
  a: "Fixes to your Business Profile and site can show in Search Console within weeks. Competitive map pack and organic positions usually take several months, and nobody can honestly guarantee a position. You get a monthly report showing what moved and what did not.",
});

function withCost(faqs: QA[], city: string): QA[] {
  const cost = costFaq("Local SEO", `local SEO in ${city}`);
  if (!cost) return faqs;
  return [...faqs.slice(0, -1), cost, faqs[faqs.length - 1]];
}

export const KANSAS_SEO_CITIES: KansasSeoCity[] = [
  {
    slug: "lenexa",
    name: "Lenexa",
    county: "Johnson County",
    metaTitle: "SEO Company in Lenexa, KS | Local SEO & More",
    metaDescription:
      "SEO for Lenexa and Johnson County businesses: Google Business Profile, local service pages, ecommerce and technical SEO. Founder-led, month to month.",
    heroSub:
      "For trades, B2B firms and online stores in Lenexa and the rest of Johnson County. Your Business Profile, your pages and your site, fixed in the order that brings calls.",
    market: [
      {
        heading: "Johnson County searches cross city lines",
        body: "A homeowner in Lenexa searching \"plumber near me\" sees businesses from Overland Park, Shawnee and Olathe in the same map pack. Google ranks local results on relevance, distance and prominence, so a Lenexa business is competing with the whole county, not just its own city.",
      },
      {
        heading: "Lenexa or Shawnee Mission?",
        body: "Many northeast Johnson County addresses still carry \"Shawnee Mission\" as their mailing name, and people search both ways. Your Business Profile, your citations and your pages need to agree on one address and still mention the areas customers actually type.",
      },
      {
        heading: "Business parks and distribution",
        body: "Lenexa has a large base of offices, warehouses and distribution sites along I-35 and K-10. B2B companies here are often searched by buyers outside Kansas, which is a job for service and industry pages, not the map pack.",
      },
    ],
    whoFor: [
      {
        title: "Home service and trade businesses",
        body: "HVAC, roofing, cleaning, remodeling and repair companies serving Johnson County. The work is Business Profile, service-area pages and reviews.",
      },
      {
        title: "B2B and professional firms",
        body: "Companies in Lenexa's business parks selling to buyers across the region. The work is service pages, industry pages and technical fixes.",
      },
      {
        title: "Online stores",
        body: "Shopify and WooCommerce stores run from Lenexa and shipping nationwide. The work is indexing, product content and collection pages.",
      },
    ],
    firstMoves: [
      {
        title: "One address, everywhere",
        body: "Your Business Profile, website and main directories checked for the same name, address and phone, including any Shawnee Mission versions left over.",
      },
      {
        title: "Pages for the areas you serve",
        body: "A page per service, and area pages only where you really work (Lenexa, Shawnee, Olathe, Overland Park), each written for that area rather than copied.",
      },
      {
        title: "A site Google can crawl",
        body: "Speed, indexing and duplicate pages checked in Search Console, so the pages above are found at all.",
      },
    ],
    neighborhoods: ["Lenexa City Center", "Old Town Lenexa", "Canyon Creek", "Falcon Ridge"],
    nearby: ["Shawnee", "Olathe", "Overland Park", "Merriam"],
    faqs: withCost(
      [
        NO_OFFICE("Lenexa"),
        {
          q: "Should my pages say Lenexa or Shawnee Mission?",
          a: "Use the address on your Business Profile everywhere, exactly as written there. Then mention Lenexa, Shawnee Mission and the other areas you serve in your page copy where it is true, so you match both ways people search.",
        },
        TIMELINE("Johnson County"),
        NO_KANSAS_RESULTS,
      ],
      "Lenexa",
    ),
  },
  {
    slug: "manhattan",
    name: "Manhattan",
    county: "Riley County",
    metaTitle: "SEO Company in Manhattan, KS | Local SEO & More",
    metaDescription:
      "SEO for Manhattan, KS businesses: Google Business Profile, local pages and websites for a city shaped by K-State and Fort Riley. Month to month.",
    heroSub:
      "For trades, rentals, clinics and stores in the Little Apple. A city where a large share of your customers arrived this year and found you on Google, not by word of mouth.",
    market: [
      {
        heading: "New customers every year",
        body: "Kansas State University and nearby Fort Riley mean thousands of people move to the Manhattan area every year. New arrivals have no one to ask, so they search and pick from the map pack. For a local business that makes Google reviews and a complete Business Profile worth more than in most cities of its size.",
      },
      {
        heading: "\"Manhattan\" needs \"KS\"",
        body: "Search for Manhattan and Google assumes New York. People here type \"Manhattan KS\" or \"Manhattan Kansas\", so your title tags, Business Profile and pages need to say Manhattan, KS consistently, or you compete with New York for your own name.",
      },
      {
        heading: "A calendar that moves demand",
        body: "Move-in weeks, graduation, home games and military moves shift what people search for and when. Rentals, movers, cleaners and repair businesses see it most. Content and posts timed to those weeks catch searches that competitors miss.",
      },
    ],
    whoFor: [
      {
        title: "Home service and trade businesses",
        body: "HVAC, roofing, cleaning and repair companies serving Manhattan, Junction City and Wamego. The work is Business Profile, service pages and reviews.",
      },
      {
        title: "Rentals and property managers",
        body: "Student and military rental demand, searched months ahead by parents and by families moving to Fort Riley. The work is pages that answer their questions.",
      },
      {
        title: "Online stores",
        body: "Stores run from Manhattan and selling nationwide. The work is indexing, product content and a site Google can crawl.",
      },
    ],
    firstMoves: [
      {
        title: "Manhattan, KS everywhere",
        body: "Titles, Business Profile and citations checked so every mention says Manhattan, KS, and the areas you cover (Junction City, Ogden, Wamego) are named where true.",
      },
      {
        title: "Reviews as a system",
        body: "A simple way to ask every customer for a review, because newcomers compare reviews before they call anyone.",
      },
      {
        title: "Pages for the moments people search",
        body: "Service pages written for move-in, move-out and military moves, where those are part of your business.",
      },
    ],
    neighborhoods: ["Aggieville", "Downtown Manhattan", "Bluemont Hill", "Westloop", "Northview"],
    nearby: ["Junction City", "Ogden", "Wamego", "Fort Riley"],
    faqs: withCost(
      [
        NO_OFFICE("Manhattan"),
        {
          q: "Why do my pages need to say Manhattan, KS?",
          a: "Because \"Manhattan\" on its own means New York to Google and to most people. The customers you want type \"Manhattan KS\" or \"Manhattan Kansas\", so that is what your titles, headings and Business Profile should say.",
        },
        TIMELINE("Manhattan, KS"),
        NO_KANSAS_RESULTS,
      ],
      "Manhattan, KS",
    ),
  },
  {
    slug: "kansas-city",
    name: "Kansas City",
    county: "Wyandotte County",
    metaTitle: "SEO Company in Kansas City, KS | Local SEO",
    metaDescription:
      "SEO for Kansas City, Kansas businesses: Business Profile, local pages, Spanish-language pages and websites that rank on the Kansas side of the state line.",
    heroSub:
      "For trades, shops and online stores in KCK and Wyandotte County. Most \"Kansas City\" searches default to the Missouri side, so your pages have to make the Kansas side unmistakable.",
    market: [
      {
        heading: "One name, two states",
        body: "Kansas City, Kansas and Kansas City, Missouri share a metro and a name. A search for \"Kansas City\" usually leans toward Missouri, so a KCK business has to say Kansas City, Kansas, KCK and Wyandotte County plainly in its pages and Business Profile to be found by people on this side.",
      },
      {
        heading: "Serving both sides of State Line",
        body: "Many KCK trades work in both states. Your Business Profile service area can include areas in Missouri, and your site can have pages for them, but each page has to be true about where you actually go.",
      },
      {
        heading: "A large Spanish-speaking community",
        body: "Wyandotte County has one of the largest Spanish-speaking communities in the region. Businesses that serve it in Spanish need Spanish pages and a Business Profile that says so, and very few competitors have either.",
      },
    ],
    whoFor: [
      {
        title: "Home service and trade businesses",
        body: "HVAC, roofing, cleaning, remodeling and repair companies in Wyandotte County and across the metro. The work is Business Profile, service-area pages and reviews.",
      },
      {
        title: "Shops, restaurants and services",
        body: "Businesses around Village West, Strawberry Hill, Rosedale and Argentine. The work is Business Profile, reviews and pages in the languages your customers use.",
      },
      {
        title: "Online stores",
        body: "Stores run from KCK and shipping nationwide. The work is indexing, product content and a site Google can crawl.",
      },
    ],
    firstMoves: [
      {
        title: "Say Kansas, clearly",
        body: "Titles, headings, Business Profile and citations checked for Kansas City, KS and Wyandotte County, so Google stops treating you as a Missouri business.",
      },
      {
        title: "A true service area",
        body: "Service-area settings and area pages for where you actually work, on either side of the state line, each written for that area.",
      },
      {
        title: "Spanish where it fits",
        body: "Spanish pages and Business Profile details for businesses that serve customers in Spanish, done properly rather than machine-translated.",
      },
    ],
    neighborhoods: ["Strawberry Hill", "Rosedale", "Argentine", "Armourdale", "Turner", "Village West"],
    nearby: ["Bonner Springs", "Edwardsville", "Merriam", "Roeland Park", "Kansas City, MO"],
    faqs: withCost(
      [
        NO_OFFICE("Kansas City, Kansas"),
        {
          q: "Will my pages rank on the Missouri side too?",
          a: "They can, where you really serve it. Local results depend partly on distance, so a KCK address helps most on the Kansas side. Pages for Missouri areas you work in, and a service area that includes them, give you a fair chance there without pretending to be a Missouri business.",
        },
        TIMELINE("Kansas City, Kansas"),
        NO_KANSAS_RESULTS,
      ],
      "Kansas City, Kansas",
    ),
  },
];

export function getKansasSeoCity(slug: string): KansasSeoCity | undefined {
  return KANSAS_SEO_CITIES.find((c) => c.slug === slug);
}

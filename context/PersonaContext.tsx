"use client";
 
import { createContext, useContext, useState, ReactNode } from "react";
 
export type PersonaId = "law" | "ecom" | "local" | "solo";
 
interface PersonaData {
  label: string;
  emoji: string;
  pains: { title: string; text: string; solution: string }[];
  caseStudy: {
    client: string;
    location: string;
    timeline: string;
    big: string;
    bigLabel: string;
    subs: { v: string; l: string }[];
    quote: string;
  };
}
 
export const PERSONAS: Record<PersonaId, PersonaData> = {
  law: {
    label: "Law Firm",
    emoji: "⚖️",
    pains: [
      { title: "Bidding Wars Feeding the Ad Landlord", text: "Burning $150–$350 per click on competitive legal keywords, only for leads to bounce before calling.", solution: "We build a permanent local organic asset that generates high-intent cases month-after-month — zero rent." },
      { title: "Handed Off to Junior Account Managers", text: "Paying bloated agencies thousands in retainers, receiving confusing PDFs filled with vanity metrics.", solution: "Every line of schema code and content mapping is executed personally by the founder. Daily Slack updates." },
      { title: "Local Map Pack Invisibility", text: "Competitors down the street win cases you should handle, simply because they sit in the Maps 3-Pack.", solution: "We align 50+ hyper-local citation loops and embed geographic entity schema to claim your map position." },
    ],
    caseStudy: {
      client: "Morrison Family Law Group",
      location: "Dallas County, TX · Divorce & Custody",
      timeline: "60-Day Campaign",
      big: "#1",
      bigLabel: "Rank for competitive Dallas County terms",
      subs: [{ v: "47/mo", l: "Inbound cases" }, { v: "+75%", l: "Organic visibility" }, { v: "6 wks", l: "Map pack claim" }, { v: "5.0★", l: "Client score" }],
      quote: "By repairing core indexation barriers and implementing E-E-A-T attorney credentials into schema, we helped them bypass $3,500/mo in paid ad rent in under 60 days.",
    },
  },
  ecom: {
    label: "E-Commerce",
    emoji: "🛍️",
    pains: [
      { title: "PPC Conversion Costs Eating Margins", text: "Meta and Google Shopping ads consume 40–60% of retail margins, making scaling impossible.", solution: "High-intent collection hubs that capture organic shoppers at peak purchase decision — zero ad spend." },
      { title: "Crawl Budget Exhaustion", text: "Shopify filter parameters create thousands of duplicate URLs, hiding your best product pages from Google.", solution: "We rebuild collection routing, lock down canonical filters, and deploy JSON-LD product markup." },
      { title: "Conglomerates Choking Your Sales Terms", text: "Generic retailers dominate page one, pushing your specialized store deep into page three or four.", solution: "Topical authority clusters: educational buying guides that prove absolute relevance to Google." },
    ],
    caseStudy: {
      client: "Michigan Sports & Outdoor Brands",
      location: "Store-wide Catalog Restructuring",
      timeline: "90-Day Shopify Re-Engineering",
      big: "+476%",
      bigLabel: "GSC Organic Click Growth (90 days)",
      subs: [{ v: "12K+", l: "New indexed pages" }, { v: "900+", l: "Brands indexed" }, { v: "3 mo", l: "To full lift" }, { v: "$0", l: "Ad spend" }],
      quote: "Massive duplicate URL crawl traps were hiding new arrivals. After a full architecture rebuild and canonical schema deployment, organic clicks grew 476% within 90 days.",
    },
  },
  local: {
    label: "Local Business",
    emoji: "📍",
    pains: [
      { title: "Aggregators Siphoning Your Leads", text: "Thumbtack and Angi sell your leads to four competitors at once, forcing you to slash pricing.", solution: "We bypass the middleman entirely — building direct map pack visibility so customers call you first." },
      { title: "NAP Fragmentation Killing Rankings", text: "Google can't verify your location due to inconsistent name, address, and phone data across directories.", solution: "Full citation audit and alignment across 50+ directories — unified trust signals Google rewards." },
      { title: "No Differentiation From Competitors", text: "Every local service page looks identical because businesses copy the same generic boilerplate.", solution: "Entity-specific content: unique service area pages and hyper-local schema deployment." },
    ],
    caseStudy: {
      client: "Dallas Local Operations Network",
      location: "Collin County · Service Area Businesses",
      timeline: "45-Day Map Pack Campaign",
      big: "Top 3",
      bigLabel: "Google Maps positions across all targets",
      subs: [{ v: "+180%", l: "Phone inquiries" }, { v: "50+", l: "Citations aligned" }, { v: "45 days", l: "Map pack entry" }, { v: "$0", l: "Aggregator spend" }],
      quote: "By eliminating NAP fragmentation and building 50+ consistent local citations, we moved businesses from invisible to map pack positions within 45 days.",
    },
  },
  solo: {
    label: "Solo Lawyer",
    emoji: "💼",
    pains: [
      { title: "Invisible Without a Firm Behind You", text: "Solo advocates lack brand recognition and can't outbid large firms on Google Ads.", solution: "We build a digital landmark under your own name — Bar ID and courthouse coordinates mapped to Google's trust graph." },
      { title: "Lead Agents Billing Massive Retainers", text: "Mass-market lead services charge huge fees and send cold, unqualified leads that rarely convert.", solution: "Organic personal brand authority that attracts self-qualified prospects in your exact practice area." },
      { title: "No Local Entity Presence", text: "Without structured signals, Google can't surface your practice for ready-to-hire local searches.", solution: "Attorney-specific schema with Bar verification, courthouse proximity, and practice area E-E-A-T content." },
    ],
    caseStudy: {
      client: "Solo Practitioner Authority Build",
      location: "Dallas & Collin County · Personal Injury",
      timeline: "75-Day Authority Campaign",
      big: "Page 1",
      bigLabel: "for 12 target practice area keywords",
      subs: [{ v: "28/mo", l: "Consultations" }, { v: "+220%", l: "Organic visibility" }, { v: "75 days", l: "Page 1" }, { v: "5.0★", l: "GBP rating" }],
      quote: "By constructing a verified digital entity with Bar registration signals and E-E-A-T content, we delivered 12 page-one rankings within 75 days.",
    },
  },
};
 
interface PersonaContextType {
  persona: PersonaId;
  setPersona: (p: PersonaId) => void;
  data: PersonaData;
}
 
const PersonaContext = createContext<PersonaContextType | undefined>(undefined);
 
export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersona] = useState<PersonaId>("law");
  return (
    <PersonaContext.Provider value={{ persona, setPersona, data: PERSONAS[persona] }}>
      {children}
    </PersonaContext.Provider>
  );
}
 
export function usePersona() {
  const ctx = useContext(PersonaContext);
  if (!ctx) throw new Error("usePersona must be used within PersonaProvider");
  return ctx;
}
 






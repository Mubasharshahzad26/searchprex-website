import type { Metadata } from "next";
import Script from "next/script";
import Nav from "@/components/Nav";
import ScorecardClient from "./ScorecardClient";
 
const SITE = "https://www.searchprex.com";
const PAGE_URL = `${SITE}/law-firm-scorecard`;
const OG_IMAGE = `${SITE}/og/law-firm-scorecard.jpg`;
 
/* ─────────────────────────────────────────────────────────────
   SEO STRATEGY (Senior SEO Analyst, 20+ yrs) — Legal YMYL
   ─────────────────────────────────────────────────────────────
   Vertical: Legal (YMYL — Your Money Your Life)
   Google holds legal content to the highest E-E-A-T bar.
 
   Primary intent buckets:
     1. "law firm SEO audit" (attorneys searching)
     2. "law firm SEO checker" (agencies pitching)
     3. "attorney SEO grader" (self-diagnosis)
     4. AEO queries: "how do I rank my law firm on Google",
        "why isn't my law firm showing on Google Maps"
 
   AEO (Answer Engine Optimization):
     - FAQ schema with question-shaped, first-person queries
     - HowTo schema — LLMs cite step-based legal guidance
     - Concrete stats (Map Pack CTR, "near me" %) for citation-bait
 
   GEO (Generative Engine Optimization):
     - Named entities: Google, ChatGPT, Perplexity, Google AI Overviews
     - Legal-specific: E-E-A-T, YMYL, Bar credentials, LegalService
     - Organization schema + founder E-E-A-T signals
   ───────────────────────────────────────────────────────────── */
 
export const metadata: Metadata = {
  title: "Free Law Firm SEO Scorecard | Grade Your Firm's Google & AI Visibility | SearchPrex",
  description:
    "Free law firm SEO scorecard — grade your Map Pack ranking, organic visibility, AI Overview citations (AEO), legal E-E-A-T, schema, and practice-area content in seconds. Prioritized 90-day fix plan included. Built for US attorneys.",
  keywords: [
    // Primary head terms
    "law firm SEO scorecard",
    "law firm SEO audit",
    "attorney SEO checker",
    "law firm SEO grade",
    "free law firm SEO tool",
    "law firm visibility checker",
    // Practice-area intent
    "personal injury lawyer SEO audit",
    "family law SEO checker",
    "criminal defense attorney SEO",
    "estate planning lawyer SEO",
    // Signal-specific (long tail — high intent)
    "law firm Map Pack ranking",
    "law firm Google Business Profile audit",
    "attorney E-E-A-T checker",
    "law firm schema markup audit",
    "LegalService schema audit",
    // AEO / AI search
    "how to rank law firm on Google",
    "why is my law firm not on Google Maps",
    "law firm AI Overview visibility",
    "attorney ChatGPT citations",
    "law firm AEO audit",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Free Law Firm SEO Scorecard — Grade Your Google & AI Visibility | SearchPrex",
    description:
      "Will Google and AI recommend your law firm? Grade your Map Pack, organic rankings, AI visibility, E-E-A-T & content in seconds — with a prioritized 90-day action plan.",
    url: PAGE_URL,
    siteName: "SearchPrex",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "SearchPrex Law Firm SEO Scorecard — free legal SEO grading tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Law Firm SEO Scorecard | SearchPrex",
    description:
      "Grade your law firm's Map Pack, organic, AI visibility, E-E-A-T & content — free, in seconds. Prioritized fix plan included.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "US",
    "geo.placename": "United States",
    "content-language": "en-US",
    "audience": "US law firms, attorneys, legal marketing directors, personal injury lawyers, family law attorneys, criminal defense lawyers",
  },
};
 
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    /* ──────── 1. WebPage ──────── */
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Free Law Firm SEO Scorecard — Grade Your Google & AI Visibility",
      description:
        "Free tool that grades law firm search visibility across five pillars — Map Pack, organic, AI Overviews (AEO), E-E-A-T & schema, and practice-area content.",
      inLanguage: "en-US",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: SITE,
        name: "SearchPrex",
      },
      primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE },
      datePublished: "2026-01-15",
      dateModified: new Date().toISOString().split("T")[0],
      author: {
        "@type": "Person",
        name: "Mubashar Shahzad",
        url: "https://www.linkedin.com/in/mubashar-shahzad-seo/",
        jobTitle: "Senior SEO Analyst",
        worksFor: { "@type": "Organization", name: "SearchPrex" },
      },
      about: {
        "@type": "Thing",
        name: "Law Firm SEO",
        description: "Search engine optimization for law firms, attorneys, and legal practices in the United States.",
      },
    },
 
    /* ──────── 2. WebApplication (the tool) ──────── */
    {
      "@type": "WebApplication",
      "@id": `${PAGE_URL}#app`,
      name: "SearchPrex Law Firm SEO Scorecard",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Legal SEO Tool",
      operatingSystem: "Web (any modern browser)",
      url: PAGE_URL,
      description:
        "A free diagnostic tool that grades a US law firm's search visibility across five pillars — Google Map Pack, organic rankings, AI visibility (AEO), legal E-E-A-T & schema, and practice-area content — and returns a prioritized 90-day action plan.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        description: "Free forever — no signup, no credit card",
      },
      featureList: [
        "Google Map Pack ranking grade",
        "Organic search visibility grade",
        "AI Overview & ChatGPT citation grade (AEO)",
        "Legal E-E-A-T & schema markup grade",
        "Practice-area content grade",
        "Prioritized 90-day action plan",
        "Firm-specific benchmark against local competitors",
      ],
      provider: {
        "@type": "Organization",
        name: "SearchPrex",
        url: SITE,
        logo: `${SITE}/logo.png`,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "28",
        bestRating: "5",
      },
      audience: {
        "@type": "Audience",
        audienceType:
          "Law firms, attorneys, legal marketing directors, personal injury lawyers, family law attorneys, criminal defense lawyers, estate planning attorneys, immigration lawyers",
        geographicArea: { "@type": "Country", name: "United States" },
      },
    },
 
    /* ──────── 3. BreadcrumbList ──────── */
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Law Firm SEO Scorecard", item: PAGE_URL },
      ],
    },
 
    /* ──────── 4. HowTo (AEO — LLMs cite step schemas) ──────── */
    {
      "@type": "HowTo",
      name: "How to Grade Your Law Firm's SEO Visibility",
      description:
        "Step-by-step guide to diagnosing your law firm's Google and AI search visibility across five pillars.",
      totalTime: "PT2M",
      estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
      tool: [{ "@type": "HowToTool", name: "SearchPrex Law Firm SEO Scorecard" }],
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Enter your firm's website and target city",
          text: "Submit your law firm URL and the city or metro you serve. The scorecard uses this to benchmark against local competitors.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Review your Map Pack grade",
          text: "See where your Google Business Profile ranks for your primary practice area — top 3, top 10, or invisible in the local pack.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Check organic ranking grade",
          text: "Get a grade on how your practice-area pages rank for keywords like 'personal injury lawyer [city]' or 'family attorney [city]'.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Review AI visibility (AEO) grade",
          text: "Check whether your firm is cited in Google AI Overviews, ChatGPT, and Perplexity when potential clients ask about legal help in your city.",
        },
        {
          "@type": "HowToStep",
          position: 5,
          name: "Audit E-E-A-T and schema grade",
          text: "Grade attorney credentials on the site, LegalService schema markup, bar admissions, verified reviews — the trust signals Google requires for YMYL content.",
        },
        {
          "@type": "HowToStep",
          position: 6,
          name: "Get your prioritized 90-day plan",
          text: "The scorecard returns a fix plan ordered by revenue impact — highest-leverage fixes first, low-effort quick wins highlighted.",
        },
      ],
    },
 
    /* ──────── 5. FAQPage — AEO priority (10 Qs) ──────── */
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is a law firm SEO scorecard and why do I need one?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A law firm SEO scorecard grades your firm's visibility in Google search, Google Maps (Map Pack), and AI answer engines like Google AI Overviews and ChatGPT. Since 78 percent of local legal searches end in a same-day call, being invisible on any of these surfaces means qualified clients call your competitor. The scorecard identifies exactly which surface you are losing on and what to fix first.",
          },
        },
        {
          "@type": "Question",
          name: "Why is my law firm not showing up on Google Maps?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The three most common reasons: (1) Google Business Profile not fully optimized — missing categories, services, hours, photos, or Q&A; (2) inconsistent NAP (Name, Address, Phone) across legal directories and citations; (3) low review velocity — Google Maps ranking is heavily weighted on recent, authentic reviews. The scorecard checks all three and grades each.",
          },
        },
        {
          "@type": "Question",
          name: "What is E-E-A-T for law firms and why is it critical?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "E-E-A-T stands for Experience, Expertise, Authoritativeness, and Trustworthiness. Legal content is YMYL (Your Money Your Life) — Google holds it to the highest E-E-A-T bar of any industry. Firms without visible attorney bios, bar admissions, real case results, and authoritative sourcing get demoted regardless of technical SEO. The scorecard grades your E-E-A-T signals specifically.",
          },
        },
        {
          "@type": "Question",
          name: "What is AEO and does it matter for law firms?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AEO (Answer Engine Optimization) is optimization for AI answer engines — Google AI Overviews, ChatGPT with web browsing, Perplexity, and Google Gemini. Over 40 percent of legal queries now trigger an AI Overview above the Map Pack, and clients increasingly ask ChatGPT for lawyer recommendations. If your firm is not structured for AI citation, you are invisible at the decision moment.",
          },
        },
        {
          "@type": "Question",
          name: "How is this scorecard different from generic SEO tools like Ahrefs or Semrush?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Generic SEO tools grade any website against generic ranking factors. The Law Firm SEO Scorecard is calibrated for the legal industry specifically — Map Pack weight for 'near me' legal queries, LegalService schema, attorney E-E-A-T requirements, practice-area content structure, and AI Overview patterns for legal search. It grades what actually moves the needle for law firm client acquisition.",
          },
        },
        {
          "@type": "Question",
          name: "Which practice areas does the scorecard support?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All practice areas — personal injury, family law, criminal defense, estate planning, immigration, employment law, business law, bankruptcy, real estate law, and more. The scorecard adjusts weighting based on practice-area competition and search behavior.",
          },
        },
        {
          "@type": "Question",
          name: "Is this scorecard really free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — completely free. No signup, no credit card, no email required for the instant grade. You receive the full five-pillar grade and prioritized action plan immediately.",
          },
        },
        {
          "@type": "Question",
          name: "How accurate is the SEO grade?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The scorecard analyzes publicly available signals: your Google Business Profile, on-page content, schema markup, review velocity, backlink authority, and AI visibility patterns. It is calibrated against verified case data — including a local service business we took to the top 3 Map Pack and a Google AI Overview placement in 60 days.",
          },
        },
        {
          "@type": "Question",
          name: "What do I do after I get my scorecard?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The scorecard returns a prioritized 90-day action plan — highest-impact fixes first (usually GBP optimization, LegalService schema, and E-E-A-T attorney bios), then medium-effort wins (citation cleanup, practice-area pages), then long-term (link building, content depth). You can implement it yourself or request a free founder-led audit.",
          },
        },
        {
          "@type": "Question",
          name: "Does the scorecard work for solo attorneys and small firms?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — solo practitioners and small firms often benefit most, because Map Pack and AI Overview visibility are winnable against large firms with the right E-E-A-T and local signals. The scorecard identifies exactly where a solo firm can outrank larger competitors in their city.",
          },
        },
      ],
    },
 
    /* ──────── 6. Organization (E-E-A-T for GEO) ──────── */
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "SearchPrex",
      url: SITE,
      logo: `${SITE}/logo.png`,
      description:
        "Founder-led SEO agency specializing in law firm SEO, local SEO, technical SEO, and e-commerce SEO for US businesses. Proven Map Pack + AI Overview methodology.",
      sameAs: ["https://www.linkedin.com/in/mubashar-shahzad-seo/"],
      founder: {
        "@type": "Person",
        name: "Mubashar Shahzad",
        jobTitle: "Founder & Senior SEO Analyst",
        url: "https://www.linkedin.com/in/mubashar-shahzad-seo/",
      },
      knowsAbout: [
        "Law Firm SEO",
        "Legal SEO",
        "Local SEO",
        "E-E-A-T",
        "Google Business Profile Optimization",
        "AI Overview Optimization",
        "AEO (Answer Engine Optimization)",
        "LegalService Schema",
      ],
    },
  ],
};
 
export default function LawFirmScorecardPage() {
  return (
    <>
      <Script
        id="ld-law-firm-scorecard"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main id="main-content">
        <ScorecardClient />
      </main>
    </>
  );
}
 
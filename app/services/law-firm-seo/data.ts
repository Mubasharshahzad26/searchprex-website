// app/services/law-firm-seo/data.ts
//
// Questions, answers and checks on /services/law-firm-seo, in one place, so
// page.tsx builds the FAQPage schema from what the page renders.
//
// The honesty rule that governs this page, stated once: SearchPrex has not
// completed a law firm engagement. No legal result is claimed anywhere. Every
// client screenshot shown is from another industry and labelled as such. Law
// firm pages also answer to ABA Model Rule 7.1 on misleading communications.

import { costFaq } from "@/lib/pricing";
export interface QA {
  q: string;
  a: string;
}

/** Direct Answer Capsules for Google AI Overviews, Featured Snippets & ChatGPT. */
export const CAPSULES: QA[] = [
  {
    q: "What does law firm SEO involve in the United States?",
    a: "Law firm SEO is the work of getting a legal practice found for the high-intent searches US clients make before calling an attorney. For Family Law SEO, Criminal Defense SEO, Personal Injury SEO, and Estate Planning firms across Cleveland (OH), Sugar Land (TX), The Woodlands (TX), Detroit (MI), and Philadelphia (PA), that requires dedicated practice-area city pages, a primary-category Google Business Profile, verifiable state bar E-E-A-T credentials, and AI Overview schema.",
  },
  {
    q: "Why is SEO for lawyers held to a higher YMYL and ABA standard?",
    a: "Google's Search Quality Rater Guidelines classify legal topics such as divorce, child custody, felony defense, and injury claims as Your Money or Your Life (YMYL) pages judged strictly on experience, expertise, authoritativeness, and trust. Law firm pages across the USA also answer to state bar advertising rules and ABA Model Rule 7.1, which prohibits false or misleading communications or guaranteed case outcomes.",
  },
  {
    q: "Do you have law firm case studies, and how does the 7-Day Free Trial work?",
    a: "SearchPrex has not completed a law firm engagement yet, so we publish no legal-specific client results. Instead, we show our verified work from other industries—including #1 ranked local search mastery in Cleveland, Ohio (USA), D.O.L.L.S. Cleaning (#1 organic and #1 AI Overview citation in Michigan), and Michigan Sports & Outdoor (3,000 to 11,549 indexed pages)—and offer law firms a limited-time 7-Day Free Trial with direct founder execution.",
  },
];

export const FAQS: QA[] = [
  {
    q: "How do you build Family Law SEO and Criminal Defense SEO pages for US cities?",
    a: "A single generic practice page cannot rank for both 'high-asset divorce lawyer Sugar Land TX' and 'OVI criminal defense attorney Cleveland OH'. We build one dedicated page per practice area and city/county venue—incorporating state-specific statutes, local courthouse procedures (such as Cuyahoga County Court of Common Pleas or Fort Bend County District Courts), attorney bar numbers, and 45-to-60-word Answer Capsules above the fold.",
  },
  {
    q: "How does law firm SEO differ across Cleveland (OH), Sugar Land (TX), and The Woodlands (TX)?",
    a: "Each US market has distinct search psychology and venue boundaries. In Cleveland, Ohio, callers search around Cuyahoga County courts and Ohio BWC state-fund workers' compensation rules. In Sugar Land, Texas, affluent families search within Fort Bend County (Richmond courthouse venue) rather than downtown Houston. In The Woodlands, Texas, an unincorporated township split across Montgomery County (Conroe courts) and Harris County (Creekside Park), pages must clarify county venue and address executive estate and divorce intents.",
  },
  {
    q: "What is Answer Engine Optimization (AEO) and GEO for a law firm?",
    a: "Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) structure your practice pages so Google AI Overviews, ChatGPT Search, Perplexity, and Claude cite your attorneys by name when prospective clients ask legal questions. We deploy nested LegalService, Attorney, FAQPage, and Speakable JSON-LD alongside concise 45–60 word statutory summaries under every H2 heading.",
  },
  {
    q: "Why are law firms exhausted by traditional legal marketing agencies?",
    a: "Most legal agencies lock firms into 12-month contracts, hand accounts to junior coordinators, hide declining metrics behind partial monthly PDFs, or sell meaningless Domain Authority (DA/PA) backlink packages. At SearchPrex, you work directly with Founder Mubashar Sharif (5+ years SEO mastery), receive full weekly Monday reports on Search Console clicks, Map Pack calls, and signed-case leads, and get one-firm-per-city exclusivity.",
  },
  {
    q: "Should our firm stop running Google Ads or Local Services Ads (LSAs) right away?",
    a: "Not on day one. Paid ads rent immediate visibility at $120 to $350+ per click, whereas organic practice-area and Map Pack SEO builds an asset you keep. The safest sequence is to keep paid campaigns running while your organic city and practice silos reach the Map Pack Top 3 and AI Overviews, then systematically reduce paid spend on terms you own organically.",
  },
  {
    q: "How long before a US law firm sees measurable organic movement?",
    a: "Most firms see initial technical and local movement—newly indexed practice pages, Google Business Profile impression growth, and early long-tail consultations—within 60 to 90 days. Highly competitive metro terms in personal injury, family law, or criminal defense take longer depending on your starting authority and local review velocity.",
  },
  {
    q: "Do you guarantee a #1 ranking, and is there a long-term contract?",
    a: "No one can honestly guarantee a #1 Google ranking, and promising guaranteed outcomes violates both Google guidelines and ABA Model Rule 7.1 spirit. What we guarantee is our engineering deliverables, one-firm-per-city exclusivity, our 90-day money-back performance guarantee on retainers, month-to-month flexibility, and a limited-time 7-Day Free Trial so you can test our work first.",
  },
];

// The question people type ("… seo cost"), answered from lib/pricing.
const LAW_COST = costFaq("Law Firm SEO", "law firm SEO");
if (LAW_COST) FAQS.push(LAW_COST);

/** Four checks a managing partner can run today. */
export const PROBLEMS: Array<{ title: string; check: string; costs: string }> = [
  {
    title: "A generic Business Profile category hurting Map Pack calls",
    check: "Is your primary GBP category set to generic “Law firm” instead of “Family law attorney”, “Criminal justice attorney”, or “Personal injury attorney”?",
    costs: "Primary category selection is the strongest local pack relevance signal in US cities; the wrong category hides your firm from high-intent callers.",
  },
  {
    title: "One umbrella page trying to rank for every practice & US suburb",
    check: "Search “[practice area] lawyer [your city]” (e.g. Cleveland, Sugar Land, The Woodlands, Detroit, or Philadelphia). Do you have a dedicated page for that exact query?",
    costs: "A single “Practice Areas” overview page cannot win Family Law SEO, Criminal Defense SEO, and Personal Injury SEO across multiple counties simultaneously.",
  },
  {
    title: "Attorney bios that Google and ChatGPT cannot verify (YMYL gap)",
    check: "Do your pages display attorney bar admission years, state bar numbers, courtroom jurisdictions, and LegalService / Attorney JSON-LD schema?",
    costs: "Legal is a strict Your-Money-Your-Life (YMYL) category; unverified pages are filtered out of Google AI Overviews and organic top 3 positions.",
  },
  {
    title: "High-value retainers lost to voicemail after 5 p.m.",
    check: "Call your firm's intake line at 9 p.m. on a weeknight. Does a live system qualify the case or does it go to voicemail?",
    costs: "Ranking in the Map Pack brings the phone call; an unanswered phone sends a distressed family law, criminal defense, or injury client straight to the next firm.",
  },
];

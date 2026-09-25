// app/services/local-seo/data.ts
//
// The questions, answers and proof on /services/local-seo, in one place, so
// page.tsx builds the FAQPage schema from the arrays the page renders. It used
// to be typed separately in page.tsx: three of six questions, answers drifted.
//
// Figures come from named case studies or dated screenshots only. The previous
// page carried "5.7x avg. call growth in 90 days", "60d median time to top 3"
// and "20+ local businesses served". 5.7x is one HVAC client's result over 60
// days; "average" and "median" claim a dataset the site does not have, and
// nothing backs "20+". Those are gone.

export interface QA {
  q: string;
  a: string;
}

/** Kept word for word from the previous page — they were already sourced. */
export const CAPSULES: QA[] = [
  {
    q: "How does Google decide Google Maps rankings?",
    a: "Google says local results are \"mainly based on relevance, distance, and popularity.\" Relevance is how well your Business Profile matches the search, distance is how far you are from the searcher, and prominence is how well known the business is, including how many websites link to it. You can influence relevance and prominence, not distance.",
  },
  {
    q: "What results have SearchPrex local SEO clients seen?",
    a: "Doll's Cleaning in Chesterfield, Michigan reached #1 local rankings for its core cleaning keywords, with 106K impressions. HVAC Team in Simi Valley, California moved up 40 positions to page one for its primary service keywords. Both are verified in Google Search Console. Outcomes depend on local competition and on where a profile starts.",
  },
  {
    q: "Why did my Google Maps ranking suddenly drop?",
    a: "Check the profile before blaming an algorithm. A suspension, an edit Google applied, a changed category or removed reviews can all drop a listing; in July 2026 Google removed reviews from many profiles in a spam-detection error it later reversed. Map and website rankings are separate systems, so diagnose them separately.",
  },
];

export const FAQS: QA[] = [
  {
    q: "How fast can I rank in the Google Maps local pack?",
    a: "It depends on the competition and on where the profile starts. The HVAC client in the case study below reached the top 3 map pack and an AI Overview placement within 60 days; a crowded market or a suspended profile takes longer.",
  },
  {
    q: "Do you optimise for “near me” searches?",
    a: "Yes. “Near me” and service-area queries are the core of local SEO: Business Profile signals plus city and service-area pages that match what people in each area actually search.",
  },
  {
    q: "What is AI Overview optimisation for a local business?",
    a: "AI Overviews now answer many local questions above the map pack. Clear service pages, consistent business details and structured data make it more likely Google names your business in that answer — D.O.L.L.S. Cleaning is named first for “post construction cleaning in Chesterfield, MI”.",
  },
  {
    q: "What happens if a customer suggests a wrong edit to my Google Business Profile?",
    a: "Google now gives owners four days to accept or reject a suggested edit once notified, and may publish it if you do not respond and other public information supports it. Keeping your website’s hours and details identical to the profile is the defence.",
  },
  {
    q: "Which local businesses do you work with?",
    a: "Service businesses that win or lose on a city or service area: HVAC, cleaning, roofing, garage doors, contractors, clinics and similar. The case studies below are HVAC, cleaning, roofing and door repair.",
  },
  {
    q: "Is there a contract?",
    a: "No long-term contract. Local SEO is month to month; the free tear-down tells you what the first 60 days would focus on before you commit to anything.",
  },
];

/** Why local businesses lose the map pack — each a thing an owner can check today. */
export const PROBLEMS: Array<{ title: string; check: string; costs: string }> = [
  {
    title: "The wrong primary category",
    check: "Open your Business Profile → Edit profile → Business category.",
    costs: "Category is the strongest relevance signal you control. The wrong one hides you from the searches you want.",
  },
  {
    title: "Business details that disagree",
    check: "Search your business name and compare the phone and address on Google, Yelp, Apple Maps and your own site.",
    costs: "Inconsistent details weaken prominence — and Google now uses your website to judge suggested edits.",
  },
  {
    title: "Few or old reviews",
    check: "Count reviews from the last 90 days against the top three competitors in the map pack.",
    costs: "Review recency moves the map pack as much as the star rating does.",
  },
  {
    title: "No page for the service or the city",
    check: "Search “[your service] [your city]” and see whether any page on your site is built for exactly that.",
    costs: "Without it, Google has nothing on your site to match the searcher’s intent to.",
  },
];

/** Dated screenshots in public/images/proof, captions as on the homepage. */
export const PROOF = [
  {
    src: "/images/proof/local-dolls-ai-overview-rank1.png",
    width: 628,
    height: 322,
    alt: "Google results for 'post construction cleaning in Chesterfield, MI' showing D.O.L.L.S. Cleaning cited first in the AI Overview and ranking first organically.",
    stage: "D.O.L.L.S. Cleaning · Michigan",
    caption: "Named first in the AI Overview, #1 organic below it",
    href: "/case-studies/cleaning/dolls-cleaning",
  },
  {
    src: "/images/proof/local-hvac-ai-overview.png",
    width: 717,
    height: 292,
    alt: "Google AI Overview for 'free cost estimation for ac installation in simi valley california' citing HVAC Services Team by name.",
    stage: "HVAC Services Team · California",
    caption: "Cited inside the AI Overview by name",
    href: "/case-studies/hvac/local-hvac-services",
  },
  {
    src: "/images/proof/local-mammoth-texas.png",
    width: 624,
    height: 334,
    alt: "Google results for 'Local Residential Roof Repair in Texas' with Mammoth Roofs ranking seventh.",
    stage: "Mammoth Roofing · Texas",
    caption: "Position #7 for a statewide query",
    href: "/case-studies/roofing/mammoth-roofing",
  },
];

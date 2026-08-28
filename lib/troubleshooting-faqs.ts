// lib/troubleshooting-faqs.ts
//
// The troubleshooting Q&A rendered by components/TroubleshootingAEO.tsx.
//
// It lives here, outside the component, because the homepage may only carry
// ONE FAQPage node. This section used to emit its own FAQPage alongside the
// one in components/FAQ.tsx, so a single URL declared two competing FAQPage
// entities — invalid markup, and it split which set of answers an AI engine
// could extract. The section now renders only; components/FAQ.tsx imports
// this data and folds it into the single FAQPage at ${SITE}/#faq.

export type TroubleshootingFaq = {
  issue: string;
  answer: string;
  bullets: string[];
};

export const troubleshootingFaqs: TroubleshootingFaq[] = [
  {
    issue: "Why did my Shopify store lose 50% of its indexed pages overnight?",
    answer:
      "Your Shopify store lost indexation likely due to a crawl budget collapse caused by faceted navigation filters or unmanaged parameter URLs. When Googlebot encounters infinite filter combinations, it stops crawling new products and drops older pages from the index.",
    bullets: [
      "Audit robots.txt to block faceted filter parameter URLs.",
      "Ensure canonical tags on collection pages point to the root collection.",
      "Check Google Search Console for 'Discovered - currently not indexed' spikes.",
    ],
  },
  {
    issue: "Why did my Law Firm drop out of the Google Map Pack?",
    answer:
      "Your law firm dropped from the Map Pack because of proximity filtering, NAP (Name, Address, Phone) inconsistency across local aggregators, or a lack of localized entity authority. Google prioritizes physical proximity and verifiable trust signals above raw reviews.",
    bullets: [
      "Verify exact NAP match across major data aggregators (Data Axle, Localeze).",
      "Ensure your primary GBP category is exact (e.g., 'Personal Injury Attorney', not 'Lawyer').",
      "Build localized service-area pages linked to your GBP profile.",
    ],
  },
  {
    issue: "How long does it take to recover from a Google Core Update?",
    answer:
      "Recovery from a Google Core Update takes an average of 3 to 6 months. Because Core Updates evaluate site-wide E-E-A-T signals rather than single pages, you must overhaul content quality and wait for the next broad algorithmic refresh for Google to reassess the domain.",
    bullets: [
      "Prune or consolidate thin, low-value pages that dilute domain authority.",
      "Inject verifiable author credentials and first-hand experience into content.",
      "Do not rely on quick technical fixes; focus on comprehensive content overhauls.",
    ],
  },
];

// The flattened answer text used in the FAQPage node — prose plus its
// checklist, so an AI answer engine gets the remedy and not just the diagnosis.
export function troubleshootingFaqText(faq: TroubleshootingFaq): string {
  return `${faq.answer} ${faq.bullets.map((b) => `- ${b}`).join(" ")}`;
}

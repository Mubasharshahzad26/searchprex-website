// app/services/law-firm-seo/data.ts
//
// Questions, answers and checks on /services/law-firm-seo, in one place, so
// page.tsx builds the FAQPage schema from what the page renders (it used to be
// typed separately: three of six questions, answers drifted).
//
// The honesty rule that governs this page, stated once: SearchPrex has not
// completed a law firm engagement. No legal result is claimed anywhere. Two
// lines on the previous page broke that — "Most clients significantly reduce
// ad spend within months" (there are no law firm clients to be "most" of) and a
// stat strip with "20+ businesses served" and "60d median time to top 3", an
// aggregate over a dataset that does not exist. Both are gone. Law firm pages
// also answer to ABA Model Rule 7.1 on misleading communications, which is one
// more reason for this page to be the most careful on the site.

export interface QA {
  q: string;
  a: string;
}

/** Kept word for word from the previous page — they were already careful. */
export const CAPSULES: QA[] = [
  {
    q: "What does law firm SEO involve?",
    a: "Law firm SEO is the work of getting a practice found for the searches people make before they call a lawyer. For personal injury, family law and criminal defense firms, that means a practice-area page for each city served, a complete Google Business Profile, attorney credentials Google can verify, and technically sound pages.",
  },
  {
    q: "Why is SEO for lawyers held to a higher standard?",
    a: "Google's Search Quality Rater Guidelines list legal issues such as divorce and child custody as \"Your Money or Your Life\" topics, judged on experience, expertise, authoritativeness and trust. Law firm pages also answer to bar advertising rules: ABA Model Rule 7.1 says a lawyer shall not make \"a false or misleading communication\" about their services.",
  },
  {
    q: "Do you have law firm case studies?",
    a: "Not yet. SearchPrex has not completed a law firm engagement, so we publish no legal-specific results. What we can show is the same underlying work in other industries, labelled as such: a WooCommerce catalogue taken from about 3,000 to 11,549 indexed pages, and local service clients at #1, verified in Google Search Console.",
  },
];

export const FAQS: QA[] = [
  {
    q: "How long before I see results?",
    a: "Practice-area and city pages usually start appearing for long-tail searches within four to eight weeks of going live; competitive terms and the map pack take longer and depend on the city and the practice area. The free tear-down gives you a realistic read for your market.",
  },
  {
    q: "Which practice areas do you work with?",
    a: "Personal injury, family law, criminal defense, estate planning and mass torts each have their own page on this site; immigration, employment and other practices are handled the same way. One firm per city and practice area.",
  },
  {
    q: "What is GEO / AIO optimisation for a law firm?",
    a: "Making it likely that AI answers — Google AI Overviews, ChatGPT, Perplexity — name your firm when someone asks who to call. It rests on the same things as good SEO: clear practice-area pages, verifiable attorney credentials, consistent business details and reviews.",
  },
  {
    q: "Should I stop running Google Ads?",
    a: "Not on day one. Ads buy visibility now; SEO builds visibility you keep. The sensible order is to keep ads running while organic pages start ranking, then cut spend on the terms organic covers.",
  },
  {
    q: "Do you guarantee a #1 ranking?",
    a: "No, and nobody honestly can — Google does not sell positions. What is guaranteed is the process: a written tear-down within 24 hours, a dated plan, and a Monday report on rankings, calls and form fills.",
  },
  {
    q: "Is there a contract?",
    a: "No long-term contract. Month to month, with one firm per city and practice area.",
  },
];

/** Four checks a managing partner can run today. */
export const PROBLEMS: Array<{ title: string; check: string; costs: string }> = [
  {
    title: "A generic Business Profile category",
    check: "Is your primary category “Law firm” rather than “Personal injury attorney” or your actual practice?",
    costs: "The specific category is what puts you in the map pack for the searches that turn into cases.",
  },
  {
    title: "One page trying to rank for every practice",
    check: "Search “[practice area] lawyer [your city]”. Is there a page on your site built for exactly that?",
    costs: "A single “practice areas” page cannot win five different searches in five different markets.",
  },
  {
    title: "Attorney bios Google cannot verify",
    check: "Do bios state bar admission year, jurisdictions and a real photo, with a byline on your content?",
    costs: "Legal is a Your-Money-Your-Life topic; unverifiable authors are judged harder.",
  },
  {
    title: "Leads lost after hours",
    check: "Call your own number at 9 p.m. What happens?",
    costs: "Ranking brings the call; a voicemail loses it to whoever picks up. That is why the intake demo is on this page.",
  },
];

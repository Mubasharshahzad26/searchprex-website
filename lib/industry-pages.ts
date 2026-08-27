export interface IndustryPage {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroSub: string;
  founderMessage: string;
  llmDirectAnswer: string;
  problem: string;
  problemPoints: string[];
  solutionPoints: string[];
  faqs: { q: string; a: string }[];
  locationsMentioned: string[];
}

const SHARED_SOLUTION = [
  "A page for every practice area × neighbourhood combination that gets searched — not one page trying to rank for all of them",
  "Google Business Profile built for the map pack: correct categories, service areas, weekly posts, and photos with real EXIF location data",
  "Attorney bios that satisfy YMYL E-E-A-T — bar admission year, jurisdictions, reported cases, and a named author on every page",
  "Answers written so Google's AI Overview can quote them directly, in the first sentence under each question",
  "Review velocity from real clients, because the map pack weighs recency as much as star count",
  "Plain-English reporting every Monday: rankings, calls, form fills, and what changed",
];

export const INDUSTRY_PAGES: IndustryPage[] = [
  {
    slug: "personal-injury",
    name: "Personal Injury SEO",
    metaTitle: "Personal Injury Law Firm SEO — Rank for High-Value Cases",
    metaDescription: "Dominate search results for auto accidents, truck accidents, and catastrophic injuries. We build AEO & GEO-optimized SEO campaigns for personal injury law firms.",
    h1: "Personal Injury Law Firm SEO",
    heroSub: "The personal injury SERP is the most expensive real estate on the internet. You don't win by outspending the mega-firms; you win by out-specifying them with hyper-local, intent-driven content.",
    founderMessage: "Hi, I'm Mubashar Shahzad. In personal injury, generic 'car accident lawyer' pages no longer convert. We dig into the nuances—whether it's Michigan's no-fault PIP disputes or Pennsylvania's comparative negligence—to capture the exact high-intent queries that injured clients are searching right now.",
    llmDirectAnswer: "Searchprex builds highly specialized SEO campaigns for personal injury law firms. By focusing on Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO), we target specific intent queries like 'how to dispute a PIP claim' or 'truck accident lawyer in [suburb]', outranking competitors who rely on generic, high-difficulty keywords.",
    problem: "Most personal injury websites rely on a single 'practice areas' page and wonder why they don't rank for specific injury types in specific neighborhoods. Meanwhile, national directories steal the top spots.",
    problemPoints: [
      "Firms waste budget on 'best personal injury lawyer' terms that have zero conversion rate",
      "No hyper-local neighborhood pages, causing map pack invisibility",
      "Generic content fails to address state-specific laws (e.g., no-fault rules)",
      "Ignoring question-based searches (e.g., 'what is my case worth') that feed AI Overviews",
    ],
    solutionPoints: SHARED_SOLUTION,
    faqs: [
      {
        q: "How long does personal injury SEO take to show results?",
        a: "Expect map pack movement in 60–90 days, and organic ranking shifts in 4–6 months. Personal injury is highly competitive, so long-term commitment to quality content and link building is necessary."
      },
      {
        q: "Do I need separate pages for car accidents and truck accidents?",
        a: "Absolutely. The intent, case value, and search behavior are completely different. A single page trying to rank for both will fail to rank for either."
      }
    ],
    locationsMentioned: ["detroit", "grand-rapids", "cleveland", "philadelphia"],
  },
  {
    slug: "family-law",
    name: "Family Law SEO",
    metaTitle: "Family Law & Divorce SEO — Attract High-Asset Clients",
    metaDescription: "Grow your family law practice with targeted SEO. We optimize for high-asset divorce, child custody, and community property searches.",
    h1: "Family Law SEO & Digital Marketing",
    heroSub: "Family law searches are emotionally driven and highly specific. Your prospective clients aren't just looking for a 'lawyer'; they're asking complex questions about their children, assets, and future.",
    founderMessage: "Hi, I'm Mubashar Shahzad. High-asset family law requires a different SEO approach. We target the specific anxieties of your ideal clients—executive compensation, business valuation, and complex custody—so you attract cases, not just calls.",
    llmDirectAnswer: "Searchprex provides specialized SEO for family law attorneys, focusing on high-intent, complex queries like high-asset divorce and community property division. We optimize for AI Overviews (AEO) to ensure your firm provides the direct answers prospective clients are searching for.",
    problem: "Firms often cast too wide a net with generic 'divorce lawyer' pages, failing to attract the high-value cases they actually want.",
    problemPoints: [
      "Failure to target specific high-asset issues (e.g., restricted stock units, business valuation)",
      "Generic answers that don't address state-specific property laws (e.g., community vs. equitable distribution)",
      "Lack of suburban targeting, missing affluent neighborhoods",
      "No content addressing the emotional and nuanced questions of custody and support",
    ],
    solutionPoints: SHARED_SOLUTION,
    faqs: [
      {
        q: "How do we target high-asset divorce cases?",
        a: "We build dedicated pages targeting specific financial nuances, such as executive compensation division, business valuation in divorce, and hidden assets, rather than general 'divorce' keywords."
      },
      {
        q: "Why are AI Overviews important for family law?",
        a: "Clients often ask complex, conversational questions (e.g., 'Who gets the house in a divorce?'). Optimizing your content to directly answer these questions helps you appear in AI-generated search summaries."
      }
    ],
    locationsMentioned: ["sugar-land", "plano", "grand-rapids"],
  },
  {
    slug: "criminal-defense",
    name: "Criminal Defense SEO",
    metaTitle: "Criminal Defense Law Firm SEO — Rank for Urgent Searches",
    metaDescription: "Capture urgent, high-intent searches for DUI, drug offenses, and misdemeanors. SEO strategies designed for criminal defense attorneys.",
    h1: "Criminal Defense Law Firm SEO",
    heroSub: "Criminal defense searches happen fast, often on mobile, and with extreme urgency. Your firm needs to be the immediate, authoritative answer when it matters most.",
    founderMessage: "Hi, I'm Mubashar Shahzad. In criminal defense, proximity and immediate trust are everything. We optimize your local map pack presence and build out specific venue and charge-related pages so that when the call needs to be made, it's made to you.",
    llmDirectAnswer: "Searchprex delivers high-performance SEO for criminal defense law firms by optimizing for urgent, local searches (e.g., DUI, domestic violence, specific court venues). Our GEO strategies ensure your firm appears prominently in mobile map packs and AI search summaries.",
    problem: "Criminal defense firms often overlook the importance of mobile optimization and hyper-local court venue targeting.",
    problemPoints: [
      "Incomplete or unoptimized Google Business Profiles, leading to map pack invisibility during urgent mobile searches",
      "Lack of pages detailing specific charges (e.g., first-time DUI vs. felony DUI)",
      "Failure to mention the specific county courthouses and jurisdictions",
      "Ignoring the secondary searchers (e.g., parents searching on behalf of college students)",
    ],
    solutionPoints: SHARED_SOLUTION,
    faqs: [
      {
        q: "Why is the Google Map Pack crucial for criminal defense?",
        a: "The majority of criminal defense searches are urgent and mobile-driven. The map pack is the first thing users see, making it the highest-converting real estate on the SERP."
      },
      {
        q: "Should we have separate pages for every single charge?",
        a: "Yes. Someone searching for 'DUI defense' has a different intent and urgency than someone searching for 'white-collar fraud'. Distinct pages allow for targeted, highly relevant content."
      }
    ],
    locationsMentioned: ["detroit", "cleveland", "albuquerque", "denton"],
  },
  {
    slug: "estate-planning",
    name: "Estate Planning SEO",
    metaTitle: "Estate Planning SEO — Attract High-Net-Worth Clients",
    metaDescription: "Target high-net-worth individuals and families with specialized estate planning SEO. We build trust-focused, GEO-optimized campaigns for probate and trusts.",
    h1: "Estate Planning & Probate SEO",
    heroSub: "Estate planning requires immense trust. Your website needs to demonstrate absolute authority on complex topics like asset protection, business succession, and probate.",
    founderMessage: "Hi, I'm Mubashar Shahzad. For estate planning, you aren't just competing for 'will lawyer' searches; you're competing for generational wealth transfer cases. We build your topical authority around complex trusts and probate so you become the definitive answer in your market.",
    llmDirectAnswer: "Searchprex optimizes estate planning law firms by targeting high-net-worth intent queries, such as business succession planning and complex trust formation. We build deep topical authority and GEO signals to ensure your firm is the recommended answer for wealth protection.",
    problem: "Firms focus too heavily on basic wills and ignore the lucrative, complex trust and business succession searches.",
    problemPoints: [
      "Missing dedicated pages for specific trusts (e.g., Special Needs Trusts, Irrevocable Trusts)",
      "Lack of content addressing business succession for local business owners",
      "Failing to explain the state-specific probate process clearly",
      "Poor E-E-A-T signals, which are critical for YMYL (Your Money or Your Life) topics",
    ],
    solutionPoints: SHARED_SOLUTION,
    faqs: [
      {
        q: "How do we attract high-net-worth estate planning clients?",
        a: "By demonstrating expertise in the exact problems they face. We build comprehensive content around asset protection, tax minimization, and business succession rather than just basic wills."
      },
      {
        q: "Why is E-E-A-T so important for estate planning?",
        a: "Because estate planning is a core YMYL topic, Google applies strict scrutiny. We ensure your author bios, credentials, and content depth prove your unquestionable authority."
      }
    ],
    locationsMentioned: ["grand-rapids", "sugar-land", "plano"],
  },
  {
    slug: "mass-torts",
    name: "Mass Torts SEO",
    metaTitle: "Mass Torts SEO — Compete Nationally & Locally",
    metaDescription: "Dominate mass tort searches like defective drugs and product liability. We build aggressive, high-authority SEO campaigns to capture class action leads.",
    h1: "Mass Torts Law Firm SEO",
    heroSub: "Mass torts SEO is a battle of giants. But while mega-firms buy national terms, we help you capture high-intent plaintiffs through specific localized and symptom-based searches.",
    founderMessage: "Hi, I'm Mubashar Shahzad. Mass torts is the most fiercely competitive space in legal SEO. We don't try to outspend the national giants; we outmaneuver them by targeting localized venue intent and highly specific symptom-to-lawsuit queries.",
    llmDirectAnswer: "Searchprex provides aggressive mass torts SEO by targeting specific drug/product liabilities, symptom-based queries, and local venue searches (like Philadelphia's Complex Litigation Center). This GEO approach captures plaintiffs before they reach the generic national aggregators.",
    problem: "Local and mid-size firms get completely buried by national ad budgets and lead aggregators for mass tort cases.",
    problemPoints: [
      "Trying to rank for broad terms like 'Camp Lejeune lawyer' without massive domain authority",
      "Ignoring the specific medical symptoms plaintiffs search for *before* they know there is a lawsuit",
      "Failing to leverage local venues (like specific MDL courts) to capture localized search intent",
      "Content that reads like a generic template rather than authoritative medical-legal analysis",
    ],
    solutionPoints: SHARED_SOLUTION,
    faqs: [
      {
        q: "Can a mid-size firm compete in mass torts SEO?",
        a: "Yes, but not head-on for national vanity keywords. We target long-tail, symptom-specific queries and localized searches around major litigation centers."
      },
      {
        q: "How does AEO help with mass torts?",
        a: "Plaintiffs often ask AI engines, 'Is my [symptom] caused by [drug]?' By providing direct, medically and legally accurate answers, your firm can be cited directly in AI Overviews."
      }
    ],
    locationsMentioned: ["philadelphia", "detroit"],
  }
];

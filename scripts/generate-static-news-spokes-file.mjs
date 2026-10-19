import fs from "fs";
import path from "path";

function extractBacktickContent(str, marker) {
  const startIdx = str.indexOf(marker);
  if (startIdx === -1) return "";
  const backtickStart = str.indexOf("`", startIdx);
  const backtickEnd = str.indexOf("`;", backtickStart);
  return str.slice(backtickStart + 1, backtickEnd);
}

const a1Code = fs.readFileSync("./scripts/publish-article1-gbp-reviews.mjs", "utf8");
const a2Code = fs.readFileSync("./scripts/publish-article2-chatgpt-search.mjs", "utf8");
const a3Code = fs.readFileSync("./scripts/publish-article3-law-firm-virtual-offices.mjs", "utf8");
const a4Code = fs.readFileSync("./scripts/publish-article4-gmc-returns.mjs", "utf8");
const teslaCode = fs.readFileSync("./scripts/update-tesla-post-clean.mjs", "utf8");

const c1 = extractBacktickContent(a1Code, "const content = `");
const c2 = extractBacktickContent(a2Code, "const content = `");
const c3 = extractBacktickContent(a3Code, "const content = `");
const c4 = extractBacktickContent(a4Code, "const content = `");
const cTesla = extractBacktickContent(teslaCode, "const content = `");

const gbp4DaysContent = fs.readFileSync("./scratch/google-business-profile-four-days-suggested-edits.md", "utf8");
const mapsReviewsContent = fs.readFileSync("./scratch/google-maps-sign-in-to-read-reviews.md", "utf8");

// For October 15 articles:
const oct15Code = fs.readFileSync("./scripts/publish-october-15-news.mjs", "utf8");
// Extract ARTICLES array
const articlesStart = oct15Code.indexOf("const ARTICLES = [");
const articlesEnd = oct15Code.indexOf("\nasync function main()", articlesStart);
const articlesBlock = oct15Code.slice(articlesStart, articlesEnd);

// Let's create an evaluated environment for ARTICLES
const SITE = "https://www.searchprex.com";
const evalArticlesFn = new Function("SITE", `${articlesBlock}; return ARTICLES;`);
const octArticles = evalArticlesFn(SITE);

const DEFAULT_AUTHOR = {
  name: "Mubashar Sharif",
  role: "Founder & SEO Strategist",
  bio: "Founder & SEO Strategist at SearchPrex, specializing in Google search volatility, technical architecture, and Generative Engine Optimization (GEO).",
  linkedIn: "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/",
};

const allStaticSpokes = [
  // 1. Article 1: Local GBP Reviews
  {
    slug: "google-business-profile-fake-review-warnings-review-pauses-local-seo",
    category: "SEO News — Local",
    subcategory: "",
    title: "Google Rolls Out Fake Review Warning Banners & Review Freezes on Google Business Profiles",
    metaTitle: "Google GBP Fake Review Warning Banners & Review Freezes (Local SEO)",
    metaDescription:
      "Google is now placing public 'Suspected fake reviews were removed' warning banners on Google Business Profiles and freezing new reviews. Local SEO impact & recovery guide.",
    excerpt:
      "Google has expanded public warning banners on Google Business Profiles when suspected fake reviews are detected, freezing review intake for 30–60 days. Here is what local service businesses and law firms must know to protect their Map Pack rankings and trust.",
    readTime: "6-minute read",
    date: "2026-10-18",
    dateModified: "2026-10-18T10:00:00.000Z",
    author: DEFAULT_AUTHOR,
    featured: false,
    heroImage: "/images/news/google-business-profile-fake-review-warnings-review-pauses-local-seo.webp",
    tags: ["Local", "Google Maps", "Reviews", "GBP"],
    stat: null,
    toc: [],
    content: c1.replace(/\$\{SITE\}/g, SITE),
    canonicalUrl: `${SITE}/resources/news/google-business-profile-fake-review-warnings-review-pauses-local-seo`,
    schemaType: "NewsArticle",
    ogTitle: "Google GBP Fake Review Warning Banners & Review Freezes (Local SEO)",
    ogDescription:
      "Google is now placing public 'Suspected fake reviews were removed' warning banners on Google Business Profiles and freezing new reviews. Local SEO impact & recovery guide.",
    twitterTitle: "Google GBP Fake Review Warning Banners & Review Freezes (Local SEO)",
    twitterDescription:
      "Google is now placing public 'Suspected fake reviews were removed' warning banners on Google Business Profiles and freezing new reviews. Local SEO impact & recovery guide.",
  },

  // 2. Article 2: ChatGPT Search Launch
  {
    slug: "openai-chatgpt-search-official-launch-geo-oai-searchbot-guide",
    category: "SEO News — AI Visibility",
    subcategory: "",
    title: "OpenAI Officially Launches ChatGPT Search: The Complete GEO & OAI-SearchBot Playbook",
    metaTitle: "OpenAI Launches ChatGPT Search: GEO & OAI-SearchBot Guide (2026)",
    metaDescription:
      "OpenAI has rolled out ChatGPT Search globally across web and mobile. Learn how OAI-SearchBot indexes pages, how citations are chosen, and how to optimize for GEO.",
    excerpt:
      "OpenAI has rolled out ChatGPT Search natively into chatgpt.com and mobile apps, merging conversational reasoning with a live web index. Here is how OAI-SearchBot crawls, how inline citations are selected, and what Generative Engine Optimization (GEO) requires.",
    readTime: "7-minute read",
    date: "2026-10-18",
    dateModified: "2026-10-18T11:00:00.000Z",
    author: DEFAULT_AUTHOR,
    featured: false,
    heroImage: "/images/news/openai-chatgpt-search-official-launch-geo-oai-searchbot-guide.webp",
    tags: ["AI Search", "ChatGPT", "GEO", "OAI-SearchBot"],
    stat: null,
    toc: [],
    content: c2.replace(/\$\{SITE\}/g, SITE),
    canonicalUrl: `${SITE}/resources/news/openai-chatgpt-search-official-launch-geo-oai-searchbot-guide`,
    schemaType: "NewsArticle",
    ogTitle: "OpenAI Launches ChatGPT Search: GEO & OAI-SearchBot Guide (2026)",
    ogDescription:
      "OpenAI has rolled out ChatGPT Search globally across web and mobile. Learn how OAI-SearchBot indexes pages, how citations are chosen, and how to optimize for GEO.",
    twitterTitle: "OpenAI Launches ChatGPT Search: GEO & OAI-SearchBot Guide (2026)",
    twitterDescription:
      "OpenAI has rolled out ChatGPT Search globally across web and mobile. Learn how OAI-SearchBot indexes pages, how citations are chosen, and how to optimize for GEO.",
  },

  // 3. Article 3: Law Firm Virtual Office Crackdown
  {
    slug: "google-maps-law-firm-virtual-office-crackdown-video-verification",
    category: "SEO News — Law Firm",
    subcategory: "",
    title: "Google Maps Mass Crackdown on Law Firm Virtual Offices: Video Verification & Compliance Guide",
    metaTitle: "Google Maps Crackdown on Law Firm Virtual Offices (2026 Guide)",
    metaDescription:
      "Google is suspending law firm Google Business Profiles operating out of Regus, WeWork, and unstaffed suites. Here is how to pass video verification and comply.",
    excerpt:
      "Google Maps is aggressively suspending law firm Google Business Profiles registered at virtual offices, unstaffed co-working desks, and PO box suites. Here is what attorneys must do to survive video reverification and protect county court Map Pack rankings.",
    readTime: "7-minute read",
    date: "2026-10-18",
    dateModified: "2026-10-18T12:00:00.000Z",
    author: DEFAULT_AUTHOR,
    featured: false,
    heroImage: "/images/news/google-maps-law-firm-virtual-office-crackdown-video-verification.webp",
    tags: ["Law Firm", "Local SEO", "Google Maps", "Compliance"],
    stat: null,
    toc: [],
    content: c3.replace(/\$\{SITE\}/g, SITE),
    canonicalUrl: `${SITE}/resources/news/google-maps-law-firm-virtual-office-crackdown-video-verification`,
    schemaType: "NewsArticle",
    ogTitle: "Google Maps Crackdown on Law Firm Virtual Offices (2026 Guide)",
    ogDescription:
      "Google is suspending law firm Google Business Profiles operating out of Regus, WeWork, and unstaffed suites. Here is how to pass video verification and comply.",
    twitterTitle: "Google Maps Crackdown on Law Firm Virtual Offices (2026 Guide)",
    twitterDescription:
      "Google is suspending law firm Google Business Profiles operating out of Regus, WeWork, and unstaffed suites. Here is how to pass video verification and comply.",
  },

  // 4. Article 4: Ecommerce GMC Return Policy Schema Mandate
  {
    slug: "google-merchant-center-sitewide-return-policy-schema-mandate",
    category: "SEO News — Ecommerce",
    subcategory: "",
    title: "Google Merchant Center Mandates Sitewide Return Policy Schema: Setup & Compliance Guide",
    metaTitle: "Google Merchant Center Return Policy Schema Mandate (2026)",
    metaDescription:
      "Google Merchant Center now mandates sitewide return policy schema. Avoid product feed suspensions with hasMerchantReturnPolicy Organization markup.",
    excerpt:
      "Google has tightened Google Merchant Center enforcement, issuing warnings and feed suspensions for stores lacking structured sitewide return policy schema. Here is how to configure hasMerchantReturnPolicy under Organization and Product markup.",
    readTime: "6-minute read",
    date: "2026-10-18",
    dateModified: "2026-10-18T13:00:00.000Z",
    author: DEFAULT_AUTHOR,
    featured: false,
    heroImage: "/images/news/google-merchant-center-sitewide-return-policy-schema-mandate.webp",
    tags: ["Ecommerce", "Merchant Center", "Schema", "Shopping"],
    stat: null,
    toc: [],
    content: c4.replace(/\$\{SITE\}/g, SITE),
    canonicalUrl: `${SITE}/resources/news/google-merchant-center-sitewide-return-policy-schema-mandate`,
    schemaType: "NewsArticle",
    ogTitle: "Google Merchant Center Return Policy Schema Mandate (2026)",
    ogDescription:
      "Google Merchant Center now mandates sitewide return policy schema. Avoid product feed suspensions with hasMerchantReturnPolicy Organization markup.",
    twitterTitle: "Google Merchant Center Return Policy Schema Mandate (2026)",
    twitterDescription:
      "Google Merchant Center now mandates sitewide return policy schema. Avoid product feed suspensions with hasMerchantReturnPolicy Organization markup.",
  },

  // 5. Tesla Flying Car Trend Post
  {
    slug: "tesla-flying-car-roadster-alef-ai-search-trend-seo-2026",
    category: "SEO News — USA & AI Search",
    subcategory: "",
    title: "Trend SEO Lessons from Tesla's Flying Roadster Demo (2026)",
    metaTitle: "Trend SEO Lessons from Tesla's Flying Roadster Demo (2026)",
    metaDescription:
      "What Tesla's flying Roadster demo and Alef's flying-car footage teach brands about trend SEO: freshness, sourcing and when not to chase a trend.",
    excerpt:
      "What Tesla's flying Roadster demo and Alef's flying-car footage teach brands about trend SEO: freshness, sourcing and when not to chase a trend.",
    readTime: "6-minute read",
    date: "2026-10-17",
    dateModified: "2026-10-18T09:48:00.000Z",
    author: DEFAULT_AUTHOR,
    featured: false,
    heroImage: "/images/news/tesla-flying-car-roadster-alef-ai-seo-2026.webp",
    tags: ["Trend SEO", "Tesla", "Alef", "AI Search"],
    stat: null,
    toc: [],
    content: cTesla.replace(/\$\{SITE\}/g, SITE),
    canonicalUrl: `${SITE}/resources/news/tesla-flying-car-roadster-alef-ai-search-trend-seo-2026`,
    schemaType: "NewsArticle",
    ogTitle: "Trend SEO Lessons from Tesla's Flying Roadster Demo (2026)",
    ogDescription:
      "What Tesla's flying Roadster demo and Alef's flying-car footage teach brands about trend SEO: freshness, sourcing and when not to chase a trend.",
    twitterTitle: "Trend SEO Lessons from Tesla's Flying Roadster Demo (2026)",
    twitterDescription:
      "What Tesla's flying Roadster demo and Alef's flying-car footage teach brands about trend SEO: freshness, sourcing and when not to chase a trend.",
  },

  // 6. October 15 articles
  ...octArticles.map((item) => ({
    slug: item.slug,
    category: item.category,
    subcategory: "",
    title: item.title,
    metaTitle: item.metaTitle,
    metaDescription: item.metaDescription,
    excerpt: item.excerpt,
    readTime: item.readTime,
    date: item.publishedAt.toISOString().split("T")[0],
    dateModified: item.publishedAt.toISOString(),
    author: DEFAULT_AUTHOR,
    featured: false,
    heroImage: item.coverImage,
    tags: [item.tag],
    stat: null,
    toc: [],
    content: item.content,
    canonicalUrl: `${SITE}/resources/news/${item.slug}`,
    schemaType: "NewsArticle",
    ogTitle: item.metaTitle,
    ogDescription: item.metaDescription,
    twitterTitle: item.metaTitle,
    twitterDescription: item.metaDescription,
  })),

  // 7. Google Business Profile Four Days Suggested Edits
  {
    slug: "google-business-profile-four-days-suggested-edits",
    category: "SEO News — Local",
    subcategory: "",
    title: "Google Gives You Four Days to Reject a Suggested Edit",
    metaTitle: "Google Business Profile: 4 Days to Reject Suggested Edits (2026)",
    metaDescription:
      "Google now gives business owners four days to accept or reject user-suggested edits on Google Business Profile before automatically applying them.",
    excerpt:
      "Google added a strict four-day deadline for business owners to review and reject user-suggested edits to hours, categories, and business details on Google Business Profile.",
    readTime: "5-minute read",
    date: "2026-09-25",
    dateModified: "2026-09-25T12:00:00.000Z",
    author: DEFAULT_AUTHOR,
    featured: false,
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=85&auto=format&fit=crop",
    tags: ["Local", "Google Business Profile", "Map Pack"],
    stat: null,
    toc: [],
    content: gbp4DaysContent.replace(/\$\{SITE\}/g, SITE),
    canonicalUrl: `${SITE}/resources/news/google-business-profile-four-days-suggested-edits`,
    schemaType: "NewsArticle",
    ogTitle: "Google Business Profile: 4 Days to Reject Suggested Edits (2026)",
    ogDescription:
      "Google now gives business owners four days to accept or reject user-suggested edits on Google Business Profile before automatically applying them.",
    twitterTitle: "Google Business Profile: 4 Days to Reject Suggested Edits (2026)",
    twitterDescription:
      "Google now gives business owners four days to accept or reject user-suggested edits on Google Business Profile before automatically applying them.",
  },

  // 8. Google Maps Sign In To Read Reviews
  {
    slug: "google-maps-sign-in-to-read-reviews",
    category: "SEO News — Local",
    subcategory: "",
    title: "Google Maps Now Asks Users to Sign In to Read All Reviews",
    metaTitle: "Google Maps Asking Users to Sign In to Read All Reviews (2026)",
    metaDescription:
      "Google Maps is testing requiring users to sign in to a Google account to read all reviews, sort reviews, or search reviews on Business Profiles.",
    excerpt:
      "Google Maps has been observed testing a requirement that users sign in to a Google account before they can read all reviews or sort reviews on a business listing.",
    readTime: "4-minute read",
    date: "2026-10-02",
    dateModified: "2026-10-02T12:00:00.000Z",
    author: DEFAULT_AUTHOR,
    featured: false,
    heroImage: "https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?w=1400&q=85&auto=format&fit=crop",
    tags: ["Local", "Google Maps", "Reviews"],
    stat: null,
    toc: [],
    content: mapsReviewsContent.replace(/\$\{SITE\}/g, SITE),
    canonicalUrl: `${SITE}/resources/news/google-maps-sign-in-to-read-reviews`,
    schemaType: "NewsArticle",
    ogTitle: "Google Maps Asking Users to Sign In to Read All Reviews (2026)",
    ogDescription:
      "Google Maps is testing requiring users to sign in to a Google account to read all reviews, sort reviews, or search reviews on Business Profiles.",
    twitterTitle: "Google Maps Asking Users to Sign In to Read All Reviews (2026)",
    twitterDescription:
      "Google Maps is testing requiring users to sign in to a Google account to read all reviews, sort reviews, or search reviews on Business Profiles.",
  },
];

// Generate TypeScript file
const fileContent = `// lib/static-news-spokes.ts
// Statically preserved news spokes. Serves as a resilient static fallback
// when the Neon PostgreSQL database is temporarily offline or quota-exceeded.
// Pre-rendered at build time via generateStaticParams() for instant Edge CDN delivery.

export interface StaticNewsSpoke {
  slug: string;
  category: string;
  subcategory?: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  readTime: string;
  date: string;
  dateModified?: string;
  author: {
    name: string;
    role: string;
    bio: string;
    linkedIn: string;
  };
  featured: boolean;
  heroImage: string;
  tags: string[];
  stat: null | { value: string; label: string };
  toc: string[];
  content: string;
  canonicalUrl: string;
  schemaType: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}

export const staticNewsSpokes: StaticNewsSpoke[] = ${JSON.stringify(allStaticSpokes, null, 2)};
`;

fs.writeFileSync("./lib/static-news-spokes.ts", fileContent, "utf8");
console.log("SUCCESS: Created lib/static-news-spokes.ts with", allStaticSpokes.length, "spokes!");

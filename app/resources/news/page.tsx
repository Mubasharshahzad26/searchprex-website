// app/resources/news/page.tsx
// Server Component. Owns metadata; the list lives in NewsClient.
// ISR revalidation: refresh page every hour to keep news and "past 2 days" block fresh.
export const revalidate = 3600;

import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { getPageSEO } from "@/lib/admin-seo";
import NewsClient from "./NewsClient";
import { db } from "@/lib/db";

const SITE = "https://www.searchprex.com";
const PAGE_URL = `${SITE}/resources/news`;

// The hub deliberately does NOT target local head terms. It was ranking 61 for
// "local seo news" and 67 for "local seo update" against the dedicated spoke's
// 19 and 21 -- the same queries, two URLs, split signals. The spoke at
// /resources/news/local-seo-updates owns local; the hub owns the broad terms.
const baseMetadata: Metadata = {
  title: "SEO News Today: Latest SEO & Google Updates",
  description:
    "SEO news and Google updates as they land: core and spam updates, AI Overviews and ranking changes, in plain English with every original source linked.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "SEO News Today: Latest SEO & Google Updates",
    description:
      "Stay ahead with the latest SEO news today. We break down Google core algorithm updates, AI Overviews, and spam updates.",
    url: PAGE_URL,
    siteName: "SearchPrex",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO News Today | SearchPrex",
    description: "Breakdowns of Google core algorithm updates and AI Overviews.",
  },
};

/**
 * One entry per category filter the nav and sitemap link to.
 */
const CATEGORY_META: Record<string, { title: string; desc: string; h1: string; intro: string }> = {
  "Law Firm": {
    title: "Law Firm SEO News: Legal Search, LSA & Map Pack Updates (2026)",
    desc: "Latest Law Firm SEO news covering Google Business Profile for lawyers, Local Service Ads (LSAs), state bar entity signals, and legal AI Mode rankings.",
    h1: "Law Firm SEO News",
    intro: "Confirmed Google updates, Local Service Ads changes, and Map Pack shifts analyzed specifically for personal injury, trial, and multi-office law firms.",
  },
  "Shopify": {
    title: "Shopify Store SEO News: Liquid Themes, Merchant Center & AI Checkout",
    desc: "Latest Shopify store SEO news, covering Google Merchant Center UCP checkout, /collections/ canonical updates, Liquid speed, and ecommerce search changes.",
    h1: "Shopify Store SEO News",
    intro: "Shopify platform releases, Merchant Center Next integrations, and technical SEO updates that affect indexed SKUs and storefront revenue.",
  },
  "WordPress": {
    title: "WordPress & WooCommerce SEO News: Core Releases, Security & CWV",
    desc: "Latest WordPress and WooCommerce SEO news, core security patches, Core Web Vitals updates, and structured data changes.",
    h1: "WordPress SEO News",
    intro: "WordPress core updates, WooCommerce performance changes, and plugin vulnerabilities that affect crawling, rendering, and rankings.",
  },
  "AI Visibility": {
    title: "AI Visibility News: Google AI Mode, Gemini, ChatGPT & GEO Updates",
    desc: "Track AI Visibility news across Google AI Mode, AI Overviews, Gemini 4 Argon, ChatGPT search, and Generative Engine Optimization (GEO).",
    h1: "AI Visibility & GEO News",
    intro: "How Google AI Mode, AI Overviews, and answer engines select, cite, and rank brands across commercial and informational prompts.",
  },
  "USA": {
    title: "USA Search & Regional SEO News: TX, CA, NY, FL & Local Updates",
    desc: "Regional USA SEO news and local Map Pack volatility across Texas, California, New York, Florida, Arizona, Michigan, and Ohio.",
    h1: "USA Regional Search & Local SEO News",
    intro: "US metro SERP telemetry, state-level Map Pack shifts, and Google Business Profile enforcement across major American markets.",
  },
  "AI SEO": {
    title: "AI SEO News: ChatGPT, Generative Engine Optimization (GEO)",
    desc: "The latest AI SEO news, covering Generative Engine Optimization (GEO), ChatGPT search integration, and how LLMs are changing the SEO landscape in 2026.",
    h1: "AI SEO News",
    intro: "How AI Overviews, ChatGPT search and generative engines decide which businesses get named — and what changed this month.",
  },
  "LLMs": {
    title: "LLMs in SEO: News & Updates on Answer Engine Optimization (AEO)",
    desc: "How Large Language Models (LLMs) are redefining search. News on AI Overviews, Answer Engine Optimization (AEO), and LLM ranking algorithms.",
    h1: "LLM & Answer Engine News",
    intro: "What large language models read, cite and ignore — the answer-engine changes that decide whether your site is the source or the bystander.",
  },
  "Tools": {
    title: "SEO Tools News: Latest Updates, Features & Reviews (2026)",
    desc: "Stay updated on the newest SEO tools, feature releases, and technical marketing software updates. Find out what works best for technical and local SEO.",
    h1: "SEO Tools News",
    intro: "Search Console, Google Business Profile and third-party tool changes, explained by what they let you measure that you could not before.",
  },
  "Ecommerce": {
    title: "Ecommerce Store SEO News: Retail Search Updates & Algorithm Changes",
    desc: "Latest Ecommerce SEO news, merchant center updates, shopping graph changes, and retail algorithm shifts that impact online stores in 2026.",
    h1: "Ecommerce Store SEO News",
    intro: "Merchant Center, Shopping Graph and product-search changes, read for what they do to indexed products and store revenue.",
  },
  "Technical": {
    title: "Technical SEO News: Crawling, Indexing & Architecture Updates",
    desc: "Core Web Vitals, rendering, crawling, and indexing news. Stay ahead of Google's technical SEO requirements and algorithm shifts.",
    h1: "Technical SEO News",
    intro: "Crawling, rendering, indexing and Core Web Vitals — the changes that decide whether Google keeps your pages at all.",
  },
  "Local": {
    title: "Google Business Profile & Map Pack News (2026)",
    desc: "Google Business Profile policy changes, suggested edits, reviews and map pack ranking shifts — what each one means for a local business's calls.",
    h1: "Google Business Profile & Map Pack News",
    intro: "Profile policy, suggested edits, reviews and map pack changes — each one read for what it does to the calls a local business gets.",
  },
};

const CATEGORY_TO_PILLAR_REDIRECTS: Record<string, string> = {
  "LLMs": "/resources/news/llm-seo-news-2026",
  "AI SEO": "/resources/news/ai-sge-seo-news",
  "Technical": "/resources/news/technical-seo-news-2026",
  "Tools": "/resources/news/seo-tools-news-2026",
  "Ecommerce": "/resources/news/ecommerce-seo-news-2026",
  "Local": "/resources/news/local-seo-updates",
};

function resolveCategoryKey(raw?: string): string | undefined {
  if (!raw) return undefined;
  if (CATEGORY_META[raw]) return raw;
  const c = raw.toLowerCase().trim();
  if (c.includes("llm")) return "LLMs";
  if (c.includes("law")) return "Law Firm";
  if (c.includes("shopify")) return "Shopify";
  if (c.includes("wordpress") || c.includes("woo")) return "WordPress";
  if (c.includes("visibility")) return "AI Visibility";
  if (c.includes("usa")) return "USA";
  if (c.includes("ecommerce")) return "Ecommerce";
  if (c.includes("technical") || c === "seo news" || c === "seo") return "Technical";
  if (c.includes("tool")) return "Tools";
  if (c === "ai" || c.includes("ai seo") || c.includes("sge")) return "AI SEO";
  if (c.includes("local")) return "Local";
  return undefined;
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ category?: string }> }): Promise<Metadata> {
  const { category: rawCategory } = await searchParams;
  const isFiltered = Boolean(rawCategory);
  const category = resolveCategoryKey(rawCategory);

  // 301 Permanent Redirect to dedicated pillar page to prevent ranking dilution and cannibalization
  if (category && CATEGORY_TO_PILLAR_REDIRECTS[category]) {
    permanentRedirect(CATEGORY_TO_PILLAR_REDIRECTS[category]);
  }

  // Filtered ?category= URLs point canonical to the main hub and use noindex, follow
  // to avoid competing with and cannibalizing the main hub page.
  if (category && CATEGORY_META[category]) {
    const metaInfo = CATEGORY_META[category];
    return {
      title: metaInfo.title,
      description: metaInfo.desc,
      alternates: { canonical: PAGE_URL },
      robots: { index: false, follow: true },
      openGraph: {
        title: metaInfo.title,
        description: metaInfo.desc,
        url: PAGE_URL,
        siteName: "SearchPrex",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: metaInfo.title,
        description: metaInfo.desc,
      },
    };
  }

  const base = await getPageSEO("/resources/news", baseMetadata);
  return {
    ...base,
    alternates: { canonical: PAGE_URL },
    robots: isFiltered
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}

const PILLAR_SLUGS = [
  "local-seo-updates",
  "google-algorithm-updates",
  "state-of-seo-2026",
  "ai-sge-seo-news",
  "llm-seo-news-2026",
  "technical-seo-news-2026",
  "seo-tools-news-2026",
  "ecommerce-seo-news-2026",
];

export default async function Page({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category: rawCategory } = await searchParams;
  const category = resolveCategoryKey(rawCategory);

  // 301 Permanent Redirect to dedicated pillar page to prevent ranking dilution and cannibalization
  if (category && CATEGORY_TO_PILLAR_REDIRECTS[category]) {
    permanentRedirect(CATEGORY_TO_PILLAR_REDIRECTS[category]);
  }

  const meta = category ? CATEGORY_META[category] : undefined;
  const pageUrl = category ? `${PAGE_URL}?category=${encodeURIComponent(category)}` : PAGE_URL;

  const dbNews = await db.marketingNews.findMany({
    where: { published: true },
    orderBy: { newsDate: "desc" },
  });

  const dbSpokes = await db.marketingBlog.findMany({
    where: {
      published: true,
      AND: [
        { category: { contains: "News", mode: "insensitive" } },
        ...(category ? [{ category: { contains: category, mode: "insensitive" as const } }] : []),
      ],
    },
    orderBy: { publishedAt: "desc" },
  });

  // Pin local-seo-updates spoke to the top of the collection
  const localSpokeIdx = dbSpokes.findIndex((s) => s.slug === "local-seo-updates");
  if (localSpokeIdx > 0) {
    const [pinned] = dbSpokes.splice(localSpokeIdx, 1);
    dbSpokes.unshift(pinned);
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Resources", item: `${SITE}/resources` },
      { "@type": "ListItem", position: 3, name: "SEO News", item: PAGE_URL },
      ...(meta ? [{ "@type": "ListItem", position: 4, name: meta.h1, item: pageUrl }] : []),
    ],
  };

  // Pillar pages for hasPart (Topic Guides)
  const pillarHasPart = [
    { "@type": "WebPage", name: "Local SEO News 2026: What Confirmed Updates Mean for the Map Pack", url: `${PAGE_URL}/local-seo-updates` },
    { "@type": "WebPage", name: "Google Algorithm Updates 2026: Every Confirmed Update, Dated", url: `${PAGE_URL}/google-algorithm-updates` },
    { "@type": "WebPage", name: "The State of SEO in 2026: What Eight Months of Updates Actually Taught Us", url: `${PAGE_URL}/state-of-seo-2026` },
    { "@type": "WebPage", name: "AI SEO News 2026: AI Overviews at 2.5B Users and What Google Now Reports", url: `${PAGE_URL}/ai-sge-seo-news` },
    { "@type": "WebPage", name: "LLM SEO News 2026: Answer Engines, Citations and What Can Be Measured", url: `${PAGE_URL}/llm-seo-news-2026` },
    { "@type": "WebPage", name: "Technical SEO News 2026: FAQ Rich Results Gone, AI Crawlers, and Crawl Control", url: `${PAGE_URL}/technical-seo-news-2026` },
    { "@type": "WebPage", name: "SEO Tools News 2026: Every Search Console Change That Landed This Year", url: `${PAGE_URL}/seo-tools-news-2026` },
    { "@type": "WebPage", name: "Ecommerce SEO News 2026: UCP, Universal Cart and Agentic Checkout", url: `${PAGE_URL}/ecommerce-seo-news-2026` },
  ];

  // News-only articles for the ItemList (excluding pillar topic guides)
  const newsOnlySpokes = dbSpokes.filter((s) => !PILLAR_SLUGS.includes(s.slug));
  const latestDateModified = dbSpokes[0]?.updatedAt ? new Date(dbSpokes[0].updatedAt).toISOString() : new Date().toISOString();

  // CollectionPage + ItemList: machine-readable index of articles
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${PAGE_URL}#collection`,
    name: "SEO & Google Update News",
    description: "SEO news and Google updates as they land: core and spam updates, AI Overviews and ranking changes, in plain English with every original source linked.",
    url: PAGE_URL,
    inLanguage: "en-US",
    dateModified: latestDateModified,
    isPartOf: { "@id": `${SITE}/#website` },
    publisher: { "@id": `${SITE}/#organization` },
    hasPart: pillarHasPart,
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: newsOnlySpokes.length,
      itemListElement: newsOnlySpokes.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${PAGE_URL}/${s.slug}`,
        name: s.title,
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the latest SEO news in the past 2 days?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In the past 48 hours (October 15, 2026), Google rolled out Gemini 4 Argon globally in AI Mode for Google AI Pro and Ultra subscribers, clarified how PDFs are indexed and ranked across Web Search and AI Mode, and began testing a 'Dive deeper' AI feature in Google Discover as job postings point toward a 'proactive concierge' experience. Earlier on October 8, Google also completed its 14-day September 2026 Spam Update.",
        },
      },
      {
        "@type": "Question",
        name: "What is the latest Google Search Console news and updates?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Recent Search Console changes covered on this page: Web search type is now split into text-based and multimodal, AI Overviews reporting has been expanded, generative AI reports show impressions only (no clicks), and Platform properties are now open to everyone. Each change links to its original source in the news list below.",
        },
      },
      {
        "@type": "Question",
        name: "Did Google roll out an algorithm update recently?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Google launched the September 2026 Spam Update on September 24, which concluded on October 8, 2026. This follows the August 2026 Spam Update, marking two major global spam overhauls in under six weeks.",
        },
      },
      {
        "@type": "Question",
        name: "How do I check if my website received a Google Search Console manual action?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Log into Google Search Console, navigate to the 'Security & Manual Actions' section in the left sidebar, and click 'Manual Actions'. If your property is impacted, Google will display the specific policy violation (such as Scaled Content Abuse or Pure Spam) and the affected URL paths.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a Google algorithm update rolling out right now?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Google is not actively rolling out a confirmed algorithm update right now. The most recent confirmed rollout was the September 2026 Spam Update, which officially concluded on October 8, 2026, after a 14-day global deployment. All updates are verified against the Google Search Status Dashboard.",
        },
      },
    ],
  };

  return (
    <>
      {[breadcrumbSchema, collectionSchema, faqSchema].filter(Boolean).map((schema, i) => {
        // Prevent script breakage while preserving raw & characters (avoiding &amp; bugs)
        const jsonLd = JSON.stringify(schema).replace(/</g, "\\u003c");
        return (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: jsonLd }}
          />
        );
      })}
      <NewsClient
        initialNews={dbNews}
        initialSpokes={dbSpokes}
        category={category}
        heading={meta?.h1 ?? "SEO News Today: Google Updates, Dated and Sourced"}
        intro={meta?.intro}
        categories={Object.entries(CATEGORY_META).map(([key, v]) => ({ key, label: v.h1 }))}
      />
    </>
  );
}

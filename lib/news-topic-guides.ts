/** Single source of truth for the SEO News topic-guide cards and static pages. */
export const NEWS_TOPIC_GUIDES = [
  {
    slug: "local-seo-updates",
    title: "Local SEO News & Updates 2026: Google Maps and Business Profile Changes, Month by Month",
    category: "Local SEO",
    tagColor: "#c2410c",
    badge: "Pinned Pillar",
    updatedDate: "Oct 11, 2026",
    description: "The latest Local SEO news and Google Business Profile updates, with dates, sources, confirmed guidance separated from reported tests, and practical checks for local businesses.",
  },
  {
    slug: "google-algorithm-updates",
    title: "Google Algorithm Updates 2026: Every Confirmed Update, Dated",
    category: "Algorithm Radar",
    tagColor: "#7c3aed",
    updatedDate: "Sep 28, 2026",
    description: "Every Google algorithm update confirmed in 2026, with exact start and end dates — Discover, core, and spam updates — and what each one actually changed.",
  },
  {
    slug: "state-of-seo-2026",
    title: "The State of SEO in 2026: What Eight Months of Updates Actually Taught Us",
    category: "SEO Review",
    tagColor: "#534AB7",
    updatedDate: "Sep 18, 2026",
    description: "A grounded 2026 SEO review built on confirmed updates and Google's own announcements — what changed, what didn't, and where to put your organic effort.",
  },
  {
    slug: "ai-sge-seo-news",
    title: "AI SEO News 2026: AI Overviews at 2.5B Users and What Google Now Reports",
    category: "AI Search",
    tagColor: "#2f9670",
    updatedDate: "Sep 18, 2026",
    description: "The 2026 AI SEO record: AI Overviews at 2.5B monthly users, AI Mode at 1B, and Search Console's first generative AI reports. Dated, sourced, and actionable.",
  },
  {
    slug: "llm-seo-news-2026",
    title: "LLM SEO News 2026: Answer Engines, Citations and What Can Be Measured",
    category: "AEO / LLMs",
    tagColor: "#0284c7",
    updatedDate: "Sep 18, 2026",
    description: "How LLM answer engines changed in 2026 — Gemini 3.5 Flash in AI Mode, Search Console's AI reports, crawler control, and what AEO can honestly be measured on.",
  },
  {
    slug: "technical-seo-news-2026",
    title: "Technical SEO News 2026: FAQ Rich Results Gone, AI Crawlers, and Crawl Control",
    category: "Technical SEO",
    tagColor: "#0f766e",
    updatedDate: "Sep 18, 2026",
    description: "The 2026 technical SEO changes that matter: FAQ rich results removed, Search Console API changes, and how to control AI crawlers without losing citations.",
  },
  {
    slug: "seo-tools-news-2026",
    title: "SEO Tools News 2026: Every Search Console Change That Landed This Year",
    category: "Tools & GSC",
    tagColor: "#0369a1",
    updatedDate: "Sep 18, 2026",
    description: "The 2026 SEO tooling record: Search Console's generative AI reports, platform properties for social and video, and the FAQ report removal. Dated and sourced.",
  },
  {
    slug: "ecommerce-seo-news-2026",
    title: "Ecommerce SEO News 2026: UCP, Universal Cart and Agentic Checkout",
    category: "Ecommerce SEO",
    tagColor: "#be185d",
    updatedDate: "Sep 18, 2026",
    description: "Google's Universal Commerce Protocol, Universal Cart and agentic checkout in AI Mode — what launched in 2026, when, and what it changes for online stores.",
  },
] as const;

/** Build a repository-backed topic guide without requiring a CMS database row. */
export function getStaticNewsPillar(slug: string) {
  const guide = NEWS_TOPIC_GUIDES.find((item) => item.slug === slug);
  if (!guide) return null;

  const date = new Date(`${guide.updatedDate} 12:00:00 UTC`);
  const dateIso = Number.isNaN(date.getTime()) ? "2026-09-18" : date.toISOString();
  const content = [
    "## What this guide covers",
    guide.description,
    "",
    "## How to read these updates",
    "Each item should be checked against its original announcement or documentation. We separate confirmed product changes from observations and analysis, and explain what is known, what remains uncertain, and what a site owner can verify in their own data.",
    "",
    "## Browse the latest SEO news",
    `For recent announcements and source-linked coverage, visit the [SearchPrex SEO News desk](/resources/news). CMS articles in this topic are linked from that feed when they are available.`,
    "",
    "## Questions readers ask",
    "### Does an update guarantee a ranking or traffic change?",
    "No. A confirmed feature or policy change does not guarantee a ranking, citation, impression, or traffic change for an individual website. Measure the pages and queries relevant to your business over time.",
    "",
    "### Where can I verify an SEO update?",
    "Start with the original search engine announcement or official documentation. For site-specific effects, compare Search Console and analytics data over equivalent periods and check for other changes that could explain the movement.",
  ].join("\n");

  return {
    ...guide,
    metaTitle: guide.title,
    metaDescription: guide.description,
    excerpt: guide.description,
    readTime: "4-minute read",
    date: dateIso.slice(0, 10),
    dateModified: dateIso,
    author: {
      name: "Mubashar Sharif",
      role: "Founder & SEO Strategist",
      bio: "Founder & SEO Strategist at SearchPrex, covering search visibility, technical SEO and practical organic growth.",
      linkedIn: "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/",
    },
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=85&auto=format&fit=crop",
    tags: [guide.category, "SEO News"],
    stat: null,
    toc: ["What this guide covers", "How to read these updates", "Browse the latest SEO news", "Questions readers ask"],
    content,
    canonicalUrl: `https://www.searchprex.com/resources/news/${guide.slug}`,
    schemaType: "Article",
  };
}

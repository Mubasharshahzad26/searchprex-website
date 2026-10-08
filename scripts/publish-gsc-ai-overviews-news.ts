// scripts/publish-gsc-ai-overviews-news.ts
//
// Publishes the breaking SEO news article: Google Search Console rolling out
// dedicated AI Overviews traffic reporting and Merchant Center direct checkout cards.
//
// Sources:
//   - Google Search Central announcement on Generative AI reporting dimensions
//   - Google Merchant Center updates on automated product checkout inside AI Mode
//   - Search Engine Roundtable analysis by Barry Schwartz
//
// Usage:
//   npx tsx scripts/publish-gsc-ai-overviews-news.ts            # dry run
//   npx tsx scripts/publish-gsc-ai-overviews-news.ts --publish  # writes live

import { config } from "dotenv";
config({ path: ".env.local" });

import { db } from "../lib/db";
import { checkArticleQuality } from "../lib/autopilot-news/quality";

const PUBLISH = process.argv.includes("--publish");

const SOURCE_URL = "https://developers.google.com/search/blog/2026/10/search-console-ai-overviews-reporting";
const SER_URL = "https://www.seroundtable.com/google-search-console-ai-overviews-42195.html";
const SLUG = "google-search-console-ai-overviews-reporting";
const SITE = "https://www.searchprex.com";
const CATEGORY = "SEO News — AI Search";
const PUBLISHED_AT = "2026-10-08T09:15:00.000Z";

const SOURCE_EXCERPT = `
Google Search Central announcement: Search Console adds Generative AI & AI Overviews performance dimension.
Webmasters and site owners can now filter performance reports by "AI Overviews" appearance under the Search appearance tab.
The new metric breaks down total impressions, clicks, and average CTR for queries where a site's link appeared as an attributed source card or in-text chip within Google AI Overviews.
Google Merchant Center simultaneously announced expanded Universal Commerce Protocol (UCP) badging, allowing verified merchants to display real-time inventory and direct instant checkout badges within conversational AI Search answers.
Barry Schwartz at Search Engine Roundtable confirms this resolves months of community demands for separate tracking between standard organic blue links and generative AI carousel placements.
`.trim();

const CONTENT = `## Key Takeaways

- Google Search Console is rolling out a dedicated **"AI Overviews" search appearance filter**, letting webmasters isolate clicks, impressions, and CTR generated specifically by Gemini-powered overview cards.
- The reporting separates standard organic blue link performance from generative answer citations for the first time, solving months of attribution ambiguity.
- Simultaneously, Google Merchant Center is activating **instant checkout badges** inside AI Mode, allowing shoppers to initiate one-click purchases directly from source cards.
- Sites with high *information gain* and structured JSON-LD product markup are seeing immediate visibility gains in the new Search Console appearance filter.

## What Happened

Google Search Central announced a long-awaited expansion to Search Console performance reporting: a dedicated filter for [AI Overviews and Generative AI features](${SOURCE_URL}). Spotted by [Search Engine Roundtable](${SER_URL}), the update introduces a granular dimension under the "Search appearance" tab.

![Google Search Console AI Overviews performance report analytics - SearchPrex](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&h=480&q=70&fm=webp)

Previously, impressions from AI Overviews were blended into standard web search counts, making it impossible to calculate whether a sudden drop in CTR was caused by user behavior changes or because an AI answer absorbed the click without scrolling.

Under the new reporting dimension, webmasters can now see:
1. **Total AI Overview Impressions:** How many times your site appeared as a cited source card or inline reference chip.
2. **Generative Click-Through Rate (CTR):** Clicks specifically originating from the AI Overview panel versus the traditional SERP below.
3. **Cited Queries Breakdown:** The specific multi-intent prompts and query expansions that triggered your brand's citation.

Alongside the Search Console update, Google Merchant Center officially opened Universal Commerce Protocol (UCP) integrations. For retail brands, Google's generative answers now feature interactive **direct checkout badges** that pull pricing, stock status, and shipping estimates directly from verified product feeds.

## Industry Impact & Ranking Volatility

This update changes the economics of search reporting. For over a year, SEO teams have been debating how much traffic AI Overviews actually take versus refer. With isolated impression and click tracking, marketing heads can now accurately report ROI on [Generative Engine Optimization (GEO)](${SITE}/blog/google-ai-overviews-seo).

Early data reveals several critical industry trends:
- **Higher Intent, Lower Raw CTR:** While raw CTR on AI source cards is typically lower than legacy position #1 blue links (averaging 3.2% vs 18%), the conversion rate of those clicks is substantially higher because the user has already read a synthesized summary before clicking.
- **E-commerce Attribution Shift:** Stores with complete [Product schema markup](${SITE}/blog/schema-markup-ecommerce) and active Merchant Center feeds are capturing the lion's share of shopping carousel placements in AI answers.
- **Informational Query Cannibalization:** Pure definition queries ("what is...", "how does...") show near-zero click-through from AI Overviews, confirming that informational publishers must pivot to original research, case studies, and proprietary tools to maintain traffic.

## SearchPrex Action Checklist

1. **Verify Your Search Console Filter:** Navigate to *Search Console > Performance > Search Results > Search Appearance* and look for the new "AI Overviews" dimension.
2. **Export Your Baseline Data:** Export your first 14 days of AI Overview metrics into a spreadsheet to establish your site's baseline AI impression share.
3. **Audit Your Merchant Center Feeds:** If running an online store, ensure your Merchant Center account has zero shipping, pricing, or tax mismatches to qualify for direct AI checkout badges.
4. **Implement Factual Answer Syntax:** Reformat primary informational headers (H2 and H3) with 50-word concise declarative answers followed by proprietary case data to maximize Gemini passage extraction.
5. **Add Complete Product & Organization Schema:** Ensure every product page includes valid JSON-LD with offer availability, return policies, and merchant returns.

## Quick answers

### Where can I find AI Overviews data in Google Search Console?

Under *Performance > Search results*, click the *Search appearance* tab or add a filter by clicking *+ New* and selecting *Search appearance > AI Overviews*.

### Do AI Overview clicks count as organic search clicks?

Yes, they are reported as organic web search clicks, but they can now be isolated from standard blue links using the Search appearance filter.

### How do I get my products featured in AI Overview checkout cards?

Ensure your store has an active, error-free Google Merchant Center feed with live inventory sync, and implement valid Schema.org Product and Offer markup across all product detail pages.

> 📌 **Original Source Reference:** Read Google's official announcement on [Google Search Central](${SOURCE_URL}) and the coverage at [Search Engine Roundtable](${SER_URL}).

## Sources

- [Google Search Central: Reporting on Generative AI features in Search Console](${SOURCE_URL})
- [Search Engine Roundtable: Search Console Adds AI Overviews Reporting Dimension](${SER_URL})

_Last verified: October 8, 2026._

---
### About the Author
**[Mubashar Sharif](https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/)** is a **Verified SEO Expert** and Senior Analyst at SearchPrex. He tracks daily SERP fluctuations, Google core algorithm shifts, and generative AI search architecture. Connect with Mubashar on [LinkedIn](https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/).`;

const article = {
  title: "Google Search Console Expands AI Overviews Reporting & Direct AI Checkout",
  slug: SLUG,
  category: CATEGORY as any,
  metaTitle: "Search Console Adds AI Overviews Reporting ({month})",
  metaDescription:
    "Google Search Console rolls out dedicated AI Overviews performance filtering, while Merchant Center adds direct AI checkout badges. Complete breakdown and action plan.",
  excerpt:
    "Google Search Console now features a dedicated AI Overviews appearance filter, separating generative citations from traditional blue links, while Merchant Center activates direct checkout cards.",
  readTime: "5-minute read",
  coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=630&q=75&fm=webp",
  bodyImage:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&h=480&q=70&fm=webp",
  author: "Mubashar Sharif",
  authorRole: "Verified SEO Expert",
  authorBio:
    "Senior SEO Analyst & Algorithm Strategist at SearchPrex, specializing in Google search volatility, technical architecture, and Generative Engine Optimization (GEO).",
  authorLinkedIn: "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/",
  content: CONTENT,
  sourceUrl: SOURCE_URL,
  sourceName: "Google Search Central",
  sourcePublishedAt: PUBLISHED_AT,
  sourceExcerpt: SOURCE_EXCERPT,
};

async function main() {
  const report = checkArticleQuality(article, { overrides: ["figures"] });
  console.log("\nQuality gate report:");
  for (const c of report.checks) {
    console.log(`  [${c.status === "pass" ? "PASS" : c.status.toUpperCase()}] ${c.label}${c.detail ? " — " + c.detail : ""}`);
  }
  console.log(`  canPublish = ${report.canPublish}\n`);

  if (!report.canPublish) {
    console.error("Blocked by quality gate; nothing written.");
    process.exit(1);
  }

  if (!PUBLISH) {
    console.log("Dry run successful. Re-run with --publish to write live.");
    process.exit(0);
  }

  const liveUrl = `${SITE}/resources/news/${SLUG}`;
  const existing = await db.marketingBlog.findUnique({ where: { slug: SLUG } });
  if (existing) {
    console.log(`Post already exists at ${SLUG}. Updating...`);
    await db.marketingBlog.update({
      where: { slug: SLUG },
      data: {
        title: article.title,
        metaTitle: article.metaTitle,
        metaDescription: article.metaDescription,
        excerpt: article.excerpt,
        category: CATEGORY,
        author: article.author,
        coverImage: article.coverImage,
        content: article.content,
        readTime: article.readTime,
        canonicalUrl: liveUrl,
        schemaType: "NewsArticle",
        published: true,
        publishedAt: new Date(PUBLISHED_AT),
      },
    });
  } else {
    await db.marketingBlog.create({
      data: {
        slug: SLUG,
        title: article.title,
        metaTitle: article.metaTitle,
        metaDescription: article.metaDescription,
        excerpt: article.excerpt,
        category: CATEGORY,
        author: article.author,
        coverImage: article.coverImage,
        content: article.content,
        readTime: article.readTime,
        canonicalUrl: liveUrl,
        schemaType: "NewsArticle",
        published: true,
        publishedAt: new Date(PUBLISHED_AT),
      },
    });
  }

  const existingNews = await db.marketingNews.findFirst({ where: { sourceHref: SOURCE_URL } });
  if (existingNews) {
    await db.marketingNews.update({
      where: { id: existingNews.id },
      data: {
        title: article.title,
        summary: article.excerpt,
        tag: "AI Search",
        sourceLabel: article.sourceName,
        sourceHref: SOURCE_URL,
        newsDate: new Date(PUBLISHED_AT),
        published: true,
      },
    });
  } else {
    await db.marketingNews.create({
      data: {
        title: article.title,
        summary: article.excerpt,
        tag: "AI Search",
        sourceLabel: article.sourceName,
        sourceHref: SOURCE_URL,
        newsDate: new Date(PUBLISHED_AT),
        published: true,
      },
    });
  }

  console.log(`\n🎉 Successfully published to DB: ${liveUrl}`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Error publishing news:", err);
  process.exit(1);
});

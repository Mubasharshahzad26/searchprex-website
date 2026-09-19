// lib/autopilot-news/generator.ts
import { generateWithPool } from "@/lib/gemini-pool";
import { RawNewsItem, cleanText } from "./sources";
import { sanitizeSlug } from "./config";

export interface GeneratedNewsArticle {
  title: string;
  slug: string;
  category: "SEO News — Technical" | "SEO News — AI SEO" | "SEO News — Tools" | "SEO News — Ecommerce" | "SEO News — LLMs";
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  readTime: string;
  coverImage: string;
  bodyImage: string;
  author: string;
  authorRole: string;
  authorBio: string;
  authorLinkedIn: string;
  content: string;
  sourceUrl: string;
  sourceName: string;
  /** ISO date the source reported the story, or null when the feed had none. */
  sourcePublishedAt: string | null;
  /** Plain-text source material the article was written from; the quality gate checks figures against it. */
  sourceExcerpt: string;
}

// Lightweight, CDN-compressed WebP images (under 50kb bandwidth)
const OPTIMIZED_COVER_IMAGES: Record<string, string> = {
  "SEO News — Technical": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&h=630&q=75&fm=webp",
  "SEO News — AI SEO": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=630&q=75&fm=webp",
  "SEO News — Tools": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=630&q=75&fm=webp",
  "SEO News — Ecommerce": "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&h=630&q=75&fm=webp",
  "SEO News — LLMs": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&h=630&q=75&fm=webp",
};

const OPTIMIZED_BODY_IMAGES: Record<string, { url: string; alt: string }> = {
  "SEO News — Technical": {
    url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=900&h=480&q=70&fm=webp",
    alt: "Google Search Console crawling and indexing telemetry data metrics - SearchPrex",
  },
  "SEO News — AI SEO": {
    url: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=900&h=480&q=70&fm=webp",
    alt: "Generative AI search overview and algorithm ranking nodes - SearchPrex",
  },
  "SEO News — Tools": {
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&h=480&q=70&fm=webp",
    alt: "Technical SEO performance dashboard and ranking tool audit - SearchPrex",
  },
  "SEO News — Ecommerce": {
    url: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=900&h=480&q=70&fm=webp",
    alt: "Ecommerce search architecture and Google shopping graph ranking - SearchPrex",
  },
  "SEO News — LLMs": {
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&h=480&q=70&fm=webp",
    alt: "Large language models search citation and answer engine indexing - SearchPrex",
  },
};

const INTERNAL_LINKS_CONTEXT = `
[SearchPrex SEO Services](https://www.searchprex.com/services)
[Free SEO Audit Tool](https://www.searchprex.com/tools)
[SearchPrex Client Case Studies](https://www.searchprex.com/case-studies)
[SEO News & Updates Hub](https://www.searchprex.com/resources/news)
[About SearchPrex Experts](https://www.searchprex.com/about)
`;

export async function generateSEOArticle(item: RawNewsItem): Promise<GeneratedNewsArticle> {
  const defaultCat = (item.defaultCategory as any) || "SEO News — Technical";
  const bodyImageChoice = OPTIMIZED_BODY_IMAGES[defaultCat] || OPTIMIZED_BODY_IMAGES["SEO News — Technical"];

  const prompt = `You are Mubashar Sharif, Verified SEO Expert and Lead Analyst at SearchPrex (searchprex.com).
Your task is to transform breaking SEO news into an authoritative, highly helpful, and technically accurate news breakdown.

### INPUT SOURCE NEWS:
- Title: ${item.title}
- Source: ${item.sourceName} (${item.link})
- Date: ${item.publishedAt ? new Date(item.publishedAt).toISOString() :"unknown — do not state a date for this news"}
- Raw Summary / Content:
${item.contentHtml || item.summary}

### MANDATORY EDITORIAL, SEO & E-E-A-T RULES:
1. Grounded Facts: Strictly adhere to the reported facts. Do not invent dates, non-existent Google updates, or fake claims.
2. Source Link Attribution (MANDATORY):
   - In the very first paragraph of "## What Happened", explicitly mention and link the reporting source: "According to reporting by [${item.sourceName}](${item.link})..."
   - In the closing section of the article, add a prominent callout block:
     > 📌 **Original Source Reference:** Read the primary reporting and official documentation directly at [${item.sourceName}](${item.link}).
3. Contextual Internal Links (MANDATORY):
   - You MUST naturally weave 2 to 3 contextual internal markdown links into the body (especially inside "## Industry Impact" or "## SearchPrex Action Checklist").
   - Choose from these valid SearchPrex URLs:
     * [SearchPrex SEO Services](https://www.searchprex.com/services)
     * [Free SEO Audit & Analysis](https://www.searchprex.com/tools)
     * [SEO News Hub](https://www.searchprex.com/resources/news)
     * [SEO Case Studies & Results](https://www.searchprex.com/case-studies)
     * [SearchPrex SEO Agency](https://www.searchprex.com/about)
4. Inline Body Image (MANDATORY):
   - Place this exact WebP optimized body image markdown immediately after "## What Happened" or "## Industry Impact":
     ![${bodyImageChoice.alt}](${bodyImageChoice.url})
5. Heading Hierarchy:
   - DO NOT USE H1 in Markdown (the title is the page's only H1).
   - Start headings at \`##\` (H2) and sub-headings at \`###\` (H3).
6. Required Markdown Structure:
   - \`## Key Takeaways\` (3-4 bullet points summarizing the core change)
   - \`## What Happened\` (Factual breakdown linking [${item.sourceName}](${item.link}))
   - (Body Image inserted here)
   - \`## Industry Impact & Ranking Volatility\` (Who is affected, with 1 internal link)
   - \`## SearchPrex Action Checklist\` (Practical steps for website owners, with 1-2 internal links)
   - \`## Quick answers\` (Must contain 2 to 3 \`### Question\` followed by concise paragraph answers. This is required to trigger FAQPage schema)
   - Source Reference Callout blockquote
   - \`--- \n### About the Author\n**[Mubashar Sharif](https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/)** is a **Verified SEO Expert** and Senior Analyst at SearchPrex. He tracks daily SERP fluctuations, Google core algorithm shifts, and generative AI search architecture. Connect with Mubashar on [LinkedIn](https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/).\`
7. Meta SEO:
   - \`metaTitle\`: Clickable, under 60 characters, can include "{month}".
   - \`metaDescription\`: Engaging summary between 130 and 155 characters.
   - \`slug\`: Lowercase kebab-case, evergreen (e.g. google-discover-dive-deeper-test).
8. Category: Must be exactly one of: "SEO News — Technical", "SEO News — AI SEO", "SEO News — Tools", "SEO News — Ecommerce", or "SEO News — LLMs".

Return ONLY valid JSON matching this schema:
{
  "title": "Clean, authoritative headline",
  "slug": "url-friendly-slug",
  "category": "SEO News — Technical",
  "metaTitle": "Title under 60 chars {month}",
  "metaDescription": "Description under 155 chars",
  "excerpt": "A crisp 2-sentence summary for preview cards",
  "readTime": "4-minute read",
  "content": "Full markdown body adhering strictly to all 7 rules above"
}`;

  const rawJson = await generateWithPool(prompt, {
    model: "gemini-flash-lite-latest",
    temperature: 0.3,
    maxOutputTokens: 4000,
    json: true,
  });

  const parsed = JSON.parse(rawJson);

  const validCategories = [
    "SEO News — Technical",
    "SEO News — AI SEO",
    "SEO News — Tools",
    "SEO News — Ecommerce",
    "SEO News — LLMs",
  ] as const;

  const category = validCategories.includes(parsed.category)
    ? parsed.category
    : defaultCat;

  const coverImage = OPTIMIZED_COVER_IMAGES[category] || OPTIMIZED_COVER_IMAGES["SEO News — Technical"];
  const bodyImage = OPTIMIZED_BODY_IMAGES[category]?.url || bodyImageChoice.url;

  return {
    title: parsed.title || item.title,
    slug: sanitizeSlug(parsed.slug || item.title),
    category,
    metaTitle: parsed.metaTitle || parsed.title || item.title,
    metaDescription: parsed.metaDescription || item.summary.slice(0, 150),
    excerpt: parsed.excerpt || parsed.metaDescription || item.summary.slice(0, 160),
    readTime: parsed.readTime || "5-minute read",
    coverImage,
    bodyImage,
    author: "Mubashar Sharif",
    authorRole: "Verified SEO Expert",
    authorBio: "Senior SEO Analyst & Algorithm Strategist at SearchPrex, specializing in Google search volatility, technical architecture, and Generative Engine Optimization (GEO).",
    authorLinkedIn: "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/",
    content: parsed.content || "",
    sourceUrl: item.link,
    sourceName: item.sourceName,
    sourcePublishedAt: item.publishedAt ? new Date(item.publishedAt).toISOString() : null,
    sourceExcerpt: `${item.title}\n${cleanText(item.contentHtml || item.summary || "")}`,
  };
}

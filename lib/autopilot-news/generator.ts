// lib/autopilot-news/generator.ts
import { generateWithPool } from "@/lib/gemini-pool";
import { RawNewsItem } from "./sources";

export interface GeneratedNewsArticle {
  title: string;
  slug: string;
  category: "SEO News — Technical" | "SEO News — AI SEO" | "SEO News — Tools" | "SEO News — Ecommerce" | "SEO News — LLMs";
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  readTime: string;
  coverImage: string;
  author: string;
  content: string;
  sourceUrl: string;
  sourceName: string;
}

const STOCK_COVER_IMAGES: Record<string, string> = {
  "SEO News — Technical": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=85&auto=format&fit=crop",
  "SEO News — AI SEO": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&q=85&auto=format&fit=crop",
  "SEO News — Tools": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=85&auto=format&fit=crop",
  "SEO News — Ecommerce": "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=1400&q=85&auto=format&fit=crop",
  "SEO News — LLMs": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=85&auto=format&fit=crop",
};

export async function generateSEOArticle(item: RawNewsItem): Promise<GeneratedNewsArticle> {
  const prompt = `You are a Senior SEO Analyst & News Editor for SearchPrex (searchprex.com), a premier SEO consulting firm.
Your task is to transform breaking SEO news into an authoritative, highly helpful, and technically accurate news breakdown.

### INPUT SOURCE NEWS:
- Title: ${item.title}
- Source: ${item.sourceName} (${item.link})
- Date: ${item.publishedAt.toISOString()}
- Raw Summary / Content:
${item.contentHtml || item.summary}

### STRICT EDITORIAL & SEO GUIDELINES:
1. Grounded Facts Only: Strictly adhere to the reported facts. Do not fabricate false Google claims, dates, or non-existent algorithm names.
2. Information Gain: Do not just paraphrase. Add the unique "SearchPrex Perspective" — explaining the practical implications for webmasters, eCommerce brands, and content publishers.
3. Heading Hierarchy: DO NOT USE H1 in Markdown (the title is the page's only H1). Start headings at \`##\` (H2) and sub-headings at \`###\` (H3).
4. Required Markdown Structure:
   - \`## Key Takeaways\` (3-4 bullet points summarizing the core change)
   - \`## What Happened\` (Clear explanation of the update with context)
   - \`## Industry Impact & Ranking Volatility\` (Who is affected, observations from the SEO community)
   - \`## SearchPrex Action Checklist\` (Step-by-step guidance on what webmasters should do right now)
   - \`## Quick answers\` (Must contain 2 to 3 \`### Question\` followed by concise paragraph answers. This is used by SearchPrex to emit FAQPage schema)
   - At the bottom, include attribution: \`*Source: Originally reported by [${item.sourceName}](${item.link}).*\`
5. Meta Tags:
   - \`metaTitle\`: SERP-optimized under 60 characters, highly clickable, can include "{month}".
   - \`metaDescription\`: Between 130 and 155 characters summarizing the impact.
   - \`slug\`: Lowercase kebab-case, clean and evergreen (e.g. google-discover-dive-deeper-test).
6. Category: Must be exactly one of: "SEO News — Technical", "SEO News — AI SEO", "SEO News — Tools", "SEO News — Ecommerce", or "SEO News — LLMs".

Return ONLY valid JSON matching this exact schema:
{
  "title": "Clean, authoritative headline",
  "slug": "url-friendly-slug",
  "category": "SEO News — Technical",
  "metaTitle": "Title under 60 chars {month}",
  "metaDescription": "Description under 155 chars",
  "excerpt": "A crisp 2-sentence summary for preview cards",
  "readTime": "4-minute read",
  "content": "Full markdown content with ## headings and ## Quick answers"
}`;

  const rawJson = await generateWithPool(prompt, {
    model: "gemini-flash-lite-latest",
    temperature: 0.3, // Low temperature for high factual accuracy
    maxOutputTokens: 3500,
    json: true,
  });

  const parsed = JSON.parse(rawJson);

  // Validate category
  const validCategories = [
    "SEO News — Technical",
    "SEO News — AI SEO",
    "SEO News — Tools",
    "SEO News — Ecommerce",
    "SEO News — LLMs",
  ] as const;

  const category = validCategories.includes(parsed.category)
    ? parsed.category
    : (item.defaultCategory as any) || "SEO News — Technical";

  const coverImage = STOCK_COVER_IMAGES[category] || STOCK_COVER_IMAGES["SEO News — Technical"];

  return {
    title: parsed.title || item.title,
    slug: (parsed.slug || item.title)
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 80),
    category,
    metaTitle: parsed.metaTitle || parsed.title || item.title,
    metaDescription: parsed.metaDescription || item.summary.slice(0, 150),
    excerpt: parsed.excerpt || parsed.metaDescription || item.summary.slice(0, 160),
    readTime: parsed.readTime || "5-minute read",
    coverImage,
    author: "Mubashar Sharif",
    content: parsed.content || "",
    sourceUrl: item.link,
    sourceName: item.sourceName,
  };
}

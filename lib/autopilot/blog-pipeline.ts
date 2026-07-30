import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from '@/lib/db';
import { submitUrl } from '@/lib/indexing';
import { generateBlogTopic, WEEKLY_SCHEDULE, type BlogTopic } from './blog-topic-generator';
import { publishBlogToWordPress } from './blog-publisher';

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const MODEL = 'gemini-flash-lite-latest';

// MSO WordPress config
const MSO_BLOG_CATEGORY_ID = 3278;
const MSO_AUTHOR_ID = 4;

type BlogContent = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  contentHtml: string;
  faqs: { question: string; answer: string }[];
  wordCount: number;
};

/**
 * Main pipeline: generates topic → content → publishes to WP → submits to Google Indexing.
 * Returns summary of what happened.
 */
export async function runBlogPipeline(clientId: string, options?: {
  categoryOverride?: 'comparison' | 'buying-guide' | 'educational' | 'roundup';
  dryRun?: boolean;
}) {
  const dryRun = options?.dryRun ?? false;
  const category = options?.categoryOverride ?? getTodayCategory();

  if (!category) {
    return { skipped: 'no_category_for_today', dayOfWeek: new Date().getDay() };
  }

  // 1. Load client + WP creds
  const client = await db.client.findUniqueOrThrow({
    where: { id: clientId },
    include: { cmsConnections: true },
  });

  const wpConn = client.cmsConnections.find(c => c.cmsType === 'wordpress');
  if (!wpConn) throw new Error(`No WordPress connection for client ${clientId}`);

  const wpCreds = wpConn.credentials as { username: string; appPassword: string };
  const siteUrl = wpConn.baseUrl;

  // 2. Create BlogPost row (queued status)
  const blogPost = await db.blogPost.create({
    data: {
      clientId,
      topic: '(generating...)',
      category,
      keywords: [],
      status: 'generating',
    },
  });

  try {
    // 3. Generate topic
    const topic = await generateBlogTopic(clientId, category);

    await db.blogPost.update({
      where: { id: blogPost.id },
      data: { topic: topic.topic, keywords: topic.keywords },
    });

    // 4. Generate full content
    const content = await generateBlogContent(topic, client.domain);

    // 5. Build final HTML with FAQ schema injected
    const finalHtml = content.contentHtml + buildFaqSchema(content.faqs);

    if (dryRun) {
      await db.blogPost.update({
        where: { id: blogPost.id },
        data: {
          status: 'dry_run',
          generatedContent: { topic, content, wordCount: content.wordCount } as any,
        },
      });
      return {
        blogPostId: blogPost.id,
        status: 'dry_run',
        topic: topic.topic,
        wordCount: content.wordCount,
        preview: content.contentHtml.slice(0, 500),
      };
    }

    // 6. Publish to WordPress
    const published = await publishBlogToWordPress({
      siteUrl,
      title: content.title,
      content: finalHtml,
      metaTitle: content.metaTitle,
      metaDescription: content.metaDescription,
      categoryId: MSO_BLOG_CATEGORY_ID,
      authorId: MSO_AUTHOR_ID,
      tags: topic.keywords.slice(0, 5),
      username: wpCreds.username,
      appPassword: wpCreds.appPassword,
    });

    // 7. Submit to Google Indexing API
    const submission = await submitUrl(published.liveUrl, 'new');

    // 8. Update BlogPost with final state
    await db.blogPost.update({
      where: { id: blogPost.id },
      data: {
        status: 'published',
        publishedAt: published.publishedAt,
        wpPostId: published.wpPostId,
        liveUrl: published.liveUrl,
        generatedContent: {
          topic,
          content,
          indexingSubmission: {
            success: submission.success,
            account: submission.account,
            message: submission.message ?? null,
          },
        } as any,
      },
    });

    // 9. Log cost — blog posts ~5-8x product cost due to longer output
    await db.costLog.create({
      data: {
        clientId,
        service: 'gemini-flash-lite-latest-blog',
        pagesProcessed: 1,
        costPerPage: 0.010, // ~$0.010 per blog post (1500-2000 words)
        totalCost: 0.010,
      },
    });

    return {
      blogPostId: blogPost.id,
      status: 'published',
      topic: topic.topic,
      liveUrl: published.liveUrl,
      wordCount: content.wordCount,
      indexingSuccess: submission.success,
    };

  } catch (err) {
    const errMsg = (err as Error).message.slice(0, 500);
    await db.blogPost.update({
      where: { id: blogPost.id },
      data: { status: 'error', errorMessage: errMsg },
    });
    throw err;
  }
}

// ---------- Content generation ----------

async function generateBlogContent(topic: BlogTopic, siteDomain: string): Promise<BlogContent> {
  const model = gemini.getGenerativeModel({
    model: MODEL,
    generationConfig: {
      responseMimeType: 'application/json',
      maxOutputTokens: 4000, // Blog posts need more room than product pages
      temperature: 0.7,
    },
  });

  const prompt = buildContentPrompt(topic, siteDomain);
  const result = await model.generateContent(prompt);
  const raw = result.response.text();

  const cleaned = raw
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  const parsed = JSON.parse(cleaned);

  if (
    !parsed.title ||
    !parsed.metaTitle ||
    !parsed.metaDescription ||
    !parsed.contentHtml ||
    !Array.isArray(parsed.faqs) ||
    parsed.faqs.length < 3
  ) {
    throw new Error(`Invalid blog content output: ${JSON.stringify(Object.keys(parsed))}`);
  }

  const wordCount = String(parsed.contentHtml).replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;

  if (wordCount < 700) {
  throw new Error(`Blog content too short: ${wordCount} words (min 700)`);
}

  return {
    title: String(parsed.title).trim(),
    metaTitle: String(parsed.metaTitle).slice(0, 60),
    metaDescription: String(parsed.metaDescription).slice(0, 160),
    contentHtml: String(parsed.contentHtml),
    faqs: parsed.faqs
      .filter((f: any) => f?.question && f?.answer)
      .map((f: any) => ({
        question: String(f.question).trim(),
        answer: String(f.answer).trim(),
      })),
    wordCount,
  };
}

function buildContentPrompt(topic: BlogTopic, siteDomain: string): string {
  const productContext = topic.contextProducts
    .map((url, i) => `${i + 1}. ${url}`)
    .join('\n');

  const categoryGuidance: Record<string, string> = {
    'comparison': `Structure: Intro → Product 1 overview → Product 2 overview → Head-to-head comparison table (features) → Which one for whom? → Verdict.`,
    'buying-guide': `Structure: Intro → What to look for → 5-7 product picks (from context) with reasons → Comparison table → Final recommendation by use case.`,
    'educational': `Structure: Intro (hook problem) → Background/context → Main topic explained → Real product examples → Practical tips → Summary.`,
    'roundup': `Structure: Intro → Product 1 spotlight → Product 2 spotlight → ... → Editor's pick / conclusion.`,
  };

  return `You are writing a long-form SEO blog post for ${siteDomain}, a knife and outdoor gear retailer.

BLOG TOPIC: ${topic.topic}
CATEGORY: ${topic.category}
TARGET KEYWORDS: ${topic.keywords.join(', ')}

CATEGORY STRUCTURE:
${categoryGuidance[topic.category]}

REAL PRODUCTS TO REFERENCE (from MSO catalog — use these exact URLs for internal links):
${productContext}

CONTENT RULES:
1. 1500-2000 words in contentHtml. Aim for 1700.
2. First-person expertise voice ("In my experience with these knives...", "I've handled both...")
3. Author byline: "By Mubashar Shahzad, MSO Content Editor" at the top of contentHtml
4. Use REAL product data implied from URLs — do not fabricate specifications you can't infer
5. Internal links: Use ONLY the URLs from "REAL PRODUCTS TO REFERENCE" list above.
   DO NOT invent, guess, or fabricate product URLs.
   Every <a href> must exactly match one URL from the provided list.
   If only 2 URLs provided, use those 2 URLs multiple times naturally — don't create new ones.
6. 2-3 external links to authoritative sources (Wikipedia, Bladeforums.com, manufacturer sites)
7. Include ONE comparison/features HTML table where relevant
8. 5+ FAQ questions at the end
9. Plain, direct tone — no marketing fluff

BANNED PHRASES:
- "premium", "pinnacle", "discerning", "best-in-class", "cutting-edge"
- "state-of-the-art", "top-tier", "unparalleled", "ultimate"

STRUCTURE (HTML):
- <p>Author byline</p>
- <p>Intro paragraph (hook + what reader will learn)</p>
- <h2> sections for main content
- <h3> subsections
- <table> for comparison (if comparison/buying-guide)
- <h2>Frequently Asked Questions</h2>
- For each FAQ: <h3>Actual question text ending with a question mark</h3><p>Actual answer text</p>
- DO NOT use placeholder text like "Q1?" or "A1" — write the real question and answer
- <p>Closing thoughts + CTA</p>

META RULES:
- metaTitle: 55-60 chars, includes primary keyword + "Michigan Sports Outdoor" or "MSO"
- metaDescription: 145-160 chars, primary keyword + concrete hook + soft CTA
- No fluff words in either

OUTPUT — RETURN VALID JSON ONLY (no code fences):
{
  "title": "Blog post title as displayed at the top of the page (H1)",
  "metaTitle": "SEO title tag (55-60 chars)",
  "metaDescription": "SEO meta description (145-160 chars)",
  "contentHtml": "<p>By Mubashar Shahzad...</p><p>Intro...</p><h2>...</h2>...",
  "faqs": [
    { "question": "Q1?", "answer": "Plain text answer" },
    { "question": "Q2?", "answer": "Plain text answer" },
    { "question": "Q3?", "answer": "Plain text answer" },
    { "question": "Q4?", "answer": "Plain text answer" },
    { "question": "Q5?", "answer": "Plain text answer" }
  ]
}`;
}

// ---------- Helpers ----------

function getTodayCategory() {
  const dayOfWeek = new Date().getDay();
  return WEEKLY_SCHEDULE[dayOfWeek] ?? null;
}

function buildFaqSchema(faqs: { question: string; answer: string }[]): string {
  if (!faqs || faqs.length === 0) return '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return `\n<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
}
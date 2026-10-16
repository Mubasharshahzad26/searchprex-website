import { config } from "dotenv";
config({ path: ".env.local" });
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const SITE = "https://www.searchprex.com";

const ARTICLES = [
  {
    slug: "google-gemini-4-argon-ai-mode-rollout",
    title: "Google Rolls Out Gemini 4 Argon in AI Mode for AI Pro & Ultra Subscribers",
    metaTitle: "Gemini 4 Argon in Google AI Mode: Law Firm & Ecommerce Impact",
    metaDescription:
      "Google has rolled out Gemini 4 Argon globally in AI Mode for Google AI Pro and Ultra subscribers. Here is what it means for Law Firm and eCommerce AI visibility.",
    excerpt:
      "Google has launched Gemini 4 Argon globally inside Search AI Mode for Google AI Pro and Ultra subscribers. Take: What deeper multi-step reasoning in AI Mode means for Law Firms and eCommerce AI visibility.",
    category: "SEO News — AI Search",
    tag: "AI Search",
    readTime: "5-minute read",
    publishedAt: new Date("2026-10-15T16:30:00.000Z"),
    coverImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&h=630&q=80&fm=webp",
    sourceLabel: "Search Engine Roundtable",
    sourceHref: "https://www.seroundtable.com/",
    content: `## Key Takeaways

- **Global Rollout in AI Mode:** Google has officially rolled out **Gemini 4 Argon** inside Google Search's **AI Mode** at a global level for **Google AI Pro** and **Google AI Ultra** subscribers, as reported by [Search Engine Roundtable](https://www.seroundtable.com/).
- **Multi-Step Query Fan-Out:** Gemini 4 Argon introduces deeper reasoning chains and broader query fan-out, synthesizing complex commercial and legal comparisons in a single conversational view.
- **SearchPrex Take — Law Firms & eCommerce:** High-intent users subscribing to AI Pro and Ultra represent affluent decision-makers. For **law firms**, AI Mode now evaluates fee structures, jurisdiction specificity, and verified attorney credentials before naming a practice. For **eCommerce brands**, Gemini 4 Argon cross-checks live product attributes, return policies, and third-party authority signals before recommending a store.

## What Happened

Google has expanded the capabilities of **AI Mode** in Search by deploying its **Gemini 4 Argon** model globally for paid **Google AI Pro** and **Google AI Ultra** tier subscribers. Coverage via [Search Engine Roundtable](https://www.seroundtable.com/) confirms that eligible subscribers can now select and trigger Gemini 4 Argon directly within the AI Mode search interface across supported global regions.

![Google Gemini 4 Argon in AI Mode search interface and AI visibility analysis](https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=900&h=480&q=75&fm=webp)

Unlike standard fast-response models used for baseline AI Overviews, Gemini 4 Argon is engineered for deep analytical synthesis, multi-constraint comparisons, and sustained follow-up reasoning inside Search. When a user enters a high-stakes query, the model executes simultaneous background sub-queries across the web index and Shopping Graph before assembling a cited recommendation.

## SearchPrex Take: What AI Visibility Means for Law Firms & eCommerce Sites

While Gemini 4 Argon in AI Mode is currently gated to AI Pro and Ultra subscribers, those cohorts skew heavily toward high-income consumers, corporate buyers, and B2B researchers. How this model selects citations Today previews how baseline AI Mode will rank brands for all users tomorrow.

### 1. Impact on Law Firms (Legal SEO & AEO)
Legal queries in AI Mode rarely look like two-word keywords (*"car accident lawyer"*). Instead, users prompt Gemini 4 Argon with full case scenarios: *"Who are the top-rated commercial litigation or personal injury firms in Houston with trial verdicts over $5M and contingency fee transparency?"*

- **Entity & Bar Verification:** Gemini 4 Argon cross-references state bar associations, Avvo/Martindale profiles, and structured \`LegalService\` and \`Attorney\` schema.
- **Practice-Area Depth Over Doorway Pages:** Thin city-swapped location pages are ignored during query fan-out. Law firms need substantive, statute-cited practice guides and documented case results to earn AI Mode citations.
- **Local & Organic Alignment:** Ensure your Google Business Profile categories, review sentiment, and on-site practice hubs align with our [Local SEO & Map Pack standards](${SITE}/resources/news/local-seo-updates).

### 2. Impact on eCommerce Sites (Retail & Product GEO)
In eCommerce, Gemini 4 Argon compares technical specifications, compatibility matrices, warranty terms, and real buyer feedback across dozens of stores simultaneously.

- **Structured Feed & Schema Completeness:** Stores with complete \`Product\`, \`OfferShippingDetails\`, and \`MerchantReturnPolicy\` JSON-LD markup give Gemini 4 Argon machine-readable proof to cite their product cards directly.
- **Comparison & Buying Guide Architecture:** Publishing honest comparison tables, sizing matrices, and compatibility data on category and product pages increases citation probability in [Ecommerce AI Search](${SITE}/resources/news/ecommerce-seo-news-2026).

---

### 🔍 Free Resource: Check Your Website's Domain Authority
Before Gemini 4 Argon or Google's core ranking systems cite your pages in AI Mode, your domain needs verifiable link authority and trust signals. Benchmark your site's current authority score and backlink profile for free:
👉 **[Use the Free Domain Authority (DA) Checker at NicheSEOPro →](https://nicheseopro.com/authority-checker)**

---

## Action Checklist for AI Mode Readiness

1. **Audit Brand & Entity Citations:** Run your core commercial prompts in AI Mode to see whether Gemini cites your domain, third-party directories, or competitors.
2. **Benchmark Domain Authority:** Verify your domain trust and referring domain quality using the [Free DA Checker](https://nicheseopro.com/authority-checker) to spot authority gaps against cited competitors.
3. **Upgrade Schema Markup:** Implement nested \`Organization\`, \`Person\`, \`Product\`, or \`LegalService\` JSON-LD with verified \`sameAs\` entity links.
4. **Add Direct Answer Blocks:** Structure key service and category pages with concise, factual summary blocks that directly answer multi-part buyer questions.

## Quick answers

### Who has access to Gemini 4 Argon in Google AI Mode?
Gemini 4 Argon is rolling out globally in Google Search's AI Mode for users subscribed to Google AI Pro and Google AI Ultra plans.

### How does Gemini 4 Argon affect SEO and AI visibility for law firms and eCommerce?
Gemini 4 Argon performs deeper query fan-out across multiple sub-queries. Law firms need verifiable case results, statute-backed guides, and Attorney schema, while eCommerce sites need complete Product schema, clear shipping/return data, and strong domain authority to be cited.

## Sources

- [Search Engine Roundtable (seroundtable)](https://www.seroundtable.com/) — Coverage of Google rolling out Gemini 4 Argon globally in AI Mode for AI Pro and Ultra subscribers.
- [LLM & Answer Engine Optimization News](${SITE}/resources/news/llm-seo-news-2026) — SearchPrex 2026 AEO & AI Mode tracking log.

_Last verified: October 15, 2026._`,
  },
  {
    slug: "how-google-ranks-pdfs-search-ai-mode-checklist",
    title: "How Google Ranks PDFs in Search & AI Mode: Law Firm & Ecommerce Checklist",
    metaTitle: "How Google Ranks PDFs in Search & AI Mode (SEO Checklist)",
    metaDescription:
      "Google explained how it crawls, indexes, and ranks PDFs in Web Search and AI Mode, plus how to test if a PDF is SEO-friendly. Checklist for Law Firms & Ecommerce.",
    excerpt:
      "Google clarified how PDFs are converted, indexed, and ranked across both traditional Search and AI Mode, alongside methods to verify if a PDF is SEO-friendly. Take: A practical PDF checklist for Law Firm guides/forms and eCommerce catalogs.",
    category: "SEO News — Technical",
    tag: "Technical",
    readTime: "6-minute read",
    publishedAt: new Date("2026-10-15T14:15:00.000Z"),
    coverImage:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&h=630&q=80&fm=webp",
    sourceLabel: "Search Engine Journal",
    sourceHref: "https://www.searchenginejournal.com/",
    content: `## Key Takeaways

- **PDF Ranking in Search & AI Mode:** Google has detailed how PDF documents are crawled, converted into HTML-like representations, and ranked across both traditional Web Search and **AI Mode**, as covered by [Search Engine Journal](https://www.searchenginejournal.com/).
- **SEO-Friendliness Verification:** Google highlighted how site owners can test whether a PDF is genuinely machine-readable (text-based vs. flattened image scans) using Search Console's URL Inspection tool and document properties.
- **SearchPrex Take — Law Firms & eCommerce Checklist:** Law firms (legal guides, client intake packets, court forms) and eCommerce brands (product catalogs, spec sheets, installation manuals) publish thousands of PDFs that either leak ranking equity or fail to index. Below is our niche-specific PDF SEO checklist.

## What Happened

As reported by [Search Engine Journal](https://www.searchenginejournal.com/), Google clarified the mechanics of how Portable Document Format (PDF) files are processed and ranked in modern Search and **AI Mode**. While Google has indexed PDFs since 2001, the rise of generative answer engines has changed how static documents are parsed and cited.

![How Google ranks PDFs in Search and AI Mode technical SEO checklist](https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&h=480&q=75&fm=webp)

Key technical clarifications include:

1. **Text Layer vs. Scanned Images:** Google prioritizes PDFs with a real, selectable text layer. If a PDF is saved as a flat image scan, Google must rely on Optical Character Recognition (OCR), which is resource-heavy and prone to dropping structured tables or fine print.
2. **How Google Extracts Titles:** Because PDFs do not use standard HTML \`<title>\` tags, Google constructs the SERP title from two primary signals: the **Document Title metadata property** inside the PDF file and the **anchor text** of internal/external links pointing to the PDF.
3. **Links & PageRank Flow:** Links inside PDFs can pass signals, but PDFs lack standard navigation menus, breadcrumb trails, and mobile-responsive viewports—meaning HTML landing pages generally outperform PDFs for competitive head terms, while PDFs excel for long-tail specification, form, and regulatory queries in AI Mode.

## How to Check if Your PDF is SEO-Friendly

To verify whether Google can properly parse and rank a PDF on your domain:

- **The Copy-Paste Test:** Open the PDF and try selecting a sentence. If you cannot highlight individual words, the file is an image scan and needs text encoding.
- **Document Properties Check:** In Adobe Acrobat or your PDF generator (` + "`File > Properties > Description`" + `), verify that the **Title**, **Author**, and **Subject** fields are populated with clean, human-readable text (not \`Microsoft Word - final_v3_PRINT.docx\`).
- **GSC URL Inspection:** Paste the direct \`.pdf\` URL into Google Search Console's **URL Inspection** tool to confirm it is indexed, check the declared canonical, and verify that crawl requests are not blocked by \`robots.txt\`.

---

### 🔍 Free Tool: Check Your Domain & Page Authority
PDFs and resource hubs rank significantly faster when backed by strong domain authority. Check your website's DA, backlink health, and authority metrics for free:
👉 **[Check Your Website Authority Free at NicheSEOPro →](https://nicheseopro.com/authority-checker)**

---

## SearchPrex Niche Checklist: Law Firm & eCommerce PDFs

PDFs are massive hidden assets in both legal services and online retail. Use this tailored checklist to turn orphaned PDFs into AI Mode citations and organic traffic drivers:

### ⚖️ For Law Firms (Legal Guides, Intake Forms & Checklists)
Law firms frequently upload accident checklists, estate planning worksheets, fee agreements, and state regulatory guides as PDFs.

- [ ] **Pair Every High-Value PDF With an HTML Summary Page:** Never rely on a raw PDF alone for a primary keyword. Create an indexable HTML guide page that summarizes the legal topic and embeds a download button for the printable PDF checklist.
- [ ] **Clean Up File Names & Metadata Titles:** Rename \`scan_0042.pdf\` to \`texas-commercial-truck-accident-evidence-checklist.pdf\` and set a matching Document Title in PDF properties.
- [ ] **Add HTTP \`Link\` Canonical Headers for Duplicate Content:** If your PDF contains the exact same text as a practice area web page, serve an HTTP \`Link: <https://yourdomain.com/practice-page>; rel="canonical"\` header so the PDF doesn't cannibalize your mobile-friendly HTML page.
- [ ] **Embed Clickable Links Back to Your Consultation Page:** Every page of a downloadable legal guide should include a live, clickable URL back to your firm's case evaluation form.

### 🛒 For eCommerce Sites (Catalogs, Spec Sheets & Sizing Guides)
Manufacturers, B2B wholesalers, and retail stores rely on PDF spec sheets, safety data sheets (SDS), assembly manuals, and seasonal catalogs.

- [ ] **Keep Spec Tables as Native Text (Never Flattened Images):** AI Mode frequently pulls exact voltage, dimensions, material grades, and part numbers directly from PDF spec sheets when answering buyer compatibility questions.
- [ ] **Link Spec Sheets With Descriptive Anchor Text:** On your product pages, replace generic *"Download PDF"* anchor text with *"Download [Brand + Model] Technical Specification Sheet (PDF)"*.
- [ ] **Compress File Size Under 5 MB:** Large, uncompressed print catalogs time out during mobile rendering and crawl passes. Optimize images inside the PDF for web delivery.
- [ ] **Prevent Old Seasonal Catalogs From Outranking Live Products:** Use \`X-Robots-Tag: noindex\` HTTP headers on outdated price lists or discontinued seasonal catalogs while keeping evergreen manuals indexable.

## Quick answers

### Can Google rank PDFs in both Web Search and AI Mode?
Yes. Google converts PDFs into an HTML-equivalent representation for indexing and can surface information from text-based PDFs directly in Web Search results and AI Mode citations.

### How does Google choose the title of a PDF in search results?
Google combines the PDF's internal Document Title metadata property with the anchor text of links pointing to the PDF URL.

### Should law firms and eCommerce sites use HTML pages or PDFs for SEO?
Use HTML pages for primary commercial and service rankings because they are mobile-responsive and support rich schema. Use optimized, text-based PDFs as downloadable companions for spec sheets, catalogs, legal checklists, and forms.

## Sources

- [Search Engine Journal (searchenginejournal)](https://www.searchenginejournal.com/) — How Google ranks PDFs in Search and AI Mode, and how to check if a PDF is SEO-friendly.
- [Technical SEO News 2026](${SITE}/resources/news/technical-seo-news-2026) — SearchPrex crawling, indexing, and technical architecture log.

_Last verified: October 15, 2026._`,
  },
  {
    slug: "google-discover-proactive-concierge-dive-deeper-ai-test",
    title: 'Google Discover May Evolve Into a "Proactive Concierge" as "Dive Deeper" AI Feature Tests',
    metaTitle: 'Google Discover "Proactive Concierge" Shift & "Dive Deeper" AI Test',
    metaDescription:
      'A Google job posting hints that Discover could transform from a passive feed into a proactive personal concierge, alongside live tests of a "Dive deeper" AI feature.',
    excerpt:
      'A new Google job listing suggests Google Discover is evolving from a passive content feed into a "proactive concierge" experience, coinciding with live tests of an AI-powered "Dive deeper" feature inside the Discover feed.',
    category: "SEO News — AI Search",
    tag: "Discover",
    readTime: "5-minute read",
    publishedAt: new Date("2026-10-15T11:00:00.000Z"),
    coverImage:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&h=630&q=80&fm=webp",
    sourceLabel: "Search Engine Land & Envisionit Agency",
    sourceHref: "https://searchengineland.com/",
    content: `## Key Takeaways

- **From Feed to "Proactive Concierge":** A newly spotted Google job posting indicates that Google envisions evolving **Google Discover** from a passive article feed into a **proactive personal concierge experience**, as reported by [Search Engine Land](https://searchengineland.com/) and [Envisionit Agency](https://envisionitagency.com/).
- **"Dive Deeper" AI Feature in Testing:** Alongside the strategic shift, Google is actively testing a new **"Dive deeper"** AI feature in Discover that allows users to expand feed topics into interactive, AI-guided exploration threads.
- **What It Means for Publishers & Brands:** As Discover integrates conversational AI prompts ("Dive deeper") and task-oriented concierge cards, traffic will increasingly flow to publishers and brands that provide deep follow-up utility rather than surface-level curiosity headlines.

## What Happened

Two connected developments are signaling where **Google Discover** is headed next. First, industry reporting from [Search Engine Land](https://searchengineland.com/) and analysis shared by [Envisionit Agency](https://envisionitagency.com/) highlighted language in a Google recruitment listing describing the future of Discover not merely as a personalized news stream, but as a **"proactive concierge"** that anticipates user needs, tasks, and ongoing interests.

![Google Discover proactive concierge and Dive deeper AI feature on mobile](https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&h=480&q=75&fm=webp)

Second, users and SEO researchers have spotted Google testing a **"Dive deeper"** AI prompt button attached to Discover cards. Tapping *"Dive deeper"* transitions the user from a passive headline card into an AI-curated breakdown with suggested follow-up angles, related questions, and synthesized context—bridging the gap between Google Discover and **AI Mode**.

## How a "Proactive Concierge" Changes Google Discover SEO

Earlier in 2026, Google rolled out its [first Discover-only Core Update](${SITE}/resources/news/google-algorithm-updates), which rewarded local relevance, original reporting, and deep topical expertise while demoting sensational clickbait. The shift toward a proactive concierge with *"Dive deeper"* AI branches accelerates that trajectory:

1. **Zero-Click Summaries vs. Deep-Dive Clicks:** Surface-level news rewrites will be absorbed by the concierge overview. Users who click through from a *"Dive deeper"* prompt are looking for original data, step-by-step execution guides, calculators, or local service providers.
2. **Multi-Session Topic Tracking:** A concierge experience tracks a user's multi-week journey—such as researching a home renovation, evaluating enterprise software, or comparing legal options—and proactively surfaces next-step content.
3. **Visual & Entity Signals Remain Mandatory:** High-resolution 1200px+ images (\`max-image-preview:large\`), clear author bylines, and strong entity associations remain prerequisites for Discover eligibility.

---

### 🔍 Free Tool: Benchmark Your Domain Authority
Strong domain authority and clean backlink profiles help Google's Discover and AI systems trust your brand as a primary topical source. Check your domain authority for free:
👉 **[Test Your Site with the Free DA Checker at NicheSEOPro →](https://nicheseopro.com/authority-checker)**

---

## Action Plan: Optimizing for Discover's Next Phase

- **Structure Articles for "Dive Deeper" Follow-Ups:** Anticipate the next 3 questions a reader will ask after reading your headline, and answer them in clearly structured H2/H3 sections.
- **Publish Actionable Assets:** Concierge feeds favor content that helps users *complete a task*—interactive checklists, comparison matrices, local cost breakdowns, and buyer guides.
- **Verify Image & Schema Standards:** Ensure every article uses a compelling, original 16:9 hero image (at least 1200px wide) with \`max-image-preview:large\` enabled and complete \`NewsArticle\` or \`BlogPosting\` schema.

## Quick answers

### What is Google Discover's "proactive concierge" shift?
Language in a Google job posting indicates Google is working to evolve Discover from a passive content feed into a proactive personal concierge that anticipates user tasks, interests, and next steps.

### What is the "Dive deeper" feature in Google Discover?
"Dive deeper" is an AI-powered feature being tested in Google Discover that lets users tap on a feed topic to explore AI-generated context, follow-up questions, and deeper subtopics.

## Sources

- [Search Engine Land (searchengineland)](https://searchengineland.com/) — Reporting on Google Discover's proactive concierge direction and "Dive deeper" AI testing.
- [Envisionit Agency (envisionitagency)](https://envisionitagency.com/) — Industry analysis on Google Discover's evolution toward a personal concierge experience.
- [Google Algorithm Updates 2026 Tracker](${SITE}/resources/news/google-algorithm-updates) — SearchPrex log of the 2026 Discover Core Update.

_Last verified: October 15, 2026._`,
  },
];

async function main() {
  for (const item of ARTICLES) {
    const liveUrl = `${SITE}/resources/news/${item.slug}`;

    // 1. Upsert into MarketingBlog (spoke deep-dive page)
    const existingBlog = await db.marketingBlog.findUnique({
      where: { slug: item.slug },
    });

    const blogData = {
      slug: item.slug,
      title: item.title,
      metaTitle: item.metaTitle,
      metaDescription: item.metaDescription,
      excerpt: item.excerpt,
      category: item.category,
      author: "Mubashar Sharif",
      coverImage: item.coverImage,
      content: item.content,
      readTime: item.readTime,
      canonicalUrl: liveUrl,
      schemaType: "NewsArticle",
      published: true,
      publishedAt: item.publishedAt,
    };

    if (existingBlog) {
      await db.marketingBlog.update({
        where: { slug: item.slug },
        data: blogData,
      });
      console.log(`Updated MarketingBlog spoke: ${item.slug}`);
    } else {
      await db.marketingBlog.create({
        data: blogData,
      });
      console.log(`Created MarketingBlog spoke: ${item.slug}`);
    }

    // 2. Upsert into MarketingNews (chronological news item)
    const existingNews = await db.marketingNews.findFirst({
      where: { title: item.title },
    });

    const newsData = {
      title: item.title,
      summary: item.excerpt,
      tag: item.tag,
      sourceLabel: item.sourceLabel,
      sourceHref: item.sourceHref,
      newsDate: item.publishedAt,
      published: true,
    };

    if (existingNews) {
      await db.marketingNews.update({
        where: { id: existingNews.id },
        data: newsData,
      });
      console.log(`Updated MarketingNews item: ${item.title}`);
    } else {
      await db.marketingNews.create({
        data: newsData,
      });
      console.log(`Created MarketingNews item: ${item.title}`);
    }
  }

  console.log("\nAll 3 October 15, 2026 SEO News items published successfully!");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
    process.exit(0);
  });

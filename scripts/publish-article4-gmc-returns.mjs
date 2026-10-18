import { config } from "dotenv";
config({ path: ".env.local" });
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const SITE = "https://www.searchprex.com";
const SLUG = "google-merchant-center-sitewide-return-policy-schema-mandate";

const content = `## Key Takeaways

**Short answer:** Google Merchant Center (GMC) now requires online stores to provide structured return policy schema (\`hasMerchantReturnPolicy\`) matching their GMC feed settings. Discrepancies between on-page return claims and GMC account settings trigger silent de-listing from free Google Shopping listings and AI Overview shopping carousels. Nesting this markup inside your sitewide \`Organization\` schema solves compliance without bloating individual product detail pages.

- **Mandatory On-Page Validation:** Configuring return policies solely inside the GMC dashboard is no longer sufficient. Google's Shopping Graph bot actively crawls and verifies structured data on your website.
- **The Discrepancy Penalty:** If your website states *"30-day returns, customer pays return shipping"* but your GMC feed advertises *"Free 30-day returns"*, Google issues an account warning and demotes your products from the Google Shopping tab.
- **Sitewide Organization Schema Efficiency:** Rather than modifying thousands of individual product pages, embedding \`hasMerchantReturnPolicy\` within your root \`Organization\` JSON-LD schema applies the policy domain-wide.
- **Shopping Graph Rich Results:** Compliant stores earn valuable rich snippets in Google Search, including *"Free 30-day returns"* and *"Free delivery"* trust badges that boost click-through rates by up to 28%.

## What Happened

Google has updated its Merchant Listings documentation and Google Merchant Center enforcement algorithms. While previously treated as an optional enhancement, Google now actively audits whether ecommerce domains provide machine-readable return policy data directly on-site.

According to notifications delivered to merchant accounts across Shopify, WooCommerce, and Magento platforms, stores with missing or mismatched return policies are seeing product items flagged under **Account Issues** with warnings such as: *"Missing return policy on website"* or *"Mismatched return costs between website and Merchant Center."*

![Google Merchant Center Sitewide Return Policy Schema Setup Guide](/images/news/google-merchant-center-sitewide-return-policy-schema-mandate.webp)

When unaddressed, these warnings escalate into silent account-level item disapprovals, stripping product cards from free organic Shopping results, Google Images product badges, and emerging conversational AI shopping carousels.

## The Recommended JSON-LD Implementation

To achieve compliance without bloating individual product detail pages (PDPs), Google supports defining the policy once at the root \`Organization\` level:

\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.yourstore.com/#organization",
  "name": "Your Store Name",
  "url": "https://www.yourstore.com",
  "hasMerchantReturnPolicy": {
    "@type": "MerchantReturnPolicy",
    "@id": "https://www.yourstore.com/#return-policy",
    "applicableCountry": "US",
    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
    "merchantReturnDays": 30,
    "returnMethod": "https://schema.org/ReturnByMail",
    "returnFees": "https://schema.org/FreeReturn",
    "returnShippingFeesAmount": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0.00"
    },
    "refundType": "https://schema.org/FullRefund"
  }
}
\`\`\`

## GMC Dashboard vs. On-Page Schema: Comparison

Ensuring strict alignment between your website's terms and Merchant Center settings prevents algorithmic suspension:

| Policy Dimension | Google Merchant Center Dashboard | On-Page Schema (\`hasMerchantReturnPolicy\`) |
|---|---|---|
| **Return Window** | Set in GMC: e.g., 30 Days from delivery | Must declare: \`merchantReturnDays: 30\` |
| **Return Shipping Fee** | Set in GMC: Free or Customer pays flat rate | Must declare: \`FreeReturn\` or \`ReturnShippingCustomerResponsibility\` |
| **Restocking Fee** | Declared under Return Policy settings | Declared via: \`customerRemorseReturnFees\` |
| **Applicable Country** | Target country (e.g., United States) | Must match: \`applicableCountry: "US"\` |
| **Verification Method** | Manual form entry in GMC settings | Automated Shopping Graph crawler verification |

## SearchPrex Take: What Ecommerce Brands Must Do

In competitive retail niches, organic Shopping visibility is often the highest-ROI channel. As detailed across our [Ecommerce SEO Strategy](${SITE}/services/ecommerce-seo) and [Technical SEO Architecture](${SITE}/services/technical-seo), algorithmic compliance requires continuous schema validation:

### 1. Synchronize Merchant Center & Website Disclosures
Audit your checkout, footer, and dedicated return policy pages. If your website policy page mentions a $5.99 return label fee, your GMC dashboard and on-page schema must declare that exact fee. Never advertise "Free Returns" in GMC if you deduct restocking or return freight fees at refund time.

### 2. Pair Return Schema with OfferShippingDetails
Google's merchant crawlers evaluate the full transaction lifecycle. Pair your \`MerchantReturnPolicy\` with structured \`OfferShippingDetails\` declaring handling times, transit cutoff hours, and carrier services.

### 3. Fortify AI Search Visibility in ChatGPT & Google AI Mode
AI shopping assistants cross-check structured feeds before recommending products. Learn how OpenAI's new search engine discovers and attributes product data in our companion guide to [ChatGPT Search & GEO Optimization](${SITE}/resources/news/openai-chatgpt-search-official-launch-geo-oai-searchbot-guide).

---

### 🔍 Free Tool: Check Your Ecommerce Domain Authority & Trust
Google Merchant Center algorithms award priority indexing and rich product carousel badges to domains with high authority scores and strong backlink equity. Test your store's domain authority and authority gap for free:

<div style="background: linear-gradient(135deg, #070a1c 0%, #151638 100%); border: 1px solid #1e293b; border-radius: 16px; padding: 24px; margin: 28px 0; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);">
  <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 16px;">
    <div>
      <span style="display: inline-block; background: rgba(59, 130, 246, 0.2); color: #60a5fa; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; border: 1px solid rgba(59, 130, 246, 0.4);">Verified Ecommerce SEO Tool</span>
      <h3 style="color: #ffffff; font-size: 19px; font-weight: 800; margin: 6px 0 0 0;">Free Ecommerce Domain Authority (DA) & Trust Checker</h3>
    </div>
    <span style="color: #94a3b8; font-size: 13px;">No Signup Required</span>
  </div>
  <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6; margin-bottom: 18px;">
    Enter your ecommerce domain to calculate your real-time 0–100 Domain Authority, shopping trust score, and backlink health.
  </p>
  <form action="https://nicheseopro.com/authority-checker" method="GET" target="_blank" style="display: flex; gap: 10px; flex-wrap: wrap;">
    <input type="text" name="domain" placeholder="yourstore.com" required style="flex: 1; min-width: 240px; height: 46px; border-radius: 9999px; border: 1px solid #334155; background: #0f172a; padding: 0 20px; color: #ffffff; font-size: 14px; outline: none;" />
    <button type="submit" style="height: 46px; border-radius: 9999px; background: #3b82f6; color: #ffffff; font-weight: 700; font-size: 14px; padding: 0 24px; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: background 0.2s;">
      <span>Check Domain Authority</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </button>
  </form>
</div>

---

## Action Checklist for Ecommerce Compliance

1. **Audit Merchant Center Account Diagnostics:** Log into your Google Merchant Center account, navigate to **Products > Diagnostics**, and check for active or pending return policy warnings.
2. **Implement \`hasMerchantReturnPolicy\` in Root Schema:** Add the structured JSON-LD block shown above to your site's root layout template or global header, or use our [JSON-LD Schema Generator](${SITE}/tools/schema-generator).
3. **Verify with Google Rich Results Test:** Paste your homepage and a sample product URL into Google's Rich Results Test tool. Verify that \`Merchant listings\` is detected with zero errors under return policy parameters.
4. **Synchronize Multi-Country Feeds:** If your store ships internationally (e.g., US, Canada, UK), define explicit \`applicableCountry\` return rules for each regional storefront.
5. **Request a Free Ecommerce SEO Reality Check:** If your organic revenue or Google Shopping impressions have stalled, request our [Free Ecommerce Reality Check Audit](${SITE}/free-audit) to inspect your technical feed health and structured data.

## Quick answers

### Is return policy schema mandatory for Google Merchant Center?
Yes. Google has transitioned return policy structured data (\`hasMerchantReturnPolicy\`) from an optional enhancement to a mandatory requirement for free Merchant Listings. Missing or contradictory schema can trigger feed disapprovals and demotion in Google Shopping.

### Can I define the return policy once for the entire store?
Yes. Google explicitly allows nesting \`hasMerchantReturnPolicy\` under your sitewide \`Organization\` schema. This applies the return policy to all products automatically without requiring repetitive edits across individual product pages.

### What happens if my website return policy contradicts Merchant Center?
Google will flag an account discrepancy warning under Diagnostics. If uncorrected, Google overrides your Merchant Center claims with what is found on your website, or temporarily suspends your products from free shopping placements.

### Does return policy schema improve organic rankings?
While not a direct ranking factor for blue links, valid return policy schema qualifies product listings for enhanced badges (like *"Free 30-day returns"*) in Google Search and AI Overviews, substantially increasing click-through rates and buyer conversion.

## Sources

- [Google Search Central: Merchant Return Policy Structured Data](https://developers.google.com/search/docs/appearance/structured-data/merchant-return-policy)
- [Google Merchant Center Help: Return Policy Guidelines](https://support.google.com/merchants/answer/7052112)
- [SearchPrex Ecommerce SEO Hub](${SITE}/resources/news/ecommerce-seo-news-2026)
- [SearchPrex Technical SEO & Schema Services](${SITE}/services/technical-seo)
- [ChatGPT Search Launch & Shopping GEO Guide](${SITE}/resources/news/openai-chatgpt-search-official-launch-geo-oai-searchbot-guide)
`;

async function main() {
  const liveUrl = `${SITE}/resources/news/${SLUG}`;

  console.log(`Publishing Ecommerce SEO News Spoke: ${SLUG}`);

  // 1. Upsert into MarketingBlog
  const existingBlog = await db.marketingBlog.findUnique({
    where: { slug: SLUG },
  });

  const blogData = {
    slug: SLUG,
    title: "Google Merchant Center Mandates Sitewide Return Policy Schema: Setup & Compliance Guide",
    metaTitle: "Google Merchant Center Return Policy Schema Mandate (2026)",
    metaDescription:
      "Google Merchant Center now mandates sitewide return policy schema. Avoid product feed suspensions with hasMerchantReturnPolicy Organization markup.",
    excerpt:
      "Google has tightened Google Merchant Center enforcement, issuing warnings and feed suspensions for stores lacking structured sitewide return policy schema. Here is how to configure hasMerchantReturnPolicy under Organization and Product markup.",
    category: "SEO News — Ecommerce",
    author: "Mubashar Sharif",
    coverImage: "/images/news/google-merchant-center-sitewide-return-policy-schema-mandate.webp",
    content: content,
    readTime: "6-minute read",
    canonicalUrl: liveUrl,
    schemaType: "NewsArticle",
    published: true,
    publishedAt: new Date("2026-10-18T13:00:00.000Z"),
    ogTitle: "Google Merchant Center Return Policy Schema Mandate (2026)",
    ogDescription:
      "Google Merchant Center now mandates sitewide return policy schema. Avoid product feed suspensions with hasMerchantReturnPolicy Organization markup.",
    twitterTitle: "Google Merchant Center Return Policy Schema Mandate (2026)",
    twitterDescription:
      "Google Merchant Center now mandates sitewide return policy schema. Avoid product feed suspensions with hasMerchantReturnPolicy Organization markup.",
  };

  if (existingBlog) {
    await db.marketingBlog.update({
      where: { slug: SLUG },
      data: {
        ...blogData,
        updatedAt: new Date(),
      },
    });
    console.log(`SUCCESS: Updated existing MarketingBlog spoke: ${SLUG}`);
  } else {
    await db.marketingBlog.create({
      data: blogData,
    });
    console.log(`SUCCESS: Created new MarketingBlog spoke: ${SLUG}`);
  }

  // 2. Upsert into MarketingNews (Feed)
  const existingNews = await db.marketingNews.findFirst({
    where: { title: blogData.title },
  });

  const newsData = {
    title: blogData.title,
    summary: blogData.excerpt,
    tag: "Ecommerce",
    sourceLabel: "Google Merchant Center & Search Central",
    sourceHref: "https://developers.google.com/search/docs/appearance/structured-data/merchant-return-policy",
    newsDate: new Date("2026-10-18T13:00:00.000Z"),
    published: true,
  };

  if (existingNews) {
    await db.marketingNews.update({
      where: { id: existingNews.id },
      data: newsData,
    });
    console.log(`SUCCESS: Updated MarketingNews item: ${blogData.title}`);
  } else {
    await db.marketingNews.create({
      data: newsData,
    });
    console.log(`SUCCESS: Created MarketingNews item: ${blogData.title}`);
  }

  console.log(`\nArticle 4 published live to database: ${liveUrl}`);
}

main()
  .catch((err) => {
    console.error("FAILED to publish Article 4:", err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
    process.exit(0);
  });

import type { Metadata } from "next";
import Link from "next/link";
import { getPageSEO } from "@/lib/admin-seo";
import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import {
  Breadcrumb,
  CardGrid,
  FaqList,
  FeatureCard,
  PageHero,
  Section,
  SectionHeading,
  StatStrip,
  Accent,
} from "@/components/layout";
import { SITE, founderRef, organizationRef, websiteRef } from "@/lib/site-schema";
import SchemaGeneratorClient from "./SchemaGeneratorClient";

const PAGE_URL = `${SITE}/tools/schema-generator`;
const TITLE = "Free Schema Markup Generator (JSON-LD Tool)";
const DESCRIPTION =
  "Generate 100% valid JSON-LD schema markup for US local businesses, law firms, eCommerce stores, articles, and reviews. Boost Google rich results with zero code.";
const LAST_REVIEWED = "2026-10-01";

const baseMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `${TITLE} | SearchPrex`,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "SearchPrex",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("/tools/schema-generator", baseMetadata);
}

const WHICH_SCHEMAS = [
  {
    title: "US Local Businesses & Contractors",
    label: "LocalBusiness Schema",
    body: "Essential for US local contractors, plumbers, electricians, HVAC services, and storefronts. Specifies your official legal business name, street address, local phone number (NAP), operating hours, and price range. For maximum Google Maps 3-Pack rankings, your schema NAP must match your Google Business Profile (GBP) and US local citations exactly.",
  },
  {
    title: "Law Firms & Attorneys",
    label: "LegalService Schema",
    body: "Tailored specifically for US personal injury, criminal defense, family law, and commercial litigation practices. Pairs LegalService at the firm level with individual Person schemas for attorneys. Connects your practice areas via knowsAbout and your geographic jurisdiction via areaServed (city, county, or state).",
  },
  {
    title: "Shopify & eCommerce Stores",
    label: "Product & Offer Schema",
    body: "Required for Shopify, WooCommerce, and US online retail stores. Generates valid Product structured data with nested Offer properties (price, currency in USD, availability in stock, and SKU). Powers Google Shopping organic product cards, in-stock badges, and price-drop notifications in Search.",
  },
  {
    title: "Articles, News & Blogs",
    label: "Article Schema",
    body: "Built for editorial publications, corporate legal blogs, and industry insights. Signals content credibility by connecting the author to a verified bio page for Google E-E-A-T, linking the publisher entity, and providing ISO 8601 datePublished and dateModified timestamps.",
  },
  {
    title: "Product & Editorial Reviews",
    label: "Review Schema",
    body: "Enables star rating rich snippets when your website publishes a genuine review of an external product, book, or software application. Per Google's strict anti-spam guidelines, businesses cannot mark up customer testimonials about themselves to display review stars.",
  },
  {
    title: "FAQs & Support Knowledge Bases",
    label: "FAQPage Schema",
    body: "Structures recurring customer inquiries and detailed answers into clean, machine-readable Q&A pairs. While Google limits SERP dropdown rich results primarily to authoritative government and health domains, FAQ schema is actively parsed and cited by AI engines like ChatGPT Search, Perplexity, and Gemini.",
  },
];

const PLATFORMS = [
  {
    step: "01",
    title: "WordPress & WooCommerce",
    body: "Paste your generated script tag directly into your child theme's header.php file right before the closing </head> tag. Alternatively, insert it via a header injection plugin (such as WPCode) or within the Custom Schema section of your SEO plugin (Rank Math or Yoast).",
  },
  {
    step: "02",
    title: "Shopify Stores",
    body: "From your Shopify Admin, navigate to Online Store > Themes > Edit Code. Open the layout/theme.liquid file and paste the JSON-LD snippet directly above the closing </head> tag. For product-specific schema, embed the script inside your main-product.liquid template.",
  },
  {
    step: "03",
    title: "Webflow & Squarespace",
    body: "In Webflow, open Page Settings > Custom Code > Inside <head> Code, paste your script block, and publish. In Squarespace, navigate to Settings > Advanced > Code Injection (or individual Page Settings > Advanced > Page Header Code Injection) and paste the code.",
  },
  {
    step: "04",
    title: "Next.js & React Frameworks",
    body: "In Next.js App Router, inject JSON-LD into your layout.tsx or page.tsx using: <script type=\"application/ld+json\" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />. It renders server-side during the initial HTML response with zero runtime penalty.",
  },
];

const GOOGLE_RULES = [
  {
    title: "100% Match On-Page Visible Content",
    body: "Every single attribute in your JSON-LD—pricing, telephone number, address, or business hours—must be visible to human visitors on the page. Cloaking markup or including data not visible to users violates Google guidelines and risks a manual action.",
  },
  {
    title: "No Self-Serving Reviews for Businesses",
    body: "Google strictly prohibits companies from marking up their own customer reviews to show review stars on LocalBusiness or Organization pages. Review snippets are reserved for independent evaluations of third-party products, books, and software.",
  },
  {
    title: "Standardized US Address & Phone Syntax",
    body: "Always use standard two-letter USPS state abbreviations (e.g., CA, TX, NY, FL) and valid 5-digit postal codes. Format telephone numbers in full E.164 international format (+1-XXX-XXX-XXXX) to prevent parsing warnings in Google Search Console.",
  },
  {
    title: "Entity Disambiguation via sameAs",
    body: "Anchor your brand in Google's Knowledge Graph by including verified external profiles in your schema's sameAs array: your Google Business Profile URL, Better Business Bureau (BBB) listing, LinkedIn company page, and Wikipedia entry.",
  },
  {
    title: "Valid ISO 8601 Timestamps",
    body: "Search engines require all dates to follow ISO 8601 syntax (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ssZ). Vague or unstructured dates like 'October 2026' or 'recently updated' will fail Google's structured data validation.",
  },
  {
    title: "Mandatory Validation Before Publishing",
    body: "Always run your generated JSON-LD code through Google's Rich Results Test before deploying. Fix all errors and warnings, and check Google Search Console's Enhancement reports after publishing to verify indexation.",
  },
];

const AI_GEO_POINTS = [
  {
    title: "Authoritative Knowledge Graph Grounding",
    body: "Generative AI engines like Google AI Overviews, Perplexity AI, and OpenAI ChatGPT Search rely on Knowledge Graph entities to substantiate factual statements. JSON-LD explicitly maps your business attributes, establishing verifiable entity nodes.",
  },
  {
    title: "Higher Citation Frequency in AI Answers",
    body: "When an AI search model answers intent-driven queries (e.g., 'licensed commercial plumber near me' or 'top car accident attorney in Dallas'), structured data removes guesswork, making your website significantly more likely to be cited as a direct source.",
  },
  {
    title: "Eliminates Entity Hallucination",
    body: "Unstructured HTML text can easily be misinterpreted by automated crawlers. Structured JSON-LD explicitly dictates your exact services, business category, service areas, and executive leadership, preventing AI inaccuracies about your brand.",
  },
];

const FAQS = [
  {
    q: "What is JSON-LD schema markup, and why does Google prefer it?",
    a: "Schema markup is a standardized semantic vocabulary (from Schema.org) added to HTML to help search engines understand page content and entity context. JSON-LD (JavaScript Object Notation for Linked Data) is Google's officially recommended format because it lives cleanly inside a standalone <script> tag rather than being intertwined with HTML elements like Microdata or RDFa. It is simpler to maintain, easier to automate, and executes without impacting frontend visual rendering.",
  },
  {
    q: "Does schema markup directly improve Google rankings in the USA?",
    a: "Schema markup is not a direct algorithmic ranking factor on its own, but it strongly influences organic search performance. By helping Google comprehend your page entities, practice areas, and locations, structured data qualifies your listing for rich results (such as product pricing, stock status, and author citations). Rich snippets dramatically increase organic click-through rates (CTR), which drives higher qualified US traffic to your website.",
  },
  {
    q: "Which schema markup does a US local business or law firm need?",
    a: "A local service business should use LocalBusiness (or specific sub-types like Plumber, HVACBusiness, or Dentist) containing their exact Name, Address, and Phone (NAP), business hours, and price range. A law firm should use LegalService with areaServed (cities/counties served), knowsAbout (practice areas like personal injury or family law), and an individual Person schema on each attorney's biography page.",
  },
  {
    q: "Can I use multiple schema types on a single webpage?",
    a: "Yes. In fact, complex pages often require multiple entities. For example, an eCommerce product page typically includes Product, BreadcrumbList, and Organization. You can link multiple schemas together inside a single JSON-LD block using an @graph array or by nesting sub-properties (such as nesting an Offer and Brand inside a Product).",
  },
  {
    q: "Do FAQ rich results still show up in Google Search?",
    a: "In August 2023, Google announced that FAQ rich results (collapsible accordion dropdowns under SERP listings) would be limited primarily to authoritative government and healthcare websites. While commercial sites rarely receive visual FAQ dropdowns in Google today, FAQPage schema is still fully supported, 100% valid, and highly beneficial: AI search engines like ChatGPT Search, Perplexity, and Google AI Overviews heavily scrape structured FAQ data to generate direct answers.",
  },
  {
    q: "Why are review stars not showing for my local business in Google?",
    a: "Google strictly prohibits 'self-serving' reviews. Under Google's structured data guidelines, a LocalBusiness or Organization cannot mark up customer reviews or testimonials that it collects about its own services to generate review stars in Search results. Review rich snippets are reserved exclusively for pages reviewing external products, books, movies, recipes, or software applications.",
  },
  {
    q: "How do I test and validate my JSON-LD code?",
    a: "Use two complementary official tools: First, run your code through Google's Rich Results Test (search.google.com/test/rich-results) to verify if the markup is error-free and eligible for Google search enhancements. Second, test it in the Schema Markup Validator (validator.schema.org) to check compliance against global Schema.org syntax standards.",
  },
  {
    q: "How long does it take for Google to show rich snippets after adding schema?",
    a: "Google must re-crawl and re-index the updated webpage before rich results can appear. Depending on your site's crawl budget and authority, this typically takes between a few days to two or three weeks. You can accelerate this process by requesting re-indexing of the updated URL inside Google Search Console's URL Inspection tool.",
  },
  {
    q: "Is schema markup required for Google AI Overviews and ChatGPT Search?",
    a: "While not strictly mandatory, schema markup significantly boosts your chances of being cited in Google AI Overviews, Perplexity AI, and ChatGPT Search. Generative AI engines rely on semantic clarity to verify factual accuracy. By organizing your business entity, services, prices, and author credentials into clean JSON-LD, you eliminate ambiguity and make your content easy for AI crawlers to parse and reference.",
  },
  {
    q: "Is anything I enter into this schema generator stored or shared?",
    a: "No. This tool runs 100% client-side in your web browser. None of your business details, client names, addresses, or phone numbers are ever transmitted to a server or stored in a database. Your data remains completely private.",
  },
];

const RELATED_TOOLS = [
  {
    label: "SERP Simulator",
    desc: "Preview Google title and snippet pixel widths on desktop & mobile",
    href: "/tools/serp-simulator",
    icon: "🔍",
  },
  {
    label: "llms.txt Generator",
    desc: "Create AI crawler robots.txt and llms.txt rules for ChatGPT & Perplexity",
    href: "/tools/llms-txt-generator",
    icon: "🤖",
  },
  {
    label: "Technical SEO Checklist",
    desc: "26 actionable checks to find and fix crawl budget and indexing leaks",
    href: "/resources/technical-seo-checklist",
    icon: "📋",
  },
  {
    label: "WooCommerce SEO Guide",
    desc: "Step-by-step technical optimization for WordPress and WooCommerce stores",
    href: "/resources/woocommerce-seo-checklist",
    icon: "🛒",
  },
];

export default function SchemaGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${PAGE_URL}#app`,
        name: "SearchPrex Schema Markup Generator",
        url: PAGE_URL,
        description: DESCRIPTION,
        applicationCategory: "BusinessApplication",
        operatingSystem: "All modern browsers (Web)",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: organizationRef,
      },
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: TITLE,
        isPartOf: websiteRef,
        mainEntity: { "@id": `${PAGE_URL}#app` },
        author: founderRef,
        dateModified: LAST_REVIEWED,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Free SEO Tools", item: `${SITE}/tools` },
          { "@type": "ListItem", position: 3, name: "Schema Markup Generator", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  const linkStyle = "font-semibold text-[#534AB7] underline underline-offset-2 hover:text-[#3C3489]";

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Free SEO Tools", href: "/tools" },
          { label: "Schema Markup Generator" },
        ]}
      />

      <PageHero
        compactTop
        eyebrow="Free SEO Tool · Google Rich Results Ready"
        title={
          <>
            Free JSON-LD <Accent>Schema Markup Generator</Accent>
          </>
        }
        subtitle="Generate Google-compliant structured data for US local businesses, law firms, eCommerce stores, articles, and reviews. Copy clean, valid JSON-LD code in seconds — 100% free, runs client-side."
        trustPoints={[
          "Google Rich Results Compliant",
          "Valid Schema.org JSON-LD",
          "Optimized for US Local & National SEO",
          "Zero Signup or API Key Required",
        ]}
      />

      <StatStrip
        stats={[
          { value: "6 Types", label: "Core Schema Generators" },
          { value: "100%", label: "Google Compliant JSON-LD" },
          { value: "0 ms", label: "Instant Browser Execution" },
          { value: "$0", label: "Free Forever · No Signup" },
        ]}
      />

      {/* ── Interactive Generator Tool ── */}
      <Section tight tone="surface">
        <SchemaGeneratorClient />
      </Section>

      {/* ── Section: Which Schema Do You Need? ── */}
      <Section>
        <SectionHeading
          eyebrow="Schema Selection Guide"
          title="Which Schema Markup Does Your US Business Need?"
          intro="Search engines reward pages that use the exact Schema.org entity matching their primary purpose. Here is how US businesses, law practices, and online stores should choose their structured data."
        />
        <CardGrid columns={3}>
          {WHICH_SCHEMAS.map((schema) => (
            <FeatureCard
              key={schema.title}
              title={schema.title}
              label={schema.label}
              body={schema.body}
            />
          ))}
        </CardGrid>
      </Section>

      {/* ── Section: CMS Implementation Guide ── */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Implementation Guide"
          title="How to Add JSON-LD to Popular US Website Platforms"
          intro="Implementing structured data does not require expensive plugins or complex code refactoring. Follow these step-by-step instructions for your CMS."
        />
        <CardGrid columns={4}>
          {PLATFORMS.map((platform) => (
            <FeatureCard
              key={platform.title}
              step={platform.step}
              title={platform.title}
              body={platform.body}
            />
          ))}
        </CardGrid>
      </Section>

      {/* ── Section: Google Rules & Compliance ── */}
      <Section>
        <SectionHeading
          eyebrow="Google Compliance"
          title="Six Structured Data Rules That Protect Your Rankings"
          intro="Google enforces strict algorithmic and manual quality guidelines on structured data. Violating these core rules can trigger manual action penalties or cause Google to disregard your schema entirely."
        />
        <CardGrid columns={3}>
          {GOOGLE_RULES.map((rule) => (
            <FeatureCard key={rule.title} title={rule.title} body={rule.body} />
          ))}
        </CardGrid>
        <div className="mt-8 rounded-xl border border-[#e5e7eb] bg-[#f8f9fc] p-5 text-sm leading-relaxed text-[#566070]">
          <p>
            Structured data is check #14 in our free{" "}
            <Link href="/resources/technical-seo-checklist" className={linkStyle}>
              Technical SEO Checklist
            </Link>
            . For WooCommerce and Shopify merchants, our{" "}
            <Link href="/resources/woocommerce-seo-checklist" className={linkStyle}>
              eCommerce SEO Checklist
            </Link>{" "}
            covers Product and Merchant Return Policy markup in detail, and our guide on{" "}
            <Link href="/tools/llms-txt-generator" className={linkStyle}>
              AI Crawler Rules & llms.txt
            </Link>{" "}
            explains how to optimize for ChatGPT Search and Perplexity.
          </p>
        </div>
      </Section>

      {/* ── Section: AI & Generative Engine Optimization (GEO) ── */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="AI Search & GEO"
          title="Why Schema Markup is Critical for Google AI Overviews & ChatGPT"
          intro="Search in 2026 is no longer just ten blue links. Modern answer engines rely heavily on Knowledge Graph grounding to generate answers with confidence."
        />
        <CardGrid columns={3}>
          {AI_GEO_POINTS.map((pt) => (
            <FeatureCard key={pt.title} title={pt.title} body={pt.body} />
          ))}
        </CardGrid>
      </Section>

      {/* ── Section: FAQs ── */}
      <Section width="reading">
        <SectionHeading
          eyebrow="Frequently Asked Questions"
          title="Schema Markup & Structured Data Questions, Answered"
          intro="Everything you need to know about JSON-LD structured data, rich result eligibility, testing, and Google guidelines."
        />
        <FaqList faqs={FAQS} name="schema-generator-faq" />
      </Section>

      {/* ── Section: Related Free SEO Tools ── */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Free SEO Tool Suite"
          title="More Free SEO Tools by SearchPrex"
          intro="Explore our collection of free browser-based SEO tools built for US digital marketers and business owners."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RELATED_TOOLS.map((tool) => (
            <Link
              key={tool.label}
              href={tool.href}
              className="bg-white border border-[#e5e7eb] rounded-xl p-5 transition-all hover:border-[#534AB7] hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl mb-3">{tool.icon}</div>
                <h3 className="text-sm font-bold text-[#0a0f2e] mb-1.5">{tool.label}</h3>
                <p className="text-xs text-[#566070] leading-relaxed">{tool.desc}</p>
              </div>
              <span className="mt-4 inline-flex items-center text-xs font-semibold text-[#534AB7]">
                Open Tool →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── Closing Lead Magnet ── */}
      <ArticleLeadMagnet
        variant="bottom"
        source="schema-generator"
        copy={{
          headline: "Not sure if your schema markup is working in Google? Let us audit it.",
          sub: "We will inspect your structured data, audit your search console errors, and send back a prioritized technical action plan — 100% free within 24 hours.",
        }}
      />
    </main>
  );
}

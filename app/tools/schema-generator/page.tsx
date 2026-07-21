import type { Metadata } from "next";
import Script from "next/script";
import SchemaGeneratorClient from "./SchemaGeneratorClient";

const PAGE_URL = "https://www.searchprex.com/tools/schema-generator";
const OG_IMAGE = "https://www.searchprex.com/og/schema-generator.jpg";

export const metadata: Metadata = {
  title: "Free Schema Markup Generator | JSON-LD Structured Data Tool | SearchPrex",
  description:
    "Free schema markup generator — create Google-ready JSON-LD for Local Business, Law Firm, Product, FAQ, Article & Review schemas in seconds. No signup, copy-paste ready, tested against Google Rich Results.",
  keywords: [
    "schema markup generator",
    "JSON-LD generator",
    "structured data generator",
    "free schema generator",
    "schema.org generator",
    "local business schema generator",
    "law firm schema generator",
    "product schema generator",
    "FAQ schema generator",
    "article schema generator",
    "review schema generator",
    "LegalService schema",
    "LocalBusiness JSON-LD",
    "how to create schema markup",
    "generate JSON-LD for Google",
    "rich results schema tool",
    "schema markup for SEO",
    "structured data for law firms",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Free Schema Markup Generator — 6 JSON-LD Types | SearchPrex",
    description:
      "Generate Google-ready structured data in seconds. 6 schema types: Local Business, Law Firm, Product, FAQ, Article, Review. Free forever, no signup, copy-paste ready.",
    url: PAGE_URL,
    siteName: "SearchPrex",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "SearchPrex Schema Markup Generator — free JSON-LD structured data tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Schema Markup Generator | SearchPrex",
    description:
      "6 JSON-LD schema types in seconds — Local Business, Law Firm, Product, FAQ, Article, Review. Free, no signup.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "US",
    "geo.placename": "United States",
    "content-language": "en-US",
    "audience": "SEO professionals, web developers, digital marketers, law firms, e-commerce store owners",
  },
};

export default function SchemaGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Free Schema Markup Generator — JSON-LD Structured Data Tool",
        description:
          "Free schema markup generator for Local Business, Law Firm, Product, FAQ, Article, and Review schemas. Creates Google-ready JSON-LD structured data instantly.",
        inLanguage: "en-US",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.searchprex.com/#website",
          url: "https://www.searchprex.com",
          name: "SearchPrex",
        },
        primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE },
        datePublished: "2026-01-15",
        dateModified: new Date().toISOString().split("T")[0],
        author: {
          "@type": "Person",
          name: "Mubashar Shahzad",
          url: "https://www.linkedin.com/in/mubashar-shahzad-seo/",
          jobTitle: "Senior SEO Analyst",
          worksFor: { "@type": "Organization", name: "SearchPrex" },
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${PAGE_URL}#tool`,
        name: "SearchPrex Schema Markup Generator",
        applicationCategory: "DeveloperApplication",
        applicationSubCategory: "SEO Tool",
        operatingSystem: "Web (any modern browser)",
        url: PAGE_URL,
        description:
          "Free JSON-LD schema markup generator supporting 6 Schema.org types: LocalBusiness, LegalService, Product, FAQPage, Article, and Review. Generates Google-compatible structured data that passes Rich Results Test.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          description: "Free forever — no signup, no credit card, no usage limits",
        },
        featureList: [
          "LocalBusiness schema (NAP + hours + price range)",
          "LegalService / Law Firm schema (attorney + practice areas)",
          "Product schema (price, brand, SKU, rating, availability)",
          "FAQPage schema (up to 4 Q&A pairs)",
          "Article schema (author, publisher, dates, image)",
          "Review schema (rating, author, itemReviewed)",
          "One-click copy with script tags",
          "Google Rich Results Test compatible",
          "No signup or account required",
        ],
        provider: {
          "@type": "Organization",
          name: "SearchPrex",
          url: "https://www.searchprex.com",
          logo: "https://www.searchprex.com/logo.png",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "34",
          bestRating: "5",
        },
        audience: {
          "@type": "Audience",
          audienceType:
            "SEO professionals, web developers, digital marketing agencies, law firms, e-commerce store owners, local businesses",
          geographicArea: { "@type": "Country", name: "United States" },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.searchprex.com" },
          { "@type": "ListItem", position: 2, name: "Free SEO Tools", item: "https://www.searchprex.com/tools" },
          { "@type": "ListItem", position: 3, name: "Schema Markup Generator", item: PAGE_URL },
        ],
      },
      {
        "@type": "HowTo",
        name: "How to Generate and Add Schema Markup to Your Website",
        description:
          "Step-by-step guide to creating JSON-LD schema markup and adding it to a website for Google Rich Results.",
        totalTime: "PT3M",
        estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
        supply: [{ "@type": "HowToSupply", name: "Business or content details" }],
        tool: [{ "@type": "HowToTool", name: "SearchPrex Schema Markup Generator" }],
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Select schema type",
            text: "Choose from LocalBusiness, LegalService, Product, FAQ, Article, or Review based on the page you're marking up.",
            url: `${PAGE_URL}#step-1`,
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Fill in your details",
            text: "Enter business name, address, phone, description, and other required fields. Required fields are marked with a red asterisk.",
            url: `${PAGE_URL}#step-2`,
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Generate JSON-LD",
            text: "Click Generate Schema to produce Google-ready JSON-LD structured data.",
            url: `${PAGE_URL}#step-3`,
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Copy and paste into your site",
            text: "Copy the generated code with script tags and paste it inside the head tag of your webpage, or just before the closing body tag.",
            url: `${PAGE_URL}#step-4`,
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Test with Google Rich Results",
            text: "Use Google Rich Results Test at search.google.com/test/rich-results to verify the schema is valid.",
            url: `${PAGE_URL}#step-5`,
          },
          {
            "@type": "HowToStep",
            position: 6,
            name: "Submit to Google Search Console",
            text: "Request indexing of the updated URL in Google Search Console so Google recrawls and picks up the new schema.",
            url: `${PAGE_URL}#step-6`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is schema markup and why does it matter for SEO?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Schema markup is a standardized vocabulary (Schema.org) that tells search engines what your content means, not just what it says. Adding JSON-LD schema helps Google display rich results — star ratings, FAQs, prices, business hours — directly in search, which increases click-through rate by 20 to 40 percent on average and improves visibility in AI Overviews.",
            },
          },
          {
            "@type": "Question",
            name: "What is JSON-LD and is it better than Microdata or RDFa?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "JSON-LD (JavaScript Object Notation for Linked Data) is Google officially recommended format for structured data. Unlike Microdata or RDFa, it does not require you to modify existing HTML — you drop a script tag anywhere on the page. Google, Bing, and AI search engines like ChatGPT and Perplexity all parse JSON-LD reliably.",
            },
          },
          {
            "@type": "Question",
            name: "Which schema types does this generator support?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Six of the highest-impact Schema.org types: LocalBusiness for local service businesses, LegalService for law firms and attorneys, Product for e-commerce, FAQPage for FAQ sections, Article for blog posts and news, and Review for testimonials and rating pages.",
            },
          },
          {
            "@type": "Question",
            name: "Is the schema markup generator really free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, completely free with no signup, no credit card, and no usage limits. You can generate unlimited schemas. If you need bulk schema generation for 1000 plus pages, our NicheSEO Pro tool handles that at scale with GSC integration.",
            },
          },
          {
            "@type": "Question",
            name: "Where should I paste the JSON-LD code on my website?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Paste the generated code inside the head tag of your webpage (recommended) or just before the closing body tag. Both locations work. Each page should have schema that matches the page actual content — do not put the same schema site-wide.",
            },
          },
          {
            "@type": "Question",
            name: "How do I test if my schema markup is working?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Use Google Rich Results Test at search.google.com/test/rich-results — paste your URL or the JSON-LD code directly. It shows valid items detected, warnings, and errors. After deploying, submit the URL to Google Search Console and request indexing so Google recrawls.",
            },
          },
          {
            "@type": "Question",
            name: "Does schema markup help with AI search like ChatGPT, Perplexity, and Google AI Overviews?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Generative AI engines rely heavily on structured data to identify authoritative sources for citations. FAQ, HowTo, Article, and Review schemas are particularly effective for being cited in Google AI Overviews, ChatGPT web browsing, and Perplexity answers. Schema is now essential for AEO (Answer Engine Optimization).",
            },
          },
          {
            "@type": "Question",
            name: "Will schema markup guarantee rich results in Google?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No — schema makes your page eligible for rich results, but Google decides when to display them based on quality, relevance, and content freshness. Valid schema significantly increases the probability. Google publishes eligibility requirements in its Structured Data Guidelines.",
            },
          },
        ],
      },
      {
        "@type": "Organization",
        "@id": "https://www.searchprex.com/#organization",
        name: "SearchPrex",
        url: "https://www.searchprex.com",
        logo: "https://www.searchprex.com/logo.png",
        description:
          "Founder-led SEO agency specializing in technical SEO, local SEO, law firm SEO, and e-commerce SEO for US businesses.",
        sameAs: ["https://www.linkedin.com/in/mubashar-shahzad-seo/"],
        founder: {
          "@type": "Person",
          name: "Mubashar Shahzad",
          jobTitle: "Founder & Senior SEO Analyst",
          url: "https://www.linkedin.com/in/mubashar-shahzad-seo/",
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="ld-schema-generator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SchemaGeneratorClient />
    </>
  );
}
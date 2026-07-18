// app/all-case-studies/page.tsx
// Server Component. Owns metadata + JSON-LD (ItemList, FAQPage, BreadcrumbList,
// Person, CollectionPage). The interactive UI lives in CaseStudiesClient (a client island),
// wrapped in Suspense because it reads useSearchParams for URL-synced filters.
 
import { Suspense } from "react";
import type { Metadata } from "next";
import CaseStudiesClient from "./CaseStudiesClient";
import { caseStudies, detailUrl, FAQS } from "./data";
 
const SITE = "https://www.searchprex.com";
const CASE_STUDIES_URL = `${SITE}/all-case-studies`;
// TODO: replace with Mubashar's exact LinkedIn profile URL before launch.
const LINKEDIN_URL = "https://www.linkedin.com/in/mubashar-shahzad-seo/";
 
export const metadata: Metadata = {
  title: "SEO Case Studies — Verified Results | SearchPrex",
  description:
    "Browse SearchPrex SEO case studies with real GSC data. Law firm, ecommerce, local & technical SEO results. Filter by niche. Founder-led, transparent results.",
  keywords: [
    'SEO case studies',
    'SearchPrex case studies',
    'law firm SEO results',
    'ecommerce SEO results',
    'local SEO case studies',
    'technical SEO case studies',
    'verified SEO results',
    'GSC verified results',
    'real SEO results',
    'founder-led SEO results',
    'niche-focused SEO',
    'USA SEO agency results'
  ],
  authors: [{ name: 'SearchPrex', url: SITE }],
  creator: 'SearchPrex',
  publisher: 'SearchPrex',
  category: 'SEO Services',
  alternates: {
    canonical: CASE_STUDIES_URL,
    languages: {
      'en-US': CASE_STUDIES_URL,
    },
  },
  openGraph: {
    title: "SEO Case Studies — Verified Results | SearchPrex",
    description:
      "Browse SearchPrex SEO case studies with real GSC data. Law firm, ecommerce, local & technical SEO results.",
    url: CASE_STUDIES_URL,
    siteName: 'SearchPrex',
    type: "website",
    locale: 'en_US',
    images: [
      {
        url: `${SITE}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'SearchPrex - SEO Case Studies with Verified Results',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@searchprex',
    creator: '@searchprex',
    title: "SEO Case Studies — Verified Results | SearchPrex",
    description:
      "Browse SearchPrex SEO case studies with real GSC data. Law firm, ecommerce, local & technical SEO results.",
    images: [`${SITE}/og-image.jpg`],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};
 
export default function Page() {
  // ── CollectionPage Schema (for case studies listing) ──
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${CASE_STUDIES_URL}#webpage`,
    "url": CASE_STUDIES_URL,
    "name": "SEO Case Studies — Verified Results",
    "description": "Browse SearchPrex SEO case studies with real GSC data. Law firm, ecommerce, local & technical SEO results.",
    "isPartOf": { "@id": `${SITE}#website` },
    "inLanguage": "en-US",
    "publisher": { "@id": `${SITE}#organization` },
    "mainEntity": { "@id": `${SITE}#organization` }
  };
 
  // ── ItemList Schema (for case studies collection) ──
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "SearchPrex SEO Case Studies",
    "description": "Collection of verified SEO case studies by SearchPrex",
    "url": CASE_STUDIES_URL,
    "itemListElement": caseStudies.map((cs, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `${SITE}${detailUrl(cs)}`,
      "name": `${cs.client} — ${cs.seoType}`,
      "description": `Real SEO results for ${cs.client}. Verified with Google Search Console data.`,
    })),
  };
 
  // ── BreadcrumbList Schema (for navigation SEO) ──
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Case Studies",
        "item": `${SITE}/case-studies`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "All Case Studies",
        "item": CASE_STUDIES_URL
      },
    ],
  };
 
  // ── FAQPage Schema (for FAQ section) ──
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      },
    })),
  };
 
  // ── Person Schema (for founder credibility - E-E-A-T) ──
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE}#founder`,
    "name": "Mubashar Shahzad",
    "jobTitle": "Founder & SEO Expert",
    "description": "Founder of SearchPrex. 5+ years of senior-led SEO for law firms, ecommerce, and local businesses.",
    "image": `${SITE}/images/mubashar-shahzad.jpg`,
    "url": `${SITE}/about`,
    "email": "contact@searchprex.com",
    "sameAs": [LINKEDIN_URL, "https://twitter.com/searchprex"],
    "worksFor": {
      "@type": "Organization",
      "name": "SearchPrex",
      "url": SITE,
    },
    "knowsAbout": [
      "Ecommerce SEO",
      "Local SEO",
      "Technical SEO",
      "Law Firm SEO",
      "International SEO",
      "AEO / AI Overview optimization",
      "Core Web Vitals",
      "Content Strategy",
      "Link Building",
    ],
  };
 
  // ── Organization Schema (for company credibility) ──
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE}#organization`,
    "name": "SearchPrex",
    "url": SITE,
    "email": "contact@searchprex.com",
    "founder": { "@id": `${SITE}#founder` },
    "sameAs": [
      "https://twitter.com/searchprex",
      "https://linkedin.com/company/searchprex"
    ]
  };
 
  // ── Website Schema (for knowledge graph) ──
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE}#website`,
    "url": SITE,
    "name": "SearchPrex",
    "description": "Founder-led USA SEO agency for law firms, ecommerce, and local businesses",
    "publisher": { "@id": `${SITE}#organization` },
    "inLanguage": "en-US"
  };
 
  const schemas = [
    collectionPageSchema,
    itemListSchema,
    breadcrumbSchema,
    faqSchema,
    personSchema,
    organizationSchema,
    websiteSchema
  ];
 
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
 
      <Suspense fallback={null}>
        <CaseStudiesClient linkedinUrl={LINKEDIN_URL} />
      </Suspense>
    </>
  );
}
 
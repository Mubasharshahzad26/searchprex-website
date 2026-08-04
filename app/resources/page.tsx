import type { Metadata } from "next";
import ResourcesPageComponent from "./ResourcesComponent"; // Your existing component
 
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.searchprex.com'
const resourcesUrl = `${siteUrl}/resources`
 
export const metadata: Metadata = {
  title: 'SEO Resources & Guides — White Papers, Research, News | SearchPrex',
  description: 'Free SEO resources from SearchPrex: white papers, original research, real-world learnings, and curated industry news. Founded on real client work, not generic theory.',
  keywords: [
    'SEO resources',
    'SEO guides',
    'SEO white papers',
    'SEO research',
    'SEO news',
    'SEO learning',
    'technical SEO guide',
    'E-E-A-T guide',
    'AI Overviews SEO',
    'local SEO guide',
    'law firm SEO guide',
    'ecommerce SEO guide',
    'free SEO resources',
    'SEO tools'
  ],
  authors: [{ name: 'Mubashar Shahzad', url: siteUrl }],
  creator: 'SearchPrex',
  publisher: 'SearchPrex',
  category: 'SEO Resources',
  alternates: {
    canonical: resourcesUrl,
    languages: {
      'en-US': resourcesUrl,
    },
  },
  openGraph: {
    title: 'SEO Resources & Guides — White Papers, Research, News | SearchPrex',
    description: 'Free SEO resources: white papers, original research, real-world learnings, and curated industry news from SearchPrex.',
    url: resourcesUrl,
    siteName: 'SearchPrex',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'SearchPrex - SEO Resources & Guides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@searchprex',
    creator: '@searchprex',
    title: 'SEO Resources & Guides — White Papers, Research, News',
    description: 'Free SEO resources: white papers, original research, real-world learnings, and curated industry news from SearchPrex.',
    images: [`${siteUrl}/og-image.jpg`],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};
 
export default function ResourcesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${resourcesUrl}#webpage`,
        "url": resourcesUrl,
        "name": "SEO Resources & Guides",
        "description": "Free SEO resources from SearchPrex: white papers, original research, real-world learnings, and curated industry news.",
        "isPartOf": { "@id": `${siteUrl}#website` },
        "inLanguage": "en-US",
        "mainEntity": { "@id": `${siteUrl}#organization` }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteUrl
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Resources",
            "item": resourcesUrl
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What SEO resources are available on SearchPrex?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "SearchPrex offers white papers, original research, real-world learnings, and curated industry news. All resources are built from real client work, not generic theory."
            }
          },
          {
            "@type": "Question",
            "name": "Are SearchPrex resources free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all SEO resources on SearchPrex are free to access, including white papers, guides, and curated news."
            }
          },
          {
            "@type": "Question",
            "name": "What topics do SearchPrex resources cover?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Topics include technical SEO, E-E-A-T optimization, AI Overviews, local SEO, law firm SEO, ecommerce SEO, and latest Google algorithm updates."
            }
          }
        ]
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        "name": "SearchPrex",
        "url": siteUrl,
        "email": "contact@searchprex.com",
        "sameAs": [
          "https://twitter.com/searchprex",
          "https://linkedin.com/company/searchprex"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        "url": siteUrl,
        "name": "SearchPrex",
        "description": "Founder-led USA SEO agency for law firms, ecommerce, and local businesses",
        "publisher": { "@id": `${siteUrl}#organization` },
        "inLanguage": "en-US"
      }
    ]
  };
 
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ResourcesPageComponent />
    </>
  );
}
 
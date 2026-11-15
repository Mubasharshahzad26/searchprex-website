import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SolutionsClient from '@/app/resources/solutions/SolutionsClient'

const SITE = 'https://www.searchprex.com'
const PAGE_URL = `${SITE}/resources/solution`

export const metadata: Metadata = {
  title: 'SEO Solutions & Free Tools: Schema, SERP Checker, AI Search',
  description:
    'Free SEO solutions and tools: SERP Checker, Schema Markup Generator, SERP Simulator, llms.txt Generator, AI Search, and step-by-step SEO issue fixes.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'en-US': PAGE_URL,
      'x-default': PAGE_URL,
    },
  },
  openGraph: {
    title: 'SEO Solutions & Tools Library | SearchPrex',
    description:
      'Free SEO tools and troubleshooting playbooks: SERP Checker, Schema Generator, SERP Simulator, and diagnostic guides for technical SEO issues.',
    url: PAGE_URL,
    siteName: 'SearchPrex',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Solutions & Tools Library | SearchPrex',
    description:
      'Free SEO tools and troubleshooting playbooks for technical, ecommerce, and local SEO.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const SOLUTION_JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Resources', item: `${SITE}/resources` },
      { '@type': 'ListItem', position: 3, name: 'Solutions', item: PAGE_URL },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'SearchPrex SEO Solutions & Tools Library',
    description:
      'Free SEO tools and diagnostic troubleshooting playbooks for Technical SEO, Ecommerce, Shopify, WordPress, and AI Visibility issues.',
    url: PAGE_URL,
    publisher: {
      '@type': 'Organization',
      name: 'SearchPrex',
      url: SITE,
    },
    hasPart: [
      { '@type': 'SoftwareApplication', name: 'SERP Checker', url: `${SITE}/resources/solution/serp-checker` },
      { '@type': 'SoftwareApplication', name: 'llms.txt Generator', url: `${SITE}/resources/solution/llms-txt-generator` },
      { '@type': 'SoftwareApplication', name: 'Schema Markup Generator', url: `${SITE}/resources/solution/schema-generator` },
      { '@type': 'SoftwareApplication', name: 'SERP Simulator', url: `${SITE}/resources/solution/serp-simulator` },
      { '@type': 'SoftwareApplication', name: 'AI Search', url: `${SITE}/resources/solution/ai-search` },
    ],
  },
]

export default function SolutionPage() {
  return (
    <>
      <Nav />
      {SOLUTION_JSON_LD.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <SolutionsClient />
      <Footer />
    </>
  )
}

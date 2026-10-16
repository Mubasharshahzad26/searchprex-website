import type { Metadata } from 'next'
import Nav from '../../../components/Nav'
import Footer from '../../../components/Footer'
import SolutionsClient from './SolutionsClient'

const SITE = 'https://www.searchprex.com'
const PAGE_URL = `${SITE}/resources/solutions`

export const metadata: Metadata = {
  title: 'SEO Issues & Solutions Library: Technical, Law Firm, Ecommerce, Shopify & WordPress Fixes',
  description:
    'SearchPrex SEO Troubleshooting & Solutions Database: Step-by-step root-cause analysis, code snippets, and verified fixes for Core SEO, Law Firm GBP suspensions, Ecommerce indexing, Shopify duplicate URLs, and WordPress Core Web Vitals.',
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'SEO Issues & Solutions Library | SearchPrex',
    description:
      'Step-by-step troubleshooting playbooks for Technical SEO, Law Firm Local Pack issues, Ecommerce faceted navigation, Shopify, and WordPress.',
    url: PAGE_URL,
    siteName: 'SearchPrex',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Issues & Solutions Library | SearchPrex',
    description:
      'Step-by-step troubleshooting playbooks for Technical SEO, Law Firm Local Pack issues, Ecommerce, Shopify, and WordPress.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const SOLUTIONS_JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Resources', item: `${SITE}/resources` },
      { '@type': 'ListItem', position: 3, name: 'Issues & Solutions', item: PAGE_URL },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'SearchPrex SEO Issues & Solutions Library',
    description:
      'Diagnostic troubleshooting database covering Core Technical SEO, Law Firm SEO, Ecommerce Store SEO, Shopify Store SEO, and WordPress SEO issues and verified engineering solutions.',
    url: PAGE_URL,
    publisher: {
      '@type': 'Organization',
      name: 'SearchPrex',
      url: SITE,
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I fix Shopify duplicate product URLs (/collections/*/products/*)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Edit your collection product-grid item Liquid snippet and replace {{ product.url | within: collection }} with {{ product.url }}. This forces all internal collection links to point directly to the canonical /products/handle URL.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why are my pages stuck in "Crawled - currently not indexed" in Google Search Console?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pages stuck in "Crawled - currently not indexed" usually suffer from low information gain, orphan internal link architecture (3+ clicks from root), or template duplication. Consolidate near-duplicate pages, inject unique empirical data tables, and link directly from high-authority hub pages.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do law firms recover from a Google Business Profile deceptive content suspension?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Strip all practice-area keyword modifiers from your GBP title so it matches your State Bar registration and Secretary of State DBA exactly, remove virtual office addresses, and submit official legal entity documentation plus utility bills in a single appeal packet.',
        },
      },
    ],
  },
]

export default function SolutionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SOLUTIONS_JSON_LD) }}
      />
      <Nav />
      <SolutionsClient />
      <Footer />
    </>
  )
}

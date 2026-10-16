import type { Metadata } from 'next'
import Nav from '../../../components/Nav'
import Footer from '../../../components/Footer'
import LearningHubClient from './LearningHubClient'

const SITE = 'https://www.searchprex.com'
const PAGE_URL = `${SITE}/resources/learning-hub`

export const metadata: Metadata = {
  title: 'SEO Learning Hub: Core SEO, Law Firm, Ecommerce, Shopify & WordPress Playbooks',
  description:
    'Master modern search engineering with SearchPrex Academy & Learning Hub. Interactive SEO playbooks, checklists, and technical blueprints for Core SEO, Law Firms, Ecommerce Stores, Shopify, and WordPress.',
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'SearchPrex SEO Learning Hub: Industry Playbooks & Checklists',
    description:
      'Step-by-step SEO curricula and interactive execution checklists for Core SEO, Law Firm Local Pack domination, Ecommerce, Shopify Liquid, and WordPress.',
    url: PAGE_URL,
    siteName: 'SearchPrex',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SearchPrex SEO Learning Hub: Industry Playbooks & Checklists',
    description:
      'Step-by-step SEO curricula and interactive execution checklists for Core SEO, Law Firms, Ecommerce, Shopify, and WordPress.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const LEARNING_HUB_JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Resources', item: `${SITE}/resources` },
      { '@type': 'ListItem', position: 3, name: 'Learning Hub', item: PAGE_URL },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'SearchPrex SEO Learning Hub & Industry Playbooks',
    description:
      'Structured SEO training tracks and engineering checklists covering Core SEO, Law Firm SEO, Ecommerce Store SEO, Shopify Store SEO, and WordPress SEO.',
    url: PAGE_URL,
    publisher: {
      '@type': 'Organization',
      name: 'SearchPrex',
      url: SITE,
    },
    hasPart: [
      {
        '@type': 'Course',
        name: 'Core Technical SEO & AI Search Visibility Track',
        description: 'Crawl budget architecture, semantic entity graphs, Core Web Vitals, and Gemini AI Overview citation engineering.',
        provider: { '@type': 'Organization', name: 'SearchPrex', sameAs: SITE },
      },
      {
        '@type': 'Course',
        name: 'Law Firm SEO & Local 3-Pack Domination Track',
        description: 'Practice-area hub architecture, State Bar E-E-A-T verification, GBP compliance, and high-value case acquisition.',
        provider: { '@type': 'Organization', name: 'SearchPrex', sameAs: SITE },
      },
      {
        '@type': 'Course',
        name: 'Ecommerce Store SEO & Category Revenue Track',
        description: 'Faceted navigation index rules, ProductGroup schema, Merchant Center alignment, and commercial PLP optimization.',
        provider: { '@type': 'Organization', name: 'SearchPrex', sameAs: SITE },
      },
      {
        '@type': 'Course',
        name: 'Shopify Store Liquid SEO & Agentic Commerce Track',
        description: 'Eliminating /collections/*/products/* duplicate URLs, robots.txt.liquid customization, and Shopify metaobject hubs.',
        provider: { '@type': 'Organization', name: 'SearchPrex', sameAs: SITE },
      },
      {
        '@type': 'Course',
        name: 'WordPress & WooCommerce High-Speed SEO Track',
        description: 'Database autoload optimization, Redis object caching, custom schema injection, and Core Web Vitals mastery.',
        provider: { '@type': 'Organization', name: 'SearchPrex', sameAs: SITE },
      },
    ],
  },
]

export default function LearningHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LEARNING_HUB_JSON_LD) }}
      />
      <Nav />
      <LearningHubClient />
      <Footer />
    </>
  )
}

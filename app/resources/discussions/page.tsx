import type { Metadata } from 'next'
import Nav from '../../../components/Nav'
import Footer from '../../../components/Footer'
import DiscussionsClient from './DiscussionsClient'

const SITE = 'https://www.searchprex.com'
const PAGE_URL = `${SITE}/resources/discussions`

export const metadata: Metadata = {
  title: 'SEO, Law Firm, Ecommerce & US Local Discussion Forum',
  description:
    'Join the SearchPrex SEO & Digital Growth Discussion Hub. Open engineering topics, algorithm volatility analysis, Law Firm SEO Q&A, Shopify & WordPress technical threads, and US market insights (New York, Texas, California, Dallas, Orlando, Arizona).',
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'SEO, Law Firm, Ecommerce & US Local Discussion Forum | SearchPrex',
    description:
      'Open SEO engineering topics, algorithm volatility analysis, and regional US search discussions by SearchPrex strategists.',
    url: PAGE_URL,
    siteName: 'SearchPrex',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO, Law Firm, Ecommerce & US Local Discussion Forum | SearchPrex',
    description:
      'Open SEO engineering topics, algorithm volatility analysis, and regional US search discussions.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const DISCUSSIONS_JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Resources', item: `${SITE}/resources` },
      { '@type': 'ListItem', position: 3, name: 'SEO Discussions', item: PAGE_URL },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'SearchPrex SEO & Industry Discussion Forum',
    description:
      'Editorial and practitioner SEO discussion threads covering Core SEO, Law Firm SEO, Ecommerce, Shopify, WordPress, AI Search Visibility, and US Regional Markets.',
    url: PAGE_URL,
    publisher: {
      '@type': 'Organization',
      name: 'SearchPrex',
      url: SITE,
    },
  },
]

export default function DiscussionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(DISCUSSIONS_JSON_LD) }}
      />
      <Nav />
      <DiscussionsClient />
      <Footer />
    </>
  )
}

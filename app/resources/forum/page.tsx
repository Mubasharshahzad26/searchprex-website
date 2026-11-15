import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import DiscussionsClient from '@/app/resources/discussions/DiscussionsClient'

const SITE = 'https://www.searchprex.com'
const PAGE_URL = `${SITE}/resources/forum`

export const metadata: Metadata = {
  title: 'SEO Discussion Forum: Law Firm, Ecommerce & Local SEO',
  description:
    'SearchPrex SEO discussion forum: law firm, ecommerce, Shopify and WordPress questions, Google update threads and international SEO practitioner Q&A.',
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'SEO Discussion Forum: International SEO & Industry Q&A | SearchPrex',
    description:
      'Open SEO engineering topics, algorithm volatility analysis, and international search discussions by SearchPrex strategists.',
    url: PAGE_URL,
    siteName: 'SearchPrex',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Discussion Forum | SearchPrex',
    description:
      'Open SEO engineering topics, algorithm volatility analysis, and international search discussions.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const FORUM_JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Resources', item: `${SITE}/resources` },
      { '@type': 'ListItem', position: 3, name: 'Forum', item: PAGE_URL },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'SearchPrex SEO Discussion Forum',
    description:
      'Editorial and practitioner SEO discussion threads covering Core SEO, Law Firm SEO, Ecommerce, Shopify, WordPress, AI Search Visibility, and International Markets.',
    url: PAGE_URL,
    publisher: {
      '@type': 'Organization',
      name: 'SearchPrex',
      url: SITE,
    },
  },
]

export default function ForumPage() {
  return (
    <>
      <Nav />
      {FORUM_JSON_LD.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <DiscussionsClient />
      <Footer />
    </>
  )
}

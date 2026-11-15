import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import DiscussionsClient from '@/app/resources/discussions/DiscussionsClient'

const SITE = 'https://www.searchprex.com'
const PAGE_URL = `${SITE}/resources/forum/usa`

export const metadata: Metadata = {
  title: 'USA SEO Discussion Forum: State, City & Metro Local Search',
  description:
    'USA-focused SEO discussion forum: state-level Map Pack threads, metro SERP volatility, Google Business Profile enforcement, and US local search strategy.',
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'USA Regional SEO Discussion Forum | SearchPrex',
    description:
      'US metro SERP telemetry, state-level Map Pack shifts, and GBP enforcement discussions across Texas, California, New York, Florida, and Ohio.',
    url: PAGE_URL,
    siteName: 'SearchPrex',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'USA SEO Discussion Forum | SearchPrex',
    description:
      'US metro SERP telemetry, state-level Map Pack shifts, and GBP enforcement discussions.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const FORUM_USA_JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Resources', item: `${SITE}/resources` },
      { '@type': 'ListItem', position: 3, name: 'Forum', item: `${SITE}/resources/forum` },
      { '@type': 'ListItem', position: 4, name: 'USA', item: PAGE_URL },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'USA Regional SEO Discussion Forum',
    description:
      'USA-focused SEO discussion threads: state-by-state Map Pack volatility, GBP enforcement, metro proximity filters, and US local search strategy.',
    url: PAGE_URL,
    publisher: {
      '@type': 'Organization',
      name: 'SearchPrex',
      url: SITE,
    },
  },
]

export default function ForumUsaPage() {
  return (
    <>
      <Nav />
      {FORUM_USA_JSON_LD.map((schema, i) => (
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

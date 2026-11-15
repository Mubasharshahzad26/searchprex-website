import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import LearningHubClient from '@/app/resources/learning-hub/LearningHubClient'

const SITE = 'https://www.searchprex.com'
const PAGE_URL = `${SITE}/resources/learning-hub/usa`

export const metadata: Metadata = {
  title: 'USA SEO Learning Hub: Local Pack, GBP & Legal SEO Playbooks',
  description:
    'USA-focused SEO learning hub: multi-location scaling playbooks, Google Business Profile optimization for US metros, law firm local SEO curricula, and state-by-state ranking strategies.',
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'USA SEO Learning Hub: Playbooks for US Local Markets | SearchPrex',
    description:
      'Step-by-step SEO curricula for US markets: multi-location GBP scaling, law firm local pack domination, and state-level ecommerce playbooks.',
    url: PAGE_URL,
    siteName: 'SearchPrex',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'USA SEO Learning Hub | SearchPrex',
    description:
      'Step-by-step SEO curricula for US markets: local pack, GBP, and law firm playbooks.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const LEARNING_USA_JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Resources', item: `${SITE}/resources` },
      { '@type': 'ListItem', position: 3, name: 'Learning Hub', item: `${SITE}/resources/learning-hub` },
      { '@type': 'ListItem', position: 4, name: 'USA', item: PAGE_URL },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'USA SEO Learning Hub & Local Market Playbooks',
    description:
      'USA-focused SEO training: multi-location GBP scaling, law firm local 3-pack domination, US metro proximity filters, and state-level ecommerce strategies.',
    url: PAGE_URL,
    publisher: {
      '@type': 'Organization',
      name: 'SearchPrex',
      url: SITE,
    },
  },
]

export default function LearningHubUsaPage() {
  return (
    <>
      <Nav />
      {LEARNING_USA_JSON_LD.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <LearningHubClient />
      <Footer />
    </>
  )
}

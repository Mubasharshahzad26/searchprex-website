import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SolutionsClient from '@/app/resources/solutions/SolutionsClient'

const SITE = 'https://www.searchprex.com'
const PAGE_URL = `${SITE}/resources/solution/usa`

export const metadata: Metadata = {
  title: 'USA SEO Solutions: Law Firm Intake, Case Calculator & Keyword Research',
  description:
    'USA-focused SEO solutions: AI Intake Assistant for law firms, Lost Case Calculator, Law Firm Keyword Research, and US market-specific diagnostic playbooks.',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'en-US': PAGE_URL,
    },
  },
  openGraph: {
    title: 'USA SEO Solutions Dashboard | SearchPrex',
    description:
      'USA-specific SEO tools for law firms and high-ticket services: AI intake, case value calculator, and legal keyword intelligence.',
    url: PAGE_URL,
    siteName: 'SearchPrex',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'USA SEO Solutions Dashboard | SearchPrex',
    description:
      'USA-specific SEO tools for law firms and high-ticket services.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const SOLUTION_USA_JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Resources', item: `${SITE}/resources` },
      { '@type': 'ListItem', position: 3, name: 'Solutions', item: `${SITE}/resources/solution` },
      { '@type': 'ListItem', position: 4, name: 'USA', item: PAGE_URL },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'USA SEO Solutions Dashboard',
    description:
      'USA-focused SEO solutions: AI intake assistant, lost case calculator, and law firm keyword intelligence tools.',
    url: PAGE_URL,
    publisher: {
      '@type': 'Organization',
      name: 'SearchPrex',
      url: SITE,
    },
    hasPart: [
      { '@type': 'SoftwareApplication', name: 'AI Intake Assistant', url: `${SITE}/resources/solution/intake-assistant` },
      { '@type': 'SoftwareApplication', name: 'Lost Case Calculator', url: `${SITE}/resources/solution/case-calculator` },
      { '@type': 'SoftwareApplication', name: 'Law Firm Keyword Research', url: `${SITE}/resources/solution/keyword-research` },
    ],
  },
]

export default function SolutionUsaPage() {
  return (
    <>
      <Nav />
      {SOLUTION_USA_JSON_LD.map((schema, i) => (
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

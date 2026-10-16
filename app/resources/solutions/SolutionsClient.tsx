'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import PlatformHubNav from '../../../components/platform/PlatformHubNav'
import NewsCommentModal from '../../../components/news/NewsCommentModal'

export interface SolutionPlaybook {
  id: string
  slug: string
  category:
    | 'SEO Issues & Solution'
    | 'Law Firm Issues & Solution'
    | 'Ecommerce Issues & Solution'
    | 'Shopify Issues & Solution'
    | 'WordPress Issues & Solution'
  severity: 'Critical' | 'High' | 'Medium'
  errorBadge: string
  title: string
  estimatedFixTime: string
  symptom: string
  rootCause: string
  steps: string[]
  codeLabel?: string
  codeSnippet?: string
  verificationCheck: string
  serviceLink: { label: string; href: string }
  guideLink: { label: string; href: string }
  newsLink?: { label: string; href: string }
}

const SOLUTION_CATEGORIES = [
  { id: 'ALL', label: 'All Issues & Solutions' },
  { id: 'SEO Issues & Solution', label: 'SEO Issues & Solution' },
  { id: 'Law Firm Issues & Solution', label: 'Law Firm Issues & Solution' },
  { id: 'Ecommerce Issues & Solution', label: 'Ecommerce Issues & Solution' },
  { id: 'Shopify Issues & Solution', label: 'Shopify Issues & Solution' },
  { id: 'WordPress Issues & Solution', label: 'WordPress Issues & Solution' },
] as const

const INITIAL_SOLUTIONS: SolutionPlaybook[] = [
  {
    id: 'sol-1',
    slug: 'sol-crawled-currently-not-indexed-gsc-fix',
    category: 'SEO Issues & Solution',
    severity: 'Critical',
    errorBadge: 'GSC Indexing: Crawled - Currently Not Indexed',
    title: 'How to Fix "Crawled - Currently Not Indexed" for Commercial & Location Pages in Google Search Console',
    estimatedFixTime: '45–90 mins',
    symptom:
      'Googlebot crawls your URLs (HTTP 200 OK, valid self-referencing canonical, no noindex tag), yet pages sit indefinitely inside Google Search Console under "Crawled - currently not indexed" and receive zero impressions.',
    rootCause:
      'Google\'s Helpful Content & Quality Evaluator systems compute an Information Gain score during rendering. If a page shares >65% boilerplate text with sibling pages, lacks first-party empirical tables/data, or sits 4+ clicks deep with fewer than 3 contextual internal inlinks, Google defers index storage to conserve index tier capacity.',
    steps: [
      'Audit internal link depth: Ensure every unindexed money page receives at least 3–5 contextual inlinks from already-indexed high-traffic hub pages within 2 clicks of the homepage.',
      'Eliminate boilerplate duplication: Replace Mad-Libs city/service template swaps with unique local statistics, pricing tables, case benchmarks, and specific FAQs.',
      'Add structured entity markup: Inject specific JSON-LD (`Service`, `LocalBusiness`, or `FAQPage`) with explicit `areaServed` and `sameAs` entity identifiers.',
      'Consolidate thin variants: If two pages target overlapping search intent with <300 unique words, 301 redirect the weaker URL into the primary canonical hub.',
    ],
    codeLabel: 'HTML / JSON-LD Entity Disambiguation Block',
    codeSnippet: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Technical SEO Audit & Indexing Recovery",
  "provider": { "@type": "Organization", "name": "SearchPrex" },
  "areaServed": { "@type": "Country", "name": "United States" }
}
</script>`,
    verificationCheck:
      'Inspect the updated URL in Google Search Console -> Live Test -> Request Indexing, then monitor the Page Indexing report over 7–14 days.',
    serviceLink: { label: 'Hire Technical SEO Engineers', href: '/services/technical-seo' },
    guideLink: { label: 'Technical SEO Audit Checklist', href: '/resources/technical-seo-checklist' },
    newsLink: { label: 'US Regional Proximity Volatility News', href: '/resources/news/us-regional-seo-map-pack-proximity-compression-metro-volatility' },
  },
  {
    id: 'sol-2',
    slug: 'sol-law-firm-gbp-suspension-deceptive-content-recovery',
    category: 'Law Firm Issues & Solution',
    severity: 'Critical',
    errorBadge: 'GBP Suspension: Deceptive Content / Virtual Office',
    title: 'Law Firm Google Business Profile (GBP) Suspension Recovery & Local 3-Pack Reinstatement Playbook',
    estimatedFixTime: '2–5 business days',
    symptom:
      'Your law firm\'s Google Business Profile is suddenly suspended for "Deceptive Content" or drops from #1–#3 in the Local Pack to #15+ overnight, halting local intake calls and affecting Local Services Ads (LSA) verification.',
    rootCause:
      'Google\'s automated legal vertical enforcement cross-references your GBP business name and address against State Bar registration records, Secretary of State filings, and commercial lease databases. Keyword-stuffed titles (e.g., "Smith Law - Best Car Accident Lawyer") or unstaffed Regus/virtual suites trigger immediate suspension.',
    steps: [
      'Clean your GBP Business Name so it matches your exact legal entity or registered DBA on file with the Secretary of State and State Bar.',
      'Verify physical signage: Take unedited smartphone photos (with EXIF metadata intact) showing permanent lobby directory signage, exterior building numbers, and your suite door sign.',
      'Assemble your Single-Appeal Evidence Packet: State Bar license, Secretary of State LLC/PLLC registration, signed commercial lease, and a utility/internet bill matching the exact suite number.',
      'Align Attorney Bio Schema: Add `Attorney` and `LegalService` JSON-LD on your website linking each trial attorney\'s State Bar profile URL in `sameAs`.',
    ],
    codeLabel: 'Law Firm Attorney + Bar Verification Schema (JSON-LD)',
    codeSnippet: `{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "firmLegalName PLLC",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "500 W 2nd St, Suite 1900",
    "addressLocality": "Austin",
    "addressRegion": "TX",
    "postalCode": "78701"
  },
  "sameAs": [
    "https://www.texasbar.com/AM/Template.cfm?Section=Find_A_Lawyer"
  ]
}`,
    verificationCheck:
      'Submit all documents in a single GBP Appeal tool submission (never submit duplicate rapid appeals before a case ID responds).',
    serviceLink: { label: 'Law Firm SEO & GBP Reinstatement', href: '/services/law-firm-seo' },
    guideLink: { label: 'Law Firm SEO Audit Checklist', href: '/resources/law-firm-seo-audit-checklist' },
    newsLink: { label: 'GBP Virtual Office Enforcement News', href: '/resources/news/google-business-profile-law-firm-virtual-office-enforcement-2026' },
  },
  {
    id: 'sol-3',
    slug: 'sol-shopify-collection-within-product-duplicate-url-fix',
    category: 'Shopify Issues & Solution',
    severity: 'Critical',
    errorBadge: 'Shopify Architecture: /collections/*/products/* Duplication',
    title: 'Eliminate Shopify Duplicate Collection-Aware Product URLs & Tag Filter Crawl Bloat',
    estimatedFixTime: '30 mins',
    symptom:
      'Shopify generates 4–10 different collection-path URLs for every single product (`/collections/all/products/item`, `/collections/sale/products/item`), splitting internal link equity and wasting up to 70% of Googlebot crawl budget on non-canonical URLs.',
    rootCause:
      'Most Shopify themes use the `| within: collection` Liquid filter inside product card loops (`card-product.liquid` or `product-grid-item.liquid`), which forces internal links to point to collection-scoped URLs that rely on canonical tags instead of direct linking.',
    steps: [
      'Open Shopify Admin -> Online Store -> Themes -> Edit Code.',
      'Search inside `/snippets/` for `card-product.liquid`, `product-card.liquid`, or `product-grid-item.liquid`.',
      'Locate every instance of `{{ product.url | within: collection }}` and replace it with `{{ product.url }}`.',
      'Block dynamic tag combination URLs (`/collections/*+*`) and `?sort_by=` parameters using a custom `robots.txt.liquid` template.',
    ],
    codeLabel: 'Shopify theme snippet + robots.txt.liquid fix',
    codeSnippet: `{%- comment -%} In snippets/card-product.liquid {%- endcomment -%}
- <a href="{{ card_product.url | within: collection }}">
+ <a href="{{ card_product.url }}">

{%- comment -%} In templates/robots.txt.liquid {%- endcomment -%}
{% for group in robots.default_groups %}
  {{- group.user_agent -}}
  {% for rule in group.rules %}
    {{- rule -}}
  {% endfor %}
  {%- if group.user_agent.value == '*' -%}
{{ 'Disallow: /collections/*/*' }}
{{ 'Disallow: /*?sort_by=*' }}
{{ 'Disallow: /*?filter.v.price*' }}
  {%- endif -%}
{% endfor %}`,
    verificationCheck:
      'Run a Screaming Frog crawl on `/collections/` — 100% of product links should now resolve directly to `/products/handle` with 0 non-canonical internal links.',
    serviceLink: { label: 'Shopify SEO Engineering Service', href: '/services/ecommerce-seo/shopify' },
    guideLink: { label: 'Shopify & WooCommerce Indexing Guide', href: '/blog/shopify-woocommerce-indexing-blueprint' },
    newsLink: { label: 'Shopify OS 3.0 Canonical Liquid News', href: '/resources/news/shopify-os-3-canonical-liquid-directives-duplicate-url-fix' },
  },
  {
    id: 'sol-4',
    slug: 'sol-ecommerce-faceted-navigation-crawl-trap-solution',
    category: 'Ecommerce Issues & Solution',
    severity: 'High',
    errorBadge: 'Ecommerce Crawl Trap: Faceted Filter Index Bloat',
    title: 'Solving Ecommerce Faceted Navigation Crawl Traps While Indexing High-Volume Filter Combinations',
    estimatedFixTime: '1–2 hours',
    symptom:
      'Google Search Console shows hundreds of thousands of discovered filter URLs (`?color=black&size=10&price=50-100`) crowding out new product arrivals, while high-demand search queries like "men\'s waterproof black trail running shoes" have no dedicated indexable landing page.',
    rootCause:
      'Uncontrolled `<a href>` facet links allow Googlebot to crawl exponential combinations ($N!$ URL permutations). Conversely, blanket `noindex` or blocking all facets prevents your store from ranking for high-converting long-tail modifier searches.',
    steps: [
      'Separate facets into two tiers: (A) Search-Demand Attributes (Brand, Subcategory, Primary Material/Color) and (B) Zero-Demand UI Filters (Price Sliders, Sort Order, Ratings, Multi-Selects).',
      'Allow Tier A single-attribute facets to generate clean static URLs with unique H1s, dynamic intro copy, and self-referencing canonicals.',
      'Render Tier B filters and any 2+ attribute combinations via client-side state or obfuscated buttons (not crawlable `<a href>` tags) and block parameter patterns in `robots.txt`.',
      'Ensure `AggregateOffer` and `MerchantReturnPolicy` schema are present on category/PLP and PDP templates.',
    ],
    codeLabel: 'Next.js / Ecommerce Conditional Canonical & Robots Logic',
    codeSnippet: `// Allow single high-value attribute (e.g. ?color=black), noindex multi-filter or sort params
const activeFilters = Object.keys(searchParams);
const isIndexableFacet =
  activeFilters.length === 1 && ['color', 'material', 'brand'].includes(activeFilters[0]);

export const metadata = {
  robots: {
    index: activeFilters.length === 0 || isIndexableFacet,
    follow: true,
  },
};`,
    verificationCheck:
      'Verify in GSC Crawl Stats that parameter crawl requests drop by >75% within 14 days while curated facet URLs remain indexed.',
    serviceLink: { label: 'Ecommerce SEO Architecture Service', href: '/services/ecommerce-seo' },
    guideLink: { label: 'Faceted Navigation Engineering Guide', href: '/blog/fix-faceted-navigation-ecommerce-seo' },
    newsLink: { label: 'Merchant Center Return Policy Mandate', href: '/resources/news/google-merchant-center-automated-return-policy-schema-mandate' },
  },
  {
    id: 'sol-5',
    slug: 'sol-wordpress-wp-options-autoload-ttfb-inp-optimization',
    category: 'WordPress Issues & Solution',
    severity: 'High',
    errorBadge: 'WordPress CWV Failure: TTFB > 800ms & INP > 250ms',
    title: 'Fixing WordPress Bloated wp_options Autoload Queries, Elementor DOM Bloat & High INP Scores',
    estimatedFixTime: '60 mins',
    symptom:
      'Your WordPress or WooCommerce site fails Google Core Web Vitals on Mobile (TTFB > 800ms, INP > 250ms, LCP > 3.2s) despite having a caching plugin installed, causing rankings to slip in competitive SERPs.',
    rootCause:
      'Uninstalled or poorly coded WordPress plugins leave megabytes of serialized data set to `autoload = \'yes\'` inside `wp_options`, loaded into memory on every uncached PHP request. On the frontend, heavy page builders and third-party chat/tracking scripts block the main thread during user clicks.',
    steps: [
      'Query `wp_options` for autoloaded rows exceeding 1MB total size and set orphaned plugin transients/rows to `autoload = \'no\'`.',
      'Enable persistent Redis Object Caching so repeated MySQL queries are served from memory in <2ms.',
      'Defer non-critical JavaScript (analytics, heatmaps, chat widgets) until user interaction (`pointerdown`, `keydown`, or `scroll`).',
      'Preload the hero LCP image with `fetchpriority="high"` and disable lazy-loading (`loading="eager"`) on above-the-fold images.',
    ],
    codeLabel: 'SQL Audit + WordPress functions.php LCP & Script Deferral',
    codeSnippet: `-- 1. Check total autoloaded size in MySQL / phpMyAdmin:
SELECT SUM(LENGTH(option_value)) / 1024 / 1024 AS autoload_mb
FROM wp_options WHERE autoload IN ('yes', 'on', 'auto');

-- 2. Find the top 10 heaviest autoloaded rows:
SELECT option_name, LENGTH(option_value) AS bytes
FROM wp_options WHERE autoload IN ('yes', 'on', 'auto')
ORDER BY bytes DESC LIMIT 10;`,
    verificationCheck:
      'Test with PageSpeed Insights and Chrome UX Report (CrUX) — target TTFB < 200ms, LCP < 2.0s, and INP < 120ms.',
    serviceLink: { label: 'WordPress & WooCommerce SEO', href: '/services/ecommerce-seo/woocommerce' },
    guideLink: { label: 'WooCommerce & WordPress SEO Checklist', href: '/resources/woocommerce-seo-checklist' },
    newsLink: { label: 'WordPress Speculation Rules & INP News', href: '/resources/news/wordpress-core-speculative-rules-api-inp-optimization-woocommerce' },
  },
  {
    id: 'sol-6',
    slug: 'sol-ai-overviews-zero-citation-share-entity-fix',
    category: 'SEO Issues & Solution',
    severity: 'High',
    errorBadge: 'AI Visibility: Rank Top 5 Organically But 0 AI Overview Citations',
    title: 'How to Fix Zero Citation Share in Google AI Overviews (Gemini 4) & ChatGPT Search Despite Top-5 Rankings',
    estimatedFixTime: '45 mins per page',
    symptom:
      'Your page ranks #2–#5 in classic blue-link Google results for high-intent commercial keywords, but Google AI Overviews and Gemini AI Mode cite lower-ranking competitors instead of your domain.',
    rootCause:
      'LLMs and retrieval-augmented generation (RAG) pipelines extract structured, self-contained "answer chunks" (45–60 word direct definitions immediately following an H2) and HTML `<table>` comparisons. Pages written with long narrative intros or buried answers fail passage-level cosine similarity thresholds.',
    steps: [
      'Place a 45–60 word "Direct Answer Capsule" in bold/clean prose immediately beneath every question-formatted H2 heading.',
      'Convert unstructured bullet lists of specs, pricing, or timelines into semantic HTML `<table>` elements with clear `<thead>` headers.',
      'Publish an `/llms.txt` file at your root domain mapping your primary commercial guides, checklists, and canonical documentation.',
      'Ensure `GPTBot`, `OAI-SearchBot`, `Google-Extended`, and `PerplexityBot` are explicitly allowed in `robots.txt`.',
    ],
    codeLabel: 'Root /llms.txt & Answer-First HTML Structure',
    codeSnippet: `# SearchPrex AI Indexing Manifest (/llms.txt)
> Technical SEO, Law Firm SEO, Ecommerce & AI Search Optimization Platform.

## Core Solutions & Guides
- [Technical SEO Services](https://www.searchprex.com/services/technical-seo)
- [Law Firm SEO Services](https://www.searchprex.com/services/law-firm-seo)
- [Shopify SEO Services](https://www.searchprex.com/services/ecommerce-seo/shopify)`,
    verificationCheck:
      'Test target queries in Google AI Mode and Perplexity — extracted passages and HTML tables typically get picked up within 5–10 days of re-crawling.',
    serviceLink: { label: 'AI Search & GEO Optimization', href: '/ai-search' },
    guideLink: { label: 'Google AI Overviews GEO Guide', href: '/blog/google-ai-overviews-seo' },
    newsLink: { label: 'GEO Entity Density & Citation News', href: '/resources/news/geo-entity-density-ai-mode-chatgpt-search-citation-factors' },
  },
]

export default function SolutionsClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'sol-1': true,
    'sol-2': true,
  })
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [clientId, setClientId] = useState<string>('')

  // 100% Real DB interactions (starts at 0, no fake base counts)
  const [dbStats, setDbStats] = useState<Record<string, { likes: number; commentsCount: number; userLiked: boolean }>>({})
  const [activeCommentModal, setActiveCommentModal] = useState<{ slug: string; title: string } | null>(null)

  // Submit Issue Modal (Connected to real Neon PostgreSQL /api/platform/submissions)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [issueSubmitting, setIssueSubmitting] = useState(false)
  const [issueSubmitted, setIssueSubmitted] = useState(false)
  const [issueError, setIssueError] = useState('')
  const [issueForm, setIssueForm] = useState({
    name: '',
    email: '',
    website: '',
    category: 'SEO Issues & Solution',
    errorSymptom: '',
  })

  useEffect(() => {
    let cid = ''
    try {
      cid = localStorage.getItem('sp_news_client_id') || ''
      if (!cid) {
        cid = `usr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
        localStorage.setItem('sp_news_client_id', cid)
      }
    } catch {
      cid = 'usr_anon'
    }
    setClientId(cid)

    const slugs = INITIAL_SOLUTIONS.map((s) => s.slug)
    fetch('/api/news/interactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'batch', slugs, clientId: cid }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data?.ok && data?.batch) {
          setDbStats(data.batch)
        }
      })
      .catch(() => {})
  }, [])

  const handleHelpful = async (slug: string) => {
    if (!clientId) return
    const cur = dbStats[slug] || { likes: 0, commentsCount: 0, userLiked: false }
    const nextLiked = !cur.userLiked

    setDbStats((prev) => ({
      ...prev,
      [slug]: {
        ...cur,
        likes: Math.max(0, cur.likes + (nextLiked ? 1 : -1)),
        userLiked: nextLiked,
      },
    }))

    try {
      const res = await fetch('/api/news/interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'like', slug, clientId }),
      })
      const data = await res.json()
      if (data?.ok && typeof data.likes === 'number') {
        setDbStats((prev) => ({
          ...prev,
          [slug]: {
            ...(prev[slug] || { commentsCount: 0 }),
            likes: data.likes,
            userLiked: Boolean(data.userLiked),
          },
        }))
      }
    } catch {
      // ignore
    }
  }

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const copySnippet = (id: string, code: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  const filteredSolutions = useMemo(() => {
    return INITIAL_SOLUTIONS.filter((item) => {
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false
      if (selectedSeverity !== 'ALL' && item.severity !== selectedSeverity) return false
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const hay = `${item.title} ${item.errorBadge} ${item.symptom} ${item.rootCause} ${item.category}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [selectedCategory, selectedSeverity, searchQuery])

  const handleIssueSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIssueSubmitting(true)
    setIssueError('')

    try {
      const res = await fetch('/api/platform/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'solution_issue',
          category: issueForm.category,
          authorName: issueForm.name,
          email: issueForm.email,
          website: issueForm.website,
          title: `${issueForm.category}: ${issueForm.errorSymptom.slice(0, 72)}`,
          body: issueForm.errorSymptom,
        }),
      })
      const data = await res.json()
      if (!data?.ok) {
        setIssueError(data?.error || 'Could not submit issue.')
        setIssueSubmitting(false)
        return
      }

      setIssueSubmitted(true)
      setTimeout(() => {
        setShowSubmitModal(false)
        setIssueSubmitted(false)
        setIssueForm({
          name: '',
          email: '',
          website: '',
          category: 'SEO Issues & Solution',
          errorSymptom: '',
        })
      }, 2000)
    } catch {
      setIssueError('Network error while saving diagnostic request.')
    } finally {
      setIssueSubmitting(false)
    }
  }

  return (
    <div style={{ background: '#f7f8fa', minHeight: '100vh', color: '#171a22', paddingTop: '80px' }}>
      <PlatformHubNav active="solutions" />

      {/* Hero Header */}
      <section
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #e2e5eb',
          padding: '36px 0 28px',
        }}
      >
        <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '24px',
            }}
          >
            <div style={{ maxWidth: '780px' }}>
              <nav
                aria-label="Breadcrumb"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.8rem',
                  color: '#6c6e79',
                  marginBottom: '14px',
                }}
              >
                <Link href="/" style={{ color: '#6c6e79', textDecoration: 'none' }}>
                  Home
                </Link>
                <span>/</span>
                <Link href="/resources" style={{ color: '#6c6e79', textDecoration: 'none' }}>
                  Resources
                </Link>
                <span>/</span>
                <span style={{ color: '#171a22', fontWeight: 600 }}>Issues &amp; Solutions</span>
              </nav>

              <h1
                style={{
                  fontSize: 'clamp(1.85rem, 3.2vw, 2.55rem)',
                  fontWeight: 800,
                  color: '#171a22',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.18,
                  marginBottom: '12px',
                }}
              >
                SEO Issues &amp; Verified Solutions Library
              </h1>
              <p
                style={{
                  fontSize: '1.02rem',
                  color: '#4b4f58',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                Diagnostic engineering playbooks built from real client recoveries. Filter by platform to inspect the{' '}
                <strong>Exact Symptom</strong>, <strong>Algorithmic Root Cause</strong>,{' '}
                <strong>Step-by-Step Fix</strong>, and production-ready code snippets.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setShowSubmitModal(true)}
                style={{
                  padding: '12px 20px',
                  borderRadius: '8px',
                  background: '#171a22',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                + Submit an SEO Issue
              </button>
              <Link
                href="/free-audit"
                style={{
                  padding: '12px 20px',
                  borderRadius: '8px',
                  background: '#ffffff',
                  color: '#171a22',
                  border: '1px solid #d1d5db',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                Request Custom Engineering Fix →
              </Link>
            </div>
          </div>

          {/* 5 Category Tabs from Structure Spec */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '28px',
              paddingTop: '20px',
              borderTop: '1px solid #edf0f5',
            }}
          >
            {SOLUTION_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '9px 16px',
                    borderRadius: '8px',
                    fontSize: '0.84rem',
                    fontWeight: isActive ? 700 : 600,
                    background: isActive ? '#171a22' : '#f7f8fa',
                    color: isActive ? '#ffffff' : '#3d4049',
                    border: isActive ? '1px solid #171a22' : '1px solid #e2e5eb',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-8 pb-16 sm:py-10 sm:pb-20">
        <div
          className="mx-auto grid max-w-[1240px] grid-cols-1 items-start gap-7 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px]"
        >
          {/* Left Column: Playbooks */}
          <div>
            {/* Filter & Search Bar */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e2e5eb',
                borderRadius: '10px',
                padding: '14px 18px',
                marginBottom: '20px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ flex: '1 1 260px', position: 'relative' }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search error codes, GSC status, Shopify Liquid, GBP suspension, CWV..."
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #d5d9e2',
                    fontSize: '0.88rem',
                    color: '#171a22',
                    background: '#f9fafb',
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#6c6e79' }}>Severity:</span>
                {(['ALL', 'Critical', 'High'] as const).map((sev) => (
                  <button
                    key={sev}
                    type="button"
                    onClick={() => setSelectedSeverity(sev)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      border: '1px solid #e2e5eb',
                      background: selectedSeverity === sev ? '#171a22' : '#ffffff',
                      color: selectedSeverity === sev ? '#ffffff' : '#4b4f58',
                      cursor: 'pointer',
                    }}
                  >
                    {sev === 'ALL' ? 'All' : sev}
                  </button>
                ))}
              </div>
            </div>

            {/* Playbook List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {filteredSolutions.map((sol, idx) => {
                const isExpanded = !!expandedIds[sol.id]
                // 100% Real DB counts (starts at 0 until someone interacts)
                const stats = dbStats[sol.slug] || { likes: 0, commentsCount: 0, userLiked: false }

                return (
                  <React.Fragment key={sol.id}>
                    <article
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e2e5eb',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                      }}
                    >
                      {/* Top Header Bar */}
                      <div
                        style={{
                          padding: '22px 24px',
                          borderBottom: isExpanded ? '1px solid #edf0f5' : 'none',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '10px',
                            marginBottom: '12px',
                          }}
                        >
                          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
                            <span
                              style={{
                                padding: '4px 10px',
                                borderRadius: '6px',
                                fontSize: '0.73rem',
                                fontWeight: 700,
                                background: '#f2f4f8',
                                color: '#171a22',
                                border: '1px solid #e2e5eb',
                              }}
                            >
                              {sol.category}
                            </span>
                            <span
                              style={{
                                padding: '4px 10px',
                                borderRadius: '6px',
                                fontSize: '0.73rem',
                                fontWeight: 700,
                                background: sol.severity === 'Critical' ? '#fef2f2' : '#fff7ed',
                                color: sol.severity === 'Critical' ? '#b91c1c' : '#c2410c',
                                border:
                                  sol.severity === 'Critical' ? '1px solid #fecaca' : '1px solid #fed7aa',
                              }}
                            >
                              {sol.severity} Impact
                            </span>
                            <span
                              style={{
                                padding: '4px 10px',
                                borderRadius: '6px',
                                fontSize: '0.73rem',
                                fontWeight: 600,
                                background: '#f8fafc',
                                color: '#475569',
                                border: '1px solid #e2e8f0',
                                fontFamily: 'monospace',
                              }}
                            >
                              {sol.errorBadge}
                            </span>
                          </div>

                          <span style={{ fontSize: '0.78rem', color: '#6c6e79', fontWeight: 600 }}>
                            Est. Fix Time: {sol.estimatedFixTime}
                          </span>
                        </div>

                        <h2
                          style={{
                            fontSize: '1.22rem',
                            fontWeight: 800,
                            color: '#171a22',
                            lineHeight: 1.35,
                            margin: '0 0 12px',
                          }}
                        >
                          {sol.title}
                        </h2>

                        {/* Symptom Summary */}
                        <div
                          style={{
                            background: '#f8f9fb',
                            borderLeft: '3px solid #171a22',
                            padding: '12px 14px',
                            borderRadius: '0 8px 8px 0',
                            fontSize: '0.9rem',
                            color: '#374151',
                            lineHeight: 1.6,
                            marginBottom: '16px',
                          }}
                        >
                          <strong style={{ color: '#171a22' }}>Diagnostic Symptom: </strong>
                          {sol.symptom}
                        </div>

                        {/* Action Bar */}
                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '12px',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <button
                              type="button"
                              onClick={() => handleHelpful(sol.slug)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '7px 12px',
                                borderRadius: '6px',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                background: stats.userLiked ? '#171a22' : '#ffffff',
                                color: stats.userLiked ? '#ffffff' : '#3d4049',
                                border: '1px solid #d5d9e2',
                                cursor: 'pointer',
                              }}
                            >
                              <span>▲ Fix Worked</span>
                              <span>({stats.likes})</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setActiveCommentModal({ slug: sol.slug, title: sol.title })}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '7px 12px',
                                borderRadius: '6px',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                background: '#ffffff',
                                color: '#3d4049',
                                border: '1px solid #d5d9e2',
                                cursor: 'pointer',
                              }}
                            >
                              <span>💬 Engineering Notes ({stats.commentsCount})</span>
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => toggleExpand(sol.id)}
                            style={{
                              padding: '8px 16px',
                              borderRadius: '7px',
                              fontSize: '0.82rem',
                              fontWeight: 700,
                              background: isExpanded ? '#f2f4f8' : '#171a22',
                              color: isExpanded ? '#171a22' : '#ffffff',
                              border: '1px solid #171a22',
                              cursor: 'pointer',
                            }}
                          >
                            {isExpanded ? 'Hide Step-by-Step Solution ▲' : 'View Root Cause & Code Fix ▼'}
                          </button>
                        </div>
                      </div>

                      {/* Expanded Diagnostic Body */}
                      {isExpanded && (
                        <div style={{ padding: '24px', background: '#ffffff' }}>
                          {/* Root Cause */}
                          <div style={{ marginBottom: '20px' }}>
                            <h3
                              style={{
                                fontSize: '0.85rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                color: '#6c6e79',
                                fontWeight: 800,
                                margin: '0 0 8px',
                              }}
                            >
                              1. Algorithmic &amp; Technical Root Cause
                            </h3>
                            <p style={{ fontSize: '0.93rem', color: '#2d3139', lineHeight: 1.65, margin: 0 }}>
                              {sol.rootCause}
                            </p>
                          </div>

                          {/* Step-by-Step Resolution */}
                          <div style={{ marginBottom: '22px' }}>
                            <h3
                              style={{
                                fontSize: '0.85rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                color: '#6c6e79',
                                fontWeight: 800,
                                margin: '0 0 12px',
                              }}
                            >
                              2. Verified Engineering Fix (Step-by-Step)
                            </h3>
                            <ol
                              style={{
                                margin: 0,
                                paddingLeft: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                              }}
                            >
                              {sol.steps.map((step, sIdx) => (
                                <li
                                  key={sIdx}
                                  style={{
                                    fontSize: '0.92rem',
                                    color: '#171a22',
                                    lineHeight: 1.6,
                                    paddingLeft: '4px',
                                  }}
                                >
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </div>

                          {/* Code Snippet */}
                          {sol.codeSnippet && (
                            <div style={{ marginBottom: '22px' }}>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  background: '#171a22',
                                  color: '#ffffff',
                                  padding: '10px 16px',
                                  borderRadius: '8px 8px 0 0',
                                  fontSize: '0.78rem',
                                  fontWeight: 700,
                                }}
                              >
                                <span>{sol.codeLabel || 'Production Implementation Snippet'}</span>
                                <button
                                  type="button"
                                  onClick={() => copySnippet(sol.id, sol.codeSnippet!)}
                                  style={{
                                    background: '#2d313e',
                                    color: '#ffffff',
                                    border: '1px solid #454a59',
                                    borderRadius: '5px',
                                    padding: '4px 10px',
                                    fontSize: '0.74rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                  }}
                                >
                                  {copiedId === sol.id ? '✓ Copied' : 'Copy Code'}
                                </button>
                              </div>
                              <pre
                                style={{
                                  margin: 0,
                                  padding: '16px',
                                  background: '#0f1117',
                                  color: '#e5e7eb',
                                  borderRadius: '0 0 8px 8px',
                                  fontSize: '0.8rem',
                                  lineHeight: 1.55,
                                  overflowX: 'auto',
                                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                }}
                              >
                                <code>{sol.codeSnippet}</code>
                              </pre>
                            </div>
                          )}

                          {/* Verification & Internal Links */}
                          <div
                            style={{
                              background: '#f7f8fa',
                              border: '1px solid #e2e5eb',
                              borderRadius: '8px',
                              padding: '14px 18px',
                              display: 'flex',
                              flexWrap: 'wrap',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '14px',
                            }}
                          >
                            <div style={{ flex: '1 1 320px', fontSize: '0.84rem', color: '#374151' }}>
                              <strong style={{ color: '#171a22' }}>QA Verification: </strong>
                              {sol.verificationCheck}
                            </div>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                              {sol.newsLink && (
                                <Link
                                  href={sol.newsLink.href}
                                  style={{
                                    padding: '8px 14px',
                                    borderRadius: '6px',
                                    border: '1px solid #bae6fd',
                                    background: '#f0f9ff',
                                    color: '#0369a1',
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                  }}
                                >
                                  📰 {sol.newsLink.label} →
                                </Link>
                              )}
                              <Link
                                href={sol.guideLink.href}
                                style={{
                                  padding: '8px 14px',
                                  borderRadius: '6px',
                                  border: '1px solid #d1d5db',
                                  background: '#ffffff',
                                  color: '#171a22',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  textDecoration: 'none',
                                }}
                              >
                                {sol.guideLink.label} →
                              </Link>
                              <Link
                                href={sol.serviceLink.href}
                                style={{
                                  padding: '8px 14px',
                                  borderRadius: '6px',
                                  background: '#171a22',
                                  color: '#ffffff',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  textDecoration: 'none',
                                }}
                              >
                                {sol.serviceLink.label} →
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </article>

                    {/* Mid-Feed Free Domain Authority Checker Banner */}
                    {idx === 1 && (
                      <div
                        style={{
                          background: '#ffffff',
                          border: '1px solid #171a22',
                          borderRadius: '12px',
                          padding: '22px 24px',
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '18px',
                        }}
                      >
                        <div style={{ maxWidth: '580px' }}>
                          <div
                            style={{
                              display: 'inline-block',
                              padding: '3px 9px',
                              borderRadius: '4px',
                              background: '#f2f4f8',
                              color: '#171a22',
                              fontSize: '0.72rem',
                              fontWeight: 800,
                              textTransform: 'uppercase',
                              letterSpacing: '0.06em',
                              marginBottom: '6px',
                            }}
                          >
                            Free Diagnostic Tool
                          </div>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#171a22', margin: '0 0 6px' }}>
                            Is Weak Domain Authority Holding Your Pages Stuck in &ldquo;Crawled - Not Indexed&rdquo;?
                          </h3>
                          <p style={{ fontSize: '0.88rem', color: '#4b4f58', margin: 0, lineHeight: 1.55 }}>
                            Check your website&apos;s real-time Domain Authority (DA), Page Authority (PA), and backlink
                            trust profile before diagnosing indexing bottlenecks.
                          </p>
                        </div>
                        <a
                          href="https://nicheseopro.com/authority-checker"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: '12px 20px',
                            borderRadius: '8px',
                            background: '#171a22',
                            color: '#ffffff',
                            fontSize: '0.86rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          Check Free DA Score ↗
                        </a>
                      </div>
                    )}
                  </React.Fragment>
                )
              })}
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="flex flex-col gap-5 lg:sticky lg:top-24">
            {/* Emergency SEO Triage Card */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e2e5eb',
                borderRadius: '12px',
                padding: '22px',
              }}
            >
              <div
                style={{
                  fontSize: '0.73rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#6c6e79',
                  marginBottom: '8px',
                }}
              >
                24-Hour Technical Triage
              </div>
              <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: '#171a22', margin: '0 0 10px', lineHeight: 1.35 }}>
                Need Our Engineers to Implement the Fix Directly?
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#4b4f58', lineHeight: 1.6, margin: '0 0 16px' }}>
                Whether you are dealing with a sudden Google Business Profile suspension, a failed site migration, or
                Shopify duplicate URL bloat, our senior technical SEO engineers can audit and patch your stack.
              </p>
              <Link
                href="/free-audit"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: '#171a22',
                  color: '#ffffff',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  marginBottom: '10px',
                }}
              >
                Get Free Technical Diagnostic →
              </Link>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '14px' }}>
                <Link
                  href="/services/technical-seo"
                  style={{ fontSize: '0.82rem', color: '#171a22', fontWeight: 600, textDecoration: 'none' }}
                >
                  → Technical SEO Engineering
                </Link>
                <Link
                  href="/services/law-firm-seo"
                  style={{ fontSize: '0.82rem', color: '#171a22', fontWeight: 600, textDecoration: 'none' }}
                >
                  → Law Firm SEO &amp; GBP Recovery
                </Link>
                <Link
                  href="/services/ecommerce-seo/shopify"
                  style={{ fontSize: '0.82rem', color: '#171a22', fontWeight: 600, textDecoration: 'none' }}
                >
                  → Shopify Liquid SEO Optimization
                </Link>
                <Link
                  href="/services/ecommerce-seo/woocommerce"
                  style={{ fontSize: '0.82rem', color: '#171a22', fontWeight: 600, textDecoration: 'none' }}
                >
                  → WordPress Core Web Vitals Fix
                </Link>
              </div>
            </div>

            {/* Free DA Checker Widget */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e2e5eb',
                borderRadius: '12px',
                padding: '22px',
              }}
            >
              <div
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#171a22',
                  marginBottom: '6px',
                }}
              >
                Free SEO Utility
              </div>
              <h3 style={{ fontSize: '1.02rem', fontWeight: 800, color: '#171a22', margin: '0 0 8px' }}>
                Free Domain Authority (DA) Checker
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#4b4f58', lineHeight: 1.55, margin: '0 0 14px' }}>
                Benchmark your domain authority and backlink equity against top-ranking competitors in your industry.
              </p>
              <a
                href="https://nicheseopro.com/authority-checker"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #171a22',
                  background: '#f7f8fa',
                  color: '#171a22',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                Launch Free DA Checker ↗
              </a>
            </div>

            {/* Cross-Hub Navigation Box */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e2e5eb',
                borderRadius: '12px',
                padding: '20px',
              }}
            >
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#171a22', margin: '0 0 12px' }}>
                Explore Connected Hubs
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Link
                  href="/resources/news"
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: '#f7f8fa',
                    border: '1px solid #e2e5eb',
                    color: '#171a22',
                    fontSize: '0.83rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  01. Industry SEO News Desk →
                </Link>
                <Link
                  href="/resources/discussions"
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: '#f7f8fa',
                    border: '1px solid #e2e5eb',
                    color: '#171a22',
                    fontSize: '0.83rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  02. SEO &amp; Regional Discussion Forum →
                </Link>
                <Link
                  href="/resources/learning-hub"
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: '#f7f8fa',
                    border: '1px solid #e2e5eb',
                    color: '#171a22',
                    fontSize: '0.83rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  04. Industry SEO Learning Hub →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Submit Issue Modal (Saves to Neon DB) */}
      {showSubmitModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(23, 26, 34, 0.6)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              maxWidth: '540px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '24px',
              border: '1px solid #e2e5eb',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#171a22', margin: 0 }}>
                Submit an SEO Issue for Engineering Review
              </h3>
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  color: '#6c6e79',
                }}
              >
                ✕
              </button>
            </div>

            {issueSubmitted ? (
              <div style={{ padding: '24px 0', textAlign: 'center' }}>
                <p style={{ fontSize: '1rem', fontWeight: 700, color: '#171a22', marginBottom: '8px' }}>
                  ✓ Issue Logged in SearchPrex Database
                </p>
                <p style={{ fontSize: '0.88rem', color: '#4b4f58', margin: 0 }}>
                  Our engineering team will review your symptom and follow up with a diagnostic fix.
                </p>
              </div>
            ) : (
              <form onSubmit={handleIssueSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>
                    Platform / Category
                  </label>
                  <select
                    value={issueForm.category}
                    onChange={(e) => setIssueForm({ ...issueForm, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                      fontSize: '0.88rem',
                    }}
                  >
                    <option value="SEO Issues & Solution">SEO Issues &amp; Solution</option>
                    <option value="Law Firm Issues & Solution">Law Firm Issues &amp; Solution</option>
                    <option value="Ecommerce Issues & Solution">Ecommerce Issues &amp; Solution</option>
                    <option value="Shopify Issues & Solution">Shopify Issues &amp; Solution</option>
                    <option value="WordPress Issues & Solution">WordPress Issues &amp; Solution</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={issueForm.name}
                    onChange={(e) => setIssueForm({ ...issueForm, name: e.target.value })}
                    style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.88rem' }}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Work Email"
                    value={issueForm.email}
                    onChange={(e) => setIssueForm({ ...issueForm, email: e.target.value })}
                    style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.88rem' }}
                  />
                </div>

                <input
                  type="url"
                  placeholder="Affected Website URL (optional)"
                  value={issueForm.website}
                  onChange={(e) => setIssueForm({ ...issueForm, website: e.target.value })}
                  style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.88rem' }}
                />

                <textarea
                  required
                  rows={4}
                  placeholder="Describe the exact GSC status, ranking drop, or technical error symptom..."
                  value={issueForm.errorSymptom}
                  onChange={(e) => setIssueForm({ ...issueForm, errorSymptom: e.target.value })}
                  style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.88rem' }}
                />

                {issueError && (
                  <p style={{ color: '#b91c1c', fontSize: '0.82rem', margin: 0 }}>{issueError}</p>
                )}

                <button
                  type="submit"
                  disabled={issueSubmitting}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    background: '#171a22',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {issueSubmitting ? 'Saving to Database...' : 'Submit Diagnostic Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Comments Modal */}
      {activeCommentModal && (
        <NewsCommentModal
          isOpen={true}
          slug={activeCommentModal.slug}
          title={activeCommentModal.title}
          currentLikes={dbStats[activeCommentModal.slug]?.likes || 0}
          userLiked={Boolean(dbStats[activeCommentModal.slug]?.userLiked)}
          onToggleLike={(s) => handleHelpful(s)}
          onClose={() => setActiveCommentModal(null)}
          onCommentAdded={(s, newTotal) => {
            setDbStats((prev) => ({
              ...prev,
              [s]: {
                ...(prev[s] || { likes: 0, userLiked: false }),
                commentsCount: newTotal,
              },
            }))
          }}
        />
      )}
    </div>
  )
}

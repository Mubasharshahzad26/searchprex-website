'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import PlatformHubNav from '../../../components/platform/PlatformHubNav'

export interface LearningModule {
  code: string
  title: string
  duration: string
  summary: string
  keyDeliverable: string
  resourceHref: string
  resourceLabel: string
}

export interface LearningTrack {
  id: 'SEO' | 'Law Firm' | 'Ecommerce' | 'Shopify Store' | 'WordPress'
  title: string
  subtitle: string
  level: string
  totalReadTime: string
  overview: string
  modules: LearningModule[]
  checklist: { id: string; text: string }[]
  primaryChecklistHref: string
  primaryChecklistLabel: string
  pillarGuideHref: string
  pillarGuideLabel: string
  serviceHref: string
  serviceLabel: string
  newsCategoryParam: string
}

const TRACK_TABS = [
  { id: 'ALL', label: 'All Learning Tracks' },
  { id: 'SEO', label: 'SEO' },
  { id: 'Law Firm', label: 'Law Firm' },
  { id: 'Ecommerce', label: 'Ecommerce' },
  { id: 'Shopify Store', label: 'Shopify Store' },
  { id: 'WordPress', label: 'WordPress' },
] as const

const LEARNING_TRACKS: LearningTrack[] = [
  {
    id: 'SEO',
    title: 'Core Technical SEO, Entity Architecture & AI Search Visibility',
    subtitle: 'Track 01 • Core Search Engineering & Gemini 4 / GEO Mastery',
    level: 'Intermediate to Advanced',
    totalReadTime: '4 Modules • 55 mins',
    overview:
      'Build an unshakeable technical and semantic foundation. Learn how Googlebot allocates crawl budget, how Information Gain determines indexing priority, and how to structure Answer-First HTML passages and tables that win citations in Google AI Overviews and ChatGPT Search.',
    modules: [
      {
        code: 'MOD 1.1',
        title: 'Crawl Budget, Render Queue & Indexation Hygiene',
        duration: '15 mins',
        summary:
          'Diagnose server log behavior, resolve "Crawled - currently not indexed" states, and build a flat 2-click internal link graph to money pages.',
        keyDeliverable: 'Log-Verified Crawl Map & Canonical Matrix',
        resourceHref: '/resources/technical-seo-checklist',
        resourceLabel: 'Open Technical SEO Checklist',
      },
      {
        code: 'MOD 1.2',
        title: 'Topical Authority Hub-and-Spoke Silo Engineering',
        duration: '15 mins',
        summary:
          'Map entity relationships using pillar pages, supporting problem-solver spokes, and contextual anchor text without keyword cannibalization.',
        keyDeliverable: 'Topical Cluster & Internal Link Blueprint',
        resourceHref: '/blog/topical-authority-content-clusters',
        resourceLabel: 'Read Topical Authority Cluster Guide',
      },
      {
        code: 'MOD 1.3',
        title: 'AI Overviews (Gemini 4), /llms.txt & Answer-Chunk Optimization',
        duration: '15 mins',
        summary:
          'Format 45–60 word direct answer capsules beneath question H2s, deploy semantic HTML comparison tables, and configure root /llms.txt.',
        keyDeliverable: 'GEO & AI Overview Citation Template',
        resourceHref: '/blog/google-ai-overviews-seo',
        resourceLabel: 'Read AI Overviews Guide',
      },
      {
        code: 'MOD 1.4',
        title: 'High-Authority Digital PR & Link Velocity Governance',
        duration: '10 mins',
        summary:
          'Audit backlink toxicity, build editorial data studies that attract natural tier-1 citations, and close Domain Authority gaps against SERP leaders.',
        keyDeliverable: 'Competitor Authority Gap Scorecard',
        resourceHref: '/blog/crawl-budget-optimization-guide',
        resourceLabel: 'Read Crawl Budget & Authority Guide',
      },
    ],
    checklist: [
      { id: 'seo-1', text: 'All core commercial URLs sit within 2 clicks of the homepage with >= 4 contextual internal links.' },
      { id: 'seo-2', text: 'Zero orphan pages or redirect chains (302 -> 301) inside XML sitemaps.' },
      { id: 'seo-3', text: 'Every H2 question heading is followed immediately by a concise 45–60 word direct answer paragraph.' },
      { id: 'seo-4', text: 'Organization, WebSite, Service, and FAQPage JSON-LD validate with zero warnings.' },
    ],
    primaryChecklistHref: '/resources/technical-seo-checklist',
    primaryChecklistLabel: 'Interactive Technical SEO Checklist',
    pillarGuideHref: '/blog/crawl-budget-optimization-guide',
    pillarGuideLabel: 'Complete Technical SEO Guide',
    serviceHref: '/services/technical-seo',
    serviceLabel: 'Technical SEO Engineering Service',
    newsCategoryParam: 'SEO News',
  },
  {
    id: 'Law Firm',
    title: 'Law Firm SEO, State Bar E-E-A-T & Local 3-Pack Domination',
    subtitle: 'Track 02 • Personal Injury, Criminal Defense, Family & Corporate Law',
    level: 'Practice Growth & Legal Marketing',
    totalReadTime: '4 Modules • 50 mins',
    overview:
      'Legal search is one of the highest-CPC, strictest YMYL verticals on Google. Master practice-area hub architecture, multi-office Google Business Profile compliance, State Bar entity verification, and high-converting legal intake funnels.',
    modules: [
      {
        code: 'MOD 2.1',
        title: 'Practice-Area Pillar & Case-Type Sub-Silo Architecture',
        duration: '15 mins',
        summary:
          'Structure Personal Injury, Car Accident, Truck Wreck, and Wrongful Death silos without triggering city-page doorway penalties.',
        keyDeliverable: 'Practice-Area URL & Intent Hierarchy',
        resourceHref: '/blog/law-firm-seo-2026-guide',
        resourceLabel: 'Read Law Firm SEO Guide',
      },
      {
        code: 'MOD 2.2',
        title: 'Google Business Profile (GBP) 3-Pack & LSA Review Velocity',
        duration: '15 mins',
        summary:
          'Protect your firm from deceptive content suspensions, optimize primary/secondary legal categories, and align LSA intake responsiveness.',
        keyDeliverable: 'GBP Compliance & Suspension Proofing SOP',
        resourceHref: '/resources/google-business-profile-checklist',
        resourceLabel: 'Open GBP Optimization Checklist',
      },
      {
        code: 'MOD 2.3',
        title: 'Trial Attorney Bio Pages & State Bar JSON-LD Verification',
        duration: '10 mins',
        summary:
          'Satisfy Google YMYL quality raters by linking every legal guide to a bar-admitted attorney profile with `Attorney` and `LegalService` schema.',
        keyDeliverable: 'Verified Attorney Schema Template',
        resourceHref: '/resources/law-firm-seo-audit-checklist',
        resourceLabel: 'Open Law Firm Audit Checklist',
      },
      {
        code: 'MOD 2.4',
        title: 'Legal Authority Citations, Verdict PR & Local Chamber Links',
        duration: '10 mins',
        summary:
          'Acquire authoritative legal directory placements (Justia, Avvo, SuperLawyers, State Bar sections) and local news press coverage.',
        keyDeliverable: 'Legal Tier-1 Citation Matrix',
        resourceHref: '/services/law-firm-seo',
        resourceLabel: 'View Law Firm SEO Deliverables',
      },
    ],
    checklist: [
      { id: 'law-1', text: 'GBP title matches official State Bar / Secretary of State registration with physical suite signage.' },
      { id: 'law-2', text: 'Every practice-area page features verified attorney reviewer attribution and State Bar number.' },
      { id: 'law-3', text: 'Dedicated sub-pages exist for high-value case types (e.g., Commercial Truck Accidents, Traumatic Brain Injury).' },
      { id: 'law-4', text: '24/7 intake tracking with sub-60-second response time connected to GBP & LSA call routing.' },
    ],
    primaryChecklistHref: '/resources/law-firm-seo-audit-checklist',
    primaryChecklistLabel: 'Law Firm SEO Audit Checklist',
    pillarGuideHref: '/blog/law-firm-seo-2026-guide',
    pillarGuideLabel: 'Law Firm SEO Master Guide',
    serviceHref: '/services/law-firm-seo',
    serviceLabel: 'Law Firm SEO Agency Service',
    newsCategoryParam: 'Law Firm SEO News',
  },
  {
    id: 'Ecommerce',
    title: 'Ecommerce Store SEO: Category Architecture, Facets & Shopping Graph',
    subtitle: 'Track 03 • Multi-SKU Catalogs, PLPs, PDPs & Merchant Center Revenue',
    level: 'Ecommerce Growth & Merchandising',
    totalReadTime: '4 Modules • 50 mins',
    overview:
      'Turn your product catalog into a compounding organic revenue engine. Learn how to turn high-demand filter combinations into indexable landing pages, prevent faceted crawl traps, and synchronize structured data with Google Shopping Graph.',
    modules: [
      {
        code: 'MOD 3.1',
        title: 'Commercial Category (PLP) & Sub-Collection Taxonomy Design',
        duration: '15 mins',
        summary:
          'Map buyer modifier search demand (material, style, use-case, brand) into dedicated indexable category tree nodes.',
        keyDeliverable: 'Ecommerce Category Taxonomy Matrix',
        resourceHref: '/blog/ecommerce-product-page-seo',
        resourceLabel: 'Read Ecommerce Product & Category Guide',
      },
      {
        code: 'MOD 3.2',
        title: 'Faceted Navigation Governance: Indexable Modifiers vs. Crawl Traps',
        duration: '15 mins',
        summary:
          'Configure conditional canonicals, parameter blocking, and clean static URLs for single-attribute high-volume filters.',
        keyDeliverable: 'Facet Indexation Rulebook',
        resourceHref: '/blog/fix-faceted-navigation-ecommerce-seo',
        resourceLabel: 'Read Faceted Navigation Fix Guide',
      },
      {
        code: 'MOD 3.3',
        title: 'High-Converting Product Page (PDP) Schema & Variant Consolidation',
        duration: '10 mins',
        summary:
          'Implement `ProductGroup`, `hasVariant`, `Offer`, `MerchantReturnPolicy`, and `shippingDetails` JSON-LD for rich product snippets.',
        keyDeliverable: 'Merchant Center & PDP Schema Blueprint',
        resourceHref: '/blog/schema-markup-ecommerce',
        resourceLabel: 'Read Ecommerce Schema Guide',
      },
      {
        code: 'MOD 3.4',
        title: 'Out-of-Stock & Seasonal Discontinued Product Lifecycle',
        duration: '10 mins',
        summary:
          'Preserve accumulated backlinks and rankings on temporarily out-of-stock or permanently retired SKUs without triggering soft 404s.',
        keyDeliverable: 'SKU Retirement Decision Tree',
        resourceHref: '/resources/technical-seo-checklist',
        resourceLabel: 'Technical Audit Checklist',
      },
    ],
    checklist: [
      { id: 'ecom-1', text: 'Collection/PLP pages include above-the-fold scannable buying context and below-the-grid comparison tables.' },
      { id: 'ecom-2', text: 'Multi-select price, sort, and size parameters are blocked from creating indexable duplicate URLs.' },
      { id: 'ecom-3', text: 'PDPs output valid ProductGroup, AggregateRating, Offer, and MerchantReturnPolicy JSON-LD.' },
      { id: 'ecom-4', text: 'Discontinued SKUs with backlinks 301 redirect to the closest active replacement SKU or parent category.' },
    ],
    primaryChecklistHref: '/resources/woocommerce-seo-checklist',
    primaryChecklistLabel: 'Ecommerce & Store SEO Checklist',
    pillarGuideHref: '/blog/ecommerce-product-page-seo',
    pillarGuideLabel: 'Ecommerce Product & Category SEO Guide',
    serviceHref: '/services/ecommerce-seo',
    serviceLabel: 'Ecommerce SEO Growth Service',
    newsCategoryParam: 'Ecommerce Store SEO News',
  },
  {
    id: 'Shopify Store',
    title: 'Shopify Store Liquid SEO, URL Canonicalization & Agentic Checkout',
    subtitle: 'Track 04 • Shopify & Shopify Plus Theme Engineering',
    level: 'Shopify Merchants & Developers',
    totalReadTime: '4 Modules • 45 mins',
    overview:
      'Out-of-the-box Shopify themes create severe duplicate product URLs and tag filter bloat. Learn exact Liquid template edits to fix `/collections/*/products/*` duplication, customize `robots.txt.liquid`, and prepare your store for AI agentic checkout.',
    modules: [
      {
        code: 'MOD 4.1',
        title: 'Fixing `/collections/*/products/*` Duplicate Internal Linking in Liquid',
        duration: '15 mins',
        summary:
          'Remove `| within: collection` across `card-product.liquid` and collection grid snippets so 100% of internal links point to canonical `/products/` URLs.',
        keyDeliverable: 'Clean Canonical Product Grid Snippet',
        resourceHref: '/resources/solutions',
        resourceLabel: 'Copy Shopify Liquid Code Fix',
      },
      {
        code: 'MOD 4.2',
        title: 'Customizing `robots.txt.liquid` for Tag & Search Filter Control',
        duration: '10 mins',
        summary:
          'Prevent Googlebot from wasting crawl budget on `/collections/*+*`, `?sort_by=`, `?pr_prod_strat=`, and internal search templates.',
        keyDeliverable: 'Production robots.txt.liquid File',
        resourceHref: '/blog/shopify-woocommerce-indexing-blueprint',
        resourceLabel: 'Read Shopify Indexing Blueprint',
      },
      {
        code: 'MOD 4.3',
        title: 'Scaling Sub-Collections with Shopify Metaobjects & Metafields',
        duration: '10 mins',
        summary:
          'Overcome Shopify\'s flat `/collections/` URL structure using structured breadcrumb trails, custom metafield tables, and hub collections.',
        keyDeliverable: 'Shopify Metaobject Silo Architecture',
        resourceHref: '/services/ecommerce-seo/shopify',
        resourceLabel: 'Shopify SEO Engineering',
      },
      {
        code: 'MOD 4.4',
        title: 'App Script De-Bloating & Core Web Vitals on Dawn / OS 2.0 Themes',
        duration: '10 mins',
        summary:
          'Audit residual third-party Shopify App Embed scripts that inflate Total Blocking Time (TBT) and Interaction to Next Paint (INP).',
        keyDeliverable: 'Shopify Theme Speed Audit',
        resourceHref: '/blog/core-web-vitals-ecommerce',
        resourceLabel: 'Read Core Web Vitals Guide',
      },
    ],
    checklist: [
      { id: 'shop-1', text: 'Removed `| within: collection` from all theme product card Liquid snippets.' },
      { id: 'shop-2', text: 'Custom `robots.txt.liquid` blocks multi-tag `/collections/*+*` and `?sort_by=` parameters.' },
      { id: 'shop-3', text: 'Uninstalled Shopify apps have no leftover `<script>` tags inside `theme.liquid`.' },
      { id: 'shop-4', text: 'Collection pages feature unique H1s, editorial buying FAQs, and `BreadcrumbList` schema.' },
    ],
    primaryChecklistHref: '/resources/technical-seo-checklist',
    primaryChecklistLabel: 'Shopify Technical Audit Checklist',
    pillarGuideHref: '/blog/shopify-woocommerce-indexing-blueprint',
    pillarGuideLabel: 'Shopify Indexing Blueprint',
    serviceHref: '/services/ecommerce-seo/shopify',
    serviceLabel: 'Shopify SEO Specialist Service',
    newsCategoryParam: 'Shopify Store News',
  },
  {
    id: 'WordPress',
    title: 'WordPress & WooCommerce Technical SEO, Speed & Schema Mastery',
    subtitle: 'Track 05 • WordPress Publishers, B2B Sites & WooCommerce Stores',
    level: 'WordPress Admins & Developers',
    totalReadTime: '4 Modules • 45 mins',
    overview:
      'Eliminate WordPress taxonomy bloat, database bottlenecks, and page-builder slowdowns. Learn how to configure RankMath/Yoast properly, clean `wp_options` autoload bloat, and pass Core Web Vitals on mobile.',
    modules: [
      {
        code: 'MOD 5.1',
        title: 'Eliminating Tag, Author, Date & Attachment Archive Index Bloat',
        duration: '10 mins',
        summary:
          'Prevent thin WordPress archive pages and media attachment URLs from diluting site-wide Helpful Content quality signals.',
        keyDeliverable: 'WordPress Indexation Hygiene Config',
        resourceHref: '/resources/woocommerce-seo-checklist',
        resourceLabel: 'Open WordPress & WooCommerce Checklist',
      },
      {
        code: 'MOD 5.2',
        title: 'Database `wp_options` Autoload Cleanup & Redis Object Caching',
        duration: '15 mins',
        summary:
          'Reduce uncached Time to First Byte (TTFB) from >900ms to <150ms by pruning orphaned autoloaded plugin options and enabling Redis.',
        keyDeliverable: 'SQL Autoload Cleanup Script',
        resourceHref: '/resources/solutions',
        resourceLabel: 'View WordPress SQL & CWV Fix',
      },
      {
        code: 'MOD 5.3',
        title: 'De-Bloating Elementor / Gutenberg DOM Depth & Passing INP',
        duration: '10 mins',
        summary:
          'Flatten excessive DOM wrapper nodes, self-host variable WOFF2 fonts, and defer third-party scripts until user interaction.',
        keyDeliverable: 'Mobile CWV Optimization Protocol',
        resourceHref: '/services/ecommerce-seo/woocommerce',
        resourceLabel: 'Explore WordPress & WooCommerce SEO',
      },
      {
        code: 'MOD 5.4',
        title: 'Custom Gutenberg Comparison Blocks & Automated Schema Graphs',
        duration: '10 mins',
        summary:
          'Build reusable semantic HTML comparison tables and nested `Article` + `FAQPage` + `Product` schema graphs.',
        keyDeliverable: 'WordPress Entity Schema Blueprint',
        resourceHref: '/blog/schema-markup-ecommerce',
        resourceLabel: 'Read Schema Markup Guide',
      },
    ],
    checklist: [
      { id: 'wp-1', text: 'WordPress date archives, empty tag archives, and media attachment pages are noindexed or redirected.' },
      { id: 'wp-2', text: 'Total `wp_options` autoloaded data size is under 800 KB with Redis Object Cache active.' },
      { id: 'wp-3', text: 'Hero LCP image uses `fetchpriority="high"` and excludes lazy loading.' },
      { id: 'wp-4', text: 'XML sitemaps include only canonical, 200-OK indexable posts, pages, and commercial categories.' },
    ],
    primaryChecklistHref: '/resources/woocommerce-seo-checklist',
    primaryChecklistLabel: 'WordPress & WooCommerce SEO Checklist',
    pillarGuideHref: '/blog/core-web-vitals-ecommerce',
    pillarGuideLabel: 'WordPress & WooCommerce CWV Guide',
    serviceHref: '/services/ecommerce-seo/woocommerce',
    serviceLabel: 'WordPress & WooCommerce SEO Service',
    newsCategoryParam: 'WordPress News',
  },
]

export default function LearningHubClient() {
  const [selectedTrack, setSelectedTrack] = useState<string>('ALL')
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({})

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sp_learning_hub_progress')
      if (saved) setCompletedItems(JSON.parse(saved))
    } catch {
      // ignore
    }
  }, [])

  const toggleChecklist = (id: string) => {
    const next = { ...completedItems, [id]: !completedItems[id] }
    setCompletedItems(next)
    try {
      localStorage.setItem('sp_learning_hub_progress', JSON.stringify(next))
    } catch {
      // ignore
    }
  }

  const visibleTracks = useMemo(() => {
    if (selectedTrack === 'ALL') return LEARNING_TRACKS
    return LEARNING_TRACKS.filter((t) => t.id === selectedTrack)
  }, [selectedTrack])

  const totalChecklistItems = LEARNING_TRACKS.reduce((acc, t) => acc + t.checklist.length, 0)
  const completedCount = Object.values(completedItems).filter(Boolean).length
  const progressPercent = Math.round((completedCount / totalChecklistItems) * 100)

  return (
    <div style={{ background: '#f7f8fa', minHeight: '100vh', color: '#171a22', paddingTop: '80px' }}>
      <PlatformHubNav active="learning" />

      {/* Header */}
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
            <div style={{ maxWidth: '760px' }}>
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
                <span style={{ color: '#171a22', fontWeight: 600 }}>Learning Hub</span>
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
                SearchPrex SEO Learning Hub &amp; Industry Playbooks
              </h1>
              <p style={{ fontSize: '1.02rem', color: '#4b4f58', lineHeight: 1.65, margin: 0 }}>
                Structured, step-by-step curricula and interactive readiness checklists across{' '}
                <strong>Core SEO</strong>, <strong>Law Firms</strong>, <strong>Ecommerce Stores</strong>,{' '}
                <strong>Shopify</strong>, and <strong>WordPress</strong>.
              </p>
            </div>

            {/* Interactive Progress Widget */}
            <div
              style={{
                background: '#f7f8fa',
                border: '1px solid #e2e5eb',
                borderRadius: '10px',
                padding: '14px 18px',
                minWidth: '260px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#171a22',
                  marginBottom: '6px',
                }}
              >
                <span>Your Implementation Progress</span>
                <span>
                  {completedCount}/{totalChecklistItems} ({progressPercent}%)
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '7px',
                  background: '#e2e5eb',
                  borderRadius: '999px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${progressPercent}%`,
                    height: '100%',
                    background: '#171a22',
                    transition: 'width 0.25s ease',
                  }}
                />
              </div>
            </div>
          </div>

          {/* 5 Industry Track Filter Tabs */}
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
            {TRACK_TABS.map((tab) => {
              const isActive = selectedTrack === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedTrack(tab.id)}
                  style={{
                    padding: '9px 18px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 700 : 600,
                    background: isActive ? '#171a22' : '#f7f8fa',
                    color: isActive ? '#ffffff' : '#3d4049',
                    border: isActive ? '1px solid #171a22' : '1px solid #e2e5eb',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 pb-16 sm:py-10 sm:pb-20">
        <div
          className="mx-auto grid max-w-[1240px] grid-cols-1 items-start gap-7 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_330px]"
        >
          {/* Left: Learning Tracks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {visibleTracks.map((track, tIdx) => (
              <React.Fragment key={track.id}>
                <article
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e5eb',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                  }}
                >
                  {/* Track Header */}
                  <div style={{ padding: '26px 26px 22px', borderBottom: '1px solid #edf0f5' }}>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                        marginBottom: '10px',
                      }}
                    >
                      <span
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          background: '#f2f4f8',
                          color: '#171a22',
                          fontSize: '0.74rem',
                          fontWeight: 800,
                          border: '1px solid #e2e5eb',
                        }}
                      >
                        {track.subtitle}
                      </span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#6c6e79' }}>
                        {track.level} • {track.totalReadTime}
                      </span>
                    </div>

                    <h2
                      style={{
                        fontSize: '1.35rem',
                        fontWeight: 800,
                        color: '#171a22',
                        margin: '0 0 10px',
                        lineHeight: 1.3,
                      }}
                    >
                      {track.title}
                    </h2>
                    <p style={{ fontSize: '0.93rem', color: '#4b4f58', lineHeight: 1.65, margin: 0 }}>
                      {track.overview}
                    </p>
                  </div>

                  {/* Modules Grid */}
                  <div style={{ padding: '24px 26px', background: '#fafbfc', borderBottom: '1px solid #edf0f5' }}>
                    <h3
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: '#6c6e79',
                        margin: '0 0 14px',
                      }}
                    >
                      Curriculum Modules &amp; Actionable Blueprints
                    </h3>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '14px',
                      }}
                    >
                      {track.modules.map((mod) => (
                        <div
                          key={mod.code}
                          style={{
                            background: '#ffffff',
                            border: '1px solid #e2e5eb',
                            borderRadius: '10px',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '8px',
                              }}
                            >
                              <span
                                style={{
                                  fontSize: '0.72rem',
                                  fontWeight: 800,
                                  padding: '2px 8px',
                                  borderRadius: '4px',
                                  background: '#171a22',
                                  color: '#ffffff',
                                }}
                              >
                                {mod.code}
                              </span>
                              <span style={{ fontSize: '0.75rem', color: '#6c6e79', fontWeight: 600 }}>
                                {mod.duration}
                              </span>
                            </div>

                            <h4
                              style={{
                                fontSize: '0.96rem',
                                fontWeight: 800,
                                color: '#171a22',
                                margin: '0 0 8px',
                                lineHeight: 1.35,
                              }}
                            >
                              {mod.title}
                            </h4>
                            <p style={{ fontSize: '0.84rem', color: '#4b4f58', lineHeight: 1.55, margin: '0 0 12px' }}>
                              {mod.summary}
                            </p>
                          </div>

                          <div style={{ paddingTop: '10px', borderTop: '1px solid #f0f2f6' }}>
                            <div style={{ fontSize: '0.75rem', color: '#6c6e79', marginBottom: '6px' }}>
                              <strong style={{ color: '#171a22' }}>Deliverable:</strong> {mod.keyDeliverable}
                            </div>
                            <Link
                              href={mod.resourceHref}
                              style={{
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                color: '#171a22',
                                textDecoration: 'none',
                              }}
                            >
                              {mod.resourceLabel} →
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Readiness Checklist */}
                  <div style={{ padding: '22px 26px', background: '#ffffff' }}>
                    <h3
                      style={{
                        fontSize: '0.82rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: '#171a22',
                        margin: '0 0 12px',
                      }}
                    >
                      Interactive {track.id} Readiness Verification
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                      {track.checklist.map((item) => {
                        const checked = !!completedItems[item.id]
                        return (
                          <label
                            key={item.id}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '10px',
                              padding: '10px 12px',
                              borderRadius: '8px',
                              background: checked ? '#f2f4f8' : '#fafbfc',
                              border: '1px solid #e2e5eb',
                              cursor: 'pointer',
                              fontSize: '0.87rem',
                              color: checked ? '#6c6e79' : '#171a22',
                              textDecoration: checked ? 'line-through' : 'none',
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleChecklist(item.id)}
                              style={{ marginTop: '3px', accentColor: '#171a22' }}
                            />
                            <span>{item.text}</span>
                          </label>
                        )
                      })}
                    </div>

                    {/* Track Footer Links */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        paddingTop: '16px',
                        borderTop: '1px solid #edf0f5',
                      }}
                    >
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        <Link
                          href={track.primaryChecklistHref}
                          style={{
                            padding: '8px 14px',
                            borderRadius: '7px',
                            border: '1px solid #d1d5db',
                            background: '#ffffff',
                            color: '#171a22',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                          }}
                        >
                          ✓ {track.primaryChecklistLabel}
                        </Link>
                        <Link
                          href={track.pillarGuideHref}
                          style={{
                            padding: '8px 14px',
                            borderRadius: '7px',
                            border: '1px solid #d1d5db',
                            background: '#ffffff',
                            color: '#171a22',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                          }}
                        >
                          📘 {track.pillarGuideLabel}
                        </Link>
                        <Link
                          href={`/resources/news?category=${encodeURIComponent(track.newsCategoryParam)}`}
                          style={{
                            padding: '8px 14px',
                            borderRadius: '7px',
                            border: '1px solid #d1d5db',
                            background: '#f7f8fa',
                            color: '#171a22',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                          }}
                        >
                          📰 Latest {track.id} News
                        </Link>
                      </div>

                      <Link
                        href={track.serviceHref}
                        style={{
                          padding: '9px 16px',
                          borderRadius: '7px',
                          background: '#171a22',
                          color: '#ffffff',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          textDecoration: 'none',
                        }}
                      >
                        {track.serviceLabel} →
                      </Link>
                    </div>
                  </div>
                </article>

                {/* Inline DA Checker Banner after 2nd Track */}
                {tIdx === 1 && (
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
                      gap: '16px',
                    }}
                  >
                    <div style={{ maxWidth: '580px' }}>
                      <span
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
                        Free Authority Benchmark Tool
                      </span>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#171a22', margin: '0 0 6px' }}>
                        Measure Your Domain Authority (DA) Before Launching Your Next Content Silo
                      </h3>
                      <p style={{ fontSize: '0.88rem', color: '#4b4f58', margin: 0, lineHeight: 1.55 }}>
                        Know exactly what tier of keyword difficulty your domain can realistically conquer right now.
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
            ))}
          </div>

          {/* Right Sidebar */}
          <aside className="flex flex-col gap-5 lg:sticky lg:top-24">
            {/* Interactive Checklists Directory */}
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
                  color: '#6c6e79',
                  marginBottom: '6px',
                }}
              >
                Downloadable &amp; Interactive Tools
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#171a22', margin: '0 0 14px' }}>
                Complete Audit Checklists
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Link
                  href="/resources/technical-seo-checklist"
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
                  ✓ 55-Point Technical SEO Checklist →
                </Link>
                <Link
                  href="/resources/law-firm-seo-audit-checklist"
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
                  ✓ Law Firm SEO Audit Checklist →
                </Link>
                <Link
                  href="/resources/woocommerce-seo-checklist"
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
                  ✓ WooCommerce &amp; Ecommerce Checklist →
                </Link>
                <Link
                  href="/resources/google-business-profile-checklist"
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
                  ✓ Google Business Profile Checklist →
                </Link>
              </div>
            </div>

            {/* Done-For-You Execution CTA */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e2e5eb',
                borderRadius: '12px',
                padding: '22px',
              }}
            >
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#171a22', margin: '0 0 8px' }}>
                Want SearchPrex to Execute These Playbooks For Your Brand?
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#4b4f58', lineHeight: 1.6, margin: '0 0 16px' }}>
                Skip months of trial-and-error. Request a custom roadmap and technical audit tailored to your website.
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
                }}
              >
                Request Free SEO Roadmap →
              </Link>
            </div>

            {/* Free DA Checker Card */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e2e5eb',
                borderRadius: '12px',
                padding: '22px',
              }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#171a22', margin: '0 0 8px' }}>
                Free Domain Authority Checker
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#4b4f58', lineHeight: 1.55, margin: '0 0 14px' }}>
                Verify your domain authority, backlink count, and ranking power in seconds.
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
                Check Free DA Score ↗
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}

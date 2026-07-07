import { GoogleGenerativeAI } from '@google/generative-ai'
import { collectRoadmapData } from './data-collector'
import { db } from '../db'

const AUTOPILOT_CAPABILITIES = `
AUTOPILOT HANDLES (automated via SearchPrex platform):
- content_generation: AI-generated unique content for underperformers + backlog pages
- on_page_optimization: title, meta description, H1, focus keyword (Rank Math REST API)
- schema_injection: JSON-LD injection (BreadcrumbList, CollectionPage, FAQPage, Brand)
- internal_linking: from verified links pool (no fake links)
- indexing_submission: Google Indexing API rotator (200/day per account)
- backlog_resubmission: daily automated crawled-not-indexed URL resubmission
- weekly_reports: automated client email reports with GSC KPIs

MANUAL / DEV TASKS (Autopilot cannot execute):
- core_web_vitals: LCP, INP, CLS (theme/server/images/scripts optimization)
- cms_configuration: Rank Math settings, plugin config
- server_optimization: TTFB, hosting, CDN
- robots_sitemap_structure: robots.txt, sitemap architecture
- redirect_management: 301/302 setup for broken links
- image_optimization: compression, lazy loading, WebP conversion
- mobile_ux: viewport, tap targets, mobile-first fixes
- site_architecture: navigation restructure, information hierarchy
- hreflang_setup: multi-language/region tagging
- structured_data_validation: rich results test, error fixes

OFF-PAGE / STRATEGIC (SEO analyst manual):
- link_building: digital PR, guest posts, broken link building, HARO
- disavow_toxic_links: Google Disavow Tool submissions
- competitor_gap_analysis: content gaps, keyword gaps
- brand_entity_building: mentions, citations, brand searches
- google_business_profile: local pack optimization
- reviews_management: reputation, review acquisition strategy

GROWTH / AEO (advanced modern SEO):
- featured_snippets: PAA targeting, snippet-friendly content structure
- ai_overview_optimization: SGE/AI Overview citable content
- entity_optimization: Wikipedia/Wikidata entity establishment
- topical_authority: content clusters, pillar pages
- eeat_signals: author pages, credentials, expertise proofs
- faq_expansion: comprehensive FAQ schema deployment
`

const INDUSTRY_CONTEXT: Record<string, string> = {
  ecommerce_woocommerce:
    'WooCommerce store on WordPress with Rank Math SEO. Focus on: product schema (Product/Offer/AggregateRating), category page optimization, faceted navigation crawl budget, product variant duplicate content, review schema, breadcrumbs, thin product pages, out-of-stock handling, seasonal indexing patterns.',
  ecommerce_shopify:
    'Shopify store. Focus on: Shopify-specific SEO limitations, collection page optimization, product schema, Shopify Markets for international, app-based schema deployment.',
  ecommerce_general:
    'E-commerce store. Focus on: product schema, category optimization, faceted navigation, thin product pages, cart/checkout not-indexed handling.',
  law_firm_family:
    'Family law firm. Focus on: E-E-A-T through attorney bio pages, practice area landing pages, local SEO, Google Business Profile, review acquisition, Avvo/Justia profiles.',
  law_firm_personal_injury:
    'Personal injury law firm. Focus on: high-CPC keyword competition, case result pages, attorney bios with credentials, city-level landing pages, YMYL compliance.',
  law_firm_criminal_defense:
    'Criminal defense firm. Focus on: charge-specific landing pages, attorney credentials, local SEO, review management, YMYL trust signals.',
  local_service_hvac:
    'HVAC service business. Focus on: local pack, service area pages, GBP optimization, seasonal keyword targeting, HVACBusiness schema.',
  local_service_plumbing:
    'Plumbing service. Focus on: emergency service keywords, local pack, service area pages, GBP, Plumber schema.',
  local_service_dental:
    'Dental practice. Focus on: procedure pages, local SEO, GBP, doctor bio pages, insurance pages, MedicalOrganization schema.',
  local_service_restaurant:
    'Restaurant. Focus on: menu schema, LocalBusiness/Restaurant schema, GBP with menu, reviews, local pack.',
  saas_b2b:
    'B2B SaaS. Focus on: comparison pages, feature pages, integration pages, use case pages, product-led content, technical documentation SEO.',
  content_publisher:
    'News/blog publisher. Focus on: NewsArticle schema, author E-E-A-T, topical authority clusters, Google News eligibility.',
  general:
    'General website. Focus on: technical foundation, content quality, on-page optimization, local relevance if applicable.',
}

function buildPrompt(data: any, industry: string, siteUrl: string) {
  const industryCtx = INDUSTRY_CONTEXT[industry] || INDUSTRY_CONTEXT.general
  return `You are a senior SEO strategist creating a client-facing 3-month roadmap. Your output must be honest, prioritized, and actionable.

CLIENT SITE: ${siteUrl}
INDUSTRY VERTICAL: ${industry}
INDUSTRY CONTEXT: ${industryCtx}

=== AUDIT DATA (real, from crawl) ===
Total sitemap pages: ${data.totalSitemapPages}
Sample crawled: ${data.sampledPages}
Scale factor: ${data.scaleFactor}x

Sample issues found (with percent of sample):
${JSON.stringify(data.sampleIssuesPct, null, 2)}

Projected across full site:
${JSON.stringify(data.projectedSiteIssues, null, 2)}

Categorized insights:
- Content needs improvement: ${data.insightCounts.content_needs_improvement}
- Indexed underperformers: ${data.insightCounts.indexed_underperformer}
- Not indexed: ${data.insightCounts.not_indexed}

Backlog indexing queue: ${data.backlogCounts.queued} URLs queued, ${data.backlogCounts.submitted} submitted
Indexing API capacity: ${data.indexingCapacity}

=== EXECUTION CAPABILITIES ===
${AUTOPILOT_CAPABILITIES}

=== YOUR TASK ===
Generate a 3-month SEO roadmap as VALID JSON only (no markdown, no preamble, no code fences).

For each task, assign:
- category: "autopilot" | "manual_dev" | "manual_seo" | "growth"
- If category is "autopilot", set canAutopilotHandle: true and specify autopilotAction from the capability keys
- priority: "P0" | "P1" | "P2"
- effort: "Low" | "Medium" | "High"
- impact: "Low" | "Medium" | "High"
- affectedPages: realistic estimate

Return this exact JSON structure:

{
  "executiveSummary": "2-3 sentences client-facing summary",
  "healthScore": 0-100,
  "healthBreakdown": {
    "technical": 0-100,
    "onPage": 0-100,
    "content": 0-100,
    "indexing": 0-100
  },
  "months": [
    {
      "month": 1,
      "theme": "Foundation & Critical Fixes",
      "focus": "1-line focus",
      "tasks": [
        {
          "title": "Specific task",
          "description": "1-2 sentences what and why",
          "category": "autopilot | manual_dev | manual_seo | growth",
          "priority": "P0 | P1 | P2",
          "effort": "Low | Medium | High",
          "impact": "Low | Medium | High",
          "affectedPages": 0,
          "expectedOutcome": "specific measurable outcome",
          "canAutopilotHandle": true,
          "autopilotAction": "capability_key_if_autopilot"
        }
      ]
    },
    { "month": 2 },
    { "month": 3 }
  ],
  "expectedMetrics": {
    "indexedPagesRecovery": "range like 60-80 percent",
    "impressionsGrowth": "range",
    "clicksGrowth": "range",
    "timeframe": "3 months"
  },
  "risksAndAssumptions": [
    "Honest risk 1",
    "Assumption 2"
  ],
  "investmentEstimation": {
    "autopilotTasks": 0,
    "manualTasks": 0,
    "autopilotHoursSaved": "estimate",
    "recommendedTier": "Free | Premium | Enterprise"
  }
}

CRITICAL RULES:
- Be HONEST about limits (Autopilot cannot fix Core Web Vitals)
- Prioritize BIGGEST wins first
- Base task counts on ACTUAL projected numbers
- Do NOT invent tasks unrelated to audit findings
- Match industry context strictly
- Return ONLY valid JSON, no other text`
}

export async function generateRoadmap(params: {
  auditRunId: string
  clientId?: string
  industry?: string
}) {
  const { auditRunId, clientId, industry = 'general' } = params

  const record = await db.roadmapPlan.create({
    data: {
      clientId,
      siteUrl: 'pending',
      auditRunId,
      industry,
      plan: {},
      status: 'generating',
    },
  })

  try {
    const data = await collectRoadmapData(auditRunId, clientId)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: { responseMimeType: 'application/json', temperature: 0.4 },
    })
    const prompt = buildPrompt(data, industry, data.siteUrl)
    const result = await model.generateContent(prompt)
    const text = result.response.text()

    let plan: any
    try {
      plan = JSON.parse(text)
    } catch {
      throw new Error('Gemini returned invalid JSON')
    }

    if (!plan.months || !Array.isArray(plan.months) || plan.months.length < 3) {
      throw new Error('Roadmap missing required 3-month structure')
    }

    await db.roadmapPlan.update({
      where: { id: record.id },
      data: {
        siteUrl: data.siteUrl,
        healthScore: plan.healthScore ?? null,
        executiveSummary: plan.executiveSummary ?? null,
        plan,
        expectedMetrics: plan.expectedMetrics ?? undefined,
        status: 'success',
      },
    })

    return { id: record.id, plan, auditData: data }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Roadmap generation failed'
    await db.roadmapPlan.update({
      where: { id: record.id },
      data: { status: 'error', errorMessage: msg },
    })
    throw err
  }
}
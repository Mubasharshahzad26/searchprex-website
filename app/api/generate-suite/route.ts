import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { getVerifiedLinksForSite } from '@/lib/verified-links'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

const MODEL = 'gemini-2.5-flash'

const LAYOUT_TEMPLATES: Record<string, string> = {
  REVIEW: 'Hands-on Review Style: Comparison with competitors, pros/cons list, and detailed performance breakdown.',
  GUIDE: "Ultimate Buyer's Guide: Educational approach, focus on what to look for, and top recommendations for different budgets.",
  TECHNICAL: 'Deep-Dive Technical Analysis: Focused on material science, engineering specs (spring tension, tang, lock mechanism), and durability standards.',
  JOURNEY: "User Journey Spotlight: Real-world scenarios, situational problem-solving, and 'why choose us' narrative.",
  SPEC_ORIE: 'Specification-Led Audit: Heavy data focus, technical tables, and performance metrics compared to industry standards.',
  COMPARISON: 'Versus Head-to-Head: Direct comparison between two specific products/brands, highlighting distinct trade-offs.',
  TROUBLESHOOT: "Maintenance & Troubleshooting: Technical 'how-to' focus, solving common pain points with expert precision.",
  STORY: 'Narrative Case Study: Following a specific user through a task, weaving product specs into a real-life outcome.',
  LUXURY_CRAFT: "Luxury Craftsmanship Journey: Focus on heritage, artisan detail, and the 'soul' of the product—ideal for high-ticket exclusives.",
  LAB_REPORT: 'Scientific Material Audit: Lab-testing style breakdown focusing on metallurgy, chemical resistance, and stress-test data.',
  MARKET_WATCH: "Collector's Market Analysis: Trends, rarity, resale value, and investment-grade insights for enthusiasts.",
  MYTH_BUSTER: "Industry Myth-Buster: Taking common misconceptions (e.g., 'more expensive is always better') and debunking them with raw data.",
  SOLUTION_MAP: "Pain-Point Solution Map: Identifying an ultra-specific user problem (e.g., 'wet-weather grip failure') and mapping technical features to the fix.",
}

const TECH_VARIETY = [
  'material fatigue analysis',
  'ergonomic efficiency',
  'manufacturing tolerances',
  'chemical composition stability',
  'deployment physics',
  'stress-to-failure benchmarks',
  'environmental degradation resistance',
]

export type Vertical = 'ecommerce' | 'local' | 'lawfirm' | 'digital'

const VERTICAL_PROFILES: Record<Vertical, {
  role: string
  depthLabel: string
  depthAngles: string[]
  focus: string
  schema: string
  cautions: string
}> = {
  ecommerce: {
    role: 'Expert E-commerce SEO Content Architect',
    depthLabel: 'product / technical audit',
    depthAngles: TECH_VARIETY,
    focus: 'Emphasize product specs, build quality, brand comparisons, buying guidance, and conversion. Mention relevant brands and link to category/product pages.',
    schema: 'Use Product / ItemList / FAQPage JSON-LD where relevant.',
    cautions: '',
  },
  local: {
    role: 'Local SEO Content Strategist',
    depthLabel: 'local-market & service-area depth',
    depthAngles: [
      'service-area coverage and "near me" search intent',
      'local trust signals (reviews, licensing, insurance, years serving the area)',
      'neighborhood / landmark-level relevance',
      'response time, availability and emergency service',
      'transparent local pricing and what affects cost',
    ],
    focus: 'Emphasize service areas, "near me" intent, NAP consistency, local trust signals (reviews, licensing, insurance, years in business), clear service descriptions, and strong contact/booking CTAs. Reference local landmarks/neighborhoods naturally.',
    schema: 'Use LocalBusiness JSON-LD (with areaServed, address, openingHours, aggregateRating) and FAQPage.',
    cautions: '',
  },
  lawfirm: {
    role: 'Legal Content Strategist specializing in attorney & law-firm SEO',
    depthLabel: 'legal practice-area & jurisdiction depth',
    depthAngles: [
      'practice-area scope and case types handled',
      'jurisdiction-relevant process and what to expect (general, non-advisory)',
      'attorney credentials, bar admissions and experience',
      'typical case timeline and client journey',
      'client trust, confidentiality and consultation process',
    ],
    focus: 'Emphasize practice areas, case types, jurisdiction relevance, attorney credentials and experience, what clients can expect, and consultation CTAs. Build authority and trust — E-E-A-T is critical here.',
    schema: 'Use LegalService / Attorney JSON-LD with areaServed and FAQPage.',
    cautions: 'YMYL — LEGAL: Be accurate and authoritative but NEVER guarantee outcomes, promise specific results, state settlement/verdict amounts as promises, or give individualized legal advice. Use compliant language ("may", "can", "in many cases") and direct readers to consult the firm.',
  },
  digital: {
    role: 'Digital Product & SaaS SEO Content Strategist',
    depthLabel: 'feature, compatibility & service-quality depth',
    depthAngles: [
      'feature set and capability breakdown',
      'device / platform compatibility',
      'content / channel coverage and quality',
      'setup and onboarding experience',
      'pricing tiers and value comparison',
      'reliability, uptime and support',
    ],
    focus: 'Emphasize features, device/platform compatibility, content or channel coverage, setup guidance, pricing tiers, reliability, and support. Compare value clearly and drive sign-ups / free trials.',
    schema: 'Use Service / Product / FAQPage JSON-LD where relevant.',
    cautions: '',
  },
}

export interface SEOContent {
  pageUrl: string
  focusKeyword: string
  metaTitle: string
  metaDescription: string
  urlSlug: string
  h1Title: string
  contentBody: string
  internalLinks: Array<{ anchor: string; url: string; type: string }>
  externalLinks: Array<{ anchor: string; url: string; type: string }>
  faqs: Array<{ question: string; answer: string }>
  imageSuggestions: Array<{ alt: string; description: string; placement: string }>
  schemaMarkup: string
  technicalAudit: string
  qualityChecklist: {
    wordCount: number
    eeatScore: string
    hcuCompliant: boolean
  }
}

export interface ProjectData {
  label: string
  domain: string
  industry: string
  brands: string[]
  techFocus?: Record<string, string>
  vertical?: Vertical
}

interface GenInput {
  item: string
  contentType?: string
  tone?: string
  depth?: string
  audience?: string
  eeatSettings?: Record<string, boolean>
  fieldNotes?: string
  inventoryData?: string
  enableWebSearch?: boolean
  projectData: ProjectData
}

function buildPrompt(input: GenInput): string {
  const {
    item,
    contentType = 'Main Page',
    tone = 'Expert + Trustworthy',
    depth = '1000-1500 words (Standard)',
    audience = 'the core audience for this business',
    eeatSettings = {},
    fieldNotes = '',
    inventoryData = '',
    projectData,
  } = input

  const vertical: Vertical = projectData.vertical || 'ecommerce'
  const profile = VERTICAL_PROFILES[vertical]

  const activeEeat = Object.keys(eeatSettings)
    .filter((k) => eeatSettings[k])
    .join(', ')

  const templateKeys = Object.keys(LAYOUT_TEMPLATES)
  const selectedTemplate = LAYOUT_TEMPLATES[templateKeys[Math.floor(Math.random() * templateKeys.length)]]

  const techFocus = projectData.techFocus || {}
  const categoryMatch = Object.keys(techFocus).find((cat) =>
    item.toLowerCase().includes(cat.toLowerCase()),
  )
  const randomAngle = profile.depthAngles[Math.floor(Math.random() * profile.depthAngles.length)]
  const depthFocus = vertical === 'ecommerce' && categoryMatch
    ? techFocus[categoryMatch]
    : `${profile.depthLabel} — ${randomAngle}`

  const brandsLine = projectData.brands.length > 0
    ? `Brands / entities to reference where relevant: ${projectData.brands.join(', ')}`
    : ''

  // Site-aware verified links: hostname se automatically correct pool
  const verifiedLinks = getVerifiedLinksForSite(item)
  const verifiedLinksBlock = verifiedLinks.length > 0
    ? `VERIFIED INTERNAL LINKS (MANDATORY — use ONLY these URLs for internalLinks, 3-5 most relevant. NEVER invent or guess URLs):
    ${verifiedLinks.join('\n    ')}`
    : `INTERNAL LINKS RULE: No verified pool available for this domain. Use ONLY the exact page URL "${item}" itself, or omit internalLinks entirely. NEVER invent, guess, or fabricate URLs.`

  return `
    You are a ${profile.role} working for ${projectData.label} (${projectData.domain}).
    Business type: ${vertical.toUpperCase()} | Industry: ${projectData.industry}
    Target Context: "${item}" (Type: ${contentType})
    Tone: ${tone} | Depth: ${depth} | Audience: ${audience}

    VERTICAL FOCUS (${vertical}): ${profile.focus}
    ${profile.cautions ? `IMPORTANT GUARDRAILS: ${profile.cautions}` : ''}

    CRITICAL INSTRUCTIONS FOR VARIETY & QUALITY:
    1. LAYOUT TEMPLATE: Apply the logic of "${selectedTemplate}", adapted naturally to a ${vertical} context.
    2. AUTONOMOUS FOCUS KEYWORD: Analyze "${item}" and select the single BEST focus keyword with high search/commercial intent for this vertical. Do not just repeat the input; optimize it for SEO.
    3. CUSTOM HEADING HIERARCHY: Design a UNIQUE, logical heading hierarchy (H1, 4+ H2s, and specific H3s). No cookie-cutter pattern — every page must feel bespoke.
    4. INTENT & DEPTH: Address real user intent (problem/solution), specifics, and ${profile.depthLabel}.
    5. E-E-A-T INTEGRATION: Blend in ${activeEeat || 'first-hand expertise and trust signals'} naturally.
    6. SPECIALIST DEPTH: Provide genuine ${profile.depthLabel} focusing on "${depthFocus}", fitting the "${selectedTemplate}" angle.

    ${fieldNotes ? `EXPERT FIELD NOTES (Inject as authentic first-hand experience): ${fieldNotes}` : ''}
    ${inventoryData ? `DYNAMIC DATA (Use for transparency / freshness): ${inventoryData}` : ''}

    ${brandsLine}
    Authority internal domain: ${projectData.domain}

    ${verifiedLinksBlock}

    INTEGRITY RULES (MANDATORY):
    - NEVER claim first-hand testing, lab measurements, or phrases like "our audit measured", "in our testing", "we observed". You have not tested anything.
    - Attribute all specs and claims to manufacturers or known standards ("According to Zippo...", "Gerber rates this at...", "Industry standard is...").
    - NEVER invent statistics, test results, or percentages.
    - If the focus keyword has an obvious spelling error (e.g. "baterry"), correct it in your selected focusKeyword.
    - CRITICAL: internalLinks URLs MUST come ONLY from the verified list above. Do NOT modify, guess, or fabricate any internal URL. Cross-site linking is FORBIDDEN.
    RECOMMENDED SCHEMA: ${profile.schema}

    STRICT JSON RESPONSE FORMAT:
    {
      "pageUrl": "${item}",
      "focusKeyword": "The high-intent keyword you selected",
      "metaTitle": "string (under 60 chars)",
      "metaDescription": "string (under 155 chars)",
      "urlSlug": "string",
      "h1Title": "string",
      "contentBody": "Full HTML including your unique heading structure (h2, h3). Use semantic lists and tables. Min ${depth.split(' ')[0]} words.",
      "internalLinks": [{"anchor":"string", "url":"string", "type":"string"}],
      "externalLinks": [{"anchor":"string", "url":"string", "type":"string"}],
      "faqs": [{"question":"string", "answer":"string"}],
      "imageSuggestions": [{"alt":"string", "description":"string", "placement":"string"}],
      "schemaMarkup": "string (JSON-LD)",
      "technicalAudit": "Detailed ${profile.depthLabel} focusing on ${depthFocus}.",
      "qualityChecklist": {"wordCount": number, "eeatScore": "string", "hcuCompliant": true}
    }
  `
}

export async function POST(req: Request) {
  let input: GenInput
  try {
    input = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  if (!input?.item || !input?.projectData?.domain) {
    return NextResponse.json(
      { error: 'A request with `item` and `projectData` (domain) is required.' },
      { status: 400 },
    )
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'GEMINI_API_KEY is not configured in environment variables.' },
      { status: 500 },
    )
  }

  const ai = new GoogleGenAI({ apiKey })

  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: buildPrompt(input),
      config: input.enableWebSearch
        ? { tools: [{ googleSearch: {} }] as any }
        : { responseMimeType: 'application/json' },
    })

    const raw = (response.text || '{}').trim()
    const cleaned = raw
      .replace(/^```(?:json)?/i, '')
      .replace(/```$/, '')
      .trim()
    const content = JSON.parse(cleaned) as SEOContent
    return NextResponse.json({ content })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Generation failed.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
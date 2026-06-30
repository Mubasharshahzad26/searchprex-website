import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
 
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 120 // FIX: was 60 — bumped for multi-step pipeline
 
// ─────────────────────────────────────────────────────────────────────────────
// MODEL REGISTRY
// BUG FIX #1: 'gemini-3-flash-preview' does NOT exist → corrected (old fix)
// BUG FIX #2: 'gemini-2.0-flash' was retired by Google on June 1, 2026.
//    Migrated to 'gemini-2.5-flash' (Google's official migration target).
//    NOTE: gemini-2.5-flash itself is scheduled to retire ~Oct 16, 2026 —
//    when that happens, swap the string below again.
// FIX #3 (NEW — applied below in callModel): Gemini 2.5 Flash has "thinking"
//    ON by default (up to 8,192 tokens, billed at full output rate). For
//    structured JSON generation this is wasted spend — must be disabled
//    explicitly via thinkingConfig.thinkingBudget: 0, or your "budget" tier
//    cost for 10K pages will be silently higher than expected.
// ─────────────────────────────────────────────────────────────────────────────
const MODELS = {
  gemini_flash:  'gemini-2.5-flash',            // was: 'gemini-2.0-flash' (RETIRED June 1, 2026)
  gpt4o_mini:    'gpt-4o-mini',
  claude_haiku:  'claude-haiku-4-5-20251001',
  claude_sonnet: 'claude-sonnet-4-6',
} as const
type ModelKey = keyof typeof MODELS
 
// ─────────────────────────────────────────────────────────────────────────────
// PIPELINE TIERS — passed from frontend as `tier` field
// Budget  : Gemini only        — best for 10K+ bulk runs   (~$0.001/page)
// Balanced: Gemini + Claude Haiku — no OpenAI needed       (~$0.002/page)
// Premium : Gemini + Claude Sonnet — no OpenAI needed      (~$0.01/page)
// NOTE: When OPENAI_API_KEY is added later, swap extractor to 'gpt4o_mini'
// ─────────────────────────────────────────────────────────────────────────────
export const PIPELINES = {
  budget: {
    extractor: 'gemini_flash' as ModelKey,
    writer:    'gemini_flash' as ModelKey,
    reviewer:  'gemini_flash' as ModelKey,
    costLabel: '~$0.001/page',
  },
  balanced: {
    extractor: 'gemini_flash' as ModelKey, // upgrade to 'gpt4o_mini' when OpenAI added
    writer:    'claude_haiku' as ModelKey,
    reviewer:  'gemini_flash' as ModelKey,
    costLabel: '~$0.002/page',
  },
  premium: {
    extractor: 'gemini_flash'  as ModelKey, // upgrade to 'gpt4o_mini' when OpenAI added
    writer:    'claude_sonnet' as ModelKey,
    reviewer:  'claude_haiku'  as ModelKey,
    costLabel: '~$0.01/page',
  },
} as const
export type PipelineTier = keyof typeof PIPELINES
 
// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT TEMPLATES — picked at random per request for variety across bulk runs
// ─────────────────────────────────────────────────────────────────────────────
const LAYOUT_TEMPLATES: Record<string, string> = {
  REVIEW:
    'Hands-on Review Style: Comparison with competitors, pros/cons list, and detailed performance breakdown.',
  GUIDE:
    "Ultimate Buyer's Guide: Educational approach, focus on what to look for, and top recommendations for different budgets.",
  TECHNICAL:
    'Deep-Dive Technical Analysis: Focused on material science, engineering specs (spring tension, tang, lock mechanism), and durability standards.',
  JOURNEY:
    "User Journey Spotlight: Real-world scenarios, situational problem-solving, and 'why choose us' narrative.",
  SPEC_ORIE:
    'Specification-Led Audit: Heavy data focus, technical tables, and performance metrics compared to industry standards.',
  COMPARISON:
    'Versus Head-to-Head: Direct comparison between two specific products/brands, highlighting distinct trade-offs.',
  TROUBLESHOOT:
    "Maintenance & Troubleshooting: Technical 'how-to' focus, solving common pain points with expert precision.",
  STORY:
    'Narrative Case Study: Following a specific user through a task, weaving product specs into a real-life outcome.',
  LUXURY_CRAFT:
    "Luxury Craftsmanship Journey: Focus on heritage, artisan detail, and the 'soul' of the product — ideal for high-ticket exclusives.",
  LAB_REPORT:
    'Scientific Material Audit: Lab-testing style breakdown focusing on metallurgy, chemical resistance, and stress-test data.',
  MARKET_WATCH:
    "Collector's Market Analysis: Trends, rarity, resale value, and investment-grade insights for enthusiasts.",
  MYTH_BUSTER:
    "Industry Myth-Buster: Taking common misconceptions and debunking them with raw data.",
  SOLUTION_MAP:
    "Pain-Point Solution Map: Identifying an ultra-specific user problem and mapping technical features to the fix.",
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
 
// ─────────────────────────────────────────────────────────────────────────────
// VERTICAL PROFILES
// ─────────────────────────────────────────────────────────────────────────────
export type Vertical = 'ecommerce' | 'local' | 'lawfirm' | 'digital'
 
const VERTICAL_PROFILES: Record<
  Vertical,
  { role: string; depthLabel: string; depthAngles: string[]; focus: string; schema: string; cautions: string }
> = {
  ecommerce: {
    role: 'Expert E-commerce SEO Content Architect',
    depthLabel: 'product / technical audit',
    depthAngles: TECH_VARIETY,
    focus:
      'Emphasize product specs, build quality, brand comparisons, buying guidance, and conversion. Mention relevant brands and link to category/product pages.',
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
    focus:
      'Emphasize service areas, "near me" intent, NAP consistency, local trust signals, clear service descriptions, and strong contact/booking CTAs. Reference local landmarks/neighborhoods naturally.',
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
    focus:
      'Emphasize practice areas, case types, jurisdiction relevance, attorney credentials and experience, what clients can expect, and consultation CTAs. Build authority and trust — E-E-A-T is critical here.',
    schema: 'Use LegalService / Attorney JSON-LD with areaServed and FAQPage.',
    cautions:
      'YMYL — LEGAL: Be accurate and authoritative but NEVER guarantee outcomes, promise specific results, state settlement/verdict amounts as promises, or give individualized legal advice. Use compliant language ("may", "can", "in many cases") and direct readers to consult the firm.',
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
    focus:
      'Emphasize features, device/platform compatibility, content or channel coverage, setup guidance, pricing tiers, reliability, and support. Compare value clearly and drive sign-ups / free trials.',
    schema: 'Use Service / Product / FAQPage JSON-LD where relevant.',
    cautions: '',
  },
}
 
// ─────────────────────────────────────────────────────────────────────────────
// INTERFACES
// ─────────────────────────────────────────────────────────────────────────────
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
  qualityChecklist: { wordCount: number; eeatScore: string; hcuCompliant: boolean }
}
 
export interface ProjectData {
  label: string
  domain: string
  industry: string
  brands: string[]
  techFocus?: Record<string, string>
  vertical?: Vertical
}
 
interface ExtractedData {
  primaryKeyword: string
  secondaryKeywords: string[]
  keySpecs: Array<{ spec: string; value: string }>
  uniqueSellingPoints: string[]
  targetAudience: string
  contentAngles: string[]
  jsonLdType: string
  brands: string[]
  internalLinkOpportunities: string[]
}
 
interface ReviewerResult {
  verdict: 'PASS' | 'FAIL'
  score: number         // 0–100
  issues: string[]
  improvements: string  // empty string if PASS
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
  reviewData?: string       // RAG: customer reviews / testimonials text
  enableWebSearch?: boolean
  tier?: PipelineTier       // 'budget' | 'balanced' | 'premium' — default: 'budget'
  projectData: ProjectData
}
 
// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}
 
function stripFences(raw: string): string {
  return raw
    .replace(/^```(?:json)?/im, '')
    .replace(/```$/m, '')
    .trim()
}
 
function safeParseJSON<T>(raw: string): T {
  return JSON.parse(stripFences(raw)) as T
}
 
// ─────────────────────────────────────────────────────────────────────────────
// RETRY HELPER
// Wraps a model call and automatically retries on transient provider errors
// (503 overloaded / UNAVAILABLE, 429 rate-limit / RESOURCE_EXHAUSTED, 529).
// Anything else (bad API key, invalid model, malformed request) fails fast.
// ─────────────────────────────────────────────────────────────────────────────
async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 2,
  baseDelayMs = 1200,
): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn()
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      const isTransient = /503|529|UNAVAILABLE|429|RESOURCE_EXHAUSTED|overloaded|high demand/i.test(msg)
      if (!isTransient || attempt >= retries) throw err
      const delay = baseDelayMs * 2 ** attempt + Math.random() * 300
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
}
 
// ─────────────────────────────────────────────────────────────────────────────
// UNIVERSAL MODEL CALLER
// Handles Gemini, OpenAI, and Anthropic via native fetch
// Every branch wrapped in withRetry() to absorb transient 503/429 errors.
// ─────────────────────────────────────────────────────────────────────────────
async function callModel(
  model: ModelKey,
  prompt: string,
  geminiWebSearch = false,
): Promise<string> {
 
  // ── Gemini ───────────────────────────────────────────────────────────────
  if (model === 'gemini_flash') {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) throw new Error('GEMINI_API_KEY not configured in .env.local')
    const ai = new GoogleGenAI({ apiKey })
    return withRetry(async () => {
      const response = await ai.models.generateContent({
        model: MODELS.gemini_flash,
        contents: prompt,
        // FIX (NEW): gemini-2.5-flash has "thinking" ON by default — up to
        // 8,192 tokens, billed at the FULL output rate ($2.50/1M). For
        // structured JSON generation (no real reasoning needed) this is
        // pure wasted spend. Forcing thinkingBudget: 0 keeps this tier
        // close to the original gemini-2.0-flash cost profile.
        config: geminiWebSearch
          ? { tools: [{ googleSearch: {} }] as any, thinkingConfig: { thinkingBudget: 0 } }
          : { responseMimeType: 'application/json', thinkingConfig: { thinkingBudget: 0 } },
      })
      return (response.text || '{}').trim()
    })
  }
 
  // ── OpenAI ───────────────────────────────────────────────────────────────
  if (model === 'gpt4o_mini') {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) throw new Error('OPENAI_API_KEY not configured in .env.local')
    return withRetry(async () => {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: MODELS.gpt4o_mini,
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: 'json_object' },
          max_tokens: 2000,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error?.message || 'OpenAI API error')
      return data.choices?.[0]?.message?.content ?? '{}'
    })
  }
 
  // ── Anthropic (Claude Haiku + Sonnet) ────────────────────────────────────
  if (model === 'claude_haiku' || model === 'claude_sonnet') {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY not configured in .env.local')
    return withRetry(async () => {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: MODELS[model],
          max_tokens: 4096,
          messages: [{ role: 'user', content: prompt }],
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error?.message || 'Anthropic API error')
      return data.content?.[0]?.text ?? '{}'
    })
  }
 
  throw new Error(`Unknown model key: ${model}`)
}
 
// ─────────────────────────────────────────────────────────────────────────────
// STEP 1 — EXTRACTOR PROMPT
// ─────────────────────────────────────────────────────────────────────────────
function buildExtractorPrompt(item: string, inventoryData: string, projectData: ProjectData): string {
  return `
You are a data structuring assistant for SEO content generation.
Project: ${projectData.label} (${projectData.domain}) | Industry: ${projectData.industry}
Page target: "${item}" | Vertical: ${projectData.vertical || 'ecommerce'}
 
RAW PRODUCT / PAGE DATA:
${inventoryData || 'No raw data provided — infer reasonable specs from the page name and industry context.'}
 
Your task: Extract, clean, and structure this data for an SEO writer.
Return ONLY valid JSON with no markdown fences:
{
  "primaryKeyword": "single highest-intent keyword for this page",
  "secondaryKeywords": ["kw1", "kw2", "kw3"],
  "keySpecs": [{"spec": "attribute name", "value": "attribute value"}],
  "uniqueSellingPoints": ["usp1", "usp2", "usp3"],
  "targetAudience": "specific audience description",
  "contentAngles": ["angle1", "angle2"],
  "jsonLdType": "Product | LocalBusiness | Service | LegalService | FAQPage",
  "brands": ${JSON.stringify(projectData.brands)},
  "internalLinkOpportunities": ["${projectData.domain}/example-page"]
}
`.trim()
}
 
// ─────────────────────────────────────────────────────────────────────────────
// STEP 2 — WRITER PROMPT
// ─────────────────────────────────────────────────────────────────────────────
function buildWriterPrompt(input: GenInput, extractedData: Partial<ExtractedData>): string {
  const {
    item,
    contentType = 'Main Page',
    tone = 'Expert + Trustworthy',
    depth = '1000-1500 words (Standard)',
    audience = 'the core audience for this business',
    eeatSettings = {},
    fieldNotes = '',
    reviewData = '',
    projectData,
  } = input
 
  const vertical: Vertical = projectData.vertical || 'ecommerce'
  const profile = VERTICAL_PROFILES[vertical]
  const activeEeat = Object.keys(eeatSettings).filter((k) => eeatSettings[k]).join(', ')
 
  const templateKeys = Object.keys(LAYOUT_TEMPLATES)
  const selectedTemplate = LAYOUT_TEMPLATES[pickRandom(templateKeys)]
 
  const techFocus = projectData.techFocus || {}
  const categoryMatch = Object.keys(techFocus).find((cat) =>
    item.toLowerCase().includes(cat.toLowerCase()),
  )
  const randomAngle = pickRandom(profile.depthAngles)
  const depthFocus =
    vertical === 'ecommerce' && categoryMatch
      ? techFocus[categoryMatch]
      : `${profile.depthLabel} — ${randomAngle}`
 
  const brandsLine =
    (extractedData.brands ?? projectData.brands).length > 0
      ? `Brands / entities to reference: ${(extractedData.brands ?? projectData.brands).join(', ')}`
      : ''
 
  const focusKeyword = extractedData.primaryKeyword || item
 
  return `
You are a ${profile.role} working for ${projectData.label} (${projectData.domain}).
Business: ${vertical.toUpperCase()} | Industry: ${projectData.industry}
Page: "${item}" | Type: ${contentType} | Tone: ${tone} | Depth: ${depth} | Audience: ${audience}
 
${profile.cautions ? `IMPORTANT GUARDRAILS: ${profile.cautions}` : ''}
 
STRUCTURED DATA FROM EXTRACTOR:
${JSON.stringify(extractedData, null, 2)}
 
${
  reviewData
    ? `CUSTOMER REVIEWS / RAG DATA — Weave these real customer experiences naturally into the content.
This creates genuine E-E-A-T "Experience" that competitors cannot copy:
---
${reviewData}
---`
    : ''
}
 
CONTENT GENERATION INSTRUCTIONS:
1. LAYOUT: Apply the "${selectedTemplate}" style, adapted naturally to ${vertical} context.
2. KEYWORD: Use "${focusKeyword}" as the primary focus keyword.
3. HEADINGS: Design a UNIQUE H1, 4+ H2s, and targeted H3s — bespoke for this page only.
4. E-E-A-T: Blend in ${activeEeat || 'first-hand expertise and trust signals'} throughout.
5. DEPTH: Provide genuine "${depthFocus}" insights — not generic filler.
6. VERTICAL FOCUS: ${profile.focus}
${fieldNotes ? `7. EXPERT FIELD NOTES (inject as authentic first-person expertise):\n${fieldNotes}` : ''}
${brandsLine}
 
SCHEMA: ${profile.schema}
Authority internal domain: ${projectData.domain}
 
Return ONLY valid JSON with no markdown fences:
{
  "pageUrl": "${item}",
  "focusKeyword": "${focusKeyword}",
  "metaTitle": "string (under 60 chars)",
  "metaDescription": "string (under 155 chars)",
  "urlSlug": "string",
  "h1Title": "string",
  "contentBody": "Full HTML including unique heading structure (h2, h3). Use semantic lists and tables. Min ${depth.split(' ')[0]} words.",
  "internalLinks": [{"anchor":"string","url":"string","type":"string"}],
  "externalLinks": [{"anchor":"string","url":"string","type":"string"}],
  "faqs": [{"question":"string","answer":"string"}],
  "imageSuggestions": [{"alt":"string","description":"string","placement":"string"}],
  "schemaMarkup": "JSON-LD string",
  "technicalAudit": "Detailed ${depthFocus} audit notes",
  "qualityChecklist": {"wordCount": 0, "eeatScore": "string", "hcuCompliant": true}
}
`.trim()
}
 
// ─────────────────────────────────────────────────────────────────────────────
// STEP 3 — REVIEWER PROMPT
// ─────────────────────────────────────────────────────────────────────────────
function buildReviewerPrompt(content: SEOContent, vertical: Vertical): string {
  return `
You are a senior Google Search Quality Rater evaluating content against HCU (Helpful Content Update) 
and E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) guidelines.
Vertical: ${vertical.toUpperCase()}
 
CONTENT TO EVALUATE:
Meta Title: ${content.metaTitle}
Focus Keyword: ${content.focusKeyword}
H1: ${content.h1Title}
Estimated Word Count: ~${content.qualityChecklist.wordCount}
FAQs: ${content.faqs.length} questions
Content Preview (first 1000 chars):
${content.contentBody.substring(0, 1000)}
 
EVALUATION CRITERIA — score each out of 20:
1. Experience (20pts): Does it show real-world, first-hand experience? Or just generic info?
2. Expertise (20pts): Specific technical/professional depth? Or surface-level?
3. Authoritativeness (20pts): Proper entity mentions, citations, brand references?
4. Trustworthiness (20pts): Accurate, no clickbait, matches search intent?
5. Helpfulness (20pts): Would a user need to Google again after reading this?
 
Pass threshold: 70/100
Fail = send back to writer for a rewrite with specific improvement notes.
 
Return ONLY valid JSON with no markdown fences:
{
  "verdict": "PASS" or "FAIL",
  "score": 0-100,
  "issues": ["specific issue 1", "specific issue 2"],
  "improvements": "Detailed rewrite instructions if FAIL. Empty string if PASS."
}
`.trim()
}
 
// ─────────────────────────────────────────────────────────────────────────────
// POST HANDLER — Orchestrates the pipeline
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  let input: GenInput
  try {
    input = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }
 
  if (!input?.item || !input?.projectData?.domain) {
    return NextResponse.json(
      { error: '`item` and `projectData.domain` are required.' },
      { status: 400 },
    )
  }
 
  const tier: PipelineTier = input.tier ?? 'budget'
  const pipeline = PIPELINES[tier]
  const vertical: Vertical = input.projectData.vertical ?? 'ecommerce'
 
  // ── BUDGET TIER: Fast single-step path (backward compatible) ─────────────
  if (tier === 'budget') {
    try {
      const prompt = buildWriterPrompt(input, {})
      const raw = await callModel('gemini_flash', prompt, input.enableWebSearch)
      const content = safeParseJSON<SEOContent>(raw)
      return NextResponse.json({
        content,
        meta: {
          tier,
          pipeline: 'gemini_flash → single-step',
          costLabel: PIPELINES.budget.costLabel,
        },
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Generation failed.'
      return NextResponse.json({ error: message }, { status: 500 })
    }
  }
 
  // ── BALANCED / PREMIUM TIER: Full 3-step pipeline ────────────────────────
  try {
    const extractorPrompt = buildExtractorPrompt(
      input.item,
      input.inventoryData ?? '',
      input.projectData,
    )
    const rawExtracted = await callModel(pipeline.extractor, extractorPrompt)
    const extractedData = safeParseJSON<ExtractedData>(rawExtracted)
 
    const writerPrompt = buildWriterPrompt(input, extractedData)
    const rawContent = await callModel(pipeline.writer, writerPrompt)
    let content = safeParseJSON<SEOContent>(rawContent)
 
    const reviewerPrompt = buildReviewerPrompt(content, vertical)
    const rawReview = await callModel(pipeline.reviewer, reviewerPrompt)
    const review = safeParseJSON<ReviewerResult>(rawReview)
 
    if (review.verdict === 'FAIL' && review.improvements) {
      const rewritePrompt = buildWriterPrompt(
        {
          ...input,
          fieldNotes: [
            input.fieldNotes,
            `QUALITY REVIEWER FEEDBACK — Address these before writing:\n${review.improvements}`,
          ]
            .filter(Boolean)
            .join('\n\n'),
        },
        extractedData,
      )
      const rawRewrite = await callModel(pipeline.writer, rewritePrompt)
      content = safeParseJSON<SEOContent>(rawRewrite)
    }
 
    return NextResponse.json({
      content,
      meta: {
        tier,
        pipeline: `${pipeline.extractor} → ${pipeline.writer} → ${pipeline.reviewer}`,
        costLabel: PIPELINES[tier].costLabel,
        review: {
          verdict: review.verdict,
          score: review.score,
          issues: review.issues,
        },
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Pipeline failed.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
 
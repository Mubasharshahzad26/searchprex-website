import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
 
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60
 
// Keep the model your NicheSEO app already uses. If it ever 404s on this key,
// switch to 'gemini-2.0-flash' or 'gemini-1.5-flash'.
const MODEL = 'gemini-1.5-flash'
 
// 13 layout templates — picked at random per item so bulk output never feels cookie-cutter.
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
    "Luxury Craftsmanship Journey: Focus on heritage, artisan detail, and the 'soul' of the product—ideal for high-ticket exclusives.",
  LAB_REPORT:
    'Scientific Material Audit: Lab-testing style breakdown focusing on metallurgy, chemical resistance, and stress-test data.',
  MARKET_WATCH:
    "Collector's Market Analysis: Trends, rarity, resale value, and investment-grade insights for enthusiasts.",
  MYTH_BUSTER:
    "Industry Myth-Buster: Taking common misconceptions (e.g., 'more expensive is always better') and debunking them with raw data.",
  SOLUTION_MAP:
    "Pain-Point Solution Map: Identifying an ultra-specific user problem (e.g., 'wet-weather grip failure') and mapping technical features to the fix.",
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
    audience = 'general shoppers in this category',
    eeatSettings = {},
    fieldNotes = '',
    inventoryData = '',
    projectData,
  } = input
 
  const activeEeat = Object.keys(eeatSettings)
    .filter((k) => eeatSettings[k])
    .join(', ')
 
  // Random layout + technical focus = variety across a bulk run
  const templateKeys = Object.keys(LAYOUT_TEMPLATES)
  const selectedTemplate =
    LAYOUT_TEMPLATES[templateKeys[Math.floor(Math.random() * templateKeys.length)]]
  const randomTechFocus =
    TECH_VARIETY[Math.floor(Math.random() * TECH_VARIETY.length)]
 
  const techFocus = projectData.techFocus || {}
  const categoryMatch = Object.keys(techFocus).find((cat) =>
    item.toLowerCase().includes(cat.toLowerCase()),
  )
  const technicalAudit = categoryMatch
    ? techFocus[categoryMatch]
    : `${projectData.industry} ${randomTechFocus}`
 
  return `
    You are an Expert SEO Content Architect at ${projectData.label} (${projectData.domain}).
    Target Context: "${item}" (Type: ${contentType})
    Industry: ${projectData.industry}
    Tone: ${tone} | Depth: ${depth} | Audience: ${audience}
 
    CRITICAL INSTRUCTIONS FOR VARIETY & QUALITY:
    1. LAYOUT TEMPLATE: Apply the logic of "${selectedTemplate}".
    2. AUTONOMOUS FOCUS KEYWORD: Analyze "${item}" and select the single BEST focus keyword with high commercial or search intent. Do not just repeat the input; optimize it for SEO.
    3. CUSTOM HEADING HIERARCHY: Based on the structural requirement of "${selectedTemplate}", design a UNIQUE, logical heading hierarchy (H1, 4+ H2s, and specific H3s). Do NOT follow a standard cookie-cutter pattern. Every article must feel bespoke.
    4. CLUSTER STRATEGY: Ensure the headings address user intent (problem/solution), specific features, and technical ${technicalAudit}.
    5. E-E-A-T INTEGRATION: Blend in ${activeEeat} naturally.
    6. TECHNICAL DEPTH: Specifically provide an audit of ${technicalAudit} that fits the "${selectedTemplate}" tone.
 
    ${fieldNotes ? `EXPERT FIELD NOTES (Inject as authentic first-hand experience): ${fieldNotes}` : ''}
    ${inventoryData ? `DYNAMIC STORE DATA (Use for inventory/trend transparency): ${inventoryData}` : ''}
 
    Brands to mention if relevant: ${projectData.brands.join(', ')}
    Authority internal domains: ${projectData.domain}
 
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
      "technicalAudit": "Detailed breakdown focusing on ${technicalAudit}.",
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
      config: {
        responseMimeType: 'application/json',
        tools: input.enableWebSearch ? ([{ googleSearch: {} }] as any) : undefined,
      },
    })
 
    const text = response.text || '{}'
    const content = JSON.parse(text) as SEOContent
    return NextResponse.json({ content })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Generation failed.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
 
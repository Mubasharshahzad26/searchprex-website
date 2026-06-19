import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
 
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60
 
const MODEL = 'gemini-2.5-flash'
 
type Vertical = 'lawfirm' | 'ecommerce' | 'local' | 'general'
 
/* ────────────────────────────────────────────────────────────────
   SearchPrex knowledge index — real pages the answer can link to.
   Update URLs/snippets if your routes change.
──────────────────────────────────────────────────────────────── */
type IndexItem = { title: string; url: string; vertical: Vertical; keywords: string; snippet: string }
 
const SEARCHPREX_INDEX: IndexItem[] = [
  {
    title: 'Law Firm SEO Services',
    url: '/services/law-firm-seo',
    vertical: 'lawfirm',
    keywords:
      'law firm lawyer attorney legal practice area intake personal injury divorce criminal litigation cases clients jurisdiction counsel',
    snippet:
      'SEO built for law firms — practice-area pages, local + jurisdiction targeting, and a higher-converting intake funnel.',
  },
  {
    title: 'Ecommerce SEO Services',
    url: '/services/ecommerce-seo',
    vertical: 'ecommerce',
    keywords:
      'ecommerce store shop shopify woocommerce magento product category catalog indexation organic sales revenue traffic conversion',
    snippet:
      'Ecommerce SEO — indexation at scale, product/category optimization, and scalable organic growth.',
  },
  {
    title: 'Local SEO Services',
    url: '/services/local-seo',
    vertical: 'local',
    keywords:
      'local seo google business profile gmb citations near me map pack service area reviews location pages nap',
    snippet:
      'Local SEO — Google Business Profile, citations, and "near me" visibility for nearby customers.',
  },
  {
    title: 'Technical SEO Services',
    url: '/services/technical-seo',
    vertical: 'general',
    keywords:
      'technical seo crawl index indexation site speed core web vitals schema sitemap robots canonical audit',
    snippet:
      'Technical SEO — crawlability, indexation, Core Web Vitals, and schema done right.',
  },
  {
    title: 'Case Studies',
    url: '/case-studies',
    vertical: 'general',
    keywords: 'case studies results proof clients growth traffic rankings success examples roi',
    snippet: 'Real client results — traffic, rankings, and revenue growth across niches.',
  },
  {
    title: 'Free 30-Day SEO Roadmap',
    url: '/free-audit',
    vertical: 'general',
    keywords: 'free audit roadmap plan strategy consultation get started review proposal',
    snippet: 'A free 30-day SEO roadmap tailored to your site, niche, and goals.',
  },
  {
    title: 'Why SearchPrex',
    url: '/why-us',
    vertical: 'general',
    keywords: 'why searchprex agency experience expertise approach difference trust',
    snippet: 'Why businesses choose SearchPrex for organic growth.',
  },
]
 
function relevantPages(query: string, vertical: Vertical): IndexItem[] {
  const words = query.toLowerCase().split(/\W+/).filter((w) => w.length > 3)
  const scored = SEARCHPREX_INDEX.map((p) => {
    let score = 0
    if (p.vertical === vertical && vertical !== 'general') score += 5
    const hay = `${p.keywords} ${p.title}`.toLowerCase()
    for (const w of words) if (hay.includes(w)) score += 2
    return { item: p, score }
  })
 
  let top = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.item)
 
  // Always make sure the vertical service page + the free roadmap are available.
  const ensure = (pred: (p: IndexItem) => boolean) => {
    const found = SEARCHPREX_INDEX.find(pred)
    if (found && !top.some((p) => p.url === found.url)) top.push(found)
  }
  if (vertical !== 'general') ensure((p) => p.vertical === vertical)
  ensure((p) => p.url === '/free-audit')
 
  return top.slice(0, 3)
}
 
const VERTICAL_HINTS: Record<Vertical, string> = {
  lawfirm:
    'Law firm / legal. Focus on practice-area pages, local + jurisdiction targeting, client intake & conversion, E-E-A-T/authority, reviews, and Google Business Profile. This is YMYL — be accurate; NEVER guarantee rankings or case outcomes.',
  ecommerce:
    'Ecommerce store. Focus on product/category page optimization, technical SEO & indexation at scale, content, internal linking, schema, and organic growth levers. Never promise specific sales multiples.',
  local:
    'Local business. Focus on Google Business Profile, local citations/NAP consistency, "near me" intent, location/service-area pages, reviews, and local link building.',
  general:
    'General SEO — tailor to whatever the query implies; if it relates to law firms, ecommerce, or local businesses, lean into that angle.',
}
 
function systemPrompt(vertical: Vertical, related: IndexItem[]): string {
  const pagesBlock = related.length
    ? `
 
RELEVANT SEARCHPREX PAGES — where it genuinely helps the reader, you MAY link to these using HTML <a> tags (e.g. <a href="/services/law-firm-seo">law firm SEO</a>). Do not force links; only add them when natural.
${related.map((p) => `- ${p.title} (${p.url}) — ${p.snippet}`).join('\n')}`
    : ''
 
  return `You are SearchPrex AI — an expert SEO answer engine built by SearchPrex, a US-focused SEO agency specializing in law firm SEO, ecommerce SEO, and local SEO.
 
Your job: give the user a genuinely useful, accurate, well-structured answer to their SEO question. Help FIRST — be the single most useful answer they could find.
 
USER VERTICAL: ${VERTICAL_HINTS[vertical]}
 
GROUNDING: Use the Google Search tool to ground your answer in current, accurate information. Accuracy is the top priority.
 
FORMAT:
- Output clean HTML only (use <h3>, <p>, <ul>/<li>, <strong>, <a>). No <html>/<head>/<body> wrappers and no markdown code fences.
- Lead with a direct, useful answer (1-2 sentences). Then give 3-6 concrete, actionable points. Keep it scannable and specific — no generic fluff.
 
SEARCHPREX (soft, honest funnel):
- SearchPrex offers a FREE 30-day SEO roadmap for businesses serious about organic growth.
- ONLY when it genuinely fits, you may end with ONE short line noting the reader can get a tailored plan via SearchPrex's free 30-day SEO roadmap. Never force this into every answer, never be salesy, and never let it replace real help.
- NEVER make guarantees (no "rank #1", "double your sales", or guaranteed outcomes/results).${pagesBlock}`
}
 
export async function POST(req: Request) {
  let body: { query?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }
 
  const query = (body.query || '').trim()
  if (!query) return NextResponse.json({ error: 'A search query is required.' }, { status: 400 })
 
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'GEMINI_API_KEY is not configured.' }, { status: 500 })
 
  const vertical = detectVertical(query)
  const related = relevantPages(query, vertical)
  const ai = new GoogleGenAI({ apiKey })
 
  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: [{ parts: [{ text: `Question: "${query}"` }] }],
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: systemPrompt(vertical, related),
      },
    })
 
    let answer = (response.text || '').trim()
    answer = answer
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/^```(?:html)?/i, '')
      .replace(/```$/, '')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .trim()
 
    // Real web sources the answer is grounded on
    const chunks: any[] =
      (response as any)?.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    const seen = new Set<string>()
    const sources: { title: string; url: string }[] = []
    for (const c of chunks) {
      const url = c?.web?.uri
      const title = c?.web?.title || url
      if (url && !seen.has(url)) {
        seen.add(url)
        sources.push({ title, url })
      }
    }
 
    const relatedPages = related.map((p) => ({ title: p.title, url: p.url, snippet: p.snippet }))
 
    return NextResponse.json({ answer, sources: sources.slice(0, 6), vertical, relatedPages })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Search failed.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
 
function detectVertical(q: string): Vertical {
  const s = q.toLowerCase()
  if (/\b(law|lawyer|attorney|legal|firm|injury|accident|divorce|criminal|litigation|counsel|intake|practice area)\b/.test(s))
    return 'lawfirm'
  if (/\b(ecommerce|e-commerce|store|shop|shopify|woocommerce|magento|bigcommerce|product|catalog|cart|dropship|sales)\b/.test(s))
    return 'ecommerce'
  if (/\b(local|near me|nearby|gmb|google business|citation|service area|plumber|dentist|restaurant|contractor|city)\b/.test(s))
    return 'local'
  return 'general'
}
import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
 
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60
 
const MODEL = 'gemini-2.5-flash'
 
type Vertical = 'lawfirm' | 'ecommerce' | 'local' | 'general'
 
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
 
function systemPrompt(vertical: Vertical): string {
  return `You are SearchPrex AI — an expert SEO answer engine built by SearchPrex, a US-focused SEO agency specializing in law firm SEO, ecommerce SEO, and local SEO.
 
Your job: give the user a genuinely useful, accurate, well-structured answer to their SEO question. Help FIRST — be the single most useful answer they could find.
 
USER VERTICAL: ${VERTICAL_HINTS[vertical]}
 
GROUNDING: Use the Google Search tool to ground your answer in current, accurate information. Accuracy is the top priority.
 
FORMAT:
- Output clean HTML only (use <h3>, <p>, <ul>/<li>, <strong>). No <html>/<head>/<body> wrappers and no markdown code fences.
- Lead with a direct, useful answer (1-2 sentences). Then give 3-6 concrete, actionable points. Keep it scannable and specific — no generic fluff.
 
SEARCHPREX (soft, honest funnel):
- SearchPrex offers a FREE 30-day SEO roadmap for businesses serious about organic growth.
- ONLY when it genuinely fits the answer, you may end with ONE short line noting the reader can get a tailored plan via SearchPrex's free 30-day SEO roadmap. Never force this into every answer, never be salesy, and never let it replace real help.
- NEVER make guarantees (no "rank #1", "double your sales", or guaranteed outcomes/results).`
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
  const ai = new GoogleGenAI({ apiKey })
 
  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: [{ parts: [{ text: `Question: "${query}"` }] }],
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: systemPrompt(vertical),
      },
    })
 
    let answer = (response.text || '').trim()
    answer = answer
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/^```(?:html)?/i, '')
      .replace(/```$/, '')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .trim()
 
    // Extract grounding sources (the real web pages the answer is based on)
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
 
    return NextResponse.json({ answer, sources: sources.slice(0, 6), vertical })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Search failed.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
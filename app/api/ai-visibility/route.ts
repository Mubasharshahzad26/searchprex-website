import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
 
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60
 
const MODEL = 'gemini-2.5-flash'
 
function norm(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim()
}
 
function domainOf(url: string): string {
  try {
    return new URL(url.startsWith('http') ? url : `https://${url}`).hostname.replace(/^www\./, '')
  } catch {
    return url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '')
  }
}
 
export async function POST(req: Request) {
  let body: { firmName?: string; city?: string; practiceArea?: string; website?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }
 
  const firmName = (body.firmName || '').trim()
  const city = (body.city || '').trim()
  const practiceArea = (body.practiceArea || 'personal injury').trim()
  const website = (body.website || '').trim()
  if (!firmName || !city) {
    return NextResponse.json({ error: 'Firm name and city are required.' }, { status: 400 })
  }
 
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'GEMINI_API_KEY is not configured.' }, { status: 500 })
 
  const ai = new GoogleGenAI({ apiKey })
  const query = `Who are the best ${practiceArea} lawyers or law firms in ${city}? Name the specific firms a potential client should consider.`
 
  try {
    // ── Call 1: grounded answer (what an AI actually recommends for this query) ──
    const g = await ai.models.generateContent({
      model: MODEL,
      contents: [{ parts: [{ text: query }] }],
      config: { tools: [{ googleSearch: {} }] },
    })
    const answer = (g.text || '').trim()
 
    // Grounding sources = the sites the AI pulled from
    const chunks: any[] = (g as any)?.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    const seen = new Set<string>()
    const sources: { title: string; url: string; domain: string }[] = []
    for (const c of chunks) {
      const url = c?.web?.uri
      if (!url) continue
      const d = domainOf(url)
      if (!seen.has(d)) {
        seen.add(d)
        sources.push({ title: c?.web?.title || d, url, domain: d })
      }
    }
 
    // ── Firm detection ──
    const nFirm = norm(firmName)
    const firmMentioned = nFirm.length > 2 && norm(answer).includes(nFirm)
    const dom = website ? domainOf(website) : ''
    const domainInSources = !!dom && sources.some((s) => s.domain.includes(dom) || dom.includes(s.domain))
    const visible = firmMentioned || domainInSources
    const status: 'cited' | 'in-sources' | 'not-visible' = firmMentioned
      ? 'cited'
      : domainInSources
      ? 'in-sources'
      : 'not-visible'
 
    // ── Call 2: structured analysis (JSON, no grounding) ──
    let firmsCited: string[] = []
    let whyVisible = ''
    let recommendations: string[] = []
    try {
      const a = await ai.models.generateContent({
        model: MODEL,
        contents: [
          {
            parts: [
              {
                text: `An AI answered the question "${query}". Here is its answer:
 
${answer}
 
Return ONLY a JSON object (no markdown, no code fences):
{
  "firmsCited": [up to 8 specific law firm names mentioned in the answer, as strings],
  "whyVisible": "one concise sentence on what tends to make a law firm appear in AI answers like this",
  "recommendations": [3 concrete, specific actions a law firm should take to get cited in AI answers for queries like this]
}`,
              },
            ],
          },
        ],
        config: { responseMimeType: 'application/json' },
      })
      const raw = (a.text || '{}').trim().replace(/^```(?:json)?/i, '').replace(/```$/, '').trim()
      const data = JSON.parse(raw)
      firmsCited = Array.isArray(data.firmsCited) ? data.firmsCited.slice(0, 8).map(String) : []
      whyVisible = typeof data.whyVisible === 'string' ? data.whyVisible : ''
      recommendations = Array.isArray(data.recommendations) ? data.recommendations.slice(0, 4).map(String) : []
    } catch {
      // analysis is best-effort; core result still returns
    }
 
    return NextResponse.json({
      status,
      visible,
      firmMentioned,
      domainInSources,
      query,
      answerExcerpt: answer.slice(0, 600),
      sources: sources.slice(0, 6),
      firmsCited,
      whyVisible,
      recommendations,
      firmName,
      city,
      practiceArea,
    })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Check failed.' }, { status: 500 })
  }
}
 
import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
 
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60
 
const MODEL = 'gemini-2.5-flash'
 
export async function POST(req: Request) {
  let body: { website?: string; city?: string; practiceArea?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }
 
  const website = (body.website || '').trim()
  const city = (body.city || '').trim()
  const practiceArea = (body.practiceArea || '').trim()
  if (!website || !city || !practiceArea) {
    return NextResponse.json({ error: 'Website, city, and practice area are required.' }, { status: 400 })
  }
 
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'GEMINI_API_KEY is not configured.' }, { status: 500 })
 
  const ai = new GoogleGenAI({ apiKey })
 
  try {
    // ── Call 1: grounded research across the 5 pillars (googleSearch) ──
    const researchPrompt = `You are a senior law-firm SEO auditor. Research the law firm at "${website}" - they practice ${practiceArea} law in ${city}. Use Google Search to investigate their real online presence, and assess each of these five areas with specific findings:
 
1) Map Pack / Google Business Profile presence and review signals for "${practiceArea} lawyer ${city}".
2) Organic rankings for practice-area + city keywords, versus competing firms.
3) AI visibility: would AI assistants name this firm for "best ${practiceArea} lawyer in ${city}"? Judge by authority, citations and entity strength.
4) Legal E-E-A-T (attorney bios, bar admissions, credentials, awards) and structured data (Attorney, LegalService, FAQPage, Review schema) plus NAP consistency.
5) Practice-area content depth and gaps versus the firms that outrank them.
 
Also identify the firm's real name. Write a concise, specific assessment of each area based on what you actually find.`
 
    const g = await ai.models.generateContent({
      model: MODEL,
      contents: [{ parts: [{ text: researchPrompt }] }],
      config: { tools: [{ googleSearch: {} }] },
    })
    const research = (g.text || '').trim()
 
    // ── Call 2: structured scorecard JSON (no grounding — JSON mode) ──
    const jsonPrompt = `Based on this research assessment of a ${practiceArea} law firm in ${city} (website ${website}):
 
${research}
 
Produce a Law Firm SEO Scorecard. Return ONLY a JSON object in EXACTLY this shape:
{
 "firmName": "the firm's real name",
 "overallScore": 0,
 "verdict": "one punchy sentence summarizing where they stand",
 "caseImpact": "1-2 sentences: realistically what missed visibility costs them in leads/cases, referencing the practice area and city, with conservative and clearly estimated figures",
 "pillars": [
   {"id":"map-pack","score":0,"status":"weak","findings":["short finding","short finding"]},
   {"id":"organic","score":0,"status":"weak","findings":["",""]},
   {"id":"ai-visibility","score":0,"status":"weak","findings":["",""]},
   {"id":"eeat-schema","score":0,"status":"weak","findings":["",""]},
   {"id":"content","score":0,"status":"weak","findings":["",""]}
 ],
 "fixes": [
   {"priority":1,"pillar":"pillar-id","impact":"High","title":"short action","detail":"one sentence"}
 ]
}
 
Rules: overallScore is an integer 0-100 (roughly the weighted average of the pillar scores). Each pillar score is an integer 0-100. Exactly 5 pillars in that exact order; max 2 findings each, one sentence each. Exactly 5 fixes ordered by priority, highest-leverage first. status must be "weak" if score < 50, "moderate" if 50-74, "strong" if 75 or above. Each fix pillar must be one of: map-pack, organic, ai-visibility, eeat-schema, content. impact must be High, Medium, or Low. Be specific to THIS firm from the research above; if something could not be verified, assess conservatively rather than inventing exact numbers. Keep every string concise.`
 
    const a = await ai.models.generateContent({
      model: MODEL,
      contents: [{ parts: [{ text: jsonPrompt }] }],
      config: { responseMimeType: 'application/json' },
    })
    const raw = (a.text || '{}').trim().replace(/^```(?:json)?/i, '').replace(/```$/, '').trim()
 
    let parsed: { firmName?: string; pillars?: unknown }
    try {
      parsed = JSON.parse(raw)
    } catch {
      return NextResponse.json({ error: 'Could not parse the audit result.' }, { status: 502 })
    }
    if (!parsed || !Array.isArray(parsed.pillars)) {
      return NextResponse.json({ error: 'Audit returned an unexpected format.' }, { status: 502 })
    }
    if (!parsed.firmName) parsed.firmName = website
 
    return NextResponse.json(parsed)
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Audit failed.' }, { status: 500 })
  }
}
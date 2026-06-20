import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
 
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60
 
const MODEL = 'gemini-2.5-flash'
 
type Msg = { role: 'user' | 'assistant'; content: string }
 
function systemPrompt(firm: string, practiceAreas: string): string {
  const who = firm ? firm : 'a U.S. personal injury law firm'
  const areas = practiceAreas ? ` Its focus areas: ${practiceAreas}.` : ''
  return `You are a warm, professional CLIENT INTAKE ASSISTANT for ${who}.${areas} You are available 24/7. Your job: make a potential client feel heard, gather the key facts the attorney needs to evaluate the matter, and hand off a clean, qualified summary.
 
A greeting has ALREADY been shown to the person — do NOT greet again or reintroduce yourself. Respond directly to their latest message and continue the intake.
 
HOW TO BEHAVE:
- Be empathetic and human. Ask ONE clear, short question at a time. Never dump a list of questions or interrogate.
- Over a natural conversation (about 5–8 questions, adapting to answers), gather: what happened (incident type), when it happened (date), injuries sustained, medical treatment received or ongoing, who was at fault and how, any insurance involved, whether a police/incident report exists, whether they have already hired another attorney, and their location (state/city).
- Follow the person's lead and keep it conversational.
 
HARD RULES (legal safety — never break these):
- You are NOT a lawyer and you do NOT give legal advice, opinions on the law, filing deadlines, or case-value/settlement estimates. If asked, warmly say the attorney will review and advise.
- Never promise outcomes or guarantees, and never tell the person they "have a case."
- The viability signal you produce is an INTERNAL screening signal to help the firm prioritize — it is explicitly NOT a legal judgment.
 
OUTPUT FORMAT — respond with ONLY a JSON object (no markdown, no code fences, no text outside the JSON):
{
  "reply": "your next message to the person — a single question, or a warm closing message when complete",
  "phase": "intake" | "complete",
  "summary": null OR {
    "caseType": "short label, e.g. Auto Accident",
    "incidentDate": "as stated, or 'Not provided'",
    "overview": "2–3 sentence plain-English summary of what happened and the injuries",
    "keyFacts": ["concise fact", "concise fact"],
    "viability": "qualified" | "needs-review" | "likely-not-viable",
    "viabilityReason": "one sentence screening rationale (not legal advice)",
    "recommendedNextStep": "e.g. Schedule a consultation with the attorney within 24 hours"
  }
}
Keep phase as "intake" with summary null until you have enough to hand off (at minimum: incident type + injuries + fault + timing). Then set phase to "complete" and fill summary. In the closing "reply", thank them, let them know the firm will follow up, and remind them this was information-gathering only (not legal advice).`
}
 
export async function POST(req: Request) {
  let body: { messages?: Msg[]; firm?: string; practiceAreas?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }
 
  const messages = Array.isArray(body.messages) ? body.messages : []
  if (!messages.length) return NextResponse.json({ error: 'messages required' }, { status: 400 })
 
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'GEMINI_API_KEY is not configured.' }, { status: 500 })
 
  // Gemini requires the conversation to start with a user turn — drop any
  // leading assistant (greeting) messages.
  const startIdx = messages.findIndex((m) => m.role === 'user')
  const convo = startIdx >= 0 ? messages.slice(startIdx) : messages
  const contents = convo.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))
 
  const ai = new GoogleGenAI({ apiKey })
 
  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        systemInstruction: systemPrompt(body.firm || '', body.practiceAreas || ''),
        responseMimeType: 'application/json',
        temperature: 0.6,
      },
    })
 
    const raw = (response.text || '{}')
      .trim()
      .replace(/^```(?:json)?/i, '')
      .replace(/```$/, '')
      .trim()
 
    let data: any
    try {
      data = JSON.parse(raw)
    } catch {
      data = { reply: raw || 'Could you tell me a little more about what happened?', phase: 'intake', summary: null }
    }
 
    return NextResponse.json({
      reply: typeof data.reply === 'string' && data.reply.trim() ? data.reply : 'Could you tell me a little more?',
      phase: data.phase === 'complete' ? 'complete' : 'intake',
      summary: data.summary || null,
    })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Intake failed.' }, { status: 500 })
  }
}
 
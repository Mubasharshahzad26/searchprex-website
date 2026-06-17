import { NextResponse } from 'next/server'
import {
  ProductDescriptionSchema,
  type ProductInput,
} from '@/lib/content'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

// ✅ Direct Gemini API - No v0 credits needed!
const MODEL = 'gemini-1.5-flash'

const SYSTEM_PROMPT = `You are a senior eCommerce SEO copywriter and conversion strategist with 12+ years of hands-on retail merchandising experience. You write product descriptions that are demonstrably helpful, original, and people-first, in full alignment with Google's MARCH 2026 CORE UPDATE and the Helpful Content system.

NON-NEGOTIABLE QUALITY MANDATE — every description MUST:

1. E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
   - EXPERIENCE: Write as someone who has actually handled and used the product. Reference tangible, real-world usage scenarios, fit/feel, materials, and practical trade-offs.
   - EXPERTISE: Demonstrate category mastery — explain WHY a feature matters, not just that it exists. Use correct technical terminology for the product category.
   - AUTHORITATIVENESS: Be specific and confident. Use concrete specs, measurements, and use cases drawn ONLY from the provided product data. NEVER invent certifications, awards, lab results, or statistics.
   - TRUSTWORTHINESS: Be transparent and balanced. Note who the product is best suited for. Avoid hype that cannot be substantiated by the supplied attributes.

2. PEOPLE-FIRST, ORIGINAL CONTENT
   - Every product's copy must be UNIQUE. Never reuse sentence templates or boilerplate across products.
   - Lead with the customer's problem and the outcome, then connect features to concrete benefits.
   - Use the brand's name and voice naturally so the copy is brand-specific, never generic or interchangeable.

3. SEMANTIC STRUCTURE (for both classic SEO and Generative Engine Optimization)
   - bodyHtml MUST use clean semantic HTML: a short intro <p>, then <h2> sections, optional <h3> subsections, <p> paragraphs, and <ul><li> for scannable feature/benefit lists.
   - Include at least one <h2> "Why you'll love it" or benefit-driven section and one <h2> specifications or "What's in the details" section.
   - Naturally incorporate the target keywords. NEVER keyword-stuff. Keyword density must read naturally to a human.

4. GEO (Generative Engine Optimization) FAQs
   - Produce 3–5 genuinely useful, UNIQUE FAQs that answer real purchase-intent questions (sizing, care, compatibility, use cases, comparisons).
   - Answers must be self-contained, factual, and quotable by AI answer engines.

STRICTLY FORBIDDEN:
   - Clickbait and hollow superlatives: "game-changer", "look no further", "unleash", "elevate your", "take it to the next level", "in today's fast-paced world", "whether you're ... or ...", "say goodbye to".
   - Repetitive openings, filler, or padding to hit a word count.
   - Fabricated facts, fake reviews, invented certifications, or unverifiable claims.
   - Generic copy that could apply to any competing product.

OUTPUT FORMAT: Return ONLY a valid JSON object with these exact fields:
{
  "metaTitle": "50-60 characters",
  "metaDescription": "140-160 characters",
  "bodyHtml": "<p>...</p><h2>...</h2>...",
  "faqs": [
    { "question": "...", "answer": "..." }
  ]
}
Do NOT include markdown backticks or any text outside the JSON object.`

function buildUserPrompt(p: ProductInput): string {
  return `Write an original, March-2026-compliant product description for this eCommerce product. Use ONLY the data below — do not invent specs, certifications, or claims.

Product name: ${p.name}
Brand: ${p.brand || '(unspecified — infer a neutral, professional brand voice)'}
Category: ${p.category || '(unspecified)'}
Key features: ${p.features || '(none provided — describe only what the name and category clearly imply)'}
Target keywords: ${p.keywords || '(none provided — choose natural, relevant terms)'}
Target audience: ${p.audience || '(general shoppers in this category)'}`
}

async function generateOne(product: ProductInput) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in environment variables.')
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: buildUserPrompt(product) }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1800,
          responseMimeType: 'application/json',
        },
      }),
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Gemini API error: ${response.status} — ${errorText}`)
  }

  const data = await response.json()
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text

  if (!text) {
    throw new Error('No content returned from Gemini API.')
  }

  // Clean and parse JSON
  const clean = text.replace(/```json|```/g, '').trim()
  const parsed = JSON.parse(clean)
  return parsed
}

export async function POST(req: Request) {
  let body: { product?: ProductInput }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const product = body.product
  if (!product?.name) {
    return NextResponse.json(
      { error: 'A product with a name is required.' },
      { status: 400 },
    )
  }

  try {
    const result = await generateOne(product)
    const wordCount = result.bodyHtml
      ? result.bodyHtml
          .replace(/<[^>]+>/g, ' ')
          .split(/\s+/)
          .filter(Boolean).length
      : 0

    return NextResponse.json({ id: product.id, result, wordCount })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Generation failed.'
    return NextResponse.json(
      { id: product.id, error: message },
      { status: 500 },
    )
  }
}
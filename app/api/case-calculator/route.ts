import { NextResponse } from 'next/server'
 
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 30
 
/*
  Returns the real monthly Google search volume for a personal-injury term
  in the firm's market (e.g. "car accident lawyer chicago"). Used to power the
  SEO-visibility side of the Lost Case Calculator.
 
  Uses your existing DataForSEO creds:
    DATAFORSEO_LOGIN
    DATAFORSEO_PASSWORD
 
  Falls back gracefully (volume: null) if creds are missing or the keyword
  has no data — the client then uses a labelled estimate.
*/
export async function POST(req: Request) {
  let body: { keyword?: string; city?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }
 
  const base = (body.keyword || '').trim()
  const city = (body.city || '').trim()
  if (!base) return NextResponse.json({ error: 'keyword required' }, { status: 400 })
 
  const login = process.env.DATAFORSEO_LOGIN
  const password = process.env.DATAFORSEO_PASSWORD
  if (!login || !password) {
    return NextResponse.json({ keyword: base, volume: null, source: 'unconfigured' })
  }
 
  const phrase = city ? `${base} ${city}` : base
  const auth = Buffer.from(`${login}:${password}`).toString('base64')
 
  try {
    const res = await fetch(
      'https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live',
      {
        method: 'POST',
        headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
        body: JSON.stringify([
          { keywords: [phrase], location_name: 'United States', language_code: 'en' },
        ]),
      }
    )
    const data = await res.json()
    const item = data?.tasks?.[0]?.result?.[0]
    const volume = typeof item?.search_volume === 'number' ? item.search_volume : null
    return NextResponse.json({
      keyword: phrase,
      volume,
      source: volume != null ? 'dataforseo' : 'no-data',
    })
  } catch (err) {
    return NextResponse.json({
      keyword: phrase,
      volume: null,
      source: 'error',
      error: err instanceof Error ? err.message : 'failed',
    })
  }
}
 
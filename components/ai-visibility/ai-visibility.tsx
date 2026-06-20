'use client'
 
import { useState } from 'react'
import {
  Radar,
  Loader2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Lightbulb,
  Building2,
} from 'lucide-react'
 
const PRACTICE_AREAS = [
  'Personal Injury',
  'Car Accident',
  'Truck Accident',
  'Medical Malpractice',
  'Criminal Defense',
  'DUI / DWI',
  'Family Law',
  'Divorce',
  'Estate Planning',
  'Immigration',
  'Employment Law',
  "Workers' Compensation",
  'Bankruptcy',
]
 
type Result = {
  status: 'cited' | 'in-sources' | 'not-visible'
  query: string
  answerExcerpt: string
  sources: { title: string; url: string; domain: string }[]
  firmsCited: string[]
  whyVisible: string
  recommendations: string[]
  firmName: string
  city: string
  practiceArea: string
}
 
const STATUS_META = {
  cited: {
    icon: CheckCircle2,
    title: 'Your firm IS showing up in AI answers',
    sub: 'AI named your firm when asked who the best lawyers are — strong AI visibility.',
    cls: 'border-emerald-200 from-emerald-50 to-emerald-50 text-emerald-700',
    iconCls: 'text-emerald-600',
  },
  'in-sources': {
    icon: AlertTriangle,
    title: 'Partial — AI reads your site but doesn’t name your firm',
    sub: 'Your site appears in the AI’s sources, but your firm isn’t being recommended by name.',
    cls: 'border-amber-200 from-amber-50 to-orange-50 text-amber-700',
    iconCls: 'text-amber-600',
  },
  'not-visible': {
    icon: XCircle,
    title: 'Your firm is NOT showing up in AI answers',
    sub: 'When a potential client asks AI for the best lawyers, your firm isn’t mentioned — your competitors are.',
    cls: 'border-red-200 from-red-50 to-orange-50 text-red-700',
    iconCls: 'text-red-600',
  },
}
 
const inputCls =
  'h-11 w-full rounded-lg border border-border bg-card px-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30'
const labelCls = 'mb-1.5 block text-xs font-semibold text-foreground'
 
export default function AiVisibility() {
  const [firmName, setFirmName] = useState('')
  const [city, setCity] = useState('')
  const [practiceArea, setPracticeArea] = useState('Personal Injury')
  const [website, setWebsite] = useState('')
 
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<Result | null>(null)
 
  const [lead, setLead] = useState({ name: '', email: '', website: '' })
  const [leadStatus, setLeadStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
 
  async function check() {
    if (!firmName.trim() || !city.trim() || loading) return
    setLoading(true)
    setError(null)
    setResult(null)
    setLeadStatus('idle')
    try {
      const res = await fetch('/api/ai-visibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firmName, city, practiceArea, website }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Check failed')
      setResult(json as Result)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }
 
  async function submitLead() {
    if (!lead.name.trim() || !lead.email.trim()) {
      setLeadStatus('error')
      return
    }
    setLeadStatus('submitting')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...lead,
          source: 'ai-visibility',
          firm: result?.firmName,
          city: result?.city,
          status: result?.status,
        }),
      })
      if (!res.ok) throw new Error()
      setLeadStatus('success')
    } catch {
      setLeadStatus('error')
    }
  }
 
  const sm = result ? STATUS_META[result.status] : null
  const SIcon = sm?.icon
  const firmInList =
    result &&
    result.firmsCited.some((f) => f.toLowerCase().includes(result.firmName.toLowerCase().slice(0, 12)))
 
  return (
    <div className="flex flex-col gap-6 px-4 py-6 md:px-6">
      {/* Hero */}
      <div className="text-center">
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
          <Sparkles className="size-3.5" /> SearchPrex · AEO Tool
        </div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">AI Visibility Checker</h1>
        <p className="mx-auto mt-1 max-w-xl text-sm text-muted-foreground">
          When a client asks ChatGPT or Google AI “who’s the best lawyer near me?” — does your firm show up? Find out in
          seconds.
        </p>
      </div>
 
      <div className="mx-auto w-full max-w-2xl space-y-5">
        {/* Inputs */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Firm name</label>
              <input value={firmName} onChange={(e) => setFirmName(e.target.value)} placeholder="e.g. Smith Injury Law" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>City</label>
              <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Dallas" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Practice area</label>
              <select value={practiceArea} onChange={(e) => setPracticeArea(e.target.value)} className={inputCls}>
                {PRACTICE_AREAS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Website (optional)</label>
              <input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="e.g. smithlaw.com" className={inputCls} />
            </div>
          </div>
 
          <button
            onClick={check}
            disabled={loading || !firmName.trim() || !city.trim()}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Radar className="size-4" />}
            {loading ? 'Asking AI what it recommends…' : 'Check my AI visibility'}
          </button>
        </div>
 
        {error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{error}</div>
        )}
 
        {/* Results */}
        {result && sm && (
          <div className="space-y-4">
            {/* Verdict */}
            <div className={`overflow-hidden rounded-xl border bg-gradient-to-br p-6 ${sm.cls}`}>
              <div className="flex items-start gap-3">
                {SIcon && <SIcon className={`size-8 shrink-0 ${sm.iconCls}`} />}
                <div>
                  <h2 className="text-lg font-bold leading-snug text-foreground">{sm.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{sm.sub}</p>
                </div>
              </div>
            </div>
 
            {/* What we asked */}
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">What we asked AI</div>
              <p className="mt-1 text-sm font-medium">“{result.query}”</p>
              {result.answerExcerpt && (
                <p className="mt-2 border-l-2 border-border pl-3 text-xs italic leading-relaxed text-muted-foreground">
                  {result.answerExcerpt}…
                </p>
              )}
            </div>
 
            {/* Firms AI cited */}
            {result.firmsCited.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  <Building2 className="size-3.5" /> Firms AI named {firmInList ? '(including yours ✅)' : '(not yours ❌)'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.firmsCited.map((f, i) => {
                    const isYou = f.toLowerCase().includes(result.firmName.toLowerCase().slice(0, 12))
                    return (
                      <span
                        key={i}
                        className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                          isYou ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-border bg-muted/40 text-foreground'
                        }`}
                      >
                        {f}
                      </span>
                    )
                  })}
                </div>
              </div>
            )}
 
            {/* Sources */}
            {result.sources.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Sources AI is citing
                </div>
                <ul className="flex flex-col gap-1.5">
                  {result.sources.map((s, i) => (
                    <li key={i}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex max-w-full items-center gap-1.5 text-sm text-primary hover:underline"
                      >
                        <ExternalLink className="size-3.5 shrink-0" />
                        <span className="truncate">{s.domain}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
 
            {/* How to get cited */}
            {(result.recommendations.length > 0 || result.whyVisible) && (
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="mb-2 flex items-center gap-1.5 text-sm font-bold">
                  <Lightbulb className="size-4 text-primary" /> How to get your firm cited
                </div>
                {result.whyVisible && <p className="mb-2 text-xs text-muted-foreground">{result.whyVisible}</p>}
                <ul className="flex flex-col gap-1.5">
                  {result.recommendations.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
 
            {/* CTA + lead form */}
            <div className="overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 p-5">
              {leadStatus === 'success' ? (
                <div className="flex flex-col items-center py-2 text-center">
                  <CheckCircle2 className="size-9 text-primary" />
                  <h3 className="mt-2 text-base font-bold">On it! 🎉</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We’ll map how to get your firm cited in AI answers and send your free 30-day roadmap.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-base font-bold">Get your firm into AI answers</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Free 30-day AEO roadmap — the exact steps to get cited in ChatGPT, Perplexity, and Google AI Overviews
                    for your city and practice area.
                  </p>
                  <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    <input value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} placeholder="Your name *" className={inputCls} />
                    <input value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} type="email" placeholder="Work email *" className={inputCls} />
                    <input value={lead.website} onChange={(e) => setLead({ ...lead, website: e.target.value })} placeholder="Firm website (optional)" className={`${inputCls} sm:col-span-2`} />
                  </div>
                  {leadStatus === 'error' && <p className="mt-2 text-xs text-destructive">Please enter your name and a valid email.</p>}
                  <button
                    onClick={submitLead}
                    disabled={leadStatus === 'submitting'}
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60 sm:w-auto"
                  >
                    {leadStatus === 'submitting' ? <Loader2 className="size-4 animate-spin" /> : <>Get my free AEO roadmap <ArrowRight className="size-4" /></>}
                  </button>
                </>
              )}
            </div>
 
            <p className="px-1 text-center text-[11px] leading-relaxed text-muted-foreground">
              This is a snapshot of how a leading AI engine (grounded on live Google Search) answers this query right now.
              AI answers vary by engine and over time — a directional signal of your AI visibility, not a guarantee.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
 
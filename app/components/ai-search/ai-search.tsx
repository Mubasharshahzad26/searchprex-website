'use client'
 
import { useState } from 'react'
import {
  Search,
  Loader2,
  Sparkles,
  ArrowRight,
  ExternalLink,
  FileText,
  CheckCircle2,
  Scale,
  ShoppingCart,
  MapPin,
  Globe,
} from 'lucide-react'
 
type Vertical = 'lawfirm' | 'ecommerce' | 'local' | 'general'
 
const VERTICAL_META: Record<Vertical, { label: string; icon: typeof Globe }> = {
  lawfirm: { label: 'Law Firm SEO', icon: Scale },
  ecommerce: { label: 'Ecommerce SEO', icon: ShoppingCart },
  local: { label: 'Local SEO', icon: MapPin },
  general: { label: 'SEO', icon: Globe },
}
 
const CTA_COPY: Record<Vertical, { title: string; sub: string }> = {
  lawfirm: {
    title: 'Get more cases from search',
    sub: 'Free 30-day SEO roadmap for your firm — practice-area targeting, local visibility, and a higher-converting intake funnel.',
  },
  ecommerce: {
    title: 'Turn organic traffic into revenue',
    sub: 'Free 30-day SEO roadmap for your store — indexation, product & category optimization, and scalable organic growth.',
  },
  local: {
    title: 'Get found by nearby customers',
    sub: 'Free 30-day local SEO roadmap — Google Business Profile, citations, and "near me" visibility.',
  },
  general: {
    title: 'Want a plan built for your business?',
    sub: 'Get a free 30-day SEO roadmap from SearchPrex — tailored to your site, niche, and goals.',
  },
}
 
const EXAMPLES = [
  'Best SEO strategy for a personal injury law firm in Texas',
  'How can my Shopify store grow organic traffic?',
  'Local SEO checklist for a dentist in Chicago',
  'How to rank law firm practice-area pages',
]
 
type RelatedPage = { title: string; url: string; snippet: string }
 
type SearchResult = {
  answer: string
  sources: { title: string; url: string }[]
  vertical: Vertical
  relatedPages: RelatedPage[]
}
 
type LeadStatus = 'idle' | 'submitting' | 'success' | 'error'
 
export default function AiSearch() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<SearchResult | null>(null)
 
  const [lead, setLead] = useState({ name: '', email: '', website: '' })
  const [leadStatus, setLeadStatus] = useState<LeadStatus>('idle')
 
  function resetLead() {
    setLead({ name: '', email: '', website: '' })
    setLeadStatus('idle')
  }
 
  async function run(q?: string) {
    const text = (q ?? query).trim()
    if (!text || loading) return
    setQuery(text)
    setLoading(true)
    setError(null)
    setResult(null)
    resetLead()
    try {
      const res = await fetch('/api/seo-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Search failed')
      setResult(json as SearchResult)
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
          name: lead.name,
          email: lead.email,
          website: lead.website,
          source: 'ai-search',
          query,
          vertical: result?.vertical,
        }),
      })
      if (!res.ok) throw new Error()
      setLeadStatus('success')
    } catch {
      setLeadStatus('error')
    }
  }
 
  const vm = result ? VERTICAL_META[result.vertical] : null
  const VIcon = vm?.icon
  const cta = result ? CTA_COPY[result.vertical] : CTA_COPY.general
 
  return (
    <div className="flex flex-col gap-6 px-4 py-6 md:px-6">
      {/* Hero */}
      <div className="text-center">
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
          <Sparkles className="size-3.5" /> SearchPrex AI · SEO Answer Engine
        </div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Ask anything about SEO</h1>
        <p className="mx-auto mt-1 max-w-xl text-sm text-muted-foreground">
          Instant, AI-grounded answers for law firms, ecommerce stores &amp; local businesses.
        </p>
      </div>
 
      {/* Search bar */}
      <div className="mx-auto w-full max-w-2xl">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && run()}
              placeholder="e.g. How do I get more clients for my law firm with SEO?"
              className="h-[52px] w-full rounded-xl border border-border bg-card pl-12 pr-4 text-base outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30"
            />
          </div>
          <button
            onClick={() => run()}
            disabled={loading || !query.trim()}
            className="flex h-[52px] items-center justify-center gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? <Loader2 className="size-5 animate-spin" /> : <Search className="size-5" />}
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
 
        {/* Example queries */}
        {!result && !loading && (
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => run(ex)}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {ex}
              </button>
            ))}
          </div>
        )}
      </div>
 
      {/* Loading */}
      {loading && (
        <div className="mx-auto w-full max-w-2xl space-y-3 rounded-xl border border-border bg-card p-5">
          <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
          <div className="h-3 w-full animate-pulse rounded bg-muted" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
          <div className="h-3 w-4/6 animate-pulse rounded bg-muted" />
          <p className="pt-1 text-center text-xs text-muted-foreground">SearchPrex AI is researching…</p>
        </div>
      )}
 
      {/* Error */}
      {error && (
        <div className="mx-auto w-full max-w-2xl rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      )}
 
      {/* Answer */}
      {result && (
        <div className="mx-auto w-full max-w-2xl space-y-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                {VIcon && <VIcon className="size-3.5" />} {vm?.label}
              </span>
              <span className="text-xs text-muted-foreground">AI Overview</span>
            </div>
            <div
              className="text-sm leading-relaxed [&_a]:text-primary [&_a]:underline [&_h3]:mb-1.5 [&_h3]:mt-4 [&_h3]:text-base [&_h3]:font-bold [&_li]:my-1 [&_p]:my-2 [&_strong]:font-semibold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: result.answer }}
            />
          </div>
 
          {/* Related SearchPrex resources */}
          {result.relatedPages?.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Related from SearchPrex
              </div>
              <ul className="flex flex-col gap-2">
                {result.relatedPages.map((p, i) => (
                  <li key={i}>
                    <a href={p.url} className="group flex items-start gap-2.5 rounded-lg p-2 transition-colors hover:bg-muted/50">
                      <FileText className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>
                        <span className="block text-sm font-semibold text-foreground group-hover:text-primary">{p.title}</span>
                        <span className="block text-xs text-muted-foreground">{p.snippet}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
 
          {/* Web sources */}
          {result.sources.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Sources
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
                      <span className="truncate">{s.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
 
          {/* CTA + inline lead form */}
          <div className="overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 p-5">
            {leadStatus === 'success' ? (
              <div className="flex flex-col items-center py-2 text-center">
                <CheckCircle2 className="size-9 text-primary" />
                <h3 className="mt-2 text-base font-bold">You&apos;re in! 🎉</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  We&apos;ll review your site and send your free 30-day SEO roadmap shortly.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-base font-bold">{cta.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{cta.sub}</p>
 
                <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  <input
                    value={lead.name}
                    onChange={(e) => setLead({ ...lead, name: e.target.value })}
                    placeholder="Your name *"
                    className="h-11 rounded-lg border border-border bg-card px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                  />
                  <input
                    value={lead.email}
                    onChange={(e) => setLead({ ...lead, email: e.target.value })}
                    type="email"
                    placeholder="Work email *"
                    className="h-11 rounded-lg border border-border bg-card px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                  />
                  <input
                    value={lead.website}
                    onChange={(e) => setLead({ ...lead, website: e.target.value })}
                    placeholder="Website (optional)"
                    className="h-11 rounded-lg border border-border bg-card px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30 sm:col-span-2"
                  />
                </div>
 
                {leadStatus === 'error' && (
                  <p className="mt-2 text-xs text-destructive">
                    Please enter your name and a valid email — or{' '}
                    <a href="/free-audit" className="underline">use the full audit form</a>.
                  </p>
                )}
 
                <button
                  onClick={submitLead}
                  disabled={leadStatus === 'submitting'}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60 sm:w-auto"
                >
                  {leadStatus === 'submitting' ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <>
                      Book your free 30-day roadmap <ArrowRight className="size-4" />
                    </>
                  )}
                </button>
              </>
            )}
          </div>
 
          {/* Search again */}
          <div className="text-center">
            <button
              onClick={() => {
                setResult(null)
                setQuery('')
                resetLead()
              }}
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              ← New search
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
 
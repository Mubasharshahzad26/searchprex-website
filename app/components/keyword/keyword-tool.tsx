'use client'

import { useMemo, useState } from 'react'
import {
  COUNTRIES,
  INTENT_CONFIG,
  formatVolume,
  type Intent,
  type KeywordResponse,
} from '@/lib/seo'
import { KeywordTable, type SortKey } from './keyword-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import {
  Search,
  ChevronDown,
  Loader2,
  Database,
  TriangleAlert,
  ListFilter,
  TrendingUp,
  Target,
  DollarSign,
} from 'lucide-react'

const ALL_INTENTS = Object.keys(INTENT_CONFIG) as Intent[]

const KD_FILTERS = [
  { key: 'all', label: 'All KD', min: 0, max: 100 },
  { key: 'easy', label: '0–14 Very Easy', min: 0, max: 14 },
  { key: 'medium', label: '15–29 Easy', min: 15, max: 29 },
  { key: 'hard', label: '30–84 Hard', min: 30, max: 84 },
  { key: 'vhard', label: '85–100 Very Hard', min: 85, max: 100 },
] as const

export function KeywordTool({ initial }: { initial: KeywordResponse }) {
  const [data, setData] = useState<KeywordResponse>(initial)
  const [seed, setSeed] = useState(initial.seed)
  const [country, setCountry] = useState(COUNTRIES[0])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [activeIntents, setActiveIntents] = useState<Set<Intent>>(new Set())
  const [kdFilter, setKdFilter] = useState<(typeof KD_FILTERS)[number]['key']>('all')
  const [filterText, setFilterText] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('volume')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  async function runSearch(e?: React.FormEvent) {
    e?.preventDefault()
    const q = seed.trim()
    if (!q || loading) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: q, country: country.code }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Request failed')
      setData(json as KeywordResponse)
      setActiveIntents(new Set())
      setKdFilter('all')
      setFilterText('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir(key === 'keyword' ? 'asc' : 'desc')
    }
  }

  function toggleIntent(intent: Intent) {
    setActiveIntents((prev) => {
      const next = new Set(prev)
      next.has(intent) ? next.delete(intent) : next.add(intent)
      return next
    })
  }

  const filtered = useMemo(() => {
    const band = KD_FILTERS.find((k) => k.key === kdFilter)!
    const text = filterText.trim().toLowerCase()
    const rows = data.keywords.filter((k) => {
      if (activeIntents.size > 0 && !activeIntents.has(k.intent)) return false
      if (k.difficulty < band.min || k.difficulty > band.max) return false
      if (text && !k.keyword.toLowerCase().includes(text)) return false
      return true
    })
    rows.sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1
      if (sortKey === 'keyword') return a.keyword.localeCompare(b.keyword) * dir
      return (a[sortKey] - b[sortKey]) * dir
    })
    return rows
  }, [data.keywords, activeIntents, kdFilter, filterText, sortKey, sortDir])

  const intentCounts = useMemo(() => {
    const counts: Record<Intent, number> = {
      informational: 0,
      navigational: 0,
      commercial: 0,
      transactional: 0,
    }
    for (const k of data.keywords) counts[k.intent]++
    return counts
  }, [data.keywords])

  return (
    <div className="flex flex-col gap-5 px-4 py-5 md:px-6">
      {/* Page heading */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold tracking-tight">Keyword Magic Tool</h1>
          <span className="rounded bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">
            SEO
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Discover millions of keyword ideas with accurate volume, difficulty,
          intent, and CPC for any market.
        </p>
      </div>

      {/* Search bar */}
      <form
        onSubmit={runSearch}
        className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center"
      >
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            placeholder="Enter a seed keyword, e.g. running shoes"
            className="h-12 w-full rounded-lg border border-border bg-background pl-11 pr-4 text-base font-medium outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30"
            aria-label="Seed keyword"
          />
        </div>

        {/* Country selector */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-12 items-center justify-between gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium transition-colors hover:bg-muted sm:w-48">
            <span className="flex items-center gap-2 truncate">
              <span className="text-lg leading-none">{country.flag}</span>
              <span className="truncate">{country.name}</span>
            </span>
            <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="max-h-72 w-56 overflow-y-auto"
          >
            {COUNTRIES.map((c) => (
              <DropdownMenuItem
                key={c.code}
                onClick={() => setCountry(c)}
                className="gap-2"
              >
                <span className="text-lg leading-none">{c.flag}</span>
                <span className="flex-1">{c.name}</span>
                <span className="text-xs text-muted-foreground">{c.code}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          type="submit"
          disabled={loading || !seed.trim()}
          className="flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <Search className="size-5" />
          )}
          Search
        </button>
      </form>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-2.5 text-sm text-destructive">
          <TriangleAlert className="size-4" />
          {error}
        </div>
      )}

      {/* Data source banner */}
      <SourceBanner source={data.source} />

      {/* Summary stat cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          icon={ListFilter}
          label="Total keywords"
          value={data.total.toLocaleString('en-US')}
          tip="Total keyword ideas returned for your seed term."
        />
        <StatCard
          icon={TrendingUp}
          label="Total volume"
          value={formatVolume(data.summary.totalVolume)}
          tip="Combined average monthly search volume across all keywords."
        />
        <StatCard
          icon={Target}
          label="Avg. difficulty"
          value={`${data.summary.avgDifficulty}%`}
          tip="Average keyword difficulty across all returned keywords."
        />
        <StatCard
          icon={DollarSign}
          label="Avg. CPC"
          value={`$${data.summary.avgCpc.toFixed(2)}`}
          tip="Average cost-per-click across all returned keywords."
        />
      </div>

      {/* Table card */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        {/* Filter toolbar */}
        <div className="flex flex-col gap-3 border-b border-border p-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-xs font-semibold text-muted-foreground">
              Intent
            </span>
            {ALL_INTENTS.map((intent) => {
              const cfg = INTENT_CONFIG[intent]
              const active = activeIntents.has(intent)
              return (
                <button
                  key={intent}
                  type="button"
                  onClick={() => toggleIntent(intent)}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-all',
                    active
                      ? 'ring-2 ring-offset-1'
                      : 'opacity-70 hover:opacity-100',
                  )}
                  style={{
                    color: cfg.text,
                    backgroundColor: cfg.bg,
                    borderColor: cfg.border,
                    boxShadow: active ? `0 0 0 1px ${cfg.text}` : undefined,
                  }}
                >
                  {cfg.label}
                  <span className="tabular-nums opacity-70">
                    {intentCounts[intent]}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs font-medium transition-colors hover:bg-muted">
                {KD_FILTERS.find((k) => k.key === kdFilter)!.label}
                <ChevronDown className="size-3.5 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {KD_FILTERS.map((k) => (
                  <DropdownMenuItem key={k.key} onClick={() => setKdFilter(k.key)}>
                    {k.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="Filter keywords"
                className="h-8 w-40 rounded-md border border-border bg-background pl-8 pr-2 text-xs outline-none focus:border-primary"
                aria-label="Filter keywords within results"
              />
            </div>

            <span className="text-xs text-muted-foreground tabular-nums">
              {filtered.length.toLocaleString('en-US')} shown
            </span>
          </div>
        </div>

        <KeywordTable
          rows={filtered}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={toggleSort}
        />
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  tip,
}: {
  icon: typeof TrendingUp
  label: string
  value: string
  tip: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <div className="flex items-center gap-1">
          <span className="text-xs font-medium text-muted-foreground">
            {label}
          </span>
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" aria-label={`About ${label}`}>
                <span className="text-[10px] text-muted-foreground/60">ⓘ</span>
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-52">{tip}</TooltipContent>
          </Tooltip>
        </div>
        <p className="truncate text-xl font-bold tabular-nums">{value}</p>
      </div>
    </div>
  )
}

function SourceBanner({ source }: { source: KeywordResponse['source'] }) {
  if (source === 'dataforseo') {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-[#bbf0c9] bg-[#eafbef] px-4 py-2 text-sm text-[#166534]">
        <Database className="size-4" />
        <span>
          <strong>Live data</strong> — metrics sourced in real time from the
          DataForSEO Labs API.
        </span>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-2 rounded-lg border border-[#ffe2a8] bg-[#fff7e6] px-4 py-2 text-sm text-[#92660a]">
      <TriangleAlert className="size-4 shrink-0" />
      <span>
        <strong>Estimated data</strong> — add{' '}
        <code className="rounded bg-black/5 px-1 py-0.5 text-[12px]">
          DATAFORSEO_LOGIN
        </code>{' '}
        and{' '}
        <code className="rounded bg-black/5 px-1 py-0.5 text-[12px]">
          DATAFORSEO_PASSWORD
        </code>{' '}
        to unlock live, 100%-accurate metrics.
      </span>
    </div>
  )
}

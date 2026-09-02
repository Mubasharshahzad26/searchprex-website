'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  Calendar,
  Users,
  Download,
  RefreshCw,
  FileJson,
} from 'lucide-react'

const PERIODS = ['7d', '30d', '90d'] as const
type Period = (typeof PERIODS)[number]

const PERIOD_LABEL: Record<Period, string> = {
  '7d': '7 days',
  '30d': '30 days',
  '90d': '90 days',
}

/** sessionStorage, not localStorage — the key is a secret, so it dies with the tab. */
const KEY_STORAGE = 'autopilot_report_key'

interface DailyPublish {
  date: string
  generated: number
  published: number
}

interface RecentRun {
  id: string
  clientName: string
  pages: number
  status: string
  dryRun: boolean
  startedAt: string
}

interface WindowMetrics {
  generated: number
  published: number
  publishRate: number
  urlsIndexed: number
  indexingFailed: number
  runSuccessRate: number
  totalRuns: number
  cost: number
}

interface ReportsData extends WindowMetrics {
  period: Period
  clientId: string | null
  clientName: string | null
  generatedAt: string
  dateRange: { start: string; end: string }
  prevDateRange: { start: string; end: string }
  previous: WindowMetrics
  indexingScope: 'global' | 'client'
  backlogQueued: number
  backlogSubmitted: number
  dailyBreakdown: DailyPublish[]
  recentRuns: RecentRun[]
  topClients: { clientName: string; pagesPublished: number }[]
}

/** Signed percentage change, or null when there is no baseline to compare against. */
function pctChange(current: number, previous: number): number | null {
  if (previous === 0) return current === 0 ? 0 : null
  return ((current - previous) / previous) * 100
}

function Delta({
  current,
  previous,
  inverse = false,
}: {
  current: number
  previous: number
  /** true when a rise is bad (failures, cost). */
  inverse?: boolean
}) {
  const change = pctChange(current, previous)
  const flat = current === previous

  if (flat) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-neutral-400">
        <Minus className="w-3 h-3" />
        no change
      </span>
    )
  }

  const up = current > previous
  const good = inverse ? !up : up
  const Icon = up ? TrendingUp : TrendingDown
  const tone = good ? 'text-green-600' : 'text-red-500'
  const label =
    change === null
      ? up
        ? 'new'
        : 'none left'
      : `${change >= 0 ? '+' : ''}${change.toFixed(change > -10 && change < 10 ? 1 : 0)}%`

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${tone}`}>
      <Icon className="w-3 h-3" />
      {label}
      <span className="font-normal text-neutral-400">vs prev</span>
    </span>
  )
}

function StatBox({
  label,
  value,
  hint,
  current,
  previous,
  inverse,
}: {
  label: string
  value: number | string
  hint?: string
  current?: number
  previous?: number
  inverse?: boolean
}) {
  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
      <p className="text-xs uppercase tracking-wider font-medium text-neutral-500 mb-1.5">
        {label}
      </p>
      <p className="text-2xl font-bold text-neutral-900 tabular-nums tracking-tight">
        {value}
      </p>
      {current !== undefined && previous !== undefined && (
        <div className="mt-1.5">
          <Delta current={current} previous={previous} inverse={inverse} />
        </div>
      )}
      {hint && <p className="text-xs text-neutral-500 mt-1">{hint}</p>}
    </div>
  )
}

function StatusBadge({ status, dryRun }: { status: string; dryRun: boolean }) {
  if (dryRun) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border bg-amber-50 text-amber-700 border-amber-200">
        Dry run
      </span>
    )
  }
  const styles: Record<string, string> = {
    success: 'bg-green-50 text-green-700 border-green-200',
    failed: 'bg-red-50 text-red-700 border-red-200',
    error: 'bg-red-50 text-red-700 border-red-200',
    running: 'bg-blue-50 text-blue-700 border-blue-200',
    partial: 'bg-amber-50 text-amber-700 border-amber-200',
  }
  const style = styles[status] || 'bg-neutral-100 text-neutral-600 border-neutral-200'
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${style}`}
    >
      {status}
    </span>
  )
}

/** The API buckets by UTC day, so render the label in UTC too — otherwise a
 *  viewer west of Greenwich sees every bar labelled with the previous day. */
function dayLabel(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

function downloadBlob(filename: string, contents: string, mime: string) {
  const url = URL.createObjectURL(new Blob([contents], { type: mime }))
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  // Safari ignores a click on a detached anchor, and revoking synchronously can
  // cancel the download before it starts — hence the append and the deferred revoke.
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/** Wrap anything that could carry a comma or quote so Sheets/Excel parse it back. */
function csvCell(value: string | number): string {
  const s = String(value)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export default function ReportsWidget({
  clientId,
  clientName,
}: {
  /** Scopes the report to one client. Comes from the dashboard's client selector. */
  clientId?: string
  clientName?: string
} = {}) {
  const [key, setKey] = useState('')
  const [period, setPeriod] = useState<Period>('7d')
  const [data, setData] = useState<ReportsData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(false)

  // Keep the latest key/period in a ref so the auto-refresh timer never closes
  // over a stale value and refetches the wrong window.
  const latest = useRef({ key: '', period, clientId })
  latest.current = { key, period, clientId }

  const load = useCallback(
    async (opts?: { period?: Period; silent?: boolean }) => {
      const p = opts?.period ?? latest.current.period
      const k = latest.current.key
      const cid = latest.current.clientId
      if (!k) return
      if (!opts?.silent) setLoading(true)
      setError(null)
      try {
        const qs = new URLSearchParams({ period: p })
        if (cid) qs.set('clientId', cid)
        const res = await fetch(`/api/autopilot/reports?${qs}`, {
          headers: { Authorization: `Bearer ${k}` },
        })
        if (res.status === 401) throw new Error('Wrong key')
        if (!res.ok) {
          const body = await res.json().catch(() => null)
          throw new Error(body?.error || `Failed: ${res.status}`)
        }
        const result: ReportsData = await res.json()
        setData(result)
        if (opts?.period) setPeriod(opts.period)
        if (typeof window !== 'undefined') sessionStorage.setItem(KEY_STORAGE, k)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Load failed')
      } finally {
        if (!opts?.silent) setLoading(false)
      }
    },
    [],
  )

  // Restore the key from this tab's session and load straight away, so a page
  // refresh does not mean retyping the secret.
  useEffect(() => {
    const saved = sessionStorage.getItem(KEY_STORAGE)
    if (!saved) return
    setKey(saved)
    latest.current.key = saved
    load({ silent: false })
  }, [load])

  // Refetch when the dashboard's client selection changes.
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (latest.current.key) load({ silent: true })
  }, [clientId, load])

  useEffect(() => {
    if (!autoRefresh) return
    const id = setInterval(() => load({ silent: true }), 60_000)
    return () => clearInterval(id)
  }, [autoRefresh, load])

  const exportCsv = () => {
    if (!data) return
    const scope = data.clientName ? data.clientName.replace(/\s+/g, '-') : 'all-clients'
    const rows = [
      ['date', 'generated', 'published'],
      ...data.dailyBreakdown.map((d) => [d.date, d.generated, d.published]),
    ]
    downloadBlob(
      `autopilot-report-${scope}-${data.period}-${data.dateRange.end}.csv`,
      rows.map((r) => r.map(csvCell).join(',')).join('\n'),
      'text/csv;charset=utf-8',
    )
  }

  const exportJson = () => {
    if (!data) return
    const scope = data.clientName ? data.clientName.replace(/\s+/g, '-') : 'all-clients'
    downloadBlob(
      `autopilot-report-${scope}-${data.period}-${data.dateRange.end}.json`,
      JSON.stringify(data, null, 2),
      'application/json',
    )
  }

  const maxDaily = data
    ? Math.max(1, ...data.dailyBreakdown.map((d) => Math.max(d.generated, d.published)))
    : 1

  // 90 labels will not fit, so thin them to roughly eight across the axis.
  const labelEvery = Math.max(1, Math.ceil((data?.dailyBreakdown.length ?? 0) / 8))

  const hasActivity =
    !!data && (data.generated > 0 || data.published > 0 || data.totalRuns > 0)

  const currency = (n: number) =>
    `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden mb-8">
      {/* Header */}
      <div className="px-6 py-5 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-neutral-700" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-neutral-900">Performance Reports</h2>
            {data ? (
              <p className="text-xs text-neutral-500">
                {data.dateRange.start} → {data.dateRange.end} ·{' '}
                {data.clientName ?? 'All clients'} · {data.published} published,{' '}
                {data.urlsIndexed} indexed
              </p>
            ) : (
              <p className="text-xs text-neutral-500">
                {clientName ? `Scoped to ${clientName}` : 'All clients'}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Period toggle — available before the first load, not only after it */}
          <div className="inline-flex rounded-lg border border-neutral-200 bg-white p-0.5">
            {PERIODS.map((p) => (
              <button
                key={p}
                onClick={() => (data ? load({ period: p }) : setPeriod(p))}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  period === p
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <input
            type="password"
            placeholder="Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') load()
            }}
            className="bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-100 w-32"
          />
          <button
            onClick={() => load()}
            disabled={!key || loading}
            className="px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 disabled:opacity-40 transition-colors"
          >
            {loading ? 'Loading...' : data ? 'Reload' : 'Load Reports'}
          </button>
        </div>
      </div>

      {/* Toolbar — only meaningful once there is a report on screen */}
      {data && (
        <div className="px-6 py-3 border-b border-neutral-100 bg-neutral-50/60 flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-xs text-neutral-500">
            Generated{' '}
            {new Date(data.generatedAt).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          <label className="flex items-center gap-1.5 text-xs text-neutral-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="accent-neutral-900"
            />
            <RefreshCw className="w-3 h-3" />
            Auto-refresh (60s)
          </label>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={exportCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white text-xs font-semibold text-neutral-700 hover:border-neutral-900 hover:text-neutral-900 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              CSV
            </button>
            <button
              onClick={exportJson}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white text-xs font-semibold text-neutral-700 hover:border-neutral-900 hover:text-neutral-900 transition-colors"
            >
              <FileJson className="w-3.5 h-3.5" />
              JSON
            </button>
          </div>
        </div>
      )}

      {/* Body */}
      <div className="p-6">
        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200">
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        )}

        {!data && !error && (
          <p className="text-sm text-neutral-500 text-center py-6">
            Enter your key and click Load Reports to see performance metrics.
          </p>
        )}

        {data && !hasActivity && (
          <div className="text-center py-8">
            <p className="text-sm font-medium text-neutral-700">
              No Autopilot activity in the last {PERIOD_LABEL[data.period]}
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              {data.clientName
                ? `${data.clientName} has no runs in this window.`
                : 'No runs across any client in this window.'}{' '}
              Try a longer period.
            </p>
          </div>
        )}

        {data && hasActivity && (
          <div className="space-y-6">
            {/* Content pipeline */}
            <div>
              <p className="text-xs uppercase tracking-wider font-medium text-neutral-500 mb-3">
                Content pipeline
                <span className="ml-2 normal-case tracking-normal font-normal text-neutral-400">
                  vs. {data.prevDateRange.start} → {data.prevDateRange.end}
                </span>
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatBox
                  label="Generated"
                  value={data.generated.toLocaleString()}
                  current={data.generated}
                  previous={data.previous.generated}
                  hint="AI content created"
                />
                <StatBox
                  label="Published"
                  value={data.published.toLocaleString()}
                  current={data.published}
                  previous={data.previous.published}
                  hint="Live on WordPress"
                />
                <StatBox
                  label="Publish rate"
                  value={`${Math.round(data.publishRate * 100)}%`}
                  current={data.publishRate}
                  previous={data.previous.publishRate}
                  hint="Of generated pages"
                />
                <StatBox
                  label="Runs success"
                  value={`${Math.round(data.runSuccessRate * 100)}%`}
                  current={data.runSuccessRate}
                  previous={data.previous.runSuccessRate}
                  hint={`${data.totalRuns} total runs`}
                />
              </div>
            </div>

            {/* Indexing */}
            <div>
              <p className="text-xs uppercase tracking-wider font-medium text-neutral-500 mb-3">
                Indexing
                {data.clientId && (
                  <span className="ml-2 normal-case tracking-normal font-normal text-neutral-400">
                    submissions are account-wide, not per client
                  </span>
                )}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatBox
                  label="URLs indexed"
                  value={data.urlsIndexed.toLocaleString()}
                  current={data.urlsIndexed}
                  previous={data.previous.urlsIndexed}
                  hint="Submitted successfully"
                />
                <StatBox
                  label="Indexing failed"
                  value={data.indexingFailed.toLocaleString()}
                  current={data.indexingFailed}
                  previous={data.previous.indexingFailed}
                  inverse
                  hint="API errors / quota"
                />
                <StatBox
                  label="Backlog queued"
                  value={data.backlogQueued.toLocaleString()}
                  hint="Awaiting submission (now)"
                />
                <StatBox
                  label="Backlog done"
                  value={data.backlogSubmitted.toLocaleString()}
                  hint="Total processed (now)"
                />
              </div>
            </div>

            {/* Spend */}
            <div>
              <p className="text-xs uppercase tracking-wider font-medium text-neutral-500 mb-3">
                Spend
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatBox
                  label="Period cost"
                  value={currency(data.cost)}
                  current={data.cost}
                  previous={data.previous.cost}
                  inverse
                  hint="Logged AI + API spend"
                />
                <StatBox
                  label="Cost per published"
                  value={
                    data.published > 0 ? currency(data.cost / data.published) : '—'
                  }
                  hint="Blended, this period"
                />
              </div>
            </div>

            {/* Daily trend chart */}
            {data.dailyBreakdown.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                  <p className="text-xs uppercase tracking-wider font-medium text-neutral-500">
                    Daily activity ({PERIOD_LABEL[data.period]})
                  </p>
                  <span className="text-xs text-neutral-400 ml-auto tabular-nums">
                    peak {maxDaily.toLocaleString()}/day
                  </span>
                </div>
                <div className="border border-neutral-200 rounded-xl p-4 bg-white">
                  {/* h-full on each column is what the bars' percentage heights resolve against */}
                  <div className="flex items-end gap-px h-28">
                    {data.dailyBreakdown.map((d) => {
                      const genHeight = (d.generated / maxDaily) * 100
                      const pubHeight = (d.published / maxDaily) * 100
                      return (
                        <div
                          key={d.date}
                          className="flex-1 h-full flex items-end justify-center gap-0.5 group min-w-0"
                          title={`${dayLabel(d.date)} — generated ${d.generated}, published ${d.published}`}
                        >
                          <div
                            className="flex-1 max-w-3 bg-neutral-300 rounded-t transition-all group-hover:bg-neutral-400"
                            style={{ height: `${Math.max(genHeight, 2)}%` }}
                          />
                          <div
                            className="flex-1 max-w-3 bg-green-500 rounded-t transition-all group-hover:bg-green-600"
                            style={{ height: `${Math.max(pubHeight, 2)}%` }}
                          />
                        </div>
                      )
                    })}
                  </div>

                  {/* Axis labels, thinned so 30d and 90d stay readable */}
                  <div className="flex gap-px mt-1.5">
                    {data.dailyBreakdown.map((d, i) => (
                      <div key={d.date} className="flex-1 min-w-0 text-center">
                        {i % labelEvery === 0 && (
                          <span className="text-[9px] text-neutral-500 whitespace-nowrap">
                            {dayLabel(d.date)}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-neutral-100">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 bg-neutral-300 rounded-sm" />
                      <span className="text-xs text-neutral-600">Generated</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 bg-green-500 rounded-sm" />
                      <span className="text-xs text-neutral-600">Published</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Top clients + Recent runs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {data.topClients.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-3.5 h-3.5 text-neutral-500" />
                    <p className="text-xs uppercase tracking-wider font-medium text-neutral-500">
                      Top clients by publishes
                    </p>
                  </div>
                  <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white">
                    {data.topClients.map((c, i) => {
                      const maxPub = data.topClients[0]?.pagesPublished || 1
                      const pct = (c.pagesPublished / maxPub) * 100
                      return (
                        <div
                          key={c.clientName}
                          className={`px-4 py-3 ${
                            i !== 0 ? 'border-t border-neutral-100' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <p className="text-sm font-semibold text-neutral-900 truncate">
                              {c.clientName}
                            </p>
                            <p className="text-sm text-neutral-600 tabular-nums font-medium flex-shrink-0 ml-2">
                              {c.pagesPublished}
                            </p>
                          </div>
                          <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-neutral-900 rounded-full transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-neutral-500" />
                  <p className="text-xs uppercase tracking-wider font-medium text-neutral-500">
                    Runs in this period
                  </p>
                </div>
                <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white">
                  {data.recentRuns.length === 0 ? (
                    <p className="px-4 py-6 text-xs text-neutral-500 text-center">
                      No runs started in this window.
                    </p>
                  ) : (
                    <div className="max-h-72 overflow-y-auto">
                      {data.recentRuns.map((r, i) => (
                        <div
                          key={r.id}
                          className={`flex items-center justify-between gap-2 px-4 py-2.5 ${
                            i !== 0 ? 'border-t border-neutral-100' : ''
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-neutral-900 truncate">
                              {r.clientName}
                            </p>
                            <p className="text-[11px] text-neutral-500">
                              {new Date(r.startedAt).toLocaleString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-xs text-neutral-600 tabular-nums font-medium">
                              {r.pages} pages
                            </span>
                            <StatusBadge status={r.status} dryRun={r.dryRun} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

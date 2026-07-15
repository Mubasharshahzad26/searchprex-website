'use client'
 
import { useState } from 'react'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  XCircle,
  Sparkles,
  Calendar,
  Users,
} from 'lucide-react'
 
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
 
interface ReportsData {
  period: '7d' | '30d'
  generated: number
  published: number
  publishRate: number
  urlsIndexed: number
  indexingFailed: number
  backlogQueued: number
  backlogSubmitted: number
  runSuccessRate: number
  totalRuns: number
  dailyBreakdown: DailyPublish[]
  recentRuns: RecentRun[]
  topClients: { clientName: string; pagesPublished: number }[]
}
 
function StatBox({
  label,
  value,
  hint,
  trend,
}: {
  label: string
  value: number | string
  hint?: string
  trend?: 'up' | 'down' | 'neutral'
}) {
  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
      <p className="text-xs uppercase tracking-wider font-medium text-neutral-500 mb-1.5">
        {label}
      </p>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold text-neutral-900 tabular-nums tracking-tight">
          {value}
        </p>
        {trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-green-600" />}
        {trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-red-500" />}
      </div>
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
 
export default function ReportsWidget() {
  const [key, setKey] = useState('')
  const [period, setPeriod] = useState<'7d' | '30d'>('7d')
  const [data, setData] = useState<ReportsData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
 
  const load = async (nextPeriod?: '7d' | '30d') => {
    const p = nextPeriod || period
    if (!key) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/autopilot/reports?period=${p}`, {
        headers: { Authorization: `Bearer ${key}` },
      })
      if (res.status === 401) throw new Error('Wrong key')
      if (!res.ok) throw new Error(`Failed: ${res.status}`)
      const result = await res.json()
      setData(result)
      if (nextPeriod) setPeriod(nextPeriod)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Load failed')
    } finally {
      setLoading(false)
    }
  }
 
  // Max daily publish for bar chart scaling
  const maxDaily = data
    ? Math.max(
        1,
        ...data.dailyBreakdown.map((d) => Math.max(d.generated, d.published)),
      )
    : 1
 
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
            {data && (
              <p className="text-xs text-neutral-500">
                Last {data.period === '7d' ? '7 days' : '30 days'} — {data.published} pages published, {data.urlsIndexed} URLs indexed
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Period toggle */}
          {data && (
            <div className="inline-flex rounded-lg border border-neutral-200 bg-white p-0.5">
              <button
                onClick={() => load('7d')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  period === '7d'
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                7d
              </button>
              <button
                onClick={() => load('30d')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  period === '30d'
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                30d
              </button>
            </div>
          )}
          <input
            type="password"
            placeholder="Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-100 w-32"
          />
          <button
            onClick={() => load()}
            disabled={!key || loading}
            className="px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 disabled:opacity-40 transition-colors"
          >
            {loading ? 'Loading...' : 'Load Reports'}
          </button>
        </div>
      </div>
 
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
 
        {data && (
          <div className="space-y-6">
            {/* Top KPIs */}
            <div>
              <p className="text-xs uppercase tracking-wider font-medium text-neutral-500 mb-3">
                Content Pipeline
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatBox
                  label="Generated"
                  value={data.generated}
                  hint="AI content created"
                />
                <StatBox
                  label="Published"
                  value={data.published}
                  hint="Live on WordPress"
                  trend={data.published > 0 ? 'up' : 'neutral'}
                />
                <StatBox
                  label="Publish rate"
                  value={`${Math.round(data.publishRate * 100)}%`}
                  hint="Of generated pages"
                />
                <StatBox
                  label="Runs success"
                  value={`${Math.round(data.runSuccessRate * 100)}%`}
                  hint={`${data.totalRuns} total runs`}
                />
              </div>
            </div>
 
            {/* Indexing KPIs */}
            <div>
              <p className="text-xs uppercase tracking-wider font-medium text-neutral-500 mb-3">
                Indexing
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatBox
                  label="URLs indexed"
                  value={data.urlsIndexed}
                  hint="Submitted successfully"
                  trend={data.urlsIndexed > 0 ? 'up' : 'neutral'}
                />
                <StatBox
                  label="Indexing failed"
                  value={data.indexingFailed}
                  hint="API errors / quota"
                  trend={data.indexingFailed > 0 ? 'down' : 'neutral'}
                />
                <StatBox
                  label="Backlog queued"
                  value={data.backlogQueued.toLocaleString()}
                  hint="Awaiting submission"
                />
                <StatBox
                  label="Backlog done"
                  value={data.backlogSubmitted.toLocaleString()}
                  hint="Total processed"
                />
              </div>
            </div>
 
            {/* Daily trend chart */}
            {data.dailyBreakdown.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                  <p className="text-xs uppercase tracking-wider font-medium text-neutral-500">
                    Daily activity ({data.period === '7d' ? '7 days' : '30 days'})
                  </p>
                </div>
                <div className="border border-neutral-200 rounded-xl p-4 bg-white">
                  <div className="flex items-end justify-between gap-1 h-28">
                    {data.dailyBreakdown.map((d) => {
                      const genHeight = (d.generated / maxDaily) * 100
                      const pubHeight = (d.published / maxDaily) * 100
                      const date = new Date(d.date)
                      const label = date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })
                      return (
                        <div
                          key={d.date}
                          className="flex-1 flex flex-col items-center gap-1 group relative min-w-0"
                        >
                          <div className="w-full flex items-end justify-center gap-0.5 flex-1">
                            <div
                              className="flex-1 max-w-3 bg-neutral-300 rounded-t transition-all group-hover:bg-neutral-400"
                              style={{ height: `${Math.max(genHeight, 2)}%` }}
                              title={`Generated: ${d.generated}`}
                            />
                            <div
                              className="flex-1 max-w-3 bg-green-500 rounded-t transition-all group-hover:bg-green-600"
                              style={{ height: `${Math.max(pubHeight, 2)}%` }}
                              title={`Published: ${d.published}`}
                            />
                          </div>
                          {data.dailyBreakdown.length <= 10 && (
                            <p className="text-[9px] text-neutral-500 whitespace-nowrap">
                              {label}
                            </p>
                          )}
                        </div>
                      )
                    })}
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
 
            {/* Top clients + Recent runs — 2 col grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Top clients */}
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
 
              {/* Recent runs */}
              {data.recentRuns.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-neutral-500" />
                    <p className="text-xs uppercase tracking-wider font-medium text-neutral-500">
                      Recent runs
                    </p>
                  </div>
                  <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white">
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
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
 
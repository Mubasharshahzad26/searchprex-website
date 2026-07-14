'use client'
 
import { useState } from 'react'
import { Search, ExternalLink } from 'lucide-react'
 
interface Account {
  label: string
  usedToday: number
  dailyQuota: number
}
 
interface LogEntry {
  id: string
  url: string
  type: string
  status: string
  response: string | null
  submittedAt: string
  account: { label: string }
}
 
interface Stats {
  accounts: Account[]
  submittedToday: number
  recent: LogEntry[]
  queue?: { queued: number; submitted: number }
}
 
function StatBox({
  label,
  value,
  hint,
}: {
  label: string
  value: number | string
  hint?: string
}) {
  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
      <p className="text-xs uppercase tracking-wider font-medium text-neutral-500 mb-1.5">
        {label}
      </p>
      <p className="text-2xl font-bold text-neutral-900 tabular-nums tracking-tight">
        {value}
      </p>
      {hint && (
        <p className="text-xs text-neutral-500 mt-1">{hint}</p>
      )}
    </div>
  )
}
 
export default function IndexingStats() {
  const [key, setKey] = useState('')
  const [data, setData] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
 
  const load = async () => {
    if (!key) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/indexing/submit', {
  headers: { Authorization: `Bearer ${key}` },
})
      if (res.status === 401) throw new Error('Wrong key')
      if (!res.ok) throw new Error('Failed')
      setData(await res.json())
    } catch (e) {
      setError(e instanceof Error ? e.message : 'error')
    } finally {
      setLoading(false)
    }
  }
 
  const totalQuota = data?.accounts.reduce((s, a) => s + a.dailyQuota, 0) ?? 0
  const totalUsed = data?.accounts.reduce((s, a) => s + a.usedToday, 0) ?? 0
 
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden mb-8">
      {/* Header */}
      <div className="px-6 py-5 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center">
            <Search className="w-4 h-4 text-neutral-700" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-neutral-900">Google Indexing</h2>
            {data && (
              <p className="text-xs text-neutral-500">
                {totalUsed}/{totalQuota} quota used across {data.accounts.length} accounts
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="password"
            placeholder="Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-100 w-32"
          />
          <button
            onClick={load}
            disabled={!key || loading}
            className="px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 disabled:opacity-40 transition-colors"
          >
            {loading ? 'Loading...' : 'Load Stats'}
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
            Enter your key and click Load Stats to see indexing API quota usage.
          </p>
        )}
 
        {data && (
          <div className="space-y-6">
            {/* Summary stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatBox
                label="Submitted Today"
                value={data.submittedToday}
                hint="Total URLs submitted"
              />
              <StatBox
                label="Total Quota"
                value={`${totalUsed}/${totalQuota}`}
                hint={`${totalQuota - totalUsed} remaining`}
              />
              {data.queue && (
                <>
                  <StatBox
                    label="Backlog Queued"
                    value={data.queue.queued}
                    hint="Awaiting submission"
                  />
                  <StatBox
                    label="Backlog Submitted"
                    value={data.queue.submitted}
                    hint="Total submitted"
                  />
                </>
              )}
            </div>
 
            {/* Per-account usage */}
            <div>
              <p className="text-xs uppercase tracking-wider font-medium text-neutral-500 mb-3">
                Account Quota Usage
              </p>
              <div className="space-y-2">
                {data.accounts.map((acc) => {
                  const pct = acc.dailyQuota
                    ? Math.min(100, Math.round((acc.usedToday / acc.dailyQuota) * 100))
                    : 0
                  const isExhausted = pct >= 100
                  const isHigh = pct >= 80 && pct < 100
 
                  return (
                    <div
                      key={acc.label}
                      className="border border-neutral-200 rounded-xl p-3 bg-white"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-neutral-900">
                          {acc.label}
                        </p>
                        <p className="text-sm text-neutral-600 tabular-nums font-medium">
                          {acc.usedToday}
                          <span className="text-neutral-400"> / {acc.dailyQuota}</span>
                        </p>
                      </div>
                      <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            isExhausted
                              ? 'bg-red-500'
                              : isHigh
                                ? 'bg-amber-500'
                                : 'bg-green-500'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
 
            {/* Recent submissions */}
            {data.recent.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-wider font-medium text-neutral-500 mb-3">
                  Recent Submissions ({data.recent.length})
                </p>
                <div className="border border-neutral-200 rounded-xl overflow-hidden">
                  <div className="max-h-72 overflow-y-auto">
                    {data.recent.map((r, i) => (
                      <div
                        key={r.id}
                        className={`flex items-center gap-3 px-4 py-3 text-xs ${
                          i !== 0 ? 'border-t border-neutral-100' : ''
                        }`}
                      >
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${
                            r.status === 'submitted'
                              ? 'bg-green-50 text-green-700 border-green-200'
                              : 'bg-red-50 text-red-700 border-red-200'
                          }`}
                        >
                          {r.status}
                        </span>
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-900 hover:text-orange-600 flex-1 truncate inline-flex items-center gap-1 transition-colors"
                        >
                          {r.url}
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        </a>
                        <span className="text-neutral-500 whitespace-nowrap">
                          {r.account.label}
                        </span>
                        <span className="text-neutral-400 whitespace-nowrap tabular-nums">
                          {new Date(r.submittedAt).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
 
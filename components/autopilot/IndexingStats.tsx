'use client'

import { useState } from 'react'

type Account = { label: string; usedToday: number; dailyQuota: number }
type LogItem = {
  id: string
  url: string
  type: string
  status: string
  submittedAt: string
  account: { label: string }
}
type Stats = {
  accounts: Account[]
  submittedToday: number
  recent: LogItem[]
  queue?: { queued: number; submitted: number }
}

export default function IndexingStats() {
  const [key, setKey] = useState('')
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/indexing/submit', {
        headers: { Authorization: `Bearer ${key}` },
      })
      if (res.status === 401) throw new Error('Wrong key')
      setStats(await res.json())
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Load failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-8 bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-lg font-bold text-white">
          🔍 Google Indexing{' '}
          {stats && (
            <span className="text-[#818cf8]">({stats.submittedToday} today)</span>
          )}
        </h2>
        <div className="flex gap-2">
          <input
            type="password"
            placeholder="Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1] text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#818cf8] w-40"
          />
          <button
            onClick={load}
            disabled={!key || loading}
            className="px-4 py-2 rounded-lg bg-[#818cf8] text-white text-sm font-semibold disabled:opacity-40 hover:bg-[#6b76e8] transition"
          >
            {loading ? '...' : 'Load Stats'}
          </button>
        </div>
      </div>

      {error && <p className="text-red-400 text-sm px-6 py-4">{error}</p>}

      {stats && (
        <div className="p-6">
          {/* Quota bars per account */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {stats.accounts.map((a) => {
              const pct = Math.min(100, Math.round((a.usedToday / a.dailyQuota) * 100))
              return (
                <div
                  key={a.label}
                  className="border border-white/[0.08] bg-white/[0.02] rounded-xl p-4"
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white font-semibold">{a.label}</span>
                    <span className="text-white/50">
                      {a.usedToday} / {a.dailyQuota}
                    </span>
                  </div>
                  <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        pct > 90 ? 'bg-red-400' : pct > 60 ? 'bg-amber-400' : 'bg-[#818cf8]'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Backlog queue status */}
          {stats.queue && (
            <div className="flex gap-4 mb-6 flex-wrap">
              <div className="px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <p className="text-xl font-bold text-amber-400">{stats.queue.queued}</p>
                <p className="text-[10px] text-amber-400/70 font-bold tracking-wide">
                  BACKLOG QUEUED
                </p>
              </div>
              <div className="px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20">
                <p className="text-xl font-bold text-green-400">{stats.queue.submitted}</p>
                <p className="text-[10px] text-green-400/70 font-bold tracking-wide">
                  BACKLOG SUBMITTED
                </p>
              </div>
            </div>
          )}

          {/* Recent submissions */}
          <p className="text-xs font-bold text-white/40 mb-2 tracking-wide">
            RECENT SUBMISSIONS
          </p>
          <div className="border border-white/[0.08] rounded-xl overflow-hidden max-h-64 overflow-y-auto">
            {stats.recent.length === 0 && (
              <p className="text-white/30 text-sm p-4">No submissions yet.</p>
            )}
            {stats.recent.map((log, i) => (
              <div
                key={log.id}
                className={`px-4 py-2.5 flex justify-between items-center gap-3 text-xs ${
                  i > 0 ? 'border-t border-white/[0.04]' : ''
                } ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}
              >
                <span className="text-white/60 truncate flex-1">
                  {log.url.replace('https://www.smkstore.com', '')}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full font-bold ${
                    log.status === 'submitted'
                      ? 'bg-green-500/15 text-green-400'
                      : 'bg-red-500/15 text-red-400'
                  }`}
                >
                  {log.status}
                </span>
                <span className="text-white/30 shrink-0">{log.type}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
  )
}
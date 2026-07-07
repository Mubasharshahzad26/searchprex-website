'use client'

import { useState } from 'react'

type Insight = {
  id: string
  pageUrl: string
  category: string
  priority: number
  reason: string
  actionTaken: string | null
}
type Lists = {
  content_needs_improvement: Insight[]
  indexed_underperformer: Insight[]
  not_indexed: Insight[]
}
type Counts = {
  content_needs_improvement: number
  indexed_underperformer: number
  not_indexed: number
  total: number
}
type Data = { runId: string; counts: Counts; lists: Lists }

const CATEGORY_META = {
  content_needs_improvement: {
    label: 'Content Needs Improvement',
    color: 'amber',
    icon: '✍️',
    action: 'Send to Content Pipeline',
    actionType: 'content',
  },
  indexed_underperformer: {
    label: 'Indexed Underperformers',
    color: 'blue',
    icon: '📉',
    action: 'Send to Content Pipeline',
    actionType: 'content',
  },
  not_indexed: {
    label: 'Not Indexed',
    color: 'red',
    icon: '🚫',
    action: 'Send to Backlog Queue',
    actionType: 'backlog',
  },
} as const

const COLOR_STYLES: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    text: 'text-amber-400',
    badge: 'bg-amber-500/15 text-amber-400',
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-400',
    badge: 'bg-blue-500/15 text-blue-400',
  },
  red: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    text: 'text-red-400',
    badge: 'bg-red-500/15 text-red-400',
  },
}

export default function AuditStats() {
  const [runId, setRunId] = useState('cmr9y0e7n0000g0ur39vkua8r')
  const [key, setKey] = useState('')
  const [data, setData] = useState<Data | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [sending, setSending] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/audit/insights?runId=${runId}`, {
        headers: { Authorization: `Bearer ${key}` },
      })
      if (res.status === 401) throw new Error('Wrong key')
      if (!res.ok) throw new Error(`Failed: ${res.status}`)
      setData(await res.json())
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Load failed')
    } finally {
      setLoading(false)
    }
  }

  const sendToPipeline = async (category: keyof typeof CATEGORY_META) => {
    if (!data) return
    const meta = CATEGORY_META[category]
    if (!confirm(`Send ${data.counts[category]} pages to ${meta.action}?`)) return
    setSending(category)
    try {
      const res = await fetch('/api/audit/send-to-pipeline', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ runId: data.runId, category, actionType: meta.actionType }),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Failed')
      alert(`✅ ${result.processed} pages sent to ${meta.action}!`)
      await load()
    } catch (e) {
      alert(`❌ ${e instanceof Error ? e.message : 'Failed'}`)
    } finally {
      setSending(null)
    }
  }

  return (
    <div className="mt-8 bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-lg font-bold text-white">
          📊 Site Audit{' '}
          {data && <span className="text-[#818cf8]">({data.counts.total} insights)</span>}
        </h2>
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Audit runId"
            value={runId}
            onChange={(e) => setRunId(e.target.value)}
            className="px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1] text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#818cf8] w-56 font-mono"
          />
          <input
            type="password"
            placeholder="Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1] text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#818cf8] w-40"
          />
          <button
            onClick={load}
            disabled={!key || !runId || loading}
            className="px-4 py-2 rounded-lg bg-[#818cf8] text-white text-sm font-semibold disabled:opacity-40 hover:bg-[#6b76e8] transition"
          >
            {loading ? '...' : 'Load Insights'}
          </button>
        </div>
      </div>

      {error && <p className="text-red-400 text-sm px-6 py-4">{error}</p>}

      {data && (
        <div className="p-6 space-y-4">
          {(Object.keys(CATEGORY_META) as Array<keyof typeof CATEGORY_META>).map((cat) => {
            const meta = CATEGORY_META[cat]
            const style = COLOR_STYLES[meta.color]
            const items = data.lists[cat] || []
            const count = items.length
            const isOpen = expanded === cat
            return (
              <div key={cat} className={`rounded-xl border ${style.border} ${style.bg}`}>
                <div className="px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
                  <button
                    onClick={() => setExpanded(isOpen ? null : cat)}
                    className="flex items-center gap-3 text-left flex-1 min-w-0"
                  >
                    <span className="text-xl">{meta.icon}</span>
                    <div className="min-w-0">
                      <p className={`text-sm font-bold ${style.text}`}>{meta.label}</p>
                      <p className="text-xs text-white/50">{count} pages</p>
                    </div>
                  </button>
                  {count > 0 && (
                    <button
                      onClick={() => sendToPipeline(cat)}
                      disabled={sending === cat}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs font-semibold disabled:opacity-40"
                    >
                      {sending === cat ? 'Sending...' : `🎯 ${meta.action}`}
                    </button>
                  )}
                </div>
                {isOpen && count > 0 && (
                  <div className="border-t border-white/[0.06] max-h-64 overflow-y-auto">
                    {items.slice(0, 50).map((it, i) => (
                      <div
                        key={it.id}
                        className={`px-4 py-2.5 flex items-start gap-3 text-xs ${i > 0 ? 'border-t border-white/[0.04]' : ''}`}
                      >
                        <span className={`px-2 py-0.5 rounded-full font-bold shrink-0 ${style.badge}`}>P{it.priority}</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-white/70 truncate">{it.pageUrl.replace(/^https?:\/\/[^/]+/, '')}</p>
                          <p className="text-white/40 mt-0.5">{it.reason}</p>
                        </div>
                        {it.actionTaken && (
                          <span className="text-green-400 text-[10px] shrink-0">✓ {it.actionTaken}</span>
                        )}
                      </div>
                    ))}
                    {count > 50 && (
                      <div className="px-4 py-2 text-white/40 text-xs text-center border-t border-white/[0.04]">
                        + {count - 50} more...
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
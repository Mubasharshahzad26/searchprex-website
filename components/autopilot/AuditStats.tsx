'use client'
 
import { useState } from 'react'
import {
  BarChart3,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle2,
  FileEdit,
  TrendingDown,
  Ban,
} from 'lucide-react'
 
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
    tone: 'amber',
    icon: FileEdit,
    action: 'Send to Content Pipeline',
    actionType: 'content',
  },
  indexed_underperformer: {
    label: 'Indexed Underperformers',
    tone: 'blue',
    icon: TrendingDown,
    action: 'Send to Content Pipeline',
    actionType: 'content',
  },
  not_indexed: {
    label: 'Not Indexed',
    tone: 'red',
    icon: Ban,
    action: 'Send to Backlog Queue',
    actionType: 'backlog',
  },
} as const
 
const TONE_STYLES: Record<
  string,
  {
    iconBg: string
    iconText: string
    priorityBadge: string
  }
> = {
  amber: {
    iconBg: 'bg-amber-50',
    iconText: 'text-amber-600',
    priorityBadge: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  blue: {
    iconBg: 'bg-blue-50',
    iconText: 'text-blue-600',
    priorityBadge: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  red: {
    iconBg: 'bg-red-50',
    iconText: 'text-red-600',
    priorityBadge: 'bg-red-50 text-red-700 border-red-200',
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
      alert(`${result.processed} pages sent to ${meta.action}`)
      await load()
    } catch (e) {
      alert(`${e instanceof Error ? e.message : 'Failed'}`)
    } finally {
      setSending(null)
    }
  }
 
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden mb-8">
      {/* Header */}
      <div className="px-6 py-5 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-neutral-700" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-neutral-900">Site Audit</h2>
            {data && (
              <p className="text-xs text-neutral-500">
                {data.counts.total} insights across {Object.keys(CATEGORY_META).length} categories
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Audit runId"
            value={runId}
            onChange={(e) => setRunId(e.target.value)}
            className="bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-100 w-52 font-mono"
          />
          <input
            type="password"
            placeholder="Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-100 w-32"
          />
          <button
            onClick={load}
            disabled={!key || !runId || loading}
            className="px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 disabled:opacity-40 transition-colors"
          >
            {loading ? 'Loading...' : 'Load Insights'}
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
            Enter runId and key, then click Load Insights to view audit categories.
          </p>
        )}
 
        {data && (
          <div className="space-y-3">
            {(Object.keys(CATEGORY_META) as Array<keyof typeof CATEGORY_META>).map((cat) => {
              const meta = CATEGORY_META[cat]
              const style = TONE_STYLES[meta.tone]
              const Icon = meta.icon
              const items = data.lists[cat] || []
              const count = items.length
              const isOpen = expanded === cat
 
              return (
                <div
                  key={cat}
                  className="border border-neutral-200 rounded-xl bg-white hover:border-neutral-300 transition-colors overflow-hidden"
                >
                  <div className="px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
                    <button
                      onClick={() => setExpanded(isOpen ? null : cat)}
                      className="flex items-center gap-3 text-left flex-1 min-w-0"
                    >
                      <div
                        className={`w-9 h-9 rounded-lg ${style.iconBg} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className={`w-4 h-4 ${style.iconText}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-neutral-900">{meta.label}</p>
                        <p className="text-xs text-neutral-500">{count} pages</p>
                      </div>
                      <div className="ml-auto flex items-center gap-2">
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-neutral-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-neutral-400" />
                        )}
                      </div>
                    </button>
                    {count > 0 && (
                      <button
                        onClick={() => sendToPipeline(cat)}
                        disabled={sending === cat}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 disabled:opacity-40 transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                        {sending === cat ? 'Sending...' : meta.action}
                      </button>
                    )}
                  </div>
                  {isOpen && count > 0 && (
                    <div className="border-t border-neutral-200 max-h-72 overflow-y-auto">
                      {items.slice(0, 50).map((it, i) => (
                        <div
                          key={it.id}
                          className={`px-4 py-2.5 flex items-start gap-3 text-xs ${
                            i > 0 ? 'border-t border-neutral-100' : ''
                          }`}
                        >
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border flex-shrink-0 ${style.priorityBadge}`}
                          >
                            P{it.priority}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-neutral-900 font-medium truncate">
                              {it.pageUrl.replace(/^https?:\/\/[^/]+/, '')}
                            </p>
                            <p className="text-neutral-500 mt-0.5">{it.reason}</p>
                          </div>
                          {it.actionTaken && (
                            <span className="inline-flex items-center gap-1 text-green-700 text-[10px] flex-shrink-0 font-medium">
                              <CheckCircle2 className="w-3 h-3" />
                              {it.actionTaken}
                            </span>
                          )}
                        </div>
                      ))}
                      {count > 50 && (
                        <div className="px-4 py-2 text-neutral-500 text-xs text-center border-t border-neutral-100 bg-neutral-50">
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
    </div>
  )
}
 
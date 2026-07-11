'use client'
 
import { useState, useMemo } from 'react'
import {
  FileText,
  Search,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
} from 'lucide-react'
 
interface Page {
  id: string
  pageUrl: string
  status: string
  gscImpressions: number
  gscClicks: number
  gscPosition: number | null
  generatedContent: any
  publishAt?: string | null
  run: {
    id: string
    clientId: string
    startedAt: string
    dryRun: boolean
  }
}
 
const PUBLISH_OPTIONS = [
  { value: 'approve_only', label: 'Approve only' },
  { value: 'now', label: 'Publish now' },
  { value: 'in_1_day', label: 'Publish in 1 day' },
  { value: 'in_3_days', label: 'Publish in 3 days' },
  { value: 'in_7_days', label: 'Publish in 7 days' },
]
 
function fmtNum(n: number | null | undefined) {
  return n == null ? '-' : n.toLocaleString()
}
 
function fmtPos(p: number | null) {
  return p == null ? '-' : p.toFixed(1)
}
 
export default function PendingReview() {
  const [key, setKey] = useState('')
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [acting, setActing] = useState<string | null>(null)
  const [openId, setOpenId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [pubDropdown, setPubDropdown] = useState<string | null>(null)
 
  const load = async () => {
    if (!key) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/autopilot/approve?status=pending', {
        headers: { Authorization: `Bearer ${key}` },
      })
      if (res.status === 401) throw new Error('Wrong review key')
      if (!res.ok) throw new Error('Failed to load')
      const data = await res.json()
      setPages(data.pages || [])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'error')
    } finally {
      setLoading(false)
    }
  }
 
  const act = async (pageId: string, publishAction: string) => {
    if (acting) return
    setActing(pageId)
    setPubDropdown(null)
    try {
      const body: any = {
        pageId,
        action: publishAction === 'reject' ? 'reject' : 'approve',
      }
      if (publishAction === 'now') body.publishNow = true
      else if (publishAction === 'in_1_day') body.publishInDays = 1
      else if (publishAction === 'in_3_days') body.publishInDays = 3
      else if (publishAction === 'in_7_days') body.publishInDays = 7
 
      const res = await fetch('/api/autopilot/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error('Failed')
      setPages((prev) => prev.filter((p) => p.id !== pageId))
    } catch {
      setError('Action failed')
    } finally {
      setActing(null)
    }
  }
 
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return pages
    return pages.filter((p) => p.pageUrl.toLowerCase().includes(q))
  }, [pages, search])
 
  const renderContent = (c: any) => {
    if (!c) return <p className="text-sm text-neutral-400">No content</p>
    return (
      <div className="space-y-4 text-sm">
        {c.metaTitle && (
          <div>
            <p className="text-xs uppercase tracking-wider font-medium text-neutral-500 mb-1">Meta Title</p>
            <p className="text-neutral-900">{c.metaTitle}</p>
          </div>
        )}
        {c.metaDescription && (
          <div>
            <p className="text-xs uppercase tracking-wider font-medium text-neutral-500 mb-1">Meta Description</p>
            <p className="text-neutral-700">{c.metaDescription}</p>
          </div>
        )}
        {c.h1Title && (
          <div>
            <p className="text-xs uppercase tracking-wider font-medium text-neutral-500 mb-1">H1</p>
            <p className="text-neutral-900 font-semibold">{c.h1Title}</p>
          </div>
        )}
        {c.contentBody && (
          <div>
            <p className="text-xs uppercase tracking-wider font-medium text-neutral-500 mb-1">Content Preview</p>
            <div
              className="text-neutral-700 line-clamp-6 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: c.contentBody.slice(0, 800) + '\u2026' }}
            />
          </div>
        )}
        {c.faqs?.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-wider font-medium text-neutral-500 mb-2">FAQs ({c.faqs.length})</p>
            <div className="space-y-2">
              {c.faqs.slice(0, 3).map((f: any, i: number) => (
                <div key={i} className="bg-neutral-50 rounded-lg p-3 border border-neutral-200">
                  <p className="text-neutral-900 font-medium mb-1">Q: {f.question}</p>
                  <p className="text-neutral-600 text-xs">A: {f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
 
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden mb-8">
      <div className="px-6 py-5 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center">
            <FileText className="w-4 h-4 text-neutral-700" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-neutral-900">Pending Review</h2>
            {pages.length > 0 && (
              <p className="text-xs text-neutral-500">{pages.length} pages awaiting your approval</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="password"
            placeholder="Review key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-100 w-44"
          />
          <button
            onClick={load}
            disabled={!key || loading}
            className="px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 disabled:opacity-40 transition-colors"
          >
            {loading ? 'Loading...' : 'Load Pending'}
          </button>
        </div>
      </div>
 
      <div className="p-6">
        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200">
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        )}
 
        {!pages.length && !error && (
          <div className="text-center py-8">
            <p className="text-sm text-neutral-500">
              Enter your review key and click Load Pending to see pages awaiting approval.
            </p>
          </div>
        )}
 
        {pages.length > 0 && (
          <>
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by URL..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-neutral-200 rounded-lg pl-10 pr-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-100"
              />
            </div>
 
            {filtered.length === 0 && (
              <p className="text-sm text-neutral-500 text-center py-6">No results for &quot;{search}&quot;</p>
            )}
 
            <div className="space-y-3">
              {filtered.map((p) => {
                const c = p.generatedContent
                const isOpen = openId === p.id
                const isPubOpen = pubDropdown === p.id
                const scheduled = p.publishAt ? new Date(p.publishAt) : null
                const isFuture = scheduled && scheduled.getTime() > Date.now()
 
                return (
                  <div key={p.id} className="border border-neutral-200 rounded-xl p-4 bg-white hover:border-neutral-300 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <a
                          href={p.pageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-neutral-900 hover:text-orange-600 break-all inline-flex items-center gap-1.5 transition-colors"
                        >
                          {p.pageUrl}
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        </a>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-neutral-500">
                          <span className="tabular-nums">{fmtNum(p.gscImpressions)} impressions</span>
                          <span>&middot;</span>
                          <span className="tabular-nums">{fmtNum(p.gscClicks)} clicks</span>
                          <span>&middot;</span>
                          <span className="tabular-nums">pos {fmtPos(p.gscPosition)}</span>
                          {p.run.dryRun && (
                            <>
                              <span>&middot;</span>
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-semibold uppercase tracking-wider">Dry Run</span>
                            </>
                          )}
                          {isFuture && scheduled && (
                            <>
                              <span>&middot;</span>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-semibold">
                                <Clock className="w-3 h-3" />
                                Publishes {scheduled.toLocaleDateString()}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
 
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => setOpenId(isOpen ? null : p.id)}
                          className="p-2 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-600 transition-colors"
                          title={isOpen ? 'Hide' : 'Preview'}
                        >
                          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
 
                        <div className="relative">
                          <button
                            onClick={() => setPubDropdown(isPubOpen ? null : p.id)}
                            disabled={acting === p.id}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 disabled:opacity-40 transition-colors"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Approve
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                          {isPubOpen && (
                            <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-neutral-200 rounded-xl shadow-lg z-10 overflow-hidden">
                              {PUBLISH_OPTIONS.map((opt) => (
                                <button
                                  key={opt.value}
                                  onClick={() => act(p.id, opt.value)}
                                  className="w-full text-left px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
 
                        <button
                          onClick={() => act(p.id, 'reject')}
                          disabled={acting === p.id}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm font-semibold hover:bg-red-100 disabled:opacity-40 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    </div>
 
                    {c?.metaDescription && !isOpen && (
                      <p className="mt-3 text-sm text-neutral-500 line-clamp-1">
                        <span className="font-medium text-neutral-600">Meta:</span> {c.metaDescription}
                      </p>
                    )}
 
                    {isOpen && (
                      <div className="mt-4 pt-4 border-t border-neutral-200">
                        {renderContent(c)}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
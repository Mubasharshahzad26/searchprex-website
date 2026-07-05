'use client'

import { useState } from 'react'

type PendingPage = {
  id: string
  pageUrl: string
  gscImpressions: number
  gscClicks: number
  gscPosition: number | null
  status: string
  generatedContent: any
  createdAt: string
  run: { id: string; clientId: string; startedAt: string; dryRun: boolean }
}

export default function PendingReview() {
  const [key, setKey] = useState('')
  const [pages, setPages] = useState<PendingPage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [openId, setOpenId] = useState<string | null>(null)
  const [acting, setActing] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/autopilot/approve?status=pending', {
        headers: { Authorization: `Bearer ${key}` },
      })
      if (res.status === 401) throw new Error('Wrong review key')
      const data = await res.json()
      setPages(data.pages || [])
      setLoaded(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Load failed')
    } finally {
      setLoading(false)
    }
  }

  const act = async (pageId: string, action: 'approve' | 'reject') => {
    setActing(pageId)
    try {
      const res = await fetch('/api/autopilot/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({ pageId, action }),
      })
      if (!res.ok) throw new Error('Action failed')
      setPages((p) => p.filter((x) => x.id !== pageId))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Action failed')
    } finally {
      setActing(null)
    }
  }

  const renderContent = (c: any) => {
    if (!c) return <p className="text-white/30 text-sm">No content stored</p>
    return (
      <div className="text-sm leading-relaxed text-white/70">
        {c.title && (
          <p className="mb-1">
            <span className="text-white/40">Title:</span>{' '}
            <span className="text-white">{c.title}</span>
          </p>
        )}
        {c.metaDescription && (
          <p className="mb-2">
            <span className="text-white/40">Meta:</span> {c.metaDescription}
          </p>
        )}
        <div className="flex flex-wrap gap-4 my-2 text-xs text-white/50">
          {c.wordCount && <span>📝 {c.wordCount} words</span>}
          {c.eeatScore && <span>⭐ E-E-A-T: {c.eeatScore}</span>}
          {c.hcuCompliant !== undefined && (
            <span>{c.hcuCompliant ? '✅ HCU Compliant' : '⚠️ HCU Check'}</span>
          )}
        </div>
        {c.description && (
          <div className="border border-white/[0.08] bg-white/[0.02] rounded-xl p-4 max-h-72 overflow-auto whitespace-pre-wrap">
            {c.description}
          </div>
        )}
        {Array.isArray(c.imageSuggestions) && c.imageSuggestions.length > 0 && (
          <details className="mt-3">
            <summary className="cursor-pointer font-semibold text-white/60">
              🖼️ Image Suggestions ({c.imageSuggestions.length})
            </summary>
            <ul className="pl-5 mt-2 list-disc space-y-1">
              {c.imageSuggestions.map((img: any, i: number) => (
                <li key={i}>
                  <span className="text-white">{img.alt}</span>
                  <span className="text-white/40"> — {img.placement}</span>
                </li>
              ))}
            </ul>
          </details>
        )}
        <details className="mt-3">
          <summary className="cursor-pointer text-white/30">Raw JSON</summary>
          <pre className="bg-black/40 border border-white/[0.06] rounded-xl p-4 max-h-72 overflow-auto whitespace-pre-wrap text-xs mt-2">
            {JSON.stringify(c, null, 2)}
          </pre>
        </details>
      </div>
    )
  }

  return (
    <div className="mt-8 bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-lg font-bold text-white">
          📝 Pending Review{' '}
          {pages.length > 0 && (
            <span className="text-[#818cf8]">({pages.length})</span>
          )}
        </h2>
        <div className="flex gap-2">
          <input
            type="password"
            placeholder="Review key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1] text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#818cf8] w-52"
          />
          <button
            onClick={load}
            disabled={!key || loading}
            className="px-4 py-2 rounded-lg bg-[#818cf8] text-white text-sm font-semibold disabled:opacity-40 hover:bg-[#6b76e8] transition"
          >
            {loading ? 'Loading...' : 'Load Pending'}
          </button>
        </div>
      </div>

      <div className="p-6">
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        {!loading && loaded && pages.length === 0 && !error && (
          <p className="text-white/30 text-sm">
            No pending pages. Agla run wait karo.
          </p>
        )}
        {!loaded && !error && (
          <p className="text-white/30 text-sm">
            Review key daal kar Load Pending dabao.
          </p>
        )}

        {pages.map((p) => (
          <div
            key={p.id}
            className="border border-white/[0.08] bg-white/[0.02] rounded-xl p-5 mb-4"
          >
            <div className="flex justify-between flex-wrap gap-3">
              <div className="min-w-0">
                
                  <a
                
                    href={p.pageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-[#818cf8] hover:underline break-all"
                >
                  {p.pageUrl}
                </a>
                <p className="text-xs text-white/40 mt-1">
                  {p.gscImpressions} impressions · {p.gscClicks} clicks
                  {p.gscPosition ? ` · pos ${p.gscPosition.toFixed(1)}` : ''}
                  {p.run?.dryRun ? ' · DRY RUN' : ''}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setOpenId(openId === p.id ? null : p.id)}
                  className="px-4 py-1.5 rounded-lg border border-white/[0.15] text-white/70 text-sm hover:bg-white/[0.05] transition"
                >
                  {openId === p.id ? 'Hide' : 'Preview'}
                </button>
                <button
                  onClick={() => act(p.id, 'approve')}
                  disabled={acting === p.id}
                  className="px-4 py-1.5 rounded-lg bg-green-500/15 text-green-400 text-sm font-semibold hover:bg-green-500/25 disabled:opacity-40 transition"
                >
                  ✓ Approve
                </button>
                <button
                  onClick={() => act(p.id, 'reject')}
                  disabled={acting === p.id}
                  className="px-4 py-1.5 rounded-lg bg-red-500/15 text-red-400 text-sm font-semibold hover:bg-red-500/25 disabled:opacity-40 transition"
                >
                  ✕ Reject
                </button>
              </div>
            </div>
            {openId === p.id && (
              <div className="mt-4 pt-4 border-t border-white/[0.06]">
                {renderContent(p.generatedContent)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
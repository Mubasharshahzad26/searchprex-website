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

  const act = async (
    pageId: string,
    action: 'approve' | 'reject',
    publishAt?: string,
  ) => {
    setActing(pageId)
    try {
      const res = await fetch('/api/autopilot/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({ pageId, action, ...(publishAt ? { publishAt } : {}) }),
      })
      if (!res.ok) throw new Error('Action failed')
      setPages((p) => p.filter((x) => x.id !== pageId))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Action failed')
    } finally {
      setActing(null)
    }
  }

  const scheduleOptions = [
    { label: 'Approve only', value: '' },
    { label: 'Publish now', value: 'now' },
    { label: 'Publish in 1 day', value: '1' },
    { label: 'Publish in 3 days', value: '3' },
    { label: 'Publish in 7 days', value: '7' },
  ]

  const approveWith = (pageId: string, choice: string) => {
    if (choice === '') return act(pageId, 'approve')
    const publishAt =
      choice === 'now'
        ? new Date().toISOString()
        : new Date(Date.now() + parseInt(choice) * 24 * 60 * 60 * 1000).toISOString()
    return act(pageId, 'approve', publishAt)
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
        {c._keywordPack?.primary && (
          <div className="border border-[#818cf8]/30 bg-[#818cf8]/5 rounded-xl p-4 my-3">
            <p className="text-xs font-bold text-[#a5b4fc] mb-2">
              🎯 KEYWORD TARGETS (GSC 90-day data)
            </p>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2 py-1 rounded-md bg-[#818cf8]/20 text-[#c7d2fe] text-xs font-bold">
                PRIMARY: {c._keywordPack.primary.query}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  c._keywordPack.primary.category === 'striking_distance'
                    ? 'bg-green-500/15 text-green-400'
                    : c._keywordPack.primary.category === 'ctr_gap'
                      ? 'bg-amber-500/15 text-amber-400'
                      : 'bg-blue-500/15 text-blue-400'
                }`}
              >
                {c._keywordPack.primary.category.replace('_', ' ')}
              </span>
              <span className="text-[10px] text-white/40">
                pos {c._keywordPack.primary.position.toFixed(1)} ·{' '}
                {c._keywordPack.primary.impressions} imp ·{' '}
                {c._keywordPack.primary.intent}
              </span>
            </div>
            {c._keywordPack.secondary?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {c._keywordPack.secondary.map((s: any, i: number) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-white/[0.05] text-white/60 text-[11px]"
                    title={`pos ${s.position.toFixed(1)} · ${s.impressions} imp · ${s.category} · ${s.intent}`}
                  >
                    {s.query}
                  </span>
                ))}
              </div>
            )}
          </div>
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
                <select
                  onChange={(e) => {
                    if (e.target.value !== '_') approveWith(p.id, e.target.value)
                    e.target.value = '_'
                  }}
                  disabled={acting === p.id}
                  defaultValue="_"
                  className="px-3 py-1.5 rounded-lg bg-green-500/15 text-green-400 text-sm font-semibold border-0 cursor-pointer hover:bg-green-500/25 disabled:opacity-40"
                >
                  <option value="_" disabled>
                    ✓ Approve...
                  </option>
                  {scheduleOptions.map((o) => (
                    <option
                      key={o.value}
                      value={o.value}
                      style={{ background: '#1a1a2e', color: '#fff' }}
                    >
                      {o.label}
                    </option>
                  ))}
                </select>
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
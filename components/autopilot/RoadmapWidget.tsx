'use client'

import { useState } from 'react'

type Task = {
  title: string
  description: string
  category: 'autopilot' | 'manual_dev' | 'manual_seo' | 'growth'
  priority: 'P0' | 'P1' | 'P2'
  effort: 'Low' | 'Medium' | 'High'
  impact: 'Low' | 'Medium' | 'High'
  affectedPages: number
  expectedOutcome: string
  canAutopilotHandle?: boolean
  autopilotAction?: string
}
type Month = { month: number; theme: string; focus: string; tasks: Task[] }
type Plan = {
  executiveSummary: string
  healthScore: number
  healthBreakdown: { technical: number; onPage: number; content: number; indexing: number }
  months: Month[]
  expectedMetrics: any
  investmentEstimation: any
  risksAndAssumptions?: string[]
}
type Roadmap = { id: string; plan: Plan; auditData?: any }

const CATEGORY = {
  autopilot: { emoji: '✨', label: 'Autopilot', color: 'text-[#818cf8]', bg: 'bg-[#818cf8]/10' },
  manual_dev: { emoji: '👤', label: 'Dev', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  manual_seo: { emoji: '🌐', label: 'SEO', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  growth: { emoji: '🚀', label: 'Growth', color: 'text-green-400', bg: 'bg-green-500/10' },
} as const

const PRIORITY_COLOR: Record<string, string> = {
  P0: 'bg-red-500/20 text-red-400',
  P1: 'bg-amber-500/20 text-amber-400',
  P2: 'bg-white/10 text-white/60',
}

const INDUSTRIES = [
  'ecommerce_woocommerce',
  'ecommerce_shopify',
  'ecommerce_general',
  'law_firm_family',
  'law_firm_personal_injury',
  'law_firm_criminal_defense',
  'local_service_hvac',
  'local_service_plumbing',
  'local_service_dental',
  'local_service_restaurant',
  'saas_b2b',
  'content_publisher',
  'general',
]

export default function RoadmapWidget() {
  const [key, setKey] = useState('')
  const [auditRunId, setAuditRunId] = useState('cmr9y0e7n0000g0ur39vkua8r')
  const [industry, setIndustry] = useState('ecommerce_woocommerce')
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [expandedMonth, setExpandedMonth] = useState<number | null>(1)

  const loadLatest = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/roadmap?auditRunId=${auditRunId}`, {
        headers: { Authorization: `Bearer ${key}` },
      })
      if (res.status === 404) {
        setError('No roadmap yet — click Generate to create one')
        return
      }
      if (!res.ok) throw new Error(`Load failed: ${res.status}`)
      const data = await res.json()
      setRoadmap({ id: data.id, plan: data.plan, auditData: null })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Load failed')
    } finally {
      setLoading(false)
    }
  }

  const generate = async () => {
    if (!confirm('Generate a new AI roadmap? Takes ~45 seconds.')) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/roadmap', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auditRunId,
          clientId: 'cmr6ly1kd0000l4ur3379olx1',
          industry,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Generation failed')
      setRoadmap(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Generate failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-8 bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-lg font-bold text-white">
          🎯 AI SEO Roadmap
          {roadmap && (
            <span className="text-[#818cf8] ml-2 text-sm">
              (Score: {roadmap.plan.healthScore}/100)
            </span>
          )}
        </h2>
        <div className="flex gap-2 flex-wrap">
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-[#818cf8]"
          >
            {INDUSTRIES.map((i) => (
              <option key={i} value={i} className="bg-[#0a0f2e]">
                {i}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Audit runId"
            value={auditRunId}
            onChange={(e) => setAuditRunId(e.target.value)}
            className="px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1] text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#818cf8] w-56 font-mono"
          />
          <input
            type="password"
            placeholder="Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1] text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#818cf8] w-32"
          />
          <button
            onClick={loadLatest}
            disabled={!key || loading}
            className="px-3 py-2 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs font-semibold disabled:opacity-40"
          >
            Load Latest
          </button>
          <button
            onClick={generate}
            disabled={!key || loading}
            className="px-4 py-2 rounded-lg bg-[#818cf8] hover:bg-[#6b76e8] text-white text-xs font-bold disabled:opacity-40"
          >
            {loading ? '⏳ Generating...' : '🎯 Generate'}
          </button>
        </div>
      </div>

      {error && <p className="text-red-400 text-sm px-6 py-4">{error}</p>}

      {roadmap && (
        <div className="p-6 space-y-6">
          {/* Health Score */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div className="p-4 bg-[#818cf8]/10 border border-[#818cf8]/20 rounded-xl">
              <p className="text-[10px] font-bold text-[#818cf8]/80 tracking-wide">HEALTH</p>
              <p className="text-3xl font-black text-[#818cf8] mt-1">
                {roadmap.plan.healthScore}
              </p>
              <p className="text-[10px] text-white/50 mt-0.5">/ 100</p>
            </div>
            {(['technical', 'onPage', 'content', 'indexing'] as const).map((k) => (
              <div key={k} className="p-4 bg-white/[0.03] border border-white/[0.08] rounded-xl">
                <p className="text-[10px] font-bold text-white/50 tracking-wide uppercase">{k}</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {roadmap.plan.healthBreakdown?.[k] ?? '-'}
                </p>
                <div className="mt-2 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white/40 rounded-full"
                    style={{ width: `${roadmap.plan.healthBreakdown?.[k] ?? 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Executive Summary */}
          <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl">
            <p className="text-[10px] font-bold text-white/40 tracking-wide mb-2">
              EXECUTIVE SUMMARY
            </p>
            <p className="text-sm text-white/80 leading-relaxed">
              {roadmap.plan.executiveSummary}
            </p>
          </div>

          {/* Months */}
          <div className="space-y-3">
            {roadmap.plan.months.map((m) => {
              const isOpen = expandedMonth === m.month
              const catCounts = {
                autopilot: m.tasks.filter((t) => t.category === 'autopilot').length,
                manual_dev: m.tasks.filter((t) => t.category === 'manual_dev').length,
                manual_seo: m.tasks.filter((t) => t.category === 'manual_seo').length,
                growth: m.tasks.filter((t) => t.category === 'growth').length,
              }
              return (
                <div
                  key={m.month}
                  className="border border-white/[0.08] rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedMonth(isOpen ? null : m.month)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/[0.02] text-left"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-white">
                        📅 Month {m.month}: {m.theme}
                      </p>
                      <p className="text-xs text-white/50 mt-0.5">{m.focus}</p>
                    </div>
                    <div className="flex gap-1 shrink-0 ml-3">
                      {catCounts.autopilot > 0 && (
                        <span className="text-xs">✨{catCounts.autopilot}</span>
                      )}
                      {catCounts.manual_dev > 0 && (
                        <span className="text-xs">👤{catCounts.manual_dev}</span>
                      )}
                      {catCounts.manual_seo > 0 && (
                        <span className="text-xs">🌐{catCounts.manual_seo}</span>
                      )}
                      {catCounts.growth > 0 && (
                        <span className="text-xs">🚀{catCounts.growth}</span>
                      )}
                      <span className="text-white/30 ml-2">{isOpen ? '▲' : '▼'}</span>
                    </div>
                  </button>
                  {isOpen && (
                    <div className="border-t border-white/[0.06] divide-y divide-white/[0.04]">
                      {m.tasks.map((t, i) => {
                        const cat = CATEGORY[t.category] || CATEGORY.growth
                        return (
                          <div key={i} className="px-4 py-3">
                            <div className="flex items-start gap-3 mb-1.5 flex-wrap">
                              <span className="text-lg leading-none">{cat.emoji}</span>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                  <span
                                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${PRIORITY_COLOR[t.priority]}`}
                                  >
                                    {t.priority}
                                  </span>
                                  <span
                                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${cat.bg} ${cat.color}`}
                                  >
                                    {cat.label}
                                  </span>
                                  <span className="text-[10px] text-white/40">
                                    {t.effort}/{t.impact} · {t.affectedPages} pages
                                  </span>
                                </div>
                                <p className="text-sm text-white font-semibold">{t.title}</p>
                                <p className="text-xs text-white/50 mt-1">{t.description}</p>
                                <p className="text-xs text-green-400/80 mt-1.5">
                                  → {t.expectedOutcome}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Investment + Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {roadmap.plan.expectedMetrics && (
              <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl">
                <p className="text-[10px] font-bold text-green-400/80 tracking-wide mb-2">
                  EXPECTED METRICS
                </p>
                {Object.entries(roadmap.plan.expectedMetrics).map(([k, v]) => (
                  <div key={k} className="flex justify-between text-xs py-1">
                    <span className="text-white/50">{k}</span>
                    <span className="text-green-400 font-semibold">{String(v)}</span>
                  </div>
                ))}
              </div>
            )}
            {roadmap.plan.investmentEstimation && (
              <div className="p-4 bg-[#818cf8]/5 border border-[#818cf8]/20 rounded-xl">
                <p className="text-[10px] font-bold text-[#818cf8]/80 tracking-wide mb-2">
                  INVESTMENT
                </p>
                {Object.entries(roadmap.plan.investmentEstimation).map(([k, v]) => (
                  <div key={k} className="flex justify-between text-xs py-1">
                    <span className="text-white/50">{k}</span>
                    <span className="text-[#818cf8] font-semibold">{String(v)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
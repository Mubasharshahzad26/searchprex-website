'use client'
 
import { useState } from 'react'
import {
  Target,
  Sparkles,
  User,
  Globe,
  Rocket,
  Calendar,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  DollarSign,
} from 'lucide-react'
 
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
  autopilot: {
    icon: Sparkles,
    label: 'Autopilot',
    badge: 'bg-violet-50 text-violet-700 border-violet-200',
    iconClass: 'text-violet-600',
  },
  manual_dev: {
    icon: User,
    label: 'Dev',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    iconClass: 'text-amber-600',
  },
  manual_seo: {
    icon: Globe,
    label: 'SEO',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    iconClass: 'text-blue-600',
  },
  growth: {
    icon: Rocket,
    label: 'Growth',
    badge: 'bg-green-50 text-green-700 border-green-200',
    iconClass: 'text-green-600',
  },
} as const
 
const PRIORITY_BADGE: Record<string, string> = {
  P0: 'bg-red-50 text-red-700 border-red-200',
  P1: 'bg-amber-50 text-amber-700 border-amber-200',
  P2: 'bg-neutral-100 text-neutral-600 border-neutral-200',
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
      <p className="text-2xl font-bold text-neutral-900 tabular-nums tracking-tight">{value}</p>
      {hint && <p className="text-xs text-neutral-500 mt-1">{hint}</p>}
    </div>
  )
}
 
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
    <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden mb-8">
      {/* Header */}
      <div className="px-6 py-5 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center">
            <Target className="w-4 h-4 text-neutral-700" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-neutral-900">AI SEO Roadmap</h2>
            {roadmap && (
              <p className="text-xs text-neutral-500">
                Health Score: {roadmap.plan.healthScore}/100
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-100"
          >
            {INDUSTRIES.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Audit runId"
            value={auditRunId}
            onChange={(e) => setAuditRunId(e.target.value)}
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
            onClick={loadLatest}
            disabled={!key || loading}
            className="px-3 py-2 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-900 text-sm font-semibold disabled:opacity-40 transition-colors"
          >
            Load Latest
          </button>
          <button
            onClick={generate}
            disabled={!key || loading}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 disabled:opacity-40 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {loading ? 'Generating...' : 'Generate'}
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
 
        {!roadmap && !error && (
          <p className="text-sm text-neutral-500 text-center py-6">
            Enter details and click Load Latest to view roadmap, or Generate to create a new one.
          </p>
        )}
 
        {roadmap && (
          <div className="space-y-6">
            {/* Health Score Row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <StatBox
                label="Health"
                value={`${roadmap.plan.healthScore}/100`}
                hint="Overall score"
              />
              {(['technical', 'onPage', 'content', 'indexing'] as const).map((k) => {
                const val = roadmap.plan.healthBreakdown?.[k] ?? 0
                return (
                  <div key={k} className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
                    <p className="text-xs uppercase tracking-wider font-medium text-neutral-500 mb-1.5">
                      {k}
                    </p>
                    <p className="text-2xl font-bold text-neutral-900 tabular-nums tracking-tight">
                      {val}
                    </p>
                    <div className="mt-2 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          val >= 70 ? 'bg-green-500' : val >= 40 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${val}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
 
            {/* Executive Summary */}
            <div className="border border-neutral-200 rounded-xl p-4 bg-neutral-50">
              <p className="text-xs uppercase tracking-wider font-medium text-neutral-500 mb-2">
                Executive Summary
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {roadmap.plan.executiveSummary}
              </p>
            </div>
 
            {/* Months */}
            <div>
              <p className="text-xs uppercase tracking-wider font-medium text-neutral-500 mb-3">
                Monthly Roadmap
              </p>
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
                      className="border border-neutral-200 rounded-xl overflow-hidden bg-white hover:border-neutral-300 transition-colors"
                    >
                      <button
                        onClick={() => setExpandedMonth(isOpen ? null : m.month)}
                        className="w-full px-4 py-3 flex items-center justify-between hover:bg-neutral-50 text-left transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                            <Calendar className="w-4 h-4 text-neutral-700" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-neutral-900">
                              Month {m.month}: {m.theme}
                            </p>
                            <p className="text-xs text-neutral-500 mt-0.5 truncate">{m.focus}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                          {catCounts.autopilot > 0 && (
                            <span className="inline-flex items-center gap-1 text-xs text-neutral-600">
                              <Sparkles className="w-3 h-3 text-violet-600" />
                              {catCounts.autopilot}
                            </span>
                          )}
                          {catCounts.manual_dev > 0 && (
                            <span className="inline-flex items-center gap-1 text-xs text-neutral-600">
                              <User className="w-3 h-3 text-amber-600" />
                              {catCounts.manual_dev}
                            </span>
                          )}
                          {catCounts.manual_seo > 0 && (
                            <span className="inline-flex items-center gap-1 text-xs text-neutral-600">
                              <Globe className="w-3 h-3 text-blue-600" />
                              {catCounts.manual_seo}
                            </span>
                          )}
                          {catCounts.growth > 0 && (
                            <span className="inline-flex items-center gap-1 text-xs text-neutral-600">
                              <Rocket className="w-3 h-3 text-green-600" />
                              {catCounts.growth}
                            </span>
                          )}
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-neutral-400 ml-1" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-neutral-400 ml-1" />
                          )}
                        </div>
                      </button>
                      {isOpen && (
                        <div className="border-t border-neutral-200 divide-y divide-neutral-100">
                          {m.tasks.map((t, i) => {
                            const cat = CATEGORY[t.category] || CATEGORY.growth
                            const CatIcon = cat.icon
                            return (
                              <div key={i} className="px-4 py-3">
                                <div className="flex items-start gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-neutral-50 border border-neutral-200 flex items-center justify-center flex-shrink-0">
                                    <CatIcon className={`w-4 h-4 ${cat.iconClass}`} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                                      <span
                                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${PRIORITY_BADGE[t.priority]}`}
                                      >
                                        {t.priority}
                                      </span>
                                      <span
                                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${cat.badge}`}
                                      >
                                        {cat.label}
                                      </span>
                                      <span className="text-[11px] text-neutral-500">
                                        {t.effort}/{t.impact} · {t.affectedPages} pages
                                      </span>
                                    </div>
                                    <p className="text-sm text-neutral-900 font-semibold">
                                      {t.title}
                                    </p>
                                    <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                                      {t.description}
                                    </p>
                                    <p className="text-xs text-green-700 mt-1.5 font-medium">
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
            </div>
 
            {/* Metrics + Investment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {roadmap.plan.expectedMetrics && (
                <div className="border border-green-200 bg-green-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-green-700" />
                    <p className="text-xs uppercase tracking-wider font-medium text-green-800">
                      Expected Metrics
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    {Object.entries(roadmap.plan.expectedMetrics).map(([k, v]) => (
                      <div key={k} className="flex justify-between text-xs">
                        <span className="text-neutral-600">{k}</span>
                        <span className="text-green-800 font-semibold">{String(v)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {roadmap.plan.investmentEstimation && (
                <div className="border border-neutral-200 bg-neutral-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="w-4 h-4 text-neutral-700" />
                    <p className="text-xs uppercase tracking-wider font-medium text-neutral-600">
                      Investment
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    {Object.entries(roadmap.plan.investmentEstimation).map(([k, v]) => (
                      <div key={k} className="flex justify-between text-xs">
                        <span className="text-neutral-600">{k}</span>
                        <span className="text-neutral-900 font-semibold">{String(v)}</span>
                      </div>
                    ))}
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
 
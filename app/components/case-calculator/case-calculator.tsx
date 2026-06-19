'use client'
 
import { useMemo, useState } from 'react'
import {
  Calculator,
  Loader2,
  TrendingDown,
  Search,
  PhoneCall,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Info,
} from 'lucide-react'
 
/* ── Practice areas: keyword (for DataForSEO) + default avg attorney fee + fallback volume ── */
const PRACTICE_AREAS = [
  { id: 'car-accident', label: 'Car / Auto Accident', keyword: 'car accident lawyer', caseValue: 12000, volume: 6000 },
  { id: 'truck-accident', label: 'Truck Accident', keyword: 'truck accident lawyer', caseValue: 40000, volume: 1200 },
  { id: 'slip-fall', label: 'Slip & Fall / Premises', keyword: 'slip and fall lawyer', caseValue: 10000, volume: 1500 },
  { id: 'medical-malpractice', label: 'Medical Malpractice', keyword: 'medical malpractice lawyer', caseValue: 60000, volume: 2000 },
  { id: 'workers-comp', label: "Workers' Compensation", keyword: 'workers compensation lawyer', caseValue: 8000, volume: 3000 },
  { id: 'dog-bite', label: 'Dog Bite', keyword: 'dog bite lawyer', caseValue: 8000, volume: 800 },
  { id: 'wrongful-death', label: 'Wrongful Death', keyword: 'wrongful death lawyer', caseValue: 100000, volume: 700 },
  { id: 'personal-injury', label: 'General Personal Injury', keyword: 'personal injury lawyer', caseValue: 15000, volume: 9000 },
]
 
const RESPONSE_TIMES = [
  { id: 'under5', label: 'Under 5 minutes', penalty: 0 },
  { id: '5to30', label: '5–30 minutes', penalty: 0.08 },
  { id: '30to60', label: '30–60 minutes', penalty: 0.15 },
  { id: '1to4hr', label: '1–4 hours', penalty: 0.25 },
  { id: 'over4hr', label: '4+ hours / next day', penalty: 0.35 },
]
 
const AFTER_HOURS = [
  { id: '247', label: '24/7 live answer', penalty: 0 },
  { id: 'partial', label: 'Partial / voicemail', penalty: 0.05 },
  { id: 'none', label: 'Business hours only', penalty: 0.12 },
]
 
const DEFAULT_CTR = 0.3 // share of searches that click the top-3 organic results
const DEFAULT_VTL = 0.04 // share of those visitors who become a lead/inquiry
 
function money(n: number): string {
  if (!isFinite(n)) return '$0'
  const v = Math.round(n)
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`
  if (v >= 10_000) return `$${(v / 1000).toFixed(0)}k`
  return `$${v.toLocaleString('en-US')}`
}
 
const inputCls =
  'h-11 w-full rounded-lg border border-border bg-card px-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30'
const labelCls = 'mb-1.5 block text-xs font-semibold text-foreground'
 
export default function CaseCalculator() {
  const [city, setCity] = useState('')
  const [paId, setPaId] = useState('car-accident')
  const pa = PRACTICE_AREAS.find((p) => p.id === paId) || PRACTICE_AREAS[0]
 
  const [caseValue, setCaseValue] = useState(pa.caseValue)
  const [leads, setLeads] = useState(40)
  const [conv, setConv] = useState(15)
  const [respId, setRespId] = useState('30to60')
  const [ahId, setAhId] = useState('none')
 
  const [ctr, setCtr] = useState(DEFAULT_CTR)
  const [vtl, setVtl] = useState(DEFAULT_VTL)
 
  const [volume, setVolume] = useState<number | null>(null)
  const [volSource, setVolSource] = useState('')
  const [loading, setLoading] = useState(false)
  const [calculated, setCalculated] = useState(false)
  const [showAssumptions, setShowAssumptions] = useState(false)
 
  const [lead, setLead] = useState({ name: '', email: '', website: '' })
  const [leadStatus, setLeadStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
 
  function selectPa(id: string) {
    const p = PRACTICE_AREAS.find((x) => x.id === id) || PRACTICE_AREAS[0]
    setPaId(id)
    setCaseValue(p.caseValue)
    setCalculated(false)
    setVolume(null)
  }
 
  async function calculate() {
    if (loading) return
    setLoading(true)
    try {
      const res = await fetch('/api/case-calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: pa.keyword, city }),
      })
      const json = await res.json()
      setVolume(typeof json.volume === 'number' ? json.volume : null)
      setVolSource(json.source || '')
    } catch {
      setVolume(null)
      setVolSource('error')
    } finally {
      setLoading(false)
      setCalculated(true)
      setLeadStatus('idle')
    }
  }
 
  const r = useMemo(() => {
    const S = volume ?? pa.volume
    const potentialLeads = S * ctr * vtl
    const seoGapLeads = Math.max(0, potentialLeads - leads)
    const convFrac = conv / 100
    const seoLostCases = seoGapLeads * convFrac
    const seoLostRev = seoLostCases * caseValue
 
    const respPenalty = RESPONSE_TIMES.find((x) => x.id === respId)?.penalty ?? 0
    const ahPenalty = AFTER_HOURS.find((x) => x.id === ahId)?.penalty ?? 0
    const intakeLeak = Math.min(0.5, respPenalty + ahPenalty)
    const currentSigned = leads * convFrac
    const intakeRecovered = currentSigned * intakeLeak
    const intakeLostRev = intakeRecovered * caseValue
 
    const monthly = seoLostRev + intakeLostRev
    return {
      S,
      potentialLeads,
      seoGapLeads,
      seoLostCases,
      seoLostRev,
      intakeLeak,
      intakeRecovered,
      intakeLostRev,
      currentSigned,
      monthly,
      annual: monthly * 12,
    }
  }, [volume, pa, ctr, vtl, leads, conv, caseValue, respId, ahId])
 
  const grade =
    r.intakeLeak <= 0.05 ? 'A' : r.intakeLeak <= 0.15 ? 'B' : r.intakeLeak <= 0.25 ? 'C' : r.intakeLeak <= 0.35 ? 'D' : 'F'
  const gradeColor =
    grade === 'A' ? 'text-emerald-600' : grade === 'B' ? 'text-emerald-600' : grade === 'C' ? 'text-amber-600' : 'text-red-600'
 
  async function submitLead() {
    if (!lead.name.trim() || !lead.email.trim()) {
      setLeadStatus('error')
      return
    }
    setLeadStatus('submitting')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          website: lead.website,
          source: 'case-calculator',
          practiceArea: pa.label,
          city,
          estimatedAnnualLeak: Math.round(r.annual),
        }),
      })
      if (!res.ok) throw new Error()
      setLeadStatus('success')
    } catch {
      setLeadStatus('error')
    }
  }
 
  return (
    <div className="flex flex-col gap-6 px-4 py-6 md:px-6">
      {/* Hero */}
      <div className="text-center">
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
          <Calculator className="size-3.5" /> SearchPrex · Personal Injury Tool
        </div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Lost Case Calculator</h1>
        <p className="mx-auto mt-1 max-w-xl text-sm text-muted-foreground">
          See how much revenue your firm is leaking from SEO visibility gaps and slow client intake.
        </p>
      </div>
 
      <div className="mx-auto w-full max-w-2xl space-y-5">
        {/* Inputs */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          {/* Market */}
          <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Your market</div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label className={labelCls}>City / market</label>
              <input
                value={city}
                onChange={(e) => {
                  setCity(e.target.value)
                  setCalculated(false)
                }}
                placeholder="e.g. Chicago"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Primary practice area</label>
              <select value={paId} onChange={(e) => selectPa(e.target.value)} className={inputCls}>
                {PRACTICE_AREAS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
 
          {/* Numbers */}
          <div className="mt-5 text-xs font-bold uppercase tracking-wide text-muted-foreground">Your numbers</div>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <div>
              <label className={labelCls}>Avg fee / signed case ($)</label>
              <input
                type="number"
                value={caseValue}
                onChange={(e) => setCaseValue(Math.max(0, +e.target.value))}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Monthly leads (calls + forms)</label>
              <input
                type="number"
                value={leads}
                onChange={(e) => setLeads(Math.max(0, +e.target.value))}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Lead → signed rate (%)</label>
              <input
                type="number"
                value={conv}
                onChange={(e) => setConv(Math.min(100, Math.max(0, +e.target.value)))}
                className={inputCls}
              />
            </div>
          </div>
 
          {/* Intake */}
          <div className="mt-5 text-xs font-bold uppercase tracking-wide text-muted-foreground">Your intake</div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Avg response time to a new lead</label>
              <select value={respId} onChange={(e) => setRespId(e.target.value)} className={inputCls}>
                {RESPONSE_TIMES.map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>After-hours coverage</label>
              <select value={ahId} onChange={(e) => setAhId(e.target.value)} className={inputCls}>
                {AFTER_HOURS.map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
 
          <button
            onClick={calculate}
            disabled={loading}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Calculator className="size-4" />}
            {calculated ? 'Recalculate' : 'Calculate my lost cases'}
          </button>
        </div>
 
        {/* Results */}
        {calculated && (
          <div className="space-y-4">
            {/* Headline leak */}
            <div className="overflow-hidden rounded-xl border border-red-200 bg-gradient-to-br from-red-50 to-orange-50 p-6 text-center">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-red-600">
                <TrendingDown className="size-4" /> Estimated revenue leak
              </div>
              <div className="mt-1 text-4xl font-black text-red-600 md:text-5xl">{money(r.annual)}<span className="text-xl font-bold">/yr</span></div>
              <div className="mt-1 text-sm text-muted-foreground">
                ≈ {money(r.monthly)}/mo · about {(r.seoLostCases + r.intakeRecovered).toFixed(1)} signed cases lost per month
              </div>
            </div>
 
            {/* Breakdown */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* SEO gap */}
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 text-sm font-bold">
                  <Search className="size-4 text-primary" /> SEO visibility gap
                </div>
                <div className="mt-2 text-2xl font-black text-foreground">{money(r.seoLostRev * 12)}<span className="text-sm font-semibold text-muted-foreground">/yr</span></div>
                <p className="mt-1 text-xs text-muted-foreground">
                  ~{Math.round(r.S).toLocaleString('en-US')} monthly searches for{' '}
                  <span className="font-semibold">"{pa.keyword}{city ? ` ${city}` : ''}"</span>. Ranking top-3 could add ~
                  {r.seoGapLeads.toFixed(0)} leads/mo → ~{r.seoLostCases.toFixed(1)} more signed cases.
                </p>
                <p className="mt-1.5 text-[11px] text-muted-foreground">
                  {volSource === 'dataforseo' ? '● Live search demand (DataForSEO)' : '○ Estimated demand (no live data)'}
                </p>
              </div>
 
              {/* Intake gap */}
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <PhoneCall className="size-4 text-primary" /> Intake gap
                  </div>
                  <span className={`text-lg font-black ${gradeColor}`}>{grade}</span>
                </div>
                <div className="mt-2 text-2xl font-black text-foreground">{money(r.intakeLostRev * 12)}<span className="text-sm font-semibold text-muted-foreground">/yr</span></div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Slow response + after-hours gaps lose ~{(r.intakeLeak * 100).toFixed(0)}% of convertible leads — about{' '}
                  {r.intakeRecovered.toFixed(1)} signed cases/mo you could recover with optimized intake.
                </p>
              </div>
            </div>
 
            {/* Transparency */}
            <div className="rounded-xl border border-border bg-card">
              <button
                onClick={() => setShowAssumptions((s) => !s)}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
                  <Info className="size-4 text-muted-foreground" /> How this is estimated (and adjust it)
                </span>
                <ChevronDown className={`size-4 text-muted-foreground transition-transform ${showAssumptions ? 'rotate-180' : ''}`} />
              </button>
              {showAssumptions && (
                <div className="space-y-4 border-t border-border p-4">
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold">Top-3 click share</span>
                      <span className="text-muted-foreground">{(ctr * 100).toFixed(0)}%</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={45}
                      value={ctr * 100}
                      onChange={(e) => setCtr(+e.target.value / 100)}
                      className="mt-1.5 w-full accent-[#534AB7]"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold">Visitor → lead rate</span>
                      <span className="text-muted-foreground">{(vtl * 100).toFixed(0)}%</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={vtl * 100}
                      onChange={(e) => setVtl(+e.target.value / 100)}
                      className="mt-1.5 w-full accent-[#534AB7]"
                    />
                  </div>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    These are directional estimates based on industry benchmarks and the numbers you entered — not a
                    guarantee of results. Intake-loss factors come from lead-response research (faster response and 24/7
                    coverage sign meaningfully more cases). Adjust the sliders to match your own data.
                  </p>
                </div>
              )}
            </div>
 
            {/* CTA + inline lead form */}
            <div className="overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 p-5">
              {leadStatus === 'success' ? (
                <div className="flex flex-col items-center py-2 text-center">
                  <CheckCircle2 className="size-9 text-primary" />
                  <h3 className="mt-2 text-base font-bold">Roadmap on the way! 🎉</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We&apos;ll map exactly how to plug these leaks for your firm and send your free 30-day roadmap.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-base font-bold">Plug these leaks — free 30-day roadmap</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Get a tailored plan to close your SEO visibility gap and tighten intake — built for your practice area
                    and market.
                  </p>
                  <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    <input
                      value={lead.name}
                      onChange={(e) => setLead({ ...lead, name: e.target.value })}
                      placeholder="Your name *"
                      className={inputCls}
                    />
                    <input
                      value={lead.email}
                      onChange={(e) => setLead({ ...lead, email: e.target.value })}
                      type="email"
                      placeholder="Work email *"
                      className={inputCls}
                    />
                    <input
                      value={lead.website}
                      onChange={(e) => setLead({ ...lead, website: e.target.value })}
                      placeholder="Firm website (optional)"
                      className={`${inputCls} sm:col-span-2`}
                    />
                  </div>
                  {leadStatus === 'error' && (
                    <p className="mt-2 text-xs text-destructive">Please enter your name and a valid email.</p>
                  )}
                  <button
                    onClick={submitLead}
                    disabled={leadStatus === 'submitting'}
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60 sm:w-auto"
                  >
                    {leadStatus === 'submitting' ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <>
                        Get my free 30-day roadmap <ArrowRight className="size-4" />
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
 
            <p className="px-1 text-center text-[11px] leading-relaxed text-muted-foreground">
              Estimates are directional and based on the inputs above plus industry benchmarks. SearchPrex does not
              guarantee specific rankings, case volumes, or outcomes.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
 
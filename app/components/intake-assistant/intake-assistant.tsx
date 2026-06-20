'use client'
 
import { useEffect, useRef, useState } from 'react'
import {
  Scale,
  Send,
  Loader2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileCheck2,
  RotateCcw,
} from 'lucide-react'
 
type Msg = { role: 'assistant' | 'user'; content: string }
 
type Summary = {
  caseType: string
  incidentDate: string
  overview: string
  keyFacts: string[]
  viability: 'qualified' | 'needs-review' | 'likely-not-viable'
  viabilityReason: string
  recommendedNextStep: string
}
 
const SCENARIOS = [
  'I was rear-ended at a red light last week',
  'I slipped and fell at a grocery store',
  'A dog bit me at the park',
  'I was hurt in a truck accident',
]
 
const VIABILITY_META: Record<
  Summary['viability'],
  { label: string; icon: typeof CheckCircle2; cls: string; chip: string }
> = {
  qualified: { label: 'Qualified lead', icon: CheckCircle2, cls: 'text-emerald-600', chip: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  'needs-review': { label: 'Needs review', icon: AlertTriangle, cls: 'text-amber-600', chip: 'bg-amber-50 text-amber-700 border-amber-200' },
  'likely-not-viable': { label: 'Likely not viable', icon: XCircle, cls: 'text-red-600', chip: 'bg-red-50 text-red-700 border-red-200' },
}
 
const inputCls =
  'h-11 w-full rounded-lg border border-border bg-card px-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30'
 
export default function IntakeAssistant() {
  const [firm, setFirm] = useState('')
  const [started, setStarted] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState<Summary | null>(null)
 
  const [lead, setLead] = useState({ name: '', email: '', website: '' })
  const [leadStatus, setLeadStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
 
  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading, summary])
 
  function start() {
    const greeting = `Hi — I'm the 24/7 intake assistant${firm ? ` for ${firm}` : ''}. I'm sorry you're dealing with this, and I'm here to help. To get you to the right person fast, can you tell me what happened?`
    setMessages([{ role: 'assistant', content: greeting }])
    setStarted(true)
  }
 
  async function send(text?: string) {
    const content = (text ?? input).trim()
    if (!content || loading || summary) return
    const next: Msg[] = [...messages, { role: 'user', content }]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/intake-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, firm }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'failed')
      setMessages((m) => [...m, { role: 'assistant', content: json.reply }])
      if (json.phase === 'complete' && json.summary) setSummary(json.summary as Summary)
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: 'Sorry — something went wrong on my end. Could you try that again?' }])
    } finally {
      setLoading(false)
    }
  }
 
  function reset() {
    setMessages([])
    setStarted(false)
    setSummary(null)
    setInput('')
    setLead({ name: '', email: '', website: '' })
    setLeadStatus('idle')
  }
 
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
        body: JSON.stringify({ ...lead, source: 'intake-assistant', firm }),
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
          <Sparkles className="size-3.5" /> SearchPrex · Law Firm Tool
        </div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">24/7 AI Intake Assistant</h1>
        <p className="mx-auto mt-1 max-w-xl text-sm text-muted-foreground">
          See how an AI assistant captures and qualifies every lead — even at 2&nbsp;a.m. — so your firm never loses a case to a missed call.
        </p>
      </div>
 
      <div className="mx-auto w-full max-w-2xl">
        {!started ? (
          /* ── Pre-chat intro ── */
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Scale className="size-5 text-primary" />
              </div>
              <div>
                <h2 className="text-base font-bold">Try it as if you were a potential client</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Describe an incident and watch the assistant ask the right questions, qualify the lead, and produce a clean
                  summary your firm would receive in seconds.
                </p>
              </div>
            </div>
 
            <div className="mt-5">
              <label className="mb-1.5 block text-xs font-semibold text-foreground">Your firm name (optional — personalizes the demo)</label>
              <input value={firm} onChange={(e) => setFirm(e.target.value)} placeholder="e.g. Smith Injury Law" className={inputCls} />
            </div>
 
            <button
              onClick={start}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Start the demo <ArrowRight className="size-4" />
            </button>
 
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
              Demo only. This assistant gathers information and does not provide legal advice; no attorney-client relationship
              is formed.
            </p>
          </div>
        ) : (
          /* ── Chat ── */
          <div className="space-y-4">
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-full bg-primary/10">
                    <Scale className="size-3.5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold leading-none">{firm || 'Intake Assistant'}</div>
                    <div className="mt-0.5 flex items-center gap-1 text-[11px] text-emerald-600">
                      <span className="size-1.5 rounded-full bg-emerald-500" /> Online · replies instantly
                    </div>
                  </div>
                </div>
                <button onClick={reset} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
                  <RotateCcw className="size-3.5" /> Restart
                </button>
              </div>
 
              {/* Messages */}
              <div ref={scrollRef} className="flex max-h-[420px] min-h-[280px] flex-col gap-3 overflow-y-auto p-4">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                        m.role === 'user'
                          ? 'rounded-br-sm bg-primary text-primary-foreground'
                          : 'rounded-bl-sm bg-muted text-foreground'
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl rounded-bl-sm bg-muted px-3.5 py-2.5">
                      <span className="flex gap-1">
                        <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.3s]" />
                        <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.15s]" />
                        <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground/50" />
                      </span>
                    </div>
                  </div>
                )}
              </div>
 
              {/* Scenario chips (first turn only) */}
              {messages.length === 1 && !loading && (
                <div className="flex flex-wrap gap-2 px-4 pb-3">
                  {SCENARIOS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
 
              {/* Input */}
              {!summary && (
                <div className="flex gap-2 border-t border-border p-3">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && send()}
                    disabled={loading}
                    placeholder="Type your reply…"
                    className={inputCls}
                  />
                  <button
                    onClick={() => send()}
                    disabled={loading || !input.trim()}
                    className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
                  >
                    {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                  </button>
                </div>
              )}
            </div>
 
            {/* ── Qualified Lead Summary (when complete) ── */}
            {summary && (
              <>
                <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 text-sm font-bold">
                      <FileCheck2 className="size-4 text-primary" /> Qualified Lead Summary
                    </div>
                    {(() => {
                      const vm = VIABILITY_META[summary.viability]
                      const VIcon = vm.icon
                      return (
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${vm.chip}`}>
                          <VIcon className="size-3.5" /> {vm.label}
                        </span>
                      )
                    })()}
                  </div>
 
                  <p className="mb-3 text-xs text-muted-foreground">This is what your firm would receive in its inbox/CRM — instantly.</p>
 
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg bg-muted/40 p-3">
                      <div className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Case type</div>
                      <div className="text-sm font-semibold">{summary.caseType}</div>
                    </div>
                    <div className="rounded-lg bg-muted/40 p-3">
                      <div className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Incident date</div>
                      <div className="text-sm font-semibold">{summary.incidentDate}</div>
                    </div>
                  </div>
 
                  <div className="mt-3">
                    <div className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Overview</div>
                    <p className="mt-0.5 text-sm leading-relaxed">{summary.overview}</p>
                  </div>
 
                  {summary.keyFacts?.length > 0 && (
                    <div className="mt-3">
                      <div className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Key facts</div>
                      <ul className="mt-1 flex flex-col gap-1">
                        {summary.keyFacts.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
 
                  <div className="mt-3 rounded-lg border border-border p-3">
                    <div className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Screening signal</div>
                    <p className="mt-0.5 text-sm">{summary.viabilityReason}</p>
                    <div className="mt-2 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Recommended next step</div>
                    <p className="mt-0.5 text-sm font-medium text-primary">{summary.recommendedNextStep}</p>
                  </div>
 
                  <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                    The screening signal is an internal prioritization aid, not legal advice or a case evaluation.
                  </p>
                </div>
 
                {/* CTA + lead form */}
                <div className="overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 p-5">
                  {leadStatus === 'success' ? (
                    <div className="flex flex-col items-center py-2 text-center">
                      <CheckCircle2 className="size-9 text-primary" />
                      <h3 className="mt-2 text-base font-bold">Let&apos;s set this up! 🎉</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        We&apos;ll show you how a 24/7 AI intake assistant fits your firm and send your free 30-day roadmap.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-base font-bold">Want this answering YOUR leads 24/7?</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Get a free 30-day roadmap to capture and qualify every lead — and stop losing cases to missed calls.
                      </p>
                      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                        <input value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} placeholder="Your name *" className={inputCls} />
                        <input value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} type="email" placeholder="Work email *" className={inputCls} />
                        <input value={lead.website} onChange={(e) => setLead({ ...lead, website: e.target.value })} placeholder="Firm website (optional)" className={`${inputCls} sm:col-span-2`} />
                      </div>
                      {leadStatus === 'error' && <p className="mt-2 text-xs text-destructive">Please enter your name and a valid email.</p>}
                      <button
                        onClick={submitLead}
                        disabled={leadStatus === 'submitting'}
                        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60 sm:w-auto"
                      >
                        {leadStatus === 'submitting' ? <Loader2 className="size-4 animate-spin" /> : <>Get my free 30-day roadmap <ArrowRight className="size-4" /></>}
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
 
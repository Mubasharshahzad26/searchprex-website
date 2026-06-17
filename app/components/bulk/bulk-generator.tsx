'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import type {
  GenerationResult,
  GenerationStatus,
  ProductInput,
} from '@/lib/content'
import { Dropzone } from './dropzone'
import { ResultDrawer } from './result-drawer'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import {
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Clock,
  RotateCcw,
  Download,
  Eye,
  Trash2,
  ShieldCheck,
} from 'lucide-react'

const CONCURRENCY = 4

export function BulkGenerator() {
  const [products, setProducts] = useState<ProductInput[]>([])
  const [fileName, setFileName] = useState('')
  const [results, setResults] = useState<Record<string, GenerationResult>>({})
  const [running, setRunning] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const cancelRef = useRef(false)

  const loadProducts = useCallback((items: ProductInput[], name: string) => {
    setProducts(items)
    setFileName(name)
    setResults(
      Object.fromEntries(
        items.map((p) => [
          p.id,
          { id: p.id, name: p.name, status: 'queued' as GenerationStatus },
        ]),
      ),
    )
  }, [])

  const update = useCallback(
    (id: string, patch: Partial<GenerationResult>) => {
      setResults((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }))
    },
    [],
  )

  async function generateOne(product: ProductInput) {
    update(product.id, { status: 'generating' })
    try {
      const res = await fetch('/api/generate-bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Generation failed')
      update(product.id, {
        status: 'done',
        result: json.result,
        wordCount: json.wordCount,
      })
    } catch (err) {
      update(product.id, {
        status: 'error',
        error: err instanceof Error ? err.message : 'Failed',
      })
    }
  }

  async function runAll(targets?: ProductInput[]) {
    const queue = (targets ?? products).filter(Boolean)
    if (queue.length === 0 || running) return
    setRunning(true)
    cancelRef.current = false

    let cursor = 0
    async function worker() {
      while (cursor < queue.length && !cancelRef.current) {
        const item = queue[cursor++]
        await generateOne(item)
      }
    }
    const workers = Array.from(
      { length: Math.min(CONCURRENCY, queue.length) },
      worker,
    )
    await Promise.all(workers)
    setRunning(false)
  }

  function retryFailed() {
    const failed = products.filter((p) => results[p.id]?.status === 'error')
    runAll(failed)
  }

  function reset() {
    cancelRef.current = true
    setProducts([])
    setResults({})
    setFileName('')
    setRunning(false)
  }

  const list = useMemo(
    () => products.map((p) => results[p.id]).filter(Boolean),
    [products, results],
  )

  const stats = useMemo(() => {
    const s = { queued: 0, generating: 0, done: 0, error: 0, words: 0 }
    for (const r of list) {
      s[r.status]++
      if (r.wordCount) s.words += r.wordCount
    }
    return s
  }, [list])

  const total = list.length
  const completed = stats.done + stats.error
  const pct = total ? Math.round((completed / total) * 100) : 0

  function exportCsv() {
    const rows = [
      ['name', 'metaTitle', 'metaDescription', 'shortDescription', 'bodyHtml', 'faqs'],
    ]
    for (const r of list) {
      if (!r.result) continue
      rows.push([
        r.name,
        r.result.metaTitle,
        r.result.metaDescription,
        r.result.shortDescription,
        r.result.bodyHtml,
        r.result.faqs.map((f) => `${f.question} ${f.answer}`).join(' | '),
      ])
    }
    const csv = rows
      .map((row) =>
        row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','),
      )
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'rankforge-descriptions.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col gap-5 px-4 py-5 md:px-6">
      {/* Heading */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold tracking-tight">
            Bulk Content Generator
          </h1>
          <span className="rounded bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">
            AI
          </span>
        </div>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <ShieldCheck className="size-4 text-[#16a394]" />
          Generate unique, E-E-A-T-driven product descriptions for up to 500
          products — aligned with the Google March 2026 Core Update.
        </p>
      </div>

      {products.length === 0 ? (
        <Dropzone onLoaded={loadProducts} />
      ) : (
        <>
          {/* Control bar */}
          <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Sparkles className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">{fileName}</p>
                <p className="text-xs text-muted-foreground">
                  {total} products loaded · powered by Claude Sonnet 4.6
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {stats.error > 0 && !running && (
                <button
                  type="button"
                  onClick={retryFailed}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                >
                  <RotateCcw className="size-4" />
                  Retry {stats.error} failed
                </button>
              )}
              {stats.done > 0 && (
                <button
                  type="button"
                  onClick={exportCsv}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                >
                  <Download className="size-4" />
                  Export CSV
                </button>
              )}
              <button
                type="button"
                onClick={reset}
                disabled={running}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50"
              >
                <Trash2 className="size-4" />
                Clear
              </button>
              <button
                type="button"
                onClick={() => runAll()}
                disabled={running || completed === total}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {running ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Sparkles className="size-4" />
                )}
                {running
                  ? 'Generating…'
                  : completed === total
                    ? 'Completed'
                    : `Generate ${total}`}
              </button>
            </div>
          </div>

          {/* Progress dashboard */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <ProgressStat
              icon={Clock}
              label="Queued"
              value={stats.queued}
              tone="muted"
            />
            <ProgressStat
              icon={Loader2}
              label="Generating"
              value={stats.generating}
              tone="brand"
              spin={stats.generating > 0}
            />
            <ProgressStat
              icon={CheckCircle2}
              label="Completed"
              value={stats.done}
              tone="positive"
            />
            <ProgressStat
              icon={AlertCircle}
              label="Failed"
              value={stats.error}
              tone="negative"
            />
          </div>

          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium">
                {completed} / {total} processed
              </span>
              <span className="text-muted-foreground tabular-nums">
                {stats.words.toLocaleString('en-US')} words generated
              </span>
            </div>
            <Progress value={pct} className="h-2" />
          </div>

          {/* Results list */}
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="max-h-[calc(100vh-460px)] min-h-[200px] overflow-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10 bg-secondary/90 backdrop-blur">
                  <tr>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">
                      Product
                    </th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">
                      Status
                    </th>
                    <th className="hidden px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground sm:table-cell">
                      Words
                    </th>
                    <th className="px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-border/70 transition-colors hover:bg-accent/40"
                    >
                      <td className="max-w-[280px] px-4 py-2.5 font-medium">
                        <span className="block truncate">{r.name}</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <StatusBadge status={r.status} />
                      </td>
                      <td className="hidden px-4 py-2.5 text-right tabular-nums text-muted-foreground sm:table-cell">
                        {r.wordCount ?? '—'}
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <button
                          type="button"
                          disabled={r.status !== 'done' && r.status !== 'error'}
                          onClick={() => setSelected(r.id)}
                          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/5 disabled:cursor-not-allowed disabled:text-muted-foreground/50"
                        >
                          <Eye className="size-3.5" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <ResultDrawer
        item={selected ? results[selected] : null}
        onClose={() => setSelected(null)}
      />
    </div>
  )
}

function ProgressStat({
  icon: Icon,
  label,
  value,
  tone,
  spin,
}: {
  icon: typeof Clock
  label: string
  value: number
  tone: 'muted' | 'brand' | 'positive' | 'negative'
  spin?: boolean
}) {
  const tones = {
    muted: 'bg-muted text-muted-foreground',
    brand: 'bg-primary/10 text-primary',
    positive: 'bg-[#eafbef] text-[#166534]',
    negative: 'bg-destructive/10 text-destructive',
  }
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
      <span
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-lg',
          tones[tone],
        )}
      >
        <Icon className={cn('size-5', spin && 'animate-spin')} />
      </span>
      <div>
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="text-xl font-bold tabular-nums">{value}</p>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: GenerationStatus }) {
  const map = {
    queued: {
      label: 'Queued',
      cls: 'bg-muted text-muted-foreground',
      icon: Clock,
      spin: false,
    },
    generating: {
      label: 'Generating',
      cls: 'bg-primary/10 text-primary',
      icon: Loader2,
      spin: true,
    },
    done: {
      label: 'Completed',
      cls: 'bg-[#eafbef] text-[#166534]',
      icon: CheckCircle2,
      spin: false,
    },
    error: {
      label: 'Failed',
      cls: 'bg-destructive/10 text-destructive',
      icon: AlertCircle,
      spin: false,
    },
  } as const
  const cfg = map[status]
  const Icon = cfg.icon
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold',
        cfg.cls,
      )}
    >
      <Icon className={cn('size-3.5', cfg.spin && 'animate-spin')} />
      {cfg.label}
    </span>
  )
}

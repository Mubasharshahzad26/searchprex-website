'use client'

import { useEffect, useState } from 'react'
import type { GenerationResult } from '@/lib/content'
import { X, Copy, Check, ShieldCheck } from 'lucide-react'

export function ResultDrawer({
  item,
  onClose,
}: {
  item: GenerationResult | null
  onClose: () => void
}) {
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (item) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [item, onClose])

  if (!item) return null
  const r = item.result

  function copy(label: string, text: string) {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
      />
      <div className="relative flex h-full w-full max-w-2xl flex-col bg-card shadow-2xl">
        <header className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
          <div className="min-w-0">
            <p className="truncate text-base font-bold">{item.name}</p>
            {item.wordCount != null && (
              <p className="text-xs text-muted-foreground">
                {item.wordCount} words · March 2026 compliant
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
            aria-label="Close panel"
          >
            <X className="size-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {item.status === 'error' && (
            <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
              {item.error ?? 'Generation failed.'}
            </p>
          )}

          {r && (
            <div className="flex flex-col gap-5">
              <Field
                label="Meta title"
                value={r.metaTitle}
                onCopy={() => copy('metaTitle', r.metaTitle)}
                copied={copied === 'metaTitle'}
                hint={`${r.metaTitle.length} chars`}
              />
              <Field
                label="Meta description"
                value={r.metaDescription}
                onCopy={() => copy('metaDescription', r.metaDescription)}
                copied={copied === 'metaDescription'}
                hint={`${r.metaDescription.length} chars`}
              />
              <Field
                label="Short description"
                value={r.shortDescription}
                onCopy={() => copy('short', r.shortDescription)}
                copied={copied === 'short'}
              />

              {/* Rendered body */}
              <section>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Product description
                  </h3>
                  <CopyBtn
                    onClick={() => copy('body', r.bodyHtml)}
                    copied={copied === 'body'}
                    label="Copy HTML"
                  />
                </div>
                <div
                  className="prose-content rounded-lg border border-border bg-background p-4 text-sm leading-relaxed"
                  // Content is generated server-side by the LLM into a fixed schema field.
                  dangerouslySetInnerHTML={{ __html: r.bodyHtml }}
                />
              </section>

              {/* FAQs */}
              <section>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  GEO FAQs ({r.faqs.length})
                </h3>
                <div className="flex flex-col gap-2">
                  {r.faqs.map((f, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-border bg-background p-3"
                    >
                      <p className="text-sm font-semibold">{f.question}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {f.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* E-E-A-T signals */}
              {r.eeatSignals?.length > 0 && (
                <section>
                  <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    <ShieldCheck className="size-4 text-[#16a394]" />
                    E-E-A-T signals
                  </h3>
                  <ul className="flex flex-col gap-1.5">
                    {r.eeatSignals.map((s, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-[#16a394]" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onCopy,
  copied,
  hint,
}: {
  label: string
  value: string
  onCopy: () => void
  copied: boolean
  hint?: string
}) {
  return (
    <section>
      <div className="mb-1.5 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          {label}
          {hint && (
            <span className="ml-2 font-normal normal-case text-muted-foreground/70">
              {hint}
            </span>
          )}
        </h3>
        <CopyBtn onClick={onCopy} copied={copied} />
      </div>
      <p className="rounded-lg border border-border bg-background p-3 text-sm">
        {value}
      </p>
    </section>
  )
}

function CopyBtn({
  onClick,
  copied,
  label = 'Copy',
}: {
  onClick: () => void
  copied: boolean
  label?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {copied ? (
        <>
          <Check className="size-3.5 text-[#16a394]" /> Copied
        </>
      ) : (
        <>
          <Copy className="size-3.5" /> {label}
        </>
      )}
    </button>
  )
}

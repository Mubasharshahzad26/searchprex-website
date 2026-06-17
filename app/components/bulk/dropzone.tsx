'use client'

import { useRef, useState } from 'react'
import { CSV_TEMPLATE, parseCsv, type ProductInput } from '@/lib/content'
import { UploadCloud, FileSpreadsheet, Download, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const MAX_PRODUCTS = 500

export function Dropzone({
  onLoaded,
}: {
  onLoaded: (products: ProductInput[], fileName: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(file: File) {
    setError(null)
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setError('Please upload a .csv file.')
      return
    }
    const text = await file.text()
    const products = parseCsv(text)
    if (products.length === 0) {
      setError('No valid rows found. Ensure your CSV has a "name" column.')
      return
    }
    if (products.length > MAX_PRODUCTS) {
      setError(
        `That file has ${products.length} products. The limit is ${MAX_PRODUCTS} per batch.`,
      )
      return
    }
    onLoaded(products, file.name)
  }

  function downloadTemplate() {
    const blob = new Blob([CSV_TEMPLATE], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'rankforge-products-template.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  function loadSample() {
    onLoaded(parseCsv(CSV_TEMPLATE), 'sample-products.csv')
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click()
        }}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          const file = e.dataTransfer.files?.[0]
          if (file) handleFile(file)
        }}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed bg-card px-6 py-14 text-center transition-colors',
          dragging
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary/50 hover:bg-muted/40',
        )}
      >
        <span
          className={cn(
            'flex size-16 items-center justify-center rounded-2xl transition-colors',
            dragging ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary',
          )}
        >
          <UploadCloud className="size-8" />
        </span>
        <div>
          <p className="text-lg font-semibold">
            Drag &amp; drop your product CSV
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            or{' '}
            <span className="font-medium text-primary underline-offset-2 hover:underline">
              browse files
            </span>{' '}
            — up to {MAX_PRODUCTS} products per batch
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5 text-xs text-muted-foreground">
          <FileSpreadsheet className="size-3.5" />
          Columns: name, brand, category, features, keywords, audience
        </div>
        <input
          ref={inputRef}
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
            e.target.value = ''
          }}
        />
      </div>

      {error && (
        <div className="flex items-center justify-between rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          <span>{error}</span>
          <button type="button" onClick={() => setError(null)} aria-label="Dismiss">
            <X className="size-4" />
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={downloadTemplate}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          <Download className="size-4" />
          Download CSV template
        </button>
        <button
          type="button"
          onClick={loadSample}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
        >
          <FileSpreadsheet className="size-4" />
          Try with sample data
        </button>
      </div>
    </div>
  )
}

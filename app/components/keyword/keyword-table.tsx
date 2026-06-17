'use client'

import {
  formatNumber,
  formatVolume,
  type KeywordRow,
} from '@/lib/seo'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { IntentBadge, KdIndicator, Sparkline } from './cells'
import { ArrowDown, ArrowUp, ChevronsUpDown, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

export type SortKey =
  | 'keyword'
  | 'volume'
  | 'difficulty'
  | 'cpc'
  | 'competition'
  | 'results'

type Column = {
  key: SortKey
  label: string
  tip: string
  align: 'left' | 'right' | 'center'
  numeric?: boolean
}

const COLUMNS: Column[] = [
  { key: 'keyword', label: 'Keyword', tip: 'The search query analyzed for this market.', align: 'left' },
  { key: 'volume', label: 'Volume', tip: 'Average number of monthly searches over the last 12 months.', align: 'right', numeric: true },
  { key: 'difficulty', label: 'KD %', tip: 'Keyword Difficulty: how hard it is to rank in the organic top 10. Higher is harder.', align: 'center' },
  { key: 'cpc', label: 'CPC (USD)', tip: 'Average cost-per-click an advertiser pays for this keyword in paid search.', align: 'right', numeric: true },
  { key: 'competition', label: 'Com.', tip: 'Competitive density of advertisers bidding on this keyword (0.00–1.00).', align: 'right', numeric: true },
  { key: 'results', label: 'Results', tip: 'Number of URLs displayed in organic search results for this keyword.', align: 'right', numeric: true },
]

export function KeywordTable({
  rows,
  sortKey,
  sortDir,
  onSort,
}: {
  rows: KeywordRow[]
  sortKey: SortKey
  sortDir: 'asc' | 'desc'
  onSort: (key: SortKey) => void
}) {
  return (
    <div className="relative max-h-[calc(100vh-360px)] min-h-[300px] overflow-auto">
      <table className="w-full border-collapse text-sm">
        <thead className="sticky top-0 z-10">
          <tr className="bg-secondary/80 backdrop-blur">
            {COLUMNS.map((col) => {
              const active = sortKey === col.key
              return (
                <th
                  key={col.key}
                  scope="col"
                  className={cn(
                    'border-b border-border px-3 py-2.5 text-xs font-semibold text-muted-foreground',
                    col.align === 'right' && 'text-right',
                    col.align === 'center' && 'text-center',
                    col.align === 'left' && 'text-left',
                    col.key === 'keyword' &&
                      'sticky left-0 z-20 bg-secondary/95 backdrop-blur',
                  )}
                >
                  <button
                    type="button"
                    onClick={() => onSort(col.key)}
                    className={cn(
                      'inline-flex items-center gap-1 transition-colors hover:text-foreground',
                      col.align === 'right' && 'flex-row-reverse',
                      active && 'text-foreground',
                    )}
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.label}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="size-3 text-muted-foreground/60" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-56">
                          {col.tip}
                        </TooltipContent>
                      </Tooltip>
                    </span>
                    <SortIcon active={active} dir={sortDir} />
                  </button>
                </th>
              )
            })}
            <th
              scope="col"
              className="border-b border-border px-3 py-2.5 text-right text-xs font-semibold text-muted-foreground"
            >
              <span className="inline-flex items-center gap-1">
                Trend
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="size-3 text-muted-foreground/60" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-56">
                    Monthly search interest over the last 12 months.
                  </TooltipContent>
                </Tooltip>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={`${row.keyword}-${i}`}
              className="group border-b border-border/70 transition-colors hover:bg-accent/40"
            >
              <td className="sticky left-0 z-[1] max-w-[280px] bg-card px-3 py-2.5 font-medium text-foreground group-hover:bg-[#f4f8ff]">
                <span className="block truncate">{row.keyword}</span>
              </td>
              <td className="px-3 py-2.5 text-right font-semibold tabular-nums">
                {formatVolume(row.volume)}
              </td>
              <td className="px-3 py-2.5 text-center">
                <div className="flex justify-center">
                  <KdIndicator kd={row.difficulty} />
                </div>
              </td>
              <td className="px-3 py-2.5 text-right tabular-nums text-muted-foreground">
                ${row.cpc.toFixed(2)}
              </td>
              <td className="px-3 py-2.5 text-right tabular-nums text-muted-foreground">
                {row.competition.toFixed(2)}
              </td>
              <td className="px-3 py-2.5 text-right tabular-nums text-muted-foreground">
                {formatNumber(row.results)}
              </td>
              <td className="px-3 py-2.5">
                <div className="flex items-center justify-end gap-2">
                  <Sparkline data={row.trend} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && (
        <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
          No keywords match the current filters.
        </div>
      )}
    </div>
  )
}

function SortIcon({ active, dir }: { active: boolean; dir: 'asc' | 'desc' }) {
  if (!active)
    return <ChevronsUpDown className="size-3 text-muted-foreground/40" />
  return dir === 'asc' ? (
    <ArrowUp className="size-3 text-primary" />
  ) : (
    <ArrowDown className="size-3 text-primary" />
  )
}

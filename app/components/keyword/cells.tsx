'use client'

import { INTENT_CONFIG, kdBand, type Intent } from '@/lib/seo'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

/* ----------------------------- Intent badge ------------------------------ */

export function IntentBadge({ intent }: { intent: Intent }) {
  const cfg = INTENT_CONFIG[intent]
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-semibold leading-none"
          style={{
            color: cfg.text,
            backgroundColor: cfg.bg,
            borderColor: cfg.border,
          }}
        >
          <span
            className="flex size-3.5 items-center justify-center rounded-full text-[9px] font-bold"
            style={{ backgroundColor: cfg.text, color: '#fff' }}
          >
            {cfg.short}
          </span>
          {cfg.label}
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-56">
        <p className="font-semibold">{cfg.label} intent</p>
        <p className="text-muted-foreground">{cfg.description}</p>
      </TooltipContent>
    </Tooltip>
  )
}

/* --------------------------- KD% color indicator -------------------------- */

export function KdIndicator({ kd }: { kd: number }) {
  const band = kdBand(kd)
  const r = 13
  const circ = 2 * Math.PI * r
  const dash = (kd / 100) * circ

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex items-center gap-2">
          <span className="relative inline-flex size-8 items-center justify-center">
            <svg viewBox="0 0 32 32" className="size-8 -rotate-90">
              <circle
                cx="16"
                cy="16"
                r={r}
                fill="none"
                stroke="var(--border)"
                strokeWidth="3"
              />
              <circle
                cx="16"
                cy="16"
                r={r}
                fill="none"
                stroke={band.ring}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circ}`}
              />
            </svg>
            <span
              className="absolute text-[10px] font-bold tabular-nums"
              style={{ color: band.color }}
            >
              {kd}
            </span>
          </span>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p className="font-semibold">
          KD {kd}% ·{' '}
          <span style={{ color: band.ring }}>{band.label}</span>
        </p>
        <p className="text-muted-foreground">
          The estimated difficulty of ranking in the top 10 for this keyword.
        </p>
      </TooltipContent>
    </Tooltip>
  )
}

/* ------------------------------- Sparkline -------------------------------- */

export function Sparkline({
  data,
  width = 96,
  height = 28,
}: {
  data: number[]
  width?: number
  height?: number
}) {
  if (!data || data.length === 0) {
    return <span className="text-xs text-muted-foreground">—</span>
  }
  const max = Math.max(...data, 1)
  const min = Math.min(...data)
  const range = max - min || 1
  const step = width / (data.length - 1 || 1)

  const points = data.map((v, i) => {
    const x = i * step
    const y = height - ((v - min) / range) * (height - 4) - 2
    return [x, y] as const
  })

  const path = points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(' ')
  const areaPath = `${path} L${width},${height} L0,${height} Z`

  const rising = data[data.length - 1] >= data[0]
  const stroke = rising ? '#16a394' : '#e5484d'
  const gradId = `spark-${rising ? 'up' : 'down'}`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className="overflow-visible"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.18" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradId})`} />
      <path
        d={path}
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

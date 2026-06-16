export type Intent =
  | 'informational'
  | 'navigational'
  | 'commercial'
  | 'transactional'

export interface KeywordRow {
  keyword: string
  intent: Intent
  volume: number
  difficulty: number // 0-100
  cpc: number
  competition: number // 0-1
  trend: number[] // 12 monthly points
  results: number
}

export interface KeywordResponse {
  seed: string
  location: string
  source: 'dataforseo' | 'estimated'
  total: number
  summary: {
    totalVolume: number
    avgDifficulty: number
    avgCpc: number
  }
  keywords: KeywordRow[]
}

/**
 * SEMrush-style Keyword Difficulty banding.
 * 0-14 Very Easy (green) · 15-29 Easy (yellow) · 30-84 Hard (orange) · 85-100 Very Hard (red)
 */
export function kdBand(kd: number): {
  label: string
  color: string
  bg: string
  ring: string
} {
  if (kd <= 14)
    return {
      label: 'Very Easy',
      color: '#2e7d32',
      bg: 'rgba(46,125,50,0.12)',
      ring: '#2e7d32',
    }
  if (kd <= 29)
    return {
      label: 'Easy',
      color: '#b58900',
      bg: 'rgba(245,166,35,0.16)',
      ring: '#f5a623',
    }
  if (kd <= 84)
    return {
      label: 'Hard',
      color: '#d35400',
      bg: 'rgba(255,100,45,0.14)',
      ring: '#ff642d',
    }
  return {
    label: 'Very Hard',
    color: '#c62828',
    bg: 'rgba(229,72,77,0.14)',
    ring: '#e5484d',
  }
}

export const INTENT_CONFIG: Record<
  Intent,
  { label: string; short: string; text: string; bg: string; border: string; description: string }
> = {
  informational: {
    label: 'Informational',
    short: 'I',
    text: '#1e40af',
    bg: '#eff5ff',
    border: '#bfd6ff',
    description: 'The user wants to find an answer to a specific question.',
  },
  navigational: {
    label: 'Navigational',
    short: 'N',
    text: '#6b21a8',
    bg: '#f6eeff',
    border: '#e0c8ff',
    description: 'The user wants to find a specific page or brand.',
  },
  commercial: {
    label: 'Commercial',
    short: 'C',
    text: '#92660a',
    bg: '#fff7e6',
    border: '#ffe2a8',
    description: 'The user wants to investigate brands or services before buying.',
  },
  transactional: {
    label: 'Transactional',
    short: 'T',
    text: '#166534',
    bg: '#eafbef',
    border: '#bbf0c9',
    description: 'The user wants to complete an action such as a purchase.',
  },
}

export const COUNTRIES = [
  { code: 'US', name: 'United States', flag: '🇺🇸', locationCode: 2840 },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', locationCode: 2826 },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', locationCode: 2124 },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', locationCode: 2036 },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', locationCode: 2276 },
  { code: 'FR', name: 'France', flag: '🇫🇷', locationCode: 2250 },
  { code: 'IN', name: 'India', flag: '🇮🇳', locationCode: 2356 },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', locationCode: 2724 },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', locationCode: 2380 },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', locationCode: 2076 },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', locationCode: 2528 },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', locationCode: 2784 },
]

export function formatVolume(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`
  return n.toLocaleString('en-US')
}

export function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}

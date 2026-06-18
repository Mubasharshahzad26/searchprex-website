'use client'
 
import { useEffect, useMemo, useState } from 'react'
import {
  Layers,
  Star,
  FolderTree,
  FileSpreadsheet,
  FileText,
  Sparkles,
  Loader2,
  Check,
  BadgeCheck,
  Globe,
  Copy,
  CheckCheck,
  TriangleAlert,
  ListChecks,
  Download,
  Plus,
  Trash2,
} from 'lucide-react'
 
/* ------------------------------------------------------------------ */
/* Data ported from NicheSEO Pro                                       */
/* ------------------------------------------------------------------ */
 
type Vertical = 'ecommerce' | 'local' | 'lawfirm' | 'digital'
 
const VERTICALS: { id: Vertical; label: string }[] = [
  { id: 'ecommerce', label: 'Ecommerce (physical products)' },
  { id: 'local', label: 'Local Business' },
  { id: 'lawfirm', label: 'Law Firm / Legal' },
  { id: 'digital', label: 'Digital / SaaS / Streaming' },
]
 
type Project = {
  label: string
  domain: string
  industry: string
  vertical: Vertical
  audience: string[]
  brands: string[]
  cats: string[]
  pages: string[]
  techFocus?: Record<string, string>
}
 
const PROJECTS: Record<string, Project> = {
  mich: {
    label: 'Michigan Outdoor Sports',
    domain: 'michigansportsoutdoor.com',
    industry: 'Ecommerce — Outdoor Sports',
    vertical: 'ecommerce',
    audience: ['Hunters', 'Anglers', 'Hikers', 'Campers', 'Survivalists'],
    brands: ['Browning', 'Mossy Oak', 'Realtree', 'Sitka', 'First Lite', 'YETI', 'Garmin', 'Bushnell', 'Leupold', 'Vortex'],
    cats: ['Hunting', 'Fishing', 'Camping', 'Archery', 'Optics', 'Footwear', 'Apparel', 'Firearms Acc.'],
    pages: ['Homepage', 'About Us', 'Seasonal Sales', 'Gift Cards', 'Hunting Guide', 'Fishing Reports', 'Blog'],
  },
  smk: {
    label: 'SMK Store — Tactical Gear',
    domain: 'smkstore.com',
    industry: 'Ecommerce — Tactical & Knives',
    vertical: 'ecommerce',
    audience: ['EDC Enthusiasts', 'Knife Collectors', 'Outdoor/Camping', 'Law Enforcement'],
    brands: ['Microtech', 'Benchmade', 'Spyderco', 'Zero Tolerance', 'Kershaw', 'CRKT', 'Cold Steel', 'SOG', 'Gerber', 'Buck'],
    cats: ['Fixed Blade', 'Folding', 'OTF', 'Tactical', 'Hunting', 'Survival', 'Kitchen', 'Multi-Tools', 'Axes', 'Accessories'],
    pages: ['Homepage', 'About SMK', 'Best Sellers', 'New Arrivals', 'On Sale', 'Knife Guide', 'Engraving', 'Wholesale'],
    techFocus: {
      OTF: 'focus on spring tension, deployment speed, and safety lock reliability',
      'Fixed Blade': 'focus on tang construction (full vs partial), heat treatment, and edge retention',
      Folding: 'focus on pivot mechanisms, blade centering, and lock-up stability',
      Survival: 'focus on impact resistance, multi-functionality, and field-sharpening ease',
    },
  },
  iptv: {
    label: '4KLiveHD IPTV',
    domain: '4klivehdiptv.com',
    industry: 'Streaming / Digital Media',
    vertical: 'digital',
    audience: ['Cord-Cutters', 'Sports Fans', 'Expats', 'Movie Buffs', 'Families'],
    brands: [],
    cats: ['Live TV', 'Sports', 'Movies', 'PPV', 'International', 'VOD', 'Kids'],
    pages: ['Homepage', 'Pricing', 'Channels', 'Install Guide', 'FAQ', 'Contact', 'Free Trial', 'Reseller'],
  },
}
 
const TONES = ['Expert + Trustworthy', 'Conversational', 'Tactical/Technical', 'Authoritative', 'Persuasive']
const DEPTHS = [
  '2000–2500 words (Comprehensive)',
  '1500–2000 words (Deep Dive)',
  '1000–1500 words (Standard)',
  '500–800 words (Short)',
]
const EEAT_ELS = [
  'Expert author bio',
  'Use cases',
  'Pro tips',
  'User reviews',
  'Safety warnings',
  'Buying guide',
  'FAQ (schema-ready)',
  'Comparison table',
  'First-hand experience',
]
const HCU_CRITERIA = [
  { id: 'original', label: 'Original research or analysis', eeatMatch: ['First-hand experience', 'Pro tips'] },
  { id: 'substantial', label: 'Substantial, complete description', eeatMatch: ['Buying guide', 'Use cases'] },
  { id: 'insightful', label: 'Insightful analysis beyond obvious', eeatMatch: ['Pro tips', 'Comparison table'] },
  { id: 'title', label: 'Helpful, non-clickbait title', eeatMatch: [] as string[] },
  { id: 'expertise', label: 'Demonstrates first-hand knowledge', eeatMatch: ['First-hand experience', 'Expert author bio'] },
  { id: 'satisfied', label: 'Reader leaves feeling satisfied', eeatMatch: ['FAQ (schema-ready)', 'Buying guide'] },
  { id: 'expert_auth', label: 'Clear evidence of expert authorship', eeatMatch: ['Expert author bio'] },
]
 
const DOMAINS = [
  { id: 'pages', label: 'Main Pages', icon: FileText, contentType: 'Main Page', items: (p: Project) => p.pages },
  { id: 'brands', label: 'Brand Hubs', icon: Star, contentType: 'Brand Hub', items: (p: Project) => p.brands },
  { id: 'cats', label: 'Collections', icon: FolderTree, contentType: 'Collection', items: (p: Project) => p.cats },
  { id: 'bulk', label: 'Bulk CSV', icon: FileSpreadsheet, contentType: 'Product', items: () => [] as string[] },
] as const
 
type SEOContent = {
  pageUrl: string
  focusKeyword: string
  metaTitle: string
  metaDescription: string
  urlSlug: string
  h1Title: string
  contentBody: string
  internalLinks: Array<{ anchor: string; url: string; type: string }>
  externalLinks: Array<{ anchor: string; url: string; type: string }>
  faqs: Array<{ question: string; answer: string }>
  imageSuggestions: Array<{ alt: string; description: string; placement: string }>
  schemaMarkup: string
  technicalAudit: string
  qualityChecklist: { wordCount: number; eeatScore: string; hcuCompliant: boolean }
}
 
type ResultRow = { item: string; content?: SEOContent; error?: string }
 
/* ---- Export helpers (Phase 3) ---- */
function downloadBlob(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
 
function csvCell(v: unknown): string {
  return `"${String(v ?? '').replace(/"/g, '""')}"`
}
 
function exportAllCsv(rows: ResultRow[]) {
  const ok = rows.map((r) => r.content).filter(Boolean) as SEOContent[]
  if (!ok.length) return
  const headers = [
    'Item', 'Focus Keyword', 'Meta Title', 'Meta Description', 'URL Slug', 'H1',
    'Content HTML', 'FAQs', 'Schema JSON-LD', 'Internal Links', 'External Links',
    'Word Count', 'EEAT Score',
  ]
  const lines = [headers.map(csvCell).join(',')]
  for (const c of ok) {
    const faqs = (c.faqs || []).map((f) => `Q: ${f.question} | A: ${f.answer}`).join(' || ')
    const internal = (c.internalLinks || []).map((l) => `${l.anchor} -> ${l.url}`).join(' || ')
    const external = (c.externalLinks || []).map((l) => `${l.anchor} -> ${l.url}`).join(' || ')
    lines.push([
      c.pageUrl, c.focusKeyword, c.metaTitle, c.metaDescription, c.urlSlug, c.h1Title,
      c.contentBody, faqs, c.schemaMarkup, internal, external,
      c.qualityChecklist?.wordCount, c.qualityChecklist?.eeatScore,
    ].map(csvCell).join(','))
  }
  downloadBlob('\uFEFF' + lines.join('\r\n'), `content-suite-${Date.now()}.csv`, 'text/csv;charset=utf-8')
}
 
function exportAllJson(rows: ResultRow[]) {
  const ok = rows.map((r) => r.content).filter(Boolean)
  if (!ok.length) return
  downloadBlob(JSON.stringify(ok, null, 2), `content-suite-${Date.now()}.json`, 'application/json')
}
 
function exportAllDoc(rows: ResultRow[]) {
  const ok = rows.map((r) => r.content).filter(Boolean) as SEOContent[]
  if (!ok.length) return
  const sections = ok
    .map(
      (c) => `
    <h1>${c.h1Title}</h1>
    <p><b>Focus Keyword:</b> ${c.focusKeyword}<br/>
    <b>Meta Title:</b> ${c.metaTitle}<br/>
    <b>Meta Description:</b> ${c.metaDescription}<br/>
    <b>URL Slug:</b> ${c.urlSlug}</p>
    ${c.contentBody}
    <h2>FAQs</h2>
    ${(c.faqs || []).map((f) => `<p><b>${f.question}</b><br/>${f.answer}</p>`).join('')}
    <hr/>`,
    )
    .join('')
  const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"></head><body>${sections}</body></html>`
  downloadBlob(html, `content-suite-${Date.now()}.doc`, 'application/msword')
}
 
/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
 
export default function GenerationEngine() {
  const [projectKey, setProjectKey] = useState<string>('mich')
  const [customProjects, setCustomProjects] = useState<Record<string, Project>>({})
  const [showAddForm, setShowAddForm] = useState(false)
  const [draft, setDraft] = useState({
    label: '',
    domain: '',
    industry: '',
    vertical: 'ecommerce' as Vertical,
    audience: '',
    brands: '',
    cats: '',
    pages: '',
  })
 
  useEffect(() => {
    try {
      const raw = localStorage.getItem('sp_custom_projects')
      if (raw) setCustomProjects(JSON.parse(raw))
    } catch {
      /* ignore */
    }
  }, [])
 
  const allProjects: Record<string, Project> = { ...PROJECTS, ...customProjects }
  const project = allProjects[projectKey] ?? PROJECTS.mich
 
  const [domainId, setDomainId] = useState<(typeof DOMAINS)[number]['id']>('pages')
  const domain = DOMAINS.find((d) => d.id === domainId)!
 
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [customItems, setCustomItems] = useState('')
 
  const [tone, setTone] = useState(TONES[0])
  const [depth, setDepth] = useState(DEPTHS[2])
  const [eeat, setEeat] = useState<Record<string, boolean>>({})
  const [fieldNotes, setFieldNotes] = useState('')
  const [storeData, setStoreData] = useState('')
  const [grounding, setGrounding] = useState(true)
  const [hcuOverride, setHcuOverride] = useState<Record<string, boolean>>({})
 
  const [generating, setGenerating] = useState(false)
  const [progress, setProgress] = useState({ done: 0, total: 0, current: '' })
  const [results, setResults] = useState<ResultRow[]>([])
 
  const domainItems = domain.items(project)
  const bulkItems = customItems
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
 
  const activeEeat = Object.keys(eeat).filter((k) => eeat[k])
 
  const suggestedHcu = useMemo(() => {
    const s = new Set<string>()
    for (const c of HCU_CRITERIA) if (c.eeatMatch.some((m) => activeEeat.includes(m))) s.add(c.id)
    return s
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eeat])
 
  const isHcuChecked = (id: string) =>
    hcuOverride[id] !== undefined ? hcuOverride[id] : suggestedHcu.has(id)
  const hcuScore = HCU_CRITERIA.filter((c) => isHcuChecked(c.id)).length
 
  function toggleItem(item: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(item) ? next.delete(item) : next.add(item)
      return next
    })
  }
 
  const itemsToGenerate = domain.id === 'bulk' ? bulkItems : Array.from(selected)
 
  function saveCustomProject() {
    const label = draft.label.trim()
    const domainName = draft.domain.trim()
    if (!label || !domainName) return
    const key = 'custom_' + domainName.replace(/[^a-z0-9]/gi, '_').toLowerCase()
    const splitList = (s: string) =>
      s
        .split(',')
        .map((x) => x.trim())
        .filter(Boolean)
    const newProject: Project = {
      label,
      domain: domainName,
      industry: draft.industry.trim() || 'General',
      vertical: draft.vertical,
      audience: splitList(draft.audience).length ? splitList(draft.audience) : ['general audience'],
      brands: splitList(draft.brands),
      cats: splitList(draft.cats).length ? splitList(draft.cats) : ['General'],
      pages: splitList(draft.pages).length ? splitList(draft.pages) : ['Homepage', 'About', 'Contact'],
    }
    const updated = { ...customProjects, [key]: newProject }
    setCustomProjects(updated)
    try {
      localStorage.setItem('sp_custom_projects', JSON.stringify(updated))
    } catch {
      /* ignore */
    }
    setProjectKey(key)
    setSelected(new Set())
    setDraft({ label: '', domain: '', industry: '', vertical: 'ecommerce', audience: '', brands: '', cats: '', pages: '' })
    setShowAddForm(false)
  }
 
  function deleteCustomProject(key: string) {
    const updated = { ...customProjects }
    delete updated[key]
    setCustomProjects(updated)
    try {
      localStorage.setItem('sp_custom_projects', JSON.stringify(updated))
    } catch {
      /* ignore */
    }
    if (projectKey === key) {
      setProjectKey('mich')
      setSelected(new Set())
    }
  }
 
  async function generate() {
    if (!itemsToGenerate.length || generating) return
    setGenerating(true)
    setResults([])
    setProgress({ done: 0, total: itemsToGenerate.length, current: '' })
 
    const collected: ResultRow[] = []
    for (let i = 0; i < itemsToGenerate.length; i++) {
      const item = itemsToGenerate[i]
      setProgress({ done: i, total: itemsToGenerate.length, current: item })
      try {
        const res = await fetch('/api/generate-suite', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            item,
            contentType: domain.contentType,
            tone,
            depth,
            audience: project.audience.join(', '),
            eeatSettings: eeat,
            fieldNotes,
            inventoryData: storeData,
            enableWebSearch: grounding,
            projectData: {
              label: project.label,
              domain: project.domain,
              industry: project.industry,
              vertical: project.vertical,
              brands: project.brands,
              techFocus: project.techFocus,
            },
          }),
        })
        const json = await res.json()
        if (!res.ok) throw new Error(json.error || 'Generation failed')
        collected.push({ item, content: json.content as SEOContent })
      } catch (e) {
        collected.push({ item, error: e instanceof Error ? e.message : 'Failed' })
      }
      setResults([...collected])
    }
 
    setProgress({ done: itemsToGenerate.length, total: itemsToGenerate.length, current: '' })
    setGenerating(false)
  }
 
  return (
    <div className="flex flex-col gap-5 px-4 py-5 md:px-6">
      {/* Heading */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          <h1 className="text-xl font-bold tracking-tight">NicheSEO Pro — Content Suite</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Generate original, E-E-A-T-driven, HCU-compliant content at scale — meta, headings,
          full HTML body, FAQs, internal/external links, and JSON-LD schema.
        </p>
        <div className="mt-1.5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            <BadgeCheck className="size-4" />
            Built by Mubashar Shahzad · Founder &amp; Verified SEO Expert
          </span>
        </div>
      </div>
 
      {/* ---- Config card ---- */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Layers className="size-4" />
          </span>
          <div>
            <h2 className="text-sm font-bold">Generation Engine</h2>
            <p className="text-xs text-muted-foreground">Configure content parameters</p>
          </div>
        </div>
 
        <div className="flex flex-col gap-5 p-4">
          {/* Project */}
          <Field label="Project">
            <div className="flex gap-2">
              <select
                value={projectKey}
                onChange={(e) => {
                  setProjectKey(e.target.value)
                  setSelected(new Set())
                }}
                className="h-10 flex-1 rounded-lg border border-border bg-background px-3 text-sm font-medium outline-none focus:border-primary"
              >
                {Object.entries(allProjects).map(([k, p]) => (
                  <option key={k} value={k}>
                    {customProjects[k] ? '★ ' : ''}
                    {p.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setShowAddForm((v) => !v)}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-semibold transition-colors hover:bg-muted"
              >
                <Plus className="size-4" />
                Add Project
              </button>
              {customProjects[projectKey] && (
                <button
                  type="button"
                  onClick={() => deleteCustomProject(projectKey)}
                  className="inline-flex h-10 items-center justify-center rounded-lg border border-destructive/30 bg-destructive/5 px-2.5 text-destructive transition-colors hover:bg-destructive/10"
                  title="Delete this custom project"
                >
                  <Trash2 className="size-4" />
                </button>
              )}
            </div>
 
            {showAddForm && (
              <div className="mt-2 flex flex-col gap-2 rounded-lg border border-border bg-muted/30 p-3">
                <div className="grid gap-2 sm:grid-cols-2">
                  <input
                    value={draft.label}
                    onChange={(e) => setDraft({ ...draft, label: e.target.value })}
                    placeholder="Project label * (e.g. Acme Tools)"
                    className="h-9 rounded-md border border-border bg-background px-2.5 text-sm outline-none focus:border-primary"
                  />
                  <input
                    value={draft.domain}
                    onChange={(e) => setDraft({ ...draft, domain: e.target.value })}
                    placeholder="Domain * (e.g. acmetools.com)"
                    className="h-9 rounded-md border border-border bg-background px-2.5 text-sm outline-none focus:border-primary"
                  />
                  <input
                    value={draft.industry}
                    onChange={(e) => setDraft({ ...draft, industry: e.target.value })}
                    placeholder="Industry (e.g. Ecommerce — Tools)"
                    className="h-9 rounded-md border border-border bg-background px-2.5 text-sm outline-none focus:border-primary sm:col-span-2"
                  />
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      Business Type — tunes the content engine
                    </label>
                    <select
                      value={draft.vertical}
                      onChange={(e) => setDraft({ ...draft, vertical: e.target.value as Vertical })}
                      className="h-9 w-full rounded-md border border-border bg-background px-2.5 text-sm outline-none focus:border-primary"
                    >
                      {VERTICALS.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    value={draft.audience}
                    onChange={(e) => setDraft({ ...draft, audience: e.target.value })}
                    placeholder="Audience, comma-separated"
                    className="h-9 rounded-md border border-border bg-background px-2.5 text-sm outline-none focus:border-primary sm:col-span-2"
                  />
                  <input
                    value={draft.brands}
                    onChange={(e) => setDraft({ ...draft, brands: e.target.value })}
                    placeholder="Brands, comma-separated"
                    className="h-9 rounded-md border border-border bg-background px-2.5 text-sm outline-none focus:border-primary"
                  />
                  <input
                    value={draft.cats}
                    onChange={(e) => setDraft({ ...draft, cats: e.target.value })}
                    placeholder="Collections / Categories, comma-separated"
                    className="h-9 rounded-md border border-border bg-background px-2.5 text-sm outline-none focus:border-primary"
                  />
                  <input
                    value={draft.pages}
                    onChange={(e) => setDraft({ ...draft, pages: e.target.value })}
                    placeholder="Main Pages, comma-separated (e.g. Homepage, About, Contact)"
                    className="h-9 rounded-md border border-border bg-background px-2.5 text-sm outline-none focus:border-primary sm:col-span-2"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={saveCustomProject}
                    disabled={!draft.label.trim() || !draft.domain.trim()}
                    className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                  >
                    <Plus className="size-3.5" /> Save Project
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
                  >
                    Cancel
                  </button>
                  <span className="text-[11px] text-muted-foreground">
                    * required. Saved in this browser.
                  </span>
                </div>
              </div>
            )}
          </Field>
 
          {/* Content domain tabs */}
          <Field label="Content Domain">
            <div className="flex flex-wrap gap-2">
              {DOMAINS.map((d) => {
                const Icon = d.icon
                const active = d.id === domainId
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      setDomainId(d.id)
                      setSelected(new Set())
                    }}
                    className={
                      'inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ' +
                      (active
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-background hover:bg-muted')
                    }
                  >
                    <Icon className="size-3.5" />
                    {d.label}
                  </button>
                )
              })}
            </div>
          </Field>
 
          {/* Items */}
          {domain.id === 'bulk' ? (
            <Field label="Bulk items (one per line — product names or URLs)">
              <textarea
                value={customItems}
                onChange={(e) => setCustomItems(e.target.value)}
                rows={5}
                placeholder={'Benchmade Bugout 535\nMicrotech Ultratech OTF\nKershaw Leek 1660'}
                className="w-full resize-y rounded-lg border border-border bg-background p-3 text-sm outline-none focus:border-primary"
              />
              <p className="mt-1 text-xs text-muted-foreground">{bulkItems.length} item(s) ready</p>
            </Field>
          ) : (
            <Field
              label={
                <span className="flex items-center justify-between">
                  <span>Select Items</span>
                  <span className="flex gap-3 text-[11px] font-medium">
                    <button
                      type="button"
                      onClick={() => setSelected(new Set(domainItems))}
                      className="text-primary hover:underline"
                    >
                      Select all
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelected(new Set())}
                      className="text-muted-foreground hover:underline"
                    >
                      Clear
                    </button>
                  </span>
                </span>
              }
            >
              {domainItems.length === 0 ? (
                <p className="text-xs text-muted-foreground">No items for this domain on this project.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {domainItems.map((item) => {
                    const on = selected.has(item)
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleItem(item)}
                        className={
                          'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ' +
                          (on
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-background hover:bg-muted')
                        }
                      >
                        <span
                          className={
                            'flex size-4 items-center justify-center rounded border ' +
                            (on ? 'border-primary bg-primary text-primary-foreground' : 'border-border')
                          }
                        >
                          {on && <Check className="size-3" />}
                        </span>
                        {item}
                      </button>
                    )
                  })}
                </div>
              )}
            </Field>
          )}
 
          {/* Tone + Depth */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Tone / Voice">
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary"
              >
                {TONES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="Depth / Length">
              <select
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
                className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary"
              >
                {DEPTHS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </Field>
          </div>
 
          {/* E-E-A-T chips */}
          <Field label="E-E-A-T Strategy">
            <div className="flex flex-wrap gap-2">
              {EEAT_ELS.map((el) => {
                const on = !!eeat[el]
                return (
                  <button
                    key={el}
                    type="button"
                    onClick={() => setEeat((p) => ({ ...p, [el]: !p[el] }))}
                    className={
                      'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ' +
                      (on
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-background hover:bg-muted')
                    }
                  >
                    {el}
                  </button>
                )
              })}
            </div>
          </Field>
 
          {/* Expert data injection */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Field Notes (testing insights)">
              <textarea
                value={fieldNotes}
                onChange={(e) => setFieldNotes(e.target.value)}
                rows={3}
                placeholder="e.g. We found the 2026 Microtech series spring tension to be ~15% softer than previous years…"
                className="w-full resize-y rounded-lg border border-border bg-background p-3 text-sm outline-none focus:border-primary"
              />
            </Field>
            <Field label="Store Data (inventory / price trends)">
              <textarea
                value={storeData}
                onChange={(e) => setStoreData(e.target.value)}
                rows={3}
                placeholder="e.g. Current stock low on Benchmade. Prices trending up 5% industry-wide this quarter…"
                className="w-full resize-y rounded-lg border border-border bg-background p-3 text-sm outline-none focus:border-primary"
              />
            </Field>
          </div>
 
          {/* HCU checklist */}
          <Field
            label={
              <span className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ListChecks className="size-3.5" /> Google HCU Compliance Checklist
                </span>
                <span className="text-[11px] font-bold text-primary">{hcuScore}/7 Passed</span>
              </span>
            }
          >
            <div className="flex flex-col gap-1.5">
              {HCU_CRITERIA.map((c) => {
                const on = isHcuChecked(c.id)
                const suggested = suggestedHcu.has(c.id)
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setHcuOverride((p) => ({ ...p, [c.id]: !on }))}
                    className={
                      'flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors ' +
                      (on ? 'border-emerald-200 bg-emerald-50' : 'border-border bg-background hover:bg-muted')
                    }
                  >
                    <span
                      className={
                        'flex size-4 shrink-0 items-center justify-center rounded border ' +
                        (on ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-border')
                      }
                    >
                      {on && <Check className="size-3" />}
                    </span>
                    <span className={on ? 'text-emerald-900' : ''}>{c.label}</span>
                    {suggested && (
                      <span className="ml-auto rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                        Suggested
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
            <p className="mt-1.5 text-[11px] text-muted-foreground">
              Items marked <span className="font-semibold text-primary">Suggested</span> are auto-recommended from your
              E-E-A-T selection.
            </p>
          </Field>
 
          {/* Grounding + Generate */}
          <div className="flex flex-col gap-3 border-t border-border pt-4">
            <button
              type="button"
              onClick={() => setGrounding((g) => !g)}
              className="flex items-center gap-2 text-sm font-medium"
            >
              <span
                className={
                  'relative h-5 w-9 rounded-full transition-colors ' + (grounding ? 'bg-primary' : 'bg-muted')
                }
              >
                <span
                  className={
                    'absolute top-0.5 size-4 rounded-full bg-white transition-all ' +
                    (grounding ? 'left-[18px]' : 'left-0.5')
                  }
                />
              </span>
              <Globe className="size-4 text-muted-foreground" />
              Grounding Search {grounding ? '(on)' : '(off)'}
            </button>
 
            <button
              type="button"
              onClick={generate}
              disabled={generating || itemsToGenerate.length === 0}
              className="flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {generating ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Generating {progress.done + 1}/{progress.total}…
                </>
              ) : (
                <>
                  <Sparkles className="size-5" />
                  Generate Full Content Suite ({itemsToGenerate.length})
                </>
              )}
            </button>
 
            {generating && (
              <div className="space-y-1">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${progress.total ? (progress.done / progress.total) * 100 : 0}%` }}
                  />
                </div>
                <p className="truncate text-xs text-muted-foreground">Working on: {progress.current}</p>
              </div>
            )}
          </div>
        </div>
      </div>
 
      {/* ---- Export All bar ---- */}
      {results.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-3 shadow-sm">
          <div className="text-sm">
            <span className="font-semibold text-foreground">{results.filter((r) => r.content).length}</span> generated
            {results.some((r) => r.error) && (
              <span className="text-destructive"> · {results.filter((r) => r.error).length} failed</span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => exportAllCsv(results)}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Download className="size-3.5" />
              CSV (WP / Shopify)
            </button>
            <button
              type="button"
              onClick={() => exportAllDoc(results)}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
            >
              <Download className="size-3.5" />
              Word (.doc)
            </button>
            <button
              type="button"
              onClick={() => exportAllJson(results)}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
            >
              <Download className="size-3.5" />
              JSON
            </button>
          </div>
        </div>
      )}
 
      {/* ---- Results ---- */}
      {results.map((r, i) => (
        <ResultCard key={`${r.item}-${i}`} row={r} />
      ))}
    </div>
  )
}
 
/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */
 
function Field({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</div>
      {children}
    </div>
  )
}
 
function CopyButton({ text, label }: { text: string; label: string }) {
  const [done, setDone] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setDone(true)
          setTimeout(() => setDone(false), 1500)
        } catch {
          /* ignore */
        }
      }}
      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium transition-colors hover:bg-muted"
    >
      {done ? <CheckCheck className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
      {done ? 'Copied' : label}
    </button>
  )
}
 
function ResultCard({ row }: { row: ResultRow }) {
  if (row.error) {
    return (
      <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
        <TriangleAlert className="mt-0.5 size-4 shrink-0" />
        <div>
          <strong>{row.item}</strong> — {row.error}
        </div>
      </div>
    )
  }
  const c = row.content!
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3">
        <div className="min-w-0">
          <h3 className="truncate font-bold">{c.h1Title}</h3>
          <p className="text-xs text-muted-foreground">
            Focus: <span className="font-medium text-foreground">{c.focusKeyword}</span> · {c.qualityChecklist?.wordCount}{' '}
            words · EEAT {c.qualityChecklist?.eeatScore}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <CopyButton text={c.contentBody} label="Copy HTML" />
          <CopyButton text={`${c.metaTitle}\n${c.metaDescription}`} label="Copy Meta" />
          <CopyButton text={c.schemaMarkup} label="Copy Schema" />
          <CopyButton text={JSON.stringify(c, null, 2)} label="Copy JSON" />
        </div>
      </div>
 
      <div className="flex flex-col gap-4 p-4">
        {/* Meta */}
        <div className="grid gap-2 text-sm sm:grid-cols-2">
          <Meta label="Meta Title" value={c.metaTitle} />
          <Meta label="URL Slug" value={c.urlSlug} />
          <Meta label="Meta Description" value={c.metaDescription} full />
        </div>
 
        {/* Body */}
        <div>
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Content Body</div>
          <div
            className="max-h-96 overflow-y-auto rounded-lg border border-border bg-background p-4 text-sm leading-relaxed [&_h2]:mb-2 [&_h2]:mt-4 [&_h2]:text-base [&_h2]:font-bold [&_h3]:mb-1 [&_h3]:mt-3 [&_h3]:font-semibold [&_li]:my-0.5 [&_p]:my-2 [&_table]:my-2 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_td]:p-1.5 [&_th]:border [&_th]:border-border [&_th]:p-1.5 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5"
            dangerouslySetInnerHTML={{ __html: c.contentBody }}
          />
        </div>
 
        {/* FAQs */}
        {c.faqs?.length > 0 && (
          <div>
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">FAQs</div>
            <div className="flex flex-col gap-2">
              {c.faqs.map((f, i) => (
                <div key={i} className="rounded-lg border border-border bg-background p-3 text-sm">
                  <p className="font-semibold">{f.question}</p>
                  <p className="mt-1 text-muted-foreground">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
 
        {/* Links + technical audit */}
        <div className="grid gap-4 sm:grid-cols-2">
          {c.internalLinks?.length > 0 && (
            <LinkList title="Internal Links" links={c.internalLinks} />
          )}
          {c.externalLinks?.length > 0 && (
            <LinkList title="External Links" links={c.externalLinks} />
          )}
        </div>
 
        {c.technicalAudit && (
          <div className="rounded-lg border border-border bg-muted/40 p-3 text-sm">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Technical Audit
            </div>
            <p className="text-muted-foreground">{c.technicalAudit}</p>
          </div>
        )}
      </div>
    </div>
  )
}
 
function Meta({ label, value, full }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="rounded-md border border-border bg-background px-2.5 py-1.5 text-sm">{value}</div>
    </div>
  )
}
 
function LinkList({
  title,
  links,
}: {
  title: string
  links: Array<{ anchor: string; url: string; type: string }>
}) {
  return (
    <div>
      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</div>
      <ul className="flex flex-col gap-1 text-sm">
        {links.map((l, i) => (
          <li key={i} className="truncate">
            <span className="font-medium">{l.anchor}</span>{' '}
            <span className="text-xs text-muted-foreground">→ {l.url}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
 




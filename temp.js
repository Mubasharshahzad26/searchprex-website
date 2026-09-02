const fs = require('fs');
const content = `import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle2, ExternalLink, Link2, Mail, MapPin, Search, ShieldAlert, TrendingDown, Globe, HelpCircle, BarChart3, Clock, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import type { DashboardData } from '@/lib/linkbuilding/dashboard-data';

type Tab = 'overview' | 'links' | 'prospects' | 'citations' | 'outreach' | 'properties';

const TABS: Array<{ id: Tab; label: string; icon: typeof Link2 }> = [
  { id: 'overview', label: 'Overview', icon: Activity },
  { id: 'links', label: 'Links', icon: Link2 },
  { id: 'prospects', label: 'Prospects', icon: Search },
  { id: 'citations', label: 'Citations', icon: MapPin },
  { id: 'outreach', label: 'Outreach', icon: Mail },
  { id: 'properties', label: 'Properties', icon: Globe },
];

const STATUS_STYLE: Record<string, string> = {
  live: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  nofollowed: 'text-amber-700 bg-amber-50 border-amber-200',
  changed: 'text-sky-700 bg-sky-50 border-sky-200',
  lost: 'text-rose-700 bg-rose-50 border-rose-200',
  page_gone: 'text-rose-700 bg-rose-50 border-rose-200',
  unreachable: 'text-slate-600 bg-slate-50 border-slate-200',
  pending: 'text-slate-600 bg-slate-50 border-slate-200',
  consistent: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  inconsistent: 'text-rose-700 bg-rose-50 border-rose-200',
  unverified: 'text-slate-600 bg-slate-50 border-slate-200',
  not_found: 'text-rose-700 bg-rose-50 border-rose-200',
};

function Pill({ status }: { status: string }) {
  const style = STATUS_STYLE[status] ?? 'text-slate-600 bg-slate-50 border-slate-200';
  return (
    <span className={_B_inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium shadow-sm ${_D_style}_B_}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}

function Stat({ label, value, hint, tone = 'default' }: { label: string; value: string | number; hint?: string; tone?: 'default' | 'good' | 'bad' | 'muted'; }) {
  const valueColor = tone === 'good' ? 'text-emerald-600' : tone === 'bad' ? 'text-rose-600' : tone === 'muted' ? 'text-slate-400' : 'text-slate-900';
  return (
    <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }} className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</div>
      <div className={_B_mt-2 text-3xl font-bold tabular-nums tracking-tight ${_D_valueColor}_B_}>{value}</div>
      {hint && <div className="mt-2 text-xs font-medium text-slate-400">{hint}</div>}
      <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-slate-50 opacity-50" />
    </motion.div>
  );
}

function Panel({ title, note, children }: { title: string; note?: string; children: React.ReactNode; }) {
  return (
    <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <header className="border-b border-slate-100 bg-slate-50/50 px-5 py-4">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        {note && <p className="mt-1 text-xs font-medium text-slate-500">{note}</p>}
      </header>
      <div className="p-5">{children}</div>
    </motion.section>
  );
}

function Empty({ text, hint }: { text: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 mb-3">
        <HelpCircle className="h-6 w-6 text-slate-400" />
      </div>
      <p className="text-sm font-medium text-slate-600">{text}</p>
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

export default function LinksDashboard({ data }: { data: DashboardData }) {
  const [tab, setTab] = useState<Tab>('overview');

  if ('dbError' in data) {
    return (
      <div className="mx-auto max-w-lg p-6">
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-6 w-6 text-rose-500" />
            <h2 className="text-base font-semibold text-rose-900">Dashboard Unavailable</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-rose-700">{data.dbError}</p>
        </div>
      </div>
    );
  }

  const { campaigns, links, prospects, citations, outreach, properties } = data;

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8 font-sans">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Link Building</h1>
            <p className="mt-2 text-sm text-slate-500 font-medium">Autopilot performance and health monitoring.</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
            <Clock className="h-3.5 w-3.5" /> Live Data
          </div>
        </div>
      </header>

      <nav className="mb-8 flex space-x-1 overflow-x-auto rounded-xl bg-slate-100 p-1 shadow-inner hide-scrollbar">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setTab(id)} className={_B_relative flex min-w-max items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${_D_tab === id ? 'text-slate-900 shadow-sm' : 'text-slate-500'}_B_}>
            {tab === id && <motion.div layoutId="active-tab" className="absolute inset-0 rounded-lg bg-white" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
            <span className="relative z-10 flex items-center gap-2">
              <Icon className={_B_h-4 w-4 ${_D_tab === id ? 'text-blue-600' : 'opacity-70'}_B_} /> {label}
            </span>
          </button>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
          {tab === 'overview' && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Stat label="Live Links" value={links.live} tone="good" hint="Total active placements" />
                <Stat label="Lost (This Month)" value={links.lostThisMonth} tone={links.lostThisMonth > 0 ? 'bad' : 'good'} hint="Requires replacement" />
                <Stat label="Pending Outreach" value={outreach.sent} hint="Emails sent, awaiting reply" />
                <Stat label="Total Prospects" value={prospects.discovered} hint="In the pipeline" />
              </div>
              <Panel title="Active Campaigns" note="The engine evaluates these domains weekly.">
                {campaigns.length === 0 ? <Empty text="No active campaigns" /> : (
                  <div className="space-y-3">
                    {campaigns.map((c, i) => (
                      <motion.div key={c.id} className="flex justify-between p-4 rounded-xl border border-slate-100 bg-slate-50">
                        <div><h4 className="text-sm font-bold">{c.clientName}</h4><div className="text-xs text-slate-500">{c.targetDomain}</div></div>
                        <div className="flex gap-6"><div className="text-right text-xs">Placements<div className="text-base font-semibold">{c.placements}</div></div></div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </Panel>
            </div>
          )}

          {tab === 'links' && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Stat label="Total Monitored" value={links.total} />
                <Stat label="Live & Followed" value={links.live} tone="good" />
              </div>
              <Panel title="Recent Checks">
                {data.recentChecks.length === 0 ? <Empty text="No checks run yet" /> : (
                  <div className="space-y-3">
                    {data.recentChecks.map((c, i) => (
                      <motion.div key={i} className="flex p-4 rounded-xl border border-slate-100 bg-slate-50">
                        <div className="flex-1"><Pill status={c.status} /><a href={c.sourceUrl} className="block mt-2 text-sm font-semibold hover:text-blue-600">{c.sourceUrl}</a></div>
                        {c.reasons && c.reasons.length > 0 && <div className="px-3 py-2 text-xs text-rose-700 bg-rose-50 rounded-lg">{c.reasons.join(', ')}</div>}
                      </motion.div>
                    ))}
                  </div>
                )}
              </Panel>
            </div>
          )}

          {tab === 'prospects' && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Stat label="Discovered" value={prospects.discovered} />
                <Stat label="Qualified" value={prospects.qualified} tone="good" />
              </div>
              <Panel title="Top Prospects">
                {data.topProspects.length === 0 ? <Empty text="No qualified prospects found" /> : (
                  <div className="space-y-3">
                    {data.topProspects.map((p, i) => (
                      <motion.div key={i} className="flex justify-between p-4 rounded-xl border border-slate-100 bg-slate-50">
                        <div className="flex-1"><span className="text-xs font-bold mr-2">{p.score}</span><h4 className="text-sm font-bold inline">{p.domain}</h4></div>
                        <a href={p.url} className="text-xs font-semibold px-3 py-1 bg-white border rounded-lg">Visit</a>
                      </motion.div>
                    ))}
                  </div>
                )}
              </Panel>
            </div>
          )}

          {tab === 'outreach' && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <Stat label="Awaiting Approval" value={outreach.awaitingApproval} />
                <Stat label="Sent" value={outreach.sent} />
              </div>
            </div>
          )}

          {tab === 'properties' && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Stat label="Properties" value={properties.total} />
                <Stat label="Live" value={properties.live} />
              </div>
            </div>
          )}

          {tab === 'citations' && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Stat label="To submit" value={citations.queued} />
                <Stat label="Consistent" value={citations.consistent} tone="good" />
              </div>
            </div>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
`.replace(/_B_/g, '`').replace(/_D_/g, '$');
fs.writeFileSync('components/linkbuilding/LinksDashboard.tsx', "'use client';\n" + content, 'utf8');

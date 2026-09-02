'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle, CheckCircle2, ExternalLink, Link2, Mail, MapPin,
  Search, ShieldAlert, TrendingDown, Globe, HelpCircle, BarChart3, Clock,
  ArrowUpRight, ArrowDownRight, Activity
} from 'lucide-react';
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
    <span className={\inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium shadow-sm \\}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}

function Stat({
  label, value, hint, tone = 'default',
}: {
  label: string;
  value: string | number;
  hint?: string;
  tone?: 'default' | 'good' | 'bad' | 'muted';
}) {
  const valueColor =
    tone === 'good' ? 'text-emerald-600'
      : tone === 'bad' ? 'text-rose-600'
        : tone === 'muted' ? 'text-slate-400'
          : 'text-slate-900';

  return (
    <motion.div 
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</div>
      <div className={\mt-2 text-3xl font-bold tabular-nums tracking-tight \\}>{value}</div>
      {hint && <div className="mt-2 text-xs font-medium text-slate-400">{hint}</div>}
      
      {/* Decorative gradient blob */}
      <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-slate-50 opacity-50" />
    </motion.div>
  );
}

function Panel({
  title, note, children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
    >
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

function host(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
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
          <p className="mt-3 text-sm leading-relaxed text-rose-700">
            The link building database could not be reached. The cron jobs will continue 
            to fail until the connection is restored.
          </p>
          <pre className="mt-4 rounded-lg bg-white p-3 text-xs text-rose-600 shadow-inner overflow-x-auto">
            {data.dbError}
          </pre>
        </div>
      </div>
    );
  }

  const { campaigns, links, prospects, citations, outreach, properties } = data;

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8 font-sans">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Link Building</h1>
            <p className="mt-2 text-sm text-slate-500 font-medium">
              Autopilot performance and health monitoring across all active campaigns.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
            <Clock className="h-3.5 w-3.5" />
            Live Data
          </div>
        </div>
      </header>

      {/* Tabs */}
      <nav className="mb-8 flex space-x-1 overflow-x-auto rounded-xl bg-slate-100 p-1 shadow-inner hide-scrollbar">
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = tab === id;
          return (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={\elative flex min-w-max items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 \\}
            >
              {isActive && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 rounded-lg bg-white"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className={\h-4 w-4 \\} />
                {label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          
          {/* OVERVIEW TAB */}
          {tab === 'overview' && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Stat label="Live Links" value={links.live} tone="good" hint="Total active placements" />
                <Stat label="Lost (This Month)" value={links.lostThisMonth} tone={links.lostThisMonth > 0 ? 'bad' : 'good'} hint="Requires replacement" />
                <Stat label="Pending Outreach" value={outreach.sent} hint="Emails sent, awaiting reply" />
                <Stat label="Total Prospects" value={prospects.discovered} hint="In the pipeline" />
              </div>

              <Panel title="Active Campaigns" note="The engine evaluates these domains weekly.">
                {campaigns.length === 0 ? (
                  <Empty text="No active campaigns" hint="Create one via the CLI." />
                ) : (
                  <div className="space-y-3">
                    {campaigns.map((c, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={c.id} 
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 transition-colors hover:bg-slate-100/70"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900">{c.clientName}</h4>
                            {!c.enabled && <Pill status="paused" />}
                          </div>
                          <div className="mt-1 text-xs font-medium text-slate-500">{c.targetDomain}</div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <div className="text-xs font-medium text-slate-400 uppercase tracking-wide">Placements</div>
                            <div className="text-base font-semibold text-slate-900">{c.placements}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-medium text-slate-400 uppercase tracking-wide">Prospects</div>
                            <div className="text-base font-semibold text-slate-900">{c.prospects}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </Panel>
            </div>
          )}

          {/* LINKS TAB */}
          {tab === 'links' && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Stat label="Total Monitored" value={links.total} />
                <Stat label="Live & Followed" value={links.live} tone="good" />
                <Stat label="Nofollowed" value={links.nofollowed} tone="muted" hint="Still passes traffic" />
                <Stat label="Pending Check" value={links.pending} hint="Awaiting next cron" />
              </div>

              <Panel title="Recent Checks" note="The last 10 verification results across all campaigns.">
                {data.recentChecks.length === 0 ? (
                  <Empty text="No checks run yet" hint="The verification cron runs every 12 hours." />
                ) : (
                  <div className="space-y-3">
                    {data.recentChecks.map((c, i) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={c.id} 
                        className="flex flex-col md:flex-row md:items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3">
                            <Pill status={c.status} />
                            <span className="text-xs font-medium text-slate-400 truncate">
                              Checked {new Date(c.checkedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <a 
                            href={c.pageUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="mt-2 block truncate text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                          >
                            {c.pageUrl}
                          </a>
                        </div>
                        {c.error && (
                          <div className="rounded-lg border border-rose-100 bg-rose-50/50 px-3 py-2 text-xs font-medium text-rose-700">
                            {c.error}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </Panel>
            </div>
          )}

          {/* PROSPECTS TAB */}
          {tab === 'prospects' && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Stat label="Discovered" value={prospects.discovered} hint="In the database" />
                <Stat label="Qualified" value={prospects.qualified} tone="good" hint="Passed automated checks" />
                <Stat label="Rejected" value={prospects.rejected} tone="bad" hint="Failed quality thresholds" />
                <Stat 
                  label="Average Score" 
                  value={prospects.averageScore === null ? 'N/A' : prospects.averageScore.toFixed(0)} 
                  hint="0-100 quality metric" 
                />
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Panel title="Top Prospects" note="The highest scored opportunities awaiting outreach.">
                    {data.topProspects.length === 0 ? (
                      <Empty text="No qualified prospects found" />
                    ) : (
                      <div className="space-y-3">
                        {data.topProspects.map((p, i) => (
                          <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            key={i} 
                            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all hover:border-blue-200 hover:bg-blue-50/30 hover:shadow-sm"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-sm text-xs font-bold text-slate-700">
                                  {p.score}
                                </span>
                                <h4 className="text-sm font-bold text-slate-900 truncate">{p.domain}</h4>
                              </div>
                              <p className="mt-1.5 text-xs font-medium text-slate-500 truncate">
                                via: {p.discoveredVia}
                              </p>
                            </div>
                            <a 
                              href={p.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors whitespace-nowrap"
                            >
                              Visit <ExternalLink className="h-3 w-3" />
                            </a>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </Panel>
                </div>
                
                <div>
                  <Panel title="Rejection Reasons" note="Why domains fail our checks.">
                    {prospects.topRejects.length === 0 ? (
                      <Empty text="No rejected prospects yet" />
                    ) : (
                      <div className="space-y-2">
                        {prospects.topRejects.map((r, i) => (
                          <div key={i} className="flex items-center justify-between rounded-lg bg-slate-50 p-3 border border-slate-100">
                            <span className="text-xs font-medium text-slate-700">{r.reason.replace(/_/g, ' ')}</span>
                            <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-bold text-slate-600">{r.count}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </Panel>
                </div>
              </div>
            </div>
          )}

          {/* OUTREACH TAB */}
          {tab === 'outreach' && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <Stat label="Awaiting Approval" value={outreach.awaitingApproval} />
                <Stat label="Approved, Unsent" value={outreach.approved} />
                <Stat label="Sent" value={outreach.sent} />
                <Stat label="Replied" value={outreach.replied} tone="good" />
                <Stat label="Suppressed" value={outreach.suppressed} tone="muted" hint="Do not contact" />
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Panel title="Approval Queue" note="Read every one. Approving without reading is how this mails something embarrassing.">
                    {data.approvalQueue.length === 0 ? (
                      <Empty text="Nothing waiting for approval" />
                    ) : (
                      <div className="space-y-4">
                        {data.approvalQueue.map((m, i) => (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            key={m.id} 
                            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                          >
                            <div className="border-b border-slate-100 bg-slate-50/80 p-4">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="text-xs font-semibold text-slate-600">To: {m.contactEmail} <span className="font-normal text-slate-400">({m.domain})</span></div>
                                {m.problems.length > 0 && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-1 text-[10px] font-bold text-rose-600 border border-rose-100">
                                    <AlertTriangle className="h-3 w-3" />
                                    {m.problems.length} Problem{m.problems.length === 1 ? '' : 's'}
                                  </span>
                                )}
                              </div>
                              <div className="mt-2 text-sm font-bold text-slate-900">{m.subject}</div>
                            </div>
                            <div className="p-4">
                              <pre className="whitespace-pre-wrap font-sans text-[13px] leading-relaxed text-slate-700">
                                {m.body}
                              </pre>
                              
                              {m.problems.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                                  {m.problems.map((p) => (
                                    <span key={p} className="rounded-md bg-rose-50 px-2 py-1 text-[11px] font-medium text-rose-700 border border-rose-100">
                                      {p}
                                    </span>
                                  ))}
                                </div>
                              )}
                              
                              <div className="mt-4 rounded-lg bg-slate-50 p-3 font-mono text-[11px] text-slate-500 border border-slate-200">
                                npx tsx scripts/outreach.ts --approve {m.id} --by "your name"
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </Panel>
                </div>
                
                <div>
                  <Panel title="Sending Mailboxes" note="Warming up or Active.">
                    {outreach.mailboxes.length === 0 ? (
                      <Empty text="No mailbox configured" hint="Create one via CLI" />
                    ) : (
                      <div className="space-y-3">
                        {outreach.mailboxes.map((m) => (
                          <div key={m.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                            <div className="flex items-center gap-2">
                              {m.active ? (
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                              ) : (
                                <AlertTriangle className="h-4 w-4 text-amber-500" />
                              )}
                              <span className="text-sm font-bold text-slate-900">{m.fromEmail}</span>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              {m.warmingUp ? (
                                <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700 border border-amber-200">
                                  Warming Up
                                </span>
                              ) : (
                                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
                                  Active
                                </span>
                              )}
                              <span className="text-xs font-bold tabular-nums text-slate-500">
                                {m.sentToday} / {m.dailyCap} today
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </Panel>
                </div>
              </div>
            </div>
          )}
          
          {/* PROPERTIES TAB */}
          {tab === 'properties' && (
            <div className="space-y-6">
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-sm">
                <p className="text-sm leading-relaxed text-blue-900">
                  <span className="font-bold">Excluded from the link KPI.</span>{' '}
                  Branded properties exist for brand SERP control and referral traffic. Built for
                  PageRank, they are a link scheme - which is why the cap is hard.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Stat label="Properties" value={properties.total} hint={\\ below the cap\} />
                <Stat label="Live" value={properties.live} />
                <Stat label="Posts" value={properties.posts} />
                <Stat
                  label="Empty"
                  value={properties.empty}
                  tone={properties.empty > 0 ? 'bad' : 'muted'}
                  hint="Unused properties are a liability"
                />
              </div>

              <Panel title="Footprint audit" note="Run monthly - it finds what an investigator would.">
                <Empty
                  text="Run the audit from the CLI"
                  hint="npx tsx scripts/properties.ts --audit <clientId>"
                />
              </Panel>
            </div>
          )}

          {/* CITATIONS TAB */}
          {tab === 'citations' && (
            <div className="space-y-6">
              <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 shadow-sm">
                <p className="text-sm leading-relaxed text-sky-900">
                  <span className="font-bold">Citations are not links.</span> Most
                  carry nofollow and Google Business Profile carries no link at all. Their value is
                  entity confirmation through consistency - never add these to a link count.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Stat label="To submit" value={citations.queued} hint="A person submits these" />
                <Stat label="Consistent" value={citations.consistent} tone="good" />
                <Stat label="Inconsistent" value={citations.inconsistent} tone="bad" />
                <Stat
                  label="Average NAP"
                  value={citations.averageNap === null ? '-' : \\%\}
                  hint="Across comparable fields only"
                />
              </div>

              <Panel title="Needs fixing" note="Listings whose details differ from the canonical record.">
                {citations.problems.length === 0 ? (
                  <Empty text="No inconsistencies found" hint="Or nothing has been verified yet" />
                ) : (
                  <div className="space-y-3">
                    {citations.problems.map((p, i) => (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={i}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 hover:border-slate-200 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="h-5 w-5 flex-shrink-0 text-amber-500" />
                          <div>
                            <div className="text-sm font-bold text-slate-900">{p.directory}</div>
                            <div className="text-xs font-medium text-amber-600 mt-0.5">
                              Mismatch: {p.mismatches.join(', ')}
                            </div>
                          </div>
                        </div>
                        {p.listingUrl && (
                          <a
                            href={p.listingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors"
                          >
                            Visit Listing <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </Panel>
            </div>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  );
}



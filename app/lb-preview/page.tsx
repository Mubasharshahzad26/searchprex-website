// ═══════════════════════════════════════════════════════════
//  TEMPORARY — not committed, safe to delete any time.
//
//  The real dashboard lives at /dashboard/links, but that route sits behind
//  the middleware auth gate and NEXT_PUBLIC_SUPABASE_* are not set locally,
//  so it cannot be opened on this machine yet. This page renders the same
//  component outside the gate so the UI can be looked at today.
//
//  It tries the real database first. While Neon's compute quota is spent that
//  fails, so it falls back to sample data — which is the point: you can see
//  what the dashboard looks like populated, before there is anything in it.
//
//  Delete with:  rm -rf app/lb-preview
// ═══════════════════════════════════════════════════════════
import LinksDashboard from '@/components/linkbuilding/LinksDashboard';
import { getDashboardData } from '@/lib/linkbuilding/dashboard-data';
import type { DashboardData } from '@/lib/linkbuilding/dashboard-data';

export const dynamic = 'force-dynamic';

const sample: DashboardData = {
  dbError: null,
  campaigns: [
    { id: 'c1', name: 'Michigan backlinks', targetDomain: 'michigansportsoutdoor.com', clientName: 'Michigan Sports Outdoor', enabled: true, placements: 34, prospects: 71 },
    { id: 'c2', name: 'SMK backlinks', targetDomain: 'smkstore.com', clientName: 'SMK Store', enabled: true, placements: 0, prospects: 0 },
  ],
  links: { live: 21, nofollowed: 5, changed: 2, lost: 3, pageGone: 1, unreachable: 2, pending: 0, total: 34, inContent: 16, lostThisMonth: 4 },
  prospects: {
    discovered: 12, qualified: 28, rejected: 24, contacted: 5, unreachable: 2, noContact: 7,
    averageScore: 71,
    topRejects: [
      { reason: 'sells_links', count: 9 }, { reason: 'page_noindex', count: 6 },
      { reason: 'outbound_domains', count: 5 }, { reason: 'spam_vertical', count: 2 },
    ],
  },
  citations: {
    queued: 4, submitted: 3, live: 9, consistent: 7, inconsistent: 2, unverified: 1, notFound: 0,
    averageNap: 86, followableLinks: 1,
    problems: [
      { directory: 'Yelp', listingUrl: 'https://yelp.com/biz/example', mismatches: ['phone'] },
      { directory: 'Better Business Bureau', listingUrl: 'https://bbb.org/example', mismatches: ['street', 'postalCode'] },
    ],
  },
  outreach: {
    awaitingApproval: 3, approved: 1, sent: 12, replied: 2, rejectedDrafts: 6, suppressed: 4,
    mailboxes: [
      { id: 'm1', fromEmail: 'sam@outreach.searchprex.com', active: true, warmingUp: true, sentToday: 8, dailyCap: 25 },
    ],
  },
  properties: { total: 3, capRemaining: 5, live: 2, posts: 7, empty: 1 },
  recentChecks: [
    { sourceUrl: 'https://outdoorsgearblog.example/best-edc-knives', targetUrl: 'https://www.michigansportsoutdoor.com/knives/', status: 'live', linkType: 'dofollow', region: 'content', anchor: 'Michigan Sports Outdoor', reasons: [], checkedAt: new Date() },
    { sourceUrl: 'https://bushcrafthub.example/gear', targetUrl: 'https://www.michigansportsoutdoor.com/', status: 'nofollowed', linkType: 'nofollow', region: 'content', anchor: 'this shop', reasons: ['page_meta_nofollow'], checkedAt: new Date() },
    { sourceUrl: 'https://edcforum.example/thread/9912', targetUrl: 'https://www.michigansportsoutdoor.com/lights/', status: 'lost', linkType: null, region: null, anchor: null, reasons: ['no_link_to_target'], checkedAt: new Date() },
    { sourceUrl: 'https://blockedsite.example/roundup', targetUrl: 'https://www.michigansportsoutdoor.com/', status: 'unreachable', linkType: null, region: null, anchor: null, reasons: ['bot_challenge'], checkedAt: new Date() },
  ],
  topProspects: [
    { domain: 'nothingbutknives.com', url: 'https://nothingbutknives.com', score: 88, discoveredVia: 'linked from 3 seed pages', missingSignals: [] },
    { domain: 'multitool.org', url: 'https://multitool.org', score: 74, discoveredVia: 'linked from 2 seed pages', missingSignals: ['organicTraffic'] },
    { domain: 'everydaycommentary.com', url: 'https://everydaycommentary.com', score: 63, discoveredVia: 'linked from feedspot knife blogs', missingSignals: ['referringDomains', 'organicTraffic'] },
  ],
  approvalQueue: [
    {
      id: 'msg_abc123',
      contactEmail: 'editor@nothingbutknives.com',
      domain: 'nothingbutknives.com',
      subject: 'Your whetstone maintenance section',
      body: 'Your resources page covers whetstone maintenance for carbon blades but stops short of angles.\n\nWe put together a guide on exactly that: https://www.michigansportsoutdoor.com/sharpening-guide — worth a line in that section?\n\nSam\nSearchPrex, 123 Main St, Detroit MI\nReply with STOP and I will not write again.',
      problems: [],
    },
    {
      id: 'msg_def456',
      contactEmail: 'hello@multitool.org',
      domain: 'multitool.org',
      subject: 'Quick question',
      body: 'I hope this email finds you well. I came across your website and I must say, great content!\n\nSam',
      problems: ['generic_phrase:i hope this email finds you well', 'not_specific_to_page:0_shared_terms', 'target_url_missing'],
    },
  ],
};

export default async function LbPreviewPage() {
  const real = await getDashboardData();
  const usingSample = real.dbError !== null;

  return (
    <div className="min-h-screen bg-[#08080f]">
      {usingSample && (
        <div className="border-b border-amber-400/20 bg-amber-400/[0.06] px-6 py-2.5 text-center text-[12px] text-amber-200/80">
          Preview with <strong>sample data</strong> — the database is unreachable right now
          (Neon compute quota). Real data appears here automatically once it is back.
        </div>
      )}
      <LinksDashboard data={usingSample ? sample : real} />
    </div>
  );
}

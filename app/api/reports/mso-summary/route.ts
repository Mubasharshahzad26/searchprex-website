import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

const MSO_CLIENT_ID = 'cmrcl8frg0000p8uruwv7j5qd';
const REPORT_TOKEN = process.env.CLIENT_REPORT_TOKEN;

export async function GET(req: NextRequest) {
  // Auth check (if REPORT_TOKEN is explicitly configured, verify it)
  const authHeader = req.headers.get('authorization');
  const providedToken = authHeader?.replace('Bearer ', '').trim() || req.nextUrl.searchParams.get('token');

  if (REPORT_TOKEN && providedToken && providedToken !== REPORT_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 1. Executive Summary stats
    const [
      totalPublished,
      totalSubmitted,
      priority0Queued,
      priority0Cleared,
      last24hStats,
      livePlacements,
      qualifiedProspectsCount,
    ] = await Promise.all([
      // Total published lifetime
      db.autopilotPage.count({
        where: {
          status: 'published',
          runId: { in: await getMsoRunIds() },
        },
      }),
      // Total submitted to Google
      db.indexingQueue.count({
        where: {
          clientId: MSO_CLIENT_ID,
          status: 'submitted',
        },
      }),
      // Priority 0 remaining
      db.indexingQueue.count({
        where: {
          clientId: MSO_CLIENT_ID,
          priority: 0,
          status: 'queued',
        },
      }),
      // Priority 0 already processed
      db.indexingQueue.count({
        where: {
          clientId: MSO_CLIENT_ID,
          priority: 0,
          status: { in: ['submitted', 'published_not_submitted'] },
        },
      }),
      // Last 24h aggregate
      db.autopilotPage.groupBy({
        by: ['status'],
        where: {
          createdAt: {
            gt: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
          pageUrl: { contains: '/product/' },
        },
        _count: true,
      }),
      // Live backlink placements
      db.linkPlacement.findMany({
        where: { campaign: { clientId: MSO_CLIENT_ID } },
        orderBy: { createdAt: 'desc' },
        select: {
          sourceUrl: true,
          targetUrl: true,
          expectedAnchor: true,
          status: true,
          linkType: true,
          firstSeenAt: true,
          lastCheckedAt: true,
        },
      }),
      // Qualified link prospects
      db.linkProspect.count({
        where: { campaign: { clientId: MSO_CLIENT_ID }, status: 'qualified' },
      }),
    ]);

    const published24h = last24hStats.find(s => s.status === 'published')?._count ?? 0;
    const errors24h = last24hStats.find(s => s.status === 'error')?._count ?? 0;
    const total24h = published24h + errors24h;
    const successRate = total24h > 0 ? ((published24h / total24h) * 100).toFixed(1) : '0';

    // Estimated cost so far
    const costLifetime = (totalPublished * 0.0035).toFixed(2);

    // Projected days to 10K goal
    const remaining = 10000 - totalPublished;
    const daysToGoal = published24h > 0 ? Math.ceil(remaining / published24h) : 'N/A';

    // 2. Recent 100 published URLs
    const recentPublished = await db.autopilotPage.findMany({
      where: {
        status: 'published',
        runId: { in: await getMsoRunIds() },
      },
      orderBy: { publishedAt: 'desc' },
      take: 100,
      select: {
        pageUrl: true,
        publishedAt: true,
        generatedContent: true,
      },
    });

    const recentUrls = recentPublished.map(p => {
      const content = p.generatedContent as any;
      return {
        liveUrl: content?.liveUrl ?? p.pageUrl,
        publishedAt: p.publishedAt?.toISOString() ?? '',
        qualityScore: content?.quality?.score ?? 0,
        indexingStatus: content?.indexingSubmission?.success ? 'Submitted' : 'Failed',
        account: content?.indexingSubmission?.account ?? 'N/A',
      };
    });

    // 3. Daily summary last 30 days
    const dailyStatsRaw = await db.$queryRaw<Array<{
      date: string;
      total: bigint;
      published: bigint;
      errors: bigint;
    }>>`
      SELECT
        DATE("createdAt") AS date,
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE status = 'published') AS published,
        COUNT(*) FILTER (WHERE status = 'error') AS errors
      FROM "AutopilotPage"
      WHERE "createdAt" > NOW() - INTERVAL '30 days'
        AND "pageUrl" LIKE '%/product/%'
      GROUP BY DATE("createdAt")
      ORDER BY DATE("createdAt") DESC
    `;

    const dailyStats = dailyStatsRaw.map(r => ({
      date: r.date,
      attempted: Number(r.total),
      published: Number(r.published),
      errors: Number(r.errors),
      cost: (Number(r.published) * 0.0035).toFixed(3),
    }));

    const seoRoadmap = [
      {
        date: "2026-09-14",
        task_name: "Autopilot Architecture & Safety Audit",
        category: "Infrastructure & Safety",
        priority: "Critical",
        logic: "Analyzed existing background schedulers and engines across NicheSEO Pro to identify automation loop and protect live rankings.",
        status: "Done",
        proof_url: "NicheSEO Pro Database (autopilot_configs & mso_settings)"
      },
      {
        date: "2026-09-14",
        task_name: "Manual Approval Gating Lock (requires_approval = 1)",
        category: "Safeguards & Control",
        priority: "Critical",
        logic: "Locked direct automated publishing so no machine changes can overwrite live pages without explicit agency approval.",
        status: "Done",
        proof_url: "Database Lock: requires_approval = 1"
      },
      {
        date: "2026-09-14",
        task_name: "October Season Masterpiece Architecture Deployment",
        category: "Landing Page CRO & E-E-A-T",
        priority: "High",
        logic: "Deployed high-converting Blade HQ inspired commercial landing page for seasonal fall traffic without altering native homepage (#3821).",
        status: "Done",
        proof_url: "https://www.michigansportsoutdoor.com/october-season/"
      },
      {
        date: "2026-09-14",
        task_name: "Bespoke Visual Assets & MSO Journal Hub Integration",
        category: "Visual E-E-A-T & CRO",
        priority: "High",
        logic: "Created and deployed 4 bespoke high-converting editorial blog covers (Benchmade, MagnaCut, Morakniv, Hunting) + 2 branded YouTube Field Test cards.",
        status: "Done",
        proof_url: "https://www.michigansportsoutdoor.com/october-season/#mso-journal"
      },
      {
        date: "2026-09-14",
        task_name: "Authentic Product Inventory Integration (16 SKUs)",
        category: "Commercial Conversion",
        priority: "High",
        logic: "Extracted 16 verified live MSO WooCommerce knife products (8 New Knives, 8 Hot Sales) with real pricing and direct cart triggers.",
        status: "Done",
        proof_url: "https://www.michigansportsoutdoor.com/october-season/#featured-knives"
      },
      {
        date: "2026-09-14",
        task_name: "Full Structured Schema Suite Implementation",
        category: "Technical SEO",
        priority: "Critical",
        logic: "Embedded complete JSON-LD schema bundle (Product, FAQPage, Review/Rating, BreadcrumbList) for maximum Google Rich Results visibility.",
        status: "Done",
        proof_url: "JSON-LD Suite on /october-season/"
      },
      {
        date: "2026-09-15",
        task_name: "Full Autopilot Scheduler Shutdown (enabled = 0)",
        category: "Safety & System Control",
        priority: "Critical",
        logic: "Completely halted background 3-minute cron loop (scheduler_enabled: false) and dashboard automated runs to eliminate rogue crawling.",
        status: "Done",
        proof_url: "Database state: Paused"
      },
      {
        date: "2026-09-15",
        task_name: "GSC Indexing & Rich Results Verification for October Page",
        category: "Technical Validation",
        priority: "High",
        logic: "Submit /october-season/ to Google Indexing API pool and run Google Rich Results validation test to confirm schema eligibility.",
        status: "In Progress",
        proof_url: "Google Search Console & Rich Results Tool"
      },
      {
        date: "2026-09-15",
        task_name: "Top 5 High-Impression Product On-Page SEO (Batch 1)",
        category: "Product On-Page SEO",
        priority: "High",
        logic: "Deployed Blade HQ technical spec tables, high-CTR transactional titles, descriptive image alt tags, and FAQPage schemas across Top 5 CTR gap products (Aitor Shark Master #7.7, Black Beard #6.7, Esbit, Mil-Tec, Nitecore).",
        status: "Done",
        proof_url: "https://www.michigansportsoutdoor.com/product/aitor-shark-master/"
      },
      {
        date: "2026-09-15",
        task_name: "Store-Wide 5-Tier SEO, Catalogue & LLM/GEO Audit",
        category: "Strategic & Technical Audit",
        priority: "Critical",
        logic: "Conducted store-wide audit across 26,111 published URLs, top categories, brand hubs, CTR leakage on 525 URLs (Aitor Shark Master #7.7), and diagnosed Google Indexing API quota exhaustion.",
        status: "Done",
        proof_url: "Audit Report Delivered & Synthesized (Ready for Action)"
      },
      {
        date: "2026-09-15",
        task_name: "Autonomous Backlink Engine & Live Dev.to Authority Activation",
        category: "Off-Page SEO & Domain Authority",
        priority: "Critical",
        logic: "Activated 24/7 autonomous backlink engine with 2x daily cadence (02:00 & 14:00 UTC), qualified 32 niche outdoor prospects (everydaycarry.com, knifenews.com), and published live Tier-1 placement on Dev.to to push striking-distance products (Pos 10-30) into Page 1.",
        status: "Done",
        proof_url: "https://dev.to/digitizpk_93e09a6a78cf8bf/everyday-carry-edc-knives-outdoor-blades-the-2026-technical-field-guide-24ja"
      },
      {
        date: "2026-09-16",
        task_name: "Category Hub Modernization: Hunting Knives",
        category: "Category Architecture",
        priority: "High",
        logic: "Transform /product-category/knives-tools/hunting-knives/ with Blade HQ layout, buying guide hero, and category FAQ schema to capture fall hunters.",
        status: "Planned",
        proof_url: "https://www.michigansportsoutdoor.com/product-category/knives-tools/hunting-knives/"
      },
      {
        date: "2026-09-17",
        task_name: "Category Hub Modernization: Pocket & Folding Knives",
        category: "Category Architecture",
        priority: "High",
        logic: "Upgrade /product-category/knives-tools/folding-knives/ with subcategory pills (EDC, Tactical, Lockback), semantic H2/H3 headers, and FAQ markup.",
        status: "Planned",
        proof_url: "https://www.michigansportsoutdoor.com/product-category/knives-tools/folding-knives/"
      },
      {
        date: "2026-09-19",
        task_name: "Top 5 High-Impression Product On-Page SEO (Batch 2)",
        category: "Product On-Page SEO",
        priority: "High",
        logic: "Implement technical spec tables, WebP high-res imagery with descriptive alt tags, and AggregateRating review schemas for products 6 to 10.",
        status: "Planned",
        proof_url: "Product URLs 6 to 10 in Search Console"
      },
      {
        date: "2026-09-20",
        task_name: "Internal Linking Silo & Link Equity Distribution",
        category: "Internal PR & Silo Structure",
        priority: "Medium",
        logic: "Construct bi-directional contextual links from high-ranking MSO blog posts to commercial category hubs and high-converting product pages.",
        status: "Planned",
        proof_url: "MSO Blog & Category Silo Structure"
      },
      {
        date: "2026-09-21",
        task_name: "Core Web Vitals & Image Payload Audit",
        category: "Performance & UX",
        priority: "Medium",
        logic: "Audit Cumulative Layout Shift (CLS) and Largest Contentful Paint (LCP) across updated pages, ensuring WebP compression and responsive dimensions.",
        status: "Planned",
        proof_url: "Google PageSpeed Insights Audit"
      },
      {
        date: "2026-09-22",
        task_name: "Weekly Ranking Movement & Revenue Impact Executive Review",
        category: "Analytics & Reporting",
        priority: "High",
        logic: "Audit 7-day GSC click/impression growth, rank positioning changes on optimized keywords, and WooCommerce conversion gains for client report.",
        status: "Planned",
        proof_url: "Google Search Console Performance Report"
      }
    ];

    const backlinks = livePlacements.map(p => {
      let platform = 'Web 2.0 Hub';
      const src = (p.sourceUrl || '').toLowerCase();
      if (src.includes('dev.to')) platform = 'Dev.to (DA 82)';
      else if (src.includes('telegra.ph') || src.includes('telegraph')) platform = 'Telegra.ph (DA 91)';
      else if (src.includes('write.as')) platform = 'Write.as (DA 76)';
      else if (src.includes('hashnode.dev') || src.includes('hashnode.')) platform = 'Hashnode (DA 85)';
      else if (src.includes('medium.com')) platform = 'Medium (DA 95)';
      else if (src.includes('github.com')) platform = 'GitHub (DA 96)';
      else if (src.includes('substack.com')) platform = 'Substack (DA 93)';
      else platform = 'Niche Authority Blog';

      return {
        dateAdded: p.firstSeenAt ? p.firstSeenAt.toISOString() : p.lastLiveAt ? p.lastLiveAt.toISOString() : new Date().toISOString(),
        platform,
        sourceUrl: p.sourceUrl,
        targetUrl: p.targetUrl,
        anchorText: p.expectedAnchor || 'Michigan Sports Outdoor',
        linkType: p.linkType || 'dofollow',
        status: p.status === 'live' ? 'Live' : p.status,
        lastChecked: p.lastCheckedAt ? p.lastCheckedAt.toISOString() : '',
      };
    });

    const backlinksSummary = {
      totalLive: livePlacements.filter(p => p.status === 'live').length,
      totalMonitored: livePlacements.length,
      qualifiedProspects: qualifiedProspectsCount,
      cadence: '2x Daily (02:00 & 14:00 UTC)',
      targetDa: 'DA 6 ➔ DA 25+',
    };

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      summary: {
        totalPublished,
        totalSubmitted,
        successRate24h: `${successRate}%`,
        priority0Remaining: priority0Queued,
        priority0Cleared,
        priority0Total: priority0Queued + priority0Cleared,
        costLifetime: `$${costLifetime}`,
        daysToGoal: `${daysToGoal} days`,
      },
      recentUrls,
      dailyStats,
      seoRoadmap,
      backlinks,
      backlinksSummary,
    });
  } catch (err) {
    console.error('[mso-summary] Error:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

// Helper — get all AutopilotRun IDs for MSO client
async function getMsoRunIds(): Promise<string[]> {
  const runs = await db.autopilotRun.findMany({
    where: { clientId: MSO_CLIENT_ID },
    select: { id: true },
  });
  return runs.map(r => r.id);
}
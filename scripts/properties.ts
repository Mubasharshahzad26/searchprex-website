/**
 * scripts/properties.ts
 *
 * Branded properties: create, draft, audit.
 *
 *   npx tsx scripts/properties.ts --create <clientId> \
 *       --platform medium.com --handle acme-outdoors \
 *       --author "Dana Reid" --bio "Writes about field gear."
 *
 *   npx tsx scripts/properties.ts --list <clientId>
 *   npx tsx scripts/properties.ts --draft <propertyId> \
 *       --topic "sharpening angles for carbon steel" \
 *       --brand "Acme Knives" --domain acmeknives.com \
 *       --money-terms "best survival knife,knives for sale"
 *   npx tsx scripts/properties.ts --show <postId>
 *   npx tsx scripts/properties.ts --approve <postId>
 *   npx tsx scripts/properties.ts --published <postId> --url <liveUrl>
 *   npx tsx scripts/properties.ts --audit <clientId>
 *
 * Nothing here posts to a platform. Automated posting across a portfolio
 * breaches most platforms' terms and builds the footprint the audit detects.
 * Drafts are approved here and posted by a person, spaced over weeks.
 */
import { config } from 'dotenv';
config({ path: '.env.local' });

import { db } from '../lib/db';
import { auditClientPortfolio, createProperty, draftPropertyPost } from '../lib/linkbuilding/property-run';
import { MAX_PROPERTIES_PER_CLIENT, countsTowardLinkKpi } from '../lib/linkbuilding/core/properties/policy';

function arg(name: string): string | undefined {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? undefined : process.argv[index + 1];
}

async function create(clientId: string) {
  const platform = arg('platform');
  if (!platform) {
    console.error('--platform is required (e.g. medium.com, substack.com).');
    process.exit(1);
  }

  const property = await createProperty({
    clientId,
    platform,
    handle: arg('handle'),
    authorName: arg('author'),
    authorBio: arg('bio'),
  });

  console.log(`✓ ${property.platform} property registered (${property.id})`);
  console.log('  Create it by hand on the platform, then record the URL with --published on');
  console.log('  its first post. Vary the author, the bio and the platform across the set —');
  console.log('  a shared byline is what ties a portfolio together.');
}

async function list(clientId: string) {
  const properties = await db.brandProperty.findMany({
    where: { clientId },
    include: { _count: { select: { posts: true } } },
    orderBy: { createdAt: 'asc' },
  });

  if (properties.length === 0) return console.log('No properties.');

  console.log(`\n${properties.length} of ${MAX_PROPERTIES_PER_CLIENT} (hard cap)\n`);
  for (const property of properties) {
    console.log(`  ${property.platform.padEnd(20)} ${property.status.padEnd(9)} ${property._count.posts} post(s)`);
    console.log(`    ${property.id}   author: ${property.authorName ?? '(none)'}`);
    if (property.propertyUrl) console.log(`    ${property.propertyUrl}`);
  }

  console.log('\nThese links are NOT counted in the link KPI — see');
  console.log(`countsTowardLinkKpi() in core/properties/policy.ts (returns ${countsTowardLinkKpi()}).`);
  console.log('They exist for brand SERP control and referral traffic.');
}

async function draft(propertyId: string) {
  const topic = arg('topic');
  const brand = arg('brand');
  const domain = arg('domain');

  if (!topic || !brand || !domain) {
    console.error('--topic, --brand and --domain are all required.');
    process.exit(1);
  }

  const result = await draftPropertyPost({
    propertyId,
    topic,
    brandName: brand,
    brandDomain: domain,
    moneyTerms: arg('money-terms')?.split(',').map((t) => t.trim()).filter(Boolean),
  });

  console.log(`\npost ${result.postId}  [${result.status}]`);
  console.log(`  words:      ${result.wordCount}`);
  console.log(`  similarity: ${result.highestSimilarity.toFixed(2)} against the closest existing post`);

  for (const warning of result.warnings) console.log(`  ! ${warning}`);

  if (result.problems.length > 0) {
    console.log('\n  REJECTED:');
    for (const problem of result.problems) console.log(`    ${problem}`);
    console.log('\n  Draft again with a different angle. Rewriting the same article is');
    console.log('  what the similarity check exists to stop.');
    return;
  }

  console.log(`\n  Read it:  npx tsx scripts/properties.ts --show ${result.postId}`);
}

async function show(postId: string) {
  const post = await db.brandPropertyPost.findUniqueOrThrow({
    where: { id: postId },
    include: { property: true },
  });

  console.log(`\n${post.title}`);
  console.log(`${post.property.platform} · ${post.status} · ${post.wordCount} words`);
  if (post.clientAnchors.length > 0) {
    console.log(`anchors: ${post.clientAnchors.map((a, i) => `"${a}" (${post.anchorVerdicts[i]})`).join(', ')}`);
  }
  if (post.policyProblems.length > 0) console.log(`problems: ${post.policyProblems.join(', ')}`);
  console.log('\n' + post.bodyHtml.replace(/<[^>]+>/g, '').replace(/\n{3,}/g, '\n\n'));
}

async function approve(postId: string) {
  const post = await db.brandPropertyPost.findUniqueOrThrow({ where: { id: postId } });

  if (post.policyProblems.length > 0 && !process.argv.includes('--force')) {
    console.error(`✗ This draft was rejected: ${post.policyProblems.join(', ')}`);
    console.error('  Pass --force only if you have read it and disagree.');
    process.exit(1);
  }

  await db.brandPropertyPost.update({ where: { id: postId }, data: { status: 'approved' } });
  console.log('✓ approved. Post it by hand, then record the URL with --published.');
}

async function published(postId: string) {
  const url = arg('url');
  if (!url) {
    console.error('--url <liveUrl> is required.');
    process.exit(1);
  }

  const post = await db.brandPropertyPost.update({
    where: { id: postId },
    data: { status: 'published', liveUrl: url, publishedAt: new Date() },
    include: { property: true },
  });

  if (!post.property.propertyUrl) {
    try {
      await db.brandProperty.update({
        where: { id: post.propertyId },
        data: { propertyUrl: new URL(url).origin, status: 'live' },
      });
    } catch {
      // A malformed URL is the caller's to fix; the post record is still correct.
    }
  }

  console.log('✓ recorded. Leave a gap before the next one — posts published in a burst');
  console.log('  look published in a burst, and the audit flags it.');
}

async function audit(clientId: string) {
  const report = await auditClientPortfolio(clientId);

  console.log(`\nfootprint score: ${report.score}/100`);
  console.log(`properties:      ${report.propertyCount} (${report.capRemaining} below the cap)`);

  if (report.worstSimilarity) {
    console.log(`worst pair:      ${(report.worstSimilarity.score * 100).toFixed(0)}% similar`);
  }

  if (report.findings.length === 0) {
    console.log('\nNo footprint patterns found.');
    return;
  }

  console.log('');
  for (const finding of report.findings) {
    const marker = finding.severity === 'critical' ? '✗' : finding.severity === 'warning' ? '!' : '·';
    console.log(`  ${marker} [${finding.severity}] ${finding.code}`);
    console.log(`      ${finding.detail}`);
  }

  console.log('\nThis is the audit someone would run to prove a network is a network.');
  console.log('Everything it finds here, they could find too.');
}

async function main() {
  const handlers: Array<[string, (value: string) => Promise<void>]> = [
    ['create', create],
    ['list', list],
    ['draft', draft],
    ['show', show],
    ['approve', approve],
    ['published', published],
    ['audit', audit],
  ];

  for (const [flag, handler] of handlers) {
    const value = arg(flag);
    if (value) return handler(value);
  }

  console.error('See the header of this file for usage.');
  process.exit(1);
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  })
  .finally(() => db.$disconnect());

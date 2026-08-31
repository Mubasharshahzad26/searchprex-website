/**
 * scripts/citations.ts
 *
 * Sets up a client's NAP, builds the directory queue, and works it.
 *
 *   npx tsx scripts/citations.ts --profile <clientId> \
 *       --name "Acme Law LLC" --phone "(555) 201-9000" \
 *       --street "123 N Main St Suite 200" --city Detroit --region MI \
 *       --postal 48226 --country US --website https://acmelaw.com \
 *       --industry legal
 *
 *   npx tsx scripts/citations.ts --build <clientId>     # create queue rows
 *   npx tsx scripts/citations.ts --queue <clientId>     # what to submit next
 *   npx tsx scripts/citations.ts --record <submissionId> --url <listingUrl>
 *   npx tsx scripts/citations.ts --verify <clientId>    # check live listings
 *   npx tsx scripts/citations.ts --grid <clientId>      # NAP consistency grid
 *
 * Nothing here submits to any directory. `--record` is how a person tells the
 * system about a listing they created by hand, which is what makes it
 * verifiable from then on.
 *
 * Writes to the production database (.env.local).
 */
import { config } from 'dotenv';
config({ path: '.env.local' });

import { db } from '../lib/db';
import { buildCitationQueue, runCitationVerification } from '../lib/linkbuilding/citation-run';
import { directoryById, knownIndustries } from '../lib/linkbuilding/core/citations/registry';

function arg(name: string): string | undefined {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? undefined : process.argv[index + 1];
}

async function profileFor(clientId: string) {
  const profile = await db.businessProfile.findUnique({ where: { clientId } });
  if (!profile) {
    console.error(`No business profile for client ${clientId}. Create one with --profile.`);
    process.exit(1);
  }
  return profile;
}

async function upsertProfile(clientId: string) {
  const name = arg('name');
  if (!name) {
    console.error('--name is required when creating a profile.');
    process.exit(1);
  }

  const industry = arg('industry');
  if (industry && !knownIndustries().includes(industry)) {
    console.warn(
      `! "${industry}" has no vertical directories defined — core directories only.\n` +
        `  Known industries: ${knownIndustries().join(', ')}`
    );
  }

  const data = {
    name,
    street: arg('street') ?? null,
    city: arg('city') ?? null,
    region: arg('region') ?? null,
    postalCode: arg('postal') ?? null,
    country: arg('country') ?? null,
    phone: arg('phone') ?? null,
    website: arg('website') ?? null,
    industry: industry ?? null,
  };

  const profile = await db.businessProfile.upsert({
    where: { clientId },
    update: data,
    create: { clientId, ...data },
  });

  console.log(`✓ profile saved for ${profile.name} (${profile.id})`);
  console.log(`  next:  npx tsx scripts/citations.ts --build ${clientId}`);
}

async function build(clientId: string) {
  const profile = await profileFor(clientId);
  const stats = await buildCitationQueue(profile.id);

  console.log(`\n${stats.applicable} directories apply — ${stats.created} new, ${stats.existing} already queued.\n`);

  for (const directory of stats.directories) {
    const linkNote =
      directory.linkValue === 'none'
        ? 'no link'
        : directory.linkValue === 'dofollow'
          ? 'dofollow'
          : 'nofollow';
    console.log(`  [${directory.tier.padEnd(8)}] ${directory.name.padEnd(28)} ${linkNote.padEnd(9)} ${directory.claimUrl}`);
  }

  console.log('\nMost of these pass no ranking signal. They are entity confirmation,');
  console.log('not links, and must never be counted as links in a report.');
}

async function queue(clientId: string) {
  const profile = await profileFor(clientId);

  const rows = await db.citationSubmission.findMany({
    where: { profileId: profile.id, status: 'queued' },
    orderBy: [{ tier: 'asc' }, { directoryName: 'asc' }],
  });

  if (rows.length === 0) {
    console.log('Queue is empty. Everything applicable has been submitted.');
    return;
  }

  console.log(`\n${rows.length} listing(s) to create. Pre-filled values:\n`);
  console.log(`  Name:     ${profile.name}`);
  console.log(`  Address:  ${[profile.street, profile.city, profile.region, profile.postalCode].filter(Boolean).join(', ') || '(not set)'}`);
  console.log(`  Phone:    ${profile.phone ?? '(not set)'}`);
  console.log(`  Website:  ${profile.website ?? '(not set)'}`);
  console.log('\n  Use these EXACTLY as written. Consistency is the entire point —');
  console.log('  "Suite 200" here and "Ste 200" there is what the grid is checking for.\n');

  for (const row of rows) {
    const directory = directoryById(row.directoryId);
    console.log(`  ${row.directoryName}`);
    console.log(`    tier ${row.tier} · ${row.linkValue} · ${row.submissionMethod}`);
    if (directory) console.log(`    ${directory.claimUrl}`);
    if (directory) console.log(`    why: ${directory.rationale}`);
    console.log(`    once live:  npx tsx scripts/citations.ts --record ${row.id} --url <listingUrl>\n`);
  }
}

async function record(submissionId: string) {
  const url = arg('url');
  if (!url) {
    console.error('--url <listingUrl> is required.');
    process.exit(1);
  }

  const updated = await db.citationSubmission.update({
    where: { id: submissionId },
    data: {
      listingUrl: url,
      status: 'submitted',
      submittedAt: new Date(),
      notes: arg('notes') ?? undefined,
    },
  });

  console.log(`✓ ${updated.directoryName} recorded at ${url}`);
  console.log('  It will be checked on the next verification run.');
}

async function verify(clientId: string) {
  const stats = await runCitationVerification({ clientId, force: process.argv.includes('--force'), budgetMs: 30 * 60_000 });

  console.log('\n─── citation verification ───');
  console.log(`checked:      ${stats.checked}`);
  console.log(`consistent:   ${stats.consistent}`);
  console.log(`inconsistent: ${stats.inconsistent}`);
  console.log(`unverified:   ${stats.unverified}  (listing found, fields unreadable)`);
  console.log(`not found:    ${stats.notFound}`);
  console.log(`unreachable:  ${stats.unreachable}  (could not look — not a finding)`);

  if (stats.problems.length > 0) {
    console.log('\nneeds fixing:');
    for (const problem of stats.problems) {
      console.log(`  ${problem.directory}: ${problem.mismatches.join(', ')}`);
      console.log(`    ${problem.listingUrl}`);
    }
  }
}

async function grid(clientId: string) {
  const profile = await profileFor(clientId);

  const rows = await db.citationSubmission.findMany({
    where: { profileId: profile.id },
    orderBy: [{ tier: 'asc' }, { directoryName: 'asc' }],
  });

  console.log(`\nNAP consistency — ${profile.name}\n`);
  console.log('  directory                     status        NAP   link       issues');
  console.log('  ' + '─'.repeat(84));

  for (const row of rows) {
    const status = row.verifyStatus ?? row.status;
    const nap = row.napScore === null ? '  –' : `${String(row.napScore).padStart(3)}`;
    const link = row.linksToSite ? (row.observedLinkType ?? 'yes') : row.linkValue === 'none' ? 'n/a' : 'none';
    const issues = [...row.mismatches].join(', ') || (row.missingFields.length ? `(not listed: ${row.missingFields.join(',')})` : '');
    console.log(`  ${row.directoryName.padEnd(29)} ${status.padEnd(13)} ${nap}   ${link.padEnd(10)} ${issues}`);
  }

  const scored = rows.filter((r) => r.napScore !== null);
  if (scored.length > 0) {
    const average = Math.round(scored.reduce((sum, r) => sum + (r.napScore ?? 0), 0) / scored.length);
    console.log(`\n  average NAP consistency across ${scored.length} verified listing(s): ${average}%`);
  }

  const followable = rows.filter((r) => r.observedLinkType === 'dofollow').length;
  console.log(`  followable links among citations: ${followable} — citations are not a link strategy.`);
}

async function main() {
  const handlers: Array<[string, (value: string) => Promise<void>]> = [
    ['profile', upsertProfile],
    ['build', build],
    ['queue', queue],
    ['record', record],
    ['verify', verify],
    ['grid', grid],
  ];

  for (const [flag, handler] of handlers) {
    const value = arg(flag);
    if (value) return handler(value);
  }

  console.error(
    'Usage:\n' +
      '  --profile <clientId> --name "..." [--street --city --region --postal --country --phone --website --industry]\n' +
      '  --build <clientId>\n' +
      '  --queue <clientId>\n' +
      '  --record <submissionId> --url <listingUrl> [--notes "..."]\n' +
      '  --verify <clientId> [--force]\n' +
      '  --grid <clientId>'
  );
  process.exit(1);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.$disconnect());

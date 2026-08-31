/**
 * scripts/outreach.ts
 *
 * The approval desk. Nothing sends without passing through here.
 *
 *   npx tsx scripts/outreach.ts --mailbox-add \
 *       --from "sam@outreach.example.com" --name "Sam Ali" \
 *       --address "SearchPrex, 123 Main St, Detroit MI 48226"
 *   npx tsx scripts/outreach.ts --mailboxes
 *   npx tsx scripts/outreach.ts --mailbox-activate <id>
 *
 *   npx tsx scripts/outreach.ts --prepare <campaignId> --mailbox <mailboxId>
 *   npx tsx scripts/outreach.ts --review [campaignId]     # read the drafts
 *   npx tsx scripts/outreach.ts --approve <messageId> --by "your name"
 *   npx tsx scripts/outreach.ts --reject <messageId>
 *   npx tsx scripts/outreach.ts --send [--dry]            # send what is approved
 *
 *   npx tsx scripts/outreach.ts --suppress <email-or-domain> --reason unsubscribed
 *   npx tsx scripts/outreach.ts --reply <threadId> --sentiment positive
 *
 * --send is the only command that mails anyone, and every message it touches
 * still passes checkSendPolicy. --dry runs the same policy checks and prints
 * the verdict without sending.
 */
import { config } from 'dotenv';
config({ path: '.env.local' });

import { db } from '../lib/db';
import { runOutreachPreparation } from '../lib/linkbuilding/outreach-prepare';
import { runOutreachSend } from '../lib/linkbuilding/outreach-send';

function arg(name: string): string | undefined {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? undefined : process.argv[index + 1];
}

function has(flag: string): boolean {
  return process.argv.includes(`--${flag}`);
}

async function mailboxAdd() {
  const fromEmail = arg('from');
  const fromName = arg('name');
  const postalAddress = arg('address');

  if (!fromEmail || !fromName || !postalAddress) {
    console.error('--from, --name and --address are all required.');
    console.error('The postal address is a legal requirement in every message body.');
    process.exit(1);
  }

  const domain = fromEmail.split('@')[1]?.toLowerCase() ?? '';
  const siteDomain = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.searchprex.com')
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '');

  if (domain === siteDomain) {
    console.error(`✗ ${domain} is your primary domain. Cold outreach from it puts your`);
    console.error('  transactional mail — client reports, password resets — at risk.');
    console.error(`  Use a subdomain such as outreach.${siteDomain}, verified separately in Resend.`);
    process.exit(1);
  }

  const mailbox = await db.outreachMailbox.create({
    data: {
      label: arg('label') ?? fromEmail,
      fromEmail,
      fromName,
      postalAddress,
      //  Created inactive and warming. Turning it on is a deliberate act, and
      //  the first weeks are capped low whatever dailyCap says.
      active: false,
      warmingUp: true,
    },
  });

  console.log(`✓ mailbox ${mailbox.fromEmail} created (${mailbox.id})`);
  console.log('  It is INACTIVE and WARMING UP — capped at 20 sends/day until you clear');
  console.log('  warmingUp. Verify the domain in Resend with SPF, DKIM and DMARC first.');
  console.log(`  Activate:  npx tsx scripts/outreach.ts --mailbox-activate ${mailbox.id}`);
}

async function mailboxes() {
  const rows = await db.outreachMailbox.findMany({ orderBy: { createdAt: 'asc' } });
  if (rows.length === 0) return console.log('No mailboxes. Create one with --mailbox-add.');

  for (const row of rows) {
    console.log(`\n${row.fromName} <${row.fromEmail}>  ${row.id}`);
    console.log(`  active: ${row.active}   warming: ${row.warmingUp}   sent today: ${row.sentToday}/${row.dailyCap}`);
    console.log(`  address: ${row.postalAddress}`);
    console.log(`  opt-out: ${row.optOutText}`);
  }
}

async function review(campaignId?: string) {
  const drafts = await db.outreachMessage.findMany({
    where: {
      status: { in: ['draft', 'rejected'] },
      ...(campaignId ? { thread: { campaignId } } : {}),
    },
    orderBy: { createdAt: 'asc' },
    take: 25,
    include: { thread: { include: { prospect: true } } },
  });

  if (drafts.length === 0) return console.log('No drafts waiting.');

  for (const draft of drafts) {
    console.log('\n' + '─'.repeat(78));
    console.log(`${draft.id}   [${draft.status}]`);
    console.log(`to:      ${draft.thread.contactEmail}  (${draft.thread.contactKind})`);
    console.log(`found:   ${draft.thread.contactFoundOn}`);
    console.log(`about:   ${draft.thread.prospect.domain}  score ${draft.thread.prospect.qualityScore}`);
    console.log(`angle:   ${draft.thread.angle}`);
    if (draft.validationProblems.length > 0) {
      console.log(`PROBLEMS: ${draft.validationProblems.join(', ')}`);
    }
    console.log(`\nsubject: ${draft.subject}\n`);
    console.log(draft.body);
    console.log('');
    if (draft.status === 'draft') {
      console.log(`approve: npx tsx scripts/outreach.ts --approve ${draft.id} --by "your name"`);
    }
  }

  console.log('\n' + '─'.repeat(78));
  console.log('Read every one. Approving without reading is how a system like this');
  console.log('ends up mailing something embarrassing to a real person.');
}

async function approve(messageId: string) {
  const by = arg('by');
  if (!by) {
    console.error('--by "your name" is required. Approvals are attributed to a person.');
    process.exit(1);
  }

  const message = await db.outreachMessage.findUniqueOrThrow({ where: { id: messageId } });

  if (message.validationProblems.length > 0 && !has('force')) {
    console.error(`✗ This draft failed validation: ${message.validationProblems.join(', ')}`);
    console.error('  Fix the draft or pass --force if you have read it and disagree.');
    process.exit(1);
  }

  await db.outreachMessage.update({
    where: { id: messageId },
    data: { status: 'approved', approvedBy: by, approvedAt: new Date() },
  });

  console.log(`✓ approved by ${by}. It will go out on the next --send.`);
}

async function reject(messageId: string) {
  await db.outreachMessage.update({ where: { id: messageId }, data: { status: 'rejected' } });
  console.log('✓ rejected');
}

async function send() {
  if (has('dry')) {
    //  Reports what policy would decide without sending, by counting what is
    //  approved and letting the runner's denials speak for themselves.
    const approved = await db.outreachMessage.count({ where: { status: 'approved' } });
    console.log(`${approved} message(s) approved and waiting.`);
    console.log('Run without --dry to send. Every one is re-checked against policy first.');
    return;
  }

  const stats = await runOutreachSend({ budgetMs: 30 * 60_000 });

  console.log('\n─── send ───');
  console.log(`attempted: ${stats.attempted}`);
  console.log(`sent:      ${stats.sent}`);
  console.log(`denied:    ${stats.denied}`);
  console.log(`failed:    ${stats.failed}`);

  if (stats.denials.length > 0) {
    console.log('\ndenied by policy:');
    for (const denial of stats.denials) {
      console.log(`  ${denial.recipient}: ${denial.reasons.join(', ')}`);
    }
    console.log('\nMost denials are transient (daily cap, too soon) — these stay approved');
    console.log('and go out on a later run without needing approval again.');
  }
}

async function suppress(value: string) {
  const reason = arg('reason') ?? 'manual';
  await db.outreachSuppression.upsert({
    where: { value: value.toLowerCase() },
    update: { reason, notes: arg('notes') ?? undefined },
    create: { value: value.toLowerCase(), reason, notes: arg('notes') ?? undefined },
  });
  console.log(`✓ ${value} suppressed (${reason}). This applies across every campaign.`);
}

async function reply(threadId: string) {
  const sentiment = arg('sentiment') ?? 'neutral';
  await db.outreachThread.update({
    where: { id: threadId },
    data: { status: 'replied', replySentiment: sentiment, repliedAt: new Date() },
  });

  if (sentiment === 'negative') {
    const thread = await db.outreachThread.findUniqueOrThrow({ where: { id: threadId } });
    await db.outreachSuppression.upsert({
      where: { value: thread.contactEmail },
      update: { reason: 'unsubscribed' },
      create: { value: thread.contactEmail, reason: 'unsubscribed', notes: 'negative reply' },
    });
    console.log('✓ recorded, and the address was suppressed automatically.');
    return;
  }

  console.log(`✓ reply recorded (${sentiment})`);
}

async function main() {
  if (has('mailbox-add')) return mailboxAdd();
  if (has('mailboxes')) return mailboxes();
  if (has('send')) return send();

  const activate = arg('mailbox-activate');
  if (activate) {
    await db.outreachMailbox.update({ where: { id: activate }, data: { active: true } });
    return console.log('✓ mailbox activated (still warming — 20/day until warmingUp is cleared)');
  }

  const prepare = arg('prepare');
  if (prepare) {
    const mailboxId = arg('mailbox');
    if (!mailboxId) {
      console.error('--mailbox <mailboxId> is required.');
      process.exit(1);
    }
    const stats = await runOutreachPreparation({ campaignId: prepare, mailboxId, budgetMs: 30 * 60_000 });
    console.log('\n─── prepare ───');
    console.log(`considered:  ${stats.considered}`);
    console.log(`contacts:    ${stats.contactsFound}`);
    console.log(`no contact:  ${stats.noContact}`);
    console.log(`drafted:     ${stats.drafted}`);
    console.log(`rejected:    ${stats.rejectedByValidation}`);
    console.log(`declined:    ${stats.modelDeclined}  (model found nothing specific to say)`);
    if (Object.keys(stats.problemCounts).length > 0) {
      console.log('\nwhy drafts were rejected:');
      for (const [problem, count] of Object.entries(stats.problemCounts).sort((a, b) => b[1] - a[1])) {
        console.log(`  ${String(count).padStart(3)}  ${problem}`);
      }
    }
    console.log(`\nReview them:  npx tsx scripts/outreach.ts --review ${prepare}`);
    return;
  }

  if (has('review')) return review(arg('review'));

  const approveId = arg('approve');
  if (approveId) return approve(approveId);

  const rejectId = arg('reject');
  if (rejectId) return reject(rejectId);

  const suppressValue = arg('suppress');
  if (suppressValue) return suppress(suppressValue);

  const replyThread = arg('reply');
  if (replyThread) return reply(replyThread);

  console.error('See the header of this file for usage.');
  process.exit(1);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.$disconnect());

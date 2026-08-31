// ═══════════════════════════════════════════════════════════
//  outreach-send.ts — the only code that sends anything
//
//  NOT PORTABLE. Prisma + Resend.
//
//  Deliberately the smallest file in the module. It sends
//  messages a person has already approved, and every one passes
//  checkSendPolicy first. On a denial it records the reason and
//  moves on — there is no override parameter, and adding one
//  would defeat the point of the gate.
//
//  OUTREACH_PROTECTED_DOMAINS is the environment's chance to name
//  the domains that must never send cold mail. The site's own
//  domain is added automatically whether or not it is listed.
// ═══════════════════════════════════════════════════════════

import { Resend } from 'resend';
import { db } from '@/lib/db';
import { withRetry } from '@/lib/db-retry';
import { checkCompliance, checkSendPolicy, type Mailbox } from './core/outreach/policy';

const DEFAULT_BUDGET_MS = 240_000;
const DEFAULT_MAX_SENDS = 40;

/** Gap between sends from one mailbox. A burst looks like a blast. */
const INTER_SEND_DELAY_MS = 20_000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface SendOptions {
  mailboxId?: string;
  campaignId?: string;
  maxSends?: number;
  budgetMs?: number;
  signal?: AbortSignal;
}

export interface SendStats {
  attempted: number;
  sent: number;
  denied: number;
  failed: number;
  /** Every denial, so a blocked campaign explains itself. */
  denials: Array<{ messageId: string; recipient: string; reasons: string[] }>;
  elapsedMs: number;
}

/**
 * Domains that must never originate cold outreach.
 *
 * The site's own domain is always included. Cold volume from it would put the
 * reputation that delivers client reports and password resets at risk, and that
 * trade is never worth a link.
 */
function protectedDomains(): string[] {
  const configured = (process.env.OUTREACH_PROTECTED_DOMAINS ?? '')
    .split(',')
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.searchprex.com';
  let siteDomain = '';
  try {
    siteDomain = new URL(siteUrl).hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    siteDomain = 'searchprex.com';
  }

  return [...new Set([...configured, siteDomain])];
}

/** Zeroes a mailbox's counter when the UTC day has rolled over. */
function resetIfNewDay(mailbox: { sentToday: number; lastResetAt: Date }): number {
  const today = new Date().toISOString().slice(0, 10);
  const lastReset = mailbox.lastResetAt.toISOString().slice(0, 10);
  return today === lastReset ? mailbox.sentToday : 0;
}

export async function runOutreachSend(options: SendOptions = {}): Promise<SendStats> {
  const {
    mailboxId,
    campaignId,
    maxSends = DEFAULT_MAX_SENDS,
    budgetMs = DEFAULT_BUDGET_MS,
    signal,
  } = options;

  const startedAt = Date.now();
  const deadline = startedAt + budgetMs;

  const stats: SendStats = {
    attempted: 0,
    sent: 0,
    denied: 0,
    failed: 0,
    denials: [],
    elapsedMs: 0,
  };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY is not set — nothing can be sent.');

  const resend = new Resend(apiKey);
  const protectedList = protectedDomains();

  const suppression = new Set(
    (await withRetry(() => db.outreachSuppression.findMany({ select: { value: true } }))).map(
      (row) => row.value.toLowerCase()
    )
  );

  //  Only messages a person approved. `approved` is never written by automated
  //  code, which is what makes requiresApproval mean something.
  const messages = await withRetry(() =>
    db.outreachMessage.findMany({
      where: {
        status: 'approved',
        ...(mailboxId ? { mailboxId } : {}),
        ...(campaignId ? { thread: { campaignId } } : {}),
      },
      orderBy: { approvedAt: 'asc' },
      take: maxSends,
      include: {
        mailbox: true,
        thread: {
          include: {
            campaign: {
              select: { dryRunMode: true, requiresApproval: true, maxFollowUps: true, minDaysBetweenMessages: true },
            },
          },
        },
      },
    })
  );

  //  Counters held in memory across the batch so the cap is enforced within a
  //  run, not only against what was already in the database when it started.
  const sentThisRun = new Map<string, number>();

  for (const message of messages) {
    if (signal?.aborted || Date.now() >= deadline) break;
    stats.attempted++;

    if (!message.mailbox) {
      await withRetry(() =>
        db.outreachMessage.update({
          where: { id: message.id },
          data: { status: 'failed', error: 'no mailbox attached' },
        })
      );
      stats.failed++;
      continue;
    }

    //  Hoisted after the null guard above: TypeScript loses the narrowing
    //  inside the closures passed to withRetry, and a non-null assertion there
    //  would be a claim rather than a check.
    const outbox = message.mailbox;
    const thread = message.thread;
    const baseSentToday = resetIfNewDay(outbox);
    const alreadyThisRun = sentThisRun.get(outbox.id) ?? 0;

    const mailbox: Mailbox = {
      fromEmail: outbox.fromEmail,
      fromName: outbox.fromName,
      sentToday: baseSentToday + alreadyThisRun,
      dailyCap: outbox.dailyCap,
      warmingUp: outbox.warmingUp,
    };

    const daysSinceLastMessage = thread.lastSentAt
      ? (Date.now() - thread.lastSentAt.getTime()) / 86_400_000
      : null;

    const verdict = checkSendPolicy({
      mailbox,
      recipientEmail: thread.contactEmail,
      suppressed: suppression,
      protectedDomains: protectedList,
      campaign: thread.campaign,
      approved: true,
      priorMessagesInThread: thread.messagesSent,
      maxFollowUps: thread.campaign.maxFollowUps,
      daysSinceLastMessage,
      minDaysBetweenMessages: thread.campaign.minDaysBetweenMessages,
    });

    //  Re-checked at send time, not trusted from drafting. A mailbox's postal
    //  address can change between the two, and the message body is fixed.
    const compliance = checkCompliance({
      subject: message.subject,
      body: message.body,
      postalAddress: outbox.postalAddress,
      optOutText: outbox.optOutText,
      senderName: outbox.fromName,
    });

    const denials = [...verdict.denials, ...compliance.problems];

    if (denials.length > 0) {
      await withRetry(() =>
        db.outreachMessage.update({
          where: { id: message.id },
          //  Left as `approved`, not failed: most denials are transient
          //  (daily cap, too soon) and the message should go out on a later
          //  run without a person having to approve it again.
          data: { policyDenials: denials },
        })
      );
      stats.denied++;
      stats.denials.push({
        messageId: message.id,
        recipient: thread.contactEmail,
        reasons: denials,
      });
      continue;
    }

    if (stats.sent > 0) await sleep(INTER_SEND_DELAY_MS);

    try {
      const response = await resend.emails.send({
        from: `${outbox.fromName} <${outbox.fromEmail}>`,
        to: thread.contactEmail,
        subject: message.subject,
        text: message.body,
        //  A working List-Unsubscribe is what keeps a sender out of the spam
        //  folder, and it honours an opt-out without the recipient writing back.
        headers: {
          'List-Unsubscribe': `<mailto:${outbox.fromEmail}?subject=unsubscribe>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        },
      });

      if (response.error) throw new Error(response.error.message);

      const now = new Date();
      await withRetry(() =>
        db.$transaction([
          db.outreachMessage.update({
            where: { id: message.id },
            data: { status: 'sent', sentAt: now, providerId: response.data?.id, policyDenials: [] },
          }),
          db.outreachThread.update({
            where: { id: thread.id },
            data: { status: 'sent', lastSentAt: now, messagesSent: { increment: 1 } },
          }),
          db.outreachMailbox.update({
            where: { id: outbox.id },
            data: { sentToday: mailbox.sentToday + 1, lastResetAt: now },
          }),
          db.linkProspect.update({
            where: { id: thread.prospectId },
            data: { status: 'contacted' },
          }),
        ])
      );

      sentThisRun.set(outbox.id, alreadyThisRun + 1);
      stats.sent++;
    } catch (err) {
      const error = err instanceof Error ? err.message : String(err);
      await withRetry(() =>
        db.outreachMessage.update({
          where: { id: message.id },
          data: { status: 'failed', error: error.slice(0, 500) },
        })
      );
      stats.failed++;
    }
  }

  stats.elapsedMs = Date.now() - startedAt;
  return stats;
}

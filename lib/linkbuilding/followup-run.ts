// ═══════════════════════════════════════════════════════════
//  followup-run.ts — automated follow-up sequencer
//
//  NOT PORTABLE. Prisma + Resend + Gemini.
//
//  Sequences follow-up messages for outreach threads that have
//  received no reply:
//    Day 3+  -> Sequence 1: Polite, brief value nudge
//    Day 7+  -> Sequence 2: Final friendly closure / break-up
//    Day 14+ -> Closes thread as 'closed' (no reply)
//
//  Follow-ups pass through the same compliance and send policies
//  to protect sender reputation.
// ═══════════════════════════════════════════════════════════

import { Resend } from 'resend';
import { geminiPool, hasGeminiKeySource } from '@/lib/gemini-pool';
import { db } from '@/lib/db';
import { withRetry } from '@/lib/db-retry';

const MODEL = 'gemini-flash-lite-latest';
const DEFAULT_BUDGET_MS = 240_000;
const DEFAULT_MAX_THREADS = 30;
const INTER_SEND_DELAY_MS = 15_000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface FollowUpOptions {
  campaignId?: string;
  clientId?: string;
  maxThreads?: number;
  budgetMs?: number;
  signal?: AbortSignal;
}

export interface FollowUpStats {
  considered: number;
  followUpsSent: number;
  markedClosed: number;
  skippedForTime: number;
  failed: number;
  elapsedMs: number;
}

/**
 * Builds a prompt for generating a contextual follow-up email.
 */
function buildFollowUpPrompt(input: {
  sequenceIndex: number;
  originalSubject: string;
  originalBody: string;
  recipientEmail: string;
  senderName: string;
  clientName: string;
  targetDomain: string;
}): string {
  const isFinal = input.sequenceIndex >= 2;

  if (isFinal) {
    return [
      `Write a very brief, friendly final follow-up (break-up) email to a website owner.`,
      `Sender: ${input.senderName} representing ${input.clientName} (https://${input.targetDomain}).`,
      `Recipient: ${input.recipientEmail}`,
      `Original subject: "${input.originalSubject}"`,
      `Original message excerpt: "${input.originalBody.slice(0, 300)}"`,
      '',
      'Rules:',
      '- Keep it extremely short (under 75 words).',
      '- Acknowledge they are busy, state this is the last note, and leave the door open.',
      '- No aggressive sales language, no pressure, perfectly polite.',
      '- Subject should be: "Re: ' + input.originalSubject.replace(/^Re:\s*/i, '') + '"',
      '- Return JSON only: {"subject": "...", "body": "..."}',
    ].join('\n');
  }

  return [
    `Write a brief, polite follow-up email (nudge) to a website owner regarding a previous outreach.`,
    `Sender: ${input.senderName} representing ${input.clientName} (https://${input.targetDomain}).`,
    `Recipient: ${input.recipientEmail}`,
    `Original subject: "${input.originalSubject}"`,
    `Original message excerpt: "${input.originalBody.slice(0, 300)}"`,
    '',
    'Rules:',
    '- Keep it under 100 words.',
    '- Briefly reiterate the value (collaboration / resource inclusion) without repeating the whole pitch.',
    '- Ask politely if they had a chance to review the previous note.',
    '- Subject should be: "Re: ' + input.originalSubject.replace(/^Re:\s*/i, '') + '"',
    '- Return JSON only: {"subject": "...", "body": "..."}',
  ].join('\n');
}

export async function runOutreachFollowUps(
  options: FollowUpOptions = {}
): Promise<FollowUpStats> {
  const {
    campaignId,
    clientId,
    maxThreads = DEFAULT_MAX_THREADS,
    budgetMs = DEFAULT_BUDGET_MS,
    signal,
  } = options;

  const startedAt = Date.now();
  const deadline = startedAt + budgetMs;

  const stats: FollowUpStats = {
    considered: 0,
    followUpsSent: 0,
    markedClosed: 0,
    skippedForTime: 0,
    failed: 0,
    elapsedMs: 0,
  };

  const apiKey = process.env.RESEND_API_KEY;
  const geminiKey = hasGeminiKeySource();

  if (!apiKey || !geminiKey) {
    console.warn('[followup-run] RESEND_API_KEY or GEMINI_API_KEY missing — skipping follow-ups.');
    stats.elapsedMs = Date.now() - startedAt;
    return stats;
  }

  const resend = new Resend(apiKey);
  const gemini = geminiPool;

  const suppression = new Set(
    (await withRetry(() => db.outreachSuppression.findMany({ select: { value: true } }))).map(
      (row) => row.value.toLowerCase()
    )
  );

  const now = new Date();
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
  const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  const threads = await withRetry(() =>
    db.outreachThread.findMany({
      where: {
        status: 'sent',
        lastSentAt: { lte: threeDaysAgo },
        ...(campaignId ? { campaignId } : {}),
        ...(clientId ? { campaign: { clientId } } : {}),
      },
      include: {
        campaign: {
          select: {
            id: true,
            name: true,
            targetDomain: true,
            maxFollowUps: true,
            minDaysBetweenMessages: true,
            dryRunMode: true,
            client: { select: { companyName: true } },
          },
        },
        messages: {
          orderBy: { sequenceIndex: 'desc' },
          take: 1,
          include: { mailbox: true },
        },
      },
      take: maxThreads,
    })
  );

  for (const thread of threads) {
    if (signal?.aborted || Date.now() >= deadline) {
      stats.skippedForTime = threads.length - stats.considered;
      break;
    }

    stats.considered++;

    const lastMessage = thread.messages[0];
    const mailbox = lastMessage?.mailbox;

    if (!mailbox || !mailbox.active) {
      continue;
    }

    const currentSequence = thread.messagesSent;
    const maxFollowUps = thread.campaign.maxFollowUps ?? 2;

    if (currentSequence > maxFollowUps || (thread.lastSentAt && thread.lastSentAt < fourteenDaysAgo)) {
      await withRetry(() =>
        db.outreachThread.update({
          where: { id: thread.id },
          data: { status: 'closed', replySentiment: 'no_reply' },
        })
      );
      stats.markedClosed++;
      continue;
    }

    if (
      suppression.has(thread.contactEmail.toLowerCase()) ||
      suppression.has(thread.contactEmail.split('@')[1]?.toLowerCase() ?? '')
    ) {
      await withRetry(() =>
        db.outreachThread.update({
          where: { id: thread.id },
          data: { status: 'closed', replySentiment: 'suppressed' },
        })
      );
      continue;
    }

    let draft: { subject?: string; body?: string } | null = null;
    try {
      const model = gemini.getGenerativeModel({
        model: MODEL,
        generationConfig: {
          responseMimeType: 'application/json',
          maxOutputTokens: 400,
          temperature: 0.7,
        },
      });

      const prompt = buildFollowUpPrompt({
        sequenceIndex: currentSequence,
        originalSubject: lastMessage.subject,
        originalBody: lastMessage.body,
        recipientEmail: thread.contactEmail,
        senderName: mailbox.fromName,
        clientName: thread.campaign.client.companyName,
        targetDomain: thread.campaign.targetDomain,
      });

      const response = await model.generateContent(prompt);
      const parsed = JSON.parse(response.response.text()) as { subject?: string; body?: string };
      if (parsed.subject && parsed.body) {
        draft = parsed;
      }
    } catch (err) {
      console.error(`[followup-run] model failed for thread ${thread.id}:`, err);
      stats.failed++;
      continue;
    }

    if (!draft || !draft.subject || !draft.body) continue;

    if (stats.followUpsSent > 0) await sleep(INTER_SEND_DELAY_MS);

    try {
      const emailRes = await resend.emails.send({
        from: `${mailbox.fromName} <${mailbox.fromEmail}>`,
        to: thread.contactEmail,
        subject: draft.subject,
        text: draft.body,
        headers: {
          'In-Reply-To': lastMessage.providerId ? `<${lastMessage.providerId}>` : '',
          'List-Unsubscribe': `<mailto:${mailbox.fromEmail}?subject=unsubscribe>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        },
      });

      if (emailRes.error) throw new Error(emailRes.error.message);

      const sendDate = new Date();
      await withRetry(() =>
        db.$transaction([
          db.outreachMessage.create({
            data: {
              threadId: thread.id,
              mailboxId: mailbox.id,
              sequenceIndex: currentSequence,
              subject: draft.subject!,
              body: draft.body!,
              status: 'sent',
              sentAt: sendDate,
              providerId: emailRes.data?.id,
              approvedAt: sendDate,
            },
          }),
          db.outreachThread.update({
            where: { id: thread.id },
            data: {
              lastSentAt: sendDate,
              messagesSent: { increment: 1 },
            },
          }),
        ])
      );

      stats.followUpsSent++;
    } catch (err) {
      console.error(`[followup-run] send failed for thread ${thread.id}:`, err);
      stats.failed++;
    }
  }

  stats.elapsedMs = Date.now() - startedAt;
  return stats;
}

// ═══════════════════════════════════════════════════════════
//  outreach-prepare.ts — finds contacts and writes drafts
//
//  NOT PORTABLE. Prisma-bound.
//
//  This half NEVER SENDS. It produces OutreachMessage rows with
//  status 'draft', which a person then approves. Preparing and
//  sending are separate operations, run by separate entry points,
//  so a bug in drafting cannot mail anyone.
// ═══════════════════════════════════════════════════════════

import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from '@/lib/db';
import { withRetry } from '@/lib/db-retry';
import { fetchPage } from './core/fetch';
import { readPageSignalsFromHtml } from './core/verify';
import {
  bestContact,
  extractContacts,
  findContactPages,
  type ContactCandidate,
} from './core/outreach/contact-discovery';
import {
  buildPrompt,
  parseDraft,
  validateDraft,
  type ComposeInput,
  type OutreachAngle,
} from './core/outreach/compose';
import { checkCompliance } from './core/outreach/policy';

const MODEL = 'gemini-flash-lite-latest';
const DEFAULT_BUDGET_MS = 240_000;
const DEFAULT_MAX_PROSPECTS = 40;
const PER_HOST_DELAY_MS = 2_000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface PrepareOptions {
  campaignId?: string;
  clientId?: string;
  angle?: OutreachAngle;
  maxProspects?: number;
  budgetMs?: number;
  /** Sender identity for the drafts. Must exist and be active. */
  mailboxId: string;
  senderRole?: string;
  signal?: AbortSignal;
}

export interface PrepareStats {
  considered: number;
  contactsFound: number;
  noContact: number;
  drafted: number;
  rejectedByValidation: number;
  modelDeclined: number;
  unreachable: number;
  elapsedMs: number;
  /** Why drafts were thrown away, so the prompt can be improved. */
  problemCounts: Record<string, number>;
}

/**
 * Finds a contact for a prospect: its own page first, then up to two pages it
 * marks as contact/about.
 *
 * Bounded deliberately. Hunting an address across a whole site costs fetches
 * and rarely finds one a publisher meant to be found.
 */
async function findContact(
  prospectUrl: string,
  signal?: AbortSignal
): Promise<{ contact: ContactCandidate | null; html: string | null; finalUrl: string; title: string | null }> {
  const first = await fetchPage(prospectUrl, { signal });
  if (!first.ok || !first.html) {
    return { contact: null, html: null, finalUrl: first.finalUrl, title: null };
  }

  const title = readPageSignalsFromHtml(first.html, first.finalUrl).title;

  const direct = bestContact(extractContacts({ html: first.html, pageUrl: first.finalUrl }));
  if (direct) return { contact: direct, html: first.html, finalUrl: first.finalUrl, title };

  for (const contactPage of findContactPages(first.html, first.finalUrl, 2)) {
    if (signal?.aborted) break;

    await sleep(PER_HOST_DELAY_MS);
    const page = await fetchPage(contactPage, { signal });
    if (!page.ok || !page.html) continue;

    const found = bestContact(
      extractContacts({ html: page.html, pageUrl: page.finalUrl, isContactPage: true })
    );
    if (found) return { contact: found, html: first.html, finalUrl: first.finalUrl, title };
  }

  return { contact: null, html: first.html, finalUrl: first.finalUrl, title };
}

export async function runOutreachPreparation(options: PrepareOptions): Promise<PrepareStats> {
  const {
    campaignId,
    clientId,
    angle = 'resource_page',
    maxProspects = DEFAULT_MAX_PROSPECTS,
    budgetMs = DEFAULT_BUDGET_MS,
    mailboxId,
    senderRole = 'SEO lead',
    signal,
  } = options;

  const startedAt = Date.now();
  const deadline = startedAt + budgetMs;

  const stats: PrepareStats = {
    considered: 0,
    contactsFound: 0,
    noContact: 0,
    drafted: 0,
    rejectedByValidation: 0,
    modelDeclined: 0,
    unreachable: 0,
    elapsedMs: 0,
    problemCounts: {},
  };

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set — drafts cannot be composed.');

  const mailbox = await withRetry(() =>
    db.outreachMailbox.findUniqueOrThrow({ where: { id: mailboxId } })
  );
  if (!mailbox.active) {
    throw new Error(`Mailbox ${mailbox.fromEmail} is not active.`);
  }

  const gemini = new GoogleGenerativeAI(apiKey);

  const campaigns = await withRetry(() =>
    db.linkCampaign.findMany({
      where: {
        enabled: true,
        ...(campaignId ? { id: campaignId } : {}),
        ...(clientId ? { clientId } : {}),
      },
      select: { id: true, name: true, targetDomain: true, topic: true, client: { select: { companyName: true } } },
    })
  );

  //  Global suppression is applied here as well as at send time. Drafting a
  //  message to someone who has opted out wastes model spend and puts a
  //  message in the approval queue that must never be approved.
  const suppression = new Set(
    (await withRetry(() => db.outreachSuppression.findMany({ select: { value: true } }))).map(
      (row) => row.value.toLowerCase()
    )
  );

  for (const campaign of campaigns) {
    if (signal?.aborted || Date.now() >= deadline) break;

    const prospects = await withRetry(() =>
      db.linkProspect.findMany({
        where: {
          campaignId: campaign.id,
          status: 'qualified',
          //  Only prospects with no thread yet. A prospect already in
          //  conversation is the sequencer's business, not the drafter's.
          threads: { none: {} },
        },
        orderBy: { qualityScore: 'desc' },
        take: maxProspects,
      })
    );

    for (const prospect of prospects) {
      if (signal?.aborted || Date.now() >= deadline) break;
      stats.considered++;

      const { contact, html, finalUrl, title } = await findContact(prospect.url, signal);

      if (!contact || !html) {
        stats.noContact++;
        if (!html) stats.unreachable++;
        //  Recorded so the same unreachable prospect is not re-fetched on
        //  every run for the rest of time.
        await withRetry(() =>
          db.linkProspect.update({
            where: { id: prospect.id },
            data: { status: html ? 'no_contact' : 'unreachable' },
          })
        );
        continue;
      }

      if (
        suppression.has(contact.email) ||
        suppression.has(contact.email.split('@')[1] ?? '')
      ) {
        stats.noContact++;
        continue;
      }

      stats.contactsFound++;

      const composeInput: ComposeInput = {
        angle,
        senderName: mailbox.fromName,
        senderRole,
        clientName: campaign.client.companyName,
        clientSite: `https://${campaign.targetDomain}`,
        //  Phase 3 suggests the campaign's home page by default. Which page to
        //  pitch per prospect is a judgement call, and picking it badly is
        //  worse than letting a human set it before approving.
        targetUrl: `https://${campaign.targetDomain}`,
        targetValue: campaign.topic ?? campaign.name,
        prospectDomain: prospect.domain,
        prospectUrl: finalUrl,
        prospectTitle: title,
        prospectExcerpt: html
          .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ')
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 3_000),
        postalAddress: mailbox.postalAddress,
        optOutText: mailbox.optOutText,
        followUpIndex: 0,
      };

      let draft = null;
      try {
        const model = gemini.getGenerativeModel({
          model: MODEL,
          generationConfig: {
            responseMimeType: 'application/json',
            maxOutputTokens: 700,
            temperature: 0.7,
          },
        });
        const response = await model.generateContent(buildPrompt(composeInput));
        draft = parseDraft(response.response.text());
      } catch (err) {
        console.error(`[outreach-prepare] model failed for ${prospect.domain}:`, err);
      }

      if (!draft) {
        stats.rejectedByValidation++;
        stats.problemCounts.model_unparseable = (stats.problemCounts.model_unparseable ?? 0) + 1;
        continue;
      }

      const validation = validateDraft(draft, composeInput);
      const compliance = checkCompliance({
        subject: draft.subject,
        body: draft.body,
        postalAddress: mailbox.postalAddress,
        optOutText: mailbox.optOutText,
        senderName: mailbox.fromName,
      });

      const problems = [...validation.problems, ...compliance.problems];
      for (const problem of problems) {
        const key = problem.split(':')[0];
        stats.problemCounts[key] = (stats.problemCounts[key] ?? 0) + 1;
      }

      if (validation.skipped) stats.modelDeclined++;

      const thread = await withRetry(() =>
        db.outreachThread.upsert({
          where: { prospectId_contactEmail: { prospectId: prospect.id, contactEmail: contact.email } },
          update: {},
          create: {
            campaignId: campaign.id,
            prospectId: prospect.id,
            contactEmail: contact.email,
            contactKind: contact.kind,
            contactFoundOn: contact.foundOn,
            angle,
            status: 'drafted',
          },
        })
      );

      await withRetry(() =>
        db.outreachMessage.create({
          data: {
            threadId: thread.id,
            mailboxId: mailbox.id,
            sequenceIndex: 0,
            subject: draft.subject,
            body: draft.body,
            //  A draft that failed validation is stored, not discarded: the
            //  problems are how the prompt gets better, and a person may still
            //  choose to rewrite and approve it by hand.
            status: problems.length === 0 ? 'draft' : validation.skipped ? 'skipped' : 'rejected',
            validationProblems: problems,
          },
        })
      );

      if (problems.length === 0) {
        stats.drafted++;
        await withRetry(() =>
          db.outreachThread.update({
            where: { id: thread.id },
            data: { status: 'awaiting_approval' },
          })
        );
      } else {
        stats.rejectedByValidation++;
      }
    }
  }

  stats.elapsedMs = Date.now() - startedAt;
  return stats;
}

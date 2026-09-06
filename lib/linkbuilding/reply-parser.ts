// ═══════════════════════════════════════════════════════════
//  reply-parser.ts — AI-powered inbound reply classifier
//
//  NOT PORTABLE. Prisma + Gemini.
//
//  Parses inbound email replies from outreach prospects,
//  classifies sentiment and intent, and triggers automated
//  downstream workflows:
//    positive    -> Thread marked 'replied', sentiment 'positive'
//    pricing     -> Thread marked 'replied', sentiment 'pricing' (flagged)
//    decline     -> Thread closed, sentiment 'negative'
//    unsubscribe -> Added to global suppression list, thread closed
//    auto_reply  -> Left untouched (OOF / holiday auto-responders)
// ═══════════════════════════════════════════════════════════

import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from '@/lib/db';
import { withRetry } from '@/lib/db-retry';

const MODEL = 'gemini-flash-lite-latest';

export type ReplyClassification =
  | 'positive'
  | 'interested'
  | 'pricing'
  | 'decline'
  | 'unsubscribe'
  | 'auto_reply'
  | 'unrelated';

export interface ParsedReply {
  classification: ReplyClassification;
  confidence: number;
  summary: string;
  autoAction: string;
}

export async function parseInboundReply(options: {
  threadId?: string;
  fromEmail: string;
  subject: string;
  bodyText: string;
}): Promise<ParsedReply> {
  const { threadId, fromEmail, subject, bodyText } = options;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set — cannot classify inbound reply.');
  }

  const gemini = new GoogleGenerativeAI(apiKey);
  const model = gemini.getGenerativeModel({
    model: MODEL,
    generationConfig: {
      responseMimeType: 'application/json',
      maxOutputTokens: 300,
      temperature: 0.1,
    },
  });

  const prompt = [
    `Analyze this inbound email reply from a website owner/editor in response to an outreach proposal.`,
    `Sender: ${fromEmail}`,
    `Subject: ${subject}`,
    `Message body:`,
    bodyText.slice(0, 2000),
    '',
    `Classify into exactly ONE of these categories:`,
    `- "positive": Webmaster agrees to collaborate, accept a guest post, or add the resource link.`,
    `- "interested": Webmaster asks for draft, questions, guidelines, or more details.`,
    `- "pricing": Webmaster asks for a payment/fee for placing the link or publishing an article.`,
    `- "decline": Webmaster rejects politely or firmly ("not interested", "no thank you").`,
    `- "unsubscribe": Webmaster explicitly asks to stop emailing, be removed, or opt out.`,
    `- "auto_reply": Automated message like out of office, vacation, or mail delivery receipt.`,
    `- "unrelated": Spam or unrelated message.`,
    '',
    `Respond in JSON only:`,
    `{`,
    `  "classification": "positive|interested|pricing|decline|unsubscribe|auto_reply|unrelated",`,
    `  "confidence": <number 0.0 to 1.0>,`,
    `  "summary": "<1-2 sentence summary of what they said>"`,
    `}`,
  ].join('\n');

  let parsed: { classification: ReplyClassification; confidence: number; summary: string } = {
    classification: 'unrelated',
    confidence: 0,
    summary: 'Unclassified',
  };

  try {
    const response = await model.generateContent(prompt);
    const result = JSON.parse(response.response.text());
    if (result.classification && typeof result.confidence === 'number') {
      parsed = result;
    }
  } catch (err) {
    console.error('[reply-parser] classification failed:', err);
  }

  let autoAction = 'none';

  // Find thread if not passed explicitly
  const thread = threadId
    ? await withRetry(() => db.outreachThread.findUnique({ where: { id: threadId } }))
    : await withRetry(() =>
        db.outreachThread.findFirst({
          where: { contactEmail: fromEmail.toLowerCase() },
          orderBy: { lastSentAt: 'desc' },
        })
      );

  const now = new Date();

  switch (parsed.classification) {
    case 'positive':
    case 'interested':
      if (thread) {
        await withRetry(() =>
          db.outreachThread.update({
            where: { id: thread.id },
            data: {
              status: 'replied',
              replySentiment: 'positive',
              repliedAt: now,
            },
          })
        );
      }
      autoAction = 'marked_replied_positive';
      break;

    case 'pricing':
      if (thread) {
        await withRetry(() =>
          db.outreachThread.update({
            where: { id: thread.id },
            data: {
              status: 'replied',
              replySentiment: 'pricing',
              repliedAt: now,
            },
          })
        );
      }
      autoAction = 'marked_replied_pricing';
      break;

    case 'decline':
      if (thread) {
        await withRetry(() =>
          db.outreachThread.update({
            where: { id: thread.id },
            data: {
              status: 'closed',
              replySentiment: 'negative',
              repliedAt: now,
            },
          })
        );
      }
      autoAction = 'marked_closed_declined';
      break;

    case 'unsubscribe':
      // Global suppression for both exact email and root domain
      const email = fromEmail.toLowerCase();
      const domain = email.split('@')[1];

      await withRetry(() =>
        db.outreachSuppression.upsert({
          where: { value: email },
          update: { reason: 'unsubscribed', notes: parsed.summary },
          create: { value: email, reason: 'unsubscribed', notes: parsed.summary },
        })
      );

      if (domain) {
        await withRetry(() =>
          db.outreachSuppression.upsert({
            where: { value: domain },
            update: { reason: 'unsubscribed', notes: `Domain of ${email}` },
            create: { value: domain, reason: 'unsubscribed', notes: `Domain of ${email}` },
          })
        );
      }

      if (thread) {
        await withRetry(() =>
          db.outreachThread.update({
            where: { id: thread.id },
            data: {
              status: 'closed',
              replySentiment: 'suppressed',
              repliedAt: now,
            },
          })
        );
      }
      autoAction = 'suppressed_and_closed';
      break;

    case 'auto_reply':
    case 'unrelated':
    default:
      autoAction = 'ignored_auto_reply';
      break;
  }

  return {
    ...parsed,
    autoAction,
  };
}

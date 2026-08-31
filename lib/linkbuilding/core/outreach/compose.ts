// ═══════════════════════════════════════════════════════════
//  core/outreach/compose.ts — writing something worth reading
//
//  PORTABLE: prompt construction and output validation. The model
//  call itself is injected, so this has no dependency on which
//  provider is in use and every rule here is testable offline.
//
//  The premise: what separates outreach from spam is not tone, it
//  is whether the sender actually read the page. So the prompt is
//  grounded in a real excerpt of the prospect's own content, and
//  `validateDraft` REJECTS a draft that could have been sent to
//  anyone — one that never references the page it claims to have
//  read. A model that drifts into generic flattery gets its
//  output thrown away rather than mailed to a stranger.
// ═══════════════════════════════════════════════════════════

/** What the message is asking for. Different asks need different framing. */
export type OutreachAngle =
  /** Their page links to resources; ours belongs on it. */
  | 'resource_page'
  /** A link on their page is dead; we have a live replacement. */
  | 'broken_link'
  /** They mentioned the brand without linking it. */
  | 'unlinked_mention'
  /** They cover this category; we would be a useful addition. */
  | 'roundup';

export interface ComposeInput {
  angle: OutreachAngle;
  /** Who is writing. A real person, named. */
  senderName: string;
  senderRole: string;
  clientName: string;
  clientSite: string;
  /** The specific page of ours being suggested. */
  targetUrl: string;
  /** Why that page is worth their reader's time, in one line. */
  targetValue: string;

  prospectDomain: string;
  /** The prospect page being written about. */
  prospectUrl: string;
  prospectTitle: string | null;
  /** Real text from that page. The grounding. */
  prospectExcerpt: string;
  /** For broken_link, the dead URL found on their page. */
  brokenUrl?: string;

  postalAddress: string;
  optOutText: string;
  /** Message number in the thread. 0 is the first contact. */
  followUpIndex?: number;
}

export interface Draft {
  subject: string;
  body: string;
}

const ANGLE_BRIEF: Record<OutreachAngle, string> = {
  resource_page:
    'Their page lists useful resources. Suggest ours as an addition, and say plainly what a reader gets from it.',
  broken_link:
    'A link on their page is dead. Lead with that — it is a genuine favour — and mention our page only as one possible replacement, secondary to the fix.',
  unlinked_mention:
    'They already mentioned the brand without linking it. Thank them for the mention first, then ask if linking it would be useful to their readers.',
  roundup:
    'They cover this category. Suggest ours as an addition and say specifically why it fits alongside what they already list.',
};

export function buildPrompt(input: ComposeInput): string {
  const followUp = input.followUpIndex ?? 0;

  return [
    `You are ${input.senderName}, ${input.senderRole} at ${input.clientName} (${input.clientSite}).`,
    `Write a short outreach email to whoever runs ${input.prospectDomain}.`,
    '',
    `Angle: ${ANGLE_BRIEF[input.angle]}`,
    input.brokenUrl ? `The dead link on their page is: ${input.brokenUrl}` : '',
    '',
    'Their page:',
    `  URL:   ${input.prospectUrl}`,
    `  Title: ${input.prospectTitle ?? '(untitled)'}`,
    `  Text:  ${input.prospectExcerpt}`,
    '',
    'What you are suggesting:',
    `  ${input.targetUrl}`,
    `  Why it is useful: ${input.targetValue}`,
    '',
    followUp > 0
      ? `This is follow-up number ${followUp}. They have not replied. Be brief, add one new` +
        ' concrete reason, and say this is the last time you will write. Do not guilt them.'
      : 'This is the first contact. They have never heard of you.',
    '',
    'Rules:',
    '- Under 130 words in the body, excluding the sign-off.',
    '- Reference something SPECIFIC from their page text above — a section, a claim, an',
    '  item they listed. If you cannot find anything specific, say so in the subject',
    '  field as the single word SKIP and leave the body empty.',
    '- No flattery about how "great" or "amazing" their site is.',
    '- No claims about our traffic, rankings, or authority. No statistics you were not given.',
    '- Do not promise anything in exchange for a link. Never mention payment.',
    '- Plain text. No markdown, no HTML, no emoji.',
    '- Ask one clear question at the end.',
    `- Sign off as ${input.senderName}, then on separate lines include exactly:`,
    `    ${input.postalAddress}`,
    `    ${input.optOutText}`,
    '',
    'Respond with JSON only: {"subject": "...", "body": "..."}',
  ]
    .filter(Boolean)
    .join('\n');
}

export interface DraftValidation {
  valid: boolean;
  problems: string[];
  /** The model declined because the page gave it nothing specific. */
  skipped: boolean;
}

/** Marketing language that reads as a template regardless of who sent it. */
const GENERIC_PHRASES = [
  'i hope this email finds you well',
  'i came across your website',
  'i stumbled upon your',
  'i must say',
  'great content',
  'amazing content',
  'love your website',
  'i was blown away',
  'quick question for you',
  'reaching out to see if',
  'let me know your thoughts',
  'win-win',
  'mutually beneficial',
  'high-quality content',
  'as per my last email',
];

/** Words in the body that mean the model offered something it must not. */
const FORBIDDEN_OFFERS = [
  'in exchange for',
  'we can pay',
  'paid placement',
  'sponsored post',
  'link exchange',
  'reciprocal link',
  'we will link back',
  'guest post fee',
];

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'with', 'that', 'this', 'from', 'your', 'you', 'our',
  'are', 'was', 'has', 'have', 'been', 'best', 'guide', 'how', 'what', 'why',
  'top', 'new', 'about', 'more', 'can', 'all', 'when', 'their', 'they',
]);

/**
 * Distinctive words from the prospect's own page, for the specificity check.
 *
 * Stop words and short tokens are dropped so "the" appearing in both texts does
 * not count as evidence the sender read anything.
 */
function distinctiveTokens(text: string): Set<string> {
  const tokens = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length >= 5 && !STOP_WORDS.has(token));

  return new Set(tokens);
}

/**
 * Rejects a draft that should not be sent.
 *
 * The specificity test is the one that matters. Everything else here is
 * hygiene; that check is what stops the system becoming a mail merge, and it is
 * why the prompt hands the model real page text rather than a summary.
 */
export function validateDraft(draft: Draft, input: ComposeInput): DraftValidation {
  const problems: string[] = [];

  const subject = draft.subject?.trim() ?? '';
  const body = draft.body?.trim() ?? '';

  //  The model's own escape hatch. A page with nothing specific to say about
  //  is a page we should not write about, and an honest skip is the right
  //  outcome rather than a generic email.
  if (subject.toUpperCase() === 'SKIP') {
    return { valid: false, problems: ['model_declined_no_specific_hook'], skipped: true };
  }

  if (!subject) problems.push('subject_empty');
  if (!body) problems.push('body_empty');

  const words = body.split(/\s+/).filter(Boolean).length;
  if (words > 220) problems.push(`body_too_long:${words}_words`);
  if (words > 0 && words < 25) problems.push(`body_too_short:${words}_words`);

  const lowerBody = body.toLowerCase();

  for (const phrase of GENERIC_PHRASES) {
    if (lowerBody.includes(phrase)) problems.push(`generic_phrase:${phrase}`);
  }

  for (const phrase of FORBIDDEN_OFFERS) {
    if (lowerBody.includes(phrase)) problems.push(`forbidden_offer:${phrase}`);
  }

  //  The specificity gate: does the draft reference the page it claims to have
  //  read? Without this the whole system degrades into templated mail.
  const pageTokens = distinctiveTokens(
    `${input.prospectTitle ?? ''} ${input.prospectExcerpt}`
  );
  const draftTokens = distinctiveTokens(body);

  //  Tokens from our own side would otherwise count as a match — the client
  //  name and target URL appear in both by construction.
  const ourTokens = distinctiveTokens(
    `${input.clientName} ${input.clientSite} ${input.targetUrl} ${input.targetValue} ${input.senderName} ${input.prospectDomain}`
  );

  let overlap = 0;
  for (const token of draftTokens) {
    if (pageTokens.has(token) && !ourTokens.has(token)) overlap++;
  }

  if (overlap < 2) problems.push(`not_specific_to_page:${overlap}_shared_terms`);

  if (!body.includes(input.targetUrl)) problems.push('target_url_missing');
  if (!lowerBody.includes(input.senderName.toLowerCase())) problems.push('not_signed');
  if (!body.includes('?')) problems.push('no_question_asked');

  //  Markdown or HTML in a plain-text email renders as literal characters.
  if (/<[a-z][^>]*>/i.test(body)) problems.push('contains_html');
  if (/\*\*|^#{1,6}\s|\[.+\]\(.+\)/m.test(body)) problems.push('contains_markdown');

  return { valid: problems.length === 0, problems, skipped: false };
}

/** Parses a model response into a draft. Returns null on anything unusable. */
export function parseDraft(raw: string): Draft | null {
  try {
    const parsed = JSON.parse(raw) as { subject?: unknown; body?: unknown };
    if (typeof parsed.subject !== 'string' || typeof parsed.body !== 'string') return null;
    return { subject: parsed.subject.trim(), body: parsed.body.trim() };
  } catch {
    return null;
  }
}

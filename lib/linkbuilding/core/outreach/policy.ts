// ═══════════════════════════════════════════════════════════
//  core/outreach/policy.ts — the gate every send passes through
//
//  PORTABLE: pure. State is passed in, nothing is read from the
//  environment or a database here, so every rule is testable and
//  none of them can be bypassed by a caller forgetting a check.
//
//  This is the most important file in Phase 3. Everything else
//  produces a draft; this decides whether a draft is allowed to
//  become an email. It answers with an explicit allow/deny and a
//  reason, and the caller is expected to refuse to send on deny —
//  there is no "warn and continue".
//
//  The rules encode the two ways an outreach system does real
//  damage: burning a domain that the business depends on, and
//  mailing people who have said no.
// ═══════════════════════════════════════════════════════════

export interface Mailbox {
  /** Full from-address, e.g. "sam@outreach.searchprex.com". */
  fromEmail: string;
  fromName: string;
  /** Sends already made from this mailbox today. */
  sentToday: number;
  dailyCap: number;
  /** Warm-up caps a new domain far below its steady-state limit. */
  warmingUp: boolean;
}

export interface SendContext {
  mailbox: Mailbox;
  recipientEmail: string;
  /** Suppressed addresses AND domains — unsubscribes, bounces, do-not-contact. */
  suppressed: Set<string>;
  /**
   * Domains the business cannot afford to burn: the site's own domain, and
   * whatever sends invoices, reports and password resets. Cold outreach from
   * any of these puts transactional mail at risk.
   */
  protectedDomains: string[];
  campaign: {
    dryRunMode: boolean;
    requiresApproval: boolean;
  };
  /** Whether a human has actually approved this specific message. */
  approved: boolean;
  /** Messages already sent to this recipient on this thread. */
  priorMessagesInThread: number;
  maxFollowUps: number;
  /** Days since the previous message, when there was one. */
  daysSinceLastMessage: number | null;
  minDaysBetweenMessages: number;
}

export interface PolicyVerdict {
  allowed: boolean;
  /** Machine-readable denials. Empty when allowed. */
  denials: string[];
  /** Non-blocking observations. */
  warnings: string[];
}

/** Warm-up ceiling. A new domain sending at full volume is a spam signal. */
export const WARMUP_DAILY_CAP = 20;

/** Absolute ceiling per mailbox per day, regardless of configuration. */
export const HARD_DAILY_CAP = 60;

function domainOf(email: string): string {
  return email.split('@')[1]?.toLowerCase().trim() ?? '';
}

function isSameOrSubdomain(domain: string, protectedDomain: string): boolean {
  const a = domain.toLowerCase().replace(/^www\./, '');
  const b = protectedDomain.toLowerCase().replace(/^www\./, '');
  return a === b;
}

/**
 * Decides whether one message may be sent.
 *
 * Every denial is collected rather than returning on the first, so a person
 * fixing configuration sees the whole list instead of discovering the next
 * problem on each retry.
 */
export function checkSendPolicy(context: SendContext): PolicyVerdict {
  const denials: string[] = [];
  const warnings: string[] = [];

  const {
    mailbox,
    recipientEmail,
    suppressed,
    protectedDomains,
    campaign,
    approved,
    priorMessagesInThread,
    maxFollowUps,
    daysSinceLastMessage,
    minDaysBetweenMessages,
  } = context;

  // ── The campaign gate ────────────────────────────────────────────────────
  if (campaign.dryRunMode) denials.push('campaign_in_dry_run');
  if (campaign.requiresApproval && !approved) denials.push('not_approved');

  // ── Domain separation ────────────────────────────────────────────────────
  const fromDomain = domainOf(mailbox.fromEmail);
  if (!fromDomain) {
    denials.push('mailbox_from_address_invalid');
  } else {
    //  The rule this file exists for. Cold outreach shares a reputation with
    //  every other message from the same domain, so a campaign that annoys
    //  enough strangers can stop a client's invoices from being delivered.
    //  Subdomain separation (outreach.example.com) is the accepted answer, so
    //  only an exact match is refused.
    for (const protectedDomain of protectedDomains) {
      if (isSameOrSubdomain(fromDomain, protectedDomain)) {
        denials.push(`from_domain_is_protected:${protectedDomain}`);
      }
    }
  }

  //  Resend's shared sandbox sender only delivers to the account owner, so a
  //  campaign "sent" from it reaches nobody while reporting success.
  if (fromDomain === 'resend.dev') denials.push('from_domain_is_resend_sandbox');

  // ── The recipient ────────────────────────────────────────────────────────
  const recipient = recipientEmail.toLowerCase().trim();
  if (!recipient.includes('@')) {
    denials.push('recipient_invalid');
  } else {
    //  Both the address and its domain are checked. One person unsubscribing
    //  does not silence a whole publisher, but a domain-level do-not-contact
    //  (a legal request, an angry reply) has to stop everything.
    if (suppressed.has(recipient)) denials.push('recipient_suppressed');
    const recipientDomain = domainOf(recipient);
    if (recipientDomain && suppressed.has(recipientDomain)) {
      denials.push('recipient_domain_suppressed');
    }
    if (recipient === mailbox.fromEmail.toLowerCase()) denials.push('recipient_is_sender');
  }

  // ── Volume ───────────────────────────────────────────────────────────────
  const effectiveCap = Math.min(
    mailbox.dailyCap,
    HARD_DAILY_CAP,
    mailbox.warmingUp ? WARMUP_DAILY_CAP : Number.POSITIVE_INFINITY
  );

  if (mailbox.sentToday >= effectiveCap) {
    denials.push(`daily_cap_reached:${effectiveCap}`);
  } else if (mailbox.sentToday >= effectiveCap * 0.8) {
    warnings.push(`approaching_daily_cap:${mailbox.sentToday}/${effectiveCap}`);
  }

  // ── Sequence discipline ──────────────────────────────────────────────────
  if (priorMessagesInThread > maxFollowUps) {
    denials.push(`follow_up_limit_reached:${maxFollowUps}`);
  }
  if (
    priorMessagesInThread > 0 &&
    daysSinceLastMessage !== null &&
    daysSinceLastMessage < minDaysBetweenMessages
  ) {
    denials.push(`too_soon:${daysSinceLastMessage}d_of_${minDaysBetweenMessages}d`);
  }

  return { allowed: denials.length === 0, denials, warnings };
}

export interface ComplianceInput {
  subject: string;
  body: string;
  /** Postal address that must appear in the body. */
  postalAddress: string;
  /** The opt-out instruction that must appear, e.g. "reply STOP". */
  optOutText: string;
  senderName: string;
}

export interface ComplianceVerdict {
  compliant: boolean;
  problems: string[];
}

/**
 * Checks a drafted message against the content rules that apply to commercial
 * email — a valid postal address, a working opt-out, a real sender name, and a
 * subject line that is not deceptive.
 *
 * These are CAN-SPAM requirements in the US and overlap with what GDPR expects
 * of a legitimate-interest message. Enforced in code rather than trusted to a
 * prompt, because a model that drifts will drop the footer and nobody notices
 * until a complaint arrives.
 */
export function checkCompliance(input: ComplianceInput): ComplianceVerdict {
  const problems: string[] = [];
  const { subject, body, postalAddress, optOutText, senderName } = input;

  const normalizedBody = body.toLowerCase();

  if (!subject.trim()) problems.push('subject_empty');
  if (subject.length > 120) problems.push('subject_too_long');

  //  A subject implying an existing relationship where there is none is
  //  precisely the deception the rules name.
  if (/^(re|fwd?):/i.test(subject.trim())) problems.push('subject_fakes_a_reply');

  if (!body.trim()) problems.push('body_empty');

  if (postalAddress.trim()) {
    if (!normalizedBody.includes(postalAddress.toLowerCase().slice(0, 20))) {
      problems.push('missing_postal_address');
    }
  } else {
    problems.push('no_postal_address_configured');
  }

  if (optOutText.trim()) {
    if (!normalizedBody.includes(optOutText.toLowerCase().slice(0, 15))) {
      problems.push('missing_opt_out');
    }
  } else {
    problems.push('no_opt_out_configured');
  }

  if (!senderName.trim()) problems.push('no_sender_name');
  else if (!normalizedBody.includes(senderName.toLowerCase())) problems.push('body_does_not_identify_sender');

  //  Unfilled template markers. A mail-merge artefact reaching a real
  //  recipient is the single most embarrassing failure mode there is.
  const placeholder = body.match(/\[[A-Z_ ]{2,30}\]|\{\{[^}]{1,40}\}\}|<[A-Z_]{2,30}>/);
  if (placeholder) problems.push(`unfilled_placeholder:${placeholder[0].slice(0, 30)}`);

  return { compliant: problems.length === 0, problems };
}

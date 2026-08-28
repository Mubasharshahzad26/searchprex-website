// ═══════════════════════════════════════════════════════════
//  lib/email-identity.ts — who mail comes from, and whether it
//  is allowed to leave
//
//  One place for the from-addresses so the answer cannot drift
//  between routes, and so the two failure modes that cost real
//  money are checked rather than assumed:
//
//   1. onboarding@resend.dev is Resend's SHARED SANDBOX sender.
//      It accepts the send, returns success, and delivers only to
//      the Resend account owner. A report "sent" from it reaches
//      nobody and reports no error, which is how client reports
//      can go missing for months without a single failed run.
//
//   2. Cold outreach shares a sending reputation with everything
//      else on its domain. Enough of it from the primary domain
//      and invoices, reports and password resets start landing in
//      spam. Transactional mail belongs on the primary domain;
//      cold outreach belongs on a separate subdomain.
// ═══════════════════════════════════════════════════════════

/** Resend's shared sandbox domain. Never a real recipient-facing sender. */
export const RESEND_SANDBOX_DOMAIN = 'resend.dev';

export interface SenderIdentity {
  /** Ready for Resend's `from` field: `Name <address>`. */
  from: string;
  email: string;
  name: string;
  domain: string;
  /** Non-fatal problems the caller should log and surface. */
  warnings: string[];
}

export class EmailIdentityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EmailIdentityError';
  }
}

function domainOf(email: string): string {
  return email.split('@')[1]?.toLowerCase().trim() ?? '';
}

/** The site's own domain, from NEXT_PUBLIC_SITE_URL. */
export function primaryDomain(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.searchprex.com';
  try {
    return new URL(siteUrl).hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    return 'searchprex.com';
  }
}

function build(email: string, name: string, warnings: string[]): SenderIdentity {
  const trimmed = email.trim();
  const domain = domainOf(trimmed);

  if (!trimmed.includes('@') || !domain) {
    throw new EmailIdentityError(`Not a usable from-address: "${email}"`);
  }

  return { from: `${name} <${trimmed}>`, email: trimmed, name, domain, warnings };
}

/**
 * Sender for transactional mail — client reports, audits, growth plans.
 *
 * The primary domain is correct here: this is mail a recipient asked for, and
 * it should carry the brand's own reputation.
 *
 * THROWS on the sandbox sender rather than sending. A hard failure that appears
 * in the cron result is far better than a success that delivered to nobody,
 * which is exactly the state this function was written to end.
 */
export function transactionalSender(): SenderIdentity {
  const email = process.env.REPORTS_FROM_EMAIL?.trim() || `reports@${primaryDomain()}`;
  const name = process.env.REPORTS_FROM_NAME?.trim() || 'SearchPrex Reports';

  if (domainOf(email) === RESEND_SANDBOX_DOMAIN) {
    throw new EmailIdentityError(
      `Refusing to send from ${email}. onboarding@resend.dev is Resend's shared ` +
        'sandbox and only delivers to your own Resend account — recipients get nothing ' +
        'while every send reports success. Verify a domain at resend.com/domains and ' +
        'set REPORTS_FROM_EMAIL.'
    );
  }

  return build(email, name, []);
}

/**
 * Sender for cold outreach — the AI SDR, and anything else writing to people
 * who did not ask to hear from us.
 *
 * Warns rather than throws when it is on the primary domain. This is
 * pre-existing behaviour for the SDR, and hard-failing would take a working
 * pipeline offline without warning; the warning is returned so the caller can
 * surface it. The link-building module holds itself to the stricter rule and
 * refuses outright — see core/outreach/policy.ts.
 */
export function coldOutreachSender(): SenderIdentity {
  const primary = primaryDomain();
  const email = process.env.SDR_FROM_EMAIL?.trim() || `contact@${primary}`;
  const name = process.env.SDR_FROM_NAME?.trim() || 'SearchPrex SDR';
  const domain = domainOf(email);
  const warnings: string[] = [];

  if (domain === RESEND_SANDBOX_DOMAIN) {
    throw new EmailIdentityError(
      `Refusing to send outreach from ${email} — the Resend sandbox delivers to nobody.`
    );
  }

  if (domain === primary) {
    warnings.push(
      `cold outreach is sending from ${domain}, the same domain as your transactional ` +
        'mail. Enough complaints here and client reports start landing in spam. Verify ' +
        `outreach.${primary} in Resend and set SDR_FROM_EMAIL.`
    );
  }

  return build(email, name, warnings);
}

/**
 * Postal address and opt-out line required in commercial email.
 *
 * Returns null when COMPANY_POSTAL_ADDRESS is unset, and callers are expected
 * to refuse to send rather than omit it — a valid physical address and a
 * working opt-out are legal requirements under CAN-SPAM, not formatting.
 */
export function complianceFooter(): { postalAddress: string; optOutText: string } | null {
  const postalAddress = process.env.COMPANY_POSTAL_ADDRESS?.trim();
  if (!postalAddress) return null;

  return {
    postalAddress,
    optOutText:
      process.env.OUTREACH_OPT_OUT_TEXT?.trim() ||
      'Reply with STOP and I will not contact you again.',
  };
}

/** Appends the compliance block to an HTML body. */
export function appendComplianceHtml(
  html: string,
  footer: { postalAddress: string; optOutText: string }
): string {
  return (
    html +
    `<hr style="margin:24px 0;border:none;border-top:1px solid #ddd">` +
    `<p style="font-size:12px;color:#666;line-height:1.5">` +
    `${escapeHtml(footer.postalAddress)}<br>${escapeHtml(footer.optOutText)}` +
    `</p>`
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

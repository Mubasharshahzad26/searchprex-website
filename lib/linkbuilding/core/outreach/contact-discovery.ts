// ═══════════════════════════════════════════════════════════
//  core/outreach/contact-discovery.ts — who to write to
//
//  PORTABLE: pure. HTML in, candidates out. No network, no
//  third-party enrichment service.
//
//  Only addresses a site publishes about itself are collected,
//  and every candidate carries the page it was found on. That
//  evidence is not decoration: under GDPR it is the record of why
//  contacting this address was lawful, and it is the first thing
//  anyone asks for when a recipient complains.
//
//  Guessing patterns (firstname@domain, editor@domain) is
//  deliberately NOT done. A guessed address bounces, and bounces
//  are what destroy a sending domain's reputation. If a site does
//  not publish a contact address, the correct answer is that we
//  do not have one.
// ═══════════════════════════════════════════════════════════

import * as cheerio from 'cheerio';
import { resolveHref, sameSite } from '../normalize.js';

export type ContactKind =
  /** Editorial or general inbox — editor@, tips@, hello@. The right target. */
  | 'role'
  /** A named individual — jane@, j.smith@. */
  | 'personal'
  /** Real but wrong: sales@, careers@, billing@. */
  | 'irrelevant';

export interface ContactCandidate {
  email: string;
  kind: ContactKind;
  /** 0..100. How confident we are this is a real, reachable inbox. */
  confidence: number;
  /** Page the address was published on. The lawful-basis record. */
  foundOn: string;
  /** How it was found — mailto link, page text. */
  method: 'mailto' | 'text';
  /** Nearby text, for the human approving the send. */
  context?: string;
}

/**
 * Local parts that are editorial or general enquiry inboxes. These are the
 * addresses a publisher puts up precisely so people can pitch them.
 */
const ROLE_LOCALS = [
  'editor', 'editors', 'editorial', 'tips', 'news', 'press', 'media',
  'contact', 'hello', 'hi', 'info', 'enquiries', 'inquiries', 'team',
  'content', 'submissions', 'write', 'pitch', 'feedback',
];

/** Real inboxes that are the wrong department. Found, ranked last, never binned. */
const IRRELEVANT_LOCALS = [
  'sales', 'billing', 'invoices', 'accounts', 'careers', 'jobs', 'recruitment',
  'hr', 'support', 'help', 'legal', 'privacy', 'dmca', 'abuse', 'security',
  'webmaster', 'postmaster', 'hostmaster', 'admin', 'unsubscribe',
];

/** Addresses that cannot receive mail, or must never be written to. */
const NEVER_CONTACT = [
  'noreply', 'no-reply', 'donotreply', 'do-not-reply', 'mailer-daemon',
  'bounce', 'bounces', 'notifications', 'notification', 'automated',
];

/** Not real addresses: tracking pixels, placeholders, image sprites. */
const JUNK_DOMAINS = [
  'example.com', 'example.org', 'domain.com', 'yourdomain.com', 'email.com',
  'sentry.io', 'wixpress.com', 'squarespace.com', '2x.png', 'sentry-next.wixpress.com',
];

/** Anchor text or href fragments that mark a page as the place to find contacts. */
const CONTACT_PAGE_HINTS = /contact|about|team|staff|masthead|editorial|write-for|advertise|impressum/i;

//  Conservative on purpose. A greedy pattern picks up filenames like
//  logo@2x.png and version strings, which then bounce.
const EMAIL_PATTERN = /\b[a-z0-9][a-z0-9._%+-]{0,63}@[a-z0-9][a-z0-9.-]{0,253}\.[a-z]{2,24}\b/gi;

function localPartOf(email: string): string {
  return email.split('@')[0]?.toLowerCase() ?? '';
}

function domainOf(email: string): string {
  return email.split('@')[1]?.toLowerCase() ?? '';
}

/** Rejects addresses that are not real inboxes. */
function isPlausible(email: string): boolean {
  const local = localPartOf(email);
  const domain = domainOf(email);
  if (!local || !domain) return false;

  if (JUNK_DOMAINS.some((junk) => domain === junk || domain.endsWith(`.${junk}`))) return false;
  if (NEVER_CONTACT.some((blocked) => local === blocked || local.startsWith(`${blocked}-`))) return false;

  //  Image and asset filenames routinely match an email pattern.
  if (/\.(png|jpe?g|gif|svg|webp|css|js)$/i.test(domain)) return false;
  //  A hex string local part is a tracking token, not a person.
  if (/^[0-9a-f]{16,}$/i.test(local)) return false;

  return true;
}

function classify(email: string): ContactKind {
  const local = localPartOf(email);
  const base = local.split('+')[0];

  if (ROLE_LOCALS.includes(base)) return 'role';
  if (IRRELEVANT_LOCALS.includes(base)) return 'irrelevant';
  return 'personal';
}

/**
 * Ranks a candidate.
 *
 * A role inbox on a contact page beats a personal address scraped from a
 * comment thread, and the ordering matters more than the absolute number: the
 * top candidate is the one a human is asked to approve.
 */
function score(kind: ContactKind, method: ContactCandidate['method'], onContactPage: boolean): number {
  let value = kind === 'role' ? 55 : kind === 'personal' ? 40 : 10;
  //  A mailto is published for the purpose of being written to. Text may be a
  //  quotation, a customer's address in a testimonial, or an example.
  if (method === 'mailto') value += 25;
  if (onContactPage) value += 20;
  return Math.min(100, value);
}

function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase().replace(/^mailto:/, '').split('?')[0];
}

export interface ExtractContactsInput {
  html: string;
  pageUrl: string;
  /** True when the page is a contact/about page, which raises confidence. */
  isContactPage?: boolean;
}

export function extractContacts(input: ExtractContactsInput): ContactCandidate[] {
  const { html, pageUrl, isContactPage = CONTACT_PAGE_HINTS.test(pageUrl) } = input;

  const $ = cheerio.load(html);
  $('script, style, noscript').remove();

  const byEmail = new Map<string, ContactCandidate>();

  const add = (raw: string, method: ContactCandidate['method'], context?: string) => {
    const email = normalizeEmail(raw);
    if (!email.includes('@') || !isPlausible(email)) return;

    const kind = classify(email);
    const candidate: ContactCandidate = {
      email,
      kind,
      confidence: score(kind, method, isContactPage),
      foundOn: pageUrl,
      method,
      context: context?.replace(/\s+/g, ' ').trim().slice(0, 160) || undefined,
    };

    //  Keep the strongest sighting: an address found both as a mailto and in
    //  body text should be recorded as the mailto.
    const existing = byEmail.get(email);
    if (!existing || candidate.confidence > existing.confidence) byEmail.set(email, candidate);
  };

  $('a[href^="mailto:" i]').each((_, el) => {
    const href = $(el).attr('href') ?? '';
    add(href, 'mailto', $(el).text() || $(el).parent().text());
  });

  const text = $('body').text();
  for (const match of text.matchAll(EMAIL_PATTERN)) {
    const index = match.index ?? 0;
    add(match[0], 'text', text.slice(Math.max(0, index - 70), index + match[0].length + 70));
  }

  return [...byEmail.values()].sort((a, b) => b.confidence - a.confidence);
}

/**
 * Internal pages likely to publish a contact address, so a caller knows where
 * to look next when the page it has yields nothing.
 *
 * Capped and same-site only: this is a hint for two or three extra fetches, not
 * a licence to crawl the site.
 */
export function findContactPages(html: string, pageUrl: string, limit = 3): string[] {
  const $ = cheerio.load(html);
  const found = new Set<string>();

  $('a[href]').each((_, el) => {
    if (found.size >= limit) return;

    const href = $(el).attr('href') ?? '';
    const label = $(el).text();
    if (!CONTACT_PAGE_HINTS.test(href) && !CONTACT_PAGE_HINTS.test(label)) return;

    const resolved = resolveHref(href, pageUrl);
    if (!resolved || !sameSite(resolved, pageUrl)) return;
    if (resolved === pageUrl) return;

    found.add(resolved);
  });

  return [...found];
}

/**
 * The single address to approach, or null.
 *
 * Null is a legitimate and common answer. Returning a guessed address instead
 * would trade a missing contact for a bounce, and bounces are what get a
 * sending domain blocked.
 */
export function bestContact(candidates: ContactCandidate[]): ContactCandidate | null {
  const usable = candidates.filter((c) => c.kind !== 'irrelevant' && c.confidence >= 55);
  return usable[0] ?? null;
}

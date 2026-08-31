/**
 * scripts/test-outreach.ts
 *
 * Fixture tests for Phase 3. No database, no network, no email.
 *
 *   npx tsx scripts/test-outreach.ts
 *
 * The send policy tests are the ones that matter most: they are what stands
 * between this system and mailing the wrong person from the wrong domain.
 */
import { extractContacts, bestContact, findContactPages } from '../lib/linkbuilding/core/outreach/contact-discovery';
import { checkSendPolicy, checkCompliance, WARMUP_DAILY_CAP, type SendContext } from '../lib/linkbuilding/core/outreach/policy';
import { validateDraft, parseDraft, buildPrompt, type ComposeInput } from '../lib/linkbuilding/core/outreach/compose';

let passed = 0;
const failures: string[] = [];

function check(label: string, actual: unknown, expected: unknown) {
  const a = JSON.stringify(actual);
  const b = JSON.stringify(expected);
  if (a === b) {
    passed++;
    console.log(`  ✓ ${label}`);
  } else {
    failures.push(`${label}\n      expected: ${b}\n      actual:   ${a}`);
    console.log(`  ✗ ${label}  (expected ${b}, got ${a})`);
  }
}

console.log('\ncontact discovery');
{
  const html = `<html><body>
    <a href="mailto:editor@pub.com">Email the editor</a>
    <p>For sales enquiries write to sales@pub.com</p>
    <p>Our founder jane.smith@pub.com wrote this.</p>
    <a href="mailto:noreply@pub.com">no reply</a>
    <img src="logo@2x.png">
    <p>Questions? hello@example.com</p>
  </body></html>`;

  const contacts = extractContacts({ html, pageUrl: 'https://pub.com/contact' });
  const emails = contacts.map((c) => c.email);

  check('mailto is found', emails.includes('editor@pub.com'), true);
  check('text address is found', emails.includes('sales@pub.com'), true);
  check('noreply is never collected', emails.includes('noreply@pub.com'), false);
  check('an image filename is not an address', emails.some((e) => e.includes('2x.png')), false);
  check('placeholder domains are dropped', emails.includes('hello@example.com'), false);

  const editor = contacts.find((c) => c.email === 'editor@pub.com');
  check('role inbox is classified', editor?.kind, 'role');
  check('personal address is classified', contacts.find((c) => c.email === 'jane.smith@pub.com')?.kind, 'personal');
  check('sales is classified irrelevant', contacts.find((c) => c.email === 'sales@pub.com')?.kind, 'irrelevant');
  check('provenance is recorded', editor?.foundOn, 'https://pub.com/contact');

  check('the editorial inbox wins', bestContact(contacts)?.email, 'editor@pub.com');
  check('irrelevant inboxes are never chosen', bestContact([contacts.find((c) => c.email === 'sales@pub.com')!]), null);
  check('no candidates means no contact, not a guess', bestContact([]), null);
}

{
  const html = `<a href="/contact">Contact</a><a href="/about-us">About</a>
                <a href="https://other.com/contact">Elsewhere</a><a href="/pricing">Pricing</a>`;
  const pages = findContactPages(html, 'https://pub.com/post');
  check('same-site contact pages are suggested', pages, ['https://pub.com/contact', 'https://pub.com/about-us']);
}

console.log('\nsend policy — the domain rule');
function context(overrides: Partial<SendContext> = {}): SendContext {
  return {
    mailbox: {
      fromEmail: 'sam@outreach.searchprex.com',
      fromName: 'Sam',
      sentToday: 0,
      dailyCap: 25,
      warmingUp: false,
    },
    recipientEmail: 'editor@pub.com',
    suppressed: new Set(),
    protectedDomains: ['searchprex.com'],
    campaign: { dryRunMode: false, requiresApproval: true },
    approved: true,
    priorMessagesInThread: 0,
    maxFollowUps: 2,
    daysSinceLastMessage: null,
    minDaysBetweenMessages: 4,
    ...overrides,
  };
}

check('a separate subdomain is allowed', checkSendPolicy(context()).allowed, true);
{
  const primary = checkSendPolicy(
    context({ mailbox: { ...context().mailbox, fromEmail: 'contact@searchprex.com' } })
  );
  check('the primary domain is refused', primary.allowed, false);
  check('and says which domain', primary.denials, ['from_domain_is_protected:searchprex.com']);
}
{
  const sandbox = checkSendPolicy(
    context({ mailbox: { ...context().mailbox, fromEmail: 'x@resend.dev' } })
  );
  check('the Resend sandbox sender is refused', sandbox.denials.includes('from_domain_is_resend_sandbox'), true);
}

console.log('\nsend policy — the recipient');
check(
  'a suppressed address is refused',
  checkSendPolicy(context({ suppressed: new Set(['editor@pub.com']) })).denials,
  ['recipient_suppressed']
);
check(
  'a suppressed domain silences everyone there',
  checkSendPolicy(context({ suppressed: new Set(['pub.com']) })).denials,
  ['recipient_domain_suppressed']
);

console.log('\nsend policy — the approval gate');
check('an unapproved message is refused', checkSendPolicy(context({ approved: false })).denials, ['not_approved']);
check('dry run refuses everything', checkSendPolicy(context({ campaign: { dryRunMode: true, requiresApproval: true } })).allowed, false);
{
  //  Approval is only waived where the campaign explicitly says so, which is
  //  itself a deliberate configuration choice.
  const noApprovalNeeded = checkSendPolicy(
    context({ approved: false, campaign: { dryRunMode: false, requiresApproval: false } })
  );
  check('a campaign may opt out of approval', noApprovalNeeded.allowed, true);
}

console.log('\nsend policy — volume and sequencing');
check(
  'the daily cap is enforced',
  checkSendPolicy(context({ mailbox: { ...context().mailbox, sentToday: 25 } })).denials,
  ['daily_cap_reached:25']
);
check(
  'warm-up overrides a generous cap',
  checkSendPolicy(context({ mailbox: { ...context().mailbox, sentToday: WARMUP_DAILY_CAP, dailyCap: 50, warmingUp: true } })).denials,
  [`daily_cap_reached:${WARMUP_DAILY_CAP}`]
);
check(
  'approaching the cap warns without blocking',
  checkSendPolicy(context({ mailbox: { ...context().mailbox, sentToday: 21 } })).warnings.length,
  1
);
check(
  'the follow-up limit is enforced',
  checkSendPolicy(context({ priorMessagesInThread: 3, maxFollowUps: 2 })).denials,
  ['follow_up_limit_reached:2']
);
check(
  'chasing too soon is refused',
  checkSendPolicy(context({ priorMessagesInThread: 1, daysSinceLastMessage: 1 })).denials,
  ['too_soon:1d_of_4d']
);
{
  //  All denials are collected, not just the first — otherwise fixing
  //  configuration becomes a guessing game one error at a time.
  const many = checkSendPolicy(
    context({
      approved: false,
      suppressed: new Set(['editor@pub.com']),
      mailbox: { ...context().mailbox, fromEmail: 'a@searchprex.com', sentToday: 99 },
    })
  );
  check('every denial is reported at once', many.denials.length >= 4, true);
}

console.log('\ncompliance');
const COMPLIANT = {
  subject: 'Your knife-sharpening resource list',
  body: 'Hi — noticed the whetstone section. Worth adding?\n\nSam\nAcme, 123 Main St, Detroit MI\nReply with STOP and I will not write again.',
  postalAddress: 'Acme, 123 Main St, Detroit MI',
  optOutText: 'Reply with STOP and I will not write again.',
  senderName: 'Sam',
};
check('a complete message passes', checkCompliance(COMPLIANT).compliant, true);
check('a missing postal address fails', checkCompliance({ ...COMPLIANT, body: 'Hi. Sam. Reply with STOP and I will not write again.' }).problems.includes('missing_postal_address'), true);
check('a missing opt-out fails', checkCompliance({ ...COMPLIANT, body: 'Hi. Sam. Acme, 123 Main St, Detroit MI' }).problems.includes('missing_opt_out'), true);
check('a faked reply subject fails', checkCompliance({ ...COMPLIANT, subject: 'Re: our conversation' }).problems.includes('subject_fakes_a_reply'), true);
check('an unfilled placeholder fails', checkCompliance({ ...COMPLIANT, body: COMPLIANT.body + ' [FIRST NAME]' }).problems.some((p) => p.startsWith('unfilled_placeholder')), true);
check('a mustache placeholder fails', checkCompliance({ ...COMPLIANT, body: COMPLIANT.body + ' {{name}}' }).problems.some((p) => p.startsWith('unfilled_placeholder')), true);

console.log('\ndraft validation — the specificity gate');
const COMPOSE: ComposeInput = {
  angle: 'resource_page',
  senderName: 'Sam',
  senderRole: 'SEO lead',
  clientName: 'Acme Knives',
  clientSite: 'https://acmeknives.com',
  targetUrl: 'https://acmeknives.com/sharpening-guide',
  targetValue: 'a step-by-step whetstone angle guide',
  prospectDomain: 'bushcraft.example',
  prospectUrl: 'https://bushcraft.example/resources',
  prospectTitle: 'Bushcraft Resources',
  prospectExcerpt:
    'Our favourite resources for wilderness skills, including firecraft tutorials, ' +
    'shelter building diagrams, and a section on whetstone maintenance for carbon blades.',
  postalAddress: 'Acme, 123 Main St, Detroit MI',
  optOutText: 'Reply with STOP.',
};

{
  const specific = validateDraft(
    {
      subject: 'Whetstone maintenance on your resources page',
      body:
        'Your resources page covers whetstone maintenance for carbon blades, but stops short of angles. ' +
        'We wrote a guide on exactly that: https://acmeknives.com/sharpening-guide — worth a line in that section?\n\n' +
        'Sam\nAcme, 123 Main St, Detroit MI\nReply with STOP.',
    },
    COMPOSE
  );
  check('a genuinely specific draft passes', specific.valid, true);
}
{
  const generic = validateDraft(
    {
      subject: 'Quick question',
      body:
        'I hope this email finds you well. I came across your website and I must say, great content! ' +
        'We have a resource you might like: https://acmeknives.com/sharpening-guide. Let me know your thoughts?\n\n' +
        'Sam\nAcme, 123 Main St, Detroit MI\nReply with STOP.',
    },
    COMPOSE
  );
  check('a mail-merge draft is rejected', generic.valid, false);
  check('generic phrases are named', generic.problems.some((p) => p.startsWith('generic_phrase')), true);
  check('and so is the lack of specificity', generic.problems.some((p) => p.startsWith('not_specific_to_page')), true);
}
{
  const bribe = validateDraft(
    {
      subject: 'Whetstone maintenance section',
      body:
        'Your whetstone maintenance section for carbon blades is good. We can pay for a link to ' +
        'https://acmeknives.com/sharpening-guide — interested?\n\nSam\nAcme, 123 Main St, Detroit MI\nReply with STOP.',
    },
    COMPOSE
  );
  check('offering payment is rejected', bribe.problems.some((p) => p.startsWith('forbidden_offer')), true);
}
{
  const skip = validateDraft({ subject: 'SKIP', body: '' }, COMPOSE);
  check('the model may decline', skip.skipped, true);
  check('and declining is not a valid draft', skip.valid, false);
}

console.log('\nprompt and parsing');
{
  const prompt = buildPrompt(COMPOSE);
  check('the prompt carries real page text', prompt.includes('whetstone maintenance for carbon blades'), true);
  check('and the compliance lines', prompt.includes('Acme, 123 Main St, Detroit MI'), true);
  check('follow-ups are framed differently', buildPrompt({ ...COMPOSE, followUpIndex: 1 }).includes('follow-up number 1'), true);

  check('valid JSON parses', parseDraft('{"subject":"a","body":"b"}'), { subject: 'a', body: 'b' });
  check('malformed JSON is null, never a partial draft', parseDraft('not json'), null);
  check('a missing field is null', parseDraft('{"subject":"a"}'), null);
}

console.log(`\n${failures.length === 0 ? '✓' : '✗'} ${passed} passed, ${failures.length} failed\n`);

if (failures.length > 0) {
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  process.exit(1);
}

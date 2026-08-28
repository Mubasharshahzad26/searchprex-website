/**
 * scripts/test-email-identity.ts
 *
 * Tests for lib/email-identity.ts — who mail comes from.
 *
 *   npx tsx scripts/test-email-identity.ts
 *
 * The sandbox test is the one that matters: onboarding@resend.dev accepted
 * every client report for months, reported success, and delivered none of them.
 */
import {
  appendComplianceHtml,
  coldOutreachSender,
  complianceFooter,
  EmailIdentityError,
  primaryDomain,
  transactionalSender,
} from '../lib/email-identity';

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

function throws(label: string, fn: () => unknown, matcher: RegExp) {
  try {
    fn();
    failures.push(`${label} — expected a throw, got none`);
    console.log(`  ✗ ${label}  (no throw)`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (err instanceof EmailIdentityError && matcher.test(message)) {
      passed++;
      console.log(`  ✓ ${label}`);
    } else {
      failures.push(`${label} — wrong error: ${message}`);
      console.log(`  ✗ ${label}  (got: ${message.slice(0, 90)})`);
    }
  }
}

/** Runs `fn` with a temporary environment, restoring it afterwards. */
function withEnv(vars: Record<string, string | undefined>, fn: () => void) {
  const saved: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(vars)) {
    saved[key] = process.env[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    fn();
  } finally {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

const SITE = { NEXT_PUBLIC_SITE_URL: 'https://www.searchprex.com' };

console.log('\nprimaryDomain');
withEnv(SITE, () => check('www is stripped', primaryDomain(), 'searchprex.com'));
withEnv({ NEXT_PUBLIC_SITE_URL: 'not a url' }, () =>
  check('an unparseable site url falls back', primaryDomain(), 'searchprex.com')
);

console.log('\ntransactionalSender — the sandbox must never ship again');
withEnv({ ...SITE, REPORTS_FROM_EMAIL: undefined, REPORTS_FROM_NAME: undefined }, () => {
  const sender = transactionalSender();
  check('defaults to the primary domain', sender.email, 'reports@searchprex.com');
  check('and is formatted for Resend', sender.from, 'SearchPrex Reports <reports@searchprex.com>');
});

withEnv({ ...SITE, REPORTS_FROM_EMAIL: 'onboarding@resend.dev' }, () =>
  throws('the Resend sandbox is refused outright', transactionalSender, /sandbox/i)
);

withEnv({ ...SITE, REPORTS_FROM_EMAIL: 'anything@resend.dev' }, () =>
  throws('any resend.dev address is refused', transactionalSender, /sandbox/i)
);

withEnv({ ...SITE, REPORTS_FROM_EMAIL: 'not-an-email' }, () =>
  throws('a malformed address is refused', transactionalSender, /not a usable from-address/i)
);

withEnv({ ...SITE, REPORTS_FROM_EMAIL: 'hello@clientmail.io', REPORTS_FROM_NAME: 'Reports' }, () => {
  const sender = transactionalSender();
  check('a configured verified sender is used', sender.from, 'Reports <hello@clientmail.io>');
  check('and raises no warning', sender.warnings, []);
});

console.log('\ncoldOutreachSender — warns, does not block');
withEnv({ ...SITE, SDR_FROM_EMAIL: undefined, SDR_FROM_NAME: undefined }, () => {
  const sender = coldOutreachSender();
  check('the current default still works', sender.email, 'contact@searchprex.com');
  //  Deliberately a warning, not a throw: this is pre-existing behaviour and
  //  hard-failing would take a working pipeline offline without notice.
  check('but the domain risk is reported', sender.warnings.length, 1);
  check('and names the fix', sender.warnings[0].includes('outreach.searchprex.com'), true);
});

withEnv({ ...SITE, SDR_FROM_EMAIL: 'sam@outreach.searchprex.com' }, () => {
  const sender = coldOutreachSender();
  check('a separate subdomain is clean', sender.warnings, []);
});

withEnv({ ...SITE, SDR_FROM_EMAIL: 'x@resend.dev' }, () =>
  throws('outreach from the sandbox is refused', coldOutreachSender, /delivers to nobody/i)
);

console.log('\ncompliance footer');
withEnv({ COMPANY_POSTAL_ADDRESS: undefined }, () =>
  check('no address configured means no footer', complianceFooter(), null)
);

withEnv({ COMPANY_POSTAL_ADDRESS: 'SearchPrex, 1 Main St, Detroit MI', OUTREACH_OPT_OUT_TEXT: undefined }, () => {
  const footer = complianceFooter()!;
  check('the address is carried through', footer.postalAddress, 'SearchPrex, 1 Main St, Detroit MI');
  check('and a default opt-out is supplied', footer.optOutText.includes('STOP'), true);

  const html = appendComplianceHtml('<p>Hello</p>', footer);
  check('the body is preserved', html.startsWith('<p>Hello</p>'), true);
  check('the address is appended', html.includes('1 Main St'), true);
  check('and the opt-out with it', html.includes('STOP'), true);
});

withEnv({ COMPANY_POSTAL_ADDRESS: 'A & B <Ltd>, 1 Main St' }, () => {
  const html = appendComplianceHtml('<p>Hi</p>', complianceFooter()!);
  check('the address is HTML-escaped', html.includes('A &amp; B &lt;Ltd&gt;'), true);
});

console.log(`\n${failures.length === 0 ? '✓' : '✗'} ${passed} passed, ${failures.length} failed\n`);

if (failures.length > 0) {
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  process.exit(1);
}

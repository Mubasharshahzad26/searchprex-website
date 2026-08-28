// ═══════════════════════════════════════════════════════════
//  core/citations/registry.ts — which directories are worth it
//
//  PORTABLE: data and types only.
//
//  Three things this file is deliberately explicit about, because
//  every one of them is routinely misrepresented when citations
//  are sold:
//
//   1. `linkValue` is stated per directory, and it is almost never
//      'dofollow'. Google Business Profile carries NO link at all.
//      A citation count must never be added to a link count.
//
//   2. `submission: 'manual'` means a person submits it. Scripted
//      submission to these sites breaks their terms and gets the
//      listing removed and the account banned — which costs the
//      client the citation they were paying for. The product
//      pre-fills and tracks; a human presses the button.
//
//   3. Tier C — the "500 free SEO directories" lists — is absent
//      by design. They carry no weight, and a profile built from
//      them is a liability. There is no toggle to switch them on.
//
//  URLs are business/claim entry points. Directories reorganise;
//  scripts/citations.ts prints them so a stale one is visible the
//  first time someone works the queue.
// ═══════════════════════════════════════════════════════════

export type CitationTier =
  /** Core. Every local business should be on all of these. */
  | 'core'
  /** Vertical. High value inside one industry, irrelevant outside it. */
  | 'vertical'
  /** Local. Chambers, associations, tourism boards — found per client. */
  | 'local';

export type LinkValue =
  /** No outbound link to the client's site at all. */
  | 'none'
  /** Links, but nofollow/ugc. The overwhelming majority. */
  | 'nofollow'
  /** Can pass signal, usually on paid or verified tiers only. */
  | 'dofollow';

export type SubmissionMethod =
  /** An official API exists for managing the listing. */
  | 'api'
  /** A person completes the form. The default, and not a failing. */
  | 'manual'
  /** Fed by a data aggregator rather than submitted directly. */
  | 'aggregator';

export interface DirectoryDefinition {
  /** Stable key. Persisted, so never rename one — add a new entry instead. */
  id: string;
  name: string;
  domain: string;
  tier: CitationTier;
  /** Industries this applies to. Empty means every industry. */
  industries: string[];
  /** ISO country codes, or empty for international. */
  countries: string[];
  linkValue: LinkValue;
  submission: SubmissionMethod;
  /** Where a person goes to create or claim the listing. */
  claimUrl: string;
  /** Why it is on the list, shown in the queue so the work makes sense. */
  rationale: string;
}

/**
 * Aggregators feed data downstream into many smaller directories at once.
 * Listed separately because submitting to one of these is not a citation —
 * it is a distribution mechanism whose results appear elsewhere later.
 */
export const DATA_AGGREGATORS: DirectoryDefinition[] = [
  {
    id: 'foursquare',
    name: 'Foursquare',
    domain: 'foursquare.com',
    tier: 'core',
    industries: [],
    countries: [],
    linkValue: 'nofollow',
    submission: 'manual',
    claimUrl: 'https://business.foursquare.com/',
    rationale: 'Feeds location data to Apple Maps, Uber and many apps downstream.',
  },
  {
    id: 'data-axle',
    name: 'Data Axle',
    domain: 'data-axle.com',
    tier: 'core',
    industries: [],
    countries: ['US'],
    linkValue: 'none',
    submission: 'aggregator',
    rationale: 'US aggregator feeding many smaller directories from one record.',
    claimUrl: 'https://www.data-axle.com/',
  },
];

export const DIRECTORIES: DirectoryDefinition[] = [
  // ── Core ────────────────────────────────────────────────────────────────
  {
    id: 'google-business-profile',
    name: 'Google Business Profile',
    domain: 'business.google.com',
    tier: 'core',
    industries: [],
    countries: [],
    //  No link to the website is passed. It is still the single most valuable
    //  listing a local business has, which is exactly why linkValue is not a
    //  measure of a citation's worth.
    linkValue: 'none',
    submission: 'api',
    claimUrl: 'https://business.google.com/',
    rationale: 'Decides local pack presence. Nothing else comes close.',
  },
  {
    id: 'bing-places',
    name: 'Bing Places',
    domain: 'bingplaces.com',
    tier: 'core',
    industries: [],
    countries: [],
    linkValue: 'nofollow',
    submission: 'manual',
    claimUrl: 'https://www.bingplaces.com/',
    rationale: 'Bing local results, and increasingly Copilot answers.',
  },
  {
    id: 'apple-business-connect',
    name: 'Apple Business Connect',
    domain: 'businessconnect.apple.com',
    tier: 'core',
    industries: [],
    countries: [],
    linkValue: 'none',
    submission: 'manual',
    claimUrl: 'https://businessconnect.apple.com/',
    rationale: 'Apple Maps and Siri. Ignored far more often than it should be.',
  },
  {
    id: 'yelp',
    name: 'Yelp',
    domain: 'yelp.com',
    tier: 'core',
    industries: [],
    countries: ['US', 'CA', 'GB'],
    linkValue: 'nofollow',
    submission: 'manual',
    claimUrl: 'https://biz.yelp.com/',
    rationale: 'Ranks for brand searches and feeds Apple Maps reviews.',
  },
  {
    id: 'bbb',
    name: 'Better Business Bureau',
    domain: 'bbb.org',
    tier: 'core',
    industries: [],
    countries: ['US', 'CA'],
    linkValue: 'nofollow',
    submission: 'manual',
    claimUrl: 'https://www.bbb.org/',
    rationale: 'Trust signal that ranks on brand searches. Accreditation is paid.',
  },
  {
    id: 'facebook-page',
    name: 'Facebook Page',
    domain: 'facebook.com',
    tier: 'core',
    industries: [],
    countries: [],
    linkValue: 'nofollow',
    submission: 'manual',
    claimUrl: 'https://www.facebook.com/pages/create',
    rationale: 'Consistently ranks on brand searches; a NAP source in its own right.',
  },
  {
    id: 'nextdoor',
    name: 'Nextdoor Business',
    domain: 'nextdoor.com',
    tier: 'core',
    industries: [],
    countries: ['US'],
    linkValue: 'nofollow',
    submission: 'manual',
    claimUrl: 'https://business.nextdoor.com/',
    rationale: 'Neighbourhood visibility for genuinely local service businesses.',
  },

  // ── Legal ───────────────────────────────────────────────────────────────
  {
    id: 'avvo',
    name: 'Avvo',
    domain: 'avvo.com',
    tier: 'vertical',
    industries: ['legal'],
    countries: ['US'],
    linkValue: 'nofollow',
    submission: 'manual',
    claimUrl: 'https://www.avvo.com/claim-your-profile',
    rationale: 'Ranks for attorney-name searches; profiles exist unclaimed by default.',
  },
  {
    id: 'justia',
    name: 'Justia Lawyer Directory',
    domain: 'justia.com',
    tier: 'vertical',
    industries: ['legal'],
    countries: ['US'],
    linkValue: 'dofollow',
    submission: 'manual',
    claimUrl: 'https://lawyers.justia.com/',
    rationale: 'One of the few legal directories that has passed a followable link.',
  },
  {
    id: 'findlaw',
    name: 'FindLaw',
    domain: 'findlaw.com',
    tier: 'vertical',
    industries: ['legal'],
    countries: ['US'],
    linkValue: 'nofollow',
    submission: 'manual',
    claimUrl: 'https://lawyers.findlaw.com/',
    rationale: 'Long-standing legal directory with strong brand-search presence.',
  },
  {
    id: 'martindale',
    name: 'Martindale-Hubbell',
    domain: 'martindale.com',
    tier: 'vertical',
    industries: ['legal'],
    countries: ['US'],
    linkValue: 'nofollow',
    submission: 'manual',
    claimUrl: 'https://www.martindale.com/',
    rationale: 'Peer-review ratings carry weight with referral traffic.',
  },

  // ── Medical ─────────────────────────────────────────────────────────────
  {
    id: 'healthgrades',
    name: 'Healthgrades',
    domain: 'healthgrades.com',
    tier: 'vertical',
    industries: ['medical', 'dental'],
    countries: ['US'],
    linkValue: 'nofollow',
    submission: 'manual',
    claimUrl: 'https://update.healthgrades.com/',
    rationale: 'Dominates provider-name searches in US healthcare.',
  },
  {
    id: 'zocdoc',
    name: 'Zocdoc',
    domain: 'zocdoc.com',
    tier: 'vertical',
    industries: ['medical', 'dental'],
    countries: ['US'],
    linkValue: 'nofollow',
    submission: 'manual',
    claimUrl: 'https://www.zocdoc.com/join',
    rationale: 'Booking intent, not just citation value. Paid.',
  },

  // ── B2B and agencies ────────────────────────────────────────────────────
  {
    id: 'clutch',
    name: 'Clutch',
    domain: 'clutch.co',
    tier: 'vertical',
    industries: ['b2b', 'agency', 'software'],
    countries: [],
    linkValue: 'nofollow',
    submission: 'manual',
    claimUrl: 'https://clutch.co/get-listed',
    rationale: 'Verified-review directory buyers actually shortlist from.',
  },
  {
    id: 'g2',
    name: 'G2',
    domain: 'g2.com',
    tier: 'vertical',
    industries: ['software', 'b2b'],
    countries: [],
    linkValue: 'nofollow',
    submission: 'manual',
    claimUrl: 'https://www.g2.com/products/new',
    rationale: 'Ranks for "<category> software" comparisons.',
  },

  // ── Home services ───────────────────────────────────────────────────────
  {
    id: 'angi',
    name: 'Angi',
    domain: 'angi.com',
    tier: 'vertical',
    industries: ['home-services'],
    countries: ['US'],
    linkValue: 'nofollow',
    submission: 'manual',
    claimUrl: 'https://www.angi.com/companylist/',
    rationale: 'High commercial intent in home services. Lead fees apply.',
  },
  {
    id: 'houzz',
    name: 'Houzz',
    domain: 'houzz.com',
    tier: 'vertical',
    industries: ['home-services', 'construction'],
    countries: [],
    linkValue: 'nofollow',
    submission: 'manual',
    claimUrl: 'https://www.houzz.com/professionals',
    rationale: 'Portfolio-led discovery for design and build trades.',
  },

  // ── Retail and ecommerce ────────────────────────────────────────────────
  {
    id: 'trustpilot',
    name: 'Trustpilot',
    domain: 'trustpilot.com',
    tier: 'vertical',
    industries: ['ecommerce', 'retail', 'b2b'],
    countries: [],
    linkValue: 'nofollow',
    submission: 'manual',
    claimUrl: 'https://business.trustpilot.com/',
    rationale: 'Ranks on brand searches and feeds review snippets.',
  },
];

/** Directories that apply to a given industry and country. */
export function directoriesFor(options: {
  industry?: string | null;
  country?: string | null;
  includeAggregators?: boolean;
}): DirectoryDefinition[] {
  const { industry, country, includeAggregators = false } = options;
  const pool = includeAggregators ? [...DIRECTORIES, ...DATA_AGGREGATORS] : DIRECTORIES;

  return pool.filter((directory) => {
    //  An empty list means "applies to everything", so it is a match rather
    //  than a miss — the common case for core directories.
    const industryOk =
      directory.industries.length === 0 || (industry ? directory.industries.includes(industry) : false);
    const countryOk =
      directory.countries.length === 0 ||
      (country ? directory.countries.includes(country.toUpperCase()) : true);

    return industryOk && countryOk;
  });
}

export function directoryById(id: string): DirectoryDefinition | undefined {
  return [...DIRECTORIES, ...DATA_AGGREGATORS].find((directory) => directory.id === id);
}

/** Industries with at least one vertical directory defined. */
export function knownIndustries(): string[] {
  const industries = new Set<string>();
  for (const directory of DIRECTORIES) {
    for (const industry of directory.industries) industries.add(industry);
  }
  return [...industries].sort();
}

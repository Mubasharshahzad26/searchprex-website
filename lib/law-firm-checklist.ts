// lib/law-firm-checklist.ts
// The 40-point law firm SEO audit, as data.
//
// This is the ungated companion to /law-firm-scorecard. The scorecard runs the
// same five pillars against a firm automatically; this is the same audit written
// out so a firm can run it themselves. The pillar ids match PILLAR_META in
// app/law-firm-scorecard/ScorecardClient.tsx — keep them in sync, or the two
// assets start describing different audits.
//
// Rules for anything added here:
//   1. Every check must be verifiable by the reader without buying anything.
//   2. No invented statistics, no "studies show", no client numbers. The
//      credibility of this asset is that every line is something the reader can
//      go and check in the next ten minutes.
//   3. Where a practice is emerging rather than established, say so in `how`.
//      Overstating llms.txt, or schema-for-stars, is how these documents lose.

export type Check = {
  id: string;
  /** The check itself, phrased as something that is either true or not. */
  title: string;
  /** How to verify it, and why it matters. */
  how: string;
  /** Fix these first — they gate the rest of the pillar. */
  critical?: boolean;
};

export type ChecklistPillar = {
  id: string;
  name: string;
  /** Matches the lucide icon name resolved in the client component. */
  icon: string;
  blurb: string;
  checks: Check[];
};

export const CHECKLIST_PILLARS: ChecklistPillar[] = [
  {
    id: "map-pack",
    name: "Map Pack Power",
    icon: "MapPin",
    blurb:
      "The local three results above the organic listings. For most practice areas this is where the high-intent calls come from, and it is scored almost entirely outside your website.",
    checks: [
      {
        id: "mp-1",
        title: "A claimed, verified Google Business Profile for every staffed office",
        critical: true,
        how:
          "Search the firm name and city. If Google offers “Own this business?”, it is unclaimed. Virtual offices, mail drops and co-working addresses breach Google’s guidelines and are the most common reason a law firm profile gets suspended — an address only counts if someone from the firm is reachable there during the hours you publish.",
      },
      {
        id: "mp-2",
        title: "Primary category is the practice area, not “Law firm”",
        critical: true,
        how:
          "Set the primary category to the specific one — “Personal injury attorney”, “Criminal justice attorney”, “Divorce lawyer” — and add the rest as secondary. The primary category does more for Map Pack ranking than any other field on the profile, and “Law firm” competes you against every practice in the city instead of the handful in yours.",
      },
      {
        id: "mp-3",
        title: "Name, address and phone are character-identical everywhere",
        how:
          "Compare the site footer, the Google profile and each directory listing side by side. “Suite 200” and “Ste. 200” are different strings to some data aggregators, and a call-tracking number that appears on the profile and nowhere else breaks the match entirely.",
      },
      {
        id: "mp-4",
        title: "The profile’s website link points at that office’s page, not the homepage",
        how:
          "Each office gets its own page, with its own embedded map, its own NAP, and the attorneys who actually sit there. Pointing every profile at the homepage throws away the most direct relevance signal you control.",
      },
      {
        id: "mp-5",
        title: "Reviews arrive steadily rather than in bursts",
        how:
          "Count your reviews from the last 90 days and compare against the three firms currently holding the Map Pack for your money term. Forty reviews that all landed in one week reads as a campaign; four a month for a year reads as a working practice.",
      },
      {
        id: "mp-6",
        title: "Every review answered — including the ones that hurt",
        how:
          "Responses are public evidence of how the firm behaves. Read your state bar’s guidance first: in most jurisdictions, confirming that a reviewer was a client can itself breach confidentiality, so the safe reply acknowledges the concern without conceding the relationship.",
      },
      {
        id: "mp-7",
        title: "Review text names the practice area and city without being scripted",
        how:
          "Ask “what did we help you with?” rather than “please mention car accidents”. The language takes care of itself and you stay clear of the rules — most jurisdictions prohibit paying or trading for testimonials, and several restrict what a testimonial may claim.",
      },
      {
        id: "mp-8",
        title: "Services filled in per practice area, and posts published at least monthly",
        how:
          "The Services section is free text that Google reads and almost no firm completes. Posts decay quickly, so this is maintenance rather than a project — put it on someone’s calendar or it stops in month two.",
      },
    ],
  },
  {
    id: "organic",
    name: "Organic Rankings",
    icon: "Search",
    blurb:
      "The blue links. Slower to move than the Map Pack, and harder for a competitor to take back once you hold them.",
    checks: [
      {
        id: "or-1",
        title: "One page per practice area, per city",
        critical: true,
        how:
          "Not a single “Practice Areas” page listing twelve services. The firm ranking for “car accident lawyer Phoenix” has a page about being a car accident lawyer in Phoenix. Count your money terms, then count your pages — if the second number is smaller, that is the whole finding.",
      },
      {
        id: "or-2",
        title: "Practice area and city inside the first 60 characters of the title tag",
        how:
          "Google truncates around there, and the front of the tag carries the most weight. “Home | Firm Name | Attorneys at Law” spends the entire budget on nothing.",
      },
      {
        id: "or-3",
        title: "No two pages chasing the same query",
        how:
          "Run a site: search for your main term and count how many of your own pages come back. Three pages competing for one query split your authority between them and none of the three wins — consolidate into the strongest and redirect the rest.",
      },
      {
        id: "or-4",
        title: "Internal links point down to the practice-area pages with real anchor text",
        how:
          "Links from pages that already have authority — homepage, attorney bios, anything that earned coverage — carry that authority onward. “Learn more” tells Google nothing; “Phoenix car accident lawyer” tells it what the destination is about.",
      },
      {
        id: "or-5",
        title: "Core Web Vitals pass on mobile for the practice-area template",
        how:
          "Check the Core Web Vitals report in Search Console, which is real-visitor field data, rather than a one-off Lighthouse run. A homepage that passes while the template every money page uses fails is the normal finding.",
      },
      {
        id: "or-6",
        title: "The money pages are actually indexed",
        how:
          "Search Console → Pages. “Crawled — currently not indexed” sitting on a practice-area page is Google saying the page is not worth storing. That is a content judgment, not a technical fault, and no amount of sitemap resubmission fixes it.",
      },
      {
        id: "or-7",
        title: "Self-referencing canonicals, and nothing canonicalising to the homepage",
        how:
          "View source on a practice-area page and read the canonical tag. Pointing it at the homepage tells Google the page is a duplicate that should be dropped — a common template default that quietly removes every service page from the index.",
      },
      {
        id: "or-8",
        title: "A written list of the pages your top three competitors have and you don’t",
        how:
          "Open the three firms ranking above you for your money term and walk their navigation. This takes an afternoon, needs no tooling, and usually produces a more honest content plan than a keyword export does.",
      },
    ],
  },
  {
    id: "ai-visibility",
    name: "AI Visibility (AEO)",
    icon: "Bot",
    blurb:
      "Whether ChatGPT, Gemini, Perplexity and Google’s AI answers name your firm when someone asks who to call. The newest pillar, and the one where the field is still open.",
    checks: [
      {
        id: "ai-1",
        title: "You have actually asked the engines",
        critical: true,
        how:
          "Put “best {practice area} lawyer in {city}” into ChatGPT, Gemini, Perplexity and Google’s AI Mode. Write down whether the firm is named, which firms are, and — most importantly — which sources each answer cites. That citation list is your target list; everything else in this pillar is downstream of it.",
      },
      {
        id: "ai-2",
        title: "The firm is one entity, spelled one way",
        how:
          "Models resolve an entity by consensus across sources. “Sterling & Hayes”, “Sterling and Hayes LLP” and “S&H Injury Law” scattered across directories fragment that consensus into three weak entities instead of one strong one.",
      },
      {
        id: "ai-3",
        title: "You appear on the sources those answers cite",
        how:
          "For legal queries that is usually the legal directories, the state bar listing, local news and the firm’s own site. Check which of them name you and treat the gaps as the work — this pillar is won off-site more than on it.",
      },
      {
        id: "ai-4",
        title: "Pages answer the question before they make the pitch",
        how:
          "A page that opens with a direct, quotable, two-sentence answer gets extracted. A page that opens with “For over thirty years, our firm has fought for the injured” gets skipped, because there is nothing in that sentence to quote.",
      },
      {
        id: "ai-5",
        title: "The facts are in text, not trapped in images",
        how:
          "Fee structures, deadlines and process steps set inside an infographic are invisible to most extraction. If a fact matters, it needs to exist as a sentence somewhere on the page.",
      },
      {
        id: "ai-6",
        title: "FAQs written in the client’s words, not the profession’s",
        how:
          "People type “how long do I have to sue after a car accident”. They do not type “statute of limitations for personal injury actions”. Answer in their language and put the professional term in the body, not the heading.",
      },
      {
        id: "ai-7",
        title: "Visible published and updated dates that tell the truth",
        how:
          "Date the page, and only move the updated date when you actually changed something. Rolling dates forward on untouched content is an easy pattern to detect and worth nothing.",
      },
      {
        id: "ai-8",
        title: "You know which AI crawlers your robots.txt blocks",
        how:
          "Open /robots.txt and look for GPTBot, PerplexityBot, ClaudeBot and Google-Extended. Blocking them is a legitimate choice — just make it deliberately rather than by inheriting somebody’s template. Note that llms.txt, usually recommended alongside this, is an emerging convention no major engine has committed to honouring: cheap to add, but do not expect it to move anything on its own.",
      },
    ],
  },
  {
    id: "eeat-schema",
    name: "Legal E-E-A-T & Schema",
    icon: "Scale",
    blurb:
      "Legal sites are held to Google’s your-money-or-your-life standard, which means who stands behind the advice counts as much as the advice. This is also where SEO and bar compliance overlap.",
    checks: [
      {
        id: "ee-1",
        title: "Every attorney has a real bio page",
        critical: true,
        how:
          "Name, photograph, bar admissions with numbers, jurisdictions, law school, year admitted, and what they actually handle. A grid of headshots linking nowhere is the most common credibility gap on law firm sites.",
      },
      {
        id: "ee-2",
        title: "Bar admissions link out to the bar’s own verification page",
        how:
          "Most state bars publish a public member record at a stable URL. Linking to it turns an unverifiable claim into a checkable one, and almost no firm does it.",
      },
      {
        id: "ee-3",
        title: "The site names the attorney responsible for its content",
        how:
          "Many state bars require this on advertising material, and it doubles as the clearest authorship signal available. Check your own jurisdiction’s advertising rules — the requirement and its wording vary considerably.",
      },
      {
        id: "ee-4",
        title: "Attorney or LegalService schema on firm pages, Person schema on each bio",
        how:
          "Connect them with sameAs pointing at the bar profile, LinkedIn and the main directory listings. The value is entity resolution — helping the engines agree these profiles are the same person — not rich results.",
      },
      {
        id: "ee-5",
        title: "Articles are bylined to an attorney, and the byline links to their bio",
        how:
          "Where the writer was not the lawyer, say who reviewed it and when. An unsigned page giving legal guidance is the exact shape of content the quality guidelines were written about.",
      },
      {
        id: "ee-6",
        title: "The disclaimers your jurisdiction requires are present",
        how:
          "Not legal advice, no attorney-client relationship formed, and prior-results language wherever outcomes appear. This is a compliance question before it is an SEO one, and the rules differ enough between states that a template lifted from another firm’s site is not a safe default.",
      },
      {
        id: "ee-7",
        title: "Review markup added for entity clarity, not for stars",
        how:
          "AggregateRating on your own site, describing your own business, is self-serving review content and will not produce star ratings in Google’s results. It still helps the entity resolve. Add it with the right expectation, or a vendor will sell it to you with the wrong one.",
      },
      {
        id: "ee-8",
        title: "Nothing on the site is invented",
        critical: true,
        how:
          "No settlement figures you cannot document from the file, no “as seen on” logos without the segment, no awards that were simply bought. One fabricated number found by a prospective client discredits every true one beside it — and in most jurisdictions it is also a bar violation.",
      },
    ],
  },
  {
    id: "content",
    name: "Practice-Area Content",
    icon: "FileText",
    blurb:
      "The pages that do the convincing. Ranking earns the visit; this pillar decides whether the phone rings.",
    checks: [
      {
        id: "co-1",
        title: "The first screen answers the question the visitor arrived with",
        how:
          "Someone searching “do I have a case” wants that addressed above the fold, not after four paragraphs of firm history. Load your own page on a phone and read only what fits without scrolling.",
      },
      {
        id: "co-2",
        title: "Case results, where the bar permits, with the disclaimer it requires",
        how:
          "Only results you can document from the file. Some jurisdictions restrict how outcomes may be presented, or require specific accompanying language — check before publishing, not after a grievance.",
      },
      {
        id: "co-3",
        title: "The process is explained — what actually happens after they call",
        how:
          "First call, consultation, investigation, filing, expected timeline. This is consistently among the most-read content on a law firm’s site, and most firms never write it because it is obvious to them and opaque to everyone else.",
      },
      {
        id: "co-4",
        title: "Fees explained as far as your ethics rules allow",
        how:
          "Contingency terms, whether the consultation costs anything, who carries costs if the case is lost. “Free consultation” answers one question out of four.",
      },
      {
        id: "co-5",
        title: "Depth set by the question, not by a word count",
        how:
          "A page about filing deadlines can be short and complete. A page about a complex practice area cannot. Writing to a 2,000-word target produces padding, and padding is visible.",
      },
      {
        id: "co-6",
        title: "City pages that differ by more than the city name",
        how:
          "The same template with the place name swapped is a doorway page and gets treated as one. Local courts, filing quirks, venues, the attorneys who cover that office — if you cannot write those, the page probably should not exist.",
      },
      {
        id: "co-7",
        title: "FAQs that answer the objection, not just the keyword",
        how:
          "“Will this cost me anything up front?” and “will I have to go to court?” are what stop people calling. Those are the questions worth a heading.",
      },
      {
        id: "co-8",
        title: "One named next step per page — the same one everywhere",
        critical: true,
        how:
          "Call, chat, book, email and download competing on a single screen is not five chances to convert; it is a decision the visitor resolves by leaving. Pick the one action you want and let everything else be secondary.",
      },
    ],
  },
];

export const TOTAL_CHECKS = CHECKLIST_PILLARS.reduce((n, p) => n + p.checks.length, 0);

export const CRITICAL_CHECKS = CHECKLIST_PILLARS.reduce(
  (n, p) => n + p.checks.filter((c) => c.critical).length,
  0,
);

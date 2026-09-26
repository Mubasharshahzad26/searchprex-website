// lib/industry-pages.ts
//
// Law firm practice-area pages — /services/law-firm-seo/[industry].
//
// Rebuilt 2026-09-26. The previous version is where most of this copy started,
// and the strongest sections are kept nearly word for word. What was removed:
//
//   - A "review funnel" that "filters positive outcomes" to the Business
//     Profile. Asking only happy clients for reviews is review gating, which
//     Google's review policies prohibit.
//   - "Case Result schema" that would make settlements "appear as rich
//     snippets". No such rich result exists.
//   - "Over 80% of criminal defense searches happen on mobile" — no source.
//   - "Dominate", "you don't exist", "the most trusted voice in your county",
//     "rank aggressively". Law firm pages answer to ABA Model Rule 7.1
//     (no false or misleading communication), and nobody can promise a
//     ranking.
//   - A "30 days free AI Intake SaaS" bonus with no terms behind it. The pages
//     link to the live intake demo on /services/law-firm-seo instead.
//   - Keyword chips and a Google Maps embed with no API key.
//
// There is no published law firm case study, and every page says so: the
// `approach` block is the plan, not a result.
//
// Only `slug` and `name` are read outside the practice-area pages
// (lib/locations.ts, the location pages, /industries).

import type { QA } from "@/lib/local-industries";

export interface IndustryPage {
  name: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  accent: string;
  heroSub: string;
  /** What the work looks like, in place of a case study that does not exist yet. */
  approach: { title: string; body: string };
  sections: Array<{ heading: string; body: string }>;
  capsules: QA[];
  faqs: QA[];
  /** City page slugs (lib/city-pages.ts) with demand for this practice area. */
  locationsMentioned: string[];
}

const NO_GUARANTEE: QA = {
  q: "Can you guarantee my firm ranks first?",
  a: "No, and nobody honestly can — Google decides rankings, and bar advertising rules (ABA Model Rule 7.1) bar misleading claims about services. What I can commit to is the work: the pages, the profile, the fixes, and a plain weekly report on what moved.",
};

const ONE_FIRM: QA = {
  q: "Do you work with competing firms in my city?",
  a: "No. I take one law firm per city, so I am never ranking you against another client.",
};

const NO_CONTRACT: QA = {
  q: "Is there a contract?",
  a: "No. Month to month, with the free tear-down first so you can see what the work would focus on before paying anything.",
};

export const INDUSTRY_PAGES: IndustryPage[] = [
  {
    name: "Personal Injury",
    slug: "personal-injury",
    metaTitle: "Personal Injury Law Firm SEO | Injury-Type Pages & Map Pack",
    metaDescription:
      "SEO for personal injury law firms: pages by injury type, Business Profile work, a mobile path built for 2am, and results published within bar advertising rules. No ranking promises.",
    h1: "Personal Injury Law Firm SEO",
    accent: "for the cases decided at 2am",
    heroSub:
      "Injured people search from a phone, often at night, and by injury type rather than “personal injury lawyer”. I build PI firms the pages, the profile and the mobile path that answer those searches — and I'll say plainly that there is no published law firm case study yet.",
    approach: {
      title: "What a personal injury campaign actually looks like",
      body: "No published personal injury case study yet, so here is the plan rather than a story. Clusters of pages by injury type instead of one head term, Business Profile work tied to the roads and hospitals in your jurisdiction, and results published with the facts that produced them. Our verified results so far are in ecommerce and local services, documented with Search Console data. You can be the first law firm we publish.",
    },
    sections: [
      {
        heading: "Why “Personal Injury Lawyer” Isn't Your Only Keyword",
        body: "The head term is the most contested search in the market. Clusters built around specific injury types — traumatic brain injury, commercial trucking, rideshare accidents — reach people closer to hiring, against far less competition.",
      },
      {
        heading: "The Business Profile and the Map Pack",
        body: "Proximity matters to injured clients. The profile's categories, the practice areas it lists, current photos and genuine reviews are what put a firm in the three-pack for searches near its office. Distance is fixed; the rest is work.",
      },
      {
        heading: "The Case You Lose at 2am",
        body: "Injury searches spike at night and from the roadside, on a phone with one bar of signal. A contact form is the wrong instrument for that moment. We put a tap-to-call above the fold, keep the mobile LCP under two and a half seconds, and make sure the number is a real one that a person answers. It is unglamorous work, and it decides more cases than any keyword.",
      },
      {
        heading: "Publishing Results Without Breaching Advertising Rules",
        body: "Settlement figures convert, and most state bars regulate how you present them. A number with no case facts, no disclaimer and no note that outcomes vary is an advertising problem in several jurisdictions. We publish results with the facts that produced them, which is both compliant and more persuasive than a bare figure — a reader wants to know whether their case looks like yours.",
      },
      {
        heading: "Pages About Your Roads and Hospitals",
        body: "Injured people and their families search for the crash they were in and the hospital they were taken to. Pages on the specific highways, intersections and trauma centres in your jurisdiction answer that directly, and tell Google exactly where your firm practises.",
      },
      {
        heading: "The Referral Keyword Nobody Targets",
        body: "Attorneys search too. Terms like referring a trucking case out of state, or co-counsel for a catastrophic injury claim, carry almost no volume and enormous value, because the searcher is another lawyer with a case they cannot take. Almost nobody writes for them. A single page explaining your referral terms and the cases you accept can be worth more than a thousand consumer visits.",
      },
    ],
    capsules: [
      {
        q: "How do personal injury law firms get clients from Google?",
        a: "Through pages for each injury type rather than one practice page, a Business Profile that puts the firm in the map pack near its office, genuine reviews, and a mobile page that makes calling easy at 2am. Injury searches are specific and urgent; the firm that answers the specific question, fast, gets the call.",
      },
      {
        q: "Does SearchPrex have a personal injury case study?",
        a: "Not yet. No law firm client has been published. SearchPrex's verified results are in ecommerce and local services, documented with Search Console screenshots, and the same technical, local and content work is what a PI campaign is built on.",
      },
      NO_GUARANTEE,
    ],
    faqs: [
      {
        q: "Can we publish settlement amounts on our website?",
        a: "Many state bars regulate it. The safe pattern is to publish results with the case facts, a clear note that outcomes vary, and whatever disclaimer your state requires. Check the rules for your jurisdiction — I build the page, your firm owns the compliance call.",
      },
      ONE_FIRM,
      {
        q: "Do you handle intake?",
        a: "The SEO work covers the mobile path to your phone. SearchPrex also has an AI intake assistant you can try live on the law firm SEO page.",
      },
      NO_CONTRACT,
    ],
    locationsMentioned: ["detroit", "baton-rouge", "philadelphia"],
  },
  {
    name: "Family Law",
    slug: "family-law",
    metaTitle: "Family Law SEO | Divorce & Custody Attorney SEO",
    metaDescription:
      "SEO for family law firms: county-level custody and divorce content, answers built for AI Overviews, and privacy-aware marketing. No ranking promises and no borrowed case studies.",
    h1: "Family Law SEO",
    accent: "for divorce and custody searches",
    heroSub:
      "Divorce and custody clients research for weeks before they call, often privately. I build family law firms the county-level answers those people are searching for — and I'll tell you up front that there is no published law firm case study yet.",
    approach: {
      title: "Where family law rankings actually come from",
      body: "No published family law case study yet, so here is the approach. Answers to the custody and asset-division questions people actually type, county-level content rather than state-level, and a review process that respects how sensitive this work is. Ads win the top of the page; the questions underneath them are still open.",
    },
    sections: [
      {
        heading: "The Search Starts Months Before the Call",
        body: "Nobody types divorce lawyer near me on day one. They spend weeks searching what happens to the house, whether they have to move out, and what custody actually means in practice. Firms write only for the final query and miss the entire research phase, which is where trust is built. Content for the pre-decision months is why a stranger calls you rather than the firm with the bigger ad budget.",
      },
      {
        heading: "Custody Rules Are Lived at County Level",
        body: "State statutes set the framework, but parenting-time norms, mediation requirements and how a particular bench actually rules are county-level realities. Generic state content answers none of what a parent is really asking. Naming the county, the court and the local process is what separates a page that ranks from one that reads like every other firm in the state.",
      },
      {
        heading: "Pages for the Courts You Practise In",
        body: "People look for a lawyer who knows their courthouse. A page for each county family court you appear in — the process, mediation requirements, what a first hearing looks like — answers that directly.",
      },
      {
        heading: "Answering the Questions People Type at Night",
        body: "Family law clients turn to Google and AI assistants with deeply personal questions, late at night. FAQ pages written as clear, direct answers give AI Overviews something citable for questions like “Can I move out of state with my child?”.",
      },
      {
        heading: "Complex Asset Questions",
        body: "Business valuations, retirement account division and hidden assets are specific, lower-volume searches from people with complex cases. A clear page on each reaches them directly.",
      },
      {
        heading: "People Research This on a Shared Device",
        body: "Family law searches happen incognito, at work, on a phone someone else can pick up. That has practical consequences: aggressive retargeting can put a divorce ad in front of the wrong person in the same house, and it damages trust more than it earns clicks. We keep remarketing off sensitive practice areas and make page titles readable in a browser history without exposing anything.",
      },
    ],
    capsules: [
      {
        q: "How do family law firms rank on Google?",
        a: "By answering the questions people search in the weeks before they call — custody, the house, asset division — at county level, where the real answers differ. Add a Business Profile with genuine reviews and pages for the courts the firm appears in, and the firm is visible through the whole research phase, not only at the final search.",
      },
      {
        q: "How can a family law firm appear in AI Overviews?",
        a: "Nobody controls what Google's AI cites, but clear, direct answers to specific questions — written by or reviewed by the attorney, on a page about that one question — are what these answers tend to draw from.",
      },
      {
        q: "Does SearchPrex have a family law case study?",
        a: "Not yet. No law firm client has been published; SearchPrex's verified results are in ecommerce and local services.",
      },
    ],
    faqs: [
      NO_GUARANTEE,
      {
        q: "Will you run retargeting ads for my family law firm?",
        a: "Not on sensitive practice areas. Following someone around the web with divorce ads can expose them to others in their home, and it costs more trust than it earns.",
      },
      ONE_FIRM,
      NO_CONTRACT,
    ],
    locationsMentioned: ["grand-rapids", "sugar-land", "plano"],
  },
  {
    name: "Criminal Defense",
    slug: "criminal-defense",
    metaTitle: "Criminal Defense SEO | Charge-Specific Pages & Urgent Search",
    metaDescription:
      "SEO for criminal defense attorneys: charge-specific pages, content for the family member searching, expungement, and mobile pages fast enough for 2am. No ranking promises.",
    h1: "Criminal Defense SEO",
    accent: "for the one phone call",
    heroSub:
      "Criminal defense searches are urgent, mobile, and often made by a parent or partner rather than the accused. I build charge-specific pages and fast mobile paths that answer them — and there is no published law firm case study yet, which I'll say plainly.",
    approach: {
      title: "Charge-level pages, not one practice page",
      body: "No published criminal defense case study yet. The approach is charge-specific pages — underage possession, a first DWI, a probation violation — rather than one page trying to rank for everything, plus intake that answers at 2am. In a university market the person searching is often a parent, not the defendant, and that changes the query and the tone entirely.",
    },
    sections: [
      {
        heading: "A Page for Every Charge You Defend",
        body: "A generic “criminal lawyer” page answers nobody's actual question. A page for each charge — from a first DWI to federal wire fraud — matches what the person searched and explains what happens next for that charge.",
      },
      {
        heading: "The Person Searching Is Often Not the Defendant",
        body: "Many criminal defense searches come from a parent, a spouse or a partner — frequently at night, frequently from another city, and frequently before the accused has spoken to anyone. That reader needs different information: what happens in the next twelve hours, whether they can visit, what bail will cost. Content written for the defendant misses them entirely.",
      },
      {
        heading: "Booking, Jail and Bail Questions",
        body: "Families search the local booking process, visiting rules and how bail works in that county. Clear pages on each answer the most urgent questions of the first night — and bring the family to a firm that can help.",
      },
      {
        heading: "Expungement Is the Long Tail Everyone Skips",
        body: "Record-clearing searches are steady, far less contested than active-charge terms, and convert into real fee work. They also reach someone who already has a conviction and therefore already knows they need a lawyer. Most firms treat expungement as an afterthought page. Treated properly, it is a reliable stream that does not compete with the firms bidding on arrest terms.",
      },
      {
        heading: "Speed Beats Polish at 2am",
        body: "A heavy hero video and a cookie banner are the difference between a call and a back button when someone is standing outside a police station. We strip the mobile critical path to what is needed to make a decision: the charge, the process, the number. Every additional second of load on that page has a cost you can see in call volume.",
      },
      {
        heading: "Reviews, Asked For Properly",
        body: "Criminal defense clients rarely volunteer reviews. A steady process that asks every client — never only the happy ones, which Google's review policies prohibit — builds a profile that holds up.",
      },
    ],
    capsules: [
      {
        q: "How do criminal defense attorneys get clients from Google?",
        a: "With a page for each charge they defend, a Business Profile that appears for urgent searches near the office, a mobile page that loads fast and puts the phone number first, and content for the family members who are often the ones searching.",
      },
      {
        q: "Why do criminal defense firms need charge-specific pages?",
        a: "Because people search the charge, not the practice area — a first DWI, a probation violation, underage possession. A page about that charge answers what happens next; a general criminal defense page does not.",
      },
      {
        q: "Does SearchPrex have a criminal defense case study?",
        a: "Not yet. No law firm client has been published; SearchPrex's verified results are in ecommerce and local services.",
      },
    ],
    faqs: [
      NO_GUARANTEE,
      {
        q: "Who checks the legal accuracy of the pages?",
        a: "You do. I write and structure every page; nothing about the law goes live until an attorney at your firm has approved it.",
      },
      ONE_FIRM,
      NO_CONTRACT,
    ],
    locationsMentioned: ["denton", "tempe", "albuquerque"],
  },
  {
    name: "Estate Planning",
    slug: "estate-planning",
    metaTitle: "Estate Planning SEO | Wills, Trusts & Probate Attorney SEO",
    metaDescription:
      "SEO for estate planning and probate firms: county-level probate content, pages for business owners, and plain answers that compete with DIY templates. No ranking promises.",
    h1: "Estate Planning SEO",
    accent: "for wills, trusts and probate",
    heroSub:
      "People research estate planning for months, and many consider a DIY template first. I build estate planning firms the county-level, plain-English answers that earn the call — with no published law firm case study yet, stated up front.",
    approach: {
      title: "The questions that come before hiring",
      body: "No published estate planning case study yet. The approach is content built around what people search before they are ready to hire — revocable versus irrevocable, probate timelines in their county, what happens to a business interest — with structured data that makes those answers easy for search and AI results to read.",
    },
    sections: [
      {
        heading: "Experience and Trust on a YMYL Topic",
        body: "Google's quality rater guidelines treat legal topics as “Your Money or Your Life”, judged on experience, expertise, authoritativeness and trust. Attorney bios with real credentials, a named author on every guide and citations to the statutes discussed are how an estate planning site meets that bar.",
      },
      {
        heading: "Probate Timelines Are a County Question",
        body: "How long probate takes is one of the most common estate questions, and the honest answer depends on the county — its filing backlog, its local rules, whether it requires a hearing that the county next door handles on paper. State-level content cannot answer it. A page that gives the realistic timeline for your county answers a question no national site can, and it is the kind of specific answer that gets quoted in AI results.",
      },
      {
        heading: "The Adult Children Searching for Their Parents",
        body: "Often it is the adult children who search for elder law or probate help on behalf of their parents. Content that speaks to their questions — what to do first, what power of attorney allows — reaches the person actually making the call.",
      },
      {
        heading: "The Business Owner Nobody Writes For",
        body: "An owner searching what happens to my business when I die is worth a multiple of a general will enquiry, and almost nothing is written for them. Succession, buy-sell agreements, valuation on death and how a company interest passes are complex, high-value and under-served. This is the clearest content gap in most estate planning markets.",
      },
      {
        heading: "Your Real Competitor Is a Free Template",
        body: "Most people considering a will first consider doing it themselves online. Pretending that option does not exist loses the argument by default. Content that explains plainly when a template genuinely is enough, and the specific situations where it fails — blended families, property in another state, a business interest, a beneficiary with a disability — earns more trust than any claim of expertise, and reaches the searcher at the exact moment they are deciding.",
      },
      {
        heading: "Video That Lets Clients Meet You First",
        body: "Short videos explaining trusts and probate, on YouTube and embedded on the matching page, let a client see and hear the attorney before calling. Google shows video results for many how-to searches.",
      },
    ],
    capsules: [
      {
        q: "How do estate planning firms get clients from Google?",
        a: "By answering the questions people research for months before hiring — trusts versus wills, probate in their county, what happens to a business — in plain language, with a named attorney behind every answer. Add a Business Profile with genuine reviews, and the firm is there through the whole decision.",
      },
      {
        q: "What content works best for an estate planning firm?",
        a: "County-level probate answers, honest comparisons with DIY templates, and pages for business owners and for adult children searching on a parent's behalf — the questions national sites cannot answer and most local firms never write.",
      },
      {
        q: "Does SearchPrex have an estate planning case study?",
        a: "Not yet. No law firm client has been published; SearchPrex's verified results are in ecommerce and local services.",
      },
    ],
    faqs: [NO_GUARANTEE, ONE_FIRM, NO_CONTRACT],
    locationsMentioned: ["sugar-land", "grand-rapids"],
  },
  {
    name: "Mass Torts",
    slug: "mass-torts",
    metaTitle: "Mass Tort SEO | Docket-Ready Content & Symptom Search",
    metaDescription:
      "SEO for mass tort firms: content ready when a docket opens, symptom-to-claim search paths, co-counsel pages and compliance-first copy. No ranking promises.",
    h1: "Mass Tort SEO",
    accent: "for the first weeks of a docket",
    heroSub:
      "Mass tort search is largely settled in the first weeks after a docket opens, and claimants search symptoms long before they search lawsuits. I build the templates, the review process and the pages to publish fast — and there is no published law firm case study yet.",
    approach: {
      title: "Moving fast when a docket opens",
      body: "No published mass tort case study yet. The approach is speed: content ready while a docket is still new, clear answers AI results can cite about the device or drug, and intake built to filter volume rather than drown in it. Mass tort SEO is won in the first weeks or not at all.",
    },
    sections: [
      {
        heading: "The First Two Weeks Decide the Docket",
        body: "When a docket opens, the ranking order is largely settled before most firms have finished approving a content brief. Being publishable within days, not weeks, is the entire competitive advantage in mass torts. That means the templates, the medical review process and the schema are built before the news breaks, not after.",
      },
      {
        heading: "Watching the Public Signals",
        body: "FDA recalls and Judicial Panel on Multidistrict Litigation orders are public. Monitoring them means drafting can start as soon as a docket looks likely, rather than after it is in the news.",
      },
      {
        heading: "People Search Symptoms Before They Search Lawsuits",
        body: "Nobody types their device name plus lawsuit first. They type the symptom, then the device or drug name, then whether it has been recalled, and only then whether anyone is suing. Firms that only target the final query arrive after the claimant has already read someone else's explanation. Mapping the full path from symptom to claim is how you reach them while they are still deciding whether something went wrong.",
      },
      {
        heading: "Other Firms Are Searching Too",
        body: "Much of mass tort volume moves between firms rather than direct from claimants. A page that sets out your co-counsel terms, the case types you accept and the jurisdictions you are admitted in reaches a very small audience with very high value. It also builds the topical signals that help the consumer-facing pages, because a firm other lawyers cite is a firm search engines can place.",
      },
      {
        heading: "Compliance First",
        body: "Mass tort advertising draws close scrutiny from bars and regulators: no guarantees, no medical advice, clear disclaimers. Pages are written to those rules first and approved by your firm before they publish.",
      },
      {
        heading: "Authority Without Shortcuts",
        body: "National dockets are contested by firms with large, established sites. Links earned through genuinely useful resources and digital PR — never bought, which breaks Google's spam policies — are how a smaller firm competes.",
      },
    ],
    capsules: [
      {
        q: "How do mass tort firms compete in organic search?",
        a: "By being ready before a docket opens — templates, medical review and structured data in place — so pages publish within days. Then by covering the whole search path, from the symptom to the recall to the lawsuit, and by reaching other firms looking for co-counsel.",
      },
      {
        q: "Why do symptom searches matter for mass torts?",
        a: "Claimants usually search what is happening to them and the product they used long before they search for a lawsuit. A firm that explains the symptom and the product clearly reaches them while they are still deciding whether something went wrong.",
      },
      {
        q: "Does SearchPrex have a mass tort case study?",
        a: "Not yet. No law firm client has been published; SearchPrex's verified results are in ecommerce and local services.",
      },
    ],
    faqs: [
      NO_GUARANTEE,
      {
        q: "Who reviews the medical content?",
        a: "Medical statements are sourced to published research or regulator notices and reviewed by your firm before anything goes live. The pages never give medical advice.",
      },
      NO_CONTRACT,
    ],
    locationsMentioned: ["philadelphia", "detroit", "baton-rouge"],
  },
];

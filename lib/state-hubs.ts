// lib/state-hubs.ts
//
// State-level copy for the /locations/[state] hubs (Michigan, Texas,
// Louisiana). The hubs used to be a summary of their city pages at ~400 words;
// the Phase 2 audit asked for real state-level substance.
//
// Every legal statement here was checked against the statute or bar rule it
// cites on 28 Sep 2026, and each carries its source. It is framed as what the
// law means for a firm's website, not as legal advice, and the page says so.
// Results: SearchPrex has no published law firm case study, so each hub says
// that plainly and names the (non-legal) clients it does have in that state.

import type { QA } from "@/lib/local-industries";
import { costFaq } from "@/lib/pricing";

export interface StateHub {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  law: { title: string; body: string; source: { label: string; href?: string } }[];
  search: { title: string; body: string }[];
  /** Case-study slugs (app/case-studies/data.ts) for clients in this state. */
  stateClients: string[];
  faqs: QA[];
}

function withCost(state: string, faqs: QA[]): QA[] {
  const cost = costFaq("Law Firm SEO", `law firm SEO in ${state}`);
  return cost ? [cost, ...faqs] : faqs;
}

export const STATE_HUBS: StateHub[] = [
  {
    slug: "michigan",
    metaTitle: "Michigan Law Firm SEO: Detroit & Grand Rapids",
    metaDescription:
      "Law firm SEO for Michigan attorneys in Detroit and Grand Rapids: no-fault pages, map pack work and Michigan law explained correctly. One firm per city.",
    intro: [
      "Michigan legal search splits into two very different markets. Southeast Michigan — Wayne, Oakland and Macomb counties — is a crowded legal market, where large firms and directories hold most of page one. West Michigan around Grand Rapids is far less contested: fewer firms have invested in content, so the first page is still largely directories that a specific, well-built page can displace.",
      "What ties them together is Michigan law. The 2019 no-fault reform changed what car accident victims need to know, and the state's comparative-fault rule changes what an injured person can recover. Firm pages that still describe the pre-reform position, or skip it, lose both the reader and the AI Overview that quotes whoever answers most clearly.",
    ],
    law: [
      {
        title: "No-fault after the 2019 reform",
        body: "Since July 2020, Michigan drivers choose their level of Personal Injury Protection instead of receiving unlimited lifetime medical benefits by default. Searchers want to know what they chose, who pays their medical bills and when they can sue outside no-fault — a page that answers that clearly is rare.",
        source: { label: "MCL 500.3107c", href: "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-500-3107c" },
      },
      {
        title: "More than 50% at fault: no non-economic damages",
        body: "If an injured person is found more than half at fault, economic damages are reduced and non-economic damages — pain and suffering — are not awarded. Injury pages that promise \"full compensation\" without this are both inaccurate and a bar-rule risk.",
        source: { label: "MCL 600.2959", href: "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-600-2959" },
      },
      {
        title: "Advertising rules apply to your pages",
        body: "Michigan's Rules of Professional Conduct prohibit false or misleading communications about a lawyer's services. Results, testimonials and comparisons on a firm's website fall under that, so every claim on a page needs to be one the firm can support.",
        source: { label: "Michigan Rules of Professional Conduct, Rule 7.1" },
      },
    ],
    search: [
      {
        title: "Metro Detroit is searched by suburb",
        body: "People in Oakland and Macomb counties search for Southfield, Troy, Warren or Sterling Heights, not \"Detroit\". A Detroit firm that wants those clients needs pages that name the places it actually serves.",
      },
      {
        title: "Car accident vs no-fault searches",
        body: "Some people search \"car accident lawyer\"; others search the insurance problem — \"no-fault attorney\", \"PIP claim denied\". The second group is closer to hiring and much less contested.",
      },
      {
        title: "Grand Rapids: directories to beat",
        body: "In Kent County, Avvo, FindLaw and Justia hold many first-page spots on domain strength alone. A page that answers the specific Kent County question can outrank a directory listing in a way it cannot outrank an established local firm.",
      },
    ],
    stateClients: ["michigan-outdoor-sports", "dolls-cleaning", "carpet-cleaning"],
    faqs: withCost("Michigan", [
      {
        q: "Do you have Michigan law firm case studies?",
        a: "Not yet — there is no published law firm case study on this site. SearchPrex does have three Michigan clients, none of them law firms: Michigan Outdoor Sports (technical SEO), Doll's Cleaning in Chesterfield and a carpet cleaning company in Clawson (local SEO). Their results are linked on this page, with the screenshots.",
      },
      {
        q: "Should a Michigan injury firm have a no-fault page?",
        a: "Yes, if it takes auto cases. The 2019 reform created a whole set of questions — which PIP level someone chose, who pays medical bills, when they can sue outside no-fault — and few firm sites answer them in plain language. A clear, current page on that is useful to readers and to AI Overviews.",
      },
      {
        q: "Do you work with firms outside Detroit and Grand Rapids?",
        a: "Yes. Those two cities have their own pages because search demand showed there first. Firms in Lansing, Ann Arbor or elsewhere in Michigan get the same work, with one firm per practice area in each city.",
      },
    ]),
  },
  {
    slug: "texas",
    metaTitle: "Texas Law Firm SEO: Sugar Land, Plano & Denton",
    metaDescription:
      "Law firm SEO for Texas attorneys in Sugar Land, Plano and Denton: suburban county pages, map pack work and Texas rules explained. One firm per city.",
    intro: [
      "Texas legal search is dominated by Houston and Dallas firms that rank on domain strength across whole metros. The opening is in the suburban counties around them — Fort Bend, Collin and Denton — where residents search for their own city and county, and where most of the firms showing up have no page that speaks to that market at all.",
      "Each of those counties has its own character: high-asset family law and multilingual demand in Fort Bend, corporate relocations and equity compensation in Collin, a student population of close to 60,000 in Denton. The city pages go into each. What they share is Texas law and the State Bar's advertising rules, which shape what a firm's pages can say.",
    ],
    law: [
      {
        title: "Two years for most injury claims",
        body: "Most personal injury claims in Texas must be filed within two years. National content that quotes three years, or no deadline at all, misleads the reader — and a page that states the Texas deadline plainly is the one an AI Overview can quote.",
        source: { label: "Tex. Civ. Prac. & Rem. Code § 16.003" },
      },
      {
        title: "More than 50% responsible: no recovery",
        body: "Texas bars recovery when a claimant is more than 50 percent responsible, and reduces damages below that. Injury pages should explain that shared fault does not automatically end a claim — it is one of the most common questions people type.",
        source: { label: "Tex. Civ. Prac. & Rem. Code § 33.001", href: "https://tcss.legis.texas.gov/resources/CP/htm/CP.33.htm" },
      },
      {
        title: "Your homepage may need filing",
        body: "Texas requires many lawyer advertisements to be filed with the State Bar's Advertising Review Committee. For a firm website, the rules exempt everything except the homepage — so an SEO rewrite of the homepage should be planned with filing in mind, while the rest of the site still has to comply with the advertising rules.",
        source: {
          label: "Texas Disciplinary Rules 7.04–7.05",
          href: "https://www.legalethicstexas.com/resources/rules/texas-disciplinary-rules-of-professional-conduct/communications-exempt-from-filing-requirements/",
        },
      },
    ],
    search: [
      {
        title: "Suburbs are searched by name",
        body: "Fort Bend residents search Sugar Land, Missouri City, Katy and Richmond; Collin residents search Plano, Frisco, Allen and McKinney. Each is a separate search, and most are served by Houston or Dallas firms with no local page.",
      },
      {
        title: "Spanish-language demand",
        body: "Fort Bend is one of the most diverse counties in the country, and the Houston area has a large Spanish-speaking population. Firms that serve clients in Spanish rarely have Spanish pages to match.",
      },
      {
        title: "Parents search for students",
        body: "In Denton, the person searching for a criminal defense lawyer is often a parent hours away, not the student. The page they need is written for them.",
      },
    ],
    stateClients: ["mammoth-roofing"],
    faqs: withCost("Texas", [
      {
        q: "Do you have Texas law firm case studies?",
        a: "Not yet — there is no published law firm case study on this site. The Texas result SearchPrex does have is Mammoth Roofing, a local SEO client ranking for residential roof repair in Texas, linked on this page with its screenshots. Law firm work follows the same method.",
      },
      {
        q: "Should a suburban Texas firm target Houston or Dallas keywords?",
        a: "Usually not first. Metro-wide terms are held by large firms on domain strength. A firm in Sugar Land, Plano or Denton wins faster with pages for its own city, county and neighbouring suburbs, then widens out once those rank.",
      },
      {
        q: "Does my Texas firm website have to be filed with the State Bar?",
        a: "The Texas rules exempt law firm website content from filing except the homepage, and even the homepage can be exempt depending on what it contains. Check the current rules or ask the State Bar's Advertising Review Committee before relaunching a homepage; this page is not legal advice.",
      },
    ]),
  },
  {
    slug: "louisiana",
    metaTitle: "Louisiana Law Firm SEO: Baton Rouge, Shreveport",
    metaDescription:
      "Law firm SEO for Louisiana attorneys in Baton Rouge and Shreveport: civil law pages, the 2024 and 2026 rule changes and map pack work. One firm per city.",
    intro: [
      "Louisiana is the only US state whose legal system comes from French and Spanish civil law rather than English common law. Counties are parishes, probate is succession, and the statute of limitations is prescription. National legal content gets this wrong constantly, and New Orleans firms dominate statewide searches — which leaves Baton Rouge and Shreveport firms room to win with pages that get Louisiana right.",
      "Getting it right now means getting recent changes right. Louisiana extended its main injury deadline in 2024 and changed its comparative-fault rule on 1 January 2026. Pages written before those changes are now wrong, and a searcher who trusts them can lose a claim.",
    ],
    law: [
      {
        title: "Two years for injuries after 1 July 2024",
        body: "Delictual (injury) actions arising after 1 July 2024 prescribe in two years; earlier injuries keep the old one-year period. Most pages online still state one year or quote a national figure.",
        source: { label: "La. Civil Code art. 3493.1 (Acts 2024, No. 423)", href: "https://law.justia.com/codes/louisiana/civil-code/article-3493-1/" },
      },
      {
        title: "51% at fault: no recovery, from 2026",
        body: "For incidents on or after 1 January 2026, an injured person found 51% or more at fault recovers nothing; before that, Louisiana used pure comparative fault. Injury pages need to say which rule applies to which date.",
        source: { label: "La. Civil Code art. 2323 (HB 431, 2025)", href: "https://law.justia.com/codes/louisiana/civil-code/article-2323/" },
      },
      {
        title: "Advertisements are filed for review",
        body: "Louisiana requires most lawyer advertisements to be filed with the State Bar for evaluation, subject to listed exemptions. Check how your website and any paid search ads are treated before they go live.",
        source: { label: "Louisiana Rules of Professional Conduct 7.7–7.8", href: "https://www.lsba.org/PracticeAidGuide/PAG9.aspx" },
      },
    ],
    search: [
      {
        title: "Parishes, not counties",
        body: "People search \"East Baton Rouge Parish\" and \"Caddo Parish\", and so do the courts' own sites. Pages that say \"county\" read as written by someone outside Louisiana.",
      },
      {
        title: "Succession, not probate",
        body: "Estate searches in Louisiana use succession, and the process differs from probate elsewhere. A succession page written for Louisiana beats a national probate guide.",
      },
      {
        title: "The Ark-La-Tex border",
        body: "Around Shreveport and Bossier City, people live, work and get injured across three states. Which state's deadline and fault rule applies is a frequent, badly answered question.",
      },
    ],
    stateClients: [],
    faqs: withCost("Louisiana", [
      {
        q: "Do you have Louisiana law firm case studies?",
        a: "No. There is no published law firm case study on this site and no Louisiana client yet. The results linked from the case studies page are from other states and other industries, and each says where it is from.",
      },
      {
        q: "What changed in Louisiana injury law in 2024 and 2026?",
        a: "Injury claims arising after 1 July 2024 have two years instead of one (Civil Code art. 3493.1), and for incidents from 1 January 2026 anyone found 51% or more at fault recovers nothing (art. 2323). A firm's pages should state both, with the dates they apply from.",
      },
      {
        q: "Does a Louisiana firm need different pages from a firm in another state?",
        a: "Yes. The terminology (parish, succession, prescription), the deadlines and the fault rule are all Louisiana-specific. Pages adapted from a national template usually get at least one of them wrong.",
      },
    ]),
  },
];

export function getStateHub(slug: string): StateHub | undefined {
  return STATE_HUBS.find((h) => h.slug === slug);
}

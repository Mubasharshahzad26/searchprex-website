import fs from 'fs';
import path from 'path';

const filePath = path.resolve('lib/city-pages.ts');
let content = fs.readFileSync(filePath, 'utf8');

const startMarker = 'citySlug: "shreveport"';
const startIdx = content.indexOf(startMarker);
if (startIdx === -1) {
  console.error("Could not find citySlug: 'shreveport'");
  process.exit(1);
}

const objStart = content.lastIndexOf('{', startIdx);
// Find the closing of this Shreveport object before `];`
const closingArrayIdx = content.indexOf('];', objStart);
if (closingArrayIdx === -1) {
  console.error("Could not find closing array marker '];'");
  process.exit(1);
}

const objEnd = content.lastIndexOf('}', closingArrayIdx) + 1;

const shreveportNewEntry = `{
    stateSlug: "louisiana",
    citySlug: "shreveport",
    city: "Shreveport",
    state: "Louisiana",
    stateAbbr: "LA",
    county: "Caddo Parish",
    metaTitle: "Shreveport Law Firm SEO | Caddo Parish Map Pack & Retainers",
    metaDescription:
      "Shreveport law firm SEO for personal injury, family law, and criminal defense attorneys. Dominate Caddo Parish Map Pack and Ark-La-Tex legal search. Month-to-month.",
    h1: "Shreveport Law Firm SEO: Ark-La-Tex Retainer Engine",
    heroSub:
      "Capture high-value Caddo Parish retainers and Ark-La-Tex cross-border cases before New Orleans and Baton Rouge firms overspend on broad keywords. We deploy technical Map Pack authority, Louisiana Civil Code silos, and AI answer engine optimization tailored specifically for Northwest Louisiana attorneys.",
    problem:
      "Struggling to Sign Quality Retainers Against Distant Louisiana Mega-Firms and Out-of-State Confusion?",
    problemPoints: [
      "New Orleans and Baton Rouge billboard firms dominate statewide generic searches despite having zero physical presence or community relevance in Caddo Parish",
      "Shreveport's position at the Ark-La-Tex border (tri-state intersection of Louisiana, Texas, and Arkansas) creates cross-jurisdiction conflict questions that national legal directories completely ignore",
      "Louisiana's landmark 2024 prescription change (two years under Civil Code art. 3493.1 for post-July 1, 2024 injuries) contrasts with Texas (2 years) and Arkansas (3 years), confusing searchers who live and work across state lines",
      "Effective January 1, 2026, Louisiana enacts a modified comparative fault standard (Civil Code art. 2323 51% bar), requiring precise statutory explanation that competing directories neglect",
      "High-volume freight traffic along the I-20 and I-49 corridors generates catastrophic trucking crashes searched across Bossier City, Minden, and Ruston with zero localized organic coverage",
    ],
    practiceDemand: [
      { area: "Personal injury & freeway collisions", why: "The major junction of I-20 and I-49 generates severe commercial trucking and interstate collisions governed by Louisiana's prescription and modified fault statutes." },
      { area: "Ark-La-Tex cross-border litigation", why: "Residents routinely live in Bossier Parish, work in Caddo Parish, and commute from East Texas or South Arkansas, creating complex multi-state choice-of-law and venue disputes." },
      { area: "Family law & covenant marriage", why: "Louisiana's distinct civil law community property regime (Civil Code art. 2338) and covenant marriage requirements differ fundamentally from adjacent common-law Texas and Arkansas." },
      { area: "Criminal defense & 1st JDC", why: "The 1st Judicial District Court at the Caddo Parish Courthouse presides over North Louisiana's heaviest felony and interstate drug interdiction docket along I-20." },
    ],
    localSignals: [
      { label: "Ark-La-Tex regional authority", detail: "Dominating local search clusters across Caddo, Bossier, Webster, and Lincoln Parishes" },
      { label: "1st Judicial District Court silos", detail: "Direct statutory alignment with the 1st JDC at 501 Texas Street in downtown Shreveport" },
      { label: "Civil Code precision", detail: "Authoritative explanation of Louisiana prescription deadlines and 2026 comparative fault rules" },
      { label: "Cross-border interstate UX", detail: "Clear statutory guidance addressing multi-state accident jurisdiction and choice-of-law questions" },
    ],
    courts: [
      "1st Judicial District Court (501 Texas St, Shreveport)",
      "Shreveport City Court (1244 Texas Ave, Shreveport)",
      "U.S. District Court, Western District of Louisiana (300 Fannin St, Shreveport)",
      "Louisiana 2nd Circuit Court of Appeal (430 Fannin St, Shreveport)",
    ],
    barAssociation: "Louisiana State Bar Association · Shreveport Bar Association",
    neighborhoods: ["Downtown & Riverfront", "Highland & South Highlands", "Broadmoor", "Anderson Island", "Southern Hills", "Bossier City & East Bank"],
    nearbyCities: ["Bossier City", "Monroe", "Ruston", "Minden", "Texarkana"],
    legalContext: {
      heading: "Why the Ark-La-Tex border creates the greatest legal content gap in North Louisiana",
      body:
        "Shreveport sits at the crossroads of three distinct legal jurisdictions: Louisiana civil law, Texas common law, and Arkansas statutory law. Residents and commercial truck drivers routinely cross state borders daily along I-20 and I-49. When an accident occurs near the state line, searchers desperately need to know which state's deadlines and liability rules apply. Louisiana enforces a two-year prescriptive period for injuries after July 1, 2024 (Civil Code art. 3493.1), but previous injuries remain bound by the legacy one-year deadline. Furthermore, since January 1, 2026, Louisiana bars recovery for plaintiffs 51% or more at fault (art. 2323), whereas Arkansas applies a 50% modified comparative fault rule and a three-year statute of limitations. National aggregators publish generic advice that misleads clients. SearchPrex engineers authoritative Ark-La-Tex legal silos that state the exact cross-border rules in the first sentence, securing top positions in Google's local 3-Pack and citation dominance across Google AI Overviews and ChatGPT.",
    },
    faqs: [
      {
        q: "What is the prescriptive period for personal injury claims in Shreveport?",
        a: "Under Louisiana Civil Code art. 3493.1, personal injury claims arising after July 1, 2024 have a prescriptive period of two years from the date of injury, whereas claims for injuries occurring prior to that date are governed by the legacy one-year prescriptive period.",
      },
      {
        q: "How do cross-border Ark-La-Tex injuries affect applicable law and filing deadlines?",
        a: "Applicable law depends on the location of the collision, the residency of the parties, and interstate choice-of-law rules. Louisiana allows two years for post-July 2024 claims, Texas allows two years, and Arkansas allows three years, making immediate local jurisdictional analysis essential.",
      },
      {
        q: "How does Louisiana's 2026 comparative fault reform impact Shreveport injury claims?",
        a: "Effective January 1, 2026, Louisiana Civil Code art. 2323 bars an injured party from recovering damages if they are determined to be 51% or more at fault, transitioning Louisiana from a pure comparative fault system to a modified comparative fault standard.",
      },
      {
        q: "Should a Shreveport law firm target Bossier City separately in organic search?",
        a: "Yes. Bossier City represents an independent search market in Bossier Parish with distinct municipal search intent; deploying dedicated submarket pages captures clients across the Red River without cannibalizing Shreveport rankings.",
      },
      {
        q: "How does SearchPrex help Shreveport firms outrank New Orleans and Baton Rouge competitors?",
        a: "We build hyper-localized Caddo Parish entity signals, earn Ark-La-Tex citations, and align your practice directly with the 1st Judicial District Court to dominate the Google Map Pack where distant competitors cannot compete.",
      },
      {
        q: "How does SearchPrex optimize Shreveport content for Google AI Overviews and ChatGPT?",
        a: "We structure legal insights with direct, answer-first opening sentences, verified Civil Code citations, and complete LegalService Schema markup that AI search models extract directly as primary sources.",
      },
      {
        q: "Do you lock Shreveport law firms into long-term contracts?",
        a: "No. SearchPrex operates strictly month-to-month with zero long-term contracts and guarantees 1-firm-per-practice exclusivity across Caddo Parish so we never work with your direct local competitors.",
      },
      {
        q: "What practice areas generate the highest caseload return in Caddo Parish?",
        a: "Commercial trucking collisions along the I-20 and I-49 corridors, multi-state Ark-La-Tex dispute litigation, and high-conflict succession cases generate the fastest caseload conversions and highest lifetime case value.",
      },
    ],
  }`;

content = content.slice(0, objStart) + shreveportNewEntry + content.slice(objEnd);
fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully updated Shreveport in lib/city-pages.ts");

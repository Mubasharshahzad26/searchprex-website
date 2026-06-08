// app/locations/kansas/wichita/page.tsx
// UPDATED — all new sections added:
//   Family Law SEO intro strip · Individual vs Firm · We Know Legal SEO Better
//   Buyer's Journey (interactive) · Issues + Solutions · AI Era / LLM rankings
//   Founder Ideology · Citation & Growth Stats · Leads Collection Form
//   Legal News sidebar (in research + guide layout)
 
import type { Metadata } from "next";
import AiFinderHero from "@/components/wichita/AiFinderHero";
import RoiCalculator from "@/components/wichita/RoiCalculator";
import AuditTool from "@/components/wichita/AuditTool";
import BuyersJourneyInteractive from "@/components/wichita/BuyersJourneyInteractive";
import LeadsCollectionForm from "@/components/wichita/LeadsCollectionForm";
import LegalNewsWidget from "@/components/wichita/LegalNewsWidget";
import RealityCheck from "@/components/wichita/RealityCheck";
 
export const dynamic = "force-dynamic";
 
const SITE = "https://www.searchprex.com";
const PAGE_URL = `${SITE}/locations/kansas/wichita`;
const CALENDLY = "https://calendly.com/contact-searchprex/30min";
const LINKEDIN = "https://www.linkedin.com/in/mubashar-shahzad-seo/";
 
export const metadata: Metadata = {
  title: "Wichita Law Firm SEO Services | SearchPrex",
  description:
    "Local SEO for Wichita law firms. Rank in the Google map pack for your practice area in Sedgwick County. Free audit, no commitment, reply in 24 hrs.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Wichita Law Firm SEO Services | SearchPrex",
    description:
      "Local SEO for Wichita law firms — dominate Google Maps and local search in Sedgwick County.",
    url: PAGE_URL, siteName: "SearchPrex", type: "website",
  },
};
 
// ---- shared styles ----
const BRAND = {
  purple: "#534AB7", green: "#2f9670", navy: "#0a0f2e",
  ink: "#1b2140", muted: "#6b7090", line: "#e7e9f1",
  soft: "#f7f8fb", purpleSoft: "#eeedfe", greenSoft: "#e1f5ee",
};
const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";
const container = { maxWidth: 1080, margin: "0 auto", padding: "0 26px" } as const;
const h2 = { fontSize: 28, fontWeight: 800 as const, color: BRAND.navy, letterSpacing: "-0.5px", margin: "0 0 10px" };
 
// ---- data ----
const STATS = [
  ["538,000+", "residents in Sedgwick County"],
  ["#1", "largest city in Kansas"],
  ["18th", "Judicial District"],
  ["1M+", "people within 100 miles"],
];
<RealityCheck />
 
const SERVICES = [
  ["Local SEO & map pack", "Get your firm into the top 3 Google Map results for your practice area in Wichita."],
  ["Google Business Profile", "Full optimization, category strategy, and a review system that builds trust and rankings."],
  ["Practice-area content", "Pages written for real Wichita searchers — not thin, templated filler."],
  ["Technical SEO", "Site speed, mobile, schema, and indexing fixes so Google can find and trust your pages."],
  ["Local citations & links", "Consistent listings across legal directories and local sources that signal authority."],
  ["Transparent reporting", "Clear monthly reporting on rankings, calls, and leads. You see what your money does."],
];
 
const PRACTICE_AREAS = [
  ["Personal injury & car accidents", "High intent along the I-135, K-96, and Kellogg corridors."],
  ["Workers' compensation", "Driven by Wichita's large aerospace and manufacturing workforce."],
  ["Family law", "Divorce, custody & support — steady demand from McConnell AFB families."],
  ["Criminal defense & DUI", "Consistent local search volume year-round."],
  ["Employment law", "A growing niche with limited strong local competition."],
];
 
const SERVICE_AREAS = [
  "Downtown Wichita", "East Wichita", "West Wichita", "Derby", "Andover",
  "Bel Aire", "Park City", "Maize", "Goddard", "Haysville",
];
 
const GUIDE = [
  ["Build relevance around Sedgwick County, not just \u201cWichita.\u201d", "Pages and a Google Business Profile that reference where your clients actually live \u2014 Derby, Andover, Bel Aire, the 18th Judicial District \u2014 signal local relevance far more than repeating \u201cWichita lawyer\u201d twenty times."],
  ["Earn local citations from sources Google trusts.", "Consistent listings on the Wichita Bar Association directory, Kansas legal directories, and reputable local sources do more for a law firm than generic backlinks. Name, address, and phone must match everywhere."],
  ["Target the searches competitors ignore.", "Everyone fights over \u201cWichita personal injury lawyer.\u201d Far fewer optimize for suburb-level or situation-specific searches. Lower competition, higher intent."],
  ["Make reviews part of your SEO.", "Steady, recent Google reviews that mention practice areas and locations influence both rankings and the decision to call. A simple post-matter request system compounds over time."],
  ["Use proper legal schema.", "LegalService / Attorney schema, correct categories, and accurate hours help Google display your firm correctly \u2014 and most local firms still skip it."],
];
 
const FAQS = [
  ["How long until my Wichita firm starts ranking?", "Local SEO is a build, not a switch. Most firms see meaningful map-pack and ranking movement in 3\u20136 months, with momentum compounding after that. Anyone promising page one in two weeks is selling something we won't."],
  ["Do you guarantee first-page rankings?", "No \u2014 and you should be wary of anyone who does. Google's results aren't for sale. What we guarantee is a clear strategy, honest reporting, and work focused on the rankings and calls that actually grow your practice."],
  ["What makes local SEO different for Wichita law firms?", "Wichita's demand is shaped by its economy and community \u2014 aerospace and manufacturing injuries, McConnell military families, and suburb-level searches in Derby and Andover. Generic national tactics miss this. Local relevance is the whole game."],
  ["Do you only work with law firms?", "We specialize in local service businesses, including law firms. That focus means we already understand legal directories, practice-area intent, and the trust signals that matter in your market."],
  ["How do you measure results?", "Transparent monthly reporting on rankings, map-pack visibility, calls, and form leads \u2014 the metrics tied to actual cases, not vanity numbers."],
  ["Which areas around Wichita do you cover?", "All of the Wichita metro and Sedgwick County \u2014 downtown, east and west Wichita, Derby, Andover, Bel Aire, Park City, Maize, Goddard, and Haysville."],
];
 
// ---- JSON-LD schema ----
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${PAGE_URL}#service`,
      name: "SearchPrex \u2014 Wichita Law Firm SEO",
      description: "Local SEO services for law firms in Wichita, Kansas.",
      url: PAGE_URL,
      areaServed: { "@type": "City", name: "Wichita", containedInPlace: { "@type": "State", name: "Kansas" } },
      provider: { "@type": "Organization", name: "SearchPrex", url: SITE },
    },
    { "@type": "Person", "@id": `${SITE}#mubashar`, name: "Mubashar Shahzad", jobTitle: "Founder & SEO Strategist", worksFor: { "@type": "Organization", name: "SearchPrex" }, sameAs: [LINKEDIN] },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE}/locations` }, { "@type": "ListItem", position: 3, name: "Kansas", item: `${SITE}/locations/kansas` }, { "@type": "ListItem", position: 4, name: "Wichita", item: PAGE_URL }] },
    { "@type": "FAQPage", mainEntity: FAQS.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
  ],
};
 
export default function WichitaPage() {
  return (
    <main style={{ fontFamily: FONT, color: BRAND.ink, background: "#fff" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <style dangerouslySetInnerHTML={{ __html: `
        .spx-hover { transition: background .3s ease, border-color .3s ease, transform .3s ease, box-shadow .3s ease; }
        .spx-hover:hover { background:#0a0f2e !important; border-color:#0a0f2e !important; transform: translateY(-3px); box-shadow: 0 12px 30px rgba(10,15,46,.18); }
        .spx-hover:hover * { color:#fff !important; }
        .spx-green-hover { transition: all .25s ease; }
        .spx-green-hover:hover { background:#2f9670 !important; color:#fff !important; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(47,150,112,.22); }
        .spx-green-hover:hover * { color:#fff !important; }
      ` }} />
 
      {/* 1 — HERO + AI FINDER */}
      <AiFinderHero />
 
      {/* ═══ NEW ═══ FAMILY LAW SEO INTRO STRIP */}
      <section style={{ background: BRAND.navy, padding: "32px 26px", borderBottom: `2px solid ${BRAND.green}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ background: BRAND.green, color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 999, letterSpacing: ".4px" }}>WE SERVE FAMILY LAW SEO</span>
              <span style={{ background: "#1c2547", color: "#9aa0c4", fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 999 }}>Wichita · Sedgwick County</span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", lineHeight: 1.25 }}>
              We double your family law cases.<br />
              <span style={{ color: "#3eb489" }}>Because we understand how clients find attorneys in 2026.</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[["3×", "more calls vs paid ads"], ["+5.7×", "organic growth achieved"], ["90 days", "to first results"]].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 10, padding: "12px 16px" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: BRAND.green }}>{v}</div>
                <div style={{ fontSize: 11, color: "#9aa0c4", marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* 2 — MARKET SNAPSHOT */}
      <section style={{ background: BRAND.soft, padding: "56px 0", borderTop: `1px solid #eceef4` }}>
        <div style={container}>
          <p style={{ fontSize: 15, color: BRAND.muted, maxWidth: 620, margin: "0 0 24px", lineHeight: 1.6 }}>
            Wichita isn&apos;t a generic &ldquo;local SEO&rdquo; market &mdash; it&apos;s the largest legal market in Kansas, and ranking here takes a strategy built around it.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14 }}>
            {STATS.map(([n, l]) => (
              <div key={l} className="spx-hover" style={{ background: "#fff", border: `1px solid ${BRAND.line}`, borderRadius: 12, padding: 18, textAlign: "center" }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: BRAND.purple }}>{n}</div>
                <div style={{ fontSize: 12.5, color: BRAND.muted, marginTop: 5 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ═══ NEW ═══ INDIVIDUAL LAWYER vs LAW FIRM */}
      <section style={{ padding: "56px 0" }}>
        <div style={container}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: BRAND.purple, letterSpacing: ".5px", marginBottom: 8 }}>WHO WE SERVE</div>
            <h2 style={{ ...h2, textAlign: "center" }}>Solo attorney or full law firm — we've built for both</h2>
            <p style={{ fontSize: 15, color: BRAND.muted, maxWidth: 540, margin: "8px auto 0", lineHeight: 1.6 }}>
              Your SEO strategy shouldn't look the same regardless of your size. Here's how we approach each.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* Solo Attorney */}
            <div style={{ border: `2px solid ${BRAND.purple}`, borderRadius: 16, padding: 28, background: BRAND.purpleSoft }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: BRAND.purple, color: "#fff", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>👤</div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: BRAND.navy }}>Solo Attorney</div>
                  <div style={{ fontSize: 12, color: BRAND.muted }}>1 attorney · Wichita / Sedgwick County</div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: "#3c3489", lineHeight: 1.65, marginBottom: 16 }}>
                You are the brand. Clients are hiring <em>you</em>, not a firm name. Your SEO needs to lead with personal authority, local presence, and a GBP that puts your face and voice front and center.
              </div>
              {[
                "Personal GBP with your photo + story",
                "Practice-area pages written in your voice",
                "Review strategy that builds personal trust",
                "Local pack visibility for your exact practice",
                "AI Overview citation with your name as the expert",
                "Budget-smart packages — $800–$1,500/mo",
              ].map(p => (
                <div key={p} style={{ display: "flex", gap: 8, marginBottom: 7 }}>
                  <span style={{ color: BRAND.purple, fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 13, color: BRAND.ink }}>{p}</span>
                </div>
              ))}
            </div>
 
            {/* Law Firm */}
            <div style={{ border: `2px solid ${BRAND.green}`, borderRadius: 16, padding: 28, background: BRAND.greenSoft }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: BRAND.green, color: "#fff", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>🏛️</div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: BRAND.navy }}>Law Firm</div>
                  <div style={{ fontSize: 12, color: BRAND.muted }}>2–15+ attorneys · Greater Wichita metro</div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: "#1a4a3c", lineHeight: 1.65, marginBottom: 16 }}>
                Your firm has multiple practice areas and locations. Your SEO needs a silo structure — separate optimized pages for each practice area and Wichita suburb — and a brand presence that signals authority and scale.
              </div>
              {[
                "Practice-area silo: divorce, custody, PI, criminal…",
                "City + suburb pages (Derby, Andover, Bel Aire…)",
                "Multi-attorney schema and individual team pages",
                "Competitive gap analysis vs top Wichita firms",
                "Citation audit + cleanup across 60+ directories",
                "Full-funnel packages — $1,800–$5,000/mo",
              ].map(p => (
                <div key={p} style={{ display: "flex", gap: 8, marginBottom: 7 }}>
                  <span style={{ color: BRAND.green, fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 13, color: BRAND.ink }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
 
      {/* 3 — OVERVIEW + LOCAL INSIGHT */}
      <section style={{ padding: "56px 0" }}>
        <div style={{ ...container, maxWidth: 760 }}>
          <h2 style={h2}>SEO built for the Wichita legal market</h2>
          <p style={{ fontSize: 15.5, color: BRAND.ink, lineHeight: 1.75, margin: "0 0 16px" }}>
            Wichita is the county seat of Sedgwick County and the largest city in Kansas &mdash; and its legal demand is shaped by the local economy, not a national template. As the &ldquo;Air Capital of the World,&rdquo; the city&apos;s economy is anchored by aerospace and advanced manufacturing: Spirit AeroSystems, Textron Aviation, Bombardier, and Koch Industries. That industrial base drives steady demand for personal injury, workplace injury, and workers&apos; compensation representation.
          </p>
          <p style={{ fontSize: 15.5, color: BRAND.ink, lineHeight: 1.75, margin: "0 0 20px" }}>
            McConnell Air Force Base &mdash; home to the 22nd Air Refueling Wing &mdash; sits about ten miles southeast of downtown, bringing a large population of military families. Deployments, relocations, and PCS moves create consistent need for family law.
          </p>
          <div style={{ background: BRAND.greenSoft, borderLeft: `3px solid ${BRAND.green}`, padding: "14px 18px", borderRadius: 4 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#0f6e56", marginBottom: 4, letterSpacing: ".4px" }}>LOCAL INSIGHT</div>
            <div style={{ fontSize: 14, color: "#1a4a3c", lineHeight: 1.6 }}>
              Competition for broad terms like &ldquo;Wichita car accident lawyer&rdquo; is heaviest among established downtown firms. The opening is in the suburbs &mdash; Derby, Andover, Bel Aire, and east-side Wichita &mdash; where search demand exists but local content barely does. That&apos;s where a smaller firm can win first.
            </div>
          </div>
        </div>
      </section>
 
      {/* 4 — SERVICES */}
      <section style={{ background: BRAND.soft, padding: "56px 0", borderTop: `1px solid #eceef4` }}>
        <div style={container}>
          <h2 style={{ ...h2, textAlign: "center" }}>Everything your firm needs to rank locally</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginTop: 28 }}>
            {SERVICES.map(([t, d]) => (
              <div key={t} className="spx-hover" style={{ background: "#fff", border: `1px solid ${BRAND.line}`, borderRadius: 12, padding: 18 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: BRAND.navy, marginBottom: 6 }}>{t}</div>
                <div style={{ fontSize: 13.5, color: BRAND.muted, lineHeight: 1.6 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ═══ NEW ═══ WE KNOW LEGAL SEO BETTER */}
      <section style={{ padding: "56px 0" }}>
        <div style={container}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: BRAND.purple, letterSpacing: ".5px", marginBottom: 8 }}>THE SEARCHPREX DIFFERENCE</div>
            <h2 style={{ ...h2, textAlign: "center" }}>We know legal SEO better — here&apos;s why that matters</h2>
            <p style={{ fontSize: 15, color: BRAND.muted, maxWidth: 540, margin: "8px auto 0", lineHeight: 1.6 }}>
              Generic SEO agencies treat your law firm like a plumber. We don&apos;t. Legal search has unique signals, unique intent, and unique trust requirements.
            </p>
          </div>
 
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {[
              { icon: "⚖️", title: "We understand legal search intent", body: "A person searching 'divorce attorney Wichita' is in crisis mode. Their search behavior, trust thresholds, and decision journey are completely different from someone shopping for a plumber. We've studied it — and we build for it." },
              { icon: "🗺️", title: "We map local signal layers", body: "Wichita family law SEO requires stacking GBP signals, citation consistency, suburb-level content, and review velocity together. Miss one layer and your competitors take the calls." },
              { icon: "📋", title: "We know what legal directories actually matter", body: "Avvo, Martindale-Hubbell, FindLaw, Justia, and the Wichita Bar Association directory are not equal. We build your citation profile in the right order, with the right data — the way Google weights legal authority." },
              { icon: "🧠", title: "We understand E-E-A-T in legal niches", body: "Google's trust signals for legal content (Experience, Expertise, Authoritativeness, Trustworthiness) are uniquely strict. We build pages and profiles that satisfy these signals — not just keyword density." },
              { icon: "📊", title: "We focus on case metrics, not traffic metrics", body: "A thousand monthly visitors who don't become clients is worthless. We optimize for calls, consult bookings, and signed cases — and we track every lead so you know exactly what your SEO is worth." },
              { icon: "🔁", title: "We build compounding assets, not rented traffic", body: "PPC stops when your budget does. Rankings, reviews, citations, and authoritative content compound over time. After 12 months, your SEO pays you back even when you're asleep." },
            ].map(({ icon, title, body }) => (
              <div key={title} className="spx-hover" style={{ background: "#fff", border: `1px solid ${BRAND.line}`, borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: BRAND.navy, marginBottom: 6 }}>{title}</div>
                <div style={{ fontSize: 13.5, color: BRAND.muted, lineHeight: 1.65 }}>{body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* WHY SEARCHPREX */}
      <section style={{ padding: "56px 0", background: BRAND.soft, borderTop: `1px solid #eceef4` }}>
        <div style={container}>
          <h2 style={{ ...h2, textAlign: "center" }}>Why Wichita firms choose SearchPrex</h2>
          <p style={{ fontSize: 14.5, color: BRAND.muted, textAlign: "center", maxWidth: 560, margin: "0 auto 28px", lineHeight: 1.6 }}>Most agencies treat a law firm like any other client. We don&apos;t.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
            {[
              ["We specialize in legal SEO", "Local + legal search is our focus — not generic marketing that treats a law firm like any other business."],
              ["Founder-led — no juniors", "The person who audits your site does the work. You\u2019re never handed off to a trainee."],
              ["More cases, not vanity metrics", "We optimize for calls and signed clients — not rankings that look nice but don\u2019t convert."],
              ["We understand your buyers", "We map what Wichita clients actually search for and feel, then meet them exactly there."],
              ["Messaging that converts", "Your page doesn\u2019t just rank — it speaks to the client and earns the call."],
              ["Honest, clear reporting", "You always know what\u2019s working and why. No jargon, no smoke, no surprises."],
            ].map(([t, d]) => (
              <div key={t} className="spx-hover" style={{ background: "#fff", border: `1px solid ${BRAND.line}`, borderRadius: 12, padding: 18 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: BRAND.navy, marginBottom: 6 }}>{t}</div>
                <div style={{ fontSize: 13.5, color: BRAND.muted, lineHeight: 1.6 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* BUYER'S JOURNEY */}
      <BuyersJourneyInteractive />
 
      {/* BUYER'S JOURNEY (static version — original) */}
      <section style={{ background: BRAND.soft, padding: "56px 0", borderTop: `1px solid #eceef4` }}>
        <div style={container}>
          <h2 style={{ ...h2, textAlign: "center" }}>How a Wichita client finds you</h2>
          <p style={{ fontSize: 14.5, color: BRAND.muted, textAlign: "center", maxWidth: 540, margin: "0 auto", lineHeight: 1.6 }}>
            From a Google search to a booked consult — we optimize every step of the journey.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginTop: 28 }}>
            {[
              ["1", "They search", "\u201cDivorce lawyer Wichita\u201d on Google or an AI assistant."],
              ["2", "You appear", "Top 3 map pack + AI Overview — right where they look."],
              ["3", "They click", "Your fast, trust-building page does the convincing."],
              ["4", "They call", "A booked consult — and we track every lead."],
            ].map(([n, t, d]) => (
              <div key={n} className="spx-hover" style={{ background: "#fff", border: `1px solid ${BRAND.line}`, borderRadius: 12, padding: 18 }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: BRAND.purple, marginBottom: 8 }}>{n}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: BRAND.navy, marginBottom: 5 }}>{t}</div>
                <div style={{ fontSize: 13, color: BRAND.muted, lineHeight: 1.55 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ═══ NEW ═══ ISSUES CLIENTS FACE */}
      <section style={{ padding: "56px 0" }}>
        <div style={container}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#d85a30", letterSpacing: ".5px", marginBottom: 8 }}>WE HEAR THIS EVERY WEEK</div>
            <h2 style={{ ...h2, textAlign: "center" }}>The real problems Wichita law firms have with SEO</h2>
            <p style={{ fontSize: 15, color: BRAND.muted, maxWidth: 520, margin: "8px auto 0", lineHeight: 1.6 }}>
              We have heard every version of these. Here is exactly how we solve them.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              {
                problem: '"I paid Scorpion $4,000/month for 2 years. I barely got calls. And when I left, they took my website."',
                solution: "You own everything we build — always. Website, content, rankings, domain assets. And our $1,800/mo Full-Funnel package outperforms what Scorpion delivers at $4K.",
                tag: "Scorpion refugee",
              },
              {
                problem: '"My FindLaw listing used to bring leads. Now it does nothing. I don\'t know where my next client is coming from."',
                solution: "FindLaw directories lose ground every year as Google prioritizes GBP and organic content. We migrate your focus to the channels that actually convert in 2026.",
                tag: "Directory frustration",
              },
              {
                problem: '"I rank for my own firm name, but I don\'t show up when someone searches \'divorce attorney near me\' in Derby."',
                solution: "Branded rankings don't win new clients. Suburb-level map-pack rankings do. We build the GBP signals, citations, and landing pages that get you into the local pack for exactly those searches.",
                tag: "Wrong rankings",
              },
              {
                problem: '"I tried an SEO agency. They sent a monthly report with green checkmarks but my calls didn\'t change."',
                solution: "Green checkmarks aren't cases. We report on rankings, call volume, and lead attribution — the numbers tied to revenue, not vanity. You see what changed and why.",
                tag: "No ROI clarity",
              },
              {
                problem: '"My competitors are showing up in AI Overviews and ChatGPT answers. I\'m not mentioned anywhere."',
                solution: "AI search visibility is the frontier we're already building for. Citation-based authority, schema markup, and E-E-A-T content are exactly what LLMs pull from. We build your firm into the answer.",
                tag: "AI invisibility",
              },
            ].map(({ problem, solution, tag }) => (
              <div key={tag} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: `1px solid ${BRAND.line}`, borderRadius: 14, overflow: "hidden" }}>
                <div style={{ background: "#fff5f2", padding: "18px 22px", borderRight: `1px solid ${BRAND.line}` }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#d85a30", letterSpacing: ".4px", marginBottom: 8 }}>REAL CLIENT PROBLEM · {tag.toUpperCase()}</div>
                  <div style={{ fontSize: 14, color: "#4a1b0c", lineHeight: 1.65, fontStyle: "italic" }}>{problem}</div>
                </div>
                <div style={{ background: BRAND.greenSoft, padding: "18px 22px" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#0f6e56", letterSpacing: ".4px", marginBottom: 8 }}>SEARCHPREX SOLUTION</div>
                  <div style={{ fontSize: 14, color: "#1a4a3c", lineHeight: 1.65 }}>{solution}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* 5 — ROI CALCULATOR */}
      <RoiCalculator />
 
      {/* ═══ NEW ═══ AI ERA / LLM RANKING */}
      <section style={{ background: BRAND.navy, padding: "64px 0" }}>
        <div style={container}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: BRAND.green, letterSpacing: ".5px", marginBottom: 8 }}>THE AI ERA OF LEGAL SEARCH</div>
            <h2 style={{ ...h2, textAlign: "center", color: "#fff" }}>We rank in LLMs, Google AI, and the next generation of search</h2>
            <p style={{ fontSize: 15, color: "#9aa0c4", maxWidth: 580, margin: "8px auto 0", lineHeight: 1.65 }}>
              When someone asks ChatGPT, Perplexity, or Google&apos;s AI Overview &ldquo;best divorce attorney in Wichita&rdquo; — we build the signals that make your firm the answer.
            </p>
          </div>
 
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14, marginBottom: 32 }}>
            {[
              { icon: "🤖", title: "AI Overview visibility", body: "Google's AI Overviews pull from high-authority local pages with proper schema. We build the exact structure that gets your firm cited as the answer in Wichita legal searches.", color: "#3eb489" },
              { icon: "💬", title: "ChatGPT & Perplexity citations", body: "LLMs like ChatGPT index the web. Firms with authoritative content, strong citation profiles, and proper E-E-A-T signals get mentioned. We build those signals deliberately.", color: "#534AB7" },
              { icon: "📚", title: "Citation rate improvement", body: "Every consistent legal directory listing, every structured data markup, every quality backlink — these compound into a citation authority that AI models recognize and repeat.", color: "#3eb489" },
              { icon: "🔮", title: "Future-proof: GEO strategy", body: "Generative Engine Optimization (GEO) is the next SEO. We're already building for it — optimizing for how AI answers questions, not just how Google ranks pages.", color: "#534AB7" },
            ].map(({ icon, title, body, color }) => (
              <div key={title} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 14, padding: 20, borderTop: `3px solid ${color}` }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{title}</div>
                <div style={{ fontSize: 13.5, color: "#9aa0c4", lineHeight: 1.65 }}>{body}</div>
              </div>
            ))}
          </div>
 
          {/* AI search comparison table */}
          <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 14, overflow: "hidden" }}>
            <div style={{ background: "rgba(255,255,255,.06)", padding: "12px 20px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 10 }}>
              {["Signal we build", "Google Maps", "Google AI Overview", "ChatGPT / Perplexity"].map(h => (
                <div key={h} style={{ fontSize: 11, fontWeight: 700, color: "#9aa0c4", textTransform: "uppercase", letterSpacing: ".4px" }}>{h}</div>
              ))}
            </div>
            {[
              ["GBP optimization + reviews", "✓ Direct", "✓ Influences", "○ Indirect"],
              ["LegalService + Attorney schema", "✓ Direct", "✓ Direct", "✓ Direct"],
              ["Authoritative legal content (E-E-A-T)", "✓ Direct", "✓ Direct", "✓ Direct"],
              ["Legal directory citations (60+)", "✓ Direct", "✓ Influences", "✓ Influences"],
              ["Suburb-level landing pages", "✓ Direct", "✓ Direct", "○ Indirect"],
              ["Founder bio + credentials page", "✓ Direct", "✓ Direct", "✓ Direct"],
            ].map(([signal, maps, ai, llm]) => (
              <div key={signal} style={{ padding: "11px 20px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 10, borderTop: "1px solid rgba(255,255,255,.07)" }}>
                <div style={{ fontSize: 13, color: "#c3c7df" }}>{signal}</div>
                <div style={{ fontSize: 13, color: maps.includes("✓") ? "#3eb489" : "#9aa0c4" }}>{maps}</div>
                <div style={{ fontSize: 13, color: ai.includes("✓") ? "#3eb489" : "#9aa0c4" }}>{ai}</div>
                <div style={{ fontSize: 13, color: llm.includes("✓") ? "#3eb489" : "#9aa0c4" }}>{llm}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ═══ NEW ═══ CITATION & ORGANIC GROWTH STATS */}
      <section style={{ background: BRAND.soft, padding: "56px 0", borderTop: `1px solid ${BRAND.line}` }}>
        <div style={container}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: BRAND.purple, letterSpacing: ".5px", marginBottom: 8 }}>ORGANIC GROWTH — HOW IT COMPOUNDS</div>
            <h2 style={{ ...h2, textAlign: "center" }}>We believe in growth, not clicks</h2>
            <p style={{ fontSize: 15, color: BRAND.muted, maxWidth: 520, margin: "8px auto 0", lineHeight: 1.6 }}>
              Every asset we build compounds over time. Here&apos;s what that looks like in 12 months for a Wichita law firm.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {[
              { month: "Month 1–2", title: "Foundation", items: ["GBP fully optimized", "60+ citations built", "Schema markup live", "Technical SEO fixed"], color: BRAND.muted },
              { month: "Month 3–4", title: "Traction", items: ["Map pack appearances", "Practice pages ranking", "Review velocity active", "First organic calls"], color: "#D85A30" },
              { month: "Month 5–6", title: "Momentum", items: ["Local pack top 3", "Suburb pages ranking", "Compounding reviews", "AI Overview citations"], color: BRAND.purple },
              { month: "Month 7–12", title: "Domination", items: ["Multiple practice areas ranked", "Statewide KS authority", "LLM citation established", "Cases 2–3× initial volume"], color: BRAND.green },
            ].map(({ month, title, items, color }) => (
              <div key={month} style={{ background: "#fff", border: `1px solid ${BRAND.line}`, borderRadius: 14, padding: 20, borderTop: `3px solid ${color}` }}>
                <div style={{ fontSize: 10, fontWeight: 700, color, letterSpacing: ".4px", marginBottom: 6 }}>{month.toUpperCase()}</div>
                <div style={{ fontSize: 17, fontWeight: 800, color: BRAND.navy, marginBottom: 12 }}>{title}</div>
                {items.map(item => (
                  <div key={item} style={{ display: "flex", gap: 8, marginBottom: 7 }}>
                    <span style={{ color, fontWeight: 700, flexShrink: 0, fontSize: 13 }}>→</span>
                    <span style={{ fontSize: 13, color: BRAND.ink }}>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* 6 — LEGAL LANDSCAPE */}
      <section style={{ padding: "56px 0" }}>
        <div style={container}>
          <h2 style={h2}>We know where your clients &mdash; and your cases &mdash; come from</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginTop: 24 }}>
            {[
              ["Courts", "Most local matters are filed in the 18th Judicial District Court of Kansas, in the Sedgwick County Courthouse at 525 N. Main Street, downtown Wichita — covering criminal, civil, family, and probate cases."],
              ["Bar & community", "The Wichita Bar Association runs a public \u201cFind a Lawyer\u201d directory, CLE programs, and the Sedgwick County Law Library. Verifiable local involvement is a genuine ranking and trust signal."],
              ["Competition", "Downtown is crowded with established firms competing for the same broad keywords. Suburban and practice-specific searches are far less contested — we position you where you can win, then expand."],
            ].map(([t, d]) => (
              <div key={t} className="spx-hover" style={{ border: `1px solid ${BRAND.line}`, borderRadius: 12, padding: 18 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: BRAND.purple, marginBottom: 8 }}>{t}</div>
                <div style={{ fontSize: 13.5, color: BRAND.muted, lineHeight: 1.6 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* 7 — PRACTICE AREAS + SERVICE AREAS */}
      <section style={{ background: BRAND.soft, padding: "56px 0", borderTop: `1px solid #eceef4` }}>
        <div style={container}>
          <h2 style={h2}>Practice areas we help Wichita firms rank for</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12, marginTop: 22 }}>
            {PRACTICE_AREAS.map(([t, d]) => (
              <div key={t} className="spx-hover" style={{ background: "#fff", border: `1px solid ${BRAND.line}`, borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: BRAND.navy }}>{t}</div>
                <div style={{ fontSize: 13, color: BRAND.muted, marginTop: 4, lineHeight: 1.55 }}>{d}</div>
              </div>
            ))}
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: BRAND.navy, margin: "30px 0 14px" }}>Service areas</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {SERVICE_AREAS.map(a => (
              <span key={a} style={{ background: BRAND.greenSoft, color: "#0f6e56", fontSize: 13, padding: "7px 14px", borderRadius: 999 }}>{a}</span>
            ))}
          </div>
        </div>
      </section>
 
      {/* NICHESEO PRO PROMO */}
      <section style={{ padding: "44px 0" }}>
        <div style={container}>
          <a href="https://nicheseo-pro-ai.vercel.app" target="_blank" rel="noopener noreferrer" className="spx-hover" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", background: BRAND.purpleSoft, border: "1px solid #cecbf6", borderRadius: 14, padding: "20px 24px", textDecoration: "none" }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: BRAND.purple, letterSpacing: ".4px", marginBottom: 4 }}>POWERED BY OUR OWN AI TOOLS</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: BRAND.navy }}>Explore NicheSEO Pro — our AI SEO tool suite</div>
              <div style={{ fontSize: 13.5, color: BRAND.muted, marginTop: 3 }}>Content generation, audits, keyword tracking &amp; competitive intel — in one place.</div>
            </div>
            <span style={{ background: BRAND.purple, color: "#fff", fontSize: 13.5, fontWeight: 700, padding: "11px 20px", borderRadius: 9, whiteSpace: "nowrap" }}>Try NicheSEO Pro &rarr;</span>
          </a>
        </div>
      </section>
 
      {/* 8 — AUDIT TOOL */}
      <AuditTool />
 
      {/* 9 — CASE STUDY + TRUSTED BY */}
      <section style={{ padding: "56px 0" }}>
        <div style={{ ...container, maxWidth: 760 }}>
          <h2 style={{ ...h2, textAlign: "center" }}>Local SEO that gets into the map pack</h2>
          <p style={{ fontSize: 14.5, color: BRAND.muted, textAlign: "center", margin: "0 auto 24px", maxWidth: 520, lineHeight: 1.6 }}>
            We&apos;ve taken local service businesses from invisible to the top of Google&apos;s map results. Here&apos;s one:
          </p>
          <div style={{ position: "relative", paddingTop: "56.25%", background: "#0a0f2e", borderRadius: 12, overflow: "hidden" }}>
            <iframe src="https://www.youtube.com/embed/g_1TfDU4YeA?rel=0&modestbranding=1" title="How HVAC Services Team reached the Google Map Pack Top 3" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} />
          </div>
          <p style={{ fontSize: 15, fontWeight: 700, color: BRAND.navy, textAlign: "center", margin: "16px 0 0", lineHeight: 1.4 }}>
            How HVAC Services Team reached the Google Map Pack Top 3 and earned an AI Overview placement
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 16 }}>
            {[["Top 3", "Maps pack"], ["Featured", "AI Overview"], ["+5.7x", "organic calls"]].map(([v, l]) => (
              <span key={l} style={{ display: "inline-flex", alignItems: "baseline", gap: 6, border: `1px solid rgba(62,180,137,0.3)`, background: "rgba(62,180,137,0.08)", borderRadius: 9, padding: "8px 14px", fontSize: 12.5, color: "#0f6e56", fontWeight: 600 }}>
                <span style={{ fontSize: 15, fontWeight: 800 }}>{v}</span> {l}
              </span>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <a href="/case-studies" style={{ color: BRAND.purple, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>View all case studies &rarr;</a>
          </div>
          <div style={{ fontSize: 11, letterSpacing: ".5px", color: "#9499b5", fontWeight: 700, textAlign: "center", margin: "30px 0 12px" }}>TRUSTED BY CLIENTS LIKE</div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {["AAA Mobile Tyres", "Door Doctor", "HVAC Services Team"].map(c => (
              <span key={c} style={{ border: `1px solid ${BRAND.line}`, borderRadius: 8, padding: "9px 16px", fontSize: 13, color: BRAND.ink }}>{c}</span>
            ))}
          </div>
          <p style={{ fontSize: 12, color: BRAND.muted, textAlign: "center", marginTop: 16, fontStyle: "italic" }}>
            Law firm case studies coming soon &mdash; the same local-SEO playbook applies to legal.
          </p>
        </div>
      </section>
 
      {/* 10 — RESEARCH + NEWS SIDEBAR */}
      <section style={{ background: BRAND.greenSoft, padding: "56px 0" }}>
        <div style={container}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 32, alignItems: "start" }}>
            {/* Main research content */}
            <div>
              <div style={{ fontSize: 11, letterSpacing: ".5px", color: "#0f6e56", fontWeight: 700, marginBottom: 8 }}>SEARCHPREX RESEARCH</div>
              <h2 style={h2}>Family law SEO in Kansas &mdash; 2026 study</h2>
              <p style={{ fontSize: 15, color: "#1a4a3c", lineHeight: 1.7, margin: "0 0 20px" }}>
                Our own analysis of how Wichita family law firms appear in local search: keyword demand, map-pack competition, and the content gaps competitors leave open.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
                {[
                  ["Local intent dominates", "Most \u201cdivorce\u201d and \u201cinjury lawyer\u201d searches in Wichita carry strong, ready-to-hire local intent."],
                  ["The map pack wins clicks", "For legal queries, Google\u2019s local map pack captures the bulk of clicks before the blue links."],
                  ["A schema gap to exploit", "Many Wichita firms still skip proper legal schema \u2014 a structural edge for firms that don\u2019t."],
                  ["AI citations are real now", "Google AI Overviews now answer legal questions with named attorneys. Most firms in Wichita aren\u2019t structured to appear in these answers."],
                ].map(([t, d]) => (
                  <div key={t} className="spx-hover" style={{ background: "#fff", border: "1px solid #c7e6da", borderRadius: 12, padding: 16 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#0f6e56", marginBottom: 5 }}>{t}</div>
                    <div style={{ fontSize: 13, color: "#3a6b5c", lineHeight: 1.55 }}>{d}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: "#3a6b5c", fontStyle: "italic" }}>In-depth Wichita data study coming soon.</div>
            </div>
            {/* Sidebar news widget */}
            <LegalNewsWidget />
          </div>
        </div>
      </section>
 
      {/* 11 — LOCAL GUIDE (with sidebar) */}
      <section style={{ padding: "56px 0" }}>
        <div style={container}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 32, alignItems: "start" }}>
            <div>
              <h2 style={h2}>How Wichita law firms win local search in 2026</h2>
              <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 22 }}>
                {GUIDE.map(([t, d], i) => (
                  <div key={i} style={{ display: "flex", gap: 14 }}>
                    <div style={{ flexShrink: 0, width: 30, height: 30, borderRadius: 8, background: BRAND.purpleSoft, color: BRAND.purple, fontWeight: 800, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</div>
                    <div>
                      <div style={{ fontSize: 15.5, fontWeight: 700, color: BRAND.navy, marginBottom: 4 }}>{t}</div>
                      <div style={{ fontSize: 14, color: BRAND.muted, lineHeight: 1.65 }}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Sidebar keeps showing news */}
            <LegalNewsWidget />
          </div>
        </div>
      </section>
 
      {/* ═══ NEW ═══ FOUNDER IDEOLOGY */}
      <section style={{ background: BRAND.purpleSoft, padding: "64px 0", borderTop: `1px solid #cecbf6` }}>
        <div style={{ ...container, maxWidth: 800 }}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 28, alignItems: "start" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: BRAND.purple, border: `3px solid ${BRAND.green}`, color: "#fff", fontSize: 24, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>MS</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: BRAND.purple, letterSpacing: ".5px", marginBottom: 8 }}>FOUNDER IDEOLOGY</div>
              <h2 style={{ ...h2, fontSize: 24 }}>Why I built SearchPrex around this one idea: Growth belongs to firms that show up</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 16 }}>
                {[
                  ["Growth isn't an accident — it's a system", "Every law firm that dominates its local market got there through deliberate, compounding assets: a GBP built with intent, content written for real clients, and a citation profile Google trusts. Not luck. Not budget. System."],
                  ["I build like I own the outcome", "Because I do. I'm the founder, the strategist, and the person doing the work. I don't hand your account to a junior. When your rankings move, I see it in the same moment you do."],
                  ["Double your leads — by understanding your client first", "The attorneys who double their caseload aren't the ones spending more on ads. They're the ones who figured out how their clients search, what their clients fear, and how to present their firm as the obvious answer. That's what we build."],
                  ["The AI era rewards real authority", "LLMs and AI Overviews are already answering legal questions. The firms being cited are the ones that built genuine local authority years ago. The best time to start is today. The second-best time is also today."],
                ].map(([title, body]) => (
                  <div key={title} style={{ display: "flex", gap: 14, padding: "16px", background: "#fff", borderRadius: 12, border: "1px solid #cecbf6" }}>
                    <span style={{ color: BRAND.purple, fontWeight: 700, fontSize: 16, flexShrink: 0 }}>→</span>
                    <div>
                      <div style={{ fontSize: 14.5, fontWeight: 700, color: BRAND.navy, marginBottom: 4 }}>{title}</div>
                      <div style={{ fontSize: 13.5, color: BRAND.muted, lineHeight: 1.65 }}>{body}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: BRAND.purple, color: "#fff", padding: "11px 22px", borderRadius: 9, textDecoration: "none", fontSize: 14, fontWeight: 700 }}>Book a call with Mubashar →</a>
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" style={{ color: BRAND.purple, fontSize: 13.5, fontWeight: 600, textDecoration: "none" }}>LinkedIn profile →</a>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* 12 — FAQ */}
      <section style={{ background: BRAND.soft, padding: "56px 0", borderTop: `1px solid #eceef4` }}>
        <div style={{ ...container, maxWidth: 760 }}>
          <h2 style={{ ...h2, textAlign: "center", marginBottom: 24 }}>Frequently asked questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FAQS.map(([q, a], i) => (
              <details key={i} style={{ background: "#fff", border: `1px solid ${BRAND.line}`, borderRadius: 10, padding: "14px 16px" }}>
                <summary style={{ fontSize: 14.5, fontWeight: 700, color: BRAND.navy, cursor: "pointer", listStyle: "none" }}>{q}</summary>
                <p style={{ fontSize: 14, color: BRAND.muted, lineHeight: 1.65, margin: "10px 0 0" }}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
 
      {/* ═══ NEW ═══ LEADS COLLECTION FORM */}
      <section style={{ padding: "64px 0", background: "#fff" }}>
        <div style={{ ...container, maxWidth: 800 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: BRAND.green, letterSpacing: ".5px", marginBottom: 8 }}>FREE AUDIT — REPLY IN 24 HRS</div>
            <h2 style={{ ...h2, textAlign: "center" }}>Tell us about your Wichita firm — we&apos;ll show you exactly where you&apos;re losing cases</h2>
            <p style={{ fontSize: 15, color: BRAND.muted, maxWidth: 520, margin: "8px auto 0", lineHeight: 1.6 }}>
              Reviewed personally by Mubashar. No junior staff, no automated response, no commitment required.
            </p>
          </div>
 
          <div style={{ background: BRAND.soft, border: `1px solid ${BRAND.line}`, borderRadius: 16, padding: 32 }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
              {[
                ["⚡", "Reply in 24 hrs"],
                ["🔓", "No commitment"],
                ["👤", "Reviewed by Mubashar"],
                ["📊", "Free 15-point audit"],
              ].map(([icon, label]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: `1px solid ${BRAND.line}`, borderRadius: 8, padding: "6px 12px", fontSize: 12.5, fontWeight: 600, color: BRAND.ink }}>
                  <span>{icon}</span> {label}
                </div>
              ))}
            </div>
            <LeadsCollectionForm />
          </div>
        </div>
      </section>
 
      {/* 13 — AUTHOR */}
      <section style={{ background: BRAND.navy, padding: "44px 0" }}>
        <div style={{ ...container, maxWidth: 760 }}>
          <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
            <div aria-hidden="true" style={{ width: 72, height: 72, borderRadius: "50%", background: BRAND.purple, border: `3px solid ${BRAND.green}`, color: "#fff", fontSize: 22, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>MS</div>
            <div style={{ flex: 1, minWidth: 240 }}>
              <span style={{ display: "inline-block", background: "#1c2547", color: "#3eb489", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 999, marginBottom: 7, letterSpacing: ".3px" }}>✓ CERTIFIED SEO EXPERT</span>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>Mubashar Shahzad</div>
              <div style={{ fontSize: 12.5, color: "#9aa0c4", marginTop: 3, lineHeight: 1.5 }}>Founder, SearchPrex · 5+ years in large-scale &amp; local SEO · Semrush + HubSpot certified</div>
              <p style={{ fontSize: 13.5, color: "#c3c7df", lineHeight: 1.6, margin: "10px 0 0" }}>
                Mubashar founded SearchPrex to give local businesses founder-led SEO — no juniors, no fluff. His work focuses on the fundamentals that move rankings: technical health, genuinely helpful content, and local relevance, built on measurable data.
              </p>
              <div style={{ marginTop: 12 }}><a href={LINKEDIN} target="_blank" rel="noopener noreferrer" style={{ color: "#7f77dd", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>LinkedIn →</a></div>
            </div>
          </div>
        </div>
      </section>
 
      {/* 14 — FINAL CTA */}
      <section style={{ background: BRAND.green, padding: "52px 26px", textAlign: "center" }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#fff", margin: "0 0 8px", letterSpacing: "-0.5px" }}>
          Get your free Wichita law firm SEO audit
        </h2>
        <p style={{ fontSize: 14.5, color: "#d6efe6", margin: "0 0 20px" }}>
          See exactly where you&apos;re losing cases to competitors &mdash; and the fastest path to outranking them.
        </p>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#fff", color: BRAND.green, fontSize: 14.5, fontWeight: 700, padding: "12px 26px", borderRadius: 9, textDecoration: "none" }}>
          Book on Calendly →
        </a>
        <div style={{ fontSize: 12, color: "#d6efe6", marginTop: 14 }}>Free 30-min call · No commitment · Reply within 24 hours</div>
      </section>
    </main>
  );
}
 







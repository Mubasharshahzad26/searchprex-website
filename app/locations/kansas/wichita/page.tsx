// app/locations/kansas/wichita/page.tsx
//
// Full Wichita law-firm SEO location page (server component).
// Composes the AI finder hero + all sections + interactive tools + JSON-LD schema.
//
// Requires these components:
//   components/wichita/AiFinderHero.tsx
//   components/wichita/RoiCalculator.tsx
//   components/wichita/AuditTool.tsx
// And the route: app/api/seo-finder/route.ts
//
// Adjust import paths if your alias isn't "@/components".
 
import type { Metadata } from "next";
import AiFinderHero from "@/components/wichita/AiFinderHero";
import RoiCalculator from "@/components/wichita/RoiCalculator";
import AuditTool from "@/components/wichita/AuditTool";
 
// Render on-demand instead of static prerender at build time.
// This page has live/interactive client components — prerendering it at build
// is what caused the "default export is not a React Component" build error.
// Content + meta tags still render in the HTML, so SEO is unaffected.
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
    url: PAGE_URL,
    siteName: "SearchPrex",
    type: "website",
  },
};
 
// ---- shared styles ----
const BRAND = {
  purple: "#534AB7",
  green: "#2f9670",
  navy: "#0a0f2e",
  ink: "#1b2140",
  muted: "#6b7090",
  line: "#e7e9f1",
  soft: "#f7f8fb",
  purpleSoft: "#eeedfe",
  greenSoft: "#e1f5ee",
};
const FONT =
  "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";
const container = { maxWidth: 1080, margin: "0 auto", padding: "0 26px" } as const;
const h2 = {
  fontSize: 28,
  fontWeight: 800 as const,
  color: BRAND.navy,
  letterSpacing: "-0.5px",
  margin: "0 0 10px",
};
 
// ---- data ----
const STATS = [
  ["538,000+", "residents in Sedgwick County"],
  ["#1", "largest city in Kansas"],
  ["18th", "Judicial District"],
  ["1M+", "people within 100 miles"],
];
 
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
      description:
        "Local SEO services for law firms in Wichita, Kansas, focused on Google map-pack rankings and local search.",
      url: PAGE_URL,
      areaServed: { "@type": "City", name: "Wichita", containedInPlace: { "@type": "State", name: "Kansas" } },
      provider: { "@type": "Organization", name: "SearchPrex", url: SITE },
    },
    {
      "@type": "Person",
      "@id": `${SITE}#mubashar`,
      name: "Mubashar Shahzad",
      jobTitle: "Founder & SEO Strategist",
      worksFor: { "@type": "Organization", name: "SearchPrex" },
      sameAs: [LINKEDIN],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE}/locations` },
        { "@type": "ListItem", position: 3, name: "Kansas", item: `${SITE}/locations/kansas` },
        { "@type": "ListItem", position: 4, name: "Wichita", item: PAGE_URL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};
 
export default function WichitaPage() {
  return (
    <main style={{ fontFamily: FONT, color: BRAND.ink, background: "#fff" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
 
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .spx-hover { transition: background .3s ease, border-color .3s ease, transform .3s ease, box-shadow .3s ease; }
        .spx-hover:hover { background:#0a0f2e !important; border-color:#0a0f2e !important; transform: translateY(-3px); box-shadow: 0 12px 30px rgba(10,15,46,.18); }
        .spx-hover:hover * { color:#fff !important; }
      `,
        }}
      />
 
      {/* 1 — HERO (+ AI finder + trust strip) */}
      <AiFinderHero />
 
      {/* 2 — MARKET SNAPSHOT */}
      <section style={{ background: BRAND.soft, padding: "56px 0", borderTop: `1px solid #eceef4` }}>
        <div style={container}>
          <p style={{ fontSize: 15, color: BRAND.muted, maxWidth: 620, margin: "0 0 24px", lineHeight: 1.6 }}>
            Wichita isn&apos;t a generic &ldquo;local SEO&rdquo; market &mdash; it&apos;s the largest legal
            market in Kansas, and ranking here takes a strategy built around it.
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
 
      {/* 3 — OVERVIEW + LOCAL INSIGHT */}
      <section style={{ padding: "56px 0" }}>
        <div style={{ ...container, maxWidth: 760 }}>
          <h2 style={h2}>SEO built for the Wichita legal market</h2>
          <p style={{ fontSize: 15.5, color: BRAND.ink, lineHeight: 1.75, margin: "0 0 16px" }}>
            Wichita is the county seat of Sedgwick County and the largest city in Kansas &mdash;
            and its legal demand is shaped by the local economy, not a national template. As the
            &ldquo;Air Capital of the World,&rdquo; the city&apos;s economy is anchored by aerospace
            and advanced manufacturing: Spirit AeroSystems (now part of Boeing and the region&apos;s
            largest employer), Textron Aviation, Bombardier, and Koch Industries. That industrial
            base drives steady demand for personal injury, workplace injury, and workers&apos;
            compensation representation.
          </p>
          <p style={{ fontSize: 15.5, color: BRAND.ink, lineHeight: 1.75, margin: "0 0 20px" }}>
            McConnell Air Force Base &mdash; home to the 22nd Air Refueling Wing &mdash; sits about
            ten miles southeast of downtown, bringing a large population of military families.
            Deployments, relocations, and PCS moves create consistent need for family law. A firm
            that understands <em>who</em> is searching in Wichita, and why, ranks for the terms that
            actually convert into clients.
          </p>
          <div style={{ background: BRAND.greenSoft, borderLeft: `3px solid ${BRAND.green}`, padding: "14px 18px", borderRadius: 4 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#0f6e56", marginBottom: 4, letterSpacing: ".4px" }}>LOCAL INSIGHT</div>
            <div style={{ fontSize: 14, color: "#1a4a3c", lineHeight: 1.6 }}>
              Competition for broad terms like &ldquo;Wichita car accident lawyer&rdquo; is heaviest
              among established downtown firms. The opening is in the suburbs &mdash; Derby, Andover,
              Bel Aire, and east-side Wichita &mdash; where search demand exists but local content
              barely does. That&apos;s where a smaller firm can win first.
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
 
      {/* WHY SEARCHPREX */}
      <section style={{ padding: "56px 0" }}>
        <div style={container}>
          <h2 style={{ ...h2, textAlign: "center" }}>Why Wichita firms choose SearchPrex</h2>
          <p style={{ fontSize: 14.5, color: BRAND.muted, textAlign: "center", maxWidth: 560, margin: "0 auto 28px", lineHeight: 1.6 }}>
            Most agencies treat a law firm like any other client. We don&apos;t.
          </p>
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
 
      {/* 5 — ROI CALCULATOR */}
      <RoiCalculator />
 
      {/* 6 — LEGAL LANDSCAPE */}
      <section style={{ padding: "56px 0" }}>
        <div style={container}>
          <h2 style={h2}>We know where your clients &mdash; and your cases &mdash; come from</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginTop: 24 }}>
            {[
              ["Courts", "Most local matters are filed in the 18th Judicial District Court of Kansas, in the Sedgwick County Courthouse at 525 N. Main Street, downtown Wichita \u2014 covering criminal, civil, family, and probate cases."],
              ["Bar & community", "The Wichita Bar Association runs a public \u201cFind a Lawyer\u201d directory, CLE programs, and the Sedgwick County Law Library. Verifiable local involvement is a genuine ranking and trust signal."],
              ["Competition", "Downtown is crowded with established firms competing for the same broad keywords. Suburban and practice-specific searches are far less contested \u2014 we position you where you can win, then expand."],
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
            {SERVICE_AREAS.map((a) => (
              <span key={a} style={{ background: BRAND.greenSoft, color: "#0f6e56", fontSize: 13, padding: "7px 14px", borderRadius: 999 }}>{a}</span>
            ))}
          </div>
        </div>
      </section>
 
      {/* NICHESEO PRO PROMO */}
      <section style={{ padding: "44px 0" }}>
        <div style={container}>
          <a
            href="https://nicheseo-pro-ai.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="spx-hover"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
              background: BRAND.purpleSoft,
              border: "1px solid #cecbf6",
              borderRadius: 14,
              padding: "20px 24px",
              textDecoration: "none",
            }}
          >
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: BRAND.purple, letterSpacing: ".4px", marginBottom: 4 }}>
                POWERED BY OUR OWN AI TOOLS
              </div>
              <div style={{ fontSize: 17, fontWeight: 800, color: BRAND.navy }}>
                Explore NicheSEO Pro — our AI SEO tool suite
              </div>
              <div style={{ fontSize: 13.5, color: BRAND.muted, marginTop: 3 }}>
                Content generation, audits, keyword tracking &amp; competitive intel — in one place.
              </div>
            </div>
            <span style={{ background: BRAND.purple, color: "#fff", fontSize: 13.5, fontWeight: 700, padding: "11px 20px", borderRadius: 9, whiteSpace: "nowrap" }}>
              Try NicheSEO Pro &rarr;
            </span>
          </a>
        </div>
      </section>
 
      {/* 8 — AUDIT TOOL */}
      <AuditTool />
 
      {/* 9 — HVAC CASE STUDY + TRUSTED BY */}
      <section style={{ padding: "56px 0" }}>
        <div style={{ ...container, maxWidth: 760 }}>
          <h2 style={{ ...h2, textAlign: "center" }}>Local SEO that gets into the map pack</h2>
          <p style={{ fontSize: 14.5, color: BRAND.muted, textAlign: "center", margin: "0 auto 24px", maxWidth: 520, lineHeight: 1.6 }}>
            We&apos;ve taken local service businesses from invisible to the top of Google&apos;s map
            results. Here&apos;s one:
          </p>
 
          {/* Real HVAC case study video (same one used on /case-studies) */}
          <div style={{ position: "relative", paddingTop: "56.25%", background: "#0a0f2e", borderRadius: 12, overflow: "hidden" }}>
            <iframe
              src="https://www.youtube.com/embed/g_1TfDU4YeA?rel=0&modestbranding=1"
              title="How HVAC Services Team reached the Google Map Pack Top 3"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
            />
          </div>
          <p style={{ fontSize: 15, fontWeight: 700, color: BRAND.navy, textAlign: "center", margin: "16px 0 0", lineHeight: 1.4 }}>
            How HVAC Services Team reached the Google Map Pack Top 3 and earned an AI Overview placement
          </p>
 
          {/* Real metrics from this case study */}
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
 
          <div style={{ fontSize: 11, letterSpacing: ".5px", color: "#9499b5", fontWeight: 700, textAlign: "center", margin: "30px 0 12px" }}>
            TRUSTED BY CLIENTS LIKE
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {["AAA Mobile Tyres", "Door Doctor", "HVAC Services Team"].map((c) => (
              <span key={c} style={{ border: `1px solid ${BRAND.line}`, borderRadius: 8, padding: "9px 16px", fontSize: 13, color: BRAND.ink }}>{c}</span>
            ))}
          </div>
          <p style={{ fontSize: 12, color: BRAND.muted, textAlign: "center", marginTop: 16, fontStyle: "italic" }}>
            Law firm case studies coming soon &mdash; the same local-SEO playbook applies to legal.
          </p>
        </div>
      </section>
 
      {/* 10 — RESEARCH (E-E-A-T) */}
      <section style={{ background: BRAND.greenSoft, padding: "56px 0" }}>
        <div style={{ ...container, maxWidth: 760 }}>
          <div style={{ fontSize: 11, letterSpacing: ".5px", color: "#0f6e56", fontWeight: 700, marginBottom: 8 }}>SEARCHPREX RESEARCH</div>
          <h2 style={h2}>Family law SEO in Kansas &mdash; 2026 study</h2>
          <p style={{ fontSize: 15, color: "#1a4a3c", lineHeight: 1.7, margin: "0 0 20px" }}>
            Our own analysis of how Wichita family law firms appear in local search: keyword demand,
            map-pack competition, and the content gaps competitors leave open.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 18 }}>
            {[
              ["Local intent dominates", "Most \u201cdivorce\u201d and \u201cinjury lawyer\u201d searches in Wichita carry strong, ready-to-hire local intent."],
              ["The map pack wins clicks", "For legal queries, Google\u2019s local map pack captures the bulk of clicks before the blue links."],
              ["A schema gap to exploit", "Many Wichita firms still skip proper legal schema \u2014 a structural edge for firms that don\u2019t."],
            ].map(([t, d]) => (
              <div key={t} className="spx-hover" style={{ background: "#fff", border: "1px solid #c7e6da", borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f6e56", marginBottom: 5 }}>{t}</div>
                <div style={{ fontSize: 13, color: "#3a6b5c", lineHeight: 1.55 }}>{d}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "#3a6b5c", fontStyle: "italic" }}>In-depth Wichita data study coming soon.</div>
        </div>
      </section>
 
      {/* 11 — LOCAL GUIDE */}
      <section style={{ padding: "56px 0" }}>
        <div style={{ ...container, maxWidth: 760 }}>
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
 
      {/* 13 — AUTHOR (E-E-A-T) */}
      <section style={{ background: BRAND.navy, padding: "44px 0" }}>
        <div style={{ ...container, maxWidth: 760 }}>
          <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
            {/* Default = clean initials avatar (never breaks). To use the real photo:
                drop it in /public (e.g. mubashar-shahzad.jpg), then replace this <div>
                with: <img src="/mubashar-shahzad.jpg" alt="Mubashar Shahzad, Founder of SearchPrex"
                width={72} height={72} style={{ width:72, height:72, borderRadius:"50%",
                objectFit:"cover", border:`3px solid ${BRAND.green}`, flexShrink:0 }} /> */}
            <div
              aria-hidden="true"
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: BRAND.purple,
                border: `3px solid ${BRAND.green}`,
                color: "#fff",
                fontSize: 22,
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              MS
            </div>
            <div style={{ flex: 1, minWidth: 240 }}>
              <span style={{ display: "inline-block", background: "#1c2547", color: "#3eb489", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 999, marginBottom: 7, letterSpacing: ".3px" }}>✓ CERTIFIED SEO EXPERT</span>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>Mubashar Shahzad</div>
              <div style={{ fontSize: 12.5, color: "#9aa0c4", marginTop: 3, lineHeight: 1.5 }}>Founder, SearchPrex · 4+ years in large-scale &amp; local SEO · Semrush + HubSpot certified</div>
              <p style={{ fontSize: 13.5, color: "#c3c7df", lineHeight: 1.6, margin: "10px 0 0" }}>
                Mubashar founded SearchPrex to give local businesses founder-led SEO &mdash; no juniors,
                no fluff. His work focuses on the fundamentals that move rankings: technical health,
                genuinely helpful content, and local relevance, built on measurable data.
              </p>
              <div style={{ marginTop: 12 }}>
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" style={{ color: "#7f77dd", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>LinkedIn &rarr;</a>
              </div>
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
          Book on Calendly &rarr;
        </a>
        <div style={{ fontSize: 12, color: "#d6efe6", marginTop: 14 }}>Free 30-min call · No commitment · Reply within 24 hours</div>
      </section>
    </main>
  );
}
 
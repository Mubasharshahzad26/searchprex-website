
"use client";
 
// components/wichita/AiFinderHero.tsx
//
// Production hero for /locations/kansas/wichita with the live AI SEO Package Finder.
// Calls the SECURE server route /api/seo-finder — never api.anthropic.com directly.
//
// Setup:
//   npm i lucide-react
//   Requires app/api/seo-finder/route.ts (provided separately).
//
// Note: fonts are loaded via a <style> @import for copy-paste simplicity.
// For best performance, move Fraunces + Plus Jakarta Sans to next/font in app/layout.tsx.
 
import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Stethoscope,
  AlertCircle,
  Star,
} from "lucide-react";
 
const BRAND = {
  purple: "#534AB7",
  purpleDark: "#3C3489",
  purpleSoft: "#EEEDFE",
  green: "#2f9670",
  navy: "#0a0f2e",
  ink: "#1b2140",
  muted: "#6b7090",
  line: "#e7e9f1",
  bg: "#eaecf3",
};
 
const EXAMPLES = [
  "New family law firm, not ranking yet",
  "Competitors outrank us for 'car accident lawyer Wichita'",
  "Lots of traffic, very few case inquiries",
];
 
const LOADING_MSGS = [
  "Analyzing your firm…",
  "Mapping Wichita demand…",
  "Matching your package…",
  "Calculating quick wins…",
];
 
const CALENDLY = "https://calendly.com/contact-searchprex/30min";
 
type Result = {
  headline: string;
  diagnosis: string;
  recommendedPackage: string;
  priceRange: string;
  whyThisPackage: string;
  quickWins: string[];
  timeline: string;
};
 
export default function AiFinderHero() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [msgIdx, setMsgIdx] = useState(0);
  const taRef = useRef<HTMLTextAreaElement | null>(null);
 
  useEffect(() => {
    if (!loading) return;
    const id = setInterval(
      () => setMsgIdx((i) => (i + 1) % LOADING_MSGS.length),
      1300
    );
    return () => clearInterval(id);
  }, [loading]);
 
  async function analyze(text?: string) {
    const q = (text ?? input).trim();
    if (!q || loading) return;
    setLoading(true);
    setError("");
    setResult(null);
    setMsgIdx(0);
    try {
      const res = await fetch("/api/seo-finder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem: q }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setResult(data as Result);
      }
    } catch {
      setError("Couldn't reach the analyzer — please try again.");
    } finally {
      setLoading(false);
    }
  }
 
  function useExample(ex: string) {
    setInput(ex);
    if (taRef.current) taRef.current.value = ex;
    analyze(ex);
  }
 
  return (
    <div
      style={{
        fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
        background: BRAND.bg,
        color: BRAND.ink,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes spx-spin { to { transform: rotate(360deg); } }
        @keyframes spx-up { from { opacity:0; transform: translateY(14px);} to {opacity:1; transform:none;} }
        @keyframes spx-dot { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.5);opacity:.5} }
        .spx-grid { display:grid; grid-template-columns:1.1fr .9fr; gap:34px; align-items:center; }
        .spx-rise { animation: spx-up .6s cubic-bezier(.2,.7,.3,1) both; }
        .spx-d1{animation-delay:.05s}.spx-d2{animation-delay:.13s}.spx-d3{animation-delay:.21s}.spx-d4{animation-delay:.29s}.spx-d5{animation-delay:.37s}
        .spx-chip{cursor:pointer;transition:all .15s;}
        .spx-chip:hover{border-color:${BRAND.purple} !important;color:${BRAND.purple} !important;background:${BRAND.purpleSoft} !important;}
        .spx-cta{transition:transform .15s, background .2s; cursor:pointer;}
        .spx-cta:hover{background:${BRAND.purpleDark} !important; transform:translateY(-1px);}
        .spx-ta:focus{outline:none;border-color:${BRAND.purple} !important;box-shadow:0 0 0 3px rgba(83,74,183,.13);}
        .spx-link{cursor:pointer}
        .spx-link:hover{text-decoration:underline}
        @media(max-width:880px){ .spx-grid{grid-template-columns:1fr; gap:24px;} .spx-h1{font-size:38px !important;} }
      `}</style>
 
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -120,
          right: -80,
          width: 360,
          height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(83,74,183,.10), rgba(83,74,183,0) 70%)",
          pointerEvents: "none",
        }}
      />
 
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "44px 26px 52px",
          position: "relative",
        }}
      >
        <div className="spx-grid">
          {/* LEFT */}
          <div>
            <div
              className="spx-rise spx-d1"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#fff",
                borderRadius: 999,
                padding: "7px 14px",
                fontSize: 11.5,
                fontWeight: 700,
                color: BRAND.green,
                letterSpacing: ".4px",
                marginBottom: 18,
                boxShadow: "0 2px 10px rgba(10,15,46,.05)",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: BRAND.green,
                  display: "inline-block",
                  animation: "spx-dot 1.6s ease-in-out infinite",
                }}
              />
              FOUNDER-LED SEO · NO JUNIORS · NO FLUFF
            </div>
 
            <h1
              className="spx-h1 spx-rise spx-d2"
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 50,
                fontWeight: 600,
                lineHeight: 1.0,
                letterSpacing: "-1.5px",
                color: BRAND.navy,
                margin: "0 0 16px",
              }}
            >
              Win more cases
              <br />
              in{" "}
              <span style={{ position: "relative", color: BRAND.purple }}>
                Wichita.
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: 4,
                    width: "100%",
                    height: 7,
                    background: "rgba(62,180,137,.32)",
                    zIndex: -1,
                    borderRadius: 2,
                  }}
                />
              </span>
            </h1>
 
            <p
              className="spx-rise spx-d3"
              style={{
                fontSize: 16,
                color: BRAND.muted,
                maxWidth: 400,
                margin: "0 0 22px",
                lineHeight: 1.6,
              }}
            >
              We help Wichita law firms dominate Google Maps and local search —
              more calls, more consults, more clients.
            </p>
 
            <div
              className="spx-rise spx-d4"
              style={{ display: "flex", gap: 22, marginBottom: 20 }}
            >
              {[
                ["Top 3", "map-pack results"],
                ["24hr", "reply time"],
                ["$0", "to get started"],
              ].map(([n, l], i) => (
                <div
                  key={i}
                  style={{
                    paddingLeft: i ? 22 : 0,
                    borderLeft: i ? `1px solid #d3d6e2` : "none",
                  }}
                >
                  <div
                    style={{ fontSize: 22, fontWeight: 800, color: BRAND.navy }}
                  >
                    {n}
                  </div>
                  <div style={{ fontSize: 11.5, color: BRAND.muted }}>{l}</div>
                </div>
              ))}
            </div>
 
            <div
              className="spx-rise spx-d5"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                fontSize: 13,
                color: BRAND.green,
                fontWeight: 500,
              }}
            >
              <CheckCircle2 size={16} /> Free 30-min call · No commitment · No
              contracts
            </div>
 
            <div
              className="spx-rise spx-d5"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                marginTop: 18,
              }}
            >
              <a
                href="/case-studies"
                className="spx-link"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: BRAND.purple,
                  textDecoration: "none",
                }}
              >
                View case studies <ArrowRight size={15} />
              </a>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="spx-link"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: BRAND.muted,
                  textDecoration: "none",
                }}
              >
                Book a call directly <ArrowRight size={15} />
              </a>
            </div>
          </div>
 
          {/* RIGHT — AI finder card */}
          <div
            className="spx-rise spx-d3"
            style={{
              background: "#fff",
              borderRadius: 18,
              padding: 18,
              border: `1px solid ${BRAND.line}`,
              boxShadow: "0 18px 50px rgba(10,15,46,.14)",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -11,
                right: 18,
                background: BRAND.purple,
                color: "#fff",
                fontSize: 10,
                fontWeight: 700,
                padding: "5px 12px",
                borderRadius: 999,
                letterSpacing: ".3px",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Sparkles size={11} /> LIVE AI STRATEGIST
            </div>
 
            {!result && (
              <>
                <div
                  style={{
                    fontSize: 10.5,
                    fontWeight: 700,
                    color: BRAND.purple,
                    letterSpacing: ".4px",
                    marginBottom: 6,
                  }}
                >
                  FREE · 60-SECOND CHECK
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    lineHeight: 1.25,
                    color: BRAND.navy,
                    marginBottom: 13,
                  }}
                >
                  What&apos;s holding your firm back online?
                </div>
 
                <textarea
                  ref={taRef}
                  className="spx-ta"
                  defaultValue={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe your challenge in plain words…"
                  rows={2}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    border: `1px solid ${BRAND.line}`,
                    borderRadius: 11,
                    padding: "11px 12px",
                    fontSize: 14,
                    fontFamily: "inherit",
                    color: BRAND.ink,
                    resize: "none",
                    lineHeight: 1.5,
                  }}
                />
 
                <button
                  className="spx-cta"
                  onClick={() => analyze()}
                  disabled={loading}
                  style={{
                    width: "100%",
                    marginTop: 10,
                    background: loading ? "#9b95d6" : BRAND.purple,
                    color: "#fff",
                    border: "none",
                    padding: "12px",
                    borderRadius: 11,
                    fontSize: 14.5,
                    fontWeight: 700,
                    fontFamily: "inherit",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  {loading ? (
                    <>
                      <span
                        style={{
                          width: 15,
                          height: 15,
                          border: "2px solid rgba(255,255,255,.4)",
                          borderTopColor: "#fff",
                          borderRadius: "50%",
                          display: "inline-block",
                          animation: "spx-spin .7s linear infinite",
                        }}
                      />
                      {LOADING_MSGS[msgIdx]}
                    </>
                  ) : (
                    <>
                      Get my free diagnosis <ArrowRight size={16} />
                    </>
                  )}
                </button>
 
                {!loading && (
                  <div style={{ marginTop: 12 }}>
                    <div
                      style={{
                        fontSize: 11,
                        color: BRAND.muted,
                        marginBottom: 7,
                      }}
                    >
                      Or try:
                    </div>
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
                    >
                      {EXAMPLES.map((ex, i) => (
                        <button
                          key={i}
                          className="spx-chip"
                          onClick={() => useExample(ex)}
                          style={{
                            background: "#fff",
                            border: `1px solid ${BRAND.line}`,
                            color: BRAND.ink,
                            fontSize: 11.5,
                            padding: "6px 11px",
                            borderRadius: 999,
                            fontFamily: "inherit",
                            textAlign: "left",
                          }}
                        >
                          {ex}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
 
                <div
                  style={{
                    borderTop: `1px solid #eceef4`,
                    marginTop: 14,
                    paddingTop: 11,
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                  }}
                >
                  <span style={{ display: "flex", gap: 1 }}>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} size={11} fill="#f5a623" color="#f5a623" />
                    ))}
                  </span>
                  <span style={{ fontSize: 10.5, color: BRAND.muted }}>
                    Trusted by local businesses across the US
                  </span>
                </div>
              </>
            )}
 
            {error && !result && (
              <div
                style={{
                  marginTop: 12,
                  display: "flex",
                  gap: 8,
                  alignItems: "flex-start",
                  background: "#fcebeb",
                  border: "1px solid #f7c1c1",
                  color: "#a32d2d",
                  padding: "11px 13px",
                  borderRadius: 11,
                  fontSize: 13,
                }}
              >
                <AlertCircle
                  size={16}
                  style={{ flexShrink: 0, marginTop: 1 }}
                />
                {error}
              </div>
            )}
 
            {result && (
              <div className="spx-rise">
                <div
                  style={{
                    display: "flex",
                    gap: 9,
                    alignItems: "flex-start",
                    marginBottom: 11,
                  }}
                >
                  <div
                    style={{
                      background: BRAND.purpleSoft,
                      color: BRAND.purple,
                      width: 32,
                      height: 32,
                      borderRadius: 9,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Stethoscope size={17} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: 17,
                      fontWeight: 600,
                      color: BRAND.navy,
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {result.headline}
                  </h3>
                </div>
                <p
                  style={{
                    fontSize: 13.5,
                    color: BRAND.ink,
                    lineHeight: 1.6,
                    margin: "0 0 13px",
                  }}
                >
                  {result.diagnosis}
                </p>
 
                <div
                  style={{
                    background: BRAND.navy,
                    borderRadius: 11,
                    padding: "13px 15px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 13,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 10,
                        color: "#7f77dd",
                        fontWeight: 700,
                        letterSpacing: ".3px",
                        marginBottom: 2,
                      }}
                    >
                      RECOMMENDED
                    </div>
                    <div
                      style={{
                        fontSize: 13.5,
                        color: "#fff",
                        fontWeight: 700,
                      }}
                    >
                      {result.recommendedPackage}
                    </div>
                  </div>
                  <div
                    style={{
                      background: BRAND.green,
                      color: "#fff",
                      fontSize: 13.5,
                      fontWeight: 700,
                      padding: "7px 12px",
                      borderRadius: 9,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {result.priceRange}
                  </div>
                </div>
 
                <p
                  style={{
                    fontSize: 13,
                    color: BRAND.muted,
                    lineHeight: 1.6,
                    margin: "0 0 13px",
                  }}
                >
                  {result.whyThisPackage}
                </p>
 
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 7,
                    marginBottom: 13,
                  }}
                >
                  {(result.quickWins || []).map((w, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: 8,
                        alignItems: "flex-start",
                      }}
                    >
                      <CheckCircle2
                        size={15}
                        style={{
                          color: BRAND.green,
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 13,
                          color: BRAND.ink,
                          lineHeight: 1.5,
                        }}
                      >
                        {w}
                      </span>
                    </div>
                  ))}
                </div>
 
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="spx-cta"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 7,
                    background: BRAND.purple,
                    color: "#fff",
                    textDecoration: "none",
                    padding: "12px",
                    borderRadius: 11,
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  Book a free strategy call <ArrowRight size={15} />
                </a>
 
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 11,
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: 11.5,
                      color: BRAND.muted,
                    }}
                  >
                    <Clock size={13} /> Movement in {result.timeline}
                  </span>
                  <span
                    className="spx-link"
                    onClick={() => {
                      setResult(null);
                      setInput("");
                      if (taRef.current) taRef.current.value = "";
                    }}
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: BRAND.purple,
                    }}
                  >
                    Try another →
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
 
      {/* Verified & listed on strip */}
      <div style={{ background: "#fff", borderTop: `1px solid ${BRAND.line}` }}>
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            padding: "16px 26px",
            display: "flex",
            alignItems: "center",
            gap: 18,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: ".6px",
              color: "#9499b5",
              whiteSpace: "nowrap",
            }}
          >
            VERIFIED &amp; LISTED ON
          </span>
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: 8, flex: 1 }}
          >
            {[
              "Trustpilot",
              "Clutch",
              "BBB",
              "G2",
              "GoodFirms",
              "Crunchbase",
              "DesignRush",
              "LinkedIn",
            ].map((name) => (
              <span
                key={name}
                style={{
                  border: `1px solid ${BRAND.line}`,
                  borderRadius: 8,
                  padding: "7px 13px",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#7a7f9c",
                  background: "#fcfcfd",
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
 
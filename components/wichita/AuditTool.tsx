
"use client";
 
// components/wichita/AuditTool.tsx
//
// Honest lead-capture: captures website + email, then your team sends a full audit.
// (No fake "instant" results — that protects trust and E-E-A-T.)
//
// IMPORTANT: This posts to /api/seo-audit. You already have that route — just make sure
// it accepts { website, email, source }. If your route expects a different shape,
// change the body below to match it (or point to /api/leads instead).
 
import React, { useState } from "react";
import { Search, CheckCircle2, AlertCircle } from "lucide-react";
 
const BRAND = {
  purple: "#534AB7",
  purpleDark: "#3C3489",
  green: "#2f9670",
  navy: "#0a0f2e",
  ink: "#1b2140",
  muted: "#6b7090",
  line: "#e7e9f1",
};
 
export default function AuditTool() {
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState("");
 
  async function submit() {
    if (status === "loading") return;
    if (!website.trim()) return setError("Please enter your website.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Please enter a valid email.");
    setError("");
    setStatus("loading");
    try {
      const res = await fetch("/api/seo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          website: website.trim(),
          email: email.trim(),
          source: "wichita-law-firm-page",
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again or email us directly.");
    }
  }
 
  return (
    <section
      style={{
        background: "#f7f8fb",
        padding: "56px 26px",
        borderTop: `1px solid #eceef4`,
        fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
        <div
          style={{
            display: "inline-block",
            color: BRAND.purple,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: ".4px",
            marginBottom: 12,
          }}
        >
          FREE WEBSITE AUDIT
        </div>
        <h2
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: BRAND.navy,
            margin: "0 0 8px",
            letterSpacing: "-0.5px",
          }}
        >
          Check your firm&apos;s SEO health
        </h2>
        <p style={{ fontSize: 14.5, color: BRAND.muted, margin: "0 0 24px" }}>
          Enter your site and we&apos;ll send a full breakdown — speed, mobile,
          schema, indexing, and your Google Business Profile — within 24 hours.
        </p>
 
        {status !== "done" ? (
          <div
            style={{
              background: "#fff",
              border: `1px solid ${BRAND.line}`,
              borderRadius: 14,
              padding: 18,
              textAlign: "left",
              boxShadow: "0 4px 22px rgba(10,15,46,.05)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="yourlawfirm.com"
                aria-label="Your website"
                style={{
                  border: `1px solid ${BRAND.line}`,
                  borderRadius: 9,
                  padding: "11px 13px",
                  fontSize: 14,
                  color: BRAND.ink,
                  fontFamily: "inherit",
                }}
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@firm.com"
                aria-label="Your email"
                type="email"
                style={{
                  border: `1px solid ${BRAND.line}`,
                  borderRadius: 9,
                  padding: "11px 13px",
                  fontSize: 14,
                  color: BRAND.ink,
                  fontFamily: "inherit",
                }}
              />
              <button
                onClick={submit}
                disabled={status === "loading"}
                style={{
                  background: status === "loading" ? "#9b95d6" : BRAND.purple,
                  color: "#fff",
                  border: "none",
                  padding: "12px",
                  borderRadius: 9,
                  fontSize: 14.5,
                  fontWeight: 700,
                  cursor: status === "loading" ? "default" : "pointer",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <Search size={16} />
                {status === "loading" ? "Sending…" : "Get my free audit"}
              </button>
            </div>
            {error && (
              <div
                style={{
                  display: "flex",
                  gap: 7,
                  alignItems: "center",
                  color: "#a32d2d",
                  fontSize: 13,
                  marginTop: 11,
                }}
              >
                <AlertCircle size={15} /> {error}
              </div>
            )}
            <div
              style={{
                fontSize: 11.5,
                color: BRAND.muted,
                textAlign: "center",
                marginTop: 11,
              }}
            >
              Free · No commitment · Reply within 24 hours
            </div>
          </div>
        ) : (
          <div
            style={{
              background: "#e1f5ee",
              border: "1px solid #b6e2d2",
              borderRadius: 14,
              padding: "26px 22px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            <CheckCircle2 size={34} color={BRAND.green} />
            <div style={{ fontSize: 17, fontWeight: 700, color: "#0f6e56" }}>
              You&apos;re all set!
            </div>
            <div style={{ fontSize: 14, color: "#1a4a3c", lineHeight: 1.5 }}>
              We&apos;ll review {website.trim()} and send your full audit within 24
              hours.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

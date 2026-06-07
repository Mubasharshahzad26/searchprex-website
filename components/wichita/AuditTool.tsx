"use client";
 
// components/wichita/AuditTool.tsx
//
// Lead-capture that posts to your existing /api/seo-audit route (Resend-powered).
// Sends the exact shape that route expects:
//   { businessType, fullName, email, websiteUrl, phone, problems }
 
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
  const [fullName, setFullName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState("");
 
  async function submit() {
    if (status === "loading") return;
    if (!fullName.trim()) return setError("Please enter your name.");
    if (!websiteUrl.trim()) return setError("Please enter your website.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Please enter a valid email.");
    setError("");
    setStatus("loading");
    try {
      const res = await fetch("/api/seo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessType: "Law Firm",
          fullName: fullName.trim(),
          email: email.trim(),
          websiteUrl: websiteUrl.trim(),
          phone: "",
          problems: ["Requested via Wichita law firm SEO page"],
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed");
      }
      setStatus("done");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again or email contact@searchprex.com.");
    }
  }
 
  const inputStyle = {
    border: `1px solid ${BRAND.line}`,
    borderRadius: 9,
    padding: "11px 13px",
    fontSize: 14,
    color: BRAND.ink,
    fontFamily: "inherit",
    width: "100%",
    boxSizing: "border-box" as const,
  };
 
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
          Enter your details and the founder will personally send a full breakdown
          — speed, mobile, schema, indexing, and your Google Business Profile —
          within 24 hours.
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
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your name"
                aria-label="Your name"
                style={inputStyle}
              />
              <input
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="yourlawfirm.com"
                aria-label="Your website"
                style={inputStyle}
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@firm.com"
                aria-label="Your email"
                type="email"
                style={inputStyle}
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
              We&apos;ll review {websiteUrl.trim()} and send your full audit within
              24 hours. Check your inbox for a confirmation.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
 
"use client";

import React, { useEffect, useState } from "react";
import TurnstileWidget from "@/components/security/TurnstileWidget";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || "";
const SESSION_FLAG = "sp_human_verified_until";

/**
 * Mounted once in root layout. When Turnstile keys are configured, runs an
 * `interaction-only` Turnstile check once per browser session and exchanges the
 * token for an HttpOnly HMAC-signed cookie (`searchprex_human`) so all forms
 * and tools on the site work seamlessly for real visitors while blocking bots.
 */
export default function HumanVerificationBridge() {
  const [shouldVerify, setShouldVerify] = useState(false);

  useEffect(() => {
    if (!SITE_KEY) return;
    try {
      const until = Number(sessionStorage.getItem(SESSION_FLAG) || "0");
      if (!Number.isFinite(until) || until <= Date.now()) {
        setShouldVerify(true);
      }
    } catch {
      setShouldVerify(true);
    }
  }, []);

  if (!SITE_KEY || !shouldVerify) return null;

  const handleToken = async (token: string) => {
    if (!token) return;
    try {
      const res = await fetch("/api/security/verify-human", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (res.ok) {
        try {
          // Refresh before the 2h HttpOnly cookie expires
          sessionStorage.setItem(SESSION_FLAG, String(Date.now() + 90 * 60 * 1000));
        } catch {
          // ignore storage unavailability
        }
        setShouldVerify(false);
      }
    } catch {
      // keep silent; per-form TurnstileWidget still handles direct submissions
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <TurnstileWidget
        onToken={handleToken}
        appearance="interaction-only"
        size="compact"
        theme="light"
      />
    </div>
  );
}

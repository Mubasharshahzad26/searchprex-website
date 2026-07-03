"use client";
import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import Link from "next/link";

const CONSENT_KEY = "searchprex_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      // Small delay so it doesn't flash immediately on page load
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
    // Enable analytics/tracking here if you gate them behind consent
    window.dispatchEvent(new Event("cookie-consent-accepted"));
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] border-t border-[#e6e7eb] bg-white px-4 py-5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Cookie className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#3eb489]" />
          <p className="text-sm leading-relaxed text-[#475569]">
            We use cookies to improve your experience and analyze site traffic.
            By clicking &quot;Accept&quot;, you agree to our use of cookies. Read our{" "}
            <Link href="/privacy" className="font-semibold text-[#191a1f] underline underline-offset-2">
              Privacy Policy
            </Link>{" "}
            to learn more.
          </p>
        </div>
        <div className="flex flex-shrink-0 items-center gap-3">
          <button
            onClick={handleReject}
            className="rounded-full border border-[#e6e7eb] px-5 py-2.5 text-sm font-semibold text-[#475569] transition-all hover:bg-[#f7f7f8]"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            className="rounded-full bg-[#191a1f] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="rounded-full p-2 text-[#94a3b8] transition-colors hover:bg-[#f7f7f8] hover:text-[#191a1f] sm:hidden"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
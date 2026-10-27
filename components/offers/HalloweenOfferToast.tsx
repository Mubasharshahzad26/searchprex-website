"use client";

// A small dismissible card in the bottom-left corner on desktop while the
// Halloween offer runs. Fixed-position, so it never moves the page (no CLS),
// and on the left, clear of the chat and WhatsApp buttons on the right and
// of the article share rail on the left edge. Not on
// mobile, where the bottom of the screen is already taken; mobile readers see
// the inline offer card on the local SEO pages. Kept off the law firm pages
// (their buyers have their own offer) and off the offer page itself.

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { isHalloweenOfferLive, HALLOWEEN_OFFER_PATH } from "@/lib/halloween-offer";

const DISMISS_KEY = "spx_halloween_2026_dismissed";
const HIDDEN_ON = ["/offers/", "/locations/", "/services/law-firm-seo", "/law-firm-scorecard", "/content-admin", "/dashboard", "/free-audit"];

export default function HalloweenOfferToast() {
  const pathname = usePathname() || "";
  const [show, setShow] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try { dismissed = window.localStorage.getItem(DISMISS_KEY) === "1"; } catch { /* storage blocked */ }
    // Pages that already carry the inline offer card don't need it twice.
    const hasCard = !!document.getElementById("halloween-offer-title");
    setShow(isHalloweenOfferLive() && !dismissed && !hasCard);
  }, [pathname]);

  if (!show || HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;

  function dismiss() {
    setShow(false);
    try { window.localStorage.setItem(DISMISS_KEY, "1"); } catch { /* not essential */ }
  }

  return (
    <aside
      aria-label="Halloween offer"
      className="fixed bottom-6 left-16 z-40 hidden w-72 rounded-2xl border border-neutral-900 bg-white p-4 pr-9 shadow-xl lg:block print:hidden"
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss the Halloween offer"
        className="absolute right-2 top-2 rounded p-1 text-slate-400 hover:text-neutral-900"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
      <p className="text-[11px] font-bold uppercase tracking-wider text-orange-700">
        <span aria-hidden="true">🎃 </span>Halloween · until Oct 31
      </p>
      <p className="mt-1 text-sm font-black leading-snug text-neutral-950">
        Free Google Business Profile Fright Check
      </p>
      <p className="mt-1 text-xs leading-relaxed text-slate-600">
        Seven things that scare customers off your profile, checked by the founder. Report in 24 hours.
      </p>
      <a
        href={HALLOWEEN_OFFER_PATH}
        className="mt-3 inline-flex rounded-lg bg-neutral-900 px-3 py-2 text-xs font-bold text-white hover:bg-neutral-800"
      >
        Claim my free check →
      </a>
    </aside>
  );
}

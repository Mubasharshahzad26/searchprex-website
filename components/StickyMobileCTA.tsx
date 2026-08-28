"use client";

// components/StickyMobileCTA.tsx
// Persistent conversion action on small screens.
//
// The header CTA is `hidden … lg:flex` — desktop only. On a phone, once the
// hero scrolled away the only way to convert was to hunt for a form or reopen
// the hamburger menu. Most of this traffic is mobile, so that was a large,
// quiet leak.
//
// Deliberately rect-based rather than IntersectionObserver: this needs to work
// in embedded webviews and preview panes where IO callbacks can be starved,
// and rAF-throttled rect reads on scroll are cheap enough at this frequency.

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { OFFER_HREF, OFFER_CTA_SHORT } from "@/lib/offer";

/**
 * The visibility rule, as a pure function so it can be reasoned about and
 * tested without a scroll environment.
 *
 * Show the bar only when BOTH are true:
 *  - the hero has scrolled fully past (so the bar never covers the hero's own
 *    CTA, which is a better-converting, larger target)
 *  - the lead form is not on screen (so the bar isn't competing with the very
 *    thing it points at)
 */
export function shouldShowStickyCTA(
  hero: { bottom: number } | null,
  form: { top: number; bottom: number } | null,
  viewportHeight: number
): boolean {
  const heroPassed = hero ? hero.bottom <= 0 : true;
  const formOnScreen = form ? form.top < viewportHeight && form.bottom > 0 : false;
  return heroPassed && !formOnScreen;
}

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const hero = document.getElementById("hero");
      const form = document.getElementById("free-audit-form");
      setVisible(
        shouldShowStickyCTA(
          hero ? hero.getBoundingClientRect() : null,
          form ? form.getBoundingClientRect() : null,
          window.innerHeight
        )
      );
    };

    // Coalesce bursts of scroll events into one read per frame.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[#e9ecf5] bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-4px_20px_rgba(10,15,46,0.08)] backdrop-blur-md transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      // Keep it out of the tab order and off screen readers while hidden,
      // otherwise keyboard users tab into an invisible button. React 19 takes
      // `inert` as a real boolean — passing "" makes React treat it as false.
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-black text-[#0a0f2e]">Free Competitor Tear-Down</p>
          <p className="truncate text-xs text-[#5b6472]">Market exclusivity in your city</p>
        </div>
        <Link
          href={OFFER_HREF}
          tabIndex={visible ? undefined : -1}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#534AB7] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#3C3489]"
        >
          {OFFER_CTA_SHORT} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

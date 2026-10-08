"use client";

// components/ArticleExitOffer.tsx
//
// The one interruption allowed on an article, and only on the way out.
//
// WHY THIS EXISTS, AND WHY ONLY HERE
//
// An article already carries three asks — the sidebar card, the mid-article banner and the
// closing block. A fourth would normally split attention rather than add to it. This one is
// different because it fires at a moment the other three cannot reach: the reader who got
// what they came for and is leaving without scrolling to any of them.
//
// It is not on the home page, deliberately. The pattern works for BrightLocal because their
// modal sits on a resource page listing a hundred citation sites, at the moment the reader is
// weighing up doing all that by hand — the offer answers the thought they are already having.
// A home-page visitor has not had that thought yet, so the same modal is only an obstacle.
//
// WHAT IT WILL NOT DO
//
//   - Never on arrival. It needs real engagement first (time on page and depth), so it can
//     never be the thing a visitor from search lands on. That is both the decent behaviour
//     and what keeps the page clear of Google's intrusive-interstitial treatment, which
//     matters more than usual on an SEO agency's own site.
//   - Never a full-screen cover on a phone. Touch gets a bottom sheet that leaves the article
//     visible and is dismissed by tapping away from it.
//   - Never twice. Once per reader per 30 days, and never at all to someone who has already
//     submitted the form anywhere on the site.
//   - Never mid-sentence on desktop: exit intent means the pointer has actually left for the
//     browser chrome, not that it drifted upward inside the page.
//
// It reuses the same hook, the same /api/send-audit call and the same success and error
// states as the inline placements. One pipeline, proven in production, is worth more than a
// second one written for a modal.

import { useCallback, useEffect, useRef, useState } from "react";
import { X, Globe, Mail } from "lucide-react";

import {
  BODY,
  ErrorState,
  GREEN,
  INK,
  LEAD_DONE_KEY,
  LINE,
  SuccessState,
  useLeadForm,
} from "@/components/ArticleLeadMagnet";

/** Remembers that this reader has already been shown the offer. */
const SEEN_KEY = "spx_exit_offer_seen";
/** How long that memory lasts. A month is long enough not to nag, short enough to catch a return visit months later. */
const SEEN_FOR_MS = 30 * 24 * 60 * 60 * 1000;
/** No offer before the reader has actually read something. */
const MIN_DWELL_MS = 30_000;
/** Desktop exit intent still requires the reader to have got somewhere in the article. */
const MIN_SCROLL_FOR_EXIT = 0.25;
/** On touch there is no exit intent, so depth is the only honest signal that the piece was read. */
const SCROLL_TRIGGER = 0.7;

/** Storage is unavailable in private windows and with cookies blocked; none of this is worth throwing over. */
function readFlag(key: string): number | null {
  try {
    const v = window.localStorage.getItem(key);
    return v ? Number(v) : null;
  } catch {
    return null;
  }
}
function writeFlag(key: string) {
  try {
    window.localStorage.setItem(key, String(Date.now()));
  } catch {
    /* not essential */
  }
}

export default function ArticleExitOffer({
  source,
  headline,
  sub,
}: {
  source: string;
  /** Speaks to what the reader just read. The offer and the form never change. */
  headline?: string;
  sub?: string;
}) {
  const [open, setOpen] = useState(false);
  const { website, setWebsite, email, setEmail, status, submit } = useLeadForm(source);

  //  Kept in a ref so the listeners below never need re-binding when it changes.
  const firedRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);

  const show = useCallback(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    restoreFocusTo.current = (document.activeElement as HTMLElement) ?? null;
    writeFlag(SEEN_KEY);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    restoreFocusTo.current?.focus?.();
  }, []);

  useEffect(() => {
    //  Someone who already asked for the tear-down is not asked again, on any article.
    if (readFlag(LEAD_DONE_KEY)) return;
    const seen = readFlag(SEEN_KEY);
    if (seen && Date.now() - seen < SEEN_FOR_MS) return;

    const mountedAt = Date.now();
    const readEnough = () => Date.now() - mountedAt >= MIN_DWELL_MS;
    const depth = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      return scrollable > 0 ? window.scrollY / scrollable : 0;
    };

    //  Touch devices have no pointer to leave the window, and a cover sheet on arrival is
    //  exactly what should not happen on a phone, so depth is the only trigger there.
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    const onScroll = () => {
      if (readEnough() && depth() >= SCROLL_TRIGGER) show();
    };

    //  Exit intent: the pointer has left through the top of the viewport, towards the tabs
    //  and the back button. relatedTarget being null distinguishes leaving the window from
    //  moving between elements inside it.
    const onMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget || (e as MouseEvent & { toElement?: unknown }).toElement) return;
      if (e.clientY > 0) return;
      if (!readEnough() || depth() < MIN_SCROLL_FOR_EXIT) return;
      show();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    if (!isTouch) document.addEventListener("mouseout", onMouseOut);

    //  A reader who scrolls straight to the end before the dwell is up would otherwise never
    //  be reached: there is nothing left to scroll, so no further scroll event fires and the
    //  depth condition is never re-checked. On a phone, where there is no exit intent to fall
    //  back on, that reader is missed entirely. So the depth is also checked once, the moment
    //  the dwell elapses.
    const dwellCheck = window.setTimeout(() => {
      if (depth() >= SCROLL_TRIGGER) show();
    }, MIN_DWELL_MS + 250);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
      window.clearTimeout(dwellCheck);
    };
  }, [show]);

  //  While it is open: Escape closes it, the page behind does not scroll, and focus starts in
  //  the first field rather than wherever the reader happened to be.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 80);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
    };
  }, [open, close]);

  if (!open) return null;

  const field =
    "w-full rounded-lg border bg-[#f8f9fc] py-3 pl-10 pr-3 text-sm outline-none focus:border-[#1a7d59] focus:ring-2 focus:ring-[#1a7d59]/20";

  return (
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
      onClick={close}
      aria-hidden={false}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-offer-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-t-2xl bg-white p-6 shadow-2xl sm:rounded-2xl sm:p-8 motion-safe:animate-[spxRise_.22s_ease-out]"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="exit-offer-title" className="text-xl font-black leading-snug sm:text-2xl" style={{ color: INK }}>
            {headline ?? "Reading about it is the slow way"}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="-mr-1 -mt-1 rounded-lg p-1.5 text-[#94a3b8] transition-colors hover:bg-[#f1f3f8] hover:text-[#0a0f2e]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-2 text-sm leading-relaxed" style={{ color: BODY }}>
          {sub ??
            "Doing this by hand on your own site takes an afternoon. Give me the URL and I’ll run it myself and send back what I’d fix first — free, within 24 hours."}
        </p>

        {status === "done" ? (
          <div className="mt-5">
            <SuccessState website={website} email={email} />
          </div>
        ) : (
          <form onSubmit={submit} className="mt-5 flex flex-col gap-2.5">
            <div className="relative">
              <Globe className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "#94a3b8" }} aria-hidden="true" />
              <input
                ref={firstFieldRef}
                type="text"
                required
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="yoursite.com"
                aria-label="Your website URL"
                className={field}
                style={{ borderColor: LINE, color: INK }}
              />
            </div>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "#94a3b8" }} aria-hidden="true" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourfirm.com"
                aria-label="Your email address"
                className={field}
                style={{ borderColor: LINE, color: INK }}
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-lg py-3 text-sm font-bold uppercase tracking-wide text-white disabled:opacity-70"
              style={{ background: GREEN }}
            >
              {status === "loading" ? "Sending…" : "Send my tear-down →"}
            </button>
            {status === "error" ? <ErrorState /> : null}
            <button
              type="button"
              onClick={close}
              className="mt-1 text-xs font-semibold underline-offset-2 hover:underline"
              style={{ color: BODY }}
            >
              No thanks, I’ll keep reading
            </button>
          </form>
        )}
      </div>

      <style jsx global>{`
        @keyframes spxRise {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

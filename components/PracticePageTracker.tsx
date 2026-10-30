"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/track";

/** Page-level engagement events for the five law-firm practice pages. */
export default function PracticePageTracker({ practiceArea }: { practiceArea: string }) {
  useEffect(() => {
    let sentScroll = false;
    const onScroll = () => {
      if (sentScroll) return;
      const height = document.documentElement.scrollHeight;
      if (height > 0 && window.scrollY + window.innerHeight >= height * 0.75) {
        sentScroll = true;
        trackEvent("scroll_75", { practice_area: practiceArea });
      }
    };
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-track-event]") : null;
      if (!target) return;
      const eventName = target.dataset.trackEvent;
      if (!eventName) return;
      if (target.dataset.trackOnce === "true") {
        if (target.dataset.trackedOnce === "true") return;
        target.dataset.trackedOnce = "true";
      }
      trackEvent(eventName, { practice_area: practiceArea, source_page: window.location.pathname });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
    };
  }, [practiceArea]);

  return null;
}

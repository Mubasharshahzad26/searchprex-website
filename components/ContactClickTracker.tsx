"use client";

// components/ContactClickTracker.tsx
//
// One document-level listener that reports clicks on contact links — phone,
// WhatsApp, email and Calendly — to GTM as "contact_click". A listener here
// covers every such link on the site (chat widget, sticky mobile bar, footer,
// CTA bands) without touching each component. Renders nothing.

import { useEffect } from "react";
import { trackContactClick } from "@/lib/track";

function methodFor(href: string): string | null {
  if (href.startsWith("tel:")) return "phone";
  if (href.startsWith("mailto:")) return "email";
  if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|(www\.)?whatsapp\.com)\//i.test(href)) return "whatsapp";
  if (/^https?:\/\/(www\.)?calendly\.com\//i.test(href)) return "calendly";
  return null;
}

export default function ContactClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      const method = methodFor(link.getAttribute("href") ?? "");
      if (method) trackContactClick(method);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}

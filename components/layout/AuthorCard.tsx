// components/layout/AuthorCard.tsx
// The author / founder credibility block.
//
// This is an E-E-A-T surface, so it carries Schema.org Person microdata inline
// (itemProp) in addition to whatever JSON-LD the page emits. Legal and finance
// pages are YMYL — Google wants a named, credentialed human attached to the
// advice, and LLM crawlers use exactly this markup to attribute a claim.

import Image from "next/image";
import { Linkedin, BadgeCheck } from "lucide-react";
import { color, focusRing, heading, radius, text } from "@/lib/design-tokens";

export interface AuthorCardProps {
  name: string;
  /** e.g. "Founder & Lead SEO Strategist · 5+ years" */
  role: string;
  /** First-person statement establishing direct experience. */
  quote: string;
  imageSrc: string;
  imageAlt: string;
  linkedinUrl?: string;
  /** Small verification pill next to the name. */
  credential?: string;
  /** Extra credential chips — certifications, memberships. E-E-A-T signals. */
  badges?: string[];
}

export default function AuthorCard({
  name,
  role,
  quote,
  imageSrc,
  imageAlt,
  linkedinUrl,
  credential = "Verified SEO expert",
  badges,
}: AuthorCardProps) {
  return (
    <div
      itemScope
      itemType="https://schema.org/Person"
      className={`${radius.card} border bg-white p-8 sm:flex sm:items-center sm:gap-8`}
      style={{ borderColor: color.border }}
    >
      <div
        className={`relative mx-auto mb-6 h-24 w-24 shrink-0 overflow-hidden ${radius.chip} border sm:mb-0`}
        style={{ borderColor: color.border }}
      >
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover object-top" itemProp="image" />
      </div>

      <div>
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <p className={heading.h4} style={{ color: color.ink }} itemProp="name">
            {name}
          </p>
          <span
            className={`${heading.eyebrow} inline-flex items-center gap-1 ${radius.chip} px-2 py-0.5 text-[10px]`}
            style={{ background: color.primarySoft, color: color.primaryDark }}
          >
            <BadgeCheck className="h-3 w-3" aria-hidden />
            {credential}
          </span>
        </div>

        <p className={`${heading.eyebrow} mb-3`} style={{ color: color.muted }} itemProp="jobTitle">
          {role}
        </p>

        <blockquote className={`${text.small} mb-4`} style={{ color: color.muted }}>
          {quote}
        </blockquote>

        {badges?.length ? (
          <ul className="mb-4 flex flex-wrap gap-2">
            {badges.map((b) => (
              <li
                key={b}
                className={`${radius.chip} border px-2.5 py-1 text-xs font-semibold`}
                style={{ borderColor: color.border, color: color.muted }}
              >
                {b}
              </li>
            ))}
          </ul>
        ) : null}

        {linkedinUrl ? (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            itemProp="sameAs"
            className={`inline-flex items-center gap-2 ${radius.control} border px-3 py-1.5 text-sm font-semibold text-[#0a66c2] transition-colors hover:bg-[#0a66c2] hover:text-white ${focusRing}`}
            style={{ borderColor: color.border }}
          >
            <Linkedin className="h-4 w-4" aria-hidden />
            Connect on LinkedIn
          </a>
        ) : null}
      </div>
    </div>
  );
}

// components/layout/Prose.tsx
// Long-form body copy — legal pages, policy text, article bodies.
//
// Every legal page used to hang its own Tailwind classes on each h2, h3, p and
// ul, which is why the same "Privacy Policy" heading was 2xl on one page and
// 3xl on another. Wrap the content in <Prose> and write plain HTML inside; the
// descendant selectors below do the styling once.
//
// Uses arbitrary-variant selectors rather than @tailwindcss/typography so the
// type scale stays tied to design-tokens instead of a plugin's own scale.

import { color, layout } from "@/lib/design-tokens";

const PROSE = [
  // Headings
  "[&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-[#0a0f2e]",
  "[&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[#0a0f2e]",
  // Body
  "[&_p]:mb-4 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-[#475569]",
  // Lists
  "[&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5",
  "[&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1.5",
  "[&_li]:text-base [&_li]:leading-relaxed [&_li]:text-[#475569]",
  // Inline
  "[&_a]:font-medium [&_a]:text-[#534AB7] [&_a]:underline [&_a]:underline-offset-2",
  "[&_strong]:font-semibold [&_strong]:text-[#0a0f2e]",
  // Tables inside policy text must not push the page sideways on mobile.
  "[&_table]:block [&_table]:w-full [&_table]:overflow-x-auto",
].join(" ");

export interface ProseProps {
  children: React.ReactNode;
  /** Shown under the h1 — e.g. "Last updated: January 2026". */
  meta?: string;
  className?: string;
}

export default function Prose({ children, meta, className = "" }: ProseProps) {
  return (
    <div className={`${layout.containerNarrow} max-w-3xl px-0 ${className}`}>
      {meta ? (
        <p className="mb-10 text-sm" style={{ color: color.subtle }}>
          {meta}
        </p>
      ) : null}
      <div className={PROSE}>{children}</div>
    </div>
  );
}

// components/layout/AnswerCapsules.tsx
// Question-led answer blocks for the top of a service page.
//
// A sibling of FaqList with one deliberate difference: every answer is always
// visible. FaqList collapses answers, which suits a long tail of questions; an
// answer capsule only works if the direct answer sits in plain view directly
// under a heading phrased the way people actually ask. That pairing is the unit
// AI Overviews and LLM answer engines lift and attribute.
//
// Content rules, because a capsule is exactly what gets quoted without context:
// - Answer in the first sentence, then add the one qualifier that matters.
// - Keep each answer to roughly 40-60 words.
// - Numbers only when a named case study or a dated screenshot backs them.
//   Never a typical, average or projected figure.

import { color, text } from "@/lib/design-tokens";

export interface AnswerCapsule {
  /** Phrased as a real query, e.g. "Why are my product pages not indexed?" */
  q: string;
  a: string;
}

export interface AnswerCapsulesProps {
  items: AnswerCapsule[];
}

export default function AnswerCapsules({ items }: AnswerCapsulesProps) {
  return (
    <div className="space-y-8">
      {items.map((item) => (
        <div key={item.q}>
          <h3 className="mb-2 text-lg font-bold tracking-tight" style={{ color: color.ink }}>
            {item.q}
          </h3>
          <p className={text.body} style={{ color: color.muted }}>
            {item.a}
          </p>
        </div>
      ))}
    </div>
  );
}

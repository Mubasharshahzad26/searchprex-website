// components/home/FaqAccordion.tsx
// Native <details>, so every answer is in the HTML (the FAQPage schema must
// match visible content) and it works without JavaScript.

import { Plus } from "lucide-react";

export default function FaqAccordion({ faqs }: { faqs: Array<{ q: string; a: string }> }) {
  return (
    <div className="divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white">
      {faqs.map((f) => (
        <details key={f.q} className="group px-6 py-5 sm:px-8">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-neutral-950 [&::-webkit-details-marker]:hidden">
            {f.q}
            <Plus className="h-5 w-5 flex-shrink-0 text-neutral-900 transition-transform group-open:rotate-45" aria-hidden />
          </summary>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

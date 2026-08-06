// components/layout/ComparisonTable.tsx
// "Us vs the alternatives" table.
//
// Rendered as a real <table>, not a CSS grid. The grid version it replaces gave
// screen readers no row/column association, and gave Google no table structure
// to lift into an AI Overview comparison — which is exactly the surface this
// content is aiming at.
//
// Wrapped in an overflow-x-auto container so the page body never scrolls
// horizontally on mobile.

import { Check, X } from "lucide-react";
import { color, heading, radius, text } from "@/lib/design-tokens";

/** true = yes, false = no, string = a qualifier ("Sometimes", "Up", "Down"). */
export type CellValue = boolean | string;

export interface ComparisonRow {
  label: string;
  /** Values in the same order as `columns`. */
  values: CellValue[];
}

export interface ComparisonTableProps {
  /** Column headers. The first is highlighted as the SearchPrex column. */
  columns: string[];
  rows: ComparisonRow[];
  /** Accessible description of what the table compares. */
  caption: string;
}

export default function ComparisonTable({ columns, rows, caption }: ComparisonTableProps) {
  return (
    // `relative` is load-bearing, not cosmetic. The sr-only cells below are
    // position:absolute; without a positioned ancestor their containing block is
    // the page itself, so they sit at their static x inside the 640px-wide table
    // and stretch the document instead of being clipped by this scroller.
    <div
      className={`relative overflow-x-auto ${radius.card} border`}
      style={{ borderColor: color.border, background: color.white }}
    >
      <table className="w-full min-w-[640px] border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b" style={{ borderColor: color.border }}>
            <th scope="col" className="px-6 py-4" />
            {columns.map((c, i) => (
              <th
                key={c}
                scope="col"
                className={`${heading.eyebrow} px-6 py-4 text-center`}
                style={{ color: i === 0 ? color.primary : color.muted }}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className="border-b last:border-0"
              style={{ borderColor: color.border, background: i % 2 === 1 ? color.surface : color.white }}
            >
              <th
                scope="row"
                className={`${text.small} px-6 py-4 font-medium`}
                style={{ color: color.ink }}
              >
                {row.label}
              </th>
              {row.values.map((v, j) => (
                <td key={`${row.label}-${j}`} className="px-6 py-4 text-center">
                  <Cell value={v} highlight={j === 0} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Cell({ value, highlight }: { value: CellValue; highlight: boolean }) {
  if (value === true) {
    return (
      <>
        <Check
          className="mx-auto h-5 w-5"
          style={{ color: highlight ? color.primary : color.success }}
          aria-hidden
        />
        <span className="sr-only">Yes</span>
      </>
    );
  }

  if (value === false) {
    return (
      <>
        <X className="mx-auto h-5 w-5" style={{ color: color.subtle }} aria-hidden />
        <span className="sr-only">No</span>
      </>
    );
  }

  return (
    <span
      className={`${text.small} font-medium`}
      style={{ color: highlight ? color.primaryDark : color.muted }}
    >
      {value}
    </span>
  );
}

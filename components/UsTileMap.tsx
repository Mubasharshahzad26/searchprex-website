// components/UsTileMap.tsx
//
// A US tile map: every state one equal square, laid out roughly where it sits
// on the map, with the states where a client's case study is set highlighted.
// Used on the service spokes for "Where this work has run".
//
// Why tiles and not a Google Maps embed: no API key, no third-party script,
// nothing that slows the page, and small states (RI, DE) are as readable as
// big ones. Highlight only states with a published case study — a pin where
// there is no client would be a claim the site cannot back.
//
// Server component: an inline SVG and plain links.

import Link from "next/link";

/** [state, column, row] on a 12 x 8 grid. */
const TILES: Array<[string, number, number]> = [
  ["AK", 0, 0], ["ME", 11, 0],
  ["VT", 10, 1], ["NH", 11, 1],
  ["WA", 1, 2], ["ID", 2, 2], ["MT", 3, 2], ["ND", 4, 2], ["MN", 5, 2], ["IL", 6, 2], ["WI", 7, 2], ["MI", 8, 2], ["NY", 9, 2], ["RI", 10, 2], ["MA", 11, 2],
  ["OR", 1, 3], ["NV", 2, 3], ["WY", 3, 3], ["SD", 4, 3], ["IA", 5, 3], ["IN", 6, 3], ["OH", 7, 3], ["PA", 8, 3], ["NJ", 9, 3], ["CT", 10, 3],
  ["CA", 1, 4], ["UT", 2, 4], ["CO", 3, 4], ["NE", 4, 4], ["MO", 5, 4], ["KY", 6, 4], ["WV", 7, 4], ["VA", 8, 4], ["MD", 9, 4], ["DE", 10, 4],
  ["AZ", 2, 5], ["NM", 3, 5], ["KS", 4, 5], ["AR", 5, 5], ["TN", 6, 5], ["NC", 7, 5], ["SC", 8, 5], ["DC", 9, 5],
  ["OK", 4, 6], ["LA", 5, 6], ["MS", 6, 6], ["AL", 7, 6], ["GA", 8, 6],
  ["HI", 0, 7], ["TX", 4, 7], ["FL", 9, 7],
];

const CELL = 44;
const GAP = 4;

export type MapClient = {
  /** Two-letter state code. */
  state: string;
  name: string;
  /** Where, in words, e.g. "Clawson & Chesterfield, Michigan". */
  place: string;
  result: string;
  href: string;
  /** Link text; defaults to the case-study wording. */
  linkLabel?: string;
};

export default function UsTileMap({
  clients,
  dark = false,
  label,
}: {
  clients: MapClient[];
  dark?: boolean;
  /** Accessible name for the map, when the highlights mean something other than client case studies. */
  label?: string;
}) {
  const active = new Set(clients.map((c) => c.state));
  const cols = 12;
  const rows = 8;
  const width = cols * CELL + (cols - 1) * GAP;
  const height = rows * CELL + (rows - 1) * GAP;

  const ink = dark ? "#fff" : "#0a0f2e";
  const muted = dark ? "rgba(255,255,255,0.7)" : "#5b6472";

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr] [&>*]:min-w-0">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        role="img"
        aria-label={label ?? `Map of the United States with ${[...active].join(", ")} highlighted where client case studies are set`}
      >
        {TILES.map(([st, c, r]) => {
          const on = active.has(st);
          const x = c * (CELL + GAP);
          const y = r * (CELL + GAP);
          const client = clients.find((cl) => cl.state === st);
          return (
            <g key={st}>
              {client ? <title>{`${client.name} — ${client.place}`}</title> : null}
              <rect
                x={x}
                y={y}
                width={CELL}
                height={CELL}
                rx={6}
                fill={on ? "#534AB7" : dark ? "rgba(255,255,255,0.08)" : "#eef0f5"}
                stroke={on ? "#b9b3f5" : "none"}
                strokeWidth={on ? 2 : 0}
              />
              <text
                x={x + CELL / 2}
                y={y + CELL / 2 + 4}
                textAnchor="middle"
                fontSize="12"
                fontWeight={on ? 800 : 600}
                fill={on ? "#fff" : dark ? "rgba(255,255,255,0.45)" : "#8a93a3"}
              >
                {st}
              </text>
            </g>
          );
        })}
      </svg>

      <ul className="space-y-5">
        {clients.map((c) => (
          <li key={c.name} className="border-l-4 pl-4" style={{ borderColor: "#534AB7" }}>
            <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: dark ? "#b9b3f5" : "#534AB7" }}>
              {c.place}
            </p>
            <p className="mt-1 text-base font-black" style={{ color: ink }}>{c.name}</p>
            <p className="mt-1 text-sm leading-relaxed" style={{ color: muted }}>{c.result}</p>
            <Link href={c.href} className="mt-1 inline-block text-sm font-bold hover:underline" style={{ color: dark ? "#b9b3f5" : "#534AB7" }}>
              {c.linkLabel ?? "Read the case study"} →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

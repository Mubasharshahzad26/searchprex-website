import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "dark" | "light";
  href?: string;
  asLink?: boolean;
}

const sizes = {
  sm: { height: 28, fontSize: 22, gap: 10 },
  md: { height: 36, fontSize: 28, gap: 12 },
  lg: { height: 48, fontSize: 36, gap: 14 },
};

const GREEN = "#3eb489";

/**
 * Searchprex logo — pillar mark (with green star and green stripe on base)
 * paired with a bold black wordmark ("Searchprex", lowercase p).
 *
 * `variant="dark"` uses black text/mark on light backgrounds.
 * `variant="light"` uses white text/mark on dark backgrounds (green accents preserved).
 *
 * The logo renders as plain markup by default. Every call site already wraps it
 * in its own <Link> for layout reasons, so linking here too produced a nested
 * <a> inside an <a> — invalid HTML that React reported as a hydration failure on
 * every page of the site. Pass `asLink` only when the logo stands alone.
 */
export function Logo({
  size = "md",
  variant = "dark",
  href = "/",
  asLink = false,
}: LogoProps) {
  const { height, fontSize, gap } = sizes[size];
  const isLight = variant === "light";
  const ink = isLight ? "#ffffff" : "#000000";
  // Slightly brighter green on dark backgrounds
  const accent = isLight ? "#5ae0af" : GREEN;

  // Mark viewBox is 62x60; scale it to match text height with a small padding.
  const markHeight = Math.round(height * 1.15);
  const markWidth = Math.round(markHeight * (62 / 60));

  const inner = (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap,
        textDecoration: "none",
        lineHeight: 1,
      }}
      aria-label="Searchprex"
    >
      <svg
        width={markWidth}
        height={markHeight}
        viewBox="0 0 62 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
      >
        {/* Pediment */}
        <path d="M31 4 L55 16 H7 Z" fill={ink} />
        {/* Star in pediment */}
        <polygon
          points="31,7 32.5,10.4 36.2,10.7 33.4,13 34.3,16.6 31,14.7 27.7,16.6 28.6,13 25.8,10.7 29.5,10.4"
          fill={accent}
        />
        {/* Architrave */}
        <rect x="5" y="16" width="52" height="5" fill={ink} />
        {/* Columns */}
        <rect x="9" y="21" width="7" height="26" fill={ink} />
        <rect x="20" y="21" width="7" height="26" fill={ink} />
        <rect x="31" y="21" width="7" height="26" fill={ink} />
        <rect x="42" y="21" width="7" height="26" fill={ink} />
        {/* Base — stripes (subtle US flag reference) */}
        <rect x="5" y="47" width="52" height="3" fill={ink} />
        <rect x="5" y="52" width="52" height="2" fill={accent} />
        <rect x="5" y="56" width="52" height="2" fill={ink} />
      </svg>
      <span
        style={{
          fontFamily:
            "var(--font-inter), Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          fontWeight: 800,
          fontSize,
          letterSpacing: "-0.035em",
          color: ink,
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        Searchprex
      </span>
    </span>
  );

  if (!asLink) return <span>{inner}</span>;

  return (
    <Link
      href={href}
      style={{ textDecoration: "none", display: "inline-flex" }}
      aria-label="Searchprex home"
    >
      {inner}
    </Link>
  );
}

export default Logo;

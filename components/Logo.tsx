"use client";
 
interface LogoProps {
  variant?: "light" | "dark" | "icon-only";
  size?: "sm" | "md" | "lg";
  className?: string;
}
 
/**
 * variant meaning:
 *  - "dark"  → for LIGHT backgrounds (dark text)   ← use on white pages
 *  - "light" → for DARK backgrounds (light text)   ← use on dark sections/footer
 *  - "icon-only" → just the mark, no wordmark
 */
export function Logo({ variant = "dark", size = "md", className = "" }: LogoProps) {
  const sizes = {
    sm: { icon: 24, text: 16 },
    md: { icon: 32, text: 20 },
    lg: { icon: 40, text: 24 },
  };
 
  const { icon, text } = sizes[size];
 
  const onDarkBg = variant === "light";     // light wordmark = sitting on a dark bg
  const iconOnly = variant === "icon-only";
 
  // Icon always uses vivid brand blues (visible on both light & dark)
  const backPieceColor  = "#1847F5"; // bright brand blue
  const frontPieceColor = "#3D65FF"; // lighter brand blue
 
  // Wordmark color flips based on background
  const textColor = onDarkBg ? "#F0F4FF" : "#0D1B3E";
 
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Icon Mark */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Back piece - lower-right */}
        <polygon points="13,37 29,13 39,23 25,39" fill={backPieceColor} />
        {/* Front piece - upper-left */}
        <polygon points="5,37 21,5 29,13 13,37" fill={frontPieceColor} />
      </svg>
 
      {/* Wordmark */}
      {!iconOnly && (
        <span
          className="font-bold leading-none"
          style={{
            fontSize: `${text}px`,
            color: textColor,
            letterSpacing: "-0.025em",
          }}
        >
          Searchprex
          <span
            className="align-super"
            style={{ fontSize: `${text * 0.45}px`, marginLeft: "1px", opacity: 0.6 }}
          >
            ®
          </span>
        </span>
      )}
    </div>
  );
}
 
// Favicon component for generating favicon
export function Favicon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="44" height="44" rx="10" fill="#1847F5" />
      <polygon points="12,36 22,10 30,18 20,36" fill="#ffffff" opacity="0.55" />
      <polygon points="14,34 24,8 32,16 22,34" fill="#ffffff" />
    </svg>
  );
}
 


















